# Cloudwright

Original single-player 3D physics stacking game. Reference: Tricky Towers (https://store.steampowered.com/app/437920/Tricky_Towers/). No commercial source code, models, artwork, branding, or music are included.

## Play
Move a hanging compound block, rotate it, then drop it. Build above the gold goal line and keep the tower steady for two seconds. Unlike a row-clearing game, the pieces remain physical objects with weight, friction and rotation. Three fallen pieces end the challenge. Free Undo restores the complete state before the last drop, including hearts and all piece positions and velocities.

Five chapters introduce square blocks, mixed shapes, a narrower base and gentle crosswinds. A completed chapter unlocks the next; saved progress allows chapter selection on return. Stars reflect remaining hearts. This is a small, finite browser game, not a recreation of the commercial game's multiplayer modes or full content.

## Controls
Touch: drag the canvas to aim, tap Turn and Drop. Left and right buttons provide an alternative to dragging. Keyboard: left/right move, up rotates, Space drops, U undoes, Escape pauses. Backgrounding pauses simulation.

## Run
Serve this folder with a static HTTP server. All libraries and runtime resources are local. WebGL is required. All player-facing text is English. Physics: cannon.js; rendering: Three.js. See vendor license files. Body motion is constrained to the stacking plane; scenery and rendering are three-dimensional.

## Optional GameWave support
The game runs without the SDK. Guarded gameStart/gameOver and cloud-save calls are provided; supported onLike/onComment callbacks award an optional guild-star acknowledgement. These features do not gate gameplay. Actual GameWave host events require platform-side testing.

## Verification
Node simulation checks physical stable stacking, goal height, snapshot restoration, fallen-piece removal and rotated compound bodies. Browser checks cover start, drop, sound/error-free startup and responsive layout. A physical phone is not used in these checks.
