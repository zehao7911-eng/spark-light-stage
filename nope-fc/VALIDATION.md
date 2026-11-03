# Validation — 2026-11-03

Scope: original Canvas2D perspective game. No generated imagery, reference assets or commercial code. A published game and package are checked separately from game quality; the checks do not guarantee enjoyment or a platform grade.

## Meaningful model checks

`node tests.mjs`: 208 checks. Fifty-four controller runs complete all six cups with three kits and three Encore variants, actually moving gloves to the contact plane. Six loss runs, off-centre collision versus centre catch, changed Trainer reach, idle start, exact intermediate restoration, corrupt state handling, best-only progression and reward deduplication are exercised. SDK checks simulate no / partial / late / unsupported / timeout SDK, nonzero registration, unload-before-success cleanup, callbacks versus registration, unlike, image-only comment, duplicate reward/reload flags, direct cloud load, full-state saving, and hanging load independent of listener registration.

## Real browser interaction

- All six cups completed with actual pointer input: 5/5, 6/6, 6/6, 7/7, 7/7, 8/8 saves, all centred; 18/18 best stamps. Points: 1250, 1575, 1575, 1900, 1900, 2225. Cups 1–2 Match; 3–4 Trainer; 5–6 Focus. Cup 4 completed in 844×390 landscape. Later changes were small save hardening, badge bounds, book copy and head/glove cosmetic details; the final first cup is replayed publicly after deployment.
- Actual under-quota result and free rematch observed, retaining best records. No limited lives. Final receipt text survives reload (whitespace-normalized).
- Actual direct drag moves hands; halfway Encore windup reload preserves phase/time, position and score, paused. Encore 1 start observed; no full native Encore campaign claim.
- Sound off / Gentle on survive reload. Pause and book stop the simulation; no microphone, external social posting, App login or payments are used. Audio is synthesized; no audio audition is claimed.
- 320×568, 390×844, 568×320, 844×390 and 1280×720 layouts checked. Main button targets at least 44px; a rotated small landscape badge was straightened after bounds inspection. No horizontal page overflow in measured layouts. This is browser viewport emulation with pointer input, not a physical iOS/Android handset test or measured handset FPS.

## SDK and delivery limitations

The official SDK doc was re-opened and showed the same October30 modification. Adapter simulations do not verify real GameWave App injection, user identity/storage or social events. App reward UI is honestly labelled; ordinary browsers run the complete game without the SDK. Real host import and event delivery still need App testing. Best/progression/reward flags merge monotonically; no server atomic reward guarantee.

ZIP has root index.html and local source/icon/cover/notice. Inline runtime needs no CDN, modules, engine download or WASM. A separate manifest outside this game folder records served-file and pinned-ZIP verification after publication.
