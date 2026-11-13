# Hush Hour

A complete original HTML5 one-button stealth game. Hold to tiptoe; let go to recover your breath. Green lamp circles are safe. Lamps gently stop a long hold, so a thumb cannot accidentally run past a rest stop. Open-eyed curators notice a courier in their ring; sleeping curators notice noisy breathing. Orange floorboards make one creak. Deliver three borrowed keepsakes to the warm door.

## Play

Serve this folder with any static HTTP server and open `index.html`. No build step, CDN, account or SDK is needed. Touch/mouse: hold the large bottom button; keyboard: hold Space. Release to stop and breathe. Escape pauses. Sound activates only after a gesture. Settings include Gentle Motion, Full/Light graphics and earned coat colours.

Six authored night deliveries share three distinct miniature sets: library shelves, hotel luggage corridors and a small museum. Lookouts and creaky floors are introduced gradually. Three catches end a run; retry is free and earned stars stay safe. Rest fully under a lamp to set a checkpoint. Best-only stars unlock breath efficiency at six stars and faster steps at twelve; the speed kit also retains breath efficiency. After Hours repeats the six halls with a capped speed increase, not infinite authored content.

The game saves the active route, breath, lookout phase, collected keepsakes, checkpoint, receipt, earned stars and preferences locally. A partial run opens on a paused title screen after reload. Local storage is best effort when browser storage is denied. Do not treat browser-local saves as authenticated cross-device identity.

## Art and source

Original procedural 3D characters, connected clothes and limbs, cap, scarf, satchel, physical lamps, shelves, luggage, exhibits, door and visual effects. No Image generation or reference assets were used. Cover is an actual game screenshot; the icon is an original SVG. Locally bundled Three.js r147 is MIT licensed. Original geometry utilities are reused from Tin Tilt under MIT. Synthesized audio is original; no recorded reference soundtrack.

Rezona study: [The Fog of Whitechapel](https://rezona.ai/game/pgcserver/pv/UHTebvyb/v4/dist/index.html). Its intro/stalker scene and strength display were inspected; no full reference playthrough or source parity is claimed. Hush Hour uses its own breath-management rules, original models and set design. Earlier time-motion and segmented-body candidates were rejected after checking prior games.

## GameWave integration

The optional bridge detects the host-injected `window.neonlib` per method. Core boot/input/rendering do not wait for it. `gameStart()` and `gameOver()` correspond to real rounds, including a restored run resumed by the user. Like and direct-comment listeners check registration code zero, clean up unsubscribe handles, time out safely and support bounded late-injection probing.

A real positive `onLike` event unlocks **gold soles**. A real direct `onComment` event, including an image-only empty-content comment, unlocks a **lavender scarf**. Both are optional idempotent cosmetic flags, never repeated currency. Registration, unlike, a reward-card click or a historical state guess awards nothing. The bridge does not post, like, comment or invent panel-opening APIs. These controls appear only with a successful supported registration; a standalone build honestly identifies them as App extras.

Local save flags use the versioned game namespace. Supported platform cloud save is attempted with the whole intended save envelope. Only the documented direct saved object for this game's envelope is accepted; best progress/reward flags merge monotonically, and cloud load never overwrites a newer local active run or local preferences. A load timeout or unknown return shape keeps local play/saving available and suppresses cloud writes, so unknown remote data is not overwritten; a very late response is ignored. Cloud saves are not a server-atomic currency ledger. Authentication, multi-account isolation and cross-device exactly-once guarantees are not claimed.

`getGameViewport()` is read when present for validated host metadata; actual container dimensions remain authoritative for layout and render density is capped separately. This avoids assuming host density is a second CSS layout multiplier. Sensor/microphone permissions are not requested.

The bridge is tested with mocks for absent, incomplete, late, failing and unsupported SDKs, registration timeout and exit races, true/false like, empty direct comments, duplicate callbacks, cloud merge, cleanup and lifecycle. **Real GameWave App import/events/cloud return shape must still be tested in a supported host before claiming host validation.** See `GAMEWAVE-IMPORT.txt` for the import contract.

## Verification

Run `node tools/test.mjs` (Node 18+). It exercises 54 complete night routes across all six nights, three kits and three speed tiers, failure/save/terminal guards, SDK and reward behavior. Browser testing and physical phone testing are different: mobile viewport testing does not establish device FPS or GameWave host compatibility. Browser evidence and deployment receipts are retained outside the distributable game folder.

The ZIP has `index.html` at its root and only this game's files, libraries, license notices, cover and icon. No unrelated games are included.
