"use client";

/**
 * MetaMask multichain (MetaMask Connect) adapter for PLUCO.
 *
 * The multichain SDK talks CAIP-2 scopes and returns CAIP-10 account ids, while
 * the rest of the app speaks plain EIP-1193. This module wraps the SDK in a
 * small EIP-1193 provider so it can be handed to WalletProvider exactly like an
 * injected wallet: extension on desktop, QR / deeplink on mobile.
 */

import type { MultichainCore } from "@metamask/connect-multichain";

export const MM_ID = "metamask-multichain";
export const MM_NAME = "MetaMask (QR / mobile)";

export const BASE_SCOPE = "eip155:8453";
export const BASE_SEPOLIA_SCOPE = "eip155:84532";
/** Base mainnet first: it is what the wallet asks for on connect. */
export const MM_SCOPES = [BASE_SCOPE, BASE_SEPOLIA_SCOPE] as const;

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function rpcFor(chainId: number) {
  const infura = process.env.NEXT_PUBLIC_INFURA_API_KEY;
  if (infura) {
    return chainId === 84532
      ? "https://base-sepolia.infura.io/v3/" + infura
      : "https://base-mainnet.infura.io/v3/" + infura;
  }
  return chainId === 84532 ? "https://sepolia.base.org" : "https://mainnet.base.org";
}

let clientPromise: Promise<MultichainCore> | null = null;

/** Lazily create the SDK client. Browser only: never touch it during SSR. */
export function getMultichainClient(): Promise<MultichainCore> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("MetaMask Connect is browser only."));
  }
  if (!clientPromise) {
    clientPromise = import("@metamask/connect-multichain")
      .then(({ createMultichainClient }) =>
        createMultichainClient({
          dapp: {
            name: "PLUCO",
            url: window.location.origin + BASE_PATH,
            iconUrl: window.location.origin + BASE_PATH + "/brand/pluco-mark.png",
          },
          api: {
            supportedNetworks: {
              [BASE_SCOPE]: rpcFor(8453),
              [BASE_SEPOLIA_SCOPE]: rpcFor(84532),
            },
          },
          analytics: { enabled: false },
        }),
      )
      .catch((err) => {
        clientPromise = null;
        throw err;
      });
  }
  return clientPromise;
}

/** "eip155:8453:0xabc..." -> "0xabc..." */
export function addressFromCaip(caip: string | undefined): string | null {
  if (!caip) return null;
  const parts = caip.split(":");
  const address = parts[parts.length - 1];
  return address && /^0x[0-9a-fA-F]{40}$/.test(address) ? address : null;
}

type Session = { sessionScopes?: Record<string, { accounts?: string[] }> };

/** First address the wallet granted us on any supported scope. */
export function accountsFromSession(session: Session | undefined): string[] {
  if (!session?.sessionScopes) return [];
  const seen: string[] = [];
  for (const scope of MM_SCOPES) {
    for (const caip of session.sessionScopes[scope]?.accounts || []) {
      const address = addressFromCaip(caip);
      if (address && !seen.includes(address)) seen.push(address);
    }
  }
  return seen;
}

export type MMProvider = {
  isMetaMask: true;
  isMetaMaskMultichain: true;
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on: (event: string, handler: (...args: never[]) => void) => void;
  removeListener: (event: string, handler: (...args: never[]) => void) => void;
};

/**
 * EIP-1193 facade over the multichain client. Scope follows the active chain;
 * account methods are answered from the session, everything else is forwarded
 * to wallet_invokeMethod on that chain's scope.
 */
export function createMMProvider(client: MultichainCore): MMProvider {
  let session = undefined as Session | undefined;
  let chainId = 8453;
  const listeners = new Map<string, Set<(...args: never[]) => void>>();

  const emit = (event: string, payload: unknown) => {
    for (const handler of listeners.get(event) || []) (handler as (p: unknown) => void)(payload);
  };

  const loadSession = async () => {
    session = (await client.provider.getSession()) as Session | undefined;
    return session;
  };
  void loadSession().catch(() => undefined);

  client.on("wallet_sessionChanged", (next) => {
    session = next as Session | undefined;
    const accounts = accountsFromSession(session);
    if (!accounts.length) emit("accountsChanged", []);
    else emit("accountsChanged", accounts);
  });

  const provider: MMProvider = {
    isMetaMask: true,
    isMetaMaskMultichain: true,
    request: async ({ method, params }) => {
      switch (method) {
        case "eth_requestAccounts":
        case "eth_accounts": {
          const current = session ?? (await loadSession());
          return accountsFromSession(current);
        }
        case "eth_chainId":
          return "0x" + chainId.toString(16);
        case "net_version":
          return String(chainId);
        case "wallet_switchEthereumChain": {
          const target = Number((params as [{ chainId: string }])[0]?.chainId);
          if (!Number.isFinite(target)) throw new Error("Invalid chain id.");
          const current = session ?? (await loadSession());
          if (!accountsFromSession(current).length) {
            throw Object.assign(new Error("Connect the wallet first."), { code: 4100 });
          }
          chainId = target;
          emit("chainChanged", "0x" + target.toString(16));
          return null;
        }
        case "wallet_revokePermissions":
          await client.disconnect();
          session = undefined;
          emit("accountsChanged", []);
          return null;
        default: {
          // Read-only calls work on either network, so a bad chain never blocks a read.
          const result = await client.provider.invokeMethod({
            scope: (chainId === 84532 ? BASE_SEPOLIA_SCOPE : BASE_SCOPE) as never,
            request: { method, params: params as never } as never,
          } as never);
          return result as unknown;
        }
      }
    },
    on: (event, handler) => {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(handler);
    },
    removeListener: (event, handler) => {
      listeners.get(event)?.delete(handler);
    },
  };

  return provider;
}

export type MMConnection = { provider: MMProvider; accounts: string[] };

/** Prompts the wallet (extension modal, QR code or mobile deeplink). */
export async function connectMetaMaskMultichain(): Promise<MMConnection> {
  const client = await getMultichainClient();
  await client.connect(MM_SCOPES as unknown as never[], []);

  const session = (await client.provider.getSession()) as Session | undefined;
  const accounts = accountsFromSession(session);
  if (!accounts.length) throw new Error("MetaMask returned no account on Base.");

  return { provider: createMMProvider(client), accounts };
}

/** Silent restore: only resolves when the wallet still has a live session. */
export async function restoreMetaMaskMultichain(): Promise<MMConnection | null> {
  try {
    const client = await getMultichainClient();
    const session = (await client.provider.getSession()) as Session | undefined;
    const accounts = accountsFromSession(session);
    if (!accounts.length) return null;
    return { provider: createMMProvider(client), accounts };
  } catch {
    return null;
  }
}

export async function disconnectMetaMaskMultichain() {
  try {
    const client = await getMultichainClient();
    await client.disconnect();
  } catch {
    /* nothing to disconnect */
  }
}
