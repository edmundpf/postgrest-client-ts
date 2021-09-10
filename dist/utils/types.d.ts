/**
 * Credentials Type
 */
declare type Credentials = {
    username: string;
    password: string;
};
/**
 * Client Args Type
 */
export declare type ClientArgs = {
    url: string;
    authRpcFunction: string;
    port?: number;
    username?: string;
    password?: string;
    getCredentials?: () => (Credentials | Promise<Credentials>);
    getToken?: (data: any) => string;
};
export {};
