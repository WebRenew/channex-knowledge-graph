#!/usr/bin/env node

import neo4j, { Driver, Session } from 'neo4j-driver';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Neo4j connection details
const NEO4J_URI = process.env.NEO4J_URI || 'neo4j://localhost:7687';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'vfazpUJM2HFV2VWN5';

async function clearDatabase(): Promise<void> {
  let driver: Driver | null = null;
  let session: Session | null = null;

  try {
    console.log('🔌 Connecting to Neo4j...');
    console.log(`   URI: ${NEO4J_URI}`);
    console.log(`   User: ${NEO4J_USER}`);

    // Create driver
    driver = neo4j.driver(
      NEO4J_URI,
      neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
    );

    // Verify connectivity
    await driver.verifyConnectivity();
    console.log('✅ Connected to Neo4j successfully');

    // Create session
    session = driver.session();

    // Count existing nodes and relationships
    console.log('\n📊 Checking current database state...');
    
    const countResult = await session.run(`
      MATCH (n)
      OPTIONAL MATCH (n)-[r]-()
      RETURN count(DISTINCT n) as nodeCount, count(DISTINCT r) as relationshipCount
    `);
    
    const counts = countResult.records[0];
    const nodeCount = counts.get('nodeCount').toNumber();
    const relationshipCount = counts.get('relationshipCount').toNumber();
    
    console.log(`   Nodes: ${nodeCount}`);
    console.log(`   Relationships: ${relationshipCount}`);

    if (nodeCount === 0 && relationshipCount === 0) {
      console.log('\n✨ Database is already empty!');
      return;
    }

    // Clear all relationships and nodes
    console.log('\n🗑️  Clearing database...');
    
    // Delete all relationships first (required before deleting nodes)
    console.log('   Deleting all relationships...');
    const relResult = await session.run('MATCH ()-[r]-() DELETE r');
    console.log(`   ✅ Deleted ${relResult.summary.counters.updates().relationshipsDeleted} relationships`);

    // Delete all nodes
    console.log('   Deleting all nodes...');
    const nodeResult = await session.run('MATCH (n) DELETE n');
    console.log(`   ✅ Deleted ${nodeResult.summary.counters.updates().nodesDeleted} nodes`);

    // Verify the database is empty
    console.log('\n🔍 Verifying database is empty...');
    const verifyResult = await session.run(`
      MATCH (n)
      OPTIONAL MATCH (n)-[r]-()
      RETURN count(DISTINCT n) as nodeCount, count(DISTINCT r) as relationshipCount
    `);
    
    const finalCounts = verifyResult.records[0];
    const finalNodeCount = finalCounts.get('nodeCount').toNumber();
    const finalRelationshipCount = finalCounts.get('relationshipCount').toNumber();
    
    if (finalNodeCount === 0 && finalRelationshipCount === 0) {
      console.log('✅ Database successfully cleared!');
    } else {
      console.warn('⚠️  Warning: Database may not be completely empty');
      console.log(`   Remaining nodes: ${finalNodeCount}`);
      console.log(`   Remaining relationships: ${finalRelationshipCount}`);
    }

  } catch (error) {
    console.error('\n❌ Error clearing database:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      if ('code' in error) {
        console.error('   Code:', (error as any).code);
      }
    }
    process.exit(1);
  } finally {
    // Clean up
    if (session) {
      await session.close();
      console.log('\n🔒 Session closed');
    }
    if (driver) {
      await driver.close();
      console.log('🔒 Driver connection closed');
    }
  }
}

// Run the script
console.log('🚀 Neo4j Database Clear Script');
console.log('================================\n');

clearDatabase()
  .then(() => {
    console.log('\n✨ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });