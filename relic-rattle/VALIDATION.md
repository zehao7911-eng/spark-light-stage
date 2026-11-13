# Validation

## Logical and asset tests

`node tools/test.mjs` passes 211 assertions. This covers an ordinary six-room expedition, each relic in a complete room, two subsequent loop difficulties across all six rooms, exact stopped-input serialization and deterministic continuation, kill conservation, shop prices/caps, shockwave cooldown, one-time finisher recharge, boss-collapse cleanup, healing and blast effects, terminal defeat, free retry, malformed state and idempotent income / best seals. Assertions are not 211 different human play sessions.

`node tools/art-test.mjs` verifies sixteen original/runtime SHA256 pairs, source-grid metadata, independent successful image loading and late image installation. Original files are preserved. The game can run with code-drawn fallback shapes while illustrations arrive; an image load failure does not create a blocking loader loop. The release ZIP is extracted and both test suites run again.

## Native browser play

All six chambers and both guardian encounters were completed with ordinary floor taps/movement, actual shockwave presses and visible relic-choice buttons while iterating on the build. Results: 472, 764, 1,090, 982, 1,130 and 1,482 score. The archive reached 13/18 best seals. The native run selected Ember Core, Soul Flask, Ghost Shell, Quick Step and Long Chain, and took Ember Core to rank two before the second expedition. That new expedition visibly began in chamber one, loop two, with the carried relics, six hearts, zero breaks and 230 coins.

The first native guardian was defeated before the final cleanup refinement; its already-defeated save resumed through the new collapse logic after reload. The final Warden was fought and defeated normally on the refined logic. Final logical tests cover a complete fresh six-room run. This distinction is retained rather than claiming every earlier native action used the final frozen code.

Upgrades were bought with normally earned income: starting health cost45 (81→36); reach cost40 (161→121); head cost55 (121→66). The next chamber displayed six starting hearts. Final-result refresh retained230 coins and13 seals without paying again. Actual healing, explosive chains and projectile / contact damage were seen. Exact interrupted Powder Chapel recovery retained17/18,947 score and6/6 health. Sound OFF and Gentle Effects ON persisted. Stable paused screenshots matched SHA256 `65435da130d187006869700c5e3718b9929c177ff48ca7171531feed49560666`.

## Mobile layouts and input

Browser viewports checked: 320×568,390×844,568×320,844×390, plus ordinary1280×720 desktop. Main native controls measured44px or larger. The narrow320×568 replay actually cleared the first chamber at642 score,12 breaks,three seals and37 new-attempt coins; best seals did not duplicate. Its result fitted on screen. The568×320 result, relic draft, archive, pause and workshop were checked. An offscreen landscape restart button was found and fixed: the corrected pause panel had equal client/scroll height242 and the workshop284; result245. The earlier failing observation is retained in the workspace log as a resolved pre-fix case.

Actual844×390 floor input broke targets. Pausing at5/14,219 score and6/6 health then refreshing retained those exact displayed values. Portrait is the primary composition; short landscape contains the upright arena at a smaller uniform scale rather than distorting character proportions. Initial screenshots immediately after resizing occasionally showed stale compositor pixels; stable DOM geometry and subsequent captures were reviewed.

Native warning/error logs were empty at the final local check. The first room's sparse early target layout, low-contrast ceramic seals, duplicated letterbox floor imagery, overly narrow head-only contact, slow target travel and dragged-out final-straggler cleanup were reviewed and revised. The final interaction adds direct tap destinations, clearer cutouts/shadows, moving-chain contacts, one-time finisher recharge and boss-collapse completion. These observations support the specific fixes; they do not establish guaranteed enjoyment or a platform grade.

## Limits and delivery gate

Movement-driven angular torque is an arcade flail approximation with swept contact tests, not a general rigid-body chain solver. Characters are credited2D pose sheets plus code motion, not real-time3D models or GIF files. Three shared illustrated environments and one boss design are used; no claim of six bespoke worlds, infinite unique stages or original ownership of reference media.

No physical Android or iPhone was available. Viewport checks do not certify physical handset performance. The game has no WebGL/CDN/backend dependency; scheduling, effects, shots and audio voices are bounded. Public GitHub deployment, a native public first-room run and result refresh, exact served-file comparison and the immutable root-index ZIP are verified before handoff; final deployment evidence is recorded outside this static package in the workspace delivery JSON.
