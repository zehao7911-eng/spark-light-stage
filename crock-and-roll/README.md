# CROCK & ROLL

One bull. A very bad day for porcelain.

An independently authored, touch-first 3D miniature rampage. Drag anywhere on the shop floor to steer; keep moving to build a short automatic charge. Lift to brake. You can also tap the numbered display tags to run to a particular display. Break the visible piece quota to finish the shop. There is no countdown, health bar, currency purchase, account, or mandatory social action.

The first display is close to the bull: the first collision causes the entire display to shed its pottery in a staggered cascade. Golden crown-marked pieces are worth more. Quick consecutive collisions extend a chain. Earn up to three stars for the piece quota, the shown number of gold pieces, and a chain of nine. Best stars and best scores are recorded separately for each shop; repeated settlement does not multiply awards.

## The collection

Six finite authored arrangements, across three shared architectural sets:

1. A Fine Mess — a tea arcade with low tables and a tiered display.
2. Shelf Esteem — connected high/low shelving and alternate routes.
3. Glass Act — a glasshouse, tile inlays, plants and moving tea trolleys.
4. Room Service — crossing trolley lanes and a denser floor plan.
5. Night at the Vase — a navy-and-brass gallery with mixed display heights.
6. The Grand Finale — the largest arrangement, with eight displays.

This is a compact finished arcade game, not six completely different engines or an infinite unique campaign. Free replay, saved per-shop receipts, earned neckerchiefs, and functional horn-reach / stronger-braking kits provide progression. Kits unlock at six and twelve stars without spending or grinding a wallet.

## Controls and access

- Touch / mouse: hold and drag on the floor; release to brake. A finger can stay away from the bull and targets.
- Alternative: tap a numbered display tag. The bull runs there and brakes; these assisted trips do not automatically trigger a dash.
- Keyboard: WASD or arrow keys, mapped to the current camera orientation. Release to brake. Escape pauses.
- Sound, camera motion, and Light rendering are independent settings. Coarse-pointer devices start with Light rendering.
- The game pauses on blur / hidden page. Reloading an active visit opens a pause card at the saved shop state. The interrupted pointer is never restored as a held input.

## Art, feedback and scope

Original rounded bull with curved horns, ears, snout, eyes, brows, tail, neckerchief, bell and moving hooves. Original lathed vases, handled teapots, bowls, crown pieces, support racks, cabinets, lamps, framed motifs, floor inlays and plants. Glazed ceramic and metallic reward pieces contrast with matte timber and wall paint. Displays compress and break into floor boards; pottery bursts into bounded 3D chunks, leaving deterministic floor fragments that reconstruct from the save. This is custom arcade collision and staged destruction, not a full rigid-body destruction engine or a physically exact fracture simulation.

The visual and loop reference actually played was **Bull In a China Shop**, on [Rezona](https://rezona.ai/game/pgcserver/pv/yAvUQpTy/v21/dist/index.html): RAMPAGE, native forward movement / charge, $1,530 damage and a chain of six were observed. No complete reference run is claimed. No Rezona source, models, textures, fonts, music, screenshots or logo are included. `cover.png` is a real screenshot of this independent game, and `icon.svg` is an original matching bull portrait. Original models, UI, maps and synthesized audio are independent; this is not an exact reproduction or an officially affiliated game. A flight audition was rejected because an earlier game already used that core loop.

Shared original primitive, batching, frame-clock and optional platform-bridge patterns were adapted from the author's earlier Tow the Moon project, with retained notices. Rendering uses the locally bundled Three.js r147 under MIT. There is no image generation and no runtime CDN, third-party font, recorded audio, analytics or background download.

## Run, build, export

Open `index.html` directly, or serve this directory with a static HTTP server. `index.html` and `standalone.html` are identical self-contained files; source modules are included for editing. No build dependency installation is required.

Rebuild with Python 3: `python build.py`. It writes the two bundled HTML files and a root-index `CROCK-AND-ROLL.zip` in the parent directory. Test with `node tests.mjs` and `node model-tests.mjs`. Tests validate actual simulation, save guards and Three geometry, not the quality of a physical handset's GPU.

Performance bounds: 30 FPS Light / 40 FPS standard paint; fixed 60 Hz simulation; DPR 1 / maximum 1.5; static vertex-colour scene batching; at most 180 short-lived particles and 360 persistent floor chips; at most 20 synthesis voices; no real-time shadows in Light mode. Rendering has an independent clock so frequent pointer input cannot starve paints. Actual phone hardware, thermal behavior and real GameWave hosting have not been certified.

See `VALIDATION.md`, `GAMEWAVE-IMPORT.md`, and the license files for delivery evidence and platform limits.
