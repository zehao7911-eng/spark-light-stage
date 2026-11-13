# Puffin Peaks · One More Run

A compact, original, English-language pixel skiing game for mobile and desktop browsers. Drag across the snow or use three large lane buttons. Pass flags, collect snowflakes, use ramps, and carve close to obstacles for feedback and rewards. Mistakes slow you down rather than removing lives.

Finish short runs to bank coins and best medals. Three medals unlock Hop and aerial spins; seven unlock Boost. Four equipment lines each have three upgrades with physical effects. Eight named routes cycle with new deterministic layouts and three palettes; gate density and speed increase to capped values. These are procedural courses, not eight separate authored worlds. Replaying a hill improves its best medals and earns fresh run coins.

## Play / build

Serve this folder over HTTP (for example `python -m http.server 8000`) and open index.html. All runtime assets are local; no CDN, accounts, telemetry or network calls are needed after load. File-URL behavior varies by browser, so use a local server or static hosting.

To rebuild: install Node.js, run `pnpm install --frozen-lockfile`, `pnpm test`, then `pnpm build`. The generated game.js is included. Tests exercise actual movement, collision, course traversal, saves, rewards and equipment, not a separate mock.

Keyboard: A/D or arrows steer, Down/S brakes, Space hops/spins, F boosts, Escape pauses. On touch, drag to aim, or tap lanes; hold Brake. Touch controls are at least 44 CSS pixels. Portrait and compact landscape layouts are provided. Sound is optional and starts only after user input. Hidden tabs pause. Progress is saved locally, including active run timers; storage failures are handled without a network account. Clearing browser storage removes progress.

## Source and limits

Real MIT-licensed Skier/Sprite classes from skifree.js drive the simulation; see NOTICE.md, upstream/ and src/core/. Gameplay inspiration: SNØ: Ultimate Freeriding's readable short downhill runs and proximity lines; no SNØ code, art or branded content is included. Original generated pixel art and original synthesized effects are used. See ART-SOURCE.md, BROWSER-QA.md and test-report.txt. Browser viewport checks do not certify every physical phone.
