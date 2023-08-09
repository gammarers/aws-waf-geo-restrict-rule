import * as waf from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

export interface WafGeoRestrictRuleGroupProps {
  readonly name?: string;
  readonly scope: Scope;
  readonly allowCountries: string[];
  readonly ipRateLimiting?: IpRateLimitingProperty;
  //readonly rateLimitCount?: number;
  //whitelist
}

export interface IpRateLimitingProperty {
  readonly enable: boolean;
  readonly count: number;
}

export enum Scope {
  GLOBAL = 'Global',
  REGIONAL = 'Regional',
}

export class WafGeoRestrictRuleGroup extends waf.CfnRuleGroup {
  constructor(scope: Construct, id: string, props: WafGeoRestrictRuleGroupProps) {
    super(scope, id, {
      name: props.name,
      description: 'geo restrict rule group',
      scope: ((): string => {
        switch (props.scope) {
          case Scope.GLOBAL:
            return 'CLOUDFRONT';
          case Scope.REGIONAL:
            return 'REGIONAL';
        }
      })(),
      capacity: 10,
      rules: ((): Array<waf.CfnRuleGroup.RuleProperty> => {
        const defaults: Array<waf.CfnRuleGroup.RuleProperty> = [
          {
            priority: 0,
            name: 'allow-geo-rule',
            action: {
              allow: {},
            },
            visibilityConfig: {
              cloudWatchMetricsEnabled: true,
              sampledRequestsEnabled: true,
              metricName: 'AllowGeoRule',
            },
            statement: {
              geoMatchStatement: {
                countryCodes: props.allowCountries,
              },
            },
          },
          {
            priority: 5,
            name: 'deny-geo-rule',
            action: {
              block: {
                CustomResponse: {
                  CustomResponseBodyKey: 'geo-restrict',
                  ResponseCode: 403,
                },
              },
            },
            visibilityConfig: {
              cloudWatchMetricsEnabled: true,
              sampledRequestsEnabled: true,
              metricName: 'DenyGeoRule',
            },
            statement: {
              notStatement: {
                statement: {
                  geoMatchStatement: {
                    countryCodes: props.allowCountries,
                  },
                },
              },
            },
          },
        ];
        if (props.ipRateLimiting) {
          if (props.ipRateLimiting.enable) {
            if (props.ipRateLimiting.count < 100) {
              throw new Error('IP rate limiting count value needs to be above 100');
            } else {
              const rule: waf.CfnRuleGroup.RuleProperty = {
                priority: 2,
                name: 'ip-rate-limiting-rule',
                action: {
                  block: {
                    CustomResponse: {
                      CustomResponseBodyKey: 'ip-restrict',
                      ResponseCode: 403,
                    },
                  },
                },
                visibilityConfig: {
                  cloudWatchMetricsEnabled: true,
                  sampledRequestsEnabled: true,
                  metricName: 'DenyIpLimitingRule',
                },
                statement: {
                  rateBasedStatement: {
                    aggregateKeyType: 'IP',
                    limit: props?.ipRateLimiting.count,
                  },
                },
              };
              defaults.push(rule);
            }
          }
        }
        return defaults;
      })(),
      customResponseBodies: {
        ['geo-restrict']: {
          contentType: 'TEXT_PLAIN',
          content: 'Sorry, You Are Not Allowed to Access This Service.',
        },
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: true,
        metricName: 'GeoRestrictRule',
      },
    });
  }
}