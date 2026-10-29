import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { asset } from "@/lib/asset";
import { VerifiedName } from "@/components/verified";

export const metadata: Metadata = {
  title: "AERYN GEM MT",
  description: "AERYN GEM MT by PLUCO — graded-card artwork issued on Base.",
};

const CONTRACT = "0xb51639e0489cbd7d5dfb60c552db3ba6ce6e6992";
const COLLECTION = "https://opensea.io/collection/aeryn-gem-mt-10-slab-552734664";

const pieces = [
  {
    id: 1,
    title: "Aeryn #001/200 — Obsidian Black",
    side: "Trainer front",
    image: "/aeryn/1.jpg",
    price: "$0.94",
    held: true,
  },
  {
    id: 2,
    title: "Aeryn #002/200 — Pure White",
    side: "Trainer front",
    image: "/aeryn/2.jpg",
    price: "$0.94",
    held: true,
  },
  {
    id: 3,
    title: "Aeryn #003/200 — Obsidian Black",
    side: "Trainer back",
    image: "/aeryn/3.jpg",
    price: "$0.94",
    held: true,
  },
  {
    id: 5,
    title: "Aeryn #005/200 — Pure White",
    side: "Trainer back",
    image: "/aeryn/5.jpg",
    price: "$0.94",
    held: true,
  },
];

export default function AerynPage() {
  return (
    <main>
      <PageHero
        eyebrow="Live on Base"
        title="AERYN GEM MT"
        body="Graded-card artwork issued on Base by PLUCO. Five pieces exist today, each a single slab with its own grade and print side. Trade happens on OpenSea; PLUCO greys out the secondary market, not the work."
      />

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-px border border-line bg-paper/[.06] sm:grid-cols-3">
          {[
            ["Pieces", "5"],
            ["Edition", "#/200"],
            ["Chain", "Base"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-6 py-6">
              <p className="text-[10px] uppercase tracking-[.25em] text-faint">{k}</p>
              <p className="mt-3 text-2xl font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <h2 className="text-sm uppercase tracking-[.25em] text-body">Pieces</h2>
            <a
              href={COLLECTION}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-sm text-paper"
            >
              View on OpenSea
            </a>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pieces.map((p) => (
              <Reveal key={p.id}>
                <a
                  href={`${COLLECTION}/${p.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group focus-ring block border border-line bg-surface"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                    <Image
                      src={asset(p.image)}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-contain transition duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="border-t border-line px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[.2em] text-faint">{p.side}</p>
                    <p className="mt-2 text-sm leading-5 text-paper">{p.title}</p>
                    <p className="mt-3 text-xs text-body">Listed {p.price}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-line pt-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-semibold">What it is, precisely.</h2>
            <p className="mt-4 text-sm leading-6 text-body">
              Each token is one card. Nothing is fractional, nothing is duplicated, and no piece is
              minted twice. Copies carrying the same face differ by grade and print side, which is
              what the four listed pieces are.
            </p>
          </div>
          <dl className="grid gap-4 text-sm">
            <div className="flex justify-between gap-6 border-b border-line pb-4">
              <dt className="text-faint">Collection</dt>
              <dd>AERYN GEM MT</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-4">
              <dt className="text-faint">Creator</dt>
              <dd><VerifiedName name="PLUCO" /></dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-4">
              <dt className="text-faint">Contract</dt>
              <dd className="font-mono text-xs">
                {CONTRACT.slice(0, 10)}…{CONTRACT.slice(-6)}
              </dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-4">
              <dt className="text-faint">Marketplace</dt>
              <dd>OpenSea</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-faint">Chain</dt>
              <dd>Base · ETH</dd>
            </div>
          </dl>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-3">
          <Button href={COLLECTION} arrow>Open the collection</Button>
          <Button href="/collections" variant="secondary">All collections</Button>
        </div>
      </section>
    </main>
  );
}
