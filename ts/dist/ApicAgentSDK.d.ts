import { ParseUserAgentGetEntity } from './entity/ParseUserAgentGetEntity';
import { ParseUserAgentPostEntity } from './entity/ParseUserAgentPostEntity';
export type * from './ApicAgentTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ApicAgentEntityBase } from './ApicAgentEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ApicAgentSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ParseUserAgentGet(entopts?: Record<string, any>): ParseUserAgentGetEntity;
    ParseUserAgentPost(entopts?: Record<string, any>): ParseUserAgentPostEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ApicAgentSDK;
    tester(testopts?: any, sdkopts?: any): ApicAgentSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ApicAgentSDK;
export { stdutil, config, BaseFeature, ApicAgentEntityBase, ApicAgentSDK, SDK, };
