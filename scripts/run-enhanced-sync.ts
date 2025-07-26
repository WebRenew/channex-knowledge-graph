#!/usr/bin/env tsx

import { EnhancedNeo4jSync } from '../src/sync/enhanced-neo4j-sync';

async function main() {
  console.log('🚀 Starting Enhanced Neo4j Sync');
  console.log('================================\n');
  
  const sync = new EnhancedNeo4jSync();
  
  try {
    await sync.fullSync();
    
    console.log('\n✨ Sync completed! Your Neo4j graph now contains:');
    console.log('\n1. Domain Hierarchy:');
    console.log('   Property');
    console.log('     └── RoomType (property_id required)');
    console.log('           └── RatePlan (property_id, room_type_id required)');
    
    console.log('\n2. Domain Concepts:');
    console.log('   - Availability → scoped to RoomType');
    console.log('   - Restrictions → scoped to RatePlan');
    
    console.log('\n3. API Patterns:');
    console.log('   - Property Setup Flow');
    console.log('   - ARI Update Pattern');
    
    console.log('\n📝 Example queries to try:');
    console.log('   - MATCH (p:Property)-[:HAS_CHILD*]->(child) RETURN p, child');
    console.log('   - MATCH (e:APIEndpoint)-[:OPERATES_ON]->(d:DomainEntity) RETURN e, d');
    console.log('   - MATCH (pattern:APIPattern)-[:HAS_STEP]->(step) RETURN pattern, step ORDER BY step.order');
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

main();