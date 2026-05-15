package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewParseUserAgentGetEntityFunc func(client *ApicAgentSDK, entopts map[string]any) ApicAgentEntity

var NewParseUserAgentPostEntityFunc func(client *ApicAgentSDK, entopts map[string]any) ApicAgentEntity

