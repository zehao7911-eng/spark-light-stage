# FOXTAIL GARAGE

Slide the little cars. Let the camper out.

A complete original pixel vehicle-unblocking puzzle, now with a unified image-generated art edition. Move parked cars along their own lanes, then drive the starred camper through the exit on the right. The first yard needs one blocker moved down and one camper departure.

## Controls and rules

Drag a vehicle forwards or backwards and release to park. Vehicles follow the pointer on one axis, stop at other cars and snap to cells on release. A tap only selects a vehicle. Releasing, cancelling input, losing pointer capture or resizing cannot invent an extra move. The collision clamp includes a short bumper response.

For an alternative, choose a numbered vehicle below and tap an arrow to slide to the end of its available lane. The camper is automatically selected after a clear route is created. Keyboard 1–9 selects vehicles, arrows move the selected vehicle to a lane end, U undoes, H hints, and Esc pauses. The native vehicle chooser remains available for vehicles 10 and 11.

One continuous slide counts as one move, regardless of distance. No countdown and no failure for going over par. Undo is free. Hint searches the current yard in a local Worker and highlights a useful vehicle and destination; it does not move a car. Hint usage survives Undo. A finish earns one star; a hint-free finish within par + 3 earns two; hint-free within par earns three. Replays retain only best stars and points, so keepsakes cannot be farmed repeatedly.

## Finished content

- Twelve fixed original boards with five to eleven vehicles and solver-confirmed minimum move counts of 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9 and 10. These are a finite campaign, not endless unique puzzles. No commercial challenge cards were copied.
- Three distinct pixel backdrops: Maple Garage brick workshop, Amber Yard outdoor shed/fence/tree, and Moonshift Motors rainy storefront/city lights.
- Original stepped body silhouettes, wheel treads, shaded windscreens, camper luggage/rack/star, van cargo, door seams, bumper highlights, selection outlines, dust and gate panels.
- Fox mechanic with blinking, tail motion, wrench and cheering pose. Twelve distinct keepsakes in a glovebox album and Peach/Sage/Lilac camper paints unlocked through 9/24 best stars.
- Live collision-limited drag preview, release settling from the actual drag position, an opening gate and an animated camper departure before rewards.
- Synthesised movement/parking/bump/route-clear notes and a departure chord, bounded particles, optional vibration, sound toggle and gentle effects.
- Active board, Undo history, pending movement, gate state, profile and best records save locally. Refresh resumes paused. Transient effects and ambient animation phase restart on reload. Blocked localStorage falls back to an in-memory playable session.

## Reference provenance

This independently implemented lane-constrained traffic puzzle is in the established Rush Hour family; the [official ThinkFun / Ravensburger product](https://www.ravensburger.co.uk/en-GB/products/games/logic-games/rush-hour-76598) was reviewed for genre context. No commercial source, vehicles, branding, challenge layouts or audio were imported; this is not a full commercial-game recreation or a claim of an invented genre.

The user's [detailed pixel gallery](https://mygamesartstyle.jupiterthewarlock.com/styles/detailed-pixel/) and its enlarged [NobodyNowhere street scene](https://mygamesartstyle.jupiterthewarlock.com/media/2440890/scene-1.jpg) were inspected for grouped wheel/window details, controlled surface highlights and warm-window/cool-wall contrast. The image-art edition uses six newly generated assets made with the built-in image_gen tool: one transparent overhead three-vehicle atlas, three environment banners, a title cover and a fox mechanic icon. See ART-PROMPTS.json for the complete prompt set. Original PNG source files are retained locally in the sibling foxtail-art-sources folder; the game ships small WebP delivery assets. No commercial game pixels were imported. The board, opening gate, mechanic animation, effects, typography, outlines and keepsakes remain code-drawn. The marketing cover is an illustration; it is not a gameplay screenshot.

## Image-art edition

The three scenery banners share teal shadows, warm window light and cream/coral/honey accents. Atlas source rectangles were measured against actual alpha, keeping wheels and mirrors inside each rotated vehicle. Runtime body recolouring preserves neutral highlights, tyres, glass and luggage; body colours still match the vehicle chooser. Transparent sprites render to a 576x672 internal world using the existing 288x336 logical coordinates, preserving all collision and input rules. Selection, numbers, first-step arrows, gate, dust and exit animation remain dynamic. The generated cover appears in the glovebox and social preview; the generated icon is used in the header and browser icon.

Images load without blocking play. Each loaded scene replaces its procedural fallback independently; a failed asset leaves a playable code-drawn fallback. All six delivery images together are 1,462,948 bytes; the cover is requested only when the glovebox is opened (or by preview crawlers). There are no remote runtime dependencies.

## Run / import / build

Extract the ZIP and serve its root index.html with all adjacent files on any static HTML5 host, including GitHub Pages. A local HTTP server is recommended: `python -m http.server 8080`. Upload the whole folder for HTML5 game-platform imports. The app has no CDN, external font, framework, WebGL, account, backend or service worker. Direct-file Worker support depends on browser restrictions; a small local solver fallback is included.

`node tests.cjs` verifies all minimum routes, collision-free intermediate cells, strict move counts, off-route hints, free Undo, exact pending-motion save/restore, terminal behavior, best-record idempotency, preview nonmutation, release interpolation and malformed saves. `python build.py /path/to/node` runs checks, adds content-derived asset versions and produces a reproducible FOXTAIL-GARAGE.zip one directory above the source.

All twelve yards were additionally completed through actual visible pointer drags to 36 stars and 12 keepsakes. The last two were completed at 320x568 and 844x390. Local portrait/landscape layouts at 320x568, 390x844, 844x390 and 568x320 were checked for overflow and 44-pixel minimum buttons/chooser. A compact landscape layout fixes an initially oversized right control area; the opening was completed through the direction buttons at 568x320. See native-campaign.json and qa.json. No physical Android/iOS handset was available, and no device performance certification is claimed.

## License

Original code and included artwork are distributed under MIT; the six image-generated assets are identified above and in ART-PROMPTS.json. See LICENSE.txt.
