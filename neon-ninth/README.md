# NEON NINTH

An original pocket-sized rooftop batting club for the web. English UI. No accounts,
external requests, fonts, tracking, paid currency or real-money rewards.

## Play
Open `index.html` through a web server, or open the bundled `standalone.html` directly.
The latter embeds all styles, scripts and the Three.js engine and works without a CDN.
If browser WebGL is unavailable, the game shows a retry screen instead of a permanent loader.

- Choose left, center or right. The gold-lit target is worth an extra 500 points.
- Tap SWING (or press Space) as the two contact rings meet.
- Arrow keys or 1/2/3 choose a lane on desktop.
- Four consecutive hits open three double-score Fever pitches. A miss breaks the chain.
- Complete 12 pitches. Three missed pitches make an out; three outs finish the round.
  A secondary 60-second clock counts only live incoming-pitch time.
- Wide Timing is enabled by default. Precise Timing is optional.
- Score the target to unlock the next challenge. Additional stars require three perfect
  hits and four lit targets. Stars and personal records persist locally.

## Content
Six challenge sessions on one detailed rooftop court, with six lighting treatments,
progressively faster pitching, curveballs from session two, golden double-score balls
from session three, and more demanding target rotation from session four. Four uniform
colors unlock at 0, 3, 8 and 14 stars. This is not six unrelated maps.

The original procedural set includes a small jointed vinyl batter, stitched baseball,
pitching machine, cage net, benches, painted court, pennants, animated elevated train,
layered skyline with instanced windows, rooftop equipment and original signage.
Physical contact is an arcade timing/trajectory system, not a full rigid-body simulator.
The ball bounces off the target plane, and the landing lane is locked at contact.

## Source provenance
The imported `open-source-game-reference` skill was used to search and assess references.
No matching baseball game was found in its catalog, so the official MIT repository
[HomeRunBBallDD](https://github.com/eecollante10/HomeRunBBallDD) was inspected directly.
Revision: `99652cf3b57e5b6ff7121f82bad4c8c643add36c`, Edgard Collante, 2017.

`source-rules.js` ports Game.js's four scoring bands, speed bonuses, three-strikes/three-outs
cycle, time-end check and descending top-ten insertion. The complete original gameplay
source and its menu/boot/preloader and asset provenance README are retained in `upstream/`.
This is a new 3D implementation with a limited rules port, not the entire Phaser game
running unchanged. No upstream art, audio, Phaser runtime or Rezona assets/code are reused.
Original source license: `LICENSE-UPSTREAM.txt`.

Visual/interaction reference: Rezona's public Hit'em — Batting Center
(`https://rezona.ai/game/pgcserver/pv/gabSFeBe/v9/dist/index.html`), observed and played.
This game has original geometry, UI, artwork and synthesized effects, and is not an exact
copy of that reference. Three.js r147 is included under MIT (`LICENSE-THREE.txt`).

## Art rules
Stylized three-dimensional rooftop sports miniature. Deep ink/teal structural colors,
warm biscuit-colored actions, mint targeting highlights, restrained peach/plum skyline.
Original world-space signs use the same numbered-club identity as the interface.
No external photo, generated cover, character model, logo or audio file is required.
Impact particles, trails, subtle hit freeze, camera follow and optional Web Audio effects
make contact clear. Reduced-motion settings disable shake, flash and flight camera motion.

## Mobile and lifecycle
Responsive 320px portrait through desktop, including short landscape. All visible buttons
are at least 44 CSS pixels in each dimension. DPR capped at 1.5 for small/touch devices;
sun shadows are disabled on those devices. Stationary meshes share merged buffers;
lit city windows are instanced and particles/trails are capped. Hidden tabs and blur pause
the match; pause stops simulation, scene rendering and active audio voices.

Only completed progress is saved. Reloading an unfinished session returns to the club.
Storage failure is tolerated. A WebGL-capable modern mobile browser is required.
Desktop mobile viewport tests are not a physical handset certification.

## Validation
Run `node tests.cjs` and `node tests-scene.cjs` with no package installation. The former
covers 120 winning sessions across all six challenges/both timing modes plus source
scoring, target-plane contact, changed aim during flight, failure, malformed saves,
single-result awards, star/uniform unlocks and repeated input. The latter constructs the
actual Three.js geometry with a renderer stub to check finite transforms, material themes,
pooled feedback and mesh/triangle budgets. It does not replace real browser rendering QA.

The build script in `build.py` regenerates standalone HTML, SHA256 manifest and the ZIP.
