"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export const BASE_CHAIN_ID = 8453;
export const BASE_CHAIN_HEX = "0x2105";
export const BASE_SEPOLIA_CHAIN_ID = 84532;

type Eth = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (event: string, handler: (...args: never[]) => void) => void;
  removeListener?: (event: string, handler: (...args: never[]) => void) => void;
  isMetaMask?: boolean;
  isRabby?: boolean;
  isCoinbaseWallet?: boolean;
};

declare global {
  interface Window {
    ethereum?: Eth;
  }
}

export type WalletOption = {
  id: string;
  name: string;
  icon?: string;
  provider: Eth;
};

type WalletState = {
  account: string | null;
  provider: Eth | null;
  chainId: number | null;
  connecting: boolean;
  error: string | null;
  hasWallet: boolean;
  onBase: boolean;
  options: WalletOption[];
  activeName: string | null;
  connect: (id?: string) => Promise<void>;
  disconnect: () => void;
  switchToBase: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  clearError: () => void;
};

const WalletContext = createContext<WalletState | null>(null);
const STORAGE_KEY = "pluco.wallet";
const NAME_KEY = "pluco.wallet.name";

const KNOWN_NAMES: Record<string, string> = {
  isMetaMask: "MetaMask",
  isRabby: "Rabby",
  isCoinbaseWallet: "Coinbase Wallet",
};

