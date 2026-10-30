# Firefly Row

An original, self-contained HTML5 window-light puzzle for touch screens. Tap a window to switch it and its orthogonal neighbours. Light the entire house to welcome its resident. No timer, lives, purchases, accounts, or external dependencies.

## Play

Serve this folder over HTTP(S), or upload it to static hosting. `index.html` is at the archive root. For local development: `python -m http.server 8000`. Open `http://localhost:8000/`.

- Tap/click a window. Its nearest neighbours switch too; diagonals do not.
- Hold/hover/focus a window to preview its affected cross. Arrow keys move keyboard focus; Enter/Space taps.
- Light all windows. Undo is free. Hint marks a shortest-path move without making it for you.
- One star for finishing, a second within target + 2 taps, a third at or below target without hints. Replaying improves your best record; stars cannot be farmed by replaying the same house.
- The Neighbours album reopens unlocked houses. Honey light is available initially; Peach unlocks at 9 stars and Starlight at 24. These visibly change illuminated panes and fireflies.

## Included content

12 fixed, solver-selected starts: six 3×3 and six 4×4 houses, exact shortest lengths 1, 2, 3, 3, 4, 4, 3, 4, 4, 5, 6, 7. Three illustrated locations, twelve individual resident portraits, a two-pose moth lamplighter, off/on window illustrations, an app icon and a cover captured from the running game. This is a finite campaign, not an infinite level generator.

Windows immediately reflect the actual puzzle state. A solved house opens its door and its resident emerges. Tap chimes, light bursts, moth poses, fireflies and rainy wharf ambience support the action. Effects are bounded and decorative: they do not change puzzle rules. Gentle Motion disables moving particles/rain and makes resident appearance immediate. Sound begins only following an input gesture and can be switched off.

## Reference and art direction

- Rezona **Tiny Crew**, inspected at `https://rezona.ai/game/pgcserver/pv/ZFiGfVyw/v15/dist/index.html`: entered CLOCK IN and viewed THE DIAMOND at 0%, including workshop/tools. The reference informed tangible object-state feedback only. No repair completion or entire reference campaign was verified. Its multi-tool repair gameplay is not used here; Tiny Crew was also referenced by an earlier production, so it is not claimed as a newly discovered source.
- The user's art atlas, `https://mygamesartstyle.jupiterthewarlock.com/styles/storybook/`: inspected its enlarged Spiritfarer camping illustration for thin contours, layered blue dusk and warm illustrated lights. No image or character was copied.
- New core: the mathematical Lights Out family, independently implemented. No third-party game source or ripped game assets are bundled. The previous one-stroke theatre game's rules and artwork are not reused.

All five raster masters were made with the built-in **image_gen** tool: three backdrops, one transparent sixteen-item atlas and one icon. Exact prompts and generated source filenames are in `ART-PROMPTS.json`; originals are in `assets/masters/`. Production WebP derivatives retain generated alpha. Atlas preparation separates existing connected alpha components and crops/pads them, without repainting characters or removing a generated background. The twelve resident sprites are still cutouts animated as whole sprites; they are not skeletal rigs or generated frame-by-frame animation.

## Technical notes

Vanilla JavaScript modules, Canvas2D, native semantic DOM window buttons, CSS and Web Audio. No CDN, analytics, external fonts, service worker or remote runtime request. Canvas device pixel ratio is capped at 2, rendering at 40fps (24fps Gentle), a maximum of 240 short-lived sparkle particles and 20 ambient fireflies. On pause/background/blur, gameplay and animation stop and active audio voices are released. Window rules are input-driven and independent of frame rate.

Storage key: `firefly-row-v1`. Exact board, reversible move history, hint count, best stars, best moves, sound/motion/glow settings persist. Reloading a partial board opens Pause. Invalid histories/settings fall back safely. Browser storage failure does not prevent play. Images have bounded 12-second load timeouts per load phase; missing images use a playable code-drawn fallback, with Retry illustrations in Pause.

## Verify

`node tools/test.mjs`

The independent GF(2) basis oracle checks all 66,048 possible board differences for reachability, and shortest-route application/transition consistency for all 4,608 reachable differences. Campaign tests finish all twelve houses and check undo, hints, save/restore, corrupted data, invalid inputs and idempotent rewards. Browser layout and native-input evidence is recorded separately in the delivery report. Desktop device-size checks do not substitute for physical handset testing.

License: MIT for original code. Generated original raster assets and prompts are supplied with this project under the same grant. No third-party branding is included.
