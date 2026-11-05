"use client";

/**
 * Live collections: whatever the registry actually holds on Base mainnet.
 * When nothing is registered (or no address is configured yet) it says so
 * plainly instead of pretending demo content is onchain.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { ChainCollection, basescanAddress, readRegistry, shortAddress } from "@/lib/onchain";

export function LiveCollections({ limit = 12 }: { limit?: number }) {
  const [state, setState] = useState<{ loading: boolean; configured: boolean; rows: ChainCollection[]; error: string | null }>({
    loading: true,
    configured: true,
    rows: [],
    error: null,
  });

  useEffect(() => {
    let live = true;
    readRegistry(0, limit).then((result) => {
      if (!live) return;
      setState({ loading: false, configured: result.configured, rows: result.data, error: result.error });
    });
    return () => {
      live = false;
    };
  }, [limit]);

  if (state.loading) {
    return (
      <div className="flex items-center gap-3 border border-line bg-surface px-5 py-4 text-[13px] text-faint">
        <Loader2 size={14} className="animate-spin" /> Reading the registry on Base…
      </div>
    );
  }

  if (!state.configured) {
    return (
      <div className="border border-dashed border-line-strong p-6">
        <p className="eyebrow">Registry</p>
        <p className="mt-3 max-w-[520px] text-[13px] leading-6 text-body">
          No registry address is configured yet. Deploy the protocol from{" "}
          <Link href="/launch" className="link-underline text-paper">/launch</Link> (or set{" "}
          <span className="font-mono text-[12px]">registry</span> in public/config.json) and every
          collection registered on Base appears here — read straight from the chain.
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="border border-line bg-surface px-5 py-4 text-[13px] leading-6 text-gold">
        {state.error}
      </div>
    );
  }

  if (state.rows.length === 0) {
    return (
      <div className="border border-dashed border-line-strong p-6">
        <p className="eyebrow">Onchain</p>
        <p className="mt-3 max-w-[520px] text-[13px] leading-6 text-body">
          The registry is live and empty. Nothing has been registered on Base yet — the first
          collection added onchain shows up here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {state.rows.map((row) => (
        <Link
          key={row.address}
          href={`/collections/view?address=${row.address}`}
          className="group focus-ring flex flex-col border border-line bg-surface p-5 transition hover:border-line-strong"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[.22em] text-faint">
                {row.category || "Collection"}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-paper">{row.name || "Untitled"}</h3>
            </div>
            <ArrowUpRight size={16} className="shrink-0 text-faint transition group-hover:text-paper" />
          </div>
          <p className="mt-3 font-mono text-[11px] text-mute">{shortAddress(row.artist)}</p>
          <p className="mt-auto pt-4 text-[11px] uppercase tracking-[.15em] text-faint">
            <span className={row.active ? "text-paper" : "text-gold"}>
              {row.active ? "Listed" : "Delisted"}
            </span>
            {" · "}
            <a
              href={basescanAddress(row.address)}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
              onClick={(e) => e.stopPropagation()}
            >
              BaseScan
            </a>
          </p>
        </Link>
      ))}
    </div>
  );
}
