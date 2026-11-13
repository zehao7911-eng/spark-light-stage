# Little Stockroom

An original compact HTML5 shop/warehouse game, directionally inspired by sorting, remembering stock locations and fulfilling service-window orders in Wilmot's Warehouse (Steam 839870). This has direct crate gestures rather than the reference's walking/pushing worker controls. All code, goods, characters, interface, decorations and synthesized audio here are original. No commercial assets, image generation, external library or CDN is used.

## Play

Drag a crate to an empty square to move it. Drop it on a matching picture to combine stacks, up to capacity. Alternatively tap the crate, then tap the destination. Arrange freely in the morning, then press OPEN SHOP. Drag/tap goods to the customer window requesting the same picture. Only the requested quantity is removed; extras remain. Two-product requests arrive from day 3. Wrong windows shake but retain all goods. Cancel clears your selected crate.

Keyboard: arrows move the dashed focus square, Space picks/places a crate, 1/2/3 delivers selected goods to the corresponding window, Enter opens the shop, Escape/P pauses. The keyboard focus outline is separate from the selected crate outline.

The service clock counts up. It never ends your shift or deletes inventory. Stars reward finishing, no wrong deliveries, and meeting the speed target (45 + 7 seconds per order). Morning organization time and pauses are excluded. Complete orders within 8 seconds of the previous completion to raise the chain, earning 2–5 coins per order. Completion adds 8 + 2 per star. Rewards are issued only once per completed shift.

Each new morning resets inventory and placement for a new delivery, keeping your upgrades, coins, best stars, unlocked days and paper styles. There are six shop palettes, six animal customer portraits, eighteen distinct goods, 5–10 orders per shift, rising quantities capped at seven of the first good plus one or two of a second good. Later days continue seeded stock/order variations and cycle the six themes; they are not unlimited authored locations. Stack capacity upgrades have three levels (6/9/12/15), with costs 22/46/70. Sage and Lilac paper cost 18/28, Oat is free. Shop journal replays require a second confirmation. A replay is a fresh shift and can earn normal shift rewards.

## Presentation and access

Original illustrated catalogue crates, shape-based goods, paper floor, striped customer awnings, animal faces, changing shop sign, clerk/cart, plants and later shelf/clock accents. Crates fly to windows, satisfied customers smile, merges release confetti, chains show a small celebration, and wrong deliveries give a gentle sound/shake. Soft local synthesized note motifs start only after interaction. There is no recorded music.

All UI is English. Touch targets are large; layout switches to a wider warehouse arrangement on short landscape screens. Pause/background releases gesture input, freezes the canvas and silences the audio master. Input resumes released. Progress, world state, paper selection and mute save locally as little-stockroom-v1; clearing browser data resets them. Storage failures are tolerated.

## Package

Open index.html directly, or serve this folder over HTTP/HTTPS. No build, account, WebGL, network connection, images or fonts are required. Rendering uses Canvas2D at DPR capped at 1.5, with 42 bounded crate cells and at most 90 visual effects. Browser touch/viewport emulation is not a physical phone certification.

Reference: https://store.steampowered.com/app/839870/Wilmots_Warehouse/
