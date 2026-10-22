# Validation — 2026-10-22

Native model QA:20 meaningful scenario checks passed. Actual seek/consume, feed cooldown/expiry, planting separation and cap, all five discoveries/one-time award, current decay, pause freeze, exact full-state restore and deterministic continuation. Five additional simulated minutes of steering/feeding checked24finite confined fish and bounded pools. The run consumed384pellets; this is an engine simulation, not a browser play claim.

Actual native browser interactions: a12pellet feed was entirely consumed; Observe selected a tetra and followed it, three user patches grew, current and dusk were triggered, all5discoveries appeared in the journal. The UI is English. Mouse/touch-style clicks/drags and keyboard actions were used; no game-state injection.

Four viewport layouts320×568/390×844/844×390/1280×720 kept all visible controls inside bounds and at least44px. Portrait composition and journal inspected. Pause froze exact model time218.81666666673294s, fish positions and screenshot bytes over1.5s, with0active voices. Reload preserved the exact time/first-fish position, three patches and mute. Camera/tour and pointer-cancel/lifecycle handlers are independent of model state.

Photo mode hid the main UI, camera tour ran, and actual Save produced a valid1280×720PNG of806264bytes, captured from the game's own generated data URL. This validates image generation; the managed browser's OS download destination is not asserted. A keyboard-focus issue on the initial download anchor was repaired with a real href before this final check.

Other repairs: reduced foreground vegetation to expose hardscape, corrected substrate height so soil did not cover the sand, linearized material colours, corrected inset pupils, broader soft fish separation while feeding, consistent paused dusk rendering, and narrow-screen toolbar sizes. Native browser error/warning logs empty. Observed roughly62drawcalls/200–230ktriangles,51geometry resources/13textures; planting does not allocate more geometry. Desktop viewport emulation does not certify physical-phone frame rate.

Public deployment/archive verification is recorded in the local delivery log.
