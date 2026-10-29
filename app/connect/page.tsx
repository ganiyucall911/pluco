import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Connect wallet" };

const checklist = [
  ["Wallet provider", "Add a wallet library project ID (WalletConnect or an injected provider)."],
  ["Chain and RPC", "Point the app at Base mainnet, chain ID 8453."],
  ["Session state", "Persist the connected account across reloads, then enable transactions."],
];

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        eyebrow="Connect"
        title="Wallet connection is not live yet."
        body="This build is the interface and the contracts. No wallet provider or RPC endpoint is configured, so nothing here can sign or transact."
      />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Status</p>
          <h2 className="mt-4 text-[26px] leading-[1.15]">Integration checklist</h2>
          <p className="mt-5 max-w-[300px] text-[13px] leading-6 text-[#8f8f8f]">
            Until all three are in place, no connect button on this site reports a success state.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/marketplace" variant="secondary">
              Browse marketplace
            </Button>
            <Button href="/protocol" variant="ghost">
              Read the protocol
            </Button>
          </div>
        </div>
        <div className="border-t border-white/[.09]">
          {checklist.map(([t, c], i) => (
            <div key={t} className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/[.07] py-6">
              <span className="num text-[11px] tracking-[.18em] text-[#5e5e5e]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[16px]">{t}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-[#8f8f8f]">{c}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
