// Deploy the PLUCO art protocol to Base: registry + marketplace, wired together.
// Usage:
//   PRIVATE_KEY=0x... node deploy-protocol.mjs [--network base|base-sepolia] [--fee 250]
//   PRIVATE_KEY=0x... TREASURY=0x... node deploy-protocol.mjs --network base
import fs from "node:fs";
import path from "node:path";
import { JsonRpcProvider, Wallet, ContractFactory } from "ethers";

const root = path.dirname(new URL(import.meta.url).pathname);
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? fallback : args[i + 1];
};

const NETWORKS = {
  "base-sepolia": { chainId: 84532, rpc: "https://sepolia.base.org", explorer: "https://sepolia.basescan.org" },
  base: { chainId: 8453, rpc: "https://mainnet.base.org", explorer: "https://basescan.org" },
};

const networkName = arg("network", process.env.NETWORK || "base-sepolia");
const net = NETWORKS[networkName];
if (!net) throw new Error("unknown network " + networkName);

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw new Error("set PRIVATE_KEY (a deployer key, never commit it)");
const provider = new JsonRpcProvider(process.env.RPC_URL || net.rpc, net.chainId);
const wallet = new Wallet(privateKey, provider);

const feeBps = Number(arg("fee", process.env.PROTOCOL_FEE_BPS || 250)); // 2.5%
if (feeBps > 500) throw new Error("protocol fee is capped at 500 bps (5%)");

const load = (name) => JSON.parse(fs.readFileSync(path.join(root, "artifacts", name + ".json"), "utf8"));

console.log("network:", networkName, "deployer:", wallet.address);
console.log("balance:", (await provider.getBalance(wallet.address)).toString());

const registryArt = load("PlucoRegistry");
const registry = await new ContractFactory(registryArt.abi, registryArt.bytecode, wallet).deploy(wallet.address);
await registry.waitForDeployment();
const registryAddress = await registry.getAddress();
console.log("PlucoRegistry:", registryAddress);

// Fees are paid in native ETH on Base to the PLUCO treasury.
const TREASURY = "0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9";
const treasury = process.env.TREASURY || TREASURY;
const marketArt = load("PlucoMarketplace");
const market = await new ContractFactory(marketArt.abi, marketArt.bytecode, wallet).deploy(
  wallet.address,
  registryAddress,
  treasury,
  feeBps
);
await market.waitForDeployment();
const marketAddress = await market.getAddress();
console.log("PlucoMarketplace:", marketAddress);
console.log("treasury:", treasury, "protocol fee bps:", feeBps);

console.log("");
console.log("Set these on the site (Vercel/hosting env):");
console.log("NEXT_PUBLIC_PLUCO_REGISTRY=" + registryAddress);
console.log("NEXT_PUBLIC_PLUCO_MARKETPLACE=" + marketAddress);
console.log("Explorer:", net.explorer + "/address/" + registryAddress);
