
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ApicAgentSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ApicAgentSDK.test()
    equal(null !== testsdk, true)
  })

})
