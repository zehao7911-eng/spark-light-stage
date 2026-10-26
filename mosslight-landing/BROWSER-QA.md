# Browser QA — October 26, 2026

Local browser checks used the actual built game through UI input, without modifying hidden game state or local storage.

- 390×844 portrait: title, atlas, first route briefing and launch; pointer hold flew to both docks. Collected two seeds, experienced one recoverable stumble, completed route 1 in 43.8 seconds and saw the result screen. Next Route awarded 17 coins and unlocked route 2.
- 320×740 portrait: reload retained one completed route and its medal. Route 2 was unlocked while later routes remained disabled. Atlas selection bar stays visible above the bottom edge. Narrow world headings remain readable.
- 844×390 landscape: controls and menus were reachable. A discovered scene distortion was corrected with an aspect-preserving scene width. Reload showed Continue Flight, then pause/resume restored the active route.
- No external CDN runtime dependencies. Images, font and JS are local. Public deployment and immutable ZIP verification are recorded separately after publishing.

These are browser viewport tests, not tests on every physical iOS/Android device. The automated twelve-route pilot checks reachability, not enjoyment or every optional seed path.
