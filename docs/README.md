postgrest-client-ts / [Exports](modules.md)

# postgrest-client-ts

> Postgrest Client using JWT auth

## Install

```bash
$ npm i -S git@github.com:edmundpf/postgrest-client-ts.git
```

## Usage

```javascript
import Client from 'postgrest-client-ts'

const client = new Client()

await client.authenticate()
const result = await client.get('my_table')
console.log(result.data)
```

## Environment Variables

- POSTGREST_CLIENT_URL: string
  - URL of your Postgrest API
- POSTGREST_CLIENT_AUTH_RPC_FUNCTION: string
  - Function name for API access.
  - Your database must have an authentication function exposed that returns a JWT after a successful username/password is supplied.
  - See [Postgrest Auth Roles](https://postgrest.org/en/v4.1/auth.html)
- POSTGREST_CLIENT_USERNAME: string
  - Base-64 encoded username for authentication
- POSTGREST_CLIENT_PASSWORD: string
  - Base-64 encoded password for authentication

## Documentation

- [Package Docs](/docs)
