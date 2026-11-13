# Pocket Pit

Three small 3D swallowing puzzles inspired by Donut County's growing-hole interaction. All models, art and sounds are created by the included code.

Drag anywhere in the scene to move the hole. Start with small objects; swallowing them enlarges the opening. Objects tilt, collide, fall and disappear below the ground. Eat toy balls to store ammo, then use POP below overhead targets.

- Tea Trouble: collect cookies, mugs, chairs, tables and the cafe cart.
- Laundry Day: pop two hanging parcels to release the laundry inside.
- Picnic Panic: pop striped umbrellas for a fruit shower; catch a slowly roaming snack cart.

Ball shots that miss return to the ground and can be swallowed to recover ammo. There is no timer or move limit. Clear every loose item to complete a scene. Use at most two pops for three stars. The neighborhood board revisits unlocked scenes. Best gesture counts, stars, current scene and sound setting save locally; reloading restarts that scene. Hidden tabs and open overlays pause play. Keyboard arrows move the hole, Space pops a ball.

Mobile rendering runs at a target of 30 fps with capped pixel density, cached model geometries, a directional shadow map and a shader that opens the floor beneath the hole. Browser tests use touch input in mobile-size viewports; they do not certify every physical phone. WebGL is required; initialization failure displays a clear message. No CDN, fonts or external assets are requested.

Host the complete folder with index.html at its root on any static HTTPS service. Three.js is included locally with its MIT license in vendor/THREE-LICENSE.txt. This is a three-scene game, not a full commercial-length campaign.
