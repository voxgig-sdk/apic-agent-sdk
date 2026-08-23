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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["short"] = "Browser family name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "client",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "device",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os_family",
            ["short"] = "Operating system family name",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "parse_user_agent_get",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
                      ["kind"] = "query",
                      ["name"] = "ua",
                      ["orig"] = "ua",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {
                  ["exist"] = {
                    "ua",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["short"] = "Browser family name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "client",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "device",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "os_family",
            ["short"] = "Operating system family name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ua",
            ["req"] = true,
            ["short"] = "User agent string to be parsed",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "parse_user_agent_post",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
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
