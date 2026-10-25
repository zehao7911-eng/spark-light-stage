# Notices

Wispward includes the complete core Minesweeper game logic of **PROXX**, Copyright 2019 Google Inc., licensed under Apache License 2.0. Upstream author: Surma; contributors named by the project: Jake Archibald, Mariko Kosaka, Paul Kinlan and additional repository contributors.

https://github.com/GoogleChromeLabs/proxx

Audited source revision: `c6c155898886a7eb01f960816a16a93a4a5c2c63`.

The two source files are retained verbatim in `upstream/`. Their adapted versions retain the original copyright/license headers in `src/core/`. Modifications add deterministic random injection, serializable/restorable state, checked coordinates and integer dimensions, exact-flag chording, terminal-state guards, safe banishing, and recoverable wisp encounters. A hit no longer immediately loses when a Wispward Ward or Health allows survival. Chording stops when the board reaches a terminal state.

The new campaign, visible-clue generator validation, solver, progression, inventory, presentation and tests are Wispward additions. No PROXX UI, photographs, font files, textures, audio or Google logos are distributed. This project does not claim to be affiliated with Google or Therefore Games, or to contain DemonCrawl's commercial source or full content.

Font: unmodified VT323 by The VT323 Project Authors / Peter Hull, SIL Open Font License 1.1. See `FONT-OFL.txt`.

Original project illustrations were made with the built-in image generation tool. Exact prompts, final paths and encoding notes are in `ART-SOURCE.md`. Icons, stone textures, number labels and small effects are code-native drawings/styles. They are not extracted commercial game assets.
