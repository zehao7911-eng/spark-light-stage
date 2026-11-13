# PIP ON ICE

A little pixel winter holiday. An original browser game made with Canvas 2D, source-resolution pixel drawing and synthesized Web Audio. No generated images, external fonts, CDN, commercial assets or runtime libraries.

## Play

Pull backwards anywhere on the picture and release: Pip slides in the opposite direction. The dotted route and cross show the physical predicted path and stopping point. A gold stopping mark means the fish basket will catch Pip. Reach the basket to finish. There is no timer, life counter or limited supply of slides.

Collecting all three little fish earns an extra star. Meeting the displayed slide par earns another. Fish stay collected between slides; Undo restores the preceding slide including its fish. Reaching the basket ends the course, even if a fish remains. Retry is free. Iceboxes and rink walls reflect momentum; snowy cushions slow the seal. Reflections and slowing are part of both simulation and preview.

Twelve authored courses in three winter ports: Snowberry Quay, Lantern Canal, Aurora Harbour. Later courses add bank shots, passages and snow. A finite campaign, not an endless content claim. Nine total stars unlock Sage scarf; 24 unlock Gold. Cosmetics do not change physics. Only best stars and best score are retained per course, so replaying does not farm duplicate stars.

Touch / mouse: pull and release anywhere on the artwork. The anchor need not be precisely on Pip. Pointer cancellation discards the pull. Keyboard: focus the picture; Left / Right rotate aim, Up / Down aim vertically, hold Space to charge and release to slide. Z undoes a slide, Escape pauses.

Postcards selects unlocked courses and scarf colours. Local browser storage saves the active physical position, velocity, collected fish and progress. Reopening an unfinished slide pauses before continuing. The undo stack and decorative particles are session-only. Storage failure does not prevent play. Sound starts only after a user gesture. Pause, hidden page and blur stop simulation and synthesized voices. Gentle mode reduces animation rate and snowfall. No vibration or recording permissions.

## Run and host

Extract the ZIP with `index.html` at its root. Serve this folder over HTTP, for example `python -m http.server 8080`, then open `http://127.0.0.1:8080/`. ES modules require a server; do not rely on double-clicking an HTML file. A static host or GitHub Pages works with a subdirectory, with no build step.

Optional: Node.js `npm test` (or `node tests.mjs`). No dependency installation is needed. `routes.json` contains deterministic test routes, not an automated player in the production game. Runtime imports only core.js, art.js and audio.js.

## Verification and limits

Model checks cover all twelve three-star routes, fixed-step bounds and finite movement, solid ice/wall collision, snow friction, preview and simulation equality, no double launch, terminal state, undo, exact active-slide restoration, invalid saves and rewards. Native pointer play, small portrait / regular portrait / landscape layout, reward transitions, saving and public-host verification are recorded separately in the delivery report outside this source folder. Browser viewport tests do not establish performance or compatibility on a physical phone. No platform rating or subjective quality guarantee is claimed.

## Art direction

Hand-authored pixel drawing code at 320×440 source pixels, scaled using nearest-neighbour rendering. Three cached settings, grouped snow/wood/ice materials, visible ice thickness, cabin siding/shingles, lantern frames, basket weave, warm scarf accents, seal idle/blink/pull/glide/celebration states, skate marks, snow puffs, fish sparkles and delivery confetti. Cover is a real runtime screenshot; icon is original SVG pixel geometry. This is an original curling/delivery interpretation; no external game source, art or brand is presented as its own work.

Code, artwork and synthesized sound are available under the included MIT license.
