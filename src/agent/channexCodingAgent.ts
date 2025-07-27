import { SupabaseStorage } from '../storage/supabaseStorage';
import { EmbeddingGenerator } from '../embeddings/generator';

/**
 * Channex Knowledge Agent - Self-improving coding assistant
 */
export class ChannexCodingAgent {
  private storage: SupabaseStorage;
  private embeddings: EmbeddingGenerator;

  constructor() {
    this.storage = new SupabaseStorage(
      process.env.KNOWLEDGE_DB_URL!,
      process.env.KNOWLEDGE_DB_SERVICE_KEY!
    );
    
    this.embeddings = new EmbeddingGenerator(
      process.env.OPENAI_API_KEY!
    );
  }

  /**
   * Answer a question about Channex API
   */
  async answerQuestion(question: string): Promise<{
    answer: string;
    sources: any[];
    confidence: number;
  }> {
    // 1. Search for relevant documentation
    const docs = await this.searchDocumentation(question);
    
    // 2. Find related endpoints
    const endpoints = await this.findRelevantEndpoints(question);
    
    // 3. Get data models if mentioned
    const models = await this.findRelevantModels(question);
    
    // 4. Synthesize answer
    const answer = this.synthesizeAnswer(question, docs, endpoints, models);
    
    return answer;
  }

  /**
   * Generate code for a Channex API operation
   */
  async generateCode(
    operation: string,
    language: 'typescript' | 'python' | 'javascript' = 'typescript'
  ): Promise<string> {
    // 1. Identify the endpoint(s) needed
    const endpoints = await this.identifyEndpoints(operation);
    
    // 2. Get data models
    const models = await this.getRelatedModels(endpoints);
    
    // 3. Find examples
    const examples = await this.findExamples(endpoints);
    
    // 4. Generate code
    return this.buildCode(endpoints, models, examples, language);
  }

  /**
   * Learn from successful API calls
   */
  async learnFromSuccess(
    endpoint: string,
    request: any,
    response: any
  ): Promise<void> {
    // Store successful pattern
    await this.storage.client
      .from('kg_learned_patterns')
      .insert({
        pattern_type: 'api_call',
        pattern_content: {
          endpoint,
          request,
          response,
          timestamp: new Date().toISOString()
        },
        success_rate: 100,
        usage_count: 1
      });
  }

  /**
   * Search documentation using embeddings
   */
  private async searchDocumentation(query: string): Promise<any[]> {
    // Generate embedding for query
    const queryEmbedding = await this.embeddings.generateEmbedding(query);
    
    // Search using pgvector
    const { data } = await this.storage.client
      .rpc('kg_vector_search', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 5,
        search_type: 'chunks'
      });
    
    return data || [];
  }

  /**
   * Find relevant endpoints based on query
   */
  private async findRelevantEndpoints(query: string): Promise<any[]> {
    // Extract potential endpoint patterns
    const patterns = this.extractEndpointPatterns(query);
    
    let queryBuilder = this.storage.client
      .from('kg_endpoints')
      .select('*');
    
    // Add filters based on patterns
    if (patterns.method) {
      queryBuilder = queryBuilder.eq('method', patterns.method);
    }
    
    if (patterns.resource) {
      queryBuilder = queryBuilder.ilike('path', `%${patterns.resource}%`);
    }
    
    const { data } = await queryBuilder.limit(5);
    return data || [];
  }

  /**
   * Extract patterns from natural language query
   */
  private extractEndpointPatterns(query: string): {
    method?: string;
    resource?: string;
    action?: string;
  } {
    const patterns: any = {};
    
    // Method detection
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('create') || queryLower.includes('add')) {
      patterns.method = 'POST';
    } else if (queryLower.includes('update') || queryLower.includes('modify')) {
      patterns.method = 'PUT';
    } else if (queryLower.includes('delete') || queryLower.includes('remove')) {
      patterns.method = 'DELETE';
    } else if (queryLower.includes('get') || queryLower.includes('fetch') || queryLower.includes('list')) {
      patterns.method = 'GET';
    }
    
    // Resource detection
    const resources = ['property', 'booking', 'room', 'rate', 'channel', 'guest'];
    for (const resource of resources) {
      if (queryLower.includes(resource)) {
        patterns.resource = resource;
        break;
      }
    }
    
    return patterns;
  }

  /**
   * Example code templates
   */
  private getCodeTemplate(language: string, endpoint: any): string {
    const templates = {
      typescript: `
// ${endpoint.description}
async function ${this.functionNameFromEndpoint(endpoint)}(${this.generateParams(endpoint)}) {
  const response = await fetch(\`\${CHANNEX_API_URL}${endpoint.path}\`, {
    method: '${endpoint.method}',
    headers: {
      'X-API-Key': process.env.CHANNEX_API_KEY,
      'Content-Type': 'application/json'
    },
    ${endpoint.method !== 'GET' ? 'body: JSON.stringify(data)' : ''}
  });
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return response.json();
}`,
      python: `
# ${endpoint.description}
def ${this.functionNameFromEndpoint(endpoint)}(${this.generateParams(endpoint, 'python')}):
    response = requests.${endpoint.method.toLowerCase()}(
        f"{CHANNEX_API_URL}${endpoint.path}",
        headers={
            'X-API-Key': os.environ['CHANNEX_API_KEY'],
            'Content-Type': 'application/json'
        },
        ${endpoint.method !== 'GET' ? 'json=data' : ''}
    )
    
    response.raise_for_status()
    return response.json()
`,
      javascript: `
// ${endpoint.description}
async function ${this.functionNameFromEndpoint(endpoint)}(${this.generateParams(endpoint)}) {
  const response = await fetch(\`\${CHANNEX_API_URL}${endpoint.path}\`, {
    method: '${endpoint.method}',
    headers: {
      'X-API-Key': process.env.CHANNEX_API_KEY,
      'Content-Type': 'application/json'
    },
    ${endpoint.method !== 'GET' ? 'body: JSON.stringify(data)' : ''}
  });
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return response.json();
}`
    };
    
    return templates[language] || templates.typescript;
  }

  private functionNameFromEndpoint(endpoint: any): string {
    const method = endpoint.method.toLowerCase();
    const path = endpoint.path.replace(/[^a-zA-Z]/g, '_');
    return `${method}${path}`;
  }

  private generateParams(endpoint: any, language = 'typescript'): string {
    // Extract path parameters
    const pathParams = (endpoint.path.match(/:(\w+)/g) || [])
      .map(p => p.substring(1));
    
    if (language === 'python') {
      const params = pathParams.join(', ');
      return endpoint.method !== 'GET' ? `${params}, data` : params;
    }
    
    const params = pathParams.join(': string, ') + (pathParams.length ? ': string' : '');
    return endpoint.method !== 'GET' ? `${params}, data: any` : params;
  }
}