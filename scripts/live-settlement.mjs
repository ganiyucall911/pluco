// End-to-end settlement on real Base mainnet. Nothing here is mocked: every step
// signs a transaction, waits for a real receipt and asserts the resulting state.
// Usage: PRIVATE_KEY=0x... [BUYER_KEY=0x...] node scripts/live-settlement.mjs
// Costs real gas and real ETH. Read scripts/README before running.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { JsonRpcProvider, Wallet, Contract, ContractFactory, parseEther, formatEther } from "ethers";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ART = path.join(ROOT, "contracts/art/artifacts");
const RPC = process.env.RPC_URL || "https://mainnet.base.org";
const EXPLORER = "https://basescan.org/tx/";
const TREASURY = process.env.TREASURY || "0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9";

const key = process.env.PRIVATE_KEY;
if (!key) { console.error("set PRIVATE_KEY to a funded Base mainnet key"); process.exit(2); }
const buyerKey = process.env.BUYER_KEY;

const provider = new JsonRpcProvider(RPC, 8453);
const seller = new Wallet(key, provider);
const signer = buyerKey ? new Wallet(buyerKey, provider) : Wallet.createRandom().connect(provider);

const art = (n) => JSON.parse(fs.readFileSync(path.join(ART, n + ".json"), "utf8"));
const step = (n) => console.log("\n[" + n + "]");

async function send(label, tx) {
  const sent = await tx;
  const receipt = await sent.wait();
  console.log(label, receipt.status === 1 ? "confirmed" : "REVERTED", EXPLORER + receipt.hash, "block", receipt.blockNumber, "gas", receipt.gasUsed.toString());
  assert.equal(receipt.status, 1, label + " reverted");
  return receipt;
}

step("preflight");
const chain = BigInt(await provider.send("eth_chainId", []));
assert.equal(chain, 8453n, "not Base mainnet");
const startBalance = await provider.getBalance(seller.address);
const gasPrice = (await provider.getFeeData()).gasPrice ?? 0n;
console.log("seller", seller.address, "balance", formatEther(startBalance), "ETH", "gasPrice", gasPrice.toString());
console.log("buyer", signer.address, "balance", formatEther(await provider.getBalance(signer.address)), "ETH");
assert.ok(startBalance > 0n, "seller has no ETH on Base mainnet: send it a starting balance first");

step("deploy registry");
const registryArt = art("PlucoRegistry");
const registry = await new ContractFactory(registryArt.abi, registryArt.bytecode, seller).deploy(seller.address);
await registry.waitForDeployment();
console.log("PlucoRegistry", await registry.getAddress());

step("deploy marketplace");
const marketArt = art("PlucoMarketplace");
const market = await new ContractFactory(marketArt.abi, marketArt.bytecode, seller).deploy(seller.address, await registry.getAddress(), TREASURY, 250);
await market.waitForDeployment();
const marketAddress = await market.getAddress();
console.log("PlucoMarketplace", marketAddress);

step("deploy collection");
const originals = art("PlucoOriginals");
const collection = await new ContractFactory(originals.abi, originals.bytecode, seller).deploy(
  "PLUCO Live Check", "PLUCOC", 3, parseEther("0.0001"), 3, seller.address, seller.address, TREASURY, 500
);
await collection.waitForDeployment();
const collectionAddress = await collection.getAddress();
console.log("PlucoOriginals", collectionAddress);

step("register");
await send("register", registry.connect(seller).register(collectionAddress, "PLUCO Live Check", "art", "ipfs://live-check"));
assert.equal(await registry.isActive(collectionAddress), true, "registry did not activate the collection");

step("open sale");
await send("setSaleOpen", collection.connect(seller).setSaleOpen(true));
assert.equal(await collection.saleOpen(), true);

step("mint");
await send("mint", collection.connect(seller).mint("ipfs://live-check/1.json", { value: parseEther("0.0001") }));
const owner = await collection.ownerOf(1);
assert.equal(owner.toLowerCase(), seller.address.toLowerCase(), "mint did not transfer the token to the minter");

step("approve marketplace");
await send("approve", collection.connect(seller).approve(marketAddress, 1));
assert.equal((await collection.getApproved(1)).toLowerCase(), marketAddress.toLowerCase());

step("list");
const listingId = (await market.listingCount()) + 1n;
await send("list", market.connect(seller).list(collectionAddress, 1, parseEther("0.0002")));
assert.equal(await market.listingCount(), listingId);

step("buy");
const listing = await market.listings(listingId);
const price = listing.price;
console.log("listing", listingId.toString(), "price", formatEther(price), "ETH", "seller", listing.seller, "active", listing.active);
await send("buy", market.connect(signer).buy(listingId, { value: price }));
assert.equal((await collection.ownerOf(1)).toLowerCase(), signer.address.toLowerCase(), "buy did not move the token to the buyer");
assert.equal((await market.listings(listingId)).active, false, "listing still active after buy");

step("seller proceeds");
const credits = await market.connect(seller).credits(seller.address);
console.log("seller credits", formatEther(credits), "ETH");
assert.ok(credits > 0n, "seller earned no proceeds");
const before = await provider.getBalance(seller.address);
await send("withdraw", market.connect(seller).withdraw());
const after = await provider.getBalance(seller.address);
console.log("withdraw delta", formatEther(after - before), "ETH (net of gas)");
assert.ok(after > before, "withdraw did not pay out");

console.log("\nsettlement verified end to end on Base mainnet");
console.log("batch summary: registry=" + (await registry.getAddress()) + " market=" + marketAddress + " collection=" + collectionAddress);
