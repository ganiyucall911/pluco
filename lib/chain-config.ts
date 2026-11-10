export type ChainConfig = {
  chainId: number;
  reownProjectId: string;
  originals: string;
  registry: string;
  marketplace: string;
};

export const BASE_MAINNET = 8453;

export type Network = {
  name: string;
  short: string;
  currency: string;
  explorer: string;
  rpc: string;
};

export function networkFor(_chainId?: number): Network {
  // Base mainnet is the only network VECTOLITH runs on.
  return {
    name: "Base",
    short: "Base",
    currency: "ETH",
    explorer: "https://basescan.org",
    rpc: "https://mainnet.base.org",
  };
}

const FALLBACK: ChainConfig = {
  chainId: Number(process.env.NEXT_PUBLIC_VECTOLITH_CHAIN_ID || BASE_MAINNET),
  reownProjectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "399fb0ee03b4e2afa8d1682f56a11788",
  originals: process.env.NEXT_PUBLIC_VECTOLITH_ART_CONTRACT || "0x1f49c091da217f73493a5b517f490865dbabe15d",
  registry: process.env.NEXT_PUBLIC_VECTOLITH_REGISTRY || "0x9218b355bb2e69a0f53e072c697e74e1ad63f9ff",
  marketplace: process.env.NEXT_PUBLIC_VECTOLITH_MARKETPLACE || "0x0bbdc74bd7144a32f29196753fd7727995df8e3c",
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
        reownProjectId: FALLBACK.reownProjectId || file.reownProjectId || "",
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
