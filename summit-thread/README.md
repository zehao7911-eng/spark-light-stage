# SUMMIT THREAD — A Little Higher

A small HTML5 pixel-platform pilgrimage, visually and mechanically referencing **Celeste**. The actual official Steam gallery/trailer was inspected for pink/lavender mountain palettes, snowy cyan stone edges, dark nighttime ruins, a red-haired climber in a blue jacket, moving hair, blue spent-dash hair, green refill crystals, strawberries and bright dash trails. Reference: https://store.steampowered.com/app/504230/Celeste/ . All sprites, terrain and backgrounds here are locally drawn code artwork, with synthesized audio. This is a compact browser interpretation, not Celeste's commercial artwork, original maps, narrative or complete mechanics.

## Controls

- Left/Right or A/D: move.
- Up/Down or W/S: aim your dash vertically. Combine directions for diagonals.
- Space/Z: jump; jump beside a wall to kick away from it.
- X/C/Shift: dash in the held direction, or your facing direction if no direction is held.
- Escape: pause.
- Touch: left stick moves and aims, right buttons jump/dash. Use two fingers for aiming and dashing together.

Your normal air dash refills on landing, springs and green crystals. Assist provides slower motion and two air dashes. It can be changed from the title or pause menu. Retry is automatic after a short burst animation, with unlimited attempts.

## Progression

Twelve authored short rooms in Snowline, Old Ruins and Star Summit. Main trails introduce gaps, directional dashes, springs, walls, crumbling ledges, crystals and wind. Every room has one optional strawberry. Touch a strawberry and reach safe ground or the finish to keep it; dying before securing it loses that attempt's pending berry.

Complete rooms to unlock the trail map and four character palettes. Each room records its best time and replay ghost, plus a medal: gold for a death-free run under 30 seconds, silver for no more than two retries, bronze otherwise. Ghost replay can be toggled. Ghost recordings are capped at 900 samples per room. Sky Loop keeps ghost paths for its latest twelve rooms, retiring older paths while preserving their scores.

After the twelfth room, Sky Loop continues with the authored room set, alternating mirrored and normal routes. It is an endless repeatable route remix, not an unlimited number of unique authored maps. Collected strawberries, records, settings and unlocked colours are saved locally. Current room is remembered; unfinished attempt timers reset on reload.

## Offline / hosting

ZIP root `index.html` inlines all runtime CSS, JavaScript and favicon. Open it offline or upload the package to a static HTML5 host; no account, build, CDN or backend is required. Editable `levels.js`, `art.js`, `game.js`, `style.css`, `icon.svg` are included, but the packaged index uses inlined source and should be regenerated after edits. Audio begins after a tap/key gesture and can be muted. The game pauses when hidden or unfocused. localStorage errors are caught so unavailable storage does not block play.

## Validation

All twelve normal routes were found using the actual fixed-step physics and then replayed in headless Microsoft Edge with real keyboard events, without teleporting, invulnerability or an infinite-dash cheat. All twelve optional strawberries were also collected by replaying verified routes with real keyboard events. The first mirrored Sky Loop room was also replayed. Tests cover real two-finger touch aiming/dashing, fast retry, crystal refill, timed crumble/rebuild, safe berry commitment, Assist, pause, best times, gold medals, palette unlocks and reload persistence. UI is checked at 360×740, 390×844, 844×390 and 1280×800. Browser/device-size simulations are not physical iPhone/Android device testing.

## Implementation

Canvas 2D, nearest-neighbour pixel sprites, 60 Hz fixed simulation, bounded catch-up, jump buffering and coyote time, collision substeps, independently tracked keyboard keys, captured touch pointers, room-local textures, a reused panorama canvas, maximum DPR 2, at most 160 particles and 14 dash silhouettes. Test-only scenario hooks are injected by the test harness and are absent from distributed code.
