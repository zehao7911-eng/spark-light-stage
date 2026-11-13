# Source and adaptation notice

Bramblepost · A Little Further is an original browser game. It includes a substantial adaptation of **match-three-js** by Playtester's Kitchen (Andrew Yurisich and Ryan Casperson), copyright (c) 2016, MIT License.

- Official upstream: https://github.com/PlaytestersKitchen/match-three-js
- Inspected revision: `2b86ad069d8b8f7c9e3cd95900b632c3ae46bd31`
- Upstream original source is included in `upstream/`; upstream README and package manifest were inspected before adaptation. The skill catalog was a discovery aid; this external source was selected after inspecting its complete implementation and license.
- Adapted runtime source lives in `src/core/`. The original board, triple scan, board walking, matching, match metadata, marking, column gravity, attic refill, and swapping structure is retained. The gameplay controller calls that matching/gravity/refill pipeline for every cascade.
- Replaced Lodash and collections with native equivalents; no obsolete upstream dependencies or build scripts were installed or executed.
- Added deterministic RNG routing and rectangular-board guards. Replaced recursive shuffling/unmatching with bounded playable-board generation. Replaced the upstream potential-match heuristic with exhaustive adjacent-swap checks. Fixed aliasing in gravity, rectangular blank counts and transitive overlap merging. Added row/column cyclic shifts, finite cascade protection, exact snapshots, orders, stock, upgrades, companions and progression in original controller code.

The full upstream MIT license is distributed as `LICENSE`. This notice is retained alongside editable source and in the JavaScript bundle banner.

The Steam game **You Must Build A Boat** is a gameplay reference for row/column sliding and collecting matched resources. Its official Steam description was consulted: https://store.steampowered.com/app/290890/You_Must_Build_A_Boat/ . No commercial game art, code, characters, UI, logo, music or sound is distributed. This browser game has its own setting and order-delivery loop and does not reproduce the commercial game's complete content.

The original background and supply sprite atlas were generated using the built-in image generation tool; exact prompts and filenames are in `ART-SOURCE.md`. Portraits, interface, motion, square particles and synthesized sound are original code. VT323 by Peter Hull is supplied unmodified under the SIL Open Font License (`FONT-OFL.txt`).

Catalog inclusion, source reuse and tests do not guarantee error-free behavior or certification on all physical phones.
