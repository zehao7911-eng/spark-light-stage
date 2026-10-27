# BONNET BAY
Original one-finger seaside collection toy. Tap a hat to swoop, collect up to three, then deliver to the boat. Full towers fly home automatically. Six bays have different landmarks and moving wind columns. Golden finds and avoiding wind bumps award extra stars. Banked hat types fill the permanent collection; best scores and partial flights save locally.

## Run
Serve this folder over HTTP(S), e.g. `python -m http.server 8000`. Open index.html. No build, external CDN, account, purchase or backend. WebGL required. Touch, mouse, and keyboard: 1–0 select stands, H returns to boat, Space picks the next available hat, Escape pauses. Audio starts after input; mute control provided.

## Art and reference
Original procedural Three.js gull, six hats, harbor props, sea, lights and landmarks. Matching original vector icon. cover.jpg is an actual gameplay capture, not a promise of different rendering. Rezona Pigeon Panic: Urban Menace was observed and briefly played as a reference for airborne bird movement; this game's hat-stacking/delivery loop, visuals and code were independently authored. No reference assets or source copied. Reference URL: https://rezona.ai/game/pgcserver/pv/phHnWJxSRj/v4/dist/index.html

## Verification
`node tests.mjs` checks all six bays, terminal rewards, unique inventory, save continuation, redirects and invalid input. Browser QA covers real pickup, auto-return, touch-size layout and public load. Physical phone testing is not claimed. DPR capped at 1.5, shadow atlas 1024, particle cap90; pause on hidden tab. Saved data stays on device. ZIP root contains index.html for HTML5 import.

## License
Original game code and procedural art: MIT, copyright 2026. Three.js r147 MIT; see THREE-LICENSE.txt.
