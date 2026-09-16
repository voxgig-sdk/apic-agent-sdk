<?php
declare(strict_types=1);

// ApicAgent SDK configuration

class ApicAgentConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ApicAgent",
                "slug" => "apic-agent",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.apicagent.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "parse_user_agent_get" => [],
                    "parse_user_agent_post" => [],
                ],
            ],
            "entity" => [
        'parse_user_agent_get' => [
          'fields' => [
            [
              'name' => 'browser_family',
              'short' => 'Browser family name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'client',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'device',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'os',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'os_family',
              'short' => 'Operating system family name',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'parse_user_agent_get',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                        'kind' => 'query',
                        'name' => 'ua',
                        'orig' => 'ua',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'segments' => [],
                  'select' => [
                    'exist' => [
                      'ua',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'parse_user_agent_post' => [
          'fields' => [
            [
              'name' => 'browser_family',
              'short' => 'Browser family name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'client',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'device',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'os',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'os_family',
              'short' => 'Operating system family name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ua',
              'req' => true,
              'short' => 'User agent string to be parsed',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'parse_user_agent_post',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/',
                  'segments' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ApicAgentFeatures::make_feature($name);
    }
}
