# Clover Crown

An original HTML5 pixel micro-kingdom, inspired by the side-view building and night defense loop of Kingdom Two Crowns (https://store.steampowered.com/app/701160/Kingdom_Two_Crowns/). All illustrations, levels, simulation and synthesized sound are original; no commercial assets, code or branding are included.

## Play

Open index.html directly or host this folder on any static server. All resources are bundled. No build, CDN, account or network is needed.

Hold the left/right buttons, or hold either side of the scene, to ride. Collect gold from baskets outside the walls during the day. Ride close to a building sign, then press Build. Pay for walls, archer towers, a garden and a lantern forge. The forge opens on Night 2, Tier II on Night 3 and Tier III on Night 6. Gardens increase the next morning's income. The Night button starts a wave whenever you are ready; preparation has no time limit.

Towers shoot automatically. Light sends out a pulse, damages and pushes nearby shadows back, including flying ones. The forge improves its range, power and cooldown. Coins from defeated shadows can be collected while riding; remaining loot is banked when the night ends. Walls block ground enemies, while flying enemies can cross them. Broken walls can be repaired at their sign for two gold. Protect the central crown house.

Each dawn restores your walls and crown and pays an income. The first eight nights award up to three stars: survive, keep the crown untouched, and lose no built walls. Six stars unlock Heather, fifteen unlock Honey. Thereafter, continue into endless nights, with capped wave populations and increasing pressure. If the crown falls, retry the same morning with your exact preparation gold and buildings restored. New Kingdom resets the active run while retaining your chronicle and cosmetics. Local saving is optional; blocked storage still allows a full session.

Keyboard: arrows/A/D ride, E pays, Space uses Light, N starts night, Escape pauses. Chronicle shows records and outfits; a result/pause menu can save a PNG postcard. Sound starts after interaction and can be muted. Two fingers can steer and use Light independently.

## Technical

Pure 60 Hz simulation with real homing arrows, knockback, wall collision, cooldowns, waves and a bounded coin economy. 60 FPS render target, Canvas 2D with a low-resolution pixel buffer, layered parallax forest and actual mirrored scene reflections. Pixel density capped at 1.5; at most 24 enemies, 24 arrows, 40 dropped coins, 100 cosmetic particles and 14 sound voices. No WebGL or remote assets. Pause/blur/background suspend simulation, input and sound; resize redraws the paused state. Touch controls are at least 44 CSS pixels, with portrait/landscape and safe-area layouts. Device performance varies; no physical phone performance guarantee is made.

p5.js 1.11.11 is included under LGPL 2.1; see P5-LICENSE.txt.
