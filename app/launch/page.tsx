"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { useWallet } from "@/components/wallet-provider";
import { BASE_MAINNET, BASE_SEPOLIA, isAddress, networkFor, parseEth } from "@/lib/chain-config";

const WORD = 64;

function hex(n: bigint) {
  return n.toString(16).padStart(WORD, "0");
}

function padRight(value: string) {
  return value.padEnd(Math.ceil(value.length / WORD) * WORD || WORD, "0");
}

function encAddress(value: string) {
  return value.replace(/^0x/, "").toLowerCase().padStart(WORD, "0");
}

function encString(value: string) {
  const bytes = new TextEncoder().encode(value);
  const body = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return hex(BigInt(bytes.length)) + padRight(body);
}

// Constructor: (string, string, uint256, uint256, uint256, address, address, address, uint96)
function encodeDeploy(input: {
  name: string;
  symbol: string;
  supply: number;
  priceWei: bigint;
  perWallet: number;
  owner: string;
  royalty: string;
  treasury: string;
  feeBps: number;
}) {
  const name = encString(input.name);
  const symbol = encString(input.symbol);
  const headBytes = 9 * 32;
  const head =
    hex(BigInt(headBytes)) +
    hex(BigInt(headBytes + name.length / 2)) +
    hex(BigInt(input.supply)) +
    hex(input.priceWei) +
    hex(BigInt(input.perWallet)) +
    encAddress(input.owner) +
    encAddress(input.royalty) +
    encAddress(input.treasury) +
    hex(BigInt(input.feeBps));
  return head + name + symbol;
}

type Artifact = { abi: unknown[]; bytecode: string };

const TREASURY_DEFAULT = "0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9";

