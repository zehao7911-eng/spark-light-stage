# Thimbleguard — source and adaptation notice

This game includes a substantial, selected JavaScript port of the rule tier of **Ending** by **Aaron Steed (robotacid.com)**, obtained through the imported Awesome Open Source Games reference skill.

Official source: https://github.com/st33d/Ending

Inspected revision: `ebb2b276bc4d0665cbce0f14a14f0b71be53a272`.

The repository distributes Ending under the GNU General Public License version2. This derivative is distributed as **GPL-2.0-only**, with editable corresponding source, build instructions and full license text. The upstream author's attribution is retained. Modified/ported:2026-10-25. VT323 remains under its separate SIL Open Font License (`FONT-OFL.txt`). Original generated art is included with this GPL game distribution.

## What is actually reused

`src/ending-core.js` ports the directional bitfield map from Room.as and selected LevelData.as mechanics: empty/blocked checks, directional danger checks, transient flag flushing, swapping, movement/turn-before-move/adjacent attacks, recursive bomb explosions and removal, breadth-first path propagation and nearest-first entity processing. Compass ordering and direction-memory bits are retained. These routines decide every real move, collision, enemy action and explosion in the browser game; this is not merely an attribution to an unused utility.

Original unmodified reference files are included in `upstream/Room.as`, `upstream/LevelData.as`, `upstream/XorRandom.as`. XorRandom is reference-only and is not used by the browser runtime. The selected port is not the entire original game, Flash runtime, renderer or room generator.

## Modifications and new code

- Unified the four repeated directional collision branches into a compass-driven implementation.
- Omitted original infinite-room generation, hunger/food clock, ending/displacement, virus/generator behavior, ally chains and push-wall mechanics. The authored rooms use the supported player, turner, mover, trap, bomb and stone properties.
- Replaced instant player death with hearts, per-turn damage cap, guards and wards. Explosion recursion has explicit visited tracking. Actors cannot move without a committed player action.
- Added twelve original6×6 layouts, optional crystals, awake-gate victory, exact snapshots and free turn undo. The maps are not copied from Ending's levels.json.
- Added Dash, Pulse, eight multi-level curiosities, gift choices, banked/unbanked rewards, next-garden forge purchases, local progression and bounded worker-based route hints. Hints seek a surviving route, not necessarily all crystals or a no-damage optimum.
- Added original pixel character/environment assets, code-authored tile materials, all-English HTML interface, responsive portrait/compact-landscape layouts, synthesized sound, reduced-motion behavior and accessibility labels.

No upstream game images, audio, Adobe JSON code, Flash executable, preloaders, analytics, donation scripts or commercial game assets are included. The reference AS3 files import original architecture types but are not a build dependency; the corresponding JavaScript source and esbuild script fully rebuild this playable derivative.

Skill catalog inclusion and automated tests are not a guarantee of absence of bugs or certification on every physical phone.
