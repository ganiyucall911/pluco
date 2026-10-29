# PLUCO Originals — art contracts

Two contracts that together make PLUCO a venue, not just a mint button:

- **PlucoOriginals** (`src/PlucoOriginals.sol`) — the 1-of-1 collection.
- **PlucoMarket** (`src/PlucoMarket.sol`) — the secondary market. Sellers list at a fixed price, buyers pay ETH, EIP-2981 royalties are paid to the artist out of the sale before the seller is settled, and PLUCO takes a 2.5% fee (capped at 10%, owner-adjustable) that funds the platform rather than a third party.

1-of-1 digital art on Base: ERC-721, EIP-2981 royalties (7.5%), fixed price and per-wallet limit set at deploy.

## Why not pluco-chain

The standalone chain has no marketplaces, wallets or collectors yet, so art minted there would be invisible. These contracts deploy to Base: Coinbase-backed distribution, cheap gas, native ETH, and a live creator/NFT scene. The same contract can be redeployed to pluco-chain later without changing the artwork or metadata.

## Compile

```bash
npm install
npm run compile   # writes artifacts/PlucoOriginals.json and artifacts/PlucoMarket.json
```

## Deploy

Testnet first (free Base Sepolia ETH from https://portal.cdp.coinbase.com/products/faucet):

```bash
PRIVATE_KEY=0x... node deploy.mjs --network base-sepolia --supply 100 --price 0.005 --per-wallet 3
```

Then mainnet with `--network base`. Price is in ETH, so `--price 0.005` means 0.005 ETH per piece.

The same script deploys the market right after the collection and prints both addresses.

Deployer key stays in your shell or a local .env that is gitignored. The deployer receives royalties and withdrawals; move both to a multisig before a real drop.

## After deploying

1. Copy both addresses into the site: `NEXT_PUBLIC_PLUCO_ART_CONTRACT=0x...`, `NEXT_PUBLIC_PLUCO_MARKET=0x...` and `NEXT_PUBLIC_PLUCO_CHAIN_ID=8453` in .env.local.
2. Open the sale: `setSaleOpen(true)` from the owner wallet.
3. Pin artwork + metadata to IPFS (Pinata or NFT.Storage) and keep the CIDs.
4. Freeze provenance: `setProvenance("<sha256 of the final artwork bundle>")`.
5. Verify the contract on Basescan so collectors can read it.

Metadata template: `metadata/1.json`. Each token takes its own URI, so every piece stays unique. Token IDs start at 1 and run to maxSupply.

## Security notes

- Reentrancy guarded on mint and withdraw.
- Supply, price and per-wallet limit are immutable; only the sale switch, URIs (owner mint) and royalties are owner-controlled.
- Royalty is capped by OpenZeppelin ERC-2981 at 10%; this collection uses 7.5%.

## Market behaviour

- A listing stores only seller + price. No offers, no auctions, no upgradeability.
- Selling requires approval: `setApprovalForAll(market, true)` or `approve(market, tokenId)`. The site does this for you.
- On purchase the market clears the listing first, then transfers the token, then pays royalty → platform fee → seller. Reentrancy guarded.
- If a collection reports a broken royalty larger than the price, the market drops the royalty instead of reverting the sale.
- The frontend needs no library: reads and writes are hand-encoded in `lib/art.ts`.

## Pages

- `/art` — gallery, reads totalMinted + tokenURI + ownerOf straight from the chain.
- `/art/piece?id=N` — one piece: metadata, owner, listing state, list / cancel / buy.
