#!/usr/bin/env node

import { config } from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';

config();

/**
 * Quick start script to get the knowledge graph up and running
 */
async function quickStart() {
  console.log(`
╔═══════════════════════════════════════════╗
║     Channex Knowledge Graph Builder       ║
║           Quick Start Guide               ║
╚═══════════════════════════════════════════╝
`);

  // Step 1: Check environment
  console.log('📋 Step 1: Checking environment setup...\n');
  
  const checks = {
    'Node.js version': process.version,
    'Project directory': process.cwd(),
    'Supabase URL': process.env.KNOWLEDGE_DB_URL ? '✅ Configured' : '❌ Missing',
    'Supabase Key': process.env.KNOWLEDGE_DB_SERVICE_KEY ? '✅ Configured' : '❌ Missing',
    'OpenAI API Key': process.env.OPENAI_API_KEY ? '✅ Configured' : '⚠️  Missing (embeddings disabled)',
  };
  
  Object.entries(checks).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  
  // Step 2: Check documentation files
  console.log('\n📚 Step 2: Checking documentation files...\n');
  
  try {
    const docsDir = path.join(process.cwd(), 'channex-docs');
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    console.log(`   Found ${mdFiles.length} documentation files`);
    console.log(`   Sample files:`);
    mdFiles.slice(0, 5).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (mdFiles.length > 5) {
      console.log(`   ... and ${mdFiles.length - 5} more`);
    }
  } catch (error) {
    console.log('   ❌ Documentation directory not found');
  }
  
  // Step 3: Next steps
  console.log('\n🚀 Step 3: Next steps...\n');
  
  console.log('   1. Install dependencies:');
  console.log('      npm install\n');
  
  console.log('   2. Add your OpenAI API key to .env:');
  console.log('      OPENAI_API_KEY=your-key-here\n');
  
  console.log('   3. Test the setup:');
  console.log('      npm run test:setup\n');
  
  console.log('   4. Parse the documentation:');
  console.log('      npm run parse\n');
  
  console.log('   5. Try example queries:');
  console.log('      npm run query\n');
  
  // Database info
  console.log('\n💾 Database Information:\n');
  console.log('   Project ID: czysljuglsdvtxbwavyz');
  console.log('   Schema: channex_knowledge');
  console.log('   Region: Auto-selected');
  console.log('   Tables: 10 (endpoints, data_models, workflows, etc.)');
  
  // Architecture reminder
  console.log('\n🏗️  Architecture Overview:\n');
  console.log('   1. Parser extracts endpoints, models, and relationships');
  console.log('   2. Embeddings generated for semantic search');
  console.log('   3. Graph structure enables relationship queries');
  console.log('   4. Hybrid approach: vector search + graph traversal');
  
  console.log('\n✨ Happy building!\n');
}

// Run the quick start
quickStart().catch(console.error);