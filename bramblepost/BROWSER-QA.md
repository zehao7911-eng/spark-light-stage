# Browser QA

## Automated model checks

20 tests pass, including 200 seeded stable starts, upstream match/overlap/gravity/attic fixtures, rectangular gravity, cyclic shifts, invalid actions, exact snapshot and RNG continuation, stock and charge caps, wallet and upgrade limits, companion effects, ingredient unlocks, Burst and Sort, reward idempotence, 1000 consecutive match-producing actions and four full twelve-station routes (36 deliveries each). The full routes needed 78,81,82,85 matching shifts respectively. These are model simulations, not automated UI playthroughs of all routes.

## Actual browser play

- Opened the local release in the in-app browser at 390×844. Dismissed welcome and used an actual drag across the Tea row; a multi-wave cascade awarded supplies and coins.
- Sent two parcels, checked precise Tea/Berry/Letter deductions, and selected a visible match for the remaining Honey/Tea order. Completed the third parcel. Station reward showed +3 stars and 118 accumulated coins.
- Reloaded the reward screen: three delivered parcels, three stars,118 coins retained; no extra claim. Continued to Willow Crossing, station 2.
- Purchased Careful Packing with45 coins: wallet118→73, level0→1, next cost110.
- Further actual grid drags charged Burst to18/18. Activated Burst, selected C3 and saw the initial eleven-cell cross resolved before subsequent cascades. Final supplies and wallet updated; console warnings/errors empty.
- Checked 320×740: document width305 with scrollbar, no horizontal overflow, grid cells44.33CSS pixels and arrow controls44×44. Compact customer label was subsequently shortened to preserve room at this width.
- Checked390×844: cells53CSS pixels, no horizontal overflow, order above grid, controls below; workshop is reachable by vertical scrolling.
- Checked844×390: no horizontal overflow, two-column arrangement and vertical scrolling. Short landscape screens do not fit the entire game without scrolling.
- Desktop uses the same source and a larger two-column board/sidebar layout.

These tests use a browser and responsive viewport overrides; no physical Android/iPhone test device was used. Native drag exercises the Pointer Events input path. No claim of certification on every phone is made. Public deployment and archive verification are recorded separately in the delivery log.
