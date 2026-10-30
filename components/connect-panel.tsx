"use client";

import { Check, Wallet, AlertTriangle } from "lucide-react";
import { useWallet, shortAddress } from "./wallet-provider";

const INSTALLS = [
  { name: "MetaMask", href: "https://metamask.io/download/" },
  { name: "Rabby", href: "https://rabby.io/" },
  { name: "Coinbase Wallet", href: "https://www.coinbase.com/wallet" },
];

export function ConnectPanel() {
  const {
    account,
    chainId,
    connecting,
    error,
    hasWallet,
    onBase,
    options,
    activeName,
    connect,
    disconnect,
    switchToBase,
  } = useWallet();

  return (
    <div className="border border-line bg-surface p-8 sm:p-10">
      <p className="eyebrow">Status</p>
      <h2 className="mt-4 text-[26px] leading-[1.15]">
        {account ? (onBase ? "Connected to Base." : "Connected, wrong network.") : "No wallet connected."}
      </h2>

      <dl className="mt-7 grid gap-4 border-t border-line pt-6 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-mute">Address</dt>
          <dd className="num">{account ? shortAddress(account) : "—"}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-mute">Chain</dt>
          <dd className="num">{chainId ? chainId : "—"}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-mute">Wallet</dt>
          <dd className="inline-flex items-center gap-2">
            {activeName || (hasWallet ? `${options.filter((o) => o.provider).length} detected` : "Not found")}
          </dd>
        </div>
      </dl>

      <div className="mt-8 grid gap-2">
        {!account &&
          options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => connect(o.id)}
              disabled={connecting}
              className="focus-ring flex h-12 items-center gap-3 border border-line-strong px-4 text-left text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06] disabled:opacity-60"
            >
              {o.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={o.icon} alt="" width={20} height={20} className="rounded-sm" />
              ) : (
                <Wallet size={15} strokeWidth={1.75} />
              )}
              {connecting ? "Waiting for wallet…" : `Connect ${o.name}`}
            </button>
          ))}

        {!account && !options.some((o) => o.provider) && (
          <div className="border border-line p-4">
            <p className="text-[13px] leading-6 text-mute">
              No wallet detected in this browser. On a phone, open this page inside MetaMask, Coinbase Wallet or the
              Base app. On desktop, install one of these and reload:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {INSTALLS.map((w) => (
                <a
                  key={w.name}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring border border-line-strong px-3 py-2 text-[12px] text-paper transition hover:border-paper/40"
                >
                  {w.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {account && (
          <div className="flex flex-wrap gap-3">
            {!onBase && (
              <button
                type="button"
                onClick={() => switchToBase()}
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[13px] font-medium text-ink transition hover:opacity-90"
              >
                <AlertTriangle size={14} /> Switch to Base
              </button>
            )}
            <button
              type="button"
              onClick={disconnect}
              className="focus-ring inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-[13px] text-paper transition hover:border-paper/40"
            >
              Disconnect
            </button>
            <a
              href={`https://basescan.org/address/${account}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex h-11 items-center rounded-full px-5 text-[13px] text-mute underline-offset-4 hover:text-paper hover:underline"
            >
              View on BaseScan
            </a>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-6 flex items-start gap-2 text-[13px] leading-6 text-gold">
          <AlertTriangle size={14} className="mt-1 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
