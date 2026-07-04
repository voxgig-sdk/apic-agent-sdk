// Typed models for the ApicAgent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// ParseUserAgentGet is the typed data model for the parse_user_agent_get entity.
type ParseUserAgentGet struct {
	BrowserFamily *string `json:"browser_family,omitempty"`
	Client *map[string]any `json:"client,omitempty"`
	Device *map[string]any `json:"device,omitempty"`
	Os *map[string]any `json:"os,omitempty"`
	OsFamily *string `json:"os_family,omitempty"`
}

// ParseUserAgentGetLoadMatch mirrors the parse_user_agent_get fields as an all-optional match
// filter (Go analog of Partial<ParseUserAgentGet>).
type ParseUserAgentGetLoadMatch struct {
	BrowserFamily *string `json:"browser_family,omitempty"`
	Client *map[string]any `json:"client,omitempty"`
	Device *map[string]any `json:"device,omitempty"`
	Os *map[string]any `json:"os,omitempty"`
	OsFamily *string `json:"os_family,omitempty"`
}

// ParseUserAgentPost is the typed data model for the parse_user_agent_post entity.
type ParseUserAgentPost struct {
	BrowserFamily *string `json:"browser_family,omitempty"`
	Client *map[string]any `json:"client,omitempty"`
	Device *map[string]any `json:"device,omitempty"`
	Os *map[string]any `json:"os,omitempty"`
	OsFamily *string `json:"os_family,omitempty"`
	Ua string `json:"ua"`
}

// ParseUserAgentPostCreateData mirrors the parse_user_agent_post fields as an all-optional match
// filter (Go analog of Partial<ParseUserAgentPost>).
type ParseUserAgentPostCreateData struct {
	BrowserFamily *string `json:"browser_family,omitempty"`
	Client *map[string]any `json:"client,omitempty"`
	Device *map[string]any `json:"device,omitempty"`
	Os *map[string]any `json:"os,omitempty"`
	OsFamily *string `json:"os_family,omitempty"`
	Ua *string `json:"ua,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
