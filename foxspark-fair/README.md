# Foxspark Fair

An English, portrait-first HTML5 spark-and-rescue adventure. Nine authored stages across a lantern market, moonlit glasshouse and brass observatory. Place a firework, escape the indicated cross, rescue birds and reach the gate. Red canisters chain; water blocks sparks; paired springboards cross water; later gates require a hidden key. Optional golden seals and safe clears earn up to three stars. Stars unlock three alternative tool kits with real range, movement or protection tradeoffs.

## Play / run
Serve this directory over HTTP (`python -m http.server 4250`) and open localhost:4250. No build step, external CDN, account or paid service. Touch direction pad plus SPARK; alternatively tap a destination. Keyboard arrows/WASD and Space. Pause, retry, level selection, next stage, mute and local save/continue are included. Phone landscape has separate controls. Local storage failure is nonfatal. Audio is synthesized and starts only after interaction. This is a finite nine-stage campaign, not endless play.

## Open-source provenance
Adapted from [MattSkala/html5-bombergirl](https://github.com/MattSkala/html5-bombergirl), MIT, commit 0044a17d794bbfe05841a04328ccfd07146cb1b7. `source-bomb.js` retains the actual cardinal blast/wood stopping/recursive chain and player owner escape logic, with rendering hooks replaced by the new world bridge and a seconds-based fuse. `core.js` uses the source neighbor routine. Unmodified relevant source snapshots are in `upstream/`. See LICENSE-BOMBERGIRL.txt and source-manifest.json. Original upstream art, music and engine dependency are not bundled. New game code is MIT, Copyright 2026 Foxspark Fair contributors.

## Art
Original built-in image generation, not extracted Steam/video assets. Runtime assets: assets/market.webp, garden.webp, observatory.webp, sprites.webp, frames.json. Three coherent illustrated environments and a transparent 24-frame/prop atlas; six front and six back walking poses, idle, victory and hurt poses. Sprite source pivots preserve foot placement. Prompts and generation details: ART-PROMPTS.md. WebP runtime artwork totals about 1.4 MB. Background illustrations remain static; characters, gameplay, particles, bird flight and lighting effects animate independently.

## Verification
Run `node tests.mjs`. Deterministic nine-map solve fixtures use real movement, bombs, fuse timing, escape paths, pickups and gates; enemies are excluded only in these map-solvability fixtures. Separate tests exercise live enemy movement, collision, hurt/guard, bounds and save restoration. Browser phone viewport tests are documented in VALIDATION.md. They are not physical handset certification.
