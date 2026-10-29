import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  ["Market", [["Marketplace", "/marketplace"], ["Mint", "/mint"], ["Sell", "/sell"]]],
  ["Protocol", [["Overview", "/protocol"], ["Registry", "/protocol"], ["Fees", "/protocol"]]],
  ["Company", [["About", "/about"], ["Verification", "/verification"], ["Contact", "/contact"], ["Legal", "/legal"]]],
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col items-center gap-6 pt-16 pb-12 text-center">
        <Logo />
        <p className="max-w-[300px] text-[13px] leading-6 text-mute">
          An open art protocol on Base. Anyone can register a collection, mint a piece or buy one.
        </p>
      </div>

      <div className="wrap grid justify-items-center gap-10 pb-14 text-center sm:grid-cols-3 sm:justify-items-start sm:text-left">
        {columns.map(([title, items]) => (
          <div key={title as string} className="flex flex-col items-center sm:items-start">
            <p className="eyebrow mb-4">{title as string}</p>
            <div className="grid gap-3 justify-items-center sm:justify-items-start">
              {(items as string[][]).map(([label, href]) => (
                <Link
                  className="text-[13px] text-body transition hover:text-paper"
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

      <div className="wrap flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line py-6 text-[11px] uppercase tracking-[.18em] text-faint">
        <span>© 2026 PLUCO</span>
        <span>Base · Ethereum L2</span>
        <span>Settlement in ETH</span>
      </div>
    </footer>
  );
}
