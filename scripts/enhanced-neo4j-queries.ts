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
  title: string;
  description: string;
  query: string;
}

const queries: QueryExample[] = [
  {
    title: '🏠 Domain Hierarchy',
    description: 'Show the complete property hierarchy structure',
    query: `
      MATCH path = (p:Property)-[:HAS_CHILD*]->(child)
      RETURN p.name as Entity, 
             collect(distinct child.name) as Children,
             length(path) as Depth
      ORDER BY Depth
    `
  },
  {
    title: '🔗 API Endpoints by Domain',
    description: 'List all endpoints grouped by the domain entity they operate on',
    query: `
      MATCH (e:APIEndpoint)-[:OPERATES_ON]->(d:DomainEntity)
      WITH d.name as Domain, collect({
        method: e.method,
        path: e.path,
        description: e.description
      }) as endpoints
      RETURN Domain, size(endpoints) as EndpointCount, endpoints
      ORDER BY Domain
    `
  },
  {
    title: '📊 Availability vs Restrictions',
    description: 'Show how availability and restrictions are scoped differently',
    query: `
      MATCH (av:Availability)-[:SCOPED_TO]->(rt:RoomType)
      MATCH (res:Restriction)-[:SCOPED_TO]->(rp:RatePlan)
      RETURN 
        'Availability' as Concept,
        'RoomType' as ScopedTo,
        av.api_resource as Endpoint
      UNION
      MATCH (res:Restriction)-[:SCOPED_TO]->(rp:RatePlan)
      RETURN 
        'Restrictions' as Concept,
        'RatePlan' as ScopedTo,
        res.api_resource as Endpoint
    `
  },
  {
    title: '🚀 Property Setup Flow',
    description: 'Show the complete property setup workflow',
    query: `
      MATCH (pattern:APIPattern {name: 'Property Setup Flow'})-[:HAS_STEP]->(step:APIStep)
      RETURN step.order as Step, 
             step.action as Action, 
             step.endpoint as Endpoint,
             step.required_data as RequiredData,
             step.depends_on as DependsOn
      ORDER BY step.order
    `
  },
  {
    title: '🔄 ARI Update Pattern',
    description: 'Show how to update availability and restrictions',
    query: `
      MATCH (pattern:APIPattern {name: 'ARI Update Pattern'})-[:INCLUDES]->(step:APIStep)
      RETURN step.action as Action,
             step.endpoint as Endpoint,
             step.scope as Scope,
             step.data_structure as DataStructure
    `
  },
  {
    title: '🎯 Find endpoints for a specific task',
    description: 'Example: Find all endpoints needed to manage room types',
    query: `
      MATCH (e:APIEndpoint)-[:OPERATES_ON]->(d:DomainEntity {name: 'RoomType'})
      RETURN e.method as Method, 
             e.path as Path,
             e.description as Description,
             CASE 
               WHEN e.method = 'GET' THEN 'Read'
               WHEN e.method = 'POST' THEN 'Create'
               WHEN e.method = 'PUT' THEN 'Update'
               WHEN e.method = 'DELETE' THEN 'Delete'
             END as Operation
      ORDER BY Operation
    `
  },
  {
    title: '🔍 Trace entity relationships',
    description: 'Show how entities relate to each other',
    query: `
      MATCH (b:Booking)-[r]->(entity:DomainEntity)
      RETURN 'Booking' as From, 
             type(r) as Relationship, 
             entity.name as To,
             entity.api_resource as APIResource
    `
  },
  {
    title: '📈 API Coverage Report',
    description: 'Show which domain entities have full CRUD operations',
    query: `
      MATCH (e:APIEndpoint)-[:OPERATES_ON]->(d:DomainEntity)
      WITH d.name as Domain, collect(distinct e.method) as Methods
      RETURN Domain,
             Methods,
             CASE
               WHEN 'GET' IN Methods AND 'POST' IN Methods AND 'PUT' IN Methods AND 'DELETE' IN Methods 
               THEN '✅ Full CRUD'
               WHEN 'GET' IN Methods AND 'POST' IN Methods 
               THEN '⚠️ Read/Create only'
               ELSE '❌ Limited operations'
             END as Coverage
      ORDER BY Domain
    `
  }
];

async function runQuery(session: any, queryExample: QueryExample) {
  console.log('\n' + '='.repeat(60));
  console.log(`🔍 ${queryExample.title}`);
  console.log(`📝 ${queryExample.description}`);
  console.log('='.repeat(60));

  try {
    const result = await session.run(queryExample.query);
    
    if (result.records.length === 0) {
      console.log('No results found');
      return;
    }

    console.log(`Found ${result.records.length} results:\n`);
    
    result.records.forEach((record: any, index: number) => {
      console.log(`${index + 1}.`, record.toObject());
    });
  } catch (error) {
    console.error('Query failed:', error);
  }
}

async function main() {
  const session = driver.session();
  
  try {
    console.log('🚀 Running Enhanced Neo4j Queries\n');
    
    // Check connection
    await session.run('RETURN 1');
    console.log('✅ Connected to Neo4j\n');

    // Run all queries
    for (const query of queries) {
      await runQuery(session, query);
    }

    // Interactive mode
    if (process.argv.includes('--interactive')) {
      console.log('\n📝 Interactive mode. Enter Cypher queries (type "exit" to quit):');
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const askQuery = () => {
        readline.question('\nneo4j> ', async (query: string) => {
          if (query.toLowerCase() === 'exit') {
            readline.close();
            await session.close();
            await driver.close();
            return;
          }

          try {
            const result = await session.run(query);
            console.log(`\nFound ${result.records.length} results:`);
            result.records.forEach((record: any) => {
              console.log(record.toObject());
            });
          } catch (error: any) {
            console.error('Query error:', error.message);
          }

          askQuery();
        });
      };

      askQuery();
    } else {
      await session.close();
      await driver.close();
    }

  } catch (error) {
    console.error('Failed to connect:', error);
    await session.close();
    await driver.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}