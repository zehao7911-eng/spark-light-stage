# RIG RUSH

An English, portrait-friendly 3D browser computer workshop. Collect individual components, fit eight different categories into one computer for passive FPS income, walk onto the treadmill to train automatically, and explore three circuits.

## Play
Open index.html in a modern WebGL browser, or serve this directory with any static server. It is self-contained: no CDN, remote fonts, Roblox client, external assets or API key is required. standalone.html is the same build. Audio begins after a user gesture and can be muted.

Mobile: use the left stick, drag the scene to turn, and tap Jump. Desktop: WASD/arrows, drag to turn, Space to jump. Collection, upgrades, settings and current expedition save automatically to `rig-rush.profile.v1`. No other game's storage is read or uploaded. Offline income is capped at 30 minutes. There are eight required slots: Case, Mainboard, CPU, SSD, RAM, Power Supply, Graphics Card and Monitor. Each category has 20 models: four Common, four Uncommon, four Rare, four Epic and four Legendary. Select a category to roll, then keep or equip. Duplicates grant a displayed recycle bonus. Every tenth roll guarantees Rare or better. Removing a required component pauses the new computer income; Assemble Best fills all slots from owned parts.

Contents: 160 component entries, eight distinct component-model families with model-specific geometry/finish, quality grading, eight-slot animated assembly, free workshop walking with fixture collision, automatic treadmill entry/exit detection, three exploration environments, three companion unlocks, treadmill/luck upgrades, collection management, original synthesized music and sound effects. The enclosed workshop has no connected multiplayer visitors. There are no purchases or real currency.

## Reference and scope
Based on the user's November 15 recording: lime stud ground, tan workshop, computer pedestal, FPS income, treadmill training and exploration corridor. The eight-category / 20-model requirement is the user’s explicit correction. Specific 160 model names and stats could not be read from the recording and are newly authored, not claimed to be the original roster. Component models, layout implementation and interface are newly authored reconstructions; the separately authorized Silver Wolf player model is credited below. This is not Roblox's original source, assets, server economy or a claim of a complete original-game port. Unobserved paid systems, trading and network features are not simulated as working features.

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

## Build inspection and feedback refinement
Your Computer > View 3D Build opens an isolated, rotatable view of your actual installed models. Explode separates the eight installed components; tap a component thumbnail for a close-up, All Parts returns to the rack, and Change Part opens its collection. Equipping a component or Assemble Best displays the updated build. Inspection does not start a gameplay round. The camera reserves space for mobile controls, including short portrait screens.

Training now displays speed gained in the current session and progress toward the next circuit, with milestone sounds. Rare/Epic/Legendary rolls have additional audio accents and quality feedback; effects respect reduced-motion. Inspection is an additional usability feature, not claimed as an original Roblox feature. Existing saves, models, IDs and income rules are preserved.

## Gameplay-first hatchery validation build
The character and scene models are retained. Pet artwork and final model treatment are deliberately deferred while validating the loop. The hatchery currently uses plain test tokens; the existing follower robot is a temporary companion representation, not a finished pet model.

Spend existing FPS on Circuit (300), Frost (1800; clear Green Circuit), or Aurora (9000; clear Frost Valley) eggs. Each egg has three unique pets with 70% / 25% / 5% base chances; every fifth egg of that type guarantees the third pet. Buy, tap three times, then keep or equip. Results and tap progress save before presentation; reopening resumes the same egg. Only one pet or legacy circuit companion is equipped. Nine pets offer PC income, treadmill training-gain or Rare+ roll-weight bonuses. Rare+ weight is a relative weight adjustment, not an absolute percentage-point chance. Duplicate copies raise level up to 5; each level adds 25% of the pet's base bonus. Max-level duplicates refund 25% of the egg price. Old circuit companions and all existing inventory/progress remain available.

Core economy tests, browser hatch/reload/claim/equip, actual treadmill gain, lifecycle mocks and prior gameplay regression are recorded in the accompanying QA files. This build is for validating the gameplay loop before the final pixel-art pass.

## Hatchery access and workshop layout
A persistent HATCH PETS button opens the egg/pet flow directly. Walking into the approach area in front of the right-hand hatchery also opens it once; move away and return to trigger it again. The three physical egg displays have a solid counter. The workshop now uses a tiled floor, pale structural walls/windows and color-coded training/parts/hatchery bays with unobstructed approach lanes. Avatar geometry is unchanged. Scene signs use matching texture aspect ratios to avoid stretched type. Previously deferred pixel pet artwork remains deferred; gameplay and saves are retained.

## Simplified visual hatchery
EGGS now shows three selectable egg images, three possible-pet pictures with odds, and one purchase button. Buying automatically animates the three persisted hatch stages; no repeated tapping is required. Closing pauses it and reopening resumes the stored outcome. The result shows the pet, one bonus and EQUIP / KEEP. PETS is a separate picture grid with only the selected pet details. Full rules are behind ?, and old circuit bots remain in a collapsible list. Economy, guarantee, duplicate levels and saves are unchanged. The previously generated original pixel atlas is now integrated into the hatchery UI and embedded in both HTML entries. This is not a replacement of the 3D follower robot model, which remains a placeholder.


## November 15 enclosed gym and pocket farm update
The workshop is now a four-wall training room with ceiling lights, lockers and a clear central route. POCKET FARM opens a close-up tabletop farm; approaching its table also opens it. Hatched animals roam within its fence, steer apart, and avoid the barn. HATCH AN EGG opens the existing egg selection, followed by a separate 3D hatch scene. Nine animal kinds are displayed once each; duplicate counts still determine existing levels and bonuses. Farm viewing alone does not start an SDK round.

The player uses the user-supplied 銀狼.pmx model: 25,680 vertices, 31,789 triangles, 444 bones. Model edit: 神帝宇; coat physics: XPRAMT; original character: miHoYo. The user confirmed separate permission for public GitHub/GameWave game use and downloadable packaging on November 15, 2026. See assets/avatar/MODEL-LICENSE.txt and USER-AUTHORIZATION.txt. This is a record of user confirmation, not independent verification of a license agreement. Walking, idle and training poses are locally authored procedural bone animations, not an original VMD animation; full MMD physics and morph behavior are not implemented. Diffuse textures are reduced to a maximum 1024 pixels and embedded into the HTML along with the geometry, so the player also loads from a local file.

Validation: local Chromium touch emulation at 390, 320 and landscape widths; existing roll/equip/save, walk-on training, complete exploration round and SDK callback tests passed. Four room boundaries, treadmill jumping/landing, restored old out-of-room position, nine roaming animals and automatic hatch reload/equip passed. Real phone performance and actual GameWave host import/callbacks remain pending. The official Feishu SDK page was requested again on November 15 but was inaccessible; integration retains the documented workspace SDK contract and passed mock tests. This update does not certify other games.
