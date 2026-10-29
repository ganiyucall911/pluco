import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CollectionCard } from "@/components/collection-card";
import { collections } from "@/lib/data";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Discover"
        title="Curated collections, considered."
        body="A directory of editorial collections across art, photography, fashion, music and membership. All content is demo content."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <article className="flex h-full flex-col border border-dashed border-white/20 bg-transparent p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[.28em] text-[#6E6E6E]">In preparation</p>
                  <h3 className="mt-4 text-2xl font-semibold">Next collection</h3>
                  <p className="mt-2 text-sm text-[#A6A6A6]">by PLUCO</p>
                </div>
                <span className="border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[.2em] text-[#A6A6A6]">
                  Not minted
                </span>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#A6A6A6]">
                Not onchain yet. Nothing is for sale and no supply is promised until it is listed here.
              </p>
              <p className="mt-auto border-t border-white/[.07] pt-4 text-xs uppercase tracking-[.15em] text-[#6E6E6E]">
                Base · ETH
              </p>
            </article>
          </Reveal>
          {collections.map((item) => (
            <Reveal key={item.slug}>
              <CollectionCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
