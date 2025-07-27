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

async function fixMessagesAndChannels() {
  const session = driver.session();
  
  try {
    console.log('🔧 Fixing Messages and Channels in Neo4j...\n');
    
    // First, remove the incorrect DISTRIBUTES relationship
    await session.run(`
      MATCH (ch:Channel)-[r:DISTRIBUTES]->(p:Property)
      DELETE r
    `);
    console.log('✅ Removed incorrect DISTRIBUTES relationship\n');
    
    // Create the Message domain entity
    await session.run(`
      CREATE (m:DomainEntity:Message {
        name: 'Message',
        level: 1,
        description: 'Guest communication messages and threads',
        api_resource: '/api/v1/message_threads',
        parent_required: true,
        parent_field: 'property_id',
        full_description: 'Messages and message threads for guest communication. Each thread is associated with a booking and property, enabling two-way communication between property managers and guests.'
      })
    `);
    console.log('✅ Created Message domain entity\n');
    
    // Create proper Channel relationships
    await session.run(`
      MATCH (ch:Channel)
      MATCH (p:Property)
      CREATE (ch)-[:CONNECTS_TO {
        description: 'Channel distributes property inventory to OTAs',
        mapping_required: true
      }]->(p)
    `);
    console.log('✅ Created proper CONNECTS_TO relationship for Channels\n');
    
    // Create Message relationships
    await session.run(`
      MATCH (m:Message)
      MATCH (p:Property)
      MATCH (b:Booking)
      CREATE (m)-[:BELONGS_TO]->(p)
      CREATE (m)-[:RELATED_TO_BOOKING]->(b)
    `);
    console.log('✅ Created Message relationships\n');
    
    // Add Guest entity
    await session.run(`
      CREATE (g:DomainEntity:Guest {
        name: 'Guest',
        description: 'Guest information for bookings',
        api_resource: 'embedded in bookings',
        full_description: 'Guest details including name, email, phone, and address. Embedded within booking objects rather than being a standalone resource.'
      })
    `);
    
    // Create Guest relationships
    await session.run(`
      MATCH (g:Guest)
      MATCH (b:Booking)
      MATCH (m:Message)
      CREATE (b)-[:HAS_GUEST]->(g)
      CREATE (m)-[:FROM_GUEST]->(g)
    `);
    console.log('✅ Created Guest entity and relationships\n');
    
    // Map message-related endpoints
    const messageEndpoints = [
      {
        path: '/api/v1/message_threads/:id/no_reply_needed',
        method: 'POST',
        description: 'Mark message thread as no reply needed'
      }
    ];
    
    for (const endpoint of messageEndpoints) {
      await session.run(`
        MATCH (m:Message)
        MERGE (e:APIEndpoint {
          path: $path,
          method: $method
        })
        SET e.description = $description,
            e.category = 'messages'
        MERGE (e)-[:OPERATES_ON]->(m)
      `, endpoint);
    }
    console.log('✅ Mapped message endpoints\n');
    
    // Update Channel to show it needs mapping
    await session.run(`
      MATCH (ch:Channel)
      SET ch.full_description = 'OTA (Online Travel Agency) connections like Booking.com, Airbnb, Expedia. Channels distribute property inventory and receive bookings. Each channel connection requires mapping room types and rate plans to channel-specific listings.',
          ch.key_concepts = ['Channel mapping required', 'Each property can have multiple channels', 'Bookings flow from channels to properties']
    `);
    
    // Create ChannelMapping concept
    await session.run(`
      CREATE (cm:DomainConcept:ChannelMapping {
        name: 'ChannelMapping',
        description: 'Maps property room types and rate plans to channel listings',
        api_resource: '/api/v1/channels/:id/mappings',
        scope: 'channel',
        full_description: 'Defines how your room types and rate plans appear on each OTA. Required for inventory distribution and booking reception.'
      })
      WITH cm
      MATCH (ch:Channel)
      CREATE (cm)-[:REQUIRED_FOR]->(ch)
    `);
    console.log('✅ Created ChannelMapping concept\n');
    
    console.log('📊 Summary of changes:');
    console.log('   - Added Message domain entity');
    console.log('   - Added Guest domain entity');
    console.log('   - Fixed Channel relationships (CONNECTS_TO instead of DISTRIBUTES)');
    console.log('   - Added ChannelMapping concept');
    console.log('   - Created proper relationship hierarchy\n');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

// Run the fix
fixMessagesAndChannels();