# ProjectName SDK exists test

import pytest
from apicagent_sdk import ApicAgentSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ApicAgentSDK.test(None, None)
        assert testsdk is not None
