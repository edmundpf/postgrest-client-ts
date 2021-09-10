import { ClientArgs, GetArgs, SingleResult } from './types';
/**
 * Client Class
 */
export default class Client {
    url: string;
    authenticated: boolean;
    private client;
    private username;
    private password;
    private authRpcFunction;
    private getToken?;
    private getCredentials?;
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
    get(tableName: string, args?: GetArgs, singleRecord?: boolean): Promise<SingleResult>;
    /**
     * Get One
     */
    getOne(tableName: string, args: GetArgs): Promise<SingleResult>;
    /**
     * Format Result
     */
    private formatResult;
    /**
     * Get Url String
     */
    private getUrlString;
}
