package = "voxgig-sdk-apic-agent"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/apic-agent-sdk.git"
}
description = {
  summary = "ApicAgent SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["apic-agent_sdk"] = "apic-agent_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
