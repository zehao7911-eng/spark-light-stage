# GameWave import

Import RIG-RUSH.zip with index.html at archive root. index.html and standalone.html are identical self-contained entries. Keep the default browser startup: GameWave may inject window.neonlib asynchronously; no remote SDK script is required by this package.

The game-specific bridge saves only `{game:'rig-rush',v:1,profile:...}`. Local key: rig-rush.profile.v1. A newer recognized cloud profile can restore progress while idle; active build/training/expedition progress is not overwritten. One-time cosmetic flags merge monotonically. Unknown cloud payloads are not overwritten.

Actual rounds: a committed component roll starts a round and keeping/equipping its result ends it; physically entering the treadmill starts and stepping off/pausing ends it; entering an expedition starts and finishing or leaving ends it. Assembly Best emits a committed assembly round. Restored progress starts on the next real action. Viewing a menu does not start a round.

Confirmed positive onLike events unlock a gold title glow. Confirmed direct onComment events unlock aurora stat borders. Unlike events do not reward. Async registration must return code 0; callbacks require a string project_id. Duplicate rewards are guarded by saved booleans. Optional reward instructions appear in Help only when their registration is supported. These cosmetic rewards are not required for gameplay. Local-only deduplication is browser/device scoped; cross-device behavior depends on actual successful host save/load.

Official document was rechecked on 2026-11-15 but was inaccessible in this environment. Implementation follows the workspace's previously recorded SDK contract. Mock tests are not proof of a successful platform import. The importer must verify current host requirements, actual lifecycle calls, save/load, likes, direct comments and portrait controls in the supported GameWave App before marking host validation complete.
