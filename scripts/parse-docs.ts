import * as fs from 'fs/promises';
import * as path from 'path';
import { config } from 'dotenv';
import { ChannexDocParser } from '../src/parser/channexParser';
import { SupabaseStorage } from '../src/storage/supabaseStorage';
import { EmbeddingGenerator } from '../src/embeddings/generator';
import {
  EndpointNode,
  DataModelNode,
  WorkflowNode,
  RelationshipEdge,
  DocumentChunk
} from '../src/types';

// Load environment variables
config();

interface ParseResult {
  fileName: string;
  endpoints: EndpointNode[];
  models: DataModelNode[];
  workflows: WorkflowNode[];
  relationships: RelationshipEdge[];
  chunks: DocumentChunk[];
}

async function parseDocumentationFile(filePath: string): Promise<ParseResult> {
  console.log(`📄 Parsing: ${path.basename(filePath)}`);
  
  const content = await fs.readFile(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  const parser = new ChannexDocParser(content, fileName);
  const embeddingGen = new EmbeddingGenerator(
    process.env.OPENAI_API_KEY || '',
    process.env.OPENAI_MODEL || 'text-embedding-3-small'
  );
  
  // Parse different aspects
  const endpoints = parser.parseEndpoints();
  const models = parser.parseDataModels();
  const workflows = parser.parseWorkflows();
  const relationships = parser.extractRelationships();
  
  // Create document chunks
  const chunks = embeddingGen.chunkDocument(
    content,
    fileName,
    parseInt(process.env.CHUNK_SIZE || '1000'),
    parseInt(process.env.MAX_CHUNK_OVERLAP || '200')
  );
  
  console.log(`  ✅ Found: ${endpoints.length} endpoints, ${models.length} models, ${workflows.length} workflows`);
  
  return {
    fileName,
    endpoints,
    models,
    workflows,
    relationships,
    chunks
  };
}

async function main() {
  console.log('🚀 Starting Channex Documentation Parser\n');
  
  // Initialize storage
  const storage = new SupabaseStorage(
    process.env.KNOWLEDGE_DB_URL!,
    process.env.KNOWLEDGE_DB_SERVICE_KEY!
  );
  
  // Check if we should clear existing data
  const args = process.argv.slice(2);
  if (args.includes('--clear')) {
    console.log('🗑️  Clearing existing data...');
    await storage.clearAllData();
  }
  
  // Get all documentation files
  const docsDir = path.join(process.cwd(), 'channex-docs');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  console.log(`📚 Found ${mdFiles.length} documentation files\n`);
  
  // Process files
  const allResults: ParseResult[] = [];
  const batchSize = parseInt(process.env.BATCH_SIZE || '10');
  
  for (let i = 0; i < mdFiles.length; i += batchSize) {
    const batch = mdFiles.slice(i, i + batchSize);
    console.log(`\n🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(mdFiles.length / batchSize)}`);
    
    const batchResults = await Promise.all(
      batch.map(file => parseDocumentationFile(path.join(docsDir, file)))
    );
    
    allResults.push(...batchResults);
  }
  
  // Aggregate results
  console.log('\n📊 Aggregating results...');
  
  const allEndpoints = allResults.flatMap(r => r.endpoints);
  const allModels = allResults.flatMap(r => r.models);
  const allWorkflows = allResults.flatMap(r => r.workflows);
  const allRelationships = allResults.flatMap(r => r.relationships);
  const allChunks = allResults.flatMap(r => r.chunks);
  
  // Remove duplicates
  const uniqueEndpoints = Array.from(
    new Map(allEndpoints.map(e => [e.id, e])).values()
  );
  const uniqueModels = Array.from(
    new Map(allModels.map(m => [m.id, m])).values()
  );
  const uniqueRelationships = Array.from(
    new Map(allRelationships.map(r => [r.id, r])).values()
  );
  
  console.log(`
📈 Parsing Summary:
  - Endpoints: ${uniqueEndpoints.length}
  - Data Models: ${uniqueModels.length}
  - Workflows: ${allWorkflows.length}
  - Relationships: ${uniqueRelationships.length}
  - Document Chunks: ${allChunks.length}
  `);
  
  // Store in Supabase
  console.log('\n💾 Storing in Supabase...');
  
  try {
    // Store endpoints
    if (uniqueEndpoints.length > 0) {
      console.log('  - Storing endpoints...');
      await storage.storeEndpoints(uniqueEndpoints);
    }
    
    // Store models
    if (uniqueModels.length > 0) {
      console.log('  - Storing data models...');
      await storage.storeDataModels(uniqueModels);
    }
    
    // Store workflows
    if (allWorkflows.length > 0) {
      console.log('  - Storing workflows...');
      await storage.storeWorkflows(allWorkflows);
    }
    
    // Generate and store embeddings for chunks
    if (allChunks.length > 0 && process.env.OPENAI_API_KEY) {
      console.log('  - Generating embeddings for chunks...');
      const embeddingGen = new EmbeddingGenerator(
        process.env.OPENAI_API_KEY,
        process.env.OPENAI_MODEL || 'text-embedding-3-small'
      );
      
      // Process in batches to avoid rate limits
      const chunkBatchSize = 10;
      for (let i = 0; i < allChunks.length; i += chunkBatchSize) {
        const batch = allChunks.slice(i, i + chunkBatchSize);
        const embeddings = await embeddingGen.generateEmbeddings(
          batch.map(c => c.content)
        );
        
        // Add embeddings to chunks
        batch.forEach((chunk, idx) => {
          chunk.embedding = embeddings[idx];
        });
        
        await storage.storeDocumentChunks(batch);
        console.log(`    Processed ${i + batch.length}/${allChunks.length} chunks`);
      }
    } else {
      console.log('  - Storing chunks without embeddings...');
      await storage.storeDocumentChunks(allChunks);
    }
    
    // Store graph representation
    console.log('  - Storing graph nodes and edges...');
    
    // Convert to graph nodes
    const graphNodes = [
      ...uniqueEndpoints.map(e => ({
        nodeId: e.id,
        nodeType: 'endpoint',
        properties: {
          method: e.method,
          path: e.path,
          category: e.category,
          description: e.description
        }
      })),
      ...uniqueModels.map(m => ({
        nodeId: m.id,
        nodeType: 'model',
        properties: {
          name: m.name,
          description: m.description,
          fieldCount: m.fields.length
        }
      }))
    ];
    
    await storage.storeGraphNodes(graphNodes);
    await storage.storeGraphEdges(uniqueRelationships);
    
    // Get final statistics
    const stats = await storage.getStatistics();
    console.log('\n✅ Storage complete! Final statistics:');
    Object.entries(stats).forEach(([table, count]) => {
      console.log(`  - ${table}: ${count} records`);
    });
    
  } catch (error) {
    console.error('❌ Error storing data:', error);
    process.exit(1);
  }
  
  console.log('\n🎉 Knowledge graph building complete!');
}

// Run the parser
main().catch(console.error);