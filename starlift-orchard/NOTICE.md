# Source reuse / MIT notice

Actual physics adapted from **TR BEAM** in ABA Games' crisp-game-lib-games, MIT, Copyright (c) 2021 ABA Games. Repository: https://github.com/abagames/crisp-game-lib-games at inspected commit `cfb39d2f988feb5918eb83697145b5a35adabf58`. Source: docs/trbeam/main.js, preserved unmodified in upstream/trbeam.js. The full required license is retained in LICENSE.

Discovered through the imported Awesome Open Source Games catalog entry “111 one-button games”, which links to https://github.com/abagames/111-one-button-games-in-2021 . That entry is a link catalog, not the game runtime. The linked original repository, code and license were inspected separately. Catalog membership is not a quality or compatibility guarantee.

src/tractor.js ports the actual sine sweep, beam growth/release decay, gravity and drag branches, radius-based pair separation, pull vector plus horizontal spring, release damping and ×5 horizontal fling, boundary purification, missed upper-airlock conversion and offscreen cleanup. Crisp Vector calls become numeric objects; engine drawing-collision checks become explicit circle/beam geometry. Coincident-body separation receives a deterministic direction instead of an undefined angle. None of the Crisp renderer/library, sprite strings, generated music, recordings or branded art is imported.

src/model.js wraps those routines every 1/60 second with bounded catch-up, seedable fruit spawning, drag steering, hearts/recovery grace, short flights, quota, best medals, pulse, new fruit types, physical equipment upgrades and saves. src/app.js/render.js supply the new UI and art layer. Starting batch size, fruit radius, ship height and hazard frequency are tuned for mobile. The original instantaneous death is replaced by hearts; rendering and all presentation assets are new.

New code is distributed under the same MIT terms. Unmodified VT323 is separately licensed under FONT-OFL.txt. See ART-SOURCE.md for original generated imagery and code-native effects.
