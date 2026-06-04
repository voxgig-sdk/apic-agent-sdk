# ApicAgent SDK configuration


def make_config():
    return {
        "main": {
            "name": "ApicAgent",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.apicagent.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "parse_user_agent_get": {},
                "parse_user_agent_post": {},
            },
        },
        "entity": {
      "parse_user_agent_get": {
        "fields": [
          {
            "name": "browser_family",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "client",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "device",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "os",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "os_family",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "parse_user_agent_get",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/",
                "select": {
                  "exist": [
                    "ua",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "parts": [],
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "parse_user_agent_post": {
        "fields": [
          {
            "name": "browser_family",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "client",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "device",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "os",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "os_family",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "ua",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "parse_user_agent_post",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/",
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "parts": [],
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
