# FALL FELLOWS

One good line. One lovely landing.

An original touch-first 3D precision-felling game. Drag toward the gold ring and lift to commit the cut. Three axe blows carve a visible notch, send wood chips flying and bring the tree down. Land the projected centre of the crown in the ring. You can also tap a direction or use the aim arrows and CHOP. A dotted line predicts the landing; a pale ring predicts a drifting target. No timer, lives, purchases or account.

## Six finite meets

1. A Good First Fall: three trees and static targets in Copper Grove.
2. A Little Lean: three different natural lean directions.
3. Across the Breeze: four trees with changing side wind in Fernfall Yard.
4. Tall Orders: four taller trees with longer reach and stronger breezes.
5. The Lantern Waltz: five drifting targets at Lantern Mill.
6. The Last Lovely Log: five mixed tree shapes, lengths, wind and drifting targets.

There are 24 authored attempts across three shared environmental sets, with free retries and replay. These are not six separate worlds or an endless unique campaign. Tree forms use original rounded oak, tiered conifer and spreading crown meshes. Targets, natural lean, height, gusts and drift change the same simple action rather than adding more controls.

Earn three best stars per meet: finish; at most one miss without Guide; and at least 75% mean precision with no misses or Guide. Repeated settlement records the best score and best stars instead of multiplying rewards. GUIDE aims and commits the current tree; a guided visit earns one star while an earlier best remains safe. It never gates later meets. Six stars unlock a genuinely broader target and Fern shirt. Twelve unlock gentler variable wind, the broad ring and a brass shaft damper, plus Thistle shirt.

## Controls and saves

- Touch/mouse: drag on the ground toward the ring, then lift. A tap on a direction also commits a cut. Canceling a touch never chops.
- Left/right buttons adjust the line. CHOP commits; after a miss it becomes RETRY. There is no penalty wallet or limited retry supply.
- Keyboard: left/right aim, Space chops, G uses Guide, Escape pauses and resumes the pause card.
- Sound, Steady camera and Light rendering are independent settings. Light caps DPR at one, targets 30 paint FPS and disables real-time shadow maps; coarse-pointer devices start in Light mode. Standard caps DPR at 1.5 and targets 40 paint FPS. These are caps, not measured handset guarantees.
- The profile and active cut/fall use the game's own local save key. Reloading an interrupted cut opens a pause card and resumes the committed fall without duplicating its award.

## Art and feedback

Original bearded forester with knitted cap, plaid shirt, suspenders, gloves, flat-soled boots, connected fixed-length arms and an actual axe grip. The blade reaches the measured cut height. Three strikes deform a shallow notch band in the trunk mesh. Crown support bounds determine the stopping angle so the rendered canopy reaches the ground. The scored mark is its real projected centre, rather than the first individual leaf's contact point; this keeps aiming continuous as irregular leaves touch down. A log cart collects successful trees before the next appears.

Original bark ridges, visible wood rings, crown clusters, shelters, fences, creek/bridge, stacked logs, work bag, dark mill and emissive lanterns. Warm timber, rust cloth and forest greens connect the icon, HUD, notebook, particles and genuine runtime cover. Layered synthesized axe cracks, wood body, falling creak, landing thud and reward chords use no downloaded audio. No image generation, runtime CDN, external font, model or texture dependency.

Felling is an authored, ground-supported kinematic arcade model with actual mesh deformation and scoring geometry. It is not a full elastic-fracture or rigid-body forestry simulation. Decorative scenery is outside the authored working area. At most 140 short-lived particles and 20 synthesis voices; fixed 60 Hz logic with an independent paint clock. Static scenery is batched, limbs and particles are instanced, and static shadows are cached.

## Rezona reference and originality

The reference actually played was [Pixel Harvest](https://rezona.ai/game/pgcserver/pv/MEkuhrFm/v1/dist/index.html): Enter, native movement/tool input, a Hoe ground action and planting a Turnip Seed were observed; seed count changed from six to five with visible planting feedback. Only its direct tool-on-world feedback informed this new precision-felling game. Tree felling was not observed in that reference. No reference harvest/campaign completion, exact gameplay/art parity, source/media reuse, popularity rank or official quality grade is claimed.

Pingui Push's pull controls were excluded because of the previous body-ricochet game. Coin Cascade repeats Opal Tumble/Tidal Mint; Fathom's portal HUD repeats Breach Circuit; Rip's net-tearing repeats Snipwing/Cut Launch. Screw Shiba and feather-rally references also matched previous work. Earlier grid-based log rolling/bridge puzzles were checked as adjacent, distinct from continuous felling-angle precision. The homepage Unbox item was a live-action preview, not a played game.

Shared original primitive, batching and clock patterns were adapted from earlier original projects. New gameplay, models, maps, UI, icon and sound are independently authored. Three.js r147 is locally bundled under MIT. See LICENSE and vendor/THREE-LICENSE.txt.

## Build and delivery

Serve this directory with a static HTTP server and open index.html. index.html and standalone.html are identical self-contained entries. Editable source modules are included. Rebuild with Python 3: `python build.py`. The result is ../FALL-FELLOWS.zip with index.html at its root. No dependency installation is needed. Tests: `node tests.mjs` and `node model-tests.mjs`.

GameWave SDK is integrated with actual run start/end, namespaced whole-state cloud saves, logical host viewport and optional confirmed-callback cosmetics. The game never waits for an SDK to boot. The development simulator is outside the archive. See GAMEWAVE-IMPORT.md and VALIDATION.md. Browser viewport/mocks do not certify actual GameWave App import/account/social/cloud operation, physical iOS/Android hardware or cold file-browser UI.
