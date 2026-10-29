import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Art } from "@/components/art";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Creator" };

const LINKS = [
  { label: "OpenSea", href: "https://opensea.io/pluco" },
  { label: "GitHub", href: "https://github.com/ganiyucall911/pluco" },
];

export default function CreatorsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Creator"
        title="PLUCO."
        body="One name, everywhere the work is minted or listed. Nothing else attached to it."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <article className="border border-white/[.09] bg-[#0c0c0c]">
              <div className="grid md:grid-cols-[380px_1fr]">
                <div className="aspect-[4/3] md:aspect-auto">
                  <Art accent="from-white/20 via-[#141414] to-black" label="Creator" />
                </div>
                <div className="flex flex-col p-8 sm:p-10">
                  <p className="text-[11px] uppercase tracking-[.28em] text-[#6E6E6E]">Creator name</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">PLUCO</h2>
                  <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#A6A6A6]">
                    Digital artwork published on Base. Every mint, listing and sale is signed by this
                    name and nothing else — no studio, no alias.
                  </p>
                  <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-white/[.07] pt-6 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[.2em] text-[#6E6E6E]">Network</dt>
                      <dd className="mt-1">Base</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[.2em] text-[#6E6E6E]">Settlement</dt>
                      <dd className="mt-1">ETH</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[.2em] text-[#6E6E6E]">Standard</dt>
                      <dd className="mt-1">ERC-721</dd>
                    </div>
                  </dl>
                  <div className="mt-9 flex flex-wrap gap-3">
                    {LINKS.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-[13px] transition hover:border-white/40"
                      >
                        {l.label}
                        <ArrowUpRight size={14} strokeWidth={1.75} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
