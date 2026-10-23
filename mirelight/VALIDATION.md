# Validation — 2026-10-23

## Production asset checks

`qa_art.py` checks all PNGs against the single 32-colour palette, binary alpha edges, exact wide-to-close crop identity, exact integer review enlargement, atlas sizes and nonempty character cells, six-frame GIF palette membership, dusk-only index remapping, manifest hashes/anchors, local resource paths, changing action poses and renderer palette agreement. These verify production constraints, not subjective commercial art quality.

## Actual browser review

- Visually inspected the original wide scene, exact close view, direction board, character samples and interface mockup.
- Completed all three bells through ordinary native browser input: approach, contact, answered state and the final district message.
- Inspected the corrected character/target spacing; Tamsin is separate from the high bell and Iona starts beside the middle bell.
- Tested the near and dusk controls. Completed a separate middle-bell action in the 390 × 844 portrait scene after spacing corrections.
- Paused the study and compared simulation time after 900 ms: exactly unchanged.
- Selected the lantern in the native inventory sample and confirmed its name, description and focused state.
- All five presentation sections checked at 320 × 568, 390 × 844 and 844 × 390: no horizontal document overflow and visible button dimensions at least 44 × 44 CSS pixels.
- Captured browser console after interaction and navigation: no page errors or warnings.

The browser's read-only DOM interface does not expose the canvas rendering context, so no runtime canvas colour readback is claimed. PNG palette checks are direct image-byte tests; renderer colours and integer coordinates were inspected in source. Physical phone tests and exact screen-capture colour under display scaling are not claimed.
