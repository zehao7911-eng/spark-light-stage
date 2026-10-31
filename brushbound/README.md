# BRUSHBOUND

Draw. Release. Bloom. An original detailed-pixel HTML5 dash adventure for touch and mouse. A little red-panda brushkeeper cuts one continuous line through paper-ink spirits, wakes three lanterns in each courtyard, and collects eight garden seals. All interface text is English. No timer, lives, payments or idle-time attacks.

## The gesture

Press anywhere on the courtyard, drag toward a point, then release. The panda travels along the shown straight segment. Tapping a point also commits that stroke. All creatures touched by its swept width are hit; the panda is protected during the movement. The line preview uses the same geometry as the actual strike. A very short tap at the panda does nothing, and pointer cancellation never commits. The Dash button performs the displayed line, giving an accessible alternative to dragging. Show a line suggests one possible current-state stroke or flank; it does not move the panda or silently finish a round.

The world waits while you aim. Every committed stroke gives surviving creatures one turn. A red circular petal zone marks a creature that will strike on the next turn: do not land inside it unless your line defeats it. A bump counts against a bonus petal but never deletes a lantern or ends the run. Empty strokes break the consecutive-pop chain. Multiple pops in one stroke give a larger bloom and score bonus; consecutive successful strokes keep the chain, capped at twelve. There is no speed-click deadline.

Ink wisps disappear on one hit. Paper skitters move after your stroke. Leaf guardians block the side shown by their shield; approach from the side or back. Inkbells need two hits, and the last elder inkbell needs three. Two rounded boulders in later gardens clip the brush line before it reaches anything behind them. Their generated faces are scenery, not extra enemies.

Keyboard: arrows or WASD choose a cardinal line, Enter/Space commits, H suggests a line, P/Escape pauses. Canvas focus and the main Dash button support these controls. Other focused buttons keep normal keyboard activation. The core does not require a joystick plus separate aim/attack buttons.

## Content and rewards

Eight authored garden configurations each contain three rounds, using three matching generated environments: rain-jade gate, amber archive and moon porcelain pavilion. Creature layouts, shield orientation, skitters, multi-hit bells and obstacle placement vary. This is one core mechanic with twenty-four finite rounds, not eight unrelated minigames or eight separately painted worlds.

Each garden awards one petal for completion, one for reaching a chain of five, and one for two bumps or fewer. Best petals and score are retained; replays cannot duplicate or reduce earned petals. The fieldbook holds eight distinct seal motifs and twenty-four possible petals. The seals are original code/UI glyph compositions, not eight additional generated character portraits.

Two garden clears unlock Longleaf (reach 230 logical units rather than 190). Four unlock Petal Echo (two direct pops splash nearby survivors within 76 units for one extra damage, including shields). Six unlock Kindbell (the first two landing bumps are caught). Choose a charm for the next garden or replay; the current garden keeps its original charm. These have actual rule effects, not just palette changes.

Finishing all eight opens Wild Ink: new seeded mirrors/perturbations of the final configurations, using the same three-round structure and creatures. Another Wild Tale generates a new seed. This is replayable remix content, not unlimited hand-authored maps. Wild score has its own best record and does not farm campaign petals.

## Feedback and art

The real game uses generated art: three detailed pixel scenery plates, a padded four-pose original red panda, and six isolated actors/props (ink wisp, paper skitter, leaf guardian, inkbell, firefly and boulder). The elder reuses the inkbell at a larger scale. The four panda poses are ready, dash, sweep and celebration; procedural leaning, afterimages and hopping connect these poses. They are not a full walking skeleton or a claim of frame-by-frame locomotion.

The controller draws exact aim/range rings, shield arcs and danger circles. Swept hits split the actual generated sprite into rotating halves, emit capped ink/petal fragments and play staggered synthesized chimes. Consecutive strokes build a visible chain. Petal Echo sends a delayed expanding ring; Kindbell catches a landing impact. Waking lanterns release generated fireflies, light the gate and bring the panda into its celebration pose. Gentle Motion removes camera movement and reduces ambient motion.

