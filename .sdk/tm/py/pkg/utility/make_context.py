# ApicAgent SDK utility: make_context

from projectname_sdk.core.context import ApicAgentContext


def make_context_util(ctxmap, basectx):
    return ApicAgentContext(ctxmap, basectx)
