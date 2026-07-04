# Typed models for the ApicAgent SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class ParseUserAgentGet:
    browser_family: Optional[str] = None
    client: Optional[dict] = None
    device: Optional[dict] = None
    os: Optional[dict] = None
    os_family: Optional[str] = None


@dataclass
class ParseUserAgentGetLoadMatch:
    browser_family: Optional[str] = None
    client: Optional[dict] = None
    device: Optional[dict] = None
    os: Optional[dict] = None
    os_family: Optional[str] = None


@dataclass
class ParseUserAgentPost:
    ua: str
    browser_family: Optional[str] = None
    client: Optional[dict] = None
    device: Optional[dict] = None
    os: Optional[dict] = None
    os_family: Optional[str] = None


@dataclass
class ParseUserAgentPostCreateData:
    browser_family: Optional[str] = None
    client: Optional[dict] = None
    device: Optional[dict] = None
    os: Optional[dict] = None
    os_family: Optional[str] = None
    ua: Optional[str] = None

