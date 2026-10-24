# Validation

- Pure engine: 12 seeded five-room campaigns, every field completed, nova and clump cracking, four legal ability choices, permanent purchases, win state without duplicate payout, deterministic restored continuation with a maximum build, malformed-save fallback.
- Browser: actual mobile touch events completed five fields, purchased permanent suction, selected upgrades, won-state reload preserved the one run credit, fresh run reset the build and retained coins/suction. Pause froze game state, raw canvas pixels and audio; mid-room reload resumed the same stopped state. Mute persisted. No JavaScript errors.
- Viewports: 320×568, 390×844, 844×390, 1280×720 gameplay controls; 320×568 and 844×390 upgrade cards. Visible button bounds stayed in the viewport and at least 44 pixels.
- Offline: no HTTP requests, storage getter deliberately blocked, DPR 3 capped at 1.5, native touch drag/move/cancel stopped movement, first field completed, upgrade selection, keyboard input. No JavaScript errors.
- Physical handset and actual device FPS were not measured. No offline income or combat system is advertised.
