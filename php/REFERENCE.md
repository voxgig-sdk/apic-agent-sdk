# ApicAgent PHP SDK Reference

Complete API reference for the ApicAgent PHP SDK.


## ApicAgentSDK

### Constructor

```php
require_once __DIR__ . '/apic-agent_sdk.php';

$client = new ApicAgentSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApicAgentSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ApicAgentSDK::test();
```


### Instance Methods

#### `ParseUserAgentGet($data = null)`

Create a new `ParseUserAgentGetEntity` instance. Pass `null` for no initial data.

#### `ParseUserAgentPost($data = null)`

Create a new `ParseUserAgentPostEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ParseUserAgentGetEntity

```php
$parse_user_agent_get = $client->ParseUserAgentGet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_family` | ``$STRING`` | No |  |
| `client` | ``$OBJECT`` | No |  |
| `device` | ``$OBJECT`` | No |  |
| `os` | ``$OBJECT`` | No |  |
| `os_family` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ParseUserAgentGet()->load(["id" => "parse_user_agent_get_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ParseUserAgentGetEntity`

Create a new `ParseUserAgentGetEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ParseUserAgentPostEntity

```php
$parse_user_agent_post = $client->ParseUserAgentPost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `browser_family` | ``$STRING`` | No |  |
| `client` | ``$OBJECT`` | No |  |
| `device` | ``$OBJECT`` | No |  |
| `os` | ``$OBJECT`` | No |  |
| `os_family` | ``$STRING`` | No |  |
| `ua` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ParseUserAgentPost()->create([
  "ua" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ParseUserAgentPostEntity`

Create a new `ParseUserAgentPostEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ApicAgentSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

