# MCP Server Setup Guide

This guide explains how to configure and use the Channex Knowledge Graph as an MCP (Model Context Protocol) server.

## Configuration

### 1. For Claude Desktop App

Copy `.mcp.json.example` to your Claude Desktop configuration directory:

**macOS:**
```bash
cp .mcp.json.example ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
copy .mcp.json.example %APPDATA%\Claude\claude_desktop_config.json
```

Then edit the file to update:
- Path to `mcp-server.js`
- Your Supabase service key
- Neo4j credentials (if different from defaults)

### 2. For Claude CLI (claude-code)

Run with the `--mcp` flag:

```bash
# From the project directory
KNOWLEDGE_DB_SERVICE_KEY="your-key" claude --mcp "node dist/mcp-server.js"

# Or with full path
KNOWLEDGE_DB_SERVICE_KEY="your-key" claude --mcp "node /path/to/channex-knowledge-graph/dist/mcp-server.js"
```

### 3. Environment Variables

The MCP server needs these environment variables:

```bash
# Required
KNOWLEDGE_DB_SERVICE_KEY=your-supabase-service-role-key

# Optional (defaults shown)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=channex123
```

## Available Tools

Once configured, you'll have access to these tools in Claude:

### Supabase Tools (Vector Search)
- `search_endpoints` - Search API endpoints by query, method, or category
- `get_endpoint_details` - Get full details for a specific endpoint
- `search_documentation` - Search through documentation chunks
- `get_data_model` - Get details about data models (Property, Booking, etc.)
- `find_related_endpoints` - Find endpoints related to a given endpoint

### Neo4j Tools (Graph Traversal)
- `graph_traversal` - Explore the knowledge graph from any node
- `find_workflow_path` - Find paths between endpoints
- `get_property_hierarchy` - Get property structure with rooms and rates

## Example Usage

Once the MCP server is running, you can ask Claude:

```
"Search for all endpoints related to properties"
"Show me the workflow path from creating a property to adding rates"
"What data model does the booking endpoint return?"
"Find all POST endpoints in the bookings category"
"Show me the property hierarchy for 'Sample Hotel'"
```

## Prerequisites

1. Build the MCP server:
   ```bash
   npm run build
   # or just build the MCP server
   npx tsc src/mcp-server.ts --outDir dist --esModuleInterop --skipLibCheck
   ```

2. Ensure Neo4j is running (for graph tools):
   ```bash
   npm run neo4j:up
   ```

3. Have your Supabase service key ready

## Troubleshooting

### MCP server won't start
- Check that `dist/mcp-server.js` exists
- Verify environment variables are set
- Check Neo4j is running if using graph tools

### No results from queries
- Ensure data has been parsed: `npm run parse`
- Sync to Neo4j: `npm run sync:neo4j`
- Check Supabase credentials are correct

### Connection errors
- Verify Neo4j is accessible at localhost:7687
- Check Supabase URL and keys are correct
- Look at server logs for detailed errors

## Development

To modify the MCP server:
1. Edit `src/mcp-server.ts`
2. Rebuild: `npm run build`
3. Restart Claude to pick up changes