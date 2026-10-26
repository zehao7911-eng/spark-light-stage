# Reference record and fidelity scope

Reference platform: https://rezona.ai/

Selected published game: Aqua Panic!, JLrmuPsw v3. Inspected on 2026-10-27 by opening the actual playable game and its Fish, Upgrades and Pets tabs. Other candidates viewed before selecting: Ink Storm, Blep Cat and Falling Constant.

## Directly observed and reproduced

- Aquarium: frontal curved glass frame; turquoise water; upper-center light shafts; sandy base; separate lower-left/right coral gardens and outer green seaweed; outlined glossy illustrated assets.
- Top-left coin capsule, top-center level/egg/fish/laser capsule, top-right sound button; Fish / Upgrades / Pets tabs along the bottom; gold title/primary button and navy rounded shop panels.
- Two starting guppies. Tap water to feed; grow fish; collect dropped currency; tap attacking aliens.
- Guppy $100; Carnivore $1500 and $200 diamond income; Egg Piece $500 at level 1, three pieces to the next level.
- Food Quality $200; Food Drops $150; Laser $750 at the initial tiers.
- Stinky snail $750 collects coins on sand; Prego $2000 births guppies; Itchy swordfish $3000 attacks aliens.

## Independent implementation choices

Original source code, exact original image files and internal game state were not imported. The reference did not reveal all simulation constants or subsequent-level behavior. Growth at 2/5 meals, repeat-input timing, hunger, coin intervals, combat health, invasion scheduling, later prices, helper timing and carry-over between tanks are authored implementation choices. These should not be described as verified pixel-perfect or formula-identical to the original.

Portrait background composition, enlarged touch targets, hold-to-repeat, explicit pause, validated local saves, load retry and focus-loss protection are delivery adaptations. The original reference screenshot remains a private working reference outside this package.

## Runtime and asset provenance

model.js/game.js are newly written for this remake. No third-party game runtime or scraped game source is embedded. Artwork: six built-in image-generation outputs (landscape tank, portrait tank, transparent 24-cell character atlas, transparent logo, dedicated icon, transparent UI atlas). Exact prompts and selected output IDs are recorded in ART-PROMPTS.json.

Font: Nunito variable, Google Fonts official repository https://github.com/google/fonts/tree/main/ofl/nunito . Its SIL Open Font License is retained in assets/NUNITO-OFL.txt. Font and generated assets are bundled locally; they do not contact a font CDN during play.
