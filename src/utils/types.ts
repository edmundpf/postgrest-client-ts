import { PostgrestError } from '@supabase/postgrest-js'

/**
 * Credentials Type
 */

type Credentials = {
	username: string
	password: string
}

/**
 * Order By Type
 */

type OrderBy = {
	[index: string]: 'asc' | 'desc'
}

/**
 * Where Type
 */

type Where = {
	field: string
	operator: FilterOperator
	value: string | number | boolean | null
}

/**
 * Filter Operator Type
 */

type FilterOperator =
	| 'eq'
	| 'neq'
	| 'gt'
	| 'gte'
	| 'lt'
	| 'lte'
	| 'like'
	| 'ilike'
	| 'is'
	| 'in'
	| 'cs'
	| 'cd'
	| 'sl'
	| 'sr'
	| 'nxl'
	| 'nxr'
	| 'adj'
	| 'ov'
	| 'fts'
	| 'plfts'
	| 'phfts'
	| 'wfts'

/**
 * Client Args Type
 */

export type ClientArgs = {
	url?: string
	port?: number
	username?: string
	password?: string
	token?: string
	authRpcFunction?: string
	getToken?: (data: any) => string
	getCredentials?: () => Credentials | Promise<Credentials>
}

/**
 * Get Args Type
 */

export type GetArgs = {
	select?: string[]
	where?: Where[]
	orderBy?: OrderBy
	limit?: number
	startIndex?: number
	endIndex?: number
}

/**
 * Result Type
 */

export type Result = {
	status: 'ok' | 'error'
	data: any[]
	error?: PostgrestError
}

/**
 * Single Result Type
 */

export type SingleResult = Result & {
	data: any | null
}

/**
 * Get Multiple Args
 */

export type GetMultipleArgs = { tableName: string; args?: GetArgs }
