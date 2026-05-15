# ApicAgent SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ApicAgentUtility.registrar = ->(u) {
  u.clean = ApicAgentUtilities::Clean
  u.done = ApicAgentUtilities::Done
  u.make_error = ApicAgentUtilities::MakeError
  u.feature_add = ApicAgentUtilities::FeatureAdd
  u.feature_hook = ApicAgentUtilities::FeatureHook
  u.feature_init = ApicAgentUtilities::FeatureInit
  u.fetcher = ApicAgentUtilities::Fetcher
  u.make_fetch_def = ApicAgentUtilities::MakeFetchDef
  u.make_context = ApicAgentUtilities::MakeContext
  u.make_options = ApicAgentUtilities::MakeOptions
  u.make_request = ApicAgentUtilities::MakeRequest
  u.make_response = ApicAgentUtilities::MakeResponse
  u.make_result = ApicAgentUtilities::MakeResult
  u.make_point = ApicAgentUtilities::MakePoint
  u.make_spec = ApicAgentUtilities::MakeSpec
  u.make_url = ApicAgentUtilities::MakeUrl
  u.param = ApicAgentUtilities::Param
  u.prepare_auth = ApicAgentUtilities::PrepareAuth
  u.prepare_body = ApicAgentUtilities::PrepareBody
  u.prepare_headers = ApicAgentUtilities::PrepareHeaders
  u.prepare_method = ApicAgentUtilities::PrepareMethod
  u.prepare_params = ApicAgentUtilities::PrepareParams
  u.prepare_path = ApicAgentUtilities::PreparePath
  u.prepare_query = ApicAgentUtilities::PrepareQuery
  u.result_basic = ApicAgentUtilities::ResultBasic
  u.result_body = ApicAgentUtilities::ResultBody
  u.result_headers = ApicAgentUtilities::ResultHeaders
  u.transform_request = ApicAgentUtilities::TransformRequest
  u.transform_response = ApicAgentUtilities::TransformResponse
}
