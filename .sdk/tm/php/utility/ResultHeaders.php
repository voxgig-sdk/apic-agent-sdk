<?php
declare(strict_types=1);

// ApicAgent SDK utility: result_headers

class ApicAgentResultHeaders
{
    public static function call(ApicAgentContext $ctx): ?ApicAgentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
