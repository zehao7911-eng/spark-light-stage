BEATBREAK
A single-player HTML5 musical dodge game inspired by Just Shapes & Beats (Berzerk Studio).

PLAY
Open index.html in a modern browser. The packaged index is completely self-contained and needs no network, account, installer or WebGL.
Drag anywhere inside the playfield to steer relative to your finger. Release to stop. A second finger can press the arrow button to dash while steering. Dash is briefly invulnerable and recharges in 1.05 seconds.
Keyboard: WASD / arrows to move; Space to dash; Escape to pause. Header buttons and menus also support keyboard activation.
Avoid solid pink hazards. Dotted pink lines and outlined projectiles are warnings before activation. Grab the cyan notes. Pass close to hazards without touching to earn grazes, points and a small dash recharge. Survive until the progress bar finishes.

MIXTAPE
Six original sequenced electronic tracks: First Light 108 BPM, Sidechain 116, Orbit Crush 120, Glass Teeth 126, Afterimage 132, Heartbreaker 136. Short tracks range from 53 to 71 seconds, with original bass, minor-key chord progressions, melodies, arpeggios, kick/snare/hi-hats and delay. Music and attacks follow the same beat clock. These are synthesized original arrangements, not recordings from the reference game.
Each track has authored warning/attack phrases: gap walls, aimed fans, laser crosses, rotating bars, expanding rings, swinging saws and a final boss-style geometric stage performer. The last track's outline face is decoration; the bright solid projectiles, beams and bars are the actual hazards.
Four hearts. Unlimited retries at 32-beat checkpoints. Checkpoint retry rolls back notes/score/grazes to the checkpoint bank so collectibles cannot be repeatedly farmed; total hits stay counted. Start over resets the performance.
Earn one badge for finishing, one for at least five notes, one for at most two hits. S requires zero hits and at least five notes. Best badges and scores are stored per track, maximum18 badges. Diamond and Ring shapes unlock at6/12 badges.
After the sixth track, Encore repeats the six-track playlist with bounded faster projectiles and a saved best mix record. This is not an unlimited collection of unique songs or levels.
Save cover downloads a PNG of your performance.

MOBILE / STORAGE / PERFORMANCE
English UI. Native multi-touch Pointer Events. Portrait and landscape layouts with safe areas and44px minimum buttons. Resize preserves normalized positions and releases input. Direct Canvas2D, cached glow textures, max180 hazards/160 particles/24 trails/48 audio sources, DPR capped1.5, fixed60Hz simulation.
Audio begins after interaction. Sound and Soft/Full motion settings persist. Soft is the default and disables camera shake, full-screen hit flash and invulnerability blinking. Pause, hidden pages and window blur freeze gameplay and stop audio, including the results stinger. Active game saves reopen behind Continue. If browser storage is denied, play still works without persistence.
Music uses WebAudio oscillators/noise and a short look-ahead scheduler reanchored on resume. Frame stalls beyond170ms resynchronize to gameplay rather than keeping stale song positions. Moderate device/browser scheduling latency remains possible.
All art, code, maps/patterns and synthesized sounds made for this original browser interpretation. No commercial source code, art, maps or licensed recordings extracted. No image generation, CDN or third-party runtime required.
Source modules engine.js/audio.js/art.js/app.js/style.css included; all are already inlined in the packaged index.html.
Mobile QA is browser native-touch/viewport emulation, not physical handset certification.
