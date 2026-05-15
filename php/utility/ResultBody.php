<?php
declare(strict_types=1);

// ApicAgent SDK utility: result_body

class ApicAgentResultBody
{
    public static function call(ApicAgentContext $ctx): ?ApicAgentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
