# Fallwork — Little demolition lab

Twelve original miniature demolition puzzles. Place up to three tools on the building, drag to choose a direction, and detonate the sequence. Gravity, impacts and broken connections decide what falls next.

## Run

Open `index.html` directly, or upload this entire folder to a static host such as GitHub Pages. All dependencies are local. No CDN, build step, account or network connection is required after download. The ZIP has `index.html` at its root.

## Controls

- Touch or mouse: tap a building section to place the selected tool. Drag from the section to aim before releasing. Charges snap to the nearest section.
- Tap a marker to remove it, or use Undo. Drag an existing marker to change its direction/tool.
- Detonate fires the placed tools in order, half a second apart. The site settles automatically; there is no timer pressure while planning.
- Space detonates; Z undoes; P/Escape pauses or resumes. The sound and contract buttons are in the header.
- Retry keeps the same plan so it is easy to adjust. All attempts are free.

### Tools

Blast is available immediately. Its core breaks nearby connections and its shock pushes and damages nearby material. Dragging biases the push.

Saw unlocks at contract 03. It cuts a horizontal strip through connected sections, allowing the remaining structure to fall without a radial explosion. The preview shows its cutting area.

Pull unlocks at contract 05. It temporarily winches the selected section toward a point 140 world units along the drag direction. The arrow shows that target. The gold box is bolted to its roof panel; pull the panel to make a delivery.

Unlocked tools remain available when replaying earlier contracts.

### Goals and rewards

Lowering jobs measure the average reduction in height of the original structural sections; broken sections count as lowered. The required percentage is displayed beside the contract number. Protect jobs also require the little house to retain at least 95% health. Delivery jobs require the gold box to settle inside the striped bay near ground level.

Successful jobs award three, two or one stars for using one, two or three placements. Only the best medal per job is stored. Six total stars unlock Moonstone colours; sixteen unlock Seafoam. The contract board lets you replay any unlocked job. There are twelve authored layouts, including glass frames, a wide steel building, a cantilever, a bridge, multiple towers, neighbours and rooftop deliveries. There is no claim of infinite unique content.

## Saving and pause

Browser localStorage saves the unlocked contracts, best medals, colour choice, sound setting and current tool plan. A reload during demolition rebuilds the site from that saved plan; it does not restore an in-flight physics snapshot. A completed job saves its medal and selects the next contract. Repeated reloads do not award extra medals. Restricted/private browser storage may prevent persistence.

Pausing or hiding the tab freezes physics and effects and silences audio. Sound is synthesized after user interaction and can be muted.

## Rendering and physics

Canvas 2D/p5.js renders original extruded miniature facades, glass, brickwork, riveted beams, shadows, construction details and bounded dust/spark effects. Matter.js simulates 2D rigid bodies, breakable connections, material damage, collisions and temporary winch constraints. The visual depth is drawn; no WebGL or external models are used. Steel frames bend at their segmented joints rather than using a deformable mesh solver.

Physics uses a fixed 60 Hz step; rendering is capped at 45 FPS and DPR at 1.5. Debris creation stops at 165 total node records and visual particles at 170. Responsive framing fits the current building, neighbour and delivery bay in portrait or landscape. Controls remain at least 44 CSS pixels in the tested layouts.

Bundled p5.js 1.11.11 is LGPL-2.1 licensed; see P5-LICENSE.txt. Matter.js 0.20.0 is MIT licensed; see MATTER-LICENSE.txt. Other code and procedural artwork were created for this project. No generated images or commercial game assets are included.

## Validation

Engine checks cover twelve initially stable structures, legal solutions for every contract, repeated solutions for the six sensitive delivery/protection/finale cases, failed rooftop/unsafe-direction plans, tool and phase guards, and finite body/fragment limits. Native CDP touch tests cover placing, aiming, selecting tools, sequential blasts, unlocking contracts, delivery and protection. Browser checks also cover undo, saved-plan reload, paused physics/pixel freezing, medal persistence and portrait/landscape layouts. Cold-file tests cover zero HTTP requests, mouse/keyboard control, failure/retry and restoring an unfinished plan.

Mobile viewport and touch emulation are tested. Physical handset performance has not been measured.
