import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { asset } from "@/lib/asset";

const steps = [
  {
    n: "01",
    title: "Connect",
    copy: "Any wallet works. No account, no email, no permission needed.",
  },
  {
    n: "02",
    title: "Mint or list",
    copy: "Create a piece on Base, or list work you already own with a price in ETH.",
  },
  {
    n: "03",
    title: "Get paid",
    copy: "Sellers are paid onchain the moment a sale settles. Nothing is held back.",
  },
];

const facts = [
  ["Chain", "Base"],
  ["Settlement", "ETH"],
  ["Registry fee", "0"],
  ["Market fee", "2.5%"],
];

const fees = [
  ["Mint a piece", "Free — gas only", "Paid to the network, not to PLUCO"],
  ["Primary sale", "2.5%", "Deducted from the sale, paid in ETH"],
  ["Resale royalty", "Set per collection", "Goes to the artist on every resale"],
];

const reasons = [
  {
    k: "01",
    t: "Cheap to use",
    d: "Transactions on Base cost cents, so listing and selling stays practical for work priced in small amounts.",
  },
  {
    k: "02",
    t: "Settles in ETH",
    d: "Prices, fees and payouts are native ETH. No wrapped token, no platform credit to withdraw.",
  },
  {
    k: "03",
    t: "Standard contracts",
    d: "ERC-721 and EIP-2981 royalties. Any Base-native wallet, indexer or marketplace already reads it.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grain" />
        <div className="wrap relative grid gap-14 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-28">
          <div>
            <Reveal>
              <Image
                src={asset("/brand/pluco-white.png")}
                alt="PLUCO"
                width={1200}
                height={600}
                priority
                className="mb-8 w-full max-w-[300px] invert dark:invert-0 sm:mb-10 sm:max-w-[380px]"
              />
              <p className="eyebrow">Open art protocol · Base</p>
              <h1 className="mt-5 text-[38px] leading-[1.04] sm:text-[54px] lg:text-[60px]">
                A market for art,
                <br />
                open to anyone.
              </h1>
              <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-body">
                PLUCO is a registry and marketplace on Base. Register a collection, mint a piece,
                set a price — or buy one. No gatekeeper, no application, no account.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/mint">Start minting</Button>
                <Button href="/marketplace" variant="secondary">
                  Browse marketplace
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="border border-line bg-surface">
              <p className="border-b border-line px-5 py-4 text-[11px] uppercase tracking-[.2em] text-mute">
                Protocol
              </p>
              <dl>
                {facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-line px-5 py-3.5 last:border-0"
                  >
                    <dt className="text-[13px] text-mute">{k}</dt>
                    <dd className="num text-[13px] text-paper">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[520px] text-[28px] leading-[1.1] sm:text-[34px]">
              Three steps. In this order.
            </h2>
            <p className="max-w-[320px] text-[13px] leading-6 text-mute">
              The product is deliberately small. Everything else lives in the protocol.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-px border-y border-line bg-paper/[.06] sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-ink px-6 py-8">
              <span className="num text-[11px] tracking-[.18em] text-faint">{s.n}</span>
              <h3 className="mt-6 text-[19px]">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-mute">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-16 pb-20 pt-4 lg:grid-cols-[0.8fr_1.2fr] lg:pb-28">
        <Reveal>
          <p className="eyebrow">Economics</p>
          <h2 className="mt-4 text-[28px] leading-[1.1] sm:text-[34px]">
            Clear pricing,
            <br />
            stated up front.
          </h2>
          <p className="mt-5 max-w-[340px] text-[13px] leading-6 text-mute">
            Every fee is native ETH on Base, paid out directly to the treasury address. No platform
            balance, no withdrawal step.
          </p>
          <div className="mt-8">
            <Button href="/protocol" variant="secondary">
              Read the protocol
            </Button>
          </div>
        </Reveal>
        <Reveal>
          <div className="border-t border-line">
            {fees.map(([label, value, note]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[1fr_150px]"
              >
                <div>
                  <p className="text-[14px]">{label}</p>
                  <p className="mt-1 text-[12px] text-faint">{note}</p>
                </div>
                <p className="num text-[14px] text-paper sm:text-right">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="wrap py-20">
          <p className="eyebrow">Why Base</p>
          <h2 className="mt-4 max-w-[560px] text-[28px] leading-[1.12] sm:text-[34px]">
            A network people already use.
          </h2>
          <div className="mt-12 grid gap-px border-y border-line bg-paper/[.06] sm:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.k} className="bg-surface px-6 py-8">
                <span className="num text-[11px] tracking-[.18em] text-faint">{r.k}</span>
                <h3 className="mt-6 text-[17px]">{r.t}</h3>
                <p className="mt-2 text-[13px] leading-6 text-mute">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[26px] leading-[1.15] sm:text-[32px]">
              Open to everyone.
              <br />
              Owned by the artists.
            </h2>
            <p className="mt-3 max-w-[420px] text-[13px] leading-6 text-mute">
              No gatekeeper and no application form. Register a collection and it is live on the
              network.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/connect">Connect wallet</Button>
            <Button href="/mint" variant="secondary">
              Mint a piece
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
