# Neo4j Visualization Queries

## Access Neo4j Browser
1. Open: http://localhost:7474
2. Login: neo4j / channex123

## Visualization Queries

### 1. View Complete Domain Hierarchy
```cypher
// Shows Property → RoomType → RatePlan hierarchy
MATCH (p:Property)-[r:HAS_CHILD*]-(child)
RETURN p, r, child
```

### 2. View All Domain Entities and Relationships
```cypher
// Shows all domain entities and how they connect
MATCH (n:DomainEntity)-[r]-(m)
WHERE n.name IN ['Property', 'RoomType', 'RatePlan', 'Booking', 'Channel']
RETURN n, r, m
```

### 3. View API Endpoints by Domain
```cypher
// Shows which endpoints operate on which domains
MATCH (e:APIEndpoint)-[r:OPERATES_ON]->(d:DomainEntity)
RETURN e, r, d
```

### 4. View Availability and Restrictions Scoping
```cypher
// Shows how ARI concepts are scoped
MATCH (concept:DomainConcept)-[r:SCOPED_TO]->(entity:DomainEntity)
RETURN concept, r, entity
```

### 5. View Property Setup Workflow
```cypher
// Shows the complete property setup flow
MATCH (pattern:APIPattern {name: 'Property Setup Flow'})-[r:HAS_STEP]->(step:APIStep)
MATCH (step)-[next:NEXT*0..]->(following)
RETURN pattern, r, step, next, following
```

### 6. View Everything (Small Graph)
```cypher
// Shows entire graph - use only for small datasets
MATCH (n)-[r]->(m)
RETURN n, r, m
LIMIT 100
```

### 7. View Booking Relationships
```cypher
// Shows how bookings relate to other entities
MATCH (b:Booking)-[r]->(entity)
RETURN b, r, entity
```

### 8. View API Coverage
```cypher
// Shows all endpoints with their domain connections
MATCH (e:APIEndpoint)
OPTIONAL MATCH (e)-[r:OPERATES_ON]->(d:DomainEntity)
OPTIONAL MATCH (e)-[m:MANAGES]->(c:DomainConcept)
RETURN e, r, d, m, c
```

## Neo4j Browser Tips

### Navigation
- **Click and drag** nodes to rearrange
- **Double-click** a node to expand its relationships
- **Scroll** to zoom in/out
- **Click** a node/relationship to see properties

### Styling
1. Click the node label at the top (e.g., "DomainEntity")
2. Choose color, size, and caption
3. Good color scheme:
   - Property: Blue
   - RoomType: Green  
   - RatePlan: Orange
   - APIEndpoint: Purple
   - Booking: Red

### Export
- Click the download icon to export as:
  - PNG image
  - SVG vector graphic
  - JSON data

### Useful Commands
- `:play start` - Interactive tutorial
- `:schema` - View database schema
- `:sysinfo` - System information
- `:clear` - Clear the visualization

### Layout Options
Click the layout icon (bottom right) to switch between:
- Force-directed layout (default)
- Hierarchical layout
- Radial layout
- Grid layout