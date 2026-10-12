# Ember & Oak

An original compact HTML5 tavern-management game inspired by Travellers Rest's warm, detailed pixel tavern presentation and prepare/serve/clean/improve rhythm. This is a browser interpretation with original generated artwork, original code, and synthesized audio; it is not the commercial game or its complete feature set.

## Play
Open index.html, or serve this folder with any static web server. No build, third-party runtime, CDN, external fonts, login, or network service is required. Supports desktop and mobile portrait/landscape. Tap a guest's food bubble or order card; the keeper walks around furniture, prepares the dish, and serves it. Queue three more tasks. Tap dirty tables to clean or an upset guest to calm them. While preparing, press Finish when the marker crosses the green zone for extra tips. Leaving it alone still produces a good dish. Space also finishes preparation on desktop.

## A living little inn
- Eight recipes unlock over the first four evenings, using four persistent ingredient stocks.
- Seven named regulars; serve each three times for a keepsake, gold, and a guestbook record.
- Three different dishes in one evening earn a variety bonus. Fast service builds a tip chain.
- Eight rotating evening events affect patience and tips; later shifts bring more guests.
- Expand from two to six tables. Improve kitchen speed, walking speed, comfort, and hire a clearing assistant.
- Upgrades appear in the room as different furniture, plants, music decor, and the assistant.
- Earn up to three stars each evening. The next morning preserves gold, supplies, upgrades, and guestbook progress. Evenings continue without a fixed ending.
- Free emergency grain is available when almost broke, so a low pantry does not permanently block progress.
- Local automatic save includes an active shift, walking path, queue, preparation, and results. Settings pause the game; hidden tabs pause. Optional relaxed patience, sound toggle, reduced-motion support, and confirmed restart.

## Artwork and audio
Three coordinated categories generated with the built-in image_gen tool: complete tavern environment, keeper/customer animation atlas, furniture/food/decor atlas. Full prompts are in ART-DIRECTION.json. The original PNGs are archived outside this distributable under outputs/ember-and-oak-source-art. Runtime assets are lossless WebP conversions with identical RGBA pixels, drawn using source rectangles. Sprites, actors, orders, particles, steam, lights, rain, and furniture state are composed at runtime. Audio is original browser-synthesized gentle notes and interaction cues and starts after a user gesture.

## Validation
Engine simulations cover twelve consecutive evenings, all recipes and regulars, upgrade caps, resource bounds, invalid actions, and exact active-shift save restoration. Browser interaction testing covers serving, timing, cleaning, queueing, results, restart, purchase and persistence. Responsive checks cover 320x667, 390x844, 430x932, 667x375, 844x390, and 1280x720. This is browser viewport testing, not a claim of certification on physical phones. Typical rendering is capped at 30 frames per second. Atlas loading has a timeout and retry UI.

## Scope
One furnished inn interior, a compact service/upgrade loop, eight themed evening events, and persistent progression. Farming, a separate outdoor exploration world, multiplayer, and hundreds of recipes from the reference are outside this original browser game's scope.
