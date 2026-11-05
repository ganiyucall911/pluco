"use client";

/**
 * One collection, read live from the registry on Base mainnet.
 * Reachable at /collections/view?address=0x… from the live gallery.
 * Kept as a client route because the static export cannot prerender an
 * address that does not exist until someone registers a collection.
 */

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Loader2 } from "lucide-react";
import {
  ChainCollectionDetail,
  basescanAddress,
  readCollectionDetail,
  shortAddress,
} from "@/lib/onchain";
import { isAddress } from "@/lib/chain-config";

function View() {
  const params = useSearchParams();
  const address = (params.get("address") || "").trim();
  const [state, setState] = useState<{ loading: boolean; data: ChainCollectionDetail | null; error: string | null }>({
    loading: Boolean(address),
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!address || !isAddress(address)) {
      setState({ loading: false, data: null, error: address ? "That is not a valid contract address." : null });
      return;
    }
    let live = true;
    readCollectionDetail(address).then((result) => {
      if (!live) return;
      setState({ loading: false, data: result.data, error: result.error });
    });
    return () => {
      live = false;
    };
  }, [address]);

  if (state.loading) {
    return (
      <div className="flex items-center gap-3 text-sm text-faint">
        <Loader2 size={15} className="animate-spin" /> Reading this collection from Base…
      </div>
    );
  }

  if (state.error) {
    return <p className="text-sm leading-6 text-gold">{state.error}</p>;
  }

  if (!state.data) {
    return (
      <div>
        <p className="eyebrow">Not found</p>
        <h1 className="mt-4 text-3xl font-semibold">This collection isn&apos;t registered.</h1>
        <p className="mt-3 max-w-[480px] text-sm leading-6 text-body">
          Nothing at that address is registered in the PLUCO registry on Base. If you just deployed
          it, register it first and it will appear here.
        </p>
        <Link href="/collections" className="link-underline mt-6 inline-block text-sm text-paper">
          Back to collections
        </Link>
      </div>
    );
  }

  const item = state.data;

  return (
    <article className="max-w-[880px]">
      <p className="text-[11px] uppercase tracking-[.28em] text-faint">{item.category || "Collection"}</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{item.name || "Untitled"}</h1>
      <p className="mt-3 text-sm text-body">
        by <span className="font-mono text-[13px] text-paper">{shortAddress(item.artist)}</span>
        {item.symbol ? ` · ${item.symbol}` : ""}
      </p>

      <dl className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {[
          ["Contract", <a key="c" href={basescanAddress(item.address)} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1.5 font-mono text-[12px]">{shortAddress(item.address)} <ExternalLink size={11} /></a>],
          ["Registered", new Date(item.registeredAt * 1000).toLocaleDateString()],
          ["Status", item.active ? "Listed in the registry" : "Delisted by the artist"],
          ["Supply", item.maxSupply ? `${item.minted ?? 0} of ${item.maxSupply}` : item.minted !== null ? `${item.minted} minted` : "—"],
          ["Mint price", item.mintPriceEth ? `${item.mintPriceEth} ETH` : "—"],
          ["Sale", item.saleOpen === null ? "—" : item.saleOpen ? "Open" : "Closed"],
          ["Royalty", item.royaltyBps === null ? "—" : `${item.royaltyBps}%`],
          ["Metadata", item.metadataURI ? <a key="m" href={item.metadataURI.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/")} target="_blank" rel="noreferrer" className="link-underline text-[12px]">Open</a> : "—"],
        ].map(([label, value], index) => (
          <div key={index} className="bg-surface px-5 py-4">
            <dt className="text-[10px] uppercase tracking-[.2em] text-faint">{label as string}</dt>
            <dd className="mt-2 text-[13px] text-paper">{value as React.ReactNode}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function CollectionViewPage() {
  return (
    <main className="wrap py-16">
      <Suspense fallback={<p className="text-sm text-faint">Loading…</p>}>
        <View />
      </Suspense>
    </main>
  );
}
