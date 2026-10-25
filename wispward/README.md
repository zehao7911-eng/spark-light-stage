# Wispward · Lanterns Below

A complete English HTML5 proximity-puzzle roguelite: uncover safe stones, read the numbers, mark hidden wisps and build a satchel of curiosities. There is no timer.

**Play:** https://zehao7911-eng.github.io/spark-light-stage/wispward/

## Controls and rules

- Tap a stone in **Explore** mode. The number counts wisps in all eight neighbouring stones, including diagonals. A blank stone has zero neighbouring wisps and opens a connected region.
- **Mark** mode toggles markers. Right-click and touch-and-hold are also implemented. Marks do not certify correctness. An incorrectly marked chord may uncover a wisp.
- Tap a revealed number when the matching number of adjacent wisps is marked to uncover its other neighbours. Resolved wisps also count as marks; their original clue numbers remain valid.
- **Guidelight** opens a guaranteed safe stone. Charges regenerate from safe exploration. The first step is free and always has a safe 3×3 area.
- **Banish** safely resolves one chosen stone. **Potion** restores 3 Health. Wards block an encounter; otherwise an uncovered wisp usually costs 2 Health (3 in the final region).
- Reveal every non-wisp stone to clear a chamber. Each revealed safe stone and treasure pays only once.
- Choose a relic after each clear. The market appears after every third chamber. Stardust and discovered relics persist across runs and unlock permanent improvements and explorers.

## Content

- A 15-chamber journey with 3 region palettes and gates at 5, 10 and 15. One original illustrated conservatory setting frames the whole adventure.
- Seeded 6-column boards, growing from 6 to 8 rows; generated layouts are proven solvable from the selected first step using visible-clue deduction and subset constraints. A bounded density fallback is used if no proof is found at the requested density.
- 18 relics with actual effects, 3 explorers, 5 chamber modifiers, 3 permanent upgrades with 3 levels each, healing, markets, treasure discovery and local saves.
- Mouse/keyboard and touch-oriented controls. The smallest tested buttons/cells are 44 px. Narrow and short screens can scroll vertically.
- Chain-reveal ripples, pixel fragments, treasure pop-ups, wisp reactions, optional synthesized audio, reduced-motion support and art-independent startup.
- Completed journeys may be replayed with fresh layouts; later completed-run counts gradually increase requested wisp density. The game is a finite 15-chamber campaign with replay progression, not an unlimited sequence of newly authored biomes.

## References and real source reuse

Design reference: [DemonCrawl on Steam](https://store.steampowered.com/app/1141220/DemonCrawl/) by Therefore Games, specifically its combination of proximity puzzles, survivable mistakes and run-changing items. This build has its own art, content and progression, not that game's 1,000-item catalogue or commercial assets.

Licensed implementation foundation: [GoogleChromeLabs/PROXX](https://github.com/GoogleChromeLabs/proxx), revision `c6c155898886a7eb01f960816a16a93a4a5c2c63`, Apache-2.0. The complete core engine's placement, neighbour counts, flood reveal, marking, chording, state-change batching and win/loss rules are adapted in `src/core/`; this is substantive rule-engine reuse, not an incidental helper. The untouched source files are supplied in `upstream/` for comparison. The Google repository was archived when audited; no ongoing maintenance claim is made.

See [NOTICE.md](NOTICE.md), [LICENSE](LICENSE), [FONT-OFL.txt](FONT-OFL.txt), [ART-SOURCE.md](ART-SOURCE.md) and [BROWSER-QA.md](BROWSER-QA.md).

## Build and run

The shipped `game.js` is bundled, with no runtime packages, accounts, CDN, remote API, analytics, service worker or special hosting headers. Serve this folder with any static server, for example:

```sh
python -m http.server 8080
```

Open `http://localhost:8080/`. For source changes, use Node 22+ and pnpm 11+:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm run build
```

Tests use Node's built-in test runner; esbuild is the only development dependency. The ZIP contains the compiled game, preferred source, build file, lockfile, tests, original upstream files and assets. Saves stay in browser storage under unique Wispward keys. Clearing browser data also clears that profile. Audio requires an explicit user gesture.

## Validation

21 automated tests passed. The property checks include 60 first-click/number-count boards, 120 generated boards across all 15 chamber sizes/densities, and 3 complete 15-chamber campaigns solved from visible clues with no hints or damage cheats. The 120-board audit needed 215 candidates and no density fallback. This sample is evidence of the tested cases, not a mathematical guarantee of every possible browser/device.

The solver is used to reject unproven generated layouts; it does not secretly select the player's moves. Guidelight explicitly uses an ability to reveal a safe stone. First-visit artwork is approximately 4 MB and loads independently from the rules and code-drawn board. A blocked art download does not trap play behind an indefinite loading overlay.
