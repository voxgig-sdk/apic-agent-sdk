package voxgigapicagentsdk

import (
	"github.com/voxgig-sdk/apic-agent-sdk/go/core"
	"github.com/voxgig-sdk/apic-agent-sdk/go/entity"
	"github.com/voxgig-sdk/apic-agent-sdk/go/feature"
	_ "github.com/voxgig-sdk/apic-agent-sdk/go/utility"
)

// Type aliases preserve external API.
type ApicAgentSDK = core.ApicAgentSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ApicAgentEntity = core.ApicAgentEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ApicAgentError = core.ApicAgentError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewParseUserAgentGetEntityFunc = func(client *core.ApicAgentSDK, entopts map[string]any) core.ApicAgentEntity {
		return entity.NewParseUserAgentGetEntity(client, entopts)
	}
	core.NewParseUserAgentPostEntityFunc = func(client *core.ApicAgentSDK, entopts map[string]any) core.ApicAgentEntity {
		return entity.NewParseUserAgentPostEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewApicAgentSDK = core.NewApicAgentSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
