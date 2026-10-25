# Browser QA · 2026-10-25

- Local Chromium/IAB: completed first two runs through visible UI; second run achieved 6/6 gates, zero bumps, 1215 points and three medals. Claiming banked 36 coins, brought total to 57 and unlocked Hop.
- Bought Carve for 40: balance 57 to 17, level 0 to 1, next price 85 disabled as unaffordable. Run/reward tests separately cover exact-once claims and best-medal accounting.
- Tapped Hop then Spin: visible spin counter became 1. Dragging the canvas selected left steering. Pause and reload restored hill 3, 215 metres, 415 points and saved spin. Active saves reopen paused.
- 320×740 and 390×844 portrait: no horizontal overflow, lane and action buttons visible; shop/footer can scroll on short screens. 844×390 compact landscape places slope left and controls right.
- Browser warning/error log was empty at local reload. Public release verification is recorded separately after publication.
- 23 model tests passed, including natural reachable pines, low-vs-tall jump collision, eight complete gate-following courses, timer restoration, all four equipment effects, and ten-run progression.

These are browser viewport and actual pointer/keyboard UI checks, not physical iOS/Android device certification. Reduced motion suppresses decorative flakes/particles/shake; game movement remains active. Audio defaults off. No CDN runtime dependencies.
