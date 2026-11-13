# Verification — 2026-10-27

## Model

103 final model checks including public-reference constants. Six natural controller runs (three seeds at each of two world aspects) fed fish, collected earned currency, fought invaders, purchased fish/upgrades/helpers and completed two successive tanks. No injected money, teleports, egg pieces or wins were used in those routes. Two tank transitions complete in about 230 seconds under the controller; this is an automated route, not a claim of normal player completion time.

Exact snapshot equality and deterministic continuation were checked with live fish, food, coins and aliens. Normalized positions survive aspect changes. Invalid/missing numeric fields, excessive arrays, bad states and non-finite saves are rejected. A terminal world freezes. Free starting food, bounds/cooldowns, purchase costs, one-time pets, repeated advance rejection and natural loss were checked. The three helpers and carnivore were also purchased using naturally earned currency and exercised in continued simulation.

## Actual browser play

- Native pointer holds grew both starter fish and collected currency. A Guppy purchase spent $100 from $140 and increased the actual population from two to three.
- Pause statistics showed 40 meals / $140 collected; after reload the same $40 balance and three fish were restored. Further play reached 56 meals, $290 collected, three living fish and one defeated invader; during the initial untuned pass, the real alien was followed as knockback moved it, and its then-$150 bounty was collected. The final reference-aligned pass uses the source $100 first-alien diamond bounty and source growth/coin timings.
- The failure panel was also reached during the first unattended test; retry creates a fresh playable tank. This is not a claim that every historical session completed without a loss.
- 320×568, 390×844 and 844×390 DOM layout checks found no horizontal overflow. Measured primary buttons were at least 44 CSS px high and wide. Screenshots were visually reviewed; the browser viewport override can reset when changing tabs, so combat observations are recorded against the actual measured viewport rather than assumed handset emulation.
- The title-page sound toggle changes its accessible label correctly. Pausing and focus loss stop game simulation and sound. Local saved fish, balance and feeding totals survived reload and resizing.
- Covers are screenshots of the actual title screen; the icon and all in-game sprites use the same generated art set. Alpha and atlas cell bounds were checked.

These are browser-size and native pointer tests, not certification on physical Android or iOS devices. Public deployment checks are recorded separately at delivery.
