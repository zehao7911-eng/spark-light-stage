# Quality checks

Model simulation: six skilled routes placed first, in 31.51 / 31.47 / 30.32 / 27.73 / 28.45 / 29.25 seconds, with 6 / 6 / 12 / 15 / 15 / 12 successful boosts. 22533 bounded 120Hz steps across these races. Also: exact mid-race restore/continuation, best-only awards, terminal freeze, idle finish, straight-line overheat, path closure and malformed input/save guards.

Native browser: actual three-lap finish (fourth, 50.1s, one perfect exit, 18 rings), results/retry/next course. A fresh start and a held Space through countdown produced PERFECT EXIT at 3.2 race seconds and first place. Native held pointer on drift and lane button were exercised. Second circuit correctly used Strawberry Sprint. Pause showed Pit stop and resume/restart. Reload kept stage and previous star.

Layouts inspected at desktop 1280x720, phone 390x844, small 320x568, landscape 844x390. At 320: document 320x568, header buttons44x44, drift156x54, lane56x54. At 844x390 document exactly844x390, controls arranged alongside scene. This is browser viewport QA, not physical handset testing.

Art fixes before release: apply linear material colors and filmic exposure to avoid overbright wood, stagger grid, make windshields sit above body instead of buried, align lane controls with chase-camera screen direction. All local modules have explicit v=1 resource queries; release URLs will be verified before handoff. Cover/icon inspected with actual geometry reference and preserved aspect ratio; safe icon crop 512 square.

Final native checks: 390x844 intro cover and buttons fit; Strawberry Sprint PERFECT EXIT at 2.6 race seconds, first place. Pause screenshots were byte-identical across a long pause; reload resumed Strawberry Sprint lap3 at47.3s with17 rings. Finished final app at50.0s,18 rings, one perfect exit and next/retry controls. Local console had no warnings/errors. Garage eligibility at4stars and repeated release no extra boost were tested.
