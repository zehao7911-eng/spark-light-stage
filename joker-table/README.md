# Joker Table

A self-contained HTML5 poker roguelike inspired by Balatro. This is an independent, scoped browser adaptation, not the complete original game. All card artwork is drawn locally in Canvas and no original game assets are bundled.

## Play
Open index.html directly, or host this folder. Tap up to five cards, then Play hand. Discard to improve your hand. Chips times Mult is the score. Reach the Blind target before running out of hands.

Buy Jokers after each Blind. Tap owned Jokers to inspect, reorder or sell. Jokers trigger left to right. Planet cards permanently level a poker hand. Tarot cards change the deck. Buffoon, Celestial and Standard packs let you select one reward. Preserve money for interest. Beat Ante 8 to unlock Endless in the current run.

Desktop shortcuts: 1–8 select cards, Enter plays, Backspace discards. Sound starts only after interaction; use Sound off to mute.

## Content
24 Joker effects, Foil/Holographic/Polychrome editions, 12 poker hands including three hidden hands, Planet upgrades, 11 Tarots, five card enhancements, eight Boss effects, three pack types, a discard voucher, rerolls, cash payouts and interest, persistent automatic saves, eight antes and Endless.

## Scope compared with Balatro
The main poker/Blind/shop/Joker loop, base hand scores, hand level growth and the included Joker effects follow the reference. Cards and UI are redrawn, not pixel-identical original art. This version has fewer Jokers, Bosses, decks, vouchers and consumables. No Spectral cards, original audio, stakes, unlock collection or all original content. Tarot selection uses the whole deck in the shop. Straight Flush includes royal flushes. This is not a full recreation.

## Technical
No dependencies or external requests. Pixel card images are generated once and cached in Canvas. Fluid felt background is rendered at low resolution, capped around 15 FPS; offscreen animation pauses. CSS layout supports portrait and landscape, safe areas and touch. The packaged index.html contains all scripts, styles and icon, and can run offline. Source files are included for editing.

Storage key: joker-table-v1. Saves are local to each browser/origin. Closing during a scoring animation resumes the last complete action. No money transactions or accounts.

## Validation
Poker hand classifications; chip/mult order; debuffed suits; controlled-build progression through 24 Blinds, Ante 8 and Endless; loss/retry; purchase/reroll/voucher; Tarot application; Standard pack deck growth; exact reload state; touch input; 360×740, 390×844, 844×390 and 1280×800 viewport checks. Mobile checks are browser simulations, not physical devices.

## Reference
https://store.steampowered.com/app/2379780/Balatro/
https://www.playbalatro.com/
