import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionTitle } from "@/components/section-title";
import { ProtocolStats } from "@/components/protocol-stats";

export const metadata: Metadata = { title: "Protocol" };

const REGISTRY = process.env.NEXT_PUBLIC_PLUCO_REGISTRY || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_PLUCO_MARKETPLACE || "";
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_PLUCO_CHAIN_ID || 84532);
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
    d: "PlucoOriginals is the reference collection contract: one-of-one tokens, immutable supply, provenance hash, owner reserve. Any artist can deploy their own and register it, or bring an existing contract.",
  },
  {
    k: "03",
    t: "Marketplace",
    d: "Non-custodial settlement. Sellers keep the token and approve the contract. Buyers pay exactly the listed price. Royalties read from EIP-2981 and go to the artist on every resale.",
  },
  {
    k: "04",
    t: "Treasury",
    d: "A 2.5% protocol fee on secondary sales, hard-capped at 5% in the contract. Proceeds are credited then withdrawn, so no receiver can block or re-enter a sale.",
  },
];

const steps = [
  {
    t: "Deploy a collection",
    d: "cd contracts/art && PRIVATE_KEY=... npm run deploy:base-sepolia",
  },
  {
    t: "Register it",
    d: "Call register(collection, name, category, metadataURI) on the registry from the artist wallet that owns it.",
  },
  {
    t: "List a piece",
    d: "approve the marketplace for the token, then list(collection, tokenId, price). Royalties settle automatically on sale.",
  },
];

export default function ProtocolPage() {
  return (
    <main>
      <PageHero
        eyebrow="Protocol"
        title="Art is the first protocol, not the product."
        body="PLUCO is being built as a chain, and a chain is only real when something runs on it. This is the first thing: an open art protocol on Base that anyone can plug into."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <ProtocolStats />
          <p className="mt-4 text-xs text-[#6f7873]">
            Read live from {NETWORK}. {REGISTRY ? "" : "Registry not deployed yet, so counters stay empty."}
          </p>
        </div>
      </section>

      <section className="border-t border-white/[.07] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Architecture" title="Four contracts. No gatekeeper." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {layers.map((l) => (
              <article key={l.k} className="rounded-[28px] border border-white/[.08] bg-[#0d0d0d] p-8">
                <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">{l.k}</span>
                <h3 className="mt-6 text-2xl font-semibold">{l.t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#8d9691]">{l.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[.07] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="For artists" title="Three calls to come onchain." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <article key={s.t} className="rounded-[28px] border border-white/[.08] bg-[#0d0d0d] p-8">
                <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">Step {i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
                <p className="mt-3 break-words font-mono text-xs leading-6 text-[#8d9691]">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[.07] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Deployed addresses" title="Verify, don't trust." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { name: "PlucoRegistry", addr: REGISTRY },
              { name: "PlucoMarketplace", addr: MARKETPLACE },
            ].map((c) => (
              <div key={c.name} className="rounded-[24px] border border-white/[.08] bg-[#0d0d0d] p-6">
                <p className="text-xs uppercase tracking-[.2em] text-[#8d9691]">{c.name}</p>
                {c.addr ? (
                  <a className="mt-3 block break-all font-mono text-sm text-[#78EBC1] hover:underline" href={EXPLORER + "/address/" + c.addr} target="_blank" rel="noreferrer">
                    {c.addr}
                  </a>
                ) : (
                  <p className="mt-3 font-mono text-sm text-[#6f7873]">Not deployed yet</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-[#8d9691]">
            PLUCO&apos;s own chain is a later step, and it will settle to Ethereum on the same OP Stack spec Base uses. Until it has wallets and liquidity, Base is where the art lives, so it is visible on a network people already use.
          </p>
          <Link href="/mint" className="focus-ring mt-8 inline-block text-sm text-[#78EBC1] hover:underline">
            See the reference collection
          </Link>
        </div>
      </section>
    </main>
  );
}
