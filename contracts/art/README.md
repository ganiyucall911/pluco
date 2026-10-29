# PLUCO Art Protocol

Open art protocol for PLUCO, deployed on Base. Art is the first thing to run on the
network, not the whole product: the chain, wallet and indexer come next.

## Contracts (`src/`)

| Contract | Role |
| --- | --- |
| `PlucoRegistry.sol` | Open onchain index of ERC-721 collections. Artist, category, metadata URI, active flag. Holds no art, takes no fee. |
| `PlucoMarketplace.sol` | Non-custodial listings with EIP-2981 royalties and a protocol fee (default 2.5%, hard cap 5%). Pull-payment proceeds. |
| `PlucoOriginals.sol` | Reference collection: 1-of-1 tokens, each with its own metadata URI, immutable supply, provenance hash, owner reserve. |

## Build

```bash
cd contracts/art
npm install
npm run compile        # writes ABI + bytecode to ./artifacts
```

Compiler: solc 0.8.26, evmVersion cancun, optimizer 200 runs.

## Deploy

Base Sepolia (testnet, free ETH from a Base faucet):

```bash
PRIVATE_KEY=0x... node deploy-protocol.mjs --network base-sepolia
```

Base mainnet:

```bash
PRIVATE_KEY=0x... node deploy-protocol.mjs --network base --fee 250
```

Fees are native ETH on Base and go to the treasury, which defaults to
`0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9` in both deploy scripts. Set `TREASURY=0x...`
only to override it.

Then deploy a collection if you want the reference one:

```bash
PRIVATE_KEY=0x... node deploy.mjs --network base --supply 100 --price 0.005 --per-wallet 3
```

The scripts print the addresses to set on the site:
`NEXT_PUBLIC_PLUCO_REGISTRY`, `NEXT_PUBLIC_PLUCO_MARKETPLACE`,
`NEXT_PUBLIC_PLUCO_ART_CONTRACT`, `NEXT_PUBLIC_PLUCO_CHAIN_ID`.

## Why Base and not PLUCO chain yet

PLUCO will be its own OP Stack L2, settling to Ethereum on the same spec Base uses.
Until it has wallets, liquidity and an indexer, art minted there would be invisible.
Base gives distribution today and the contracts are portable to PLUCO later, unchanged.
