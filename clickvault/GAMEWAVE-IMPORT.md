# GameWave integration — CLICKVAULT

Upload the ZIP with `index.html` at its root. All production entries contain the individually wired SDK adapter and real game logic. The standalone build starts even if `window.neonlib` never arrives. It has no CDN, SDK download, service worker, startup retry loop or cross-origin asset requirement.

Official reference rechecked November 5, 2026: [GameWave SDK document](https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh), still displaying an October 30 modification date.

## Game-specific wiring

An accepted ring turn starts a host round. Hints, opening a menu, visiting the gallery, viewing a result and winding a collected toy do not create rounds. Actual completed opening calls `gameOver` once. An abandoned active visit ends before its replacement begins. A restored between-turn visit waits for its next accepted turn before reporting start; merely closing pause does not start it. Explicitly resuming an already committed turning/opening animation resumes that round and can finish it normally.

Own cloud envelope: `{game:'clickvault',v:1,profile:...}`. Best medals merge by maximum, fewest-turn records by minimum, cosmetic flags by union. Local preferences and active-lock ownership are preserved. Unknown or other-game cloud records are not overwritten. Only this game's profile is submitted; localStorage is never enumerated, uploaded in bulk or cleared. Logical host viewport dimensions are validated separately from density, with local CSS fallback for absent, invalid or stale rotation metrics.

## Optional social cosmetics

Successful supported `onLike` and `onComment` registration is independent of play. A direct positive like unlocks a visible gold cabinet seal. A direct comment, including an image-only comment with empty text, unlocks coloured spark celebrations. Unlike does not reward. Direct callback fields are used, IDs remain strings, and count snapshots are not identifiers. Claimed flags persist and duplicate notifications do not grant another reward. A host-supported pause note explains these optional cosmetics; unsupported prompts are hidden. No button fabricates an App interaction or opens an undocumented host screen.

Registrations, errors, timeouts, late completion, replacement and disposal are guarded. Owned unsubscribe functions are retained and called; a late successful registration after disposal is immediately unsubscribed. The adapter can discover very late SDK injection through actual input/focus as well as bounded startup probes. Cloud failures do not block local play.

Claims are deduplicated within the available local/profile-cloud save scope. No server-verified cross-device exactly-once guarantee is asserted.

## Evidence status

| Evidence | Status |
|---|---|
| Official document reviewed; per-game lifecycle and save merge wired | Complete |
| Absent/partial/late APIs, async errors, callback validation and cleanup mocks | Passed; 24 checks |
| Actual controller completion, undo, replay and partial/between-turn reload | Passed locally |
| Local browser SDK simulator, real game inputs, social claim guards and disposal | Passed; this is a mock host |
| Published served entries and pinned root-index ZIP | Verified separately in delivery reports |
| Import, callbacks, cloud identity and viewport inside the real GameWave App | Not tested; requires a supported App/host session |

This delivery does not certify or migrate every older game. Legacy inventories remain evidence with their individual pending statuses. No other game's save, artwork or progression is changed.
