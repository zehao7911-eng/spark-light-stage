# CHROMASPLASH — Turf Rush

Original 3D 60-second paint territory battle, built for portrait phones and desktops. Drag anywhere to move. Aim and spray are automatic. Hold DIVE to refill ink (faster on friendly ink). Tap SPLASH for a large area burst when charged. Paint more floor than the green team before the timer ends. Three arena layouts rotate; rival movement gets slightly faster in later arenas. Wins unlock the next arena; rematches are always available. One ally and two opponents are local AI, not online multiplayer.

Desktop: WASD/arrows, Shift to dive, Space for splash, Escape pause. Audio starts after play; sound and low quality controls provided. Best unlocked arena persists locally; active matches restart after reload. No payments, accounts, analytics, external fonts or CDN. All dependencies and assets local. Serve the extracted folder with a static HTTP server (`python -m http.server 8000`), then open index.html. Direct file:// may block modules.

## Reference
Actually inspected and attempted native movement/shooting in Ink Storm on Rezona: https://rezona.ai/game/pgcserver/pv/oBcHewEe/v39/dist/index.html . Observed hot pink/lime 3D rooftop turf battle, blaster, ink meter, squid refill, bombs, timer and cover blocks. Reference overlay remained in the native attempt; no reference victory is claimed. This independently written adaptation preserves those broad visual/gameplay relationships, with original models, interface and generated marketing art. Touch auto-aim, 60-second length, camera, maps, geometry and exact rendering differ; it is not an asset/pixel-identical clone. No source or media copied from the reference.

## Art & credits
Three.js r147 MIT, see vendor/THREE-LICENSE.txt. Procedural original character geometry, city, cover blocks, paint texture, particles, UI and WebAudio soundtrack. Built-in image_gen promotional cover and icon; exact prompts and output names in ART-PROMPTS.json. Marketing illustrations are more detailed than real-time models, not screenshots.

## Checks
`node tools/test.mjs` simulates nine complete normal-input matches, collision boundaries, tile ownership, stable repaint scoring, ink recovery, bomb cooldown and finite-state invariants. Mobile layouts and native browser play checked separately. No physical handset testing claimed. Rendering caps pixel ratio at1.5; low quality uses1.0/no shadows. Pausing/hidden pages stop match and animation.
