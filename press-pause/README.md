# PRESS PAUSE

Circle a knot. Let the whole day go.

An original English HTML5 3D relaxation game. Use one finger to trace the glowing circle over a clothed adult guest's shoulder or forearm. Either direction works. Keep one direction during a stroke; reversing or moving outside the lane does not farm progress. You can lift your finger and continue. A full circle unwinds an abstract stress knot, lifts the modeled roller, drops the shoulders and releases particles and a soft plucked pop.

Hold ROLL or Space for an easier automatic circular stroke. It finishes one knot per hold. That visit can earn up to two stars; direct smooth tracing can earn three. Assistance never removes a previous best. There is no timer, purchase, life meter, arbitrary idle reward or medical simulation.

## Complete small-game loop

Six finite authored guest visits, 27 knots total: Ari (3), June (4), Otis (4), Noor (5), Milo (5), Bea (6). Three spa interiors, six original adult faces/hair/skin/outfits, four contact regions. Best-only 18 stars, six actual runtime guest portraits saved to the studio, free retries. Final replay returns to the existing authored visits; this is not infinitely unique procedural content.

At six stars, Wide Roller increases the real valid tracing lane. At twelve, Twin Roller has two modeled roller heads and needs 20% less circling. Headband colours unlock at 0/6/12 stars. Stars are requirements, not spent currency. Equipment applies before a visit starts. Settings: Sound, Light graphics and Gentle effects. Escape pauses and resumes; Space holds ROLL.

## Run, build and import

`index.html` and `standalone.html` are identical, self-contained playable entries with inline Three.js, all game code, styles and icon. No runtime CDN, remote model, external font, source import or build install is needed. WebGL is required. Open the hosted link or serve this folder over HTTP(S). File-manager browser policies may differ; no universal local-file or physical-device certification is claimed.

Editable modules and `index-source.html` are included. Run `python build.py` after editing source; this regenerates BOTH shipped playable entries. The game-only ZIP has index.html at its root. Retain license notices. `assets/cover.jpg` is a real runtime screenshot, and `assets/icon.svg` is original vector artwork. No image generation was used.

## Save and GameWave integration

Only localStorage key `press-pause-v1` is read or written. A versioned game/profile/controller envelope saves partial circular arc, active knot, score, visit, equipment snapshot, best stars, photo album and reward flags. Transient held input is always neutralized on reload, blur, cancel and pause. A ready phase after an earlier knot retains the fact that the visit already contains progress.

The individually guarded `window.neonlib` adapter is connected to accepted real strokes, actual visit completion and explicit restart. Core boot never awaits host injection or registration. Every committed stroke calls the deduplicating lifecycle gate, so a resumed ready phase reports the new page's first committed action once; pause and result viewing do not create rounds. A very late or partial SDK can be discovered on subsequent input. Failed/rejected methods and timed-out loads/saves/listeners do not block gameplay.

Cloud writes contain only this game's recognized versioned profile and validated checkpoint. Unknown, failed, wrapped or timed-out reads are not overwritten. Max/union merging preserves best progression and one-time cosmetic flags; local active progress takes priority over late cloud data. A remote checkpoint may be adopted on a genuinely fresh title page. No other game's localStorage is enumerated, uploaded or cleared.

Confirmed positive onLike gives a gold roller finish. A successful direct onComment gives multicolor unwind particles, including image-only comments with empty content. Both are optional cosmetics with durable claimed flags. An unlike never grants a reward. Read callback fields directly; count is a snapshot, not a dedup key, and project_id stays a string. Prompts only appear for successful code-0 registrations. Registration does not replay old interactions. Listeners unsubscribe on disposal, including late-resolving registrations. There is no undocumented attempt to open the host's social UI. Local-only flags are browser/device scoped, not server-authoritative identity.

Official SDK document rechecked November 5, 2026, displayed October 30 modification:
https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh

## Reference / authorship

Rezona Squish Lab: https://rezona.ai/game/pgcserver/pv/itQGgkze/v7/dist/index.html

After an initially delayed load, Start Squishing and Press were used with a real one-second hold. Body/face deformation, recovery and visible progress were observed. This is a touch-feedback study, not a slime-toy clone or a claim of new reference unlocks/full completion. Its earlier use for Squish Desk is acknowledged; this new game uses different human-kneading rules and art, not a reskin of that slime toy. Petting Clay Doll was excluded for loading failure. Thousand Strokes instructions were inspected and excluded because of complex drawing/platform controls.

All adult character meshes, fixed-length articulated joints, facial details, roller geometry, staged chair/forearm contacts, interiors, icons, UI and synthesized audio are original. Three.js r147 has its MIT notice in vendor/. Original geometry and guarded SDK helpers are reused under the included MIT license. No Rezona source, assets, model, character, music, texture or image is redistributed. No commercial visual parity or platform grade is promised.

## Verification

`node tools/test.mjs`: 855 controller/SDK checks and 36 complete authored routes. `node tools/model-test.cjs`: 16,719 actual-mesh checks over 576 human poses, limb endpoints, palm/armrest contact, sole/floor clearance, real body marker bounds, roller geometry and scene batching.

All six visits were completed in a browser: first through actual drawn circular segments for three stars, later visits through ordinary hold-to-roll for two each, reaching 13 best stars. Wide and Twin Roller, headband colour, all six portraits, partial-circle exact reload, final receipt reload, pause/Escape and settings were exercised. Mobile viewport layouts 320x568, 390x844, 568x320 and 844x390 plus desktop were reviewed; viewport results are not physical-handset sustained frame-rate/thermal/battery measurements.

The unchanged built game was exercised inside an own local SDK simulator: standalone real stroke before injection; partial then same-object complete API; owned checkpoint writes; unlike vs positive like; empty direct comment; duplicate rewards; asynchronous cleanup; between-knot ready reload; one resumed start and one actual end; receipt reload without duplicate lifecycle. This is mock/browser integration evidence, not actual GameWave App import, social/cloud account testing or host certification. Legacy games are not migrated or certified by this delivery.
