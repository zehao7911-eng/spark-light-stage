# Third-party notices and adaptation record

This game uses code from **skifree.js** by Daniel Hough: https://github.com/basicallydan/skifree.js at commit `a812f944f7420ab53374b6b983ef3eb54f8a26ce`, licensed MIT, Copyright (C) 2013 Daniel Hough. The complete required notice is retained in LICENSE. Original selected files are preserved byte-for-byte in upstream/. Modified versions in src/core/ retain actual movement, directional bands, easing, jumping, boosting, collision and recovery responsibilities.

Changes: CommonJS adaptation for bundling, simulation-time timers replacing wall-clock jump/boost/recovery/spin callbacks, removal of navigator mutation and vibration, safe zero canvas coordinates, full AABB containment detection, clamped speed easing, and tuned movement/cooldown constants. New course, progression, saving, input, feedback and rendering layers live in src/model.js, src/app.js and src/render.js. Tall obstacles retain both ground and airborne altitude occupancy.

No upstream sprites, commercial SkiFree assets, executables or third-party audio are redistributed. Catalog inclusion was used for discovery, not as a blanket asset license or quality guarantee. VT323 is unmodified and accompanied by FONT-OFL.txt. Original art provenance is in ART-SOURCE.md. New code is distributed under the same MIT terms in LICENSE.
