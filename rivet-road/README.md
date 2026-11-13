# Rivet Road

A compact, original 3D armoured rescue adventure for touch screens and desktop browsers.

## Play

Serve this directory with any static web server, or upload its contents to a static HTML5 host. `index.html` is at the ZIP root. No build step, CDN, login or runtime API is required. Opening ES modules via `file://` is unsupported; use HTTP/HTTPS.

- Drag anywhere on the road to drive; release to stop and fire automatically.
- Tap a visible hostile, barrel or barricade to prioritise it when within range and unobstructed.
- Keyboard: W/S forward/back along the street; A/D across it. Arrow keys also work. Escape pauses.
- Park next to crew to rescue them. Park on a winch to operate it.

## Campaign

1. **Seaside breach**: learn stopping, aiming, fuel explosions and breakable checkpoints; unlock twin cannon.
2. **The missing crew**: collect four physically animated workers from roadside courtyards; unlock mortar with arcing splash shots.
3. **Bridge delivery**: operate both winches, lower a real drawbridge and lead a supply truck to extraction; unlock a visible dozer blade and three shield charges.
4. **Power down**: disable both generators to remove the crawler's shield, then defeat it and reach home. Free Roam repeats the districts with bounded additional enemy armour.

The garage supports district replay and unlocked weapon selection. Each district awards up to three medals for completion, taking at most three hits, and completing within 150 seconds. Results retain best medals; replay does not duplicate an unlock. Saves preserve mission state, health, targets, projectiles, crew, winches and truck position. Backgrounding releases controls and pauses; free restart is always available.

## Art and reference

Design study: **Steel Boulevard**, public Rezona playable:
https://rezona.ai/game/pgcserver/pv/PwVerjLk/v2/dist/index.html

The public introduction, urban tank scene and loss state were inspected. Its pointer-lock resume prevented reliable continuous reference play in the available browser. No reference clear, exact parity, open-source licence or full gameplay reconstruction is claimed.

All game-specific meshes, material palette, original interface, icon, animations and synthesized audio were authored for this project. The reference's executable, models, images, brand, fonts and recorded audio are not included. The game uses local **Three.js r147**, covered by the retained `vendor/THREE-LICENSE.txt` (MIT). No image generation was used.

## Implementation

- Original deterministic fixed-step core in `core.mjs`, renderer/input/UI in `game.mjs`.
- Actual lit 3D geometry with instanced animated track links and material-batched buildings/vehicle parts.
- Pixel ratio cap of 1.65 in Detailed and 1.15 in Light graphics; Light disables shadow maps.
- Original Web Audio synthesis begins only after player input. Sound can be muted.
- No external font requests, trackers, analytics or payment functionality.

Run gameplay checks with `node tools/test.mjs`. Browser viewport checks are reported separately from physical handset tests; no platform grade or hardware frame-rate guarantee is made.

Code and original art: MIT, see `LICENSE.txt`. Third-party renderer: its separate retained MIT notice.
