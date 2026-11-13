# Crayon Courier

An original compact HTML5 drawing-and-physics puzzle, directionally inspired by [Crayon Physics Deluxe](https://store.steampowered.com/app/26900/Crayon_Physics_Deluxe/). Cream grainy paper, layered pencil scenery, hatch-filled land, brass pins, a little coral ball and golden stars. All illustrations, layouts, dialogue and sound are original code-authored work. No generated images or commercial game assets are included. This is a smaller original browser interpretation, not the complete commercial game.

## Draw a little possibility

**Bridge:** drag from one brass pin to another. Both ends snap with a generous touch tolerance; the resulting solid line stays fixed. You may draw a curve instead of a straight line. **Drop:** draw a closed shape for a solid convex weight, or an open line for a free falling beam. Drawn bodies actually collide with the ball and scenery. Drawn closed shapes use their convex outline; this is not an arbitrary concave shape simulator. **Roll:** releases the ball. The same button becomes **Nudge**, giving it a small rightward impulse when it needs encouragement. Reach the big star. Blue switches can be pressed by the ball or a falling drawing and open the connected blue gate.

Twelve authored pages progress through one and several bridges, descents, a wind zone, a spring launch and remote weighted switches. Four pencil landscapes: woodland, coast, autumn garden and moonlit village. Some later pages combine or vary earlier layouts; there is no claim of unlimited unique levels. No lives or score countdown. An unsuccessful attempt returns you to your existing sketch. If a ball is stranded for 24 seconds, it gently offers another sketch. Return to drawing at any time to adjust things without waiting.

Three medals: completion, collecting the three little stars, and staying within the displayed ink budget without a hint. Using a hint shows a faint possible sketch and marks that attempt as assisted; it never draws or solves for you. Undo/revise preserve hint usage. The book can start a fresh attempt. First clears award three pencils plus their medals; improved replays pay only the medal improvement. Twelve pages pay at most 72 pencils. Sage, blue and lilac ink cost 12/18/24 pencils; owned colours can be switched freely. Finished pages can be exported as actual PNG postcards. Small JPEG previews, best medals, owned colours, mute setting and exact current drawing/physics snapshot save locally. Reload opens Continue; previously awarded wins do not award again.

## Controls

Touch or mouse draws. Space rolls/nudges, Z undoes, R returns to drawing, H hints, B opens the book, P/Escape pauses. Optional keyboard drawing: arrows move the pen, Shift makes finer steps, D starts a stroke, Enter finishes; 1/2 choose Bridge/Drop. Pause and hidden tabs stop physics and silence the audio. A cancelled or second touch discards the unfinished stroke. Buttons have 46px minimum targets; portrait, landscape and safe-area layouts are included.

## Offline / GitHub / HTML5 platforms

Extract the ZIP and open its root `index.html`, or upload the extracted root to static HTML5 hosting. The packaged index inlines every script and style; editing sources are included separately. Matter.js 0.20.0 is bundled under its MIT license (`MATTER-LICENSE.txt`). No CDN, remote fonts, WebGL, accounts, analytics, server API, build tools or service workers. Original synthesized audio starts only after interaction.

Canvas2D renders at up to 30 FPS, DPR capped at 1.5; fixed-step physics runs at 60 Hz. Static paper/scenery is cached, the editor limits drawings to eight with at most 25 simplified vertices each, and trails/particles are bounded. Stable paused pages stop drawing. Restoring physics reconstructs bodies and their recorded positions, angles and velocities; solver contact caches are reconstructed, so long-term floating-point continuation is not promised to be bit-identical.

Validation includes all twelve physics solutions/36 medals, dynamic gate weights, failure, undo, restoration and capped replay rewards; native emulated mobile drawing through all twelve pages; postcards, colour purchases, paused pixels, saved reload and 320/360/390px portrait plus 844px landscape. Native mouse/keyboard and touch cancellation/safe-area checks are also included. Touch tests use browser emulation; a physical handset was not available.
