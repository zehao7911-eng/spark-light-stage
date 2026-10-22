# GLASSWILD — Interactive Art Study 01

A small, original HTML5 aquarium art prototype. Plain JavaScript + bundled Three.js r147. No Godot, external asset CDN, build process, account or telemetry. This is the agreed first playable art sample, not the complete ecology/management game.

## Interact

- **Observe:** drag gently to turn the aquarium; tap a fish to follow it. Tap the close icon to return. Arrow keys turn the scene; mouse wheel changes distance. Fish have a22px touch tolerance around their projected centre.
- **Feed:** tap the water to release up to12 pellets. Fish steer toward food and consume individual pellets. A short cooldown and36-pellet cap prevent unbounded spawning.
- **Plant:** choose ribbon, broadleaf or grass, then tap the sand. Added patches unfold over eight seconds. Up to12 patches; nearby placement is refused.
- **Current:** drag through the water to nudge the fish and food. The effect decays over four seconds.
- Top controls change daylight/dusk, framing and pause. Bottom controls toggle synthesized sound (initially muted) and photo mode. In photo mode, the orbit icon runs a slow camera tour; Save exports the rendered aquarium as a PNG without the interface. Escape / Space return or pause; keys1–4 choose tools and F feeds the middle of the tank.
- Five small discoveries record feeding, planting, current, following a fish and dusk. No currency, purchases or grind.

## What's actually simulated

Twenty-four individual fish across three visual species:15 neon tetras,7 ember rasboras,2 veiltail guppies. They seek food, school by species, separate from neighbours, steer away from broad bank obstacles and stay inside tank bounds. Leaves sway continuously. Three ornamental shrimp and a slowly moving glass snail provide secondary animation; they do not clean or reproduce. This study does not simulate water chemistry, breeding, disease, death or a full food web. User planting growth is a presentation effect, not a botanical simulation.

Original generated fish geometry/scale patterns/fin membranes, leaf meshes and vein maps, branching textured driftwood, irregular mineral rocks, layered substrate, glass edges, water surface, moving caustic patterns and dust/bubbles. Aquarium backdrop light shafts are an illustration; caustics and glass are approximations rather than path-traced optics. No screenshots, models, music or other assets from the reference games are bundled.

## Run

Serve this folder over HTTP(S), e.g. `python -m http.server 8080`, then open localhost:8080. All dependencies are local. Requires WebGL. Mobile portrait/landscape layouts and44px minimum visible controls were checked in browser viewports; a physical handset was not tested. DPR is capped at1.5, simulation60Hz and rendering approximately40Hz. Bounded36food/12plant patches/90bubble effects/10sound voices. Static geometry is batched and plants/fish instanced; no new geometry is created when planting.

Save key `glasswild.study.v1` keeps exact fish positions/velocities, simulation time/random seed, food, planting, discoveries, lighting and mute. Reload resumes paused. Camera pose, transient bubbles and current tool are not saved. Storage failure keeps the current in-memory session playable. Pause/background/blur stops simulation and audio, and cancels pointer gestures. Background resume requires a deliberate action. Context loss displays a reload button.

`model.js` is independent of rendering; `scene.js` builds the original art; `app.js` handles interface/input/audio/save; `qa.cjs` runs with `node qa.cjs`.

## Reference provenance and license

The installed open-source-game-reference catalog was searched for aquarium/ecology references; no ready-made aquarium was found. The skill informed checking this limitation and separating implementation references from asset rights. This prototype is an original implementation, not an adaptation of an aquarium project in that catalog.

Visual/behaviour references reviewed on their official Steam pages:

- Fish Game: https://store.steampowered.com/app/1372150/Fish_Game/ — planted aquascapes, fish relationships and schooling.
- Behind Glass: Aquarium Simulator: https://store.steampowered.com/app/1611580/Behind_Glass_Aquarium_Simulator/ — layered hardscape, water and viewing composition.

Those commercial screenshots were viewed as references only. No exact-recreation, photorealism, commercial-asset ownership or affiliation claim. The bundled Three.js is MIT; its unchanged header and `THREE-LICENSE.txt` retain the notice. All other art/code/audio here is original.
