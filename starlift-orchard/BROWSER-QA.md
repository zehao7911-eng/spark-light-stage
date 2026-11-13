# Browser QA · 2026-10-25

Chromium/IAB, actual visible UI and input:

- Flight1:23 fruit,950 points, best chain11, two medals,54 coins banked. Result bank opened the next grove.
- Wide Lens bought for18, Copper Coil for20:54→16 coins, both level1/3, next costs40/45 and unaffordable actions disabled.
- Flight2: real pointer drag on the320px canvas collected9 fruit; result270 points, chain6,26 coins, two medals. After banking:42 coins,4 total medals, Pulse unlock announcement.
- Flight3: Pulse actually changed an on-field burr into a golden reward, displayed TURNED TO GOLD, raised refined count to1/score30 and entered12-second cooldown.
- Pause/reload/resume retained the active grove, objects and remaining time while releasing held input. UI open/close did not continue simulation behind menus. Old-flight callouts were cleared on the next ready screen.
- 390×844 and320×740 portrait: no horizontal overflow, main controls within reach. 844×390 landscape: Lift and Pulse occupy the right column; sprite aspect compensation preserves round fruit. Desktop composition checked at default viewport.
- Warning/error log empty during inspection. Built-in imagegen outputs are bundled locally.
- 23 automated tests passed: actual adapted attraction/release/collision/conversion, complete flights, exactly-once banking, replay medals, all gear effects, ability thresholds/cooldowns, bubble fruit, save/RNG continuation, clustered-hit grace and equivalent fixed steps under low frame rates.

Public deployment and download integrity are verified separately after publication. This is browser viewport QA, not physical-device certification. Automated pilot tests are rule tests, not a claim that every run is effortless for every player.

Release refinement: public background-tab testing revealed that browser wall-clock timer throttling could delay the result modal. The final release opens results directly on the finishing animation frame and no longer uses that timer. Public first-flight observed23 fruit,1270 points,chain11,two medals,54 coins.
