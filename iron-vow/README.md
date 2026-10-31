# IRON VOW

A mobile-first HTML5 boss gauntlet. Swipe with the arrow to parry. Break the guard, then hold to strike. Win a duel, choose one of three stacking relics, and face the next opponent. The gauntlet continues until you fall.

## Play

Serve this folder over HTTP(S), or upload the ZIP contents to static hosting. `index.html` is at the archive root. Example: `python -m http.server 8000`, then open `http://localhost:8000/`.

- Swipe in the shown arrow direction anywhere in the arena. Matching arrow buttons are also available.
- While the guard is broken, hold the arena or the large STRIKE button to attack repeatedly. Tapping also works. Every third strike is a heavier finisher.
- A late, successful parry is Perfect: it breaks two guard points and earns bonus score. Normal parries are accepted across the entire telegraph; precise timing is optional.
- Keyboard: arrows or WASD parry; hold Space while the arena is focused to strike; Escape pauses. Tab/Enter operate the interface.
- The first arrow waits for your successful parry, and the first counter window waits for your first strike. Practice mistakes here cost no hearts.
- Later misses and incorrect directions cost one heart. Pausing, changing tabs, losing focus or cancelling a touch clears held inputs. Nothing attacks behind a pause/reward screen.

## Run and permanent progression

Two illustrated boss appearances, each with distinct idle/windup/attack/stunned cutouts. Two battlefield illustrations alternate every two duels. Guard, health and attack timing scale with the duel number. They are finite art assets supporting a continuing gauntlet, not an endless supply of unique characters or maps.

Eight relic types affect strike damage, third-hit finishers, attack speed, parry damage, perfect windows, counter duration, maximum hearts and healing. Offers are seeded, use three distinct relics and exclude capped effects. Choices stack for the current run. Hearts cap at eight; victory healing and item effects are bounded. No purchases, accounts, lives energy or forced wait timers.

Every won duel permanently earns one seal, credited exactly once. Three lifetime seals unlock Flame (extra damage on every third strike); eight unlock Frost (16% longer enemy windups). Sigils selected during a run apply to the next run. Six records/medals track milestones. A fallen run loses its relics, while seals, medals and best records persist.

Browser storage key `iron-vow-v1` retains the exact run phase, opponent health, hearts, attack pattern, remaining windup/counter time, chosen relics, random state and permanent credit ledger. Partial runs reload paused; unclaimed victories reload with their same three choices. Invalid saves are rejected safely. Storage failure does not prevent play. No cloud or cross-device save is provided.

## Art reference and provenance

The user explicitly requested the visual artwork from a Rezona game instead of more animal/storybook art. This production reuses the publicly served artwork from **Rebirth Blade — 1v1 Boss Duel**:

`https://rezona.ai/game/pgcserver/pv/fNvbHcfO/v1/dist/index.html`

The reference title, battle, armoured character art and defeat screen were visually inspected. Its public catalogue marks it remixable. The original reference was not completed, and no claim is made that this gauntlet is its original rule set or full campaign. Only the listed artwork was incorporated; the reference JavaScript bundle, UI, music and sound effects are not shipped. This game has a new independently written parry/counter/relic progression system and synthesized audio.

`assets/PROVENANCE.json` records all twelve original image URLs, byte sizes and SHA-256 hashes. Original PNG/JPEG files are retained. Runtime WebP derivatives reduce image transfers to about 1.4 MB; alpha is preserved. The icon is a crop of the reference boss portrait, and the cover is a screenshot of this running game. No image generation was used for this production. Poses are cutout image states with code animation and separate foreground/shield pivots, not a rigged 3D character or frame-by-frame walk cycle.

See `ART-SOURCES.md` and `THIRD-PARTY-NOTICE.txt`. The original combat/interface code license does not relicense third-party artwork.

## Technical and verification notes

Vanilla JavaScript modules, Canvas2D, semantic HTML controls and Web Audio. No CDN, external font, analytics, service worker or network dependency after loading local files. Combat uses bounded fixed 60 Hz updates, capped catch-up, rendering capped at 40 fps (24 in Gentle Motion), maximum device pixel ratio 2, 160 short-lived particles and 14 ambient flecks. Low update frequency can slow combat rather than fast-forwarding through unseen attacks. Combat input also synchronizes the bounded clock to preserve tap responsiveness. Pause clears drag/hold state, freezes combat and releases sound voices. Gentle Motion removes shake, ambient particles and pulsing prompts. Six tiny credited reference-image thumbnails are embedded in an 85 KB first-paint module, so real scenery and characters appear while full artwork loads. Full images are installed individually as they arrive; a ten-second timeout releases loading status but never rejects images that arrive late. Retry artwork remains in Pause for failed requests. Code-drawn silhouettes are a final fallback if even the embedded thumbnails cannot decode.

`node tools/test.mjs`

Tests cover a 19-duel simulation, forty deterministic seeds, normal/perfect parries, cooldowns, heavier finishers, relic effects/caps, defeat, save/restore validation, reward idempotence, permanent sigil unlocks and corrupted data. Device-size/native-input/public deployment verification is recorded in the separate delivery report. The art-loader test simulates resources arriving after the timeout, checks real embedded first paint and confirms that late full images repaint correctly. Browser viewport checks are not physical handset or performance benchmarks.
