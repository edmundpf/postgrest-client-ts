import { PostgrestClient } from '@supabase/postgrest-js'
import {
	ENV_URL,
	ENV_PORT,
	ENV_USERNAME,
	ENV_PASSWORD,
	ENV_AUTH_RPC_FUNCTION,
} from './envValues'
import { ClientArgs } from './types'

/**
 * Client Class
 */

export default class Client {
	// Properties

	url: string
	authenticated = false
	private client: PostgrestClient
	private username: string
	private password: string
	private authRpcFunction: string
	private getToken?: ClientArgs['getToken']
	private getCredentials?: ClientArgs['getCredentials']

	/**
	 * Constructor
	 */

	constructor(args?: ClientArgs) {
		const {
			url,
			port,
			username,
			password,
			authRpcFunction,
			getToken,
			getCredentials,
		} = {
			url: ENV_URL,
			port: ENV_PORT,
			username: ENV_USERNAME,
			password: ENV_PASSWORD,
			authRpcFunction: ENV_AUTH_RPC_FUNCTION,
			...args,
		}
		this.url = this.getUrlString(url, port)
		this.username = username
		this.password = password
		this.authRpcFunction = authRpcFunction || ''
		this.getToken = getToken
		this.getCredentials = getCredentials
		this.client = new PostgrestClient(this.url)
	}

	/**
	 * Authenticate
	 */

	async authenticate() {
		try {
			// Get Credentials
			if (this.getCredentials) {
				const info = await this.getCredentials()
				this.username = info?.username || ''
				this.password = info?.password || ''
			}

			// Call Auth RPC Function
			const result = await this.client.rpc(this.authRpcFunction, {
				email: this.username,
				pass: this.password,
			})
			const data = result?.data as any
			if (result?.data) {
				let token: string
				if (this.getToken) {
					token = this.getToken(data) || ''
				} else {
					token = data?.token || ''
				}
				if (token) {
					this.client.auth(token)
					this.authenticated = true
				}
			}
		} catch (err) {
			// Do Nothing
		}
	}

	/**
	 * Get Url String
	 */

	private getUrlString(url: string, port?: number) {
		let fullUrl = url
		if (fullUrl[fullUrl.length - 1] == '/') {
			fullUrl = fullUrl.substring(0, fullUrl.length - 1)
		}
		if (port) fullUrl += `:${port}`
		return fullUrl
	}
}
