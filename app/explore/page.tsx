import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { CollectionCard } from "@/components/collection-card";
import { collections, creators, communities } from "@/lib/data";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  return (
    <main>
      <PageHero
        eyebrow="Explore"
        title="A network, not a feed."
        body="Start with collections, meet the creators behind them, then find the room that fits."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Collections" title="Begin with the work." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.slice(0, 3).map((item) => (
              <Reveal key={item.slug}><CollectionCard item={item} /></Reveal>
            ))}
          </div>
          <Link href="/collections" className="focus-ring mt-8 inline-block text-sm text-paper hover:underline">
            All collections
          </Link>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Creators" title="Then the people." />
            <div className="grid gap-4">
              {creators.map((c) => (
                <Link key={c.name} href="/creators" className="focus-ring flex items-center gap-5 rounded-none border border-line bg-surface p-4 transition hover:border-paper/25">
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-ink p-2"><Image src={asset("/brand/pluco-white.png")} alt="PLUCO" width={2946} height={1474} className="h-auto w-full object-contain" /></div>
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="mt-1 text-sm text-body">{c.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Community" title="Then the rooms." />
            <div className="grid gap-4">
              {communities.map((c) => (
                <Link key={c.name} href="/community" className="focus-ring block rounded-none border border-line bg-surface p-6 transition hover:border-paper/25">
                  <p className="font-semibold">{c.name}</p>
                  <p className="mt-2 text-sm leading-6 text-mute">{c.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
