# ApicAgent SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ApicAgentFeatures
  def self.make_feature(name)
    case name
    when "base"
      ApicAgentBaseFeature.new
    when "test"
      ApicAgentTestFeature.new
    else
      ApicAgentBaseFeature.new
    end
  end
end
