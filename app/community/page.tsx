import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { Art } from "@/components/art";
import { SectionTitle } from "@/components/section-title";
import { communities } from "@/lib/data";

export const metadata: Metadata = { title: "Community" };

const stats = [
  { label: "Rooms", value: "03" },
  { label: "Members", value: "Demo" },
  { label: "Gatherings", value: "Demo" },
];

export default function CommunityPage() {
  return (
    <main>
      <PageHero
        eyebrow="Belong"
        title="Rooms worth holding a key to."
        body="A cultural membership built around access, participation and the people who shape digital ownership."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {communities.map((c, i) => (
            <Reveal key={c.name}>
              <article className="flex h-full flex-col rounded-none border border-line bg-[#111] p-8">
                <span className="text-xs uppercase tracking-[.2em] text-paper">0{i + 1}</span>
                <h2 className="mt-16 text-2xl font-semibold">{c.name}</h2>
                <p className="mt-3 text-sm leading-6 text-mute">{c.copy}</p>
                <p className="mt-auto border-t border-line pt-5 text-xs uppercase tracking-[.15em] text-faint">{c.meta}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-line px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <SectionTitle
              eyebrow="Gatherings"
              title="Studio notes, sessions and holder-only rooms."
              body="Community programming sits alongside the collections — conversations, critiques and quiet gatherings rather than hype."
            />
            <Button href="/connect" variant="secondary">Connect wallet</Button>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-none border border-line">
              <div className="aspect-[4/3]"><Art accent="from-paper/30 via-surface-2 to-ink" label="The Emerald Room" /></div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-none border border-line bg-surface p-8">
              <p className="text-4xl font-semibold">{s.value}</p>
              <p className="mt-3 text-xs uppercase tracking-[.2em] text-faint">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
