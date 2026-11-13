# Little Atlas

An original, mobile-friendly HTML5 miniature landscape puzzle. Place hex tiles, rotate their paths, grow connected landscapes, and collect a field journal of little wonders.

## Play

Open `index.html` in a modern browser, or serve this folder from any static web host. No build step, accounts, external libraries, fonts, or network API are required.

1. Choose one of three miniature tiles.
2. Tap a vacant hex beside the island. Rotate the selected tile to align its paths.
3. Place it to earn points. Matching terrain earns +8 per neighbour; connected paths earn +12.
4. Connect 3, 6, and 10 tiles of a terrain to grow landmark buildings and receive points and additional tile charges.
5. Complete little wishes, chain good placements, and discover four seasons. Special wonder tiles boost nearby placements.

Drag to pan, pinch or scroll to zoom. On touch screens, tap the same preview space again to place directly. R rotates, Space places, Z undoes the latest placement. The circular view control fits the whole island. The picture button saves a PNG postcard.

Challenge mode has a limited tile supply. Free Build removes the supply limit and timer pressure. When the supply runs out, keep the island, undo the final move, or continue freely. After placing enough tiles, the flag button opens another island while preserving score and collection progress.

## Content

- Four terrain types, six tile orientations, several path layouts.
- Three growth stages per terrain: flowering groves, windmills, clocktowers, cafés, harbours, lighthouses, fountains, and gazebos.
- Living miniature boats, residents, woodland rabbits, butterflies, and birds.
- Four seasonal palettes, chain bonuses, perfect placements, changing wishes, and special wonder tiles.
- Persistent local atlas, eight collectible journal stamps, local challenge high score, undo, photo export, synthesized sound, and Free Build.

## Mobile and performance

Responsive portrait and landscape layouts. Pointer events support touch, drag, and two-finger zoom. Rendering is capped at 30 FPS on narrow screens and device pixel ratio 2; miniature artwork is cached. Animation pauses in hidden tabs. Sound begins after a user action. No image-generation assets were used.

Verified in Chromium at 390×844, 360×640, and 844×390, including browser-dispatched touch events, panning, pinch zoom, photo download, progression, end-state undo, and save restore. These checks do not substitute for testing every physical phone/browser combination.

## Package

Keep `index.html`, `style.css`, `art.js`, `game.js`, and `icon.svg` together. Archive root includes `index.html` for HTML5 hosting platforms. The artwork and code are original. Design references: Dorfromantik's peaceful tile landscape building and ISLANDERS' compact construction; no assets or source code from those games are included.
