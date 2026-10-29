import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Contact" };

const channels = [
  ["Repository", "github.com/ganiyucall911/pluco", "https://github.com/ganiyucall911/pluco"],
  ["Issues", "github.com/ganiyucall911/pluco/issues", "https://github.com/ganiyucall911/pluco/issues"],
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation."
        body="For creator onboarding, partnerships, press and take-down requests. Everything is handled in the open, through the project repository."
      />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-[0.6fr_1.4fr]">
        <div>
          <p className="eyebrow">Channels</p>
          <p className="mt-4 max-w-[280px] text-[13px] leading-6 text-[#8f8f8f]">
            No contact form and no support inbox. Open an issue and it is public from the start.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/protocol" variant="secondary">
              Protocol
            </Button>
            <Button href="/about" variant="ghost">
              About PLUCO
            </Button>
          </div>
        </div>
        <div className="border-t border-white/[.09]">
          {channels.map(([k, v, href]) => (
            <a
              key={k}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[140px_1fr] items-center gap-4 border-b border-white/[.07] py-6"
            >
              <span className="text-[13px] text-[#8f8f8f]">{k}</span>
              <span className="break-all font-mono text-[13px] text-[#f4f3f1] group-hover:underline group-hover:decoration-white/30 group-hover:underline-offset-4">
                {v}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
