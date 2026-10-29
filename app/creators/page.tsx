import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Verified } from "@/components/verified";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { asset } from "@/lib/asset";
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
            <article className="border border-line bg-surface">
              <div className="grid md:grid-cols-[380px_1fr]">
                      <div className="flex aspect-square items-center justify-center border-b border-line bg-[#0a0a0a] md:aspect-auto md:min-h-[380px] md:border-b-0 md:border-r">
                      <Image
                        src={asset("/brand/pluco-white.png")}
                        alt="PLUCO creator picture"
                        width={2946}
                        height={1474}
                        className="h-auto w-[64%] max-w-[220px] object-contain"
                      />
                    </div>
                <div className="flex flex-col p-8 sm:p-10">
                  <p className="text-[11px] uppercase tracking-[.28em] text-faint">Creator name</p>
                  <h2 className="mt-4 flex items-center gap-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                    <span className="leading-none">PLUCO</span>
                    <Verified size={26} />
                  </h2>
                  <p className="mt-5 max-w-xl text-[15px] leading-7 text-body">
                    Digital artwork published on Base. Every mint, listing and sale is signed by this
                    name and nothing else — no studio, no alias.
                  </p>
                  <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-line pt-6 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[.2em] text-faint">Network</dt>
                      <dd className="mt-1">Base</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[.2em] text-faint">Settlement</dt>
                      <dd className="mt-1">ETH</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[.2em] text-faint">Standard</dt>
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
                        className="focus-ring inline-flex items-center gap-2 border border-line-strong px-5 py-3 text-[13px] transition hover:border-line-strong"
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
