<?php
declare(strict_types=1);

// ApicAgent SDK utility: prepare_body

class ApicAgentPrepareBody
{
    public static function call(ApicAgentContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
