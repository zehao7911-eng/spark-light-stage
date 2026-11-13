# CHUTE SCOOT

A pocket-sized airmail arcade game. Hold anywhere on the flight board or hold the gold button to open the parachute. Drag left and right to steer. Release to drop faster, and hold again to flare before landing. Keyboard: hold Space and use the arrow keys. The dotted path estimates the landing point for the current input.

Deliver three parcels per route. Six routes cover orchard, seaside and midnight environments with crosswinds, moving platforms and gust clouds. A safe landing advances the route. A low-speed landing in the center earns a precision stamp. Finish with no misses for one extra star, and make two precision landings for another. The Route book supports replay. Berry and Mint canopies unlock at 5 and 10 total stars.

Open index.html or standalone.html directly in a browser. These are identical self-contained playable entries. index-source.html is the editable HTTP entry. No external runtime dependencies. The source, optional SDK tests, build script, cover and icon are included.

Progress saves at delivery boundaries. Reloading during flight restarts the current parcel and preserves earlier deliveries. Sound defaults on after a user gesture.

Art, audio and game code are original. Rezona's [Fruit Sky Scamper](https://rezona.ai/game/pgcserver/play/PwVerjBM) was viewed for its readable airborne framing, with a different parachute mechanic and original assets here.

Run `node tests.mjs` and `node sdk-tests.mjs` to check flight and host behavior. Run `python build.py` to rebuild the inline entries and root-index ZIP.
