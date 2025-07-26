import { config } from 'dotenv';
import { SupabaseStorage } from '../src/storage/supabaseStorage';
import { EmbeddingGenerator } from '../src/embeddings/generator';

config();

/**
 * Example queries demonstrating the knowledge graph capabilities
 */
async function runExampleQueries() {
  const storage = new SupabaseStorage(
    process.env.KNOWLEDGE_DB_URL!,
    process.env.KNOWLEDGE_DB_SERVICE_KEY!
  );
  
  const embeddingGen = new EmbeddingGenerator(
    process.env.OPENAI_API_KEY || '',
    process.env.OPENAI_MODEL || 'text-embedding-3-small'
  );

  console.log('🔍 Channex Knowledge Graph Query Examples\n');

  // Example 1: Vector search for similar content
  console.log('1️⃣ Vector Search Example');
  console.log('   Query: "How to create a property in Channex?"');
  
  try {
    const queryEmbedding = await embeddingGen.generateEmbedding(
      "How to create a property in Channex?"
    );
    
    const results = await storage.vectorSearch(
      queryEmbedding,
      0.7,  // threshold
      5,    // limit
      'all' // search type
    );
    
    console.log(`   Found ${results.length} relevant chunks:`);
    results.forEach((result, idx) => {
      console.log(`   ${idx + 1}. ${result.content.substring(0, 100)}...`);
      console.log(`      Similarity: ${(result.similarity * 100).toFixed(1)}%`);
    });
  } catch (error) {
    console.log('   ⚠️  Vector search requires OpenAI API key');
  }

  // Example 2: Find related endpoints
  console.log('\n2️⃣ Related Endpoints Example');
  console.log('   Finding endpoints related to: /api/v1/properties/:id');
  
  try {
    const related = await storage.findRelatedEndpoints(
      '/api/v1/properties/:id',
      2 // depth
    );
    
    if (related.length > 0) {
      console.log(`   Found ${related.length} related endpoints:`);
      related.forEach(endpoint => {
        console.log(`   - ${endpoint.method} ${endpoint.path}`);
        console.log(`     Relationship: ${endpoint.relationship_type}, Distance: ${endpoint.distance}`);
      });
    } else {
      console.log('   No related endpoints found (data needs to be parsed first)');
    }
  } catch (error) {
    console.log('   Error:', error.message);
  }

  // Example 3: Direct database queries
  console.log('\n3️⃣ Direct Query Examples');
  
  // Get all endpoints in a category
  const { data: endpoints } = await storage.client
    .from('endpoints')
    .select('method, path, description')
    .eq('category', 'properties')
    .limit(5);
  
  if (endpoints && endpoints.length > 0) {
    console.log(`   Properties endpoints (${endpoints.length} found):`);
    endpoints.forEach(ep => {
      console.log(`   - ${ep.method} ${ep.path}`);
      if (ep.description) {
        console.log(`     ${ep.description}`);
      }
    });
  } else {
    console.log('   No endpoints found (run npm run parse first)');
  }

  // Example 4: Pattern matching
  console.log('\n4️⃣ API Pattern Example');
  
  const { data: patterns } = await storage.client
    .from('api_patterns')
    .select('pattern_name, description, implementation');
  
  if (patterns && patterns.length > 0) {
    console.log(`   Available API patterns:`);
    patterns.forEach(pattern => {
      console.log(`   - ${pattern.pattern_name}: ${pattern.description}`);
    });
  }

  // Example 5: Graph traversal (conceptual)
  console.log('\n5️⃣ Graph Traversal Example (Conceptual)');
  console.log('   Starting from: Property model');
  console.log('   Possible paths:');
  console.log('   - Property → has many → RoomTypes');
  console.log('   - Property → has many → Bookings');
  console.log('   - Property → belongs to → Group');
  console.log('   - Property → connected to → Channels');
  
  // Get statistics
  console.log('\n📊 Knowledge Graph Statistics:');
  const stats = await storage.getStatistics();
  Object.entries(stats).forEach(([table, count]) => {
    console.log(`   - ${table}: ${count} records`);
  });
}

// Helper function to demonstrate workflow queries
async function findWorkflow(storage: SupabaseStorage, workflowName: string) {
  const { data } = await storage.client
    .from('workflows')
    .select('*')
    .ilike('name', `%${workflowName}%`)
    .single();
  
  if (data) {
    console.log(`\n🔄 Workflow: ${data.name}`);
    console.log(`   Description: ${data.description}`);
    console.log(`   Steps: ${data.steps.length}`);
    console.log(`   Required endpoints: ${data.required_endpoints.length}`);
  }
}

// Run examples
runExampleQueries().catch(console.error);