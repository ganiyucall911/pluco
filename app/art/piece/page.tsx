"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ART,
  CHAIN_NAME,
  EXPLORER,
  MARKET,
  SEL,
  decodeAddress,
  decodeListing,
  decodeString,
  decodeUint,
  encodeUint,
  encodeUintPair,
  ensureArtChain,
  formatEth,
  getEth,
  parseEth,
  readCall,
  toGateway,
} from "@/lib/art";

type Meta = { name: string; description: string; image: string; uri: string };

function ArtworkPageInner() {
  const search = useSearchParams();
  const id = Number(search?.get("id") ?? 0);

  const [account, setAccount] = useState("");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [owner, setOwner] = useState("");
  const [listing, setListing] = useState<{ seller: string; price: bigint }>({ seller: "", price: BigInt(0) });
  const [priceInput, setPriceInput] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(
    async (from?: string) => {
      const eth = getEth();
      if (!eth || !ART || !Number.isFinite(id) || id < 1) return;
      try {
        const [rawUri, rawOwner] = await Promise.all([
          readCall(eth, ART, encodeUint(SEL.tokenURI, id)),
          readCall(eth, ART, encodeUint(SEL.ownerOf, id)),
        ]);
        const uri = decodeString(rawUri);
        setOwner(decodeAddress(rawOwner));
        let parsed: Meta = { name: `PLUCO Originals #${id}`, description: "", image: toGateway(uri), uri };
        try {
          const res = await fetch(toGateway(uri));
          if (res.ok) {
            const json = (await res.json()) as { name?: string; description?: string; image?: string };
            parsed = {
              name: json.name ?? parsed.name,
              description: json.description ?? "",
              image: toGateway(json.image ?? uri),
              uri,
            };
          }
        } catch {
          // metadata not pinned yet
        }
        setMeta(parsed);

        if (MARKET) {
          const raw = await readCall(eth, MARKET, encodeUint(SEL.listings, id), from);
          setListing(decodeListing(raw));
        }
      } catch {
        setStatus("This piece could not be read on " + CHAIN_NAME + ".");
      }
    },
    [id]
  );

  useEffect(() => {
    const eth = getEth();
    if (!eth) return;
    eth
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        const list = accounts as string[];
        if (list.length) setAccount(list[0]);
      })
      .catch(() => {});
    load();
  }, [load]);

  async function connect() {
    const eth = getEth();
    if (!eth) {
      setStatus("No browser wallet found. Install MetaMask or Rabby, then reload.");
      return;
    }
    try {
      const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
      setAccount(accounts[0] ?? "");
      await ensureArtChain(eth);
      await load(accounts[0]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not connect the wallet.");
    }
  }

  async function send(to: string, data: string, value?: bigint) {
    const eth = getEth();
    if (!eth) return;
    setBusy(true);
    setStatus("Confirm in your wallet…");
    try {
      await ensureArtChain(eth);
      const tx = { from: account, to, data, value: value && value > 0 ? "0x" + value.toString(16) : undefined };
      const hash = (await eth.request({ method: "eth_sendTransaction", params: [tx] })) as string;
      setStatus("Submitted " + hash.slice(0, 10) + "… waiting for confirmation");
      for (let i = 0; i < 40; i++) {
        const receipt = (await eth.request({ method: "eth_getTransactionReceipt", params: [hash] })) as
          | { status?: string }
          | null;
        if (receipt) {
          setStatus(receipt.status === "0x1" ? "Confirmed onchain." : "Transaction reverted.");
          await load(account);
          setBusy(false);
          return;
        }
        await new Promise((r) => setTimeout(r, 2500));
      }
      setStatus("Still pending — check the explorer.");
    } catch (error) {
      setStatus(error instanceof Error && error.message ? error.message : "Transaction cancelled.");
    }
    setBusy(false);
  }

  async function approveAndList() {
    const eth = getEth();
    if (!eth) return;
    const price = priceInput ? parseEth(priceInput) : BigInt(0);
    if (price <= BigInt(0)) {
      setStatus("Enter a price in ETH.");
      return;
    }
    try {
      const approved = decodeUint(
        await readCall(eth, ART, SEL.isApprovedForAll + account.slice(2).padStart(64, "0") + MARKET.slice(2).padStart(64, "0"))
      );
      if (approved !== BigInt(1)) {
        await send(ART, SEL.setApprovalForAll + MARKET.slice(2).padStart(64, "0") + "1".padStart(64, "0"));
      }
    } catch {
      setStatus("Could not check approval.");
      return;
    }
    await send(MARKET, encodeUintPair(SEL.list, id, price));
  }

  const isOwner = account && owner && account.toLowerCase() === owner.toLowerCase();
  const listed = listing.seller !== "" && listing.seller !== "0x0000000000000000000000000000000000000000";

  return (
    <main>
      <section className="px-6 pt-16 pb-32">
        <div className="mx-auto max-w-6xl">
          <Link href="/art" className="text-sm text-[#9EA6A2] hover:text-white">
            ← Collection
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div className="overflow-hidden rounded-[32px] border border-white/[.08] bg-[#0a0c0b]">
              <div className="aspect-square w-full">
                {meta?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={meta.image} alt={meta.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[.25em] text-[#4b544f]">
                    {Number.isFinite(id) ? `Piece #${id}` : "Piece"}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[.22em] text-[#78EBC1]">PLUCO Originals · 1 of 1</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">{meta?.name ?? `Piece #${id}`}</h1>
              {meta?.description ? <p className="mt-4 text-sm leading-6 text-[#9EA6A2]">{meta.description}</p> : null}

              <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-4">
                  <dt className="text-xs uppercase tracking-[.16em] text-[#6f7974]">Owner</dt>
                  <dd className="mt-2 truncate text-white">
                    {owner ? `${owner.slice(0, 6)}…${owner.slice(-4)}` : "—"}
                  </dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.02] p-4">
                  <dt className="text-xs uppercase tracking-[.16em] text-[#6f7974]">Royalty</dt>
                  <dd className="mt-2 text-white">7.5% on resale</dd>
                </div>
              </dl>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[.02] p-6">
                {!account ? (
                  <button onClick={connect} className="focus-ring w-full rounded-full bg-[#78EBC1] px-6 py-4 text-sm font-semibold text-black">
                    Connect wallet
                  </button>
                ) : listed && !isOwner ? (
                  <div>
                    <p className="text-sm text-[#9EA6A2]">
                      Listed for <span className="text-white">{formatEth(listing.price)} ETH</span>
                    </p>
                    <button
                      onClick={() => MARKET && send(MARKET, encodeUint(SEL.buy, id), listing.price)}
                      disabled={busy}
                      className="focus-ring mt-4 w-full rounded-full bg-[#78EBC1] px-6 py-4 text-sm font-semibold text-black disabled:opacity-50"
                    >
                      {busy ? "Working…" : `Buy for ${formatEth(listing.price)} ETH`}
                    </button>
                  </div>
                ) : isOwner && listed ? (
                  <div>
                    <p className="text-sm text-[#9EA6A2]">
                      Your piece is listed for <span className="text-white">{formatEth(listing.price)} ETH</span>.
                    </p>
                    <button
                      onClick={() => MARKET && send(MARKET, encodeUint(SEL.cancel, id))}
                      disabled={busy}
                      className="focus-ring mt-4 w-full rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Cancel listing
                    </button>
                  </div>
                ) : isOwner ? (
                  <div>
                    <label className="text-xs uppercase tracking-[.16em] text-[#6f7974]" htmlFor="price">
                      List for sale (ETH)
                    </label>
                    <div className="mt-3 flex gap-3">
                      <input
                        id="price"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        inputMode="decimal"
                        placeholder="0.25"
                        className="focus-ring w-full rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-white placeholder:text-[#4b544f]"
                      />
                      <button
                        onClick={approveAndList}
                        disabled={busy || !MARKET}
                        className="focus-ring shrink-0 rounded-full bg-[#78EBC1] px-6 py-3 text-sm font-semibold text-black disabled:opacity-50"
                      >
                        List
                      </button>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-[#6f7974]">
                      Sale settles onchain: royalty to the artist, 2.5% platform fee, the rest to you.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-[#9EA6A2]">Not listed for sale right now.</p>
                )}

                {status ? <p className="mt-4 text-xs leading-5 text-[#78EBC1]">{status}</p> : null}
              </div>

              <p className="mt-6 text-xs text-[#6f7974]">
                <a
                  href={`${EXPLORER}/token/${ART}?a=${id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[#78EBC1]"
                >
                  View token #{id} on {CHAIN_NAME === "Base" ? "Basescan" : "Base Sepolia explorer"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ArtworkPage() {
  return (
    <Suspense fallback={<main className="px-6 pt-16 pb-32 text-sm text-[#9EA6A2]">Loading piece…</main>}>
      <ArtworkPageInner />
    </Suspense>
  );
}
