# Source map and original art rules

Official source: https://github.com/Zolmeister/pond
Inspected revision: 68fa8b542bff6c405cce83a6bd433e16e7b4e7f6.
Discovered through the imported Awesome Open Source Games catalog's Pond entry; official repository, GPL license and relevant code inspected before adaptation. Changes made October 26, 2026.

## Runtime code

- src/fish.js: complete original Fish implementation: steering, acceleration/friction, sinusoidal tail curvature, six-circle collision, body/color rendering, dying-particle attraction and input APIs. Added a solid body fill, capped each generated particle batch at 48, and fixed the original keyboard branch's undefined `valid` variable.
- src/particle.js: original homing particles and draw/physics, with the log-distance argument clamped away from zero.
- src/color.js: original Color representation.
- src/util.js: original geometry, palette and helper functions; removed the synchronous /log HTTP endpoint helper.
- src/spawner.js: original adjacent-zone streaming, zone transitions and culling. Spawn composition now creates readable small schools, limits total entities and gates the number of dangerous fish by waterway.
- src/game.js: new campaign controller based on the original fish-update, size-based collision/consumption and growth loop. Adds touch assist, release damping, bounded entity cleanup, progressive difficulty, surge/chime, local snapshots, medals and gear.
- src/app.js: new English UI, rendering composition, original pixel environment, synthesis audio, input, pause/restore and campaign flow.

The complete original root JavaScript source snapshot is included under upstream/ for comparison. Original main/menu/score UI and original logo/audio assets are not loaded by this adaptation. Original source modules are not claimed to be newly authored.

## Art direction

Original koi silhouette and curved-body animation are procedurally drawn by the GPL source. A new solid ivory body, coral/jade/lavender pigment ramps, eyes, readable circle/triangle markers and steadily acquired inner color ribbons make actions legible. The full scene is sampled onto 180×260 pixels and displayed with nearest-neighbor scaling. UI uses the same ink/jade/ivory/gold/coral palette and stepped rectangular borders.

New environment details in src/app.js use grouped pixel blocks: lotus pads, tiny blossoms, submerged stone clusters, stepped light bands and low-contrast ripples. World-space placement means they scroll consistently with the fish. Decorative density stays lower than the fish and action effects. No external bitmap or image-generation service is needed. All new materials, menus and accents are code-authored.

GPL source/body effects are reused with attribution. No commercial game sprites, characters, logos, original music or screenshots are included.
