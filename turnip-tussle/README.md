# Turnip Tussle

An English, touch-first HTML5 carrot-competition game adapted from the complete open-source Raging Gardens project. Tap a sprout or drag to move, stop nearby to pull automatically, and BOOP cheeky rivals away. Four successful harvests charge a temporary rush. Golden carrots count double and add time; big roots count triple. Mud slows both sides. Later patches unlock a two-root scarecrow decoy. Nine shifts across three illustrated gardens unlock a repeatable seeded festival, with escalating goals and capped rival counts.

## Run
Serve this folder over HTTP (`python -m http.server 4270`) and open the address. No install or build step, CDN, account or network gameplay service. Touch destination/drag plus joystick and BOOP; keyboard WASD/arrows, Space, E for decoy. Resume saves, pause, mute, retry, next shift, map and tool unlocks are included. Best-only stars unlock wider BOOP, quicker boots and stronger gloves. Replaying cannot farm stars. Audio is muted by default; enable with the note button.

## Source and license
Base project: https://github.com/kenamick/game-off-2012
Revision: 25ee1691752bb110f09a5f2256d477a67a0671ad
MIT, Copyright2012 Petar Petrov. License is retained in LICENSE-RAGING-GARDENS.txt. Unmodified original gameplay sources, entry page, manifest and README are in upstream/. Source hashes and adaptation boundaries are recorded in source-manifest.json.

source-game.js translates the complete competition gameplay loop: Player movement/extraction/harvest, Tilemap carrot health/occupancy/spawn capacity/nearest-free target selection, Enemy extraction/target reservation/reacquisition, PushBack stun and displacement, ForkBeacon decoy redirection, and scene timed-round/spawn progression. Original Crafty/Backbone/RequireJS rendering and remote score service are replaced, not claimed to be retained. Authored progression, normalized movement, safer continuous repulsion, free cooldown BOOP, automatic pulling, new mud/gold/giant/rush mechanics, saves and UI are new. Original third-party game art/audio and original analytics are excluded. This is a gameplay port and adaptation of a full game, not the original executable with new textures.

New code is MIT, Copyright2026 Turnip Tussle contributors. Generated original artwork: three800×1200WebP backgrounds plus20-cell768×1152transparent sprite/prop atlas; prompts and asset paths in ART-PROMPTS.md. No commercial game assets or video art were extracted. Eight distinct running poses plus idle/pull/victory/hurt, separate rivals and props; renderer adds grounded shadows, extraction meter/tug, flying roots, dirt particles, combo words, knockback rings and stun stars. Background paintings are static while gameplay and effects animate. Working PNG originals are stored locally outside this package.

## Test
`node tests.mjs` runs full AI-active round solutions across nine shifts and three festival rounds over five seeds, as well as target occupancy, spawn caps, actual repulsion/stun, beacon redirection/expiry, loss timeout, deterministic active-run restore, reward caps, actor bounds and renderer effect retirement. See VALIDATION.md for actual browser checks and limitations. Desktop viewport testing is not a physical handset certification.
