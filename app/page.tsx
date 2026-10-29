import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { asset } from "@/lib/asset";

const actions = [
  {
    n: "01",
    title: "Mint",
    href: "/mint",
    copy: "Turn a file into a piece anyone can own. Add a price and go.",
  },
  {
    n: "02",
    title: "Browse",
    href: "/marketplace",
    copy: "See what people are selling. Every listing shows the artist and the fee.",
  },
  {
    n: "03",
    title: "Sell",
    href: "/sell",
    copy: "Set a price, approve once, done. You keep the art until it sells.",
  },
];

const steps = [
  ["Connect", "Any wallet works. No signup, no email, no account."],
  ["Pick or list", "Mint something new, or list a piece you already own."],
  ["Get paid", "Sellers are paid onchain the second a sale settles."],
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="grid-noise absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-[18%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#143D31]/40 blur-[130px]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Image
              src={asset("/brand/pluco-mark.png")}
              alt="PLUCO"
              width={1100}
              height={550}
              priority
              className="mx-auto w-full max-w-[560px] brightness-[1.45] saturate-125 drop-shadow-[0_0_70px_rgba(0,255,60,.28)]"
            />
          </Reveal>
          <Reveal>
            <h1 className="mt-10 text-4xl font-semibold leading-[1.02] sm:text-5xl">Mint. Buy. Sell. That's it.</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#9EA6A2]">
              An open art market on Base. Anyone can register a collection, mint a piece or buy one — one wallet, three buttons, no clutter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/mint">Start minting</Button>
              <Button href="/marketplace" variant="secondary">Browse art</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {actions.map((a) => (
            <Reveal key={a.title}>
              <Link
                href={a.href}
                className="focus-ring group flex h-full flex-col rounded-[28px] border border-white/[.08] bg-[#0d0d0d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#78EBC1]/30"
              >
                <span className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">{a.n}</span>
                <h2 className="mt-10 text-2xl font-semibold">{a.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#8d9691]">{a.copy}</p>
                <span className="mt-6 text-sm text-[#78EBC1] transition group-hover:translate-x-1">Open →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[.07] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">Three steps, in that order.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map(([t, c], i) => (
              <div key={t} className="border-t border-white/[.09] pt-5">
                <p className="text-xs uppercase tracking-[.2em] text-[#626a66]">Step {i + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8d9691]">{c}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl rounded-2xl border border-[#78EBC1]/15 bg-[#0e1512] p-5 text-sm leading-6 text-[#a9b3ad]">
            <strong className="text-white">Clear pricing.</strong> Listing and minting are free. PLUCO takes 2.5% of each sale, the artist
            earns a royalty on every resale, and sellers keep the rest. No hidden gas games, no lock-in.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-[#78EBC1]/15 bg-gradient-to-br from-[#0f2a22] via-[#0b1512] to-black px-8 py-16 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1] sm:text-5xl">Open to everyone. Owned by the artists.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#9EA6A2]">
            No gatekeeper, no application form. Register a collection and it is live on the network.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/connect">Connect a wallet</Button>
            <Button href="/protocol" variant="secondary">Read the protocol</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
