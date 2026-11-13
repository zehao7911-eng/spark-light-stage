# Night Knock

A mobile-first, English-language, browser door-checking game. Compare the visitor’s face and claimed apartment with the resident file. Let matching residents in; lock out mismatches.

## Play

- Tap LET IN or LOCK OUT. Swipe right or left over the peephole for the same actions.
- Tap the magnifier to compare large portraits. No timer and no idle damage.
- Three mistakes end an unupgraded shift. Correct streaks increase pay.
- Six visitors teach the first night; later nights have eight seeded visitors with varying genuine/impostor counts. From night three, borrowed faces are chosen from closer adult groups.
- Finish a night for bonus pay, security stamps and rank progress. Start the next night to recover one integrity. There is no final night cap in normal play.
- Spend pay on permanent reinforced locks and overtime contracts. Upgrades apply to a fresh shift; restarting keeps pay, ranks and resident files.
- The file collects eight residents and three anomaly categories. Security ranks unlock at 3, 8 and 20 stamps.
- Left/A locks; Right/D admits; Enter advances verdicts; Escape pauses. Menus have keyboard focus handling.

## Run locally

Serve this folder with an ordinary static HTTP server, e.g. `python -m http.server 8080`, and open its HTTP URL. No build, account, external CDN, API key or server backend is required. ES modules need HTTP hosting; double-clicking an HTML file through file:// is not the supported launch method.

## Checks

`node tools/test.mjs` covers seeded case fairness, perfect and failed shifts, exact restore states, idempotent currency, upgrades and corrupt data. `node tools/art-test.mjs` verifies first-paint embedded reference thumbnails and late full-image recovery after a soft timeout. Native browser tests and responsive layout results are in VALIDATION.md.

## Artwork reference

Peephole, Rezona, public game xXCcKjnP, observed v21. This project reuses selected publicly served reference images at the user’s explicit art-reuse request. It independently implements a two-button inspection game, not the reference’s keyboard exploration/dialogue system. No reference JavaScript or audio is shipped. See ART-SOURCES.md and THIRD-PARTY-NOTICE.txt; the original-code license does not license third-party artwork.
