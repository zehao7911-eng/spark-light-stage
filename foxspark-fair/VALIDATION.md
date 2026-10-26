# Validation record

- `node tests.mjs`: Over 37,000 checks, including nine authored maps traversed through real moves, 2.2-second fuses, blast escapes, cage rescue, key pickup and gate entry. Solvability fixtures isolate map logic by omitting enemies; separate collision, movement, guard and random-run tests retain enemies.
- Source-specific tests: wood stopping, owner escape, recursive three-bomb chain, restore of active fuse, deterministic resumed simulation, best-only rewards, terminal freeze and bounded simulation state.
- Renderer test includes all three scenes, particle expiration and long frames. Fixed a negative radius at particle retirement found during browser play. Corrected atlas row/column gutters to prevent neighboring pose fragments.
- Actual local browser: first stage rescue and gate entry produced result and unlocked stage two. Touch direction button reacts immediately; canvas destination tap navigates around pillars. Reload resumes saved run. Map locks later stages and workshop tools until earned.
- Browser viewport tests: 390×844 portrait, 320×568 small portrait, 844×390 landscape. Main controls 44px minimum, spark button88px; no horizontal overflow. Canvas retains2:3 ratio with identical input/render coordinates, no stretched art. Pause overlay fits landscape; small portrait title adjusted.
- Audio muted by default; user toggle enables synthesized effects. Blur/visibility pause clears input and suspends audio. Local save every2seconds and on pause/reward/pagehide. Failed image loads have timeout and retry.
- Physical Android/iOS hardware was not available for certification. This is browser viewport validation.

