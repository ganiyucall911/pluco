import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";
import { Verified } from "@/components/verified";

export const metadata: Metadata = {
  title: "Verification",
  description: "What PLUCO verifies, and the exact requirements a creator must meet.",
};

const requirements = [
  ["Registered name", "A single creator name, used on every listing and mint. No aliases, no studio suffixes."],
  ["Onchain history", "At least one collection or minted piece on Base, with the contract address disclosed."],
  ["Proven control", "The registering wallet must sign from the address that holds the contract or mint."],
  ["Truthful metadata", "Supply, edition size and the artwork description must match what is onchain."],
  ["No misleading claims", "No unregistered copyright, no claimed affiliation with brands or athletes, no promises of returns."],
  ["Contactable", "A working contact address that answers within seven days."],
];

export default function VerificationPage() {
  return (
    <main>
      <PageHero
        eyebrow="Trust"
        title="Verification, spelled out."
        body="The badge means one thing: the name attached to it controls the contract behind the work, and the claims on the page match the chain. Nothing more is implied."
      />

      <section className="px-5 sm:px-6 pb-16">
        <div className="mx-auto max-w-[1132px] border border-line bg-surface p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-3xl font-semibold">PLUCO</span>
            <Verified size={22} />
            <span className="text-[10px] uppercase tracking-[.22em] text-faint">Verified creator</span>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-body">
            Example of the mark in use. It appears next to the creator name wherever that creator is
            credited — never on its own, never on a page that merely mentions the name.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-20">
        <div className="mx-auto max-w-[1132px]">
          <h2 className="border-b border-line pb-5 text-sm uppercase tracking-[.25em] text-body">
            Requirements
          </h2>
          <ol className="mt-2">
            {requirements.map(([title, body], i) => (
              <li
                key={title}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[60px_1fr_1.4fr] sm:gap-6"
              >
                <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base font-medium">{title}</span>
                <span className="text-sm leading-6 text-body">{body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-line pt-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">What the badge does not mean.</h2>
            <p className="mt-4 text-sm leading-6 text-body">
              It is not an endorsement of price, rarity or investment value. It does not protect a
              buyer from a seller changing a listing, and it is not a guarantee that a collection will
              mint. Verification can be withdrawn if a claim stops being true.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">How to be verified.</h2>
            <p className="mt-4 text-sm leading-6 text-body">
              Register the collection, then send the artist name, the contract address and a signature
              from the controlling wallet. Review is manual and takes one to two days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" arrow>Request verification</Button>
              <Button href="/protocol" variant="secondary">Read the protocol</Button>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-xs text-faint">
          Questions about a specific listing? <Link className="link-underline text-paper" href="/contact">Contact PLUCO</Link>.
        </p>
      </section>
    </main>
  );
}
