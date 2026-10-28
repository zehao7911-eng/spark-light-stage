# Rill & Root

An original, untimed garden puzzle. Swipe through a thick clay cutaway to make a stream. Real simulated drops must reach the planter before it grows and blooms. Three optional sun seeds reward deliberate routing. A completed garden adds a small physical flower to the greenhouse shelf as well as a best-star entry in the album.

## Play

Drag with one finger or a mouse. Rocks cannot be carved. Water turns the wheel and opens its sluice; a rain cup collects eight drops before tipping and releasing the stored drops. The guide button draws a suggested route without carving it. Undo restores the last soil stroke and clears loose water, retaining collected seeds, water and completed mechanisms. Retry starts this bed again for free. All twelve beds are available from the album; Next Garden follows the intended introduction order.

Keyboard: focus the canvas, use arrows to move the brush, hold Space while moving to carve, Escape to pause. Sound and light graphics can be changed in Pause. There are no timers, lives, purchases, currency, ads or accounts.

## Content

Twelve authored layouts: direct stream; stone bridge; winding shelves; alternating ledges; waterwheel sluice; wheel plus stone diversion; tipping rain cup; redirected cup plus shelf; moonlit mill; two successive rain cups; cup/wheel/sluice combination; final winding combination. Three greenhouse lighting/decor groups, twelve main blossom appearances, optional seed collection, best-only star records and a persistent miniature flower shelf. This is a compact twelve-level game, not an endless campaign or a full gardening simulation.

## Run and package

Serve this folder with any static HTTP server, for example `python -m http.server 8080`, then open localhost:8080. Publish this folder beneath any GitHub Pages subdirectory; every runtime path is relative. The ZIP has index.html at its root. No build step, CDN, external font, online API, worker or database is needed. ES modules require an HTTP/HTTPS origin; double-clicking index.html as a local file may be blocked by the browser.

## Art and audio

No Image generation was used. Original procedural Three.js geometry and code textures: rounded enamel/timber greenhouse, copper pipe and valve, clay front with actual smoothed extruded cut boundaries and a contrasting interior, roots exposed behind the cuts, beveled stone shelves, animated wooden paddle wheel and retracting sluice, thick ceramic cups that visibly tip, ceramic planter face, stem/leaves/petals, gold seed flowers and a physical twelve-slot garden shelf. Code-generated soil grain, original SVG icon, and a cover captured from the actual running game. Cover imagery is not a separate promotional illustration.

Original synthesized granular brushing, water notes, seed chimes and blossom chords use Web Audio after interaction. Voices are bounded and stopped on pause; no music files are fetched. The entire interface is English.

## Simulation and mobile limits

The cutaway is a 3D presentation of a 2D fixed-step water puzzle, not a full volumetric fluid simulation. Soil occupancy is 84 x 104; visible boundaries are traced, smoothed and extruded. Drops use gravity, local circle separation, soil/rock collisions and mechanical triggers. Water supply is unlimited, with at most 190 live drops. A cup releases its actual stored drops after the tipping animation passes its release angle. A wheel responds to drops passing through its sensor; it stays still before water arrives. A sluice uses a light arcade collision approximation.

Renderer DPR is capped at 1.5; 1024 soft shadow maps can be disabled with Light Graphics. Static scenery is batched by material; water, highlights, particles and collected shelf blossoms are instanced. Effects are capped at 130. Fixed simulation is 120 Hz with bounded frame catchup; rendering is capped around 40 Hz. Pointer capture/cancel and rotation are handled. Hidden pages pause; active saves restore paused. Local storage saves the soil, moving water, held cup drops, mechanism states, seeds and plant progress. Undo history itself is session-only. Real handset performance is not certified by viewport testing.

## Reference provenance

Selected and actually played the public Rezona water-routing reference at https://rezona.ai/game/pgcserver/pv/WoMdQCFf/v1/dist/index.html (catalog: Where s Tralelelo Water; runtime: WHERE'S MY TRALALERO?). After an idle timeout, retried the first level and carved a left-side route around the slab to its goal. The actual result showed 28/22 drops and 1/2 flags, with a reported clear in 2 seconds. The reference's code, art, character, logo, audio and assets were not extracted or redistributed. This independently written greenhouse game takes the simple carve-and-guide idea into a different original theme, untimed structure, water mechanisms and collection loop. It is not a literal replica or an officially graded platform submission.

## Verification

`node tests.mjs` covers all twelve ordinary carved routes with all three seeds, wheel/cup operation, held-water save continuation, ordinary mid-stream exact continuation, no idle progress, terminal-state stability, undo, corruption rejection and terrain boundary conservation. Actual browser play, mobile layouts, package integrity and final public publication are recorded separately in the delivery evidence.

## License

Original code, models, textures, icon and synthesized sounds: MIT (LICENSE.txt). Three.js r147: MIT (THREE-LICENSE.txt). No other dependency or reference-game asset is included.
