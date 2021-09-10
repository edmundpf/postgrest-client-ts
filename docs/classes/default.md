[postgrest-client-ts](../README.md) / [Exports](../modules.md) / default

# Class: default

Client Class

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [authRpcFunction](default.md#authrpcfunction)
- [authenticated](default.md#authenticated)
- [client](default.md#client)
- [getCredentials](default.md#getcredentials)
- [getToken](default.md#gettoken)
- [password](default.md#password)
- [token](default.md#token)
- [url](default.md#url)
- [username](default.md#username)

### Methods

- [authenticate](default.md#authenticate)
- [delete](default.md#delete)
- [deleteMultiple](default.md#deletemultiple)
- [formatJSONFields](default.md#formatjsonfields)
- [formatResult](default.md#formatresult)
- [function](default.md#function)
- [functionFlow](default.md#functionflow)
- [functionOne](default.md#functionone)
- [get](default.md#get)
- [getFlow](default.md#getflow)
- [getMultiple](default.md#getmultiple)
- [getMultipleFlow](default.md#getmultipleflow)
- [getOne](default.md#getone)
- [getOneMultiple](default.md#getonemultiple)
- [getUrlString](default.md#geturlstring)
- [insert](default.md#insert)
- [insertOne](default.md#insertone)
- [setToken](default.md#settoken)
- [update](default.md#update)
- [updateMultiple](default.md#updatemultiple)
- [upsert](default.md#upsert)

## Constructors

### constructor

• **new default**(`args?`)

Constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | [`ClientArgs`](../modules.md#clientargs) |

#### Defined in

[utils/Client.ts:38](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L38)

## Properties

### authRpcFunction

• `Private` **authRpcFunction**: `string`

#### Defined in

[utils/Client.ts:29](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L29)

___

### authenticated

• **authenticated**: `boolean` = `false`

#### Defined in

[utils/Client.ts:25](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L25)

___

### client

• `Private` **client**: `default`

#### Defined in

[utils/Client.ts:32](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L32)

___

### getCredentials

• `Private` `Optional` **getCredentials**: () => `Credentials` \| `Promise`<`Credentials`\>

#### Type declaration

▸ (): `Credentials` \| `Promise`<`Credentials`\>

##### Returns

`Credentials` \| `Promise`<`Credentials`\>

#### Defined in

[utils/Client.ts:31](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L31)

___

### getToken

• `Private` `Optional` **getToken**: (`data`: `any`) => `string`

#### Type declaration

▸ (`data`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

##### Returns

`string`

#### Defined in

[utils/Client.ts:30](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L30)

___

### password

• `Private` **password**: `string`

#### Defined in

[utils/Client.ts:28](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L28)

___

### token

• **token**: `string` = `''`

#### Defined in

[utils/Client.ts:24](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L24)

___

### url

• **url**: `string`

#### Defined in

[utils/Client.ts:26](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L26)

___

### username

• `Private` **username**: `string`

#### Defined in

[utils/Client.ts:27](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L27)

## Methods

### authenticate

▸ **authenticate**(): `Promise`<`void`\>

Authenticate

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/Client.ts:71](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L71)

___

### delete

▸ **delete**(`tableName`, `match`): `Promise`<`Result`\>

Delete

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `match` | `any` |

#### Returns

`Promise`<`Result`\>

#### Defined in

[utils/Client.ts:170](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L170)

___

### deleteMultiple

▸ **deleteMultiple**(`deletes`): `Promise`<`Result`[]\>

Delete Multiple

#### Parameters

| Name | Type |
| :------ | :------ |
| `deletes` | { `match`: `any` ; `tableName`: `string`  }[] |

#### Returns

`Promise`<`Result`[]\>

#### Defined in

[utils/Client.ts:238](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L238)

___

### formatJSONFields

▸ `Private` **formatJSONFields**(`fields`): `string`[]

Format JSON Fields

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | `string`[] |

#### Returns

`string`[]

#### Defined in

[utils/Client.ts:376](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L376)

___

### formatResult

▸ `Private` **formatResult**(`records`, `error`, `isSingle?`): `Result` \| `SingleResult`

Format Result

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `records` | `any` | `undefined` |
| `error` | ``null`` \| `PostgrestError` | `undefined` |
| `isSingle` | `boolean` | `false` |

#### Returns

`Result` \| `SingleResult`

#### Defined in

[utils/Client.ts:354](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L354)

___

### function

▸ **function**(`functionName`, `args?`): `Promise`<`Result`\>

Function

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `args?` | `any` |

#### Returns

`Promise`<`Result`\>

#### Defined in

[utils/Client.ts:191](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L191)

___

### functionFlow

▸ `Private` **functionFlow**(`functionName`, `args?`, `isSingle?`): `Promise`<`Result` \| `SingleResult`\>

Function

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `functionName` | `string` | `undefined` |
| `args?` | `any` | `undefined` |
| `isSingle` | `boolean` | `false` |

#### Returns

`Promise`<`Result` \| `SingleResult`\>

#### Defined in

[utils/Client.ts:324](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L324)

___

### functionOne

▸ **functionOne**(`functionName`, `args?`): `Promise`<`SingleResult`\>

Function One

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `args?` | `any` |

#### Returns

`Promise`<`SingleResult`\>

#### Defined in

[utils/Client.ts:199](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L199)

___

### get

▸ **get**(`tableName`, `args?`): `Promise`<`Result`\>

Get

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `args?` | `GetArgs` |

#### Returns

`Promise`<`Result`\>

#### Defined in

[utils/Client.ts:104](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L104)

___

### getFlow

▸ `Private` **getFlow**(`tableName`, `args?`, `singleRecord?`): `Promise`<`Result` \| `SingleResult`\>

Get Flow

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tableName` | `string` | `undefined` |
| `args?` | `GetArgs` | `undefined` |
| `singleRecord` | `boolean` | `false` |

#### Returns

`Promise`<`Result` \| `SingleResult`\>

#### Defined in

[utils/Client.ts:251](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L251)

___

### getMultiple

▸ **getMultiple**(`gets`): `Promise`<`Result`[]\>

Get Multiple

#### Parameters

| Name | Type |
| :------ | :------ |
| `gets` | `GetMultipleArgs`[] |

#### Returns

`Promise`<`Result`[]\>

#### Defined in

[utils/Client.ts:207](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L207)

___

### getMultipleFlow

▸ `Private` **getMultipleFlow**(`gets`, `isSingle?`): `Promise`<`Result`[] \| `SingleResult`[]\>

Get Multiple Flow

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `gets` | `GetMultipleArgs`[] | `undefined` |
| `isSingle` | `boolean` | `false` |

#### Returns

`Promise`<`Result`[] \| `SingleResult`[]\>

#### Defined in

[utils/Client.ts:337](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L337)

___

### getOne

▸ **getOne**(`tableName`, `args?`): `Promise`<`SingleResult`\>

Get One

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `args?` | `GetArgs` |

#### Returns

`Promise`<`SingleResult`\>

#### Defined in

[utils/Client.ts:112](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L112)

___

### getOneMultiple

▸ **getOneMultiple**(`gets`): `Promise`<`SingleResult`[]\>

Get One Multiple

#### Parameters

| Name | Type |
| :------ | :------ |
| `gets` | `GetMultipleArgs`[] |

#### Returns

`Promise`<`SingleResult`[]\>

#### Defined in

[utils/Client.ts:215](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L215)

___

### getUrlString

▸ `Private` **getUrlString**(`url`, `port?`): `string`

Get Url String

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `port?` | `number` |

#### Returns

`string`

#### Defined in

[utils/Client.ts:393](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L393)

___

### insert

▸ **insert**(`tableName`, `records`): `Promise`<`Result`\>

Insert

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `records` | `any` |

#### Returns

`Promise`<`Result`\>

#### Defined in

[utils/Client.ts:152](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L152)

___

### insertOne

▸ **insertOne**(`tableName`, `record`): `Promise`<`SingleResult`\>

Insert One

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `record` | `any` |

#### Returns

`Promise`<`SingleResult`\>

#### Defined in

[utils/Client.ts:161](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L161)

___

### setToken

▸ `Private` **setToken**(`token`): `void`

Set Token

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`void`

#### Defined in

[utils/Client.ts:406](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L406)

___

### update

▸ **update**(`tableName`, `match`, `record`): `Promise`<`Result`\>

Update

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |
| `match` | `any` |
| `record` | `any` |

#### Returns

`Promise`<`Result`\>

#### Defined in

[utils/Client.ts:120](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L120)

___

### updateMultiple

▸ **updateMultiple**(`updates`): `Promise`<`Result`[]\>

Update Multiple

#### Parameters

| Name | Type |
| :------ | :------ |
| `updates` | { `match`: `any` ; `record`: `any` ; `tableName`: `string`  }[] |

#### Returns

`Promise`<`Result`[]\>

#### Defined in

[utils/Client.ts:223](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L223)

___

### upsert

▸ **upsert**(`tableName`, `records`, `key?`): `Promise`<`Result`\>

Upsert

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tableName` | `string` | `undefined` |
| `records` | `any` | `undefined` |
| `key` | `string` | `'id'` |

#### Returns

`Promise`<`Result`\>

#### Defined in

[utils/Client.ts:141](https://github.com/edmundpf/postgrest-client-ts/blob/f4b1e92/src/utils/Client.ts#L141)
