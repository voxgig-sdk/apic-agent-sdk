# ApicAgent SDK feature factory

from feature.base_feature import ApicAgentBaseFeature
from feature.test_feature import ApicAgentTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ApicAgentBaseFeature(),
        "test": lambda: ApicAgentTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
