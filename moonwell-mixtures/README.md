# Moonwell Mixtures

An original English HTML5 liquid-sorting puzzle. Tap a vessel, then an empty vessel or a matching top color. A full single-color vessel seals itself. Bring every color home to awaken one of twelve small forest friends.

## Running

Upload this folder to a static HTTP/HTTPS host. The ZIP has index.html at its root. For a local server, run `python -m http.server 8080` and open `http://localhost:8080/`. ES modules and the hint worker require a server; opening index.html through file:// is not supported.

Touch/mouse uses two taps. Keyboard 1–6 selects bottles, Z undoes, H requests a hint, Escape pauses/resumes. There are no time limits, lives, payments, accounts, adverts or real-world prizes.

Undo is free and rolls back one pour. Completed single-color bottles are sealed and cannot be poured out. Invalid pours do not change liquid or moves. A legal pour transfers the largest matching top group that fits. Hints compute a real legal route from the current board in a worker and highlight one next action; they do not automatically solve the board. If no route is found, undo/restart remains available. All twelve initial boards have certified routes.

## Content and rewards

Twelve fixed boards progress from two colors and two pours to four colors, six vessels and fourteen-pour solutions. Three layered forest palettes include distant waterfalls and a crystalline dusk. These are finite handcrafted puzzles rather than an endless content generator. Each completed well unlocks the next and adds a named friend to the journal. All twelve can be replayed.

Stars reward completion, staying within the displayed optimal-plus-two pour target, and using no requested hints. Undo has no star penalty. Best stars and best move records are retained separately and never decrease. Stored progress is local to the device; denied storage still allows session play.

The rendering is original code-authored Canvas2D illustration: layered foliage, softened distant trees and hills, controlled shafts and reflections, bark/wood details, a coat-wearing stoat keeper, twelve variations of six small spirit silhouettes, translucent glass, curved liquid surfaces, shape glyphs, animated tilting pours, corks and rising spirit effects. The liquid is a stylized layered animation, not a full fluid simulation. The icon is original SVG and the cover is an actual runtime screenshot. No image generation, reference bitmap, commercial asset, external font or library is included. Sound is original bounded Web Audio synthesis, unlocked by a gesture.

## Reference research

Gameplay: Rezona public catalogue **Water Sorting**, served as **The Soul Apothecary**, https://rezona.ai/game/pgcserver/pv/MThHEYvx/v5/dist/index.html . The title, ledger and first board were actually opened. A native source-to-empty pour changed the source volume and advanced rites from 0 to 1. A full reference campaign clear is not claimed. No reference source code, art, audio or character was copied into this package.

Art: https://mygamesartstyle.jupiterthewarlock.com/styles/layered-light/ . The enlarged Ori and the Will of the Wisps purple-lake scene was actually viewed for near/far layering, selective luminous subjects, haze, warm/cool hierarchy and reflection. This game uses original characters, scene shapes and interface; it is not a pixel-identical Ori reproduction.

## Implementation and checks

`node tools/test.mjs` verifies all twelve minimum routes with three bottle permutations, liquid conservation, transactional pours, exact mid-pour restoration and deterministic continuation, free undo, hint stars, terminal input freeze, malformed saves and monotonic records. Rendering and input remain separate from the pure engine. A 60 Hz model, 40 Hz render schedule, DPR capped at 1.5, six background-cache entries, eighteen spirit effects and twelve sound voices bound resource use. Explicit pause and backgrounding stop simulation/audio; paused scenes stop continuous redraw. No handset FPS claim is made.

The phone and layout previews in tools/ are optional development helpers. Browser QA and publication evidence are stored outside the game package. The game has been checked in browser phone layouts; this does not substitute for a physical handset or establish a platform quality grade.
