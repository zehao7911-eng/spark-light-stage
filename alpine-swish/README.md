# Alpine Swish

A touch-first, English HTML5 skiing adventure using the actual SkiFree.js engine. Drag horizontally to steer, or use the arrow buttons / keyboard. JUMP / Space gives a short hop and trick pose. Follow the flags, find a smooth line, and reach the cocoa lodge. Three consecutive flags give a temporary automatic speed boost. Low rocks can be cleared in the air; tall trees still collide. Cocoa restores one heart. Later slopes add ramps, wider switchbacks, wind and a friendly pursuing yeti.

Eight short courses unlock seeded fresh expeditions. Stars reward finishing, catching at least75% of flags and avoiding tumbles. Best-only stars unlock four trail ribbon colors; replays cannot farm stars. A fresh run waits for the first steering or jump input. Title, trailbook, pause, win/loss, replay, next course, cosmetics, mute and saved-run continuation are included. Original new synthesized audio is muted by default.

## Play locally
Serve this folder over HTTP (`python -m http.server 4282`) and open its address. No install/build/CDN/account is required. index.html loads the ready-to-play app-1026a.js. `python build.py` reproducibly rebuilds that file from the readable sources without external packages. `node tests.mjs` exercises the real engine, courses, collision and state restoration.

## Complete-source starting point
Official repository: https://github.com/basicallydan/skifree.js
Revision: a812f944f7420ab53374b6b983ef3eb54f8a26ce
MIT, Copyright2013 Daniel Hough. Full relevant JS source snapshot and README/license are in upstream/. LICENSE-SKIFREE.txt and source-manifest.json preserve the copyright and exact source hashes.

The actual Game, Camera, Skier, Sprite, SpriteArray and Monster classes execute in this game; it is not just a reference citation or an extracted movement formula. Source movement/steering/easing, world-position transforms, ground/air hitboxes, object callbacks and the game cycle are retained. The SnowSkier subclass replaces real-time crash/jump/boost timers with simulation time so pause and saves are reliable. Constants are tuned for phones; the sparse deleted-object array is compacted. An explicit startMovingIfPossible call fixes a post-jump stop when running the source without its original input handler. The original boot, analytics, UI, sprite drawing and unlicensed/ripped PC-game artwork are excluded from runtime. The source project's README calls its original implementation a work in progress; this adaptation supplies a new finite campaign and complete menu/reward loop rather than claiming the original was a commercial finished release.

New authored courses, flags, rewards, input, saves, renderer and synthesized audio are original additions. New code is MIT, Copyright2026 Alpine Swish contributors. No original SkiFree character sprites or commercial Steam assets are included.

## Artwork
Built-in image generation produced one original16-cell transparent skier/prop atlas and one distant alpine vista. Runtime paths and full prompt descriptions are in ART-PROMPTS.md. New code-rendered snowfield, scrolling objects, shadows, ski tracks, turning powder, air arc/spin, landing compression, particles and celebration labels are real gameplay layers. Day/sunset/aurora are lighting variants of the shared snow environment, not three separately illustrated worlds. The game is Canvas2D with illustrated depth, not a 3D engine.

## Verification
See VALIDATION.md. Tests retain the actual original engine and live yeti when configured; full seeded course runs do not inject wins or actor positions. Phone-sized browser tests are distinct from physical handset certification.
