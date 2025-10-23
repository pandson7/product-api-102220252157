# Product API Project - Detailed AWS Pricing Analysis

## Executive Summary

This document provides a comprehensive cost analysis for the Product API project, a serverless application built using AWS API Gateway, Lambda, and DynamoDB. The analysis includes detailed pricing breakdowns, sample usage scenarios, and cost optimization recommendations.

## Architecture Overview

The Product API system consists of:
- **API Gateway HTTP API**: RESTful endpoints for product data access
- **Lambda Functions**: Serverless compute for business logic (Node.js runtime)
- **DynamoDB Table**: NoSQL database for product data storage (on-demand billing)

## Pricing Model Analysis

### 1. Amazon API Gateway

#### HTTP API Pricing (Recommended)
- **Cost**: $1.00 per million requests (first 300 million)
- **Cost**: $0.90 per million requests (over 300 million)
- **Free Tier**: None

#### REST API Pricing (Alternative)
- **Cost**: $3.50 per million requests (first 333 million)
- **Cost**: $2.80 per million requests (333M - 1B requests)
- **Cost**: $2.38 per million requests (1B - 20B requests)
- **Cost**: $1.51 per million requests (over 20B requests)

**Recommendation**: Use HTTP API for 70% cost savings over REST API

### 2. AWS Lambda

#### Request Pricing
- **Cost**: $0.20 per 1 million requests
- **Free Tier**: 1 million requests per month (first 12 months)

#### Compute Pricing (x86 architecture)
- **Tier 1**: $0.0000166667 per GB-second (first 6B GB-seconds)
- **Tier 2**: $0.0000150000 per GB-second (6B - 15B GB-seconds)
- **Tier 3**: $0.0000133334 per GB-second (over 15B GB-seconds)
- **Free Tier**: 400,000 GB-seconds per month (first 12 months)

### 3. Amazon DynamoDB

#### On-Demand Pricing (Recommended for variable workloads)
- **Read Requests**: $0.125 per million read request units
- **Write Requests**: $0.625 per million write request units
- **Storage**: $0.25 per GB-month (after 25GB free)
- **Free Tier**: 25GB storage, 25 RCU hours, 25 WCU hours per month (first 12 months)

#### Provisioned Capacity Pricing (For predictable workloads)
- **Read Capacity**: $0.00013 per RCU-hour (after free tier)
- **Write Capacity**: $0.00065 per WCU-hour (after free tier)

## Sample Usage Scenarios

### Scenario 1: Small Application (Development/Testing)
**Monthly Usage:**
- API Requests: 10,000
- Lambda Invocations: 10,000 (avg 200ms, 512MB)
- DynamoDB: 8,000 reads, 2,000 writes, 0.1GB storage

**Cost Breakdown:**
- API Gateway: $0.01 (10K × $1.00/1M)
- Lambda: $0.00 (within free tier)
- DynamoDB: $0.00 (within free tier)
- **Total: $0.01/month**

### Scenario 2: Medium Application (Production)
**Monthly Usage:**
- API Requests: 100,000
- Lambda Invocations: 100,000 (avg 200ms, 512MB)
- DynamoDB: 80,000 reads, 20,000 writes, 1GB storage

**Cost Breakdown:**
- API Gateway: $0.10 (100K × $1.00/1M)
- Lambda: $0.02 (requests) + $0.17 (compute) = $0.19
- DynamoDB: $0.01 (reads) + $0.0125 (writes) + $0.00 (storage) = $0.0225
- **Total: $0.31/month**

### Scenario 3: Large Application (High Traffic)
**Monthly Usage:**
- API Requests: 1,000,000
- Lambda Invocations: 1,000,000 (avg 200ms, 512MB)
- DynamoDB: 800,000 reads, 200,000 writes, 10GB storage

**Cost Breakdown:**
- API Gateway: $1.00 (1M × $1.00/1M)
- Lambda: $0.20 (requests) + $16.67 (compute) = $16.87
- DynamoDB: $0.10 (reads) + $0.125 (writes) + $2.50 (storage) = $2.725
- **Total: $20.60/month**

### Scenario 4: Enterprise Application (Very High Traffic)
**Monthly Usage:**
- API Requests: 10,000,000
- Lambda Invocations: 10,000,000 (avg 200ms, 512MB)
- DynamoDB: 8,000,000 reads, 2,000,000 writes, 100GB storage

**Cost Breakdown:**
- API Gateway: $10.00 (10M × $1.00/1M)
- Lambda: $2.00 (requests) + $166.67 (compute) = $168.67
- DynamoDB: $1.00 (reads) + $1.25 (writes) + $25.00 (storage) = $27.25
- **Total: $205.92/month**

