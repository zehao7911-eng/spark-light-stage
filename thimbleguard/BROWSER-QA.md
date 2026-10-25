# Browser QA — Thimbleguard

## Model

25 tests pass. Covers independent bitfield maps; exact directional/transient snapshots; blocked actions; turn-before-step; mover/trap/turner threats; adjacent attacks; guard/ward and one-hit-per-turn cap; seed-chain bounds and stone immunity; path propagation; undo of unbanked rewards; Dash/Pulse locks and charges; one-time crystal reward/heal; save continuation; falling and undo; gift caps and claim idempotence; banked forge price/cap and its separation from turn undo.

All twelve authored rooms solved from base gear with legal actions (11–19 actions each). Two full twelve-room tours claimed gifts and retained progression in simulation. These are rule-engine simulations, not a claim of a24-room browser UI playthrough.

## Actual local browser play

- At390×844, entered first garden, used the real worker hint, clicked a neighbouring enemy and observed one sentry removed and+3 pending coins. Undo restored that sentry and pending coins0; turn2→1.
- Followed visible hint instructions through the remainder of garden1. Reached the gate in12 turns, two stars,21coins pending. Refreshed before claiming: same reward and three offers restored; no premature bank credit.
- Chose Silver Shell. Garden2 started with21banked coins,4/4hearts and1ward. Completed it in13 legal UI actions and claimed Copper Clover.
- Completed garden3 in13 UI actions, saw Dash unlock, and chose Acorn Heart. Garden4 began with5hearts and83banked coins.
- Opened Little Forge, purchased Dash for60: wallet83→23, next price120, purchase then disabled for insufficient funds. Retried the fresh garden:3Dash charges,5/5hearts. Activated Dash upward; playerA6→A4 in one turn, charge3→2.
-320×740 portrait: document305px with scrollbar, no horizontal overflow, board cells46.16px, directional buttons54.2×50px. All action/ability buttons visible within the viewport; field notes below scroll.
-844×390 compact landscape: entire board and controls simultaneously visible. Board266px wide (44px playable cells), bottom352px; abilities bottom349px; no horizontal overflow.
-390px portrait first-garden screenshot visually inspected: cohesive pixel sprites/terrain/background, clear hearts, rose threat borders and visible controls.

Native Pointer Events input and browser responsive viewport overrides were used; no physical handset was available. Public deployment checks and screenshots are recorded in the external delivery log after publication. UI source was recompiled after small final hint-cancellation/storage-fallback safeguards; model tests remain25 passing.
