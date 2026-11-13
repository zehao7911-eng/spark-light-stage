# Magnet Munch

An original HTML5 toy-town cleanup game with a springy magnet, a hungry recycling robot, growing pickup power, hidden toys, and recurring neighbourhoods.

## Play

Open `index.html` in a modern browser, or serve this folder from any static web host. No build process, account, CDN, external font, or server API is required.

- Drag or tap anywhere in the yard to steer your magnet. WASD and arrow keys also work.
- Eligible objects roll toward the field, hop up, and cling to your magnet. Weight and cargo capacity limit each haul.
- Bring the cargo to Gus, the green recycler at the top. Items pour into his mouth, award coins, and raise your pickup power.
- Super Pull temporarily widens the field. Space also activates it. Drop releases the cargo; X also drops.
- Move large clutter to uncover two lost toys in each neighbourhood. Deliver them to add them to the permanent collection.
- Clean the whole block for a perfect bonus, or proceed after at least 85% of its material is recycled.
- Choose an upgrade and continue into another neighbourhood. Three scene themes rotate, with new object positions and growing clutter counts.
- Spend earned coins on magnet colours in the Magnet Garage. Coins and found toys stay when starting a fresh run.

There is no countdown, damage, or game-over timer. The loop is collect → transport → recycle → grow → restore → upgrade → continue.

## Content

23 hand-drawn object types, five pickup-power levels, elastic cargo motion, weighted capacity, ground collisions, timed Super Pull, pickup chains, 12 lost-toy stamps, four magnet styles, three upgrade paths, three neighbourhood themes, evolving garden scenery, and local save progression.

All graphics are drawn with original Canvas paths. Sprite caching, spatially partitioned floor collisions, fixed 50 Hz game logic, DPR capped at 2, and 30 FPS rendering on narrow screens keep the game lightweight. Synthesized sound starts after interaction. Physics pauses in menus and hidden tabs.

## Compatibility checks

Tested in Chromium at 390×844, 360×640, and 844×390, including browser-dispatched touch drags, collection, hauling, recycling, pause, zoom, save restore, full-district completion, hidden-toy recovery, upgrades, and a garage purchase. Physical phones and browsers can vary; these checks are not a guarantee for every device.

Keep `index.html`, `style.css`, `art.js`, `game.js`, and `icon.svg` together. The archive root contains `index.html` for HTML5 game platforms. No image-generation assets were used. Donut County's scene-cleanup appeal and Katamari's playful collection growth informed the direction; their assets, characters, and code are not included.
