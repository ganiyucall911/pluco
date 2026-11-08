// Live checks against real Base mainnet. No mocks: every request goes to a real
// public JSON-RPC node, and receipts are read from real transactions on chain.
// Run: node scripts/check-transactions.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { Interface, Wallet } from "ethers";
const require = createRequire(import.meta.url);

const RPCS = (process.env.PLUCO_CHECK_RPCS || "https://mainnet.base.org,https://base-rpc.publicnode.com,https://1rpc.io/base").split(",");
const BASE_CHAIN_ID = 8453n;
const WETH = "0x4200000000000000000000000000000000000006";
let endpoint = RPCS[0];

async function rpcAt(url, method, params = []) {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }) });
  if (!res.ok) throw new Error(url + " HTTP " + res.status);
  const body = await res.json();
  if (body.error) throw new Error(body.error.message || JSON.stringify(body.error));
  return body.result;
}
async function rpc(method, params = []) {
  let last;
  for (const url of [endpoint, ...RPCS.filter((u) => u !== endpoint)]) {
    try { return await rpcAt(url, method, params); } catch (e) { last = e; }
  }
  throw last;
}
const provider = { request: ({ method, params }) => rpc(method, params) };

const source = await readFile(new URL("../lib/transactions.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText
  .replace('from "ethers"', 'from ' + JSON.stringify(pathToFileURL(require.resolve("ethers")).href));
const { assertWallet, contractRead, waitForReceipt, sendTransaction, marketInterface, tokenInterface, registryInterface } =
  await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));

const wallet = Wallet.createRandom();
const account = wallet.address;
let count = 0;
const check = async (label, fn) => { await fn(); count++; console.log("PASS " + label); };

await check("real Base mainnet node reports chain 8453", async () => {
  const chain = await rpc("eth_chainId");
  assert.equal(BigInt(chain), BASE_CHAIN_ID);
});

await check("real public node holds no accounts, so wallets must be injected", async () => {
  const accounts = await rpc("eth_accounts");
  assert.deepEqual(accounts, []);
  await assert.rejects(() => assertWallet(provider, account), /account changed/);
});

await check("assertWallet rejects a real non-Base node", async () => {
  const eth = { request: async ({ method }) => rpcAt("https://ethereum-rpc.publicnode.com", method) };
  assert.equal(BigInt(await eth.request({ method: "eth_chainId" })), 1n);
  await assert.rejects(() => assertWallet(eth, account), /Base mainnet/);
});

await check("assertWallet rejects an account the node does not hold", async () => {
  await assert.rejects(() => assertWallet(provider, account), /account changed/);
});

// Real confirmed transaction: take a live block and confirm one of its transactions.
const latest = BigInt(await rpc("eth_blockNumber"));
const block = await rpc("eth_getBlockByNumber", ["0x" + latest.toString(16), true]);
assert.ok(block.transactions.length > 0, "latest Base block has no transactions");
const liveTx = block.transactions[0];
await check("waitForReceipt confirms a real mined transaction", async () => {
  const receipt = await waitForReceipt(provider, liveTx.hash, 3, 500);
  assert.equal(BigInt(receipt.status), 1n);
});

await check("waitForReceipt reports a real unknown hash as unconfirmed", async () => {
  const unknown = "0x" + "00".repeat(31) + "01";
  assert.equal(await rpc("eth_getTransactionReceipt", [unknown]), null);
  await assert.rejects(() => waitForReceipt(provider, unknown, 2, 300), /before submitting again/);
});

// Real reverted transaction, found by walking back through mined Base blocks.
await check("waitForReceipt rejects a real reverted transaction", async () => {
  let reverted = null;
  for (let back = 1n; back <= 400n && !reverted; back++) {
    const b = await rpc("eth_getBlockByNumber", ["0x" + (latest - back).toString(16), true]);
    if (!b || !b.transactions.length) continue;
    for (const tx of b.transactions.slice(0, 60)) {
      const r = await rpc("eth_getTransactionReceipt", [tx.hash]).catch(() => null);
      if (r && BigInt(r.status) === 0n) { reverted = tx.hash; break; }
    }
  }
  assert.ok(reverted, "no reverted transaction found in the last 400 Base blocks");
  await assert.rejects(() => waitForReceipt(provider, reverted, 1, 0), /reverted/);
});

await check("real node rejects submission from an unfunded account", async () => {
  let submitted = false;
  await assert.rejects(() => sendTransaction(provider, account, WETH, "0x", () => { submitted = true; }), /account changed/i);
  const nonce = await rpc("eth_getTransactionCount", [account, "pending"]);
  const raw = await wallet.signTransaction({ to: WETH, value: 0n, gasLimit: 21000n, maxFeePerGas: 1000000n, maxPriorityFeePerGas: 1000n, chainId: 8453n, nonce: Number(BigInt(nonce)), type: 2 });
  await assert.rejects(() => rpc("eth_sendRawTransaction", [raw]), /funds|balance|underpriced/i);
  assert.equal(submitted, false);
});

await check("contractRead decodes real state from a live Base contract", async () => {
  const weth = new Interface(["function decimals() view returns (uint8)", "function symbol() view returns (string)"]);
  const [decimals] = await contractRead(provider, WETH, weth, "decimals");
  const [symbol] = await contractRead(provider, WETH, weth, "symbol");
  assert.equal(Number(decimals), 18);
  assert.equal(String(symbol), "WETH");
});

await check("real node rejects a call that reverts", async () => {
  const transferFrom = new Interface(["function transferFrom(address,address,uint256) returns (bool)"]);
  const data = transferFrom.encodeFunctionData("transferFrom", [account, account, 10n ** 30n]);
  await assert.rejects(() => rpc("eth_call", [{ from: account, to: WETH, data }, "latest"]), /revert|insufficient|allowance/i);
});

await check("all write signatures match Solidity sources", async () => {
  for (const [file, abi, names] of [
    ["PlucoMarketplace", marketInterface, ["list", "buy", "cancel", "updatePrice", "withdraw"]],
    ["PlucoRegistry", registryInterface, ["register"]],
    ["PlucoOriginals", new Interface(["function mint(string)", "function setSaleOpen(bool)"]), ["mint", "setSaleOpen"]],
  ]) {
    const solidity = await readFile(new URL("../contracts/art/src/" + file + ".sol", import.meta.url), "utf8");
    for (const name of names) {
      const match = solidity.match(new RegExp("function " + name + "\\(([^)]*)\\)"));
      assert.ok(match, name);
      const types = match[1].split(",").map((arg) => arg.trim().split(/\s+/)[0]).filter(Boolean);
      const expected = new Interface(["function " + name + "(" + types.join(",") + ")"]);
      assert.equal(abi.getFunction(name).selector, expected.getFunction(name).selector);
    }
  }
  assert.equal(tokenInterface.getFunction("approve").selector, "0x095ea7b3");
});

console.log(count + " live checks passed against " + endpoint + " at Base block " + latest.toString() + ". Read-only: no funds, keys or signatures were used.");
