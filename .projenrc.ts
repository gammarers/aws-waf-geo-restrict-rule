import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.80.0',
  typescriptVersion: '5.4.x',
  jsiiVersion: '5.4.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-waf-geo-restrict-rule',
  description: 'This is an AWS CDK Construct for Geo Restric Rule on WAF V2',
  keywords: ['aws', 'cdk', 'aws-cdk', 'waf', 'geo', 'restrict'],
  majorVersion: 1,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-waf-geo-restrict-rule.git',
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 19 * * 1']), // every monday (JST/THU:02:00)
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