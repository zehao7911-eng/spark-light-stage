# Bramblepost · A Little Further

A cozy, original pixel-art HTML5 sorting game. Slide entire rows and columns, build satisfying cascades, and send supplies along a woodland postal railway.

## Play

Open `index.html`, or serve this directory over HTTP(S). No CDN, account, payments, installation or external runtime requests are needed. All text is English. Local images and the pixel font are included. Art is decorative; there is no blocking asset-loading screen.

Swipe a row horizontally or a column vertically. Distance determines one to five wrapped steps. Match three or more identical supplies in a straight line. Cleared supplies enter your satchel; the remaining tiles fall and refill. Cascades collect additional supplies and bonus coins. Ordinary repositioning is free: there is no clock, move limit, lost life or paid hint.

Alternatively tap a tile then use the four arrow buttons. Keyboard arrows slide the selected row/column; H shows a free nudge; Escape opens/closes the journal. A nudge highlights one match-producing row/column and shows its direction and number of steps. Cancelled pointers do not move the board.

The parcel above the board shows its requested types and amounts. Tap **Send Parcel** when all are available; only the displayed quantities are consumed. Three parcels complete a station, award three postage stars and unlock the next stop. Stored supplies, coins and upgrades carry forward.

## Progression

- Twelve named stops with four UI color palettes. They share one illustrated woodland train setting, not twelve unique illustrated maps. After stop twelve, named locations repeat with capped order quantities and new procedural boards; this is replayable remix content, not unlimited authored locations.
- Start with Tea, Berries, Honey and Letters. Plums unlock at station 3; Moonflowers at station 6.
- Station 2 unlocks **Burst**. Fill the steam meter with matches, press Burst, then tap any tile to resolve its entire cross (eleven cells) and any resulting cascades.
- Station 4 unlocks **Sort**. A full steam meter creates a six-tile row of a currently missing requested supply and resolves it. Burst and Sort share steam. There are no paid charges.
- Station 7 adds two bonus coins per match wave.
- Twelve workshop upgrade levels: Steam Tank (+3 capacity and more starting steam), Careful Packing (+1 supply per level for a type matched at least four times in a wave), Priority Bell (+4 coins per level per delivery). Four levels each, costs 45,110,220,380.
- Three companions: Pip at start; Moss at station 4 (+1 steam per wave); Wren at station 8 (+6 coins per delivery). Switching is free. Their portraits use the same 16×16 logical pixel grid.
- Each supply caps at 60; steam caps at its displayed capacity. Claimed deliveries and station rewards cannot be claimed twice by reload. Best cascade, total deliveries, stars, exact board and deterministic RNG are saved.

## Feedback and device behavior

Staggered match pops, dropped parcels, square particles streaming into the order, cascade callouts, ready-to-send highlight, dispatch flash, optional synthesized sound and unlock cards. Reduced-motion preference removes CSS motion and particles. Sound starts off and is user-controlled. Hidden tabs suspend audio and input and do not advance the reveal animation until visible. Menus pause animation and make the game underneath inert.

Controls use at least 44 CSS pixels at tested narrow sizes; the grid has six columns and scrollable portrait/landscape layouts. Images are WebP, the game has no WebGL requirement, effects are bounded to 150 squares and sound to ten voices, and the animation loop sleeps when no particles exist. Browser viewport testing is not physical handset certification.

The local save key is `bramblepost-v1`; audio setting has a separate key. Blocked storage permits play in memory. Fresh Board in the journal keeps your currency, supplies and progress. Clear site storage to begin completely anew.

## Source and rebuild

The full playable package includes editable source, original upstream source, licenses, prompts and tests. See `NOTICE.md` for exact attribution and modifications. The upstream match-three-js core is MIT licensed; no commercial game files are included.

With Node 22+ and pnpm: `pnpm install --ignore-scripts`, `pnpm test`, `pnpm run build`. Only esbuild 0.25.12 is a build dependency; the playable release has no package runtime. The lockfile is included. `game.js` is the generated browser bundle. `upstream/` is reference material, not a second runtime or a dependency to execute.

See `BROWSER-QA.md` and `test-report.txt` for actual verification results.