export default function LaunchPage() {
  const { account, provider, connect, switchChain, connecting } = useWallet();
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [chainId, setChainId] = useState<number>(BASE_SEPOLIA);
  const [name, setName] = useState("PLUCO Originals");
  const [symbol, setSymbol] = useState("PLUCO");
  const [supply, setSupply] = useState("100");
  const [price, setPrice] = useState("0.005");
  const [perWallet, setPerWallet] = useState("3");
  const [royalty, setRoyalty] = useState("");
  const [treasury, setTreasury] = useState(TREASURY_DEFAULT);
  const [feeBps, setFeeBps] = useState("500");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [saleOpen, setSaleOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const net = networkFor(chainId);

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_BASE_PATH || "") + "/contracts/PlucoOriginals.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setArtifact(data))
      .catch(() => setArtifact(null));
  }, []);

  useEffect(() => {
    if (account && !royalty) setRoyalty(account);
  }, [account, royalty]);

  const preview = useMemo(() => {
    try {
      return parseEth(price);
    } catch {
      return BigInt(0);
    }
  }, [price]);

  const configSnippet = useMemo(
    () =>
      JSON.stringify(
        { chainId, originals: address, registry: "", marketplace: "" },
        null,
        2,
      ),
    [chainId, address],
  );

  async function send(data: string) {
    if (!provider || !account) throw new Error("Connect a wallet first.");
    return (await provider.request({
      method: "eth_sendTransaction",
      params: [{ from: account, data }],
    })) as string;
  }

  async function waitFor(addressHash: string) {
    if (!provider) return null;
    for (let i = 0; i < 40; i++) {
      const receipt = (await provider.request({
        method: "eth_getTransactionReceipt",
        params: [addressHash],
      })) as { status?: string; contractAddress?: string } | null;
      if (receipt) return receipt;
      await new Promise((r) => setTimeout(r, 2500));
    }
    return null;
  }

  async function deploy() {
    setStatus("");
    setTxHash("");
    setAddress("");
    if (!artifact) {
      setStatus("Contract artifact did not load. Reload the page.");
      return;
    }
    if (!account) {
      await connect();
      return;
    }
    const supplyNum = Number(supply);
    const perWalletNum = Number(perWallet);
    const fee = Number(feeBps);
    if (!name.trim() || !symbol.trim()) return setStatus("Give the collection a name and a symbol.");
    if (!Number.isInteger(supplyNum) || supplyNum < 1 || supplyNum > 100000)
      return setStatus("Supply must be a whole number between 1 and 100000.");
    if (perWalletNum < 0 || perWalletNum > supplyNum) return setStatus("Per-wallet limit must be between 0 and the supply.");
    if (!isAddress(royalty)) return setStatus("Royalty receiver must be a valid address.");
    if (!isAddress(treasury)) return setStatus("Treasury must be a valid address.");
    if (!Number.isInteger(fee) || fee < 0 || fee > 1000) return setStatus("Mint fee must be 0–1000 basis points (10% max).");

    setBusy(true);
    try {
      setStatus("Switching your wallet to " + net.name + "…");
      await switchChain(chainId);
      setStatus("Confirm the deployment in your wallet…");
      const data =
        artifact.bytecode +
        encodeDeploy({
          name: name.trim(),
          symbol: symbol.trim().toUpperCase(),
          supply: supplyNum,
          priceWei: preview,
          perWallet: perWalletNum,
          owner: account,
          royalty,
          treasury,
          feeBps: fee,
        });
      const hash = await send(data);
      setTxHash(hash);
      setStatus("Deploying — waiting for the block…");
      const receipt = await waitFor(hash);
      if (!receipt) {
        setStatus("Still pending. Check the transaction on the explorer; the address appears there once it confirms.");
        return;
      }
      if (receipt.status !== "0x1") {
        setStatus("The deployment reverted. Nothing was deployed and no gas beyond the failed attempt was spent.");
        return;
      }
      const deployed = receipt.contractAddress || "";
      setAddress(deployed);
      setStatus("Deployed. Open the sale when you are ready to take mints.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Deployment failed.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleSale(open: boolean) {
    if (!provider || !address) return;
    setBusy(true);
    try {
      const data = "0xaf979f25" + hex(open ? BigInt(1) : BigInt(0));
      const hash = (await provider.request({
        method: "eth_sendTransaction",
        params: [{ from: account, to: address, data }],
      })) as string;
      setStatus((open ? "Opening" : "Closing") + " the sale — transaction " + hash.slice(0, 10) + "…");
      await waitFor(hash);
      setSaleOpen(open);
      setStatus(open ? "Sale is open. The mint page will take payments now." : "Sale closed.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not change the sale state.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Launch"
        title="Put a collection on Base."
        body="This page deploys a collection contract straight from your wallet. No server, no middleman — you sign, you own it."
      />

      <section className="wrap py-16">
        <div className="grid gap-px border border-line bg-paper/[.06] lg:grid-cols-[1.05fr_.95fr]">
          <div className="bg-surface p-8">
            <p className="eyebrow">Collection</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs text-body">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                />
              </label>
              <label className="block">
                <span className="text-xs text-body">Symbol</span>
                <input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                />
              </label>
              <label className="block">
                <span className="text-xs text-body">Supply</span>
                <input
                  value={supply}
                  onChange={(e) => setSupply(e.target.value)}
                  inputMode="numeric"
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                />
              </label>
              <label className="block">
                <span className="text-xs text-body">Price (ETH)</span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  inputMode="decimal"
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                />
              </label>
              <label className="block">
                <span className="text-xs text-body">Max per wallet</span>
                <input
                  value={perWallet}
                  onChange={(e) => setPerWallet(e.target.value)}
                  inputMode="numeric"
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                />
              </label>
              <label className="block">
                <span className="text-xs text-body">Mint fee (bps)</span>
                <input
                  value={feeBps}
                  onChange={(e) => setFeeBps(e.target.value)}
                  inputMode="numeric"
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-paper"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs text-body">Royalty receiver</span>
                <input
                  value={royalty}
                  onChange={(e) => setRoyalty(e.target.value)}
                  placeholder="defaults to your wallet"
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 font-mono text-xs text-paper"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs text-body">Treasury (mint fees go here)</span>
                <input
                  value={treasury}
                  onChange={(e) => setTreasury(e.target.value)}
                  className="focus-ring mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 font-mono text-xs text-paper"
                />
              </label>
            </div>

            <div className="mt-6 flex gap-2">
              {[
                [BASE_SEPOLIA, "Base Sepolia"],
                [BASE_MAINNET, "Base mainnet"],
              ].map(([id, label]) => (
                <button
                  key={String(id)}
                  onClick={() => setChainId(Number(id))}
                  className={
                    "focus-ring rounded-full border px-4 py-2 text-xs transition " +
                    (chainId === Number(id) ? "border-paper bg-paper text-ink" : "border-line text-body hover:text-paper")
                  }
                >
                  {String(label)}
                </button>
              ))}
            </div>

            <button
              onClick={deploy}
              disabled={busy}
              className="focus-ring mt-6 w-full rounded-full bg-paper px-6 py-4 text-sm font-semibold text-ink disabled:opacity-50"
            >
              {busy ? "Waiting for your wallet…" : account ? "Deploy collection on " + net.name : connecting ? "Connecting…" : "Log in"} 
            </button>

            {status ? <p className="mt-4 text-sm leading-6 text-paper">{status}</p> : null}
            {txHash ? (
              <a
                className="link-underline mt-3 inline-block text-[13px] text-body hover:text-paper"
                href={net.explorer + "/tx/" + txHash}
                target="_blank"
                rel="noreferrer"
              >
                View transaction
              </a>
            ) : null}
          </div>

          <div className="bg-surface p-8">
            <p className="eyebrow">What you get</p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-body">
              <li>One-of-one tokens, each with its own metadata URI. No editions.</li>
              <li>7.5% EIP-2981 royalty that follows every resale.</li>
              <li>
                {feeBps || "0"} bps of every primary mint paid straight to treasury, capped at 1000.
              </li>
              <li>Price and supply fixed at deploy, so nobody can move them mid-drop.</li>
              <li>Owner reserve: you can mint pieces to yourself without paying.</li>
            </ul>

            {address ? (
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow">Deployed</p>
                <p className="mt-3 break-all font-mono text-sm text-paper">{address}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                  <a
                    className="link-underline text-body hover:text-paper"
                    href={net.explorer + "/address/" + address}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explorer
                  </a>
                  <button
                    className="link-underline text-body hover:text-paper"
                    onClick={() => toggleSale(!saleOpen)}
                    disabled={busy}
                  >
                    {saleOpen ? "Close the sale" : "Open the sale"}
                  </button>
                  <button
                    className="link-underline text-body hover:text-paper"
                    onClick={() => {
                      navigator.clipboard?.writeText(configSnippet);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? "Copied" : "Copy site config"}
                  </button>
                  <Link className="link-underline text-body hover:text-paper" href="/mint">
                    Mint page
                  </Link>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-ink p-4 text-[11px] leading-5 text-body">
                  {configSnippet}
                </pre>
                <p className="mt-3 text-[11px] leading-5 text-faint">
                  Paste that into public/config.json (or send it to me) and the mint page picks the contract up without a rebuild.
                </p>
              </div>
            ) : (
              <p className="mt-8 text-xs leading-5 text-faint">
                Test on {networkFor(BASE_SEPOLIA).name} first — the gas is free and the addresses behave exactly like mainnet.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
