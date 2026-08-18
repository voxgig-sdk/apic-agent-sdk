# ApicAgent SDK configuration

module ApicAgentConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ApicAgent",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.apicagent.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "parse_user_agent_get" => {},
          "parse_user_agent_post" => {},
        },
      },
      "entity" => {
        "parse_user_agent_get" => {
          "fields" => [
            {
              "name" => "browser_family",
              "type" => "`$STRING`",
            },
            {
              "name" => "client",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "device",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "os",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "os_family",
              "type" => "`$STRING`",
            },
          ],
          "name" => "parse_user_agent_get",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
                        "kind" => "query",
                        "name" => "ua",
                        "orig" => "ua",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {
                    "exist" => [
                      "ua",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "parse_user_agent_post" => {
          "fields" => [
            {
              "name" => "browser_family",
              "type" => "`$STRING`",
            },
            {
              "name" => "client",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "device",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "os",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "os_family",
              "type" => "`$STRING`",
            },
            {
              "name" => "ua",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "parse_user_agent_post",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ApicAgentFeatures.make_feature(name)
  end
end
