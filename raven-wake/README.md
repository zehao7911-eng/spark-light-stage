# Raven’s Wake
A Godot 4.7.2 3D isometric action game inspired by the readable combat and muted ruins of Death’s Door. Original procedural geometry and reduced scope; no extracted commercial assets.

## Play
Mobile: drag the left pad; hold SLASH; tap ROLL or FIRE. Successful sword hits restore magic. Frost and Storm gifts unlock additional spells; Q cycles unlocked spells.
Keyboard: WASD/arrows, Space attack, Shift roll, E magic, Q spell, Escape pause.
12 courts, three wardens, two enemy waves per normal court, 12 gifts, three route choices, permanent soul upgrades and endless continuation.
Rooms are checkpointed at entry. Continue retries the current court. Sound and shadows can be toggled in Pause.

## Godot
Open godot/project.godot with Godot 4.7.2. World.tscn includes an editable environment preview. Art.gd creates original meshes; Actor.gd implements combat; World.gd runs progression; HUD.gd handles touch UI.
Export preset Web uses Compatibility, no threads, local assets. Install the matching official Godot Web export templates.

## HTML5
Serve web/ through HTTP or HTTPS; do not open index.html using file://. Example: python -m http.server 8000 --directory web
WebGL2 and WebAssembly are required. First download includes approximately 40 MB uncompressed Godot WASM. Browser touch/resize testing is simulated, not a physical device certification. Low-end phones can disable shadows.

## Validation
Automated normal-stat combat agent reached court 12 and defeated all wardens. Tested reward routing, roll invulnerability and soul banking. Browser tested real touch movement and held slash at 390x844 plus landscape resize, with no GDScript errors.
