# PLUCO — The NFT Ownership Network

[![Build check](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ganiyucall911/pluco/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Live demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ganiyucall911.github.io/pluco/)

**Live demo:** https://ganiyucall911.github.io/pluco/

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
npm run build     # static export: prerenders every page into ./out
npx serve out     # serve the exported site locally
```

The project uses `output: "export"` in `next.config.ts`, so `npm start` is not used. Set `NEXT_PUBLIC_BASE_PATH` to serve from a subpath (the demo uses `/pluco`).

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

Every push to `main` and every pull request runs the **Build check** workflow (`.github/workflows/build.yml`): `npm ci` then `npm run build`.

## Contributing

1. Create a branch from `main`.
2. Run `npm run build` locally before opening a pull request.
3. Open a pull request; the build check must pass before merging.

## License

Released under the [MIT License](LICENSE).
