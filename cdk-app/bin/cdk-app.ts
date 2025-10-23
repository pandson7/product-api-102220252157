#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ProductApiStack } from '../lib/cdk-app-stack';

const app = new cdk.App();
new ProductApiStack(app, 'ProductApiStack-102220252157', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});