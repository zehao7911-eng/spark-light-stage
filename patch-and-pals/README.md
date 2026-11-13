# PATCH & PALS

A little care. A lot of heart. An original, small, tactile HTML5 plush-repair atelier. Nine named visits feature three bespoke generated plush designs: a coral rabbit, calico kitten and turquoise dragon. All interface text is English.

## Play

1. Drag a glowing snag away until it pops free. Pull in any direction. Ribbons stretch, springs wobble, burrs and buttons tumble into the tray. A short or cancelled drag returns safely.
2. Hold the squeeze bulb, canvas or Hold to puff button. Release when the marker reaches the gold band. The toy visibly plumps up. Too much creates a harmless cotton hiccup and lets you try again. There are no lives or time pressure.
3. Drag the fabric patch from the lower-right tray onto the tummy outline. Watch the stitches close, then tap your repaired pal for happy jumps and hearts.

The main button provides an accessible one-tap equivalent for plucking and patch placement. Enter/Space also performs these actions; hold either to pump, release to stop. P/Escape pauses. Helping hand highlights and describes the gesture; it does not secretly repair anything. Nine visits vary plush, snag types/counts, fill targets and story, using the same three-stage repair loop; they are not nine different game genres. Each repair gives two hearts, plus one for avoiding an overstuff. Replays keep the best result, with a maximum of twenty-seven hearts. There is no spendable currency or random prize economy.

Pals opens the persistent visit book. Complete the current visit to unlock the next; completed visits can be replayed. Three patch colours can be selected in the pause menu. These recolour the code-drawn repair patch, not the generated plush itself. The book contains nine names but three original character designs, each with three drawn poses. Expression changes use generated poses with procedural squish, tilt and hopping, not a skeletal rig or a full walk cycle. After the last visit, Another shift restarts the same campaign while retaining records.

## Run and compatibility

Serve this folder with any static HTTP server; open index.html. GitHub Pages works. No install, backend, library, font, analytics, WebGL, API key or external CDN is required. Image files must be served alongside the source. A modern Canvas 2D browser with ES modules is required. File URLs can restrict modules; use HTTP(S).

Phone portrait and landscape layouts use large controls. The workbench uses a fixed 720 x 900 render buffer with CSS fitting. Animation targets 40 draw frames/second (25 with Gentle motion), fixed 60 Hz logic, at most 140 temporary particles and 16 audio voices. These are budgets, not a measured physical-handset guarantee. Synthesized pops, spring glissandi, stuffing tones and repair chimes begin only after interaction. Sound can be muted. No recording or microphone permission is used.

Pause, blur and hidden tabs release inputs, freeze the scene and stop sound. Interrupted plucking resets the uncommitted drag. Fill and stitching progress, current visit, records and settings are stored locally; refresh resumes paused. Denied storage leaves the current session playable. No progress is uploaded. Loading illustrations has a visible timeout/retry instead of an endless spinner. Take a photo exports the actual canvas only, not the generated cover; browser download handling varies.

## Art and reference

Built-in image_gen created the coherent atelier, nine-pose transparent plush atlas, promotional cover and app icon. ART-PROMPTS.json contains all five prompts, including the rejected cramped first atlas. PNG originals remain unmodified in assets; runtime WebP versions are lossless format transcodes with decoded RGBA equality checked. Sprite bounds are explicitly recorded and each cell has at least thirty pixels of alpha padding. No Python-generated or painted substitute art is presented as image_gen output. Code draws the interactive tool, loose objects, patch, thread, particles and gauges to connect the artwork to the actual game state.

The [Rezona Graft reference](https://rezona.ai/game/pgcserver/play/LMpDSmHm) was opened, Begin pressed and a scalpel drag attempted. Its incision objective did not visibly complete; no successful operation or reference campaign is claimed. Only the idea of tactile, sequential direct-tool work informed this independent gentle toy-repair game. The reference has complex surgical tools and body horror; this project instead has its own simple plush loop, characters, art, sound, code and interface. No Rezona code or assets are included. Aquarium feeding, football, rhythm racing, robot peg solitaire and other existing projects were excluded during deduplication.

The cover is an original promotional illustration, not a gameplay screenshot. The app icon is a separate generated composition. No commercial character, logo or complete existing interface is reproduced. No platform grade, commercial parity or approval outcome is guaranteed.

## Checks and source

Run `node tests.mjs` for model checks: ordinary routes through all visits, short and invalid drags, no duplicate removals, stuffing recovery, exact fill/stitch continuation, misplaced patches, terminal guards, invalid saves and best-only rewards. Native browser input, responsive layout, runtime screenshots, public files and ZIP checks are verified separately in delivery reports outside this folder. Physical phones were not available.

Original source is MIT licensed. The supplied generated art may be used with this project; it is documented separately and is not claimed to come from an open-source asset pack.
