<?php
declare(strict_types=1);

// ApicAgent SDK utility: feature_add

class ApicAgentFeatureAdd
{
    public static function call(ApicAgentContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
