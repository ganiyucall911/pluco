import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  ["Market", [["Marketplace", "/marketplace"], ["Mint", "/mint"], ["Sell", "/sell"]]],
  ["Protocol", [["Overview", "/protocol"], ["Registry", "/protocol"], ["Fees", "/protocol"]]],
  ["Company", [["About", "/about"], ["Contact", "/contact"], ["Legal", "/legal"]]],
];

export function Footer() {
  return (
    <footer className="border-t border-white/[.07]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-6 max-w-[240px] text-[13px] leading-6 text-[#8f8f8f]">
            An open art protocol on Base. Anyone can register a collection, mint a piece or buy one.
          </p>
        </div>
        {columns.map(([title, items]) => (
          <div key={title as string}>
            <p className="eyebrow mb-5">{title as string}</p>
            <div className="grid gap-3">
              {(items as string[][]).map(([label, href]) => (
                <Link
                  className="text-[13px] text-[#a6a6a6] transition hover:text-[#f4f3f1]"
                  href={href}
                  key={label}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-white/[.07] py-6 text-[11px] uppercase tracking-[.18em] text-[#6e6e6e]">
        <span>© 2026 PLUCO</span>
        <span>Base · Ethereum L2</span>
        <span>Settlement in ETH</span>
      </div>
    </footer>
  );
}
