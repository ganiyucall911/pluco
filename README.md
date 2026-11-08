# PLUCO — The NFT Ownership Network

[![Build check](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml)
[![Deploy](https://github.com/ganiyucall911/pluco/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/pluco/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Live:** https://ganiyucall911.github.io/pluco/

PLUCO is an open art market on Base: anyone can register a collection, mint a piece or buy one. This repository is the marketing site and product surface built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and Framer Motion, exported as a fully static site.

## Features

- **Light and dark themes** driven by `prefers-color-scheme`, no toggle required and no flash on load
- **Wallet connect** on Base mainnet only (chain 8453): MetaMask through EIP-6963 discovery plus WalletConnect for any other EVM wallet, with account change, network switch to Base and disconnect handling. No other chains are configured
- **Responsive** from 360px to wide desktop, with a single shared content frame across pages
- Editorial pages: collections, creators, marketplace, explore, mint, sell, protocol, verification, dashboard, community, brand, about, contact, legal
- SEO: per-page titles, Open Graph and Twitter metadata, canonical URLs, `sitemap.xml` and `robots.txt`

Wallet actions can deploy collections, mint, register, approve a token, list, reprice, cancel, buy, and withdraw proceeds using real ETH on Base mainnet. The committed `public/config.json` contains empty contract addresses; configure verified deployments before trading is available. Build-time `NEXT_PUBLIC_*` address overrides also apply. No mainnet deployment or transaction is verified by this repository alone.

## Requirements

- Node.js 20 or newer (see `.nvmrc`; CI runs Node 20)
- npm 10 or newer

## Local development

```sh
git clone https://github.com/ganiyucall911/pluco.git
cd pluco
npm ci        # exact versions from package-lock.json
npm run dev   # http://localhost:3000
```

To preview with the same base path as production:

```sh
NEXT_PUBLIC_BASE_PATH=/pluco npm run dev
```

## Build and export

```sh
NEXT_PUBLIC_BASE_PATH=/pluco npm run build   # prerenders every route into ./out
npx serve out                                # serve the export locally
```

The site uses `output: "export"` in `next.config.ts`, so there is no Node server in production and `npm start` is not part of the deploy path. Any static host works: Netlify, Cloudflare Pages, Vercel static, S3, or GitHub Pages.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Static export into `./out` |
| `npm run lint` | Lint |

## Project structure

```
app/          # routes, layout, metadata, sitemap and robots
components/   # navbar, footer, hero, cards, wallet UI, motion helpers
lib/          # data, asset and motion helpers
public/       # static assets
contracts/    # Solidity sources
docs/         # remediation and fee notes
```

## Trading and confirmation

`/sell` provides collection registration, single-token approval, listing, repricing, cancellation and withdrawal controls. `/marketplace` provides purchase and proceeds-withdrawal controls. Each write requires an explicit wallet action. Approvals authorize only the specified token, not all tokens in a collection. Network gas is required even where the platform charges no fee.

Marketplace sale proceeds, royalties and fees are credited to their recipients and require a separate `withdraw()` transaction. Primary mint fees are forwarded immediately; remaining primary proceeds are withdrawn by the collection owner.

Transaction hashes are displayed as submitted; success is reported only after a receipt with successful status. Confirmation timeout means unknown/pending, not a failed transaction: inspect the linked BaseScan transaction before retrying.

Run `node scripts/check-transactions.mjs` for live checks of the transaction boundary against real Base mainnet RPC nodes — real chain id, real mined and reverted receipts, real reverts and real node rejections, no mocks — then `npx tsc --noEmit`, `npm run lint` and `npm run build`. These are read-only and do not move funds; live wallet settlement still needs a funded wallet. Before launch, verify the complete register → mint → approve → list → buy → withdraw flow on an authorized preview and have the contracts independently reviewed. No contract changes or deployment are included in these frontend changes.

## Launching a collection

The site deploys collections itself — no server, no key handling:

1. Open /launch and connect a wallet. It deploys to Base mainnet (chain 8453) only.
2. Set name, symbol, supply, price, per-wallet limit and the mint fee.
3. Sign once. The page shows the address, opens the sale, and prints the config.

The mint page reads addresses from public/config.json at runtime, so a new deployment
only needs that one file updated — no rebuild, no redeploy of the site:

{ "chainId": 8453, "originals": "0x...", "registry": "", "marketplace": "" }

NEXT_PUBLIC_PLUCO_ART_CONTRACT and friends still override it at build time. The launch
page encodes the constructor call itself, so the bytecode comes from
public/contracts/PlucoOriginals.json, written by npm run compile in contracts/art.

### What the contract enforces

- one-of-one tokens, each with its own metadata URI
- price, supply and wallet limit fixed at deploy
- default 7.5% EIP-2981 royalty, owner-changeable and honored by supporting marketplaces
- primary mint fee to treasury, hard-capped at 10%
- owner reserve minting without payment

Verified end to end against a local EVM: deploy, sale gate, exact-price check,
per-wallet limit, fee routing to treasury and the royalty maths.

## Deployment

Merging to `main` deploys automatically: `.github/workflows/deploy.yml` builds the static export and publishes `out/` to the `gh-pages` branch, which GitHub Pages serves.

To deploy by hand: `npm run deploy` (builds, then publishes to `gh-pages`). It needs a `gh` login with push access to the repo.

