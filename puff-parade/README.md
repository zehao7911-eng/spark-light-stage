# Puff Parade

Original mobile-first toy-garden Reversi adaptation using actual MIT reversi-web source by Kamil Kurach (2021).

Run a static server in this folder: `python -m http.server 50547`, then open http://localhost:50547/. No build, dependencies, CDN, accounts or backend. Root index.html is the entry point. Game text is English.

Tap a glowing leaf to place a pink rabbit. Bracket blue birds with pink rabbits to flip lines in any of eight directions. Finish with more pink friends. Invalid moves never consume a turn. Forced passes happen automatically; game ends only when neither player can move. A gold preview and per-move flip counts help beginners.

First Friends is a short one-move teaching board. Five replayable duels follow: one 4x4 garden and four 6x6 gardens with increasing AI depth and different seeded openings, palettes and edge details. The last stages use bounded depth-2 search, not a competitive championship AI. Rematches use new seeds. Best medals award win/no hints/no undos, maximum 18 across all six gardens; they cannot be farmed by repeating. Unlock flower crown (6), bow (12), royal crown (18). Unlimited undo returns before the last human turn, but removes the no-undo star. Hints highlight rather than play, but remove the no-hint star. Losing/drawing can be retried.

Source adaptation:
- source-board.js: actual upstream Board class with four paired-direction scanners, findValidMoves/pairs and scoring; sized constructor/reset, quiet initialization, diagonal boundary guards fixed.
- core.js: upstream Controller capture-pair aggregation adapted; new lifecycle/pass/terminal/AI/progression/save code.
- upstream/: unmodified Board.js, Controller.js, README.md for review. These snapshots are not executed; Controller's original CDN import is not a dependency.
- LICENSE-REVERSI.txt and source-manifest.json retain license, exact source commit and SHA256 hashes.
- art.js / game.js / style.css / index.html: original presentation and browser controller, under same MIT terms with copyright 2026 Puff Parade contributors.

No original source art/audio/fonts/dependencies included. All visuals and audio are code-generated original assets.

Mobile: large 4x4/6x6 touch grid, safe responsive portrait/landscape layouts; capped DPR1.5, 40fps rendering target, <=160 effect motes, <=16 scheduled audio voices. Keyboard arrows navigate cells and Enter/Space places. Mute default; sound enabled by gesture. Pause, blur and hidden stop simulation/render/audio. Resume is explicit. Active board, turn, seed, move history, assist counters and best rewards persist; cosmetic in-flight flips settle immediately on reload. Browser storage denial falls back to this-tab play. No physical handset performance certification.

Tests: `node tests.mjs` (Node with ES modules). Includes independent directional oracle comparison, full games/pass handling, multi-ray flips, invalid/terminal guards, all campaign rewards, replay caps, undo/save restoration and numerical bounds. See QA.md for actual browser validation.

