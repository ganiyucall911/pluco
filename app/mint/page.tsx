"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { useWallet } from "@/components/wallet-provider";
import { formatEth, loadChainConfig, networkFor, short, type ChainConfig } from "@/lib/chain-config";

const MINT_SELECTOR = "0xd85d3d27"; // mint(string)
const READS: Record<string, string> = {
  totalMinted: "0xa2309ff8",
  maxSupply: "0xd5abeb01",
  saleOpen: "0x99288dbb",
  mintPrice: "0x6817c76c",
};

function encodeMint(uri: string): string {
  const bytes = new TextEncoder().encode(uri);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const padded = hex.padEnd(Math.max(64, Math.ceil(hex.length / 64) * 64), "0");
  return MINT_SELECTOR + BigInt(32).toString(16).padStart(64, "0") + BigInt(bytes.length).toString(16).padStart(64, "0") + padded;
}

export default function MintPage() {
  const { account, provider, connect, switchChain, connecting, error } = useWallet();
  const [config, setConfig] = useState<ChainConfig | null>(null);
  const [uri, setUri] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [minted, setMinted] = useState<number | null>(null);
  const [supply, setSupply] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean | null>(null);
  const [priceWei, setPriceWei] = useState<bigint>(BigInt(0));
  const [priceLoaded, setPriceLoaded] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const contract = config?.originals || "";
  const net = config ? networkFor(config.chainId) : null;

  useEffect(() => {
    loadChainConfig().then(setConfig);
  }, []);

  const readChain = useCallback(async () => {
    if (!provider || !contract) return;
    try {
      const results = await Promise.all(
        Object.values(READS).map((data) =>
          provider.request({
            method: "eth_call",
            params: [{ to: contract, data }, "latest"],
          }),
        ),
      );
      setMinted(Number(BigInt(results[0] as string)));
      setSupply(Number(BigInt(results[1] as string)));
      setOpen(BigInt(results[2] as string) === BigInt(1));
      setPriceWei(BigInt(results[3] as string));
      setPriceLoaded(true);
    } catch {
      // Contract not deployed on this network yet.
    }
  }, [provider, contract]);

  useEffect(() => {
    readChain();
  }, [readChain]);

  async function mint() {
    if (!provider || !account || !contract || !config) return;
    const target = uri.trim();
    if (!target) {
      setStatus("Add the metadata URI for this piece first.");
      return;
    }
    setBusy(true);
    setStatus("Confirm the transaction in your wallet…");
    try {
      await switchChain(config.chainId);
      const hash = (await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: contract,
            data: encodeMint(target),
            value: "0x" + priceWei.toString(16),
          },
        ],
      })) as string;
      setTxHash(hash);
      setUri("");
      setStatus("Minted. It confirms in a few seconds.");
      await readChain();
    } catch (e) {
      const code = (e as { code?: number }).code;
      setStatus(code === 4001 ? "Request rejected in the wallet." : e instanceof Error ? e.message : "Mint failed.");
    } finally {
      setBusy(false);
    }
  }

  const soldOut = minted !== null && supply !== null && minted >= supply;

  return (
    <main>
      <PageHero
        eyebrow="PLUCO"
        title="One-of-one digital art, on-chain."
        body="Every piece is a single ERC-721 token with its own metadata and a 7.5% royalty that follows it forever. No editions, no reruns."
      />

      <section className="wrap py-16">
        <div className="grid gap-px border border-line bg-paper/[.06] lg:grid-cols-[1.1fr_.9fr]">
          <div className="bg-surface p-8">
            <p className="eyebrow">The drop</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-body">Minted</p>
                <p className="mt-1 text-2xl font-semibold">
                  {minted ?? "—"} / {supply ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-body">Price</p>
                <p className="mt-1 text-2xl font-semibold">{priceLoaded ? formatEth(priceWei) + " ETH" : "—"}</p>
                <p className="mt-1 text-xs text-faint">paid in {net ? net.currency : "ETH"}</p>
              </div>
              <div>
                <p className="text-body">Sale</p>
                <p className="mt-1 text-2xl font-semibold">{open === null ? "—" : open ? "Open" : "Closed"}</p>
              </div>
              <div>
                <p className="text-body">Network</p>
                <p className="mt-1 text-2xl font-semibold">{net ? net.short : "—"}</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-body">
              Price and per-wallet limit are fixed in the contract, so nobody can change them mid-drop.
              {contract && net ? (
                <>
                  {" "}Contract{" "}
                  <a
                    className="link-underline text-paper"
                    href={net.explorer + "/address/" + contract}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {short(contract)}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </div>

          <div className="bg-surface p-8">
            {!contract ? (
              <>
                <p className="text-sm leading-6 text-body">
                  No collection is configured yet. Deploy one from the launch page — it takes one wallet signature and the
                  mint page picks it up automatically.
                </p>
                <Link
                  href="/launch"
                  className="focus-ring mt-5 inline-flex rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink"
                >
                  Launch a collection
                </Link>
              </>
            ) : !account ? (
              <button
                onClick={() => connect()}
                disabled={connecting}
                className="focus-ring w-full rounded-full bg-paper px-6 py-4 text-sm font-semibold text-ink disabled:opacity-50"
              >
                {connecting ? "Connecting…" : "Connect wallet"}
              </button>
            ) : soldOut ? (
              <p className="text-sm text-body">Sold out. Secondary listings live on OpenSea and Rarible.</p>
            ) : (
              <>
                <label className="block">
                  <span className="text-xs text-body">Metadata URI for this piece</span>
                  <input
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    placeholder="ipfs://… or https://…"
                    className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                  />
                </label>
                <button
                  onClick={mint}
                  disabled={busy || open === false || !uri.trim()}
                  className="focus-ring mt-4 w-full rounded-full bg-paper px-6 py-4 text-sm font-semibold text-ink disabled:opacity-50"
                >
                  {busy
                    ? "Waiting for wallet…"
                    : open === false
                      ? "Sale not open yet"
                      : priceLoaded
                        ? "Mint for " + formatEth(priceWei) + " ETH"
                        : "Mint a piece"}
                </button>
              </>
            )}

            <p className="mt-4 text-xs leading-5 text-faint">
              Signed in as {account ? short(account) : "no wallet"}.
            </p>
            {error ? <p className="mt-3 text-sm leading-6 text-body">{error}</p> : null}
            {status ? <p className="mt-4 text-sm leading-6 text-paper">{status}</p> : null}
            {txHash && net ? (
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3 text-[13px]">
                <a className="link-underline text-body hover:text-paper" href={net.explorer + "/tx/" + txHash} target="_blank" rel="noreferrer">
                  View transaction
                </a>
                <a
                  className="link-underline text-body hover:text-paper"
                  href={"https://opensea.io/search?query=" + contract + "&type=item"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find on OpenSea
                </a>
              </div>
            ) : null}
            {txHash ? (
              <p className="mt-2 text-[11px] leading-5 text-faint">
                OpenSea indexes a contract a few hours after its first mint. Until it does, the search above returns nothing —
                the piece exists onchain regardless.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
