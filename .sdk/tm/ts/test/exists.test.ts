
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ApicAgentSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ApicAgentSDK.test()
    equal(testsdk instanceof ApicAgentSDK, true,
      'ApicAgentSDK.test() must return a client synchronously')
  })

})
