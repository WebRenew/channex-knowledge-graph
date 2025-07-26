import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

async function verifyNeo4j() {
  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'channex123'
    )
  );

  const session = driver.session();

  try {
    console.log('🔍 Verifying Neo4j Database Contents\n');

    // Count nodes by type
    const nodeTypes = ['Endpoint', 'DataModel', 'Workflow', 'APIPattern', 'ErrorPattern'];
    
    for (const nodeType of nodeTypes) {
      const result = await session.run(
        `MATCH (n:${nodeType}) RETURN count(n) as count`
      );
      const count = result.records[0]?.get('count').toNumber() || 0;
      console.log(`${nodeType} nodes: ${count}`);
    }

    console.log('\n📊 Sample Endpoints:');
    const endpoints = await session.run(
      'MATCH (e:Endpoint) RETURN e.method as method, e.path as path, e.category as category LIMIT 5'
    );
    
    endpoints.records.forEach(record => {
      console.log(`  ${record.get('method')} ${record.get('path')} (${record.get('category')})`);
    });

    console.log('\n📦 Sample Data Models:');
    const models = await session.run(
      'MATCH (m:DataModel) RETURN m.name as name LIMIT 5'
    );
    
    models.records.forEach(record => {
      console.log(`  - ${record.get('name')}`);
    });

    console.log('\n🔗 Relationships:');
    const relationships = await session.run(
      'MATCH ()-[r]->() RETURN type(r) as type, count(*) as count'
    );
    
    relationships.records.forEach(record => {
      console.log(`  ${record.get('type')}: ${record.get('count').toNumber()}`);
    });

  } finally {
    await session.close();
    await driver.close();
  }
}

verifyNeo4j().catch(console.error);