import { config } from 'dotenv';
import { ChannexCodingAgent } from '../src/agent/channexCodingAgent';

config();

async function demonstrateAgent() {
  console.log('🤖 Channex Coding Agent Demo\n');
  
  const agent = new ChannexCodingAgent();
  
  // Example 1: Ask about creating a property
  console.log('1️⃣ Question: How do I create a property in Channex?\n');
  
  try {
    const answer = await agent.answerQuestion(
      'How do I create a property in Channex?'
    );
    
    console.log('Answer:', answer.answer);
    console.log('Confidence:', answer.confidence);
    console.log('Sources:', answer.sources.length);
  } catch (error) {
    console.log('Demo answer: To create a property, use POST /api/v1/properties');
  }
  
  // Example 2: Generate code for booking management
  console.log('\n2️⃣ Generate code for: Create a booking\n');
  
  try {
    const code = await agent.generateCode(
      'create a new booking',
      'typescript'
    );
    
    console.log('Generated code:');
    console.log(code);
  } catch (error) {
    console.log('Demo code:');
    console.log(`
async function createBooking(propertyId: string, data: any) {
  const response = await fetch(\`\${CHANNEX_API_URL}/api/v1/bookings\`, {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.CHANNEX_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      property_id: propertyId,
      ...data
    })
  });
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return response.json();
}
    `);
  }
  
  // Example 3: Show learning capability
  console.log('\n3️⃣ Self-improvement example:\n');
  
  console.log('When the agent successfully calls an API:');
  console.log('- It stores the request/response pattern');
  console.log('- It tracks success rates');
  console.log('- It learns from examples');
  console.log('- Future code generation improves');
  
  // Example 4: Show available endpoints
  console.log('\n4️⃣ Available Channex endpoints in knowledge graph:\n');
  
  const endpoints = [
    'GET /api/v1/properties',
    'POST /api/v1/properties',
    'PUT /api/v1/properties/:id',
    'DELETE /api/v1/properties/:id',
    'GET /api/v1/bookings',
    'POST /api/v1/bookings',
    'PUT /api/v1/bookings/:booking_id',
    'GET /api/v1/room_types',
    'POST /api/v1/ari',
    '...and 14 more endpoints'
  ];
  
  endpoints.forEach(ep => console.log(`  - ${ep}`));
  
  console.log('\n✨ Agent is ready to help build your Channex proxy API!');
}

// Integration examples
console.log(`
📚 Integration Options:

1. MCP Server (for Claude Desktop):
   - Add to Claude config: ~/.claude/claude_desktop_config.json
   - Agent gets direct access to search tools

2. API Integration:
   - Import ChannexCodingAgent class
   - Use methods like answerQuestion() and generateCode()

3. LangChain:
   - Use SupabaseVectorStore with kg_doc_chunks table
   - Build RAG chains with Channex context

4. Custom Integration:
   - Direct Supabase queries to knowledge tables
   - Build your own agent logic

Run 'npm run build' to compile the MCP server!
`);

demonstrateAgent().catch(console.error);