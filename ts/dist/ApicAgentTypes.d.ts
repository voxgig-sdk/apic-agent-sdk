export interface ParseUserAgentGet {
    browser_family?: string;
    client?: Record<string, any>;
    device?: Record<string, any>;
    os?: Record<string, any>;
    os_family?: string;
}
export interface ParseUserAgentGetLoadMatch {
    ua: string;
}
export interface ParseUserAgentPost {
    browser_family?: string;
    client?: Record<string, any>;
    device?: Record<string, any>;
    os?: Record<string, any>;
    os_family?: string;
    ua: string;
}
export interface ParseUserAgentPostCreateData {
    browser_family?: string;
    client?: Record<string, any>;
    device?: Record<string, any>;
    os?: Record<string, any>;
    os_family?: string;
    ua: string;
}
