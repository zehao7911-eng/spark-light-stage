# DICEY POCKET

A complete, English-language browser adaptation of the MIT-licensed **Fortuna Dice Show**. The design reference is the dice-as-actions, equipment-slot and floor-exploration loop of [Dicey Dungeons on Steam](https://store.steampowered.com/app/861540/). This is an unofficial web adaptation, not the commercial game, its source release, or a claim of 100% content parity.

## Play

Open `index.html` directly or upload the complete folder to a static HTML5 host. No build tool, account, server API, remote scripts or CDN is required. Touch and mouse are supported.

1. Choose a challenger, enter the floor and tap a glowing room on the branching map.
2. Drag a die into an equipment card. You can also select a die then tap a card, or simply tap a card to automatically use its highest valid die.
3. Read the enemy red dice to see its announced actions. Attack, block, change dice or cancel dangerous actions with status effects, then END TURN.
4. Take equipment rewards, manage the bag, shop, upgrade items and find healing rooms. Clear each boss to open the next floor.

Dice requirements include odd/even, maximum/minimum, exact values, matching pairs and persistent countdowns. Burn makes dice costly to use, Freeze changes high dice to one, Shock cancels equipment actions, and Poison, Weaken, Strength, Thorns and Dodge alter tactical choices. Valid slots highlight while selecting or dragging dice. Damage, block, status changes, rolling dice, projectiles, character reactions and synthesized sound provide direct feedback.

Keyboard: 1–9 selects dice, Enter activates focused equipment or ends a turn when the page body is focused, R/Q uses the class skill, Escape cancels selection. Help and tooltips explain mechanics. Screen-reader die controls and card descriptions are included.

## Contents

- Four classes: Warrior rerolls, Thief steals enemy equipment, Mage chains spells and changes spellbook pages, Gambler rolls an extra die and can turn a die into one or six.
- Six procedurally generated floors with fights, elites, bosses, treasure, healing apples, shops, a forge and fortune events.
- 52 player items, each with an upgraded state; 16 enemy-only item actions; 36 enemy/boss definitions.
- Eight tactical status effects, equipment bag, gold, experience, level upgrades and extra dice at levels three and six.
- Automatic run saves, pending rewards, enemy intent and battle state; separate best-run and fight records.
- A coherent 40-character illustration atlas, painted dungeon stage and locally bundled handwritten font.

## Source reuse

The open-source-game-reference skill was used to search the catalog and check reuse requirements. Its current snapshot did not contain a suitable Dicey Dungeons entry. Follow-up inspection found [jeiel85/fortuna-dice-show](https://github.com/jeiel85/fortuna-dice-show), commit `8720923bc14ad0dfd9e9bb8a0fb91e632f7fd4b5`, under MIT. This package actually adapts the complete engine and browser interface from that project, including dice conditions, all item actions, combat, enemy intents, classes, procedural maps, shops, events, save validation, animation, audio and input handling. It does not merely cite a repository beside a new unrelated engine.

`UPSTREAM-LICENSE.txt` preserves the original author notice. `upstream-original.txt` is the unmodified original HTML for source comparison. The inherited pure-engine regression tests and historical save fixtures are included, with localized text expectations. The upstream CDP browser-automation script is not included or used; browser tests here used the permitted native browser interface.

Changes: full English localization, shorter class descriptions, a separate save namespace, paper-colored interface styling, new character/stage art, atlas registration, portrait accessibility labels, mobile sizing and desktop card clipping fixes. One localization regression in legacy upgrade-message recognition was fixed with case-insensitive matching. The original service worker/manifest registration was removed to avoid old shell caching and missing nested icon paths when hosted in this repository. All runtime files remain bundled.

## Scope and compatibility

This implements the four classes and six-floor content of the licensed source. It does not include all six commercial Dicey Dungeons classes, its episodes, DLC, original soundtrack, characters or commercial illustrations. Run upgrades belong to the current expedition; best results and fight records persist separately. Local storage restrictions may prevent saves, and the title screen reports this explicitly. The new save namespace does not import saves from the original Korean site.

The game uses Canvas 2D and ordinary HTML/CSS. Portrait layouts at 390 and 320 CSS pixels and an 844 by 390 landscape viewport are tested, with local scrolling where needed. Browser-size testing is not a guarantee for every physical phone. Decorations and the handwritten font load independently, so the game remains usable if an image is slow. Audio starts after a gesture. Interrupted enemy/rolling animations finish through the upstream recovery loop; this is a turn-based game without an idle countdown.

## Verification

Run:

```
node --test tests/engine.test.mjs tests/content.test.mjs
```

26 tests pass, including all 104 player-item/upgrade activation states, 60 seeded map generations, class abilities, enemy intents, damage/status interactions, final-boss rewards, shop transactions, versioned save recovery and absence of missing bundled dependencies. See `BROWSER-QA.md` for actual pointer and hosted checks.

## Artwork and font

All newly shipped illustration assets were generated specifically for this adaptation, rather than extracted from Steam. No Steam screenshot is bundled. `ART-SOURCE.md` records the exact prompts, selected masters and lossless encoding. Kalam by Indian Type Foundry is redistributed unmodified under the included `FONT-LICENSE.txt` (SIL OFL). New code modifications retain the upstream MIT terms.
