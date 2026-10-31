"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Copy, ExternalLink, LogOut, Mail, Settings2, Wallet, AlertTriangle } from "lucide-react";
import { useWallet, shortAddress } from "./wallet-provider";
import { WalletButtons } from "./wallet-buttons";
import { cn } from "@/lib/cn";

type Mode = "create" | "login";

const COPY: Record<Mode, string> = {
  create:
    "Your wallet is the account, or use an email and a 6-digit code. No password, no form.",
  login:
    "Open the account with the wallet — or the email code — you signed up with.",
};

const CHAINS: Record<number, string> = {
  8453: "Base",
  84532: "Base Sepolia",
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
        namespace,
        email,
        adopt,
        reportError,
        connect,
    emailSignIn,
    manageAccount,
    disconnect,
    switchToBase,
    clearError,
  } = useWallet();

  const [mode, setMode] = useState<Mode>("create");
  const [justCreated, setJustCreated] = useState(false);
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copyAddress() {
    if (!account) return;
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
    } catch {
      /* clipboard blocked */
    }
  }

  if (account) {
    const initials = account.slice(2, 4).toUpperCase();
    const chain = chainId
      ? CHAINS[chainId] || "Chain " + chainId
      : namespace === "solana"
        ? "Solana"
        : namespace === "bip122"
          ? "Bitcoin"
          : "—";
    const explorer =
      namespace === "solana"
        ? "https://solscan.io/account/" + account
        : namespace === "bip122"
          ? "https://mempool.space/address/" + account
          : "https://basescan.org/address/" + account;
    const explorerName = namespace === "solana" ? "Solscan" : namespace === "bip122" ? "mempool.space" : "BaseScan";

    return (
      <div className="border border-line bg-surface p-8 sm:p-10">
        <p className="eyebrow">{justCreated ? "Account created" : "Signed in"}</p>

        <div className="mt-6 flex items-center gap-4">
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong bg-ink text-[15px] font-medium tracking-[0.08em] text-paper"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <h2 className="text-[22px] leading-[1.2]">
              {justCreated ? "Welcome to PLUCO." : "Welcome back."}
            </h2>
            <p className="mt-1 text-[12px] leading-5 text-mute">
              {justCreated
                ? "This address now has an account. Your collection deploys on your first mint."
                : "Everything tied to this address is where you left it."}
            </p>
          </div>
        </div>

        <dl className="mt-7 grid gap-0 border-t border-line text-sm">
          <div className="flex items-center justify-between gap-4 border-b border-line py-4">
            <dt className="text-mute">Address</dt>
            <dd className="flex items-center gap-2">
              <span className="num">{shortAddress(account)}</span>
              <button
                type="button"
                onClick={copyAddress}
                aria-label="Copy address"
                className="focus-ring inline-flex items-center gap-1 border border-line-strong px-2 py-1 text-[11px] text-mute transition hover:border-paper/40 hover:text-paper"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-line py-4">
            <dt className="text-mute">Network</dt>
            <dd className="num">{chain}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-line py-4">
            <dt className="text-mute">{email ? "Email" : "Wallet"}</dt>
            <dd className="truncate">{email || activeName || "WalletConnect"}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {namespace === "eip155" && !onBase && (
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
          <button
            type="button"
            onClick={manageAccount}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] text-paper transition hover:border-paper/40"
          >
            <Settings2 size={14} /> Manage account
          </button>
          <a
            href={explorer}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13px] text-mute underline-offset-4 hover:text-paper hover:underline"
          >
            View on {explorerName} <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={disconnect}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[13px] text-paper transition hover:border-paper/40"
          >
            <LogOut size={14} /> Sign out
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

      <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-faint">
        {mode === "create" ? "Create with a wallet" : "Log in with a wallet"}
      </p>

      <WalletButtons
        className="mt-3"
        disabled={!hasWallet}
        onConnected={(address, ns, label) => adopt(address, ns, label)}
        onError={(message) => reportError(message)}
        onOpenAll={() => void connect()}
      />

      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={emailSignIn}
          disabled={!hasWallet}
          className="focus-ring flex h-12 items-center gap-3 border border-line-strong px-4 text-left text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06] disabled:opacity-60"
        >
          <Mail size={15} strokeWidth={1.75} />
          <span className="flex-1">
            {mode === "create" ? "Continue with email" : "Log in with email"}
          </span>
          <ArrowRight size={14} className="text-faint" />
        </button>
      </div>

      <p className="mt-4 text-[12px] leading-6 text-faint">
        MetaMask signs on Base, Phantom on Solana, Leather on Bitcoin; WalletConnect opens a QR
        or the wallet app for anything else. With email, a 6-digit code is sent to your inbox
        and you type it in the same window.
      </p>

      {error && <p className="mt-4 text-[12px] leading-6 text-gold">{error}</p>}

      {!hasWallet && (
        <p className="mt-4 text-[12px] leading-6 text-gold">
          Wallet connection is not configured. Add the Reown project ID to enable it.
        </p>
      )}

      <p className="mt-6 border-t border-line pt-5 text-[12px] leading-6 text-faint">
        No password to reset: the wallet signs, or the emailed code proves the address. PLUCO only
        reads the address and the email you sign in with.
      </p>
    </div>
  );
}
