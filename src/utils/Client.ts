import { PostgrestClient, PostgrestError } from '@supabase/postgrest-js'
import {
	ClientArgs,
	GetArgs,
	Result,
	SingleResult,
	GetMultipleArgs,
} from './types'
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

	token = ''
	authenticated = false
	url: string
	private username: string
	private password: string
	private authRpcFunction: string
	private getToken?: ClientArgs['getToken']
	private getCredentials?: ClientArgs['getCredentials']
	private client: PostgrestClient

	/**
	 * Constructor
	 */

	constructor(args?: ClientArgs) {
		const {
			url,
			port,
			username,
			password,
			token,
			authRpcFunction,
			getToken,
			getCredentials,
		} = {
			url: ENV_URL,
			port: ENV_PORT,
			username: ENV_USERNAME,
			password: ENV_PASSWORD,
			token: '',
			authRpcFunction: ENV_AUTH_RPC_FUNCTION,
			...args,
		}
		this.url = this.getUrlString(url, port)
		this.username = username || ''
		this.password = password || ''
		this.authRpcFunction = authRpcFunction || ''
		this.getToken = getToken
		this.getCredentials = getCredentials
		this.client = new PostgrestClient(this.url)
		this.setToken(token)
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
			const result = await this.functionOne(this.authRpcFunction, {
				email: this.username,
				pass: this.password,
			})
			const { data } = result
			if (data) {
				let token: string
				if (this.getToken) {
					token = this.getToken(data) || ''
				} else {
					token = data?.token || ''
				}
				this.setToken(token)
			}
		} catch (err) {
			// Do Nothing
		}
	}

	/**
	 * Get
	 */

	async get(tableName: string, args?: GetArgs) {
		return (await this.getFlow(tableName, args)) as Result
	}

	/**
	 * Get One
	 */

	async getOne(tableName: string, args?: GetArgs) {
		return (await this.getFlow(tableName, args, true)) as SingleResult
	}

	/**
	 * Update
	 */

	async update(tableName: string, match: any, record: any) {
		if (Object.keys(match || {}).length == 0) {
			return {
				status: 'error',
				data: [] as any[],
				error: {
					message: 'No update query passed, refusing to update all records',
				},
			} as Result
		}
		const { data, error } = await this.client
			.from(tableName)
			.update(record)
			.match(match)
		return this.formatResult(data, error) as Result
	}

	/**
	 * Upsert
	 */

	async upsert(tableName: string, records: any[] | any, key = 'id') {
		const { data, error } = await this.client
			.from(tableName)
			.upsert(records, { onConflict: key })
		return this.formatResult(data, error) as Result
	}

	/**
	 * Insert
	 */

	async insert(tableName: string, records: any[] | any) {
		const { data, error } = await this.client.from(tableName).insert(records)
		return this.formatResult(data, error) as Result
	}

	/**
	 * Insert One
	 */

	async insertOne(tableName: string, record: any) {
		const { data, error } = await this.client.from(tableName).insert(record)
		return this.formatResult(data, error, true) as SingleResult
	}

	/**
	 * Delete
	 */

	async delete(tableName: string, match: any) {
		if (Object.keys(match || {}).length == 0) {
			return {
				status: 'error',
				data: [] as any[],
				error: {
					message: 'No delete query passed, refusing to delete all records',
				},
			} as Result
		}
		const { data, error } = await this.client
			.from(tableName)
			.delete()
			.match(match)
		return this.formatResult(data, error) as Result
	}

	/**
	 * Function
	 */

	async function(functionName: string, args?: any) {
		return (await this.functionFlow(functionName, args)) as Result
	}

	/**
	 * Function One
	 */

	async functionOne(functionName: string, args?: any) {
		return (await this.functionFlow(functionName, args, true)) as SingleResult
	}

	/**
	 * Get Multiple
	 */

	async getMultiple(gets: GetMultipleArgs[]) {
		return (await this.getMultipleFlow(gets)) as Result[]
	}

	/**
	 * Get One Multiple
	 */

	async getOneMultiple(gets: GetMultipleArgs[]) {
		return (await this.getMultipleFlow(gets, true)) as SingleResult[]
	}

	/**
	 * Update Multiple
	 */

	async updateMultiple(
		updates: { tableName: string; match: any; record: any }[]
	) {
		const requests: ReturnType<Client['update']>[] = []
		for (const update of updates) {
			const { tableName, match, record } = update
			requests.push(this.update(tableName, match, record))
		}
		return await Promise.all(requests)
	}

	/**
	 * Delete Multiple
	 */

	async deleteMultiple(deletes: { tableName: string; match: any }[]) {
		const requests: ReturnType<Client['delete']>[] = []
		for (const deleteRec of deletes) {
			const { tableName, match } = deleteRec
			requests.push(this.delete(tableName, match))
		}
		return await Promise.all(requests)
	}

	/**
	 * Get Flow
	 */

	private async getFlow(
		tableName: string,
		args?: GetArgs,
		singleRecord = false
	): Promise<Result | SingleResult> {
		const {
			select,
			where,
			orderBy,
			limit: limitArg,
			startIndex: startIndexArg,
			endIndex: endIndexArg,
		} = args || {}
		// Is Valid Range
		const isValidRange = (start?: number, end?: number) =>
			start != null && end != null && start >= 0 && end >= start

		// Modify Limit and Range Args w/ Single Record
		const startIndex = startIndexArg
		let endIndex = endIndexArg
		let limit = limitArg || 0
		if (singleRecord) {
			limit = 1
			if (startIndex != null) {
				endIndex = startIndex
			}
		}

		// Get Selected Fields and Check Valid Range
		const selectString = select ? this.formatJSONFields(select).join(', ') : '*'
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
		if (orderBy && Object.keys(orderBy).length) {
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
			query = query.range(startIndex || 0, endIndex || 0)
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
	 * Function
	 */

	private async functionFlow(
		functionName: string,
		args?: any,
		isSingle = false
	) {
		const { data, error } = await this.client.rpc(functionName, args)
		return this.formatResult(data, error, isSingle)
	}

	/**
	 * Get Multiple Flow
	 */

	private async getMultipleFlow(
		gets: GetMultipleArgs[],
		isSingle = false
	): Promise<Result[] | SingleResult[]> {
		const requests: Promise<Result | SingleResult>[] = []
		for (const get of gets) {
			const { tableName, args } = get
			const method = isSingle ? this.getOne.bind(this) : this.get.bind(this)
			requests.push(method(tableName, args))
		}
		return await Promise.all(requests)
	}

	/**
	 * Format Result
	 */

	private formatResult(
		records: any,
		error: PostgrestError | null,
		isSingle = false
	) {
		const status = error ? 'error' : 'ok'
		const isArray = Array.isArray(records)
		let data = isSingle ? records || null : records || []
		if (isSingle && isArray) data = data[0] || null
		else if (!isSingle && data && !isArray) data = [data]
		const result = {
			status,
			data,
		} as Result | SingleResult
		if (error) result.error = error
		return result
	}

	/**
	 * Format JSON Fields
	 */

	private formatJSONFields(fields: string[]) {
		const newFields: string[] = []
		for (const field of fields) {
			const needsFormat = field.includes('.') || field.includes('[')
			if (needsFormat) {
				newFields.push(field.replace(/[.|[]/g, '->').replace(/]/g, ''))
			} else {
				newFields.push(field)
			}
		}
		return newFields
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

	/**
	 * Set Token
	 */

	private setToken(token: string) {
		if (token) {
			this.client.auth(token)
			this.token = token
			this.authenticated = true
		}
	}
}
