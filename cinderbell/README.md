# Cinderbell · The Night Forge

An original mobile HTML5 forging game. Tap glowing marks to hammer a rough metal blank flat, dunk it in a real water tub and reveal a finished charm. Nine different silhouettes form a finite, replayable commission book.

## One small loop

1. Tap a glowing ring. Hold it for repeated blows. Aiming at its centre makes a **true strike**, which shapes metal faster. A broad hit still works; there is no failure timer.
2. The surface actually dents and spreads as each mark is shaped. All marks must be complete before **DUNK IT!** becomes available.
3. Dunk the workpiece, see it cool in the water and collect the finished piece on the workshop's actual wall.

The completed shapes are Moon Key, Lucky Shoe, Little Anchor, Sun Seal, Swift Feather, Fox Bell, Star Compass, Dragon Wing and Crown Clip. Their contours, holes, point placements and number of hammer blows differ. The same workshop remains the setting; this is not nine separate environments.

Keyboard: **1–9** strike a particular mark; **Space** strikes the current unfinished mark or dunks a ready object; **Escape** pauses. Pointer capture and cancellation release the hammer when a finger leaves the page. At most three non-overlapping rings appear at once, keeping the touch field readable.

## Rewards and replay

One star rewards completion, another rewards at least 50% true strikes and the third rewards no more than twice the number of marks plus two blows. Only a commission's best stars count toward total progress. Repeatedly reopening the same result does not award more stars.

Six total stars unlock **Moon steel**; twelve unlock **Rose copper**. Select the next piece's finish in **My Collection**. The book replays unlocked commissions and shows each saved best result. Completed workpieces also hang as three-dimensional objects on the workshop wall. The final order can be replayed, and earlier orders remain available.

The active mark health, local surface state, selected point, hits, cooldown, heat appearance, chosen finish and quench phase save locally. Refresh opens the title; **Continue Crafting** restores the interrupted work. Best stars and collection finishes are retained. Storage is local to the device/browser; there is no server account, telemetry, purchase, advertisement or real-money mechanic.

## Actual runtime art

All art is original code-built geometry, materials, vector UI and procedural Canvas textures. **No image-generation tool was used.** The cover is a screenshot of the actual title scene. The icon is an original SVG.

The room uses indigo masonry, copper boiler plates and rivets, a moon window, glowing coal/fire, leather bellows, wooden tool benches, tongs, a recipe-specific physical blueprint, a water tub and real collection hooks. Soot is an original mole assistant with separate eyes, muzzle, nose, whiskers, ears, cap, goggles, stitched apron and individual claws. The player's hammer and gauntlet move to each blow and recoil. Sparks bounce; the surface is deformed by local, precomputed influence weights. Water, steam, camera travel, cool-metal edging and a maker's stamp accompany quenching.

This is a forgiving stylized craft game, not a scientifically accurate metallurgy or rigid-body simulation. Piece contours are authored in advance; hammering deforms and flattens their dense surface rather than permitting arbitrary free-form sword design. Heat is visual feedback, not a resource requiring a second management system.

The user's **Harbor Haul V2** is the quality calibration for a coherent complete space, readable controls and a tangible action/result loop. Its pastel town, driving mechanics and assets are not reused. The official **Fantasy Blacksmith** Steam page was inspected for the basic hot-metal/anvil/hammer/cooling premise and its wall-of-finished-work screenshot: <https://store.steampowered.com/app/959520/Fantasy_Blacksmith/?l=english>. No commercial source, models, artwork, audio or characters were copied, and no full reference playthrough or identical-replica claim is made. Cinderbell's night workshop, mole and flat charms are original.

## Run

Serve this folder over HTTP(S), for example `python -m http.server 8000`, then open `http://localhost:8000`. Upload its contents to any ordinary static host, including GitHub Pages. `index.html` is at the ZIP root. There is no build step or external CDN/font/asset requirement. Modules require HTTP(S); double-clicking a file is not the supported launch method.

Bundled Three.js **r147** is MIT licensed; see `vendor/THREE-LICENSE.txt`. Original source/artwork are provided under `LICENSE.txt`.

## Mobile and verification

English UI; portrait-first responsive touch controls; minimum 46px interface buttons and 56px forging rings; responsive landscape menus; safe-area spacing; render cap 40 FPS; DPR cap 1.5; 1024px shadow map; batched static room and character parts; instanced sparks and steam; capped effects and sound voices. Low graphics mode disables shadows and uses DPR 1. Pausing, blur and backgrounding stop simulation/rendering and silence audio.

`node tools/test.mjs` runs 18 complete ordinary-input routes across all nine recipes, precise and broad-hit rewards, real-material point placement, cooldown/duplicate guards, no passive crafting, mid-work and mid-quench restoration, frozen terminal state and corrupt-save handling. The phone/layout fixtures embed the actual game for browser-size checks. These checks are not physical handset performance certification. No platform grade or minimum-payment guarantee is made.

