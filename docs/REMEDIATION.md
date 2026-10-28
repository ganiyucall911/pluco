# Remediation log — 2026-10-28

Re-run of the dependency and build remediation plan after the license, README and CI
work. Every item below was checked on a fresh clone; commands are reproducible.

## Findings (new)

| # | Finding | Severity | Where |
| --- | --- | --- | --- |
| 1 | PostCSS XSS via unescaped `</style>` in stringify output (GHSA-qx2v-qp2m-jg93, CVSS 6.1) | high | `next/node_modules/postcss` < 8.5.23 |
| 2 | PostCSS arbitrary file read / path traversal via attacker-controlled `sourceMappingURL` (GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849) | high | same bundled copy |
| 3 | `next` advisory range 9.3.4-canary.0 – 16.3.0-preview.10, because it depends on the vulnerable PostCSS | moderate | direct dependency |
| 4 | CI never fails on vulnerable dependencies; `npm audit` was not part of the pipeline | process gap | `.github/workflows/build.yml` |
| 5 | Build badge on any page is a cached image, so it can show a green run that is no longer current | product gap | new dashboard |

`npm audit` before the change: 2 vulnerabilities (1 moderate, 1 high), fix only available by
moving to `next@16.4.3` (semver-major — no patched 15.x exists because the vulnerable
PostCSS ships inside the Next.js package).

## Remediation applied

1. Upgraded `next` from `^15.2.0` to `16.4.3` (exact pin) and regenerated
   `package-lock.json`. `npm audit` now reports **0 vulnerabilities**.
2. Verified the upgrade end to end: `npx tsc --noEmit` clean, `next build` prerenders all
   routes including the six collection pages, and the new `/dashboard` route renders.
3. Added `npm audit --audit-level=high` to the Build check so a new high-severity advisory
   fails CI instead of landing silently.
4. Added `/dashboard` with a live Build check badge that polls the Actions API every 30s,
   refreshes on tab focus, and shows "unreachable" instead of a stale green.

## Still open (deliberately not changed)

- `npm run lint` calls `next lint`, which was removed in Next.js 16. It is not used by CI,
  but the script should move to ESLint's own CLI (`eslint .`) before anyone runs it.
- The site is still demo-only: no wallet, RPC endpoint or analytics sentinel is present, so
  there is nothing user-facing to harden there yet.
- Repository is private; the public Actions badge and `/dashboard` status API only resolve
  once the repo is public (or when the page is served with an authenticated proxy).

## How to reproduce

```sh
npm ci
npm audit --audit-level=high
npx tsc --noEmit
npm run build
```
