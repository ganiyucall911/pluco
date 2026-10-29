import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProtocolStats } from "@/components/protocol-stats";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Protocol" };

const REGISTRY = process.env.NEXT_PUBLIC_PLUCO_REGISTRY || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_PLUCO_MARKETPLACE || "";
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_PLUCO_CHAIN_ID || 8453);
const EXPLORER = CHAIN_ID === 8453 ? "https://basescan.org" : "https://sepolia.basescan.org";
const NETWORK = CHAIN_ID === 8453 ? "Base" : "Base Sepolia";

const layers = [
  {
    k: "01",
    t: "Registry",
    d: "The open index. Any ERC-721 on Base can register: artist address, category and metadata. The registry holds no art and takes no fee. Delisting is the artist's choice, not a gatekeeper's.",
  },
  {
    k: "02",
    t: "Collections",
    d: "PlucoOriginals is the reference collection: one-of-one tokens, immutable supply, provenance hash and an owner reserve. Any artist can deploy their own or bring an existing contract.",
  },
  {
    k: "03",
    t: "Marketplace",
    d: "Non-custodial settlement. Sellers keep the token and approve the contract. Buyers pay exactly the listed price. Royalties read from EIP-2981 and go to the artist on every resale.",
  },
  {
    k: "04",
    t: "Treasury",
    d: "A 2.5% protocol fee on secondary sales, hard-capped at 5% in the contract. Fees are native ETH on Base, paid to the treasury address on settlement.",
  },
];

const steps = [
  ["Deploy", "Deploy a collection from contracts/art, or point the registry at one you already own."],
  ["Register", "Call register(collection, name, category, metadataURI) from the artist wallet."],
  ["List", "Approve the marketplace for the token, then list(collection, tokenId, price)."],
];

export default function ProtocolPage() {
  return (
    <main>
      <PageHero
        eyebrow="Protocol"
        title="Art is the first thing on the chain, not the product."
        body="PLUCO is being built as a network, and a network is only real when something runs on it. This is the first layer: an open art protocol on Base that anyone can plug into."
      />

      <section className="wrap py-14">
        <ProtocolStats />
        <p className="mt-4 text-[11px] uppercase tracking-[.16em] text-faint">
          Live from {NETWORK}
          {REGISTRY ? "" : " · registry not deployed yet, so counters stay empty"}
        </p>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Architecture</p>
              <h2 className="mt-4 max-w-[560px] text-[28px] leading-[1.12] sm:text-[36px]">
                Four contracts. No gatekeeper.
              </h2>
            </div>
          </div>
          <div className="mt-12 grid gap-px border-y border-line bg-paper/[.06] md:grid-cols-2">
            {layers.map((l) => (
              <article key={l.k} className="bg-ink p-8">
                <span className="num text-[11px] tracking-[.18em] text-faint">{l.k}</span>
                <h3 className="mt-6 text-[19px]">{l.t}</h3>
                <p className="mt-2 max-w-[420px] text-[13px] leading-6 text-mute">{l.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="wrap py-20">
          <p className="eyebrow">For artists</p>
          <h2 className="mt-4 text-[28px] leading-[1.12] sm:text-[36px]">Three calls to come onchain.</h2>
          <div className="mt-12 grid gap-px border-y border-line bg-paper/[.06] md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <div key={t} className="bg-surface p-8">
                <span className="num text-[11px] tracking-[.18em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[19px]">{t}</h3>
                <p className="mt-2 text-[13px] leading-6 text-mute">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20">
          <p className="eyebrow">Deployed addresses</p>
          <h2 className="mt-4 text-[28px] leading-[1.12] sm:text-[36px]">Verify, don&apos;t trust.</h2>
          <div className="mt-10 border-t border-line">
            {[
              { name: "PlucoRegistry", addr: REGISTRY },
              { name: "PlucoMarketplace", addr: MARKETPLACE },
            ].map((c) => (
              <div
                key={c.name}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[220px_1fr] sm:items-center"
              >
                <p className="text-[13px] text-body">{c.name}</p>
                {c.addr ? (
                  <a
                    className="break-all font-mono text-[13px] text-paper underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                    href={EXPLORER + "/address/" + c.addr}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.addr}
                  </a>
                ) : (
                  <p className="font-mono text-[13px] text-faint">Pending deploy</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[620px] text-[13px] leading-6 text-mute">
            PLUCO&apos;s own chain is a later step, and it will settle to Ethereum on the same OP
            Stack spec Base uses. Until it has wallets and liquidity, Base is where the art lives.
          </p>
          <div className="mt-8">
            <Button href="/mint">See the reference collection</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
