import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.62.0',
  defaultReleaseBranch: 'main',
  name: '@gammarer/aws-waf-geo-restriction-rule-group',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yicr/aws-waf-geo-restriction-rule-group.git',
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  releaseToNpm: false,
});
project.synth();