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

async function enhanceOTAChannels() {
  const session = driver.session();
  
  try {
    console.log('🔧 Enhancing Channel/OTA concepts in Neo4j...\n');
    
    // First, update the Channel entity to be clearer about OTAs
    await session.run(`
      MATCH (ch:Channel)
      SET ch.full_description = 'Online Travel Agencies (OTAs) where guests search and book properties. Each OTA has unique rules, commission structures, and API requirements. Bookings originate from OTAs and flow into your property management system.',
          ch.alternative_names = ['OTA', 'Online Travel Agency', 'Distribution Channel'],
          ch.key_concepts = [
            'Bookings originate from OTAs',
            'Each OTA has different rules and requirements',
            'Commission rates vary by OTA (typically 15-25%)',
            'Mapping required between your inventory and OTA listings'
          ]
    `);
    console.log('✅ Enhanced Channel/OTA description\n');
    
    // Create specific OTA examples as nodes
    const otas = [
      {
        code: 'booking_com',
        name: 'Booking.com',
        commission: '15-18%',
        key_rules: [
          'Free cancellation options strongly preferred',
          'Genius program for loyal guests',
          'Rate parity requirements',
          'Mobile bookings priority'
        ],
        mapping_requirements: ['Photos required', 'Detailed amenities', 'Cancellation policies']
      },
      {
        code: 'airbnb',
        name: 'Airbnb',
        commission: '14-16%',
        key_rules: [
          'Host approval for bookings (optional)',
          'Strict cancellation policies available',
          'Review system impacts visibility',
          'Superhost program benefits'
        ],
        mapping_requirements: ['House rules', 'Check-in instructions', 'Neighborhood description']
      },
      {
        code: 'expedia',
        name: 'Expedia',
        commission: '15-20%',
        key_rules: [
          'Part of Expedia Group (Hotels.com, Vrbo)',
          'Package deals with flights',
          'Loyalty program integration',
          'Collect payments or hotel collect options'
        ],
        mapping_requirements: ['High-quality photos', 'Detailed descriptions', 'Special offers']
      },
      {
        code: 'vrbo',
        name: 'Vrbo',
        commission: '8-10%',
        key_rules: [
          'Vacation rentals only (no hotels)',
          'Family-friendly focus',
          'Whole property rentals only',
          'Annual subscription option'
        ],
        mapping_requirements: ['Property type', 'Sleeping arrangements', 'Full property access']
      }
    ];
    
    for (const ota of otas) {
      await session.run(`
        CREATE (ota:OTAExample {
          code: $code,
          name: $name,
          commission_range: $commission,
          key_rules: $key_rules,
          mapping_requirements: $mapping_requirements,
          is_channel: true
        })
      `, ota);
    }
    console.log('✅ Created specific OTA examples\n');
    
    // Link OTA examples to Channel concept
    await session.run(`
      MATCH (ch:Channel)
      MATCH (ota:OTAExample)
      CREATE (ota)-[:EXAMPLE_OF]->(ch)
    `);
    
    // Create OTA Rules concept
    await session.run(`
      CREATE (rules:DomainConcept:OTARules {
        name: 'OTARules',
        description: 'OTA-specific requirements and restrictions',
        full_description: 'Each OTA has unique rules for rate parity, cancellation policies, content requirements, and booking modifications. Non-compliance can result in ranking penalties or delisting.',
        examples: [
          'Rate parity: Cannot offer lower prices on your website',
          'Content requirements: Minimum photo quality and quantity',
          'Availability requirements: Minimum nights available per year',
          'Response time: Must respond to guest inquiries within 24 hours'
        ]
      })
    `);
    
    // Create Booking Flow pattern
    await session.run(`
      CREATE (pattern:APIPattern {
        name: 'OTA Booking Flow',
        description: 'How bookings flow from OTAs into your system',
        order: 3
      })

      CREATE (step1:APIStep {
        order: 1,
        action: 'Guest books on OTA',
        description: 'Guest searches and books on Booking.com, Airbnb, etc.',
        api_endpoint: 'N/A - happens on OTA platform'
      })

      CREATE (step2:APIStep {
        order: 2,
        action: 'OTA sends booking to Channex',
        description: 'OTA pushes booking via their API to Channex',
        api_endpoint: 'OTA-specific webhook'
      })

      CREATE (step3:APIStep {
        order: 3,
        action: 'Channex creates booking',
        description: 'Channex processes and standardizes booking data',
        api_endpoint: 'Internal Channex processing'
      })

      CREATE (step4:APIStep {
        order: 4,
        action: 'Webhook to your system',
        description: 'Channex sends booking to your PMS via webhook',
        api_endpoint: 'POST /webhooks/new_booking',
        webhook_data: ['booking details', 'guest info', 'channel info']
      })

      CREATE (step5:APIStep {
        order: 5,
        action: 'Update availability',
        description: 'Reduce availability for booked dates',
        api_endpoint: 'POST /api/v1/availability',
        automatic: true
      })

      CREATE (pattern)-[:HAS_STEP]->(step1)
      CREATE (pattern)-[:HAS_STEP]->(step2)
      CREATE (pattern)-[:HAS_STEP]->(step3)
      CREATE (pattern)-[:HAS_STEP]->(step4)
      CREATE (pattern)-[:HAS_STEP]->(step5)
      CREATE (step1)-[:NEXT]->(step2)
      CREATE (step2)-[:NEXT]->(step3)
      CREATE (step3)-[:NEXT]->(step4)
      CREATE (step4)-[:NEXT]->(step5)
    `);
    console.log('✅ Created OTA Booking Flow pattern\n');
    
    // Update Booking entity to show OTA origin
    await session.run(`
      MATCH (b:Booking)
      SET b.full_description = b.full_description + ' Most bookings originate from OTAs like Booking.com or Airbnb. Each booking includes channel information to identify its source.',
          b.ota_fields = [
            'channel_id: Which OTA the booking came from',
            'channel_booking_id: OTA reference number',
            'commission: Amount owed to the OTA',
            'guest_comments: Special requests from OTA booking'
          ]
    `);
    
    // Create relationships showing booking origin
    await session.run(`
      MATCH (b:Booking)
      MATCH (ch:Channel)
      MERGE (b)-[:ORIGINATES_FROM {
        description: 'Bookings come from OTA channels',
        includes_commission: true,
        includes_channel_reference: true
      }]->(ch)
    `);
    
    // Add commission tracking
    await session.run(`
      CREATE (comm:DomainConcept:Commission {
        name: 'Commission',
        description: 'Fees paid to OTAs for bookings',
        calculation: 'Usually percentage of booking total',
        typical_range: '8-25%',
        factors: [
          'OTA type (Booking.com vs Airbnb)',
          'Property location',
          'Negotiated contracts',
          'Volume agreements'
        ]
      })
      WITH comm
      MATCH (ch:Channel)
      CREATE (ch)-[:CHARGES]->(comm)
      WITH comm
      MATCH (b:Booking)
      CREATE (b)-[:INCLUDES]->(comm)
    `);
    console.log('✅ Added commission tracking\n');
    
    console.log('📊 Summary of enhancements:');
    console.log('   - Clarified Channels = OTAs (Online Travel Agencies)');
    console.log('   - Added specific OTA examples with rules');
    console.log('   - Created OTA Booking Flow pattern');
    console.log('   - Showed bookings originate from OTAs');
    console.log('   - Added commission tracking');
    console.log('   - Captured OTA-specific requirements\n');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await session.close();
    await driver.close();
  }
}

// Run the enhancement
enhanceOTAChannels();