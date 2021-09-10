import { ClientArgs } from './types';
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
     * Get Url String
     */
    private getUrlString;
}
