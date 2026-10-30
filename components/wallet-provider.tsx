"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  MM_ID,
  MM_NAME,
  connectMetaMaskMultichain,
  disconnectMetaMaskMultichain,
  restoreMetaMaskMultichain,
} from "@/lib/metamask-multichain";
import {
  REOWN_ID,
  REOWN_NAME,
  connectReown,
  disconnectReown,
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
  isMetaMask?: boolean;
  isRabby?: boolean;
  isCoinbaseWallet?: boolean;
};

/**
 * The legacy injected provider. Read through a cast because wallet SDKs already
 * declare Window.ethereum with their own, incompatible type.
 */
function injected(): Eth | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { ethereum?: Eth }).ethereum;
}

export type WalletOption = {
  id: string;
  name: string;
  icon?: string;
  /** Absent for the MetaMask Connect option, which builds its provider on connect. */
  provider?: Eth;
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
      // MetaMask Connect is always offered: the extension modal on desktop, a QR or
      // deeplink on mobile, and it is the only option when nothing is injected.
      if (!list.some((o) => o.id === MM_ID)) {
        list.push({ id: MM_ID, name: MM_NAME });
      }
      // Reown AppKit: one modal for every wallet (extension, mobile QR, Solana).
      if (reownConfigured() && !list.some((o) => o.id === REOWN_ID)) {
        list.push({ id: REOWN_ID, name: REOWN_NAME });
      }
      setOptions(list);
      // MetaMask Connect always works, so a wallet is always available.
      setHasWallet(true);
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
    const legacy = injected();
    if (legacy && !found.size) {
      found.set("injected", { id: "injected", name: labelFor(legacy, "Browser wallet"), provider: legacy });
      commit();
    }

    const timer = setTimeout(() => {
      const late = injected();
      if (late && !found.size) {
        found.set("injected", { id: "injected", name: labelFor(late, "Browser wallet"), provider: late });
        commit();
      }
    }, 400);

    // Silently restore a previous session.
    const restore = async () => {
      if (localStorage.getItem(STORAGE_KEY) !== "1") return;
      // MetaMask Connect sessions are restored by the SDK, not through window.ethereum.
      if (localStorage.getItem(NAME_KEY) === MM_NAME) return;
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
      const eth = activeProvider.current || injected();
      if (!eth) throw new Error("No wallet connected.");
      // WalletConnect sessions switch network through AppKit, not wallet_switchEthereumChain.
      if (activeName === REOWN_NAME) {
        await switchReownNetwork(target);
        setChainId(target);
        return;
      }
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
    [activeName, readChain],
  );

  const switchToBase = useCallback(() => switchChain(BASE_CHAIN_ID), [switchChain]);

  const connect = useCallback(
    async (id?: string) => {
      setError(null);

      // No id given: prefer an injected wallet, otherwise MetaMask Connect.
      const wanted = id ?? options.find((o) => o.provider)?.id ?? MM_ID;

      if (wanted === REOWN_ID) {
        setConnecting(true);
        try {
          const { address, provider: rw } = await connectReown();
          const eth = rw as unknown as Eth;
          setAccount(address);
          setActiveName(REOWN_NAME);
          attach(eth);
          localStorage.setItem(STORAGE_KEY, "1");
          localStorage.setItem(NAME_KEY, REOWN_NAME);
          await readChain(eth);
          const current = parseInt((await eth.request({ method: "eth_chainId" })) as string, 16);
          if (current !== BASE_CHAIN_ID) {
            await switchReownNetwork(BASE_CHAIN_ID);
            await readChain(eth);
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
        return;
      }

      if (wanted === MM_ID) {
        setConnecting(true);
        try {
          const { provider: mm, accounts } = await connectMetaMaskMultichain();
          setAccount(accounts[0]);
          setActiveName(MM_NAME);
          attach(mm as unknown as Eth);
          localStorage.setItem(STORAGE_KEY, "1");
          localStorage.setItem(NAME_KEY, MM_NAME);
          await readChain(mm as unknown as Eth);
          const id2 = parseInt((await mm.request({ method: "eth_chainId" })) as string, 16);
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
              ? "Request rejected in MetaMask."
              : e instanceof Error
                ? e.message
                : "Could not connect MetaMask.",
          );
        } finally {
          setConnecting(false);
        }
        return;
      }

      const legacyEth = injected();
      const chosen =
        (id ? options.find((o) => o.id === id) : options[0]) ||
        (legacyEth ? { id: "injected", name: labelFor(legacyEth, "Browser wallet"), provider: legacyEth } : null);

      if (!chosen || !chosen.provider) {
        setError(
          typeof navigator !== "undefined" && /iPhone|iPad|Android/i.test(navigator.userAgent)
            ? "This browser has no wallet inside it. Open this page inside MetaMask, Coinbase Wallet or the Base app."
            : "No wallet detected. Install MetaMask, Rabby or Coinbase Wallet, then reload this page.",
        );
        return;
      }

      setConnecting(true);
      try {
        const eth = chosen.provider as Eth;
        const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
        if (!accounts || !accounts.length) {
          setError("The wallet returned no account. Unlock it and try again.");
          return;
        }
        setAccount(accounts[0]);
        setActiveName(chosen.name);
        attach(eth);
        localStorage.setItem(STORAGE_KEY, "1");
        localStorage.setItem(NAME_KEY, chosen.name);
        await readChain(eth);
        const id2 = parseInt((await eth.request({ method: "eth_chainId" })) as string, 16);
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

  // Bring back a MetaMask Connect session on reload without prompting.
  useEffect(() => {
    if (typeof window === "undefined" || localStorage.getItem(NAME_KEY) !== MM_NAME) return;
    let cancelled = false;
    restoreMetaMaskMultichain().then((res) => {
      if (cancelled) return;
      if (!res) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(NAME_KEY);
        return;
      }
      setAccount(res.accounts[0]);
      setActiveName(MM_NAME);
      attach(res.provider as unknown as Eth);
      readChain(res.provider as unknown as Eth);
    });
    return () => {
      cancelled = true;
    };
  }, [attach, readChain]);

  // Reown AppKit restores its own WalletConnect session.
  useEffect(() => {
    if (typeof window === "undefined" || localStorage.getItem(NAME_KEY) !== REOWN_NAME) return;
    let cancelled = false;
    restoreReown().then((res) => {
      if (cancelled) return;
      if (!res) return;
      const eth = res.provider as unknown as Eth;
      setAccount(res.address);
      setActiveName(REOWN_NAME);
      attach(eth);
      readChain(eth);
    });
    return () => {
      cancelled = true;
    };
  }, [attach, readChain]);

  const disconnect = useCallback(() => {
    if (localStorage.getItem(NAME_KEY) === MM_NAME) void disconnectMetaMaskMultichain();
    if (localStorage.getItem(NAME_KEY) === REOWN_NAME) void disconnectReown();
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
