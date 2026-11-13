# SHORE SIGNAL

Little finds. Lovely days.

An original touch-first 3D metal-detecting game. Hold and sweep the detector over the sand; the meter, coil light and bleeps strengthen near a buried keepsake. Lift to dig where the coil actually is. Tap a place for a direct walking search, or use PULSE for four seconds of optional visible clues. The initial detector is already close to the first coin, and a first-signal tag offers an immediate alternative. No account, timer, lives or purchases.

## Six shores

1. The First Bleep — three lost things at Sandbar Bay.
2. Pocket Change — four finds among the palms, towel, parasol and dock.
3. Between the Pools — four keepsakes beside rocky pools, ropes and an arch.
4. A Little History — a second four-find visit to Tidepool Cove.
5. After the Picnic — five finds beneath the Lantern Strand lights.
6. Last Light, Lost Things — a final five-find visit.

These are six finite authored arrangements across three shared architectural settings, not six different engines or an endless unique world. The collection has 25 discovery entries drawn from six original mesh families with three finish variants: sun coin, old key, tide ring, pocket watch, toy sailboat and heart locket. They are not 25 distinct sculpted designs.

Earn up to three stars per shore for finishing, at most two empty digs, and no empty digs. Replays record the best stars and score rather than adding the same awards again. A wider real detection range and Seaglass coat unlock at six stars. A kinder recovery radius and Rosewood coat unlock at twelve stars. Equipment is earned, never bought. Your discoveries appear in a stable discovery-order sample tray and can be inspected in the field collection. Finding one immediately saves it, even before finishing the shore.

## Controls

- Touch / mouse: hold and sweep on the beach; lift to excavate the actual coil position.
- Tap a place: walk there, then excavate. PULSE briefly reveals optional clue buttons. Both are deliberate easy alternatives, not tests of unassisted search skill.
- Keyboard: arrows / WASD sweep in screen-relative directions; Space digs; P pulses; Escape pauses / resumes the pause card.
- Sound, Still water, and Light rendering settings are independent. Light disables real-time shadows and reduces pixel density. Coarse-pointer devices start in Light mode.
- An active visit restores paused on reload, with no latched finger. A committed excavation resumes without duplicating its find. Restarting / changing an unfinished visit asks inside the game before abandoning its local board; the permanent collection remains saved.

## Art and feedback

Original connected adult surveyor with face, cap, field coat, backpack, flat shoe soles, two-link arms and legs, palms on a real detector grip, a separate shovel, coil and control box. Real coil coordinates drive both detection and the visual model. Sand scoops, bounded particles, brighter locked signal, rising-rate detector notes, discovery arpeggios, a small treasure rising from the actual hole to the palm and then the sample tray, floating points and a persistent field album provide feedback. There is no rigid-body terrain excavation simulation.

Rounded 3D code-built beach islands, moving water and foam, palm fronds, parasol, towel, timber dock, tide pools, arch, lanterns, miniature beacon, sample tray and field bag share a restrained maritime palette. No image generation or external model/texture/font/audio request is used. The cover is an actual game screenshot; the SVG icon is original.

## Reference and provenance

The Rezona reference actually entered and interacted with was [Blindsight](https://rezona.ai/game/pgcserver/pv/WoMdxPle/v1/dist/index.html). EASY and the first-person scene were opened; holding native LMB visibly revealed cyan scanned geometry and reduced charge. E was attempted, but objectives remained 0/4. Only the active-reveal feedback informed this independently authored bright third-person detecting game. No full reference run, exact gameplay/art reproduction, copied reference source/media, or affiliation is claimed.

Sun Kissed Shore / Heartsweeper was excluded because Minesweeper repeats earlier work. Root Cellar Cabaret remained loading. Battle bot's title/controls were inspected and combat was excluded. Earlier game records were searched to avoid another produced detector game; mining, fossil brushing, photographic discovery and vacuum cleanup are adjacent themes with different core controls.

Shared original primitive, batching, frame-clock and guarded platform-bridge patterns were adapted from earlier original projects including Ripple Club / Crock & Roll. Locally bundled Three.js r147 is MIT licensed. See LICENSE and vendor/THREE-LICENSE.txt.

## Run and build

Serve this directory with any static HTTP server and open index.html. index.html and standalone.html are identical self-contained entries with inline renderer, styles, game and icon. Source modules are included for editing. No dependency installation or runtime CDN is required. Browser file: navigation was unavailable in the testing tool, so direct cold-file UI execution is not claimed.

Rebuild: `python build.py`. It writes the two entries and ../SHORE-SIGNAL.zip. Test: `node tests.mjs` and `node model-tests.mjs`. The root-index ZIP is suitable for static hosting/import tools accepting HTML5 ZIPs; actual GameWave import and physical-phone GPU behavior have not been certified.

Bounds: 60 Hz simulation with independent 40 / 30 FPS standard / Light painting; DPR capped at 1.5 / 1; cached static shadows, vertex-colour scene batching, instanced limbs and 100 discovery particles; at most 32 holes, 18 synthesis voices. No analytics or background asset downloads. Viewport testing is not a physical-handset FPS, battery or thermal guarantee.

See VALIDATION.md, QA.json and GAMEWAVE-IMPORT.md for evidence and platform scope.
