# Inky Encore

An original compact one-stroke drawing puzzle. Start at a glowing dot, then follow each dotted edge exactly once. Finish the drawing and an original rubber-hose cartoon actor takes the stage. Twelve authored graphs, twelve actors, three theatrical environments, a cast album, best-only stars and three ink colours. No countdown, lives, ads, payment or account.

## Controls and rules

- Drag from dot to neighbouring dot, or tap dots in sequence. You may lift your finger; the trail remains.
- Each edge must be traversed once. Crossings without a dot are not junctions. Only graph endpoints count: you do not have to trace every curved pixel precisely.
- Glowing starting dots have the correct degree for a possible complete trail. Choosing a branch can still produce a dead end. Undo is free and returns one dot at a time.
- Hint solves the remaining actual edge graph. If the trail is stuck, it rewinds the minimum suffix needed for a solution and marks a real next dot. It does not silently fill edges.
- One star for completion, one for using no Hint, one for using no Restart. Undo and wrong taps do not lower the rating. Replays retain best stars and score, never duplicate stars. Jade ink unlocks at 9 stars, Violet at 24.
- After completing a picture, Watch the act returns to its live cartoon performance. Next picture continues; Cast revisits earned actors and ink colours.
- Keyboard A–I selects the corresponding lettered dot. Escape pauses. Buttons remain keyboard accessible.

The 12 original levels are finite, not an infinite campaign. Difficulty rises through joined cycles, alternate branches and a final marquee. The underlying rule is the established Euler trail puzzle family, not an invented mathematical mechanic.

## Art and references

Actually browsed Rezona Thousand Strokes, https://rezona.ai/game/pgcserver/pv/rpvTPNEn/v3/dist/index.html : entered The Journey, observed its intro and Misty Mountains, made a native drag leaving a visible diagonal brush line. No full reference completion or working bridge was verified. The brush-to-world idea informed this independently authored one-stroke puzzle; the reference is a platformer with additional movement and stroke powers, which this game does not reproduce.

Actually enlarged and viewed the Cuphead scene in the user's rubber-hose art atlas: https://mygamesartstyle.jupiterthewarlock.com/styles/rubber-hose/ . Ink contours, pie-cut eyes, flexible limbs, controlled flat actor colours and subdued theatrical backgrounds informed the art direction. Original house/clock/kite/fish/umbrella/rocket/snail/moon/bell/flower/butterfly/marquee actors and Quill the inkwell host, original stage compositions, SVG icon, Canvas paths, textures and synthesized sounds. No reference character, screenshot, logo, source code, audio or commercial asset is included. The initial code-art edition used no image generation. At the user's explicit request, version 2 uses built-in image_gen: one original sixteen-sprite cast/host atlas, three coordinated illustrated stage backgrounds and a new game icon. Original generated PNGs and exact prompts are included. Runtime WebP derivatives total about 1.1 MB; master PNGs are not fetched during play. The new cover is an actual runtime capture of these integrated assets.

## Run and implementation

Serve this folder via any static HTTP server, for example `python -m http.server 8000`, and open index.html. All files are local; no CDN, runtime library, network API, font download, build, key or backend. ZIP index.html is at root. JavaScript modules should be served over HTTP/HTTPS rather than file://.

Run `node tools/test.mjs` for authored route, degree, geometry spacing, save restoration, alternate route/hint recovery, terminal and best-record checks. Rendering is Canvas2D with cached three-stage scenery, DPR <=1.5, maximum72 short-lived ink particles, maximum10 sound voices, 40Hz target drawing (25Hz Gentle). Logic changes directly on input; low background animation rate does not discard drawing actions. Cosmetic fixed60Hz animation is capped after interruptions; no timed score.

Local storage holds the exact trail, current picture, hints/restarts, best records, ink and audio/motion settings. Reload opens paused. Invalid or blocked storage safely falls back to a playable session. Pause, blur and hidden tabs release dragging, freeze art and stop sounds. Rotation releases an interrupted stroke without losing committed edges. Phone browser viewport checks are not physical-device certification. No claim of commercial art equivalence, pixel-identical remake or platform grade.

Original source, art and audio: MIT, see LICENSE.txt. Full generated prompts: ART-PROMPTS-V2.json. The sprite atlas is mechanically separated into sixteen clean padded cells, preserving its generated alpha; it is not a keyed opaque-background cutout. Actor animation uses code-driven cutout bob, tilt and stretch; Quill has four illustrated poses. These are animated 2D illustrations, not new rigged 3D meshes or full frame-by-frame actor cycles. Original code art remains a functional fallback if image files cannot load; the pause menu offers Retry illustrations. Loading has a twelve-second limit and never blocks puzzle input. Existing inky-encore-v1 trail, settings and best records stay compatible.
