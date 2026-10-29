import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { ConnectPanel } from "@/components/connect-panel";

export const metadata: Metadata = { title: "Connect wallet" };

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        eyebrow="Connect"
        title="Connect a wallet to Base."
        body="Any Base wallet works. Connecting only asks for your address — it never moves funds and never signs a transaction. Minting and buying ask separately, per action, in your wallet."
      />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <ConnectPanel />
        <div className="border-t border-line">
          {[
            ["Injected wallets", "MetaMask, Rabby, Coinbase Wallet and anything else that exposes a browser provider."],
            ["Base network", "The app asks for chain 8453. If the network is missing, the wallet is offered to add it."],
            ["Session", "The connection is remembered on this device until you disconnect from the menu."],
          ].map(([t, c], i) => (
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/mint" variant="secondary">
              Mint a piece
            </Button>
            <Button href="/protocol" variant="ghost">
              Read the protocol
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
