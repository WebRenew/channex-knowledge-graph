# Channex Knowledge Graph Builder

A self-improving knowledge graph system for Channex.io API documentation, combining vector search with graph relationships to enable intelligent API understanding and code generation. This system helps prevent hallucinations when building against the Channex API by providing accurate endpoint information, data models, and relationship mappings.

## 🏗️ Architecture

### Hybrid Storage Approach
- **PostgreSQL (Supabase)**: Vector embeddings for semantic search, structured data storage
- **Neo4j**: Graph relationships, traversal queries, and pattern matching
- **MCP Server**: Model Context Protocol server for AI assistant integration
- **Agent Logic**: Intelligent routing between storage types

### Data Flow
```
Channex Docs → Parser → Supabase (Primary Storage) → Neo4j Sync → Graph Queries
                            ↓                            ↓
                    Vector Embeddings            Relationship Graphs
                            ↓                            ↓
                        MCP Server ← → Claude AI Assistant
```

## 🚀 Quick Start

### Prerequisites
1. Node.js 18+ and npm
2. Neo4j Database (local or cloud instance)
3. Supabase project (already configured: `czysljuglsdvtxbwavyz`)
4. OpenAI API key for embeddings

### Installation

```bash
# Clone the repository
git clone https://github.com/WebRenew/channex-knowledge-graph.git
cd channex-knowledge-graph

# Install dependencies
npm install

# Configure environment (if not already configured)
cp .env.example .env
# Edit .env and add your OpenAI API key

# Ensure Neo4j is running on localhost:7687
# Default credentials: neo4j / channex123
```

### Test Setup

```bash
# Verify everything is configured correctly
npm run test:setup
```

### Build the Knowledge Graph

```bash
# Step 1: Parse all documentation files into Supabase
npm run parse

# Step 2: Sync data to Neo4j graph database
npm run sync:neo4j

# Optional: Clear and rebuild from scratch
npm run clear:supabase  # Clear Supabase data
npm run clear:neo4j     # Clear Neo4j data
```

### Verify the Knowledge Graph

```bash
# Run example Neo4j queries to verify the graph
npm run query:neo4j

# Access Neo4j Browser for visual exploration
# URL: http://localhost:7474
# Username: neo4j, Password: channex123
```

### Use as MCP Server

```bash
# Build the MCP server
npm run build

# Run with Claude CLI
claude --mcp "node dist/mcp-server.js"

# Or configure for Claude Desktop (see MCP-SETUP.md)
```

## 📁 Project Structure

```
channex-knowledge-graph/
├── src/
│   ├── parser/           # Documentation parsing logic
│   ├── embeddings/       # Vector embedding generation
│   ├── storage/          # Database operations
│   ├── sync/            # Neo4j synchronization
│   ├── types/           # TypeScript definitions
│   └── mcp-server.ts    # MCP server implementation
├── scripts/
│   ├── parse-docs.ts    # Main parsing script
│   ├── test-setup.ts    # Setup verification
│   ├── sync-to-neo4j.ts # Neo4j sync script
│   └── neo4j-queries.ts # Example graph queries
├── channex-docs/        # Raw documentation (88 files)
├── docs/               # Project documentation
├── dist/               # Compiled JavaScript (after build)
├── docker-compose.yml   # Neo4j container setup
├── .mcp.json.example   # MCP configuration template
└── MCP-SETUP.md        # MCP setup guide
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

### ✅ Completed
- Database schema created with public views
- Documentation parser extracting endpoints, models, and relationships
- Storage layer with Supabase integration
- Neo4j sync for graph database population
- MCP server with 8 tools for AI assistant integration
- **Knowledge Graph Contents:**
  - 23 API endpoints parsed and categorized
  - 10 data models extracted (Property, Booking, RoomType, etc.)
  - 1,127 documentation chunks with embeddings
  - 33 graph nodes representing entities
  - 9 relationships mapped between entities
  - Error handling and retry logic

### 🔧 Configuration Required
- OpenAI API key for embedding generation (add to .env)
- Neo4j instance running locally or in cloud

### 📊 Knowledge Graph Statistics
- **Endpoints**: GET, POST, PUT, DELETE operations for properties, bookings, messages, etc.
- **Data Models**: Property, Booking, RoomType, RatePlan, Group, Query, Restriction, etc.
- **Relationships**: ACCEPTS, RETURNS between endpoints and models
- **Documentation Coverage**: 86 documentation files processed

## 🛠️ Development

### Available Scripts

```bash
npm run build         # Compile TypeScript
npm run dev          # Development mode
npm run parse        # Parse documentation
npm run test         # Run tests
npm run lint         # Lint code

# Data management
npm run clear:supabase # Clear all Supabase data
npm run clear:neo4j    # Clear all Neo4j data
npm run sync:neo4j     # Sync data from Supabase to Neo4j
npm run query:neo4j    # Run example Neo4j queries

# MCP Server
npm run build:mcp     # Build MCP server
npm run start:mcp     # Start MCP server
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

- [MCP Setup Guide](./MCP-SETUP.md) - Configure the MCP server for AI assistants
- [Neo4j Setup Guide](./README-neo4j.md) - Detailed Neo4j configuration and usage
- [Neo4j Schema Design](./docs/neo4j-schema.md) - Graph schema documentation

## 🤖 MCP Server Features

The project includes a Model Context Protocol (MCP) server that provides AI assistants with direct access to the knowledge graph:

### Available Tools

**Supabase Tools (Vector Search):**
- `search_endpoints` - Search API endpoints by query, method, or category
- `get_endpoint_details` - Get detailed information about specific endpoints
- `search_documentation` - Semantic search through documentation
- `get_data_model` - Retrieve data model specifications
- `find_related_endpoints` - Discover endpoint relationships

**Neo4j Tools (Graph Traversal):**
- `graph_traversal` - Explore the knowledge graph from any starting node
- `find_workflow_path` - Find paths between endpoints through the graph
- `get_property_hierarchy` - Get complete property structures with rooms and rates

### MCP Usage

```bash
# Quick start with Claude CLI
claude --mcp "node dist/mcp-server.js"

# With environment variables
KNOWLEDGE_DB_SERVICE_KEY="your-key" claude --mcp "node dist/mcp-server.js"
```

See [MCP-SETUP.md](./MCP-SETUP.md) for detailed configuration instructions.

## 🙏 Acknowledgments

- Channex.io for comprehensive API documentation
- Ottomator project for architecture inspiration
- Supabase for vector storage capabilities
- Neo4j for graph database capabilities
- Anthropic MCP for AI integration protocol