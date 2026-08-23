
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      }
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
          "short": "Browser family name",
          "type": "`$STRING`"
        },
        {
          "name": "client",
          "type": "`$OBJECT`"
        },
        {
          "name": "device",
          "type": "`$OBJECT`"
        },
        {
          "name": "os",
          "type": "`$OBJECT`"
        },
        {
          "name": "os_family",
          "short": "Operating system family name",
          "type": "`$STRING`"
        }
      ],
      "name": "parse_user_agent_get",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
                    "kind": "query",
                    "name": "ua",
                    "orig": "ua",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {
                "exist": [
                  "ua"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "short": "Browser family name",
          "type": "`$STRING`"
        },
        {
          "name": "client",
          "type": "`$OBJECT`"
        },
        {
          "name": "device",
          "type": "`$OBJECT`"
        },
        {
          "name": "os",
          "type": "`$OBJECT`"
        },
        {
          "name": "os_family",
          "short": "Operating system family name",
          "type": "`$STRING`"
        },
        {
          "name": "ua",
          "req": true,
          "short": "User agent string to be parsed",
          "type": "`$STRING`"
        }
      ],
      "name": "parse_user_agent_post",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/",
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

