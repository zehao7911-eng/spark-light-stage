# MOTHMARK / The Nocturne Archive

A complete, original HTML5 pixel-card game. Match sigils, welcome luminous moths, and build a living museum over twelve nights, with endless nights after the ending.

## Play

1. Tap a tool with the same sigil as a visitor: Glow, Scent or Moon.
2. Fill a visitor's sigils to archive it. New discoveries add a permanent album entry and bonus gold.
3. Reach the visitor goal, then finish the night or stay for extra rewards.
4. Upgrade your tools between nights. New nights introduce new specimens, tools and reward events.

Tap a moth to select it. If a tool only matches the other moth, it helps that moth automatically. There is no reaction timer. Each night has a tool-play budget. Discoveries and gold are retained even after an incomplete night.

## Content

- 12 originally drawn species, with new visitors through Night 12.
- 6 tools: Lantern, Herbs, Lens, wildcard Field Jar, two-visitor Duskkeep, and Moon Seal.
- 4 permanent upgrade tracks with 4 levels each; the first purchase already changes its effect.
- 4 rotating reward events: Dew, Pollen, Moonrise and Lantern Fair.
- A persistent living album, discovery bonuses, capture rewards, night summaries and the twelve-night ending.
- Endless nights after the ending, with higher collection goals capped at six visitors per night.
- Native pixel animations, discrete particle bursts, soft synthesized sound and mute control.
- English interface, keyboard-accessible controls, reduced-motion support and no external dependencies.

## Phone and save support

The 160 x 254px native table displays at exact 2x on phones and 3x on larger screens. Main tool targets are 96 x 104 CSS px at 2x. Both portrait and landscape layouts are supported; short landscape screens can scroll. Gameplay stops when you stop touching the table and never advances while hidden.

Progress is saved after each action in this browser on this device. No account or personal information is used. If browser storage is unavailable, the game remains playable and shows a notice. Clearing browser data removes local progress. Sound starts only after a user interaction. The help panel contains an explicit two-step fresh-start option.

## Run and publish

Serve this directory with any static HTTP server. For example: `python -m http.server 50241 --bind 127.0.0.1`, then open `http://127.0.0.1:50241/`.

For GitHub Pages, publish the entire `mothmark` directory and open its directory URL. All game resources use relative local paths. The ZIP has `index.html` at its root so it can also be imported as an HTML5 package.

## Source and checks

- `rules.js`: pure game rules, seeded encounters, upgrades and save validation.
- `game.js`, `game.css`, `index.html`: browser presentation, input and synthesized audio.
- `test-rules.cjs`: Node tests over 60 seeded campaigns, save roundtrips, upgrade mechanics and deadlock prevention.
- `build_art.py`: original refined card-art family.
- `build_game_art.py`: rebuilds the family and adds twelve specimens, animated atlases, tools and game UI samples. Requires Python + Pillow.
- `qa_art.py`, `qa_game.py`: native-pixel, palette, atlas, local-link and packaging checks.
- `art-book.html`: preserved interactive art direction sample.
- `ART-DIRECTION.md`: the construction rules for extending this original world.

Rebuild art: `python build_game_art.py`.
Validate: `node test-rules.cjs`, `python qa_art.py`, `python qa_game.py`.

All artwork, characters and visual arrangements are original to this project. No third-party game artwork, logos, fonts, SDKs, analytics or CDN scripts are bundled.
