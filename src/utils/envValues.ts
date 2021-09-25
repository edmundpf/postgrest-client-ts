import { config } from 'dotenv'
import { decode as decodeBase64 } from 'base-64'

// Init
config()

// Decode
const decode = (value?: string) => (value ? decodeBase64(value) : '')

// Environment URL
export const ENV_URL = process.env.POSTGREST_CLIENT_URL || ''

// Environment Auth RPC Function
export const ENV_AUTH_RPC_FUNCTION =
	process.env.POSTGREST_CLIENT_AUTH_RPC_FUNCTION || ''

// Environment Port
export const ENV_PORT = Number(process.env.POSTGREST_CLIENT_PORT) || 0

// Environment Username
export const ENV_USERNAME = decode(process.env.POSTGREST_CLIENT_USERNAME)

// Environment Password
export const ENV_PASSWORD = decode(process.env.POSTGREST_CLIENT_PASSWORD)
