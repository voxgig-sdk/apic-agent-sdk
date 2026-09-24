

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ParseUserAgentPostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APIC_AGENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('APIC_AGENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicAgentSDK.test()
    const ent = testsdk.ParseUserAgentPost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APIC_AGENT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'parse_user_agent_post.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser_family":{"a":true,"h":"Browser Family","n":"browser_family","r":false,"sh":"Browser family name","t":"`$STRING`","key$":"browser_family","index$":0},"client":{"a":true,"h":"Client","n":"client","r":false,"t":"`$OBJECT`","key$":"client","index$":1},"device":{"a":true,"h":"Device","n":"device","r":false,"t":"`$OBJECT`","key$":"device","index$":2},"os":{"a":true,"h":"Os","n":"os","r":false,"t":"`$OBJECT`","key$":"os","index$":3},"os_family":{"a":true,"h":"Os Family","n":"os_family","r":false,"sh":"Operating system family name","t":"`$STRING`","key$":"os_family","index$":4},"ua":{"a":true,"h":"Ua","n":"ua","r":true,"sh":"User agent string to be parsed","t":"`$STRING`","key$":"ua","index$":5}},"name":"parse_user_agent_post","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"parse_user_agent_post","name__orig":"parse_user_agent_post","Name":"ParseUserAgentPost","name_":"parse_user_agent_post","name-":"parse-user-agent-post","NAME":"PARSE_USER_AGENT_POST","index$":1}, {"active":true,"entity":"parse_user_agent_post","key$":"BasicParseUserAgentPostFlow","kind":"basic","name":"BasicParseUserAgentPostFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"parse_user_agent_post_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ParseUserAgentPost', {"POST /":{"protocol":"http","operationId":"parseUserAgentPost","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["ua"],"properties":{"ua":{"type":"string","description":"User agent string to be parsed","key$":"ua"}},"x-ref":"#/components/schemas/UserAgentRequest","index$":1},"example":{"ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"}}}},"responses":{"200":{"description":"Successfully parsed user agent string","content":{"application/json":{"schema":{"type":"object","properties":{"browser_family":{"description":"Browser family name","example":"Chrome","key$":"browser_family","type":"string"},"client":{"key$":"client","properties":{"engine":{"description":"Browser rendering engine","example":"Blink","type":"string"},"engine_version":{"description":"Browser rendering engine version","example":"unknown","type":"string"},"name":{"description":"Browser name","example":"Chrome","type":"string"},"type":{"description":"Client type","example":"browser","type":"string"},"version":{"description":"Browser version","example":"89.0.4389.114","type":"string"}},"type":"object","x-ref":"#/components/schemas/ClientInfo"},"device":{"key$":"device","properties":{"brand":{"description":"Device brand/manufacturer","example":"Apple","type":"string"},"model":{"description":"Device model","example":"unknown","type":"string"},"type":{"description":"Device type (e.g., desktop, mobile, tablet)","example":"desktop","type":"string"}},"type":"object","x-ref":"#/components/schemas/DeviceInfo"},"os":{"key$":"os","properties":{"name":{"description":"Operating system name","example":"Mac","type":"string"},"platform":{"description":"Operating system platform","example":"unknown","type":"string"},"version":{"description":"Operating system version","example":"10.15.5","type":"string"}},"type":"object","x-ref":"#/components/schemas/OSInfo"},"os_family":{"description":"Operating system family name","example":"Mac","key$":"os_family","type":"string"}},"x-ref":"#/components/schemas/UserAgentResponse","index$":0},"example":{"browser_family":"Chrome","client":{"engine":"Blink","engine_version":"unknown","name":"Chrome","type":"browser","version":"89.0.4389.114"},"device":{"brand":"Apple","model":"unknown","type":"desktop"},"os":{"name":"Mac","platform":"unknown","version":"10.15.5"},"os_family":"Mac"}}}},"400":{"description":"Bad request - invalid or missing user agent in request body"},"415":{"description":"Unsupported Media Type - Content-Type must be application/json"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const parse_user_agent_post_ref01_ent = client.ParseUserAgentPost()
    let parse_user_agent_post_ref01_data = setup.data.new.parse_user_agent_post['parse_user_agent_post_ref01']

    parse_user_agent_post_ref01_data = (await parse_user_agent_post_ref01_ent.create(parse_user_agent_post_ref01_data)).data()
    assert(null != parse_user_agent_post_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/parse_user_agent_post/ParseUserAgentPostTestData.json')

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
    ['parse_user_agent_post01','parse_user_agent_post02','parse_user_agent_post03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID': idmap,
    'APIC_AGENT_TEST_LIVE': 'FALSE',
    'APIC_AGENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID']

  const live = 'TRUE' === env.APIC_AGENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID']
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
  
