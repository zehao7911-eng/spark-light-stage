# Button Brigade — The Sunroom Signal

An original, self-contained 3D HTML5 miniature-room adventure inspired by Tinykin's tiny-scale exploration and companion teamwork. All procedural models, characters, animations, textures, interface and gameplay code are original. No commercial game assets or source code are included. This is one complete small room adventure, not the full commercial game's world or mechanics.

## Adventure
Recruit Lift, Leaf and Spark helpers while exploring a giant sunroom. Four linked projects change the world: move a pencil to open the passage; build a living ladder to recover a spool; form an electrical chain to restore the radio; and deliver a marble to power a toy train. The final train ride is a scene animation, not a separately controllable vehicle. The ladder climb is an authored teamwork animation. Once the room is complete, explore freely, finish the collection and switch to sunset light in the journal.

There are 18 helpers, 36 reachable pollen collectibles, a field journal and two collection badges. There is no timer, combat or loss of lives. Guide is optional and walks to the next helper or task using obstacle-aware grid routing. The Hop button is a small movement animation; climbing onto the shelf is handled by the Leaf teamwork project. Remaining pollen and helpers provide optional collection goals after completion, not an infinite campaign.

## Controls
- Phone: joystick to walk, Team Up near a golden marker, Hop, Guide, Journal and Wide View.
- Desktop: WASD/arrows to walk, E to team up, Space to hop, G for Guide, Escape to pause. Click a valid floor point to walk there.
- The camera follows automatically; giant props fade when they obscure the player. The game pauses when the document is hidden.

## Run and save
Serve this folder using any static HTTP server and open index.html. All runtime dependencies are local; no CDN, build system, external fonts or image-generation service is required. A WebGL-capable browser is required. English UI. Local progress saves recruited companions, collected pollen and completed projects. Continue returns the explorer to the entrance while preserving all room changes.

## Optional GameWave
The game remains playable without the SDK. sdk.js detects window.neonlib and safely calls supported lifecycle, save, like and comment functions. Successful supported social callbacks receive an optional supporter acknowledgement; they never gate gameplay. The room's detailed progress is saved locally; platform save currently records the project-completion count and supporter flags. The actual GameWave host must be tested on-platform. The host should expose neonlib before sdk.js executes.

## Verification
work/test-button-brigade.cjs checks gate blocking, all four task routes, recruitment, collision and save validation. work/test-brigade-runtime.cjs runs the actual game implementation with a renderer stub and verifies recruitment, Guide movement, all four teamwork jobs, finale state and reachability of all 36 pollen points. Browser playtests check rendering, recruitment, Guide and phone portrait layout. Physical-device performance is not measured by these tests.

## Credits
Three.js is MIT licensed; see vendor/THREE-LICENSE.txt. Gameplay reference: https://store.steampowered.com/app/1599020/Tinykin/ .
