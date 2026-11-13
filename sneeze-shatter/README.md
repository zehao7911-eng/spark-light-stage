# Sneeze & Shatter

Original mobile-friendly 3D pottery workshop toy. Drag on the workshop to move; release to stop. Tap SNEEZE for a radial blast. Keyboard: WASD/arrows + Space. A new room begins with pottery in range of the first sneeze.

Break the room quota to finish. Extra stars: all three gold bells, and a six-piece chain. Six workshop palettes/layouts with botanical paintings, six collectible ceramic souvenirs, best scores and 18 campaign stars. After the six main rooms, six harder remix rounds revisit those rooms. No failure timer, purchases or online service. Scores are saved locally on this device. The workshop menu lets you replay any room.

## Run
Serve this folder with a static HTTP server (for example `python -m http.server 8080`) or host it on GitHub Pages. ES modules require HTTP/HTTPS, not a double-click file URL. Three.js is bundled locally; the game has no CDN dependency.

## Implementation
WebGL / Three.js r147; fixed 120 Hz logical update with capped frame catch-up, device pixel ratio capped at 1.5, one 1024 shadow map, bounded ceramic debris. Geometry is original procedural smooth 3D, not extracted Rezona assets. Built-in generated paintings are mounted in the actual workshop. Generated cover/icon are promotional views of the original dragon, not gameplay screenshots.

The public Rezona game Bull In a China Shop supplied visual/interaction inspiration only. No source code or assets from that game were used. This is independent original code and a different no-timer collectible workshop premise.

## Tests
`node tests.mjs` verifies all six workshop clears using ordinary movement/sneeze inputs, bounds, opening reward, cooldown, best-only awards, invalid-save rejection, and deterministic mid-motion save/restore. Browser QA additionally covers phone layout, pointer drag, actual play through a win, next-room transition, pause/resume and reload.

Original code: MIT (LICENSE.txt). Three.js: MIT (THREE-LICENSE.txt). Generated original artwork: see ART-PROMPTS.md. No analytics or third-party network calls.
