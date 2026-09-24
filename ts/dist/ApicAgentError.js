"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApicAgentError = void 0;
class ApicAgentError extends Error {
    isApicAgentError = true;
    sdk = 'ApicAgent';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ApicAgentError = ApicAgentError;
//# sourceMappingURL=ApicAgentError.js.map