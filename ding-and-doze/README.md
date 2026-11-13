# DING & DOZE

A complete, original, single-axis pixel hotel elevator game. Pick up sleepy animal guests and deliver them to the floor number in their bubble.

## Start playing

Tap floor 1 to take the first guests home, or drag the lift to a floor and release. Boarding, doors and exits are automatic. A useful next destination glows above the cab. Next Call points to a useful floor without moving it for you. No countdown and no lost guests.

Keys 0–3 select floors, arrow keys choose an adjacent floor, H rings Next Call and Esc pauses. Space rings the bell when the canvas has focus. Enter/Space retain normal button activation.

## Complete content

- Nine authored shifts in three hotels: Teacup House, Rainy Quay and Starlight Grand.
- Two seats at first; three seats from shift four. Guest arrival waves unlock through completed deliveries.
- Tea room, tiled bath, telescope roof, bakery, library, piano lounge and luminous conservatory.
- Six animal silhouettes, blinking, scarf details, four-frame stepping, actual boarding and exiting, lattice doors, pulleys and counterweight.
- Per-guest tips, same-stop group bonuses, stars for completion/no empty stops/par, nine distinct collectible room keys and Brass/Mint/Rose cab finishes.
- Records keep the best score and stars on replay. Finishing the ninth shift returns to the first; this is a finite campaign, not procedural endless content.
- Local progress and in-transit resume; sound toggle, gentle effects, automatic background pause and keyboard focus handling.

## Visual and interaction references

Rezona's [Colony Management / Underhaven](https://rezona.ai/game/pgcserver/play/yAUFAFmQ) was inspected and its Dig/Done interaction was tried. Its cutaway residence presentation informed the compact building view. No completed colony run was claimed, and none of its source or artwork is included.

The user's [detailed pixel style gallery](https://mygamesartstyle.jupiterthewarlock.com/styles/detailed-pixel/) and its Dave the Diver restaurant scene informed warm timber, small room props, lamps and readable resident bubbles. All hotel art, characters, keys, icon and synthesised sounds here are original code-created work. No Imagegen, copied commercial sprites, external fonts, libraries or CDN dependencies are used. The cover is an actual gameplay capture.

## Run / import

Extract the ZIP. Its root index.html can be served on any static web host, including GitHub Pages, or uploaded with the whole folder to an HTML5 host. A local HTTP server is recommended (for example `python -m http.server 8080`). Local saves depend on the browser allowing localStorage; blocked storage falls back to a playable in-memory session. There is no service worker or automatic reload.

## Validation

Run `node tests.cjs` for model conservation, capacity, valid boarding/exit/transit restores, campaign routes, scores, group bonuses, terminal behavior and malformed-save checks. `python build.py /path/to/node` runs the suite, adds content-derived asset versions and creates a reproducible DING-AND-DOZE.zip one directory above the source.

All nine shifts were additionally played through visible browser controls to 27 stars and nine keys. See native-campaign.json and qa.json. Portrait layouts at 320x568 and 390x844 and landscape at 844x390 were inspected with no page overflow. Drag dispatch, wrong-stop recovery, hints, unlocks, settings persistence and mid-transit refresh were exercised natively. Physical iOS/Android devices were not available for testing; no physical-handset performance guarantee is made.

## License

Original code and artwork are MIT licensed. See LICENSE.txt.
