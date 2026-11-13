# Copperwhisk Kitchen

A phone-friendly original 3D miniature restaurant game. Tap counters to route a hamster chef; manage two pots, prep different recipes and serve three guests at a time.

## Play
Tap a guest card to choose an order. The highlighted counter suggests the next step. Tap the pantry to gather the selected ingredients, the board to prep, a pot to cook, then collect the ready dish and tap the bell counter to serve.
Salads skip cooking. Pancakes and toast skip chopping. You can prep another order while a pot cooks, and can queue one stop while chopping. Nothing burns and guests never leave; faster service earns tips and more stars. The return-tray button safely returns the held dish to its order without scoring it.
Finish six menu shifts, then continue shuffled menu rotations. Replaying a shift retains only its best stars; apron unlocks require different completed shifts.
Keyboard alternatives: 1 pantry, 2 board, 3 front pot, 4 back pot, 5 serving counter, Escape pause.

## Run
Serve this directory using a static HTTP server, e.g. `python -m http.server 8000`. Open index.html via HTTP/HTTPS; direct file:// access may block JavaScript modules. ZIP has index.html at root for straightforward HTML5 hosting. All assets, rendering library and audio are local. No external CDN, account, API key or analytics.

## Reference and independent work
Actually browsed and played Pot Luck Panic! on Rezona:
https://rezona.ai/game/pgcserver/pv/lxabyWlV/v27/dist/index.html
Its take/prep/cook/serve loop, cozy kitchen staging and parallel station management informed this new game. The original served code, character models, textures, UI and music were not copied or redistributed. New tap-to-route controls, no-burn cooking, simplified selected-order pantry, hamster characters, menus, geometry, animation, interface and sounds were independently authored. This is not an official or exact asset/pixel remake.

## Art
Original procedural Three.js hamster chef and guests, blinking eyes, carry/chop/walk/celebration animations, copper pots, plated food, checker floor, kitchen counters, props, steam and sparks. Generated wall artwork is used in the actual scene. Generated cover/icon are promotional illustrations, not screenshots, and are more detailed than runtime models. Exact prompts and selected source filenames are in ART-PROMPTS.json. All interface graphics are code-native SVGs.

## Verification
`node tools/test.mjs` checks eight complete normal-controller shifts, two-pot occupancy, order/dish conservation, collision routes, queued actions, mid-chop/mid-cook/mid-walk restoration, resets, no-loss idle and corrupt saves. The final archive is extracted and tested again.
Browser layouts verified at 320x568,390x844,844x390. Physical handset testing is not claimed. High quality caps render scale1.5 and uses1024px shadows; low quality uses scale1.0 and no shadows. Static meshes are batched by material, HUD updates are throttled, and rendering/physics stop behind pause/title/result or when hidden. The world is prepared before controls become ready.

See CREDITS.md and vendor/THREE-LICENSE.txt.
