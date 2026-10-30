# Crankle Works

A small original, all-English HTML5 toy workshop. Hold the yellow button to wind a spring; release at gold to drive the illustrated assembly line with a shiny-paint boost. Pack a whole order and tap Deliver. Brass buys permanent spring, gear and auto-winding helper upgrades. Eight commissions introduce six distinct mechanical toy silhouettes across three workshop atmospheres. Replay orders for better stars; replay awards only the improvement, never duplicate brass.

## Play

Serve this folder over HTTP, then open `index.html`. For example, `python -m http.server 8000`. No build, account, network library, CDN, font or WebGL is required. The ZIP has `index.html` at its root and is suitable for a static HTML5 host or GitHub Pages subfolder. Module loading requires HTTP rather than opening `file://` directly.

Touch or mouse: hold the large winding button, then release. Keyboard: hold/release Space; Escape pauses. The conveyor stops while winding. Gold power at the COLOUR station stamps a toy shiny. One star for delivery, another for at least half shiny, a third for all shiny. There is no timer, life loss, payment or fail state. The helper only runs after the first player wind. All three upgrade types have three levels. A full helper at level three can sustain the base belt without manual winding; manual gold boosts still improve shiny quality.

Progress, upgrades, sound/motion settings and exact moving spring/queue state save locally. Reload opens an explicit paused continuation. Backgrounding and losing focus pause work and audio; there is no offline production. If storage is unavailable, play continues in memory. A saved held gesture is released safely on restore. Restarting an order retains earned upgrades and best records.

## Art and reference

All game code, procedural Canvas artwork, SVG icon and synthesized Web Audio cues are original. No image generation, commercial sprites, external recordings or reference assets are bundled. The cover is an actual runtime screenshot. The selected Rezona public reference was “Petting Clay Doll”, served as Clay Empire at `https://rezona.ai/game/pgcserver/pv/gZbkTvIg/v1/dist/index.html`: the tap-to-earn, buy-generator loop was actually tested through its first Clay Blob purchase and visible 0.2/sec production. Crankle changes the action to winding and a spring-driven multi-stage toy line. The user's art atlas ink-comic gallery (`https://mygamesartstyle.jupiterthewarlock.com/styles/ink-comic/`) informed selective outlines, block shadows and expressive silhouettes; the enlarged Slay the Spire 2 forest example was viewed. No reference character, logo, code or artwork was copied. This is not a one-to-one commercial reproduction or a full factory simulation.

## Technical bounds

Fixed 60 Hz model, capped 40 Hz drawing (30 Hz Gentle), DPR capped at 1.5. Eight toys per order, at most 80 effects and ten audio voices. UI is event/interval updated. Paused scenes do not continuously redraw. All main controls target at least 44 CSS pixels. Portrait and landscape layouts; external phone browser hardware is not simulated by a desktop iframe.

## Validation

Run `node tools/test.mjs`. Tests exercise ordinary wind/release routes for all eight orders and all four uniform upgrade configurations, toy conservation, stages, exact moving-state restore, long-hold limits, actual helper production, terminal freeze, idempotent rewards and invalid saves. Native browser and public deployment observations are kept in the delivery evidence outside this game folder. The included phone/layout preview tools are simple QA frames, not automated play or hidden game controls.

## Files

`core.mjs`: deterministic model, orders, economy and saves. `art.mjs`: code-drawn workshop, original characters/toys and effects. `app.mjs`: touch/keyboard UI, pause/save lifecycle and sound. `style.css`: responsive interface. `assets/`: icon and actual runtime cover. `tools/`: model checks and phone/layout previews.
