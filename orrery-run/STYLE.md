# A pocket observatory

ORRERY RUN changes the previous flat architectural street into a contained, three-dimensional hard-surface instrument. A rotating square maze sits in a round bronze-and-gunmetal frame. One polished jade core is the focus. Warm faceted fragments, a ringed dock, keyed bars and paired luminous conduits remain distinct at small sizes.

## Shared forms

Repeated bevel-like caps, dark side planes, thin copper edges, concentric rails, clamp blocks, screw heads and inset lamps create precision. Details indicate material or function: metal collars hold the insert, floor traces connect the cells, key colour belongs to its gate, and portal rings belong to their paired conduit. Avoid arbitrary greeble covering the navigable floor. Do not use unrelated glossy image cutouts or photo textures.

The maze is seven cells wide, with a nine-cell final instrument normalized to the same outer housing. A core radius is 0.35 cell units; wall half-width is 0.48. All moving positions come from the same logical cell path. Both the maze and its core are children of the same rotating insert, while the outer clamps, gravity arrow and camera remain fixed. Gates disappear when the visible key mask activates. Portal motion shrinks out at the source and grows in at the destination, rather than sweeping through intervening walls.

## Palette and materials

| Role | Solar atrium | Copper engine | Night array |
|---|---|---|---|
| Background | `#0d1b2c` | `#102b32` | `#151a36` |
| Floor | `#0c2636` | `#153c44` | `#29304b` |
| Wall side | `#365d6b` | `#467f85` | `#61678c` |
| Cap | `#78969c` | `#9dbfba` | `#a9aac2` |
| Metal | `#ac7d47` | `#c28b60` | `#a99468` |
| Energy | `#3bd7b9` | `#76eadb` | `#aaafff` |

Use sRGB colour management with a linear lighting/render pipeline. Metals have restrained roughness, one warm key and a cool fill. Strong bloom is unnecessary: local generated glow sprites and emissive nodes mark the core, fragments and conduits. The glassy sphere and cut crystal silhouettes have different sizes and colours. The instrument floor stays darker than its wall caps. The light view reuses the palette, grid scale, symbols and movement, with illustrated metal planes instead of WebGL lighting.

## Composition and motion

An orthographic camera looks down at a shallow angle, preserving readable corridors while showing wall depth. Portrait framing moves closer to the active instrument; upper dynamos and lower power banks fill the long frame. Wide framing shows side arrays and pipework. Those arrays vary between solar discs, cooling/control banks and night telemetry modules. Decorative parts do not create hidden collisions.

A quarter-turn has a clear preparation and settle, followed by a continuous roll along adjacent cells. The core's visible rotation follows its travel. Collected fragments spark locally; keys wake their gate; conduits pulse at the actual transfer. A dock accepts the core before the reward panel arrives. The maintenance drone bobs and reacts gently. Gentle Motion reduces decorative motion; pause stops rendering and audio.

## Interface

Dark-blue instrument panels, mint status lights, bronze action edges and warm white type. The two large turn controls are always the main operation. Undo and the optional current-state hint sit between them. Fragment and key symbols repeat the scene's shapes. The observatory repeats one card size and one star position; avoid text-heavy upgrade trees. Every interface label and instruction is English.

Art reference studied: the enlarged second Dyson Sphere Program screenshot in the user's industrial-sci-fi atlas. Broad structural density, material hierarchy and energy-light principles are used; no specific building, character, logo or full screen composition is reproduced.
