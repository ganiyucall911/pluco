# VECTOLITH Art Protocol

Open art protocol for VECTOLITH, deployed on Base. Art is the first thing to run on the
network, not the whole product: the chain, wallet and indexer come next.

## Contracts (`src/`)

| Contract | Role |
| --- | --- |
| `VectolithRegistry.sol` | Open onchain index of ERC-721 collections. Artist, category, metadata URI, active flag. Holds no art, takes no fee. |
| `VectolithMarketplace.sol` | Non-custodial listings with EIP-2981 royalties and a protocol fee (default 2.5%, hard cap 5%). Pull-payment proceeds. |
| `VectolithOriginals.sol` | Reference collection: 1-of-1 tokens, each with its own metadata URI, immutable supply, provenance hash, owner reserve. |

## Build

```bash
cd contracts
npm install
npm run compile        # writes ABI + bytecode to ./artifacts
```

Compiler: solc 0.8.26, evmVersion cancun, optimizer 200 runs.

## Deploy

Base mainnet only (chain 8453). There is no testnet target in these scripts:

```bash
PRIVATE_KEY=0x... node deploy-protocol.mjs --fee 250
```

Mainnet gas is real ETH. Read the addresses the script prints back, then set them on the
site before minting anything.

Fees are native ETH on Base and go to the treasury, which defaults to
`0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9` in both deploy scripts. Set `TREASURY=0x...`
only to override it.

Then deploy a collection if you want the reference one:

```bash
PRIVATE_KEY=0x... node deploy.mjs --supply 100 --price 0.005 --per-wallet 3
```

The scripts print the addresses to set on the site:
`NEXT_PUBLIC_VECTOLITH_REGISTRY`, `NEXT_PUBLIC_VECTOLITH_MARKETPLACE`,
`NEXT_PUBLIC_VECTOLITH_ART_CONTRACT`, `NEXT_PUBLIC_VECTOLITH_CHAIN_ID`.

## Why Base and not VECTOLITH chain yet

VECTOLITH will be its own OP Stack L2, settling to Ethereum on the same spec Base uses.
Until it has wallets, liquidity and an indexer, art minted there would be invisible.
Base gives distribution today and the contracts are portable to VECTOLITH later, unchanged.
