# BOOP SOCIETY — Become the Problem

An original English, single-player, touch-friendly body-swap ricochet game. Pull back anywhere in the scene and release to dash. Or tap a friend for a direct aimed shot. BOOP! repeats the current aim. Meet every unmarked friend to finish; check marks identify friends already met. No timer, lives, purchases or required account.

## A small social disaster

Colliding with a new friend physically pushes them, exchanges your two bodies, squashes the new model and awards a noseprint. Continue into another friend in the same shot to build a chain with increasing points and musical replies. Already met friends still move physically, but do not award duplicate points. Walls bounce; flowers spring; periodically active fountains deflect; mint pinwheels redirect collisions. Position, momentum and scattering change the next shot. Undo reverses the last shot, including every body and its score, at no cost; undo history is intentionally discarded on reload.

Nine finite authored chapters contain53 friends across a picnic club, sandy social and midnight noodle market. Each shares its scene family with different arrangements and physical props; these are three sets, not nine separately authored worlds. Clear = one star, chain two friends = another, and finish within the displayed par = another. Best stars and best score only increase. Meeting each of five species unlocks that starting face in the passport. Species change appearance and animation, not the control rules or hidden combat statistics. There are no purchases, limitless procedural-world claims or randomized reward gates.

## Controls and saves

Touch/mouse: pull back and release, or tap a friend. The final direction marker previews the aim and strength, not the entire collision trajectory. BOOP! fires that aim; Undo rewinds the shot. Keyboard: Left/Right or A/D change aim, Up/Down change strength, Space fires, Z undoes, Escape pauses. Pointer cancellation releases the gesture without firing. Pause and browser interruptions stop movement/audio; a moving saved shot reopens paused. Local key boop-society-v1 contains profile and complete active physical state. A ready-state pause menu itself is not restored on reload. Storage denial is caught and does not block play.

## Art and feedback

Five original rounded animals have separate silhouettes, faces and secondary features: frog eye mounds/toes, capybara muzzle/nose/ears, duck bill/webbed feet, red-panda mask/tail and axolotl gills/tail. Bodies and two animated feet are independently batched. Thick diorama bases, inlaid tiles, moulded rails, rope fences, benches, bunting, flowering pots, cups, picnic fabric, beach hut roof slats, parasols, shells, lanterns, noodle counter and soda display provide consistent set dressing. Thin plum contours, baked vertex colours, soft contact blobs and original synth pops/boings/chords keep the picture coherent. Check badges and real body exchanges explain progress. Humorous English phrases are original light internet-style jokes, not commercial characters or voices. cover.png is an actual game screenshot and icon.svg is original vector artwork. No ImageGen, external art, recorded music, commercial assets or reference media were used.

## Runtime and build

index.html and identical standalone.html include the full game, Three.js, styles and code: no runtime CDN, build server or SDK dependency. Serve them through any static HTTP server or GitHub Pages. index-source.html loads editable modules. `python build.py` rebuilds both embedded entries and ../BOOP-SOCIETY.zip. `node tests.mjs`, `node model-tests.mjs` and `node sdk-tests.mjs` run the controller, actual geometry and optional-host checks. Development tools are not required to play.

Default Light uses DPR1 and a30fps presentation target; Full capsDPR1.5 and targets40fps. Fixed120Hz physics uses bounded catch-up, independently of pointer/render timing. Static colours are batched, character parts use six submissions per animal, route buffers are reused, decorative bursts are bounded to80 instances and audio to16 voices. Pausing stops continuous rendering. See VALIDATION.md for measured submission counts and limits; these targets are not physical-phone performance guarantees.

## Reference and license

Rezona Super Smash Animals: https://rezona.ai/game/pgcserver/pv/huojrSVm/v1/dist/index.html . Its title, PLAY, chase/body-morph premise and native WASD/Space movement were inspected; the short reference attempt displayed0 boops, so a successful reference transformation/full round was not observed. This independent mobile pull-release interpretation studies that broad premise, not the original code, models, audio or exact gameplay. Teddy Skyways, Channel Thirteen, Waddle Wave, Fish Heist and Eye Bloom were inspected at title/demo level and excluded. No reference license or popularity ranking is inferred.

Original game source/art are MIT, including adapted own-project primitive, timing and SDK scaffolding credited in LICENSE. Three.js r147 retains vendor/THREE-LICENSE.txt. Real iOS/Android hardware, sustained GPU/thermal/battery performance and real GameWave App operations remain unverified.
