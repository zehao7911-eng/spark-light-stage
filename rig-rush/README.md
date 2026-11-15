# RIG RUSH

An English, portrait-friendly 3D browser computer workshop. Collect individual components, fit eight different categories into one computer for passive FPS income, walk onto the treadmill to train automatically, and explore three circuits.

## Play
Open index.html in a modern WebGL browser, or serve this directory with any static server. It is self-contained: no CDN, remote fonts, Roblox client, external assets or API key is required. standalone.html is the same build. Audio begins after a user gesture and can be muted.

Mobile: use the left stick, drag the scene to turn, and tap Jump. Desktop: WASD/arrows, drag to turn, Space to jump. Collection, upgrades, settings and current expedition save automatically to `rig-rush.profile.v1`. No other game's storage is read or uploaded. Offline income is capped at 30 minutes. There are eight required slots: Case, Mainboard, CPU, SSD, RAM, Power Supply, Graphics Card and Monitor. Each category has 20 models: four Common, four Uncommon, four Rare, four Epic and four Legendary. Select a category to roll, then keep or equip. Duplicates grant a displayed recycle bonus. Every tenth roll guarantees Rare or better. Removing a required component pauses the new computer income; Assemble Best fills all slots from owned parts.

Contents: 160 component entries, eight distinct component-model families with model-specific geometry/finish, quality grading, eight-slot animated assembly, free workshop walking with fixture collision, automatic treadmill entry/exit detection, three exploration environments, three companion unlocks, treadmill/luck upgrades, collection management, original synthesized music and sound effects. Workshop visitors are simulated NPCs, not connected players. There are no purchases or real currency.

## Reference and scope
Based on the user's November 15 recording: lime stud ground, tan workshop, computer pedestal, FPS income, treadmill training and exploration corridor. The eight-category / 20-model requirement is the user’s explicit correction. Specific 160 model names and stats could not be read from the recording and are newly authored, not claimed to be the original roster. Models, layout implementation and interface are newly authored reconstructions. This is not Roblox's original source, assets, server economy or a claim of a complete original-game port. Unobserved paid systems, trading and network features are not simulated as working features.

## Build
Node.js: `node build.mjs`. Source files are included. The generated index.html and standalone.html embed Three.js, CSS and all game code. Run this command after source changes before packaging.

## Validation boundaries
Desktop Chromium tested at portrait and landscape mobile viewport sizes, including touch controls, actual circuit completion, pending-build reload, save persistence, reward deduplication and browser startup without SDK. Mobile viewport emulation is not a physical-phone performance test. See QA-REPORT.json for recorded results. GameWave bridge mocks cover absent/partial/late methods, async rejection, cleanup and callback semantics. Actual GameWave App import, real host callbacks and physical Android/iOS hardware remain unverified.

## Credits
Original procedural models, canvas textures, interface, music and game logic created for this project. Three.js r147 is MIT licensed; see vendor/THREE-LICENSE.txt. No extracted commercial Roblox asset files are included.

## Existing saves
The storage key is unchanged. Profile schema 2 retains prior currency, speed, upgrades, completed circuits, companions, legacy PC inventory and unclaimed legacy PC. Prior installed PC income is retained separately. Claim any saved legacy result in Your Computer. Initial base components are provided. No other game saves are accessed.

## Model / motion refinement (2026-11-15)
All 160 entries now use color-independent geometry differences. Five structural families per category include compact/desktop/dual-chamber/open-frame/segmented cases, bare/fin/radial/twin-tower/liquid CPU packages, and single-fan/blower/dual-fan/water-block/triple-fan GPUs. Four layouts per family add physical modules, daughterboards, cooling pipes, kit arrangements or stands. Inventory thumbnails are rendered from the same 3D models, not generic category icons. Assembled components are fitted to their selected case dimensions. Ground-height integration keeps jumps continuous when leaving the treadmill. Collision clearance accounts for avatar arms. Tests exercise 2,400 component/case bounds, actual walking and touch control; these do not establish universal collision freedom or physical-phone performance.
