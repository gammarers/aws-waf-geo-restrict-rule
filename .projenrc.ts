import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.80.0',
  typescriptVersion: '5.5.x',
  jsiiVersion: '5.5.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-waf-geo-restrict-rule',
  description: 'This is an AWS CDK Geo Restric Rule on WAF V2',
  keywords: ['aws', 'cdk', 'aws-cdk', 'waf', 'geo', 'restrict'],
  majorVersion: 2,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-waf-geo-restrict-rule.git',
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['8 19 * * 1']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
  publishToPypi: {
    distName: 'gammarers.aws-waf-geo-restrict-rule',
    module: 'gammarers.aws_waf_geo_restrict_rule',
  },
});
project.synth();