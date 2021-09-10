/**
 * Credentials Type
 */

type Credentials = {
	username: string
	password: string
}

/**
 * Client Args Type
 */

export type ClientArgs = {
	url: string
	authRpcFunction: string
	port?: number
	username?: string
	password?: string
	getCredentials?: () => Credentials | Promise<Credentials>
	getToken?: (data: any) => string
}
