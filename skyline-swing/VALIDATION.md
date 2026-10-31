# Validation

## Automated logical checks

`node tools/test.mjs` passes 1,004 assertions. The tests include all nine initial goals, three environment gravities, all three upgrade families, ordinary unboosted / early-boost / low-altitude-boost flight endings, exact logical mid-flight serialization and continuation, safe charge cancellation, no idle progress, finite fixed deltas, malformed save handling, upgrade limits and prices, best-only stars and idempotent shot income. The same tests run after extracting the release ZIP.

The all-perfect controller demonstrates reachable goals; it is not a human fun test or a statement that every casual shot wins. Three early kicks give smaller assistance; a missed goal has no life cost and still pays some distance income.

## Actual local browser play

All nine destinations were completed through native hold/release and ordinary visible boost-button clicks. The first unassisted sweet swing reached 184m, two stars and 34 coins. Destination two used three actual golden boosts, reached 772m and paid 94 coins. Drive, Spring and Sweet Spot were bought normally for 35, 45 and 30 coins, leaving 18. A deliberately immediate keyboard release on destination three produced a real 109m failure, eight coins and a working retry. The retry reached 990m.

Remaining city results were 1,193m, 1,198m and 1,193m; polar results were 1,331m, 1,328m and 1,327m. The nine-stage tour unlocked Sky Tour 1, which was actually won at 989m. Replaying the first destination at 320×568 brought the passport to 27/27 stars; a second replay at 568×320 completed at 991m. Income is intentionally earned on each new shot; refreshing the same settled result did not grant it twice.

An actual city flight was paused at 15m and refreshed: it restored paused at 15m with its three kicks, then resumed and completed. Sound OFF and Gentle Effects ON persisted across refresh. Stable paused captures were byte-identical (SHA256 `8b98321545dc35f25832ddd1b9feae666bb58c2ccbdad1e6670f543073e4cd12`). The final local warning/error log was empty.

## Layout and art review

Browser viewports checked: 320×568, 390×844, 568×320 and 844×390. The primary controls measure at least 44 CSS pixels in these observations. Actual play at 320×568 and 568×320 completed with readable results; the compact portrait and compact landscape result cards fit without internal scrolling. Separate landscape pause-menu and ready-state bounds were checked. An initial compositor screenshot immediately after resize was stale; stable DOM bounds and subsequent captures were checked. This was not treated as a passing screenshot.

Actual coast, city and polar game scenes were visually reviewed. A dark-on-dark polar HUD was found and corrected. Golden-bounce meter geometry was aligned with its actual model threshold. Small-screen result overflow was corrected and retested. Clubhouse signs and polar roof snow match their environment. Art remains original stylized 2D Canvas illustration with articulated golfer poses, not a commercial asset recreation or a fully animated 3D character.

Rendering and DOM updates are bounded to 40Hz scheduling (actual browser cadence can be lower); physics uses a fixed 120Hz logical step. DPR, effects, trails, voices and background caches are bounded. Network-free gameplay has no external library or asset loading gate. No physical Android/iPhone was available for testing, and measured handset frame rate, platform grade, commercial art equivalence and subjective enjoyment are not guaranteed.

## Publication gate

The publisher adds only this game's folder and game-only ZIP to the existing GitHub repository using a fast-forward object-tree commit. Public files, deployed game controls, normal result/reload behavior and the immutable ZIP are checked before sharing delivery links. Deployment results are recorded in the workspace delivery JSON, outside this static package.
