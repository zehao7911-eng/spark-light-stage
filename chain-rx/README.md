# CHAIN RX

A compact HTML5 hero-chain arena roguelite, closely following SNKRX's visible charcoal arena, numbered colored hero blocks, pale geometric enemies, flat colored projectiles, glyph class icons, three-column shop, party display and passive-item silhouettes. Shapes are redrawn in Canvas/SVG and the implementation is independent. This does not contain the original game's complete hero roster, music, exact rules or artwork.

## Play

Hold LEFT or RIGHT to steer a continuously moving chain. Heroes automatically attack targets within range. Keyboard: arrows or A/D turn; Space pulses; Escape pauses. Walls reflect the party safely. Pulse damages and knocks back nearby enemies and removes nearby hostile shots; it recharges in 8 seconds, or 6 with Backlash.

Clear all waves to earn gold and heal. In the shop, hire one of three offers, lock an offer across rolls and arenas, or select a party hero to reorder or sell. Rerolls cost 2. Buying copies merges automatically: 3 copies reach level 2; 6 reach level 3. Capacity is eight different heroes. Saving gold grants up to 5 interest on a clear.

Twelve heroes span four classes. Two and three distinct heroes grant class bonuses: Ranger attack speed, Warrior damage reduction, Mage damage, and Healer healing. Arrow, spread, pierce, melee, area slash, life steal, explosions, chain lightning, healing, party damage boost and periodic shield attacks support different builds. All heroes gain stronger damage with levels; healing and Bard buffs also scale.

Three bosses guard arenas 4, 8 and 12: minion summons and a six-shot ring, rotating fourteen-shot rings, then aimed fans plus crossing shots. Clear twelve arenas to unlock endless progression. Six passive items can be earned at boss milestones; items are unique. A shared party health pool is used rather than separate per-hero deaths.

## Offline / hosting

The packaged index.html contains all scripts, CSS and the icon. Open it directly without an HTTP server or network connection. Editable source is included. No external dependencies, fonts, images or CDN requests. HTML5 platforms should unpack with index.html at the root.

All UI is English. Portrait/landscape touch layouts use large steering buttons; the shop scrolls when needed and its Fight button stays visible. Hidden tabs pause combat. Stable shop, reward, win and loss states save locally. Reloading during combat restores the arena's starting shop checkpoint, avoiding partial enemy progress and duplicated rewards. Sound starts after a user gesture; mute is in the pause menu.

## Validation

Normal-build browser simulations completed all 12 arenas and entered endless, including all three boss patterns. Tests verified merge tiers, class counts, sell/reorder, offer locks, actual touch steering events, Pulse, pause, interrupted-arena checkpoint recovery, defeat/restart, and boss rewards surviving reload exactly once. Portrait 360×740 and 390×844, landscape 844×390 and desktop 1280×800 were checked. Physical phones have not been tested.

## Reference

https://store.steampowered.com/app/915310/SNKRX/
