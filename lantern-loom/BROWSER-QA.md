# Verification record

24 October 2026. This is browser viewport testing, not a claim of physical iPhone or Android hardware testing.

## Actual browser interactions

- Cold start, original greenhouse illustration and English onboarding loaded; no external runtime requests required.
- GUIDE then LET IT FLOW physically delivered all four spirits, rang three bells per spirit, awarded 58 pollen and opened a three-way gift draft.
- Chose Twin Lights, advanced to chamber two, reloaded and verified the gift and 58 pollen persisted.
- At a 390 by 844 viewport, two native pointer drags drew the mirrored bridges. Available thread changed 285 to 119 to 14. Released the spirits: the manually drawn route cleared chamber two and earned 61 pollen.
- Reloaded the unclaimed reward: the same three choices and 61-pollen chamber summary remained. Chose Golden Thread and reached chamber three with 320 thread.
- Bought the permanent Silk Spool: wallet 119 to 79, tool level 0 to 1, next price 160, available thread 345. Reload preserved that growth.
- At 320 by 740, document width was 305 within the 320 viewport. Four control targets were 53.4, 53.4, 106.8 and 53.4 pixels wide, all 54 pixels high.
- Landscape tested at 844 by 390; the illustration retains its aspect ratio and controls have 44-pixel heights. Final measurement: controls span y=332 to y=376 within the 390-pixel viewport; the canvas retains its 2:3 aspect ratio. The narrow portrait layout is the primary drawing experience.
- Console warning/error observations were empty during the local playthrough.

## Deterministic physics and progression checks

`node test-engine.cjs` passed 240 chamber clears across eight builds and thirty rounds per build, with 1,352 physical deliveries. Alternating 60 and 30 Hz callers, finite completion, wind, moving bells, capped tools and all three themes were exercised.

Separate assertions cover adapted bridge geometry, duplicate bus subscriptions and unsubscribe, invalid strokes, undo bodies, absence of fake delivery rewards, no repeated clear payout, persisted pending reward, bounded invalid save input, permanent tool prices/caps, extra spirits, extra thread and cooldown-limited flower pulses.

## Scope

Three themes, six mirrored route recipes, twelve collectible flowers, six finite gift families and three four-level permanent tools. Routes repeat; later chambers do not claim unlimited unique authored content. Reloading an active release returns to planning. Browser storage restrictions can prevent saving. Image loading has an 45-second bounded error and retry path.

Public first-load verification detected an overly short 18-second illustration timeout on the current network. The final build preloads that illustration at high priority and keeps a still-active request alive for up to 45 seconds, with a neutral progress notice after 12 seconds and a bounded retry state. The background remains lossless; no artwork was degraded to hide this network behavior.
