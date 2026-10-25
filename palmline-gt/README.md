# Palmline GT
Run using any static HTTP server. Open index.html. All runtime assets are included; no CDN, analytics, external fonts or network fetch is required.

Meaningful source adaptation: Jake Gordon Javascript Racer (MIT), https://github.com/jakesgordon/javascript-racer . racer-core.js retains Util and Render's polygon/segment code; rules.js adapts addRoad/addSegment, and game.js adapts the projection/culling renderer. Original licensed notice: LICENSE-RACER.txt. Upstream sprites and audio are excluded; all visuals and synthesized sounds are newly created.

Upstream files inspected: common.js SHA256 f2e07bf70605e2f59792ccf18ffef51398371623e5fee55fd20bb346f64fa0f6; v4.final.html SHA256 a70be3caa7eb4fece5ea5ac8c9f6b873ceaba788e142fb909a2c47b8e9db2535.

Controls: arrows/A/D steer, Space turbo, Down/S brake, Esc pause. Mobile has pointer-captured multi-touch buttons. Storage key palmline-gt-v1. Score improvement pays credits; repeated worse runs do not pay again. Three tracks, 3 medals, 5 paints, near misses, overtakes, slipstream and checkpoint time bonuses.

Upstream HEAD verified 2026-10-25: 3e8a060b5900755db27f899612a74a77427c853e.
