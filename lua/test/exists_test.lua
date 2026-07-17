-- ApicAgent SDK exists test

local sdk = require("apic-agent_sdk")

describe("ApicAgentSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
