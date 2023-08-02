import * as waf from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

export interface WafGeoRestrictRuleGroupProps {
  readonly name?: string;
  readonly scope: Scope;
  readonly countryCodes: string[];
  //readonly rateLimitCount?: number;
  //whitelist
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
      rules: [
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
              countryCodes: props.countryCodes,
            },
          },
        },
        {
          priority: 1,
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
                  countryCodes: props.countryCodes,
                },
              },
            },
          },
        },
      ],
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