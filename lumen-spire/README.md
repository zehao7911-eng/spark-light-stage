# Lumen Spire

Original compact HTML5 incremental tower-building game, inspired by the build → spirits → research → expansion loop of **Tower Wizard** by Barribob (Steam app 3372980). Original code and art; not a copy of the commercial game's assets or full content.

## Play
Open index.html or serve this folder with any static server. All seven files are self-contained. No build step, dependencies, fonts, generated images or network requests. GitHub Pages and ordinary embedded HTML5 hosts are supported. JavaScript and Canvas 2D are required.

- Hold Channel / Space, or the large crystal, to collect mana. Rooms and spirits also produce automatically.
- Six rooms: Lantern Hall, Observatory, Scriptorium, Cloud Garden, Celestial Orrery, Starcrown. Build in order; every room has 12 levels. Level 5 doubles that room's income and level 10 triples it. Tap an existing room for details.
- Up to 16 spirits fly visible collection routes. With the Observatory, switch all spirits between gathering mana and studying insight. Scriptorium gives automatic insight.
- Six research branches improve channeling, room income, spirit delivery value/speed, Starlight duration and passive insight.
- Starlight / S activates 3× room production and 2× spirit mana deliveries for 15–27 seconds. Its meter fills from channeling, trips and time.
- Catch a falling star with the visible button for mana, insight and charge. Stars appear every 40 seconds after the first 22 seconds, stay for 12 seconds, and never penalize you if missed.
- Twelve constellation milestones give one-time mana and insight rewards.
- Building Starcrown enables Ascension. Earn Eternal Stars based on lifetime earned mana. Each star adds 25% room output and strengthens spirits/channeling. Rooms, research and spirits restart; records and claimed constellations remain. Start the new run with 50 mana. Further ascensions remain available.

## Art and performance
All graphics are authored in art.js: native 480×320 pixels, integer rectangles, scanline polygons/circles and Bresenham lines, nearest display. Moonlit floating island, layered mountains/forests, waterfalls, a cutaway tower with six distinct inhabited rooms, decorated level milestones, a wizard, flying spirits, a moonpool, lantern camp, spell particles and a growing constellation. No imagegen output is included. Visual effects are bounded. Cached background and 30 Hz simulation/render targets; hidden tabs and menus pause. Synthesized gentle sound effects start after user interaction. Gentle motion and mute settings persist.

## Save
Local key `lumen-spire.v1`. Autosaves every five seconds and on actions/tab hiding. Resources, room/research levels, spirit routes, active boosts, milestones and preferences restore. Invalid saves fall back to a new world. Resting income estimates 40% of unboosted production for up to two hours; no offline meteor claims. With storage blocked the game runs but progress cannot persist. New save requires an explicit confirmation in Settings.

All game-facing text is English. Responsive portrait/landscape controls are at least 44 CSS pixels. Browser viewport testing does not certify every physical handset. This is a relaxed construction/production game, not combat, archery, mining or farming. No real-money transactions, ads or telemetry.

## Source
- engine.js: deterministic economy, spirits, research, rewards, ascension and persistence; CommonJS export for verification.
- art.js: original pixel drawing and animation.
- app.js: stable UI, input, dialogs, audio and saves.
- style.css: responsive interface.
- ART-DIRECTION.json: visual specification.
