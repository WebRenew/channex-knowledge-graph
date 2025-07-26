# Channex Knowledge Graph Builder

## Project Overview
Building a self-improving knowledge graph from Channex.io API documentation to power an intelligent proxy API for Supahost.io. This system combines vector search (PostgreSQL + pgvector) with graph relationships (Neo4j) to enable contextual API understanding and code generation.

## Architecture

### Storage Strategy (Hybrid Approach)
1. **PostgreSQL (Supabase)** - Project: `czysljuglsdvtxbwavyz`
   - Vector embeddings for semantic search
   - Structured data storage
   - Query history and learning patterns
   - Schema: `channex_knowledge`

2. **Neo4j** (To be configured)
   - Entity relationships
   - API workflow patterns
   - Dependency graphs

### Key Components
```
channex-knowledge-graph/
├── src/
│   ├── parser/           # Documentation parsing
│   ├── embeddings/       # Vector generation
│   ├── graph/           # Knowledge graph building
│   ├── storage/         # Database operations
│   └── types/           # TypeScript definitions
├── scripts/             # Ingestion and utilities
├── channex-docs/        # Raw documentation (88 files)
└── tests/              # Unit and integration tests
```

## Current Task: Parse & Build Knowledge Graph

### Phase 1: Documentation Parser
Extract from Channex markdown docs:
- [ ] API endpoints (method, path, parameters)
- [ ] Data models (Property, Booking, RoomType, etc.)
- [ ] Relationships between entities
- [ ] Common workflows
- [ ] Error patterns

### Phase 2: Vector Embeddings
- [ ] Chunk documentation intelligently
- [ ] Generate embeddings using OpenAI
- [ ] Store in Supabase with metadata

### Phase 3: Graph Construction
- [ ] Create nodes for endpoints and models
- [ ] Build relationship edges
- [ ] Identify workflow patterns
- [ ] Store in both PostgreSQL and Neo4j

### Phase 4: Agent Integration
- [ ] Query routing (vector vs graph)
- [ ] Pattern learning from usage
- [ ] Self-improvement mechanisms

## Database Schema (Already Created)

### Core Tables in `channex_knowledge`:
- `doc_chunks` - Document chunks with embeddings
- `endpoints` - API endpoint definitions
- `data_models` - Extracted data models
- `workflows` - Common API patterns
- `graph_nodes` - For Neo4j sync
- `graph_edges` - Relationships
- `learned_patterns` - Self-improvement
- `query_history` - Usage tracking

## Key Patterns to Extract

### 1. API Endpoints
```typescript
interface EndpointPattern {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string; // e.g., /api/v1/properties/:id
  category: string; // properties, bookings, etc.
  parameters: Parameter[];
  authentication: 'api_key' | 'oauth';
}
```

### 2. Data Relationships
- Property → RoomTypes → RatePlans
- Booking → Property → Guest
- Channel → Property → Availability

### 3. Common Workflows
- Property setup flow
- Booking management
- Channel connection
- ARI (Availability, Rates, Inventory) sync

## Implementation Strategy

### Step 1: Basic Parser (Start Here)
```typescript
// src/parser/channexParser.ts
class ChannexDocParser {
  parseEndpoints(content: string): EndpointNode[]
  parseDataModels(content: string): DataModelNode[]
  extractRelationships(content: string): RelationshipEdge[]
}
```

### Step 2: Embedding Generator
```typescript
// src/embeddings/generator.ts
class EmbeddingGenerator {
  async generateEmbedding(text: string): Promise<number[]>
  async chunkDocument(content: string): Promise<Chunk[]>
}
```

### Step 3: Storage Layer
```typescript
// src/storage/hybridStorage.ts
class HybridStorage {
  async storeEndpoint(endpoint: EndpointNode): Promise<void>
  async storeRelationship(edge: RelationshipEdge): Promise<void>
  async searchSimilar(query: string): Promise<Result[]>
}
```

## Environment Variables Needed
```env
# OpenAI for embeddings
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=text-embedding-3-small

# Neo4j (when ready)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password
```

## Success Metrics
- [ ] Parse all 88 documentation files
- [ ] Extract 100+ API endpoints
- [ ] Identify 20+ data models
- [ ] Map entity relationships
- [ ] Generate embeddings for all content
- [ ] Enable semantic search
- [ ] Build traversable knowledge graph

## Next Steps
1. Set up TypeScript project structure
2. Implement basic markdown parser
3. Test with single documentation file
4. Scale to full documentation set
5. Add embedding generation
6. Store in Supabase
7. Sync to Neo4j

## References
- Channex API Docs: https://docs.channex.io
- Ottomator Pattern: https://github.com/coleam00/ottomator-agents
- Supabase Project: czysljuglsdvtxbwavyz