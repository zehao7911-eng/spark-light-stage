# Pearlkeep

A small, unhurried seaside pearl workshop. Tap a dish's middle to turn it anticlockwise. Tap a pearl with a little arrow to send it to the neighboring dish. Four of the same color bloom into a keepsake.

## Play

Serve this folder with any static HTTP server and open index.html. A ready classic JavaScript build is included; no npm install, CDN, account or engine installation is needed. The packaged entry also uses only relative local image/script paths. Audio starts muted and is optional.

Touch/mouse: tap the middle or an enabled pearl. Keyboard: 1–4 select a dish; Space turns it; arrow keys send a pearl; Escape pauses. Shapes on the pearls distinguish their families as well as color. The first puzzle has a one-tap reward.

Eight deterministic campaign puzzles progress from two dishes/one set to four dishes/three sets. Finishing all eight unlocks seeded keepsakes made by legally scrambling solved sets, with difficulty capped after the early expeditions. These reuse the same workshop, not an unlimited number of unique painted scenes. Stars reward completion, avoiding Undo/Guide, and a turn budget. Records keep the best rating, not replay-farmed stars. Ivory, Velvet (6 stars), and Sea Glass (15 stars) are dish/workshop finishes.

Undo is unlimited after moves settle. Guide explicitly restarts the current puzzle, then highlights a guaranteed route; it caps the no-guide star. There is no clock, lives system or pressure mechanic. The route shown is valid and loop-reduced, not claimed to be mathematically shortest.

Progress and the current logical state save locally. Pause, blur and backgrounding stop model/visual updates and suspend sound; resuming a saved game opens paused. A blocked localStorage falls back to the current session. Collection particles and visual interpolation restart on reload; they are presentation, not game state. No service worker or claim of installation/offline caching is made. The ZIP contains all assets for local hosting.

## Art and delivery

The original otter, pearls, dishes, tools, cover and icon were produced as a coordinated set with the built-in image generation tool; no source-game graphics or commercial game assets were reused. This is illustrated Canvas2D, not a real-time 3D renderer. The generated atlas preserves real alpha; per-cell connected-component bounds prevent neighboring sprites entering crop rectangles. The same actual sprites appear in gameplay. Cover typesetting is live HTML, and the icon is supplied as 192/512 PNGs, favicon, Apple touch icon and web manifest.

- assets/cover-1026b.webp: landscape cover artwork used by the responsive title screen and social preview.
- assets/icon-192.png and assets/icon-512.png: dedicated matching game icon.
- assets/atlas-1026b.webp and frames-1026b.json: runtime art.
- ART-PROMPTS.md: exact final prompts and generation provenance.

## Source and build

This is an adaptation of the open-source Orbium gameplay engine. See SOURCE.md, source-manifest.json, LICENSE.txt, upstream/ and engine/. The original upstream game is complete single-player browser software; Pearlkeep has its own new campaign/controller/presentation, and does not claim to port every Orbium feature.

`python build.py` regenerates app-1026b.js from source-engine.js, model.js, art.js and game.js; atlas rectangles are embedded to keep asset coordinates and bundle in sync. `node tests.mjs` runs the deterministic actual-engine tests. Python build uses only the standard library. All corresponding modified source is provided under GPL-2.0 with the original license.

Fixed 120 Hz model updates, 40 Hz drawing, a 600×900 canvas, at most one pearl in transit, four dishes, 140 particles, 16 collection flights and 12 synthesized audio voices. Phone viewport layouts were checked in browser emulation; physical handset performance is not certified. No ads, purchases, analytics, external font or network service is required at runtime.
