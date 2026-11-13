# Oddling Parade

An original, self-contained English HTML5 creature-making game. Pin a moving head, coat and pair of feet. The three paper parts stitch together into a living oddling. Match a pictured request for three stars, or keep a happy accident in the field guide. All runtime artwork is original Canvas/SVG drawing; no image generation, commercial game assets, external fonts, CDN, accounts, ads or payments are used.

## Play

Open `index.html` in a modern browser, or serve this folder over HTTP/HTTPS. The ZIP has `index.html` at its root and all resources are local. GitHub Pages and ordinary static HTML5 hosts work without a build server.

- Drag the bright ribbon to choose a part and release to pin it, or tap **PIN HEAD**, **PIN COAT**, then **PIN FEET**. Each pin selects the nearest part at the centre window. The current ribbon follows the finger and pauses its automatic drift while held; pointer cancellation releases it without pinning. There are no empty clicks, timeouts or lost lives.
- The whole requested guest is pictured above the ribbons. Each row also shows its requested family symbol. Family colour, shape and symbol work together; matching is not based on colour alone. First pin in the opening request waits for the player, and begins with the requested fox in the window.
- Hold the tortoise button to slow unpinned ribbons to 22% speed. Release it, then pin. **UNDO** unpins the last part before the third pin; it is free. After the third pin, **REMIX** starts that request again and keeps all records and previously made oddlings.
- Three matching request parts earn three stars, two matching parts earn two, and any other completed creature earns one. Every completed combination can advance. Centre alignment separately affects points. Scores and stars keep the best result per request; repeated completion does not farm a currency or add duplicate specimens.
- Twelve authored requests progress from whole-family guests to specific mixed creatures. Cinder, Morel and Puddle are available first. Luna joins in request 4 and Bramble in request 7. Four coordinated illustrated theatre settings appear across the requests. These are twelve recipes in one ribbon mechanic, not twelve unrelated games or infinitely many authored levels.
- After the last request, **TAKE A BOW** opens an animated festival parade of the actual oddlings you collected. Tap the stage for an encore. Freestyle then makes any of the 125 possible head/coat/feet combinations. The field guide keeps unique creations and completed request records. Its creature pages show nine specimens at a time. Revisit unlocked requests or watch the parade again from the guide. Reload returns to the saved last request/result; the parade can be reopened without awarding anything twice.
- Tap a finished oddling for its coat's trick: fox-like steps, a mushroom twirl with spores, a squishy puddle bounce, fluttering moth wings, or a short flowering flourish. These are cosmetic puppet animations, not physics-based creatures. Mixes retain the selected head, coat and feet.

Keyboard: **Left / right** choose a neighbouring part, **Space** pins, **S** slows while held, **Z** unpins, **Escape** pauses. Sound begins after a gesture and can be muted. Pause and hidden tabs release drag/slow input, freeze the game and drawing, and suspend the audio context. Gentle puppet motion is available in the pause menu.

## Art direction and reference

Gameplay direction: Rezona's *Exquisite Corpse — a field guide to impossible bodies*, https://rezona.ai/game/pgcserver/pv/vWGRYAHP/v3/dist/index.html . Its actual title, three moving ribbons, native head pins with TRUE/crooked scores, torso pin/EMPTY SOIL feedback and vigor expiry were observed. A full reference specimen or reference campaign completion is **not** claimed. The original's photo-collage imagery, code, audio, timing penalties and vigor system were not copied. Other inspected candidates were discarded, including a crab-photo opening without a clear successful photo, and DJ / screw / eye candidates that did not reach a verified playable state in the bounded checks.

The user supplied https://mygamesartstyle.jupiterthewarlock.com/ as a separate visual source. The selected category was https://mygamesartstyle.jupiterthewarlock.com/styles/graphic-cartoon/ . The enlarged Cult of the Lamb stone-chamber screenshot was actually viewed for the common visual language: readable exaggerated silhouettes, controlled flat colour blocks, consistently dark ink contours and restrained background detail. That commercial screenshot, its characters, logos, maps and interface are not included here.

This game's independent art system uses 15 authored part designs: pointed fox ears and cheek mask, dotted mushroom cap and ruffled cape, puddle tuft and droplet belly, a lunar face and patterned moth wings, branching horns and overlapping leaf coat, plus five distinct pairs of feet. Their black-blue contour thickness, two-tone shadows, warm paper highlights and engraved small details are shared with the symbols, pin brackets, field guide and ink-edged particles. Four stage facades use gathered curtains, tall moon windows, a living leaf bower and hanging festival cloth. Original synthesized paper taps, ascending pin notes, sewing chimes and a hatch chord accompany actual state changes. The cover is an actual game screenshot.

## Implementation

- `core.js`: deterministic moving-band state, nearest-part selection, alignment quality, undo, recipe scoring, save validation and idempotent records.
- `art.js`: original reusable part geometry and puppet drawing; the guide derives its thumbnails from these same drawing functions.
- `view.js`: cached illustrated backdrops and fifteen part sprites, compositing, puppet motion, short coat tricks and bounded particles.
- `app.js`: pointer and keyboard controls, accessible current-ribbon descriptions, menus, local storage, audio and a fixed-step application loop.

Simulation is fixed at 60 Hz; drawing targets 40 Hz and caps device pixel ratio at 1.5. At most 110 cosmetic particles and 14 short sound voices are active. Resizing updates the canvas without replacing the logical game. A resize observer also follows footer/menu layout changes. Result-state gameplay stays immutable while cosmetic animation can continue. Paused drawing runs only on a dirty frame. Browser viewport checks are not physical-handset performance certification.

Local storage retains the current request, ribbon offsets, pinned families, alignment, sewing progress, best stars and scores, unique specimens, mute and motion preferences. A restored game opens paused with held slow input released. Result rewards are idempotent, including after reload. Cosmetic particles and puppet time restart. Storage denial leaves the current session playable; clearing browser storage removes the local collection.

## Verification and build

Run `node tests.cjs`. The ordinary model controls complete all twelve exact-match requests and all 125 free combinations. Checks also cover the opening gate, first short assembly, immutable results, undo, actual slowed movement, exact partial/sewing/result continuation, idempotent rewards and malformed saves. Model controllers are separate from native browser UI play and do not establish human difficulty or fun.

Run `python build.py [node-path]` to run checks, fingerprint source/resource references and produce the reproducible `ODDLING-PARADE.zip`. It includes editable source, the original SVG icon, actual-play cover and model verification report. No platform rating or commercial acceptance is promised.

Original code and procedural artwork are provided under the included MIT license. No third-party runtime library is needed.
