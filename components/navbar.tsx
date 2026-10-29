"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./button";

const links = [
  ["Marketplace", "/marketplace"],
  ["Mint", "/mint"],
  ["Sell", "/sell"],
  ["Protocol", "/protocol"],
  ["About", "/about"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map(([n, h]) => (
            <Link
              className="focus-ring text-[13px] text-[#a6a6a6] transition hover:text-[#f4f3f1]"
              key={h}
              href={h}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/connect" variant="secondary" arrow={false}>
            Connect wallet
          </Button>
        </div>
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
          className="focus-ring rounded-full border border-white/10 p-2 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/[.07] bg-[#0a0a0a] px-6 py-3 md:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {links.map(([n, h]) => (
              <Link
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] text-[#d9d9d9]"
                key={h}
                href={h}
              >
                {n}
              </Link>
            ))}
            <Button href="/connect" className="mt-2" arrow={false}>
              Connect wallet
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
