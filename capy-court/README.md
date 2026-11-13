# CAPY COURT — Hot Spring Rally

A complete English HTML5 badminton game using generated artwork inside the actual playable court. Tap the landing ring or use left/right to position your capybara, then swing as the ring lights up. First to seven wins. Well-positioned late returns are sweet spots; three charge a faster blossom shot. Space swings, arrows/A/D move, Escape pauses.

Three cups unlock sequentially and change opponent movement and shuttle speed. They share the same illustrated garden and characters, with subtle palette overlays; they are not three distinct illustrated environments. Wins and best rally persist. Pause/reload restores the active logical match. Browser storage is local to this browser; clearing it removes saves. No payments, analytics, ads, account or external runtime libraries.

## Art

The richly illustrated forest spa court and six capybara poses were made with the built-in image_gen tool. Exact prompts are in ART-PROMPTS.json. The final atlas has real transparency. Runtime draws and animates the net, lines, shuttle, flight arcs, trails, petals, landing target, shadows and sprite pose changes. The generated environment is a static painting; waterfalls/foliage are not fully simulated. Original code renders a 2.5D court, not the reference's full 3D world. No reference models, source, sounds, illustrations or UI assets are included.

## Reference

Rezona Capybara Badminton: https://rezona.ai/game/pgcserver/pv/UBTegegw/v1/dist/index.html . Its title/rules and actual court were inspected; native serve, movement and a lost point were observed. This independently implemented version preserves the core move/swing/first-to-seven loop while adapting movement to one axis and adding tap-to-landing assistance, sweet spots and cup progression. It is not an exact one-to-one reproduction. Cat's Shield was excluded after its preview stayed blank.

## Run / build

Open index.html from the extracted folder or host the folder statically. Keep assets/ beside it. No CDN or downloads are needed after extraction. index-source.html uses separate CSS/scripts; build.py embeds those into index.html and writes SHA256.json and CAPY-COURT.zip. Generated PNG assets remain separate so the browser loads each only once. node tests.cjs runs rules/save/full-match checks. Canvas2D runs at capped frame deltas; effects/audio are bounded. Phone portrait320x568/390x844 and landscape844x390 layouts tested in browser viewports; physical handset performance is not certified.

Original code uses the MIT LICENSE. The generated artwork was produced for this project; no commercial game assets are redistributed.
