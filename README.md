# PLUCO — The NFT Ownership Network

[![Build check](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

An NFT-first, editorial website built with Next.js 15, React 19, Tailwind CSS 4 and Framer Motion. It ships demo Collections, Creators, Community, Marketplace, Explore, Brand, About, Contact, Legal and Connect pages. All content is demo data from `lib/data.ts`; there is no wallet or blockchain connection.

## Requirements

- Node.js 20 or newer (tested with Node 20 in CI and Node 22 locally)
- npm 10 or newer

## Install from a fresh clone

```sh
git clone https://github.com/ganiyucall911/pluco.git
cd pluco
npm ci            # installs exact versions from package-lock.json (~15s)
npm run dev       # http://localhost:3000 with hot reload
```

### Production build

```sh
npm run build     # builds and prerenders every page as static HTML
npm start         # serves the build on http://localhost:3000
```

Verified on a fresh clone: `npm ci` finished without errors, `npm run build` prerendered all routes (including 6 collection pages), and `npm start` served `/`, `/collections` and `/marketplace` with HTTP 200 and unknown paths with 404.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run Next.js lint |

## Project structure

```
app/          # routes: home, collections/[slug], creators, marketplace, community,
              # explore, about, connect, brand, contact, legal, not-found
components/   # navbar, footer, hero, cards, motion helpers
lib/          # demo data and motion presets
public/       # static assets
```

## Continuous integration

Every push to `main` and every pull request runs the **Build check** workflow (`.github/workflows/build.yml`): `npm ci`, `npm audit --audit-level=high`, then `npm run build`. The `build` job is a required status check on `main`, with strict mode (the branch must be up to date first) and administrators included.

`/dashboard` shows the latest run with a badge that re-polls the Actions API every 30 seconds, plus a manual refresh.

## Contributing

1. Create a branch from `main`.
2. Run `npm run build` locally before opening a pull request.
3. Open a pull request; the build check must pass before merging.

## Dependency notes

Next.js is pinned to `16.4.3`: earlier releases bundle a PostCSS version with known XSS and source-map path traversal advisories. `npm audit` must stay free of high-severity findings; see [docs/REMEDIATION.md](docs/REMEDIATION.md).

## License

Released under the [MIT License](LICENSE).
