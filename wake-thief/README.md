# Wake Thief

An original HTML5 hydrofoil getaway game inspired by Swordship's dodge-as-a-weapon idea. All code, Canvas illustrations and synthesized sounds are independently created. No commercial game assets are included.

## Play

Open `index.html` in a modern browser or publish the folder to any static web host. All files are bundled locally; there are no CDN, account or network dependencies.

Drag across the sea to steer. Tapping a position also sets a destination. Touch floating cargo to tow it, then return to the circular **DROP** zone. Enemy targeting lines track you, lock, then fire. Move aside after the lock, or tap **DIVE** to submerge briefly. Enemy beams also destroy enemy boats. Cargo can only be picked up or delivered on the surface. Mines appear on later routes.

Keyboard: WASD or arrow keys steer, Space dives, Escape pauses. Tab/Enter can activate the cargo and dock destinations. Keep moving: idle boats are easy targets.

## Progress

Eight authored route configurations gradually introduce more enemies, spread fire and timed mines. Completing a route unlocks the next and offers one upgrade: hull, speed, dive recharge or pickup radius. Each upgrade has three levels. After route eight the route configurations repeat with your accumulated upgrades; this is not an infinitely authored campaign.

Three stars: deliver every crate; take no damage; sink at least two enemy boats. Replay to improve your record. Total delivered cargo unlocks Jade and Lilac paint at 12 and 28 crates. Each completed run credits cargo once, even after reloading. Current runs, upgrades and records save locally when storage is available. If storage is denied, the game remains playable for the session.

## Controls and rendering

Responsive portrait and landscape arena, safe-area padding, 46px or larger controls, capped device pixel ratio of 1.5, fixed 60 Hz simulation and 40 FPS rendering. Pause, dialogs, hidden tabs and window blur freeze gameplay and silence audio. Sound starts after a user gesture. Cancelled input, focus changes and rotation release held controls. Downloadable PNG postcards.

Canvas 2D, DOM input and Web Audio only. No WebGL or install is required. Browser viewport tests do not certify every physical phone or embedded third-party webview.

Design reference: [Swordship](https://store.steampowered.com/app/1804270/Swordship/) by Digital Kingdom, published by Thunderful Publishing.
