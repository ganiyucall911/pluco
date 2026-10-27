import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Connect wallet" };

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        eyebrow="Connect"
        title="Wallet connection is not live."
        body="This is a demo interface. No wallet provider, chain endpoint or signature request is configured, so nothing here can sign or transact."
      />
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-4xl gap-5">
          <Reveal>
            <div className="rounded-[32px] border border-[#78EBC1]/15 bg-[#0b1512] p-8 sm:p-12">
              <h2 className="text-2xl font-semibold">Integration checklist</h2>
              <ul className="mt-6 grid gap-4 text-sm leading-6 text-[#9EA6A2]">
                <li className="flex gap-3"><span className="text-[#78EBC1]">01</span>Add a valid wallet library project ID.</li>
                <li className="flex gap-3"><span className="text-[#78EBC1]">02</span>Configure the supported chain and RPC endpoints.</li>
                <li className="flex gap-3"><span className="text-[#78EBC1]">03</span>Wire session state, then enable transaction flows.</li>
              </ul>
              <p className="mt-8 text-sm text-[#6f7873]">Until then, no connect button on this site will report a success state.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/collections" variant="secondary">Browse collections</Button>
                <Button href="/about" variant="ghost">Read about the demo</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
