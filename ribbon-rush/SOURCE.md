# Source provenance

Original complete game: COLOR ROLL by ABA Games, Copyright2021, MIT.
Official repository: https://github.com/abagames/crisp-game-lib-games
Pinned commit: cfb39d2f988feb5918eb83697145b5a35adabf58
Path: docs/colorroll/main.js
Original bytes preserved in upstream/colorroll.js. SHA256 recorded in upstream/manifest.json. Full required MIT notice in LICENSE-ABA.txt; new code/art is also MIT, LICENSE.txt.

The installed open-source-game-reference catalog's 111-one-button-games entry led to the official game repository. This is a compact but complete game, not all111games or a commercial game.

## Actual complete source used

All original declarations and the full update loop, including nested addLane and addBars, are retained and adapted. The actual frame loop calls this update() at60Hz. It retains: tap-created beam, upward travel, initial color selection, color-continuation/mismatch checks, wrapped moving segments, row smoothing and pressure, exponential multiplier/baseMultiplier, complete-batch progression and row refill, escalating row counts, randomized inherited palettes and widths, score and bottom-line loss.

Local rnd/rndi/rnds, wrap/clamp, times/remove, color/rect collision and sound/score/end callbacks supply the required original engine-facing API. Original library BGM/replay flags remain provenance declarations but are replaced by new controls/audio/save; crisp-game-lib itself is not bundled.

## Explicit changes

- Original laneHeight7 ->9, initial/reset laneCount2 ->4 and maximum count10 ->9, improving phone-sized ribbon readability while keeping them below the bottom safety line.
- Source pressure drift .005 ->.012. Pressure responds to the original shot penalty and chain-removal rules.
- Inactive black resting-beam stub is excluded from the compatibility collision cache. Otherwise its source drawing rectangle can inadvertently eliminate a row without a shot before the loss test; idle now genuinely loses to pressure.
- Added seeded finite order goals, source-based Endless Shift, best-star/score/cosmetic progression, exact snapshots/validation, mobile input and pause.
- Added cut/batch/mismatch event metadata to the existing source removal branches for new visuals and sound. Original color matching and exponential score remain.
- Rectangles normalize negative dimensions and query earlier same-frame draw rectangles, matching the source draw/collision contract. This is actual gameplay collision, not an approximate renderer-only imitation.

No videos or commercial game assets were copied. Artwork and sound effects are original code-authored assets. No AI image generation used.
