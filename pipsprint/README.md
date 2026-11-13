# PIPSPRINT — Wind-up Wonders

A small, complete original HTML5 toy runner: hop the coral spools, tuck under the teal arches, and earn a cabinet of three-dimensional wind-up friends. English interface. Touch, mouse and keyboard. No account, advertisements, purchases or backend.

## Play

Extract the ZIP and open `pipsprint/index.html`, or host the folder over HTTP/HTTPS. `index.html` and `standalone.html` embed the scripts, styles and Three.js runtime. The optional browser icon is adjacent. Nothing is fetched from a CDN.

- **HOP**: tap the left button. Space / Up also work.
- **TUCK**: hold the right button to fit under arches. Down also works.
- Alternatively tap the scene to hop, or press the scene for at least 180 ms to tuck. Release to stand up.
- Coral spools need a hop. Teal arches need a tuck. Blue gaps need a jump. Gold spring pads bounce Pip automatically.
- The first two courses wait at each obstacle until the matching input. Course three waits at gaps. Later courses run continuously. Optional **Chill Assist** waits at every actionable obstacle; it does not perform the action for the player.
- Three hearts and free restarts. A gap rescue returns the bird to the far edge and spends a heart. Later idle exposure can lose the run; the introductory cues prevent a passive opening clear.

## Progress

Twelve authored courses, three related workshop palettes, spools / arches / gaps / spring pads, gold buttons and note trails. Three stars reward finishing, no bumps and all three gold buttons in one attempt. A new completed course earns its original toy figure; Toybox displays earned models in colour and unearned silhouettes. Best stars and scores cannot be farmed by replay.

- After **3** completed courses: a second HOP in the air.
- After **6**: nearby ordinary notes are attracted to Pip. Gold buttons still need the route.
- After **9**: hold TUCK while descending to glide.
- At **6 / 18 stars**: Rose / Dusk bib colours.

All twelve toys have separate geometry or silhouette: Pip, rabbit, snail, teapot, whale, rocket, cactus, owl, lighthouse, cloud, daisy and parade captain. These are small original procedural sculptures, not imported commercial character models. The collection viewer turns and gently bobs the figure. There is no claim of twelve rigged characters or infinite authored content.

Local saves preserve active course position, jump state, pickups, obstacle states, health and earned progress. Held controls are released on interruption/reload. Browser storage may be blocked or cleared; play still works in memory. Pause and tab hiding stop the simulation. Gentle Effects removes real-time shadows, reduces pixel density and removes camera shake. Current WebGL-capable browsers are required; graphics failure shows a reload message rather than a loading spinner.

## Art and references

Gameplay direction: Rezona **Banana Mirage**, `https://rezona.ai/game/pgcserver/pv/LRptZeic/v5/dist/index.html`. Its public entry and script were inspected for short-tap hop / hold slide, collectibles, three hearts and impact feedback. Its asset loading did not finish reliably during research, so no completed reference playthrough or pixel-identical reproduction is claimed. No reference script, image, sprite sheet or audio is shipped.

Art direction: the user's atlas **Rounded Cartoon 3D**, `https://mygamesartstyle.jupiterthewarlock.com/styles/rounded-3d/`. The enlarged Sparkling Figurines example was examined for continuous toy proportions, plastic/metal material differences and soft contact shadows. Its screenshot was used for observation only. No reference image, logo, character or interface is redistributed.

All shipped models, icon, surface marks, scene props, interface and synthesized sounds are original code. No image generation is used. This is independent source, not modification of a full third-party game. Three.js r147 is bundled under MIT with its original header and `LICENSE-THREE.txt`. Original work: `LICENSE.txt`.

## Validation and rebuilding

`node qa-model.cjs` exercises normal controller routes through all twelve courses, both standard and assisted, plus idle gating, failure/retry, air-hop limits, save continuation, invalid input and terminal locks. Browser-native input and responsive observations are recorded separately in delivery metadata. Browser viewport tests are not physical iPhone/Android hardware tests or a guaranteed frame rate.

`python build.py` embeds local scripts/styles, builds both entry pages, writes a SHA-256 manifest and makes a deterministic game-only ZIP. `artbook.html` is an explicitly labelled visual-system fixture using the same runtime models, not fabricated game progress.
