import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Art } from "@/components/art";
import { Button } from "@/components/button";
import { creators } from "@/lib/data";

export const metadata: Metadata = { title: "Creators" };

export default function CreatorsPage() {
  return (
    <main>
      <PageHero
        eyebrow="People"
        title="The hands behind the work."
        body="Artists, studios and sound designers building collections with a distinct point of view."
      />
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {creators.map((c) => (
            <Reveal key={c.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-none border border-white/[.08] bg-[#111] transition duration-500 hover:-translate-y-1 hover:border-[#FFFFFF]/25">
                <div className="aspect-[16/11]"><Art accent={c.accent} label={c.role.split(" · ")[0]} /></div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-2xl font-semibold">{c.name}</h2>
                  <p className="mt-2 text-sm text-[#A6A6A6]">{c.role}</p>
                  <p className="mt-auto border-t border-white/[.07] pt-4 text-xs uppercase tracking-[.15em] text-[#6E6E6E]">{c.works}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-7xl rounded-none border border-[#FFFFFF]/15 bg-[#0b1512] p-10 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="text-2xl font-semibold">Creating with PLUCO?</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#A6A6A6]">Creator onboarding is part of the demo experience — no applications or sales are live.</p>
          </div>
          <div className="mt-6 shrink-0 sm:mt-0"><Button href="/contact">Get in touch</Button></div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-sm text-[#6E6E6E]">
          Looking for the full catalogue? <Link className="text-[#FFFFFF] hover:underline" href="/collections">Browse collections</Link>.
        </p>
      </section>
    </main>
  );
}
