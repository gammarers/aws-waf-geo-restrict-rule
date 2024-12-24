import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { WAFGeoRestrictRule } from '../src';

describe('Web ACL Rule Group Global Scope default testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack');

  const geoRestrictRule = new WAFGeoRestrictRule({
    allowCountries: ['JP'],
  });

  new wafv2.CfnWebACL(stack, 'WebACL', {
    defaultAction: { allow: {} },
    scope: 'CLOUD_FRONT',
    name: 'WebAclWithCustomRules',
    visibilityConfig: {
      cloudWatchMetricsEnabled: true,
      metricName: 'WebAclMetric',
      sampledRequestsEnabled: true,
    },
    rules: [
      geoRestrictRule.allowRule({
        priority: 1,
      }),
      geoRestrictRule.blockRule({
        priority: 2,
      }),
    ],
  });

  const template = Template.fromStack(stack);

  it('Should have WAF WebACL Rule', async () => {
    template.hasResourceProperties('AWS::WAFv2::WebACL', {
      Rules: [
        {
          Action: {
            Allow: {},
          },
          Name: 'allow-geo-rule',
          Priority: 1,
          Statement: {
            GeoMatchStatement: {
              CountryCodes: ['JP'],
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AllowGeoMetric',
            SampledRequestsEnabled: true,
          },
        },
        {
          Action: {
            Block: {},
          },
          Name: 'block-geo-rule',
          Priority: 2,
          Statement: {
            NotStatement: {
              Statement: {
                GeoMatchStatement: {
                  CountryCodes: ['JP'],
                },
              },
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'BlockGeoMetric',
            SampledRequestsEnabled: true,
          },
        },
      ],
    });
  });

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

});