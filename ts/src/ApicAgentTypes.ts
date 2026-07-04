// Typed models for the ApicAgent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ParseUserAgentGet {
  browser_family?: string
  client?: Record<string, any>
  device?: Record<string, any>
  os?: Record<string, any>
  os_family?: string
}

export type ParseUserAgentGetLoadMatch = Partial<ParseUserAgentGet>

export interface ParseUserAgentPost {
  browser_family?: string
  client?: Record<string, any>
  device?: Record<string, any>
  os?: Record<string, any>
  os_family?: string
  ua: string
}

export type ParseUserAgentPostCreateData = Partial<ParseUserAgentPost>

