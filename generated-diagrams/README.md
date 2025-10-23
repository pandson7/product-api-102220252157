# Product API - AWS Architecture Diagrams

This directory contains AWS architecture diagrams generated for the Product API project based on the technical design specifications in `/specs/design.md`.

## Generated Diagrams

### 1. Product API - AWS Serverless Architecture (`product-api-architecture.png`)
**Purpose**: High-level overview of the serverless architecture
**Components**:
- API Client (User)
- API Gateway (HTTP API)
- Lambda Functions (getProducts, getProductById, initializeData)
- DynamoDB Products Table
- IAM Execution Role

**Key Features**:
- Shows the main components and their relationships
- Demonstrates the serverless architecture pattern
- Illustrates the separation of concerns between API layer, compute layer, and data layer

### 2. Product API - Data Flow & Endpoints (`product-api-data-flow.png`)
**Purpose**: Detailed view of API endpoints and data flow
**Components**:
- Client Applications (Web Client, Mobile App)
- API Gateway with specific endpoints (GET /products, GET /products/{id})
- Lambda Functions for business logic
- DynamoDB table with sample data categories
- IAM security layer

**Key Features**:
- Shows specific API endpoints
- Illustrates data flow from clients to database
- Displays sample data categories (Electronics, Clothing, Home & Garden, Books, Sports)
- Demonstrates security integration with IAM

### 3. Product API - Infrastructure & Deployment (`product-api-infrastructure.png`)
**Purpose**: Infrastructure components and deployment workflow
**Components**:
- Developer workflow with AWS CDK
- AWS Cloud services organization
- Compute, API Management, Database, Security & Monitoring clusters
- Configuration management

**Key Features**:
- Shows Infrastructure as Code approach with CDK
- Demonstrates service organization and dependencies
- Illustrates monitoring and configuration management
- Shows deployment workflow from development to cloud

## Architecture Highlights

### Serverless Design
- **API Gateway**: HTTP API with CORS enabled for web and mobile clients
- **Lambda Functions**: Node.js runtime with specific functions for different operations
- **DynamoDB**: NoSQL database with on-demand billing and flexible schema

### Security
- **IAM Roles**: Least privilege access for Lambda functions
- **HTTPS**: Secure API endpoints
- **Input Validation**: Implemented in Lambda functions

### Scalability
- **Auto-scaling**: Built-in with serverless services
- **On-demand**: DynamoDB scaling based on usage
- **Stateless**: Lambda functions for horizontal scaling

### Cost Optimization
- **Pay-per-use**: Serverless billing model
- **On-demand DynamoDB**: No provisioned capacity
- **Efficient Lambda sizing**: Optimized for performance and cost

## API Endpoints

### GET /products
- Retrieves all products with optional filtering
- Returns array of product objects
- Status codes: 200 (success), 500 (server error)

### GET /products/{id}
- Retrieves specific product by ID
- Returns single product object
- Status codes: 200 (success), 404 (not found), 500 (server error)

## Data Model
Products are stored with the following schema:
- `productId` (String, Primary Key)
- `name`, `category`, `brand` (Required strings)
- `description`, `price` (Optional)
- `specifications` (Flexible object)
- `createdAt`, `updatedAt` (ISO timestamps)

## Deployment
The infrastructure is deployed using AWS CDK with:
- Single stack deployment
- Environment-specific configuration
- Automated sample data population
- Infrastructure as Code best practices
