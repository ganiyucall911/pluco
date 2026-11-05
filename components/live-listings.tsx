"use client";

/**
 * Live listings: read from the marketplace contract on Base mainnet.
 * The seller keeps the token until it sells, so a listing is a promise the
 * contract enforces, not a screenshot.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import { ChainListing, readListings, shortAddress } from "@/lib/onchain";

export function LiveListings({ max = 24 }: { max?: number }) {
  const [state, setState] = useState<{ loading: boolean; configured: boolean; rows: ChainListing[]; error: string | null }>({
    loading: true,
    configured: true,
    rows: [],
    error: null,
  });

  useEffect(() => {
    let live = true;
    readListings(max).then((result) => {
      if (!live) return;
      setState({ loading: false, configured: result.configured, rows: result.data, error: result.error });
    });
    return () => {
      live = false;
    };
  }, [max]);

  if (state.loading) {
    return (
      <div className="mt-10 flex items-center gap-3 border border-line bg-surface px-5 py-4 text-[13px] text-faint">
        <Loader2 size={14} className="animate-spin" /> Reading listings from Base…
      </div>
    );
  }

  if (!state.configured) {
    return (
      <div className="mt-14 border border-line bg-surface p-10">
        <p className="eyebrow">Not deployed</p>
        <h2 className="mt-3 text-[22px]">The marketplace has no address yet.</h2>
        <p className="mt-2 max-w-[440px] text-[13px] leading-6 text-mute">
          Once the marketplace is deployed and its address is in public/config.json, every active
          listing renders here straight from the chain — price, seller, token. No imported data.
        </p>
        <div className="mt-6">
          <Link href="/protocol" className="btn btn-secondary">Protocol status</Link>
        </div>
      </div>
    );
  }

  if (state.error) {
    return <div className="mt-10 border border-line bg-surface px-5 py-4 text-[13px] text-gold">{state.error}</div>;
  }

  if (state.rows.length === 0) {
    return (
      <div className="mt-14 border border-line bg-surface p-10">
        <p className="eyebrow">Live</p>
        <h2 className="mt-3 text-[22px]">No listings right now.</h2>
        <p className="mt-2 max-w-[440px] text-[13px] leading-6 text-mute">
          The marketplace is live and empty. The moment someone lists a registered piece, it
          appears here — read from Base, not from a cache.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/mint" className="btn">Mint a piece</Link>
          <Link href="/collections" className="btn btn-secondary">Browse collections</Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="mt-10 divide-y divide-line border border-line">
      {state.rows.map((row) => (
        <li key={`${row.collection}-${row.tokenId}`} className="flex flex-wrap items-center gap-4 px-5 py-4">
          <div className="min-w-[180px] flex-1">
            <p className="text-[13px] font-medium text-paper">{row.collectionName}</p>
            <p className="mt-1 font-mono text-[11px] text-faint">
              #{row.tokenId} · seller {shortAddress(row.seller)}
            </p>
          </div>
          <p className="num text-[13px] text-paper">{row.priceEth} ETH</p>
          <div className="flex gap-3">
            <a
              href={`https://basescan.org/address/${row.collection}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex items-center gap-1.5 text-[12px] text-mute hover:text-paper"
            >
              Contract <ExternalLink size={12} />
            </a>
            {row.tokenURI ? (
              <a
                href={row.tokenURI.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/")}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex items-center gap-1.5 text-[12px] text-mute hover:text-paper"
              >
                Metadata <ExternalLink size={12} />
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
