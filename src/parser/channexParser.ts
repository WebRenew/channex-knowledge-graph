import { marked } from 'marked';
import * as cheerio from 'cheerio';
import {
  EndpointNode,
  DataModelNode,
  WorkflowNode,
  RelationshipEdge,
  Parameter,
  Field,
  ErrorPattern,
  Example
} from '../types';

export class ChannexDocParser {
  private content: string;
  private fileName: string;
  private $: cheerio.CheerioAPI;

  constructor(content: string, fileName: string) {
    this.content = content;
    this.fileName = fileName;
    const html = marked(content);
    this.$ = cheerio.load(html);
  }

  /**
   * Parse API endpoints from documentation
   */
  parseEndpoints(): EndpointNode[] {
    const endpoints: EndpointNode[] = [];
    
    // Look for API endpoint patterns in the content
    const endpointRegex = /(GET|POST|PUT|DELETE|PATCH)\s+\/api\/v\d+\/[\w\-\/:{}]+/g;
    const matches = this.content.matchAll(endpointRegex);
    
    for (const match of matches) {
      const [fullMatch, method] = match;
      const path = fullMatch.replace(method, '').trim();
      
      // Extract context around the endpoint
      const contextStart = Math.max(0, match.index! - 500);
      const contextEnd = Math.min(this.content.length, match.index! + 1000);
      const context = this.content.slice(contextStart, contextEnd);
      
      const endpoint: EndpointNode = {
        id: `${method}-${path}`.replace(/[^\w\-]/g, '-'),
        method: method as any,
        path: path,
        category: this.extractCategory(path),
        description: this.extractDescription(context, fullMatch),
        parameters: this.extractParameters(context),
        examples: this.extractExamples(context),
        relatedEndpoints: [],
        commonErrors: this.extractErrors(context)
      };
      
      endpoints.push(endpoint);
    }
    
    return endpoints;
  }

  /**
   * Parse data models from documentation
   */
  parseDataModels(): DataModelNode[] {
    const models: DataModelNode[] = [];
    
    // Look for model definitions (tables, JSON schemas, etc.)
    const modelSections = this.findModelSections();
    
    for (const section of modelSections) {
      const model = this.extractModelFromSection(section);
      if (model) {
        models.push(model);
      }
    }
    
    return models;
  }

  /**
   * Parse workflow patterns from documentation
   */
  parseWorkflows(): WorkflowNode[] {
    const workflows: WorkflowNode[] = [];
    
    // Look for workflow/process descriptions
    const workflowSections = this.findWorkflowSections();
    
    for (const section of workflowSections) {
      const workflow = this.extractWorkflowFromSection(section);
      if (workflow) {
        workflows.push(workflow);
      }
    }
    
    return workflows;
  }

  /**
   * Extract relationships between entities
   */
  extractRelationships(): RelationshipEdge[] {
    const relationships: RelationshipEdge[] = [];
    
    // Look for relationship indicators
    const relationshipPatterns = [
      /(\w+)\s+has\s+many\s+(\w+)/gi,
      /(\w+)\s+belongs\s+to\s+(\w+)/gi,
      /(\w+)\s+references\s+(\w+)/gi,
      /(\w+)\s+contains\s+(\w+)/gi,
      /(\w+)\s+returns\s+(\w+)/gi
    ];
    
    for (const pattern of relationshipPatterns) {
      const matches = this.content.matchAll(pattern);
      for (const match of matches) {
        const [_, source, target] = match;
        relationships.push({
          id: `${source}-${target}`.toLowerCase(),
          source: source.toLowerCase(),
          target: target.toLowerCase(),
          type: this.determineRelationType(match[0])
        });
      }
    }
    
    return relationships;
  }

  // Helper methods (to be continued...)
  // Helper methods
  private extractCategory(path: string): string {
    const parts = path.split('/').filter(p => p && !p.includes('{'));
    // Usually category is after /api/v1/
    return parts[3] || 'general';
  }

