import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.62.0',
  typescriptVersion: '5.1.x',
  defaultReleaseBranch: 'main',
  name: '@gammarer/aws-waf-geo-restriction-rule-group',
  description: 'This is an AWS CDK Construct for Geo Restriction Rule Group on WAF V2',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yicr/aws-waf-geo-restriction-rule-group.git',
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '18.17.1',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 19 * * *']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();