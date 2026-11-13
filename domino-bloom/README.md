# Domino Bloom

An original p5.js HTML5 kinetic garden. Draw domino trails, push a single starter, and carry a local chain reaction into every bell. This is a new domino-drawing puzzle direction, inspired by the immediate motion, material sheen and clean presentation of the user's p5.js video references. It does not reuse the fluid-painting, particle-field, material-mixing, soft-jelly or warehouse mechanics made previously. All artwork, audio, levels and gameplay code are original; no image generation or commercial assets are used.

## Play

Draw from the gold starter towards a bell. Finger/mouse movement lays evenly spaced tiles and turns their facing along the trail. Lift to create another branch. Hit PUSH to start. Tiles have angular velocity and gravity-like rotation; a tipping tile can strike nearby standing tiles in its forward contact region. Wrong direction, excessive spacing or a missing connection stops the cascade. This is a deterministic stylized angular/contact model, not a general-purpose rigid-body simulator.

Three-way wheels and turntables transmit a hit to nearby branches after a short delay. Springs send a jump to a paired landing pad across a solid pond. Resume drawing from that pad. Raised step tiles accelerate falling. Rocks and ponds block placement. Flower buds are optional pickups collected by a nearby falling tile. Magnetic anchor snapping helps fingers hit small bells, flowers, starters and machine pads.

REWIND stands up the current layout, resetting bells and flowers while keeping your drawing. ERASE removes nearby tiles; UNDO restores up to twenty prior strokes. Clear in the pause menu needs a second confirmation and is undoable. Hint shows a suggested route but permanently removes the efficiency star for the current attempt, even if hidden again. The initial garden shows a short teaching guide until several tiles have been placed.

Three stars reward all bells, all flowers, and a trail at/below the garden's par without using Hint. There is no build countdown or life limit. The run has a 25-second settling limit. Each attempt pays once: a first clear earns 3 plus stars; a journal replay earns 1 plus stars. Rewinding the same paid attempt does not repeatedly award petals. A new confirmed replay is a new attempt. Petals unlock Lilac/Jade/Pearl finishes for 10/16/24; Peach is free. Finishes are cosmetic.

Twelve distinct authored gardens teach open paths, detours, two/three/four-bell branching, ramps, ponds, paired springs and multiple machines. Subsequent visits cycle these same twelve layouts; they are not unlimited unique levels. Garden Book replays require confirmation. Your best stars, unlocked garden, petals, finishes, active layout, falling angles/velocities, mechanism states and mute save locally under domino-bloom-v1. Reload starts paused with gesture input released. Clearing browser storage resets progress.

## Controls

- Touch or mouse drag: draw/erase; lift to end a stroke.
- Space: push, rewind a stopped run, or proceed after a win.
- Z: undo; E: toggle erase/draw; R: rewind; H: toggle route hint.
- P/Escape: pause; Enter: continue from a menu.

All game UI is English with sparse on-screen text. Portrait and landscape views project the same world state; short landscape view rotates the tray. Interface buttons are at least 44px. Pause/background stops simulation, releases drawing and immediately silences the audio master. A failed run can be edited immediately after rewinding. A win keeps the entire bloomed garden visible until NEXT is pressed.

## Art, audio and package

Six coordinated garden palettes, moulded tray/rim, dotted floor, soft shadows, reflective bevelled domino faces/pips, pastel colour bands, ceramic moss planters, rippling koi ponds, brass bells, animated turntables, coiled springs, petal jumps, impact rings, bell ripples, flower growth and final bloom wave. Sound is locally synthesized: short pitched wooden clicks, pentatonic placement/fall notes, layered bell tones and a victory chord. Starts after interaction; optional mute persists. Voices/effects are bounded.

Open index.html directly, or host this folder on a static HTTP/HTTPS server. p5.js 1.11.11 is bundled with its LGPL-2.1 license in P5-LICENSE.txt. No build, CDN, WebGL, external image, font, audio download or account is required. Fixed 60Hz simulation, 45fps rendering, DPR capped at 1.5, at most the garden's 64–128 editable tile budget plus the starter, twenty undo snapshots and 95 visual effects. Physical handset performance is not certified by browser touch/viewport emulation.
