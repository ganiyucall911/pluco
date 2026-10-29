# PLUCO Originals — art contracts

1-of-1 digital art on Base: ERC-721, EIP-2981 royalties (7.5%), fixed price and per-wallet limit set at deploy.

## Why not pluco-chain

The standalone chain has no marketplaces, wallets or collectors yet, so art minted there would be invisible. These contracts deploy to Base: Coinbase-backed distribution, cheap gas, native ETH, and a live creator/NFT scene. The same contract can be redeployed to pluco-chain later without changing the artwork or metadata.

## Compile

```bash
npm install
npm run compile   # writes artifacts/PlucoOriginals.json
```

## Deploy

Testnet first (free Base Sepolia ETH from https://portal.cdp.coinbase.com/products/faucet):

```bash
PRIVATE_KEY=0x... node deploy.mjs --network base-sepolia --supply 100 --price 0.005 --per-wallet 3
```

Then mainnet with `--network base`. Price is in ETH, so `--price 0.005` means 0.005 ETH per piece.

Deployer key stays in your shell or a local .env that is gitignored. The deployer receives royalties and withdrawals; move both to a multisig before a real drop.

## After deploying

1. Copy the address into the site: `NEXT_PUBLIC_PLUCO_ART_CONTRACT=0x...` and `NEXT_PUBLIC_PLUCO_CHAIN_ID=8453` in .env.local.
2. Open the sale: `setSaleOpen(true)` from the owner wallet.
3. Pin artwork + metadata to IPFS (Pinata or NFT.Storage) and keep the CIDs.
4. Freeze provenance: `setProvenance("<sha256 of the final artwork bundle>")`.
5. Verify the contract on Basescan so collectors can read it.

Metadata template: `metadata/1.json`. Each token takes its own URI, so every piece stays unique. Token IDs start at 1 and run to maxSupply.

## Security notes

- Reentrancy guarded on mint and withdraw.
- Supply, price and per-wallet limit are immutable; only the sale switch, URIs (owner mint) and royalties are owner-controlled.
- Royalty is capped by OpenZeppelin ERC-2981 at 10%; this collection uses 7.5%.
