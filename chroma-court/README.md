# Chroma Court

A complete mobile HTML5 adaptation of Fluid Table Tennis. Four courts/opponents, first-to-3/4/5 matches, movement spin, swept fast-ball contacts, bounded real fluid influence, Flow Surge, 12 best-result stars, 4 trail choices, progressive court unlocks, replay, pause and saved match continuation. English UI; portrait horizontal and landscape vertical touch movement. Keyboard arrows/A/D and Space supported.

## Source provenance and licenses
Original: https://github.com/anirudhjoshi/fluid_table_tennis
Exact cloned HEAD: 2a7e2a8e509a215f48d30d34bc257bbfd765863b (verified 2026-10-25).
The original MIT notice credits Oliver Hunt (2009), Anirudh Joshi (2012), Memo Akten (2008/2009). Full notice in LICENSE-FLUID.txt and fluid-core.js. Upstream fluid.js, table_tennis.js and main.js snapshots are in upstream/ for comparison, and are not loaded at runtime.

The actual solver is retained in fluid-core.js, including pressure projection, advection, boundaries, RGB transport and callbacks. Changes: obsolete DOM/polyfill/renderer removed; RGB and velocity source arrays cleared before injection; interpolation locals declared; array views exposed to a new low-allocation renderer. Numerical field uses 48x80 cells, 5 iterations, 20 updates/s. The renderer maps rectangular-grid pixels correctly and preserves dye hue. Original paddle-angle bounce, wall and goal/reset logic are adapted in rules.js for a 360x600 logical court, fixed120Hz physics, swept contact planes, movement spin, capped fluid coupling, AI and complete match lifecycle.

Art (glass/metal court, paddle sculpture, medallions, netting, particles), UI, progression, mobile input, storage, audio and tests are new project code. No upstream images/fonts/audio/advertising/analytics included. All corresponding editable source and MIT notices are included in the ZIP. New modifications are also provided under the MIT terms in LICENSE-FLUID.txt; no warranty.

## Run and test
No install/build/CDN required. Serve this folder with any static HTTP server and open index.html; ES modules need HTTP rather than file://. For example: `python -m http.server`.
Run `node tests.mjs` for physics/campaign and fluid stability/bridge tests. The display bridge test uses an in-memory canvas substitute in Node; actual browser play and layouts were checked separately.

LocalStorage key chroma-court-v1. Best medals are kept per court; replays do not duplicate stars. Snapshot stores score, paddles, ball, RNG, serve and power; transient fluid fields refresh after load. Continue restores paused. Blocked storage stays playable without persistence. Pause/hidden/blur freeze logic and flow and suspend audio; disabled motion reduces impacts/vibration. Render target40FPS, numerical flow20Hz, capped40trail/200particles/16voices/90queuedinjections. Physical handset performance is not claimed from viewport tests.
