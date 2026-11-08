"use client";

import { useEffect, useRef, useState } from "react";
import { formatEther, isAddress, parseEther } from "ethers";
import { useWallet } from "./wallet-provider";
import { loadChainConfig, type ChainConfig } from "@/lib/chain-config";
import { assertWallet, contractRead, marketInterface, registryInterface, sendTransaction, tokenInterface } from "@/lib/transactions";

/** Explicit wallet actions only. Approvals are limited to one token, not a collection. */
export function TradingPanel({ selling = false }: { selling?: boolean }) {
  const { account, provider, connect, switchChain, connecting } = useWallet();
  const [config, setConfig] = useState<ChainConfig | null>(null);
  const [collection, setCollection] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [listingId, setListingId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Digital art");
  const [metadataURI, setMetadataURI] = useState("");
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);

  useEffect(() => { loadChainConfig().then(setConfig); }, []);

  function uint(value: string, label: string) {
    if (!/^\d+$/.test(value.trim())) throw new Error(label + " must be a whole number.");
    return BigInt(value.trim());
  }

  async function act(action: "register" | "approve" | "list" | "cancel" | "price" | "balance" | "withdraw") {
    if (lock.current || !provider || !account || !config) return;
    lock.current = true;
    setBusy(true);
    setHash("");
    setStatus("Check your wallet is on Base…");
    try {
      await switchChain(8453);
      await assertWallet(provider, account);
      const submitted = (tx: string) => { setHash(tx); setStatus("Submitted. Waiting for confirmation…"); };
      const send = (to: string, data: string) => sendTransaction(provider, account, to, data, submitted);
      if (action === "register") {
        if (!isAddress(config.registry) || !isAddress(collection)) throw new Error("A valid registry and collection address are required.");
        if (!name.trim()) throw new Error("Enter a collection name.");
        await send(config.registry, registryInterface.encodeFunctionData("register", [collection, name.trim(), category.trim(), metadataURI.trim()]));
      } else {
        if (!isAddress(config.marketplace)) throw new Error("The marketplace address is not configured.");
        const market = config.marketplace;
        if (action === "balance" || action === "withdraw") {
          const [credit] = await contractRead(provider, market, marketInterface, "credits", [account]);
          if (action === "balance") { setStatus("Available to withdraw: " + formatEther(credit) + " ETH for " + account + "."); return; }
          if (credit === BigInt(0)) throw new Error("This account has no proceeds to withdraw.");
          await send(market, marketInterface.encodeFunctionData("withdraw"));
        } else if (action === "cancel" || action === "price") {
          const id = uint(listingId, "Listing ID");
          if (id === BigInt(0)) throw new Error("Listing IDs start at 1.");
          const amount = action === "price" ? parseEther(price) : BigInt(0);
          if (action === "price" && amount <= BigInt(0)) throw new Error("Price must be greater than zero.");
          await send(market, marketInterface.encodeFunctionData(action === "cancel" ? "cancel" : "updatePrice", action === "cancel" ? [id] : [id, amount]));
        } else {
          if (!isAddress(collection)) throw new Error("Enter a valid collection address.");
          const id = uint(tokenId, "Token ID");
          const [owner] = await contractRead(provider, collection, tokenInterface, "ownerOf", [id]);
          if (owner.toLowerCase() !== account.toLowerCase()) throw new Error("This wallet does not own that token.");
          if (action === "approve") {
            await send(collection, tokenInterface.encodeFunctionData("approve", [market, id]));
          } else {
            if (!isAddress(config.registry)) throw new Error("Registry address is not configured.");
            const [active] = await contractRead(provider, config.registry, registryInterface, "isActive", [collection]);
            if (!active) throw new Error("Register and activate this collection before listing.");
            const [approved] = await contractRead(provider, collection, tokenInterface, "getApproved", [id]);
            const [all] = await contractRead(provider, collection, tokenInterface, "isApprovedForAll", [account, market]);
            if (approved.toLowerCase() !== market.toLowerCase() && !all) throw new Error("Approve this token before listing.");
            const amount = parseEther(price);
            if (amount <= BigInt(0)) throw new Error("Price must be greater than zero.");
            await send(market, marketInterface.encodeFunctionData("list", [collection, id, amount]));
          }
        }
      }
      setStatus("Confirmed on Base. Refresh marketplace listings to see the latest state.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Wallet action failed.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  const inputClass = "mt-2 w-full border border-line bg-ink p-3 text-sm";
  const button = (label: string, action: Parameters<typeof act>[0]) => <button type="button" className="btn btn-secondary disabled:opacity-50" disabled={busy} onClick={() => void act(action)}>{label}</button>;
  if (!config) return <p className="mt-8 text-sm">Loading protocol configuration…</p>;
  if (!isAddress(config.marketplace)) return <p className="mt-8 text-sm text-mute">Trading is unavailable until a marketplace address is configured. No transaction will be sent.</p>;

  return (
    <section className="mt-8 border border-line bg-surface p-6" aria-label={selling ? "Sell and manage art" : "Marketplace proceeds"}>
      <h2 className="text-xl">{selling ? "Sell and manage your art" : "Your marketplace proceeds"}</h2>
      <p className="mt-3 text-sm text-mute">Base mainnet uses real ETH. Each action requires a wallet signature and network gas. Sale proceeds are credited onchain; withdraw them separately.</p>
      <p className="mt-2 break-all font-mono text-xs text-mute">Marketplace: {config.marketplace}</p>
      {!account || !provider ? (
        <button className="btn mt-5" disabled={connecting} onClick={() => void connect()}>Connect wallet</button>
      ) : (
        <fieldset disabled={busy} className="mt-5 space-y-5">
          <legend className="sr-only">Wallet actions</legend>
          <p className="break-all text-xs">Connected: {account}</p>
          {selling && <>
            <label className="block text-sm">Collection contract address<input className={inputClass} value={collection} onChange={(e) => setCollection(e.target.value)} /></label>
            <details>
              <summary className="cursor-pointer text-sm">Register a collection you own</summary>
              <label className="mt-3 block text-sm">Collection name<input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} /></label>
              <label className="mt-3 block text-sm">Category<input className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} /></label>
              <label className="mt-3 block text-sm">Collection metadata URI<input className={inputClass} value={metadataURI} onChange={(e) => setMetadataURI(e.target.value)} /></label>
              <div className="mt-3">{button("Register collection", "register")}</div>
            </details>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">Token ID<input className={inputClass} inputMode="numeric" value={tokenId} onChange={(e) => setTokenId(e.target.value)} /></label>
              <label className="block text-sm">Price in ETH<input className={inputClass} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
            </div>
            <p className="text-xs text-mute">Approve grants this marketplace permission to transfer only the specified token when sold. Review the address above before signing. Listing requires a second signature.</p>
            <div className="flex flex-wrap gap-3">{button("1. Approve token", "approve")}{button("2. List token", "list")}</div>
            <label className="block text-sm">Existing listing ID (shown in the marketplace)<input className={inputClass} inputMode="numeric" value={listingId} onChange={(e) => setListingId(e.target.value)} /></label>
            <div className="flex flex-wrap gap-3">{button("Update to price above", "price")}{button("Cancel listing", "cancel")}</div>
          </>}
          <div className="flex flex-wrap gap-3">{button("Check available proceeds", "balance")}{button("Withdraw proceeds", "withdraw")}</div>
        </fieldset>
      )}
      <p role="status" aria-live="polite" className="mt-4 break-words text-sm">{status}</p>
      {hash && <a className="mt-2 block break-all text-xs underline" href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noreferrer">View transaction on BaseScan</a>}
    </section>
  );
}
