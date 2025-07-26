import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  EndpointNode,
  DataModelNode,
  WorkflowNode,
  RelationshipEdge,
  DocumentChunk,
  APIPattern,
  ErrorPattern
} from '../types';
import { getTableName } from '../config/database';

export class SupabaseStorage {
  private supabase: SupabaseClient;
  private schema = 'public'; // Use public schema for access
  private usePublicViews = true; // Use public schema views for API access

  constructor(url: string, serviceKey: string) {
    // Extract project reference from PostgreSQL URL
    const projectRef = url.match(/@db\.([^.]+)\.supabase\.co/)?.[1];
    
    if (!projectRef) {
      throw new Error('Invalid Supabase database URL');
    }
    
    const supabaseUrl = `https://${projectRef}.supabase.co`;
    
    this.supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false
      },
      db: {
        schema: 'public' // Use public schema which contains the views
      }
    });
  }

  /**
   * Get the Supabase client instance
   */
  get client(): SupabaseClient {
    return this.supabase;
  }

  /**
   * Get table name with proper prefix
   */
  private getTableName(table: string): string {
    // Use the imported getTableName function to get the correct view name
    return getTableName(table as any);
  }

  /**
   * Store document chunks with embeddings
   */
  async storeDocumentChunks(chunks: DocumentChunk[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('doc_chunks'))
      .insert(
        chunks.map(chunk => ({
          content: chunk.content,
          embedding: chunk.embedding,
          metadata: chunk.metadata,
          source_file: chunk.metadata.source,
          chunk_index: chunks.indexOf(chunk)
        }))
      );

    if (error) throw error;
  }

  /**
   * Store API endpoints
   */
  async storeEndpoints(endpoints: EndpointNode[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('endpoints'))
      .insert(
        endpoints.map(endpoint => ({
          method: endpoint.method,
          path: endpoint.path,
          category: endpoint.category,
          description: endpoint.description,
          parameters: endpoint.parameters,
          request_body: endpoint.requestBody,
          response_schema: endpoint.responseSchema,
          authentication: endpoint.authentication,
          rate_limit: endpoint.rateLimit,
          examples: endpoint.examples
        }))
      );

    if (error) throw error;
  }

  /**
   * Store data models
   */
  async storeDataModels(models: DataModelNode[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('data_models'))
      .insert(
        models.map(model => ({
          name: model.name,
          description: model.description,
          fields: model.fields,
          relationships: model.relationships,
          validations: model.validations,
          examples: model.examples
        }))
      );

    if (error) throw error;
  }

  /**
   * Store workflows
   */
  async storeWorkflows(workflows: WorkflowNode[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('workflows'))
      .insert(
        workflows.map(workflow => ({
          name: workflow.name,
          description: workflow.description,
          steps: workflow.steps,
          required_endpoints: workflow.requiredEndpoints,
          data_flow: workflow.dataFlow
        }))
      );

    if (error) throw error;
  }

  /**
   * Store graph nodes for Neo4j sync
   */
  async storeGraphNodes(nodes: Array<{
    nodeId: string;
    nodeType: string;
    properties: Record<string, any>;
  }>): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('graph_nodes'))
      .insert(
        nodes.map(node => ({
          node_id: node.nodeId,
          node_type: node.nodeType,
          properties: node.properties
        }))
      );

    if (error) throw error;
  }

  /**
   * Store graph edges for Neo4j sync
   */
  async storeGraphEdges(edges: RelationshipEdge[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('graph_edges'))
      .insert(
        edges.map(edge => ({
          source_id: edge.source,
          target_id: edge.target,
          edge_type: edge.type,
          properties: edge.metadata || {}
        }))
      );

    if (error) throw error;
  }

  /**
   * Store API patterns
   */
  async storeAPIPatterns(patterns: APIPattern[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('api_patterns'))
      .insert(
        patterns.map(pattern => ({
          pattern_type: pattern.type,
          pattern_name: pattern.name,
          description: pattern.description,
          implementation: pattern.implementation,
          usage_examples: pattern.examples
        }))
      );

    if (error) throw error;
  }

  /**
   * Store error patterns
   */
  async storeErrorPatterns(errors: ErrorPattern[]): Promise<void> {
    const { error } = await this.supabase
      .from(this.getTableName('error_patterns'))
      .insert(
        errors.map(error => ({
          error_code: error.code,
          error_type: error.type,
          description: error.description,
          common_causes: error.commonCauses,
          solutions: error.solutions,
          related_endpoints: error.relatedEndpoints || []
        }))
      );

    if (error) throw error;
  }

  /**
   * Vector search (using raw SQL for now)
   */
  async vectorSearch(
    embedding: number[],
    threshold: number = 0.7,
    limit: number = 10,
    searchType: 'all' | 'chunks' | 'endpoints' | 'models' = 'all'
  ): Promise<any[]> {
    // For now, just return empty array since the function isn't set up
    console.warn('Vector search not yet implemented');
    return [];
  }

  /**
   * Find related endpoints
   */
  async findRelatedEndpoints(
    endpointPath: string,
    depth: number = 2
  ): Promise<any[]> {
    // For now, just return empty array since the function isn't set up
    console.warn('Find related endpoints not yet implemented');
    return [];
  }

  /**
   * Clear all data (for fresh start)
   */
  async clearAllData(): Promise<void> {
    const tables = [
      'doc_chunks',
      'endpoints',
      'data_models',
      'workflows',
      'graph_nodes',
      'graph_edges',
      'error_patterns',
      'learned_patterns',
      'query_history'
    ];

    for (const table of tables) {
      const { error } = await this.supabase
        .from(this.getTableName(table))
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) console.warn(`Error clearing ${table}:`, error);
    }
  }

  /**
   * Get statistics
   */
  async getStatistics(): Promise<Record<string, number>> {
    const stats: Record<string, number> = {};
    
    const tables = [
      'doc_chunks',
      'endpoints',
      'data_models',
      'workflows',
      'graph_nodes',
      'graph_edges'
    ];

    for (const table of tables) {
      const { count, error } = await this.supabase
        .from(this.getTableName(table))
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        stats[table] = count;
      }
    }

    return stats;
  }
}