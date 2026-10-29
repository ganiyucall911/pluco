// Deploy PlucoOriginals. Usage:
//   RPC_URL=... PRIVATE_KEY=0x... node deploy.mjs [--network amoy|polygon] [--supply 100] [--price 25] [--per-wallet 3]
// Price is in the chain's native currency (POL on Polygon). Everything is overridable by env.
import fs from "node:fs";
import path from "node:path";
import { JsonRpcProvider, Wallet, ContractFactory, parseEther } from "ethers";

const root = path.dirname(new URL(import.meta.url).pathname);
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf("--" + name);
  return i === -1 ? fallback : args[i + 1];
};

const NETWORKS = {
  amoy: { chainId: 80002, rpc: "https://rpc-amoy.polygon.technology", explorer: "https://amoy.polygonscan.com" },
  polygon: { chainId: 137, rpc: "https://polygon-rpc.com", explorer: "https://polygonscan.com" },
};

const networkName = arg("network", process.env.NETWORK || "amoy");
const net = NETWORKS[networkName];
if (!net) throw new Error("unknown network " + networkName);

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw new Error("set PRIVATE_KEY (a throwaway deployer key, never commit it)");
const rpc = process.env.RPC_URL || net.rpc;

const supply = Number(arg("supply", process.env.MAX_SUPPLY || 100));
const price = parseEther(arg("price", process.env.MINT_PRICE || "25"));
const perWallet = Number(arg("per-wallet", process.env.MAX_PER_WALLET || 3));

const { abi, bytecode } = JSON.parse(fs.readFileSync(path.join(root, "artifacts", "PlucoOriginals.json"), "utf8"));

const provider = new JsonRpcProvider(rpc, net.chainId);
const wallet = new Wallet(privateKey, provider);
console.log("deployer:", wallet.address, "balance:", (await provider.getBalance(wallet.address)).toString());
console.log("network:", networkName, "supply:", supply, "price:", price.toString(), "per wallet:", perWallet);

const factory = new ContractFactory(abi, bytecode, wallet);
const contract = await factory.deploy(
  "PLUCO Originals",
  "PLUCO",
  supply,
  price,
  perWallet,
  wallet.address,
  wallet.address
);
await contract.waitForDeployment();
const address = await contract.getAddress();
console.log("deployed:", address);
console.log("explorer:", net.explorer + "/address/" + address);
console.log("next step: set NEXT_PUBLIC_PLUCO_ART_CONTRACT=" + address);
