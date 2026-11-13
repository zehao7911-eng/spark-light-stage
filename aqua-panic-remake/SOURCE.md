# Reference and fidelity record

Selected after playing Rezona's Ink Storm, Blep Cat, Falling Constant and Aqua Panic. Final reference: **Aqua Panic!**, project JLrmuPsw, v3, inspected on 2026-10-27.

Playable reference: https://rezona.ai/game/pgcserver/pv/JLrmuPsw/v3/dist/index.html

The page's public script was read to cross-check gameplay facts and constants after the initial screen-based implementation. The script URL and SHA-256 are in REFERENCE-FACTS.json. The script itself and its original images are not distributed. model.js/game.js are independently written with a different state layout and renderer.

## Matched reference facts

- Frontal turquoise glass tank, central light rays, two lower coral gardens, outer seaweed; outlined illustrations, gold logo/button, navy rounded HUD/shops.
- Two starting guppies; feeding, growth, coin collection and tap-to-fire defense; Fish, Upgrades and Pets tabs; level/egg/fish/laser summary.
- Guppy $100, Carnivore $1500; three egg pieces at $500 times current level. Fish, money, pets and upgrades carry forward. The third egg automatically advances and displays a level banner.
- Growth at 3/9 food points. Quality adds 1/2/3 points; quality upgrades $200/$500, maximum tier 3. Food count maximum 5, upgrade price $150 times current tier.
- Medium guppy $15 every 9 seconds, large guppy $35 every 7 seconds, carnivore $200 diamonds every 12 seconds. Hunger seek/starve/death thresholds follow the inspected facts.
- Laser damage 34 + 26 times (tier minus 1), upgrade cost $750 times current tier. First green alien 100 HP; later levels add 70 HP. Purple aliens from level 3. Kill reward: diamond worth $75 + $25 times level.
- Source first invasion combines a 45-second elapsed-time gate, a further 45-second timer and 2.6-second warning. Later intervals follow the source decay. Fish flee approaching aliens.
- Stinky $750, Prego $2000, Itchy $3000. Mother interval 24 seconds; swordfish dash damage 12 and cooldown 2.6 seconds.
- Empty tanks remain recoverable while money, dropped coins or an invader bounty remain. Loss requires exhausted recovery resources.

## Adaptations and fidelity limits

Artwork is a close regeneration rather than original bitmap files; pixel identity is not claimed. New atlas animation, normalized motion integration, collision shapes, random sequences and some visual effects differ. The portrait backdrop preserves both coral gardens. Explicit pause, validated saves, manual load retry, hold-to-repeat input, pixel-ratio limits and entity/effect caps are delivery adaptations. Rendering and motion constants use a 720-high reference and scale for mobile readability.

## Asset provenance

Six built-in image-generation outputs: landscape tank, portrait tank, transparent 24-cell character atlas, transparent logo, dedicated icon and transparent UI atlas. Exact prompts and output IDs: ART-PROMPTS.json. Covers are actual title-screen captures using the same assets.

Nunito and Baloo 2 are from the official Google Fonts repository; their SIL OFL notices are retained under assets/. All runtime assets/fonts are local, without a font CDN dependency.
