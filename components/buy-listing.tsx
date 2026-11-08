"use client";

import { useRef, useState } from "react";
import { isAddress } from "ethers";
import { useWallet } from "./wallet-provider";
import { loadChainConfig } from "@/lib/chain-config";
import { marketInterface, sendTransaction } from "@/lib/transactions";
import type { ChainListing } from "@/lib/onchain";

export function BuyListing({ listing, onConfirmed }: { listing: ChainListing; onConfirmed: () => void }) {
  const { account, provider, connect, switchChain, connecting } = useWallet();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState("");
  const lock = useRef(false);
  async function buy() {
    if (lock.current || !account || !provider) return;
    lock.current = true;
    setBusy(true);
    setHash("");
    setStatus("Review the ETH payment in your wallet…");
    try {
      const config = await loadChainConfig();
      if (!isAddress(config.marketplace)) throw new Error("Marketplace is not configured.");
      await switchChain(8453);
      await sendTransaction(provider, account, config.marketplace, marketInterface.encodeFunctionData("buy", [listing.listingId]), (tx) => {
        setHash(tx);
        setStatus("Submitted. Waiting for confirmation…");
      }, BigInt(listing.priceWei));
      setStatus("Purchase confirmed on Base.");
      onConfirmed();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Purchase failed.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const own = account?.toLowerCase() === listing.seller.toLowerCase();
  return <div className="w-full">
    {!account || !provider ? <button className="btn btn-secondary" disabled={connecting} onClick={() => void connect()}>Connect to buy</button> :
      <button className="btn btn-secondary disabled:opacity-50" disabled={busy || own} onClick={() => void buy()}>{own ? "Your listing" : busy ? "Waiting for confirmation…" : `Buy for ${listing.priceEth} ETH + gas`}</button>}
    <p role="status" aria-live="polite" className="mt-2 text-xs">{status}</p>
    {hash && <a className="text-xs underline" href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noreferrer">View transaction</a>}
  </div>;
}
