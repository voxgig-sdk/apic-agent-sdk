# ApicAgent SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ApicAgentFeatures
  def self.make_feature(name)
    case name
    when "base"
      ApicAgentBaseFeature.new
    when "ratelimit"
      ApicAgentRatelimitFeature.new
    when "retry"
      ApicAgentRetryFeature.new
    when "test"
      ApicAgentTestFeature.new
    when "timeout"
      ApicAgentTimeoutFeature.new
    else
      ApicAgentBaseFeature.new
    end
  end
end
