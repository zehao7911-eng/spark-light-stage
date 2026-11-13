# ROOFTOP RELAY

A sunny pixel-art teamwork puzzle. Walk a maintenance robot, switch control to its partner, hold pressure pads and reach the rooftop lift. Twelve original layouts, optional batteries, three-star records, unlockable paints, undo, saves and English touch/keyboard controls.

## Play

- Tap a reachable floor tile to walk a route. Route planning avoids heat grates and currently closed gates. Manual buttons and arrow/WASD keys also work.
- SWITCH or Space changes the controlled robot. Tapping a partner also selects it. The colored outline and arrow show the active robot.
- Park one partner on the diamond pressure pad, then switch and walk the other through the gate. Pads do not latch permanently.
- Later, a bouncing courier can cross striped vents while on autopilot. A controlled robot cannot pass those vents. An echo robot follows your movement when not controlled.
- The red heat grating is unsafe for either robot. Undo recovers from a wrong turn; no timer or lives.
- Three stars: reach the lift; collect all three batteries; finish without undo or a manual restart. Replays retain only your best star count.
- Paint unlocks at 6 and15 total stars. Paint selection changes the robot palette. It is cosmetic.
- Z/UNDO restores before the last input action. A long held direction counts as one action. History is bounded to30 actions and is session-only.
- Pause, blur or backgrounding clears held input and stops simulation. Resume explicitly. Collected stars and current positions/gates/batteries are saved when storage is available. Blocked storage still permits session play.

## Source and license

Built using the imported open-source-game-reference skill. The runtime includes the actual world/player/AI/tile implementation from **Swap** by @nmoroze and @themichaelyang, revision a3cfb7d2d59d37dd3778d5de685a206cca4f1206: https://github.com/nmoroze/swap . The original code,25 original layouts and complete license are preserved in upstream/. The actual runtime uses12 new rooftop layouts; the original25 are preserved as source material, not claimed as an extra playable campaign.

The adaptation retains continuous movement/friction, character handoff, autonomous AI types, collision queries, pressure-pad/gate interactions, player-only blockers, hazard and victory rules. Original render/input/HTML/music are replaced. See SOURCE.md for precise changes. This is a source adaptation, not a clone of a commercial game's art.

Adapted code and new original game presentation/assets are distributed under CC BY-SA4.0, matching the upstream license, with the font under its separate SIL OFL (FONT-OFL.txt). See LICENSE-SWAP.txt. Please retain attribution and license terms in redistributions. Source music was not reused.

## Run / download

Public single-file edition: https://zehao7911-eng.github.io/spark-light-stage/rooftop-relay.html

Download: https://zehao7911-eng.github.io/spark-light-stage/ROOFTOP-RELAY.zip

Serve this directory over HTTP and open index.html. The ZIP also contains standalone.html, which embeds every runtime asset and can be opened offline without a server. No CDN, account, ads, payments or telemetry.

Visual scene/sprites were created with builtin imagegen; prompts and extraction rules are in ART-DIRECTION.md. The background is a decorative static city; robots, switches, gates, collection and feedback are live game objects. Direction poses plus procedural bob/foot contact supply movement; this is not a full skeletal animation system. Browser-responsive tests are not physical handset certification.
