<?php
declare(strict_types=1);

// ParseUserAgentGet entity test

require_once __DIR__ . '/../apicagent_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ParseUserAgentGetEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ApicAgentSDK::test(null, null);
        $ent = $testsdk->ParseUserAgentGet(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = parse_user_agent_get_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "parse_user_agent_get." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set APICAGENT_TEST_PARSE_USER_AGENT_GET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $parse_user_agent_get_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.parse_user_agent_get")));
        $parse_user_agent_get_ref01_data = null;
        if (count($parse_user_agent_get_ref01_data_raw) > 0) {
            $parse_user_agent_get_ref01_data = Helpers::to_map($parse_user_agent_get_ref01_data_raw[0][1]);
        }

        // LOAD
        $parse_user_agent_get_ref01_ent = $client->ParseUserAgentGet(null);
        $parse_user_agent_get_ref01_match_dt0 = [];
        $parse_user_agent_get_ref01_data_dt0_loaded = $parse_user_agent_get_ref01_ent->load($parse_user_agent_get_ref01_match_dt0, null);
        $this->assertNotNull($parse_user_agent_get_ref01_data_dt0_loaded);

    }
}

function parse_user_agent_get_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/parse_user_agent_get/ParseUserAgentGetTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ApicAgentSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["parse_user_agent_get01", "parse_user_agent_get02", "parse_user_agent_get03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("APICAGENT_TEST_PARSE_USER_AGENT_GET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "APICAGENT_TEST_PARSE_USER_AGENT_GET_ENTID" => $idmap,
        "APICAGENT_TEST_LIVE" => "FALSE",
        "APICAGENT_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["APICAGENT_TEST_PARSE_USER_AGENT_GET_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["APICAGENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new ApicAgentSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["APICAGENT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["APICAGENT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
