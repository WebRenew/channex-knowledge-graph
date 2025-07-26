// Type definitions for the Channex Knowledge Graph

export interface EndpointNode {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  category: string;
  description: string;
  authentication?: AuthRequirement;
  parameters: Parameter[];
  requestBody?: RequestBody;
  responseSchema?: ResponseSchema;
  relatedEndpoints: string[];
  commonErrors: ErrorPattern[];
  rateLimit?: RateLimit;
  examples: Example[];
}

export interface Parameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  description?: string;
  required: boolean;
  schema: JSONSchema;
  example?: any;
}

export interface RequestBody {
  description?: string;
  required: boolean;
  content: {
    [mediaType: string]: {
      schema: JSONSchema;
      example?: any;
    };
  };
}

export interface ResponseSchema {
  [statusCode: string]: {
    description: string;
    content?: {
      [mediaType: string]: {
        schema: JSONSchema;
        example?: any;
      };
    };
  };
}

export interface DataModelNode {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  relationships: ModelRelationship[];
  validations: Validation[];
  timestamps: boolean;
  examples?: any[];
}

export interface Field {
  name: string;
  type: string;
  description?: string;
  required: boolean;
  default?: any;
  enum?: string[];
  format?: string;
  validation?: Validation;
}

export interface ModelRelationship {
  type: 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
  model: string;
  foreignKey?: string;
  through?: string;
}

export interface WorkflowNode {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  requiredEndpoints: string[];
  dataFlow: DataFlow[];
}

export interface WorkflowStep {
  order: number;
  name: string;
  description: string;
  endpoint?: string;
  inputs: string[];
  outputs: string[];
  conditions?: string[];
}

export interface RelationshipEdge {
  id: string;
  source: string;
  target: string;
  type: 'uses' | 'returns' | 'modifies' | 'requires' | 'contains';
  cardinality?: 'one-to-one' | 'one-to-many' | 'many-to-many';
  metadata?: Record<string, any>;
}

export interface APIPattern {
  id: string;
  type: 'request' | 'response' | 'error' | 'auth' | 'pagination';
  name: string;
  description: string;
  implementation: Record<string, any>;
  examples: Example[];
}

export interface ErrorPattern {
  code: string;
  type: string;
  description: string;
  commonCauses: string[];
  solutions: string[];
  relatedEndpoints?: string[];
}

export interface Example {
  title: string;
  description?: string;
  request?: any;
  response?: any;
  code?: string;
  language?: string;
}

export interface AuthRequirement {
  type: 'apiKey' | 'oauth2' | 'basic' | 'bearer';
  in?: 'header' | 'query' | 'cookie';
  name?: string;
  scheme?: string;
  flows?: Record<string, any>;
}

export interface RateLimit {
  requests: number;
  window: string; // e.g., "1h", "1d"
  scope: 'user' | 'ip' | 'global';
}

export interface Validation {
  type: string;
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  format?: string;
  custom?: string;
}

export interface DataFlow {
  from: string;
  to: string;
  transformation?: string;
  condition?: string;
}

export interface JSONSchema {
  type?: string | string[];
  properties?: Record<string, JSONSchema>;
  items?: JSONSchema;
  required?: string[];
  additionalProperties?: boolean | JSONSchema;
  enum?: any[];
  format?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: any;
  description?: string;
  $ref?: string;
}

export interface ChannexKnowledgeGraph {
  metadata: {
    version: string;
    generatedAt: string;
    documentationSource: string;
    totalEndpoints: number;
    totalModels: number;
    totalWorkflows: number;
  };
  entities: {
    endpoints: EndpointNode[];
    dataModels: DataModelNode[];
    workflows: WorkflowNode[];
    relationships: RelationshipEdge[];
  };
  patterns: {
    apiPatterns: APIPattern[];
    errorHandling: ErrorPattern[];
    dataTransformations: TransformPattern[];
  };
}

export interface TransformPattern {
  id: string;
  name: string;
  description: string;
  inputSchema: JSONSchema;
  outputSchema: JSONSchema;
  transformation: string;
  examples: Example[];
}

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    section: string;
    subsection?: string;
    type: 'endpoint' | 'model' | 'workflow' | 'general';
    keywords: string[];
  };
  embedding?: number[];
}