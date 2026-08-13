package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/apic-agent-sdk/go"
	"github.com/voxgig-sdk/apic-agent-sdk/go/core"

	vs "github.com/voxgig-sdk/apic-agent-sdk/go/utility/struct"
)

func TestParseUserAgentGetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ParseUserAgentGet(nil)
		if ent == nil {
			t.Fatal("expected non-nil ParseUserAgentGetEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := parse_user_agent_getBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "parse_user_agent_get." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		parseUserAgentGetRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.parse_user_agent_get", setup.data)))
		var parseUserAgentGetRef01Data map[string]any
		if len(parseUserAgentGetRef01DataRaw) > 0 {
			parseUserAgentGetRef01Data = core.ToMapAny(parseUserAgentGetRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = parseUserAgentGetRef01Data

		// LOAD
		parseUserAgentGetRef01Ent := client.ParseUserAgentGet(nil)
		parseUserAgentGetRef01MatchDt0 := map[string]any{}
		parseUserAgentGetRef01DataDt0Loaded, err := parseUserAgentGetRef01Ent.Load(parseUserAgentGetRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if parseUserAgentGetRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func parse_user_agent_getBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "parse_user_agent_get", "ParseUserAgentGetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read parse_user_agent_get test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse parse_user_agent_get test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"parse_user_agent_get01", "parse_user_agent_get02", "parse_user_agent_get03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID": idmap,
		"APIC_AGENT_TEST_LIVE":      "FALSE",
		"APIC_AGENT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["APIC_AGENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewApicAgentSDK(core.ToMapAny(mergedOpts))
	}

	live := env["APIC_AGENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["APIC_AGENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
