# Spectrum Zero — validation

October 14, 2026.

## Actual GDScript economy

The purchase/reward strategy in `qa.gd` reached its first three-prism refraction at 371.25 seconds and Infinity at 812 seconds. Five refractions, both reset layers, exact JSON restore with active resonance, paused income, away-burst expiration, malformed array saves, all three chambers, four generators and once-only milestone claims passed. Later chamber checks use explicitly supplied test funds; this is not a claim of a complete manual playthrough.

The native `qa_ui.gd` test passes the actual command routing, including a regression where a full resonance meter incorrectly prevented tapping in the no-burst chamber. It also verifies Infinity/autopilot access on phones, new-game event feedback and paragraph wrapping in an actual 320×667 SubViewport.

## Browser interaction and layout

The real single-thread Godot Web export loaded in the in-app Chromium browser without script errors or warnings. Normal UI play started the engine, bought the second ring, restored the save, bought upgrades and unlocked four rings, claimed the first two milestones and paused. The paused normal state held ring levels 12 / 12 / 4 / 1 and both once-only claims; later passive/upgrade numbers vary with real elapsed play.

An independent, non-saving advanced fixture displayed all ten colors and exercised resonance, circuit purchases, autopilot, the phone's Infinity reset and two generator purchases through real pointer input. This fixture is not normal progression and is excluded from publication. Developer snapshots are read-only diagnostics; UI actions were performed through actual native button clicks.

The seven audited sizes are 320×667, 360×740, 390×844, 844×390, 1024×768, 1280×720 and 1280×390. Every main-screen native button was within the view and at least 44×44 CSS pixels. Portrait and landscape use distinct layouts. DPR 2 and 3 were simulated in separate local fixture pages with 47-pixel top / 34-pixel bottom insets; native controls retained their CSS touch size and remained clickable. This caught and fixed the physical-pixel/CSS-pixel scaling issue. Modal paragraph sizing and unsupported arrow glyphs were also fixed.

These are browser/device-density simulations, not certification on physical Android or iPhone hardware. The exported game needs WebGL 2. First load includes the Godot runtime; a visible loader, progress indicator and retry path are supplied. Source and ZIP rebuild checks and public deployment verification are reported at delivery.
