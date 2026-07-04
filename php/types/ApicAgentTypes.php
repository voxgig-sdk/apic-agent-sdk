<?php
declare(strict_types=1);

// Typed models for the ApicAgent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ParseUserAgentGet entity data model. */
class ParseUserAgentGet
{
    public ?string $browser_family = null;
    public ?array $client = null;
    public ?array $device = null;
    public ?array $os = null;
    public ?string $os_family = null;
}

/** Match filter for ParseUserAgentGet#load (any subset of ParseUserAgentGet fields). */
class ParseUserAgentGetLoadMatch
{
    public ?string $browser_family = null;
    public ?array $client = null;
    public ?array $device = null;
    public ?array $os = null;
    public ?string $os_family = null;
}

/** ParseUserAgentPost entity data model. */
class ParseUserAgentPost
{
    public ?string $browser_family = null;
    public ?array $client = null;
    public ?array $device = null;
    public ?array $os = null;
    public ?string $os_family = null;
    public string $ua;
}

/** Match filter for ParseUserAgentPost#create (any subset of ParseUserAgentPost fields). */
class ParseUserAgentPostCreateData
{
    public ?string $browser_family = null;
    public ?array $client = null;
    public ?array $device = null;
    public ?array $os = null;
    public ?string $os_family = null;
    public ?string $ua = null;
}

