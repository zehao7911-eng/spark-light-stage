# POCKET QUARTET

An original, touch-first 3D musical call-and-response game. Watch the four musicians demonstrate a short phrase, then tap the same instrument keys in order. Each note is shown by both colour and symbol, so sound is optional. The first phrase has two notes and an explicit piano-then-drums cue. There is no tapping rhythm requirement, timer, lives, combat, purchase or account.

## Play and progression

Six finite concerts contain 24 authored phrases and 106 note positions, ranging from two to six notes per phrase, in three stage settings: a sunny rehearsal loft, a glasshouse and a midnight balcony. The four instruments play distinct original synthesized piano, drum, bass and bell tones. This is a short authored campaign rather than an endless source of unique songs.

Mistakes replay only the current phrase. Watch Again repeats the demonstration freely. Correctly credited note positions never award points twice, so retrying or rewatching cannot farm score. A completed phrase adds 200 points; five newly credited correct notes in a streak add 100. Completion earns two stars, or three with at most two slips. Using Guide notes at any point limits that visit to one star, even if the guide is switched off later. Guide highlights the next key. Old best stars are retained when a later visit earns fewer.

Best stars unlock Velvet coats at six and Golden Hour coats at twelve. These change all four actual 3D jackets and bow ties; they do not change input accuracy. After the first concert, Free Jam lets you play the instruments without a test or score. Open THE CLUB to change concert, wardrobe, guidance or graphics. New devices with a coarse pointer default to Light view; users can change this.

Tapping an actual 3D musician is an alternative to the four large keys; a generous body hit area supplements mesh picking. Keys 1–4 or A/S/D/F play the same four instruments. Space starts a ready concert, Escape pauses. Touch controls are at least 44 CSS pixels. Native pointer presses are handled directly and compatibility clicks are ignored; accessible keyboard-generated clicks remain supported. Real rapid consecutive taps are accepted without a simulation-time debounce.

Current phrase, accepted note positions, demo progress, score, slips, best stars and settings are saved in browser storage. Reloading an unfinished concert opens a pause screen before continuing. A completed receipt survives reload. Free Jam is temporary and resumes the stored concert on reload. Storage denial leaves a playable session but cannot guarantee persistence. Hiding or leaving the page pauses gameplay and audio. WebGL context loss pauses with a reload instruction.

## Art and performance

All 3D models, environments, icons, interface and sounds are independently authored in code. Four original human musicians have connected two-link arms/legs, facial features, hair, fingers, jackets, instrument-specific hand targets and bowing/playing motions. Static source parts are combined into a coloured dynamic render mesh per musician, reducing the four actors to five draw meshes including the piano nameplate. The original articulated source rig remains available for validation; it is not a general cloth, ragdoll or full instrument simulator.

Each scene includes stage planks, inset rugs, windows or city lights, curtains, plants, lamp shades, shelves, books, a case, named pedestals, key details and bounded note particles. Dynamic normal transforms preserve lighting as parts move. Render presentation is capped at 40 FPS, or 30 in Light view; DPR is capped at 1.5 or 1.0 respectively. Shadows are static and disabled in Light view. Simulation uses fixed 50 Hz steps. These are configured budgets, not physical handset FPS or thermal certification.

The cover is an actual runtime screenshot. No image generation was used. Three.js r147 is bundled locally with its MIT notice. Rounded primitive helpers are adapted from the user's earlier original projects. New project code is MIT; see LICENSE.txt.

## Reference and scope

Rezona [Piano Simulation / Nocturne](https://rezona.ai/game/pgcserver/pv/dWLSSnKV/v1/dist/index.html) was opened through the actual catalogue. Tap to Begin and a native A press produced C4, 261.63 Hz and LAST: C4, with a visibly depressed piano key. Its tangible key response, instrument voice choices and cream/ink typographic treatment informed this independent quartet game. No reference source, art, font, recording, logo or branding is bundled. This is not a copy of its complete keyboard or an assertion of one-to-one visual parity, platform ranking or quality grade.

Other auditions were excluded: Coin Cascade repeats the earlier Opal Tumble/Tidal Mint core; Today's Fit repeats Cutout Club; Fish Heist is a multi-control runner; Waddle Wave uses a five-lane music track; Channel Thirteen is a horror viewing game. The chosen call-and-response sequence loop differs from earlier Chimework's routed-bell puzzle and Daydream Club's timed rhythm taps.

## Run and build

`index.html` and `standalone.html` are identical, self-contained HTML files. They include all runtime JavaScript, CSS, the icon and Three.js. No CDN, external font or build installation is needed. Serve this directory through any static server; browsers that allow local WebGL files can also open index.html directly. ZIP imports should keep index.html at their root. Editable sources are supplied; `python build.py` regenerates the bundled files.

Run `node tests.cjs`, `node rig-tests.cjs` and `node sdk-tests.cjs`. These verify progression, real sequence input, repeat-score prevention, guide/grade rules, snapshots, actual generated rig/render geometry and optional SDK mocks. They do not establish subjective fun or a platform S rating.

GameWave callbacks are optional and never gate play. See GAMEWAVE-IMPORT.md. Actual phone hardware and the real GameWave host were not available for validation.
