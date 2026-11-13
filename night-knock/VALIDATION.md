# Validation

## Automated

- 36,461 gameplay assertions: 25 consecutive perfect shifts; 150 deterministic seeds at each of 11 night levels; variable genuine/impostor counts; all cases have a fair visible face/apartment difference; correct/failure transitions; save restoration; duplicate reward prevention; permanent upgrade costs/effects; malformed state rejection.
- Art loader regression: 16 embedded real-art previews, independent full-image arrival, soft timeout, original late onload still installs full art; failed images retain the matching preview. No blocking all-images loading screen.
- JavaScript syntax checked. The game uses local static files only, no runtime CDN or API dependency. Original JPEG masters and cover files are not fetched by gameplay.

## Native browser

- Actual left/right drags correctly lock/let in. Magnifier opens two enlarged portraits, with apartment labels. Native first-night six-of-six completion produced score 975, base pay 90 and shift bonus 25. Correct streaks visibly increase pay 10,12,14,16,18,20.
- A second fresh first-night completion again passed; the initial development core update invalidated an older test run, so that old state is not used as evidence of restore. After the final deck logic, report reload restored score 975, wallet 230 and four stamps exactly; no duplicate payment. Those cumulative totals include two legitimately completed test shifts.
- Next-night eight-case queue and city-window background were inspected. Intentional wrong admissions reduced integrity 3→2→1→0; failure retained wallet 230, rank/stamps and resident files.
- Reinforced lock bought for 70 and overtime for 60 reduced wallet 230→160→100. A fresh shift started with four integrity. Native Right key earned 12; reload/resume retained score100, wallet112 and four integrity without re-crediting.
- Responsive cases 320×568, 390×844, 568×320 and 844×390 (fractional iframe zoom yields 1px rounding) each completed a native first night. No document overflow or broken images; smallest magnifier target is 44 CSS pixels, other controls46+. Final small portrait and both landscape report panels fit completely, with both action buttons in view and no inner scroll.
- One sourceless MutationObserver error was captured in the iframe test harness. The game contains no MutationObserver code. Public direct-tab console is checked independently in the external delivery record; do not call this harness error a proven game error or claim zero errors from that harness.

No physical handset test, measured frame-rate benchmark, platform grade or S-rating guarantee is claimed. Public Pages deployment, exact-file hashes, immutable ZIP/CRC and real direct-tab play are verified in external delivery records after packaging.

Final framing refinement: the peephole keeps a .76 portrait aspect ratio on short desktop/landscape screens; real visitor art stays proportionate instead of floating in wide black side bars. Gameplay core is unchanged. The static CSS cache key is v2.
