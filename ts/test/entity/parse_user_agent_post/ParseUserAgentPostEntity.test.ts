
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ApicAgentSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'parse_user_agent_post.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID': idmap,
    'APIC_AGENT_TEST_LIVE': 'FALSE',
    'APIC_AGENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['APIC_AGENT_TEST_PARSE_USER_AGENT_POST_ENTID']

  const live = 'TRUE' === env.APIC_AGENT_TEST_LIVE

  if (live) {
    client = new ApicAgentSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
