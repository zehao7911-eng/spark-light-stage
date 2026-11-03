# AMPED UP

An original one-button 3D energy-absorption duel. Hold a shield to absorb incoming energy; release to discharge the stored battery. Six short, authored street-stage shows introduce single shots, double volleys, heavy orbs and quick mixes.

## Play

- Hold the large SHIELD button. Catch pink energy in the cyan shield.
- Lift to send the stored energy back. A yellow button signals a clear window. Full charge adds a damage bonus.
- Watch the pink heat bar. A discharge vents heat; holding too long overloads and costs health.
- Six catches repair one health cell. Unshielded hits have a short protection window, so one volley cannot take every cell at once.
- Optional TAP CONTROLS use one tap for shield on and a second tap for blast. Space can also be held and released. Escape pauses.
- A shield press during discharge recovery is buffered and activates when recovery ends. Pointer cancellation, hidden tabs and loss of focus stop pending input without firing; pause resumes deliberately.

Each show awards a best-only star for finishing, another for retaining at least four health, and another for no overloads. Six stars unlock an extra battery cell and Violet jacket. Twelve unlock cooler coils, shorter recovery and Rose jacket. Completed shows can be replayed freely. Encore repeats the same authored shows with a bounded projectile-speed increase; it is not an infinite catalogue of levels.

## Run locally / import

Serve this directory over HTTP, for example `python -m http.server 8000`. Open the server URL. ES modules need HTTP rather than a double-clicked file URL. The ZIP has `index.html` at its root. All runtime dependencies are bundled: no CDN, external art, loading service or account is required. GitHub Pages can host the folder as-is. No service worker or cross-origin isolation is required.

Local progress uses `amped-up-v1`. Profiles and interrupted duels are validated. Pending button holds are cancelled on restore; the battery, health, volleys, projectiles and timing are retained. Best stars use max merge, cosmetic flags use union. Settings remain local.

## Art and motion

Original procedural human models with bomber jackets, ribbed cuffs, pockets, zips, headphones, cap/braids/moustache variants, layered hair, bounded pupil scale and shoe detail. Shoulder-elbow-wrist and hip-knee-ankle chains stay attached. Two-link arm targets place both palms in front of the torso; the shield and beam origin follow the actual palms. Ground contact is calibrated against the lowest actual shoe bound after posing. Guard lean, charge tremor, two-handed push, recoil, knockback, seated defeat and victory motions are independent of logical collision.

Three coordinated street-stage looks: Amp Yard, Bass Terminal and the Rooftop. Window frames, trusses, speakers, benches, cans, lamp posts and skyline support the scene. Synthesized catch pitches, discharge and impact tones accompany bounded particles. Gentle mode removes charge tremor and reduces bursts. New coarse-pointer devices default to Light mode. Light mode uses DPR 1, 30 presentation FPS and no real-time shadows. Full mode caps DPR at 1.5 and presentation at 40 FPS; logic uses fixed 60 Hz steps. This is a stylized duel, not a ragdoll or general-purpose 3D combat engine.

## Reference and provenance

Rezona Hyper KI Warriors: https://rezona.ai/game/pgcserver/play/zYflQWhI. The actual title/loading prompts, single-player mode and eight-character selection were inspected; Kaze was selected against CPU Brutus. Assets loaded very slowly; a completed reference fight was not verified. The one-button absorption/discharge rules, source, models, stages, icon and audio here are original. No reference assets, source code, character IP or audio were downloaded or copied. This is not an exact replica or a claim of equivalent production value. No image generation was used. Geometry batching helpers derive from the author's prior MIT prototypes; local Three.js r147 is MIT.

## Optional GameWave integration

`window.neonlib` is feature-detected. Core startup never waits for it. Real successful `onLike` callbacks with `status === true` unlock gold trim; real `onComment` callbacks unlock party-colour victory confetti (including valid image-only comments). These are idempotent cosmetics. Standalone play earns every functional upgrade. Unsupported social rows stay hidden. Lifecycle calls are deduplicated; timed-out/unknown cloud reads block writes rather than overwrite unknown data. Whole cloud envelopes retain unknown top-level fields. No invented SDK script, readiness event or social-opening method is used. See GAMEWAVE-IMPORT.txt. Tests use mocks; a real App import, live social callback and real platform cloud roundtrip still require host testing.

## Checks

`node tools/test.mjs` tests 72 complete controller duels across six shows, three kits and four Encore tiers; terminal freeze, idempotent stars, actual damage/capture, overload, repair, short invulnerability, corrupt saves, deterministic resume and optional SDK cases. `node tools/model-test.cjs` checks articulated joint lengths, hand placement, silhouette/pupil bounds and contact of the lowest shoe with the stage across character variants and poses. Native browser gameplay uses ordinary UI controls, separate from pure controller tests. Phone viewport QA does not establish physical-phone frame rate, memory or heat performance.

