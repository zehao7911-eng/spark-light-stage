# Source and adaptation

Original repository: https://github.com/kenamick/game-off-2012

Pinned revision: 25ee1691752bb110f09a5f2256d477a67a0671ad

Author: Petar Petrov, 2012. Code: MIT. Original graphics are excluded from that code grant and were not copied. No original game music was reused.

The original Config, ActorObject, Tilemap, Player, Enemy, MagicPush and MagicFork classes are retained in engine/. The game actually instantiates them: Crafty collision/pulling, Backbone state, NPC paths, resource costs, shared carrot health and decoy events run from those classes. Included dependencies are the original Underscore, Backbone, Crafty and javascript-astar libraries.

The old online scoreboard, GameJolt, RequireJS bootstrap and legacy splash/scene/HUD are replaced. setup.js supplies the visual components and animation compatibility needed by the original classes; world.js advances the source engine and adds seeded chapters, controls, progression and validated snapshots. game.js renders generated sprite atlases and supplies the UI/audio/feedback.

Direct engine changes: deterministic obstacle restoration; carrot-history FIFO correction; cleanup of the old temporary MagicPush controller. The wrapper additionally clears destroyed carrot references, avoiding stale targets after reload. Existing movement, AI and action classes remain the gameplay foundation.

Original source copies and SHA-256 provenance are retained in upstream/. tools/build-source.py recreates engine/ from them. tools/pack-art.py mechanically encodes the generated PNG assets and metadata; it requires Pillow. Run either script with the game directory as working directory.
