import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "About" };

const principles = [
  {
    t: "Open by default",
    d: "Anyone can register a collection, mint a piece or buy one. No application, no allowlist, no account. The registry has no owner gate on who may enter.",
  },
  {
    t: "Ownership is explicit",
    d: "Sellers keep the token until it sells. Royalties read from EIP-2981. Every fee is stated before you sign, not discovered afterwards.",
  },
  {
    t: "Built to be read",
    d: "The contracts are small, documented and verifiable on Basescan. If you cannot inspect it, you should not trust it.",
  },
];

const facts = [
  ["Chain", "Base mainnet"],
  ["Settlement", "Native ETH"],
  ["Contracts", "Written, deployment pending"],
  ["Protocol fee", "2.5%, capped at 5%"],
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="An open market for art on Base."
        body="PLUCO is a registry and a marketplace, not a mint page. Art is the first thing the network carries; the protocol is what stays."
      />

      <section className="wrap py-16">
        <div className="grid gap-px border-y border-line bg-paper/[.06] md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p.t} className="bg-ink p-8">
              <span className="num text-[11px] tracking-[.18em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-[19px]">{p.t}</h2>
              <p className="mt-2 text-[13px] leading-6 text-mute">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="wrap grid gap-14 py-20 lg:grid-cols-[1fr_.9fr]">
          <Reveal>
            <p className="eyebrow">Status</p>
            <h2 className="mt-4 max-w-[440px] text-[28px] leading-[1.12] sm:text-[34px]">
              Contracts written. Deployment next.
            </h2>
            <p className="mt-5 max-w-[420px] text-[13px] leading-6 text-mute">
              The registry, marketplace and reference collection are compiled and tested on a local
              chain. What remains is a deploy to Base and a wallet to sign it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/protocol">Read the protocol</Button>
              <Button href="/mint" variant="secondary">
                Reference collection
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <dl className="border-t border-line">
              {facts.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                >
                  <dt className="text-[13px] text-mute">{k}</dt>
                  <dd className="num text-right text-[13px] text-paper">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
