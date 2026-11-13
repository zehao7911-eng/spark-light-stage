# Browser QA — October 26, 2026

Actual browser UI input was used; no hidden game state or test save was injected into browser storage.

- 390×844 portrait: entered First Light, held the water to steer into the initial school and observed four consecutive consumes. The koi acquired multiple inner color ribbons and grew. Changed direction and completed the real first waterway with 8 fish, best chain 4, zero bumps, three medals and nine pearls. Atelier purchase changed Pearl Shell from 0/2 to 1/2 and pearls from 9 to 5. Reload retained the clear and unlocked Lotus Waltz.
- A first tuning pass revealed excessive opening predator pressure. Final tutorial has no dangerous fish; later waterways cap dangerous fish at one to three. Release damping, gentle forward-cone feeding assist and a nearest-school edge indicator were added after hands-on checks.
- 320×568: no horizontal overflow; both action buttons are 64 pixels tall and their bottom edge is at y508, within the viewport. The compact water area preserves its aspect ratio; redundant sidebar/footer are hidden.
- 844×390 landscape: action buttons were 95 pixels tall and within the viewport. Started Lotus Waltz with four hearts from the purchased shell, used Surge and keyboard swimming to collect 3/11 fish. Paused, reloaded twice, then Continue restored 3/11 and four hearts with input released. Renderer and controls remained usable. Arrow/label overlap was corrected.
- Actual browser warning/error log was empty after these checks. Sound is muted by default; generated audio uses a user gesture and is suspended on pause.

The automated suite separately executes actual original Fish movement, six-circle collision and zone streaming through all six campaign waterways in an input-driven model pilot. Canvas rendering methods are stubbed in that harness, so it does not replace browser review. Public deployment verification is recorded after release. Physical Android/iOS device coverage was not available.
