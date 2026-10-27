import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation."
        body="For creator onboarding, partnerships and press. This demo has no live inbox or form submission."
      />
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-3xl gap-4">
          {[["General","hello@pluco.demo"],["Creators","creators@pluco.demo"],["Press","press@pluco.demo"]].map(([k, v]) => (
            <div key={k} className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/[.08] bg-[#111] p-7">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">{k}</p>
                <p className="mt-2 text-lg">{v}</p>
              </div>
              <p className="text-xs uppercase tracking-[.15em] text-[#6f7873]">Demo address</p>
            </div>
          ))}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/collections" variant="secondary">Explore collections</Button>
            <Button href="/about" variant="ghost">About PLUCO</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
