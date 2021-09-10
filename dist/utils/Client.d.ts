import { ClientArgs, GetArgs, Result, SingleResult, GetMultipleArgs } from './types';
/**
 * Client Class
 */
export default class Client {
    token: string;
    authenticated: boolean;
    url: string;
    private username;
    private password;
    private authRpcFunction;
    private getToken?;
    private getCredentials?;
    private client;
    /**
     * Constructor
     */
    constructor(args?: ClientArgs);
    /**
     * Authenticate
     */
    authenticate(): Promise<void>;
    /**
     * Get
     */
    get(tableName: string, args?: GetArgs): Promise<Result>;
    /**
     * Get One
     */
    getOne(tableName: string, args?: GetArgs): Promise<SingleResult>;
    /**
     * Update
     */
    update(tableName: string, match: any, record: any): Promise<Result>;
    /**
     * Upsert
     */
    upsert(tableName: string, records: any[] | any, key?: string): Promise<Result>;
    /**
     * Insert
     */
    insert(tableName: string, records: any[] | any): Promise<Result>;
    /**
     * Insert One
     */
    insertOne(tableName: string, record: any): Promise<SingleResult>;
    /**
     * Delete
     */
    delete(tableName: string, match: any): Promise<Result>;
    /**
     * Function
     */
    function(functionName: string, args?: any): Promise<Result>;
    /**
     * Function One
     */
    functionOne(functionName: string, args?: any): Promise<SingleResult>;
    /**
     * Get Multiple
     */
    getMultiple(gets: GetMultipleArgs[]): Promise<Result[]>;
    /**
     * Get One Multiple
     */
    getOneMultiple(gets: GetMultipleArgs[]): Promise<SingleResult[]>;
    /**
     * Update Multiple
     */
    updateMultiple(updates: {
        tableName: string;
        match: any;
        record: any;
    }[]): Promise<Result[]>;
    /**
     * Delete Multiple
     */
    deleteMultiple(deletes: {
        tableName: string;
        match: any;
    }[]): Promise<Result[]>;
    /**
     * Get Flow
     */
    private getFlow;
    /**
     * Function
     */
    private functionFlow;
    /**
     * Get Multiple Flow
     */
    private getMultipleFlow;
    /**
     * Format Result
     */
    private formatResult;
    /**
     * Format JSON Fields
     */
    private formatJSONFields;
    /**
     * Get Url String
     */
    private getUrlString;
    /**
     * Set Token
     */
    private setToken;
}
