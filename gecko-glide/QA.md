# QA — 2026-10-26

- All eight chapters cleared with a deterministic search controller feeding only hold/release actions into the real model. Height goals, terminal immutability, branch/health/extension bounds, exact snapshots and deterministic midrun continuation checked. Invalid anchor references rejected; full uint32 RNG states accepted. Idle player loses to mist; holding into late-stage thorns loses; release retracts.
- Actual browser native touchscreen input completed climbs1 and2, including true next-climb unlock and six stars. Replaying climb1 did not increase total stars. Selected an actually earned color from the garden. Actual native touch input also completed climb7 selected via a QA entry point, using read-only model observations for planning, not injecting positions/scores/wins.
- Native late-stage held input caused three thorn hits and the failure panel; Retry restored three hearts and active play.
- Exact paused model and settled screenshots remain unchanged; all audio voices stopped. Refresh restored the exact active snapshot with input released, including score, RNG and geometry. Title-screen save preserves the loaded active run.
- Cold file:// in a browser with localStorage denied remained playable and won the first climb using keyboard. Zero HTTP dependencies. Actual native touchCancel released and retracted the vine.
- 320x568,390x844 and844x390 play and garden layouts checked. All visible buttons at least44px and in bounds. DPR3 is capped to1.5. No page errors in native browser runs.
- Corrected random layouts that could create unreachable safe branches; every safe lane step now has a reachable successor. Red thorns add obstacles without replacing those required grips.
- Rendering stops during pause (apart from a dirty redraw for layout or visual changes). Reduced-motion setting removes shaking/pose rotation. Effects and sound voices are bounded.

Limits: no physical-device FPS or speaker testing; eight seeded chapters are not eight unique rulesets or an endless campaign. Illustration is original SVG/vector art, not identical to the video references. Fun/quality are subjective and no platform S rating is asserted.

