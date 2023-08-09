import { App, Stack } from 'aws-cdk-lib';
import { Scope, WafGeoRestrictRuleGroup } from '../src';

describe('Web ACL Rule Group Global Scope specific Error testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });

  it('Should Error ip rate limiting count', () => {
    expect(() => {
      new WafGeoRestrictRuleGroup(stack, 'WafGeoRestrictRuleGroup', {
        scope: Scope.GLOBAL,
        allowCountries: ['JP'],
        ipRateLimiting: {
          enable: true,
          count: 99,
        },
      });
    }).toThrowError(/IP rate limiting count value needs to be above 100/);
  });

});