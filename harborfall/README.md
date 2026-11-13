# Harborfall — Lighthouse Island

A single playable third-person coastal disaster chapter, built for portrait touch screens. This is a purpose-built browser interpretation of the supplied survival video, not a Roblox project, not a port of a Roblox engine, and not an official Roblox game.

## Play

Open `index.html` in the delivered ZIP. It contains the runtime and does not require a CDN or an account. WebGL is required. Audio starts after Play.

- Left thumb: move. Drag the scene with the right thumb: rotate the camera.
- Jump: the large arrow button. First aid: the small cross, restores 45 health once.
- Desktop: WASD or arrows, drag to look, Space to jump, E for first aid, Escape to pause.
- Explore for 10 seconds. Keep away from burning buildings and the orange falling-ember marker. The boat arrives 55 seconds into the fire. Reach the end of the pier before the evacuation timer expires.
- Coins are optional. Escaping awards 100 coins. All five other islanders are local NPCs, not online players.

The lighthouse has two connected stair flights, a gallery, coastal paths, three enterable buildings, a pier and a moving rescue boat. Buildings collapse on a scripted timeline. There is one handcrafted map and one disaster in this review build.

## Save and resume

The game uses only `harborfall-profile-v1` for your completed-round profile and `harborfall-checkpoint-v1` for the current chapter. A checkpoint is saved every two seconds and when paused. Continue restores the chapter; Restart starts over. Completed profiles can sync through a compatible GameWave host. The active checkpoint is local to the device/browser.

## Source

`index-source.html` loads the editable modules: `world.mjs`, `game.mjs`, `audio.mjs`, `sdk.mjs`, and `style.css`. `standalone.html` is the same self-contained release as the root entry. Models are original articulated geometry created by `world.mjs`; no generated images or inaccessible Roblox asset IDs are required. Music and effects are synthesized locally.

## GameWave

Optional `window.neonlib` detection is connected to actual chapter starts and win/loss/abandonment. The game starts and plays without the SDK. Positive like and direct-comment callbacks optionally unlock named collectible badges in the pause menu, with persistent duplicate guards. Only this game's profile is sent to its scoped cloud envelope. Registration cleanup, late/partial SDK and errors are handled.

The supplied official Feishu SDK URL was rechecked but could not be fetched during this task. Integration follows the workspace's previously verified API contract. Automated adapter and browser mock tests do not establish real GameWave compatibility. Actual host import, host callbacks and physical-phone performance remain to be verified by the platform's importer.

## Verification scope

Desktop Chrome with emulated native touch; portrait 320×568, 390×844 and 430×932; landscape 844×390. Native movement, jumping, full lighthouse climb and escape route, fire damage, first aid, defeat/retry, checkpoint/reload, saved victory and SDK event logic checked. Some branch tests use controlled saved-state fixtures. This is not a physical handset performance certification or a quality rating from the reference platform.
