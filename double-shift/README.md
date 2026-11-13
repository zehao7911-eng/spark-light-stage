# Double Shift

A tiny print shop with an unreasonable workforce. Original phone-first HTML5 route-recording automation game, English throughout.

## Play

Drag from PAPER or INK to a glowing PRESS dock. The demonstration delivers one load and leaves a robot that walks the actual recorded route, returns, collects stock and repeats. You can also tap the source, then destination for an assisted shortest route. Later orders need PRINT → DISPATCH routes. Tap a numbered helper or RECALL to reprogram freely. Hold RUN ×3 (or Space with canvas focus) to hurry. No timer, purchase or mandatory social action.

Six sequential orders introduce paper, ink, dispatch and two presses across a day studio, rooftop and night shop. Earn up to 18 best stars: finish, lean crew, short routes. Six stars unlock double carry; twelve add faster feet. The print book collects six original editions. Encore repeats the shops with larger quotas, capped at three difficulty tiers. No claim of infinite authored levels.

## Run / import

Keep index.html at the ZIP root. Serve the extracted directory over HTTP(S), e.g. `python -m http.server 8000`, then visit localhost:8000. No build, remote CDN, account or API key is required. ES modules require an HTTP server; opening file:// is unsupported. All assets including Three.js r147 are local. For GameWave, include GAMEWAVE-IMPORT.txt. Storage uses the versioned double-shift-v1 namespace; workers, inventory, order, best results and settings persist.

## Platform SDK

The game starts independently of window.neonlib. Optional SDK lifecycle, whole-envelope cloud progress and independent like/comment subscriptions use timeouts and cleanup. A genuine true like unlocks gold goggles; a genuine comment (including empty-content image comments) unlocks confetti prints once. Core content stays available without the SDK. Unknown/failed/timed-out cloud loads suppress cloud writes; local active run wins, progress/reward flags merge monotonically. Mock tests are not real GameWave import tests. No automatic likes/comments are posted.

## Reference and rights

Reference: The Last Clockwinder, developer press kit https://pontoco.com/the-last-clockwinder-presskit and creator explanation https://blog.playstation.com/?p=374481 . Its VR recorded-action automation inspired this compact recorded-route interpretation. This is not a VR port, pose/time recorder or a full replica. No reference source code, assets, characters or music were copied. Rezona was searched for candidates; already-used mechanics were rejected before this selection.

All robots, environment, poster illustrations, interface and synthesized sounds are original code art. No AI-generated bitmap assets. Shared original MIT geometry and SDK utilities retain attribution; local Three.js retains its MIT notice. Cover is an actual in-game browser screenshot, not a separate concept render.

## Validation

`node tools/test.mjs` checks 54 complete production networks (6 orders × 3 kits × 3 Encore tiers), actual finite stock, shortages, recall recovery, corruption handling, exact save continuation, monotonic rewards, terminal state and mocked SDK lifecycle/cloud contracts. Phone-size browser input testing covers all six orders, real drag and tap routes, 320×568, 390×844, 568×320 and 844×390 layouts, pause, save recovery and settings. Physical handset performance and real GameWave App import remain unverified. Full/Light graphics and Gentle motion are available.

## Model fix — 2026-11-03

Blinking now preserves each pupil’s original local scale. The previous animation accidentally assigned unit scale to a 0.035-scale sphere, stretching black pupils beyond the head. Idle, walk and carrying poses now keep their eye proportions. Existing progress is compatible. `node tools/model-test.cjs` checks pupil and whole-rig bounds across all crew colours, gold goggles, poses and blink phases.

## Limb and workshop clearance update — 2026-11-03

Arms now have independent shoulder, elbow and wrist joints; legs have hip, knee and level-sole ankle articulation. Loads follow the actual palm midpoint. Limb segments remain attached in the hierarchy through walking and turns. The press body and tray sit farther behind the dock, keeping the torso clear of the feeding tray. Crew presentation uses small directional lanes, local separation and obstacle clearance, with smoothed lane changes and facing the dock during pickup/drop. This is presentation spacing, not a rigid-body physics simulation; production timing and saved routes are unchanged.

`node tools/rig-test.cjs` checks connected segment lengths, level boots, floor bounds and palm/load alignment across 960 animated and turning samples. `node tools/crew-test.mjs` checks the six production networks and six identical overlapping routes for torso spacing and finite, nearby presentation positions. These checks supplement visual browser review; physical handset performance remains unmeasured.
