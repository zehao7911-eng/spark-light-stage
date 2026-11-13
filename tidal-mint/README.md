# TIDAL MINT

An original seaside pixel-art coin pusher for HTML5. Aim a little medallion, press it into a living pile, and enjoy the cascade. All scores, gold and coins are in-game counters. No purchases, cash-out, ads, accounts or real-money features.

## Play

- Choose one of the three visible next coins.
- Drag across the tray and release to drop at that horizontal position. Alternatively, press DROP. Hold DROP to feed coins repeatedly.
- The brass pusher moves the actual coin bodies. Only coins crossing the open front edge pay points and gold.
- The bright center stripe multiplies the payout. A quick cascade raises the chain multiplier.
- SHAKE nudges the whole pile. It recharges over time and through successful payouts.
- Fill the round meter, choose a permanent charm, and continue with the existing tray. The next tide waits for a drop or a shake, so you can inspect your new coin before it starts. Your pocket refills slowly and freely, so there is no failure timer or resource dead end.

Keyboard: arrows aim; Space drops; S shakes; 1/2/3 selects a coin; Escape pauses.

## Coins and progression

1. Copper and Silver are available at the start.
2. Sunburst (round 2) explodes on landing and chains nearby unspent Sunbursts.
3. Twins (round 3) creates two additional physical Copper bodies.
4. Magnet (round 4) attracts nearby coins, then releases the gathered pile forward.
5. Pearl (round 5) has a stronger payout near other Pearls.
6. Tide Bell (round 7) sends a forward impulse through the pile when collected.
7. Crown (round 9) rains three new Silver coins into the tray when collected.

Six workshop tracks have four levels each: Copper value, pocket capacity, piston stroke, special-coin frequency, shake power/recharge, and chain duration/ceiling. Purchases are permanent and use collected gold.

Six stackable charms change the machine: free double feeds, periodic Sunbursts, automatic undertows, improved Silver, Pearl restocks and a stronger center stripe. A charm at its five-stack maximum offers 100 gold instead, so the reward screen remains usable. Offers are drawn without duplication. The Pearl and center-stripe charms enter the offer pool later.

Rounds continue with increasing quadratic payout targets. Numeric round display is capped at 999; continuation uses the capped target. This is a compact original arcade interpretation, not 150 coins or the complete content of the reference game. All eight coin types have individual art and behaviors.

## Saves and pause

The game saves the exact body positions, velocities, drop heights, pusher phase, hand, aim, stock, RNG, charm offers, round progress, wallet, collection and workshop under `tidal-mint-v1`. A resumed machine opens paused. Menus and hidden tabs freeze simulation; changing viewport cancels held input. There is no offline simulation or income. Clearing site storage removes the save.

Sound is original synthesized Web Audio, activated by a gesture. Effects respect reduced motion. Full View shows the complete cabinet; Play View enlarges the tray. Portrait phones have a fixed bottom control panel. Landscape uses a separate side control panel. Short screens can scroll. Viewport tests do not establish physical-device frame rate or audio latency.

## Run and test

Serve the folder with a static HTTP server, such as `python -m http.server 8080`, or publish its contents on GitHub Pages. No engine installation, build, CDN or external runtime dependency is needed. Use HTTP(S) for reliable loading and saving.

Run `node test-engine.cjs` for deterministic physical payout, duplication guard, pause, supply, special behaviors, progression, upgrade limits, restore, finite-state and long-run checks. The 16 seeded three-minute simulations exercise all eight types with a maximum of 160 simultaneous bodies. Rendering targets 30 FPS while simulation uses a fixed 60 Hz step and a spatial hash.

Physics is a 2D circular-body tray simulation with vertical drop motion and perspective projection. It is not a full 3D rigid-body stack solver. The opening machine has a preloaded float, and advancing rounds adds up to 20 standard coins in valid space while preserving existing bodies. Restocks never spawn behind an extended pusher.

## Reference and assets

[RACCOIN: Coin Pusher Roguelike](https://store.steampowered.com/app/3784030/?l=english) inspired the general coin-pusher and combination-building loop. TIDAL MINT has an original sea-otter cabinet, medallions, interface, rules and code. No commercial assets, characters, game code, logos or sound recordings are included.

See `ART-SOURCE.md` for generated-art prompts and shared visual rules, and `BROWSER-QA.md` for actual browser checks.
