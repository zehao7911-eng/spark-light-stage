# Validation scope

## Model

Five deterministic seeded runs collect all twelve species using normal aim/grab/squeeze inputs, not injected collection/win states. Tests cover bounded collider positions and finite values through every transit, mid-carry snapshot/continued-state equality, moving-carriage restore, no overlapping grab actions, empty grabs, terminal freeze, duplicate/reloaded-result reward guards, invalid body/state data and profile/theme caps. The assertion total is dominated by repeated per-body bounds checks; it is not a count of separate gameplay scenarios.

## Local browser

- Actual default first grab: Cocoa Bear, 94% grip, added once to shelf.
- Native coordinate tap on front frog, grab and optional SQUEEZE: Pistachio Frog, 100%, second distinct collectible.
- Paused images compared byte-identical. Refresh in a paused closing/lift sequence resumed paused, then completed the same frog reward.
- Actual third new grab: Mochi Cat, 96%, third distinct collectible. Mint cabinet finish became selectable and recolored actual enamel geometry.
- Actual collection thumbnails use bin geometry; silhouettes, inspection, result/back-to-shelf/again flow were inspected.
- 320×568, 390×844, 844×390 browser viewports: no page overflow; visible buttons at least 44×44. Resize screenshot must be taken after the resize handler updates the canvas; a premature compositor frame is not used as evidence of final layout.
- Corrected a real result-event type overwrite before delivery, and added a regression assertion for the UI's prize event. Also adjusted phone camera framing and sign text width, lowered washed-out lighting, added visible reticle guidance and explicit carriage approach instead of a teleport.

## Limits

Physical handset testing and sustained hardware FPS certification were unavailable. WebGL is required. The simple spherical pile colliders are an approximation; no cloth deformation or fully articulated rigid-body physics claim is made. No claim of identical source/assets or pixel-perfect parity with the reference is made. The full independent source is included.

Public file/ZIP integrity and a cold public play-through are checked separately before final delivery.
