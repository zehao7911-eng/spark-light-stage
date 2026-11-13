# NEON TETHER

An original compact pixel action game made in Godot 4.7.2. Inspired by SANABI's chain-hook traversal and dense cyberpunk pixel craft. SANABI's Steam page showed 95% positive recent reviews across 385 reviews when inspected on 2026-10-12; this is not a monthly sales/player ranking claim. No SANABI characters, maps or ripped assets are included.

## Play
Tap a glowing cyan anchor to grapple. Tap a drone to dash through it. You can change targets while airborne. The GRAPPLE button selects the nearest forward anchor; LEAP gives a recovery jump. On desktop A/D move, W leaps, Space grapples. Escape pauses.

Eight districts across four environments, moving anchors, optional upper data caches, drone warning beams, two armored guardian encounters, checkpoints, three persistent upgrades, mastery stars and a harder New Signal Loop. Collect every data crystal, finish without taking a hit and under 35 seconds for three stars. Health replenishes each district. Three upgrade tracks each cap at level three. Save data uses an immediate localStorage copy plus Godot IndexedDB persistence and requires storage permissions.

Godot runs movement, collision, attacks, enemies, effects, sound, camera, progression and saving. The HTML shell supplies accessible English menus and large touch controls. Single-thread WebAssembly + WebGL2 Compatibility export, no external CDN. First loading includes the Godot runtime; mobile low-end performance and physical iOS devices are not certified.

## Files
The ZIP has the playable Web export at its root and the editable Godot project inside `godot-source/`. Serve the ZIP folder over HTTP; do not open index.html by file://. For the editor import godot-source/project.godot. Native editor play supports Enter to begin/continue and 1/2/3 to buy upgrades at rewards.

## Art
Built-in image_gen created two cohesive production atlases. Original PNGs and exact prompts are in the source assets folder and ART-DIRECTION.json. No creative raster post-editing. Atlas animation uses four courier poses, four drone poses, three props and modular platform cells.

## Rebuild
Godot --headless --path SOURCE --export-release Web DEST/index.html
Then inject ui-fragment.html before the generated index.html closing body and copy ui.css/ui.js beside it. Keep the exported engine files' names intact. Prefer an HTTP server with wasm MIME type and gzip/Brotli.

## Validation
Eight districts were completed through real browser controls, including both guardians, upgrades, ending and New Signal Loop. Immediate-refresh settings persistence passed. Six viewport sizes (320x667 through 1280x720) were checked for 48px controls, overflow and clipping. Godot headless physics tests completed all eight routes, collected all 16 crystals per route with the fully upgraded magnet, defeated guardians, checked safe checkpoint respawn, upgrade caps and loop inheritance. Physical phones were not available for testing.
