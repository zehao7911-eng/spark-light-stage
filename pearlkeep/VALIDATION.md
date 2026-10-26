# Validation

- Actual source-engine tests: 90 complete legal routes across campaign levels and seeded expeditions, five seeds each; every route finishes with all pearl sets and three stars.
- During each tested action, a new Session restores a serialized mid-rotation or mid-flight snapshot, then both actual engines continue with equal snapshots. No injected win state.
- Direction/occupied-path guards, busy-action rejection, finite completion, terminal freeze, repeat-award idempotence, undo, guided clear, malformed snapshot guards and capped profile stars are covered.
- A valid reverse scramble is loop-reduced before it is offered as the optional guide. It is not a shortest-path claim.
- Browser local native/semantic controls: opening puzzle one-tap clear / 500 points / three stars; second puzzle actual transfer/rotations, then pause and refresh restored progress; final guided second clear in 12 turns / 1100 points / two stars. Guide explicitly trades the no-guide star.
- Actual paused screenshots compared byte-identical. Console errors/warnings empty during local play.
- Browser viewport checks: 320×568, 390×844 and 844×390. No horizontal/vertical page overflow in play, visible controls at least 44×44. Responsive cover and gameplay sprite edges visually inspected. Actual physical handset performance is not certified.
- Fixed model ticks and bounded particles/collection flights/audio voices. Pause/background handlers stop gameplay and suspend sound. No CDN or analytics in the entry/runtime.
- Public deployment and archive integrity are checked separately before delivery. This document records test scope, not a guarantee of commercial-game equivalence or universal phone compatibility.
