# Fableflight — The Little Archery Guild

A complete, self-contained HTML5 incremental archery game. Reference: Magic Archery by Barribob (Steam app 2905170). This is an original compact interpretation of its training → upgrades → quests loop, not a distribution of the commercial game's code or assets.

## Play

Open index.html, or serve this directory with any static HTTP server. There are no packages, build steps, CDNs, fonts, accounts or external requests. Upload this directory to GitHub Pages; keep index.html at the directory root. JavaScript and Canvas 2D are required. The ZIP has the same root layout.

- Hold **Train** or **Space** for continuous shooting. Tap a target to prioritize it.
- Buy equipment with coins. **Clockwork bow** trains automatically while enabled.
- Fill **Overgrowth**, then tap it or press **F** for eight seconds of stronger, faster arrows.
- Guild trials have three target waves and one guardian, with a 40-second limit. Failure never removes equipment or coins. First victories give seals.
- Spend seals once to unlock Ember splash, Frost bonus coins or Storm chain lightning. Switching owned runes is free.
- Trial 3 unlocks Moonwater Grove; trial 6 opens Sunspire Ruins. Travel back to easy targets whenever desired.
- Claim journal milestones for extra coins. Twelve milestones and six target discoveries persist.
- After trial 8, optional renewal resets current equipment, coins and trial tier, gives 80 starting coins and permanent Guild Crests. Each crest adds 20% power and 25% income. Runes, seals, best trial, areas, collections and claimed journal rewards remain.
- Clockwork resting income is an approximation at 25% of a capped training estimate, up to two hours; trials do not progress offline.

## Art and audio

All art is authored in code in art.js at a native 480 × 270 resolution. Integer pixel rectangles, scanline circles/polygons and Bresenham lines; nearest-neighbor display. Three palette-coherent environments, a multi-pose articulated archer, six target designs, a guardian, workshop expansion decorations, a mechanical bow, bow tiers, projectile trails, wood chips, pixel damage labels and elemental effects. No image generation or generated-image assets are used. Earlier generated concepts were discarded.

Responsive DOM controls stay readable independently of the scene. Main controls are at least 44 CSS pixels. Portrait and landscape layouts are supported. Browser viewport testing is not certification on every physical phone. Settings provide sound and gentle motion. No flashing full-screen effects. Synthesized bow, hit, critical, purchase and victory sounds require a user gesture.

## Persistence and implementation

Local save key: `fableflight.v1`. Saved every five seconds, on purchases and tab hiding. Active trials, target HP and pending impacts are restored. Menus and hidden tabs pause simulation. No automatic page reloads. Settings → New save requires explicit confirmation. If storage is blocked, the game remains playable but progress cannot persist.

- engine.js: deterministic 30 Hz simulation, resource economy, upgrade rules, trials, quests, renewal and save/restore. Also exports a CommonJS interface for verification.
- art.js: pixel-only scenery, sprites, animation, icons and bounded transient effects.
- app.js: input, stable DOM controls, modal flow, rendering, audio and persistence.
- style.css: responsive interface.

Gold comes from targets, trials and milestones. Arrows and retries are free. No real currency, ads, gambling, purchases or telemetry. All game-facing text is English.
