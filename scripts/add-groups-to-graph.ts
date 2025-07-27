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

async function addGroupsToGraph() {
  const session = driver.session();
  
  try {
    console.log('🔧 Adding Groups to Neo4j graph...\n');
    
    // Create the Group domain entity
    await session.run(`
      CREATE (g:DomainEntity:Group {
        name: 'Group',
        level: -1,
        description: 'Container for organizing multiple properties',
        api_resource: '/api/v1/groups',
        parent_required: false,
        full_description: 'Groups allow organizing multiple properties under a single entity. Used for hotel chains, property management companies, or any multi-property operation. Groups can have their own users and settings.'
      })
    `);
    console.log('✅ Created Group domain entity\n');
    
    // Create Group relationships
    await session.run(`
      MATCH (g:Group)
      MATCH (p:Property)
      CREATE (g)-[:CONTAINS {
        cardinality: 'one-to-many',
        description: 'A group can contain multiple properties'
      }]->(p)
      CREATE (p)-[:BELONGS_TO_GROUP {
        optional: true,
        field: 'group_id'
      }]->(g)
    `);
    console.log('✅ Created Group-Property relationships\n');
    
    // Create GroupUser entity (users at group level)
    await session.run(`
      CREATE (gu:DomainEntity:GroupUser {
        name: 'GroupUser',
        description: 'Users with access to all properties in a group',
        api_resource: '/api/v1/group_users',
        parent_required: true,
        parent_field: 'group_id',
        full_description: 'Users assigned at the group level have access to all properties within that group. Useful for managers overseeing multiple properties.'
      })
    `);
    
    // Create PropertyUser entity (users at property level)
    await session.run(`
      CREATE (pu:DomainEntity:PropertyUser {
        name: 'PropertyUser',
        description: 'Users with access to a specific property',
        api_resource: '/api/v1/property_users',
        parent_required: true,
        parent_field: 'property_id',
        full_description: 'Users assigned at the property level have access only to that specific property. Useful for property-specific staff.'
      })
    `);
    console.log('✅ Created User entities\n');
    
    // Create user relationships
    await session.run(`
      MATCH (gu:GroupUser)
      MATCH (g:Group)
      CREATE (gu)-[:BELONGS_TO]->(g)
      CREATE (g)-[:HAS_USERS]->(gu)
    `);
    
    await session.run(`
      MATCH (pu:PropertyUser)
      MATCH (p:Property)
      CREATE (pu)-[:BELONGS_TO]->(p)
      CREATE (p)-[:HAS_USERS]->(pu)
    `);
    console.log('✅ Created User relationships\n');
    
    // Update the hierarchy to show Group is above Property
    await session.run(`
      MATCH (g:Group)
      SET g.level = -1
      WITH g
      MATCH (p:Property)
      SET p.level = 0
    `);
    
    // Add group-related endpoints
    const groupEndpoints = [
      {
        path: '/api/v1/groups',
        method: 'GET',
        description: 'List all groups'
      },
      {
        path: '/api/v1/groups/:id',
        method: 'GET',
        description: 'Get group details'
      },
      {
        path: '/api/v1/groups',
        method: 'POST',
        description: 'Create a new group'
      },
      {
        path: '/api/v1/groups/:id',
        method: 'PUT',
        description: 'Update group information'
      }
    ];
    
    for (const endpoint of groupEndpoints) {
      await session.run(`
        MATCH (g:Group)
        MERGE (e:APIEndpoint {
          path: $path,
          method: $method
        })
        SET e.description = $description,
            e.category = 'groups'
        MERGE (e)-[:OPERATES_ON]->(g)
      `, endpoint);
    }
    console.log('✅ Mapped group endpoints\n');
    
    // Create a pattern for multi-property setup
    await session.run(`
      CREATE (pattern:APIPattern {
        name: 'Multi-Property Setup Flow',
        description: 'Setting up multiple properties under a group',
        order: 2
      })

      CREATE (step1:APIStep {
        order: 1,
        action: 'Create Group',
        endpoint: 'POST /api/v1/groups',
        required_data: ['name', 'settings']
      })

      CREATE (step2:APIStep {
        order: 2,
        action: 'Add Group Users',
        endpoint: 'POST /api/v1/group_users',
        required_data: ['group_id', 'user_email', 'role'],
        depends_on: 'group.id from step 1'
      })

      CREATE (step3:APIStep {
        order: 3,
        action: 'Create Properties with Group',
        endpoint: 'POST /api/v1/properties',
        required_data: ['title', 'currency', 'timezone', 'group_id'],
        depends_on: 'group.id from step 1',
        note: 'Properties inherit group settings'
      })

      CREATE (pattern)-[:HAS_STEP]->(step1)
      CREATE (pattern)-[:HAS_STEP]->(step2)
      CREATE (pattern)-[:HAS_STEP]->(step3)
      CREATE (step1)-[:NEXT]->(step2)
      CREATE (step2)-[:NEXT]->(step3)
    `);
    console.log('✅ Created Multi-Property Setup pattern\n');
    
    console.log('📊 Summary of changes:');
    console.log('   - Added Group domain entity (above Property level)');
    console.log('   - Added GroupUser and PropertyUser entities');
    console.log('   - Created Group-Property containment relationships');
    console.log('   - Added Multi-Property Setup workflow pattern');
    console.log('   - Mapped group-related API endpoints\n');
    
    // Show the new hierarchy
    const hierarchy = await session.run(`
      MATCH path = (g:Group)-[:CONTAINS]->(p:Property)-[:HAS_CHILD*]->(child)
      RETURN 'Group → Property → RoomType → RatePlan' as Hierarchy
      LIMIT 1
    `);
    
    console.log('🏗️  New Hierarchy Structure:');
    console.log('   Group (optional)');
    console.log('     └── Property');
    console.log('           └── RoomType');
    console.log('                 └── RatePlan\n');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

// Run the script
addGroupsToGraph();