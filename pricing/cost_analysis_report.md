# Product API Project Cost Analysis Estimate Report

## Service Overview

Product API Project is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- Standard ON DEMAND pricing model for all services
- No caching or optimization applied initially
- Average API response size of 2KB
- Lambda functions with 512MB memory allocation
- DynamoDB on-demand billing mode
- US East (N. Virginia) region pricing

## Limitations and Exclusions

- Data transfer costs between regions
- CloudWatch monitoring costs
- Development and maintenance costs
- SSL certificate costs
- Custom domain costs

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| Amazon API Gateway | Http Requests | million requests (first 300 million) | $1.00 | No free tier for API Gateway HTTP API |
| Amazon API Gateway | Rest Requests | million requests (first 333 million) | $3.50 | No free tier for API Gateway HTTP API |
| AWS Lambda | Requests | 1,000,000 requests | $0.20 | First 12 months: 1M requests/month and 400,000 GB-seconds/month free |
| AWS Lambda | Compute | GB-second (Tier 1) | $0.0000166667 | First 12 months: 1M requests/month and 400,000 GB-seconds/month free |
| Amazon DynamoDB | Read Requests | million read request read requests | $0.125 | First 12 months: 25GB storage and 25 WCU/RCU hours free |
| Amazon DynamoDB | Write Requests | million write request write requests | $0.625 | First 12 months: 25GB storage and 25 WCU/RCU hours free |
| Amazon DynamoDB | Storage | GB-month (after 25GB free) | $0.25 | First 12 months: 25GB storage and 25 WCU/RCU hours free |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| Amazon API Gateway | Processing 100,000 HTTP API requests per month (Http Requests: 100,000 requests/month) | $1.00/1M × 0.1M requests = $0.10/month | $0.10 |
| AWS Lambda | 100,000 invocations per month, 512MB memory, 200ms average duration (Requests: 100,000 requests/month, Compute: 100,000 × 0.2s × 0.5GB = 10,000 GB-seconds/month) | $0.20/1M × 0.1M requests + $0.0000166667 × 10,000 GB-seconds = $0.02 + $0.17 = $0.19/month (after free tier: ~$0.00) | $0.21 |
| Amazon DynamoDB | 100,000 read requests and 20,000 write requests per month, 1GB storage (Read Requests: 100,000 read requests/month, Write Requests: 20,000 write requests/month, Storage: 1GB/month) | $0.125/1M × 0.1M reads + $0.625/1M × 0.02M writes + $0.00 storage (free tier) = $0.0125 + $0.0125 + $0.00 = $0.025/month (after free tier: ~$0.00) | $0.27 |
| **Total** | **All services** | **Sum of all calculations** | **$0.58/month** |

### Free Tier

Free tier information by service:
- **Amazon API Gateway**: No free tier for API Gateway HTTP API
- **AWS Lambda**: First 12 months: 1M requests/month and 400,000 GB-seconds/month free
- **Amazon DynamoDB**: First 12 months: 25GB storage and 25 WCU/RCU hours free

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| Amazon API Gateway | $0/month | $0/month | $0/month |
| AWS Lambda | $0/month | $0/month | $0/month |
| Amazon DynamoDB | $0/month | $0/month | $0/month |

### Key Cost Factors

- **Amazon API Gateway**: Processing 100,000 HTTP API requests per month
- **AWS Lambda**: 100,000 invocations per month, 512MB memory, 200ms average duration
- **Amazon DynamoDB**: 100,000 read requests and 20,000 write requests per month, 1GB storage

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Base monthly cost calculation:

| Service | Monthly Cost |
|---------|-------------|
| Amazon API Gateway | $0.10 |
| AWS Lambda | $0.21 |
| Amazon DynamoDB | $0.27 |
| **Total Monthly Cost** | **$0** |

| Growth Pattern | Month 1 | Month 3 | Month 6 | Month 12 |
|---------------|---------|---------|---------|----------|
| Steady | $0/mo | $0/mo | $0/mo | $0/mo |
| Moderate | $0/mo | $0/mo | $0/mo | $0/mo |
| Rapid | $0/mo | $0/mo | $0/mo | $1/mo |

* Steady: No monthly growth (1.0x)
* Moderate: 5% monthly growth (1.05x)
* Rapid: 10% monthly growth (1.1x)

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs between regions
- CloudWatch monitoring costs
- Development and maintenance costs
- SSL certificate costs
- Custom domain costs

### Recommendations

#### Immediate Actions

- Start with HTTP API instead of REST API for API Gateway to reduce costs by ~70%
- Configure Lambda functions with appropriate memory allocation based on actual usage
- Use DynamoDB on-demand billing for unpredictable workloads
- Implement proper error handling to avoid unnecessary Lambda invocations



## Cost Optimization Recommendations

### Immediate Actions

- Start with HTTP API instead of REST API for API Gateway to reduce costs by ~70%
- Configure Lambda functions with appropriate memory allocation based on actual usage
- Use DynamoDB on-demand billing for unpredictable workloads

### Best Practices

- Regularly review costs with AWS Cost Explorer
- Consider reserved capacity for predictable workloads
- Implement automated scaling based on demand

## Conclusion

By following the recommendations in this report, you can optimize your Product API Project costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.
