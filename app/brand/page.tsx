import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Brand" };

const swatches = [
  { name: "Obsidian", value: "#050505" },
  { name: "Emerald", value: "#143D31" },
  { name: "Forest", value: "#245646" },
  { name: "Jade", value: "#78EBC1" },
  { name: "Ivory", value: "#F5F4F2" },
  { name: "Mist", value: "#9EA6A2" },
];

export default function BrandPage() {
  return (
    <main>
      <PageHero
        eyebrow="Brand"
        title="Identity, restrained."
        body="The PLUCO wordmark, palette and type system. Downloadable assets live under /public/brand."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <div className="grid place-items-center rounded-[32px] border border-white/[.08] bg-[#0a0a0a] p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/pluco-logo.svg" alt="PLUCO wordmark" className="w-full max-w-xl" width={420} height={120} />
            </div>
          </Reveal>
          <Reveal>
            <div className="grid h-full grid-cols-2 gap-3">
              {swatches.map((s) => (
                <div key={s.name} className="rounded-2xl border border-white/[.08] p-5">
                  <div className="h-14 w-full rounded-lg" style={{ background: s.value }} />
                  <p className="mt-4 text-sm font-semibold">{s.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[.15em] text-[#6f7873]">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/[.08] bg-[#111] p-8">
            <p className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">Typography</p>
            <p className="mt-8 text-5xl font-semibold">Space Grotesk</p>
            <p className="mt-2 text-sm text-[#9EA6A2]">Headings, tight tracking (-.045em).</p>
            <p className="mt-10 text-3xl">Inter</p>
            <p className="mt-2 text-sm text-[#9EA6A2]">Body, interface and UI labels.</p>
          </div>
          <div className="rounded-[28px] border border-white/[.08] bg-[#111] p-8">
            <p className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">Asset</p>
            <p className="mt-8 text-xl font-semibold">pluco-logo.svg</p>
            <p className="mt-3 text-sm leading-6 text-[#9EA6A2]">
              Official wordmark path: /public/brand/pluco-logo.svg. Replace the file in place to swap artwork while keeping the filename.
            </p>
            <a href="/brand/pluco-logo.svg" download className="focus-ring mt-8 inline-block rounded-full border border-[#78EBC1]/20 bg-white/[.025] px-6 py-3 text-sm font-semibold hover:border-[#78EBC1]/40">
              Download SVG
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
