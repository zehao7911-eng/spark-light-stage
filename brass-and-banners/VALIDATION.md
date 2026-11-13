# Validation — 2026-10-21

- Native Godot4.7.2 import, smoke run and single-thread Web release export passed.
-129 simulation assertions: real first-year win, costs/two-play restriction, adjacency, recruit counts across JSON restoration, mid-battle deterministic outcome, one-time victory reward, year guards, trade/reroll, legacy cost, real rally damage/cooldown, retained permanent growth, malformed saves and bounded actors. Three seeded strategies reached year18, including new unit/building unlocks and bosses.
- Native UI audit:320x480,320x667,390x844,640x360,844x390,1280x720. All base buttons>=44px, in bounds and non-overlapping; TextureRect fits its rectangle. Isometric forward/inverse selection agrees for all9plots. Four scrollable menus, mute, pause and visibility lifecycle checked.
- Actual browser: placed barracks and field and won year1; phone drag placed an archer range, matching-card click upgraded barracks to level2, resulting army12; battle rally activated with real cooldown. Refresh retained board/phase and restored typed recruitment correctly.
- Responsive browser checks are emulation, not physical Android/iOS device certification. WebGL2/WASM required. Further packaging/deployment verification recorded separately.
