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
