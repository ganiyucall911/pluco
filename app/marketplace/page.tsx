import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { pageMeta } from "@/lib/site";
import { TradingPanel } from "@/components/trading-panel";
import { LiveListings } from "@/components/live-listings";

export const metadata = pageMeta({
  title: "Marketplace",
  description:
    "Buy and sell art on the PLUCO marketplace on Base. Royalties pay the artist on every resale.",
  path: "/marketplace",
});

export default function MarketplacePage() {
  return (
    <main>
      <PageHero
        eyebrow="Marketplace"
        title="One market, every collection."
        body="Listings settle onchain through the PLUCO marketplace on Base. The seller keeps the token until it sells, royalties pay the artist on every resale, and the protocol fee is owner-configurable within a 5% contract cap. Proceeds require a separate withdrawal."
      />
      <section className="wrap py-16">
        <p className="text-sm text-mute">Prices are in real ETH on Base. Review the collection, token metadata, price and network gas before buying.</p>
        <LiveListings max={24} />
        <TradingPanel />

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/sell">Sell a piece</Button>
          <Button href="/protocol" variant="secondary">
            Protocol status
          </Button>
        </div>
      </section>
    </main>
  );
}
