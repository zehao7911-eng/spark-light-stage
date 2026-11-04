# Validation — November 4, 2026

## Simulation and geometry

156 controller/SDK assertions pass. The36 normal steering campaigns span all six missions, all three kit settings and both Easy Flight settings. All21 passengers per campaign are picked up and physically docked; all three optional badges are reachable. Default Easy routes earned all18 best stars; normal-flight Ring Road routes included a recoverable bump. This is not a claim that every controller configuration had zero bumps. Checks also cover idle/no free score, invalid input/time, exact flight/cargo continuation, actual rope constraint and lag, functional coil and damper, real obstacle/reset, terminal freeze, best-only replay, malformed snapshots and max/union saves. SDK tests use bounded mock hosts for absent/failing/partial methods, unlike, direct image-only comment, duplicates, cloud uncertainty and late unsubscribe.

1,221 current geometry assertions cover fixed upper/lower arm and leg lengths, front hand/crossbar contact, actual transformed winch attachment, constant-scale disembarkation and boot/deck contact, instance transforms, hidden crew, stable line buffers, bounded pooled particles and baked vertex colours. A smooth48x32 planet mesh and nested fixture details use local original geometry. These tests are not handset performance measurements or full collision/IK certification.

## Native browser play

All six missions were completed through ordinary tap/waypoint controls:21 passengers,17/18 best stars. Scores825/1275/1275/1725/1725/2175; only mission4 used one real bump/free reset. The widened coil and Soft Tow were unlocked and selected through normal progress. An actual native canvas drag moved the final-mission tug to the left perimeter. No win-state injection or fake unlock was used. Later camera/UI refinements did not change the controller rules; final-source first-mission replay again earned825,three badges,zero bumps and3stars while preserving prior17stars.

Native full-cargo pause/reload preserved displayed mission4 ship position, destination, cargo2, rescued2/4,three badges,one bump and825score. Exact full-state/future determinism is separately covered in controller tests. SoundOff/EasyOn/GentleOn/LightOn survived reload. Stable paused screenshots were pixel-identical; the first immediate capture still showed the earlier UI render and was excluded from the stable comparison. Source play and final-source console warnings/errors were empty.

## Screens and caveats

Cold loads at320x568,390x844,568x320 and844x390 matched document/viewport dimensions. All five active rescue controls remained within the viewport with no pair overlap; primary targets were at least44CSS pixels. Short landscape uses a numbered rescue strip. The320px flight book scrolls while its46px BACK TO SPACE action remains visible. Immediate automation viewport transitions initially returned stale marker positions; cold loads were used for stable measurements. A container ResizeObserver and normal window resize handler now update the camera and controls. Physical-device rotation behavior remains untested.

Default Light uses DPR1 and no realtime shadows, with a30fps presentation target; Full capsDPR1.5/40fps. These are caps/targets, not measured guarantees. No physical iOS/Android device, sustained FPS, memory, battery or thermal test; no independent handset audio audit. No real GameWave App import, social operation or cloud roundtrip. Final archive extraction, public file matching and public native play are recorded in the delivery artifacts. Six finite missions, not endless unique authored worlds. No visual parity or platform grade guarantee.


## November 4 stutter and rig repair

Frequent pointer events formerly updated the simulation timestamp also used to throttle drawing. Presentation now uses an independent FrameClock.109 timing assertions include high-frequency input,30/40fps targets, pause/resume and stalls. The deterministic input-flood regression advances300 frames in10seconds, compared with17 using the old shared-timestamp logic; this is a timing regression, not handset FPS.

Static vertex-colour batching preserves the original triangle geometry/palette. Six instanced limb batches and one80-particle pool replace per-limb/per-particle draws. Route GPU attributes, projection vectors and raycaster are reused. HUD text is diffed and beacon layout cached; saves are coalesced for180ms while pause/pagehide/result flush immediately. Save key and controller rules are unchanged.

In the same browser, five-astronaut Light/DPR1 component measurements over120 warmed samples changed204 to56 draw calls,140 to47 geometries, and mean CPU render submission0.407ms to0.241ms; triangle count stayed76,512. Native back-and-forth drags generated80 move events each: observed24.1 to30.0fps over short2.8/3.0-second samples, maximum drag-to-render age66.3 to37.2ms. These controlled browser comparisons do not measure GPU memory bytes, physical-phone sustained FPS or thermals.

Final-source ordinary first-mission play earned825/3badges/0bumps/3stars and kept the existing17-star profile. Full-cargo pause/reload preserved mission/ship/destination/cargo/progress/score and resumed to successful delivery. Normal flight-book navigation rebuilt the five-astronaut sixth scene without console warnings/errors. All five44px-or-larger rescue controls remained in bounds and nonoverlapping after cold reloads at320x568,390x844,568x320 and844x390. Cable origin follows actual bank/scale; grip bar sits in front of the helmet; limbs have constant segment lengths; passengers retain scale1 and land using measured deck/boot geometry. Public/extracted build checks are recorded separately after publication.
