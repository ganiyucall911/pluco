import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Legal" };

const sections = [
  {
    h: "Software, as is",
    p: "PLUCO is software. The contracts and this interface are provided as is, without warranty. You are responsible for the wallets and transactions you sign.",
  },
  {
    h: "Fees",
    p: "A 2.5% protocol fee applies to secondary sales and is hard-capped at 5% in the contract. Minting and listing carry no PLUCO fee. Network gas is paid to Base, not to PLUCO.",
  },
  {
    h: "No custody",
    p: "PLUCO never holds your tokens or your funds. Sellers keep the token until a sale settles, and payments route directly to the seller, the artist and the treasury.",
  },
  {
    h: "Content",
    p: "Artists are responsible for the work they register and for the rights to it. The registry is permissionless; it does not screen or endorse what is listed.",
  },
  {
    h: "Contact",
    p: "Questions, bugs and take-down requests go through the project repository on GitHub.",
  },
];

export default function LegalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="The fine print, plainly."
        body="A short summary of what PLUCO is, what it charges and what it does not do."
      />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.6fr_1.4fr]">
        <div>
          <p className="eyebrow">Terms</p>
          <p className="mt-4 max-w-[260px] text-[13px] leading-6 text-mute">
            Five points. No longer than it needs to be.
          </p>
        </div>
        <div className="border-t border-line">
          {sections.map((s, i) => (
            <div
              key={s.h}
              className="grid grid-cols-[48px_1fr] gap-4 border-b border-line py-6"
            >
              <span className="num text-[11px] tracking-[.18em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-[16px]">{s.h}</h2>
                <p className="mt-1.5 max-w-[560px] text-[13px] leading-6 text-mute">{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
