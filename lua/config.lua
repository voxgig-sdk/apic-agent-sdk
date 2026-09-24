-- ApicAgent SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ApicAgent",
      slug = "apic-agent",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.apicagent.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["parse_user_agent_get"] = {},
        ["parse_user_agent_post"] = {},
      },
    },
    entity = {
      ["parse_user_agent_get"] = {
        ["fields"] = {
          {
            ["name"] = "browser_family",
            ["title"] = "Browser Family",
            ["type"] = "`$STRING`",
            ["short"] = "Browser family name",
          },
          {
            ["name"] = "client",
            ["title"] = "Client",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "device",
            ["title"] = "Device",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os",
            ["title"] = "Os",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os_family",
            ["title"] = "Os Family",
            ["type"] = "`$STRING`",
            ["short"] = "Operating system family name",
          },
        },
        ["name"] = "parse_user_agent_get",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["segments"] = {},
                ["parts"] = {},
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "ua",
                      ["orig"] = "ua",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ua",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["parse_user_agent_post"] = {
        ["fields"] = {
          {
            ["name"] = "browser_family",
            ["title"] = "Browser Family",
            ["type"] = "`$STRING`",
            ["short"] = "Browser family name",
          },
          {
            ["name"] = "client",
            ["title"] = "Client",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "device",
            ["title"] = "Device",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os",
            ["title"] = "Os",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os_family",
            ["title"] = "Os Family",
            ["type"] = "`$STRING`",
            ["short"] = "Operating system family name",
          },
          {
            ["name"] = "ua",
            ["title"] = "Ua",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "User agent string to be parsed",
          },
        },
        ["name"] = "parse_user_agent_post",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/",
                ["segments"] = {},
                ["parts"] = {},
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
