"use client";

/**
 * Reown AppKit (WalletConnect) for VECTOLITH.
 *
 * Base mainnet only. One modal for every EVM wallet: the injected extension on
 * desktop, the mobile app by deeplink or QR. No other chains are configured, so a
 * wallet that is pointed elsewhere is asked to switch to Base (chain 8453).
 *
 * Requires NEXT_PUBLIC_REOWN_PROJECT_ID from https://dashboard.reown.com — the
 * button is hidden when it is missing, so the app keeps working without it.
 */

import { createAppKit } from "@reown/appkit";
import type { AppKit } from "@reown/appkit";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { base } from "@reown/appkit/networks";
import { ChainController, RouterController } from "@reown/appkit-controllers";

export const REOWN_ID = "reown";
export const REOWN_NAME = "WalletConnect / more wallets";

let projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "";

/**
 * Let the project id arrive at runtime from public/config.json. A Reown project id
 * is public by design (it ships in the client bundle), so this keeps the deployed
 * site configurable without a rebuild or a build-time secret.
 */
export function setReownProjectId(id: string | undefined | null) {
  if (id && !projectId) projectId = id;
}
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function reownConfigured() {
  return Boolean(projectId);
}

function metadata() {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://ganiyucall911.github.io";
  return {
    name: "VECTOLITH",
    description: "VECTOLITH — register, mint and trade digital assets on Base.",
    url: typeof window !== "undefined" ? window.location.href : "https://ganiyucall911.github.io/vectolith/",
    icons: [`${origin}${BASE_PATH}/brand/vectolith-mark.png`],
  };
}

    let modal: AppKit | null = null;

export function getReown(): AppKit | null {
  if (!reownConfigured() || typeof window === "undefined") return null;
  if (!modal) {
    modal = createAppKit({
          adapters: [new EthersAdapter()],
          networks: [base],
      defaultNetwork: base,
      metadata: metadata(),
          projectId,
          allWallets: "SHOW",
          themeMode: "dark",
              features: {
                analytics: false,
                email: true,
                emailShowWallets: true,
                socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
                swaps: false,
                onramp: false,
              },
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

/** Base is the only chain VECTOLITH supports, so this always targets mainnet. */
export function switchReownNetwork(_chainId?: number) {
  const appKit = getReown();
  if (!appKit) return Promise.resolve();
  return appKit.switchNetwork(base, { throwOnFailure: false }).catch(() => undefined);
}

/** Open AppKit on its account view (send, receive, network, disconnect). */
export function openAccountView() {
  const appKit = getReown();
  if (!appKit) return;
  appKit.open({ view: "Account" }).catch(() => undefined);
}

/**
 * Open AppKit straight on the email form: the user types an address, AppKit mails a
 * 6-digit code and shows its own code-entry step. Falls back to the normal connect
 * view if the email view is unavailable.
 */
export function openEmailLogin() {
  const appKit = getReown();
  if (!appKit) return;
  try {
    RouterController.push("EmailLogin");
  } catch {
    /* fall through to the connect view */
  }
  appKit.open().catch(() => undefined);
}

/** The email an email-login account was created with, if any. */
export function getEmail(): string | null {
  try {
    const user = (ChainController.state as unknown as { user?: { email?: string | null } }).user;
    return user?.email ?? null;
  } catch {
    return null;
  }
}

export type ReownNamespace = "eip155";

export async function disconnectReown(namespace: ReownNamespace = "eip155") {
  const appKit = getReown();
  if (!appKit) return;
  try {
    await appKit.disconnect(namespace);
  } catch {
    /* nothing to revoke */
  }
}

/** Pick up a session AppKit restored from storage. */
export function restoreAnyReown(): { address: string; namespace: ReownNamespace } | null {
  const appKit = getReown();
  if (!appKit) return null;
  const account = appKit.getAccount("eip155");
  if (account?.isConnected && account.address) {
    return { address: account.address, namespace: "eip155" };
  }
  return null;
}
