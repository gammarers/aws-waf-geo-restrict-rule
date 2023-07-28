# AWS WAF(v2) GEO Restriction Rule Group

This is an AWS CDK Construct for Geo Restriction Rule Group on WAF V2

## Resources

This construct creating resource list.

- WAF V2 RuleGroup

## Install

### TypeScript

```shell
npm install @gammarer/aws-waf-geo-restriction-rule-group
# or
yarn add @gammarer/aws-waf-geo-restriction-rule-group
```

## Example

```typescript
import { WafGeoRestrictRuleGroup } from '@gammarer/aws-waf-geo-restriction-rule-group';

new WafGeoRestrictRuleGroup(stack, 'WafGeoRestrictRuleGroup', {
  scope: Scope.GLOBAL, // GLOBAL(CloudFront) or REIGONAL(Application Load Balancer (ALB), Amazon API Gateway REST API, an AWS AppSync GraphQL API, or an Amazon Cognito user pool)
  countryCodes: ['JP'], // alpha-2 country and region codes from the International Organization for Standardization (ISO) 3166 standard
});

```

## License

This project is licensed under the Apache-2.0 License.