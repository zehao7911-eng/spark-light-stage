# MOSSBACK

An original, quiet 3D interactive miniature: a tortoise carrying a cottage, a pond, flowers and a little garden. Built in Godot 4.7.2 using original procedural geometry, shaders and synthesized chimes. The reference informed the gentle illustrative visual direction; no reference scenes, artwork, characters or audio are included.

## Play
Touch a flower to unfold it. Touch elsewhere to greet the tortoise. Drag to orbit; View restores the gentle automatic camera movement and cycles between the whole creature, garden and face. Bloom opens all six flowers with a drifting-petal flourish. Rain changes the weather and pond ripples. Tap the season to cycle through four palettes. The menu includes Night, Sound, Calm, Pause and Cinema. Escape enters/exits Cinema; Space blooms the garden. Photo downloads a clean PNG, up to 1600 pixels on the long edge, without controls. For screen recording, use Cinema and your device's recorder.

This is an interactive art toy, with no combat, economy, missions or failure state. A normal play session is slow observation and experimentation. Leg movement is an in-place amble, not a navigable open world.

## Browser and phone
Open index.html over HTTP(S); file:// is unsupported. Requires a WebGL2/WASM-capable browser. The Godot engine and game download approximately 38 MiB before transport compression on the first visit. No external CDN, commercial assets, remote fonts or third-party analytics. Single-thread Compatibility export; no cross-origin-isolation header required. Mobile portrait framing and 44px minimum controls; safe-area insets are honored. 3D resolution is capped at 900px on the long edge in portrait and 1280px in landscape, with 2x MSAA. Modern Safari/Chrome recommended. Phone-size browser checks are not a physical-handset performance certification.

## Save and lifecycle
Local storage key mossback-garden.v1 preserves bloom states, season, weather, sound, calm, pause, clock and interaction counters. Autosaves on actions, every four seconds and on pagehide. Menus, manual pause and hidden tabs freeze the simulation. No offline progression. Drag state releases on visibility changes. A page refresh restores the scene settings; manual camera angle and close-up selection reset.

## Editable project
The ZIP contains the runnable Web files at the root and the full Godot project in godot-source/. Open godot-source/project.godot in Godot 4.7.2 with its matching Web export templates. Import, export the Web preset, then run:

    python tools/finish_web.py /absolute/path/to/export/index.html

The finalizer restores the small loading/progress/lifecycle wrapper after each native Godot export. No Node build step. qa.gd is excluded from the Web build. Run native checks with:

    godot --headless --path . --script res://qa.gd

## Credits
All geometry, shaders, interaction code and chime audio in this project are original. Bitter font: see fonts/OFL.txt (also FONT-OFL.txt in the Web archive). Godot engine licenses: GODOT-LICENSE.txt and GODOT-COPYRIGHT.txt. No commercial game affiliation.
