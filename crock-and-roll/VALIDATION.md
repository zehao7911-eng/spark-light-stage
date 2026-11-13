# Release validation

## Simulation and assets

- 36 deterministic controller visits: all six authored shops, all three functional kits, continuous held steering and the point-target alternative.
- Actual collision-generated piece quotas, one break event per piece, staged final cascades, terminal-state freeze, maximum-only awards, receipt reload, exact released-input continuation and malformed-save rejection.
- A single tap follows moving trolleys; a struck trolley really rolls into the next display. The first display produces its first break in under two simulated seconds in the default point-target route. This is a deterministic model measurement, not a promise about network load or physical device latency.
- Separate simulation/presentation clocks keep high-frequency input from resetting the render cadence. Braking is simulated and its stronger earned kit is tested.
- Actual Three geometry checks measure neutral hoof-floor contact, rotating bull bounds, ceramic foot/support contact, finite local vertices and six complete prop builds.
- Optional SDK mocks cover missing/partial hosts, genuine positive-like/direct-comment callbacks, duplicate reward guards, lifecycle deduplication, unsubscribe and unknown-cloud write protection. They are not real host integration evidence.
- Both self-contained HTML scripts are parsed. Runtime assets are bundled; no CDN startup dependency is required.

## Native browser playthrough

Recorded using the actual game UI, without injecting game state or a solver:

| Shop | Damage | Best chain | Stars |
| --- | ---: | ---: | ---: |
| A Fine Mess | 2,003 | 16 | 3 |
| Shelf Esteem | 2,236 | 16 | 3 |
| Glass Act | 1,781 | 6 | 2 |
| Room Service | 2,873 | 11 | 3 |
| Night at the Vase | 2,556 | 11 | 3 |
| The Grand Finale | 2,894 | 11 | 3 |

The native first-shop test also included a held scene press and release, reaching an earlier 1,403-point receipt; a later direct-control replay reached the listed 2,003. The completed receipt survived reload without duplicate stars. An active fourth-shop visit restored paused with 10 pieces / 1,080 damage, then resumed. Earned Sure-footed equipment, Mulberry neckerchief and Light rendering were selected through the collection UI. The first five visits span iterative corrections; the final shop used the final movement bounds and earned kit, and its 2,894-point / 17-of-18 total receipt survived reload; the final published first-shop check is recorded in the external delivery evidence.

Portrait 390×844 and 320×568, plus landscape 844×390 and 568×320, were visually inspected. Visible measured controls had at least 44×44 CSS-pixel targets; document width equalled the tested viewport. Landscape changes the actual camera orientation and keeps result actions available beside the scrollable card body. The 390×844 `cover.png` is an actual standard-rendering game screenshot, not a generated illustration. Final source browser warning/error logs were empty.

Native UI operations sometimes required a subsequent fresh observation after the browser tool's roughly three-second selector deadline; no physical-phone frame-rate claim follows from that.

This is a compact arcade game with six finite shop arrangements and three shared architectural sets, free replay and saved best records. There is no claim of an infinite authored campaign, commercial-reference asset parity, a platform grade, real rigid-body fracture, actual GameWave import, or physical-handset/thermal certification.

## Download-package checks

The root-index ZIP passed CRC, path safety, duplicate-entry, complete extraction-byte equality and index/standalone equality checks. The extracted game passed the same controller/SDK and geometry suites. A cold `file:` browser opening was blocked by the browser tool's URL policy; no file-browser UI verification is claimed. Source HTTP play and published HTTPS play are separate checks.
