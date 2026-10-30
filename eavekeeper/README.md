# EAVEKEEPER — Shelter the Little City

An original English HTML5 drawing-and-rain puzzle. Draw up to four shelter strokes, then let the rain fall. Real simulated drops collide with the player's actual line segments. Protect the little travellers, watch the ricochets, and light up twelve corners of the city. Free editing and retries, no timer while designing, no purchases, advertisements, accounts or external runtime requests.

## Play

Drag in the sky to draw. A tap followed by a second tap draws a straight stroke between those points. The dotted first roof is an optional tracing guide. Strokes must fit within the ink budget and stay clear of the travellers. The sky drawing region is x18–402, y130–430 in the logical 420×560 scene. The little corners mark its bounds.

Let It Rain starts a deterministic, finite weather test. The rain begins only when the player chooses it; drawing and undo are disabled during the test. A roof is solid and stationary. Drops fall under gravity and wind, bounce or slide against its segments, and disappear after leaving the street or settling through bounded contacts. Decorative architecture is scenery, not hidden collision geometry. The simulation models circles against drawn segments, not fluid dynamics or material deformation.

Each roof earns one star for surviving, a second for keeping all three hearts, and a third for using no more than the gold ink threshold (with three logical units of gesture tolerance) without requesting a roof idea. Three hearts are shared by the street. A brief damage grace period prevents one clump of hail from consuming every heart instantly. A failed test keeps the design for free editing; a completed design can also be edited and replayed. Best stars only increase; repeating a roof does not farm currency or progress. The three optional little bells ring when a drop actually reaches them, for an extra visual and sound treat; they are not required for stars or unlocks.

Four roofs unlock the Spring Roof: higher restitution and larger ricochets. Eight unlock the Sponge Roof: ordinary raindrops are absorbed on contact, while heavy hail still bounces. The city map permits replay and unlocked raincoat palettes: Rose initially, Mint at six total stars, Honey at eighteen. Twelve finite authored rooms introduce split shelters, sideways storms, multiple travellers, hail and an elevated traveller. These are not infinite procedural levels.

Keyboard: focus the drawing field. Enter begins a stroke, arrows move its point by ten logical units, Enter ends it. R starts rain, Z undoes, H toggles a roof idea, P pauses. Tab/Enter operate the buttons. On mouse and touch, a cancelled pointer does not commit a stroke. Resizing, blur and background tabs cancel input, freeze gameplay and stop sound. Resume is explicit. Sound starts only after a gesture; it can be muted. Gentle Motion reduces decorative motion, camera shake and rendering density.

## Save and run

This browser saves stars, cleared roofs, tool and coat choices, settings and the current drawing under `eavekeeper-v1`. An interrupted rain test is deterministically reconstructed to its saved 120 Hz tick and resumes paused. A held unfinished stroke is discarded. Storage-blocked browsers remain playable, without reliable persistence. Saves are local to this browser and origin, not cloud accounts.

Serve the folder over HTTP(S), or deploy it to GitHub Pages. `index.html` and `standalone.html` contain the complete game CSS and JavaScript inline; there is no CDN, remote library, external font, image download, audio recording or WebGL dependency. The local SVG favicon is optional. Python `build.py` rebuilds the standalone files, hash manifest and deterministic ZIP. The editable source is `index-source.html`, `style.css`, `model.js`, `art.js`, `game.js`. `phone-preview.html` is a labelled responsive CSS-viewport QA fixture containing the actual game; it is not physical phone emulation.

Canvas 2D rendering targets about 30 fps. Collision simulation uses a fixed 120 Hz tick, at most 100 active drops and bounded visual effects. DPR is capped at 1.6, or 1.0 in Gentle Motion. Background architecture is cached. Interface controls have at least 44 CSS px hit areas. Responsive testing does not certify performance on every handset or audio quality by listening.

## References and original work

Gameplay interaction reference: [Rezona Thousand Strokes](https://rezona.ai/game/pgcserver/pv/rpvTPNEn/v3/dist/index.html). Its title, journey opening, first ink scene and an ordinary native horizontal drag were inspected. The new line appeared in the scene, and the displayed counter later rose from 0 to 10. Its full campaign, shield behaviour and Infinite Scroll were not completed or verified. This game uses the broad draw-to-create-a-solid interaction for a different shelter-and-weather puzzle; it is not a port or a one-to-one clone. No reference source, media or assets are bundled.

Art reference: the user's [flat-colour atlas](https://mygamesartstyle.jupiterthewarlock.com/styles/flat-vector/). The enlarged fourth Chants of Sennaar palace/courtyard screenshot was actually viewed: controlled warm pink/yellow planes, teal plants, clean architectural rhythm, readable height and restrained contour detail. EAVEKEEPER's buildings, characters, props, symbols, clouds, interface and effects are original Canvas paths. No game characters, complete layouts, screenshots, logos or generated imagery are reused.

Reference selection excluded previously produced or unsuitable mechanics, including paper dress-up, screw removal, colour flood, ribbon connections, lift delivery, demolition pendulums and multi-key first-person navigation. Wreck & Rally's tutorial and charge were inspected but not adopted: a prior WAH-Recking game already used pendulum demolition. Blindsight's control menu and The Dollhouse's title were also inspected, then rejected. The imported open-source catalogue's drawing query returned no suitable starting project. This package is original source, not an adaptation of a complete upstream open-source game.

## Validation

`node test-model.cjs` completes three campaigns through normal add-stroke/start/step/award actions, checks all twelve gold solutions, tool behaviour, invalid and over-budget strokes, genuine unprotected failure, undo/clear, exact interrupted-rain reconstruction, malformed/locked saves and duplicate-reward guards. `qa-model-report.json` records the routes. Mechanical checks are distinct from native browser play, subjective fun or a platform grade. Public delivery and mobile CSS-viewport checks are recorded separately outside this package.

Original source and assets: MIT, see `LICENSE.txt`.
