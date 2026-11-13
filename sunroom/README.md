# SUNROOM — interactive art study

A compact original pixel building toy inspired by the craft and relaxed construction of SUMMERHOUSE. It is not the commercial game or its assets. This is a visual/interaction sample for approval before further expansion.

Godot 4.7.2 Compatibility, single-thread Web export. Serve over HTTPS/HTTP; WebGL2 required. No CDN. First visit downloads the Godot runtime (~40 MB uncompressed). Loading progress and manual reload are provided.

Choose one of 24 pieces, select a color, and tap the world to place. Drag empty space to pan. Move lets you drag a placed item; Erase removes the top matching piece. Undo/redo preserve up to60 placement steps. Zoom and Center adjust the view. Settings change among coast/meadow/rose sky, toggle placement sounds, or confirm restoring the starter house. Light toggles dusk/window glow. Save postcard opens a preview with a Download PNG link for the480x300 scene, without UI.

350 pieces maximum. No timers or economy. Scene saves on this browser; clearing site storage loses it. A moving piece saves upon release. Original code-native pixel artwork lives in painter.gd: plaster/brick/timber, tile/flat roofs, windows/shutters/doors, balconies/awnings/aircon/pipes, flowers/planters/climbers/trees, bicycle/bench/laundry/lamp/cat/chimney/fence/steps. Clouds, sea, birds, walkers and laundry animate independently. English DOM UI; mobile portrait enlarges the scene and allows panning.

Editable source is in godot-source. Open project.godot and export preset Web with Godot4.7.2 Web templates. In fresh exported index.html insert ui.html just before closing body, then copy ui.css and ui.js alongside it. Headless verification: godot --headless --path godot-source -- --qa

Browser size checks are not physical handset certification. Artwork is an original simplified study, not a claim of pixel-identical SUMMERHOUSE recreation.
