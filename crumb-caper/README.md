# Crumb Caper

A tiny pigeon. A very big Sunday. An original 3D arcade flight game, inspired by the
publicly playable **Pigeon Panic** on Rezona. No Rezona source, art, audio or logos are
included. All city, character, object, UI and sound designs in this package are new.

Reference observed and played:
https://rezona.ai/game/pgcserver/pv/phHnWJxSRj/v4/dist/index.html

## Play
Open `index.html` or `standalone.html` directly, or serve the directory through any
static HTTPS host. Both pages embed the engine, scripts and CSS: no CDN, font, account,
network API, analytics or external media is needed after the page is loaded.

- The pigeon flies forward automatically.
- Drag the direction pad, or drag on the scene, to steer/climb. Desktop: WASD/arrows.
- Hold **SPLAT!** to keep dropping. Desktop: hold Space.
- A gold ring shows a reachable target and a predicted assisted impact point. Targets
  remain physical moving objects; projectile collision is swept against their top planes.
- Four hits charge **Feather Frenzy**. Tap the star button/E to target up to four nearby
  objects. Targets must be ahead and within five meters sideways; an empty special
  does not consume the charge.
- Chain hits within 4.5 seconds to build up to a 5× score multiplier.
- Clear both the score goal and that outing's target count within 60 simulated seconds.
  Later outings ask for carts, umbrellas, hats, or different target kinds. Fifth and sixth
  outings also award a double-value golden bonus every fifth hit.
- Clear goal+task for one star, chain five for another, and land eight bullseyes for the third.
- Stars unlock the next outing and three hats at 3/8/14 total stars. Best scores and
  completed stars are stored locally. Replaying does not farm duplicate stars.

## Content and scope
Six outings on one continuously recycling miniature boulevard, with different light,
goals, wind, speed and target mixes. This is not six separate geographic worlds.
Traffic, pedestrians, bakery carts, opening umbrellas, articulated pigeon wings,
comic white splats, confetti, target reactions, audio chimes and horn effects are procedural.
No injury, gore, real money, purchases or gambling. Sound starts after a user gesture,
can be muted and stops on pause/background.

The arcade aim assist is deliberate: phone play should not require pixel-perfect precision.
This is a bounded flight/trajectory simulation, not a full aerodynamic or rigid-body engine.
The pigeon cannot leave the safe flight corridor. Car following and free respawn gaps keep
same-lane vehicles separated. The contact heights were checked against actual mesh tops.

## Art direction
Warm paper/cream ground; sage and dusty blue architecture; faded terracotta accents;
deep teal typography and controls; a blue-grey pigeon with an iridescent collar.
Layered wings, beaks, tiny feet and hats share the same rounded miniature language as
cars, cafe umbrellas, flower boxes, street lamps and mansard rooftops. UI uses the same
cream, teal and biscuit palette. All visible interface text is English. Building names
and lettering are original. No image-generation assets or stock photos are required.

## Phone and lifecycle
Responsive portrait and landscape with controls at least 44 CSS pixels. DPR is capped
at 1.5 on touch/small screens, where real-time sun shadows are disabled. Static city
geometry is merged with vertex colors, target kits are reused on restart, and trails,
projectiles, particles and decals are bounded. Lower viewports use a centered flight camera.
Keyboard/mouse and Pointer Events are supported. Blur/background pauses simulation,
clears held input and stops voices. WebGL/context failures show a retry screen.

Completed progress persists. Reloading an unfinished outing returns to the club;
there is no unfinished-flight resume promise. Storage failure is tolerated. A modern
WebGL-capable mobile browser is required. Desktop device-size checks do not constitute
physical handset certification.

## Source, build and tests
- New implementation: `model.js`, `world.js`, `game.js`, `style.css`, `index-source.html`.
- Three.js r147: MIT, full notice in `LICENSE-THREE.txt`.
- New code and procedural artwork: MIT, see `LICENSE`.
- Relevant local skills used: web-games, mobile-games, 3d-games and game-art. The
  open-source reference skill was consulted; no game source is falsely claimed as a
  complete upstream adaptation. The runtime is independently authored over Three.js.
- `python build.py` regenerates self-contained HTML, hashes and ZIP reproducibly.
- `node tests.cjs`: 60 natural controller sessions across all six outings at 30/60 Hz;
  score/task clearability, no overlap between same-lane cars, swept moving-target hits,
  first reward latency, cooldown, earned specials, bounded inputs, storage and terminal state.
- `node tests-scene.cjs`: real Three.js geometry with a stub renderer checks finite
  transforms, restart reuse, actual visual/contact heights, 96 low-flight wing poses,
  bounded mesh/triangle budgets and pooled effects. Real browser rendering is separately
  inspected; a renderer stub alone cannot establish visual quality.
