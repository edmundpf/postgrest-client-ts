[postgrest-client-ts](README.md) / Exports

# postgrest-client-ts

## Table of contents

### Classes

- [default](classes/default.md)

### Type aliases

- [ClientArgs](modules.md#clientargs)

## Type aliases

### ClientArgs

Ƭ **ClientArgs**: `Object`

Client Args Type

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authRpcFunction?` | `string` |
| `password?` | `string` |
| `port?` | `number` |
| `token?` | `string` |
| `url?` | `string` |
| `username?` | `string` |
| `getCredentials?` | () => `Credentials` \| `Promise`<`Credentials`\> |
| `getToken?` | (`data`: `any`) => `string` |

#### Defined in

[utils/types.ts:62](https://github.com/edmundpf/postgrest-client-ts/blob/95f0a45/src/utils/types.ts#L62)
