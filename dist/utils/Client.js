"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgrest_js_1 = require("@supabase/postgrest-js");
const envValues_1 = require("./envValues");
/**
 * Client Class
 */
class Client {
    /**
     * Constructor
     */
    constructor(args) {
        this.authenticated = false;
        const { url, port, username, password, authRpcFunction, getToken, getCredentials, } = Object.assign({ url: envValues_1.ENV_URL, port: envValues_1.ENV_PORT, username: envValues_1.ENV_USERNAME, password: envValues_1.ENV_PASSWORD, authRpcFunction: envValues_1.ENV_AUTH_RPC_FUNCTION }, args);
        this.url = this.getUrlString(url, port);
        this.username = username;
        this.password = password;
        this.authRpcFunction = authRpcFunction || '';
        this.getToken = getToken;
        this.getCredentials = getCredentials;
        this.client = new postgrest_js_1.PostgrestClient(this.url);
    }
    /**
     * Authenticate
     */
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get Credentials
                if (this.getCredentials) {
                    const info = yield this.getCredentials();
                    this.username = (info === null || info === void 0 ? void 0 : info.username) || '';
                    this.password = (info === null || info === void 0 ? void 0 : info.password) || '';
                }
                // Call Auth RPC Function
                const result = yield this.client.rpc(this.authRpcFunction, {
                    email: this.username,
                    pass: this.password,
                });
                const data = result === null || result === void 0 ? void 0 : result.data;
                if (result === null || result === void 0 ? void 0 : result.data) {
                    let token;
                    if (this.getToken) {
                        token = this.getToken(data) || '';
                    }
                    else {
                        token = (data === null || data === void 0 ? void 0 : data.token) || '';
                    }
                    if (token) {
                        this.client.auth(token);
                        this.authenticated = true;
                    }
                }
            }
            catch (err) {
                // Do Nothing
            }
        });
    }
    /**
     * Get Url String
     */
    getUrlString(url, port) {
        let fullUrl = url;
        if (fullUrl[fullUrl.length - 1] == '/') {
            fullUrl = fullUrl.substring(0, fullUrl.length - 1);
        }
        if (port)
            fullUrl += `:${port}`;
        return fullUrl;
    }
}
exports.default = Client;
