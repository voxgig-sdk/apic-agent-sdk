# frozen_string_literal: true

# Typed models for the ApicAgent SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ParseUserAgentGet entity data model.
#
# @!attribute [rw] browser_family
#   @return [String, nil]
#
# @!attribute [rw] client
#   @return [Hash, nil]
#
# @!attribute [rw] device
#   @return [Hash, nil]
#
# @!attribute [rw] os
#   @return [Hash, nil]
#
# @!attribute [rw] os_family
#   @return [String, nil]
ParseUserAgentGet = Struct.new(
  :browser_family,
  :client,
  :device,
  :os,
  :os_family,
  keyword_init: true
)

# Request payload for ParseUserAgentGet#load.
#
# @!attribute [rw] ua
#   @return [String]
ParseUserAgentGetLoadMatch = Struct.new(
  :ua,
  keyword_init: true
)

# ParseUserAgentPost entity data model.
#
# @!attribute [rw] browser_family
#   @return [String, nil]
#
# @!attribute [rw] client
#   @return [Hash, nil]
#
# @!attribute [rw] device
#   @return [Hash, nil]
#
# @!attribute [rw] os
#   @return [Hash, nil]
#
# @!attribute [rw] os_family
#   @return [String, nil]
#
# @!attribute [rw] ua
#   @return [String]
ParseUserAgentPost = Struct.new(
  :browser_family,
  :client,
  :device,
  :os,
  :os_family,
  :ua,
  keyword_init: true
)

# Request payload for ParseUserAgentPost#create.
#
# @!attribute [rw] browser_family
#   @return [String, nil]
#
# @!attribute [rw] client
#   @return [Hash, nil]
#
# @!attribute [rw] device
#   @return [Hash, nil]
#
# @!attribute [rw] os
#   @return [Hash, nil]
#
# @!attribute [rw] os_family
#   @return [String, nil]
#
# @!attribute [rw] ua
#   @return [String]
ParseUserAgentPostCreateData = Struct.new(
  :browser_family,
  :client,
  :device,
  :os,
  :os_family,
  :ua,
  keyword_init: true
)

