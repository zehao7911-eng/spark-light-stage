# RIG RUSH

An English, portrait-friendly 3D browser computer workshop. Build PCs, install your best collection for passive FPS income, hold to train speed, and collect three chips in each circuit to unlock a companion.

## Play
Open index.html in a modern WebGL browser, or serve this directory with any static server. It is self-contained: no CDN, remote fonts, Roblox client, external assets or API key is required. standalone.html is the same build. Audio begins after a user gesture and can be muted.

Mobile: use the left stick, drag the scene to turn, and tap Jump. Desktop: WASD/arrows, drag to turn, Space to jump. Collection, upgrades, settings and current expedition save automatically to `rig-rush.profile.v1`. No other game's storage is read or uploaded. Offline income is capped at 30 minutes. Shelf capacity is 3–6 unique PCs; duplicates grant a displayed recycle bonus. Every tenth build guarantees Rare or better.

Contents: 12 distinct computers, three exploration environments, three companion unlocks, treadmill/luck/shelf upgrades, collection management, original synthesized music and sound effects. Workshop visitors are simulated NPCs, not connected players. There are no purchases or real currency.

## Reference and scope
Based on the user's November 15 recording: lime stud ground, tan workshop, computer pedestal, FPS income, treadmill training and exploration corridor. Models, layout implementation and interface are newly authored reconstructions. This is not Roblox's original source, assets, server economy or a claim of a complete original-game port. Unobserved paid systems, trading and network features are not simulated as working features.

## Build
Node.js: `node build.mjs`. Source files are included. The generated index.html and standalone.html embed Three.js, CSS and all game code. Run this command after source changes before packaging.

## Validation boundaries
Desktop Chromium tested at portrait and landscape mobile viewport sizes, including touch controls, actual circuit completion, pending-build reload, save persistence, reward deduplication and browser startup without SDK. Mobile viewport emulation is not a physical-phone performance test. See QA-REPORT.json for recorded results. GameWave bridge mocks cover absent/partial/late methods, async rejection, cleanup and callback semantics. Actual GameWave App import, real host callbacks and physical Android/iOS hardware remain unverified.

## Credits
Original procedural models, canvas textures, interface, music and game logic created for this project. Three.js r147 is MIT licensed; see vendor/THREE-LICENSE.txt. No extracted commercial Roblox asset files are included.
