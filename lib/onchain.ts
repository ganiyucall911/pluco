"use client";

/**
 * Onchain reads for the gallery.
 *
 * Everything here is read-only and comes straight from Base mainnet. Contract
 * addresses resolve from public/config.json (or the NEXT_PUBLIC_* env vars), so
 * deploying the protocol needs no site rebuild — the pages pick addresses up on
 * the next load and render whatever the chain actually holds.
 */

import { Contract, JsonRpcProvider, formatEther } from "ethers";
import { BASE_MAINNET, loadChainConfig } from "./chain-config";

export const BASE_RPC = process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org";

const REGISTRY_ABI = [
  "function page(uint256 offset, uint256 limit) view returns ((address collection, address artist, string name, string category, string metadataURI, uint64 registeredAt, bool active)[])",
  "function get(address collection) view returns ((address collection, address artist, string name, string category, string metadataURI, uint64 registeredAt, bool active))",
  "function collectionCount() view returns (uint256)",
  "function isActive(address collection) view returns (bool)",
  "function artistOf(address collection) view returns (address)",
];

const MARKETPLACE_ABI = [
  "function listingCount() view returns (uint256)",
  "function listings(uint256 listingId) view returns (address seller, address collection, uint256 tokenId, uint256 price, bool active)",
  "function feeBps() view returns (uint96)",
];

const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function totalMinted() view returns (uint256)",
  "function maxSupply() view returns (uint256)",
  "function mintPrice() view returns (uint256)",
  "function saleOpen() view returns (bool)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address receiver, uint256 amount)",
];

let provider: JsonRpcProvider | null = null;

export function getProvider(): JsonRpcProvider {
  if (!provider) provider = new JsonRpcProvider(BASE_RPC, BASE_MAINNET, { staticNetwork: true });
  return provider;
}

export type ChainCollection = {
  address: string;
  artist: string;
  name: string;
  category: string;
  metadataURI: string;
  registeredAt: number;
  active: boolean;
};

export type ChainListing = {
  listingId: number;
  seller: string;
  collection: string;
  collectionName: string;
  tokenId: number;
  priceWei: string;
  priceEth: string;
  tokenURI: string;
};

export type ChainCollectionDetail = ChainCollection & {
  symbol: string;
  minted: number | null;
  maxSupply: number | null;
  mintPriceEth: string | null;
  saleOpen: boolean | null;
  royaltyBps: number | null;
};

export type ReadResult<T> = { data: T; error: string | null; configured: boolean };

function toCollection(raw: {
  collection: string;
  artist: string;
  name: string;
  category: string;
  metadataURI: string;
  registeredAt: bigint;
  active: boolean;
}): ChainCollection {
  return {
    address: raw.collection,
    artist: raw.artist,
    name: raw.name,
    category: raw.category,
    metadataURI: raw.metadataURI,
    registeredAt: Number(raw.registeredAt),
    active: raw.active,
  };
}

/** Newest-first page of registered collections. */
export async function readRegistry(offset = 0, limit = 24): Promise<ReadResult<ChainCollection[]>> {
  const config = await loadChainConfig();
  if (!config.registry) return { data: [], error: null, configured: false };

  try {
    const registry = new Contract(config.registry, REGISTRY_ABI, getProvider());
    const rows = (await registry.page(offset, limit)) as Parameters<typeof toCollection>[0][];
    return { data: rows.map(toCollection), error: null, configured: true };
  } catch (err) {
    return { data: [], error: explain(err), configured: true };
  }
}

/** One collection, straight from the registry. */
export async function readCollection(address: string): Promise<ReadResult<ChainCollection | null>> {
  const config = await loadChainConfig();
  if (!config.registry) return { data: null, error: null, configured: false };

  try {
    const registry = new Contract(config.registry, REGISTRY_ABI, getProvider());
    const raw = (await registry.get(address)) as Parameters<typeof toCollection>[0];
    if (raw.collection === "0x0000000000000000000000000000000000000000") {
      return { data: null, error: null, configured: true };
    }
    return { data: toCollection(raw), error: null, configured: true };
  } catch (err) {
    return { data: null, error: explain(err), configured: true };
  }
}

/** Token-level detail for a collection page (supply, price, royalty, sale state). */
export async function readCollectionDetail(address: string): Promise<ReadResult<ChainCollectionDetail | null>> {
  const base = await readCollection(address);
  if (!base.data) return { data: null, error: base.error, configured: base.configured };

  const token = new Contract(address, TOKEN_ABI, getProvider());
  const [symbol, minted, maxSupply, mintPrice, saleOpen, royalty] = await Promise.all([
    token.symbol().catch(() => ""),
    token.totalMinted().catch(() => null),
    token.maxSupply().catch(() => null),
    token.mintPrice().catch(() => null),
    token.saleOpen().catch(() => null),
    token.royaltyInfo(0, BigInt(10_000)).catch(() => null),
  ]);

  return {
    data: {
      ...base.data,
      symbol: String(symbol ?? ""),
      minted: minted === null ? null : Number(minted),
      maxSupply: maxSupply === null ? null : Number(maxSupply),
      mintPriceEth: mintPrice === null ? null : formatEther(mintPrice as bigint),
      saleOpen: saleOpen === null ? null : Boolean(saleOpen),
      royaltyBps: royalty ? Number((royalty as [string, bigint])[1]) / 100 : null,
    },
    error: null,
    configured: true,
  };
}

