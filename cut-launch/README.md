# CUT / LAUNCH

An original one-finger sci-fi rescue game. Swipe through the elastic containment membrane over a glowing target. A sufficiently ruptured seal opens under launch pressure; its ship breaks through and boosts out of the bay. Optional gold data chips and best perfect-route swipe records give a reason to replay.

## Play

Drag a finger or mouse across the mesh. Any part of a strand can be severed. There are no lives, timers, payments or equipment menus. On later missions, free yellow power cores to activate the launch bay, or make another gesture to cut the second membrane layer. A single gesture cannot erase two intact layers at once. Ships in powered-down bays retain a visible yellow shield until their core or cores arrive.

All nine missions are available from Mission Control; Next Mission follows the introduction order. Replay restarts a mission freely. The first ship can be rescued with one horizontal swipe through its reticle. Optional data-chip recovery adds up to three stars. A perfect-route record is the fewest swipes on a clear that recovered all three chips; it does not erase a previously earned star record.

Keyboard: focus the scene, use arrows to move the cursor and hold Space while moving to cut. Escape pauses. Pause contains sound and Light Graphics settings, with Resume at the top. Touch capture/cancel, hidden-page pause and an active save are implemented. Interrupted active missions restore paused. A held pointer or keyboard cut is released on interruption.

## Nine authored missions

1. First Contact: a central scout rocket and immediate cutting feedback.
2. Double Exposure: two separate drones and an optional off-route chip.
3. Passing Through: a moving courier can pass through an opening cut ahead of it.
4. Power the Bay: a released core travels to the reactor before the shield drops.
5. Winch Dance: shifting frame anchors deform the net around two different craft.
6. Drone Parade: three separate rescue openings.
7. Double Weave: two physically separate containment layers.
8. Cold Start: two power cores activate one heavy courier bay.
9. All Systems Go: three different craft behind a double membrane.

The three locations have distinct geometry as well as palettes: an orbital observation dock with a planet window; an amber solar forge with a large turbine and industrial arms; a pale cryogenic airlock with a hexagonal bulkhead and coolant tanks. This is a compact nine-mission game, not an endless campaign or a full flight simulator.

## Art and audio

No Image generation or external game artwork. All room geometry, hard-surface craft, ink edge lines, details, textures, icon and effects are original code graphics. Scout rockets have layered hull panels, canopies, intakes, fins and engine nozzles; drones have separate arms, camera lenses and spinning rotors; couriers have delta wings and twin jets; surveyors have solar wings and antennas. Reactors receive the actual released power-core objects. Elastic strands, mesh faces, recoil, launch pressure tears, sparks, shockwave rings, engine flames and cast moving shadows are animated in the running scene. The cover is an actual runtime capture, not a separate promotional illustration.

Original Web Audio synthesis supplies ripping noise, chip tones, core chimes and launch sweeps. Audio starts after interaction and active sources stop on pause. No music recordings, online API, CDN, external fonts or account services are used. All game text is English.

## Implementation and limits

This is a 3D presentation of a 2.5D membrane puzzle. Each layer uses a 23 x 27 Verlet node grid, horizontal and vertical distance constraints and real cut-link states. Intact cell faces disappear when a bounding strand is broken. Released strands relax and fall, while a qualifying rescue ruptures surrounding strands. It is an arcade cloth approximation, not a general fabric finite-element solver or a full 3D spacecraft collision/flight simulation. Power-core transfer and launch paths are deliberately authored animations driven by saved simulation time.

The second layer is protected by the front-layer cut state at the start of each gesture. Therefore later parts of the same swipe do not instantly cut through an initially intact second layer. On resume, a new gesture takes a fresh snapshot. Save data preserves node positions and previous positions, all cut states, released craft, their flight times, delivered cores, chips and progression; pointer/gesture state is not carried across interruptions.

Runtime Three.js r147 is bundled locally under MIT. Static scenery and craft casings are merged by material. Stars are part of static batches; spark debris is instanced and capped at 160. Render DPR is capped at 1.5; a 1024 shadow map can be disabled. The simulation uses a fixed 60 Hz step and bounded frame catchup; drawing is capped near 40 Hz. Browser viewport tests are not a certification of real handset performance.

## Run

Serve this directory over HTTP/HTTPS, for example `python -m http.server 8080`. Open localhost:8080. ES modules generally require an HTTP origin rather than double-clicking index.html. All runtime paths are relative, so a GitHub Pages subdirectory or an HTML5 game-hosting upload works without a build step. ZIP contents place index.html at the root.

## Reference provenance

Actually browsed the public Rezona catalog and rejected Fracture Point (gabSFRUb/v13), whose actual page described a first-person spatial-testing game with mouse look and WASD. Selected Rip — tear the net: https://rezona.ai/game/pgcserver/pv/RTyBKdiV/v1/dist/index.html . Started BEGIN and made a native diagonal drag; the displayed severed-thread counter changed from 0 to 31, with an actual hole and surrounding recoil. This public reference is a tactile net toy; no completed campaign or official reviewer rating is claimed. No reference code, bitmap, logo, recording or asset was extracted or redistributed.

CUT / LAUNCH independently expands that elastic tearing interaction into rescue objectives, authored flight/core transfer states, multiple layers, moving targets, different hangar scenes and permanent mission records. It intentionally avoids the previously used cut-a-single-string/drop-fruit loop. It is not an exact replica or a platform-rated commercial product.

## Verification

Run `node tests.mjs` for ordinary cut-controller completion of all nine missions with all chips, powered-bay gating, second-layer protection, no passive clears, finite solver states, exact active continuation, malformed-save rejection and terminal immutability. Package extraction and actual local/public browser results are recorded separately in the delivery evidence.

## License

Original code, models, textures, icon and synthesized sounds are MIT (LICENSE.txt). Three.js r147 is MIT (THREE-LICENSE.txt). No other game source or reference asset is included.
