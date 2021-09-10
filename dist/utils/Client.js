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
        // Properties
        this.token = '';
        this.authenticated = false;
        const { url, port, username, password, token, authRpcFunction, getToken, getCredentials, } = Object.assign({ url: envValues_1.ENV_URL, port: envValues_1.ENV_PORT, username: envValues_1.ENV_USERNAME, password: envValues_1.ENV_PASSWORD, token: '', authRpcFunction: envValues_1.ENV_AUTH_RPC_FUNCTION }, args);
        this.url = this.getUrlString(url, port);
        this.username = username || '';
        this.password = password || '';
        this.authRpcFunction = authRpcFunction || '';
        this.getToken = getToken;
        this.getCredentials = getCredentials;
        this.client = new postgrest_js_1.PostgrestClient(this.url);
        this.setToken(token);
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
                const result = yield this.functionOne(this.authRpcFunction, {
                    email: this.username,
                    pass: this.password,
                });
                const { data } = result;
                if (data) {
                    let token;
                    if (this.getToken) {
                        token = this.getToken(data) || '';
                    }
                    else {
                        token = (data === null || data === void 0 ? void 0 : data.token) || '';
                    }
                    this.setToken(token);
                }
            }
            catch (err) {
                // Do Nothing
            }
        });
    }
    /**
     * Get
     */
    get(tableName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getFlow(tableName, args));
        });
    }
    /**
     * Get One
     */
    getOne(tableName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getFlow(tableName, args, true));
        });
    }
    /**
     * Update
     */
    update(tableName, match, record) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(match || {}).length == 0) {
                return {
                    status: 'error',
                    data: [],
                    error: {
                        message: 'No update query passed, refusing to update all records',
                    },
                };
            }
            const { data, error } = yield this.client
                .from(tableName)
                .update(record)
                .match(match);
            return this.formatResult(data, error);
        });
    }
    /**
     * Upsert
     */
    upsert(tableName, records, key = 'id') {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client
                .from(tableName)
                .upsert(records, { onConflict: key });
            return this.formatResult(data, error);
        });
    }
    /**
     * Insert
     */
    insert(tableName, records) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client.from(tableName).insert(records);
            return this.formatResult(data, error);
        });
    }
    /**
     * Insert One
     */
    insertOne(tableName, record) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client.from(tableName).insert(record);
            return this.formatResult(data, error, true);
        });
    }
    /**
     * Delete
     */
    delete(tableName, match) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(match || {}).length == 0) {
                return {
                    status: 'error',
                    data: [],
                    error: {
                        message: 'No delete query passed, refusing to delete all records',
                    },
                };
            }
            const { data, error } = yield this.client
                .from(tableName)
                .delete()
                .match(match);
            return this.formatResult(data, error);
        });
    }
    /**
     * Function
     */
    function(functionName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.functionFlow(functionName, args));
        });
    }
    /**
     * Function One
     */
    functionOne(functionName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.functionFlow(functionName, args, true));
        });
    }
    /**
     * Get Multiple
     */
    getMultiple(gets) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getMultipleFlow(gets));
        });
    }
    /**
     * Get One Multiple
     */
    getOneMultiple(gets) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getMultipleFlow(gets, true));
        });
    }
    /**
     * Update Multiple
     */
    updateMultiple(updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const requests = [];
            for (const update of updates) {
                const { tableName, match, record } = update;
                requests.push(this.update(tableName, match, record));
            }
            return yield Promise.all(requests);
        });
    }
    /**
     * Delete Multiple
     */
    deleteMultiple(deletes) {
        return __awaiter(this, void 0, void 0, function* () {
            const requests = [];
            for (const deleteRec of deletes) {
                const { tableName, match } = deleteRec;
                requests.push(this.delete(tableName, match));
            }
            return yield Promise.all(requests);
        });
    }
    /**
     * Get Flow
     */
    getFlow(tableName, args, singleRecord = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { select, where, orderBy, limit: limitArg, startIndex: startIndexArg, endIndex: endIndexArg, } = args || {};
            // Is Valid Range
            const isValidRange = (start, end) => start != null && end != null && start >= 0 && end >= start;
            // Modify Limit and Range Args w/ Single Record
            const startIndex = startIndexArg;
            let endIndex = endIndexArg;
            let limit = limitArg || 0;
            if (singleRecord) {
                limit = 1;
                if (startIndex != null) {
                    endIndex = startIndex;
                }
            }
            // Get Selected Fields and Check Valid Range
            const selectString = select ? this.formatJSONFields(select).join(', ') : '*';
            const validRange = isValidRange(startIndex, endIndex);
            let query = this.client.from(tableName).select(selectString);
            // Add Where Clauses
            if (where === null || where === void 0 ? void 0 : where.length) {
                for (const clause of where) {
                    const { field, operator, value } = clause;
                    query = query.filter(field, operator, value);
                }
            }
            // Add Order By Clauses
            if (orderBy && Object.keys(orderBy).length) {
                for (const field in orderBy) {
                    const ascending = orderBy[field] == 'asc' ? true : false;
                    query = query.order(field, { ascending });
                }
            }
            // Add Limit Clause
            if (limit && !validRange) {
                query = query.limit(limit);
            }
            // Add Range Clause
            else if (validRange) {
                query = query.range(startIndex || 0, endIndex || 0);
            }
            // Get Single Record
            if (singleRecord) {
                const { data, error } = yield query.single();
                return this.formatResult(data, error, true);
            }
            else {
                const { data, error } = yield query;
                return this.formatResult(data, error);
            }
        });
    }
    /**
     * Function
     */
    functionFlow(functionName, args, isSingle = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client.rpc(functionName, args);
            return this.formatResult(data, error, isSingle);
        });
    }
    /**
     * Get Multiple Flow
     */
    getMultipleFlow(gets, isSingle = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const requests = [];
            for (const get of gets) {
                const { tableName, args } = get;
                const method = isSingle ? this.getOne.bind(this) : this.get.bind(this);
                requests.push(method(tableName, args));
            }
            return yield Promise.all(requests);
        });
    }
    /**
     * Format Result
     */
    formatResult(records, error, isSingle = false) {
        const status = error ? 'error' : 'ok';
        const isArray = Array.isArray(records);
        let data = isSingle ? records || null : records || [];
        if (isSingle && isArray)
            data = data[0] || null;
        else if (!isSingle && data && !isArray)
            data = [data];
        const result = {
            status,
            data,
        };
        if (error)
            result.error = error;
        return result;
    }
    /**
     * Format JSON Fields
     */
    formatJSONFields(fields) {
        const newFields = [];
        for (const field of fields) {
            const needsFormat = field.includes('.') || field.includes('[');
            if (needsFormat) {
                newFields.push(field.replace(/[.|[]/g, '->').replace(/]/g, ''));
            }
            else {
                newFields.push(field);
            }
        }
        return newFields;
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
    /**
     * Set Token
     */
    setToken(token) {
        if (token) {
            this.client.auth(token);
            this.token = token;
            this.authenticated = true;
        }
    }
}
exports.default = Client;