Built-in image_gen made all seven final designs and one rejected first hero atlas. Full prompts and reference roles are in ART-PROMPTS.json. Unmodified PNG masters are saved locally in the adjacent `brushbound-art-sources` workspace folder; the playable download includes all production WebP artwork. Transparent atlases are lossless with decoded RGBA equality checked; opaque scenery, cover and icon use WebP quality94 encoding without spatial editing. Alpha and dimensions are preserved. Conservative alpha24 bounds are stored in assets/atlas.json and all ten sprite cells have at least twenty-four pixels of padding. The runtime creates small filtered caches for readable sprites, then draws the scene with nearest-neighbour scaling. This is generated high-resolution pixel-style art, not a guarantee of native 32px sprite-grid authorship.

Cover and icon are coordinated original promotional compositions. The cover is not a gameplay screenshot. No commercial character, logo, complete interface, reference source or reference media is packaged.

## Reference and scope

[Rezona Inkblade](https://rezona.ai/game/pgcserver/play/bINhtaVH) was actually opened, its intro skipped, and the first chamber entered. Native W/click/Shift/Space were attempted; score remained zero, an eighteen-second loss was observed, and a retry returned to full health. No successful reference dash, kill or complete chamber is claimed. This project takes the readable action staging as a reference and independently replaces multiple desktop controls with one turn-paced dash gesture, an original panda/garden setting, different progression, sound, art and code. It is not a one-to-one clone or an imported complete open-source game.

Reference auditions also excluded a first-person spatial game, pet-only interaction, hay searching and a city-smashing game. Existing aquarium feeding, toy repair, robot peg solitaire, line tracing, colour/grid puzzles, fruit slicing, grapple movement and return-shot games were checked during deduplication. Broad action-game ideas can overlap; this is not a claim to have invented an entire genre.

## Run and mobile behaviour

Serve this directory with a static HTTP(S) server and open index.html. All runtime files are local. GitHub Pages works. No engine install, external library, font, CDN, API, account, WebGL, microphone or camera is required. index.html and standalone.html bundle the model, controller, CSS and atlas metadata into classic inline scripts, reducing platform module-loading dependencies. Editable index-source.html uses the separate modules. File-URL behaviour varies by browser, especially for saved postcards; HTTP(S) is recommended.

Only the active background and two atlases are required for startup (about 2.6 MB, plus the optional icon and small source files); other scenery loads when its garden is entered. The loader has a timeout and explicit retry rather than an endless spinner. Cover art loads only on its optional page.

Drawing uses a fixed 720x900 buffer fitted to portrait or landscape. Buttons are designed at 46px. Logic advances at 60 fixed steps/second; drawing targets 40 FPS, or 25 with Gentle Motion. There are at most 180 temporary fragments and sixteen synthesis voices, cached sprite figures and three background plates. These are implementation budgets, not measured physical-phone FPS guarantees.

Visible-window focus loss releases aiming input and silences audio without covering the garden with a menu; an already committed stroke can finish. Hidden tabs, orientation changes and explicit Pause freeze the action. Page close saves progress. Current committed combat, enemy health/positions, pending stroke clock, round, charm charges, score, records and settings save locally. Refresh opens paused. Score-counter interpolation, random fragments and transient labels are cosmetic and can reset. A committed impact never applies twice after reload. Denied storage leaves a playable current session but cannot reliably retain progress. Nothing is uploaded.

The postcard button exports the actual gameplay canvas; browser handling of local PNG downloads varies. Generated audio begins only after input and can be muted. Optional vibration depends on device support. No platform grade, commercial parity or physical-handset certification is promised.

## Source checks

Run `node tests.mjs`. Checks include ordinary routes through all eight gardens and every charm, an independent densely sampled swept-distance oracle, actual front/back shield behaviour, wall clipping, landing-only damage, longer reach, echo propagation, two-bump protection, random off-route recovery, seeded remixes, exact pending-state continuation, no idle progress, terminal guards, invalid saves and best-only awards. Tests are deterministic model checks, not human fun/difficulty evidence. Native browser gesture/keyboard play, responsive layout, public deployment and package verification are recorded separately outside the playable folder.

Original code and UI art are MIT licensed. Generated assets have their own documented provenance and are not represented as an imported open-source asset pack.
