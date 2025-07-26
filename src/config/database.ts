// Database configuration and table mappings

export const dbConfig = {
  // Schema configuration
  schema: 'channex_knowledge',
  usePublicViews: true,
  
  // Table mappings
  tables: {
    // Original table name -> Public view name
    doc_chunks: 'kg_doc_chunks',
    endpoints: 'kg_endpoints',
    data_models: 'kg_data_models',
    workflows: 'kg_workflows',
    api_patterns: 'kg_api_patterns',
    error_patterns: 'kg_error_patterns',
    graph_nodes: 'kg_graph_nodes',
    graph_edges: 'kg_graph_edges',
    learned_patterns: 'kg_learned_patterns',
    query_history: 'kg_query_history'
  },
  
  // Function mappings
  functions: {
    vector_search: 'kg_vector_search',
    find_related_endpoints: 'kg_find_related_endpoints',
    get_workflow_steps: 'kg_get_workflow_steps'
  }
};

/**
 * Get the actual table/view name based on configuration
 */
export function getTableName(tableName: keyof typeof dbConfig.tables): string {
  return dbConfig.usePublicViews ? dbConfig.tables[tableName] : tableName;
}

/**
 * Get the actual function name based on configuration
 */
export function getFunctionName(functionName: keyof typeof dbConfig.functions): string {
  return dbConfig.usePublicViews ? dbConfig.functions[functionName] : functionName;
}