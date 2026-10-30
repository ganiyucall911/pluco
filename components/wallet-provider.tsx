"use client";

/**
 * Wallet state for PLUCO.
 *
 * Every wallet connection goes through Reown AppKit (WalletConnect): the browser
 * extension on desktop, the mobile app by QR or deeplink, and Solana wallets, all
 * behind one modal. There is no separate injected or MetaMask-only path.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  REOWN_ID,
  REOWN_NAME,
  connectReown,
  disconnectReown,
  getEmail,
  openAccountView,
  openEmailLogin,
  reownConfigured,
  restoreReown,
  switchReownNetwork,
} from "@/lib/reown";

export const BASE_CHAIN_ID = 8453;
export const BASE_CHAIN_HEX = "0x2105";
export const BASE_SEPOLIA_CHAIN_ID = 84532;

type Eth = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (event: string, handler: (...args: never[]) => void) => void;
  removeListener?: (event: string, handler: (...args: never[]) => void) => void;
};

export type WalletOption = {
  id: string;
  name: string;
  icon?: string;
};

type WalletState = {
  account: string | null;
  provider: Eth | null;
  chainId: number | null;
  connecting: boolean;
  error: string | null;
  /** True when AppKit is configured and can be opened. */
  hasWallet: boolean;
  onBase: boolean;
  options: WalletOption[];
  activeName: string | null;
  /** Address of an email-login account, when the user signed in with a code. */
  email: string | null;
  connect: (id?: string) => Promise<void>;
  emailSignIn: () => void;
  manageAccount: () => void;
  disconnect: () => void;
  switchToBase: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  clearError: () => void;
};

const WalletContext = createContext<WalletState | null>(null);
const STORAGE_KEY = "pluco.wallet";
const NAME_KEY = "pluco.wallet.name";

/** AppKit is the only wallet path, so it is the only option. */
const OPTIONS: WalletOption[] = [{ id: REOWN_ID, name: REOWN_NAME }];

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<Eth | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const attach = useCallback((eth: Eth) => {
    setProvider(eth);

    const onAccounts = (accounts: string[]) => {
      setAccount(accounts && accounts.length ? accounts[0] : null);
      if (!accounts || !accounts.length) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(NAME_KEY);
      }
    };
    const onChain = (id: string) => setChainId(parseInt(id, 16));

    eth.on?.("accountsChanged", onAccounts as never);
    eth.on?.("chainChanged", onChain as never);
    return () => {
      eth.removeListener?.("accountsChanged", onAccounts as never);
      eth.removeListener?.("chainChanged", onChain as never);
    };
  }, []);

  const readChain = useCallback(async (eth: Eth) => {
    try {
      const id = (await eth.request({ method: "eth_chainId" })) as string;
      setChainId(parseInt(id, 16));
    } catch {
      /* ignore */
    }
  }, []);

  // AppKit restores its own WalletConnect session on reload.
  useEffect(() => {
    if (typeof window === "undefined" || !reownConfigured()) return;
    if (localStorage.getItem(NAME_KEY) !== REOWN_NAME) return;
    let cancelled = false;
    restoreReown().then((res) => {
      if (cancelled || !res) return;
      const eth = res.provider as unknown as Eth;
      setAccount(res.address);
      setActiveName(REOWN_NAME);
      setEmail(getEmail());
      attach(eth);
      readChain(eth);
    });
    return () => {
      cancelled = true;
    };
  }, [attach, readChain]);

  const switchChain = useCallback(async (target: number) => {
    await switchReownNetwork(target);
    setChainId(target);
  }, []);

  const switchToBase = useCallback(() => switchChain(BASE_CHAIN_ID), [switchChain]);

  const connect = useCallback(async () => {
    setError(null);
    if (!reownConfigured()) {
      setError("Wallet connection is not configured yet.");
      return;
    }
    setConnecting(true);
    try {
      const { address, provider: rw } = await connectReown();
      const eth = rw as unknown as Eth;
      setAccount(address);
      setActiveName(REOWN_NAME);
      attach(eth);
      localStorage.setItem(STORAGE_KEY, "1");
      localStorage.setItem(NAME_KEY, REOWN_NAME);
      // AppKit fills the user record a moment after the account connects.
      window.setTimeout(() => setEmail(getEmail()), 400);
      await readChain(eth);
      const current = parseInt((await eth.request({ method: "eth_chainId" })) as string, 16);
      if (current !== BASE_CHAIN_ID) {
        try {
          await switchReownNetwork(BASE_CHAIN_ID);
          await readChain(eth);
        } catch {
          setError("Connected, but the wallet is on another network. Switch it to Base.");
        }
      }
    } catch (e) {
      const code = (e as { code?: number }).code;
      setError(
        code === 4001
          ? "Wallet selection cancelled."
          : e instanceof Error
            ? e.message
            : "Could not connect the wallet.",
      );
    } finally {
      setConnecting(false);
    }
  }, [attach, readChain]);

  const disconnect = useCallback(() => {
    void disconnectReown();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NAME_KEY);
    setAccount(null);
    setProvider(null);
    setChainId(null);
    setActiveName(null);
    setEmail(null);
    setError(null);
  }, []);

  const emailSignIn = useCallback(() => {
    setError(null);
    if (!reownConfigured()) {
      setError("Wallet connection is not configured yet.");
      return;
    }
    openEmailLogin();
  }, []);

  const manageAccount = useCallback(() => openAccountView(), []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<WalletState>(
    () => ({
      account,
      provider,
      chainId,
      connecting,
      error,
      hasWallet: reownConfigured(),
      onBase: chainId === BASE_CHAIN_ID,
      options: OPTIONS,
      activeName,
      email,
      connect,
      emailSignIn,
      manageAccount,
      disconnect,
      switchToBase,
      switchChain,
      clearError,
    }),
    [
      account,
      provider,
      chainId,
      connecting,
      error,
      activeName,
      email,
      connect,
      emailSignIn,
      manageAccount,
      disconnect,
      switchToBase,
      switchChain,
      clearError,
    ],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}

export function shortAddress(a: string | null) {
  if (!a) return "";
  return a.slice(0, 6) + "…" + a.slice(-4);
}
