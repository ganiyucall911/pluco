"use client";

/**
 * Per-wallet connect buttons on top of Reown AppKit's wallet-button SDK.
 *
 * Base mainnet only. MetaMask and any other EVM wallet connect through eip155;
 * WalletConnect opens the QR / deeplink modal for the rest. The AppKit client in
 * lib/reown.ts owns the session and this only asks for one.
 */

import { useCallback, useState } from "react";
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";
import { ArrowRight, Loader2, QrCode, Wallet } from "lucide-react";
import type { Namespace } from "./wallet-provider";

type WalletId = "metamask" | "walletConnect";

type Props = {
  onConnected: (address: string, namespace: Namespace, label: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
  className?: string;
};

const ROWS: { id: WalletId; label: string; namespace: Namespace; hint: string }[] = [
  { id: "metamask", label: "MetaMask", namespace: "eip155", hint: "Base mainnet" },
  { id: "walletConnect", label: "WalletConnect", namespace: "eip155", hint: "QR / any EVM wallet" },
];

function message(e: Error) {
  const raw = e?.message ?? "";
  if (/reject|denied|cancel/i.test(raw)) return "Wallet selection cancelled.";
  return raw || "Could not connect the wallet.";
}

export function WalletButtons({ onConnected, onError, disabled = false, className = "" }: Props) {
  const [pending, setPending] = useState<WalletId | null>(null);

  const settle = useCallback(() => setPending(null), []);

  const evm = useAppKitWallet({
    namespace: "eip155",
    onSuccess: (data) => {
      settle();
      onConnected(data.address, "eip155", "EVM wallet");
    },
    onError: (e) => {
      settle();
      onError(message(e));
    },
  });

  function pick(row: (typeof ROWS)[number]) {
    onError("");
    setPending(row.id);
    evm
      .connect(row.id as never)
      .catch((e: unknown) => {
        setPending(null);
        onError(message(e instanceof Error ? e : new Error("Could not connect the wallet.")));
      });
  }

  return (
    <div className={"grid gap-2 " + className}>
      {ROWS.map((row) => {
        const busy = pending === row.id;
        const Icon = row.id === "walletConnect" ? QrCode : Wallet;
        return (
          <button
            key={row.id}
            type="button"
            onClick={() => pick(row)}
            disabled={disabled || pending !== null}
            className="focus-ring flex h-12 items-center gap-3 border border-line-strong px-4 text-left text-[13px] font-medium text-paper transition hover:border-paper/40 hover:bg-paper/[.06] disabled:opacity-60"
          >
            {busy ? (
              <Loader2 size={15} strokeWidth={1.75} className="animate-spin" />
            ) : (
              <Icon size={15} strokeWidth={1.75} />
            )}
            <span className="flex-1">
              {busy ? "Waiting for " + row.label + "…" : row.label}
            </span>
            <span className="hidden text-[11px] font-normal text-faint sm:block">{row.hint}</span>
            <ArrowRight size={14} className="text-faint" />
          </button>
        );
      })}
    </div>
  );
}