function labelFor(eth: Eth, fallback: string) {
  for (const [flag, name] of Object.entries(KNOWN_NAMES)) {
    if ((eth as Record<string, unknown>)[flag]) return name;
  }
  return fallback;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<Eth | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWallet, setHasWallet] = useState(false);
  const [options, setOptions] = useState<WalletOption[]>([]);
  const [activeName, setActiveName] = useState<string | null>(null);
  const activeProvider = useRef<Eth | null>(null);

  const attach = useCallback((eth: Eth) => {
    activeProvider.current = eth;
    setProvider(eth);

    const onAccounts = (accounts: string[]) => {
      setAccount(accounts && accounts.length ? accounts[0] : null);
      if (!accounts || !accounts.length) localStorage.removeItem(STORAGE_KEY);
    };
    const onChain = (id: string) => setChainId(parseInt(id, 16));

    eth.on?.("accountsChanged", onAccounts as never);
    eth.on?.("chainChanged", onChain as never);
    return () => {
      eth.removeListener?.("accountsChanged", onAccounts as never);
      eth.removeListener?.("chainChanged", onChain as never);
    };
  }, []);

  // Discover every injected wallet (EIP-6963) instead of betting on window.ethereum.
  useEffect(() => {
    const found = new Map<string, WalletOption>();

    const commit = () => {
      const list = [...found.values()];
      setOptions(list);
      setHasWallet(list.length > 0);
    };

    const onAnnounce = (event: Event) => {
      const detail = (event as CustomEvent).detail as
        | { info?: { uuid?: string; name?: string; icon?: string }; provider?: Eth }
        | undefined;
      if (!detail?.provider) return;
      const id = detail.info?.uuid || detail.info?.name || "injected";
      found.set(id, {
        id,
        name: detail.info?.name || labelFor(detail.provider, "Browser wallet"),
        icon: detail.info?.icon,
        provider: detail.provider,
      });
      commit();
    };

    window.addEventListener("eip6963:announceProvider", onAnnounce as EventListener);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // Wallets that predate EIP-6963 still expose window.ethereum.
    const legacy = typeof window !== "undefined" ? window.ethereum : undefined;
    if (legacy && !found.size) {
      found.set("injected", { id: "injected", name: labelFor(legacy, "Browser wallet"), provider: legacy });
      commit();
    }

    const timer = setTimeout(() => {
      const late = typeof window !== "undefined" ? window.ethereum : undefined;
      if (late && !found.size) {
        found.set("injected", { id: "injected", name: labelFor(late, "Browser wallet"), provider: late });
        commit();
      }
    }, 400);

    // Silently restore a previous session.
    const restore = async () => {
      if (localStorage.getItem(STORAGE_KEY) !== "1") return;
      const eth = legacy || found.values().next().value?.provider;
      if (!eth) return;
      try {
        const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
        if (accounts && accounts.length) {
          setAccount(accounts[0]);
          setActiveName(localStorage.getItem(NAME_KEY));
          attach(eth);
          const id = (await eth.request({ method: "eth_chainId" })) as string;
          setChainId(parseInt(id, 16));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        /* ignore */
      }
    };
    restore();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("eip6963:announceProvider", onAnnounce as EventListener);
    };
  }, [attach]);

  const readChain = useCallback(async (eth: Eth) => {
    try {
      const id = (await eth.request({ method: "eth_chainId" })) as string;
      setChainId(parseInt(id, 16));
    } catch {
      /* ignore */
    }
  }, []);

  // Ask the wallet to move to a chain, adding it first if the wallet has never seen it.
  const switchChain = useCallback(
    async (target: number) => {
      const eth = activeProvider.current || (typeof window !== "undefined" ? window.ethereum : undefined);
      if (!eth) throw new Error("No wallet connected.");
      const hex = "0x" + target.toString(16);
      const current = (await eth.request({ method: "eth_chainId" })) as string;
      if (parseInt(current, 16) === target) {
        setChainId(target);
        return;
      }
      const sepolia = target === BASE_SEPOLIA_CHAIN_ID;
      try {
        await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: hex }] });
      } catch (switchError) {
        const code = (switchError as { code?: number }).code;
        if (code === 4902) {
          await eth.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hex,
                chainName: sepolia ? "Base Sepolia" : "Base",
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: [sepolia ? "https://sepolia.base.org" : "https://mainnet.base.org"],
                blockExplorerUrls: [sepolia ? "https://sepolia.basescan.org" : "https://basescan.org"],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }
      await readChain(eth);
    },
    [readChain],
  );

  const switchToBase = useCallback(() => switchChain(BASE_CHAIN_ID), [switchChain]);

  const connect = useCallback(
    async (id?: string) => {
      setError(null);
      const chosen =
        (id ? options.find((o) => o.id === id) : options[0]) ||
        (typeof window !== "undefined" && window.ethereum
          ? { id: "injected", name: labelFor(window.ethereum, "Browser wallet"), provider: window.ethereum }
          : null);

      if (!chosen) {
        setError(
          typeof navigator !== "undefined" && /iPhone|iPad|Android/i.test(navigator.userAgent)
            ? "This browser has no wallet inside it. Open this page inside MetaMask, Coinbase Wallet or the Base app."
            : "No wallet detected. Install MetaMask, Rabby or Coinbase Wallet, then reload this page.",
        );
        return;
      }

      setConnecting(true);
      try {
        const accounts = (await chosen.provider.request({ method: "eth_requestAccounts" })) as string[];
        if (!accounts || !accounts.length) {
          setError("The wallet returned no account. Unlock it and try again.");
          return;
        }
        setAccount(accounts[0]);
        setActiveName(chosen.name);
        attach(chosen.provider);
        localStorage.setItem(STORAGE_KEY, "1");
        localStorage.setItem(NAME_KEY, chosen.name);
        await readChain(chosen.provider);
        const id2 = parseInt((await chosen.provider.request({ method: "eth_chainId" })) as string, 16);
        if (id2 !== BASE_CHAIN_ID) {
          try {
            await switchToBase();
          } catch {
            setError("Connected, but the wallet is on another network. Switch it to Base.");
          }
        }
      } catch (e) {
        const code = (e as { code?: number }).code;
        setError(
          code === 4001
            ? "Request rejected in the wallet."
            : e instanceof Error
              ? e.message
              : "Could not connect the wallet.",
        );
      } finally {
        setConnecting(false);
      }
    },
    [attach, options, readChain, switchToBase],
  );

  const disconnect = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NAME_KEY);
    activeProvider.current = null;
    setAccount(null);
    setProvider(null);
    setChainId(null);
    setActiveName(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<WalletState>(
        () => ({
          account,
          provider,
          chainId,
      connecting,
      error,
      hasWallet,
      onBase: chainId === BASE_CHAIN_ID,
      options,
      activeName,
      connect,
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
          hasWallet,
          options,
          activeName,
          connect,
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
  return a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "";
}
