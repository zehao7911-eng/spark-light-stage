# Moss & Timber

An original compact HTML5 island puzzle adventure, directionally inspired by [A Monster's Expedition](https://store.steampowered.com/app/1052990/): soft green islands, turquoise water, little backpack creatures, rolling trees and delightfully misidentified human exhibits. All models, textures, layouts, dialogue, interface and sound are original code-authored work. No commercial assets or generated images are included. This is a smaller browser interpretation, not the commercial game or its full open world.

## A little expedition

Swipe the scene, tap a nearby footprint, or use the four compass arrows to take a step. Push a standing tree to fell it. A fallen log slides one cell along its length; pushing its side rolls it until something stops it or it floats. A floating log is a walkable bridge. Collect the three little seeds if you like, then reach the exhibit and tap **Inspect exhibit**. Passing through the exhibit square does not end your walk until you inspect it.

There are 12 designed island routes, with one-, two- and three-bridge crossings, sideways rolling, rocks that stop logs and winding collecting routes. Some later islands turn earlier route ideas in a new direction. No timer or lives. Undo is unlimited within a 180-step history. Restart needs confirmation and keeps hint usage for that attempt. A clue shows one useful next step from your current arrangement; it does not move for you. If you have stranded a log, undo or restart.

One star for finding an exhibit, one for its three seeds, and one for a no-hint walk within eight steps of the all-seed shortest route. First exhibits award three acorns plus their one to three stars. Better replay grades award only the improvement, so the twelve islands pay at most 72 acorns. Buy three backpack colours for 12, 18 and 24 acorns. The illustrated field journal retains your finds and actual island postcards, downloadable as JPEG files. After all twelve exhibits, Another Voyage revisits these authored routes with shifted seasonal palettes, preserving rewards. It does not add unlimited unique maps.

## Controls and saving

Touch, mouse or keyboard: arrows/WASD step, Z undo, H clue, R restart confirmation, Enter/Space inspect, Escape/P pause. Pause and hidden tabs freeze movement and animation and silence the sound. Current position, logs, collecting, history, animation continuation, rewards, postcards, colour and mute preference save locally. Reload opens Continue. No offline earnings, accounts, ads, analytics or server calls.

The UI and instructions are English. Phone portrait/landscape, safe area insets, 46px buttons, gesture cancellation and delayed-click suppression are included. Mobile validation uses native browser touch emulation; a physical handset was not available.

## Offline and hosting

Open the packaged root `index.html`, or upload the extracted ZIP root to HTML5 hosting/GitHub Pages. The packaged index inlines all scripts/styles, including Three r147 and its MIT license. The source files are also included for editing. There are no CDN, external fonts, asset downloads, build steps or service workers. WebGL renders the original 3D models; a simpler Canvas view provides the same game rules when WebGL cannot initialize. JPEG postcards require the 3D renderer.

Rendering caps at 30 FPS and DPR1.5. Grass and small flowers are batched, shadows use one 512px map, visual particles are bounded, and stable pause screens stop rendering. Geometry/material resources are reused or disposed between islands. Original painted bark/endgrain textures are generated in code; water has subtle animated highlights. Hints solve in a local worker, with a bounded synchronous fallback.
