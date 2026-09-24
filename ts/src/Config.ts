
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ApicAgent',
        slug: "apic-agent",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://api.apicagent.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        parse_user_agent_get: {
        },
  
        parse_user_agent_post: {
        },
  
    }
  }


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
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

