"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { useWallet } from "@/components/wallet-provider";
import { formatEth, loadChainConfig, networkFor, short, type ChainConfig } from "@/lib/chain-config";
import { PLUCO_OPENSEA, PLUCO_OPENSEA_CREATED, openseaContractSearch } from "@/lib/opensea";

import { getProvider } from "@/lib/onchain";
import { assertWallet, waitForReceipt } from "@/lib/transactions";

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
  const lock = useRef(false);
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
  const [confirmed, setConfirmed] = useState(false);

  const contract = config?.originals || "";
  const net = config ? networkFor(config.chainId) : null;

  useEffect(() => {
    loadChainConfig().then(setConfig);
  }, []);

  const readChain = useCallback(async () => {
    if (!contract) return;
    try {
      const results = await Promise.all(
        Object.values(READS).map((data) =>
          getProvider().call({ to: contract, data }),
        ),
      );
      setMinted(Number(BigInt(results[0] as string)));
      setSupply(Number(BigInt(results[1] as string)));
      setOpen(BigInt(results[2] as string) === BigInt(1));
      setPriceWei(BigInt(results[3] as string));
      setPriceLoaded(true);
    } catch {
      setPriceLoaded(false);
      setStatus("Could not read the collection on Base. Reload to retry before minting.");
    }
  }, [contract]);

  useEffect(() => {
    readChain();
  }, [readChain]);

  async function mint() {
    if (lock.current || !provider || !account || !contract || !config) return;
    if (!priceLoaded) { setStatus("Wait for the collection price to load on Base before minting."); return; }
    const target = uri.trim();
    if (!target) {
      setStatus("Add the metadata URI for this piece first.");
      return;
    }
    lock.current = true;
    setBusy(true);
    setTxHash(null);
    setConfirmed(false);
    setStatus("Confirm the transaction in your wallet…");
    try {
      await switchChain(config.chainId);
      await assertWallet(provider, account);
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
      setStatus("Submitted. Waiting for confirmation…");
      await waitForReceipt(provider, hash);
      setConfirmed(true);
      setUri("");
      setStatus("Mint confirmed on Base.");
      await readChain();
    } catch (e) {
      const code = (e as { code?: number }).code;
      setStatus(code === 4001 ? "Request rejected in the wallet." : e instanceof Error ? e.message : "Mint failed.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  const soldOut = minted !== null && supply !== null && minted >= supply;

  return (
    <main>
      <PageHero
        eyebrow="PLUCO"
        title="One-of-one digital art, on-chain."
        body="Every piece is a single ERC-721 token with its own metadata and a default 7.5% royalty, changeable by the owner and honored by supporting marketplaces. No editions, no reruns."
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
                  Every piece PLUCO mints is listed on the{" "}
                  <a
                    className="link-underline text-paper"
                    href={PLUCO_OPENSEA}
                    target="_blank"
                    rel="noreferrer"
                  >
                    PLUCO page on OpenSea
                  </a>
                  . Price and per-wallet limit are fixed in the contract, so nobody can change them mid-drop.
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
                {connecting ? "Connecting…" : "Log in"} 
              </button>
            ) : soldOut ? (
                  <p className="text-sm leading-6 text-body">
                    Sold out. Every piece lives on the{" "}
                    <a
                      className="link-underline text-paper"
                      href={PLUCO_OPENSEA}
                      target="_blank"
                      rel="noreferrer"
                    >
                      PLUCO page on OpenSea
                    </a>
                    , where secondary listings are made.
                  </p>
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
                  disabled={busy || !priceLoaded || open !== true || soldOut || !uri.trim()}
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
                      href={PLUCO_OPENSEA_CREATED}
                      target="_blank"
                      rel="noreferrer"
                    >
                      PLUCO on OpenSea
                    </a>
                    <a
                      className="link-underline text-body hover:text-paper"
                      href={openseaContractSearch(contract)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      This contract
                    </a>
                  </div>
                ) : null}
                {confirmed ? (
                  <p className="mt-2 text-[11px] leading-5 text-faint">
                    The token is in your wallet now. OpenSea indexes a contract a few hours after its first mint, after
                    which it appears under PLUCO on OpenSea. Nothing is minted outside the PLUCO account.
                  </p>
                ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
