# Snipwing · A Little Room to Fly

An original compact HTML5 tactile rescue game. Swipe through elastic silk. A cocoon opens only when its network no longer connects to any fixed pin. Its butterfly unfolds and flutters into the cleared space. There is no timer, damage, purchase, account or lives system.

## Play

- Touch or mouse: draw across strands. Golden braids require two separate passes. The shears track your contact point; broken thread ends recoil and the remaining network sags.
- Optional golden dew: touch all three beads before freeing the final cocoon.
- Undo restores the entire previous changed gesture, including silk, dew and releases. Up to six gestures are retained in the current session. Regrow freely restarts this garden. Undo history is not saved across reloads.
- Keyboard: arrow keys move the shears, Space snips nearby, Z undoes, Escape pauses. A repeated held Space does not generate extra cuts.
- Sound starts after an intentional action. Mute, pause and reduced graphics are available. Hiding the page pauses active play and silences audio.

Three stars reward rescuing all three, collecting every dew bead, and finishing within the garden’s displayed stroke target. The score counts actual severed strands and completion bonuses. Empty swipes and dew-only touches do not spend a counted cutting stroke. Replaying saves only your best stars. Sage shears unlock at six total stars, Golden at twelve; choose them in the Field Guide.

## Content and art

Nine authored gardens: three simple hanging/curtain webs, three apricot gardens with double braids and a radial ribbon fan, and three breezy aviary gardens with additional fixed side pins and a final radial web. Their foliage, pots, apricot clusters, fence/cages, frame materials, web topology, cocoon positions and wing colours vary. They share one conservatory architecture and one scissors/rescue loop. This is a finite miniature game, not an endless campaign or a scientifically accurate silk/biological simulation.

Nine fictional wing varieties have separate collection entries and original colour/marking combinations. The first three rescued butterflies are displayed above the result card; their models have hinged wings, veins, eyespots, bodies, faces and antennae. Pip is an original leaf-capped snail with spiral shell and eyestalks. Every runtime shape, palette, label, icon and sound is independently authored. The title cover is a screenshot of the actual running game. No image generation, external fonts, commercial game assets or downloaded art were used.

The tactile reference was Rezona’s public **Rip — tear the net**, https://rezona.ai/game/pgcserver/pv/RTyBKdiV/v1/dist/index.html . Its start screen and native drag were inspected; 59 severed threads and a visible torn, relaxing mesh were observed. No reference completion, copied source, copied art, sound or identical recreation is claimed. This adaptation adds explicit rescue goals, finite layouts, authored characters, reveal/collection/rewards and undo. The user-provided Harbor Haul V2 grading feedback informed the readability/completeness target; no platform grade or commercial eligibility is guaranteed.

## Run / mobile

Serve this extracted folder over HTTP(S), for example `python -m http.server 8000`, then visit `http://localhost:8000`. `index.html` is at the ZIP root. ES modules need a web server; double-clicking a `file:` URL is not supported. All assets and Three.js are bundled locally, with no CDN dependency. GitHub Pages subdirectory hosting works with relative paths.

Responsive portrait-first UI also supports short landscape screens. Touch capture/cancel, bounded effects, render scheduling capped at 40 FPS, DPR capped at 1.5, a 1024 shadow map and a low mode with DPR 1 and shadows disabled are included. Native browser tests at small/standard/odd-width portrait and landscape sizes are distinct from physical-device testing; no physical handset frame-rate guarantee is made.

Active silk positions, previous physics positions, cut states, braid health, dew and butterfly flight progress are stored in localStorage. If storage is blocked, the current session remains playable. Profiles persist best stars, furthest unlocked garden and shear finish. A save created before completion restores the same physical state; undo history and decorative particles are session-only.

## Source and licence

`core.mjs` contains the deterministic fixed-step Verlet network, connectivity, cuts and rewards. `scene.mjs` builds the original 3D conservatory, characters, instanced strands and effects. `app.mjs` handles touch, UI, audio and storage. `tools/test.mjs` exercises all nine completions, optional rewards, double-pass guards, exact continuation, corruption/invalid input and terminal-state freezing. Run `node tools/test.mjs`.

Original code/art: MIT, see LICENSE.txt. Bundled Three.js r147: MIT, licence included under vendor/. No build step required.
