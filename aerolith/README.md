# AEROLITH

An original Godot3D hover racer for desktop and mobile browsers. Three sky circuits, two laps per race, three pace rivals, boost gates, crystal obstacles, shield impacts and persistent rewards.

## Play
- Slide horizontally anywhere on the scene to move across the track. On desktop use Left/Right or A/D. The ship accelerates automatically.
- Tap BOOST or press Space to spend energy on a short acceleration burst. Cyan arches refill energy when you cross inside them.
- Pink crystals and road edges damage the shield and slow the ship. Space can launch/retry; Escape pauses/resumes.
- Finish to unlock the next circuit. Earn three medals by finishing, placing first and taking at most three hits. Revisit circuits for a faster best time and cleaner run.
- Credits buy three engine levels and two additional liveries. Owned liveries can be cycled back to without paying again. All credits are in-game rewards; no payments, accounts or servers.

There are three authored procedural course configurations, not an unlimited collection of new maps. Rival pilots follow deterministic pace/lane patterns and do not collide with the player; the gate/obstacle/energy decisions are the main challenge. This is a compact rail-guided hover racer, not a full free-steering simulation.

## Original art and implementation
Ivory/gold hovercraft, cyan thrusters/trails, floating city terraces, coral obstacles, monumental arches, distant airships, drifting clouds, procedural sky and ocean, bloom finish and native vector UI icons. Geometry, shaders, synthesized sounds, UI and Godot game logic are original. The source reference and the exact scope of inspiration are recorded in REFERENCE.md.

## Browser and mobile
Use an HTTP(S) server, not file://. Requires WebGL2 and WebAssembly. Single-thread Godot4.7.2 Compatibility export; no cross-origin isolation headers required. The engine/game first load is approximately38MiB before HTTP compression. Content-hashed flight pack avoids stale game updates. No external asset CDN or analytics.

Separate portrait/landscape camera fields of view, compact short-screen cards, safe-area insets and44px minimum touch controls. The3D long edge is capped at960px in portrait and1280px in landscape, with2xMSAA and45fps limit. Viewport tests on a desktop browser do not certify physical-phone frame rates.

## Save and pause
The localStorage key aerolith.v1 stores the profile and active race, including shield, energy, gate history and rival progress. Autosave every four seconds and on actions/pagehide. Returning to an active race shows a paused scene with a deliberate Continue action. Pause/background stops simulation and motor audio. When browser storage is unavailable, gameplay still works but persistent progress cannot be retained.

## Editable project
The archive root is the runnable Web export; godot-source/ contains the editable project, native QA and Web wrapper/finalizer. Import project.godot in Godot4.7.2 with matching Web export templates. Export the Web preset and run:

    python tools/finish_web.py /absolute/path/to/export/index.html

Native checks:

    godot --headless --path . --script res://qa.gd

Runtime notices: GODOT-LICENSE.txt and GODOT-COPYRIGHT.txt. No HexGL code, textures, models or audio are bundled. No affiliation with HexGL or its creators.
