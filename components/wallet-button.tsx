"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wallet, ChevronDown, LogOut, ExternalLink, AlertTriangle } from "lucide-react";
import { useWallet, shortAddress } from "./wallet-provider";
import { cn } from "@/lib/cn";

export function WalletButton({ className = "" }: { className?: string }) {
  const { account, connecting, onBase, switchToBase, disconnect, activeName, clearError } = useWallet();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Signed out: the header button is the entry point to create account / log in.
  if (!account) {
    const cls = cn(
      "focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06]",
      className,
    );

    if (connecting) {
      return (
        <button type="button" disabled className={cls + " opacity-60"}>
          <Wallet size={14} strokeWidth={1.75} />
          Connecting…
        </button>
      );
    }

    return (
      <Link href="/connect" onClick={() => clearError()} className={cls}>
        <Wallet size={14} strokeWidth={1.75} />
        Log in
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06]",
          className,
        )}
      >
        {!onBase && <AlertTriangle size={13} className="text-gold" strokeWidth={2} />}
        <span className="num">{shortAddress(account)}</span>
        <ChevronDown size={13} strokeWidth={1.75} />
      </button>

      {open && (
        <div className="absolute right-0 top-[52px] z-50 w-[248px] border border-line-strong bg-surface p-2 shadow-[0_24px_70px_rgba(0,0,0,.45)]">
          <p className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[.2em] text-faint">
            {activeName || "Wallet"} · {onBase ? "Base" : "Wrong network"}
          </p>
          {!onBase && (
            <button
              type="button"
              onClick={() => switchToBase()}
              className="mb-1 flex w-full items-center gap-2 px-3 py-2.5 text-left text-[12px] text-gold hover:bg-paper/[.06]"
            >
              <AlertTriangle size={13} /> Switch to Base
            </button>
          )}
          <Link
            href="/connect"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-[12px] text-body hover:bg-paper/[.06]"
          >
            <Wallet size={13} /> Account
          </Link>
          <a
            href={"https://basescan.org/address/" + account}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center gap-2 px-3 py-2.5 text-[12px] text-body hover:bg-paper/[.06]"
          >
            <ExternalLink size={13} /> View on BaseScan
          </a>
          <button
            type="button"
            onClick={() => {
              disconnect();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[12px] text-body hover:bg-paper/[.06]"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
