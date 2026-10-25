# Validation — 2026-10-25
- Run `node tests.mjs` to reproduce 49 rule assertions, including a complete 12-batch campaign with a rule-driven test player.
- Verifies seam connectivity, diagonal rejection, first clear/scoring, collapse chain, burst cost/empty-burst safety, three-spill loss, deterministic state continuation, malformed-save rejection, bounded stacks and earned stars.
- Actual browser controls tested: rotate buttons, quick drop, keyboard left/Space, sound toggle, pause, continue, collection shelf.
- Actual browser first two batches completed and stored 6 stars. A third batch continued after reload with exactly the same displayed 6/24 nectar and 180 score.
- Stable paused screenshot compared after the compositor had settled: identical pixels across a 1.2 second interval. Initial comparison sampled before the pause panel paint; this was a screenshot-timing issue, not a moving simulation.
- 390x844 and 320x568 portrait; 844x390 landscape layouts inspected. Compact collection shelf height and minimum header touch targets corrected during QA. No JavaScript errors/warnings observed.
- These are browser viewport/input tests, not a claim of testing a physical phone.
