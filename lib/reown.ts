"use client";

/**
 * Reown AppKit (WalletConnect) for PLUCO.
 *
 * One modal for every wallet: the injected extension on desktop, the mobile app by
 * deeplink or QR, and Solana wallets, over a single multichain session.
 *
 * Requires NEXT_PUBLIC_REOWN_PROJECT_ID from https://dashboard.reown.com — the
 * button is hidden when it is missing, so the app keeps working without it.
 */

import { createAppKit } from "@reown/appkit";
import type { AppKit } from "@reown/appkit";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { base, baseSepolia, solana } from "@reown/appkit/networks";

export const REOWN_ID = "reown";
export const REOWN_NAME = "WalletConnect / more wallets";

const PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function reownConfigured() {
  return Boolean(PROJECT_ID);
}

function metadata() {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://ganiyucall911.github.io";
  return {
    name: "PLUCO",
    description: "PLUCO — register, mint and trade digital assets on Base.",
    url: typeof window !== "undefined" ? window.location.href : "https://ganiyucall911.github.io/pluco/",
    icons: [`${origin}${BASE_PATH}/brand/pluco-mark.png`],
  };
}

let modal: AppKit | null = null;

export function getReown(): AppKit | null {
  if (!reownConfigured() || typeof window === "undefined") return null;
  if (!modal) {
    modal = createAppKit({
      adapters: [new EthersAdapter(), new SolanaAdapter()],
      networks: [base, baseSepolia, solana],
      defaultNetwork: base,
      metadata: metadata(),
      projectId: PROJECT_ID,
      themeMode: "dark",
      features: { analytics: false, email: false, socials: false, swaps: false, onramp: false },
    });
  }
  return modal;
}

type Connected = { address: string; provider: unknown };

/** Open the modal and resolve once an EVM account is connected. */
export function connectReown(): Promise<Connected> {
  const appKit = getReown();
  if (!appKit) return Promise.reject(new Error("WalletConnect is not configured."));

  return new Promise<Connected>((resolve, reject) => {
    let unsubscribe: (() => void) | undefined;
    let unsubscribeModal: (() => void) | undefined;
    const done = (fn: () => void) => {
      unsubscribe?.();
      unsubscribeModal?.();
      fn();
    };

    unsubscribe = appKit.subscribeAccount((state) => {
      const address = (state as { address?: string }).address;
      const status = (state as { status?: string }).status;
      if (status === "connected" && address) {
        done(() => resolve({ address, provider: appKit.getWalletProvider() }));
      }
    }, "eip155");

    unsubscribeModal = appKit.subscribeState((state) => {
      const open = (state as { open?: boolean }).open;
      if (open === false) {
        const account = appKit.getAccount("eip155");
        if (!account?.isConnected) done(() => reject(Object.assign(new Error("Closed the wallet modal."), { code: 4001 })));
      }
    });

    appKit.open({ view: "Connect" });
  });
}

/** Pick up a session the modal restored from storage. */
export async function restoreReown(): Promise<Connected | null> {
  const appKit = getReown();
  if (!appKit) return null;
  const account = appKit.getAccount("eip155");
  if (account?.isConnected && account.address) {
    return { address: account.address, provider: appKit.getWalletProvider() };
  }
  return null;
}

export function switchReownNetwork(chainId: number) {
  const appKit = getReown();
  if (!appKit) return Promise.resolve();
  const target = chainId === baseSepolia.id ? baseSepolia : base;
  return appKit.switchNetwork(target, { throwOnFailure: false }).catch(() => undefined);
}

export async function disconnectReown() {
  const appKit = getReown();
  if (!appKit) return;
  try {
    await appKit.disconnect("eip155");
  } catch {
    /* nothing to revoke */
  }
}
