# PEARL ATLAS

An original, quiet 3D marble garden for HTML5 browsers. Plain JavaScript + Three.js r147; no Godot, build step, account, asset CDN or image generation.

## Play

Tap a visible corridor to roll toward that point, or drag to steer continuously. The pearl does not find a path around walls for you. Arrow keys / WASD also steer. Collect every floating golden light, then reach the opening flower. There is no life limit or mandatory timer.

Each garden awards a completion star, a star for finding the small pink flower, and a star for finishing inside its optional breeze time. Replay to improve the best stars; rewards cannot be farmed by repeating the same result. Six total stars unlock the jade pearl, twelve unlock honey. Change the pearl in the pause/result menu. The garden book reopens unlocked gardens.

Eight deterministic, hand-selected maze seeds grow from 3×3 to 5×5 cells. Garden 3 introduces jade slowing circles; gardens 6–8 add paired violet shortcuts. The rings are offset from corridor centres so they can be bypassed. Leave a ring before it can trigger again. Eight complete gardens are included, not an unlimited authored campaign.

## Run / package

Serve this directory over HTTP(S), e.g. `python -m http.server 8080`, and open localhost:8080. All dependencies are bundled. The ZIP root is this runnable directory and also contains the editable JavaScript sources. Requires WebGL, tested in a desktop browser with mobile viewports; physical handset performance has not been certified.

Local save key `pearl-atlas.v1` stores unlocked gardens, best stars/times, pearl style, mute state and active position/velocity/collection. Active saves resume paused. Storage denial keeps the current in-memory session working. Pause, background and loss of focus stop physics/audio and clear steering. The current pointer destination is deliberately not restored; velocity is preserved behind the pause screen. Context loss displays a reload action.

## Implementation

`engine.js` contains independent fixed-step movement, collision, collection, portal latch and progression. `scene.js` renders original geometry, instanced decoration, soft shadows, ceramic/brass materials, glass house, garden snail, procedural water and bounded particles/trails. `app.js` implements native DOM controls, sound synthesis, pointer ray casting, save and lifecycle. English UI, safe-area padding, 46px controls, responsive orthographic framing, DPR cap1.5 and approximately40fps rendering /120Hz physics. No telemetry.

## Reference and licenses

The installed open-source-game-reference skill located **Astray** (catalog Browser-Based / Puzzle, line196): https://github.com/wwwtyro/Astray . Its README, License.md, index.html and maze.js were inspected. It uses old Three.js + Box2D, recursively carved maze cells, keyboard forces with velocity damping, static wall bodies and a moving camera. Its root license is the Unlicense. These are architectural/gameplay references, not a bundled code port: no Astray code, maps, textures, audio or dependencies are copied. PEARL ATLAS uses an original implementation with circle/rectangle collisions, selected seeded edge mazes, fixed diorama camera and new progression/art/UI. Reference documents were read, not executed. No popularity, exact-reproduction or official-affiliation claim.

The bundled Three.js r147 is MIT; its notice is in `THREE-LICENSE.txt` and its header remains intact. All geometry, interface, shaders and synthesized audio in this game are original.
