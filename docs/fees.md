# Fees

PLUCO earns from activity, not from gatekeeping. Registration and listing are free for anyone.

| Action | Who pays | PLUCO takes |
| --- | --- | --- |
| Register a collection | nobody | 0 |
| List a token | nobody | 0 |
| Mint from PlucoOriginals | minter | 5% of the mint price (cap 10%) |
| Secondary sale on PlucoMarketplace | buyer | 2.5% of the sale (cap 5%) |

The rest of a primary mint goes to the collection owner. On a resale the split is:
seller proceeds + artist royalty (EIP-2981) + PLUCO fee.

Both fees are basis points held by the contract and changeable only by the owner, under a hard cap
in code so the fee can never be raised past what the README promises without a redeploy.

Revenue is credited to the treasury address and withdrawn with `withdraw()` on the marketplace,
or sent straight to the treasury on primary mints in PlucoOriginals.
