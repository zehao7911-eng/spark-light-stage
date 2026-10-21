# MOSS & MEADOW
An original compact Godot 4.7 landscape puzzle inspired by Dorfromantik's peaceful tile placement. All geometry, interface and sound are original; no commercial game assets are included.

## Play
Choose one of three tiles, tap an open hex, rotate and confirm. Drag to pan; use + / - to zoom. Each matching occupied edge earns 10 points, each placement 4. Matching all neighbours (at least two) adds 30 points and refunds one tile. Join forests, fields, villages or lakes to meet the four region goals: each goal gives 80 points and 8 tiles, then grows. Start with 30 tiles. The finite landscape has 127 spaces. At stock exhaustion, continue in relaxed mode or start a new world. Undo retains the last 20 placements, including queue and random state.

Five lifetime goals unlock autumn; ten perfect fits unlock winter. A new meadow keeps these unlocks and best challenge score. Seasons alter scenery without changing rules. Browser local storage saves placed tiles, stock, queue, goals, undo history and settings. Preview rotation and camera position are temporary. Clearing browser data clears progress. No accounts, purchases, combat or real-money mechanics.

## Controls
Mouse/touch: tap, drag, buttons. Keyboard: R rotate, Enter place, Z undo, +/- zoom. Menu includes seasons, mute, photo PNG export and a confirmed new-world action. Audio starts after interaction.

## Technology and scope
Godot Compatibility renderer, single-threaded Web export; WebGL 2 required. Approximately 40 MB initial engine download. Small batched vertex-colour 3D world, capped particles, shadows disabled on narrow screens. Responsive desktop/portrait/landscape interface; browser size testing is not physical-device certification. This is a compact original game, not the full commercial Dorfromantik.

Serve this folder over HTTP(S), do not double-click index.html. Example: python -m http.server 8000. GitHub Pages needs no cross-origin isolation headers. Source is included in the ZIP under godot-source. Open project.godot in Godot 4.7, export Web, then include ui.html before the exported closing body and copy ui.css/ui.js beside index.html. No external CDN assets.
