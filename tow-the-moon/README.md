# TOW THE MOON — Everybody Gets a Lift

An original English, touch-friendly 2.5D space-tug game. Tap a HELP beacon to fly toward a stranded passenger. Once they grab the handle, steer them to HOME. Tap or drag the flight area to choose waypoints around the orange-ringed hazards. The dashed route turns orange if the current straight route is predicted to cross a hazard; it is an approximate warning, not an automatic pathfinder.

## A clear little rescue loop

The craft accelerates and brakes instead of teleporting. A passenger hangs from a constrained, damped cable and swings under acceleration. Returning near the green airlock slowly enough begins a visible docking sequence, then the passenger walks safely inside. A bump returns the craft to the airlock and releases its current passenger back to their original waiting platform. Already rescued passengers and collected badges stay. There is no timer, currency purchase or limited retry counter.

Six finite authored missions contain 21 passengers across Moonpost, Driftyard wrecks and a ring-planet transfer station. Later routes add actual moving hazards and fixed rocks. Each rescue gives 300 thank-yous; the third and subsequent consecutive rescue gives another150. Each optional signal badge gives75. Complete a mission, avoid all bumps and collect all three badges for up to three best-only stars. Six total stars unlock a wider pickup coil. Twelve unlock stronger lateral cable damping. Replay opened missions; these are six finite missions, not endlessly unique sectors.

## Play, source and build

Use a current WebGL browser. index.html and identical standalone.html contain the full game, CSS and bundled Three.js with no runtime CDN, account or GameWave dependency. A static HTTP server or GitHub Pages is recommended. index-source.html loads editable modules. `python build.py` rebuilds both embedded entries and ../TOW-THE-MOON.zip. `node tests.mjs` tests the steering/constraint controller and mock SDK. `node model-tests.mjs` checks actual generated model contacts and bounds. Python and Node are development tools only.

Mouse/touch: tap HELP, tap/drag space, tap HOME. Keyboard: arrows/WASD steer, Space selects a waiting passenger or HOME, Escape pauses. Interrupted dragging releases the pointer. An active saved flight reopens paused; its trajectory and cargo remain available on resume. Local key tow-the-moon-v1 stores settings, progress and the full active run. Storage failure does not block play.

## Art, feedback and performance

All spacecraft, astronauts, articulated grasping arms, porthole pilot, hull panels, antennas, landing pods, industrial rails, solar arrays, broken freighter, dish and ring-station fixtures are original code-built geometry. Cream/orange/cyan hardware reads against deep blue, muted green and violet space. Particle bursts, cable swing, thruster puffs, opening airlock doors, waving crew and short original synth signals respond to actions. There are no downloaded commercial assets, generated bitmap art, recorded music or voices. cover.png is an actual runtime screenshot; icon.svg is original vector artwork.

Light graphics is the default: DPR1, no real-time shadows and a presentation target of30fps. Full graphics caps DPR at1.5 and targets40fps. Gameplay uses fixed60Hz steps with bounded catch-up; capped presentation rate is not a measured handset performance guarantee. Static geometry is batched; effects are bounded to80 particles and16 synth voices. Gentle Effects reduces decorative bursts. Pause stops animation, audio and continuous scene redraw. The physical model is a lightweight 2D arcade constraint/obstacle simulation with 3D presentation, not general rigidbody or orbital physics.

## Optional platform extras

The GameWave SDK is individually guarded and never awaited for core startup. A genuine supported positive-like callback unlocks gold wing trim; a new direct-comment callback including an image-only empty comment unlocks a rose signal. Both are optional cosmetics with one-time flags. Unsupported prompts are hidden. Cloud max/union progress merging is guarded against unknown records; the active local flight remains locally owned. No actual GameWave App import/social/cloud test has been performed. See GAMEWAVE-IMPORT.md.

## Provenance and license

Rezona reference: https://rezona.ai/game/pgcserver/pv/EqRiokfD/v26/dist/index.html (Space Rescue Service). Its manual, manifest, launch, O2 HUD and a short native W input were observed. It is a first-person salvage/shooting game; this delivery independently adapts a broad space-evacuation premise into single-finger tug rescue, not its FPS controls, exact artwork, systems or assets. No full reference run or art-parity claim. Today's Fit was also inspected and excluded. Prior Starlift Orchard beam harvest/fling and Stillwater fishing/towing were checked while avoiding repeated core controls.

Original game code is MIT, including adapted own-project primitive/SDK scaffolding; see LICENSE. Bundled Three.js r147 retains vendor/THREE-LICENSE.txt. Browser viewport checks do not establish physical iOS/Android GPU, audio, battery or thermal certification.
