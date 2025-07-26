import neo4j, { Driver, Session } from 'neo4j-driver';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

interface APIStructure {
  properties: {
    endpoints: string[];
    nested: {
      room_types: {
        endpoints: string[];
        nested: {
          rate_plans: {
            endpoints: string[];
          }
        }
      }
    }
  };
  ari: {
    availability: {
      parent: 'room_types';
      endpoints: string[];
    };
    restrictions: {
      parent: 'rate_plans';
      endpoints: string[];
    };
  };
}

export class EnhancedNeo4jSync {
  private driver: Driver;
  private supabase: any;

  constructor() {
    this.driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'channex123'
      )
    );

    const supabaseUrl = 'https://czysljuglsdvtxbwavyz.supabase.co';
    this.supabase = createClient(
      supabaseUrl,
      process.env.KNOWLEDGE_DB_SERVICE_KEY || process.env.KNOWLEDGE_DB_ANON_KEY!
    );
  }

  async connect(): Promise<void> {
    try {
      const session = this.driver.session();
      await session.run('RETURN 1');
      await session.close();
      console.log('✅ Connected to Neo4j');
    } catch (error) {
      console.error('❌ Failed to connect to Neo4j:', error);
      throw error;
    }
  }

  async clearDatabase(): Promise<void> {
    const session = this.driver.session();
    try {
      console.log('🗑️  Clearing existing Neo4j data...');
      await session.run('MATCH (n) DETACH DELETE n');
      console.log('✅ Database cleared');
    } finally {
      await session.close();
    }
  }

  async createDomainHierarchy(): Promise<void> {
    const session = this.driver.session();
    try {
      console.log('🏗️  Creating domain hierarchy...');

      // Create domain entities
      await session.run(`
        // Properties are the root entity
        CREATE (p:DomainEntity:Property {
          name: 'Property',
          level: 0,
          description: 'Root entity representing a hotel or vacation rental property',
          api_resource: '/api/v1/properties'
        })

        // Room Types belong to Properties
        CREATE (rt:DomainEntity:RoomType {
          name: 'RoomType',
          level: 1,
          description: 'Types of rooms available within a property',
          api_resource: '/api/v1/room_types',
          parent_required: true,
          parent_field: 'property_id'
        })

        // Rate Plans belong to Room Types
        CREATE (rp:DomainEntity:RatePlan {
          name: 'RatePlan',
          level: 2,
          description: 'Pricing plans for room types',
          api_resource: '/api/v1/rate_plans',
          parent_required: true,
          parent_fields: ['property_id', 'room_type_id']
        })

        // Create the hierarchy relationships
        CREATE (p)-[:HAS_CHILD {cardinality: 'one-to-many'}]->(rt)
        CREATE (rt)-[:HAS_CHILD {cardinality: 'one-to-many'}]->(rp)
        CREATE (rt)-[:BELONGS_TO]->(p)
        CREATE (rp)-[:BELONGS_TO]->(rt)

        // Availability is tied to Room Types
        CREATE (av:DomainConcept:Availability {
          name: 'Availability',
          description: 'Number of available rooms per room type per date',
          api_resource: '/api/v1/availability',
          scope: 'room_type',
          update_endpoint: 'POST /api/v1/availability'
        })
        CREATE (av)-[:SCOPED_TO]->(rt)

        // Restrictions are tied to Rate Plans
        CREATE (res:DomainConcept:Restriction {
          name: 'Restriction',
          description: 'Booking restrictions like min stay, closed to arrival',
          api_resource: '/api/v1/restrictions',
          scope: 'rate_plan',
          update_endpoint: 'POST /api/v1/restrictions'
        })
        CREATE (res)-[:SCOPED_TO]->(rp)

        // Bookings reference Properties
        CREATE (b:DomainEntity:Booking {
          name: 'Booking',
          description: 'Guest reservations',
          api_resource: '/api/v1/bookings',
          references: ['property_id', 'room_type_id', 'rate_plan_id']
        })
        CREATE (b)-[:BOOKS]->(p)
        CREATE (b)-[:FOR_ROOM_TYPE]->(rt)
        CREATE (b)-[:USES_RATE_PLAN]->(rp)

        // Channels connect to Properties
        CREATE (ch:DomainEntity:Channel {
          name: 'Channel',
          description: 'OTA connections like Booking.com, Airbnb',
          api_resource: '/api/v1/channels',
          connects_to: 'property'
        })
        CREATE (ch)-[:DISTRIBUTES]->(p)
      `);

      console.log('✅ Domain hierarchy created');
    } finally {
      await session.close();
    }
  }

  async mapEndpointsToDomain(): Promise<void> {
    const session = this.driver.session();
    try {
      console.log('🔗 Mapping API endpoints to domain entities...');

      // Fetch endpoints from Supabase
      const { data: endpoints, error } = await this.supabase
        .from('kg_endpoints')
        .select('*');

      if (error) throw error;

      for (const endpoint of endpoints) {
        // Determine which domain entity this endpoint operates on
        const domainMapping = this.determineDomainEntity(endpoint.path);
        
        if (domainMapping) {
          await session.run(`
            MERGE (e:APIEndpoint {id: $id})
            SET e.path = $path,
                e.method = $method,
                e.description = $description,
                e.category = $category
            WITH e
            MATCH (d:DomainEntity {name: $domainName})
            MERGE (e)-[:OPERATES_ON]->(d)
          `, {
            id: endpoint.id,
            path: endpoint.path,
            method: endpoint.method,
            description: endpoint.description || '',
            category: endpoint.category || '',
            domainName: domainMapping
          });
        }

        // Map ARI endpoints specially
        if (endpoint.path.includes('availability')) {
          await session.run(`
            MATCH (e:APIEndpoint {id: $id})
            MATCH (av:DomainConcept {name: 'Availability'})
            MERGE (e)-[:MANAGES]->(av)
          `, { id: endpoint.id });
        }

        if (endpoint.path.includes('restrictions')) {
          await session.run(`
            MATCH (e:APIEndpoint {id: $id})
            MATCH (res:DomainConcept {name: 'Restriction'})
            MERGE (e)-[:MANAGES]->(res)
          `, { id: endpoint.id });
        }
      }

      console.log('✅ Endpoints mapped to domain');
    } finally {
      await session.close();
    }
  }

  async createAPIPatterns(): Promise<void> {
    const session = this.driver.session();
    try {
      console.log('📋 Creating API usage patterns...');

      // Pattern: Property Setup Flow
      await session.run(`
        CREATE (pattern:APIPattern {
          name: 'Property Setup Flow',
          description: 'Complete flow to set up a property with rooms and rates',
          order: 1
        })

        CREATE (step1:APIStep {
          order: 1,
          action: 'Create Property',
          endpoint: 'POST /api/v1/properties',
          required_data: ['title', 'currency', 'timezone']
        })

        CREATE (step2:APIStep {
          order: 2,
          action: 'Create Room Types',
          endpoint: 'POST /api/v1/room_types',
          required_data: ['property_id', 'title', 'occupancy'],
          depends_on: 'property.id from step 1'
        })

        CREATE (step3:APIStep {
          order: 3,
          action: 'Create Rate Plans',
          endpoint: 'POST /api/v1/rate_plans',
          required_data: ['property_id', 'room_type_id', 'title', 'base_rate'],
          depends_on: 'room_type.id from step 2'
        })

        CREATE (step4:APIStep {
          order: 4,
          action: 'Set Initial Availability',
          endpoint: 'POST /api/v1/availability',
          required_data: ['room_type_id', 'date_from', 'date_to', 'availability'],
          depends_on: 'room_type.id from step 2'
        })

        CREATE (pattern)-[:HAS_STEP]->(step1)
        CREATE (pattern)-[:HAS_STEP]->(step2)
        CREATE (pattern)-[:HAS_STEP]->(step3)
        CREATE (pattern)-[:HAS_STEP]->(step4)
        CREATE (step1)-[:NEXT]->(step2)
        CREATE (step2)-[:NEXT]->(step3)
        CREATE (step3)-[:NEXT]->(step4)
      `);

      // Pattern: ARI Update Flow
      await session.run(`
        CREATE (pattern:APIPattern {
          name: 'ARI Update Pattern',
          description: 'Update Availability, Rates, and Inventory',
          note: 'Availability updates at room_type level, restrictions at rate_plan level'
        })

        CREATE (avail:APIStep {
          action: 'Update Availability',
          endpoint: 'POST /api/v1/availability',
          scope: 'room_type',
          bulk_capable: true,
          data_structure: 'Array of {room_type_id, date/date_range, availability}'
        })

        CREATE (restrict:APIStep {
          action: 'Update Restrictions',
          endpoint: 'POST /api/v1/restrictions',
          scope: 'rate_plan',
          bulk_capable: true,
          data_structure: 'Array of {rate_plan_id, date/date_range, restrictions}'
        })

        CREATE (pattern)-[:INCLUDES]->(avail)
        CREATE (pattern)-[:INCLUDES]->(restrict)
      `);

      console.log('✅ API patterns created');
    } finally {
      await session.close();
    }
  }

  async createQueryHelpers(): Promise<void> {
    const session = this.driver.session();
    try {
      console.log('🔍 Creating query helper relationships...');

      // Create common query patterns
      await session.run(`
        // Helper: Find all endpoints for a domain
        CREATE (q:QueryHelper {
          name: 'Find endpoints by domain',
          cypher: 'MATCH (e:APIEndpoint)-[:OPERATES_ON]->(d:DomainEntity {name: $domain}) RETURN e'
        })

        // Helper: Trace property hierarchy
        CREATE (q2:QueryHelper {
          name: 'Property hierarchy',
          cypher: 'MATCH path = (p:Property)-[:HAS_CHILD*]->(child) RETURN path'
        })

        // Helper: Find update endpoints
        CREATE (q3:QueryHelper {
          name: 'Find update endpoints',
          cypher: 'MATCH (e:APIEndpoint {method: "POST"})-[:MANAGES]->(concept) RETURN e, concept'
        })
      `);

      console.log('✅ Query helpers created');
    } finally {
      await session.close();
    }
  }

  private determineDomainEntity(path: string): string | null {
    if (path.includes('/properties')) return 'Property';
    if (path.includes('/room_types')) return 'RoomType';
    if (path.includes('/rate_plans')) return 'RatePlan';
    if (path.includes('/bookings')) return 'Booking';
    if (path.includes('/channels')) return 'Channel';
    return null;
  }

  async fullSync(): Promise<void> {
    try {
      await this.connect();
      await this.clearDatabase();
      await this.createDomainHierarchy();
      await this.mapEndpointsToDomain();
      await this.createAPIPatterns();
      await this.createQueryHelpers();
      
      console.log('✅ Enhanced sync completed successfully');
      console.log('\n📊 Graph now captures:');
      console.log('  - Property > RoomType > RatePlan hierarchy');
      console.log('  - Availability scoped to RoomTypes');
      console.log('  - Restrictions scoped to RatePlans');
      console.log('  - API endpoint mappings to domain entities');
      console.log('  - Common API usage patterns');
      
    } catch (error) {
      console.error('❌ Sync failed:', error);
      throw error;
    } finally {
      await this.close();
    }
  }

  async close(): Promise<void> {
    await this.driver.close();
  }
}

// Run if called directly
if (require.main === module) {
  const sync = new EnhancedNeo4jSync();
  sync.fullSync()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}