# AQUA FINALS — 200m Swim Championship

A complete English HTML5 3D swimming competition built to follow the supplied **Swim Racer** recording's visible presentation: block-built athletes, a full aquatics arena, a red-carpet entrance, judges, packed stands, starting blocks, countdown, dive, water-level chase camera, underwater camera, stamina/oxygen, rankings, qualification, final and medal ceremony.

This is an independently written implementation of the observed game experience. It is not the reference project's original source or an assurance of identical hidden physics, AI, sounds or animation. No original video frames, recorded audio, proprietary game assets or Minecraft assets are included.

## Run and play

Open `index.html` or `standalone.html` directly, or host this folder on GitHub Pages/any static web server. Both shipped entries embed the Three.js library, rendering, controls, icons, sounds and game code. No CDN, account, API key, downloaded model or GameWave SDK is needed for startup. A WebGL-capable browser is required; failure/context-loss states provide a reload option. The ZIP has its playable `index.html` at the archive root.

1. Enter the arena and watch the four-shot entrance sequence, or skip it.
2. Tap Dive to start the countdown and jump from your block.
3. Swimming is automatic. Hold **Boost** to sprint; release it to recover stamina. Exhaustion gives a temporary recovery period.
4. Tap **Underwater** to submerge and gain speed. Oxygen drains, surface swimming restores it, and empty oxygen automatically returns you to the surface.
5. The stick steers inside your own lane. Crossing ropes is constrained. The camera button switches the surface view. The underwater control changes actual swimming state and camera, rather than displaying a prerecorded scene.
6. Swim four lengths of a 50m pool. The six-person qualifier eliminates the bottom two. Its four survivors enter the 200m final. Finish in the top three to earn a medal and unlock the next venue. Retries are free.

Keyboard: Enter enters/skips an intro/starts a ready race; hold Space to boost; D toggles diving, C changes camera, Left/Right steer within the lane, Escape pauses. Touch controls release on cancellation, lost capture and backgrounding. Pause/reload never leave Boost held.

Three finite cups share the championship rules and change the arena lighting/daytime and AI pace: Aqua Championship, Sunset Open, Midnight Invitational. A saved podium in the previous cup unlocks the next. Best medal and final personal-best time are retained. Lagoon swimsuit paint opens after one medal point; Gold after four. Replays do not multiply the same stored medal. These are three authored championships, not infinite unique pools.

## Artwork, animation and performance

All venue geometry, people, clothing, hair, goggles, medals, judges, microphones, starting blocks, signs, lane floats, flags, towels, platforms and water shaders are original procedural geometry/drawing. The arena includes 960 block spectators drawn in three instanced meshes and 1,260 lane-float instances. The character has articulated shoulders, elbows, legs and head, with entry walking, ready poses, jumping dive, alternate freestyle strokes, underwater streamlining, lane turns, finish pose and medal celebration. The cinematic's judges are omitted from the ceremony's foreground so the podium view stays unobstructed.

The water is a lightweight transparent wave shader over an animated tiled/caustic pool floor. Spray and bubbles are bounded particles. It approximates the reference's bright aquatics presentation without expensive realtime reflections or a fluid simulation. The two race cameras smoothly follow the athlete, switch sides on turns and constrain underwater camera positions within the pool. Secondary surfaces/costume colors use the same renderer color pipeline. Three.js r147 is included under MIT in `vendor/THREE-LICENSE.txt`; its original library header remains in the embedded build.

High quality caps renderer density at 1.35 and uses one 1024px shadow map. Low quality uses density 1 and disables shadows. Portrait rendering targets about 30fps, desktop high about 40fps. Static surroundings and spectators are reused/batched; no per-frame model imports or remote requests occur. The bounded game clock is independent of RAF so embedded compositor throttling cannot stall race progression. Hidden pages and pause menus stop gameplay and new audio.

## Saving and GameWave

The only localStorage key read or written is **aqua-finals-v1**. It stores this game's profile and exact active cup, round, swimmers/distances/times, resources, camera and qualification/points state. A progressed race reloads paused and resumes the saved race. No other game's saves are enumerated, uploaded or cleared.

`sdk.mjs` is a game-scoped adapter to injected `window.neonlib`. Independent startup/rendering never waits for SDK detection or cloud operations. `gameStart` is connected to a committed Dive/countdown and a resumed active race's committed Resume action; `gameOver` is connected to actual completed races or an explicitly abandoned active race. The qualifier and final are separate real rounds. Intro viewing, menus, pause, result views and repeated callbacks do not fabricate new rounds.

The independently registered `onLike` and `onComment` listeners check methods and async code 0, support late methods, contain rejections, bound retry/timeouts, ignore stale callbacks and unsubscribe when disposed, including a registration that resolves after exit. A confirmed `status === true` like grants golden goggle rims; an unlike grants nothing. A confirmed direct comment with string content, including an empty string for an image-only comment, grants visible ceremony confetti. Both rewards have durable one-time flags, stay optional, and are described in the lobby only when the host supports the listeners. Project IDs remain strings; counts are never treated as event IDs. Registration itself grants nothing, and the adapter cannot open undocumented host social UI.

Cloud replies accept this game's direct `{game:'aqua-finals',v:1,...}` object or an empty object. Profile medals, bests and reward flags merge without losing local progression; settings/current local race stay authoritative so an async cloud reply never resets an active swim. Only this game's snapshot is saved. A nonempty different-game cloud object is not overwritten. Hanging/failed cloud requests cannot stop play. Rewards are guarded within the available save scope, not advertised as server-verified globally exactly-once across devices/storage deletion. CSS viewport and safe-area layout are independent from device density.

The official [GameWave document](https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh) was rechecked on November 5, 2026 in this work session; it still displayed October 30. Its runtime-injection, direct save, current-page callback, status and unsubscribe semantics were applied.

## Build and evidence

Run `node build.cjs` to regenerate both standalone entries. Run `node tests.mjs` for 49 deterministic assertions covering all three cups' qualifier/final outcomes, a no-input loss, real 6-to-4 transitions, resource depletion/surfacing, bounded lane/course positions, active-race serialization, progression deduplication, cosmetic deduplication, cloud merging, absent/partial/late SDK, real callback field semantics, unlike/image-only comments, failed async registration, cleanup race, own save payload, foreign-game save preservation and resumed-round start/end guards.

Evidence is separated:

- Source and deterministic gameplay checks: passed.
- GameWave mock adapter checks: passed. These are simulated SDK calls, not actual App events.
- Local browser native input: completed the six-person qualifier in 38.44s/2nd; advanced with four swimmers; completed the final in 34.47s/1st; gold/PB survived reload; podium and physical medals were visually inspected. Surface/underwater cameras, stamina/oxygen use and turning were actually operated in 390×844 portrait layout.
- Published entry/ZIP: checked at release; external release evidence records the pinned commit and hashes.
- Physical phones and actual supported GameWave App import/like/comment callbacks: not tested here. Those remain required before claiming platform certification.

The matching root-index ZIP and compiled index/standalone entries must be regenerated whenever SDK or gameplay source changes. Existing unrelated games and their historical migration statuses are not modified by this release.
