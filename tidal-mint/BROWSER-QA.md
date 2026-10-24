# Browser QA

Tested 2026-10-24 in the native in-app browser using the actual HTML game. The phone dimensions below are browser viewport tests, not a physical handset performance benchmark.

## Actual play

- Loaded the original cabinet, medallion atlas and game with local dependencies only. Entered with LET IT FLOW.
- Dropped a real coin and used SHAKE. Coins physically crossed the front edge, the wallet increased, and the chain multiplier rose to two.
- Completed round 1. The charm selection appeared. Chose Double Feed; round 2 preserved the tray and offered the newly unlocked Sunburst in slot 1.
- Dropped the Sunburst. The hand advanced, and physical payouts continued.
- Reloaded mid-round. The game resumed paused with the same round, wallet, hand, tray and charm.
- Bought MINT for 35 gold from a 65-gold wallet. Reload showed MINT 1/4, a 30-gold balance and a disabled next purchase at 63 gold.
- In a 390 by 844 phone viewport, dragged across the actual tray and released. The chosen lane moved and stock changed from 18 to 17, with one hand slot replaced.
- Held DROP through native pointer input for two seconds. It fed multiple coins and stock fell to 12, rather than issuing just one click.
- Used SHAKE again in round 2. Physical payout reached its 68-point target and chain multiplier three. The second charm screen offered Silver Lining, Solar Spark and Double Feed.
- Chose Solar Spark. Round 3 offered Twins in the first slot. Opened the cabinet and inspected eight coin descriptions, unlocked/locked states, 52 collected coins, a best chain of 16, and both acquired charms.

## Layouts

- Desktop: complete illustrated cabinet with the coin hand and controls in a separate column. Full View and Play View use different cameras.
- 390 by 844: enlarged tray, fixed bottom hand/drop/shake/workshop controls, next-coin unlock notice and no horizontal overflow.
- 320 by 568: document width 305 within the 320-pixel viewport. Hand buttons measured approximately 44.7 by 58 CSS pixels. Header buttons 44 by 44; Drop and Shake approximately 63 by 58. Secondary controls are at least 44 pixels tall. Short screens may scroll; the controls remain fixed.
- 844 by 390: dedicated close camera and a separate side panel. Canvas approximately 324 by 323 CSS pixels; side control panel 255 by 279. Document width 829, within the viewport. The payout edge remains visible after the short vertical scroll used by the browser.

## Automated validation

`test-engine.cjs` runs 16 deterministic three-minute simulations and checks finite positions/velocities, bounded population, physical edge payout, no click-to-cash shortcut, no duplicate collection, supply/refill, all eight coin behaviors and unlock thresholds, pause freeze, purchases/caps, charm overflow, save round trips, critical reward notification under a full effect queue and phase-safe restocking. Rendering and physics have separate bounded effects and simulation loops.

The asset check verifies lossless pixel identity of both WebP files, preserved alpha, English-only authored content, local dependencies, pointer capture/cancellation, finite image/font loading timeouts, saving and reduced motion wiring.

This is projected 2D circular-body physics with drop height, not full 3D rigid-body stacking. No physical-device FPS, thermals or audio latency were measured.

## Final regression notes

The final engine suite cleared 612 rounds, collected 33,374 physical payouts and accepted 7,293 drops across the 16 seeded runs. All eight types were exercised. Separate fixtures verify actual Magnet attraction, two neighboring Pearls falling in one batch, Bell impulses and Crown-generated Silver bodies. The next-round input gate and its cleared drop cooldown were verified to prevent automatic reward-screen progression.

Native final check: after choosing Undertow from the round-3 reward screen, round 4 showed 0/164 with Magnet in slot 1. It remained at zero until DROP was pressed, after which physical payouts began. No browser error or warning logs were captured.
