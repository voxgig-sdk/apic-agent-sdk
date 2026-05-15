# ApicAgent SDK utility: make_context
require_relative '../core/context'
module ApicAgentUtilities
  MakeContext = ->(ctxmap, basectx) {
    ApicAgentContext.new(ctxmap, basectx)
  }
end
