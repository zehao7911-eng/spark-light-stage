# Validation — transparent animation revision

- All 12 lineups completed with actual browser touch events, all 36 stars. Win reload preserved the result without duplicate rewards; hint, undo, stage settings and camera drag passed.
- Original motion now plays as 24 keyed alpha frames in camera-facing planes. Sync and phase-offset playback share one texture; the 24-cat case submitted about 19,720 triangles / 139 calls versus the retired model's approximately 150k triangles.
- Cold local-file test without permissive file flags: no HTTP requests, blocked localStorage, DPR 3 capped at 1.5, touch completion, exact paused canvas pixels, real WebGL context loss and Retry passed.
- Gameplay buttons checked at 320×568,390×844,844×390,1280×720; final 12-seat layout separately checked at 320×568 and 844×390 with 44px minimum targets.
- Twenty-four close dance previews rendered. Green-edge, frame and GIF timing checks are recorded with the build. No claim of physical-phone FPS.
- Video audio update: real MP3 decoding and 14-second playback, pause/resume, mute, tempo rate and actual loop wrap verified with no media errors. Offline test also passed with embedded audio data.
