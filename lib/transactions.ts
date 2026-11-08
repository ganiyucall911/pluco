import { Interface } from "ethers";

export type WalletRpc = {
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>;
};

export const marketInterface = new Interface([
  "function list(address collection, uint256 tokenId, uint256 price) returns (uint256)",
  "function buy(uint256 listingId) payable",
  "function cancel(uint256 listingId)",
  "function updatePrice(uint256 listingId, uint256 price)",
  "function withdraw()",
  "function credits(address) view returns (uint256)",
  "function feeBps() view returns (uint96)",
]);
export const tokenInterface = new Interface([
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function approve(address operator, uint256 tokenId)",
]);
export const registryInterface = new Interface([
  "function register(address collection, string name, string category, string metadataURI) returns (bool)",
  "function isActive(address collection) view returns (bool)",
]);

/** A switch request may be rejected or swallowed by the wallet adapter: verify it. */
export async function assertWallet(rpc: WalletRpc, account: string) {
  const chain = await rpc.request({ method: "eth_chainId" });
  if (BigInt(chain as string) !== BigInt(8453)) throw new Error("Switch your wallet to Base mainnet before continuing.");
  const accounts = await rpc.request({ method: "eth_accounts" }) as string[];
  if (!accounts.some((a) => a.toLowerCase() === account.toLowerCase())) {
    throw new Error("Wallet account changed. Reconnect before continuing.");
  }
}

export async function contractRead(rpc: WalletRpc, address: string, abi: Interface, method: string, args: unknown[] = []) {
  const result = await rpc.request({ method: "eth_call", params: [{ to: address, data: abi.encodeFunctionData(method, args) }, "latest"] });
  return abi.decodeFunctionResult(method, result as string);
}

export type Receipt = { status: string; contractAddress?: string };

/** A transaction hash means submitted, not successful. Timeout leaves its outcome unknown. */
export async function waitForReceipt(rpc: WalletRpc, hash: string, attempts = 60, delayMs = 2000): Promise<Receipt> {
  for (let i = 0; i < attempts; i++) {
    let receipt: Receipt | null;
    try {
      receipt = await rpc.request({ method: "eth_getTransactionReceipt", params: [hash] }) as Receipt | null;
    } catch {
      throw new Error("Confirmation is unavailable. The transaction may still confirm; check BaseScan before submitting again.");
    }
    if (receipt) {
      if (BigInt(receipt.status) !== BigInt(1)) throw new Error("Transaction reverted. Check the transaction on BaseScan.");
      return receipt;
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error("Confirmation not observed yet. Check the transaction on BaseScan before submitting again.");
}

export async function sendTransaction(rpc: WalletRpc, account: string, to: string, data: string, onSubmitted: (hash: string) => void, value = BigInt(0)) {
  await assertWallet(rpc, account);
  const hash = await rpc.request({ method: "eth_sendTransaction", params: [{ from: account, to, data, value: "0x" + value.toString(16) }] }) as string;
  onSubmitted(hash);
  return waitForReceipt(rpc, hash);
}
