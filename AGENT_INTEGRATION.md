# Integrating Channex Knowledge Graph with AI Agents

## Overview
The Channex Knowledge Graph provides contextual information about the API to power self-improving coding agents.

## Integration Methods

### 1. MCP Server (Recommended for Claude/ChatGPT)
Add to your Claude Desktop config:
```json
{
  "mcpServers": {
    "channex-knowledge": {
      "command": "node",
      "args": ["path/to/channex-knowledge-graph/dist/mcp-server.js"]
    }
  }
}
```

Then the agent can use tools like:
- `search_endpoints` - Find API endpoints
- `get_endpoint_details` - Get endpoint specifications
- `search_documentation` - Search docs semantically
- `get_data_model` - Get model schemas
- `find_related_endpoints` - Discover relationships

### 2. Direct API Integration
```typescript
import { ChannexCodingAgent } from './agent/channexCodingAgent';

const agent = new ChannexCodingAgent();

// Answer questions
const answer = await agent.answerQuestion(
  "How do I create a booking in Channex?"
);

// Generate code
const code = await agent.generateCode(
  "create a new property with rooms",
  "typescript"
);

// Learn from success
await agent.learnFromSuccess(
  "/api/v1/properties",
  requestData,
  responseData
);
```

### 3. LangChain Integration
```typescript
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

const vectorStore = new SupabaseVectorStore(
  new OpenAIEmbeddings(),
  {
    client: supabaseClient,
    tableName: 'kg_doc_chunks',
    queryName: 'kg_vector_search'
  }
);

// Use in a chain
const retrievalChain = RetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever()
);
```

### 4. Custom Agent System Prompts
Include knowledge graph context in system prompts:

```
You are a Channex API expert with access to a knowledge graph containing:
- 23 API endpoints with full specifications
- 10 data models with relationships
- 1,127 documentation chunks
- Real examples and patterns

When building the Channex proxy API:
1. Use search_endpoints to find the correct endpoint
2. Use get_data_model to understand request/response schemas
3. Use find_related_endpoints to handle complex workflows
4. Learn from successful patterns stored in the graph
```

## Self-Improvement Loop

1. **Query Phase**: Agent searches knowledge graph for context
2. **Generation Phase**: Agent creates code based on findings
3. **Testing Phase**: Code is tested against actual API
4. **Learning Phase**: Successful patterns are stored back
5. **Evolution**: Knowledge graph grows with each interaction

## Example Agent Workflow

```typescript
// 1. User asks: "Create a function to manage room availability"

// 2. Agent searches knowledge graph
const endpoints = await searchEndpoints("room availability");
// Finds: PUT /api/v1/ari

// 3. Agent gets details
const ariDetails = await getEndpointDetails("/api/v1/ari");
// Gets: parameters, request schema, examples

// 4. Agent generates code
const code = generateCodeFromTemplate(ariDetails);

// 5. Test and learn
if (testSuccessful) {
  await learnFromSuccess(endpoint, request, response);
}
```

## Key Benefits

1. **Contextual Understanding**: Agent knows API structure
2. **Relationship Awareness**: Understands entity connections
3. **Example-Based Learning**: Can reference real patterns
4. **Self-Improvement**: Learns from successes
5. **Multi-Format Support**: Works with various agent frameworks

## Quick Start

1. Build and install MCP server:
```bash
npm run build
npm link
```

2. Add to agent configuration
3. Start building with context!

The knowledge graph turns your coding agent from a generic assistant into a Channex API expert.