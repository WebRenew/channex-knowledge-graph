# Channex Knowledge Graph Builder

A self-improving knowledge graph system for Channex.io API documentation, combining vector search with graph relationships to enable intelligent API understanding and code generation.

## 🏗️ Architecture

### Hybrid Storage Approach
- **PostgreSQL (Supabase)**: Vector embeddings for semantic search, structured data storage
- **Neo4j**: Graph relationships, traversal queries, and pattern matching
- **Agent Logic**: Intelligent routing between storage types

### Data Flow
```
Channex Docs → Parser → Supabase (Primary Storage) → Neo4j Sync → Graph Queries
                            ↓                            ↓
                    Vector Embeddings            Relationship Graphs
```

## 🚀 Quick Start

### Prerequisites
1. Node.js 18+ and npm
2. Docker and Docker Compose (for Neo4j)
3. Supabase project (already configured: `czysljuglsdvtxbwavyz`)
4. OpenAI API key for embeddings

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd channex-knowledge-graph

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your OpenAI API key

# Start Neo4j
npm run neo4j:up
```

### Test Setup

```bash
# Verify everything is configured correctly
npm run test:setup
```

### Parse Documentation

```bash
# Parse all documentation files
npm run parse

# Clear existing data and reparse
npm run parse -- --clear
```

### Sync to Neo4j

```bash
# Sync parsed data to Neo4j graph database
npm run sync:neo4j

# Explore the graph with example queries
npm run query:neo4j

# Access Neo4j Browser at http://localhost:7474
# Username: neo4j, Password: channex123
```

## 📁 Project Structure

```
channex-knowledge-graph/
├── src/
│   ├── parser/           # Documentation parsing logic
│   ├── embeddings/       # Vector embedding generation
│   ├── storage/          # Database operations
│   ├── sync/            # Neo4j synchronization
│   └── types/           # TypeScript definitions
├── scripts/
│   ├── parse-docs.ts    # Main parsing script
│   ├── test-setup.ts    # Setup verification
│   ├── sync-to-neo4j.ts # Neo4j sync script
│   └── neo4j-queries.ts # Example graph queries
├── channex-docs/        # Raw documentation (88 files)
├── docs/               # Project documentation
├── docker-compose.yml   # Neo4j container setup
└── tests/              # Unit tests
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase Configuration
KNOWLEDGE_DB_URL=postgresql://...
KNOWLEDGE_DB_ANON_KEY=...
KNOWLEDGE_DB_SERVICE_KEY=...

# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=channex123

# OpenAI Configuration
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=text-embedding-3-small
OPENAI_EMBEDDING_DIMENSIONS=1536

# Processing Options
CHUNK_SIZE=1000
MAX_CHUNK_OVERLAP=200
BATCH_SIZE=10
```

## 📊 Database Schema

### PostgreSQL/Supabase Tables (in `channex_knowledge` schema)
- `doc_chunks` - Document chunks with vector embeddings
- `endpoints` - API endpoint definitions
- `data_models` - Extracted data models
- `workflows` - Common API usage patterns
- `graph_nodes` - Nodes for graph representation
- `graph_edges` - Relationships between entities
- `api_patterns` - Reusable API patterns
- `error_patterns` - Common error scenarios

### Neo4j Graph Schema
**Node Types:**
- `:Endpoint` - API endpoints with path, method, description
- `:DataModel` - Data structures (Property, Booking, etc.)
- `:Workflow` - Common API usage patterns
- `:Property`, `:RoomType`, `:RatePlan` - Domain entities

**Relationships:**
- `(:Endpoint)-[:RETURNS]->(:DataModel)`
- `(:Endpoint)-[:ACCEPTS]->(:DataModel)`
- `(:Property)-[:HAS_ROOM_TYPE]->(:RoomType)`
- `(:RoomType)-[:HAS_RATE_PLAN]->(:RatePlan)`

### Helper Functions
- `vector_search()` - Semantic similarity search
- `traverse_graph()` - Graph traversal queries
- `find_related_endpoints()` - Discover endpoint relationships

## 🔄 Parsing Process

1. **Document Analysis**: Extract endpoints, models, and workflows
2. **Chunking**: Split documents into semantic chunks
3. **Embedding Generation**: Create vector embeddings
4. **Relationship Extraction**: Identify entity relationships
5. **Storage**: Save to both PostgreSQL and graph format

## 📈 Current Status

- ✅ Database schema created
- ✅ Basic parser implemented
- ✅ Storage layer ready
- ✅ Neo4j integration complete
- ✅ 23 endpoints parsed
- ✅ 10 data models extracted
- ✅ 33 graph nodes created
- ✅ 9 relationships mapped
- ⏳ OpenAI embeddings (requires API key)
- ⏳ Agent query routing

## 🛠️ Development

### Available Scripts

```bash
npm run build         # Compile TypeScript
npm run dev          # Development mode
npm run parse        # Parse documentation
npm run test         # Run tests
npm run lint         # Lint code

# Neo4j specific
npm run neo4j:up     # Start Neo4j container
npm run neo4j:down   # Stop Neo4j container
npm run neo4j:logs   # View Neo4j logs
npm run sync:neo4j   # Sync data from Supabase to Neo4j
npm run query:neo4j  # Run example Neo4j queries
```

### Adding New Parsers

Create a new parser in `src/parser/`:

```typescript
export class CustomParser {
  parseContent(content: string): ParsedResult {
    // Your parsing logic
  }
}
```

### Example Neo4j Queries

Find all endpoints for a specific model:
```cypher
MATCH (e:Endpoint)-[:RETURNS|ACCEPTS]->(m:DataModel {name: 'Property'})
RETURN e.method, e.path, e.description
```

Trace API workflow:
```cypher
MATCH path = (p:Property)-[:HAS_ROOM_TYPE]->(rt:RoomType)-[:HAS_RATE_PLAN]->(rp:RatePlan)
RETURN path
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

MIT

## 📚 Additional Documentation

- [Neo4j Setup Guide](./README-neo4j.md) - Detailed Neo4j configuration and usage
- [Neo4j Schema Design](./docs/neo4j-schema.md) - Graph schema documentation

## 🙏 Acknowledgments

- Channex.io for comprehensive API documentation
- Ottomator project for architecture inspiration
- Supabase for vector storage capabilities
- Neo4j for graph database capabilities