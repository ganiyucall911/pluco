import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

const steps = [
  ["Your art stays yours", "List a piece without sending it anywhere. The token stays in your wallet until someone pays."],
  ["One approval", "Approve the marketplace once for the collection, then list any piece in it in two clicks."],
  ["Set your price", "Price in ETH on Base. Buyers pay native ETH — no wrapped tokens. Change it or delist at any time."],
  ["Get paid instantly", "The sale settles onchain: your price, minus the 2.5% fee and any artist royalty, is paid to you directly."],
];

export default function SellPage() {
  return (
    <main>
      <PageHero
        eyebrow="Sell"
        title="List a piece in under a minute."
        body="No custody, no middleman holding your art. List, reprice or cancel whenever you want."
      />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Process</p>
          <h2 className="mt-4 text-[26px] leading-[1.15]">
            Four steps,
            <br />
            no surprises.
          </h2>
          <p className="mt-5 max-w-[320px] text-[13px] leading-6 text-mute">
            Everything settles in native ETH on Base. PLUCO takes 2.5% of a sale; listing and
            cancelling are free.
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
