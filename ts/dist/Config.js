"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ApicAgent',
        slug: "apic-agent",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.apicagent.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            parse_user_agent_get: {},
            parse_user_agent_post: {},
        }
    };
    entity = {
        "parse_user_agent_get": {
            "fields": [
                {
                    "name": "browser_family",
                    "title": "Browser Family",
                    "type": "`$STRING`",
                    "short": "Browser family name"
                },
                {
                    "name": "client",
                    "title": "Client",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "device",
                    "title": "Device",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "os",
                    "title": "Os",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "os_family",
                    "title": "Os Family",
                    "type": "`$STRING`",
                    "short": "Operating system family name"
                }
            ],
            "name": "parse_user_agent_get",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/",
                            "segments": [],
                            "parts": [],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "ua",
                                        "orig": "ua",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "ua"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "parse_user_agent_post": {
            "fields": [
                {
                    "name": "browser_family",
                    "title": "Browser Family",
                    "type": "`$STRING`",
                    "short": "Browser family name"
                },
                {
                    "name": "client",
                    "title": "Client",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "device",
                    "title": "Device",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "os",
                    "title": "Os",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "os_family",
                    "title": "Os Family",
                    "type": "`$STRING`",
                    "short": "Operating system family name"
                },
                {
                    "name": "ua",
                    "title": "Ua",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "User agent string to be parsed"
                }
            ],
            "name": "parse_user_agent_post",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/",
                            "segments": [],
                            "parts": [],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map