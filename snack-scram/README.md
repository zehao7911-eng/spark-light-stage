# Snack & Scram — Districts & Mischief

Original Unity 6000.6.5f1 WebGL game inspired by Pizza Possum's mischievous food-and-escape rhythm. All geometry, animation, shaders, UI artwork and synthesized audio are original. No commercial assets or external CDN dependencies.

## Three genuinely different districts
- Bakery Alley: terracotta cobbles, inward-facing shop facades, street oven and flour sack. Eat the cake, burst the flour to make the guard stop and sneeze for 3.8 seconds, then hide in the flowers.
- Harbour Hustle: two wooden quays separated by a water canal, two arched footbridges, fishmongers, cargo crane and bobbing skiff. Both player and guard must use the bridges. Roll the barrel along the lower bridge to lure the guard for 8 seconds and spill six oranges. Each orange can be collected once for 8 bonus points. The flower refuge is in the opposite direction from the barrel's final position.
- Sunset Soiree: an elevated restaurant roof with visible lower storeys, balustrades, fountain, string lights and a gramophone. Music draws both guards away for 6.5 seconds and makes them dance, while three courses are eaten across the terrace.

The districts contain 6/10/12 main food bites respectively. After the rooftop escape, another lap starts with capped guard speed increases. Three successful getaways unlock a chef hat. This is a compact three-district game, not a full commercial campaign.

## Controls
Drag with one finger, tap the ground, or use WASD/arrows. Tap the food callout to approach and eat automatically; courses change the active target. After all courses, enter the flower refuge until the hide meter fills. DASH (Space) grants a 0.85-second burst with a four-second cooldown. FLOUR / ROLL / MUSIC (E) approaches the district prop and activates it once per attempt. While distracted, guards cannot catch the player. Pause freezes gameplay, cooldowns and interaction effects. Tapping canal water directs the player to the shore.

Bites fly into the animated mouth; cheeks/belly inflate, crumbs bounce, score pulses and crunches play. Guards have alert marks, dust, barks and proximity feedback. Music and lure effects suppress chase barks. Menu: mute, resume, retry, confirmed record reset, native rendered PNG postcard. English interface. Wins, round, best score and sound persist locally; v1/v2 records are preserved. Transient attempt state resets when reopening the game.

## Hosting and source
Serve root index.html and accompanying files over HTTP(S); file:// is unsupported. Unity gzip fallback works on GitHub Pages without special response headers. Versioned v3 engine filenames and UI revision5 avoid stale builds.

Unity-source contains Assets, Packages, ProjectSettings and meta files; generated caches are excluded. Install official Unity WebGL Build Support and invoke SnackBuild.Build. The editor export uses generated default filenames; the distribution uses versioned filenames.

## Validation
Native tests: six runs across three stages, meal boundaries, first bite, duplicate feeding, hide/catch/pause; four bidirectional canal routes, no water walking, water-tap snap, one-shot interactions, unique bonus pickup and effect pause/reset. Unity build succeeded with zero errors.

Actual browser tests completed all three final native districts at 390x844 using the interactive props. Market collected four/five bonus oranges on different runs; rewards did not duplicate. Earlier short lure timing caused a delayed escape failure and was extended/repositioned. Music effect stayed at6.425 seconds during pause. Retry/reload retained records and reset per-attempt props. Portrait, narrow and landscape layouts inspected; desktop browser emulation is not physical handset certification. Compressed runtime remains about5MB. First bite around0.55 seconds starts after movement input, not network startup.
