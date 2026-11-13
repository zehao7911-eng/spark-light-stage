# NIGHTGLIDE

A complete compact English HTML5 air-hockey cup. Drag the ivory mallet in the lower half, hit the green relic orb through the upper gate, and win three points. No account, payment, server API, external font, framework or WebGL is required. Startup is the actual ready-to-play table, not a long title sequence. Every serve waits for a touch or the Push off button; once a rally starts it runs in real time.

## The feel

The 120 Hz fixed-step physical model moves the mallet toward the finger instead of teleporting it. Its velocity and contact normal propel the orb. Rails reflect momentum, circular seals deflect shots, and an orb squeezed against the wall separates along the rail instead of becoming trapped. Goals pause briefly, celebrate and offer another waiting serve. Losing a match offers a free retry and keeps the cup record.

Mallet hits and banks charge Pulse. A full Pulse aims the orb at the upper gate and pierces opposing mallets, with visible guard sparks, a trail, bass impact and a rising chord. It can still encounter a bumper or a moving gate. The button never spends a charge on a missed proximity check. Ordinary hits give 38 charge; ordinary wall banks give 15. Consecutive physical returns form the rally record. Motion includes actual image-based puck and mallet movement, procedural trails, glow, ring effects, sparks and real ivory-art fragments on seal breaks. The two keeper images are fixed poses, not an animated character rig.

## Nine courts

1. The Invitation: a forgiving first stroke; the keeper gives the first shot a brief opening.
2. Bone Orchard: two physical centre bumpers.
3. Wandering Mouth: a moving upper goal.
4. Black Ice: lower friction and an oscillating centre seal.
5. Ivory Lock: a first upper-gate strike breaks a lock; the following strike scores.
6. Crosscurrent: a sideways field bends the orb, with two bumpers.
7. Mirror Passage: side windows connect opposite rails, with a portal cooldown.
8. The Double: a second moving spectral keeper and moving gate.
9. Last Light: the locked moving gate, oscillating seal and connected side windows combine.

These are nine finite rule configurations in one shared illustrated chamber, not nine separately painted worlds. Completing all nine opens After Hours: successive slightly faster rotations of the existing court rules, with a saved best round. This is replayable rule remixing, not unlimited hand-authored maps or a claim of new generated artwork every round.

Each court has three best-only seals: win; concede no more than one; score at least one bank or Pulse goal. Replaying cannot farm or reduce the 27-seal record. The Cup lets players revisit unlocked courts, with a visible confirmation before replacing the current match.

## Earned sigils

- Spark: standard piercing Pulse.
- Ember, after two courts: 50 charge per mallet hit and a Pulse that scores through a gate lock.
- Mirror, after four courts: 30 charge per wall bank.
- Mercy, after six courts: one automatic missed-goal catch per match.

Equipping changes the next match, not the currently active one. A used Mercy catch stays used after a refresh. Calm Keeper optionally reduces rival speed to 68%; its new medal is capped at two seals, while existing best medals stay intact. Gentle Motion removes shake and lowers the drawing target from 40 to 25 frames per second. Those are targets, not measured physical-phone frame rates.

## Art provenance

The user explicitly requested direct reuse of different Rezona artwork. The actual public **Sweet Rot** title was entered and its illustrated match-three board was inspected: https://rezona.ai/game/pgcserver/play/ncwefrYD . A reference victory or successful match-three move is not claimed. Eight selected images were exported through the browser's observed pageAssets inventory: chamber, keeper, laughing keeper, ivory relic, crossed bones, soul orb, nova orb and ornamental frame. Their original URLs, dimensions and SHA-256 hashes are in ART-SOURCES.json. Unmodified originals are included in reference-originals. Transparent runtime WebPs are lossless; the opaque chamber uses quality-94 encoding without spatial editing. No image generation was used.

The artwork is direct third-party reuse, not newly drawn original art or an asserted open-media license. The original code MIT license expressly excludes those images. No reference logo, game scripts, fonts, recorded sounds or entire interface are copied. Nightglide's air-hockey rules, model, controls, cup, UI and synthesized sounds are independently authored. The source reference is a match-three game; this is not its gameplay port.

Other gallery auditions included Channel Thirteen and Battle Bot, whose previews did not load successfully, and Mergin' Plant Gunner and Neighborhood Wars, whose preview gameplay was not verified. They are not claimed as played references or used as artwork sources. Older badminton, billiards, pinball and football projects overlap the broad sports/physics genre; the current project does not claim to have invented air hockey.

## Controls and mobile

Touch/mouse: press or drag anywhere in the lower playing half to move the mallet. Push off starts a straight initial stroke. Pulse fires a full charge. Pointer capture continues a gesture outside its initial contact, and cancellation releases the target without leaving a held input.

Keyboard: arrows/WASD move, Enter serves, Space activates Pulse, P/Escape pauses. The canvas is focusable. Focused menu buttons retain normal keyboard activation. Hidden pages and orientation changes pause the match; visible window blur releases keys and silences audio. Sound starts only after an interaction, and can be disabled. The pause dialog stops both simulation and effect clocks.

Portrait and landscape use a contained 360x520 logical field. Canvas drawing is capped at 720x1040 pixels, independent of phone DPR. Input maps through any letterboxing. Buttons are at least 44 CSS pixels, and the shorter landscape mode uses a side panel. Effects and simultaneous audio voices are bounded. No microphone, camera, location or notification permission is used. Local best records, exact active physical state and settings are saved; a denied storage write leaves a playable session rather than a loading loop.

## Run, source and package

Serve this directory over HTTP(S) and open index.html. GitHub Pages is supported. index.html and standalone.html contain classic inline JS and CSS, with images in the local assets directory. There are no runtime CDN/module fetches. index-source.html uses the editable game.mjs/model.mjs/style.css files. File-URL behaviour varies by browser; HTTP(S) is the tested delivery path.

Run `node tests.mjs` for the model checks. Run `python build.py` to regenerate both classic pages and the reproducible ZIP, then `node bundle-test.mjs` for the shipped-script namespace/input/point-transition regression. The latter runs the actual classic script with an inert DOM/canvas and is explicitly not a substitute for native browser testing. The module-private model is isolated from controller-private functions; an early prototype's same-name serve collision was fixed before publication.

Model validation covers all nine ordinary aim/Pulse controller routes, all four sigils across all nine courts, eight After Hours rotations, shield cracking/piercing, portal cooldown, bank charge, moving goals/seals/second keeper, Mercy consumption, high-speed wall bounds, rail squeeze recovery, exact saved continuation, malformed inputs and terminal-state guards. Native browser QA is recorded separately in the workspace delivery report. No physical handset performance certification or platform rating is claimed.

The game ZIP includes playable files, original editable source, tests, provenance and the selected original image files. Promotional cover, when present, is an actual captured game view, not a generated mockup.
