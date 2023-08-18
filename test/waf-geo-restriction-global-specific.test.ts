import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as waf from 'aws-cdk-lib/aws-wafv2';
import { Scope, WafGeoRestrictRuleGroup } from '../src';

describe('Web ACL Rule Group Global Scope specific testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });

  const ruleGroup = new WafGeoRestrictRuleGroup(stack, 'WafGeoRestrictRuleGroup', {
    scope: Scope.GLOBAL,
    allowCountries: ['JP'],
    ipRateLimiting: {
      enable: true,
      count: 1000,
    },
    allowIpSetArn: 'arn:aws:wafv2:us-east-1:1111222233334444:global/ipset/ipv4-block-cf/1fef3860-8b6e-4201-8a56-6d8d49e93057',
  });

  it('Is Waf RuleGroup', () => {
    expect(ruleGroup).toBeInstanceOf(waf.CfnRuleGroup);
  });

  const template = Template.fromStack(stack);

  it('Should have WAF Rule Group', () => {
    template.hasResourceProperties('AWS::WAFv2::RuleGroup', Match.objectEquals({
      Description: 'geo restrict rule group',
      Scope: 'CLOUDFRONT',
      Capacity: 10,
      CustomResponseBodies: {
        'geo-restrict': {
          Content: 'Sorry, You Are Not Allowed to Access This Service.',
          ContentType: 'TEXT_PLAIN',
        },
        'ip-restrict': {
          Content: 'Sorry, You Are Not Allowed to Access This Service.',
          ContentType: 'TEXT_PLAIN',
        },
        'sample-restrict': {
          Content: 'Sorry, You Are Not Allowed to Access This Service.',
          ContentType: 'TEXT_PLAIN',
        },
      },
      Rules: Match.arrayEquals([
        {
          Priority: 4,
          Name: 'allow-geo-rule',
          Action: {
            Allow: {},
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AllowGeoRule',
            SampledRequestsEnabled: true,
          },
          Statement: {
            GeoMatchStatement: {
              CountryCodes: ['JP'],
            },
          },
        },
        {
          Priority: 5,
          Name: 'deny-geo-rule',
          Action: {
            Block: {
              CustomResponse: {
                CustomResponseBodyKey: 'geo-restrict',
                ResponseCode: 403,
              },
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'DenyGeoRule',
            SampledRequestsEnabled: true,
          },
          Statement: {
            NotStatement: {
              Statement: {
                GeoMatchStatement: {
                  CountryCodes: ['JP'],
                },
              },
            },
          },
        },
        {
          Priority: 2,
          Name: 'ip-rate-limiting-rule',
          Action: {
            Block: {
              CustomResponse: {
                CustomResponseBodyKey: 'ip-restrict',
                ResponseCode: 403,
              },
            },
          },
          Statement: {
            RateBasedStatement: {
              AggregateKeyType: 'IP',
              Limit: 1000,
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'DenyIpLimitingRule',
            SampledRequestsEnabled: true,
          },
        },
        {
          Priority: 0,
          Name: 'allow-ip-set-rule',
          Action: { Allow: {} },
          Statement: {
            IPSetReferenceStatement: {
              Arn: 'arn:aws:wafv2:us-east-1:1111222233334444:global/ipset/ipv4-block-cf/1fef3860-8b6e-4201-8a56-6d8d49e93057',
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AllowIpSetRule',
            SampledRequestsEnabled: true,
          },
        },
      ]),
      VisibilityConfig: {
        CloudWatchMetricsEnabled: true,
        MetricName: 'GeoRestrictRule',
        SampledRequestsEnabled: true,
      },
    }));
  });

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

});