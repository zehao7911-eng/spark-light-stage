# Browser QA

Playtested through actual browser controls in the in-app Chromium browser. No game-state debug APIs or hidden-board browser inspection was used.

- Began as Wayfinder on a 390 × 844 viewport. First click at C4 opened 22 safe stones, found three treasures and increased gold from 20 to 37; Guidelight recharged from 3 to 4.
- Reload restored that exact open board and wallet.
- From visible clues inferred D1, C2, D6 and A4 as wisps. Used Banish at D1: one charge consumed, Health stayed at 8, and only that wisp was revealed and marked.
- Switched to Mark and marked C2 and D6 rapidly; both inputs registered. Marking has no animation lock.
- Used numbered-stone chording at D2, C1 and B2, marked A4, then chorded B5. Cleared all 32 safe stones without taking damage.
- Clear wallet: 50 gold, 1 stardust. Reload before choosing a relic preserved the same reward selection without duplicating currency.
- Chose Pearl Shell; next chamber had one Ward, the satchel contained one relic and Health stayed at 8.
- A narrow 320 × 740 viewport was inspected. Interactive cells and header/mode buttons were at least 44 × 44; ability buttons were at least 87 × 48. Narrow frame padding was adjusted to keep square cells aligned. Vertical scrolling remains available.
- The 390 × 844 layout shows the board, progress and abilities in the main play area; footer/help can extend below the fold. Deeper 8-row boards may need vertical scrolling.

Automated verification: 21 tests passed, including 120 proven generated boards across the campaign and 45 complete-campaign chamber clears. Source, hosted files, ZIP and the public game's visible behaviour are checked separately in the delivery log.

Viewport checks are not physical-device certification. Touch-and-hold is implemented with movement cancellation, but physical touchscreen long-press timing has not been hardware-certified. Explore/Mark buttons provide an alternative to gestures.

- After the narrow-padding correction, a 320 px viewport had client/document width 305, grid width 279, cell width 44, last-column edge 292 and frame edge 297: the last column stays inside the frame.
- 844 × 390 landscape was checked with vertically scrollable content.
