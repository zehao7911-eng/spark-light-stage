# Skyline Swing

One swing. Three sky kicks. A very long way home.

A self-contained English HTML5 golf-distance game for touch, mouse and keyboard. Hold the large button, release in gold, then tap for up to three airborne kicks. A falling ball close to the grass turns the button gold: tap then for a stronger golden bounce. Missing the timing still gives a smaller boost. Collected sky rings visibly burst and pay six coins each. The ball makes one natural small landing hop before the shot ends. There is no life system or countdown failure.

## Tour and workshop

Nine destinations introduce three illustrated environments: a tailwind coast with lighthouse, clubhouse and sails; a warm elevated city with visible thermal columns that reduce gravity; and an aurora snowfield with lower gravity. These are three shared scrolling worlds, not nine bespoke maps. Destination goals rise from 110 to 730 metres. Each destination saves up to three best stars: reach its goal, exceed it by 25%, and achieve a golden bounce. A missed goal gives coins and a free retry. Collected rings, distance and golden bounces all add income.

Drive, Spring and Sweet Spot upgrades improve actual launch speed, boost height and timing windows. Caps are five, three and three levels. Replaying earns new shot income but never duplicates the same shot's banked reward or best stars on reload. After the nine-destination tour, numbered Sky Tours rotate the three worlds with goals capped at 1,050m. Procedural world decoration is bounded; this is not a claim of unlimited unique levels.

## Controls and recovery

- Touch / mouse: hold and release **HOLD TO SWING**. Tap **SKY KICK** or the flight scene to boost.
- Keyboard: focus the action button and hold Space or Enter, release to swing. Press again for a kick. Escape pauses / returns. Menus use native accessible buttons.
- The workshop is available between shots. Passport lets you replay unlocked destinations.
- Exact logical flight positions, velocities, ring state, three kicks, goal and upgrades autosave. Returning during flight opens the pause card first. An interrupted charge returns safely to the tee. Re-tee abandons the current unbanked shot for free.
- Sound and Gentle Effects settings persist. Hidden tabs pause. Sound begins only after user interaction. The original quiet synthesized music and layered launch / bounce / ring / result cues have a separate mute.

## Reference, artwork and source

Gameplay reference actually inspected and played: [Rezona Golf Orbit](https://rezona.ai/game/pgcserver/pv/mqFCTOiA/v1/dist/index.html). The native Space hold/release launched a shot and reached a real 74m scorecard with 18 coins and 7m peak altitude. Its title, charge, scrolling flight and scorecard were observed. Its full progression, all modes, touch support and audio were not completed or verified.

Skyline Swing independently implements a smaller hold/release distance game with three active flight kicks, forgiving low-altitude timing, nine goals, persistent passport and three worlds. No reference JavaScript, title artwork, character, logo, texture, recorded audio or fonts are redistributed. It is not a one-to-one recreation or an imported complete open-source game.

All game illustration is newly authored Canvas / SVG source: a cap-wearing human golfer with charging backswing and follow-through; three layered scrolling environments; clubhouse, cart, lighthouse, windmill, benches, flags, gardens, bridges, towers, cable cars, snow and aurora. The artwork uses a coherent muted printed-illustration palette and selective outline. The icon uses matching ball/trail motifs. The cover is composed from an actual gameplay capture. No image generation was used. The golfer is an articulated 2D drawing, not a real-time 3D model or GIF animation.

## Run and package

Serve this directory with any static HTTP server, for example `python -m http.server 8000`, then open the printed local address. No build, package install, CDN, WebGL, external API or backend is required. The release ZIP has `index.html` at its root and includes source, tests, icon, cover, credits and licenses. Module-based games should be served via HTTP rather than opened as a local file URL.

## Skills and implementation decisions

Applied game-development, web-games, mobile-games, game-design, game-art, 2d-games and game-audio skills. Concrete outcomes: one clear hold/release action before five seconds; active flight interaction; input separated from fixed 120Hz logical simulation; capped DPR 1.7, 110 effects, 24 trail samples, 16 sound voices, cached backgrounds; distinct world silhouettes and large foreground ball; native menus and 44px+ controls; portrait / compact landscape layouts; pointer cancellation; audio gesture activation, mute and pause; exact-flight recovery and idempotent settlement. Browser rendering uses requestAnimationFrame; no unmeasured physical-device frame-rate guarantee is made.

See VALIDATION.md for actual checks and limitations.
