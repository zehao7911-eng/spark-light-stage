# Seatmates Express

An original, cozy seating-logic game inspired by the preference-matching idea in Is This Seat Taken? (Poti Poti Studio): https://store.steampowered.com/app/3035120/Is_This_Seat_Taken/
All illustrations, code, characters, puzzles and synthesized sound are original. No commercial assets or external dependencies.

## Play
Open index.html in a modern browser, or serve this folder over HTTP. Tap a passenger and a seat; drag to exchange seats. The two seats on each side of the aisle form a pair. Windows are seats 1,4,5,8. Front seats are 1–4. Back seats are 5–8. Friends need the same pair. Quiet guests avoid musicians beside them or directly in front/behind them (never across the aisle). Personal-space guests need the other seat in their pair empty. Tap any passenger for explicit English wishes and status. Music lovers wear headphones.

18 solvable departures across a meadow bus, sunset train and moonlit ferry. Later departures combine more wishes and fill the carriage. Automatic departure when all guests are happy. Three stars require zero hints and no more than passenger count + 2 moves; two stars allow one hint and up to passenger count + 8 moves. At least one star is always earned. Best stars and three route-completion stamps persist. Replay any unlocked trip through the journal. No timer, no monetary purchases, no network requests, no repeated reward currency.

Undo is unlimited; undo counts as a move. Returning a guest to the platform counts as a move. A hint computes a valid full solution closest to the current arrangement and makes one seat exchange toward it. Optional audio begins only after input. Z = undo; H = hint; Escape = close help/journal. All invisible canvas targets are real focusable, named buttons for keyboard controls.

## Engineering
Canvas 2D, capped 40 FPS, DPR capped at 1.5, maximum 8 guests and short-lived particles. Portrait and landscape layouts, pointer-cancel recovery, storage-denied fallback, reduced-motion support, tab-hidden animation suspension. Saves include mid-puzzle positions, undo history, hint count and best ratings. Corrupt state is rejected rather than used. Files are self-contained and ZIP has index.html at its root.

## Validation
All 18 departures were completed through browser buttons, including four-to-five and seven-to-eight passenger transitions. Solver/witness consistency and hint convergence pass for all 18 boards and 60 additional generator seeds. Swap, return to platform, undo, keyboard Enter, hint-assisted completion, best-rating retention and exact mid-puzzle reload were exercised. Six viewport sizes from 320x667 to 1280x720, including 667x375 and 844x390 landscape, have no page overflow; every gameplay target remains in view and at least 44 CSS pixels in each dimension. Native mouse dragging was checked. These are browser viewport tests, not a physical-phone or native-touch certification.
