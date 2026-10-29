// Shared client helpers for reading and writing the PLUCO Originals + market contracts.
// Everything is hand-encoded so the browser bundle stays dependency-free.

export type Eth = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
};

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_PLUCO_CHAIN_ID || 84532); // 84532 = Base Sepolia, 8453 = Base
export const CHAIN_NAME = CHAIN_ID === 8453 ? "Base" : "Base Sepolia";
export const EXPLORER = CHAIN_ID === 8453 ? "https://basescan.org" : "https://sepolia.basescan.org";
export const ART = process.env.NEXT_PUBLIC_PLUCO_ART_CONTRACT || "";
export const MARKET = process.env.NEXT_PUBLIC_PLUCO_MARKET || "";

export const SEL = {
  totalMinted: "0xa2309ff8",
  tokenURI: "0xc87b56dd",
  ownerOf: "0x6352211e",
  listings: "0xde74e57b",
  list: "0x50fd7367",
  buy: "0xd96a094a",
  cancel: "0x40e58ee5",
  isApprovedForAll: "0xe985e9c5",
  setApprovalForAll: "0xa22cb465",
} as const;

export function getEth(): Eth | undefined {
  return (window as unknown as { ethereum?: Eth }).ethereum;
}

export function pad(value: bigint | number | string): string {
  return BigInt(value).toString(16).padStart(64, "0");
}

export function encodeUint(selector: string, value: bigint | number | string): string {
  return selector + pad(value);
}

export function encodeUintPair(selector: string, a: bigint | number, b: bigint | number): string {
  return selector + pad(a) + pad(b);
}

export function decodeUint(result: string): bigint {
  return result && result !== "0x" ? BigInt(result) : BigInt(0);
}

export function decodeAddress(result: string): string {
  if (!result || result === "0x") return "";
  return "0x" + result.slice(26, 66);
}

export function decodeString(result: string): string {
  if (!result || result.length < 130) return "";
  const hex = result.replace(/^0x/, "");
  const offset = Number(BigInt("0x" + hex.slice(0, 64))) * 2;
  const length = Number(BigInt("0x" + hex.slice(offset, offset + 64)));
  const body = hex.slice(offset + 64, offset + 64 + length * 2);
  try {
    const bytes = new Uint8Array(body.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) ?? []);
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

/** listings(uint256) returns (address seller, uint256 price) */
export function decodeListing(result: string): { seller: string; price: bigint } {
  if (!result || result === "0x") return { seller: "", price: BigInt(0) };
  const hex = result.replace(/^0x/, "");
  return { seller: "0x" + hex.slice(24, 64), price: BigInt("0x" + hex.slice(64, 128)) };
}

export function formatEth(wei: bigint, digits = 4): string {
  const whole = wei / BigInt(10) ** BigInt(18);
  const frac = (wei % BigInt(10) ** BigInt(18)).toString().padStart(18, "0").slice(0, digits).replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole.toString();
}

export function parseEth(value: string): bigint {
  const [whole, frac = ""] = value.trim().split(".");
  const fracPadded = (frac + "0".repeat(18)).slice(0, 18);
  return BigInt(whole || "0") * BigInt(10) ** BigInt(18) + BigInt(fracPadded || "0");
}

export function toGateway(uri: string): string {
  if (!uri) return "";
  if (uri.startsWith("ipfs://")) return "https://ipfs.io/ipfs/" + uri.slice(7).replace(/^ipfs\//, "");
  return uri;
}

export async function readCall(eth: Eth, to: string, data: string, from?: string): Promise<string> {
  return (await eth.request({
    method: "eth_call",
    params: [{ to, data }, from ?? "0x0000000000000000000000000000000000000000", "latest"],
  })) as string;
}

export async function ensureArtChain(eth: Eth): Promise<void> {
  const hexId = "0x" + CHAIN_ID.toString(16);
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: hexId }] });
  } catch {
    await eth.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: hexId,
          chainName: CHAIN_NAME,
          nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
          rpcUrls: [CHAIN_ID === 8453 ? "https://mainnet.base.org" : "https://sepolia.base.org"],
          blockExplorerUrls: [EXPLORER],
        },
      ],
    });
  }
}

export type Artwork = { id: number; uri: string; name: string; image: string; owner: string };