/** Active listings, newest first, with the collection name and token URI resolved. */
export async function readListings(max = 24): Promise<ReadResult<ChainListing[]>> {
  const config = await loadChainConfig();
  if (!config.marketplace) return { data: [], error: null, configured: false };

  try {
    const market = new Contract(config.marketplace, MARKETPLACE_ABI, getProvider());
    const total = Number(await market.listingCount());
    if (total === 0) return { data: [], error: null, configured: true };

    const ids: number[] = [];
    for (let id = total; id > 0 && ids.length < max; id--) ids.push(id);

    const rows = await Promise.all(
      ids.map(async (id) => {
        const raw = (await market.listings(id)) as [string, string, bigint, bigint, boolean];
        return { id, seller: raw[0], collection: raw[1], tokenId: Number(raw[2]), price: raw[3], active: raw[4] };
      }),
    );

    const active = rows.filter((row) => row.active);
    const registry = config.registry ? new Contract(config.registry, REGISTRY_ABI, getProvider()) : null;

    const listings = await Promise.all(
      active.map(async (row) => {
        const token = new Contract(row.collection, TOKEN_ABI, getProvider());
        const [name, uri] = await Promise.all([
          registry
            ? (registry.get(row.collection) as Promise<{ name: string }>).then((c) => c.name).catch(() => "")
            : Promise.resolve(""),
          token.tokenURI(row.tokenId).catch(() => ""),
        ]);
        return {
          listingId: row.id,
          seller: row.seller,
          collection: row.collection,
          collectionName: name || `${row.collection.slice(0, 6)}…${row.collection.slice(-4)}`,
          tokenId: row.tokenId,
          priceWei: row.price.toString(),
          priceEth: formatEther(row.price),
          tokenURI: String(uri ?? ""),
        } satisfies ChainListing;
      }),
    );

    return { data: listings, error: null, configured: true };
  } catch (err) {
    return { data: [], error: explain(err), configured: true };
  }
}

/** Marketplace protocol fee, for showing what a sale costs. */
export async function readMarketFee(): Promise<number | null> {
  const config = await loadChainConfig();
  if (!config.marketplace) return null;
  try {
    const market = new Contract(config.marketplace, MARKETPLACE_ABI, getProvider());
    return Number(await market.feeBps()) / 100;
  } catch {
    return null;
  }
}

function explain(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (/could not coalesce|network|failed to fetch|missing response/i.test(raw)) {
    return "Couldn't reach Base right now. The addresses are set, the read just failed — retry in a moment.";
  }
  return raw.length > 160 ? raw.slice(0, 160) + "…" : raw;
}

export function basescanAddress(address: string) {
  return `https://basescan.org/address/${address}`;
}

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export const WRITE_ABIS = {
  mint: ["function mint(string calldata uri) external payable returns (uint256)"],
  buy: ["function buy(uint256 listingId) external payable"],
  list: ["function list(address collection, uint256 tokenId, uint256 price) external returns (uint256)"],
  approve: ["function approve(address to, uint256 tokenId) external"],
  setApprovalForAll: ["function setApprovalForAll(address operator, bool approved) external"],
};

export type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
};

/** Broadcast an onchain mint call to Base mainnet. */
export async function broadcastMint(
  provider: Eip1193Provider,
  from: string,
  contractAddress: string,
  metadataURI: string,
  priceWei: bigint
): Promise<string> {
  const bytes = new TextEncoder().encode(metadataURI);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const padded = hex.padEnd(Math.max(64, Math.ceil(hex.length / 64) * 64), "0");
  const data = "0xd85d3d27" + BigInt(32).toString(16).padStart(64, "0") + BigInt(bytes.length).toString(16).padStart(64, "0") + padded;

  const txHash = await provider.request({
    method: "eth_sendTransaction",
    params: [
      {
        from,
        to: contractAddress,
        data,
        value: "0x" + priceWei.toString(16),
      },
    ],
  });
  return String(txHash);
}

/** Broadcast an onchain buy transaction on VectolithMarketplace. */
export async function broadcastBuy(
  provider: Eip1193Provider,
  from: string,
  marketplaceAddress: string,
  listingId: number,
  priceWei: bigint
): Promise<string> {
  // buy(uint256) selector: 0xd96a094a
  const data = "0xd96a094a" + BigInt(listingId).toString(16).padStart(64, "0");
  const txHash = await provider.request({
    method: "eth_sendTransaction",
    params: [
      {
        from,
        to: marketplaceAddress,
        data,
        value: "0x" + priceWei.toString(16),
      },
    ],
  });
  return String(txHash);
}

