

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ApicAgentSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ParseUserAgentGetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APIC_AGENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('APIC_AGENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicAgentSDK.test()
    const ent = testsdk.ParseUserAgentGet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APIC_AGENT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'parse_user_agent_get.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"browser_family","req":false,"short":"Browser family name","type":"`$STRING`","index$":0},{"active":true,"name":"client","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"device","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"os","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"os_family","req":false,"short":"Operating system family name","type":"`$STRING`","index$":4}],"name":"parse_user_agent_get","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36","kind":"query","name":"ua","orig":"ua","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /","json":"{\"operationId\":\"parseUserAgentGet\",\"parameters\":[{\"description\":\"User agent string in URL encoded format\",\"example\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36\",\"in\":\"query\",\"name\":\"ua\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"browser_family\":\"Chrome\",\"client\":{\"engine\":\"Blink\",\"engine_version\":\"unknown\",\"name\":\"Chrome\",\"type\":\"browser\",\"version\":\"89.0.4389.114\"},\"device\":{\"brand\":\"Apple\",\"model\":\"unknown\",\"type\":\"desktop\"},\"os\":{\"name\":\"Mac\",\"platform\":\"unknown\",\"version\":\"10.15.5\"},\"os_family\":\"Mac\"},\"schema\":{\"properties\":{\"browser_family\":{\"description\":\"Browser family name\",\"example\":\"Chrome\",\"type\":\"string\"},\"client\":{\"properties\":{\"engine\":{\"description\":\"Browser rendering engine\",\"example\":\"Blink\",\"type\":\"string\"},\"engine_version\":{\"description\":\"Browser rendering engine version\",\"example\":\"unknown\",\"type\":\"string\"},\"name\":{\"description\":\"Browser name\",\"example\":\"Chrome\",\"type\":\"string\"},\"type\":{\"description\":\"Client type\",\"example\":\"browser\",\"type\":\"string\"},\"version\":{\"description\":\"Browser version\",\"example\":\"89.0.4389.114\",\"type\":\"string\"}},\"type\":\"object\"},\"device\":{\"properties\":{\"brand\":{\"description\":\"Device brand/manufacturer\",\"example\":\"Apple\",\"type\":\"string\"},\"model\":{\"description\":\"Device model\",\"example\":\"unknown\",\"type\":\"string\"},\"type\":{\"description\":\"Device type (e.g., desktop, mobile, tablet)\",\"example\":\"desktop\",\"type\":\"string\"}},\"type\":\"object\"},\"os\":{\"properties\":{\"name\":{\"description\":\"Operating system name\",\"example\":\"Mac\",\"type\":\"string\"},\"platform\":{\"description\":\"Operating system platform\",\"example\":\"unknown\",\"type\":\"string\"},\"version\":{\"description\":\"Operating system version\",\"example\":\"10.15.5\",\"type\":\"string\"}},\"type\":\"object\"},\"os_family\":{\"description\":\"Operating system family name\",\"example\":\"Mac\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully parsed user agent string\"},\"400\":{\"description\":\"Bad request - invalid or missing user agent parameter\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{"exist":["ua"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"parse_user_agent_get","name__orig":"parse_user_agent_get","Name":"ParseUserAgentGet","name_":"parse_user_agent_get","name-":"parse-user-agent-get","NAME":"PARSE_USER_AGENT_GET","index$":0}, {"active":true,"entity":"parse_user_agent_get","key$":"BasicParseUserAgentGetFlow","kind":"basic","name":"BasicParseUserAgentGetFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"parse_user_agent_get_ref01","srcdatavar":"parse_user_agent_get_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-parse_user_agent_get_ref01"}}],"index$":0}]}, 'ParseUserAgentGet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let parse_user_agent_get_ref01_data = Object.values(setup.data.existing.parse_user_agent_get)[0] as any

    // LOAD
    const parse_user_agent_get_ref01_ent = client.ParseUserAgentGet()
    const parse_user_agent_get_ref01_match_dt0: any = {}
    const parse_user_agent_get_ref01_data_dt0 = (await parse_user_agent_get_ref01_ent.load(parse_user_agent_get_ref01_match_dt0)).data()
    assert(null != parse_user_agent_get_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/parse_user_agent_get/ParseUserAgentGetTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ApicAgentSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['parse_user_agent_get01','parse_user_agent_get02','parse_user_agent_get03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID': idmap,
    'APIC_AGENT_TEST_LIVE': 'FALSE',
    'APIC_AGENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID']

  const live = 'TRUE' === env.APIC_AGENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APIC_AGENT_TEST_PARSE_USER_AGENT_GET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ApicAgentSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
