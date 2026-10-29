# Fees

PLUCO earns from activity, not from gatekeeping. Registration and listing are free for anyone.

Every payment is native ETH on Base (chain id 8453). No wrapped tokens, no ERC-20 allowance
step, no separate gas token: a buyer sends ETH, the contract splits it, and the rest is credited
to the seller to withdraw. Prices in the UI are read live from the contract with `mintPrice()`.

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

Registration itself costs no fee, only Base gas: about 260,000 gas per collection, which at
today's Base gas price is roughly $0.003.

Every fee is paid in ETH on Base to the PLUCO treasury:

    treasury: 0xcaEC37D3AdcE9a141BF5d78895cb3074Fae77AD9

On a primary mint in PlucoOriginals the fee is forwarded to that address in the same transaction.
On a marketplace sale it is credited to that address and withdrawn with `withdraw()` as native ETH.
Both deploy scripts default to this address; TREASURY in the environment can override it, so check
the constructor argument logged at deploy if you ever change it.
