# Hearth & Herb

A browser apothecary built around an illustrated alchemy map and tactile tools. The visual direction follows the parchment, botanical illustrations, engraved ink lines, and workbench composition of [Potion Craft](https://store.steampowered.com/app/1210320/Potion_Craft/). The included illustrations, texture, characters, code, and synthesized sounds are locally created for this game.

## The workbench

1. Drag a herb into the mortar. Its arrow shows its direction on the chart.
2. Rub back and forth to grind it. A whole herb travels 40 map units; a fully ground herb travels 85. Move the ground herb from the mortar into the cauldron.
3. Draw circles over the pot to move along the dotted path, or hold STIR. Multiple herbs extend the route.
4. At an effect, pump the bellows to warm the coals. BOTTLE becomes available when the route is finished and the heat is ready.
5. Drag the bottle to the customer with the matching request. Closer alignment produces a stronger remedy and better payment.

There are eight effects, four herbs, five customer portraits, saved recipes, three upgrade tracks, and repeating days with changing orders. Herbs regrow during play. Customers may become sleepy and leave smaller tips, but they do not end the game. No hard time limit is imposed.

Wrong remedies stay on the shelf. Three bottles fit on the shelf; drag an unwanted one to the compost jar to recover one herb. Clear the pot with ↺ if a route goes astray. New days replenish the garden, while shelf bottles and work in progress carry over.

Discover a remedy to record its recipe. The recipe book can load a fully ground route using available herbs; stirring and heating remain manual. Earn coins and improve the pestle, bellows, and garden at day's end.

## Alternative controls

Tap a herb to place it in the mortar. Tap the mortar to grind, and once fully ground, tap it again to add the herb to the pot. Select a bottle and tap the customer to sell. On desktop: 1–4 pick herbs, G grinds or pours, Space stirs, F pumps, B bottles, Enter serves a matching bottle.

## Hosting and compatibility

Host this folder on any static server or GitHub Pages. `index.html` is the entry point. There is no build step, CDN, external font, WebGL requirement, or asset fetch during play. Canvas 2D supplies the artwork; Web Audio starts after a gesture.

The interface is English. Portrait, short landscape, and desktop have separate workbench arrangements. Progress saves under `hearth-and-herb-v1`, including routes, ground herbs, bottled potions, recipes, customers, coins, and upgrades. Overlays and hidden tabs pause simulation. If storage is blocked, the game remains playable without persistence.

Browser checks cover touch grinding, actual circular stirring, raw/fine alignment, pumping and bottling, wrong sales, all four double-herb effects, recipe loading, upgrades, day transitions, regrowth, compost, reloads, and denied storage. Layouts were inspected at 360×640, 390×844, 844×390, and 1280×900. These checks do not certify every physical phone.
