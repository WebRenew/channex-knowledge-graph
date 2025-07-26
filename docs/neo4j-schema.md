# Neo4j Schema Design for Channex Knowledge Graph

## Node Types

### 1. API Nodes

#### :Endpoint
Represents API endpoints from Channex documentation.
```cypher
(:Endpoint {
  id: String,           // UUID
  path: String,         // e.g., "/api/v1/properties/{id}"
  method: String,       // GET, POST, PUT, DELETE
  category: String,     // properties, bookings, channels, etc.
  description: String,
  authentication: String,
  rate_limit: String,
  doc_reference: String,
  updated_at: DateTime
})
```

#### :DataModel
Represents data structures and models.
```cypher
(:DataModel {
  id: String,
  name: String,         // e.g., "Property", "Booking"
  description: String,
  attributes: String,   // JSON string of attributes
  doc_reference: String,
  updated_at: DateTime
})
```

#### :Workflow
Represents common API usage patterns.
```cypher
(:Workflow {
  id: String,
  name: String,
  description: String,
  steps: String,        // JSON array of steps
  category: String,
  updated_at: DateTime
})
```

### 2. Domain Nodes

#### :Property
Represents a property in the Channex system.
```cypher
(:Property {
  id: String,
  name: String,
  model_id: String,     // Reference to DataModel
  updated_at: DateTime
})
```

#### :RoomType
Represents room types within properties.
```cypher
(:RoomType {
  id: String,
  name: String,
  model_id: String,
  updated_at: DateTime
})
```

#### :RatePlan
Represents rate plans for room types.
```cypher
(:RatePlan {
  id: String,
  name: String,
  model_id: String,
  updated_at: DateTime
})
```

#### :Booking
Represents bookings in the system.
```cypher
(:Booking {
  id: String,
  name: String,
  model_id: String,
  updated_at: DateTime
})
```

#### :Channel
Represents distribution channels.
```cypher
(:Channel {
  id: String,
  name: String,
  model_id: String,
  updated_at: DateTime
})
```

## Relationship Types

### API Relationships

#### :RETURNS
Links endpoints to the data models they return.
```cypher
(:Endpoint)-[:RETURNS]->(:DataModel)
```

#### :ACCEPTS
Links endpoints to the data models they accept as input.
```cypher
(:Endpoint)-[:ACCEPTS]->(:DataModel)
```

#### :USES_ENDPOINT
Links workflows to the endpoints they utilize.
```cypher
(:Workflow)-[:USES_ENDPOINT]->(:Endpoint)
```

### Domain Relationships

#### :HAS_ROOM_TYPE
Links properties to their room types.
```cypher
(:Property)-[:HAS_ROOM_TYPE]->(:RoomType)
```

#### :HAS_RATE_PLAN
Links room types to their rate plans.
```cypher
(:RoomType)-[:HAS_RATE_PLAN]->(:RatePlan)
```

#### :BOOKS_PROPERTY
Links bookings to properties.
```cypher
(:Booking)-[:BOOKS_PROPERTY]->(:Property)
```

#### :DISTRIBUTED_BY
Links properties to channels.
```cypher
(:Property)-[:DISTRIBUTED_BY]->(:Channel)
```

#### :HAS_AVAILABILITY
Links properties/room types to availability.
```cypher
(:RoomType)-[:HAS_AVAILABILITY]->(:Availability)
```

## Indexes

For optimal performance, the following indexes are created:

```cypher
CREATE INDEX endpoint_path FOR (e:Endpoint) ON (e.path);
CREATE INDEX endpoint_method FOR (e:Endpoint) ON (e.method);
CREATE INDEX model_name FOR (m:DataModel) ON (m.name);
CREATE INDEX workflow_name FOR (w:Workflow) ON (w.name);
CREATE INDEX property_id FOR (p:Property) ON (p.id);
CREATE INDEX booking_id FOR (b:Booking) ON (b.id);
CREATE INDEX roomtype_id FOR (r:RoomType) ON (r.id);
CREATE INDEX rateplan_id FOR (r:RatePlan) ON (r.id);
CREATE INDEX channel_id FOR (c:Channel) ON (c.id);
```

## Usage Patterns

### 1. Find all endpoints that work with a specific model
```cypher
MATCH (e:Endpoint)-[:RETURNS|ACCEPTS]->(m:DataModel {name: 'Property'})
RETURN e.method, e.path, e.description
```

### 2. Trace a complete workflow
```cypher
MATCH (w:Workflow {name: 'Property Setup'})-[:USES_ENDPOINT]->(e:Endpoint)
RETURN w.name, collect(e.path) as endpoints
```

### 3. Find data model relationships
```cypher
MATCH path = (p:Property)-[*1..3]-(related)
WHERE p.name = 'Sample Property'
RETURN path
```

### 4. API dependency graph
```cypher
MATCH (e1:Endpoint)-[:RETURNS]->(m:DataModel)<-[:ACCEPTS]-(e2:Endpoint)
WHERE e1 <> e2
RETURN e1.path as source, m.name as model, e2.path as target
```