import { TradingPanel } from "@/components/trading-panel";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

const steps = [
  ["Your art stays yours", "List a piece without sending it anywhere. The token stays in your wallet until someone pays."],
  ["Token-specific approval", "Approve only the piece you want to sell, then sign a separate listing transaction."],
  ["Set your price", "Price in ETH on Base. Buyers pay native ETH — no wrapped tokens. Change it or delist at any time."],
  ["Withdraw your proceeds", "The sale credits your proceeds onchain after the protocol fee and any artist royalty. Withdraw them to your wallet in a separate transaction."],
];

export default function SellPage() {
  return (
    <main>
      <PageHero
        eyebrow="Sell"
        title="List a piece from your wallet."
        body="No custody, no middleman holding your art. List, reprice or cancel whenever you want."
      />
      <div className="wrap"><TradingPanel selling /></div>
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Process</p>
          <h2 className="mt-4 text-[26px] leading-[1.15]">
            Four steps,
            <br />
            no surprises.
          </h2>
          <p className="mt-5 max-w-[320px] text-[13px] leading-6 text-mute">
            Everything settles in native ETH on Base. The marketplace fee defaults to 2.5% (owner-configurable up to 5%); listing and
            cancelling have no platform fee, but require network gas.
          </p>
          <div className="mt-8">
            <Button href="/marketplace">Go to marketplace</Button>
          </div>
        </div>
        <div className="border-t border-line">
          {steps.map(([t, c], i) => (
            <div key={t} className="grid grid-cols-[48px_1fr] gap-4 border-b border-line py-6">
              <span className="num text-[11px] tracking-[.18em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[16px]">{t}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-mute">{c}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
