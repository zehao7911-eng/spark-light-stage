# ROOFTOP RIVALS

An original, compact HTML5 street-football cup. Six opponents, three rooftop atmospheres, shape-built cel-shaded characters, a physical ball, automatic kicks, headers and airborne volleys. A cream sports-ticket interface replaces the previous neon rhythm-game layout. All visible text, models, textures, music and effects are original. No image generation, commercial game media, external fonts or CDN resources are used.

## Play on

Tap the court to run to a position, or drag/hold the left movement control. Hop with the right button. Keyboard: A/D or Left/Right; Space, W or Up to hop; P or Escape to pause. Moving into a nearby ball kicks or heads it towards the other goal. Standing still does not trigger a targeted automatic shot. A striker can receive a ball from either side. You still need to chase, defend and time jumps. The first opponent is a forgiving keeper; later opponents chase and counter.

First to three goals wins; there is no match timer. The ball must physically cross the goal line below the crossbar. High shots rebound from the roof boundary. A fresh ball drops after a stalled rally. Missing, losing or replaying does not remove earned stars. Each rival offers a star for winning, one for conceding at most one goal, and one for scoring at least one airborne goal. Only best records count; replaying cannot farm stars. Clear rivals in order. Later serves vary position, Canal Court has a modest air current, and opponents differ in speed, reaction and jump behaviour.

Two distinct wins unlock a second airborne hop. Four wins unlock a charged power strike on every third regular kick. Kits unlock at 6/10/14 stars. Six wins open After Hours: repeated matches against the final rival, with bounded speed growth and seeded AI decisions. This reuses the existing arena and mechanics; it is not an endless collection of authored levels. Postcards export a local PNG of the actual 3D match, not generated promotional artwork.

Chill pace is the default, at 72% simulation speed. Quick pace is available in Half-Time. Light mode removes camera motion and particles, disables real-time shadows, caps drawing at 30 FPS and uses a lower rendering resolution; simple contact shadows remain. Full detail caps drawing at 40 FPS with a DPR limit of 1.5. Physics advances at a fixed 120 Hz. These are renderer targets, not measured physical-handset guarantees. WebGL is required.

Pause, losing focus or hiding the tab releases controls, freezes the match and silences synthesis. Refresh restores the physical match paused, with scores, ball/striker velocities, opponent state and progression. Input targets and cosmetic particles are intentionally released. Records are browser-local and can be unavailable in private browsing or some embedded WebViews. Nothing is uploaded. A graphics interruption offers a saved-match reload.

## References and provenance

Gameplay: [Rezona Big Belly FC](https://rezona.ai/game/pgcserver/pv/CnPPzgHb/v34/dist/index.html). The reference was actually started; A/D movement, a kick key and jump were attempted, and a 0–1 CPU score was observed. No full reference victory is claimed. This is an independent, smaller 3D interpretation with a different cast, city, art, input system, physics code, progression, sound and UI. No reference code or assets were extracted.

Art: [the supplied Cel-Shaded atlas](https://mygamesartstyle.jupiterthewarlock.com/styles/cel-shaded/). The enlarged Sifu warm-interior example was viewed for its few hard lighting planes, strong action silhouettes and restrained material detail. No Sifu characters, architecture or complete interface are reproduced. The open-source reference skill was consulted; its native CengBall programming-game entry was not suitable as a direct mobile starting point and no code was imported from it.

Three.js r147 is bundled under its MIT license; see LICENSE-THREE.txt. Original project code and art are MIT licensed separately. Scene notes and artbook.html explain the shared material and shape system. The artbook uses labelled visual-study fixtures rather than player saves or claimed gameplay progress.

## Package and checks

Serve this folder with any static server and open index.html. index.html and standalone.html inline all game scripts, CSS and Three.js; icon.svg is optional. The ZIP includes complete editable source, build script, artwork rules and model checks. No dependency installation is needed to play the hosted game.

Build with `python build.py`. Check with `node qa-model.cjs`. Tests cover ordinary-control victories against all six rivals, real goal planes, crossbar impacts, high-shot rejection, hop/power unlocks, idle non-victory, paused state continuation, record caps, terminal guards, field confinement and finite physics states. They are deterministic simulated control routes, not a human difficulty or entertainment rating. Browser QA separately uses actual native pointer/keyboard inputs, phone-sized viewports and public deployment checks. Physical phones were not available for testing.
