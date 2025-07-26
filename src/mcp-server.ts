#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  `https://${process.env.KNOWLEDGE_DB_URL!.match(/@db\.([^.]+)\.supabase\.co/)?.[1]}.supabase.co`,
  process.env.KNOWLEDGE_DB_SERVICE_KEY!
);

// Tool schemas
const SearchEndpointsSchema = z.object({
  query: z.string().describe('Search query for endpoints'),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
  category: z.string().optional(),
});

const GetEndpointDetailsSchema = z.object({
  path: z.string().describe('API endpoint path'),
});

const SearchDocumentationSchema = z.object({
  query: z.string().describe('Search query for documentation'),
  limit: z.number().default(5),
});

const GetDataModelSchema = z.object({
  name: z.string().describe('Data model name'),
});

const FindRelatedEndpointsSchema = z.object({
  endpoint: z.string().describe('Starting endpoint path'),
  depth: z.number().default(2),
});

class ChannexKnowledgeServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'channex-knowledge',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_endpoints',
          description: 'Search Channex API endpoints by query, method, or category',
          inputSchema: SearchEndpointsSchema,
        },
        {
          name: 'get_endpoint_details',
          description: 'Get detailed information about a specific endpoint',
          inputSchema: GetEndpointDetailsSchema,
        },
        {
          name: 'search_documentation',
          description: 'Search Channex documentation chunks',
          inputSchema: SearchDocumentationSchema,
        },
        {
          name: 'get_data_model',
          description: 'Get details about a Channex data model',
          inputSchema: GetDataModelSchema,
        },
        {
          name: 'find_related_endpoints',
          description: 'Find endpoints related to a given endpoint',
          inputSchema: FindRelatedEndpointsSchema,
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'search_endpoints':
          return this.searchEndpoints(request.params.arguments);
        case 'get_endpoint_details':
          return this.getEndpointDetails(request.params.arguments);
        case 'search_documentation':
          return this.searchDocumentation(request.params.arguments);
        case 'get_data_model':
          return this.getDataModel(request.params.arguments);
        case 'find_related_endpoints':
          return this.findRelatedEndpoints(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async searchEndpoints(args: unknown) {
    const { query, method, category } = SearchEndpointsSchema.parse(args);
    
    let queryBuilder = supabase
      .from('kg_endpoints')
      .select('method, path, category, description, parameters, examples');
    
    if (method) {
      queryBuilder = queryBuilder.eq('method', method);
    }
    
    if (category) {
      queryBuilder = queryBuilder.eq('category', category);
    }
    
    if (query) {
      queryBuilder = queryBuilder.or(`path.ilike.%${query}%,description.ilike.%${query}%`);
    }
    
    const { data, error } = await queryBuilder.limit(10);
    
    if (error) throw error;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  private async getEndpointDetails(args: unknown) {
    const { path } = GetEndpointDetailsSchema.parse(args);
    
    const { data, error } = await supabase
      .from('kg_endpoints')
      .select('*')
      .eq('path', path)
      .single();
    
    if (error) throw error;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  private async searchDocumentation(args: unknown) {
    const { query, limit } = SearchDocumentationSchema.parse(args);
    
    const { data, error } = await supabase
      .from('kg_doc_chunks')
      .select('content, metadata, source_file')
      .textSearch('content', query)
      .limit(limit);
    
    if (error) throw error;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  private async getDataModel(args: unknown) {
    const { name } = GetDataModelSchema.parse(args);
    
    const { data, error } = await supabase
      .from('kg_data_models')
      .select('*')
      .eq('name', name)
      .single();
    
    if (error) throw error;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  private async findRelatedEndpoints(args: unknown) {
    const { endpoint, depth } = FindRelatedEndpointsSchema.parse(args);
    
    // For now, return endpoints in the same category
    const { data: currentEndpoint } = await supabase
      .from('kg_endpoints')
      .select('category')
      .eq('path', endpoint)
      .single();
    
    if (!currentEndpoint) {
      return { content: [{ type: 'text', text: 'Endpoint not found' }] };
    }
    
    const { data, error } = await supabase
      .from('kg_endpoints')
      .select('method, path, description')
      .eq('category', currentEndpoint.category)
      .neq('path', endpoint)
      .limit(5);
    
    if (error) throw error;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Channex Knowledge MCP server running');
  }
}

const server = new ChannexKnowledgeServer();
server.run().catch(console.error);