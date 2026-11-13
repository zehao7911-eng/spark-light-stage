# BLUE HOUR / Scratch & Discover

A complete original HTML5 scratch-ticket game built around the approved BLUE HOUR pixel-art counter. Free tickets, in-game gold, twelve collectible finds, four packs, phone orders, six upgrade tracks and persistent partial scratching.

## Play

Drag across the six white panels. At 72% cleared, the remaining foil peels away. Each find pays gold and enters the collection. Three or more matching symbols add a ticket bonus. After all six panels are revealed, NEXT TICKET becomes available.

- WORKSHOP: improve Brush, Luck, Speed, Chain, Crate and Glow. Four levels each.
- SPEED: unlocks a once-per-ticket Sweep that clears 1, 2, 3 or 6 panels.
- PHONE: complete untimed requests and claim gold. The phone lights when ready.
- COLLECTION: view finds, gold-frame duplicates, collection badges and ticket packs.
- Packs unlock after 3, 8 and 16 completed tickets. They add new finds and stronger rewards. Choose a pack for your next ticket in Collection.
- Thirty-two tickets celebrate the Master Counter milestone; play continues indefinitely.

Tickets are free. Gold is an in-game score and cannot be bought, cashed out or exchanged. There is no real-money functionality, account, backend, ad or tracking service.

## Phone and accessibility

Portrait mode brings the original ticket close enough to scratch comfortably. Short landscape mode frames the six panels with a separate control rail. Wide screens preserve the original full desk, merchandise shelf, red phone and workshop.

All essential menu controls have at least 44px hit targets. Keyboard users can Tab to any scratch panel and press Enter to reveal it. This is also an alternative to long dragging. Reduced motion removes moving flakes, phone pulsing and the peeling animation. Sound is optional and begins only after interaction.

The current scratch mask, revealed symbols, wallet, inventory, upgrades, orders and selected pack save in browser storage on this device. Gameplay does not advance by itself. If storage is unavailable, the game stays playable and displays a notice.

## Run

Serve this folder over HTTP, for example: `python -m http.server 50242 --bind 127.0.0.1` and open `http://127.0.0.1:50242/`.

For GitHub Pages, publish the complete `blue-hour` folder. All runtime resources use relative local paths. The ZIP has index.html at its root for HTML5-package import. No build step or external engine is needed.

## Source

- `rules.js`: seeded ticket generation, physical scratch-mask coverage, rewards, upgrades, orders, save validation and pack unlocks.
- `game.js`: Canvas rendering, pointer interpolation, coating caches, peel fragments, particles, synthesized sound, responsive camera and panels.
- `game.css`, `index.html`: accessible controls and responsive shell.
- `desk.png`, `items.png`: original generated art masters. `desk.webp`, `items.webp`: pixel-identical lossless runtime encodings.
- `font.json`: original bitmap glyph toolkit used for variable fields on the desk.
- `ART-SOURCE.md`: art paths, generation mode and prompt specifications.
- `test-rules.cjs`: 2,800 simulated tickets over 70 seeds plus scratch, save, settlement, order and upgrade checks.
- `qa.py`: local asset, lossless image, dimension and English-copy checks.

Run checks with `node test-rules.cjs` and `python qa.py` (Python/Pillow for image checks).
