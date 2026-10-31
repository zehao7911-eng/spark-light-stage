# Release checks

## Model

`node test-core.cjs` passes **2,739 assertions**. The tests cover every campaign service, a fully completed remixed buffet, long-run bounded stock generation, food conservation, served counters, matching-bowl reservations, assisted paths around solid props, the one-tap opening, eight-food Big Serve delivery without duplication, recoverable sneeze spills, protection windows, malformed-save rejection, exact movement / queued-flight restoration and deterministic continuation.

The scripted model uses the same aim and fixed-tick input APIs as the game. It does not advance progress by editing served counters. Special unit setups isolate flight and collision behavior.

## Actual interface

- All nine services were completed through real snack and bowl controls while iterating the game. The native run earned **24 / 27 stars** and all nine dishes. All four trim choices became available through earned progress.
- The opening's first service reward was observed after **2,225 ms** from its bowl action in the local browser. Final public-entry smoke testing is performed separately after publication.
- A paused four-snack train survived refresh with exactly matching DOM food positions, modes, score, clock and carried count.
- Actual BIG SERVE actions completed mixed-bowl cascades; later bowls remained reachable through rolling-pin and cup layouts.
- Recoverable pepper spills were played through. Guided taps were refined to anticipate pepper crossings. Fresh spicy tables have opening protection; fresh and restarted tables wait for player input.
- One complete Endless Buffet wave scored 340. The next wave began at 340; after earning 400, restarting that table restored 340, kept the campaign collection, and waited for input again.
- Gentle motion and the earned lilac trim persisted through refresh. Modal focus was checked after switching from the completion card to the book.
- Real pointer dragging was exercised. Portrait layouts at **320 × 568** and **390 × 844**, and landscape at **844 × 390**, were inspected. The page fitted without horizontal or vertical overflow; displayed game buttons were at least 44 CSS pixels in each dimension.
- The final local console inspection returned no warnings or errors.

## Delivery / limits

The runtime has no CDN dependency. The eight WebP art assets total 1,229,448 bytes; the cover is lazy-loaded. The model advances at a fixed 60 Hz; ordinary rendering is capped at 40 fps / DPR 1.5, or 30 fps / DPR 1 in Gentle mode. Trails, snack bodies, peppers, effects and audio voices are bounded. Backgrounding pauses the game. Embedded-browser fallbacks cover rounded canvas paths, resize observation, modal display and viewport-height sizing.

Browser viewport checks are not physical handset certification or a claimed measured device frame rate. Haptics depend on the browser/device. The original reference game was inspected for art direction; its original assets and code are not bundled. Original PNGs and the visual reference screenshot are outside this root-index game ZIP. Final GitHub publication and downloaded ZIP integrity are verified against frozen release files in separate delivery reports.
