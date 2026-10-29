import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/reveal";
import { Art } from "@/components/art";
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
          <Link href="/collections" className="focus-ring mt-8 inline-block text-sm text-[#FFFFFF] hover:underline">
            All collections
          </Link>
        </div>
      </section>

      <section className="border-t border-white/[.07] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Creators" title="Then the people." />
            <div className="grid gap-4">
              {creators.map((c) => (
                <Link key={c.name} href="/creators" className="focus-ring flex items-center gap-5 rounded-none border border-white/[.08] bg-[#0E0E0E] p-4 transition hover:border-[#FFFFFF]/25">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full"><Art accent={c.accent} /></div>
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="mt-1 text-sm text-[#A6A6A6]">{c.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Community" title="Then the rooms." />
            <div className="grid gap-4">
              {communities.map((c) => (
                <Link key={c.name} href="/community" className="focus-ring block rounded-none border border-white/[.08] bg-[#0E0E0E] p-6 transition hover:border-[#FFFFFF]/25">
                  <p className="font-semibold">{c.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[#8C8C8C]">{c.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
