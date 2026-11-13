# Paper Pirouette

An original p5.js paper-cutting toy with a small precision puzzle loop. Swipe in a straight line to trim an eight-sheet stack. The gold outline shows the desired silhouette. Keep the center, undo cuts freely, and unfold once the silhouette match reaches 86%. Your stack fans into a rotating layered paper ornament, and joins the collection with one to three stars.

The cutting engine uses real convex-polygon half-plane clipping. A sufficiently long swipe defines the complete cutting line, rather than simulating scissors nibbling only along the drawn segment. Nearby aligned target edges snap for touch precision. Match is intersection-over-union area: 97% without Guide earns three stars, 92% earns two, otherwise one. Guide remains counted after undo/reset. There is no timer, lives, currency or purchase.

Twelve convex silhouettes cycle with different proportions, rotations and petal arrangements. Three completed pieces unlock Twilight paper; six unlock Fern paper. These are three palette sets, each with five sheet colours. The collection retains the latest 24 pieces. Profiles repeat after twelve; no claim of infinite unique puzzles. The unfolding is a decorative fan animation, not a physical origami simulation.

Undo retains the last 20 cuts in the active session. Reset asks for a second tap. Active polygon, cut count, guide use, palette, collection and mute are saved in browser storage. Animation position and undo history are session-only; reloading a completed piece displays the finished ornament. Album/Pause and tab hiding stop animation and silence audio.

Open index.html directly or serve the folder on any static host. All art, physics geometry and sound are original code. Bundled p5.js 1.11.11 uses the included LGPL license. No generated images, external assets, CDN, WebGL, build step or online account required. English UI, touch/mouse, portrait/landscape and safe-area layout, 45FPS, DPR1.5, eight offcuts and 75 sparks maximum. Browser touch emulation is tested; physical phone hardware is not available.
