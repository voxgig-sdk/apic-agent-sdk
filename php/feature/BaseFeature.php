<?php
declare(strict_types=1);

// ApicAgent SDK base feature

class ApicAgentBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ApicAgentContext $ctx, array $options): void {}
    public function PostConstruct(ApicAgentContext $ctx): void {}
    public function PostConstructEntity(ApicAgentContext $ctx): void {}
    public function SetData(ApicAgentContext $ctx): void {}
    public function GetData(ApicAgentContext $ctx): void {}
    public function GetMatch(ApicAgentContext $ctx): void {}
    public function SetMatch(ApicAgentContext $ctx): void {}
    public function PrePoint(ApicAgentContext $ctx): void {}
    public function PreSpec(ApicAgentContext $ctx): void {}
    public function PreRequest(ApicAgentContext $ctx): void {}
    public function PreResponse(ApicAgentContext $ctx): void {}
    public function PreResult(ApicAgentContext $ctx): void {}
    public function PreDone(ApicAgentContext $ctx): void {}
    public function PreUnexpected(ApicAgentContext $ctx): void {}
}
