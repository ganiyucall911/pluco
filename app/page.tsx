import Link from "next/link";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { CollectionCard } from "@/components/collection-card";
import { Art } from "@/components/art";
import { Button } from "@/components/button";
import { collections, creators, communities } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionTitle
                eyebrow="Featured"
                title="Collections with a point of view."
                body="Editorial curation comes before speculation. Every collection shown here is demo content."
              />
              <Button href="/collections" variant="secondary">View all collections</Button>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.slice(0, 2).map((item, i) => (
              <Reveal key={item.slug} className={i === 0 ? "lg:col-span-2" : ""}>
                <CollectionCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <SectionTitle
              eyebrow="Creators"
              title="Made by people, not algorithms."
              body="A network built around the artists, studios and sound designers who give digital objects their meaning."
            />
            <Button href="/creators" className="mt-2">Meet the creators</Button>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {creators.map((c) => (
              <Reveal key={c.name}>
                <Link
                  href="/creators"
                  className="focus-ring group flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/[.08] bg-[#111] transition duration-500 hover:-translate-y-1 hover:border-[#78EBC1]/25"
                >
                  <div className="aspect-[16/10]"><Art accent={c.accent} label={c.role.split(" · ")[0]} /></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-[#9EA6A2]">{c.role}</p>
                    <p className="mt-5 text-xs uppercase tracking-[.15em] text-[#6f7873]">{c.works}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionTitle
              eyebrow="Community"
              title="Ownership is only the beginning."
              body="Collections open doors to rooms, conversations and gatherings that exist beyond the marketplace."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {communities.map((c, i) => (
              <Reveal key={c.name}>
                <Link
                  href="/community"
                  className="focus-ring block h-full rounded-[28px] border border-white/[.08] bg-[#0d0d0d] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#78EBC1]/25"
                >
                  <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">0{i + 1}</span>
                  <h3 className="mt-20 text-2xl font-semibold">{c.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#8d9691]">{c.copy}</p>
                  <p className="mt-8 border-t border-white/[.07] pt-4 text-xs uppercase tracking-[.15em] text-[#6f7873]">{c.meta}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-[#78EBC1]/15 bg-gradient-to-br from-[#143D31] via-[#0b1512] to-black px-8 py-20 text-center sm:px-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#78EBC1]">Explore the network</p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[.95] sm:text-6xl">Curated, transparent, integration ready.</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#9EA6A2]">
              A demo interface for the PLUCO ecosystem. No live sales, wallets or chain endpoints are connected.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/marketplace">Open marketplace</Button>
              <Button href="/explore" variant="secondary">Explore PLUCO</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
