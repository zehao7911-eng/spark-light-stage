# Apricot Approach

Original 3D HTML5 air-traffic routing game. The gameplay reference is Mini Airways (https://store.steampowered.com/app/2289650/Mini_Airways/); all scene geometry, interface, and game implementation are original. This is a small single-player adaptation of the air-traffic routing premise, not a full recreation.

## Play
Drag from a plane to its matching-color runway, or draw a curved route to keep flights apart. Routes can be redrawn. Gold helicopters land on the gold H pad. Close approaches show red safety rings. Three collisions end a chapter; waiting aircraft circle safely until assigned a route. Flights pause when the page is hidden.

Four chapters unlock the teal runway, helicopters, and a higher-density arrival challenge. Chapter completion is stored locally and unlocked chapters can be replayed from the opening screen. Stars reflect remaining safety hearts. There is no payment or monetary reward.

## Run
Serve this folder with any static HTTP server, then open index.html. All assets are bundled locally. A WebGL-capable browser is required. Touch and mouse use the same drag gesture. All player-facing text is English.

## Optional GameWave
sdk.js works without the platform. Successful supported like/comment callbacks grant an optional supporter badge. Local progress works independently; guarded host cloud-save calls are included. Real GameWave host compatibility requires platform-side testing. These integrations must not block core gameplay.

## License
Three.js is MIT licensed (vendor/THREE-LICENSE.txt). No assets or source code from Mini Airways are included.
