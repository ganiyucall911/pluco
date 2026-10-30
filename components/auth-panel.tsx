"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Wallet, AlertTriangle } from "lucide-react";
import { useWallet, shortAddress } from "./wallet-provider";
import { cn } from "@/lib/cn";

type Mode = "create" | "login";

const COPY: Record<Mode, string> = {
  create:
    "Your wallet is the account. Connecting creates it — no email, no password, no form.",
  login:
    "Pick the wallet you signed up with. PLUCO reads the address and nothing else.",
};

function seenKey(address: string) {
  return "pluco:known:" + address.toLowerCase();
}

/** Whether this browser has signed in with this address before. */
function isReturning(address: string) {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(seenKey(address)) === "1";
  } catch {
    return false;
  }
}

export function AuthPanel() {
  const {
    account,
    chainId,
    connecting,
    error,
    hasWallet,
    onBase,
    activeName,
    connect,
    disconnect,
    switchToBase,
    clearError,
  } = useWallet();

  const [mode, setMode] = useState<Mode>("create");
  const [justCreated, setJustCreated] = useState(false);

  // After a connection: new address = account created, known address = welcome back.
  useEffect(() => {
    if (!account) {
      setJustCreated(false);
      return;
    }
    const known = isReturning(account);
    setJustCreated(!known);
    try {
      localStorage.setItem(seenKey(account), "1");
    } catch {
      /* storage blocked */
    }
  }, [account]);

  if (account) {
    return (
      <div className="border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow">{justCreated ? "Account created" : "Signed in"}</p>
        <h2 className="mt-4 flex items-center gap-3 text-[26px] leading-[1.15]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-paper/30">
            <Check size={14} strokeWidth={2.4} />
          </span>
          {justCreated ? "Welcome to PLUCO." : "Welcome back."}
        </h2>
        <p className="mt-3 max-w-[42ch] text-[13px] leading-6 text-mute">
          {justCreated
            ? "This wallet now has an account. Mint, list or buy straight away — your collection deploys on your first mint."
            : "Everything tied to this address is where you left it."}
        </p>

        <dl className="mt-7 grid gap-4 border-t border-line pt-6 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-mute">Account</dt>
            <dd className="num">{shortAddress(account)}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-mute">Network</dt>
            <dd className="num">{chainId ?? "—"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-mute">Connection</dt>
            <dd>{activeName || "WalletConnect"}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {!onBase && (
            <button
              type="button"
              onClick={() => switchToBase()}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] font-medium text-gold transition hover:border-gold/50"
            >
              <AlertTriangle size={14} /> Switch to Base
            </button>
          )}
          <a
            href="/mint"
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[13px] font-medium text-ink transition hover:opacity-90"
          >
            Start minting <ArrowRight size={14} />
          </a>
          <a
            href={"https://basescan.org/address/" + account}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-11 items-center rounded-full px-5 text-[13px] text-mute underline-offset-4 hover:text-paper hover:underline"
          >
            View account on BaseScan
          </a>
          <button
            type="button"
            onClick={disconnect}
            className="focus-ring inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-[13px] text-paper transition hover:border-paper/40"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-surface p-8 sm:p-10">
      <div className="grid grid-cols-2 border border-line-strong p-1">
        {(["create", "login"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              clearError();
              setMode(m);
            }}
            aria-pressed={mode === m}
            className={cn(
              "focus-ring h-10 text-[13px] font-medium transition",
              mode === m ? "bg-paper text-ink" : "text-body hover:text-paper",
            )}
          >
            {m === "create" ? "Create account" : "Log in"}
          </button>
        ))}
      </div>

      <h2 className="mt-7 text-[26px] leading-[1.15]">
        {mode === "create" ? "Create your account." : "Log in to your account."}
      </h2>
      <p className="mt-3 max-w-[44ch] text-[13px] leading-6 text-mute">{COPY[mode]}</p>

      <button
        type="button"
        onClick={() => connect()}
        disabled={connecting || !hasWallet}
        className="focus-ring mt-7 flex h-12 w-full items-center gap-3 border border-line-strong px-4 text-left text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06] disabled:opacity-60"
      >
        <Wallet size={15} strokeWidth={1.75} />
        <span className="flex-1">
          {connecting
            ? "Waiting for wallet…"
            : mode === "create"
              ? "Create account with a wallet"
              : "Log in with a wallet"}
        </span>
        <ArrowRight size={14} className="text-faint" />
      </button>

      <p className="mt-4 text-[12px] leading-6 text-faint">
        MetaMask, Rabby, Coinbase Wallet, Phantom, Solflare or any WalletConnect wallet — extension on
        desktop, QR or the wallet app on mobile.
      </p>

      {error && <p className="mt-4 text-[12px] leading-6 text-gold">{error}</p>}

      {!hasWallet && (
        <p className="mt-4 text-[12px] leading-6 text-gold">
          Wallet connection is not configured. Add the Reown project ID to enable it.
        </p>
      )}

      <p className="mt-6 border-t border-line pt-5 text-[12px] leading-6 text-faint">
        No password to reset and no email to verify: the wallet signs, PLUCO only reads the address.
      </p>
    </div>
  );
}
