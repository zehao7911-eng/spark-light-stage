# SUNSPROUT validation

Validated on 2026-10-31 (Asia/Shanghai).

## Deterministic model and renderer geometry

`node tests.cjs`: PASS, **112,230 assertions**. An independent rigid-body AABB oracle checks the discrete roll against geometric ninety-degree rotation. Every legal pose/direction on the twelve maps is checked for footprint validity, inverse moves and grounded intermediate cuboid vertices. Solvable poses are solved and played through. The model suite also checks shortest original routes, pending-roll save round trips, auto rescue, sticky assisted Undo, malformed saves, seven complete art prompts and non-overlapping in-bounds material/flower crops.

## Actual UI campaign

All twelve gardens were played with real direction-button input: **1, 3, 5, 6, 8, 9, 10, 12, 13, 15, 17, 19** rolls. Total **118 rolls**, all twelve flowers, 36 best stars, no rescue required. All three illustrated settings and all twelve flower rewards appear in this flow. Replaying the first garden preserves 36 best stars rather than adding more.

## Additional interaction checks

- An unsafe east roll on garden 12 automatically restores `5,6,0`, with moves 0 and rescues 1.
- The next westward/northwest roll was paused mid-animation, the page reloaded and the paused welcome state resumed. It committed exactly once to `3,6,1`, moves 1, rescues 1.
- Guide solves that current lying pose. Undo restores the starting pose while keeping the assisted flag and rescue count.
- Keyboard movement / U Undo, short cancelled drags, and an actual diagonal swipe were checked against the same expected pose.
- Gentle mode and earned lilac edging persist across refresh.
- The final opening replay took approximately **1,597 ms** from direction input to complete flower reward panel. This measurement is a browser automation observation, not a guarantee for every phone/network.
- Portrait 390×844, small portrait 320×568 and landscape 844×390 layouts were inspected for overflow, readable controls and preserved board aspect ratio. Direction controls measured at least 46 CSS pixels high in small portrait and 48 high in landscape; final UI gives auxiliary controls at least 44-pixel hit areas too.
- Browser console showed no warnings or errors across campaign and follow-up tests.

## Scope and limitations

Physical iPhone/Android hardware was not available for certification. Haptics and autoplay restrictions vary by browser. Audio is gesture-gated; state and muted sound behave independently. Saving is local to the browser/device. Image-request failure has a procedural fallback; HTTP(S) is the supported hosting mode. Twelve boards and twelve flowers are the complete content of this release. No platform S-rating or commercial-game equivalence is claimed.

The published runtime and commit-pinned ZIP are verified separately against frozen local source; ZIP CRC, safe extraction and tests from the extracted copy are checked before delivery. Publication evidence lives outside the runtime folder so the archive remains reproducible.
