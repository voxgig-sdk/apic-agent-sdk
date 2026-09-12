import { ApicAgentEntityBase } from '../ApicAgentEntityBase';
import type { ApicAgentSDK } from '../ApicAgentSDK';
import type { Control } from '../types';
import type { ParseUserAgentPost, ParseUserAgentPostCreateData } from '../ApicAgentTypes';
declare class ParseUserAgentPostEntity extends ApicAgentEntityBase<ParseUserAgentPost> {
    constructor(client: ApicAgentSDK, entopts: any);
    make(this: ParseUserAgentPostEntity): ParseUserAgentPostEntity;
    create(this: any, reqdata?: ParseUserAgentPostCreateData, ctrl?: Control): Promise<ParseUserAgentPostEntity>;
}
export { ParseUserAgentPostEntity };
