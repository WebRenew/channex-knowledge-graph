import { config } from 'dotenv';
import { SupabaseStorage } from './src/storage/supabaseStorage';

// Load environment variables
config();

async function clearSupabaseData() {
  console.log('🚀 Starting Supabase data clearing process...\n');
  
  try {
    // Get credentials from environment variables
    const dbUrl = process.env.KNOWLEDGE_DB_URL;
    const serviceKey = process.env.KNOWLEDGE_DB_SERVICE_KEY;
    
    if (!dbUrl || !serviceKey) {
      throw new Error('Missing required environment variables: KNOWLEDGE_DB_URL or KNOWLEDGE_DB_SERVICE_KEY');
    }
    
    console.log('📋 Environment variables loaded successfully');
    console.log(`📍 Database URL: ${dbUrl.substring(0, 50)}...`);
    
    // Initialize SupabaseStorage
    console.log('\n🔌 Connecting to Supabase...');
    const storage = new SupabaseStorage(dbUrl, serviceKey);
    console.log('✅ Connected to Supabase successfully');
    
    // Get statistics before clearing
    console.log('\n📊 Getting table statistics before clearing...');
    const beforeStats = await storage.getStatistics();
    console.log('📈 Current data statistics:');
    for (const [table, count] of Object.entries(beforeStats)) {
      console.log(`   - ${table}: ${count} records`);
    }
    
    // Clear all data
    console.log('\n🗑️  Clearing all data from tables...');
    await storage.clearAllData();
    console.log('✅ All data cleared successfully');
    
    // Get statistics after clearing
    console.log('\n📊 Verifying tables are empty...');
    const afterStats = await storage.getStatistics();
    console.log('📈 Post-clearing statistics:');
    
    let allEmpty = true;
    for (const [table, count] of Object.entries(afterStats)) {
      console.log(`   - ${table}: ${count} records`);
      if (count > 0) {
        allEmpty = false;
      }
    }
    
    if (allEmpty) {
      console.log('\n✅ SUCCESS: All tables are now empty!');
    } else {
      console.log('\n⚠️  WARNING: Some tables still contain data. Please check the logs above.');
    }
    
    // Summary
    console.log('\n📋 Summary:');
    console.log('============');
    for (const [table, beforeCount] of Object.entries(beforeStats)) {
      const afterCount = afterStats[table] || 0;
      const cleared = beforeCount - afterCount;
      console.log(`${table}: Cleared ${cleared} records (${beforeCount} → ${afterCount})`);
    }
    
  } catch (error) {
    console.error('\n❌ Error clearing Supabase data:', error);
    process.exit(1);
  }
}

// Run the script
clearSupabaseData()
  .then(() => {
    console.log('\n🎉 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });