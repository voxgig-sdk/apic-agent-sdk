<?php
declare(strict_types=1);

// ApicAgent SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ApicAgentFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ApicAgentBaseFeature();
            case "test":
                return new ApicAgentTestFeature();
            default:
                return new ApicAgentBaseFeature();
        }
    }
}
