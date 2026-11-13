# Browser QA

Executed 2026-10-24 in the native in-app browser against the actual HTML game. These are viewport tests, not a physical iPhone or Android performance benchmark.

## Functional checks

- Opened the first-run guide and entered the workshop.
- Wound the first broken route; it stopped and highlighted the gap without consuming a life or currency.
- Turned the incorrect track once; the marble reached both bells and the exit. The game awarded 55 brass and three stars, then enabled Next Repair.
- Bought Tracing Lens for 55 brass. Reload preserved the purchase, completed repair, corrected track orientations and zero remaining balance.
- Completed repairs 2 through 6 using the actual track buttons. Each yielded 55 brass once, progressing through distinct routes.
- Repair 6 expanded to 5 by 5 and introduced a disabled fixed piece with visible screws.
- Completing repair 6 opened the enlarged Wren in a Teacup collectible reveal. Played its song and returned to the bench.
- Opened the cabinet: six completed repairs, 18 stars, Wren restored, five other objects not yet restored.
- Continued to repair 7. The header and preview changed to The Little Carousel.

## Responsive checks

- Desktop full workbench: the original desk, shelves, tools, plaque and lamp remain visible around the playable mechanism.
- 390 by 844 portrait: dedicated close camera, header miniature, engraved plaque and full repair board; primary controls below the board, no horizontal overflow.
- 320 by 568 portrait, 5 by 5 board: narrowed camera; measured tile approximately 44.5 by 44.7 CSS pixels; primary buttons 46 CSS pixels tall. Page scroll is intentional on short screens. Document width 305 including its vertical scrollbar, within the 320-pixel viewport.
- 844 by 390 landscape, 5 by 5 board: square camera and separate sticky right control rail; measured tile approximately 46 by 46 CSS pixels. No horizontal overflow. Vertical scrolling retains usable controls.

## Automated checks

- 1,200 deterministic generated boards solved using their internally generated routes. All routes were adjacent and unique; bell counts and order matched; bridges and fixed tracks traversed correctly.
- Verified one-time settlement, hint-assisted stars, progression, tool purchase limits, insufficient-funds handling, orientation persistence, invalid-save rejection and restore round trips.
- PNG to WebP conversion was lossless at decoded pixel level for both masters; atlas alpha preserved.
- English-only authored UI, local dependencies, finite loading timeout and retry, hidden-tab pause, reduced motion and page-exit saving checked.

Physical-device frame rate and audio output latency were not measured. Replayable melodies use synthesized Web Audio, and browser sound may require an initial gesture.
