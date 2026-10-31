# SUNSPROUT

**Tiny turns. Big blooms.** An original compact isometric block-rolling puzzle for touch and desktop browsers. Twelve distinct solver-selected garden paths, three detailed pixel-art settings and twelve collectible flowers.

## The first five seconds

A golden flower socket sits beside the little sunstone. The matching northwest arrow glows. One tap tips the stone upright, slides it into the socket, rings a warm chord and grows a sunflower. No start menu, account, timer or mandatory written tutorial interrupts the opening. The final native-browser replay measured approximately 1.6 seconds from input to reward panel; the move responds before the panel.

## One clear objective

Roll the 1×1×2 sunstone **upright into the flower socket**. It can lie across the socket without falling through. There are no switches, split blocks, colour gates, inventory, lives, paid currency or extra rules. Narrow paths demand a different approach depending on whether the stone is standing or lying along either axis.

- Use the four diagonal arrow buttons. Their directions match the isometric view.
- Swipe diagonally anywhere on the picture, or use arrows/WASD. Tiny drags below 20 CSS pixels do nothing. The picture does not require precision taps on small tiles.
- Hold/hover/focus a direction button to preview its landing footprint. Pink warns that a soft rescue will be needed. Releasing outside a normal button cancels the click.
- Falling is automatically rescued to the previous safe pose. It adds a soft-landing count and costs no roll or life.
- Undo (U/Z) is free. Guide (H) solves the **current** pose using a small breadth-first search and highlights its next direction. Escape pauses.

First gardens teach standing and turning with 1, 3, 5 and 6-roll solutions. Later routes use different loops, narrow arms and turn spaces, ending at 19 optimal rolls. All twelve solutions total 118 rolls. These are finite original boards, not copied commercial maps or an endless-content claim.

One star rewards finishing, a second rewards par + 2 rolls, and a third rewards no Guide and at most one rescue. Best results only are stored; replays cannot farm stars or duplicate flowers. Mint and lilac sunstone edging unlock at 9 and 24 best stars. Inspect each full, uncropped flower in the Bloom Book and replay any unlocked garden.

## Save and accessibility

Each garden keeps its exact pose, pending roll direction/age, up to 100 undo states, rolls, rescues and assisted flag. The selected garden, best records, sound, motion, haptics and trim save locally. Refresh opens paused and resumes the same interrupted roll. Undo keeps the assisted flag and rescue count honest; restart resets the current run while preserving other gardens and best results.

There is no cloud account. Clearing browser data removes the save; storage failure leaves play available and shows a notice. Dialog focus is contained. Direction buttons and tools have English accessible names, with keyboard equivalents. Gentle mode honors reduced-motion preference at first visit, removes atmospheric sparkles, stops blinking, caps pixel density at 1 and draws at 30 Hz. Normal mode draws at 40 Hz / at most 1.5× density. Optional browser haptics and sound start only after a gesture.

Tab hiding/focus loss pauses and silences play. There is a dedicated pause button. The board preserves its 360:480 aspect ratio; portrait and landscape use separate layouts. Mobile viewport checks are documented in `QA.md`; physical handset testing is not claimed.

## Art and interaction

Seven original images were generated using the built-in image_gen tool. Exact prompts are in `ART-PROMPTS.json` and delivery dimensions/crops in `assets/art-manifest.json`:

1. Honeyglass Conservatory — sunlit cream, jade and gold greenhouse.
2. Rosecloud Rooftops — rose vines, copper rooftops and lavender dusk clouds.
3. Starvine Observatory — moonlit ivy, brass instruments and deep emerald stone.
4. A six-texture transparent atlas for sunstone faces, jade paths, cliff walls and the flower socket.
5. A twelve-flower transparent atlas, all used as actual growing rewards and collection illustrations.
6. A dedicated illustrated SUNSPROUT cover, lazily loaded in the book.
7. A dedicated icon used by the page and header.

Original full-resolution PNGs are retained in the author's workspace. Delivery uses high-quality WebP, with nearest-neighbour background/icon scaling. Measured atlas gutters protect complete flower silhouettes, including the lotus and lily. Runtime face decoration adds two eye states to the generated face material; these are not a claim of a many-frame hand-animated sprite sheet.

The sunstone is a real rotating cuboid projected with Canvas 2D, with a ground-edge pivot, changing exposed faces, affine-mapped image materials and depth clipping as it sinks into the socket. The board, preview, falling stone, planted flower, trim, rings and particles are all live game objects; the cover is not presented as a screenshot. Synthesized triangle plucks, sine harmonics and small completion chords require no audio recording or external request.

## Run and modify

Serve this folder using any static HTTP(S) host, for example `python -m http.server 8080`; open `http://localhost:8080`. The ZIP has `index.html` at its root. All runtime paths are relative. It works inside a GitHub Pages subdirectory with no install, CDN, fonts, WebGL, service worker, account or backend. Direct `file://` behaviour depends on the browser; HTTP(S) is the supported route.

`core.js` contains the deterministic rules; `levels.js` the complete original board data and reference routes; `art.js` the projection/material renderer; `app.js` input, feedback, saves and collection. No framework is required. Art requests never block the rules: fallback geometry remains playable if an image fails.

Run `node tests.cjs` for independent geometry/model checks. Run `python build.py` for the reproducible game-only `SUNSPROUT.zip` beside this folder. Full source, delivery art, tests, prompts and license are included. Huge original PNGs, test browser saves and temporary publication helpers are excluded.

## Reference and originality

Rezona's public [Monument Valley presentation](https://rezona.ai/game/pgcserver/play/DajkmMXU) was inspected for clear isometric staging and a single visible destination. Its characters, assets, maps, code, interface and impossible-geometry mechanism were not copied.

The block-rolling family was also checked against the [original research description of Bloxorz](https://arxiv.org/abs/1411.5951). SUNSPROUT uses original code, boards, visual identity and feedback. It omits switches and split blocks and introduces automatic rescue rather than a restart on falling. It is not a full port of either referenced commercial game and makes no claim of copying a Steam bestseller or achieving a platform rating.

A search of the existing project catalog and preferences found no earlier upright rectangular-block puzzle. The rolling rules differ from the previous quarter-turn gravity, momentum-sliding, snowball-growing, tile-row-shifting and pearl-sowing games. Code is MIT licensed; see `LICENSE.txt`.
