# Ricochet Ruins

A self-contained HTML5 action roguelite following BALL x PIT's ricochet-combat, elemental-build, fusion and town-upgrade loop. Artwork and code are locally created, not the original game's assets. This is a smaller adaptation, not an identical recreation or the complete commercial game.

## Play
Open index.html directly or host this folder. Drag on the battlefield to move; balls fire automatically toward the nearest enemy. Catch returning balls to rebound them. BURST removes enemy projectiles, deals damage and releases lightning balls. It has a 14-second cooldown.

Defeated enemies drop experience shards. Level-up choices pause the game. Choose new balls, level existing balls or increase damage, firing speed, critical chance, movement or healing. You can hold four ball types, plus the standard firing stream. Combine two compatible level-three elements by selecting the fusion offer at a subsequent level-up:

- Flame + Frost: Steam
- Flame + Venom: Wildfire
- Frost + Spark: Blizzard
- Vampire + Phantom: Soul

There are nine basic balls, four fused balls, three regions and three named boss encounters over twelve waves. After wave twelve, continue into Endless. Completed waves permit extraction. Both extraction and defeat transfer the expedition's loot once to the town.

Upgrade the Forge (damage), Barracks (health), Observatory (experience) and Sanctuary (regeneration); each has six tiers. The Knight starts unlocked. Clear wave two for the Scout and wave four for the Arcanist. Each has distinct stats. Permanent upgrades apply on the next expedition.

Desktop: arrows/WASD move, Space activates BURST, Escape pauses. Touch uses Pointer Events. Sound uses Web Audio and starts after interaction. No real-money functions, accounts, dependencies or external requests.

## Save
Key: ricochet-ruins-v1. The complete run, actor positions, current balls, enemies, choices, cooldown and permanent progress save every five seconds, at choices/round transitions and when hidden. Reloading an active fight opens the pause screen. Hidden pages and overlays stop simulation. Clearing local storage resets progress. Save scope is per browser/origin.

## Rendering
Canvas 2D, procedural pixel art, textured/chipped stone, vines, three palettes, torch glow, cached sprites and background, particle/damage-text caps, 120-Hz fixed simulation and RAF rendering. The HUD updates at 10 Hz and loadout art only changes when its composition changes. Physics checks are bounded by 170 balls. The packaged index.html contains all code and styles and works offline.

## Tested
Normal unboosted opening through twelve waves and all three bosses using actual touch movement and UI upgrades, followed by Endless; pause/resume; exact progress reload; single payout after extraction/reload; permanent purchase and character choice; all four fusion selections using eligible-build fixtures; portrait/landscape at 360x740, 390x844, 844x390 and desktop 1280x800. Browser simulations, not physical mobile device tests. Offline and deployed builds are checked separately.

## Reference scope
https://store.steampowered.com/app/2062430/BALL_x_PIT/

The reference informs the perspective stone corridor, pixel armour/monster blocks, automatic ricochet fire, XP-based choices, ball fusion and persistent rebuilding loop. This adaptation has its own redrawn pixel illustrations and a limited set of balls, enemies, buildings and characters. It does not include the original's full roster, precise rules, sounds, art or seventy-building city system.
