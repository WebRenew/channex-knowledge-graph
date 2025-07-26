#!/usr/bin/env tsx

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

interface QueryExample {
  name: string;
  description: string;
  query: string;
  parameters?: Record<string, any>;
}

const queries: QueryExample[] = [
  {
    name: 'Find all Property endpoints',
    description: 'Get all API endpoints related to properties',
    query: `
      MATCH (e:Endpoint)
      WHERE e.path CONTAINS 'properties' OR e.category = 'properties'
      RETURN e.method as method, e.path as path, e.description as description
      ORDER BY e.method, e.path
    `
  },
  {
    name: 'Property creation workflow',
    description: 'Find the complete flow for creating a property with rooms and rates',
    query: `
      MATCH (p:DataModel {name: 'Property'})
      MATCH (rt:DataModel {name: 'RoomType'})
      MATCH (rp:DataModel {name: 'RatePlan'})
      MATCH (e1:Endpoint)-[:ACCEPTS]->(p)
      MATCH (e2:Endpoint)-[:ACCEPTS]->(rt)
      MATCH (e3:Endpoint)-[:ACCEPTS]->(rp)
      RETURN 
        e1.path as property_endpoint,
        e2.path as room_type_endpoint,
        e3.path as rate_plan_endpoint
    `
  },
  {
    name: 'Model relationships',
    description: 'Show how data models are connected',
    query: `
      MATCH (m1:DataModel)-[r]-(m2:DataModel)
      RETURN m1.name as from, type(r) as relationship, m2.name as to
      ORDER BY m1.name
    `
  },
  {
    name: 'Endpoint dependencies',
    description: 'Find endpoints that depend on each other through shared models',
    query: `
      MATCH (e1:Endpoint)-[:RETURNS]->(m:DataModel)<-[:ACCEPTS]-(e2:Endpoint)
      WHERE e1 <> e2
      RETURN 
        e1.method + ' ' + e1.path as source_endpoint,
        m.name as shared_model,
        e2.method + ' ' + e2.path as target_endpoint
      LIMIT 10
    `
  },
  {
    name: 'Workflow to endpoint mapping',
    description: 'See which endpoints are used by which workflows',
    query: `
      MATCH (w:Workflow)-[:USES_ENDPOINT]->(e:Endpoint)
      RETURN 
        w.name as workflow,
        w.category as category,
        collect(e.method + ' ' + e.path) as endpoints
      ORDER BY w.category, w.name
    `
  },
  {
    name: 'Property hierarchy',
    description: 'Show the complete property structure',
    query: `
      MATCH path = (p:Property)-[:HAS_ROOM_TYPE]->(rt:RoomType)-[:HAS_RATE_PLAN]->(rp:RatePlan)
      RETURN p.name as property, rt.name as room_type, rp.name as rate_plan
      LIMIT 10
    `
  },
  {
    name: 'API categories',
    description: 'Count endpoints by category',
    query: `
      MATCH (e:Endpoint)
      RETURN e.category as category, count(e) as endpoint_count
      ORDER BY endpoint_count DESC
    `
  },
  {
    name: 'Authentication methods',
    description: 'See which authentication methods are used',
    query: `
      MATCH (e:Endpoint)
      RETURN e.authentication as auth_method, count(e) as count
      ORDER BY count DESC
    `
  },
  {
    name: 'Complex workflow paths',
    description: 'Find multi-step paths through the API',
    query: `
      MATCH path = (start:Endpoint {method: 'POST'})-[:RETURNS]->(m1:DataModel)
        <-[:ACCEPTS|RETURNS*1..3]-(end:Endpoint)
      WHERE start <> end AND start.category = 'properties'
      RETURN 
        start.path as starting_point,
        [n in nodes(path) | 
          CASE 
            WHEN n:Endpoint THEN n.method + ' ' + n.path
            WHEN n:DataModel THEN '(' + n.name + ')'
            ELSE labels(n)[0]
          END
        ] as path_steps
      LIMIT 5
    `
  },
  {
    name: 'Find related endpoints',
    description: 'Given an endpoint, find related endpoints through models',
    query: `
      MATCH (e:Endpoint {path: $endpoint_path})
      MATCH (e)-[:RETURNS|ACCEPTS]-(m:DataModel)-[:RETURNS|ACCEPTS]-(related:Endpoint)
      WHERE related <> e
      RETURN DISTINCT
        related.method as method,
        related.path as path,
        related.description as description
      LIMIT 10
    `,
    parameters: { endpoint_path: '/api/v1/properties/{property_id}' }
  }
];

async function runQuery(query: QueryExample) {
  const session = driver.session();
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🔍 ${query.name}`);
    console.log(`📝 ${query.description}`);
    console.log(`${'='.repeat(60)}`);
    
    const result = await session.run(query.query, query.parameters || {});
    
    if (result.records.length === 0) {
      console.log('No results found');
    } else {
      console.log(`Found ${result.records.length} results:\n`);
      result.records.forEach((record, index) => {
        console.log(`${index + 1}.`, record.toObject());
      });
    }
  } catch (error) {
    console.error('Error running query:', error);
  } finally {
    await session.close();
  }
}

async function runAllQueries() {
  console.log('🚀 Running example Neo4j queries for Channex Knowledge Graph\n');
  
  try {
    // Test connection
    const session = driver.session();
    await session.run('RETURN 1');
    await session.close();
    console.log('✅ Connected to Neo4j\n');
    
    // Run all queries
    for (const query of queries) {
      await runQuery(query);
    }
    
  } catch (error) {
    console.error('❌ Failed to connect to Neo4j:', error);
    console.log('\nMake sure Neo4j is running:');
    console.log('  docker-compose up -d');
  } finally {
    await driver.close();
  }
}

// Interactive mode
async function runInteractive() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\n📊 Neo4j Query Explorer - Interactive Mode\n');
  console.log('Available queries:');
  queries.forEach((q, i) => {
    console.log(`${i + 1}. ${q.name}`);
  });
  console.log('\nEnter a number to run a query, or "all" to run all queries, or "exit" to quit.\n');
  
  const askQuestion = () => {
    readline.question('Query> ', async (answer) => {
      if (answer.toLowerCase() === 'exit') {
        await driver.close();
        readline.close();
        return;
      }
      
      if (answer.toLowerCase() === 'all') {
        await runAllQueries();
      } else {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < queries.length) {
          await runQuery(queries[index]);
        } else {
          console.log('Invalid query number');
        }
      }
      
      askQuestion();
    });
  };
  
  askQuestion();
}

// Check if running with --interactive flag
if (process.argv.includes('--interactive')) {
  runInteractive();
} else {
  runAllQueries()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}