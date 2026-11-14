# Plate District

An independent HTML5 number-plate collecting game, reconstructed from the user's 323-second recording. Original code and procedural models; not an export of Roblox source, assets or multiplayer services.

## Play

Open index.html directly or host this folder on any static web server. The root index and standalone.html both embed all required JavaScript, textures and CSS. No build service, CDN, login or SDK is needed to play.

Generate a plate, then keep it for showroom income or sell it for credits. Every tenth generated plate is Rare or better. Upgrade the workshop, unlock four districts and complete six milestones. Work shifts provide 600 credits so progression cannot be blocked by an empty balance. Credits have no monetary value.

Tap buttons on mobile. Minimize the panel to explore: tap the ground to walk, drag to rotate the camera. Portrait and landscape layouts are supported. Sound is gesture-gated and can be muted. Figures intentionally have no hair. Plate reveal audio, stamp animation, coins and rare confetti provide feedback.

## Content

Four regions, five rarity classes, patterned mirror/sequence/triple/perfect-series plates, six upgrade tracks, 12–36 garage slots, car/wall display, six claims, guaranteed ten-roll milestone and optional cosmetic host rewards. Showroom income is capped at one hour offline. This is a single-player reconstruction, not a server market or real player leaderboard. Unlike the reference, it does not implement auctions, trading, timed leases, consumable crafting or multiplayer.

## Persistence and GameWave

Only localStorage key `plate-district.profile.v1` is read or written. Pending results are saved before animation, so reload does not generate a second reward. Cloud envelope uses game `plate-district`, v1 and that game's profile only. Newer profile snapshots win; confirmed reward flags are unioned. During an active roll or shift, a late cloud result cannot replace gameplay state. A round starts at paid generation and ends on Keep/Sell; a work shift starts/ends independently. Restored pending results resume their host round when accepted. An incomplete work shift grants no credits after reload.

Optional supported onLike grants a gold frame; supported direct onComment grants aurora rim lighting. Neither gates play. Positive like and direct-comment callback semantics, one-time flags, async unsubscribe, late SDK, rejection and missing methods are guarded. The official Feishu document was rechecked on 2026-11-14 but inaccessible; the workspace's documented contract was followed.

Browser touch emulation and SDK mocks are test evidence, not physical-phone or real-GameWave-host certification. Those two environments remain unverified. Test reports accompany this archive.

## Source

core.mjs: economy, generation and profile validation. scene.mjs: procedural Three.js environment, hairless avatars, car and camera. main.mjs: controls, animation, profile events and SDK integration. sdk.mjs: optional host adapter. style.css: responsive UI. index-source.html: module entry. index.html / standalone.html: self-contained builds. Three.js license is under vendor.
