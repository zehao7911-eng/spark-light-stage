# WHISPERWAKE

An original, one-finger watercolour lantern journey for mobile and desktop browsers.

## Play

Drag or tap to set your lantern's horizontal destination. It rises automatically after the first input. Follow warm lights, avoid dark ink and enter the lighthouse arch. Collecting five lights in quick succession creates a short Lumen Rush: a visible golden shield that attracts lights and dissolves nearby ink. Three colour fragments per journey are optional. Three flames let you recover from mistakes.

The first gesture starts the game without a title screen. Arrow buttons, Left/Right or A/D also steer. Space starts when the canvas has keyboard focus; Escape pauses. A tap leaves a lateral destination active until another input; pausing, resizing or leaving the page releases controls. Sound starts after interaction and stops on pause. Sound and Low Power settings persist.

## Content and rewards

- Nine authored journeys across Rosewater Terraces, the Blue Archive and the Saffron Canopy.
- Fixed ink, swaying blots, gated passages, rain, orbiting ink and alternating crosswinds.
- Finish for one star; gather all three fragments for another; avoid all ink touches for the third. Best results replace older records rather than being repeatedly awarded.
- Refuge checkpoints every 700 distance units activate automatically at their altitude, regardless of whether you pass through the decorative arch. Continue retains collected lights/fragments and best altitude, resets flames and returns to the last refuge. Previously collected items cannot be farmed.
- Finish three different journeys to unlock Endless Drift. Its seeded generator resizes and mirrors authored patterns, increases ascent speed gradually, cycles the three art palettes and removes old objects. It does not promise infinitely many authored environments.
- Save data in this browser includes the active flight, velocities, collected flags, shield duration, generator and records. Saved control intent is released. An unfinished flight reopens paused. Audio and decorative animation phases are not saved. Clearing browser data removes progress.

## Art and provenance

All game code, drawing, SVG icon and synthesized sound are original. No generated images, remote fonts, reference screenshots or extracted reference assets are included. The cover is an actual runtime screenshot.

Art direction: the [watercolour reference gallery](https://mygamesartstyle.jupiterthewarlock.com/styles/watercolor/), including its GRIS example, informed paper-white negative space, translucent irregular washes, fine foreground marks and layered pale architecture. All architecture, vegetation, lantern, glyphs, ink and effects are drawn in Canvas 2D. This is procedural illustration, not a hand-painted bitmap asset pack or a 3D scene.

Gameplay observation: [Lantern Drift on Rezona](https://rezona.ai/game/pgcserver/play/rjQvFrXU). Its public preview was started and steered with ordinary controls: lateral motion, ascent and score 0 to 44 were observed. This was not a completed reference run. No source, art or audio was copied. The authored routes, collection shield, scoring, refuge recovery, stars, folio and seeded endurance mode here are independently implemented.

## Run or host

Serve this folder over HTTP, for example `python -m http.server 8000`, then open `http://localhost:8000/`. ES modules require HTTP; double-clicking index.html is not a supported launch method. Deploy the folder unchanged on a static host such as GitHub Pages, or extract the ZIP with index.html at the package root. There are no CDN, API, build or package-install dependencies. A current browser with Canvas 2D, ES modules and Web Audio is required. Sound is optional.

Drawing is capped at 40 fps (30 in Low Power), device pixel ratio at 1.5, cached illustration sheets and bounded effect counts. Gameplay uses a fixed 60 Hz step. Pointer input, safe-area layout, narrow portrait and short landscape menus are supported.

## Verification

`node tests.mjs` checks the model without a browser. The 187 assertions include all nine journeys under two ordinary steering controllers, genuine physics-driven ink loss/recovery, optional fragments, shield activation, score conservation, immutable completed runs, invalid-save rejection, active restore and three long seeded endless routes. Controller success is not a human difficulty measurement.

Native browser checks separately completed journeys 1, 3 and 4 with three stars; observed Lumen Rush, the gold-leaf scene, actual three-hit recovery, unlocked and started Endless Drift, setting persistence, active-flight reload and an identical paused screenshot pair. Layout checks covered 320x568, 390x844 and 844x390 with no horizontal overflow and observed main buttons at least 44 px. These are browser viewport checks, not tests on a physical handset. No platform rating or subjective art-quality guarantee is implied.

## License

Original source and included assets: MIT; see LICENSE.txt.
