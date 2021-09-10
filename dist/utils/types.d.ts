import { PostgrestError } from '@supabase/postgrest-js';
/**
 * Credentials Type
 */
declare type Credentials = {
    username: string;
    password: string;
};
/**
 * Order By Type
 */
declare type OrderBy = {
    [index: string]: 'asc' | 'desc';
};
/**
 * Where Type
 */
declare type Where = {
    field: string;
    operator: FilterOperator;
    value: string | number | boolean | null;
};
/**
 * Filter Operator Type
 */
declare type FilterOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'is' | 'in' | 'cs' | 'cd' | 'sl' | 'sr' | 'nxl' | 'nxr' | 'adj' | 'ov' | 'fts' | 'plfts' | 'phfts' | 'wfts';
/**
 * Client Args Type
 */
export declare type ClientArgs = {
    url: string;
    authRpcFunction: string;
    port?: number;
    username?: string;
    password?: string;
    getCredentials?: () => Credentials | Promise<Credentials>;
    getToken?: (data: any) => string;
};
/**
 * Get Args
 */
export declare type GetArgs = {
    select?: string[];
    where?: Where[];
    orderBy?: OrderBy;
    limit?: number;
    startIndex?: number;
    endIndex?: number;
};
/**
 * Result
 */
export declare type Result = {
    status: 'ok' | 'error';
    data: any[] | null;
    error?: PostgrestError | null;
};
/**
 * Single Result
 */
export declare type SingleResult = Result & {
    data: any | null;
};
export {};
