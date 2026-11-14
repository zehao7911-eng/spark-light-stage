# Wild Toss — Snack Safari

English, portrait-first WebGL game. Hold the burger button, release to throw. Slide sideways while holding to adjust aim. Feed animals, collect coins, upgrade range, and discover nine friends. Three throws form a safari; the collection and upgrades persist. Sound starts only after an interaction. All content is local and the standalone entry has no network dependencies.

## Files
`index.html` in the release ZIP is the self-contained playable entry, identical to `standalone.html`. Open it directly or serve over HTTPS. `index-source.html`, modules, styles, assets and the Three.js MIT license are included for editing.

## Reference and assets
Inspired by the user's Roblox recommendation screenshot and the publicly described food-throwing/animal-collection concept of Feed the Animals (Roblox place 10766972131). The native reference server did not finish joining during inspection. This is an independently implemented HTML5 game, not a Roblox project export or a verified 1:1 reproduction. Animal meshes, world, animation and controls are authored here. Four UI icons were generated together with OpenAI image generation for a coherent atlas.

## Save and host integration
Only `wild-toss.profile.v1` is used in localStorage. Cloud envelope: `{game:'wild-toss',v:1,profile:{coins,power,best,found,rounds,rewards,sound}}`. Collection, maximum power, best throw and claimed cosmetic flags merge monotonically; a higher completed-safari counter is authoritative for cloud coins. This is device/profile persistence, not server-authoritative multiplayer currency.

Optional `window.neonlib`: gameStart on first committed throw of each safari/session, gameOver at the third throw's completed result. Standalone operation never awaits host discovery. Positive like unlocks golden trail; direct comment (including image-only empty content) unlocks purple reward bursts. Flags prevent repeated rewards within the supported save scope. Unlike gives no reward. Listener registration, late SDK, failures and cleanup are guarded.

Official SDK URL rechecked 2026-11-14 but inaccessible to the web reader; implemented against workspace GAMEWAVE-SDK-PROMPT.md. Browser/mobile viewport tests and mock SDK tests are not real physical-device or actual GameWave App certification. A supported GameWave host import must still be tested by the importer.

## Scope
Nine animal discoveries, power upgrades, repeated three-throw safaris, local synthesized feedback. No paid currency, accounts or online multiplayer. Needs WebGL; tested in Chrome desktop mobile emulation. Original Roblox assets/code are not included.
