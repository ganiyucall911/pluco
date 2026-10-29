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

## Deployment

GitHub Pages serves the `gh-pages` branch at the site root. To publish the current commit:

```sh
npm run deploy
```

That script builds with `NEXT_PUBLIC_BASE_PATH=/pluco`, writes `out/.nojekyll`, and force-syncs `./out` into `gh-pages` with a single commit named after the deployed revision. It is safe to rerun: it exits without committing when nothing changed.

The **Build check** workflow (`.github/workflows/build.yml`) runs `npm ci` and `npm run build` on every push and pull request. It is a required status check on `main`, with strict mode (branch must be up to date) and administrators included, so `main` always builds.

The live site therefore equals the last commit you ran `npm run deploy` on. Automated publishing on merge needs a GitHub token with the `workflow` scope to add a Pages workflow; until then the script is the deploy path.

## Contributing

1. Branch from `main`.
2. Run `npm run build` locally before opening a pull request.
3. Open a pull request; the build check must pass before merging.

## Dependency notes

Next.js is pinned to `16.4.3`; earlier releases bundle a PostCSS version with known XSS and source-map path traversal advisories. Keep `npm audit` free of high-severity findings — see [docs/REMEDIATION.md](docs/REMEDIATION.md).

## License

Released under the [MIT License](LICENSE).
