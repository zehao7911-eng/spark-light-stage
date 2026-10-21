# Validation

- Godot 4.7.2 Compatibility single-thread Web release export succeeds.
- Native QA: 168 checks, zero failures. Covers six flowers, smooth opening, burst expiry, four seasons, pause, malformed saves, JSON restoration, 44px targets and non-overlap at 320x480, 390x844, 844x390, 640x360, 1280x720; short-screen menu, cinema exit, hidden-tab and menu freezing.
- Actual local WebGL browser: rendered original 3D scene, flower touch increments wake counter, Bloom opens flowers, Rain changes weather, Night changes palette, phone framing inspected at 390x844. Browser reported 45fps on this desktop environment; this is not a phone hardware benchmark.
- Photo produces a PNG from the actual 3D render viewport, excluding native UI. Public deployment and final PNG metadata are recorded in the delivery log outside the ZIP.
- Independent fresh-source import, native QA, and re-export are checked before publication.

This is an interactive art miniature, not a full commercial game or a reproduction of the reference content.