## Cost Comparison: HTTP API vs REST API

| Monthly Requests | HTTP API Cost | REST API Cost | Savings |
|------------------|---------------|---------------|---------|
| 100,000 | $0.10 | $0.35 | $0.25 (71%) |
| 1,000,000 | $1.00 | $3.50 | $2.50 (71%) |
| 10,000,000 | $10.00 | $35.00 | $25.00 (71%) |

## DynamoDB: On-Demand vs Provisioned Capacity

### Break-even Analysis

For consistent workloads, provisioned capacity becomes cost-effective when:
- **Read Operations**: > 3.6M requests/month per RCU
- **Write Operations**: > 720K requests/month per WCU

### Example: 1M reads, 200K writes per month
- **On-Demand**: $0.125 + $0.125 = $0.25
- **Provisioned**: ~$0.094 + $0.468 = $0.562

*On-demand is more cost-effective for this scenario*

## Free Tier Benefits (First 12 Months)

### Monthly Free Tier Allowances:
- **Lambda**: 1M requests + 400,000 GB-seconds
- **DynamoDB**: 25GB storage + 25 RCU hours + 25 WCU hours
- **API Gateway**: No free tier

### Free Tier Coverage Examples:
- **Small App**: 100% covered (except API Gateway)
- **Medium App**: ~60% Lambda costs covered, 100% DynamoDB covered
- **Large App**: ~2% Lambda costs covered, minimal DynamoDB coverage

## Cost Optimization Recommendations

### Immediate Actions
1. **Use HTTP API**: Save 70% on API Gateway costs vs REST API
2. **Right-size Lambda memory**: Test with different memory allocations (128MB-3008MB)
3. **Optimize Lambda duration**: Reduce cold starts and execution time
4. **Use DynamoDB on-demand**: Better for unpredictable workloads

### Performance Optimizations
1. **Lambda Connection Pooling**: Reuse DynamoDB connections
2. **API Gateway Caching**: Cache frequently accessed data
3. **DynamoDB Query Optimization**: Use efficient access patterns
4. **Lambda Provisioned Concurrency**: For consistent performance (additional cost)

### Monitoring and Alerting
1. **CloudWatch Cost Alarms**: Set up billing alerts
2. **AWS Cost Explorer**: Regular cost analysis
3. **Lambda Insights**: Monitor performance metrics
4. **DynamoDB Metrics**: Track consumed capacity

## Regional Pricing Considerations

All prices shown are for **US East (N. Virginia)**. Other regions may have different pricing:
- **US West (Oregon)**: Similar pricing
- **Europe (Ireland)**: ~10-15% higher
- **Asia Pacific (Tokyo)**: ~20-25% higher

## Scaling Projections

### Linear Growth Model (10% monthly growth)
| Month | Requests | Monthly Cost | Cumulative Cost |
|-------|----------|--------------|-----------------|
| 1 | 100K | $0.31 | $0.31 |
| 3 | 133K | $0.41 | $1.04 |
| 6 | 177K | $0.55 | $2.88 |
| 12 | 314K | $0.97 | $8.22 |

### Exponential Growth Model (25% monthly growth)
| Month | Requests | Monthly Cost | Cumulative Cost |
|-------|----------|--------------|-----------------|
| 1 | 100K | $0.31 | $0.31 |
| 3 | 195K | $0.60 | $1.35 |
| 6 | 488K | $1.51 | $6.42 |
| 12 | 3.05M | $9.45 | $42.18 |

## Risk Factors and Mitigation

### Cost Risks
1. **Unexpected Traffic Spikes**: Use API Gateway throttling
2. **Lambda Timeout Issues**: Set appropriate timeout values
3. **DynamoDB Hot Partitions**: Design proper partition keys

### Mitigation Strategies
1. **Budget Alerts**: Set up AWS Budgets
2. **Rate Limiting**: Implement API throttling
3. **Circuit Breakers**: Prevent cascade failures
4. **Load Testing**: Validate performance under load

## Conclusion

The Product API project offers excellent cost efficiency for serverless applications:

- **Development Phase**: ~$0.01-0.10/month
- **Production Phase**: ~$0.31-20.60/month depending on scale
- **Enterprise Scale**: $200+/month for millions of requests

Key cost optimization opportunities:
1. Use HTTP API (70% savings vs REST API)
2. Leverage free tier during development
3. Right-size Lambda functions
4. Choose appropriate DynamoDB billing mode

The serverless architecture provides excellent cost scalability, with costs directly proportional to usage, making it ideal for applications with variable or unpredictable traffic patterns.
