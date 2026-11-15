# RIG RUSH — Sequential builds and offices

## Sequential computer builds and office placement

BUILD A COMPUTER now draws Case, Mainboard, CPU, SSD, RAM, Power Supply, Graphics Card and Monitor in that order. Each result is saved before its reveal and installed into a separate eight-part draft. Auto advances through the sequence; Pause stops advancement and Continue resumes it. Each component retains the existing cost and rarity rules. Insufficient funds pauses until the player resumes. Refresh preserves installed draft parts and any unclaimed result. The category strip is now a progress display; existing inventory remains available for manual upgrades.

After eight parts, PLACE COMPUTER opens four physical office desks with keyboards, mice and chairs. Desk 1 uses the existing equipped main computer, preserving old saves and income. Desks 2–4 store independently drawn complete computers. Placement or explicit REPLACE commits a complete snapshot and clears the draft once. Stored component inventory is preserved. All occupied desks contribute to FPS and existing pet income bonuses. Browsing the office focuses the selected desk. Office placement is not fake multiplayer or a decoration-only preview.

Reference observed in the user recording Desktop 2026.11.15 - 03.15.20.03.mp4: assembled counter 1/8 around 65s, 3/8 around 95s, 5/8 around 125s, 7/8 around 155s, and completed computers on rear desks. Four desk capacity, animation timing and retained project economy are authored implementation choices, not assertions about unseen original rules.

SDK lifecycle follows the committed build sequence and ends on placement; a resumed visit begins on its next real action. Core tests cover ordered types, reload after each draw, duplicate roll/claim/place guards, office income and legacy migration. Browser tests cover actual automatic eight-part build, mid-build reload, placement, persistence and viewport layout. Actual GameWave App import and physical-phone performance remain unverified. Official Feishu documentation was inaccessible on recheck.

# RIG RUSH — Animation refinement

## Animation and enclosure refinement

Pets now use runtime articulated sprite animation: alternating limb pieces, flapping wing pieces, hopping or undulating body segments. These are procedural cutout rigs using the existing approved artwork, not sixty separately hand-drawn frame sets. The farm, pet collection, hatch reveal and 3D tabletop share the renderer. Row crop bounds were corrected to prevent neighboring sprite fragments. Legacy pets retain their saved identities and hatch results.

Hatching shows staged cracks, shell fragments, a rarity-colored glow and the animated pet. Farm character pixel art now echoes the authorized avatar's silver ponytail, goggles, purple clothing and asymmetric coat, with front/back walking poses. Ten guardian variants have biome-specific accessories and animated limbs. Boundary vegetation/stone/light blending softens the connected route. Map titles are moved into the HUD; active effects show countdowns, shields and pickup range; training and income HUDs explicitly show equipped pet boosts. Hatch-speed reduction is indicated at nests.

Mobile supports both tap-to-walk and a lower-left drag joystick, with release/cancel/blur clearing movement. The canvas preserves its 3:5 aspect ratio. All twenty case models use realistic enclosure families, panels, glass side, feet, airflow slots, USB and power controls. Component thumbnails are re-rendered from these models; the assembled inspection camera opens toward the glass side. Existing economy, pet skills, save key, SDK bridge, character model and 160 part identities are retained.

Validation: 60 animation poses differ across sampled phases; visual inspection of animation/guardians/hero/hatching; all 160 geometries remain distinct; 2,400 component/case bounding checks; touch joystick movement and release; real farm take/return/growth/hatch; PC training/exploration regression; cloud mocks and SDK lifecycle/error tests. Boundary tests do not prove zero mesh overlap everywhere. Physical phones and actual GameWave host import/callbacks remain untested. Official Feishu reference could not be accessed on recheck.

# RIG RUSH — PET FRONTIER

## Current release: PET FRONTIER

