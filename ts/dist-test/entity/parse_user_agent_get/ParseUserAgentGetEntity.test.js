"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ParseUserAgentGetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APIC_AGENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APIC_AGENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicAgentSDK.test();
        const ent = testsdk.ParseUserAgentGet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APIC_AGENT_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'parse_user_agent_get.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "browser_family": { "a": true, "h": "Browser Family", "n": "browser_family", "r": false, "sh": "Browser family name", "t": "`$STRING`", "key$": "browser_family", "index$": 0 }, "client": { "a": true, "h": "Client", "n": "client", "r": false, "t": "`$OBJECT`", "key$": "client", "index$": 1 }, "device": { "a": true, "h": "Device", "n": "device", "r": false, "t": "`$OBJECT`", "key$": "device", "index$": 2 }, "os": { "a": true, "h": "Os", "n": "os", "r": false, "t": "`$OBJECT`", "key$": "os", "index$": 3 }, "os_family": { "a": true, "h": "Os Family", "n": "os_family", "r": false, "sh": "Operating system family name", "t": "`$STRING`", "key$": "os_family", "index$": 4 } }, "name": "parse_user_agent_get", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36", "k": "query", "n": "ua", "or": "ua", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/", "q": { "exist": ["ua"] }, "r": {}, "s": [], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "parse_user_agent_get", "name__orig": "parse_user_agent_get", "Name": "ParseUserAgentGet", "name_": "parse_user_agent_get", "name-": "parse-user-agent-get", "NAME": "PARSE_USER_AGENT_GET", "index$": 0 }, { "active": true, "entity": "parse_user_agent_get", "key$": "BasicParseUserAgentGetFlow", "kind": "basic", "name": "BasicParseUserAgentGetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "parse_user_agent_get_ref01", "srcdatavar": "parse_user_agent_get_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-parse_user_agent_get_ref01" } }], "index$": 0 }] }, 'ParseUserAgentGet', { "GET /": { "protocol": "http", "operationId": "parseUserAgentGet", "responses": { "200": { "description": "Successfully parsed user agent string", "content": { "application/json": { "schema": { "type": "object", "properties": { "browser_family": { "description": "Browser family name", "example": "Chrome", "key$": "browser_family", "type": "string" }, "client": { "key$": "client", "properties": { "engine": { "description": "Browser rendering engine", "example": "Blink", "type": "string" }, "engine_version": { "description": "Browser rendering engine version", "example": "unknown", "type": "string" }, "name": { "description": "Browser name", "example": "Chrome", "type": "string" }, "type": { "description": "Client type", "example": "browser", "type": "string" }, "version": { "description": "Browser version", "example": "89.0.4389.114", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/ClientInfo" }, "device": { "key$": "device", "properties": { "brand": { "description": "Device brand/manufacturer", "example": "Apple", "type": "string" }, "model": { "description": "Device model", "example": "unknown", "type": "string" }, "type": { "description": "Device type (e.g., desktop, mobile, tablet)", "example": "desktop", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/DeviceInfo" }, "os": { "key$": "os", "properties": { "name": { "description": "Operating system name", "example": "Mac", "type": "string" }, "platform": { "description": "Operating system platform", "example": "unknown", "type": "string" }, "version": { "description": "Operating system version", "example": "10.15.5", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/OSInfo" }, "os_family": { "description": "Operating system family name", "example": "Mac", "key$": "os_family", "type": "string" } }, "x-ref": "#/components/schemas/UserAgentResponse", "index$": 0 }, "example": { "browser_family": "Chrome", "client": { "engine": "Blink", "engine_version": "unknown", "name": "Chrome", "type": "browser", "version": "89.0.4389.114" }, "device": { "brand": "Apple", "model": "unknown", "type": "desktop" }, "os": { "name": "Mac", "platform": "unknown", "version": "10.15.5" }, "os_family": "Mac" } } } }, "400": { "description": "Bad request - invalid or missing user agent parameter" } }, "parameters": [{ "name": "ua", "in": "query", "description": "User agent string in URL encoded format", "required": true, "schema": { "type": "string" }, "example": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36", "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let parse_user_agent_get_ref01_data = Object.values(setup.data.existing.parse_user_agent_get)[0];
        // LOAD
        const parse_user_agent_get_ref01_ent = client.ParseUserAgentGet();
        const parse_user_agent_get_ref01_match_dt0 = {};
        const parse_user_agent_get_ref01_data_dt0 = (await parse_user_agent_get_ref01_ent.load(parse_user_agent_get_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != parse_user_agent_get_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/parse_user_agent_get/ParseUserAgentGetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicAgentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['parse_user_agent_get01', 'parse_user_agent_get02', 'parse_user_agent_get03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID': idmap,
        'APIC_AGENT_TEST_LIVE': 'FALSE',
        'APIC_AGENT_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID'];
    const live = 'TRUE' === env.APIC_AGENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ApicAgentSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.APIC_AGENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ParseUserAgentGetEntity.test.js.map