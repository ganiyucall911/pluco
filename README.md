# PLUCO — The NFT Ownership Network

[![Build check](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml)
[![Deploy](https://github.com/ganiyucall911/pluco/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/pluco/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Live:** https://ganiyucall911.github.io/pluco/

PLUCO is an open art market on Base: anyone can register a collection, mint a piece or buy one. This repository is the marketing site and product surface built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and Framer Motion, exported as a fully static site.

## Features

- **Light and dark themes** driven by `prefers-color-scheme`, no toggle required and no flash on load
- **Wallet connect** via EIP-6963 multi-wallet discovery on Base mainnet (chain 8453), with account change, network switch and disconnect handling
- **Responsive** from 360px to wide desktop, with a single shared content frame across pages
- Editorial pages: collections, creators, marketplace, explore, mint, sell, protocol, verification, dashboard, community, brand, about, contact, legal
- SEO: per-page titles, Open Graph and Twitter metadata, canonical URLs, `sitemap.xml` and `robots.txt`

Wallet connection is read-only: it reports the address, network and balance. No PLUCO contracts are deployed yet, so nothing on this site transfers funds.

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

## Launching a collection

The site deploys collections itself — no server, no key handling:

1. Open /launch, connect a wallet, pick Base Sepolia first.
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
- 7.5% EIP-2981 royalty on every resale
- primary mint fee to treasury, hard-capped at 10%
- owner reserve minting without payment

Verified end to end against a local EVM: deploy, sale gate, exact-price check,
per-wallet limit, fee routing to treasury and the royalty maths.

## Deployment

Merging to `main` deploys automatically: `.github/workflows/deploy.yml` builds the static export and publishes `out/` to the `gh-pages` branch, which GitHub Pages serves.

To deploy by hand: `npm run deploy` (builds, then publishes to `gh-pages`). It needs a `gh` login with push access to the repo.

