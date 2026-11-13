# Bonk Borough

A small 3D demolition game inspired by ABRISS's physical dismantling. Three original toy streets, original procedural models and synthesized sound. Pull back anywhere on the scene, then release to launch the smiling wrecking ball. Aim for supports, the first domino or soda cans. Clear at least 85% of the blocks.

Cookie Corner is an arch with loose support bricks. Domino Diner is a domino chain leading into a diner. Fizzy Waterworks adds three reactive soda cans around a four-legged water tower. A can's burst applies impulses to nearby physical blocks.

There is no timer or shot limit. Recall returns the ball without resetting the mess. Slow Mo changes simulation speed. Restart resets a job. Space launches a gentle forward shot; R recalls. Hidden tabs and the job board pause the simulation. Unlocked jobs, stars, best bonk counts, last job and sound preference save locally; reloading starts the selected job anew. Three-star thresholds are 4, 3 and 2 shots respectively; twice those thresholds awards two stars.

Rendering targets 30 fps with capped pixel density, cached geometry, bounded particles and directional shadows. Physics uses fixed 120 Hz steps, rigid boxes/spheres, gravity, contacts, angular motion and sleeping bodies. WebGL is required. Browser tests use touch input in phone-size viewports, not a guarantee for every physical device.

The package contains a self-contained index.html plus editable sources. No CDN or external font is used. Three.js and Cannon.js are included locally under their MIT licenses in vendor. Host on any static HTTPS service, including GitHub Pages. This is a three-job game, not a commercial-length campaign.
