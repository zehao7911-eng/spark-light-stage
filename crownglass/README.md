# CROWNGLASS

A complete, small 3D capture puzzle for touch screens and desktop browsers.

Tap a glowing enemy. Your piece captures it and becomes its chess form. Clear the court. There are no empty moves, enemy turns, check rules, timers or purchases. A movement diagram follows your current form. Undo and a winning-next-move hint are always available.

## Progression

12 solver-verified chambers, five piece forms, crystal blockers, branching choices, 36 best-score stars and four porcelain finishes. Earn one star for a clear, another without hints and another without undo. Finishes unlock at 6, 18 and 30 stars. Later chambers share the same observatory with three lighting/material chapters. Progress saves in this browser; refresh resumes the logical position, not an exact animation frame. Clearing browser storage removes the save.

## Controls

Touch or click a glowing piece. Z undoes, H hints, R restarts, P or Escape pauses. Sound starts after a gesture and can be muted. Background tabs pause. Phone landscape, portrait and safe-area layouts are included. Rendering resolution is capped and small/coarse-pointer devices disable dynamic shadows. A WebGL-capable browser is required; physical phone performance varies by device.

## Run and download

Open `standalone.html` directly, or serve this directory with any static HTTP server. `index.html` and `standalone.html` embed all runtime scripts and styles; no CDN, account, telemetry or external assets are needed. Serve `index-source.html` to develop with separate files.

Run `node tests.cjs` for rules, generation, complete solutions, animation timing, save restoration and progression tests. Run `python build.py` to reproduce the embedded pages, SHA256 manifest and ZIP.

## Art and reference

Rezona's **Cooler chess** was inspected for sculptural chess presentation and capture camera emphasis: https://rezona.ai/game/pgcserver/pv/FJtfHXoZ/v7/dist/index.html . Its source, models, textures, branding and sounds are not included. CROWNGLASS is an original implementation with different capture-only transformation rules and original generated layouts. Porcelain sculptures, marble textures, compass mosaic, celestial arch, particles and synthesized audio are generated locally by our code. This is not an adaptation of an upstream complete game.

Original code and procedural assets: MIT, see LICENSE. Three.js r147: MIT, see LICENSE-THREE.txt. The library license remains embedded in the runtime.
