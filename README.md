# VECTOLITH — The NFT Ownership Network

[![Build check](https://github.com/ganiyucall911/vectolith/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/vectolith/actions/workflows/build.yml)
[![Deploy](https://github.com/ganiyucall911/vectolith/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/vectolith/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Live:** https://ganiyucall911.github.io/vectolith/

VECTOLITH is an open art market on Base: anyone can register a collection, mint a piece or buy one. This repository is the marketing site and product surface built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and Framer Motion, exported as a fully static site.

## Live contracts

Base mainnet, deployed 2026-11-08. Owner, treasury and royalty receiver are
`0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9`.

| Contract | Address |
| --- | --- |
| VectolithRegistry | `0x9218b355bb2e69a0f53e072c697e74e1ad63f9ff` |
| VectolithOriginals | `0x1f49c091da217f73493a5b517f490865dbabe15d` |
| VectolithMarketplace | `0x0bbdc74bd7144a32f29196753fd7727995df8e3c` |

`public/config.json` points at them, so the gallery and marketplace read live chain
state. Every hash from the deploy through the first settlement is in
`contracts/deployments/base.json`.

## Tests

65 Foundry tests across the registry, originals and marketplace contracts:

```bash
cd contracts && forge test
```

They cover registration and impersonation rules, the 7.5% royalty and 2.5% fee split,
non-custodial sale re-checks, pull-payment withdrawals, fee caps, and a fuzz test that
the sale split always sums to the price. CI does not run them yet, see
`docs/contracts-ci.md`.

## Project structure

```
app/                  Next.js routes (App Router): collections, marketplace, mint, launch, dashboard
components/           Shared UI, including the live gallery and listing views
lib/                  Chain config, onchain reads, Reown setup, content data
contracts/            Foundry project: src, test, script, deployments, vendored lib
contracts/tools ->    compile.mjs, deploy*.mjs (solc-js and ethers path for ABI export)
public/               Static assets and config.json (chain id, contract addresses, Reown id)
docs/                 Fees, remediation history, contract CI notes
scripts/              deploy.sh, the Pages publish wrapper
```

Foundry is the canonical way to compile, test and deploy; the node scripts in
`contracts/` remain for ABI export and ethers-based deploys.

## Features

- **Light and dark themes** driven by `prefers-color-scheme`, no toggle required and no flash on load
- **Wallet connect** on Base mainnet only (chain 8453): MetaMask through EIP-6963 discovery plus WalletConnect for any other EVM wallet, with account change, network switch to Base and disconnect handling. No other chains are configured
- **Responsive** from 360px to wide desktop, with a single shared content frame across pages
- Editorial pages: collections, creators, marketplace, explore, mint, sell, protocol, verification, dashboard, community, brand, about, contact, legal
- SEO: per-page titles, Open Graph and Twitter metadata, canonical URLs, `sitemap.xml` and `robots.txt`

Wallet connection is read-only: it reports the address, network and balance. No VECTOLITH contracts are deployed yet, so nothing on this site transfers funds.

## Requirements

- Node.js 20 or newer (see `.nvmrc`; CI runs Node 20)
- npm 10 or newer

## Local development

```sh
git clone https://github.com/ganiyucall911/vectolith.git
cd vectolith
npm ci        # exact versions from package-lock.json
npm run dev   # http://localhost:3000
```

To preview with the same base path as production:

```sh
NEXT_PUBLIC_BASE_PATH=/vectolith npm run dev
```

## Build and export

```sh
NEXT_PUBLIC_BASE_PATH=/vectolith npm run build   # prerenders every route into ./out
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

## Launching a collection

The site deploys collections itself — no server, no key handling:

1. Open /launch and connect a wallet. It deploys to Base mainnet (chain 8453) only.
2. Set name, symbol, supply, price, per-wallet limit and the mint fee.
3. Sign once. The page shows the address, opens the sale, and prints the config.

The mint page reads addresses from public/config.json at runtime, so a new deployment
only needs that one file updated — no rebuild, no redeploy of the site:

{ "chainId": 8453, "originals": "0x...", "registry": "", "marketplace": "" }

NEXT_PUBLIC_VECTOLITH_ART_CONTRACT and friends still override it at build time. The launch
page encodes the constructor call itself, so the bytecode comes from
public/contracts/VectolithOriginals.json, written by npm run compile in contracts.

### What the contract enforces

- one-of-one tokens, each with its own metadata URI
- price, supply and wallet limit fixed at deploy
- 7.5% EIP-2981 royalty on every resale
- primary mint fee to treasury, hard-capped at 10%
- owner reserve minting without payment

Verified end to end against a local EVM: deploy, sale gate, exact-price check,
per-wallet limit, fee routing to treasury and the royalty maths.

## Deployment

Merging to `main` deploys automatically: `.github/workflows/deploy.yml` builds the static export and publishes `out/` to the `gh-pages` branch, which GitHub Pages serves.

To deploy by hand: `npm run deploy` (builds, then publishes to `gh-pages`). It needs a `gh` login with push access to the repo.

