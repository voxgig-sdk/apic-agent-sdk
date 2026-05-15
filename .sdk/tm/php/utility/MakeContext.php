<?php
declare(strict_types=1);

// ApicAgent SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ApicAgentMakeContext
{
    public static function call(array $ctxmap, ?ApicAgentContext $basectx): ApicAgentContext
    {
        return new ApicAgentContext($ctxmap, $basectx);
    }
}
