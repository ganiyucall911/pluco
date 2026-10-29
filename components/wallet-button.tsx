"use client";

import { useEffect, useRef, useState } from "react";
import { Wallet, ChevronDown, LogOut, ExternalLink, AlertTriangle, X } from "lucide-react";
import { useWallet, shortAddress } from "./wallet-provider";
import { cn } from "@/lib/cn";

const INSTALLS = [
  { name: "MetaMask", href: "https://metamask.io/download/" },
  { name: "Rabby", href: "https://rabby.io/" },
  { name: "Coinbase Wallet", href: "https://www.coinbase.com/wallet" },
];

export function WalletButton({ className = "" }: { className?: string }) {
  const { account, connecting, error, connect, disconnect, onBase, switchToBase, options, activeName, clearError } =
    useWallet();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!account) {
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => {
            clearError();
            if (options.length === 1) {
              connect(options[0].id);
            } else {
              setOpen(!open);
            }
          }}
          disabled={connecting}
          className={cn(
            "focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06] disabled:opacity-60",
            className,
          )}
        >
          <Wallet size={14} strokeWidth={1.75} />
          {connecting ? "Connecting…" : "Connect wallet"}
        </button>

        {open && (
          <div className="absolute right-0 top-[52px] z-50 w-[268px] border border-line-strong bg-surface p-2 shadow-[0_24px_70px_rgba(0,0,0,.45)]">
            <div className="flex items-center justify-between px-2 pb-2">
              <p className="text-[10px] uppercase tracking-[.2em] text-faint">
                {options.length ? "Choose a wallet" : "No wallet found"}
              </p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-faint hover:text-paper">
                <X size={13} />
              </button>
            </div>

            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  connect(o.id);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-[13px] text-body hover:bg-paper/[.06]"
              >
                {o.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={o.icon} alt="" width={20} height={20} className="rounded-sm" />
                ) : (
                  <Wallet size={16} />
                )}
                {o.name}
              </button>
            ))}

            {!options.length && (
              <div className="px-3 pb-1">
                <p className="text-[12px] leading-5 text-mute">
                  Install one of these, then reload — or open this page inside your wallet&apos;s own browser on a phone.
                </p>
                <div className="mt-2 grid gap-1">
                  {INSTALLS.map((w) => (
                    <a
                      key={w.name}
                      href={w.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-1 py-2 text-[12px] text-paper hover:underline"
                    >
                      {w.name}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="mt-1 border-t border-line px-3 pt-2 text-[11px] leading-5 text-gold">{error}</p>}
          </div>
        )}
      </div>
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
          <a
            href={`https://basescan.org/address/${account}`}
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
            <LogOut size={13} /> Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
