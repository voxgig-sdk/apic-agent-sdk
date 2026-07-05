-- Typed models for the ApicAgent SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ParseUserAgentGet
---@field browser_family? string
---@field client? table
---@field device? table
---@field os? table
---@field os_family? string

---@class ParseUserAgentGetLoadMatch
---@field browser_family? string
---@field client? table
---@field device? table
---@field os? table
---@field os_family? string

---@class ParseUserAgentPost
---@field browser_family? string
---@field client? table
---@field device? table
---@field os? table
---@field os_family? string
---@field ua string

---@class ParseUserAgentPostCreateData
---@field browser_family? string
---@field client? table
---@field device? table
---@field os? table
---@field os_family? string
---@field ua string

local M = {}

return M
