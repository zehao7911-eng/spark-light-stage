# Verification

`node test-core.cjs` passes 2,347 assertions. All twelve fixed chambers and nine seeded Field Tests were completed by applying actual exit/drop/tick actions. Tests cover bounded motion, swept glass hits, drop-energy direction on all three rails, actual bank contacts, conservation, free recall, undo, sticky Guide use, exact in-flight save restoration and deterministic continuation. Malformed save examples recover to a valid fresh state. Generated Field Tests remain bounded to nine capsules, three deflectors, two bumpers and one moving core.

All twelve chambers were completed through real browser rail buttons and Drop/Recall controls, with 36 / 36 data marks. The opening clear was observed 1,102 ms after Drop locally. Real pointer dragging changed the exit from the right rail to the left rail. A paused falling core at x110 / y196.38888888888886 / age0.2583333333333333 survived refresh with identical values. Native Space drop, Z Undo, Guide highlight and sticky guided state through Undo/refresh were exercised. The earned lime core persisted.

Browser viewport checks include 320×568, 390×844 and 844×390. The page fits without horizontal or vertical overflow; displayed controls have at least 44 CSS-pixel hit dimensions. Rail preset hit areas intentionally overlap slightly at small sizes; physical pointer input selects the nearest rail coordinate, while labelled Enter activation selects the exact preset.

The fixed model runs at 120 Hz; rendering is capped at 40 fps / DPR1.5, or 30 fps / DPR1 in Gentle mode. A flight auto-recalls after 2.15 seconds following teleport. Undo history, trails, fragments and audio voices are capped. Backgrounding pauses the model; gesture capture clears on interruptions. All runtime art is local. Canvas rounded-path, modal and resize-observation fallbacks support embedded browsers.

These are browser and deterministic model checks, not physical handset or frame-rate certification. The deployed URL and root-index download are verified separately against frozen source before delivery.

Native Field Test1 completed with850 points; the next test began at850. After one new hit earned970, restarting the current test restored850 and retained all36 campaign marks. Gentle effects persisted through refresh. Final local console inspection returned no warnings or errors.
