<?php
declare(strict_types=1);

// ApicAgent SDK utility: prepare_headers

class ApicAgentPrepareHeaders
{
    public static function call(ApicAgentContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
