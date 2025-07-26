#!/bin/bash

# Script to run Claude with the Channex Knowledge Graph MCP server

# Set environment variables
export KNOWLEDGE_DB_URL="postgresql://postgres:=Channex123@db.czysljuglsdvtxbwavyz.supabase.co:5432/postgres"
export KNOWLEDGE_DB_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eXNsanVnbHNkdnR4Yndhdnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTE1MDQsImV4cCI6MjA2OTEyNzUwNH0.Cz4dAYmMWMhueKu7I2e0h9WRwltqimebfxLPD9YGyIU"
export KNOWLEDGE_DB_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eXNsanVnbHNkdnR4Yndhdnl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzU1MTUwNCwiZXhwIjoyMDY5MTI3NTA0fQ.jz8l_7nYyEJpdAq23EN6rIEgA6unFkH2eKm4k1moPX8"

# Run Claude with MCP server
echo "Starting Claude with Channex Knowledge Graph MCP server..."
npx @anthropic-ai/claude-desktop --mcp "node $(pwd)/dist/mcp-server.js"