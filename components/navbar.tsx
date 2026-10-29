"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { WalletButton } from "./wallet-button";

const left = [
  ["Marketplace", "/marketplace"],
  ["Mint", "/mint"],
  ["Sell", "/sell"],
];

const right = [
  ["Protocol", "/protocol"],
  ["About", "/about"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
          <div className="wrap relative flex h-16 items-center md:grid md:grid-cols-[1fr_auto_1fr]">
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {left.map(([n, h]) => (
            <Link
              className="focus-ring text-[13px] text-body transition hover:text-paper"
              key={h}
              href={h}
            >
              {n}
            </Link>
          ))}
        </nav>

            <div className="absolute left-1/2 flex -translate-x-1/2 justify-center md:static md:col-start-2 md:row-start-1 md:translate-x-0">
              <Logo />
            </div>

            <div className="ml-auto flex items-center justify-end gap-7 md:col-start-3 md:row-start-1 md:ml-0 md:gap-7">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Secondary">
            {right.map(([n, h]) => (
              <Link
                className="focus-ring text-[13px] text-body transition hover:text-paper"
                key={h}
                href={h}
              >
                {n}
              </Link>
            ))}
          </nav>
              <div className="hidden md:block">
                <WalletButton />
              </div>
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
            className="focus-ring rounded-full border border-line p-2 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-ink px-6 py-3 md:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {[...left, ...right].map(([n, h]) => (
              <Link
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] text-body"
                key={h}
                href={h}
              >
                {n}
              </Link>
            ))}
                <div className="mt-3">
                  <WalletButton />
                </div>
          </nav>
        </div>
      )}
    </header>
  );
}
