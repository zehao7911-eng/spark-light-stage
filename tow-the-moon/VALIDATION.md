# Validation — November 4, 2026

## Simulation and geometry

156 controller/SDK assertions pass. The36 normal steering campaigns span all six missions, all three kit settings and both Easy Flight settings. All21 passengers per campaign are picked up and physically docked; all three optional badges are reachable. Default Easy routes earned all18 best stars; normal-flight Ring Road routes included a recoverable bump. This is not a claim that every controller configuration had zero bumps. Checks also cover idle/no free score, invalid input/time, exact flight/cargo continuation, actual rope constraint and lag, functional coil and damper, real obstacle/reset, terminal freeze, best-only replay, malformed snapshots and max/union saves. SDK tests use bounded mock hosts for absent/failing/partial methods, unlike, direct image-only comment, duplicates, cloud uncertainty and late unsubscribe.

2,481 assertions use actual generated Three meshes: two hands follow the rotated crossbar, real cable endpoint contacts, finite connected limbs, boot/platform bounds, ship size, particle size/cap and ship-with-exhaust bounds at both flight edges. A smooth48x32 planet mesh and nested fixture details use local original geometry. These tests are not handset performance measurements or full collision/IK certification.

## Native browser play

All six missions were completed through ordinary tap/waypoint controls:21 passengers,17/18 best stars. Scores825/1275/1275/1725/1725/2175; only mission4 used one real bump/free reset. The widened coil and Soft Tow were unlocked and selected through normal progress. An actual native canvas drag moved the final-mission tug to the left perimeter. No win-state injection or fake unlock was used. Later camera/UI refinements did not change the controller rules; final-source first-mission replay again earned825,three badges,zero bumps and3stars while preserving prior17stars.

Native full-cargo pause/reload preserved displayed mission4 ship position, destination, cargo2, rescued2/4,three badges,one bump and825score. Exact full-state/future determinism is separately covered in controller tests. SoundOff/EasyOn/GentleOn/LightOn survived reload. Stable paused screenshots were pixel-identical; the first immediate capture still showed the earlier UI render and was excluded from the stable comparison. Source play and final-source console warnings/errors were empty.

## Screens and caveats

Cold loads at320x568,390x844,568x320 and844x390 matched document/viewport dimensions. All five active rescue controls remained within the viewport with no pair overlap; primary targets were at least44CSS pixels. Short landscape uses a numbered rescue strip. The320px flight book scrolls while its46px BACK TO SPACE action remains visible. Immediate automation viewport transitions initially returned stale marker positions; cold loads were used for stable measurements. A container ResizeObserver and normal window resize handler now update the camera and controls. Physical-device rotation behavior remains untested.

Default Light uses DPR1 and no realtime shadows, with a30fps presentation target; Full capsDPR1.5/40fps. These are caps/targets, not measured guarantees. No physical iOS/Android device, sustained FPS, memory, battery or thermal test; no independent handset audio audit. No real GameWave App import, social operation or cloud roundtrip. Final archive extraction, public file matching and public native play are recorded in the delivery artifacts. Six finite missions, not endless unique authored worlds. No visual parity or platform grade guarantee.
