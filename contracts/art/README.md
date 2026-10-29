# PLUCO Originals — art contracts

1-of-1 digital art on Polygon: ERC-721, EIP-2981 royalties (7.5%), fixed price and per-wallet limit set at deploy.

## Why not pluco-chain

The standalone chain has no marketplaces, wallets or collectors yet, so art minted there would be invisible. These contracts deploy to Polygon where buyers already are. The same contract can be redeployed to pluco-chain later without changing the artwork or metadata.

## Compile

```bash
npm install
npm run compile   # writes artifacts/PlucoOriginals.json
```

## Deploy

Testnet first (free POL from https://faucet.polygon.technology):

```bash
PRIVATE_KEY=0x... node deploy.mjs --network amoy --supply 100 --price 25 --per-wallet 3
```

Then mainnet with `--network polygon`. Price is in POL, so `--price 25` means 25 POL per piece.

Deployer key stays in your shell or a local .env that is gitignored. The deployer receives royalties and withdrawals; move both to a multisig before a real drop.

## After deploying

1. Copy the address into the site: `NEXT_PUBLIC_PLUCO_ART_CONTRACT=0x...` and `NEXT_PUBLIC_PLUCO_CHAIN_ID=137` in .env.local.
2. Open the sale: `setSaleOpen(true)` from the owner wallet.
3. Pin artwork + metadata to IPFS (Pinata or NFT.Storage) and keep the CIDs.
4. Freeze provenance: `setProvenance("<sha256 of the final artwork bundle>")`.
5. Verify the contract on Polygonscan so collectors can read it.

Metadata template: `metadata/1.json`. Each token takes its own URI, so every piece stays unique. Token IDs start at 1 and run to maxSupply.

## Security notes

- Reentrancy guarded on mint and withdraw.
- Supply, price and per-wallet limit are immutable; only the sale switch, URIs (owner mint) and royalties are owner-controlled.
- Royalty is capped by OpenZeppelin ERC-2981 at 10%; this collection uses 7.5%.
