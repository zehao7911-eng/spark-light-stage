# ODD WHEELS

A small original 3D HTML5 comedy runner inspired by [WHAT THE CAR?](https://store.steampowered.com/app/2727650/WHAT_THE_CAR/). The actual official Steam screenshot was inspected for a rounded yellow/cream car, articulated legs and sneakers, cyan painted cliffs, striped kerbs, warm asphalt, traffic cones and cheering bears. All meshes, scenery, interface, levels and synthesized sounds in this package are authored locally. No commercial assets, screenshots or generated images are included. This is a compact browser interpretation, not the original game or its full content.

## Play

Extract the ZIP and open `index.html`, or publish the folder to GitHub Pages or any static HTML host. The packaged index is self-contained and also works offline. WebGL is required; Three.js r147 is bundled under the included MIT license.

The car runs forward automatically. Drag horizontally to steer, or hold the left/right buttons. Tap the scene or the large action button to jump. A/D and arrow keys steer; Space jumps, and holding Space or the action button glides with wings. Escape pauses. There are no lives or time limits. Falling off the course returns you to the latest ground checkpoint with a time penalty. A traffic collision briefly slows you and flings the object; it does not remove a life.

Eight authored courses introduce distinct physical abilities:

1. **A Car With Legs**: steer, jump the gaps, detour for badges.
2. **Boing Boulevard**: much higher spring jumps and automatic launch pads.
3. **Air Mail**: jump and hold to glide over long gaps; fans launch you.
4. **Achoo Avenue**: sneeze to fling cones, boxes and bears up ahead, plus a short speed burst.
5. **Lunch On The Run**: pick up three burgers and carry the visibly stacked lunch to the cafe.
6. **Long Way Up**: long legs step across short breaks; jump larger gaps and barriers.
7. **Roller Disco**: faster motion and booster pads change jump distances.
8. **One Last Weird Lap**: spring, sneeze and wing behavior changes along the road.

Three optional gold badges sit off the center line of each course. Time, falls and badges are recorded independently. Bronze always rewards finishing; faster, cleaner runs earn higher medals. Finishing a new course pays tokens for pickups, medals and badges. Replaying only pays for improved medal/badge records, so the same clear cannot endlessly farm tokens. Tokens buy three optional paint colors; the initial Sunshine paint is free. Progress, current lap, checkpoints, pickups, best times, collection and paints save locally. Storage failure leaves the game playable without persistent saving.

Finishing all eight opens **Wild Laps**: repeatable longer courses cycling through the eight abilities, with a saved completed-lap record. These are bounded remix courses, not infinitely unique worlds. Replay previous courses through the garage, hunt all badges or improve times. Restart resets the current lap while retaining earned records and cosmetics.

## Mobile and performance

Portrait and landscape touch controls, native multi-pointer steering/ability support, minimum 44px buttons, capped 1.5 DPR and 30 FPS rendering. Physics uses a fixed timestep; background tabs and pause/collection panels stop simulation. Mobile uses light blob shadows; desktop adds a small directional shadow map. Static roadside meshes are instanced. Synthesized audio starts after a gesture, and mute is saved. No CDN, fonts, downloads, accounts, ads, analytics or remote API are required at runtime. Mobile layout/native touch QA uses simulated viewports and touch input, not a physical-handset guarantee.

Source: `engine.js` rules and saves, `art.js` original models/rendering, `game.js` input/UI/audio, `style.css` responsive UI. The packaged `index.html` bundles all runtime code; the separate files remain editable source and are not additionally requested by the bundled page. Rebuild the bundled entry when changing source.
