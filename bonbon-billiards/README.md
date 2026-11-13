# Bonbon Billiards

A mobile-first, original miniature pool challenge adapted from actual MIT open-source game physics.

## Play
Drag back anywhere on the table; release to shoot in the opposite direction. Or tap the table to aim, adjust power, then press SHOOT. Arrow buttons/keyboard arrows turn the cue; W/S change power; Space shoots. Dotted lines show the first real collision and the object's initial projected direction, not a guaranteed pocket. Timing is not required.

Pocket every colored bonbon before the shot allowance runs out. A cue scratch is automatically rescued after other balls stop; pocketed bonbons stay pocketed. Two or more bonbons in the same shot increase the combo multiplier. Consecutive scoring shots increase the streak multiplier to x4; bank/round-cushion pots add50. Failed shots cost one attempt. Full clear/no undos within par/no cue spills award3 best stars. Replays keep the highest medal and score, not duplicate currency.12 fixed authored tables across3 velvet palettes, up to6 bonbons and2 round cushions; four cue finishes unlock at0/6/18/30 of36 stars. This is a pool puzzle campaign rather than the original8-ball versus AI mode.

Run a static HTTP server in this directory (python -m http.server 50553) and open its index. All runtime assets are local code; no install/build/CDN/fonts needed. Use node tests.mjs for tests; package.json supplies ES-module type, no packages.

## Real source adaptation
Official source: https://github.com/henshmi/Classic-8-Ball-Pool
Commit ede58b77bb7d5b9d3a5d7ccf4c93df4e8437d3b9, MIT, copyright2019 Chen Shmilovich.
- vector2.js is the original Vector2 with TypeScript syntax removed.
- source-physics.js adapts actual Ball shoot/show/hide/update, GameWorld equal-mass normal/tangent collision and separation, cushion reflection and pocket-distance tests.
- Time units changed to seconds/fixed120Hz; original0.018 friction/loss converted to exponential time-correct damping. Zero-distance and separating-contact guards added; stationary cushions emit no fake collision effects; side cushion gaps match the visible pocket mouths. Rendering/sprites/imported assets removed.
- core.js adds the12-table lifecycle, layouts, scoring/streaks, round cushions, scratch respawn, undo, medals and exact logical snapshots.
- upstream/ contains unmodified relevant TS and README; exact SHA256 hashes in source-manifest.json. Full LICENSE-POOL.txt retained.
- art.js/game.js/style.css/index.html contain original procedural art, UI and synthesized audio, available under the same MIT terms, copyright2026 Bonbon Billiards contributors. No source game images, music, LAB.js, Canvas renderer, original AI or unrelated dependencies bundled.

## Mobile and persistence
Portrait table rotates naturally to landscape in wide/short windows; input uses the inverse transform. Drag can begin anywhere, avoiding tiny ball touch targets. Controls44px+, safe responsive UI, DPR cap1.5, nominal40FPS render,120Hz fixed simulation with at most120 catch-up steps per frame, <=180 particle motes/18rings/8sinking balls/16scheduled audio voices. Pause/blur/hidden clears held input, freezes physics and visual motion, and suspends audio. Resume is explicit.

Active positions/velocities/hidden balls/shot progress/score/streak/undo history and profile persist locally. Reload restores paused even during a shot; transient trails/particles reset. Browser storage denial falls back to tab-only play. No physical handset performance certification. All on-screen text is English.

See QA.md and tests.mjs. tests-player.mjs is a separate geometric test player, not imported by the browser or used to force wins.
