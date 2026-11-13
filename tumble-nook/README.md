# TUMBLE NOOK

One little turn. One cosy nap.

A complete original HTML5 quarter-turn gravity-room puzzle. Tap left or right to rotate the wooden nook by 90 degrees. The hamster then rolls downhill until a wall or its bed stops it. Collect three optional sunflower seeds before bedtime for extra stars. The opening takes one right turn and has a 0.8-second model animation; this is an animation duration, not a human usability or device performance measurement.

## Play

- Tap TURN LEFT or TURN RIGHT, or swipe horizontally on the room. A picture tap alone only primes sound and does not spend a turn. Left/right arrow keys are equivalent; U undoes, H guides, Esc pauses.
- One quarter-turn counts as one turn even when a wall keeps the hamster in place. Turning can be useful without translation. Input is locked until the room and hamster settle. The bed catches the hamster as soon as it crosses its cell.
- Undo is free and keeps up to 100 prior turns. Restart is always available. Guide suggests one useful turn from the actual current state and never moves anything. It first searches a full-seed route, then a bedtime route if full collection is no longer possible; Undo can restore an earlier route.
- Stars: tucked in; all three seeds; all three seeds without Guide and within par + 2. No countdown, lives, purchases, payment, ads, login or backend. Replays keep only best stars and fewest turns, with no repeat reward farming.

## Finished content and feedback

Twelve fixed boards, generated offline and selected with a breadth-first solver. Full-seed minimums are 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8 and 9 turns. These are a finite campaign with unlimited replays, not endless unique levels. The first four rooms use a 7x7 grid; later rooms use 9x9, with one constant board size and the same rules. Three genuinely different homes appear in four-room chapters: Maple Attic, Fern Sunroom and Moon Loft.

The whole board turns, including its walls, seeds and bed. Its scale eases inward at diagonal angles so corners stay inside the canvas. The hamster follows every passable cell along the new gravity direction, with rolling tilt, closed-eye expression, cell-timed seed chimes and stars, a landing squash and a sleeping pose in its bed. A fixed brass rotor, wood-grain wall/floor clusters, room-specific colours, clear bed marker, original synthesized creak/seed/landing/bedtime notes, bounded particles and optional vibration complete the feedback.

A twelve-entry nook book records named friends and best stars. The four generated hamster poses share one coherent original character design; they are not twelve bespoke character rigs. Earn 9/24 best stars to unlock Sky/Plum scarves. Only green scarf pixels are recoloured, keeping face, fur and eyes consistent. Sound and gentle effects persist. Active board, orientation, seeds, history, guide use and in-flight animation time save locally; refresh resumes paused. Transient particles and ambient phase restart after reload. If storage is unavailable, play continues in memory.

## Art and reference provenance

Seven original assets were created with built-in image_gen: three portrait room backgrounds, a transparent four-pose hamster atlas, a transparent four-prop atlas, cover illustration and app icon. Actual sprite bounds were measured from alpha, with split lines chosen in the transparent gaps; no ears, paws, bed rims or neighboring sprites are cropped. WebP delivery encoding and nearest-neighbour size preparation keep all seven images to 1,204,630 bytes; the cover is lazy-loaded in the book. Original PNGs are retained locally in the sibling tumble-nook-art-sources directory. Full generation prompts are in ART-PROMPTS.json. The cover is an illustration, not a gameplay screenshot.

The game logic, animated board, interface, audio and feedback code are original. The [Rezona library](https://rezona.ai/studio/game) was inspected: Fathom and SENDA were rejected after viewing their first-person/exploration screens. The public [Monument Valley spatial reference](https://rezona.ai/game/pgcserver/play/DajkmMXU) was opened in English and its toy-like spatial presentation reviewed. No completed reference route, copied assets/source or exact remake is claimed. This game uses a different, lane-free quarter-turn gravity-maze loop, rather than that reference's walking/bridge-perspective loop. Prior Foxtail parking, Prismbrook colour flood, Lantern Unwind string crossings, Rill & Root water carving and Ivory Steps bridge walking were checked to avoid repeating their gameplay.

## Run / import / build

Serve this folder on any static HTTP/HTTPS host, including GitHub Pages. `python -m http.server 8080` is sufficient locally. Upload the entire ZIP contents, with index.html at root and assets beside it. No package install, CDN, remote font, WebGL, service worker, external runtime or account is required. Canvas 2D and Web Audio are used; sound starts only after a gesture. Each image loads independently without blocking play; code-drawn scene, hamster, seed and bed fallbacks remain playable if imagery fails.

The simulation uses a fixed 60 Hz step and about 40 Hz drawing, a 720x960 internal world, a 1.5 DPR ceiling (1 with Gentle effects), at most 100 transient effects, 16 sound voices and eight scarf sprite caches. Hidden/paused gameplay stops simulation and audio. These are implementation bounds, not a certified phone FPS claim.

`node tests.cjs` runs 3,790 checks including all minimum full-seed routes, every intermediate collision cell, 144 random off-route recoveries, exact turning/rolling save continuation, free Undo, guide scoring, best-only reward idempotency, terminal behavior, malformed saves and no idle autoplay. Native UI testing additionally completed all twelve rooms at par to 36 stars and 12 book entries. See native-campaign.json and qa.json for the final browser checks and limitations. No physical Android/iOS handset test was performed.

`python build.py /absolute/path/to/node` runs the model checks, stamps local assets and writes a reproducible TUMBLE-NOOK.zip one directory above the source. The root entrypoint and all runtime resources are included.

## License

Original code and included artwork are distributed under MIT. Image-generated artwork is identified above and in ART-PROMPTS.json. No commercial source, branding, characters, challenge cards or media were copied. See LICENSE.txt.
