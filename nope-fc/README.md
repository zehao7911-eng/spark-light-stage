# NOPE! FC — The Last Line

An original illustrated HTML5 goalkeeping game. Drag anywhere on the pitch to move both gloves. Keep the pale landing ring between them when the ball arrives: a centred contact catches it, an edge contact parries it, and a moving edge can punch it away. Save the stated quota to win the cup. No payment, gambling, advertising or account.

Six finite cups, 39 shots per full campaign, three individually constructed venues: rooftop rec league, working harbor at sunset, and a floodlit stadium. Straight shots teach the input; bends, ground rollers, quicker returns and knuckle shots change the read. Win / near-clean / completely-clean-with-half-centred-catches earns up to 18 stamps. Six stamps unlock wider Trainer gloves; twelve unlock slower Focus flight. The optional Encore reuses the final cup with mirrored targets and bounded speed variation, not endlessly authored levels. Free retries and a replay book are included.

## Controls

Touch / mouse: drag to move gloves; release keeps their position. Start waits for a button press or pitch touch. Arrows / WASD move; Escape pauses. Sound and gentle effects are optional. Pause/background/blur releases input and silences voices; an interrupted local run reloads paused at the saved shot/time. The whole book and last receipt persist. Storage errors leave a playable in-memory session.

## Artwork / provenance

Original code-painted Canvas2D illustration, paired stitched goalkeeper gloves, articulated kicking / head-in-hands striker, rotating pentagonal ball panels, responsive contact grip, parry flight, net ripple and bounded confetti. Architecture, glass, masonry, cranes, water reflections, benches, cloth, turf, crowd tiers, floodlights and bunting are painted separately into cached layered venues. Cream / oxblood / ink sports-poster interface, original SVG icon and actual runtime cover. No generated images, copied reference assets, commercial characters, external fonts, 3D assets, or libraries.

Rezona's public catalog was inspected on 2026-11-03. **Big Belly FC**, https://rezona.ai/game/pgcserver/play/CnPPzgHb (observed v34), was actually started; native D movement, J kick input and the subsequent ball / body positions were viewed. Its goal and final result were not completed. This game's focused first-person goalkeeping is an independent replacement for the reference's side-view football duel, not a source clone or visual parity claim. La Pulga stayed at 0% loading and was rejected; Cat's Shield revealed a multi-control platformer and was rejected. Earlier football props, batting/air hockey/badminton and the recent lance aim are acknowledged neighbouring mechanics; no previous dedicated goalkeeper campaign was found in the local inventory. No popularity or platform grade is promised.

## GameWave SDK

The host may inject `window.neonlib`. Boot, rendering and input never wait for it. `sdk.mjs` feature-detects lifecycle, social listeners, direct cloud loading, full-state saving and viewport APIs. Real positive like callbacks unlock gold gloves; successful direct comments (including empty content for image comments) unlock stadium confetti. Optional rewards are once-only saved flags, never granted by UI clicks / registration success, and the full game works without them. Registration codes and deferred cleanup are handled; SDK absence, partial methods and late injection are nonfatal. No SDK script URL, social-action API, state query or automatic posting is assumed. Counts are not event identifiers. Core saves are local; supported direct host saves are merged monotonically for best records / feature flags, while stale loads cannot overwrite the active run. Actual host identity / save semantics require integration testing; no cross-device atomicity is promised.

Official source checked: https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh (shown Oct30 modification). `tests.mjs` includes adapter simulations; they are **not proof of a successful GameWave App import or real host event delivery**. Import the whole folder with root `index.html`, and verify real App callbacks separately.

## Run / source

Open `index.html` or `standalone.html` directly, or serve this directory on any static HTTPS host. Both HTML files inline all runtime CSS/JavaScript; the favicon is local and optional. There are no runtime network/CDN/Module/WASM dependencies. Editable sources: `engine.mjs`, `art.mjs`, `sdk.mjs`, `app.mjs`, `style.css`, `index-source.html`. Build: Python `build.py`; meaningful model and SDK simulation checks: Node `tests.mjs`. Canvas uses actual container bounds and capped density, cached static artwork and bounded effects. Viewport checks are browser emulation, not physical phone certification or a guarantee of frame rate.

Skills informing decisions: game-design (first action + quota + free retry / new shot patterns), game-art (one poster palette, jointed animation, same silhouette language), game-audio (gesture-gated layered kick/contact/reward sounds), web-games (offline boot, no CDN, cached scenery), mobile-games (44px controls, portrait/landscape, pointer cancellation and interruption). This is Canvas illustrated 2.5D perspective, not Unity, Godot or a full 3D physics simulation. Audio is synthesized, with no recorded voices/music.
