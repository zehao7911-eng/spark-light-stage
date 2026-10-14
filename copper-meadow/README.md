# Copper Meadow

A Godot 4.7.2 pixel-art automated farm for desktop and mobile browsers, inspired by **Rusty's Retirement**. This is a compact, original interpretation of its crop / robot / biofuel loop, not the commercial game or a 100% reproduction. No source sprites, music, characters, branding or desktop wallpaper from Rusty's Retirement are included.

## Play

Open the hosted game over HTTP/HTTPS. Choose **Let's grow**. The starting crew tends 24 planted beds while the refinery turns two crops from three different varieties into a coin-paying biofuel shipment. Choose a seed icon and tap a plot to change its next crop. A growing crop is not destroyed when its next seed changes.

The building tray places beds, paths, wells, refineries, depots, greenhouses, bee houses and flower boxes. Drag the world to pan; + and - zoom; the home icon recenters. The care tray supplies inspect, water, harvest and remove tools. Beds and paths refund half their cost; buildings cannot be demolished. Busy reserved beds cannot be removed.

Robots walk real tile routes around buildings. Gardeners do every job; specialists water, harvest or plant. Harvesters carry crops to the warehouse before they can be used. They refill their water tank at the nearest reachable well. New buildings cancel queued routes and release bed reservations so the crew replans. Stone paths give a 40% walking bonus.

## Included progression

- 12 crop varieties, unlocked at 0 / 12 / 28 / 50 / 80 / 120 / 180 / 260 / 380 / 550 harvests. Individual crop growth silhouettes and illustrated seed icons.
- Up to 12 robots, four jobs, six shared upgrade categories. Motor, cargo, water tank, refinery and yield have five levels; automatic planting has one.
- Two land expansions (19, 23 and 27 columns), repeatable fuel production, three recipe-selection policies and surplus sales.
- A greenhouse accelerates growth within six tiles by 50%; each bee house gives a global 4% growth bonus. Each trading depot adds four coins to a shipment.
- Eight once-only harvest ribbons at 12 to 1,000 harvests, paying 45 to 395 coins. Harvest album and warehouse inventory.
- Rain waters crops automatically; day counter and subtle time tint, butterflies, flowers, pond ripples, machine exhaust, work poses, carrying sprites, water/harvest particles and synthesized interaction sounds.
- Pause, focus mode at 35% speed, sound toggle, reduced motion, local save and up to 30 minutes of away simulation.

This version does **not** include the reference game's complete crop catalog, all maps/NPCs, desktop overlay behavior, Twitch integration, Steam features or its complete progression. The reference has substantially more content.

## Project and web architecture

The simulation, job reservations, routing, progression, save handling, input and world rendering are GDScript. `farm.gd` is the simulation; `main.gd` renders the original atlas and handles world input. The accessible HTML icon interface calls a Godot JavaScriptBridge callback; it does not run a substitute JavaScript game simulation. All game-facing text is English.

Open `project.godot` with Godot 4.7.2, import and run. The single-threaded **Web** export uses Compatibility / WebGL 2, with no cross-origin-isolation requirement, CDN or account. The web build is at the ZIP root; editable project files are under `godot-source/`. Serve the ZIP root using a web server, rather than double-clicking index.html. Godot's Web runtime is about 39.5 MB uncompressed; first load depends on the connection and device. Browser local storage must be allowed to retain progress. WebGL 2 is required. No physical-phone compatibility guarantee is claimed.

The atlas and PNG UI icons are newly authored on a shared pixel grid and palette. The font is VT323, distributed under the included SIL Open Font License. Godot's MIT license is included separately. No image-generation service was used.

## Validation

`godot --headless --path godot-source --script qa.gd --quit-after 1` runs actual GDScript simulation checks: a ten-minute autonomous farm, positive net income, three-crop refinery, exact resumed jobs after a JSON save, pause, purchases, expansions, late crops and one-time rewards. Browser interaction and responsive checks are recorded in `VALIDATION.md` alongside the exported game.

Reference: https://store.steampowered.com/app/2666510/Rustys_Retirement/
