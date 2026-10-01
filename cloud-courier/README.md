# Cloud Courier

An original, mobile-friendly HTML5 puzzle about turning floating islands, connecting sky paths, and delivering parcels with happy little clouds.

## Play

Tap an island to turn its paths clockwise. Gold paths connect to the blue post office. Send clouds to connected homes. Connect every island and complete every delivery to restore the sky. Undo and a free, cooldown-based alignment hint are available. Keyboard: arrows to select, Enter to turn, Space to send, Z to undo, H to hint.

Early skies teach the connections with a small board and only a few scrambled islands. Later skies introduce larger layouts, branching paths, more homes, and different landscapes. Maps are generated from connected spanning trees, so a valid solution always exists. Collect twelve illustrated postcards; subsequent skies continue with fresh maps. Earn three, two, or one stars based on turns relative to the generated solution, with no loss condition or time limit. Spend earned sparkles on four courier hat colours. Purchases and postcards persist across sessions.

## Run

Serve this directory using any static HTTP server, or upload all files together to GitHub Pages. No build step, external runtime, font, CDN, telemetry, or network asset is needed. The ZIP has index.html at its root. All art and audio are generated locally in the browser. Saves use localStorage when available and remain playable if storage is blocked. Audio starts only after a user gesture. Hidden tabs pause the simulation.

## Creative references

Railbound (Steam app 1967510): calm route connection puzzles and readable travel feedback.
ISLANDERS (Steam app 1046030): cohesive miniature islands, simple visual hierarchy, and satisfying growth.
Cloud Courier uses its own code, artwork, characters, maps, progression, and delivery mechanic. It does not include assets from either reference.

## Mobile

Portrait and landscape layouts, responsive board sizing, large buttons, touch input, capped pixel density, 30 FPS on narrow screens, and no WebGL requirement.
