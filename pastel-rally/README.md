# Pastel Rally

A self-contained HTML5 miniature rally game inspired by the low-poly countryside and readable overhead racing of art of rally. All car, course, building and scenery geometry is original, authored in code. No commercial game assets are included.

## Play

Open index.html, or serve this directory with any static HTTP server. No build, account, CDN or network connection is required. The included Three.js runtime provides the 3D renderer; a Canvas 2D renderer takes over when WebGL initialization is unavailable.

Auto throttle. Drag the steering pad, or drag horizontally on the scene. Hold BRAKE with a second finger to slow down and drift. Keyboard: Left/Right or A/D to steer, Space to brake, R to rescue, P to pause. Steering and brake input release on pause, loss of focus and interrupted touches.

Each rally is two laps, with ordered checkpoints. Finish within 120 seconds. Rescue returns you to the previous checkpoint and adds three seconds. One star for finishing, one for beating the posted time, and one for a clean drive (less than two seconds off-road, no collisions or rescues). Grass slows the car; rocks cause collisions.

Six original courses unlock in sequence. Further rallies cycle through the courses with reversed layouts. Coins buy permanent engine and grip upgrades; four car colors are freely selectable. Your fastest recorded drive becomes an optional translucent ghost on a rematch. Ghost recordings are retained for the 24 most recent course stages to limit save size. Course changes require confirmation during a run.

Progress, the active run, ghosts, upgrades, color and audio setting are stored locally under pastel-rally-v1. Sound is synthesized and starts only after a user gesture. No data is sent to a service. Clearing browser data resets progress.

## Rendering

Original low-poly cars, layered pines, orchard trees, spectators, flags, cabin, stacked logs and coastal scenery; warm directional lighting, actual shadow maps, bounded dust particles and skid marks. Six environment palettes. Maximum device pixel ratio 1.6; touch devices use 512 px shadow maps. Scene geometry is rebuilt and disposed between courses. UI supports portrait and landscape and uses controls at least 44 px high. Browser emulation cannot certify every physical handset.

## Dependencies

Three.js r147, MIT license. See THREE-LICENSE.txt. All other runtime files are local. Art of rally is a visual and genre reference, not a required dependency or affiliated product.
