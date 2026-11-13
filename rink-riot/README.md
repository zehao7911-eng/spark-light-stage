# RINK RIOT

Background music: “Electrodoodle” by Kevin MacLeod. The sound button controls music and effects. See MUSIC-CREDITS.md for the recording and license.

A complete, original touch-friendly 3D hockey game. English throughout. Chunky articulated players, painted block arenas and soft winter lighting continue the requested block-model art direction, with a new hockey theme and actual skating, possession, tackling, charged shots, goalkeepers and board rebounds.

## Play

Open `index.html` or `standalone.html` in a WebGL browser, or serve the folder with any static server. Both playable entries inline all required JavaScript, styles and Three.js; gameplay makes no external requests and does not wait for GameWave. The ZIP has `index.html` at its root.

- Drag the left pad to skate. Arrows or WASD also work.
- With the puck, hold the right button / Space to charge; release to shoot toward the open side of the goal.
- Without the puck, get close and tap the same button to dash and check. Your teammate automatically passes back.
- First to the displayed goal target wins. The higher score wins when time expires; a tie is a rematch loss. No paid retries.
- Ready phases wait for a real movement or action. The clock pauses between goals, in menus, when hidden and after restoring a save.

Six season matches, three completely built arenas, medals, equipment bought with match tokens, Frost Shot after the first two season clears (full charge inside the attacking half), Puck Magnet after four, and repeatable Overtime after the final. Equipment affects actual simulation values and applies to new matches. Medals and unlocked stages persist; a match's token settlement is idempotent. No real money or gambling.

## Art and implementation

All game-specific geometry, canvas markings, UI, animation, synthesized audio and logic were authored for this game. No image generation, extracted commercial artwork, downloaded characters or 3D asset dependencies. Characters use the same block scale for helmets, facial features, padded jerseys, gloves, skates, steel blades and L-shaped sticks. Crowd parts and static arena boxes are instanced. Maple Pond, Harbour Ice and Aurora Arena share the same visual rules while changing architecture, atmosphere and colour. Each stage includes its rink, goal frames/nets, markings, transparent boards, score display, stands, spectators, props and surrounding world.

Three.js r147 is bundled under MIT; see `vendor/THREE-LICENSE.txt`. `build.cjs` produces both identical offline entries from the source modules. `artbook.html` is a development-only scene gallery requiring HTTP; it is not the game entry.

## GameWave

Official SDK document rechecked November 10, 2026; the public page still displays October 30 as its modification date. `sdk.mjs` is individually scoped to this game and is wired into real controller actions, actual end states, the own-game profile and run snapshot. It handles absent, partial and late `window.neonlib`, asynchronous registration, errors and cleanup independently of startup.

- `gameStart()` on accepted movement/shot/check, once per actual host session, including ready phases restored with existing match progress.
- `gameOver()` on a genuine final score, timeout or explicit abandoned match; not on pause or result viewing.
- Saves contain only `game: 'rink-riot'`, schema version 1, timestamp, this game's profile and run. Local key: `rink-riot-v1`. No enumeration, deletion or upload of other games' localStorage.
- Own newer cloud snapshot may restore before interaction; during an already edited visit, only monotone medals/cosmetics merge. Spendable tokens and gear are not independently max-merged. Foreign cloud data is not overwritten. Local storage remains the fallback.
- Confirmed positive `onLike(event.status === true)` grants a gold captain helmet. Confirmed direct `onComment` with string `content`, including an empty image-only comment, grants coloured celebration confetti. `project_id` stays a string, counts do not determine events, both listeners require successful `code === 0`, and the real returned unsubscribe is used.
- Optional reward explanation is shown only for supported registrations, on the season menu. No interaction is required to play. Persistent flags deduplicate callbacks within this game's supported save scope. Local-only claims are browser/device scoped, not server-verified global claims.

## Verification scope

`node tests.mjs` checks actual game simulation and GameWave mocks: six achievable complete matches, goals/results, medal/token settlement, equipment spending, unlocks, goalie freeze, rebound, steal/cooldown, real timeout, mid-match save/reload, resumed host start/end, absent/partial/late SDK, rejected calls, async registration cleanup, direct callback semantics, one-time cosmetics and own/foreign save isolation. A mock is not a supported GameWave App test.

Browser checks cover native input in two complete matches, actual token purchase, progressed-ready reload, touch-size controls and a 390×844 viewport. Public hosted entries and the pinned archive are checked during release. Physical iOS/Android devices and actual GameWave App import/callbacks have not been tested. Performance depends on hardware; the in-game low-detail switch caps pixel density and removes shadow rendering.
