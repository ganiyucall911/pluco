import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Art } from "@/components/art";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { collections } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = collections.find((c) => c.slug === slug);
  return { title: item?.name ?? "Collection" };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const item = collections.find((c) => c.slug === slug);
  if (!item) notFound();

  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-16 pt-48">
        <div className="grid-noise absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#78EBC1]">{item.category}</p>
          <h1 className="mt-6 max-w-4xl text-6xl font-semibold leading-[.88] sm:text-8xl">{item.name}</h1>
          <p className="mt-6 text-sm text-[#9EA6A2]">by {item.creator} · {item.members}</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div className="overflow-hidden rounded-[32px] border border-white/[.08]">
            <div className="aspect-[4/3]"><Art accent={item.accent} label={item.category} /></div>
          </div>
          <div>
            <p className="text-lg leading-8 text-[#aab2ae]">{item.description}</p>
            <dl className="mt-10 grid gap-5 border-t border-white/[.07] pt-8 text-sm">
              <div className="flex justify-between gap-6"><dt className="text-[#6f7873]">Creator</dt><dd>{item.creator}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#6f7873]">Category</dt><dd>{item.category}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#6f7873]">Community</dt><dd>{item.members}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-[#6f7873]">Status</dt><dd>Demo · non-transactional</dd></div>
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/marketplace">View in marketplace</Button>
              <Button href="/collections" variant="secondary">All collections</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Inside" title="What membership unlocks." />
          <div className="grid gap-5 md:grid-cols-3">
            {["Editorial drops", "Holder sessions", "Private community"].map((x, i) => (
              <article key={x} className="min-h-56 rounded-[28px] border border-white/[.08] bg-[#111] p-8">
                <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">0{i + 1}</span>
                <h2 className="mt-20 text-2xl font-semibold">{x}</h2>
                <p className="mt-3 text-sm leading-6 text-[#8d9691]">Demo content module ready for future services and editorial content.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
