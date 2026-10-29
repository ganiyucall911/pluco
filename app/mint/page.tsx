"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";

// Contract + network come from the deploy. Set these in .env.local after deploying.
const CONTRACT = process.env.NEXT_PUBLIC_PLUCO_ART_CONTRACT || "";
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_PLUCO_CHAIN_ID || 8453); // 8453 = Base mainnet, 84532 = Base Sepolia
const CHAIN_NAME = CHAIN_ID === 8453 ? "Base" : "Base Sepolia testnet";
const CURRENCY = CHAIN_ID === 8453 ? "ETH on Base" : "test ETH";
const EXPLORER = CHAIN_ID === 8453 ? "https://basescan.org" : "https://sepolia.basescan.org";
const MINT_SELECTOR = "0xd85d3d27"; // mint(string)
const READ_SELECTORS = {
  totalMinted: "0xa2309ff8",
  maxSupply: "0xd5abeb01",
  saleOpen: "0x99288dbb",
  mintPrice: "0x6817c76c",
};

type Eth = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
};

function getEth(): Eth | undefined {
  return (window as unknown as { ethereum?: Eth }).ethereum;
}

// ABI-encode mint(string uri) without pulling a library into the client bundle.
function encodeMint(uri: string): string {
  const bytes = new TextEncoder().encode(uri);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const padded = hex.padEnd(Math.ceil(hex.length / 64) * 64, "0");
  const offset = BigInt(32).toString(16).padStart(64, "0");
  const length = BigInt(bytes.length).toString(16).padStart(64, "0");
  return MINT_SELECTOR + offset + length + padded;
}

function formatEth(wei: bigint): string {
  const whole = wei / BigInt(1e18);
  const frac = (wei % BigInt(1e18)).toString().padStart(18, "0").replace(/0+$/, "");
  return frac ? whole.toString() + "." + frac : whole.toString();
}

function decodeUint(result: string): number {
  return Number(BigInt(result));
}

export default function MintPage() {
  const [account, setAccount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [minted, setMinted] = useState<number | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [supply, setSupply] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean | null>(null);
  const [priceWei, setPriceWei] = useState<bigint>(BigInt(0));
  const [priceLoaded, setPriceLoaded] = useState(false);

  const readChain = useCallback(async (from?: string) => {
    const eth = getEth();
    if (!eth || !CONTRACT) return;
    const base = { to: CONTRACT };
    try {
          const [m, s, o, p] = await Promise.all(
            Object.values(READ_SELECTORS).map((data) =>
          eth.request({ method: "eth_call", params: [{ ...base, data }, from ?? "0x0000000000000000000000000000000000000000", "latest"] })
        )
      );
      setMinted(decodeUint(m as string));
      setSupply(decodeUint(s as string));
          setOpen(BigInt(o as string) === BigInt(1));
          setPriceWei(BigInt(p as string));
          setPriceLoaded(true);
    } catch {
      // Contract not reachable on this network yet.
    }
  }, []);

  useEffect(() => {
    const eth = getEth();
    if (!eth) return;
    eth.request({ method: "eth_accounts" }).then((accounts) => {
      const list = accounts as string[];
      if (list.length) setAccount(list[0]);
    });
    readChain();
  }, [readChain]);

  async function connect() {
    const eth = getEth();
    if (!eth) {
      setStatus("No browser wallet found. Install MetaMask or Rabby, then reload.");
      return;
    }
    try {
      const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
      setAccount(accounts[0] ?? "");
      await ensureChain(eth);
      await readChain(accounts[0]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not connect the wallet.");
    }
  }

  async function ensureChain(eth: Eth) {
    const current = (await eth.request({ method: "eth_chainId" })) as string;
    if (parseInt(current, 16) === CHAIN_ID) return;
    try {
      await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x" + CHAIN_ID.toString(16) }] });
    } catch {
      setStatus("Switch your wallet to " + CHAIN_NAME + " and try again.");
      throw new Error("wrong chain");
    }
  }

  async function mint() {
    const eth = getEth();
    if (!eth || !CONTRACT) return;
    const uri = window.prompt("Metadata URI for this piece (ipfs://... or https://...)");
    if (!uri) return;
    setBusy(true);
    setStatus("Confirm the transaction in your wallet…");
    try {
      await ensureChain(eth);
      const txHash = (await eth.request({
        method: "eth_sendTransaction",
            params: [{
              from: account,
              to: CONTRACT,
              data: encodeMint(uri.trim()),
              value: "0x" + priceWei.toString(16),
            }],
      })) as string;
      setTxHash(txHash);
      setStatus("Minted. Transaction " + txHash.slice(0, 10) + "… — it confirms in a few seconds.");
      await readChain(account);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Mint failed.");
    } finally {
      setBusy(false);
    }
  }

  const ready = Boolean(CONTRACT);
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
                <p className="mt-1 text-2xl font-semibold">{minted ?? "—"} / {supply ?? "—"}</p>
              </div>
                  <div>
                    <p className="text-body">Price</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {priceLoaded ? formatEth(priceWei) + " ETH" : "—"}
                    </p>
                    <p className="mt-1 text-xs text-faint">paid in {CURRENCY}</p>
                  </div>
                  <div>
                    <p className="text-body">Sale</p>
                <p className="mt-1 text-2xl font-semibold">{open === null ? "—" : open ? "Open" : "Closed"}</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-body">
              Network: {CHAIN_NAME}. Price and per-wallet limit are fixed in the contract, so nobody can change them mid-drop.
              {CONTRACT ? (
                <>
                  {" "}Contract{" "}
                  <a className="text-paper underline" href={EXPLORER + "/address/" + CONTRACT} target="_blank" rel="noreferrer">
                    {CONTRACT.slice(0, 6)}…{CONTRACT.slice(-4)}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </div>

          <div className="bg-surface p-8">
            {!ready ? (
              <p className="text-sm leading-6 text-body">
                No contract configured yet. Deploy with <span className="text-paper">npm run deploy:base-sepolia</span> in contracts/art, then set
                NEXT_PUBLIC_PLUCO_ART_CONTRACT and rebuild.
              </p>
            ) : !account ? (
              <button onClick={connect} className="focus-ring w-full rounded-full bg-paper px-6 py-4 text-sm font-semibold text-black">
                Connect wallet
              </button>
            ) : soldOut ? (
              <p className="text-sm text-body">Sold out. Secondary listings live on OpenSea and Rarible.</p>
            ) : (
              <button
                onClick={mint}
                disabled={busy || open === false}
                className="focus-ring w-full rounded-full bg-paper px-6 py-4 text-sm font-semibold text-black disabled:opacity-50"
              >
                {busy
                      ? "Waiting for wallet…"
                      : open === false
                        ? "Sale not open yet"
                        : priceLoaded
                          ? "Mint for " + formatEth(priceWei) + " ETH"
                          : "Mint a piece"}
              </button>
            )}
            <p className="mt-4 text-xs leading-5 text-faint">
              Signed in as {account ? account.slice(0, 6) + "…" + account.slice(-4) : "no wallet"}.
            </p>
            {status ? <p className="mt-4 text-sm leading-6 text-paper">{status}</p> : null}
            {txHash && CONTRACT ? (
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3 text-[13px]">
                <a
                  className="link-underline text-body hover:text-paper"
                  href={EXPLORER + "/tx/" + txHash}
                  target="_blank"
                  rel="noreferrer"
                >
                  View transaction
                </a>
                <a
                  className="link-underline text-body hover:text-paper"
                  href={"https://opensea.io/search?query=" + CONTRACT + "&type=item"}
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
                the piece exists on Base regardless.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