This section supersedes the historical hatchery notes below. POCKET FARM opens one scrolling, connected 2D world with ten regions: Grassland, Badlands, Icefield, Jungle, Plaguelands, Alien, High Tech, Future Tech, Doomsday Tech and Cosmos. Return an egg to HOME to unlock the next region. Tap or drag to move; WASD/arrows also work. Take an egg, escape its guardian, return to one of six nests, wait for growth, then hatch and equip. No FPS purchase is required.

There are 60 new pets, six per region, plus all nine legacy pets. Six rarities use base odds 40/27/17/9/5/2 percent. Every fifth egg guarantees Rare or better; every twentieth guarantees Mythic. Five standard roles boost movement, training, computer income, hatch speed or provide a protective shield. Each region's Mythic has a distinct implemented skill: dash, concealment, rescue freeze, snare, decoy, extended pickup radius, temporary double income, time freeze, two shields or two-egg carrying. Exact values and timing are displayed in the collection and defined in core.mjs/frontier.mjs. One pet is equipped at a time. Equipment changes are blocked while carrying eggs. Timers, region progress, cargo, collection and pending hatches save to the existing game-specific profile.

New artwork consists of an original 60-pet atlas and continuous ten-region background generated from the approved art direction. WebP copies are lossless and decoded pixel equality was checked. The HTML embeds all runtime art, character model and code. Farm pets have movement/bobbing rather than independent multi-frame sprite animations. The home/table displays up to twelve owned species at once; all owned pets remain in the collection. This is an authored expansion, not extracted Roblox assets or an exact original-game economy.

Validation: browser touch take/return, actual two-region traversal, real-time 45-second hatch/equip, reload, all 60 collection entries, mobile viewport layout, controlled tests of all ten Mythic effects and standard bonuses, legacy migration and game-specific cloud save mocks. See QA files. Physical Android/iOS performance and actual GameWave App import/host callbacks remain pending. This release does not certify other games.


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


## Current farm behavior — November 15, 2D revision
POCKET FARM and the PETS menu now open a portrait 2D farm. Tap or drag to move; keyboard movement is also available. Approach an egg beside the robot guardian, then return to HOME before it catches you. Success places the egg in one of three nests; being caught loses the carried egg and returns the miniature player home. Each egg grows for 45 seconds; EGGS & PETS opens matured egg hatching and the existing collection/equip interface. FPS no longer purchases eggs. The existing nine pets, levels, equipped bonus, odds and fifth-egg pity are retained. Existing owned pets and already-pending hatches survive migration. A full set of nests blocks taking another egg. Timers use saved deadlines and continue across reloads.

Observed reference: user recording Desktop 2026.11.15 - 03.15.20.03.mp4, approximately 192–202 seconds: approaching scattered eggs beside a robot, carrying one while RUN is shown, returning to the pen and placing it with a 45-second growth timer. The 2D map, guardian movement tuning, three egg types and common 45-second timing are implementation choices, not claims to know all original tiers, timings or server rules. The recording also shows timed gifts; those are not represented as an alternative acquisition path here.

A stolen-egg attempt emits an SDK start; returning or being caught emits end. Leaving the farm pauses the carried attempt and ends that active lifecycle; resuming starts a new active segment without granting an egg. Actual hatching retains its separate lifecycle. Farm browsing and merely opening collection UI do not fabricate rewards. Only this game's existing profile key is saved. Three.js drawing is skipped while the 2D farm covers the workshop.

Tests: complete real-time take/escape/plant/45-second/hatch/equip flow, reload, caught outcome, reward deduplication, legacy pets, desktop keyboard and touch emulation. Real physical-phone and actual GameWave host verification remain pending. Official Feishu reference was rechecked and inaccessible; supported bridge contract and mock checks are retained.

## Startup update
The GitHub Pages entry is a lightweight HTML shell with a versioned runtime. Workshop resources load first; farm world and pet atlases load when needed. A loading/retry panel replaces a blank startup. The ZIP root index.html remains the fully embedded standalone build for offline use and GameWave import. Saves and gameplay events are unchanged. Desktop Chromium touch emulation is not physical-phone or GameWave-host validation.
