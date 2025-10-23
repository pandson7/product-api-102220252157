import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

export class ProductApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = '102220252157';

    // DynamoDB Table
    const productsTable = new dynamodb.Table(this, `ProductsTable-${suffix}`, {
      tableName: `Products-${suffix}`,
      partitionKey: { name: 'productId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Functions
    const getProductsFunction = new lambda.Function(this, `GetProductsFunction-${suffix}`, {
      functionName: `getProducts-${suffix}`,
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'getProducts.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
    });

    const getProductByIdFunction = new lambda.Function(this, `GetProductByIdFunction-${suffix}`, {
      functionName: `getProductById-${suffix}`,
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'getProductById.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
    });

    // Grant DynamoDB permissions
    productsTable.grantReadData(getProductsFunction);
    productsTable.grantReadData(getProductByIdFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, `ProductApi-${suffix}`, {
      restApiName: `Product API ${suffix}`,
      description: 'API for accessing product specifications',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const products = api.root.addResource('products');
    products.addMethod('GET', new apigateway.LambdaIntegration(getProductsFunction));

    const productById = products.addResource('{id}');
    productById.addMethod('GET', new apigateway.LambdaIntegration(getProductByIdFunction));

    // Sample Data Lambda
    const initDataFunction = new lambda.Function(this, `InitDataFunction-${suffix}`, {
      functionName: `initializeData-${suffix}`,
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'initializeData.handler',
      timeout: cdk.Duration.minutes(5),
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        TABLE_NAME: productsTable.tableName,
      },
    });

    productsTable.grantWriteData(initDataFunction);

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'Product API URL',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: productsTable.tableName,
      description: 'DynamoDB Table Name',
    });

    new cdk.CfnOutput(this, 'InitDataFunctionName', {
      value: initDataFunction.functionName,
      description: 'Initialize Data Function Name',
    });
  }
}
