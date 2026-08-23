package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ApicAgent",
			"slug": "apic-agent",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.apicagent.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"parse_user_agent_get": map[string]any{},
				"parse_user_agent_post": map[string]any{},
			},
		},
		"entity": map[string]any{
			"parse_user_agent_get": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "browser_family",
						"short": "Browser family name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "device",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "os",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "os_family",
						"short": "Operating system family name",
						"type": "`$STRING`",
					},
				},
				"name": "parse_user_agent_get",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
											"kind": "query",
											"name": "ua",
											"orig": "ua",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{
									"exist": []any{
										"ua",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"parse_user_agent_post": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "browser_family",
						"short": "Browser family name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "client",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "device",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "os",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "os_family",
						"short": "Operating system family name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ua",
						"req": true,
						"short": "User agent string to be parsed",
						"type": "`$STRING`",
					},
				},
				"name": "parse_user_agent_post",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
