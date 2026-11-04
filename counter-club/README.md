# COUNTER CLUB — A Little Fight, A Lot of Heart

An original illustrated HTML5 close-up boxing game. Visual direction deliberately follows the user's approved NOPE! FC: cream / vermilion / blue-ink sports posters, line-drawn people with expressive faces, layered scenery, sewn leather gloves and responsive contact animation. This is Canvas illustrated perspective, not a 3D engine or generated-image background.

## Play
Tap Punch or the arena to attack. Hold Guard before an opponent's punch arrives; release and punch when their gloves drop. Every third clean hit is an uppercut. A perfectly timed block or optional swipe slip adds a counter bonus. First opening waits for the player's first punch. Failures have free rematches. No payment, betting, ads or accounts.

Six opponents have different wind-up lengths, health and attack chains (one, two or three punches). Three individually painted venues: old corner gym, harbor club at sunset, midnight rooftop. Best-only stamps record wins, wins with at most two incoming hits, and clean wins. Two wins unlock Soft Wraps (energy recovery); four unlock Quick Hands (shorter recovery). A final-opponent rematch is explicitly a replay, not infinite newly authored content. Gold leather and victory confetti are optional host cosmetics. The cast artbook is a static developer visual preview, not an extra gameplay mode.

## Inputs and saves
Phone: two large controls, Punch and held Guard; tap arena punches, swipe slips. Desktop: Z/Space punches, X/Shift holds Guard, Escape pauses. Controls release on cancellation, lost capture, blur and backgrounding. Local save preserves progress, gear, settings and active bout; an interrupted active bout resumes paused. Storage failure leaves a playable in-memory session. All player-facing text is English.

## Reference provenance
Rezona's public catalog was actually browsed on 2026-11-04. Hyper KI Warriors was launched: https://rezona.ai/game/pgcserver/pv/zYflQWhI/v1/dist/index.html . Mode and character selection were operated with native Enter; the rendered arena, health bars, fighter artwork and CPU victory state were observed. Manual attack controls, complete move sets and an authored reference win were not verified. This game's first-person two-control boxing loop is an independent adaptation of a readable attack/defence rhythm, not a clone of the reference's side-view anime fighter. Reference art, source code, characters, media and logos are not included.

Oilard loaded its billiards instructions and was rejected because a local billiards game already exists. What Does the Crab Hide loaded its camera-adventure instructions and was rejected as an existing reference. Rumble's city-smash entry was inspected and rejected as a repeated destruction direction. Public catalog observations are not claims of popularity, platform score or S-grade certification.

## GameWave
The optional HostBridge adapter is adapted from NOPE! FC. Core boot, rendering and gameplay do not wait for the host. Positive onLike and valid onComment callbacks grant saved cosmetics once. Registration results and UI clicks never grant rewards. SDK absence, partial methods, late injection and stale callbacks are guarded. No SDK URL, post/comment action, social state query or automatic posting is assumed. Full local state is available to supported host saves; cloud profile merges retain best records and flags without overwriting an active run. Actual GameWave App import and live events require platform-side testing.

## Run and build
Open index.html or standalone.html directly, or serve this folder over HTTPS. Both inline runtime CSS/JavaScript and need no CDN, Module/WASM runtime, external font, image download, account or build server. Editable sources are engine.mjs, art.mjs, sdk.mjs, app.mjs, index-source.html and style.css. Rebuild inline HTML with `node build.cjs`; archive this directory with index.html at ZIP root. A Python alternative is included for machines with Python installed. No external dependencies are required by the Node build.

## Verification
`node tests.mjs` checks six expert-controller wins, six losses, guard/counter timing, initial onboarding wait, collision-free abstract fight rules, local restore, best-only rewards and monotonic cloud merging. `node sdk-tests.mjs` covers missing/partial/late SDKs, registration cleanup, image-only comments, positive likes, bounded retries and nonblocking cloud loading. SDK tests are simulations, not actual host certification. Browser playtests verified a hit, held guard retaining health, a won bout and result, free rematch and responsive layout. Physical-phone frame rate is not established by viewport emulation.

## Credits
Original artwork, rules, animation and synthesized sounds; shared drawing conventions and host adapter from the user's NOPE! FC project. No generated raster art or commercial game assets are used. Skills informing the work: game-design, game-art, 2d-games, game-audio, web-games and mobile-games.
