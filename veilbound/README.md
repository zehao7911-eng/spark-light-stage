# VEILBOUND — The Quiet Kingdom

A compact, mobile-ready HTML5 action pilgrimage. Visual reference: Team Cherry's **Hollow Knight**, inspected from its actual official Steam screenshots: https://store.steampowered.com/app/367520/Hollow_Knight/ . The white horned mask, dark flowing cloak, ink outlines, cyan/green/purple ruin palettes, luminous slash arcs, atmospheric backdrops and delicate ironwork follow that reference. This is a browser-scale redraw with a shorter progression loop, not the original game or a complete reproduction of its art, map or systems. No commercial sprites, music or fonts are included.

## Play

- Move with Left/Right or A/D. Space/W/Up jumps. A second jump unlocks in room 4.
- Hold J/Z to slash. K/X dashes in the facing direction; it protects you briefly.
- Hold L/C (Focus) while standing still to heal. Each mask costs 33 soul. Hitting enemies generates soul.
- On touchscreens, use the six visible controls. Hold Slash to keep attacking. Simultaneous movement/action touches are supported.
- Defeat the room's foes, then walk through its glowing right-hand arch.
- Jump onto balconies and slash treasure chests for Geo and soul.
- Stop beside a bench to recover. Each room starts from a saved checkpoint.
- Choose a free improvement after each room. Spend Geo at the reward screen to temper the nail or restore health. Guardians grant one of eight charms.
- Complete nine rooms and three guardians to unlock Nightfall, an endless continuation with escalating enemy health and repeating biome cycles.

## Included

Three atmospheric regions: Forgotten Crossing, Verdant Cloister and Violet Archive. Four ordinary enemy types; three guardian appearances and attack variants; enemy anticipation, dash invulnerability, jump buffering, coyote time, double jump, healing, slash deflections, treasure platforms, knockback, hit pause, cloak motion, particles, light rings, layered parallax, cached scenery, local sound synthesis, room-entry saves and persistent best progress.

Health, nail damage and charm effects have bounded upgrades. Enemy health continues growing in Nightfall. There is no real-money currency, account, backend or external dependency.

## Open / import

The ZIP's root `index.html` contains all runtime art, CSS, JavaScript and icon inline. It can be opened offline or imported into a static HTML5 host. No installation or build step is required. For a development server, serve this directory with any HTTP server. Editable `art.js`, `game.js`, `style.css`, `icon.svg` are also included; the packaged index uses the inlined copies, so repackage after editing source files.

Audio starts after a user gesture. The music button mutes all audio. The game pauses when hidden or when focus is lost. Saves use localStorage with a safe fallback if browser storage is unavailable. Clearing site data clears progress.

## Validation

Headless Microsoft Edge tests cover a full nine-room run using normal keyboard inputs and gameplay updates, endless entry, real held-touch steering, dash protection, soul costs, double jump, reachable treasure via normal physics, pause, rotation camera centering, reward persistence, forge spending, death/retry, and three guardian scenes. Layout checked at 360×740, 390×844, 844×390 and 1280×800. The packaged offline file is checked without a network connection. These are browser simulations, not a claim of physical iPhone/Android device testing.

## Technical

Canvas 2D; 60 Hz fixed simulation with bounded catch-up; maximum DPR 2; scenery cached per room; at most 230 particles, 60 hostile projectiles and 22 floating labels. The finite campaign has bounded foes; Nightfall increases stats rather than unbounded spawn counts. A room's unfinished loot is rolled back on reload/retry to avoid duplicating treasure. Reward choices and forging are persisted immediately.

## Detail update 1.1

- Attack and dash input buffering, independent keyboard/touch input sources, and immediate facing from held movement.
- Visible dash cooldown and Focus progress rings, subtle offscreen foe direction hints, and a boss meter above the fight.
- Hit flash, cosmetic hit chains, dissolving enemy silhouettes, collectible Geo trails, ground shadows, breathing lantern light, drifting leaves/dust and room fades.
- Guardians sleep until approached. Half-health awakening cues and slam landing telegraphs clarify their attack timing.
- Fixed guardian slam waves being cancelled before landing. Fixed Echo Bloom kills skipping loot/stat accounting. Fixed maxed nails accepting paid upgrades and Rest & Renew reducing a larger health cap.
- Health DOM elements update only when their value changes. Defeated summoned foes are retired after their animation to keep enemy lists bounded. Existing v1 room-entry saves remain compatible.
- Added regression scenarios for Echo reward idempotence, guardian engagement/landing, overlapping key bindings, input buffering, upgrade caps and portrait boss-HUD placement. Scenario hooks are injected by tests only; distributed code contains no mutable scenario hooks.
