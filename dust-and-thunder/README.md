# DUST & THUNDER — Tap. Aim. Boom.

An original English HTML5 tank arcade through six Mediterranean streets. Tap **AUTO FIRE** once to keep shooting, or hold the street / Space for manual fire. Sweep across the street to select targets. The tank drives between blocks, assists aiming and repairs itself. There is no navigation puzzle, ammunition shortage, lost run or forced defeat/restart screen.

## The loop

Shoot mechanical targets → detonate barrels for chains → collect scrap automatically → fit permanent upgrades → roll into the next block. Every district contains five formations, ending with a heavy armoured vehicle. Ten destroyed targets charge an automatic five-strike Thunder Barrage. Drones, stationary turrets, tracked crawlers, barrels and heavy armour have distinct silhouettes and health. There are 25–28 targets per district. Six finite authored districts are included; unlocked districts can be replayed freely. This is not an unlimited generated campaign.

POWER increases actual shell damage; RELOAD shortens the firing interval; SPLASH adds area damage; TWIN creates a second real projectile and unlocks after the first district. Purchases are permanent and can be fitted from the four visible cards. Scrap earned on a partial run remains banked. Replays intentionally earn more scrap, while stars and high scores retain only personal bests. Each district awards a completion star, a star for no more than one repair, and a star for a six-target chain. Optional stars do not gate the next district.

Armour depletion triggers a short automatic repair, clears incoming shells and grants brief protection. The current enemies, wallet and upgrades remain. Releasing manual input or stopping AUTO FIRE is safe; you can take your time. The first barrel can destroy the two neighbouring turrets with one shell. No barrel trick is mandatory: alternate target-order tests also complete the campaign.

## Controls and mobile

- Tap AUTO FIRE to start / stop sustained assisted fire. Hold the street to shoot manually; drag to retarget. Tapping a mechanical target also queues a shot, even when the tap ends between animation frames.
- Keyboard: hold Space to fire, arrows select a target, Escape pauses. Sound is activated after interaction and can be muted.
- Pause, loss of focus and backgrounding stop simulation, effects and sound. They release held inputs and AUTO FIRE; tap it again after Continue. The paused WebGL scene is not continuously redrawn.
- The local save `dust-and-thunder.v1` retains upgrades, wallet, best stars/scores and an active encounter, including pending shells and repairs. Restored games open stopped behind Continue. Storage denial leaves an in-memory session playable.

Both portrait and landscape layouts use safe areas and controls of at least 44 CSS pixels. Camera framing keeps the whole player tank visible. Touch cancellation releases input safely. WebGL is required; unavailable/lost graphics display a recovery screen. Browser viewport checks are not certification on a physical handset.

## Run, package and sources

Open `index.html` or `DUST-AND-THUNDER-OFFLINE.html` directly, or serve this directory with any static HTTP server. Both built HTML files contain the complete renderer, CSS and application code. No font, image, audio CDN, backend, login or network service is required. The ZIP has `index.html` at its root for HTML5 import, plus editable sources, tests, notices and a reproducible `build.py`.

`model.js` contains deterministic combat, chains, repair, upgrades and validated save continuation. `art.js` renders original procedural geometry, material families, cobbles, awnings, shutters, balconies, street furniture, distinct landmarks, foliage, lights, articulated tanks, dust and debris. `game.js` implements touch/keyboard input, UI, synthesized audio and lifecycle. Static structures are instanced; DPR is capped at 1.5, rendering at approximately 40 fps maximum, and short effects at 140 objects. There are no real-time shadow maps. The independent model tests check the full default-upgrade campaign, repairs, alternate target orders, exact mid-flight save continuation, wallet conservation, upgrade effects and malformed saves.

## Art and reference

The live **Steel Boulevard** reference was entered on Rezona: https://rezona.ai/game/pgcserver/pv/PwVerjLk/v2/dist/index.html . Its Mediterranean street, tracked armour and cannon controls informed the subject and presentation. F/main-gun and W/drive inputs were attempted; a score of 160 and a destroyed-tank report were observed. No completed reference wave or campaign is claimed. This new game replaces free driving and separate gun controls with an assisted, forgiving on-rails loop. All application code, geometry, textures, interface, formations and synthesized audio are independently authored. No reference assets, scripts, logos or music are redistributed.

Skills applied: game-art, game-design, 3d-games, game-audio, web-games and mobile-games. These informed consistent silhouette/material families, early rewards, touch forgiveness, simple collision-free staging, bounded effects, gesture audio and lifecycle handling. They do not themselves guarantee a platform grade or absence of defects.

Three.js r147 is bundled under MIT; retain `vendor/THREE-LICENSE.txt`. The original application and procedural artwork are covered by the root MIT notice.
