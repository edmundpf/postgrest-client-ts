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

## Documentation

- [Package Docs](/docs)
