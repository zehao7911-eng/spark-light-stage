# Validation

Godot 4.7.2, native Compatibility renderer, single-thread Web export.

## Economy and native UI

- Real GDScript tests: tap rewards, insufficient funds, rounded 15% price scaling, quantity purchase, double upgrades, all three golden outcomes and one-time collection, crop planting/growth/harvest, wizard magic, JSON save restoration, malformed array rejection, persistent achievements through ascension, heavenly purchases, selling without lifetime inflation, pause and bounded offline production.
- A 30-minute automated strategy using four taps per simulated second, purchases and caught golden events reaches Farm/Factory and 32.86M run earnings. This is a simulation, not a claim of a manual playthrough.
- Actual native command layer: Farm garden, Wizard grimoire, ascension, heavenly upgrade, paused tapping, restored tapping and a 320px wrapped help dialog. Tests clean up their nodes and exit without engine errors.

## Browser

- Desktop actual normal game: start, 20 Space taps, cursor purchase and the new production row / upgrade icon.
- Local non-saving fixture: actual phone golden-cookie click applies a ×7 event; Bakery Farm row opens the garden; planting advances from 30 seconds to ready; actual harvest increments harvest count, adds cookies and applies the production bonus.
- Layout audits: home at 320×667, 360×740, 390×844, 844×390, 1280×720; store at 320×667 and 390×844. Fully visible controls have bounds inside the viewport and dimensions at least 44 CSS pixels. Scrollable offscreen controls are intentionally excluded from the visible-control audit.
- A detected native button signal/rebuild ownership error was repaired with deferred signal dispatch, then checked using a fresh browser tab. Old pre-fix logs are not a final-build failure.
- A fresh browser tab exercised upgrade purchase, building purchase, phone page changes, garden planting, settings and mute with zero engine warnings/errors. A simulated DPR 2 canvas rendered 780×1688 for a 390×844 CSS viewport, preserving 44/48/52px controls and respecting 47px top / 34px bottom safe insets. This is emulation, not a physical handset test.
- Public deployment, exact file / archive integrity and final real-browser smoke checks are verified separately at delivery.

No physical-phone test or commercial-game parity certification is claimed. First load depends on downloading the Godot engine; WebGL 2 and browser storage are required.
