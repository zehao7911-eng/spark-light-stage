# Citrus Club

A complete mobile-friendly fruit-slicing game adapted from the full **Webninja** project by Jorge Palacios and contributors. Swipe through fruit to fill a juice jar, leave the dark bombs alone, then play the next serving. There is no inventory, route puzzle, separate movement stick or aiming button.

## Play

Open `index.html`, or serve this folder with `python -m http.server 8000`. All code, physics, images and metadata are local; there are no remote fonts, analytics, cameras, accounts or runtime CDN requests. The built bundle includes atlas metadata, so a local file does not need to fetch JSON. Use HTTPS/HTTP when embedding on a game platform.

Press **START SLICING**, then swipe the two waiting fruits. The clock waits for the first touch. Holding a gesture slows the physical world to 30% speed; releasing restores normal time. A gesture can cut multiple fruits; cuts separate the two textured halves across the actual blade direction, with juice droplets, a fading stain, soft hit pause, swipe trail, pitched squish sounds and optional device vibration.

Fill the jar before time runs out. Bombs cost a heart; a short grace period prevents one gesture consuming all hearts. Missing a fruit only breaks the streak. Later servings add dark bombs and occasional golden citrus that fills the jar twice as quickly. Nine servings introduce fan, crossing, staggered, train and paired throws. Serving bests unlock the next serving. Finish, avoid bombs, and reach a three-cut streak for three stars. Blade colors unlock at six and fifteen stars; replaying does not duplicate stars.

Pause, retry, help, serving shelf, replay and final completion are included. Local storage saves the active rigid-body encounter, jar progress, timer, random generator and bests. Reload opens a Continue screen rather than letting fruit fall before input. Transient droplets, half-fruits and trails clear on reload. Rotating the phone cancels the active gesture, remaps the physical field and pauses a running encounter. Escape pauses on desktop. Sound can be toggled; hiding or pausing the game stops voices.

## Actual open-source foundation

Source: https://github.com/pctroll/webninja at **d47b22d0a9872f69a806b5d3587f9723a765a6d6**.

The complete project was the implementation starting point. Its `MainScene`, `Fruit`, `Bomb`, `Splash`, game-over/retry flow, rigid-body world stepping, circular sensor fixtures, impulse launches, escaping-item lifecycle and scoring/life transitions were adapted into `core.js`. This is a modernized gameplay/model port, **not** an unchanged Enchant.js renderer. The old per-sprite touch action is replaced with continuous finger-segment collision; death-on-bomb and life loss on missed fruit are made more forgiving. Spawning, progression, saves, presentation and effects were extended.

The same full **Box2DWeb 2.1.a.3** used by the upstream game is bundled and actually integrates every live fruit and bomb. The pixel/meter adapter and circle construction adapt `box2d.enchant.js` by kassy708. Enchant itself is not a runtime dependency. Relevant original source files, README, adapter and source hashes are retained in `upstream/` for comparison. No upstream icons, Fruit Ninja commercial artwork, photographs, audio, SWF, analytics or web fonts are bundled.

- Webninja code: MIT, copyright 2013 Jorge Palacios. Original design/testing: Julián Rojas; programming: Jorge Palacios and Christian Chomiak. Preserve `LICENSE-WEBNINJA.txt`.
- Physics adapter: MIT, copyright 2012 kassy708. Preserve `LICENSE-PHYSICS-ADAPTER.txt`.
- Box2D: zlib-style license, copyright 2006–2007 Erin Catto; original notice retained in `lib/box2d.js` and `LICENSE-BOX2D.txt`.
- New imagery: three built-in ImageGen generations, shared direction and reference scene. `ART-PROMPTS.json` records the exact prompts. `assets/atlas.json` identifies original generated filenames. Alpha-connected fruit silhouettes, rather than a nominal grid, preserve stems and leaves; empty/full jars share matching registration. Original PNGs are working files outside the runtime package; WebP versions are included.

## Build and verify

`python build.py` regenerates `citrus.bundle.js` and versioned HTML/CSS/image references using only the Python standard library. `node tests.cjs` runs three seeded campaigns through all nine servings using real Box2D motion and actual slice gestures, plus pause-ready behavior, bomb grace/loss, missed fruit, frozen completion, save continuation and orientation resizing. It does not directly call a win function or mark campaign fruit dead.

Canvas 2D rendering, fixed 60 Hz physics, normally 40 FPS drawing with immediate dirty-frame response to gestures. DPR capped at 1.5. Live bodies, half-fruits, juice stains, droplets, rings, labels, trail samples and audio voices are bounded. Image loading has timeout and visible Retry. Phone viewport checks do not constitute a physical-device performance benchmark.
