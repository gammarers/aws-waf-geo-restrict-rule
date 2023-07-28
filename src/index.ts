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
      customResponseBodies: {
        ['geo-restrict']: {
          contentType: 'TEXT_PLAIN',
          content: 'Sorry, You Are Not Allowed to Access This Service.',
        },
      },
      rules: [
        {
          priority: 10,
          name: 'geo-restrict-rule',
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
            metricName: 'WafGeoRestrictRule',
          },
          statement: {
            geoMatchStatement: {
              countryCodes: props.countryCodes,
            },
          },
        },
      ],
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: true,
        metricName: 'GeoRestrictRule',
      },
    });
  }
}