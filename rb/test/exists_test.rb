# ApicAgent SDK exists test

require "minitest/autorun"
require_relative "../ApicAgent_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ApicAgentSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
