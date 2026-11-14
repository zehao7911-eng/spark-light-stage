# Plate District

An independent HTML5 number-plate collecting game, reconstructed from the user's 323-second recording. Original code and procedural models; not an export of Roblox source, assets or multiplayer services.

## Play

Open index.html directly or host this folder on any static web server. The root index and standalone.html both embed all required JavaScript, textures and CSS. No build service, CDN, login or SDK is needed to play.

Generate a plate, then keep it for showroom income or sell it for credits. Every tenth generated plate is Rare or better. Upgrade the workshop, unlock four districts and complete six milestones. Work shifts provide 600 credits so progression cannot be blocked by an empty balance. Credits have no monetary value.

Tap buttons on mobile. Minimize the panel to explore: tap the ground to walk, drag to rotate the camera. Portrait and landscape layouts are supported. Sound is gesture-gated and can be muted. Figures intentionally have no hair. Plate reveal audio, stamp animation, coins and rare confetti provide feedback.

## Content

Four regions, five rarity classes, patterned mirror/sequence/triple/perfect-series plates, six upgrade tracks, 12–36 garage slots, computer display, six claims, guaranteed ten-roll milestone and optional cosmetic host rewards. Showroom income is capped at one hour offline. This is a single-player reconstruction, not a server market or real player leaderboard. Unlike the reference, it does not implement auctions, trading, timed leases or multiplayer.

## Persistence and GameWave

Only localStorage key `plate-district.profile.v1` is read or written. Pending results are saved before animation, so reload does not generate a second reward. Cloud envelope uses game `plate-district`, v1 and that game's profile only. Newer profile snapshots win; confirmed reward flags are unioned. During an active roll or shift, a late cloud result cannot replace gameplay state. A round starts at paid generation and ends on Keep/Sell; a work shift starts/ends independently. Restored pending results resume their host round when accepted. An incomplete work shift grants no credits after reload.

Optional supported onLike grants a gold frame; supported direct onComment grants aurora rim lighting. Neither gates play. Positive like and direct-comment callback semantics, one-time flags, async unsubscribe, late SDK, rejection and missing methods are guarded. The official Feishu document was rechecked on 2026-11-14 but inaccessible; the workspace's documented contract was followed.

Browser touch emulation and SDK mocks are test evidence, not physical-phone or real-GameWave-host certification. Those two environments remain unverified. Test reports accompany this archive.

## Source

core.mjs: economy, generation and profile validation. scene.mjs: procedural Three.js environment, hairless avatars, computer desk and camera. main.mjs: controls, animation, profile events and SDK integration. sdk.mjs: optional host adapter. style.css: responsive UI. index-source.html: module entry. index.html / standalone.html: self-contained builds. Three.js license is under vendor.

## Recording polish revision 2
Closer interior workshop camera when panels are open, exterior exploration when minimized. Finer brick repeat, plaster inset/skirting, overhead fixtures, tool board, crates, bench vise and relocated display plate. Existing bald avatars retained; static shadows no longer freeze character silhouettes. Neutral charcoal/mint UI, stamped plate border and slimmer typography. Columns decelerate and lock individually; pending value is hidden until final stamp. Reveal adds rarity pips, tier lighting, sheen, value count-up, bounded confetti, tier-specific audio and optional vibration. Mobile panel background renders at 30 FPS, while UI updates independently; multi-touch/cancel handling is guarded. Same save key, economy, pending-result behavior and SDK contracts. Physical phones and actual GameWave App remain unverified.


## Recording layout and collision revision 3
Removed the invented car, stamp machine and tool workshop. Scene follows the visible recording: empty concrete garage, plaster side walls, brick entry, green doors, right-side computer desk, yellow operating ring and facing garage facades. Hairless black-shirt/blue-stripe character retained. Walking to the ring opens the generator. Tap-to-walk routes around walls, rotated door panels and desks; WASD/arrows also work while exploring. Swept motion uses a 0.95-unit radius covering animated arms, feet clear floor thresholds, and camera ray collision prevents passage through walls, doors and the monitor. Panel changes no longer move the camera through the garage. Save schema, economy and SDK events are preserved. Only visible recording details were reconstructed; this is not verified as the complete original Roblox economy, auctions, crafting or multiplayer.


