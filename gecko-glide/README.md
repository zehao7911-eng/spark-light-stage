# GECKO GLIDE

A portrait-friendly one-finger climbing game adapted from the complete **PIN CLIMB** game by ABA Games (MIT, 2021). Hold to extend a rotating sticky vine; release to curl it back. Touch higher green branch grips, avoid red thorn rosettes, and climb before the rising mist reaches the anchor.

## What's included

Eight finite, seeded climbs across three illustrated greenhouse palettes. Branch lane sequences and spacing differ between climbs, with additional thorn obstacles after the introductory climb. The first four climbs are deliberately forgiving; later climbs require releasing to avoid thorns. This is a short one-button arcade game, not a large roguelike or infinitely unique campaign.

One star for reaching the goal, one for taking no thorn damage, one for a chain of three grips within four seconds of each other. Only the best stars for each climb count, to a maximum of 24. Best scores persist separately. Three additional cosmetic colors unlock at 3, 9 and 15 total stars; there is no currency purchase. Failed climbs can be restarted without a penalty to earlier progress.

Eleven original SVG illustrations cover five gecko expressions/poses, three detailed greenhouse backgrounds and three grip-branch variants. Frame-by-frame model easing, stretch/retraction, leaf motion, petals, sticky-hand tip, score words, chains, optional small sound effects and a brief finish flourish provide feedback. No reference-video art/audio, commercial game assets, AI image generation or copied game branding are used.

## Run

Open index.html directly, or host all files together on any static HTTP server. All assets and source are bundled. No CDN, external font, server, login or runtime network download is needed.

Touch anywhere on the scene or hold the large HOLD button. Release to retract. Desktop: hold Space or Up. Escape pauses. Music-note button enables small synthesized effects (muted initially); no background soundtrack is claimed.

The garden menu provides replay, color selection and credits. Active state, procedural RNG, pins, current anchor/angle/length, thorn health, score and chapter are saved locally. Continue restores the model with the finger released. Pose easing and particles are cosmetic and restart after reload. Storage denied leaves the session usable. Pause, backgrounding, blur and touch cancellation release input; pause stops model/audio and ongoing redraws. Canvas DPR is capped at 1.5 and active drawing at 40 FPS. Mobile layouts have been browser-emulated, not physically certified on every phone.

## Source

See SOURCE.md for the pinned repository, manifest, MIT notice and complete-loop adaptation details. `upstream/pinclimb.js` is unmodified source, not a few selected math routines. The complete original game's declarations/update loop are adapted in source-game.js. The original crisp-game-lib rendering/audio/replay library is **not** bundled or claimed as ported wholesale; a small local compatibility runtime supplies its required APIs and new Canvas presentation.

Run `node tests.cjs` for model validation. `tools/build-art.py` and `tools/build-game.py` regenerate the editable art and adaptation from standard Python. `?qa=1` exposes local QA inspection; normal play does not.
