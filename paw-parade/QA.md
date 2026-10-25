# Validation

- All 12 puzzles solved through actual mobile touch events, 36 stars earned. Won-state reload retained the result without awarding duplicate stars. Hint, undo and next-lineup behavior checked.
- Independent breadth-first search confirmed minimum swap counts on levels 1–7; all 12 solver paths reached the expected goal, stars, terminal lock and restored state.
- Music enable/mute, exact paused raw canvas and scene clock, stopped audio and paused reload checked.
- All five formations, three dance modes, three palettes, 24-cat free rave, floor/beams toggles and native touch camera orbit checked with no JavaScript errors.
- Visible buttons were at least 44px and within 320×568, 390×844, 844×390 and 1280×720 layouts. Final 12-seat lineup checked separately at 320×568 and 844×390.
- Cold local-file opening without permissive file flags: blocked localStorage, DPR 3 capped at 1.5, no HTTP requests, native touch first-lineup completion, exact paused pixels, real WebGL context loss and Retry all passed.
- Close model preview rendered at 24 animation times. Final drawing cost in tests was about 94 calls for four cats, 134 for twelve and 160 for twenty-four, around 150k submitted triangles at the maximum count. These are browser measurements, not a certified physical-phone FPS test.
