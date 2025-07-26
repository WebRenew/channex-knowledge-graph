import { config } from 'dotenv';
import { SupabaseStorage } from '../src/storage/supabaseStorage';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

async function testConnection() {
  console.log('🧪 Testing Channex Knowledge Graph Setup\n');
  
  // Test basic Supabase connection
  console.log('1️⃣ Testing Supabase connection...');
  try {
    // Extract the project ref from the database URL
    const dbUrl = process.env.KNOWLEDGE_DB_URL!;
    const projectRef = dbUrl.match(/@db\.([^.]+)\.supabase\.co/)?.[1];
    
    if (!projectRef) {
      throw new Error('Could not extract project reference from database URL');
    }
    
    const supabaseUrl = `https://${projectRef}.supabase.co`;
    const supabase = createClient(
      supabaseUrl,
      process.env.KNOWLEDGE_DB_ANON_KEY!
    );
    
    const { data, error } = await supabase
      .from('kg_api_patterns')  // Use public view
      .select('pattern_name')
      .limit(1);
    
    if (error) throw error;
    console.log('   ✅ Supabase connection successful');
    console.log(`   📊 Found ${data?.length || 0} API patterns`);
  } catch (error) {
    console.error('   ❌ Supabase connection failed:', error);
  }
  
  // Test storage class
  console.log('\n2️⃣ Testing Storage class...');
  try {
    const storage = new SupabaseStorage(
      process.env.KNOWLEDGE_DB_URL!,
      process.env.KNOWLEDGE_DB_SERVICE_KEY!
    );
    
    const stats = await storage.getStatistics();
    console.log('   ✅ Storage class initialized');
    console.log('   📊 Current database statistics:');
    Object.entries(stats).forEach(([table, count]) => {
      console.log(`      - ${table}: ${count} records`);
    });
  } catch (error) {
    console.error('   ❌ Storage class test failed:', error);
  }
  
  // Test vector search function
  console.log('\n3️⃣ Testing database access...');
  try {
    const storage = new SupabaseStorage(
      process.env.KNOWLEDGE_DB_URL!,
      process.env.KNOWLEDGE_DB_SERVICE_KEY!
    );
    
    // Try to query the doc_chunks table directly
    const { data, error } = await storage.client
      .from('kg_doc_chunks')
      .select('id, content')
      .limit(1);
    
    if (error) throw error;
    
    console.log('   ✅ Database access works');
    console.log(`   📊 Doc chunks table accessible (${data?.length || 0} records found)`);
  } catch (error) {
    console.error('   ❌ Database access test failed:', error);
  }
  
  // Check environment variables
  console.log('\n4️⃣ Checking environment variables...');
  const requiredEnvVars = [
    'KNOWLEDGE_DB_URL',
    'KNOWLEDGE_DB_SERVICE_KEY',
    'OPENAI_API_KEY'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length === 0) {
    console.log('   ✅ All required environment variables are set');
  } else {
    console.log('   ⚠️  Missing environment variables:');
    missingVars.forEach(varName => {
      console.log(`      - ${varName}`);
    });
  }
  
  // Test sample parsing
  console.log('\n5️⃣ Testing documentation parser...');
  try {
    const { ChannexDocParser } = await import('../src/parser/channexParser');
    
    const sampleContent = `
# Properties API

## Get Property Details

Retrieve details for a specific property.

**Endpoint:** GET /api/v1/properties/:property_id

**Parameters:**
- property_id (required): The unique identifier of the property

**Response:**
\`\`\`json
{
  "property": {
    "id": "123",
    "title": "Beautiful Beach House",
    "address": "123 Ocean Drive"
  }
}
\`\`\`

**Errors:**
- 404: Property not found
- 401: Unauthorized
    `;
    
    const parser = new ChannexDocParser(sampleContent, 'test.md');
    const endpoints = parser.parseEndpoints();
    
    console.log('   ✅ Parser works correctly');
    console.log(`   📊 Parsed ${endpoints.length} endpoints from sample`);
    
    if (endpoints.length > 0) {
      console.log('   📝 Sample endpoint:', {
        method: endpoints[0].method,
        path: endpoints[0].path,
        parameters: endpoints[0].parameters.length
      });
    }
  } catch (error) {
    console.error('   ❌ Parser test failed:', error);
  }
  
  console.log('\n✨ Setup test complete!');
}

// Run the test
testConnection().catch(console.error);