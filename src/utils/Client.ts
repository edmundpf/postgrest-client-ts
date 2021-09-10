import { PostgrestClient } from '@supabase/postgrest-js'
import { ClientArgs, GetArgs, Result, SingleResult } from './types'

import {
	ENV_URL,
	ENV_PORT,
	ENV_USERNAME,
	ENV_PASSWORD,
	ENV_AUTH_RPC_FUNCTION,
} from './envValues'

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
	 * Get
	 */

	async get(tableName: string, args?: GetArgs, singleRecord = false) {
		const {
			select,
			where,
			orderBy,
			limit: limitArg,
			startIndex: startIndexArg,
			endIndex: endIndexArg,
		} = args || {}
		// Is Valid Range
		const isValidRange = (start?: number, end?: number) => {
			const startNum = start || 0
			const endNum = end || 0
			return startNum >= 0 && endNum > startNum
		}

		// Modify Limit and Range Args w/ Single Record
		const startIndex = startIndexArg || 0
		let endIndex = endIndexArg || 0
		let limit = limitArg || 0
		if (singleRecord) {
			limit = 1
			if (startIndex) {
				endIndex = startIndex + 1
			}
		}

		// Get Selected Fields and Check Valid Range
		const selectString = select ? select.join(', ') : '*'
		const validRange = isValidRange(startIndex, endIndex)
		let query = this.client.from(tableName).select(selectString)

		// Add Where Clauses
		if (where?.length) {
			for (const clause of where) {
				const { field, operator, value } = clause
				query = query.filter(field, operator, value)
			}
		}

		// Add Order By Clauses
		if (orderBy?.length) {
			for (const field in orderBy) {
				const ascending = orderBy[field] == 'asc' ? true : false
				query = query.order(field, { ascending })
			}
		}

		// Add Limit Clause
		if (limit && !validRange) {
			query = query.limit(limit)
		}

		// Add Range Clause
		else if (validRange) {
			query = query.range(startIndex, endIndex)
		}

		// Get Single Record
		if (singleRecord) {
			const { data, error } = await query.single()
			return this.formatResult(data, error, true) as SingleResult
		} else {
			const { data, error } = await query
			return this.formatResult(data, error) as Result
		}
	}

	/**
	 * Get One
	 */

	async getOne(tableName: string, args: GetArgs) {
		return await this.get(tableName, args, true)
	}

	/**
	 * Format Result
	 */

	private formatResult(
		result?: any[] | any,
		error?: Result['error'],
		isSingle = false
	) {
		const status = error ? 'ok' : 'error'
		const data = isSingle ? result || null : result || []
		return {
			status,
			data,
			error: error || null,
		} as Result | SingleResult
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
