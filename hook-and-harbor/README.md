# HOOK & HARBOR

An original, complete, phone-first 3D container-loading game. All runtime text is English. It follows the user's block-built model/material direction from their Swim Racer reference video, with a new harbour setting, crane controls, manifests and original code-authored models. No video assets, commercial game models or generated raster images are used.

## Play

Open `index.html` or `standalone.html`, or serve this directory on any static HTTP/HTTPS host. Both entries are identical, self-contained and require no network requests, account, installation, CDN or SDK to start. A WebGL-enabled browser is required. The ZIP has `index.html` at its root.

Drag a numbered dock container onto a ship bay with the same symbol. Alternatively, tap a container, then tap a matching lit bay. The hook lifts, travels, steadies, lowers and locks the actual cargo into that bay. Wrong symbols and unsupported upper bays do not take cargo. Releasing elsewhere keeps the load safe; tap a matching bay to finish. The crane path stays above all cargo, and rail legs stand outside the working envelope. There is no time-limit failure, lives, payment or wagering.

Keys 1–8 select a dock container; with a container selected, 1–8 route to the corresponding ship bay. Enter clocks in, Escape pauses. Once the sway brake is unlocked, hold the on-screen STEADY button or Space during travel to damp the suspension. The brake can be disabled in the voyage book. Touch cancellation releases the pointer and brake without discarding cargo.

Six authored voyages across daylight, amber afternoon and evening introduce four cargo types, cold-delivery bonuses, carefully lowered fragile loads and supported upper-deck bays. Voyage 2 unlocks the sway brake; voyage 3 opens the subsequent double-deck manifests. Each completed load earns points; deliveries within 13 game seconds continue a capped score multiplier. Chilled loads delivered within 9 game seconds add 50 points. All cargo aboard triggers a horn, crew send-off, sailing camera, three-star result and the next voyage. Replay and a voyage book are included. Finishing all six keeps the six voyages available for better records, not an unbounded generated campaign.

Stars: one for completion; one for at most one rough landing; one for meeting the voyage's optional pace target. Automated final lowering is forgiving. Best star and score records only improve; replay does not duplicate permanent rewards. Gameplay time begins on the first accepted pickup and stops during pause/background/departure. The pace target affects a bonus star, never access to the next voyage.

## Art and performance

Original Three.js geometry includes corrugated containers with corner castings, refrigeration units, fragile straps and top symbols; a four-legged rail crane with moving bridge/trolley, four actual cables and brass-upgrade spreader; articulated dock crew and ship captain, radio-equipped reflective uniforms and helmets; a layered cargo ship with wheelhouse, glass, tyres, railings, stack bays and optional pennants; warehouse shutters, staging lines, pallets, parked forklift, lamps, bollards, shore trees/buildings, floating dinghies, gulls, cloud clusters and animated low-amplitude water. Workers walk within the clear outer dock lanes and wave at departure.

Cargo is safe, constrained winch motion with spring-damped suspension, not a general rigid-body physics simulation. Camera framing has distinct portrait/landscape distances; the outgoing ship and loaded cargo move together through the open water corridor. Static box meshes are instanced by material. Live effects use a bounded instance pool. High detail caps DPR at 1.35 and one 1024 shadow map; low detail uses DPR1 and disables shadows. Drawing targets approximately 30Hz on small viewports and 40Hz otherwise, independently of the bounded simulation clock. This is a design target, not a physical-phone performance certification.

## Saves and GameWave

The only local save key is `hook-and-harbor-v1`. Snapshot discriminator `game:'hook-and-harbor', v:1` includes this game's profile, actual manifest, loaded bay assignments, suspended cargo route and progression. Reload preserves completed deliveries and in-progress hoisting, releases touch/brake state and opens a pause panel before further motion. Completed-game reload does not award a second result. Storage and audio failures do not block play. Foreign saves and other games' localStorage are never enumerated, uploaded or cleared.

Official GameWave reference rechecked November 5, 2026 (document still labelled October 30): https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh . Startup never awaits `window.neonlib`. The separately guarded adapter detects late/partial SDKs, independently registers interactions, handles code0 promises/errors/timeout/late unsubscribe, and cleans up on page exit. A real accepted pickup starts the host visit; the completed manifest ends it exactly once. A progressed-ready reload starts a resumed host visit on the next committed pickup or continuation, even though its core initial-start event has already occurred.

Only confirmed `onLike({status:true, project_id:string})` grants a brass spreader; only a direct `onComment({content:string, project_id:string})`, including an empty image-only content string, grants harbour pennants. Unlike grants nothing; `count` is never an event ID. Persistent one-time cosmetic flags deduplicate callbacks. The optional explanation appears in the voyage book only when supported. These cosmetics never gate normal play. Local-only flags are browser scoped; supported own-game cloud state merges durable flags and best records. No undocumented UI-opening API is assumed.

## Build and evidence limits

Bundled Three.js r147 is MIT; retain `vendor/THREE-LICENSE.txt`. All other models, game code and synthesized sounds are original to this project. `node build.cjs` regenerates both self-contained entries; `node tests.mjs` tests all six complete manifests, stacking order, invalid routes/saves, mid-motion and progressed-ready restores, record deduplication and actual game-scoped SDK mock callbacks/lifecycle/cloud/cleanup. Tests and a browser playthrough establish different evidence. A public entry and pinned ZIP are verified after publication. Actual supported GameWave App import/like/comment callbacks and physical Android/iOS devices have NOT been tested here and must not be claimed as platform-certified.
