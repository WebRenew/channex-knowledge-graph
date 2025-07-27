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

// Map of endpoints to meaningful descriptions
const endpointDescriptions: Record<string, string> = {
  'GET /api/v1/properties/': 'List all properties with pagination and filtering',
  'DELETE /api/v1/properties/:id': 'Delete a property by ID',
  'POST /api/v1/properties': 'Create a new property',
  'PUT /api/v1/properties/:id': 'Update an existing property',
  
  'GET /api/v1/room_types': 'List all room types for a property',
  'GET /api/v1/room_types/:id': 'Get details of a specific room type',
  'POST /api/v1/room_types': 'Create a new room type for a property',
  'PUT /api/v1/room_types/:id': 'Update an existing room type',
  'DELETE /api/v1/room_types/:id': 'Delete a room type',
  
  'GET /api/v1/rate_plans': 'List all rate plans for a room type',
  'GET /api/v1/rate_plans/:id': 'Get details of a specific rate plan',
  'POST /api/v1/rate_plans': 'Create a new rate plan for a room type',
  'PUT /api/v1/rate_plans/:id': 'Update an existing rate plan',
  'DELETE /api/v1/rate_plans/:id': 'Delete a rate plan',
  
  'GET /api/v1/bookings': 'List all bookings with filters',
  'GET /api/v1/bookings/:id': 'Get details of a specific booking',
  'POST /api/v1/bookings': 'Create a new booking',
  'PUT /api/v1/bookings/:booking_id': 'Update an existing booking',
  
  'GET /api/v1/availability': 'Get availability for room types',
  'POST /api/v1/availability': 'Update availability for room types',
  
  'GET /api/v1/restrictions': 'Get restrictions for rate plans',
  'POST /api/v1/restrictions': 'Update restrictions (min stay, CTA/CTD) for rate plans',
  
  'GET /api/v1/channels': 'List all connected channels (OTAs)',
  'POST /api/v1/channels': 'Connect a new channel',
  'PUT /api/v1/channels/:id': 'Update channel settings',
  'DELETE /api/v1/channels/:id': 'Disconnect a channel',
  
  // Payment endpoints
  'POST /api/v1/bookings/{{booking_id}}/pre_auth_payment': 'Pre-authorize payment for booking',
  'POST /api/v1/bookings/{{booking_id}}/settle_payment': 'Settle/capture pre-authorized payment',
  'POST /api/v1/bookings/{{booking_id}}/void_payment': 'Void/cancel pre-authorized payment',
  'POST /api/v1/bookings/{{booking_id}}/charge_payment': 'Charge payment for booking',
  'POST /api/v1/bookings/{{booking_id}}/refund_payment': 'Refund payment for booking',
};

async function fixDescriptions() {
  const session = driver.session();
  
  try {
    console.log('🔧 Fixing endpoint descriptions in Neo4j...\n');
    
    // First, get all endpoints
    const result = await session.run(`
      MATCH (e:APIEndpoint)
      RETURN e.id as id, e.path as path, e.method as method, e.description as description
    `);
    
    let updatedCount = 0;
    
    for (const record of result.records) {
      const path = record.get('path');
      const method = record.get('method');
      const currentDesc = record.get('description');
      const key = `${method} ${path}`;
      
      // Check if we have a better description
      if (endpointDescriptions[key] && (currentDesc === 'Copy' || currentDesc === '')) {
        await session.run(`
          MATCH (e:APIEndpoint {id: $id})
          SET e.description = $description
        `, {
          id: record.get('id'),
          description: endpointDescriptions[key]
        });
        
        console.log(`✅ Updated: ${key}`);
        console.log(`   → ${endpointDescriptions[key]}\n`);
        updatedCount++;
      }
    }
    
    console.log(`\n📊 Summary: Updated ${updatedCount} endpoint descriptions`);
    
    // Also update domain entity descriptions
    await session.run(`
      MATCH (p:Property)
      SET p.full_description = 'The root entity representing a vacation rental property or hotel. Contains basic information like name, address, currency, timezone, and settings.'
    `);
    
    await session.run(`
      MATCH (rt:RoomType)
      SET rt.full_description = 'Represents types of accommodations within a property (e.g., Standard Room, Deluxe Suite). Each room type has its own inventory count and base occupancy settings.'
    `);
    
    await session.run(`
      MATCH (rp:RatePlan)
      SET rp.full_description = 'Pricing plans attached to room types. Defines rates, meal plans, and booking restrictions like minimum stay or closed to arrival/departure.'
    `);
    
    await session.run(`
      MATCH (av:Availability)
      SET av.full_description = 'The number of rooms available for each room type on specific dates. Updated at the room type level, not rate plan level.'
    `);
    
    await session.run(`
      MATCH (res:Restriction)
      SET res.full_description = 'Booking restrictions like minimum stay, closed to arrival (CTA), closed to departure (CTD). Applied at the rate plan level for granular control.'
    `);
    
    console.log('✅ Updated domain entity descriptions\n');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

// Run the fix
fixDescriptions();