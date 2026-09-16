# ApicAgent SDK feature factory

from apicagent_sdk.feature.base_feature import ApicAgentBaseFeature
from apicagent_sdk.feature.ratelimit_feature import ApicAgentRatelimitFeature
from apicagent_sdk.feature.retry_feature import ApicAgentRetryFeature
from apicagent_sdk.feature.test_feature import ApicAgentTestFeature
from apicagent_sdk.feature.timeout_feature import ApicAgentTimeoutFeature


_FEATURES = {
    "base": lambda: ApicAgentBaseFeature(),
    "ratelimit": lambda: ApicAgentRatelimitFeature(),
    "retry": lambda: ApicAgentRetryFeature(),
    "test": lambda: ApicAgentTestFeature(),
    "timeout": lambda: ApicAgentTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
