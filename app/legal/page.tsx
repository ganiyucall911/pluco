import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Legal" };

const sections = [
  { h: "Demo interface", p: "This site is a design and engineering demonstration. Collections, creators, communities and activity are illustrative and do not represent real assets." },
  { h: "No financial offering", p: "Nothing on this site constitutes an offer to sell, or a solicitation to buy, any token, NFT or security. No sales occur." },
  { h: "No chain connection", p: "Wallet connection, signatures and onchain reads are not implemented. No transaction can be initiated from this interface." },
  { h: "Intellectual property", p: "PLUCO branding, copy and layout are provided for demonstration purposes. Third-party marks remain the property of their owners." },
  { h: "Contact", p: "Questions about this demo can be directed through the contact page." },
];

export default function LegalPage() {
  return (
    <main>
      <PageHero eyebrow="Legal" title="The fine print, plainly." body="A short summary of what this demo is and is not." />
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-3xl gap-5">
          {sections.map((s, i) => (
            <Reveal key={s.h}>
              <article className="rounded-[24px] border border-white/[.08] bg-[#101010] p-8">
                <p className="text-xs uppercase tracking-[.2em] text-[#78EBC1]">0{i + 1}</p>
                <h2 className="mt-4 text-xl font-semibold">{s.h}</h2>
                <p className="mt-3 text-sm leading-6 text-[#9EA6A2]">{s.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
