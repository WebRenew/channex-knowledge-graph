# Neo4j Setup for Channex Knowledge Graph

This guide explains how to set up and use Neo4j as part of the Channex Knowledge Graph system.

## Quick Start

### 1. Start Neo4j
```bash
# Start Neo4j using Docker Compose
docker-compose up -d

# Check if Neo4j is running
docker-compose ps

# View logs
docker-compose logs -f neo4j
```

### 2. Access Neo4j Browser
Open http://localhost:7474 in your browser
- Username: `neo4j`
- Password: `channex123`

### 3. Configure Environment
Copy `.env.example` to `.env` and add your credentials:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 4. Run Initial Sync
```bash
# Sync all data from Supabase to Neo4j
npm run sync:neo4j

# Or run directly
tsx scripts/sync-to-neo4j.ts
```

## Architecture

### Hybrid Storage Strategy
- **PostgreSQL (Supabase)**: Primary storage, vector embeddings, structured data
- **Neo4j**: Graph relationships, traversal queries, pattern matching

### Data Flow
```
Channex Docs → Parser → Supabase → Neo4j Sync → Graph Queries
```

## Neo4j Schema

### Node Types
- `:Endpoint` - API endpoints
- `:DataModel` - Data structures (Property, Booking, etc.)
- `:Workflow` - Common API usage patterns
- `:Property`, `:RoomType`, `:RatePlan` - Domain entities

### Relationships
- `(:Endpoint)-[:RETURNS]->(:DataModel)`
- `(:Endpoint)-[:ACCEPTS]->(:DataModel)`
- `(:Workflow)-[:USES_ENDPOINT]->(:Endpoint)`
- `(:Property)-[:HAS_ROOM_TYPE]->(:RoomType)`
- `(:RoomType)-[:HAS_RATE_PLAN]->(:RatePlan)`

## Available Scripts

### Sync Data
```bash
# Full sync from Supabase to Neo4j
tsx scripts/sync-to-neo4j.ts
```

### Run Example Queries
```bash
# Run all example queries
tsx scripts/neo4j-queries.ts

# Interactive mode
tsx scripts/neo4j-queries.ts --interactive
```

### Package.json Scripts
```json
{
  "scripts": {
    "sync:neo4j": "tsx scripts/sync-to-neo4j.ts",
    "query:neo4j": "tsx scripts/neo4j-queries.ts",
    "neo4j:up": "docker-compose up -d",
    "neo4j:down": "docker-compose down",
    "neo4j:logs": "docker-compose logs -f neo4j"
  }
}
```

## Example Cypher Queries

### Find all Property endpoints
```cypher
MATCH (e:Endpoint)
WHERE e.path CONTAINS 'properties'
RETURN e.method, e.path, e.description
```

### Show property creation workflow
```cypher
MATCH (p:DataModel {name: 'Property'})
MATCH (e:Endpoint)-[:ACCEPTS]->(p)
RETURN e.path as create_property_endpoint
```

### Find related endpoints
```cypher
MATCH (e:Endpoint {path: '/api/v1/properties/{id}'})
MATCH (e)-[:RETURNS|ACCEPTS]-(m:DataModel)-[:RETURNS|ACCEPTS]-(related:Endpoint)
RETURN related.path
```

## Troubleshooting

### Neo4j won't start
```bash
# Check logs
docker-compose logs neo4j

# Reset volumes if needed
docker-compose down -v
docker-compose up -d
```

### Connection issues
```bash
# Test connection
curl http://localhost:7474

# Check if APOC is installed
docker exec channex-neo4j cypher-shell -u neo4j -p channex123 \
  "RETURN apoc.version()"
```

### Sync failures
- Ensure Supabase credentials are correct in `.env`
- Check that Supabase project has data in `channex_knowledge` schema
- Verify Neo4j is running and accessible

## Advanced Usage

### Custom Sync
```typescript
import { Neo4jSync } from './src/sync/neo4j-sync';

const sync = new Neo4jSync();

// Sync only specific data
await sync.connect();
await sync.syncEndpoints();
await sync.syncDataModels();
await sync.close();
```

### Direct Cypher Queries
```typescript
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'channex123')
);

const session = driver.session();
const result = await session.run(
  'MATCH (n:Endpoint) RETURN n LIMIT $limit',
  { limit: 10 }
);
```

## Maintenance

### Backup Neo4j
```bash
# Export data
docker exec channex-neo4j neo4j-admin database dump neo4j --to-path=/data

# Copy backup locally
docker cp channex-neo4j:/data/neo4j.dump ./backups/
```

### Clear all data
```bash
# Stop and remove volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Next Steps

1. Run initial sync to populate Neo4j
2. Explore data using Neo4j Browser
3. Test example queries
4. Build custom graph traversals for your use case
5. Integrate with the main Channex Knowledge Graph agent