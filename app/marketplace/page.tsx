import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { LiveListings } from "@/components/live-listings";

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
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Digital art", "Photography", "Music", "Generative"].map((f, i) => (
              <span
                key={f}
                className={
                  "rounded-full border px-3.5 py-1.5 text-[12px] " +
                  (i === 0
                    ? "border-line-strong bg-paper/[.06] text-paper"
                    : "border-line text-mute")
                }
              >
                {f}
              </span>
            ))}
          </div>
          <p className="num text-[12px] text-faint">0 listings</p>
        </div>

        <LiveListings max={24} />

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/mint">Mint a piece</Button>
          <Button href="/protocol" variant="secondary">
            Protocol status
          </Button>
        </div>
      </section>
    </main>
  );
}
