/**
 * OpenSea is where PLUCO's work is traded, and every piece PLUCO mints has to
 * show up on one page: the PLUCO profile. Contracts deployed by the PLUCO
 * wallet are indexed as collections created by it, so a mint appears on the
 * profile a few hours after the first token exists.
 */
export const PLUCO_OPENSEA = "https://opensea.io/pluco";

/** The profile filtered to collections PLUCO created (where new mints land). */
export const PLUCO_OPENSEA_CREATED = "https://opensea.io/pluco?tab=created";

/** Fallback for a contract OpenSea has not indexed under the profile yet. */
export function openseaContractSearch(contract: string): string {
  return "https://opensea.io/search?query=" + encodeURIComponent(contract) + "&type=item";
}

/** Direct item link, for a token OpenSea already knows about. */
export function openseaToken(contract: string, tokenId: number | string): string {
  return "https://opensea.io/assets/base/" + contract + "/" + tokenId;
}
