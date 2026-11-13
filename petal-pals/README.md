# Petal Pals

A self-contained HTML5 pet auto-battler inspired by Super Auto Pets. All animal illustrations, landscapes, code and synthesized sounds are created locally. This is a compact adaptation with local AI opponents, not the original game, complete roster or online service.

## Play

- Select a shop pet, then tap an empty team slot to buy it for 3 gold.
- Buy matching pets onto each other to merge: 3 copies reach level 2; 6 reach level 3. Abilities scale with level.
- Select a team pet, then another slot to swap or merge. The leftmost pet fights first.
- Select food and tap a pet. Food costs 3. Stat food is permanent; Honey, Garlic and Melon occupy the same equipment slot.
- Roll costs 1. Freeze retains an offer through rolls and the next shop. Sell gives gold equal to the pet's level.
- Battle resolves automatically; use 2× or Finish to accelerate the replay. Pets retain permanent upgrades regardless of outcome. Battle-only buffs reset after each fight.
- Win ten trophies before losing four hearts. Draws cost no heart. Champion teams may continue in endless mode.

Each new shop gives 10 gold, Swan income, and up to 3 interest from unspent gold. Fifteen collectible pets unlock across four shop tiers. Six foods, hurt/faint/summon/buy/sell/level-up triggers, temporary shields, splash damage and formation synergies support different builds. The collection and lifetime wins persist between new runs.

## Offline and hosting

Open packaged index.html directly: CSS, illustrations and scripts are inlined. No external libraries, CDN, fonts or network requests. Editable art.js, game.js and style.css are included alongside the self-contained entry. HTML5-platform imports should place index.html at the archive root.

Current run, gold, team, frozen offers, equipment and results save in localStorage. Reloading during the battle replay settles its already-computed outcome exactly once. New team replaces only the run, not the collection. Sound begins after a gesture; mute is in Menu. Space starts battle; Escape opens Menu. All UI is English.

## Verification

Automated Edge touch simulations ran three ordinary shop-to-battle campaigns, totaling 33 rounds, earning ten trophies and entering endless mode in each. Tests covered all pet ability families, Garlic/Melon, level-up buffs, purchases, sell buffs, Rabbit food, frozen offers, formation swaps, Swan income, Penguin buffs, saved results, interrupted battle settlement and defeat/restart. Portrait 360×740 and 390×844, landscape 844×390 and desktop 1280×800 were checked. These are browser simulations, not physical-device tests.

## Reference

https://store.steampowered.com/app/1714040/Super_Auto_Pets/
