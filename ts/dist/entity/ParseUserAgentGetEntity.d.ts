import { ApicAgentEntityBase } from '../ApicAgentEntityBase';
import type { ApicAgentSDK } from '../ApicAgentSDK';
import type { Control } from '../types';
import type { ParseUserAgentGet, ParseUserAgentGetLoadMatch } from '../ApicAgentTypes';
declare class ParseUserAgentGetEntity extends ApicAgentEntityBase<ParseUserAgentGet> {
    constructor(client: ApicAgentSDK, entopts: any);
    make(this: ParseUserAgentGetEntity): ParseUserAgentGetEntity;
    load(this: any, reqmatch?: ParseUserAgentGetLoadMatch, ctrl?: Control): Promise<ParseUserAgentGetEntity>;
}
export { ParseUserAgentGetEntity };
