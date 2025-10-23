const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const sampleProducts = [
  {
    productId: 'prod-001',
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    brand: 'Apple',
    description: 'Latest iPhone with advanced camera system',
    price: 999.99,
    specifications: {
      storage: '256GB',
      color: 'Natural Titanium',
      display: '6.1-inch Super Retina XDR'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    productId: 'prod-002',
    name: 'MacBook Air M3',
    category: 'Electronics',
    brand: 'Apple',
    description: 'Lightweight laptop with M3 chip',
    price: 1299.99,
    specifications: {
      processor: 'Apple M3',
      memory: '16GB',
      storage: '512GB SSD'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    productId: 'prod-003',
    name: 'Classic Cotton T-Shirt',
    category: 'Clothing',
    brand: 'BasicWear',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 24.99,
    specifications: {
      material: '100% Cotton',
      fit: 'Regular',
      care: 'Machine washable'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    productId: 'prod-004',
    name: 'Office Chair Pro',
    category: 'Home & Garden',
    brand: 'ComfortSeating',
    description: 'Ergonomic office chair with lumbar support',
    price: 299.99,
    specifications: {
      material: 'Mesh and fabric',
      adjustable: 'Height, armrests, tilt',
      warranty: '5 years'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    productId: 'prod-005',
    name: 'JavaScript: The Good Parts',
    category: 'Books',
    brand: 'O\'Reilly Media',
    description: 'Essential guide to JavaScript programming',
    price: 39.99,
    specifications: {
      pages: '176',
      format: 'Paperback',
      isbn: '978-0596517748'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

exports.handler = async (event) => {
  try {
    const putRequests = sampleProducts.map(product => ({
      PutRequest: { Item: product }
    }));

    await docClient.send(new BatchWriteCommand({
      RequestItems: {
        [process.env.TABLE_NAME]: putRequests
      }
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Sample data initialized successfully', count: sampleProducts.length })
    };
  } catch (error) {
    console.error('Error initializing data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to initialize data', message: error.message })
    };
  }
};
