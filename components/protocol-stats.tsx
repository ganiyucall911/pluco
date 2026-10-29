"use client";

import { useEffect, useState } from "react";

const REGISTRY = process.env.NEXT_PUBLIC_PLUCO_REGISTRY || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_PLUCO_MARKETPLACE || "";
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_PLUCO_CHAIN_ID || 8453);
const RPC = CHAIN_ID === 8453 ? "https://mainnet.base.org" : "https://sepolia.base.org";

const COLLECTION_COUNT = "0xd57f966b";
const LISTING_COUNT = "0xa9b07c26";

async function callCount(address: string, selector: string): Promise<number | null> {
  if (!address) return null;
  try {
    const res = await fetch(RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [{ to: address, data: selector }, "latest"],
      }),
    });
    const json = (await res.json()) as { result?: string };
    if (!json.result || json.result === "0x") return null;
    return Number(BigInt(json.result));
  } catch {
    return null;
  }
}

export function ProtocolStats() {
  const [collections, setCollections] = useState<number | null>(null);
  const [listings, setListings] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    Promise.all([callCount(REGISTRY, COLLECTION_COUNT), callCount(MARKETPLACE, LISTING_COUNT)]).then(([c, l]) => {
      if (!live) return;
      setCollections(c);
      setListings(l);
    });
    return () => {
      live = false;
    };
  }, []);

  const value = (n: number | null) => (n === null ? "—" : n.toLocaleString());

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-none border border-line bg-surface p-6">
        <p className="text-3xl font-semibold">{value(collections)}</p>
        <p className="mt-2 text-xs uppercase tracking-[.2em] text-mute">Collections registered</p>
      </div>
      <div className="rounded-none border border-line bg-surface p-6">
        <p className="text-3xl font-semibold">{value(listings)}</p>
        <p className="mt-2 text-xs uppercase tracking-[.2em] text-mute">Listings created</p>
      </div>
      <div className="rounded-none border border-line bg-surface p-6">
        <p className="text-3xl font-semibold">2.5%</p>
        <p className="mt-2 text-xs uppercase tracking-[.2em] text-mute">Protocol fee, capped at 5%</p>
      </div>
    </div>
  );
}
