# Product API Solution

## Overview

This is a serverless AWS Product API solution that provides RESTful endpoints for accessing product specifications. The system uses AWS CDK for infrastructure as code, Lambda functions for business logic, DynamoDB for data storage, and API Gateway for HTTP API management.

## Architecture

- **API Gateway**: HTTP API endpoints with CORS enabled
- **Lambda Functions**: Node.js functions for business logic
- **DynamoDB**: NoSQL database with flexible JSON schema
- **CDK**: Infrastructure as Code deployment

## API Endpoints

### Base URL
```
https://ekpn449unb.execute-api.us-east-1.amazonaws.com/prod/
```

### Endpoints

#### GET /products
Retrieve all products from the database.

**Response**: Array of product objects
**Status Codes**: 200 (success), 500 (server error)

**Example Request:**
```bash
curl "https://ekpn449unb.execute-api.us-east-1.amazonaws.com/prod/products"
```

#### GET /products/{id}
Retrieve a specific product by ID.

**Parameters**: 
- `id` (path parameter): Product ID

**Response**: Single product object
**Status Codes**: 200 (success), 404 (not found), 500 (server error)

**Example Request:**
```bash
curl "https://ekpn449unb.execute-api.us-east-1.amazonaws.com/prod/products/prod-001"
```

## Data Model

### Product Schema
```json
{
  "productId": "string",
  "name": "string",
  "category": "string", 
  "brand": "string",
  "description": "string",
  "price": "number",
  "specifications": {
    "key": "value"
  },
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

### Sample Data Categories
- **Electronics**: smartphones, laptops with tech specifications
- **Clothing**: apparel with material and care information
- **Home & Garden**: furniture with warranty and adjustment details
- **Books**: publications with ISBN, pages, and format information
- **Sports & Outdoors**: equipment and accessories

## Flexible Schema Examples

The system demonstrates flexible schema capabilities with different product types:

**Electronics Product:**
```json
{
  "productId": "prod-001",
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "brand": "Apple",
  "specifications": {
    "storage": "256GB",
    "color": "Natural Titanium",
    "display": "6.1-inch Super Retina XDR"
  }
}
```

**Clothing Product:**
```json
{
  "productId": "prod-003", 
  "name": "Classic Cotton T-Shirt",
  "category": "Clothing",
  "brand": "BasicWear",
  "specifications": {
    "material": "100% Cotton",
    "fit": "Regular",
    "care": "Machine washable"
  }
}
```

## AWS Resources Created

### DynamoDB Table
- **Name**: `Products-102220252157`
- **Primary Key**: `productId` (String)
- **Billing Mode**: Provisioned (5 read/5 write capacity units)

### Lambda Functions
- **getProducts-102220252157**: Retrieves all products
- **getProductById-102220252157**: Retrieves specific product by ID
- **initializeData-102220252157**: Populates sample data

### API Gateway
- **Name**: `Product API 102220252157`
- **Type**: REST API with CORS enabled

## Deployment

### Prerequisites
- AWS CLI configured with appropriate permissions
- Node.js and npm installed
- CDK CLI installed (`npm install -g aws-cdk`)

### Deploy Steps
1. Navigate to the CDK directory:
   ```bash
   cd /home/pandson/echo-architect-artifacts/product-api-102220252157/cdk-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Bootstrap CDK (if first time):
   ```bash
   npx cdk bootstrap
   ```

4. Deploy the stack:
   ```bash
   npx cdk deploy --require-approval never
   ```

5. Initialize sample data:
   ```bash
   aws lambda invoke --function-name initializeData-102220252157 --region us-east-1 /tmp/response.json
   ```

## Testing

### Test All Products Endpoint
```bash
curl "https://ekpn449unb.execute-api.us-east-1.amazonaws.com/prod/products" | jq .
```

### Test Single Product Endpoint
```bash
curl "https://ekpn449unb.execute-api.us-east-1.amazonaws.com/prod/products/prod-001" | jq .
```

### Test Error Handling
```bash
curl "https://ekpn449unb.execute-api.us-east-1.amazonaws.com/prod/products/invalid-id" | jq .
```

## Project Structure

```
product-api-102220252157/
├── cdk-app/
│   ├── bin/
│   │   └── cdk-app.ts          # CDK app entry point
│   ├── lib/
│   │   └── cdk-app-stack.ts    # CDK stack definition
│   ├── lambda/
│   │   ├── getProducts.js      # Get all products function
│   │   ├── getProductById.js   # Get product by ID function
│   │   ├── initializeData.js   # Sample data initialization
│   │   └── package.json        # Lambda dependencies
│   ├── package.json            # CDK dependencies
│   └── cdk.json               # CDK configuration
├── specs/
│   ├── requirements.md         # Requirements specification
│   ├── design.md              # Technical design document
│   └── tasks.md               # Implementation tasks
└── README.md                  # This file
```

## Error Handling

The API returns standardized error responses:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

### Common Error Scenarios
- **400 Bad Request**: Invalid request parameters
- **404 Not Found**: Product not found
- **500 Internal Server Error**: Server-side errors

## Performance Considerations

- **DynamoDB**: Provisioned capacity for consistent performance
- **Lambda**: Optimized for minimal cold start impact
- **API Gateway**: Built-in throttling and caching capabilities

## Security Features

- **IAM**: Least privilege access for Lambda functions
- **HTTPS**: All API endpoints use HTTPS
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Parameter validation in Lambda functions

## Cleanup

To remove all resources:
```bash
cd /home/pandson/echo-architect-artifacts/product-api-102220252157/cdk-app
npx cdk destroy
```

## Sample API Responses

### GET /products Response
```json
[
  {
    "productId": "prod-001",
    "name": "iPhone 15 Pro",
    "category": "Electronics",
    "brand": "Apple",
    "description": "Latest iPhone with advanced camera system",
    "price": 999.99,
    "specifications": {
      "storage": "256GB",
      "color": "Natural Titanium",
      "display": "6.1-inch Super Retina XDR"
    },
    "createdAt": "2025-10-23T02:07:33.295Z",
    "updatedAt": "2025-10-23T02:07:33.295Z"
  }
]
```

### GET /products/{id} Success Response
```json
{
  "productId": "prod-001",
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "brand": "Apple",
  "description": "Latest iPhone with advanced camera system",
  "price": 999.99,
  "specifications": {
    "storage": "256GB",
    "color": "Natural Titanium", 
    "display": "6.1-inch Super Retina XDR"
  },
  "createdAt": "2025-10-23T02:07:33.295Z",
  "updatedAt": "2025-10-23T02:07:33.295Z"
}
```

### GET /products/{id} Error Response
```json
{
  "error": "Not Found",
  "message": "Product not found"
}
```

## Implementation Status

✅ **Completed Tasks:**
- [x] CDK Infrastructure setup with DynamoDB, Lambda, and API Gateway
- [x] DynamoDB table with flexible JSON schema
- [x] Lambda function for retrieving all products
- [x] Lambda function for retrieving product by ID
- [x] Sample data generation and population
- [x] API Gateway endpoints configuration
- [x] Error handling and response formatting
- [x] End-to-end testing and validation
- [x] Documentation and README

All requirements have been successfully implemented and tested. The Product API is fully functional and ready for use.
