import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "About" };

const principles = [
  { title: "Curation first", body: "Editorial judgement comes before speculation. Collections are presented with context, not price pressure." },
  { title: "Ownership clearly stated", body: "No fake wallet states, chain endpoints or invented sales. What is demo stays labelled as demo." },
  { title: "Culture over volume", body: "The network is built around creators and communities, not transaction throughput." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Where digital ownership becomes culture."
        body="PLUCO is a concept interface for an NFT ownership network — designed around curation, creators and community rather than churn."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title}>
              <article className="h-full rounded-[28px] border border-white/[.08] bg-[#111] p-8">
                <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">0{i + 1}</span>
                <h2 className="mt-16 text-2xl font-semibold">{p.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#8d9691]">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-white/[.07] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr]">
          <Reveal>
            <SectionTitle
              eyebrow="Status"
              title="A demo interface, integration ready."
              body="Wallet connection, onchain reads and marketplace transactions are intentionally not implemented. The interface is structured so those services can be added behind a real provider."
            />
            <Button href="/brand" variant="secondary">Brand assets</Button>
          </Reveal>
          <Reveal>
            <dl className="grid gap-5 rounded-[28px] border border-white/[.08] bg-[#0d0d0d] p-8 text-sm">
              {[["Product","PLUCO"],["Version","1.0 demo"],["Chain integration","Not connected"],["Transactions","Disabled"],["Content","Demo only"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-white/[.06] pb-4 last:border-0 last:pb-0">
                  <dt className="text-[#6f7873]">{k}</dt><dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
