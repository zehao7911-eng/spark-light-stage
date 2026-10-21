# Morrowwake

A compact, complete illustrated point-and-click harbour adventure. The visual reference is TOHU's detailed storybook mechanical fantasy; this is an original setting, characters, illustrations, puzzles and code, not the original game's assets, story or full campaign.

## Play

Open the published web version or serve the web folder over HTTP. The game requires WebGL 2. The Godot 4.7.2 Compatibility renderer and all gameplay logic run in GDScript; the HTML layer supplies accessible touch buttons, puzzle interfaces and synthesized Web Audio. There are no external fonts, libraries, music or image requests at runtime. The first engine download is about 40 MB before transport compression.

Tap landmarks to walk and interact. Mira fits small spaces and climbs; Bram operates heavy machines. Follow the small gold destination marker, or use the hint button. On narrow displays swipe the scenery or use Workshop / Waterworks / Lighthouse. Space switches friends; arrow keys pan; Escape opens or closes the menu. Menus and hidden tabs pause the story. Sound starts after a gesture.

## Contents

One authored harbour, three narrative chapters, eight persistent story milestones, three interactive puzzle panels, two characters, three optional field-note creatures, wrong-form and missing-item feedback, automatic local progress, a complete ending, replay retaining field notes, panorama viewing and real PNG postcard downloads. No battle, timer, currency or failure penalty. This is a short complete scene, not an endless game or a recreation of TOHU's full commercial campaign.

Actual progression: Mira retrieves the winding key from the hatch; Bram releases the sluice; Mira climbs the hydrated vine and finds a glow-seed; fit the engine dials (down, right, left); Bram uses crane rail IV to recover a lens, then opens the rusted lighthouse door; Mira climbs upstairs and plays leaf, moon, sun, leaf; set sail. Optional beetle, frog and snail can be found before or after finishing. Replaying resets the repair chain but retains discoveries. Storage denial permits session play. Closing a puzzle preserves mechanical settings, and reload resumes outside modal puzzles.

## Artwork and animation

The new harbour background and character sheet were created with the built-in image generation tool, with a shared graphite / watercolor / brass / teal / coral art brief. Art files are in assets/. The character sheet is sampled by native AtlasTexture regions; transparent alpha is retained. Harbour is converted to WebP for packaging. Character travel, climbing, breathing, tilt, mechanical hubs, falling water, moths, small creatures, glowing engine, signal beam and light motes are runtime animation. Character movement uses a single illustrated pose with procedural motion, not frame-by-frame walk sprites. Most scenery is one detailed illustrated background plus runtime effects and separate characters; it is not a fully independently layered background painting.

## Development

Open project.godot with Godot 4.7.2. The playable control layer targets the web export. Export preset Web, then run work/build-morrow.py from the workspace root to integrate ui.html, ui.css, ui.js and audio.js. Browser UI buttons communicate through JavaScriptBridge. Godot and its export runtime are MIT licensed (https://godotengine.org/license/).

The included artwork is newly generated; no commercial game artwork, audio, names of characters or maps have been extracted. The matching visual goals are detailed illustrative materials, warm/cool atmospheric depth, whimsical mechanical architecture and diegetic mechanisms, not a claim of pixel-identical parity.
