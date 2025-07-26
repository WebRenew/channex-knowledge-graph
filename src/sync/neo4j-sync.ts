import neo4j, { Driver, Session } from 'neo4j-driver';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

interface EndpointNode {
  id: string;
  path: string;
  method: string;
  category: string;
  description: string;
  authentication: string;
  rate_limit?: string;
  doc_reference?: string;
}

interface DataModelNode {
  id: string;
  name: string;
  description: string;
  attributes: any;
  doc_reference?: string;
}

interface WorkflowNode {
  id: string;
  name: string;
  description: string;
  steps: any;
  category: string;
}

interface GraphNode {
  id: string;
  label: string;
  properties: any;
}

interface GraphEdge {
  id: string;
  source_id: string;
  target_id: string;
  relationship_type: string;
  properties: any;
}

export class Neo4jSync {
  private driver: Driver;
  private supabase: any;

  constructor() {
    // Initialize Neo4j connection
    this.driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'channex123'
      )
    );

    // Initialize Supabase connection
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

  async setupSchema(): Promise<void> {
    const session = this.driver.session();
    try {
      // Create indexes for performance
      const indexQueries = [
        'CREATE INDEX endpoint_path IF NOT EXISTS FOR (e:Endpoint) ON (e.path)',
        'CREATE INDEX endpoint_method IF NOT EXISTS FOR (e:Endpoint) ON (e.method)',
        'CREATE INDEX model_name IF NOT EXISTS FOR (m:DataModel) ON (m.name)',
        'CREATE INDEX workflow_name IF NOT EXISTS FOR (w:Workflow) ON (w.name)',
        'CREATE INDEX node_id IF NOT EXISTS FOR (n:Node) ON (n.id)',
        'CREATE INDEX property_id IF NOT EXISTS FOR (p:Property) ON (p.id)',
        'CREATE INDEX booking_id IF NOT EXISTS FOR (b:Booking) ON (b.id)',
        'CREATE INDEX roomtype_id IF NOT EXISTS FOR (r:RoomType) ON (r.id)',
        'CREATE INDEX rateplan_id IF NOT EXISTS FOR (r:RatePlan) ON (r.id)',
        'CREATE INDEX channel_id IF NOT EXISTS FOR (c:Channel) ON (c.id)'
      ];

      for (const query of indexQueries) {
        await session.run(query);
      }

      console.log('✅ Neo4j schema and indexes created');
    } finally {
      await session.close();
    }
  }

  async syncEndpoints(): Promise<void> {
    const session = this.driver.session();
    try {
      // Fetch endpoints from Supabase
      const { data: endpoints, error } = await this.supabase
        .from('kg_endpoints')
        .select('*');

      if (error) throw error;

      console.log(`📥 Syncing ${endpoints.length} endpoints to Neo4j`);

      for (const endpoint of endpoints) {
        await session.run(
          `MERGE (e:Endpoint {id: $id})
           SET e.path = $path,
               e.method = $method,
               e.category = $category,
               e.description = $description,
               e.authentication = $authentication,
               e.rate_limit = $rate_limit,
               e.doc_reference = $doc_reference,
               e.updated_at = datetime()`,
          {
            id: endpoint.id,
            path: endpoint.path,
            method: endpoint.method,
            category: endpoint.category || '',
            description: endpoint.description || '',
            authentication: endpoint.authentication || '',
            rate_limit: endpoint.rate_limit || '',
            doc_reference: endpoint.doc_reference || ''
          }
        );
      }

      console.log('✅ Endpoints synced');
    } finally {
      await session.close();
    }
  }

  async syncDataModels(): Promise<void> {
    const session = this.driver.session();
    try {
      // Fetch data models from Supabase
      const { data: models, error } = await this.supabase
        .from('kg_data_models')
        .select('*')
;

      if (error) throw error;

      console.log(`📥 Syncing ${models.length} data models to Neo4j`);

      for (const model of models) {
        await session.run(
          `MERGE (m:DataModel {id: $id})
           SET m.name = $name,
               m.description = $description,
               m.attributes = $attributes,
               m.doc_reference = $doc_reference,
               m.updated_at = datetime()`,
          {
            id: model.id,
            name: model.name,
            description: model.description || '',
            attributes: JSON.stringify(model.attributes || {}),
            doc_reference: model.doc_reference || ''
          }
        );

        // Also create domain-specific nodes based on model name
        const domainLabel = this.getDomainLabel(model.name);
        if (domainLabel) {
          await session.run(
            `MERGE (d:${domainLabel} {id: $id})
             SET d.name = $name,
                 d.model_id = $id,
                 d.updated_at = datetime()`,
            {
              id: model.id,
              name: model.name
            }
          );
        }
      }

      console.log('✅ Data models synced');
    } finally {
      await session.close();
    }
  }

  async syncWorkflows(): Promise<void> {
    const session = this.driver.session();
    try {
      // Fetch workflows from Supabase
      const { data: workflows, error } = await this.supabase
        .from('kg_workflows')
        .select('*')
;

      if (error) throw error;

      console.log(`📥 Syncing ${workflows.length} workflows to Neo4j`);

      for (const workflow of workflows) {
        await session.run(
          `MERGE (w:Workflow {id: $id})
           SET w.name = $name,
               w.description = $description,
               w.steps = $steps,
               w.category = $category,
               w.updated_at = datetime()`,
          {
            id: workflow.id,
            name: workflow.name,
            description: workflow.description || '',
            steps: JSON.stringify(workflow.steps || []),
            category: workflow.category || ''
          }
        );
      }

      console.log('✅ Workflows synced');
    } finally {
      await session.close();
    }
  }

  async syncGraphNodes(): Promise<void> {
    const session = this.driver.session();
    try {
      // Fetch graph nodes from Supabase
      const { data: nodes, error } = await this.supabase
        .from('kg_graph_nodes')
        .select('*')
;

      if (error) throw error;

      console.log(`📥 Syncing ${nodes.length} graph nodes to Neo4j`);

      for (const node of nodes) {
        // Create node with dynamic label
        const query = `
          MERGE (n:Node {id: $id})
          SET n = $properties,
              n.updated_at = datetime()
          WITH n
          CALL apoc.create.addLabels(n, [$label]) YIELD node
          RETURN node
        `;

        await session.run(query, {
          id: node.id,
          label: node.label || 'Node',
          properties: node.properties || {}
        });
      }

      console.log('✅ Graph nodes synced');
    } finally {
      await session.close();
    }
  }

  async syncGraphEdges(): Promise<void> {
    const session = this.driver.session();
    try {
      // Fetch graph edges from Supabase
      const { data: edges, error } = await this.supabase
        .from('kg_graph_edges')
        .select('*')
;

      if (error) throw error;

      console.log(`📥 Syncing ${edges.length} graph edges to Neo4j`);

      for (const edge of edges) {
        const query = `
          MATCH (source {id: $sourceId})
          MATCH (target {id: $targetId})
          CALL apoc.create.relationship(source, $relType, $properties, target) YIELD rel
          RETURN rel
        `;

        await session.run(query, {
          sourceId: edge.source_id,
          targetId: edge.target_id,
          relType: edge.relationship_type || 'RELATED_TO',
          properties: edge.properties || {}
        });
      }

      console.log('✅ Graph edges synced');
    } finally {
      await session.close();
    }
  }

  async createInferredRelationships(): Promise<void> {
    const session = this.driver.session();
    try {
      console.log('🔗 Creating inferred relationships');

      // Link endpoints to data models they return
      await session.run(`
        MATCH (e:Endpoint)
        MATCH (m:DataModel)
        WHERE e.description CONTAINS m.name
           OR e.path CONTAINS toLower(m.name)
        MERGE (e)-[:RETURNS]->(m)
      `);

      // Link endpoints to data models they accept
      await session.run(`
        MATCH (e:Endpoint {method: 'POST'})
        MATCH (m:DataModel)
        WHERE e.description CONTAINS m.name
           OR e.path CONTAINS toLower(m.name)
        MERGE (e)-[:ACCEPTS]->(m)
      `);

      // Link workflows to endpoints they use
      await session.run(`
        MATCH (w:Workflow)
        MATCH (e:Endpoint)
        WHERE w.description CONTAINS e.path
           OR w.steps CONTAINS e.path
        MERGE (w)-[:USES_ENDPOINT]->(e)
      `);

      // Create domain relationships
      await session.run(`
        MATCH (p:Property)
        MATCH (r:RoomType)
        WHERE r.name CONTAINS 'Property'
           OR r.description CONTAINS 'property'
        MERGE (p)-[:HAS_ROOM_TYPE]->(r)
      `);

      await session.run(`
        MATCH (r:RoomType)
        MATCH (rp:RatePlan)
        WHERE rp.name CONTAINS 'Room'
           OR rp.description CONTAINS 'room type'
        MERGE (r)-[:HAS_RATE_PLAN]->(rp)
      `);

      await session.run(`
        MATCH (b:Booking)
        MATCH (p:Property)
        WHERE b.description CONTAINS 'property'
        MERGE (b)-[:BOOKS_PROPERTY]->(p)
      `);

      console.log('✅ Inferred relationships created');
    } finally {
      await session.close();
    }
  }

  async fullSync(): Promise<void> {
    try {
      await this.connect();
      await this.setupSchema();
      await this.syncEndpoints();
      await this.syncDataModels();
      await this.syncWorkflows();
      await this.syncGraphNodes();
      await this.syncGraphEdges();
      await this.createInferredRelationships();
      console.log('✅ Full sync completed successfully');
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

  private getDomainLabel(modelName: string): string | null {
    const domainMap: { [key: string]: string } = {
      'Property': 'Property',
      'Booking': 'Booking',
      'RoomType': 'RoomType',
      'RatePlan': 'RatePlan',
      'Channel': 'Channel',
      'Guest': 'Guest',
      'Availability': 'Availability',
      'Rate': 'Rate',
      'Inventory': 'Inventory'
    };

    return domainMap[modelName] || null;
  }
}

// Run if called directly
if (require.main === module) {
  const sync = new Neo4jSync();
  sync.fullSync()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}