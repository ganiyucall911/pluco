# PLUCO — The NFT Ownership Network

NFT-first, editorial Next.js website with demo Collections, Creators, Community, Marketplace, Explore, Brand, About, Contact, Legal and Connect experiences.

## Structure

```
pluco/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── globals.css
│   ├── not-found.tsx
│   ├── collections/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── creators/page.tsx
│   ├── marketplace/page.tsx
│   ├── community/page.tsx
│   ├── explore/page.tsx
│   ├── about/page.tsx
│   ├── connect/page.tsx
│   ├── brand/page.tsx
│   ├── contact/page.tsx
│   └── legal/page.tsx
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── logo.tsx
│   ├── hero.tsx
│   ├── page-hero.tsx
│   ├── button.tsx
│   ├── art.tsx
│   ├── collection-card.tsx
│   ├── section-title.tsx
│   ├── reveal.tsx
│   └── motion-provider.tsx
├── lib/
│   ├── data.ts
│   ├── motion.ts
│   └── cn.ts
├── public/
│   └── brand/
│       └── pluco-logo.svg
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

Imports resolve through the `@/*` alias mapped to the project root in `tsconfig.json`
(`@/components/...`, `@/lib/...`).

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Important

- All collection, creator, activity and marketplace content is clearly demo content.
- No fake wallet success states, chain endpoints, sales, or verified network metrics are implemented.
- Replace `/public/brand/pluco-logo.svg` with the supplied official artwork while preserving the file path.
- Connect a recognized wallet library only after adding a valid project ID and supported chain configuration.
