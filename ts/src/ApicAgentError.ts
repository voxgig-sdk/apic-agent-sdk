
import { Context } from './Context'


class ApicAgentError extends Error {

  isApicAgentError = true

  sdk = 'ApicAgent'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ApicAgentError
}

