# Velvet Vanish

An original English, portrait-first 3D visual-memory magic show. Watch a keepsake go under a cup, follow the actual shuffle and tap a cup after the hands stop. No timer, lives, wagers or purchases. A miss reveals the answer and the show continues. WATCH AGAIN repeats the same shuffle for free, with up to two stars. Three stars require finding every secret without rewatching. Best stars never decrease.

## Content and controls

Six finite authored shows, 23 tricks, three fully modeled stage interiors, six original adult magician appearances and six modeled keepsakes. A repeated show generates a new seeded permutation sequence within the same authored difficulty; it does not create an infinitely unique campaign. Number keys 1/2/3 choose a cup. Space starts the next trick, Escape pauses. Touch and mouse use the same visible cup targets. Backgrounding pauses the show. Reload preserves the exact peek/shuffle/choice/result state and own progression.

Five stars unlock Slow Hands: 28% longer swaps. Eleven unlock Velvet Trail: 14% longer swaps and short visible motion trails. Earned cup finishes are cosmetic. Equipment applies to the next show. A saved runtime keepsake portrait joins the green room after each completed show. Photos are generated from this game's actual rendering, not remote assets or AI images.

## Startup / package

Open `index.html` or `standalone.html`. Both contain the same complete bundled game, Three.js and styles, with no CDN or runtime network requirement. `index-source.html` is the editable module entry and should be served over HTTP. `build.py` rebuilds both self-contained entries. The ZIP has `index.html` at its root. No server, installation or account is necessary. WebGL is required; a visible recovery panel appears when unavailable.

Mobile layout supports portrait and landscape, safe areas and 44px+ main touch targets. Coarse pointers default to Light mode: DPR1 and 30 presentation FPS, without real-time shadows. Full mode caps DPR1.5 and targets 40 presentation FPS. These are render budgets, not measured physical handset/thermal certification. The game uses bounded confetti and synthesized voices, batched static sets and reusable geometries. Gentle mode removes vibration and reduces confetti. Sound unlocks after a real gesture.

## GameWave SDK

Official document rechecked November 6, 2026; it still displays October 30 modification: https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh

The game starts without `window.neonlib`. `sdk.mjs` independently guards each optional API. First committed watch/pick, and actual resumed automatic animation, starts the active host session; real final-show completion or explicit active-show restart ends it once. Merely viewing ready/result or pausing does not fabricate a lifecycle. A new page resuming between tricks reports its next real committed action, even if the saved show was already started.

Only this game's `velvet-vanish-v1` save namespace is read. Cloud contains `{game:'velvet-vanish',v:1,profile:{...ownProfile,checkpoint:ownRun}}`. Own checkpoint validation rejects inconsistent permutation/history/score/phase. Profile merging takes maximum best stars and unions collection/reward flags, preserves local preferences, and favors active local progress. Only recognized own data or a known empty object permits cloud writes; unknown/failed envelopes are not overwritten. No other game's localStorage is enumerated, uploaded or cleared.

Confirmed async code0 `onLike`/`onComment` registrations show optional host extras. Positive direct like gives gold cups. A successful direct comment, including image-only empty text, gives multicolor confetti. Callbacks are read directly, `project_id` remains a string, count is never an event ID. Unlike, failed/expired registration, stale callbacks and duplicate claims grant nothing. Claimed flags persist locally and through available own cloud storage; this does not promise server-authoritative exactly-once across accounts/devices. Normal play is never gated. APIs may be absent/partial/late/reject; registration/save/load timeouts and unsubscribe-after-late-registration are covered. Viewport density is metadata, not a CSS-size multiplier.

Automated SDK mocks and a separate development host simulator verify integration logic only. Actual GameWave App import/account/cloud/social validation must be distinguished from those tests; this delivery does not certify the real App or migrate older games.

## References and assets

Rezona's Joker's Gambit was actually entered, an ace selected and played, to inspect its clear tabletop staging and reveal/scoring presentation. Its poker rules were excluded in favor of this original, simpler cup-tracking act. Reference: https://rezona.ai/game/pgcserver/pv/NmZjzsSs/v13/dist/index.html . This is not a replica or an adaptation of its source. Other catalog candidates were inspected and excluded for prior similarities/complexity. No reference source, characters, logos, images, music or models are redistributed.

All game art is built in code. Adult human face/limb construction extends original shared MIT helpers from Press Pause, with new standing poses, costumes, top hats, glove handoffs, cups and stage sets. Fixed two-link limbs and a brief released-cup handoff keep arms connected while cups move through separated physical lanes; this is scripted kinematic stage animation, not general rigid-body hand manipulation. Outer swaps lift above the middle cup. Three.js r147 is MIT; see vendor notice. No ImageGen, commercial extraction or external model generation was used.

## Checks

`node tools/test.mjs` runs real controller routes, checkpoint roundtrips, cup separation and SDK mocks. `node tools/model-test.cjs` samples actual Three meshes for fixed limb lengths, attachment, soles, finite transforms and batch counts. Browser and deployed-build evidence is recorded separately outside the game package. Passing technical checks does not establish player enjoyment or a platform quality grade.
