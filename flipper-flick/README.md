# Flipper Flick

An original, complete little HTML5 ice-rink game: pull back anywhere, release to slide your mint seal, and bump every rival into the water. Six authored rinks, rubber buoys, physical ricochets, rival replies, two rescue rings, splash chains, stars, trophy shelf and a sunny hat. All interface text is English. No image generation was used. All models, shaders, animation and SVG icon are original code; the cover, if included, is an actual renderer screenshot.

## Play

Serve this folder with any static HTTP server, e.g. `python -m http.server 8000`, then open the address. Everything is bundled locally; there is no CDN, account, analytics, external font or paid item. A modern WebGL browser is required. File URLs may work in desktop browsers, but use HTTP/HTTPS for reliable mobile hosting.

Drag anywhere on the ice canvas **backwards** from the desired travel direction, then release. Longer pulls give more power; a dotted line indicates direction (it is not a full physics outcome prediction). A tiny tap/cancel never launches. After the player's slide settles, orange arrows briefly show each surviving rival's reply. Nothing moves while awaiting your next flick: there is no aim timer. Hitting an inflatable buoy reflects velocity. Avoid the open edge. A fall spends one rescue ring and returns your seal to a free starting position; a third fall loses the round. Retry is free. Knock all rivals out to clear the rink. Rival-on-rival knockouts also count.

Keyboard: Left/Right rotate aim; Up/Down change power; Space flicks; Escape pauses. Sound toggle, help and trophy shelf are always available. The shelf asks before switching away from a different unfinished rink. Retrying the same rink deliberately restarts it.

Each knockout scores 100 times its chain number within the current player/reply exchange. Three stars are awarded for clearing, using no rescue rings, and finishing within opponent count + 2 flicks. Shelf stars are best-per-rink rather than repeatedly farmed rewards. Six stars unlock the optional sunny hat. Later ice tours reuse the same six layouts and palettes with slightly stronger capped rival replies; they are not infinite unique authored levels. These are local computer rivals, not online players.

## Reference

Public Rezona **Pingüi Push**, https://rezona.ai/game/pgcserver/pv/oEcHAiLc/v1/dist/index.html , was actually started in English. Native drag produced a visible charged direction arrow; subsequent autonomous rounds and a loss indicator were observed. No reference win or successful knockout was verified. No reference source, models, textures or audio were copied. The reference's simultaneous timed penguin battle inspired the broad pull/release collision loop. This version has original smooth seals, a harbour ice-club setting and untimed player/reply turns, and does not claim to be an identical remake.

## Art and performance

Original Three.js rounded meshes with separate muzzle, nose, eyes, catchlights, cheeks, whiskers, flippers, tail, neckerchief and hat. Animated flippers, blinks, body squash, heading, falling and spectator sway; layered thick ice, etchings, floating islands, evergreens, piers, rope, warm lanterns and pennants. Water is an original shader, shadows a small code-drawn radial texture. No Image tool or downloaded bitmap art. Physics uses circular ground colliders, not full soft-body or fluid simulation. Bounded actors, effects (130), DOM floaters (10), audio voices (12), fixed 120 Hz physics, 40 Hz render target and DPR cap 1.5. No guaranteed handset frame-rate claim.

Local storage preserves exact positions, velocities, reply plans, phase, rescue rings, stars, high scores, unlocks and sound preference. Refresh opens paused, including final results. Blocked storage falls back to the current session. Pause, blur and hidden tabs stop simulation, rendering and audio; resize/cancel releases aim without firing. Graphics loss offers saved-round reload. A physical phone has not been tested; responsive browser tests are reported separately.

## Source and tests

`core.js` is the deterministic game model, `view.js` the renderer, and `app.js` input, sound, menus, reward tracking and persistence. `node tests.cjs` completes all six courts by ordinary launch/step APIs, checks finite physics, idle, invalid/tiny drags, ring consumption, exact mid-slide restore, corrupt saves and terminal nonduplicate reward. The previewing test controller is not a human difficulty or completion-time claim. `python build.py [node-path]` runs tests, fingerprints runtime assets and creates the game-only FLIPPER-FLICK.zip. Browser interaction and layout tests are separate.

Three.js r147 is bundled in assets/three.min.js under the MIT license; full notice in THREE-LICENSE.txt. The original game code and original code-created art may be edited and redistributed with this package; retain the third-party notice.
