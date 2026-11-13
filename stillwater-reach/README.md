# Stillwater Reach

A compact 3D fishing adventure made in Godot 4.7.2. Inspired by DREDGE's fishing, cargo packing, return-to-port progression and cold-sea / warm-lighthouse atmosphere. All scene geometry and illustrated fish are locally created assets. This is a smaller standalone game, not the full commercial game.

## Play

Steer toward white shoal rings. Tap FISH and REEL while the needle crosses the pale green arc. Three successful strikes store a fish; three slips lose the catch. Drag fish inside the HOLD, rotate selected cargo or use PACK. Return to the starting lighthouse and DOCK to sell, rest and upgrade.

The first three coastal fish pay for the first rod upgrade, including the harbor order bonus. Improved rods unlock distant shoals and the four gold salvage rings. Deliver all four relics to restore four island beacons. After completing the quest, continue fishing, fulfilling harbor orders and improving the boat.

Night increases panic. Aberrant fish can appear; prolonged night sailing brings a pursuer. HORN pushes it away briefly. Rocks damage the hull. Sinking returns the boat to harbor, loses cargo and costs 15% of held coins. REST repairs the boat and starts a new day. Fish freshness slowly declines at sea.

## Controls

- Touch: left steering pad; right contextual FISH / DOCK button; HORN; CHART and HOLD.
- Keyboard: WASD / arrows to steer; E / Space to interact or reel; M for chart; H for hold; Escape to pause or close.
- CHART: tap a shoal or the harbor to plot a route around the islands. Steering manually cancels the route.
- Pause: sound and shadow settings. Audio starts after interaction. Progress saves locally and after important actions.

## Files and export

Open `godot/project.godot` in Godot 4.7.2. `World.tscn` contains an editable 3D preview of the archipelago, harbor and trawler. At runtime, `World.gd` builds the active scene; edit `Art.gd` / `World.gd` for persistent geometry changes. Run with F6 or F5. `Bake.gd` can regenerate the editor preview after geometry changes.

The `web` directory is the single-thread WebGL2 export. Host the entire directory over HTTP(S), keeping filenames and paths intact. Opening index.html directly from the file manager is unsupported. Python example: `python -m http.server 8000 --directory web`. No external CDN, login or shared-memory headers are required.

The project uses compatibility rendering, batched tree meshes, a 30 FPS cap and adaptive portrait / landscape framing. Shadow disabling is available on slower devices. Tested in desktop Edge and browser touch emulation at 390×844, 844×390 and 768×1024; physical iPhone / Android performance has not been measured. Requires a browser supporting WebGL2 and WebAssembly.

## Validation

`Verify.gd` covers 33 checks: fishing success and failure, upgrade gates, cargo bounds and rotation, packing, full-hold pending catches, sale/order arithmetic, upgrade purchases, four-relic completion, towing, rest, save restoration and obstacle-aware navigation to nearby and distant locations.

Browser interaction checks cover three catches, packing, return and sale, first rod purchase, refresh persistence, simultaneous touch steering and horn, portrait / landscape control bounds and night rendering. The browser diagnostic `window.ReachSnapshot` is read-only state for QA; it provides no command interface.

## Credits

Cinzel typeface: licensed under SIL Open Font License; see `art/CINZEL-OFL.txt`. Godot runtime: MIT, see the included `GODOT-LICENSE.txt`. Geometry, fish illustrations, sea shader and generated sound assets are authored locally. Reference: https://store.steampowered.com/app/1562430/DREDGE/
