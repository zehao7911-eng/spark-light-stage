# Validation — 2026-11-04

## Deterministic checks

- 54 complete controller routes: all nine bouts, Comfort on/off, and three upgrade configurations including no upgrades. Every route won without hull damage using timed guard/release input. These are controller tests, not simulated browser testimonials.
- Idle does not advance the first bout. Holding forever overheats and loses; rapid press/release before the enemy hits does not damage it. Cancelled release does not counter. Counter damage occurs after the strike reaches its contact phase, rather than at press time.
- Best-only medal income, replay idempotency, purchase costs/budget enforcement, cloud-profile merges and unlocked appearance restrictions checked.
- 328 articulated poses check upper/lower arm and leg lengths. Both enemy fists reach the guard contact positions at their hit event; ankles/soles use a fixed ground baseline. The first-person player forearms are explicitly mechanical telescopes.
- 21 bounded optional-host mock checks: absent/throwing/slow hosts, validation, timeout and replacement handling, reward deduplication, saves and lifecycle behaviour. This is not live platform-host certification.

## Native browser play

- Played bouts one to eight using normal native held-pointer presses and releases. The seventh earned two stars after timing misses. The eighth retry earned three. Completed the final bout with normal held Space/release input: 8 counters, 8 perfect, 21 blocks, no hull loss, score 1988. No game-state, local-storage, unlock or win injection was used.
- Earned card showed all 9 bouts cleared. Bought one rank in each upgrade family with earned bolts: wallet 88 to 76. Equipped the earned gold glove colour. The active campaign remained saved through a browser restart.
- Tested tap-toggle guard and a second-tap counter; a normal hit registered. Paused and reloaded an active stagger: hull, rival damage, phase time, heat, counters, score and tap setting remained identical. Held input is intentionally neutralized on restoration.
- Native first-bout interaction visibly produced a successful block and perfect counter within the opening few seconds; the rival lost 2 hull and displayed cracks, sparks and recoil. Subsequent damage and KO were observed through normal play.
- Actual 320×568, 390×844, 568×320 and 844×390 browser viewports: no document overflow; main controls have minimum 44×44 CSS pixels. Portrait and landscape artwork inspected. Tested sound/settings toggles and optional tap controls. Runtime console returned no warnings/errors at the final local inspection.
- `cover.png` is an actual runtime screenshot, not a concept render.

## Performance and limits

Canvas 2D with one cached background per scene/size, a 96-particle cap, audio voice cap, DPR 1 default or at most 1.5 in full mode. Default rendering targets 30fps, full mode 45fps. Input flushes simulation time separately from presentation time; bounded catch-up prevents a delayed frame from causing an unbounded loop. Pause/hidden state stops active effects and audio.

Phone-sized browser layouts and native controls were tested on the development computer. This is not a physical Android/iPhone device benchmark or a guarantee that every handset sustains a particular FPS. Synthesized audio was wired and exercised by play, but no separate acoustic listening or live host certification is claimed. Game content is a finite nine-bout campaign, with six distinct rivals and three rematches.

Package CRC, extracted source/tests, standalone equality, inline JavaScript syntax, public deployment and immutable ZIP download are verified separately in delivery reports outside the ZIP after packaging.
