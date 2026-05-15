-- ApicAgent SDK error

local ApicAgentError = {}
ApicAgentError.__index = ApicAgentError


function ApicAgentError.new(code, msg, ctx)
  local self = setmetatable({}, ApicAgentError)
  self.is_sdk_error = true
  self.sdk = "ApicAgent"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ApicAgentError:error()
  return self.msg
end


function ApicAgentError:__tostring()
  return self.msg
end


return ApicAgentError
