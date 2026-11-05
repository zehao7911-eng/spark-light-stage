# CLICKVAULT

Little locks. Lovely things. An original tactile HTML5 ring-lock puzzle with twelve clockwork keepsakes.

Turn the rings until every gap points straight up. The key falls, the cabinet doors open, and a miniature comes to life. Tap a ring to turn it clockwise; drag around a ring to choose a direction, or use the large left/right buttons below. Later controls turn the rings marked underneath them. These are deliberately designed one-way clutch puzzles, not a simulation of an ordinary gear train.

There is no countdown, payment, life limit or penalty for retrying. Undo and hints are free. Every hint shows a genuine next move from the current arrangement; it never turns a ring for you. A star rewards opening, a second rewards finishing within par, and a third rewards solving without hints. Undo restores the previous arrangement but does not remove the turn already spent. Replays retain the best stars and fewest turns.

## Twelve cabinets

The finite campaign has twelve solver-selected starts across authored one-, two- and three-ring mechanisms. Rings have six or eight detents. Independent, cascading, circular and doubled linkages introduce different effects. Par is the shortest reachable-state solution in both directions, not a guessed target. Hints use that same actual state graph.

The Sunroom, Fern House and Night Room each contain four cabinets. Twelve original animated keepsakes include a sun music box, paper moon, enamel bird, lighthouse, whale, brass butterfly, night bloom, glasshouse, orrery, comet train, jelly lantern and miniature carousel. Collection entries can be opened and wound again. Four opened locks unlock Moonstone; eight unlock Marquetry. Cabinet finishes change visible materials, never puzzle rules. There is no infinite-level claim.

## Start / import / edit

- Extract the ZIP and open `index.html` or `standalone.html`. They are identical self-contained play files, with inline logic, styles, artwork and synthesized sound. An optional sibling SVG supplies the icon. No CDN, font, model, engine, account or SDK is needed to start.
- Static hosts and GitHub Pages can serve the whole folder. Use the actual Pages play URL rather than a GitHub source viewer.
- For source editing, serve this directory with `python -m http.server 4650` and open `index-source.html`.
- `python build.py` rebuilds the two inline entries and the root-index `CLICKVAULT.zip`. `node tests.mjs` and `node sdk-tests.mjs` repeat controller and optional-host checks.
- Keyboard: 1 / 2 / 3 turns that ring right; Shift reverses it. U undoes, H shows a hint, Escape pauses. The focused drawing field also accepts left/right for the outer ring. Tab/Enter operate buttons.

Local save key: `clickvault-v1`. Only this game's profile and active lock are stored. Active positions, partial-turn time, histories, hint provenance and settings recover behind an explicit pause menu. Drag input is not restored. Storage failure leaves play available in memory. The optional cloud profile merges best medals, minimum move records and one-time cosmetic claim flags; it does not replace the locally owned active lock.

## Art and reference

The emerald/coral/brass cabinet, engraved annuli, rounded hardware, inlay, tiny mechanical objects, three backdrops, interface, SVG icon and Web Audio cues are original code-built illustrations. Rendering is Canvas 2D with layered depth, not a 3D engine. `cover.png` is an actual runtime screenshot. No image generation or reference media extraction was used.

The current [Rezona Screw Shiba](https://rezona.ai/game/pgcserver/pv/oENpcHewif/v3/dist/index.html) was started and a blue screw was removed through normal pointer input, visibly falling toward the rack. Its immediate mechanical feedback informed the presentation; its screw-removal and colour-box rules are not used here. The reference was not completed. Earlier Bolt & Boogie already used screw-removal rules, so this game's core instead aligns linked notches to release a key. Earlier glass-fitting and spring-factory games are adjacent craft themes, not the same ring-lock puzzle. No claim of reference art parity, a platform grade or a full commercial-game remake is made.

Original MIT-licensed bridge/frame-clock scaffolding is inherited from the project's Fall Fellows / Shore Signal / Crock & Roll / Ripple Club and Punch Clock / Boop Society / Tow the Moon helpers, with notices retained. No third-party engine or media is bundled. See `GAMEWAVE-IMPORT.md` and `VALIDATION.md` for integration and evidence limits.
