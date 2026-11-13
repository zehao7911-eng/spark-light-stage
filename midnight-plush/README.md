# Midnight Plush

A small 3D after-hours claw arcade for touch, mouse and keyboard. Bring twelve different plush friends home. Free play, no payments, ads, accounts, wagers or real prizes.

## Play

Serve this folder with any static HTTP server, then open index.html. A classic ready-to-run build and local Three.js are included; no npm install, online CDN or Rezona account is needed. The complete downloadable archive contains every runtime asset.

- Tap a toy or drag across the play area to aim. Touching a visible toy snaps the target to its center; the directional pad and arrow/WASD keys give finer control.
- Press GRAB / Space. The carriage travels to the target, then the claw lowers, closes, lifts and carries the prize to the chute.
- SQUEEZE / Space during closing gives a small optional grip bonus. Centered, exposed toys can be caught without this bonus. It is not a mandatory reflex test.
- Mint reticle: centered. Amber: edge grip. Rose: empty spot. A weak edge grip may lift then slip. Outcomes use aim alignment and grip quality, not a hidden random payout.
- Open YOUR SHELF to inspect the twelve friends, copies and cabinet finishes. Three different friends unlock Mint; seven unlock Lilac. Mix refreshes the bin but preserves your shelf. More missing species are included in fresh piles.

The bin uses bounded sphere-collider physics, gravity, separation and damping; it is not a full cloth or articulated rigid-body simulation. Toys use actual individually modeled, merged 3D geometries, fabric bump/roughness, embroidered details, colored lighting and blob shadows. The geometry rendered in the bin is also rendered into collection thumbnails, rather than using a different illustrated design.

## Save, pause and accessibility

The shelf, theme, mute setting and current physical grab state save in localStorage. A saved grab resumes paused. Pause, browser blur and hidden tabs stop model updates and sound. Held pointer/keyboard input is released on pause/resize/cancel. Blocked storage falls back to the current session. Local synthesized audio is optional and starts muted.

Phone portrait and landscape have separate layouts; all buttons retain 44px touch targets. Browser viewport testing is not a certification of physical-device performance. A WebGL-enabled browser is required; failure/context-loss screens preserve available progress and offer reload. The manifest includes 192/512 icons but there is no service-worker/offline-cache guarantee.

The model runs at fixed 120Hz; drawing is capped at 40Hz and DPR 1.5. There are at most 22 bin toys, one held prize, 80 confetti particles, 12 bounded audio voices (a short effect may briefly take the cap to 15), cached toy geometry/materials and a single WebGL context. Expensive real-time shadow maps and post-process bloom are avoided. Warm/cyan material highlights and local emissive trim supply the arcade lighting.

## Reference and authorship

Visual and interaction reference: the public Rezona Claw Machine / Weak Claw, Brave Heart playable at https://rezona.ai/game/pgcserver/pv/RzyBVlbI/v11/dist/index.html . It was observed through its visible interface: neon cabinet, pastel plush pile, descending claw, prize/shelf loop. This project is an independent reconstruction with original code, geometry, UI, sound and generated backdrop/cover/icon. No reference source code, images, models, music or Rezona export were obtained, and no pixel-identical or full-feature parity claim is made.

Code is MIT (LICENSE.txt). Bundled Three.js r147 is MIT (THREE-LICENSE.txt). Original generated assets and exact final prompts are documented in ART-PROMPTS.md. Cover/logo typesetting is live HTML or code-drawn sign text; illustration source contains no platform branding.

## Development

`python build.py` regenerates app-1027a.js from model.js, scene.js and game.js, using only Python's standard library. `node tests.mjs` validates complete collection progression, transit snapshots, duplicate-reward guards, contact outcomes and collider bounds. The source files remain editable and are included in the ZIP.
