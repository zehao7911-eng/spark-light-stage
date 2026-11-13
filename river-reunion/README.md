# RIVER REUNION

A small, complete 3D river adventure about making room for one more friend. Six courses cross Alder Valley, Copper Canyon and Bluebird Reach. Steer a timber raft, collect waving campers, avoid rocks and bring enough friends to the final campsite. Original articulated block characters, procedural river environments and sound; no generated images or external asset requests.

## Play

Open `index.html` or `standalone.html` directly, or serve this folder. Both entries are identical, offline, self-contained builds with Three.js r147 embedded. No installation, CDN, login or SDK is required. A WebGL-capable browser is required.

- Touch: slide the lower steering pad, or drag anywhere on the river. Release to hold the current line.
- Keyboard: Left / Right or A / D. Space hops after completing two rivers. Hold S to slow after completing four rivers.
- Reach camp with the displayed friend target. Each journey awards one star for success, one for meeting everyone, and one for no bumps.
- Camp tokens buy quicker steering, extra hull capacity and wider friend pickup. Equipment applies to the next trip.
- The journal contains six course selections, 18 friend portraits, medal progress and a low-detail toggle. Free retries are always available.

Pickup, bumps, landing, coins and arrival have distinct sound/animation feedback. Arrivals align the raft to a dock and disembark over a connected gangway. A completed journey has results, rewards, next river, replay, outfitter and journal. Progress saves after actions and periodically. Hiding the page pauses play and releases all held controls. No time pressure runs while paused.

## Save scope

Only `river-reunion-v1` is read/written in localStorage. Payload `{game:'river-reunion',v:1,updated,profile,run}`. Other games' keys are never enumerated, uploaded or removed. A resumed moving/pickup trip restores as ready; steering resumes the real visit. Claimed platform cosmetics, stars, crew collection, tokens and equipment persist. Newer cloud progress may replace an untouched visit; once the visit is active, only monotone medals, collected friends and cosmetic flags merge, not spendable currencies or equipment.

## GameWave

Official SDK document rechecked **2026-11-06** (page shows October 30): https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh

`RiverHost` is wired into accepted steering/hop/slow actions, actual win/loss/abandon transitions, and this game's snapshot. Rendering and startup never await the host. Partial/late SDK objects, rejected operations, registration timeouts and unsubscribe races are guarded. Like and direct-comment listeners register independently. Only `event.status === true` grants the optional golden paddle; direct `event.content` strings including empty image-only comments grant optional weekend pennants. Counts are not event identifiers. Durable claim flags prevent repeated rewards within this game's save scope; local-only flags belong to this browser. Unsupported prompts stay hidden. No assumed API opens social UI.

Cloud loading is time bounded and only accepts this game's raw payload or a confirmed empty scope; foreign game saves remain untouched. No generic all-localStorage helper is used. A reload with progress starts the next host session on the next real committed action even when the core has already emitted its initial start in a past visit.

Validation is separated: gameplay model and SDK mocks, real standalone/public browser checks, and responsive viewport checks. **A supported GameWave App import, actual host callbacks/cloud storage and physical iOS/Android devices are not tested here.** Those remain platform acceptance checks, not claims made from mocks.

## Source and artwork

- `core.mjs`: authored courses, steering, obstacle collisions, pickup, progression, equipment and saves.
- `view.mjs`: shared/batched static geometry, articulated characters, river, raft, pickups, wake, particles and camera.
- `app.mjs`: English UI, touch/keyboard/audio, actual lifecycle and game-specific cloud integration.
- `sdk.mjs`: guarded GameWave adapter.
- `artbook.html`: scene gallery and shared visual rules, separate from gameplay.
- `tests.mjs`: `node tests.mjs`.
- `build.cjs`: `node build.cjs` rebuilds both shipped offline entries.
- Three.js is MIT licensed; see `vendor/THREE-LICENSE.txt`. Original game code/art is covered by `LICENSE.txt`.

Inspired by the user's block-character model reference and miniature/stylized 3D categories in the supplied art atlas. All characters, environments, UI and game content were authored for this project; it is not a complete-source fork of another game.