  private extractDescription(context: string, endpoint: string): string {
    // Look for description before or after the endpoint
    const lines = context.split('\n');
    const endpointIndex = lines.findIndex(line => line.includes(endpoint));
    
    // Check previous lines for description
    for (let i = endpointIndex - 1; i >= 0 && i > endpointIndex - 5; i--) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.includes('```')) {
        return line;
      }
    }
    
    // Check following lines
    for (let i = endpointIndex + 1; i < lines.length && i < endpointIndex + 5; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.includes('```')) {
        return line;
      }
    }
    
    return '';
  }

  private extractParameters(context: string): Parameter[] {
    const parameters: Parameter[] = [];
    
    // Look for parameter definitions
    const paramPatterns = [
      /\*\s+`(\w+)`\s*[\-:]\s*(.+)/g,
      /\|\s*(\w+)\s*\|\s*(\w+)\s*\|\s*(.+?)\s*\|/g,
      /:(\w+)\s*[\-:]\s*(.+)/g
    ];
    
    for (const pattern of paramPatterns) {
      const matches = context.matchAll(pattern);
      for (const match of matches) {
        const name = match[1];
        const description = match[match.length - 1];
        
        parameters.push({
          name,
          in: this.determineParameterLocation(name, context),
          description,
          required: this.isParameterRequired(name, context),
          schema: { type: 'string' } // Default, should be improved
        });
      }
    }
    
    return parameters;
  }

  private extractExamples(context: string): Example[] {
    const examples: Example[] = [];
    
    // Look for code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const matches = context.matchAll(codeBlockRegex);
    
    for (const match of matches) {
      const [_, language, code] = match;
      examples.push({
        title: 'Example',
        code,
        language: language || 'bash'
      });
    }
    
    return examples;
  }

  private extractErrors(context: string): ErrorPattern[] {
    const errors: ErrorPattern[] = [];
    
    // Look for error patterns
    const errorPatterns = [
      /(\d{3})\s*[\-:]\s*(.+)/g,
      /Error:\s*(.+)/g,
      /\berror\s+code\s+(\w+)/gi
    ];
    
    for (const pattern of errorPatterns) {
      const matches = context.matchAll(pattern);
      for (const match of matches) {
        errors.push({
          code: match[1],
          type: 'api_error',
          description: match[match.length - 1],
          commonCauses: [],
          solutions: []
        });
      }
    }
    
    return errors;
  }

  private findModelSections(): string[] {
    const sections: string[] = [];
    
    // Look for sections that might contain model definitions
    const modelIndicators = [
      'Model', 'Schema', 'Structure', 'Properties',
      'Fields', 'Attributes', 'Table', 'Object'
    ];
    
    this.$('h2, h3, h4').each((_, elem) => {
      const heading = this.$(elem).text();
      if (modelIndicators.some(indicator => 
        heading.toLowerCase().includes(indicator.toLowerCase())
      )) {
        const section = this.extractSectionContent(elem);
        sections.push(section);
      }
    });
    
    return sections;
  }

  private findWorkflowSections(): string[] {
    const sections: string[] = [];
    
    // Look for workflow indicators
    const workflowIndicators = [
      'Workflow', 'Process', 'Flow', 'Steps',
      'Guide', 'Tutorial', 'How to', 'Procedure'
    ];
    
    this.$('h2, h3, h4').each((_, elem) => {
      const heading = this.$(elem).text();
      if (workflowIndicators.some(indicator => 
        heading.toLowerCase().includes(indicator.toLowerCase())
      )) {
        const section = this.extractSectionContent(elem);
        sections.push(section);
      }
    });
    
    return sections;
  }

  private extractSectionContent(elem: cheerio.Element): string {
    let content = '';
    let current = this.$(elem).next();
    
    while (current.length && !current.is('h1, h2, h3')) {
      content += current.text() + '\n';
      current = current.next();
    }
    
    return content;
  }

  private extractModelFromSection(section: string): DataModelNode | null {
    // This is a simplified version - should be enhanced with better parsing
    const nameMatch = section.match(/(\w+)\s+(?:Model|Schema|Object)/i);
    if (!nameMatch) return null;
    
    return {
      id: nameMatch[1].toLowerCase(),
      name: nameMatch[1],
      description: section.split('\n')[0],
      fields: this.extractFields(section),
      relationships: [],
      validations: [],
      timestamps: section.toLowerCase().includes('timestamp')
    };
  }

  private extractWorkflowFromSection(section: string): WorkflowNode | null {
    const nameMatch = section.match(/(\w+)\s+(?:Workflow|Process|Flow)/i);
    if (!nameMatch) return null;
    
    return {
      id: nameMatch[1].toLowerCase(),
      name: nameMatch[1],
      description: section.split('\n')[0],
      steps: this.extractWorkflowSteps(section),
      requiredEndpoints: [],
      dataFlow: []
    };
  }

  private extractFields(section: string): Field[] {
    const fields: Field[] = [];
    
    // Look for field definitions in tables or lists
    const fieldRegex = /[*-]\s*`?(\w+)`?\s*[(:]\s*(\w+)(?:\s*[,-]\s*(.+))?/g;
    const matches = section.matchAll(fieldRegex);
    
    for (const match of matches) {
      fields.push({
        name: match[1],
        type: match[2],
        description: match[3] || '',
        required: false
      });
    }
    
    return fields;
  }

  private extractWorkflowSteps(section: string): any[] {
    const steps: any[] = [];
    
    // Look for numbered steps or bullet points
    const stepRegex = /(\d+)[.)\s]+(.+)/g;
    const matches = section.matchAll(stepRegex);
    
    let order = 1;
    for (const match of matches) {
      steps.push({
        order: order++,
        name: `Step ${match[1]}`,
        description: match[2],
        inputs: [],
        outputs: []
      });
    }
    
    return steps;
  }

  private determineParameterLocation(name: string, context: string): 'path' | 'query' | 'header' {
    if (context.includes(`{${name}}`) || context.includes(`:${name}`)) {
      return 'path';
    }
    if (name.toLowerCase().includes('token') || name.toLowerCase().includes('auth')) {
      return 'header';
    }
    return 'query';
  }

  private isParameterRequired(name: string, context: string): boolean {
    return context.toLowerCase().includes(`${name} is required`) ||
           context.toLowerCase().includes(`required: ${name}`) ||
           context.includes(`{${name}}`);
  }

  private determineRelationType(match: string): 'uses' | 'returns' | 'modifies' | 'requires' | 'contains' {
    const lower = match.toLowerCase();
    if (lower.includes('returns')) return 'returns';
    if (lower.includes('modifies') || lower.includes('updates')) return 'modifies';
    if (lower.includes('requires')) return 'requires';
    if (lower.includes('contains') || lower.includes('has')) return 'contains';
    return 'uses';
  }
}