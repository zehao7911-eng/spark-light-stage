# SHELLSONG validation

Validation date: 2026-10-31 (Asia/Shanghai).

## Model

`node tests.cjs`: PASS, 155,848 assertions. The random-board suite compares each legal move to an independently implemented seven-slot sowing oracle. It checks pearl conservation through every sampled airborne frame, all fixed-board shortest paths, non-optimal opening deviations with newly solved hints, undo and sticky assisted scoring, pending-animation round trips, malformed saves, unique boards, monotone pars and complete in-bounds sprite crops. Twelve optimal routes total 106 turns.

## Actual browser play

All twelve tides were played through the shipped UI with real shell-button input. Results: 1, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 14 turns; all pearls banked on every board; 12 keepsakes; 36 best stars. All three backgrounds and all twelve reward artworks appear in the real flow.

Additional checks passed:

- Dragging a shell to an empty part of the board cancels without a move or pearl change.
- A non-optimal first move on tide 12 is followed by Guide solving the actual new board. Undo restores its previous configuration while preserving assisted status.
- A four-pearl pour was paused during distribution, the tab reloaded, the paused welcome state resumed, and exactly one complete move committed. Expected resulting pits `3,1,2,0,3,2`, bank 1, moves 1.
- Completing/replaying preserves maximum star counts rather than adding stars or repeated keepsakes.
- Gentle mode and earned lavender ribbon survive refresh and visibly change rendering.
- Live help, Escape, keyboard selection, U undo, per-shell accessible labels and dialog focus containment work.
- Mobile viewport 390×844, small portrait 320×568, and landscape 844×390 show no document overflow. At 320×568 shell targets measured about 61×57 CSS pixels; at 844×390 about 54×50 pixels. The board preserves its 360:500 aspect ratio.
- The browser console showed no warning or error during the complete campaign and follow-up input/restore checks.

Browser viewport checks are not physical iPhone/Android device certification. Sound autoplay restrictions and haptics remain browser-dependent; no gesture means no audio. Graphics are Canvas 2D; no WebGL capability is required. A failed art request leaves playable fallback objects. This is a twelve-board release, not an unlimited-content or commercial S-rating claim.

## Delivery

The game-only ZIP has a root `index.html`, relative assets, source, tests, exact art prompts and a deterministic build script. Publication verification is recorded outside this runtime folder: public HTTP(S) files are checked against the local frozen source, and the commit-pinned ZIP is downloaded, byte-compared, CRC-checked, safely extracted and its tests run again. No network dependency is required after the included files are served.
