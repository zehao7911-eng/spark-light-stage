# LIFT CLUB

Small reps. Ridiculous weights. An original, mobile-first, English HTML5 lifting game.

## Play

Slide up anywhere on the arena to raise the weight; slide down to lower it. Reach the upper marker, then bring the load all the way down to earn one rep. Large LIFT / SET DOWN buttons provide the same actions without dragging. Keyboard: Up, Down, or Space for the next step; Escape pauses.

Six short meets introduce plates, paint drums, bass cabinets, vending machines, jet engines and monster trucks. Three venues are a garage gym, a coastal training ground and a stadium final. There is no countdown failure or payment. Short lifts are not reps; they only affect the optional mastery star. Clean reps increase the streak and the earned coins.

The first star is for finishing, the second for at least 60% clean reps, and the third for all clean reps without a short lift. Stars keep the best result. Coins are paid once for each completed workout, so free replays intentionally earn more coins. Reloading the same receipt does not pay again. Earned coins buy three ranks of Muscle and Control; six and twelve stars unlock Mint and Plum outfits. Muscle affects lift speed and the actual athlete proportions. Control changes damping, lowering speed and the clean landing threshold. Encore repeats these six authored meets at three capped heavier tiers; it is not an unlimited set of new authored levels.

## Run locally

Serve this directory over HTTP, for example:

```
python -m http.server 8000
```

Then open `http://localhost:8000/`. Direct `file://` opening is not supported because the game uses ES modules. All runtime files are included locally. There are no CDN scripts, web fonts, account requirements, trackers or remote model downloads. The cover is an actual runtime screenshot and the icon is original SVG; no image generation was used.

## Technical design

- A small deterministic state machine owns full-range rep detection, smooth landings, upgrades and rewards. Input events flush elapsed simulation independently from the render limiter, avoiding input-induced render starvation.
- Fixed 100 Hz substeps with a 0.5 second catch-up bound; background/blur/cancel releases input and pauses gameplay. The target-height spring is a deliberately stylized load model, not a full human biomechanical or rigidbody simulator.
- Original articulated human uses two-link arm and leg solutions, constant segment lengths, measured shoe contact and explicit bar-grip coordinates. Engine fans and truck wheels animate separately from the batched load cases. Bounded instanced chalk/confetti, landing ring, expressions and jumping spectators give each rep visible feedback.
- Full: DPR at most 1.5, up to 45 presentation frames per second and 1024 shadow map. Light: DPR 1, up to 30 presentation frames and no real-time shadow. Contact patches remain visible in Light. These are configured limits, not physical handset performance measurements.
- Local progress, outfit, options, active height, step and reps save in this browser. A restored run waits for new input; no delayed motion continues from an abandoned drag.
- Optional, method-guarded GameWave bridge has genuine callback-only cosmetic rewards, lifecycle deduplication, late listener cleanup and conservative cloud read/write guards. It never gates normal boot.

## Reference and licensing

Growth-loop reference: Rezona **Zero2hero**, public preview:
https://rezona.ai/game/pgcserver/pv/SfqGKqkS/v1/dist/index.html

The reference's Learn to Walk purchase, short-run attempt and return-to-upgrade flow were inspected. Its keyboard platforming was independently replaced with up/down lifting, new rules, original athlete, load models, environments, graphic design and audio. No reference source, image, model, music or other media is redistributed, and this is not a one-to-one recreation or the reference's full campaign.

Original files and reused original geometry/SDK helpers: MIT; see LICENSE.txt. Three.js r147: MIT; its upstream notice is included in vendor/THREE-LICENSE.txt.

## Verification

```
node tools/test.mjs
node tools/model-test.cjs
```

The controller suite checks 96 complete meet / upgrade / assist / Encore routes, save/receipt/partial-restoration invariants, short lifts, terminal states and mocked SDK behavior. The actual Three.js geometry suite checks segment lengths, mesh-end contacts, bar grips, the measured floor/sole heights and bounded models across all loads/outfits/upgrades/poses. Browser QA includes actual native click and drag inputs, earned upgrades/outfits, portrait/landscape layouts, saved restoration and public-page play. Automated tests are not a quality rating. A physical phone and the real GameWave app still need device/host testing.
