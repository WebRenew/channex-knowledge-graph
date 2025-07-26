#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createClient } from '@supabase/supabase-js';
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
import { getTableName } from './config/database';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = 'https://czysljuglsdvtxbwavyz.supabase.co';
const supabase = createClient(
  supabaseUrl,
  process.env.KNOWLEDGE_DB_SERVICE_KEY!,
  {
    db: {
      schema: 'channex_knowledge'
    }
  }
);

// Initialize Neo4j driver
const neo4jDriver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'channex123'
  )
);

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
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query for endpoints' },
              method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
              category: { type: 'string' }
            },
            required: ['query']
          },
        },
        {
          name: 'get_endpoint_details',
          description: 'Get detailed information about a specific endpoint',
          inputSchema: {
            type: 'object',
            properties: {
              path: { type: 'string', description: 'API endpoint path' }
            },
            required: ['path']
          },
        },
        {
          name: 'search_documentation',
          description: 'Search Channex documentation chunks',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query for documentation' },
              limit: { type: 'number', default: 5 }
            },
            required: ['query']
          },
        },
        {
          name: 'get_data_model',
          description: 'Get details about a Channex data model',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Data model name' }
            },
            required: ['name']
          },
        },
        {
          name: 'find_related_endpoints',
          description: 'Find endpoints related to a given endpoint',
          inputSchema: {
            type: 'object',
            properties: {
              endpoint: { type: 'string', description: 'Starting endpoint path' },
              depth: { type: 'number', default: 2 }
            },
            required: ['endpoint']
          },
        },
        {
          name: 'graph_traversal',
          description: 'Traverse the Neo4j knowledge graph from a starting node',
          inputSchema: {
            type: 'object',
            properties: {
              startNode: { type: 'string', description: 'Starting node ID or name' },
              nodeType: { type: 'string', enum: ['Endpoint', 'DataModel', 'Property', 'RoomType', 'RatePlan', 'Booking', 'Channel'] },
              relationshipTypes: { type: 'array', items: { type: 'string' }, description: 'Relationship types to follow' },
              maxDepth: { type: 'number', default: 3 },
              limit: { type: 'number', default: 10 }
            },
            required: ['startNode']
          },
        },
        {
          name: 'find_workflow_path',
          description: 'Find the path between two endpoints through the graph',
          inputSchema: {
            type: 'object',
            properties: {
              fromEndpoint: { type: 'string', description: 'Starting endpoint path' },
              toEndpoint: { type: 'string', description: 'Target endpoint path' },
              maxHops: { type: 'number', default: 5 }
            },
            required: ['fromEndpoint', 'toEndpoint']
          },
        },
        {
          name: 'get_property_hierarchy',
          description: 'Get the complete hierarchy for a property (rooms, rate plans)',
          inputSchema: {
            type: 'object',
            properties: {
              propertyName: { type: 'string', description: 'Property name or ID' },
              includeRates: { type: 'boolean', default: true }
            },
            required: ['propertyName']
          },
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
        case 'graph_traversal':
          return this.graphTraversal(request.params.arguments);
        case 'find_workflow_path':
          return this.findWorkflowPath(request.params.arguments);
        case 'get_property_hierarchy':
          return this.getPropertyHierarchy(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async searchEndpoints(args: any) {
    const { query, method, category } = args;
    
    let queryBuilder = supabase
      .from(getTableName('endpoints'))
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

  private async getEndpointDetails(args: any) {
    const { path } = args;
    
    const { data, error } = await supabase
      .from(getTableName('endpoints'))
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

  private async searchDocumentation(args: any) {
    const { query, limit = 5 } = args;
    
    const { data, error } = await supabase
      .from(getTableName('doc_chunks'))
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

  private async getDataModel(args: any) {
    const { name } = args;
    
    const { data, error } = await supabase
      .from(getTableName('data_models'))
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

  private async findRelatedEndpoints(args: any) {
    const { endpoint, depth = 2 } = args;
    
    // For now, return endpoints in the same category
    const { data: currentEndpoint } = await supabase
      .from(getTableName('endpoints'))
      .select('category')
      .eq('path', endpoint)
      .single();
    
    if (!currentEndpoint) {
      return { content: [{ type: 'text', text: 'Endpoint not found' }] };
    }
    
    const { data, error } = await supabase
      .from(getTableName('endpoints'))
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

  private async graphTraversal(args: any) {
    const { startNode, nodeType, relationshipTypes, maxDepth = 3, limit = 10 } = args;
    
    const session = neo4jDriver.session();
    try {
      let query = `
        MATCH (n {name: $startNode})
        ${nodeType ? `WHERE n:${nodeType}` : ''}
        CALL apoc.path.expand(n, 
          ${relationshipTypes ? `'${relationshipTypes.join('|')}'` : 'null'}, 
          null, 
          0, 
          $maxDepth
        ) YIELD path
        RETURN path
        LIMIT $limit
      `;
      
      const result = await session.run(query, {
        startNode,
        maxDepth: maxDepth || 3,
        limit: limit || 10
      });
      
      const paths = result.records.map(record => {
        const path = record.get('path');
        return {
          nodes: path.segments.map((seg: any) => ({
            start: seg.start.properties,
            end: seg.end.properties,
            relationship: seg.relationship.type
          }))
        };
      });
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(paths, null, 2),
          },
        ],
      };
    } finally {
      await session.close();
    }
  }

  private async findWorkflowPath(args: any) {
    const { fromEndpoint, toEndpoint, maxHops = 5 } = args;
    
    const session = neo4jDriver.session();
    try {
      const query = `
        MATCH (start:Endpoint {path: $fromEndpoint})
        MATCH (end:Endpoint {path: $toEndpoint})
        MATCH path = shortestPath((start)-[*..${maxHops}]-(end))
        RETURN path
      `;
      
      const result = await session.run(query, {
        fromEndpoint,
        toEndpoint
      });
      
      if (result.records.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No path found between the endpoints',
            },
          ],
        };
      }
      
      const path = result.records[0].get('path');
      const pathSteps = path.segments.map((seg: any) => ({
        from: seg.start.properties.path || seg.start.properties.name,
        relationship: seg.relationship.type,
        to: seg.end.properties.path || seg.end.properties.name
      }));
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(pathSteps, null, 2),
          },
        ],
      };
    } finally {
      await session.close();
    }
  }

  private async getPropertyHierarchy(args: any) {
    const { propertyName, includeRates = true } = args;
    
    const session = neo4jDriver.session();
    try {
      const query = includeRates ? `
        MATCH (p:Property {name: $propertyName})
        OPTIONAL MATCH (p)-[:HAS_ROOM_TYPE]->(rt:RoomType)
        OPTIONAL MATCH (rt)-[:HAS_RATE_PLAN]->(rp:RatePlan)
        RETURN p, collect(DISTINCT rt) as roomTypes, collect(DISTINCT rp) as ratePlans
      ` : `
        MATCH (p:Property {name: $propertyName})
        OPTIONAL MATCH (p)-[:HAS_ROOM_TYPE]->(rt:RoomType)
        RETURN p, collect(DISTINCT rt) as roomTypes
      `;
      
      const result = await session.run(query, { propertyName });
      
      if (result.records.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'Property not found',
            },
          ],
        };
      }
      
      const record = result.records[0];
      const hierarchy = {
        property: record.get('p').properties,
        roomTypes: record.get('roomTypes').map((rt: any) => rt.properties),
        ...(includeRates && { ratePlans: record.get('ratePlans').map((rp: any) => rp.properties) })
      };
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(hierarchy, null, 2),
          },
        ],
      };
    } finally {
      await session.close();
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Channex Knowledge MCP server running');
  }
}

const server = new ChannexKnowledgeServer();
server.run().catch(console.error);