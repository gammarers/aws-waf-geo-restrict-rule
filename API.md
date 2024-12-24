# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### RuleConfig <a name="RuleConfig" id="@gammarers/aws-waf-geo-restrict-rule.RuleConfig"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-waf-geo-restrict-rule.RuleConfig.Initializer"></a>

```typescript
import { RuleConfig } from '@gammarers/aws-waf-geo-restrict-rule'

const ruleConfig: RuleConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.RuleConfig.property.priority">priority</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.RuleConfig.property.cloudWatchMetricsName">cloudWatchMetricsName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.RuleConfig.property.ruleName">ruleName</a></code> | <code>string</code> | *No description.* |

---

##### `priority`<sup>Required</sup> <a name="priority" id="@gammarers/aws-waf-geo-restrict-rule.RuleConfig.property.priority"></a>

```typescript
public readonly priority: number;
```

- *Type:* number

---

##### `cloudWatchMetricsName`<sup>Optional</sup> <a name="cloudWatchMetricsName" id="@gammarers/aws-waf-geo-restrict-rule.RuleConfig.property.cloudWatchMetricsName"></a>

```typescript
public readonly cloudWatchMetricsName: string;
```

- *Type:* string

---

##### `ruleName`<sup>Optional</sup> <a name="ruleName" id="@gammarers/aws-waf-geo-restrict-rule.RuleConfig.property.ruleName"></a>

```typescript
public readonly ruleName: string;
```

- *Type:* string

---

### WAFGeoRestrictRuleProps <a name="WAFGeoRestrictRuleProps" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRuleProps"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRuleProps.Initializer"></a>

```typescript
import { WAFGeoRestrictRuleProps } from '@gammarers/aws-waf-geo-restrict-rule'

const wAFGeoRestrictRuleProps: WAFGeoRestrictRuleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRuleProps.property.allowCountries">allowCountries</a></code> | <code>string[]</code> | *No description.* |

---

##### `allowCountries`<sup>Required</sup> <a name="allowCountries" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRuleProps.property.allowCountries"></a>

```typescript
public readonly allowCountries: string[];
```

- *Type:* string[]

---

## Classes <a name="Classes" id="Classes"></a>

### WAFGeoRestrictRule <a name="WAFGeoRestrictRule" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule"></a>

#### Initializers <a name="Initializers" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.Initializer"></a>

```typescript
import { WAFGeoRestrictRule } from '@gammarers/aws-waf-geo-restrict-rule'

new WAFGeoRestrictRule(props: WAFGeoRestrictRuleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.Initializer.parameter.props">props</a></code> | <code><a href="#@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRuleProps">WAFGeoRestrictRuleProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.Initializer.parameter.props"></a>

- *Type:* <a href="#@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRuleProps">WAFGeoRestrictRuleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.allowRule">allowRule</a></code> | *No description.* |
| <code><a href="#@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.blockRule">blockRule</a></code> | *No description.* |

---

##### `allowRule` <a name="allowRule" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.allowRule"></a>

```typescript
public allowRule(config: RuleConfig): RuleProperty
```

###### `config`<sup>Required</sup> <a name="config" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.allowRule.parameter.config"></a>

- *Type:* <a href="#@gammarers/aws-waf-geo-restrict-rule.RuleConfig">RuleConfig</a>

---

##### `blockRule` <a name="blockRule" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.blockRule"></a>

```typescript
public blockRule(config: RuleConfig): RuleProperty
```

###### `config`<sup>Required</sup> <a name="config" id="@gammarers/aws-waf-geo-restrict-rule.WAFGeoRestrictRule.blockRule.parameter.config"></a>

- *Type:* <a href="#@gammarers/aws-waf-geo-restrict-rule.RuleConfig">RuleConfig</a>

---





