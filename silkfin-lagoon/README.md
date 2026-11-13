# Silkfin Lagoon

A complete browser game built on The Pond's open-source runtime fish, particle and streaming-zone simulation. Hold the water to swim. Small circle-marked fish become color ribbons inside your growing koi; avoid large triangle-marked fish and surge past them. Six waterways, three palettes, persistent medals, three two-step gear tracks, and two unlockable coats form a finite replayable campaign with an ending.

The first waterway introduces feeding without dangerous fish. Later waterways progressively allow one to three large fish. CHIME opens at waterway 3. New coats unlock at 6 and 12 medals. There is no countdown or real-money economy.

## Run and controls

Serve this directory with a static HTTP server and open index.html, for example `python -m http.server 8000`. No build step, third-party packages, backend, login or CDN is needed. Touch: hold/drag the water to steer toward your finger. Release to decelerate. SURGE gives speed and brief safety, and recharges freely. CHIME turns nearby little fish toward you. Keyboard: arrows/WASD swim, Space surge, E chime, Escape pause.

The scene is drawn on a 180×260 canvas with visible nearest-neighbor pixels. It preserves its aspect ratio on mobile. Sound starts muted. Visibility/blur pauses simulation and releases controls. The first swim input starts each new or restored round. Local storage keeps gear, medals, selected coat and a resumable round snapshot; clearing browser data removes it. Restore retains position, score, fish sizes and colors, and recomputes streaming zones. Random future spawns and exact particle animation are not deterministic across reload.

## Tests

Node.js 22+: `node --test tests/game.test.cjs`. The suite executes the actual Fish physics, six-circle collision, Spawner, Color, input adapter and campaign controller. Canvas methods are stubbed in the test harness; image-to-particle rendering is verified separately in the browser. An input-driven simulation pilot completes all six waterways with live AI and collisions. Other tests isolate rewards, cooldowns, snapshots and the original undefined keyboard flag fix. Browser QA is documented in BROWSER-QA.md. This is not a claim of testing every physical mobile device.

## Source and licensing

The Pond by Zolmeister, Copyright 2013, GPL version 3 or later, revision 68fa8b542bff6c405cce83a6bd433e16e7b4e7f6. All original root JavaScript modules, README and notices are preserved under upstream/. Fish/Color/Particle and zone-streaming Spawner are actual runtime dependencies, not decorative snapshots. The old main/menu/progression/input presentation was replaced; this is not an unmodified executable reskin. See SOURCE-MAP.md, UPSTREAM-NOTICE.txt and the complete GPL LICENSE.

Complete editable source and tests accompany the distribution. New code and code-drawn art are GPL-3.0-or-later. Original logos, sound files, music, platform bindings, tracking/log endpoint, packages and native wrappers are not shipped as runtime assets. VT323 is under separate SIL OFL, see FONT-OFL.txt. Audio is newly synthesized after enabling sound.
