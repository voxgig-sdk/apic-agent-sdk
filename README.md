# ApicAgent SDK

Parse a User-Agent string into structured browser, OS, and device fields via a single REST call

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About APIC Agent

APIC Agent is a free REST API run by [APIC Labs](https://www.apicagent.com) that turns a raw `User-Agent` header into structured browser, operating system, and device data. It is built on top of the open-source [Device Detector](https://github.com/matomo-org/device-detector) library, so you can avoid bundling and updating UA-parsing code in your own application.

The API exposes a single endpoint at `https://api.apicagent.com` that accepts a UA string and returns a JSON object. Typical fields include:

- `browser_family` — high-level browser name
- `client` — `name`, `type`, `version`, `engine`, `engine_version`
- `os` — `name`, `version`, `platform`
- `os_family` — OS classification
- `device` — `brand`, `model`, `type`

You can call it either as `GET https://api.apicagent.com/?ua=<encoded-ua>` or as `POST https://api.apicagent.com` with a JSON body `{"ua": "<ua-string>"}`. The documentation does not list authentication requirements or published rate limits.

## Try it

**TypeScript**
```bash
npm install apic-agent
```

**Python**
```bash
pip install apic-agent-sdk
```

**PHP**
```bash
composer require voxgig/apic-agent-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/apic-agent-sdk/go
```

**Ruby**
```bash
gem install apic-agent-sdk
```

**Lua**
```bash
luarocks install apic-agent-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ApicAgentSDK } from 'apic-agent'

const client = new ApicAgentSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o apic-agent-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "apic-agent": {
      "command": "/abs/path/to/apic-agent-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **ParseUserAgentGet** | Parse a User-Agent string via `GET /?ua=<user-agent>` and receive the detected browser, OS, and device as JSON. | `/` |
| **ParseUserAgentPost** | Parse a User-Agent string via `POST /` with a JSON body `{"ua": "<user-agent>"}`, returning the same browser, OS, and device fields. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from apicagent_sdk import ApicAgentSDK

client = ApicAgentSDK({})


# Load a specific parseuseragentget
parseuseragentget, err = client.ParseUserAgentGet(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'apicagent_sdk.php';

$client = new ApicAgentSDK([]);


// Load a specific parseuseragentget
[$parseuseragentget, $err] = $client->ParseUserAgentGet(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/apic-agent-sdk/go"

client := sdk.NewApicAgentSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ApicAgent_sdk"

client = ApicAgentSDK.new({})


# Load a specific parseuseragentget
parseuseragentget, err = client.ParseUserAgentGet(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("apic-agent_sdk")

local client = sdk.new({})


-- Load a specific parseuseragentget
local parseuseragentget, err = client:ParseUserAgentGet(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ApicAgentSDK.test()
const result = await client.ParseUserAgentGet().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ApicAgentSDK.test(None, None)
result, err = client.ParseUserAgentGet(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ApicAgentSDK::test(null, null);
[$result, $err] = $client->ParseUserAgentGet(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ParseUserAgentGet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ApicAgentSDK.test(nil, nil)
result, err = client.ParseUserAgentGet(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ParseUserAgentGet(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the APIC Agent

- Upstream: [https://www.apicagent.com](https://www.apicagent.com)
- API docs: [https://www.apicagent.com/docs](https://www.apicagent.com/docs)

---

Generated from the APIC Agent OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
