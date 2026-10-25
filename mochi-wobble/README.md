# Mochi Wobble

Mobile HTML5 inertial balancing/catching game. Serve this directory over HTTP and open index.html. No build step, backend, login, CDN, fonts or remote game assets. Requires JavaScript/WebGL. Run `node tests.mjs` for the source/rules/restore checks.

## Open source foundation

BALANCE by ABA Games, Copyright2021 ABA Games, MIT, from https://github.com/abagames/crisp-game-lib-games at commit cfb39d2f988feb5918eb83697145b5a35adabf58, docs/balance/main.js. Original unmodified source included in upstream/balance.js; LICENSE-BALANCE.txt retained. source-balance.js ports the source cart acceleration/damping, wind coupling, unstable-pole angular integration, falling-coin acceleration/drag, three-versus-one score/growth rule for tip/body catches and half-height fall response. Runs in source units at fixed60Hz. Original's crisp-game-lib draw-collision calls are replaced with geometric capsule/tip distance tests; no source sprite/sound/library assets reused. New rules remove camera recentering, bound the cart, reduce random wind, brace on finger release, give three recovery chances, authored wandering fruit streams, finite orders, records/unlocks/save. This is a new completed game using BALANCE's simulation, not a wholesale engine port.

Three.js r147 bundled locally, MIT; vendor/THREE-LICENSE.txt. All bakery/cart/mochi/berry models, faces, room lettering, interface and synthesized sounds authored in code. No image generation or commercial assets.

## Controls and loop

Start a shift. Drag anywhere in the shop to move the cart relative to your finger; lift to steady the tower. Arrow buttons give a short nudge. Arrow keys move; Space releases/braces; Escape pauses. Body catches add one source growth unit; tip catches add three and more points. Gold fruit double points. Missed fruit are free; the readable fruit stream continues. Three spills end the shift. Collect10 berries in the first shift; later goals12/14/16/18, with speed capped after shift8. Unlimited replays and shifts up to999; three color rooms rotate, not999 unique authored maps.

Stars: finish, no spills, at least3 tip catches. Best stars are max per shift so replays never farm stars. Total3 unlocks a bow,9 a chef hat, applied on the next loaded cart. No purchases, timer, network or external account. Sound starts muted; touch the music button to enable.

Current cart/angle/inertia, fruit, deterministic RNG, order and scores save after actions/events and every3seconds. Reload restores paused, with grip released for fairness; press Continue. Bests/unlocked shifts and sound preference persist. Save denial leaves the current session playable. Pause/blur/hidden/cancel stop simulation and voices. Rendering40FPS, DPR1.5; static shop batched, shared geometry/materials, particles bounded140, fruit9, voices17 maximum. Temporary screenshots and test reports are outside the game folder. Phone-sized browser QA does not certify physical handset frame rates.
