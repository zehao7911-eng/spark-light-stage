# Penny Pop

A tactile, original Unity 6 WebGL piggy-bank smashing game. Real rounded 3D ceramic banks, an orange glove and navy mallet, thick curved shell fragments, solid spinning coins, a warm procedural wood tabletop and subdued paper clutter. The generated design reference is included in the editable source; the playable scene is rendered in Unity, not a screenshot backdrop.

## Play
Tap a pig to swing. Hold then release (about0.42 seconds) for a heavy hit that can start a chain. A gold-medallion pig triggers neighbouring banks. Keep breaking banks quickly for streak rewards; four breaks in a streak start a short double-reward Gold Rush. Coins bounce and spin before flying into the brass dish.

Clear a tray to get another automatically. Every fifth tray contains a large three-hit pig; later trays also contain tougher two-hit banks with visible cracks. Heavy hits and hammer upgrades help. There is no loss timer, purchase or account.

Buy HAMMER, MAGNET and BOUNTY upgrades using earned coins. Each has five levels. First cost50, then75 more per level. Hammer strengthens charged chains, magnet speeds collection, bounty increases rewards. The opening loose coins give a one-time12-coin welcome reward on the first smash. Brush button sweeps away fragments.

Tab/Enter can activate the accessible pig and upgrade controls. Pause, mute, confirmed record reset and a real rendered PNG postcard are in the menu. Rewards are accounted at break and saved automatically and on pause; particle collection does not award them twice. Tray, coins, upgrades and records save locally on this browser. Attempt arrangement resets on reopening.

## Hosting and editable Unity source
Serve index.html and accompanying files over HTTP(S); file:// is not supported. All code, audio and runtime files are local. Gzip decompression fallback supports GitHub Pages without special response headers.

Unity-source contains Assets, Packages, ProjectSettings and ArtReference for Unity6000.6.5f1 with the official WebGL Build Support module. Invoke PennyBuild.Build for an export. Generated Library/Logs/Temp caches are excluded. Runtime models, shaders, material palettes, shell meshes and sound are authored for this project.

## Mobile and performance
One-finger tap/hold input. Portrait uses two columns; landscape uses three. Render resolution is capped todevicePixelRatio1.5; target40FPS. Particles are bounded at96shell fragments,120coins and10shock rings. Geometry is shared/batched where practical. Sound voices are bounded. Browser backgrounding pauses gameplay.

Physical handset performance is not certified; responsive browser tests and final validation are documented separately.
