[**tevm**](../../README.md)

***

[tevm](../../modules.md) / [errors](../README.md) / EvmRevertErrorParameters

# Type Alias: EvmRevertErrorParameters

> **EvmRevertErrorParameters**: `object`

Defined in: packages/errors/types/ethereum/ethereumjs/EvmRevertError.d.ts:79

Parameters for constructing a [EvmRevertError](../classes/EvmRevertError.md).

## Type declaration

### cause?

> `optional` **cause**: [`EvmError`](../../evm/classes/EvmError.md)

- The cause of the error. From running ethereumjs EVM.runCall

### details?

> `optional` **details**: `string`

- Details of the error.

### docsBaseUrl?

> `optional` **docsBaseUrl**: `string`

- Base URL for the documentation.

### docsPath?

> `optional` **docsPath**: `string`

- Path to the documentation.

### docsSlug?

> `optional` **docsSlug**: `string`

- Slug for the documentation.

### meta?

> `optional` **meta**: `object`

- Optional object containing additional information about the error.

### metaMessages?

> `optional` **metaMessages**: `string`[]

- Additional meta messages.
