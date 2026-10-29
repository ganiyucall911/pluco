import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Marketplace" };

export default function MarketplacePage() {
  return (
    <main>
      <PageHero
        eyebrow="Marketplace"
        title="One market, every collection."
        body="Listings settle onchain through the PLUCO marketplace on Base. The seller keeps the token until it sells, royalties pay the artist on every resale, and the protocol fee is fixed in the contract."
      />
      <section className="wrap py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[.07] pb-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Digital art", "Photography", "Music", "Generative"].map((f, i) => (
              <span
                key={f}
                className={
                  "rounded-full border px-3.5 py-1.5 text-[12px] " +
                  (i === 0
                    ? "border-white/25 bg-white/[.06] text-[#f4f3f1]"
                    : "border-white/10 text-[#8f8f8f]")
                }
              >
                {f}
              </span>
            ))}
          </div>
          <p className="num text-[12px] text-[#5e5e5e]">0 listings</p>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border border-white/[.07] bg-[#0c0c0c] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Empty</p>
            <h2 className="mt-3 text-[22px]">No listings yet.</h2>
            <p className="mt-2 max-w-[420px] text-[13px] leading-6 text-[#8f8f8f]">
              The marketplace contract is not deployed on Base yet. Once it is, every listing is
              read directly from the chain — no imported or demo data.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/mint">Mint a piece</Button>
            <Button href="/protocol" variant="secondary">
              Protocol status
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
