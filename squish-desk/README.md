# Squish Desk

A realtime 3D soft-toy study of the publicly playable **Squish Lab** on [Rezona](https://rezona.ai/studio/game), viewed at `/game/pgcserver/pv/itQGgkze/v7/dist/index.html`. The reference was actually played to inspect its Poke / Stretch / Fold / Press interaction, cream-and-pink interface, ceramic tub, googly face and material collection. This is an independently implemented recreation of that presentation and interaction structure, with a separate name; it is not an official Rezona release or a claim of pixel-identical reproduction. The reference site's bundled code, images and sound recordings are not redistributed in this package.

## Play

Serve this folder over HTTP (`python -m http.server 8000`) and open localhost:8000. Touch or drag the slime; use the four bottom tool buttons or keys 1–4. Right-side controls add glitter, beads, pigment or glow. The top-left button opens the collection. A fresh tub resets shape and mix-ins, preserving earned materials. There are twelve materials, with different spring stiffness, damping and finish. No timer or lives.

Progress and selected material are saved locally. Reload starts with a fresh shape and the saved collection. Pause, page hiding, loss of focus and cancelled touch end held input. Fast taps count immediately; stationary long holds have bounded rewards. No login, CDN or paid features are needed. WebGL is required. On graphics failure the game offers a reload message instead of an endless spinner.

## Implementation and assets

`core.js`: original 3,185-vertex spring mesh with seam constraints, local deformation tools, gradual shape memory, material unlocks and validated collection saves. `game.js`: Three.js rendering, physical gloss/transmission, soft shadows, deformed face and mix-in attachments, pointer capture, responsive camera, bounded synthesized sound effects. No game framework or commercial game source was copied.

Three.js r147 is MIT, Copyright 2010–2022 Three.js Authors. See `THREE-LICENSE.txt`. The bundled `assets/three.min.js` retains its original license header.

Background and cover/icon were generated for this project with OpenAI's built-in image tool. The icon is a resized version of the same square cover. Live slime, bowl, facial features and decorations are procedural geometry, not a flattened cover image. Exact prompts are in `ART-PROMPTS.json`. Audio and interface drawings are original code.

Run `node tests.cjs` for solver, distinct tool, unlock, score guard, reset and save checks. `build.py` runs checks, adds content cache versions, and makes a reproducible game-only ZIP. Browser phone viewport testing is not physical handset certification. Artwork and interaction are a close visual study, not a guarantee of identical materials, physics, sounds or pixels to the reference.
