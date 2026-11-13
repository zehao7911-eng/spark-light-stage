# BEECH & BUZZ

An original small pixel apiary puzzle collection. Bloom every safe patch, read nearby bee counts and fill a real jar in the scene. Twelve authored gardens, three surroundings, touch and keyboard controls, English UI. No generated images or external runtime dependencies.

## Play

Tap the glowing starter patch. It is always safe. Empty patches spread a wave of flowers; numbered patches tell you how many bees touch them in the eight neighbouring positions, including diagonals. Bloom all patches without bees to finish.

The first garden shows two bee markers in advance and guides the last safe patches. From the second garden, deduce locations using visible numbers. Every authored garden was checked to allow logical progress from its starter without guessing.

- **MARK BEE** switches to marker mode. Tap a covered plot to place/remove a marker, then switch back to HARVEST. Markers are optional notes, not proof. Marked plots cannot be accidentally harvested.
- Tap an already open number when its bee count matches neighbouring markers/known bees to open its remaining neighbours. Incorrect player markers can cause a rescue; this shortcut does not silently make guesses safe.
- **SCOUT** points to a safe patch deduced from visible numbers. It does not assume the player's markers are correct. Scouting records a scout use. A marker on a scouted safe patch must be removed before harvesting it.
- **UNDO** freely restores a prior bed state. Rescue and scout counts remain recorded for this attempt, even through undo. Replant starts a new attempt.
- A wrong tap catches a bee with a small net animation and reveals that bee. Your flowers remain and play continues. There are no lives, countdown or forced game-over restart. Revealed bees still count in adjacent numbers.

Finish for one star, use no rescues for another, and use no scouts for the third. Each garden keeps only its best score and stars. Replaying does not repeatedly add stars. Honey/Thyme/Berry jar-lid colours unlock at 0/12/24 total stars; these are cosmetic, not power upgrades. Completing a garden opens the next. The shelf contains twelve finite authored beds, not an endless random-level generator.

## Controls and accessibility

Tap on a plot. A drag/cancel does not harvest. On a focused canvas, arrows select a plot and Enter/Space acts. Z undoes, H scouts, F changes marker mode and Escape pauses/resumes. The pause card explains the rules and contains sound, Gentle Effects and Replant controls. Short-screen menus scroll with a sticky return button.

Gentle Effects reduces particles, removes the bloom flash and lowers the rendering cap. Sound is optional and starts after a gesture. Original locally synthesized plucks, wooden taps, rescue notes and a completion chime are used; no recorded music or reference audio is included. Hiding or pausing the game cancels voices and freezes decorative animation. The solved garden can continue its decorative bloom celebration until paused; its model is immutable.

The active cells, markers, undo stack, moves, rescue/scout history, current guide, unlocked records and settings save in this browser. An unfinished started garden reopens paused. Pointer state, temporary feedback particles and decorative frame age are not saved. If browser storage is unavailable, the current in-memory session still works; progress is not cloud-synced. Clearing browser storage removes saves.

## Art and implementation

All cabin, bark, canopy, roof shingles, beehives, basket weaving, flowers, hive lanterns, jar glass, digit glyphs, keeper and bee graphics are original source-pixel Canvas drawing. Three cached environments share a controlled woodland palette but have different props: Beech Glade, Berry Orchard and Lantern Apiary. The keeper has eight idle, eight harvesting and eight rescue frames. Their component poses are baked into canvases, not imported GIFs, generated images or commercial sprites.

The actual harvested fraction fills the illustrated honey jar. Cluster blooms unfold with short staggered drawing, pollen pixels and rising original notes. Rescue bees travel toward the keeper's net. The board retains quiet high-contrast clue areas while pixel detail lives around the plants and environment. Portrait puts the scene above the bed; short landscape places the scene beside the bed and tools in a separate column. No 3D/hand-painted commercial-asset parity is claimed.

The small shared `Pixel` drawing utility was reused from our original Rooftop Reverb renderer under MIT. Gameplay, bed definitions, apiary scenery, character frames, UI, synthesis and game-specific effects are newly implemented. The previous detailed-pixel art direction remains in use; no external screenshots, textures, models, code or audio are shipped. The current public Rezona catalog failed to load during reference selection, so no new played reference or reference completion is claimed. The mechanics are a forgiving eight-neighbour deduction adaptation, not a claim of a never-before-seen puzzle family.

`cover.jpg` is an actual native runtime screenshot. The icon is original SVG. No image-generation tool was used.

## Run or host

Serve this folder over HTTP, for example `python -m http.server 8000`, then open `http://localhost:8000/`. ES modules require HTTP; double-clicking index.html is not a supported launch method. Upload this folder unchanged to a static host. The ZIP has index.html at its root. No build, package installation, CDN, remote font, API, account, camera or microphone is required. Use a current Safari, Chrome or Edge browser.

Rendering uses small source-pixel canvases, cached backgrounds/frames, up to 36 plots and a bounded 120-effect list, at up to 40 fps (30 with Gentle Effects). It does not allocate a full device-pixel-ratio framebuffer. No physical-handset frame-rate claim is made.

## Verification

`node tests.mjs`: 1,945 assertions cover all twelve logic-only routes, clue-neighbour symmetry, real safe-cell conservation, finite terminal states, exact model restore/continuation, rescue/undo/scout badge accounting, marker and chord rules, no farming and malformed saves. An independent Python authoring check also rejected unsolvable/guess-dependent candidate layouts. These are controller checks, not a human difficulty study.

Native pointer input separately completed all twelve gardens with 36/36 stars. The actual journal displayed 12/12 completed jars; earned Berry was selected and Honey restored. Garden 5's 16/20 partial state reopened paused and continued. Actual marker/undo, bee rescue, rescue undo and Scout were followed by a one-star reclear that retained its old three-star record and 36-star shelf. The first garden also completed via the optional satisfied-number shortcut.

Final phone viewport checks covered 320x568, 390x844 and 844x390, no horizontal overflow and observed main controls at least 44 px. The largest bed's portrait plots were about 47.7 px wide on the narrow viewport. The final landscape last garden and final narrow opening were played to completion. Settings persisted through reload. A paused screenshot pair separated by more than one second had identical bytes. Final local console warnings/errors were empty. Physical handset hardware remains untested; no platform grade or subjective quality guarantee is implied.

## License

Original source and included drawings/synthesis: MIT. See LICENSE.txt, including the shared drawing utility notice.
