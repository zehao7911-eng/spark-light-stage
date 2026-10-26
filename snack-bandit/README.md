# SNACK BANDIT — Midnight Picnic

A complete small portrait HTML5 stealth game. Drag to sneak, stand by a glowing plate to steal, then return every snack to the tunnel. Dash through a guard to stun them. Bushes hide the player. A golden cookie and avoiding damage each award an additional completion star.

## Contents

Nine authored nights across Butter Lane, Fisherman's Row and Midnight Market. Levels introduce additional patrols, distraction bells, noisy leaves and slowing puddles. There is a finite campaign, not an endless mode. Best stars per night unlock a flower, chef's hat and crown; replaying does not repeatedly award stars. All nine nights can be replayed from the map after unlocking.

The presentation uses 26 separate original SVG illustrations, including four walking and four carrying raccoon poses, blink and surprised expressions, four baker duck poses, three richly detailed market backgrounds and individual props/food. Canvas animates the sprites and sorts them by depth. These are original vector illustrations; they are not extracted from the reference videos or the earlier cat GIF. assets/build-art.py reproduces the editable art.js resource using standard Python only.

## Controls

- Touch: drag anywhere on the scene to move; release to stop. Tap DASH. Tap RING or the visible bell to draw guards to it.
- Desktop: arrows/WASD, Space to dash, E for the bell, Escape to pause.
- A short fill ring on each snack indicates stealing progress.
- Yellow cones and suspicion meters warn before guards pursue. Carts occlude their view. Dash has a 2.7-second cooldown; a hit drops one carried snack and grants 2 seconds of protection.

## Run and package

Open index.html directly, or upload the entire folder to static HTML5 hosting. No CDN, fonts, backend, network assets or installation are required. Enable sound with the top-right note button. Small original synthesized effects and a quiet four-note night-market motif are created after a user gesture; no reference-video soundtrack is used in this separate game.

State, position, stolen/dropped snacks, patrols, cooldowns, stars and outfit persist locally. Reload enters the title screen and offers Continue. Storage denied leaves the current session usable. Backgrounding/blur pauses and releases input. Rendering is capped at 40 FPS and DPR at 1.5, with bounded effects. Portrait and landscape layouts have been browser-tested, not certified on physical phones.

Run `node tests.cjs` and `node patrol-tests.cjs` for rule and route verification. The browser QA hooks exist only when explicitly opened with ?qa=1. Regular game URLs do not expose them.

## Credits

Original code, character and scene SVG illustrations and synthesized audio created for this project. No commercial game assets or source video imagery are redistributed. See LICENSE.txt.
