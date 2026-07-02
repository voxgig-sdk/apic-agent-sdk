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

func TestParseUserAgentPostEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ParseUserAgentPost(nil)
		if ent == nil {
			t.Fatal("expected non-nil ParseUserAgentPostEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := parse_user_agent_postBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "parse_user_agent_post." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICAGENT_TEST_PARSE_USER_AGENT_POST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		parseUserAgentPostRef01Ent := client.ParseUserAgentPost(nil)
		parseUserAgentPostRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "parse_user_agent_post"}, setup.data), "parse_user_agent_post_ref01"))

		parseUserAgentPostRef01DataResult, err := parseUserAgentPostRef01Ent.Create(parseUserAgentPostRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		parseUserAgentPostRef01Data = core.ToMapAny(parseUserAgentPostRef01DataResult)
		if parseUserAgentPostRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func parse_user_agent_postBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "parse_user_agent_post", "ParseUserAgentPostTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read parse_user_agent_post test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse parse_user_agent_post test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"parse_user_agent_post01", "parse_user_agent_post02", "parse_user_agent_post03"},
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
	entidEnvRaw := os.Getenv("APICAGENT_TEST_PARSE_USER_AGENT_POST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICAGENT_TEST_PARSE_USER_AGENT_POST_ENTID": idmap,
		"APICAGENT_TEST_LIVE":      "FALSE",
		"APICAGENT_TEST_EXPLAIN":   "FALSE",
		"APICAGENT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["APICAGENT_TEST_PARSE_USER_AGENT_POST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["APICAGENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["APICAGENT_APIKEY"],
			},
			extra,
		})
		client = sdk.NewApicAgentSDK(core.ToMapAny(mergedOpts))
	}

	live := env["APICAGENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["APICAGENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
