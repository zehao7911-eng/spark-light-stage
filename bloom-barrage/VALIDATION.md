# Validation

## Automated

57,826 meaningful core assertions cover a complete nine-garden campaign, continuing Wild Gardens, 400 seeded wins across levels1/3/6/9/14, fair connected-group availability, kill/escape/spawn conservation, all five attack effects, exact restore states except transient cosmetic event queues, permanent upgrades, idempotent income, failure, bad inputs and corrupted/poisoned saves. ZIP extraction reruns the same tests. Source syntax is checked.

Art-loader tests cover14 full images, embedded reference previews, independent image arrival, soft timeouts and full images that arrive after that timeout. No blocking wait-for-everything screen is used. Runtime WebPs are local; masters and cover are not fetched by gameplay.

## Native browser

- Nine gardens actually cleared with normal accessible button clicks and largest visible-patch choices. Pop counts:4,8,16,8,13,15,12,12,24. Scores710,1170,1800,1585,1785,2670,2385,2460,3155. Actual total25/27 stars. Final Garden9 clean fence but24pops exceeded22-budget, so two stars, as indicated on its result.
- Initial five-green-patch click killed three enemies across all lanes (score375/sun3/turn1). Partial reload restored that exact visible board/progress. Boss result reload retained86sun without re-crediting.
- Power upgrade55sun (86→31), barrage upgrade100 (112→12), fence upgrade45 (117→72), all bought through real menus. Following rounds applied them. Wild Garden10 started with four hearts and197sun. Invalid singleton tap left TURN0; H hint found a legal patch; a native pop reached3/24, score375,200sun,TURN1.
- Native shuffle changed the patch while Garden4 remained0/14,TURN0,three hearts, with two shuffles left. Hint highlighted the six-plant group. No hidden-state injection or direct gameplay function calls were used for browser testing.
- 320×568,390×844,568×320,844×390 checked (fractional iframe zoom rounds one dimension by1px). All four native first-garden clears completed. No document overflow/broken images; all tiles were at least47CSSpx in these layouts, other controls44+CSSpx. Each final result panel fits without inner scrolling, including the small landscape and close button. Portrait desktop is capped at420px so the battle stays readable beside the large seed patch.
- Stable paused screenshot pair SHA25601359cf5511cfcddeea4012af98568e71aba3b255769380554cb53b92beffcba, identical after compositor warm-up. Canvas/gameplay and CSS hint animations pause; audio context and music timer suspend. No subjective listening-quality claim is made.
- A sourceless MutationObserver error was recorded in the local iframe harness. No game module uses MutationObserver. Direct-public console is checked separately after deployment; this error is not silently called a proven game fault or a pristine local console.

No physical handset test, measured frame-rate guarantee, exact commercial-game equivalence or platform S-grade is claimed. Canvas drawing targets about30Hz with DPR capped1.75; actual handset performance remains device-dependent. Public Pages, exact served bytes, immutable ZIP/CRC and native public play are recorded outside this frozen package after publishing.
