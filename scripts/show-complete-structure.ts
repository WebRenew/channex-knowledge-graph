import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'channex123'
  )
);

async function showCompleteStructure() {
  const session = driver.session();
  
  try {
    console.log('\n🎨 Complete Graph Structure with Groups:\n');
    
    // Count all entities
    const counts = await session.run(`
      MATCH (n:DomainEntity)
      RETURN n.name as Entity, n.level as Level, n.description as Description
      ORDER BY n.level, n.name
    `);
    
    console.log('📊 All Domain Entities:');
    counts.records.forEach(record => {
      console.log(`\n   ${record.get('Entity')}:`);
      console.log(`   ${record.get('Description')}`);
    });
    
    // Show the complete hierarchy
    console.log('\n\n🏗️  Complete Hierarchy:');
    console.log('   Group (optional - for multi-property management)');
    console.log('     └── Property');
    console.log('           ├── RoomType');
    console.log('           │     └── RatePlan');
    console.log('           ├── Message');
    console.log('           ├── Booking');
    console.log('           └── Channel (connected via mapping)');
    
    // Count relationships
    const relCounts = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) as RelType, count(r) as Count
      ORDER BY Count DESC
    `);
    
    console.log('\n\n📊 Relationship Summary:');
    relCounts.records.forEach(record => {
      console.log(`   ${record.get('RelType')}: ${record.get('Count')}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

showCompleteStructure();