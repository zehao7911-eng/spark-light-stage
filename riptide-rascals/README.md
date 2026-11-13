# Riptide Rascals

An original mobile HTML5 fish-school hunt. Tap or drag to swim. Your little fish surround and bite nearby prey, recruit friends, and evolve between encounters. Dart out of flashing attacks. Six reef encounters lead to the Claw King; new dives change prey placement and evolution choices. All game text is English. No image generation, commercial game assets, external fonts, analytics, payments or CDN.

## Play

Serve this folder over HTTP/HTTPS (for example GitHub Pages, or `python -m http.server 8000`). A modern WebGL browser is required. All resources are local. The download includes editable source and the bundled Three.js r147 MIT notice.

- Tap a point or hold and drag on the scene to swim there. Bites happen automatically when individual fish reach prey. The opening waits for your first movement or dart; it does not play itself while you read.
- The school number is your living fish count. Meals recruit a friend on the first meal, then every second meal, up to18 fish. A fish can be lost to a hazard or attack. Shell vests add a hit of protection. Losing the last fish ends the dive.
- The small arrow on the objective card points toward the nearest edible target. It is guidance, not automatic hunting. DART bursts in your last swimming direction, with a short protection window and a3.1-second cooldown. There is no shoot button or aiming reticle.
- Urchins are hazards, not meals. Your fish naturally bend around nearby static spines when you keep the school's centre clear; deliberately steering into the spines is still dangerous. Redfins flash before charging. Puffers are armoured and dangerous while large, and easier to bite while small. The crab rests between telegraphed claw attacks: that is the best time to bite.
- Eat every required creature in the first five encounters. In the last, defeat the crab; its small fish are optional food. After a reef, pick one of three offered evolutions. Bigger bites, quicker fins, extra friends, shell protection, wider pursuit or a five-meal bubble burst change the active school. Evolutions last for the current dive.
- Keyboard: arrows / WASD swim, Space darts, Escape pauses. Pointer cancellation, blur, resize and pause release input. A normal pointer-up leaves a finite destination, so a tap can finish its move.

Reef book retains best score and furthest cleared reef. Clear two reefs to unlock Sea Glass colours and four for Iris colours. Choose the school colour in the book; it is an earned cosmetic, not another gameplay level. New dives retain records and colours, but reset the temporary build. There are six encounter archetypes, three coordinated surroundings and seeded placements, not infinitely many authored worlds.

## Actual content

First Bite: six easy prey and a clear nearby opening. Spine Garden: static urchins and two hunters. Redfin Run: three hunters and a larger shoal. Puff Passage: two breathing puffers plus hunters. Moon Bloom: the combined pack. The Claw King: a large articulated crab with warning, slam and recovery phases. The main objective counts required meals; the crab has its own visible health strip. No mandatory countdown, purchases, real gambling or ad gate.

The underwater scene is original3D geometry: amber fish with bellies, eyes, irises, gills, scales, layered fins, hinged tails, jaws and teeth; larger redfins, inflatable puffers with growing spines, violet urchins, and a crab with eyes, shell plates, spotted scutes, curved legs and paired claws. Sculpted reef borders, stone ribs, branching coral, tube anemones, low seabed plants, tall kelp, soft light shafts and animated procedural seabed caustics form a continuous world. Fish formation, bite stretch, prey-swallow motion, dart wakes, real-loss flashes and expanding bubble rings are tied to game state. Original synthesized munches, bubbles, warning tones and quiet ocean noise begin only after interaction. Sound can be muted.

## Reference and provenance

The public Rezona Piranha Swarm — Rogue-lite Edition was actually played: https://rezona.ai/game/pgcserver/pv/bDnQNdtr/v1/dist/index.html . Native steering, school following and eating were observed; the displayed count advanced from0 to3, and play reached wave3. No full reference run or reference evolution choice is claimed. Its school-steering / automatic surround / eating / evolution direction informed this independent game. Reference source, imagery, sprites, music, UI and models were not copied. Its dark illustrated2D river is different from this original bright3D reef.

Other candidates were rejected: La Pulga's many-key tactical football operation, Graft's multi-tool surgery, and a Blue Stack timing attempt that ended at score0. Read-only review of active shared-workspace projects excluded hydraulic compression, cut-net spacecraft, forging and earlier bowling/cleaning/furniture games. No other chat was messaged or modified.

## Implementation and limits

`core.js` is a deterministic planar steering/boid combat model. Bites use individual fish positions and cooldowns. It is not full3D fluid or rigid-body simulation. Decorative plants lie below or around the swimming layer and do not block routes. `view.js` draws original3D models and cosmetic animation; `app.js` owns input, sound, menus, records and browser storage.

Fixed60Hz simulation, target40Hz rendering, DPR capped1.5, shared baked creature geometry, static vertex-colour merging, a single shadow map updated on scene builds, bounded100 cosmetic particles and14 short audio voices plus one ocean loop. Pause includes a Light graphics mode using DPR1 and no shadows. Browser viewport checks and model tests are not physical-handset performance certification.

Storage preserves fish poses, health, enemies, evolution choices, gate-free encounter phase, seed/RNG, clocks, dart cooldown, records and colours. Reload opens paused with steering commands released; an already-committed dart retains its saved progress. Cosmetic particles, camera lag and swallow animation restart. Win/loss/evolution screens restore without duplicating rewards. Blocked storage leaves the current session playable. Graphics loss offers reload.

`node tests.cjs` completes all six encounters in three seeds through ordinary point/step/evolve/dart controls, verifies opening waits and actual first-seconds recruitment, released-input and mid-dart continuation, invalid data rejection, protection/cooldown and immutable end states. Its controller timing is not a human difficulty claim. Native UI play and art inspection are separate. `python build.py [node-path]` runs checks, fingerprints files and creates RIPTIDE-RASCALS.zip.

All original game source, SVG and procedural art may be modified and redistributed; retain THREE-LICENSE.txt for the bundled third-party runtime. No platform A/S rating or commercial approval is promised.
