# Validation — 2026-10-15

- Godot 4.7.2 native import and Web release export.
- 22 simulation assertions: real coin and sword collision, variable-height jump, gated double jump, rush speed/cooldown, upgrade pricing, real bow projectile hit, JSON save continuity, malformed save rejection, pause, four-hour away cap, ascension retention/reset and permanent multipliers.
- Four-minute fixed-step simulation: 1,038 coins, 132 defeats and 13 portals. Bounded entity/projectile counts checked.
- Native interface audit at 320x480, 320x667, 390x844, 640x360, 844x390 and 1280x720: no overlapping or off-screen base controls, minimum 44px targets, all nine modal screens constructed, menu pause and mute verified.
- Real browser checks: opening run, held jump, equipment purchase, soul skill menu. Further responsive and deployed checks recorded in the delivery verification log.
- Browser emulation is not a physical iOS/Android hardware test. WebGL2 / WebAssembly are required. This is a compact original interpretation, not a feature-for-feature commercial port.
