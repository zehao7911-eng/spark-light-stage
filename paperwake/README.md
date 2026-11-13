# Paperwake

Swipe the water. Wake the flowers.

An original miniature water-garden game, inspired by the tactile paper boats and three-dimensional sea presentation observed while actually playing **Paper Armada** on [Rezona](https://rezona.ai/game/pgcserver/pv/kOlgnleV/v7/dist/index.html). Trash Talk was also inspected during reference selection. Neither reference's code, artwork, characters, interfaces or audio are redistributed here. Paperwake changes the interaction to local water impulses and blooming ponds; it is not a combat game or a remake of either title.

## Play

Serve this folder with an HTTP server, e.g. `python -m http.server 8000`, then open localhost:8000. WebGL is required. All runtime libraries and artwork are bundled; no account, CDN, analytics or backend is needed.

- Swipe water near a paper boat to push it in the swipe direction. A tap makes an outward splash. Water forces are local, so a distant gesture does not magically steer a boat.
- Touch every floating flower with a boat. Flowers unfold, light up, scatter paper petals and play chimes. Consecutive blooms within 2.5 seconds form a melody combo.
- Calm stops the boats. Undo restores the pond to just before the last gesture; both are free. Arrow keys create currents for the first boat.
- Eight ponds introduce floating logs, drifting flower positions, a swirl, two interacting boats, a rotating wheel and a petal gate opened by the first flower. No timer or lives.
- One star for completion, another for no Undo, and another for finishing within the pond's ripple allowance. Best stars are saved once, rather than accumulated repeatedly. A new pond unlocks after finishing its predecessor.
- Local browser storage keeps the trail and exact active boat positions, velocities, flowers and simulation time. Shape and positions continue after reload; the page opens paused. Clearing site storage removes progress. Undo history itself is not retained across reload.

## Technology and provenance

`core.js` is original deterministic 2D boat physics: local radial and directional impulses, drag, capsule obstacles, boat collisions, moving flowers and time-dependent currents. It is not a full fluid simulation. `view.js` renders those states as original procedural 3D geometry with a custom animated water shader, expanding ripples, rounded plants, paper folds, hinged lotus petals, lights and bounded particles. `app.js` supplies native accessible controls, pointer capture, pause on page hide/blur, original synthesized sound and local saves.

The cover and icon were generated with OpenAI's built-in image tool, referencing an actual screenshot of this project. They are marketing artwork, not screenshots. `ART-PROMPTS.json` records the exact prompt and file provenance. All actual gameplay objects are live procedural geometry. No generated cover is used as a fake interactive scene.

Three.js r147 is bundled under MIT; original header is preserved. See `THREE-LICENSE.txt`. All other code, UI drawings, geometry, procedural wood textures and sound synthesis were created for this project.

Run `node tests.cjs` to check all eight ponds through ordinary water-input methods, first-bloom timing, exact mid-drift reload, Undo, Calm, bounded motion and terminal reward guards. These are model checks, distinct from native browser playtests. `build.py` runs the checks, adds cache versions and creates a reproducible game-only ZIP. An optional Node executable path may be passed as its first argument.

Responsive checks target 320×568, 390×844 and 844×390. Renderer density is capped at 1.5 and rendering at approximately 40 FPS; page hiding pauses simulation. Browser viewport checks do not certify every physical handset. WebGL context loss shows a recoverable reload action.
