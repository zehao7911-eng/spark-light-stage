# Tabletop Turbo

A lightweight HTML5 / Three.js toy racing game for touch and keyboard.

## Play
- Automatic acceleration. Hold left / right to steer, or drag the road horizontally.
- Hold DRIFT in a turn; release after the meter lights to get a short turbo.
- Cyan strips give a longer turbo. Race three laps against three toy rivals.
- Reset returns the car to the road and adds two seconds.
- Keyboard: arrows / WASD, Space drift, R reset, Escape pause. Down / S brakes and reverses.
- Finish races to unlock five car paints; victories increase rival pace.

## Run
Serve this folder using any static HTTP server. Example: `python -m http.server 8000`.
Open the URL in a current Safari, Chrome, Edge or Firefox browser with WebGL enabled.
All assets and the rendering library are local; no runtime CDN, account or API key.
Opening index.html directly with file:// can block JavaScript modules: use HTTP hosting.

## Technical verification
`node tools/test.mjs` runs natural three-lap controllers, drift boost, jump/landing, bounded states, exact save/continuation, reset, finished-state freeze and corrupt-save checks.
Touch layout verified in browser at 320x568, 390x844 and 844x390; this is browser emulation, not physical-device certification.
Low quality disables shadows and caps render scale at 1.0. High quality uses a 1024px shadow map and caps render scale at 1.5. Static models are batched by material. An overhead camera fallback keeps the car visible when giant furniture blocks the chase view. Stalled cars automatically recover after a short delay. No rendering behind the opaque title or pause overlay.
Save data stays on the player's device; unavailable storage does not prevent play.

## Reference and scope
Selected after actually inspecting Table Top Turbo on Rezona:
https://rezona.ai/game/pgcserver/pv/DKkkOgJW/v19/dist/index.html

An independent reference remake of its tiny-car / giant-living-room racing concept, three-lap structure, four-car grid, tape track, furniture proportions, drift-charge boost and road turbo strips. The publicly served script was read to check observable rule constants. That script and its original model, textures, music and UI images are NOT redistributed here. New code, new procedural models/materials, synthesized sound, generated cover/icon. This is not an exact pixel/asset/source copy. Mobile auto-gas, garage paint progression and saved active races are adaptations.

See CREDITS.md, ART-PROMPTS.json and vendor/THREE-LICENSE.txt.
