# Browser QA · 2026-10-25

Local Chromium/IAB, actual UI input:

- First roof: 3 moves, all 4 lights on, 3 medals, +12 coins.
- Bought Copper Weathercock for 10; wallet changed 12→2, OWNED state persisted and wind ornament appeared in scene.
- Undo restored starting light count and zero steps. An off-route step followed by Trail visibly reported “Rewound 1” and restored the route, then highlighted the correct roof.
- Refresh during roof 2 restored 1/3 moves and 7/9 lights, plus coin balance and owned ornament.
- Completed roofs 2–6 through visible hint controls and entered roof 7: Mothlight Canal, 62 coins, 6/36 complete. No developer-console state changes or hidden game APIs used.
- 390×844, 320×740 portrait: no horizontal overflow; 44×44 roof targets and all primary tools reachable. 844×390 landscape: controls occupy right column; tool bar top337/bottom381 stays inside390px viewport. Desktop layout checked separately.
- Warning/error browser log empty at inspection.
- 17 model tests pass: all36 routes, all distinct boards, valid moves, tile flips, undo, hint rewind, unlimited moves, medals/rewards, replay, save restore, all six keep purchases and level locks.

Public delivery checks are recorded separately after publishing. These are browser viewport checks rather than physical Android/iOS certification. Generated backdrop is local; no third-party runtime request is required.
