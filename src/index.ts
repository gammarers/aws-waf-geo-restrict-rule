import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export interface RuleConfig {
  readonly priority: number;
  readonly ruleName?: string;
  readonly cloudWatchMetricsName?: string;
}

export interface WAFGeoRestrictRuleProps {
  readonly allowCountries: string[];
}

export class WAFGeoRestrictRule {

  constructor(private props: WAFGeoRestrictRuleProps) {}

  allowRule(config: RuleConfig): wafv2.CfnWebACL.RuleProperty {
    return {
      name: config.ruleName || 'allow-geo-rule',
      priority: config.priority,
      action: { allow: {} },
      statement: {
        geoMatchStatement: {
          countryCodes: this.props.allowCountries,
        },
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: config.cloudWatchMetricsName || 'AllowGeoMetric',
        sampledRequestsEnabled: true,
      },
    };
  }

  blockRule(config: RuleConfig): wafv2.CfnWebACL.RuleProperty {
    return {
      name: config.ruleName || 'block-geo-rule',
      priority: config.priority,
      action: { block: {} },
      statement: {
        notStatement: {
          statement: {
            geoMatchStatement: {
              countryCodes: this.props.allowCountries,
            },
          },
        },
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: config.cloudWatchMetricsName || 'BlockGeoMetric',
        sampledRequestsEnabled: true,
      },
    };
  }
}
