# Bounceback Baths

An original one-finger toy-bathhouse brawler. Drag anywhere in the pool to move; close bubbles receive automatic mitten punches. Punches spend one of four limbs. Release after a punch to regrow for one second and send a radial burst through nearby bubbles. Holding still without a previous punch does not farm points. Four enemy silhouettes include armoured shells, faster antenna bubbles and a crowned six-hit royal bubble. Dotted pink rings telegraph dashes. Losing all limbs triggers a free bubble rescue, with no game over or paid systems.

Eight baths have different palettes and configurations: open courtyard, lotus islands, alternating fountain push lanes, a sideways current, moonlit islands, a three-island terrace, orchid fountain lanes and a final royal encounter. These are eight variations of one compact arena mechanic, not eight different game genres. Earn up to three stars per bath: clear it, avoid a rescue, use at least two regrow bursts. Best results are retained; six/fifteen stars unlock Sage/Lilac colours. An active bath, exact enemies, charge, score and profile save locally. No cloud account. If storage is unavailable play continues without persistence.

## Run and controls

Serve this folder with any static HTTP server and open index.html. No build tools, CDN, remote fonts, third-party assets or network APIs are needed during play. Desktop arrows/WASD move and auto-punch; hold Space to bonk in place, release all keys to regrow, Escape pauses. Pointer drag works with mouse or touch. REGROW releases movement. Extra touches are ignored. A pause, blur or hidden tab releases input, freezes the simulation and stops audio voices. Restored games open paused. Pause offers Gentle effects and a PNG postcard download.

Canvas2D, original JavaScript/SVG art and synthesized WebAudio. DPR capped at 1.5, physics 60 Hz, drawing capped at 40 Hz, six live opponents and 160 short effects maximum. Static palace/tile/plant art is cached. No WebGL requirement. Responsive portrait/landscape layouts, safe-area padding and 46px primary controls. Browser viewport tests do not certify physical phone performance.

## Reference and originality

Actually played Rezona Regen Pool: https://rezona.ai/game/pgcserver/pv/VdJutbhM/v5/dist/index.html . Started the pool, moved with D and held Space, observed score 100, Wave 2, x4 and a stand-still-to-reabsorb prompt. No full reference completion is claimed. This independent interpretation takes the movement/punch/rest-regrowth idea and adds automatic proximity punches, a charged release burst, toy limbs, a softer rescue, original baths, star records and cosmetic progression. No reference source, pictures, characters or sounds are redistributed.

Art study: https://mygamesartstyle.jupiterthewarlock.com/styles/flat-vector/ . The enlarged Chants of Sennaar pink palace screenshot was viewed for grouped pink/cream/teal shapes, architectural rhythm and clear light/shade boundaries. All runtime drawing here is original code; the reference screenshot and commercial assets are not bundled. The graphic style is an interpretation, not a pixel-identical reproduction. No image-generation tools used. Cover is an actual game capture; icon is original matching SVG.

## Verification

Run `node tests.cjs` for all eight rooms across three seeds, exact mid-charge continuation, no passive idle play, release/hold distinction, bounded actors/limbs, pop conservation, terminal freeze, corrupt save rejection and idempotent star rewards. Browser checks are recorded separately from these model routes.
