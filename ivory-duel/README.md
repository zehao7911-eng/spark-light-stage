# Ivory Duel

An independently implemented, close mechanical interpretation of Rezona Cooler Chess: standard 8x8 chess, ivory/red armies on a floating dark stage, legal target dots, computer opponent, capture camera and cinematic piece clashes. Tap a white piece then a marked square. Undo reverts a full turn. View rotates the stage. Four quick capture lessons provide a direct first duel; the main board uses standard chess.

Reference: https://rezona.ai/game/pgcserver/pv/FJtfHXoZ/v7/dist/index.html . Actually opened and played e4; inspected original warrior models, void stage, legal dot and move log. No reference capture was verified. No reference models, textures, code or audio are redistributed. Models here are original procedural sculpted chess warriors and are visibly simpler than the reference's imported detailed armies; this is not a pixel-identical clone. No generated promotional image substitutes for gameplay.

Chess.js1.4.0 (BSD-2-Clause) is bundled from its official npm registry package. Three.js r147 (MIT) is bundled locally. Licenses are included. Core chess rules, all four promotion choices, en passant, castling, checkmate and draw states use chess.js. The small two-ply bounded computer is intended for casual play, not rated engine strength. It never takes an illegal move. Quick lessons end after one White capture; they are not full matches.

All UI is English. Native pointer/touch and keyboard-accessible square buttons are supported. No account/CDN/API is required. Web Audio starts after interaction. Blur/hidden pages pause; local storage saves initial position and SAN history, muted setting and local win/duel/lesson records. Reload resumes paused at the completed logical position; a partial cinematic is not replayed. Clearing storage loses local records. No timer, payment or real-world reward.

Serve this folder over HTTP. Run `node tests.cjs` for rule integration checks. Browser phone-sized tests are not physical-handset certification. Camera movement is reduced under prefers-reduced-motion. Bounded effects and DPR1.5 cap are used. Actual realtime procedural geometry, not commercial game assets or identical imported warriors.
