// Focused reproduction checks; no network, wallet, or ETH required.
// Run: node scripts/check-transactions.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { Interface } from "ethers";
const require = createRequire(import.meta.url);
const source = await readFile(new URL("../lib/transactions.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText
  .replace('from "ethers"', 'from ' + JSON.stringify(pathToFileURL(require.resolve("ethers")).href));
const { assertWallet, contractRead, waitForReceipt, sendTransaction, marketInterface, tokenInterface, registryInterface } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
const account = "0x1111111111111111111111111111111111111111";
const market = "0x2222222222222222222222222222222222222222";
const hash = "0x" + "ab".repeat(32);
let count = 0;
const check = async (label, fn) => { await fn(); count++; console.log("PASS " + label); };

await check("wrong network prevents submission", async () => {
  let sent = false;
  const rpc = { request: async ({ method }) => { if (method === "eth_chainId") return "0x1"; sent = true; } };
  await assert.rejects(() => sendTransaction(rpc, account, market, "0x", () => {}), /Base mainnet/);
  assert.equal(sent, false);
});
await check("changed account prevents submission", async () => {
  await assert.rejects(() => assertWallet({ request: async ({ method }) => method === "eth_chainId" ? "0x2105" : [market] }, account), /account changed/);
});
await check("submitted does not mean confirmed; exact ETH value and destination", async () => {
  const stages = []; let polls = 0;
  const rpc = { request: async ({ method, params }) => {
    if (method === "eth_chainId") return "0x2105";
    if (method === "eth_accounts") return [account.toUpperCase()];
    if (method === "eth_sendTransaction") {
      assert.deepEqual(params, [{ from: account, to: market, data: marketInterface.encodeFunctionData("buy", [7]), value: "0x7b" }]);
      return hash;
    }
    if (method === "eth_getTransactionReceipt") { stages.push("receipt"); polls++; return { status: "0x1" }; }
    throw Error(method);
  } };
  await sendTransaction(rpc, account, market, marketInterface.encodeFunctionData("buy", [7]), (tx) => { assert.equal(tx, hash); assert.equal(polls, 0); stages.push("submitted"); }, 123n);
  assert.deepEqual(stages, ["submitted", "receipt"]);
});
await check("pending receipt is polled before confirmation", async () => {
  let polls = 0;
  await waitForReceipt({ request: async () => ++polls === 1 ? null : { status: "0x1" } }, hash, 2, 0);
  assert.equal(polls, 2);
});
await check("reverted receipt fails", async () => {
  await assert.rejects(() => waitForReceipt({ request: async () => ({ status: "0x0" }) }, hash, 1, 0), /reverted/);
});
await check("timeout reports unknown confirmation, not failure or success", async () => {
  await assert.rejects(() => waitForReceipt({ request: async () => null }, hash, 1, 0), /before submitting again/);
});
await check("RPC failure preserves an unknown transaction outcome", async () => {
  await assert.rejects(() => waitForReceipt({ request: async () => { throw Error("offline"); } }, hash, 1, 0), /may still confirm/);
});
await check("wallet rejection never reports submission", async () => {
  const rpc = { request: async ({ method }) => {
    if (method === "eth_chainId") return "0x2105";
    if (method === "eth_accounts") return [account];
    throw Error("User rejected");
  } };
  let submitted = false;
  await assert.rejects(() => sendTransaction(rpc, account, market, "0x", () => { submitted = true; }), /User rejected/);
  assert.equal(submitted, false);
});
await check("contract reads encode and decode correctly", async () => {
  const [value] = await contractRead({ request: async ({ method, params }) => {
    assert.equal(method, "eth_call");
    assert.deepEqual(params, [{ to: market, data: marketInterface.encodeFunctionData("credits", [account]) }, "latest"]);
    return marketInterface.encodeFunctionResult("credits", [42]);
  } }, market, marketInterface, "credits", [account]);
  assert.equal(value, 42n);
});
await check("all write signatures match Solidity sources", async () => {
  for (const [file, abi, names] of [
    ["PlucoMarketplace", marketInterface, ["list", "buy", "cancel", "updatePrice", "withdraw"]],
    ["PlucoRegistry", registryInterface, ["register"]],
    ["PlucoOriginals", new Interface(["function mint(string)", "function setSaleOpen(bool)"]), ["mint", "setSaleOpen"]],
  ]) {
    const solidity = await readFile(new URL(`../contracts/art/src/${file}.sol`, import.meta.url), "utf8");
    for (const name of names) {
      const match = solidity.match(new RegExp(`function ${name}\\(([^)]*)\\)`));
      assert.ok(match, name);
      const types = match[1].split(",").map((arg) => arg.trim().split(/\s+/)[0]).filter(Boolean);
      const expected = new Interface([`function ${name}(${types.join(",")})`]);
      assert.equal(abi.getFunction(name).selector, expected.getFunction(name).selector);
    }
  }
  assert.equal(tokenInterface.getFunction("approve").selector, "0x095ea7b3");
});
console.log(`${count} transaction checks passed. These are mocked RPC checks, not live settlement verification.`);
