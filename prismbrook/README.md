# PRISMBROOK

Tap a colour. Follow the ripple. Join every pool.

A complete, original, source-pixel colour-expansion puzzle for touch and desktop browsers. The tiny fountain marks the starting connected water. Choosing a colour changes all connected water and absorbs every edge-touching pool of that colour, including chains. Diagonal corners do not connect. Colours that cannot expand the bay are disabled and never waste a move.

## Play

Use the large colour buttons; no precise board tapping is needed. The first Honey tap visibly joins four more pools. Keys 1–5 select colours, U undoes, H requests a hint and Esc pauses. There is no countdown or move-limit failure.

Undo is free. Hint runs a breadth-first search of the current connected-region graph in a local Worker, rather than reading a fixed next move. Hints preserve the completion star. Three stars require a hint-free finish within par; two require a hint-free finish within par plus two. Hint usage survives Undo. An improved replay replaces only its best score/stars; postcards and unlocks cannot be farmed repeatedly.

## Finished content

- Twelve fixed, independently designed and solver-checked 4x4 to 7x7 maps, with four or five active colour types and irregular shoreline corners. Maps 1–3 use four colours; later maps use five. These are a finite campaign, not endless unique content.
- Three coastal settings: Shelllight Coast with lighthouse/cottage, Sunset Arches with stone arches/boat, and Lantern Quay with lamps/bridge/moonlit houses.
- Original integer-pixel timber, roof shingles, window lights, atmospheric islands, sea glints, submerged shelves/pebbles/reeds/shells, stone-rimmed pools, joining channels, symbols and a single animated spring.
- Six small original aquatic animal silhouettes with blinking/bobbing; one keeper with Peach/Sage/Lilac outfits; twelve collectible code-drawn bay postcards.
- Staggered ripple propagation, joining-channel openings, pitched water notes, rising completion chords, large-chain labels, bounded particles and optional small vibration.
- Best scores, stars, postcard album, unlockable outfits at 9/24 stars, active state and unfinished ripple save/resume. Refresh restores paused. Cosmetic particles and ambient phase restart on reload.
- Sound and gentle-effects settings, automatic background pause, focus-trapped dialogs, readable colour names plus unique symbols and portrait/landscape layouts. No audio permission is needed beyond the first normal interaction.

## Art / reference provenance

The user's [detailed pixel gallery](https://mygamesartstyle.jupiterthewarlock.com/styles/detailed-pixel/) was inspected, including the enlarged [悠哉钓鱼 sea/ship scene](https://mygamesartstyle.jupiterthewarlock.com/media/3399960/scene-0.jpg), for grouped water highlights, low-contrast distant islands and readable timber/boat detail. No reference pixels or commercial characters are included. The cover is an actual gameplay capture, not generated art.

Rezona candidates were auditioned: Graft and Foreland had more complex tool/movement rules, Color Balls had movement/jumping controls, and Grape Gate's title/start attempts did not visibly enter gameplay. No completed reference playthrough is claimed. The final connected-colour flood mechanic is independently implemented, in the established Flood-It family; it is not presented as a one-to-one Rezona recreation or a newly invented genre. No external game source/art/audio was imported.

All rendering, postcards, icon and synthesised sounds are original code-created work. No Imagegen, external fonts, libraries, CDN, WebGL, backend, accounts or service worker. Browser localStorage denial falls back to a playable in-memory session.

## Run / package

Extract the ZIP and serve its root index.html and adjacent files on any static HTML5 host, including GitHub Pages. A local HTTP server is recommended: `python -m http.server 8080`. Upload the whole folder when importing to a game platform. Direct-file Worker support depends on the browser; the app includes a small local solver fallback.

`node tests.cjs` checks minimum routes, every campaign finish, strict region growth, random legal play, free Undo, in-flight exact save/restore, idempotent best records, hints, terminal freeze and malformed saves. `python build.py /path/to/node` runs those checks and creates a reproducible PRISMBROOK.zip one directory above this folder.

All 12 bays were additionally completed using ordinary visible browser colour buttons to 36 stars/12 cards. See native-campaign.json and qa.json. Local layouts at 320x568, 390x844 and 844x390 were checked without overflow; controls were at least 44 pixels. No physical iOS/Android handset was available, and no device performance certification is claimed.

## License

Original code and artwork: MIT. See LICENSE.txt.
