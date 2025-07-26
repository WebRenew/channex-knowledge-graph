#!/usr/bin/env tsx

import { Neo4jSync } from '../src/sync/neo4j-sync';

async function main() {
  console.log('🚀 Starting Neo4j sync process...');
  
  const sync = new Neo4jSync();
  
  try {
    await sync.fullSync();
    console.log('✅ Sync completed successfully!');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

main();