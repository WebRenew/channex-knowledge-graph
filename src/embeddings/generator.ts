import { DocumentChunk } from '../types';
import OpenAI from 'openai';

export class EmbeddingGenerator {
  private openai: OpenAI | null = null;
  private model: string;
  private dimensions: number;

  constructor(apiKey: string, model: string = 'text-embedding-3-small', dimensions: number = 1536) {
    if (apiKey && apiKey !== 'your-openai-api-key-here') {
      this.openai = new OpenAI({ apiKey });
    }
    this.model = model;
    this.dimensions = dimensions;
  }

  /**
   * Generate embedding for a single text
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.openai) {
      console.warn('OpenAI API key not configured. Using placeholder embeddings.');
      return new Array(this.dimensions).fill(0).map(() => Math.random());
    }

    try {
      const response = await this.openai.embeddings.create({
        model: this.model,
        input: text,
        dimensions: this.dimensions
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Fallback to random embeddings
      return new Array(this.dimensions).fill(0).map(() => Math.random());
    }
  }

  /**
   * Generate embeddings for multiple texts
   */
  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    if (!this.openai) {
      console.warn('OpenAI API key not configured. Using placeholder embeddings.');
      return texts.map(() => new Array(this.dimensions).fill(0).map(() => Math.random()));
    }

    try {
      // OpenAI supports batch embedding
      const response = await this.openai.embeddings.create({
        model: this.model,
        input: texts,
        dimensions: this.dimensions
      });

      return response.data.map(item => item.embedding);
    } catch (error) {
      console.error('Error generating embeddings:', error);
      // Fallback to random embeddings
      return texts.map(() => new Array(this.dimensions).fill(0).map(() => Math.random()));
    }
  }

  /**
   * Chunk a document into smaller pieces
   */
  chunkDocument(
    content: string,
    source: string,
    chunkSize: number = 1000,
    overlap: number = 200
  ): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    const lines = content.split('\n');
    
    let currentChunk = '';
    let currentLines: string[] = [];
    let chunkIndex = 0;
    
    for (const line of lines) {
      currentLines.push(line);
      currentChunk = currentLines.join('\n');
      
      if (currentChunk.length >= chunkSize) {
        // Create chunk
        chunks.push({
          id: `${source}-chunk-${chunkIndex}`,
          content: currentChunk,
          metadata: {
            source,
            section: this.extractSection(currentLines),
            type: this.detectContentType(currentChunk),
            keywords: this.extractKeywords(currentChunk)
          }
        });
        
        // Keep overlap
        const overlapLines = Math.ceil(overlap / (currentChunk.length / currentLines.length));
        currentLines = currentLines.slice(-overlapLines);
        chunkIndex++;
      }
    }
    
    // Add remaining content
    if (currentLines.length > 0) {
      chunks.push({
        id: `${source}-chunk-${chunkIndex}`,
        content: currentLines.join('\n'),
        metadata: {
          source,
          section: this.extractSection(currentLines),
          type: this.detectContentType(currentLines.join('\n')),
          keywords: this.extractKeywords(currentLines.join('\n'))
        }
      });
    }
    
    return chunks;
  }

  private extractSection(lines: string[]): string {
    // Find the last heading
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].match(/^#+\s/)) {
        return lines[i].replace(/^#+\s/, '').trim();
      }
    }
    return 'General';
  }

  private detectContentType(content: string): 'endpoint' | 'model' | 'workflow' | 'general' {
    const lower = content.toLowerCase();
    
    if (lower.includes('get /') || lower.includes('post /') || 
        lower.includes('put /') || lower.includes('delete /')) {
      return 'endpoint';
    }
    
    if (lower.includes('model') || lower.includes('schema') || 
        lower.includes('properties') || lower.includes('fields')) {
      return 'model';
    }
    
    if (lower.includes('workflow') || lower.includes('process') || 
        lower.includes('steps') || lower.includes('flow')) {
      return 'workflow';
    }
    
    return 'general';
  }

  private extractKeywords(content: string): string[] {
    // Extract important keywords
    const keywords = new Set<string>();
    
    // API-related keywords
    const apiKeywords = content.match(/\b(GET|POST|PUT|DELETE|PATCH|api|endpoint|request|response)\b/gi) || [];
    apiKeywords.forEach(k => keywords.add(k.toLowerCase()));
    
    // Model-related keywords
    const modelKeywords = content.match(/\b(property|properties|booking|room|rate|channel|guest|availability)\b/gi) || [];
    modelKeywords.forEach(k => keywords.add(k.toLowerCase()));
    
    // Technical keywords
    const techKeywords = content.match(/\b(authentication|token|webhook|pagination|filter|sort)\b/gi) || [];
    techKeywords.forEach(k => keywords.add(k.toLowerCase()));
    
    return Array.from(keywords).slice(0, 10); // Limit to 10 keywords
  }
}