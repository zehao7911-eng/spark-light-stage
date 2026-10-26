# ROOT RIOT

A cheeky rabbit, a shared garden and carrot-hungry rivals. Drag to move; release near a carrot to pull automatically. Spend a carrot on POOF to push rivals, or two on DECOY to lure them away. Spending never reduces harvested progress.

Six short campaign patches, 18 best stars, three cosmetic puff styles and an escalating endless mode unlocked after the first clear. Rival rabbits use the original game's pathfinding, carrot occupancy and shared pulling health. The same painted field receives lighting changes; chapters change obstacles, AI pressure and objectives.

## Run

Open index.html directly, or serve this directory with any static server. No npm, external CDN, accounts, remote art or online scoreboard required. All runtime art is embedded in assets/data.js. The full-resolution PNG originals are included separately for production use. No service worker is installed: a browser's first visit needs the site; the downloaded ZIP runs offline.

## Controls

- Phone: drag the field to steer, release to pull. A second finger can tap POOF or DECOY while steering.
- Keyboard: arrows / WASD move; Space / Q push; E decoy; Escape pause.
- Pause, tab hiding and focus loss stop simulation and audio. Progress is saved locally when storage is available. Denied storage does not block play.
- Sound is optional and starts only after interaction. Motion reduction respects the device preference.

## Production

This is a source adaptation of **Raging Gardens**, not a recreation of its art. Original model classes run under the included Crafty engine, with a new mobile frontend and generated art. See SOURCE.md, ART-DIRECTION.md and THIRD-PARTY-NOTICES.txt. Preserved original source is in upstream/. Those files are archival and are not all loaded by index.html.

Runtime rendering uses a 384×576 logical field, a 1.5 device-pixel-ratio cap and a 40 fps painting budget with 60 Hz simulation. This has been tested in Chromium touch emulation at 320×568, 390×844 and 844×390. This is browser validation, not a claim that every physical phone has been tested.
