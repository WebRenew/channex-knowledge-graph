// Main entry point for the Channex Knowledge Graph Builder

export * from './types';
export { ChannexDocParser } from './parser/channexParser';
export { SupabaseStorage } from './storage/supabaseStorage';
export { EmbeddingGenerator } from './embeddings/generator';

console.log('Channex Knowledge Graph Builder loaded');
