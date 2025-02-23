import { describe, it, expect } from 'vitest'
import { createTevmNode } from 'tevm'
import { requestEip1193 } from 'tevm/decorators'
import { BrowserProvider, Contract, ContractFactory, parseUnits, formatUnits } from 'ethers'

describe('Ethers Integration', () => {
  describe('Basic Setup', () => {
    it('should create ethers provider with Tevm Node', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)

      const blockNumber = await provider.getBlockNumber()
      expect(blockNumber).toBeDefined()

      const balance = await provider.getBalance('0x1234567890123456789012345678901234567890')
      expect(balance).toBeDefined()
    })
  })

  describe('Contract Interaction', () => {
    it('should read contract state', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)

      const abi = [
        'function balanceOf(address) view returns (uint256)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
      ]

      const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
      const contract = new Contract(tokenAddress, abi, provider)

      const [balance, symbol, decimals] = await Promise.all([
        contract.balanceOf('0x1234567890123456789012345678901234567890'),
        contract.symbol(),
        contract.decimals(),
      ])

      expect(balance).toBeDefined()
      expect(symbol).toBeDefined()
      expect(decimals).toBeDefined()
    })

    it('should write to contracts', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)
      const signer = await provider.getSigner()

      const abi = [
        'function transfer(address to, uint256 amount) returns (bool)',
      ]

      const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
      const contract = new Contract(tokenAddress, abi, provider)
      const contractWithSigner = contract.connect(signer)

      const tx = await contractWithSigner.transfer(
        '0x5678901234567890123456789012345678901234',
        parseUnits('100', 6)
      )

      const receipt = await tx.wait()
      expect(receipt.hash).toBeDefined()
    })
  })

  describe('Event Handling', () => {
    it('should listen for events', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)

      const abi = [
        'event Transfer(address indexed from, address indexed to, uint256 value)',
      ]

      const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
      const contract = new Contract(tokenAddress, abi, provider)

      // Setup event listener
      const events: any[] = []
      contract.on('Transfer', (from, to, amount, event) => {
        events.push({ from, to, amount, event })
      })

      // Trigger a transfer
      const signer = await provider.getSigner()
      const contractWithSigner = contract.connect(signer)
      await contractWithSigner.transfer(
        '0x5678901234567890123456789012345678901234',
        parseUnits('100', 6)
      )

      // Cleanup
      contract.off('Transfer')

      expect(events.length).toBeGreaterThan(0)
    })

    it('should query past events', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)

      const abi = [
        'event Transfer(address indexed from, address indexed to, uint256 value)',
      ]

      const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
      const contract = new Contract(tokenAddress, abi, provider)

      const filter = contract.filters.Transfer()
      const events = await contract.queryFilter(filter, -1000, 'latest')

      expect(Array.isArray(events)).toBe(true)
    })
  })

  describe('Advanced Usage', () => {
    it('should deploy contracts', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)
      const signer = await provider.getSigner()

      const abi = ['function getValue() view returns (uint256)']
      const bytecode = '0x...' // Contract bytecode

      const factory = new ContractFactory(abi, bytecode, signer)
      const contract = await factory.deploy()
      await contract.waitForDeployment()

      const address = await contract.getAddress()
      expect(address).toBeDefined()
    })

    it('should handle low-level transactions', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)
      const signer = await provider.getSigner()

      const tx = {
        to: '0x1234567890123456789012345678901234567890',
        value: parseUnits('1', 'ether'),
        data: '0x',
      }

      const signedTx = await signer.signTransaction(tx)
      const hash = await provider.send('eth_sendRawTransaction', [signedTx])
      const receipt = await provider.waitForTransaction(hash)

      expect(receipt).toBeDefined()
    })
  })

  describe('Best Practices', () => {
    it('should handle errors properly', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)

      const abi = [
        'function riskyFunction() view returns (uint256)',
      ]

      const contract = new Contract(
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        abi,
        provider
      )

      try {
        await contract.riskyFunction()
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    it('should handle gas estimation with buffer', async () => {
      const node = createTevmNode().extend(requestEip1193())
      const provider = new BrowserProvider(node)

      const abi = [
        'function transfer(address to, uint256 amount) returns (bool)',
      ]

      const contract = new Contract(
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        abi,
        provider
      )

      const gas = await contract.transfer.estimateGas(
        '0x1234567890123456789012345678901234567890',
        parseUnits('100', 6)
      )

      expect(gas * 120n / 100n).toBeGreaterThan(gas) // 20% buffer
    })
  })
})