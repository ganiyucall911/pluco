import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = { title: "Create account or log in" };

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        eyebrow="Account"
        title="Create an account, or log in."
        body="PLUCO has no email and no password. Your wallet address is the account: connecting creates it the first time, and opens it every time after. Nothing is signed, and nothing moves."
      />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <AuthPanel />
        <div className="border-t border-line">
          {[
            ["Your wallet is the login", "MetaMask, Rabby, Coinbase Wallet, or any WalletConnect wallet — including on a phone. One connection, no account form."],
            ["Runs on Base", "The app asks for chain 8453. If Base is missing from the wallet, it offers to add it."],
            ["Stays on this device", "The session is remembered locally until you sign out. PLUCO keeps no password, no email and no profile."],
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
