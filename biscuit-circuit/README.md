# Biscuit Circuit

An original miniature bakery racing game for browsers and phones. Inspired by the scale contrast and readability of Rezona's public Table Top Turbo, but independently designed and written, with new cars, scenery, courses and simplified drift/boost controls. No reference source or assets copied.

## Play
The car steers and accelerates automatically. Hold DRIFT (or Space) on bends, then release on straights to convert charge into a boost. Hold through a long straight and the tires overheat, slowing the car. Lane arrows / A-D / left-right keys switch lanes; horizontal dragging on the playfield also changes lanes. Collect gold rings and avoid biscuit crumbs. Three laps against three computer racers. No elimination; even a slow run reaches a result.

Six distinct closed circuit shapes and bakery palettes. Finish first for three stars, second for two, otherwise one. Best stars and times are stored per circuit. Mint, Honey and Lilac cars unlock at 4/8/12 total stars; select them in Courses and Garage. Collected rings are a per-race record, not premium currency. You can replay any course to improve.

## Run / export
Serve this folder over HTTP/HTTPS, e.g. `python -m http.server 8080`, or host the folder directly on GitHub Pages. Open index.html via the server. ES modules require a server; double-click file:// is not supported. No CDN, login, payments, analytics or online service. Local bundled Three.js r147 MIT. Original code MIT; see both license files. Original built-in generated cover/icon are documented in ART-PROMPTS.md. Cover art is a promotional close-up, not the actual renderer.

## Implementation
Fixed 120 Hz model, arc-length sampled closed tracks, exponential acceleration/lane smoothing, real player-relative chase camera, one 1024px shadow map, DPR capped at 1.5, maximum 80 transient effects. Active progress and records save locally; pause, tab hiding and losing focus release input and stop simulation/audio. Reload resumes behind a paused start screen.

## Verify
`node tests.mjs` checks all six courses completed with regular drift and lane inputs, competitive skilled driving, continuous bounds, deterministic active restore, idempotent best awards, finish-state freeze, overheat, no-input finish, malformed save/step rejection and closed paths. Browser QA covers actual finish, perfect exit, lane/touch controls, pause/reload, garage, small portrait and landscape layouts. Physical iOS/Android hardware has not been tested.

Reference observed: https://rezona.ai/game/pgcserver/pv/DKkkOgJW/v19/dist/index.html . Actual public play reached fourth place, lap 1/3, 43 cm/s and an off-track reset prompt. No claim to completing or winning the reference game.
