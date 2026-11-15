# GameWave import

Import RIG-RUSH.zip with index.html at archive root. index.html and standalone.html are identical self-contained entries. Keep the default browser startup: GameWave may inject window.neonlib asynchronously; no remote SDK script is required by this package.

The game-specific bridge saves only `{game:'rig-rush',v:1,profile:...}`. Local key: rig-rush.profile.v1. A newer recognized cloud profile can restore progress while idle; active build/training/expedition progress is not overwritten. One-time cosmetic flags merge monotonically. Unknown cloud payloads are not overwritten.

Actual rounds: a committed component roll starts a round and keeping/equipping its result ends it; physically entering the treadmill starts and stepping off/pausing ends it; entering an expedition starts and finishing or leaving ends it. Assembly Best emits a committed assembly round. Restored progress starts on the next real action. Viewing a menu does not start a round.

Confirmed positive onLike events unlock a gold title glow. Confirmed direct onComment events unlock aurora stat borders. Unlike events do not reward. Async registration must return code 0; callbacks require a string project_id. Duplicate rewards are guarded by saved booleans. Optional reward instructions appear in Help only when their registration is supported. These cosmetic rewards are not required for gameplay. Local-only deduplication is browser/device scoped; cross-device behavior depends on actual successful host save/load.

Official document was rechecked on 2026-11-15 but was inaccessible in this environment. Implementation follows the workspace's previously recorded SDK contract. Mock tests are not proof of a successful platform import. The importer must verify current host requirements, actual lifecycle calls, save/load, likes, direct comments and portrait controls in the supported GameWave App before marking host validation complete.

Hatchery lifecycle: committing an egg purchase starts a hatch round. Closing the hatchery ends the current session without losing the stored result. Reopening the menu alone emits no start. The next real crack/claim action starts a resumed round; keeping/equipping ends it. Per-pet ownership, selected buddy, per-egg pity count and pending egg/taps are included only in the existing rig-rush scoped profile. Claim clears pending before any further action, preventing duplicate local rewards. Existing SDK callback rewards are unchanged. Official document recheck remains inaccessible; host validation is still pending.

Simplified hatch UI: after purchase or resume, the active visible hatch screen automatically advances persisted reveal stages. A resumed reveal starts the hatch session at its first advancing stage, not on menu opening. Closing ends the session; claim/equip ends it after clearing pending. Result viewing alone does not start a round.


## Current release: PET FRONTIER

This section supersedes the historical hatchery notes below. POCKET FARM opens one scrolling, connected 2D world with ten regions: Grassland, Badlands, Icefield, Jungle, Plaguelands, Alien, High Tech, Future Tech, Doomsday Tech and Cosmos. Return an egg to HOME to unlock the next region. Tap or drag to move; WASD/arrows also work. Take an egg, escape its guardian, return to one of six nests, wait for growth, then hatch and equip. No FPS purchase is required.

There are 60 new pets, six per region, plus all nine legacy pets. Six rarities use base odds 40/27/17/9/5/2 percent. Every fifth egg guarantees Rare or better; every twentieth guarantees Mythic. Five standard roles boost movement, training, computer income, hatch speed or provide a protective shield. Each region's Mythic has a distinct implemented skill: dash, concealment, rescue freeze, snare, decoy, extended pickup radius, temporary double income, time freeze, two shields or two-egg carrying. Exact values and timing are displayed in the collection and defined in core.mjs/frontier.mjs. One pet is equipped at a time. Equipment changes are blocked while carrying eggs. Timers, region progress, cargo, collection and pending hatches save to the existing game-specific profile.

New artwork consists of an original 60-pet atlas and continuous ten-region background generated from the approved art direction. WebP copies are lossless and decoded pixel equality was checked. The HTML embeds all runtime art, character model and code. Farm pets have movement/bobbing rather than independent multi-frame sprite animations. The home/table displays up to twelve owned species at once; all owned pets remain in the collection. This is an authored expansion, not extracted Roblox assets or an exact original-game economy.

Validation: browser touch take/return, actual two-region traversal, real-time 45-second hatch/equip, reload, all 60 collection entries, mobile viewport layout, controlled tests of all ten Mythic effects and standard bonuses, legacy migration and game-specific cloud save mocks. See QA files. Physical Android/iOS performance and actual GameWave App import/host callbacks remain pending. This release does not certify other games.



## Animation and enclosure refinement

Pets now use runtime articulated sprite animation: alternating limb pieces, flapping wing pieces, hopping or undulating body segments. These are procedural cutout rigs using the existing approved artwork, not sixty separately hand-drawn frame sets. The farm, pet collection, hatch reveal and 3D tabletop share the renderer. Row crop bounds were corrected to prevent neighboring sprite fragments. Legacy pets retain their saved identities and hatch results.

Hatching shows staged cracks, shell fragments, a rarity-colored glow and the animated pet. Farm character pixel art now echoes the authorized avatar's silver ponytail, goggles, purple clothing and asymmetric coat, with front/back walking poses. Ten guardian variants have biome-specific accessories and animated limbs. Boundary vegetation/stone/light blending softens the connected route. Map titles are moved into the HUD; active effects show countdowns, shields and pickup range; training and income HUDs explicitly show equipped pet boosts. Hatch-speed reduction is indicated at nests.

Mobile supports both tap-to-walk and a lower-left drag joystick, with release/cancel/blur clearing movement. The canvas preserves its 3:5 aspect ratio. All twenty case models use realistic enclosure families, panels, glass side, feet, airflow slots, USB and power controls. Component thumbnails are re-rendered from these models; the assembled inspection camera opens toward the glass side. Existing economy, pet skills, save key, SDK bridge, character model and 160 part identities are retained.

Validation: 60 animation poses differ across sampled phases; visual inspection of animation/guardians/hero/hatching; all 160 geometries remain distinct; 2,400 component/case bounding checks; touch joystick movement and release; real farm take/return/growth/hatch; PC training/exploration regression; cloud mocks and SDK lifecycle/error tests. Boundary tests do not prove zero mesh overlap everywhere. Physical phones and actual GameWave host import/callbacks remain untested. Official Feishu reference could not be accessed on recheck.

