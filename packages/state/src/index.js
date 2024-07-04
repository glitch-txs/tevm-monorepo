export { ContractCache } from './ContractCache.js'
export { createStateManager } from './createStateManager.js'
export { createBaseState } from './createBaseState.js'
export {
	commit,
	revert,
	deepCopy,
	getProof,
	checkpoint,
	getAccount,
	putAccount,
	clearCaches,
	dumpStorage,
	shallowCopy,
	getStateRoot,
	hasStateRoot,
	setStateRoot,
	deleteAccount,
	getForkClient,
	getAppliedKey,
	getContractCode,
	getForkBlockTag,
	putContractCode,
	dumpStorageRange,
	getContractStorage,
	putContractStorage,
	getAccountAddresses,
	modifyAccountFields,
	clearContractStorage,
	dumpCanonicalGenesis,
	getAccountFromProvider,
	generateCanonicalGenesis,
	originalStorageCache,
} from './actions/index.js'
export { AccountCache, CacheType, StorageCache } from '@ethereumjs/statemanager'
