# PHASESHIFT visual system

## Palette and hierarchy

Ink blue #101c28 / structural blue #162939 / brushed metal #354f5e / warm ceramic #d4ddd5 / cyan #65e7ef / amber #ffb166 / green #38bc87. Cyan and amber only denote portal identities and independent circuits. Green denotes energy and the exit. Background orbital silhouettes remain darker and less contrasted than playable floor tiles. The last two sectors warm or cool the ceramic without changing the symbol language.

## Shapes and scale

One world unit is one floor tile. Explorer height is approximately 0.9 tile; door frames are 1.1 tile, portal radius 0.37, energy crystals 0.24. A modular panel uses a recessed top, a dark segmented base, small fasteners and restrained surface scoring. Clear seams preserve grid adjacency. Gates use paired stanchions and retractable light bars rather than opaque walls that hide the player. Vacuum is always visibly separate from floor.

## Motion grammar

Ordinary steps take 0.22 seconds with eased translation and opposing limbs. A portal crossing takes 0.62 seconds: compress, relocate, reassemble. The pair must visibly update immediately on placement. Energy briefly scatters green fragments, a switch emits amber fragments and a portal emits its own identity colour. Crystal bobbing, sparse transport traffic and orbital drift are secondary. There is no camera movement while selecting tiles. The solved room permits a very small presentation drift, disabled by reduced motion.

## Interface

Monospaced labels, thin structural borders, restrained corner radii and the same cyan/amber/green assignments. On narrow screens the three mode buttons stack their icon and short name; the chamber, energy and mode remain visible. The operation area receives the available viewport. Transparent socket targets project from the real scene and maintain a 44-pixel hit area. Every other interactive control is at least 44 pixels in both dimensions. Modal panels scroll on short screens rather than hiding their actions.

## Extending the set

New chambers should use the existing tile unit, symbol positions, palette roles, circuit glyphs and action timings. New materials should first be checked against the explorer and an existing portal at both phone and desktop gameplay scales. Add a new rule only after an isolated introductory chamber; ensure the deterministic solver reaches the exit and a native UI playthrough agrees with the modeled route. Do not make decorative machinery appear walkable or let it overlap the usable board.
