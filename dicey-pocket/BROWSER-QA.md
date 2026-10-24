# Browser verification

24 October 2026. Native browser actions were used. These are desktop-browser viewport checks, not physical-phone hardware certification.

## Actual local playthrough

- Cold start displayed the English title; selected Warrior, entered Backstage and chose a branching-map fight.
- First opponent: Jelly Slime, 16 HP, announcing a 4-point block and 5-point attack. Player dice were 4, 1 and 2.
- A native pointer drag moved the 4 into Hammer Tap. Its value became 5; the tool became used. Tapping Greatsword consumed that 5 and dealt 9, lowering the slime to 7 HP. Rusty Sword consumed 2 and lowered it to 5 HP. Wooden Shield consumed 1 and granted one block.
- END TURN resolved the announced attack for four net damage, taking player health from 60 to 56. Next turn Greatsword consumed a valid five, broke the four-point enemy block and dealt the remaining five damage, winning the fight.
- Victory awarded 12 gold and one XP. Gold changed from 15 to 27. Reload/CONTINUE preserved the unclaimed three-item reward. Took Healing Light, increasing the equipped set to five items.
- Shop purchase of a 20-gold apple changed wallet 27 to 7, capped healing at 60/60 and reduced apple stock from two to one. A later unaffordable shop remained freely passable.
- At the forge, selected Greatsword for a free upgrade. Reloading and opening the bag showed Greatsword+ with minimum four, rather than minimum five. Gold, health and equipment persisted.

## Layout and interaction refinements

- Desktop 1280 by 720 battle displayed all four starting equipment cards in full after fixing a vertically centered scroll-area clipping issue.
- A 390 by 844 battle supported the real equipment action, health/block feedback, dice tray, skill and END TURN controls.
- At 320 by 740, document and main-screen scroll widths both measured 320, with no horizontal overflow. Header controls measured 44 CSS pixels high and at least 44 pixels wide; available map nodes measured about 49.64 by 49.64 after adding invisible touch padding. Visible page text contained no Korean.
- At 844 by 390, document and screen widths both measured 844. Header controls remained at least 44 by 44; the 286-pixel main screen scrolls vertically for dense views.
- Initial character atlas bleed was corrected through the image-generation edit workflow; the slime portrait no longer shows a neighboring rat tail.
- The final illustrated backdrop and character atlas load independently of the game logic. No startup image-loading gate blocks play.
- Local console warning/error observations were empty throughout the tested flow. The upstream CDP browser smoke script was neither run nor included in this package.

## Automated checks

`node --test tests/engine.test.mjs tests/content.test.mjs`: 26 tests pass. The content suite activates all 104 player-item/upgrade states and checks combat/save integrity, English data, required assets and licenses. The inherited engine suite covers 60 seeded map generations, dice conditions, statuses, enemy AI, class skills, reward/final-boss rules, shop/forge/events, saved enemy-action idempotence and version migration. A localization issue in old upgrade-message matching was found by these tests and corrected without removing the migration assertion.

## Limits

The native browser walkthrough covers one complete fight, its reward, shop and forge progression. It is not a claim that every class and all six floors were manually completed. Later mechanics and final-boss rules were exercised in the pure-engine suite. This is the four-class licensed-source adaptation, not complete commercial Dicey Dungeons content. Source/run progression, not permanent cross-run equipment upgrades, is preserved.
