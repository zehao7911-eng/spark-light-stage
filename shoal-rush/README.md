# Shoal Rush

An original p5.js one-finger reef runner. Drag to lead the crowned fish; friendly fry join your school when you approach. Collect strings of pearls to grow the flow multiplier, dodge jellyfish and the telegraphed lunges of larger fish, then swim into the HOME arch after rescuing the required fry. Touch steering leads slightly above the finger. Mouse drag and WASD/arrows work too; Space dashes, P/Escape pauses.

Dash provides a short speed burst and damage protection. It can be pressed with a second finger while steering. Hits remove a heart and break the pearl combo, with 1.6 seconds of protection afterwards. Followers scatter visually but are not lost. Three hits end the run. There is no countdown timer. The arch opens at the rescue quota; collecting at least 30 pearls with all three hearts earns three stars, two hearts earns two, otherwise one.

Successful runs bank shells and advance the reef. Retry retains upgrades; a failed run awards at most three consolation shells from score, once per attempt. Quick fins increases speed, Dash current shortens dash cooldown, Pearl glow increases pearl pickup radius. Three levels per upgrade, purchased only between runs. Reef palettes cycle through four themes, routes alternate left/right, rescue quota grows to seven, and later reefs add a jellyfish and second attacker. Attack speed and cadence are capped. Stages continue, using these variations; no claim of endless unique maps.

The simulation uses a fixed-step 2D leader/follower chain with separation distances, not a scientific flock/fluid model. Art and audio are original code: swimming fish with moving tails/fins/eyes, layered coral and seaweed, soft sea shafts/caustics, pearlescent pickups, pulsing jellies, lunge warnings, burst effects, combo tones and a finish chord. No generated images or commercial assets. English sparse UI.

Active run, positions, enemy phases/timers, school, score, pickups, upgrades and mute save locally. Restored active runs open paused. Pause and hidden tabs stop simulation/audio. Up to seven followers, 40 pearls, three jellies/two attackers, and 110 effects; 60Hz simulation, 45FPS, DPR1.5. Landscape rotates the world with matching input coordinates. Safe-area CSS and touch/mouse support. Browser-native touch/viewport emulation is tested; no physical handset is available.

Open index.html directly, or serve this directory through any static server. All assets are bundled; no CDN, WebGL, build, online account, network or external service required. p5.js 1.11.11 is included under its accompanying LGPL license.
