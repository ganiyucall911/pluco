export type ChainConfig = {
  chainId: number;
  originals: string;
  registry: string;
  marketplace: string;
};

export const BASE_MAINNET = 8453;
export const BASE_SEPOLIA = 84532;

export type Network = {
  name: string;
  short: string;
  currency: string;
  explorer: string;
  rpc: string;
};

export function networkFor(chainId: number): Network {
  if (chainId === BASE_SEPOLIA) {
    return {
      name: "Base Sepolia",
      short: "Base Sepolia",
      currency: "test ETH",
      explorer: "https://sepolia.basescan.org",
      rpc: "https://sepolia.base.org",
    };
  }
  return {
    name: "Base",
    short: "Base",
    currency: "ETH",
    explorer: "https://basescan.org",
    rpc: "https://mainnet.base.org",
  };
}

const FALLBACK: ChainConfig = {
  chainId: Number(process.env.NEXT_PUBLIC_PLUCO_CHAIN_ID || BASE_MAINNET),
  originals: process.env.NEXT_PUBLIC_PLUCO_ART_CONTRACT || "",
  registry: process.env.NEXT_PUBLIC_PLUCO_REGISTRY || "",
  marketplace: process.env.NEXT_PUBLIC_PLUCO_MARKETPLACE || "",
};

let cached: Promise<ChainConfig> | null = null;

/**
 * Contract addresses resolve at runtime from /config.json, with build-time env
 * vars taking priority. That means a new deployment only needs that one small
 * file updated — no rebuild, no redeploy of the site.
 */
export function loadChainConfig(): Promise<ChainConfig> {
  if (cached) return cached;

  cached = (async () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    try {
      const res = await fetch(basePath + "/config.json", { cache: "no-store" });
      if (!res.ok) return FALLBACK;
      const file = (await res.json()) as Partial<ChainConfig>;
      return {
        chainId: Number(file.chainId || FALLBACK.chainId),
        originals: FALLBACK.originals || file.originals || "",
        registry: FALLBACK.registry || file.registry || "",
        marketplace: FALLBACK.marketplace || file.marketplace || "",
      };
    } catch {
      return FALLBACK;
    }
  })();

  return cached;
}

export function isAddress(value: string | undefined | null): boolean {
  return Boolean(value && /^0x[0-9a-fA-F]{40}$/.test(value));
}

export function short(addr: string): string {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export function formatEth(wei: bigint): string {
  const whole = wei / BigInt(1e18);
  const rest = (wei % BigInt(1e18)).toString().padStart(18, "0").replace(/0+$/, "");
  return rest ? whole.toString() + "." + rest : whole.toString();
}

export function parseEth(value: string): bigint {
  const clean = value.trim();
  if (!clean) return BigInt(0);
  if (!/^\d*(\.\d*)?$/.test(clean)) throw new Error("Enter an ETH amount like 0.005");
  const [whole, frac = ""] = clean.split(".");
  const padded = (frac + "0".repeat(18)).slice(0, 18);
  return BigInt((whole || "0") + padded);
}
