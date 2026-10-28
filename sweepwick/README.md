# Sweepwick

A small, original HTML5 cleanup game. Drive a rabbit's miniature street sweeper, collect discarded objects, recycle the load and turn three neglected corners into gardens. Six neighbourhoods form a complete, replayable campaign.

## Play

- Tap a street to drive there, or drag anywhere on the world to steer with a thumb joystick.
- The spinning brushes pick up nearby litter automatically. Follow the dotted route; buildings remain solid.
- Tap **BAY** to drive to the actual recycling pad. Stop there to unload. The hopper tips and the load is banked.
- A garden blooms only when every piece from that street has been collected **and recycled**.
- **WHOOSH** charges by collecting litter. Tap it for a three-second wider, faster sweep.
- Three toy ducks are hidden among each neighbourhood's litter. They are collected in the same way.

Keyboard: arrows or WASD to drive; **B** routes to the bay; **Space** uses WHOOSH; **Escape** pauses. Garden cards route to the nearest remaining piece in that street. There is no hard timer, damage, currency purchase or forced failure.

## Campaign and rewards

Tea Lane, Cherry Market, Lighthouse Pier, Sunday Garden, Canal Corner and Lantern Walk have different litter routes, counts, building colours, signs, lighting palette and street labels. Sunday Garden and Canal Corner also shift their middle road. The town's physical grid and building system are shared, rather than six entirely different city models. Three garden restorations finish a neighbourhood.

Each finish earns one star; finding all three toy ducks and using WHOOSH earn the other two. Only a street's best stars count toward the permanent shelf, so replaying one street cannot farm unlocks. Four total stars unlock Coral truck paint. Ten unlock the driver's flower cap. The active route, collected objects, bag, exact truck position, charge and partial unloading are saved locally. Progress is device/browser local.

## Artwork

All runtime artwork is original code-built Three.js geometry, materials, code-rendered sign textures and vector UI. The rabbit has separate face, ears and ear interiors, whiskers, muzzle, workwear and cap. The vehicle has turning wheels, rotating brushes, intake hoses, open cab, lamps, visible load and tipping hopper. The town has dimensional shop fronts, roofs, flower boxes, café furniture, paving, lamps, waterfront scenery and three actual garden transformations.

No image-generation tool was used. The cover is a screenshot of the real title scene. The SVG icon is original vector artwork. No reference game assets, source, music or characters were copied.

Quality calibration: the user-supplied **Harbor Haul V2** reference was played through its first pickup and studied for coherent environment/UI, readable controls and visible cargo changes: <https://static-oss.neon-arcade.ai/playwave/prod/sites/temp/HARBORHAULV2-q9c8rk/index.html>. Sweepwick changes the core loop to street cleaning, recycling and garden restoration. Rezona's **Trash Talk** was inspected at its title screen and rejected as a direct mechanics reference because it is an FPS: <https://rezona.ai/game/pgcserver/pv/uSEsgBfC/v14/dist/index.html>. No FPS play or full reference completion is claimed.

## Run and package

Serve this folder over HTTP or upload its contents to any ordinary static HTTPS host. No build, account, server API, CDN or remote font is required. `index.html` is at the ZIP root. Browser modules require HTTP(S); double-clicking the file is not the supported launch method.

Example: `python -m http.server 8000`, then open `http://localhost:8000`.

The only bundled third-party runtime is **Three.js r147**, MIT licensed; see `vendor/THREE-LICENSE.txt`. The game source is provided for modification. Original code and artwork are supplied under MIT; see `LICENSE.txt`.

## Mobile and verification

Portrait-first responsive UI, minimum 46px buttons, touch pointer capture/cancel, safe-area spacing, pause on blur/background, audio unlocked by interaction, DPR cap 1.5, 1024px shadow map, batched static geometry and instanced litter/particles. Low graphics mode disables shadows and uses DPR 1. All audio is original short WebAudio synthesis.

Run `node tools/test.mjs` for six complete ordinary-input controller routes, street bounds, full item conservation, all garden/duck rewards, invalid saves, cooldowns, frozen terminal state and exact moving-save continuation. `tools/phone-preview.html` embeds the real game at 390×844 for visual inspection. Browser size checks do not certify performance on a physical handset. No platform grade, revenue or minimum-payment guarantee is made.
