# Source and license

Upstream: [Orbium by Björn Nilsson](https://github.com/bni/orbium), revision d49c4a419cde755990c4f2e8921ceb506e7a1fcf. Code license: GNU GPL version 2. The full GPL text is LICENSE.txt. Original JavaScript files and README are included in upstream/; SHA-256 values appear in source-manifest.json.

Actual running reuse: the full original Util, Sprite, Tile, Dockee, Marble and Rotator classes are adapted in source-engine.js and the readable engine/ copies. Pearl movement and directional bounce, docking windows/occupied slots, direction-to-local-slot mapping, launch behavior, quarter-turn stages, same-color completion checks and collection timings execute through those classes. State hooks preserve in-flight animation and exact coordinates. Machine's completion/controller logic is replaced by the new finite puzzle controller in model.js; original Machine and the rest of its source remain in upstream/ for provenance, not loaded at startup.

New work: legally reversible puzzle generation with loop-erased solution routes, authored introductory puzzle, local progression/undo/guide/save logic, responsive accessible controls, original generated art, Canvas presentation, cover/icon integration and original synthesized sound. This is a new adaptation, not an unmodified full Orbium port or a Steam game recreation.

The upstream README separately licenses its graphics CC BY-NC 3.0. None of those graphics, fonts or sounds are included or referenced by the runtime. Only its GPL code is reused. Original source files containing old loader/network/menu references are source snapshots, never executed by Pearlkeep's entry point.

All game code and corresponding source modifications in this distribution are provided under GPL-2.0. Original generated art is supplied as part of this project's distribution; it does not contain upstream artwork. Preserve LICENSE.txt and this attribution when distributing adaptations.
