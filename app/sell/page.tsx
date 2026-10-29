import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

const steps = [
  ["Your art stays yours", "List a piece without sending it anywhere. The token stays in your wallet until someone pays."],
  ["One approval", "Approve the marketplace once for the collection, then list any piece in it in two clicks."],
  ["Set your price", "Price in ETH on Base. Buyers pay native ETH, no wrapped tokens, no approvals to hold. Change it or delist at any time."],
  ["Get paid instantly", "The sale settles onchain: your price, minus the 2.5% PLUCO fee and any artist royalty, is credited to you to withdraw."],
];

export default function SellPage() {
  return (
    <main>
      <PageHero
        eyebrow="Sell"
        title="List a piece in under a minute."
        body="No custody, no middleman holding your art. List, reprice or cancel whenever you want."
      />
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([t, c], i) => (
              <div key={t} className="rounded-[26px] border border-white/[.08] bg-[#0d0d0d] p-6">
                <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">0{i + 1}</span>
                <h2 className="mt-6 text-xl font-semibold">{t}</h2>
                <p className="mt-2 text-sm leading-6 text-[#8d9691]">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-[26px] border border-[#78EBC1]/15 bg-[#0e1512] p-6">
            <p className="text-sm leading-6 text-[#a9b3ad]">
              Fees: 2.5% to PLUCO on each sale, 0% to list or cancel. Royalties set by the collection are paid to the artist. Everything settles in native ETH on Base.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/marketplace">Go to your listings</Button>
              <Button href="/mint" variant="secondary">Mint something first</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