## Recording polish revision 4
Camera-relative left/right is corrected. Tap paths are simplified using collision-checked line of sight. Movement accelerates smoothly, waypoint motion is capped to prevent overshoot, and limbs follow distance travelled rather than absolute time. Opening the generator disables walking. Mobile exploration has an independent left thumb stick and right camera drag, including cancellation/blur cleanup; characters remain hairless. Existing swept collision and camera clipping remain active.

Collection adds persistent favorite protection, value/newest sorting, favorite filtering and best-value display. Automatic generation sells Standard/Uncommon results and stops on Rare+, insufficient credits, page navigation or hiding the game. Each automatic generation/settlement uses the same real SDK round as manual play. The six existing upgrade tracks now have connected hexagonal presentation without silently changing saved upgrade costs or requirements.

Inventory adds Luck I (+15% relative non-Standard odds for 15 minutes), Luck II (+35%), and 10-to-1 crafting. One introductory potion and one per new ten-generation milestone provide a single-player acquisition loop; this reward schedule is an adaptation, not a claim about the original server economy. Boosts cannot stack, consumed inventory and expiry survive reload, and Standard probability is reduced to keep the total at 100%. Existing profiles retain their plates, balance, upgrades and saved progress.

Verified in desktop Chrome mobile emulation: actual two-pointer movement plus camera, cancel release, direction correction, protected sales/reload, auto sale/rare stop, inventory/crafting, legacy profile migration, no-SDK gameplay and mocked SDK lifecycle/rewards. Physical mobile hardware and actual GameWave-host import remain pending. Official SDK documentation retrieval was attempted again, but the linked Feishu page was inaccessible. No claim of complete original Roblox networking or original-source parity.


## Clearer interface revision 5
The generator now teaches two actions: Generate, then Keep or Sell. Outcome buttons state immediate credits versus income per minute. Advanced potion and automatic generation controls moved into More options; collection, upgrades, tasks and earning remain labelled. A six-icon enamel atlas made using the built-in image tool is saved in assets/ui-icons-v5.png, with the exact prompt in assets/IMAGE-PROMPT.txt. The atlas is embedded in both standalone HTML files, while all labels, values, controls and hit areas remain native HTML. It is an interpretation of the recorded hierarchy, not copied original Roblox UI assets. Portrait 320x568 and 390x844 core actions are checked fully visible without scrolling; landscape and desktop menus are exercised. Existing economy, favorite protection, potion timers, movement, save key and SDK lifecycle are preserved. Physical phone and real GameWave host remain unverified.


## Recording detail revision 6
Navigation uses the recorded colored-outline approach rather than the heavier generated enamel buttons; inventory retains its reusable potion artwork. The generator title is centered, with a compact right-hand district selector on desktop. Native English text and portrait core-action visibility remain intact.

The hairless avatar now has a curved face decal conforming to its cylinder head, an original blue shirt motif, belt, trouser seams and shoe soles/laces. Arm swing is reduced to stay inside the swept movement envelope. Garage floor, plaster and wood use seeded procedural texture detail; keyboard, mouse and monitor status details stay inside the existing desk bounds. Camera drag has a seven-pixel threshold to distinguish taps from orbit gestures.

Actual rare results highlight locked glyphs, add a short rising tone before the final column, and reveal with a tier-colored banner, two expanding rings, graded confetti and value count-up. Dark numerals remain readable on white plates. Keep/Sell trigger distinct bounded transfer animations to the collection/balance; all particles are reclaimed and reduced-motion settings suppress them. No odds, balances, progression or SDK round definitions were changed. Audio uses the existing gesture/mute lifecycle.

Verified: actual navigation and camera collision, touch movement plus camera/cancellation, auto-generation lifecycle, rare reveal/cleanup, reduced motion, profile reload, full gameplay and SDK mocks. Official SDK document retrieval was retried but inaccessible. Physical mobile devices and actual GameWave host tests remain pending.
