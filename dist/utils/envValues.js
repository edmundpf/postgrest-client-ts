"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_PASSWORD = exports.ENV_USERNAME = exports.ENV_PORT = exports.ENV_AUTH_RPC_FUNCTION = exports.ENV_URL = void 0;
const dotenv_1 = require("dotenv");
const base_64_1 = require("base-64");
// Init
(0, dotenv_1.config)();
// Decode
const decode = (value) => value ? (0, base_64_1.decode)(value) : '';
// Environment URL
exports.ENV_URL = process.env.POSTGREST_CLIENT_URL || '';
// Environment Auth RPC Function
exports.ENV_AUTH_RPC_FUNCTION = process.env.POSTGREST_CLIENT_AUTH_RPC_FUNCTION || '';
// Environment Port
exports.ENV_PORT = Number(process.env.POSTGREST_CLIENT_PORT) || 0;
// Environment Username
exports.ENV_USERNAME = decode(process.env.POSTGREST_CLIENT_USERNAME);
// Environment Password
exports.ENV_PASSWORD = decode(process.env.POSTGREST_CLIENT_PASSWORD);
