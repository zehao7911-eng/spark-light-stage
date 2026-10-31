# PHASESHIFT — An Orbital Puzzle

Fold the distance. An original, English HTML5 spatial puzzle with twelve authored orbital chambers. Tap floor to walk, place two portals on white sockets, collect every energy cell and reach the green exit. No timer, lives, purchases, adverts, account or backend.

## Controls

- WALK: tap floor or a socket to walk there. Navigation respects gates and striped floors. Entering a linked socket transports the explorer to its partner, without immediately bouncing back.
- BLUE / AMBER: tap a numbered socket to move that portal. After placing the first ring, the other colour is selected automatically. After completing a pair, interaction automatically returns to WALK. Moving one ring onto the other removes its partner.
- Square / diamond switches change the matching circuit when stepped on. Striped floors force the direction of your next step. Portals can bypass disconnected floors; ordinary walking cannot cross vacuum.
- Undo is free. A hint highlights one next action without executing it. Restart and the chamber map are always available. Keyboard: arrows / WASD, 1/2/3 for modes, Z undo, H hint, Escape pause.

Each chamber awards a completion star, a no-hint star and a gold-route star. The gold target is two actions above the breadth-first optimum; changing a portal costs one action, walking costs one action per tile. Automatic walks count every step. Replaying improves personal bests without farming duplicate rewards. Nine stars unlock Sage; twenty-four unlock Copper. Chambers introduce disconnected islands, gate switches, independent circuits and one-way floors. This is a finite twelve-chamber campaign, not an unlimited generated campaign.

## Run and download

Open `index.html` or `PHASESHIFT-OFFLINE.html` directly, or serve this directory with any static HTTP server. Both built HTML files bundle Three.js, application JavaScript and CSS, so gameplay requires no remote assets or CDN. Editable sources, the build script, deterministic rules tests and library licence are included. Requires WebGL; a clear reload/help message replaces a broken loading screen if graphics are unavailable.

Local save key `phaseshift.v1` stores chamber stars, best routes, explorer finish, mute preference and active chamber state. Reload resumes behind a pause screen. The previous session's undo history is not retained; free undo works for new actions and Restart remains available. Storage denial does not prevent the in-memory game from running. Backgrounding, losing focus and explicit pause stop simulation and sound, release pointer intentions and discard queued walking. A context-loss screen offers reload from the saved step.

## Art and engineering

Original procedural Three.js dioramas: warm-white modular ceramic panels, dark blue mechanical supports, cyan/amber portal spirals, green faceted energy cells, a small articulated explorer, distant orbital structures and a shader planet. Restricted material families and stable camera framing keep the game board readable. Animated limbs, portal compression/reassembly, independent collection/circuit/portal sounds and bounded particles make actions legible. Reduced-motion settings disable camera drift. Runtime art uses no generated image, downloaded illustration or reference-game asset.

Rendering is capped near 40 fps, DPR 1.5, with simple geometry, no real-time shadow maps and at most 120 short particles. World picking uses actual tile meshes; rules use discrete coordinates and bounded graph searches. Touch input ignores extra pointers and cancelled drags. The layout supports portrait and landscape safe areas and controls of at least 44 CSS pixels. Browser viewport tests do not certify performance on a physical handset.

## Reference and skills

Rezona's **Fracture Point**, https://rezona.ai/game/pgcserver/pv/gabSFRUb/v13/dist/index.html , was inspected in the live browser: title/introduction, first test chamber, and the on-screen rule for placing portals on white walls. An attempted shot was inspected; no completed upstream chamber or confirmed upstream portal placement is claimed. This game's floor sockets, compact isometric rooms, rules, maps, camera, art, audio and interface are independently implemented. No reference code or asset is redistributed; this is not a port of that game or an official affiliation.

Applied local skills: game-art, game-design, 3d-games, web-games and mobile-games. They inform silhouette/material consistency, staged rule teaching, simple colliders, bounded effects, audio gesture handling and mobile layout. A skill does not itself guarantee a platform grade or freedom from defects.

Validation: `node test-model.cjs` checks solutions for every chamber, ordinary action transitions, portal entry/latch behavior, one-way movement, gate solidity, save validation and reward rules. Native browser testing additionally completed all twelve chambers with three stars, then checked scene tapping, automatic portal-mode switching, undo, hints, reload restoration, pause freezing and mobile layouts. See `qa-model-report.json`. Source changes can be rebuilt with `python build.py`; `SHA256.json` records the packaged files.
