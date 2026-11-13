# Purr & Polish

An original, cozy HTML5 cleaning game. Drag the vacuum cat, collect fluff, choose a build, and buy permanent upgrades. All art is authored with Canvas paths. No external libraries, images, CDN, accounts or payments.

## Play

Open `index.html` locally or serve this folder as a static site. Drag anywhere in the field to guide the cat; a tap also sets a destination. Arrow keys / WASD work on desktop. Escape pauses. The dashed ring shows suction reach. Move close to chunky dust bunnies to soften and collect them. A dashed guide points to the final few puffs.

Every collected puff adds coins. After 24 puffs the cat releases an automatic Purr Burst that clears nearby loose fluff and weakens clumps. Finish a field to choose one of three randomized upgrades: larger reach, independent orbiting broom helpers, chain pops, stronger suction, more frequent bursts, or extra coin value. Each can stack to level three. Five rooms complete a run and award 100 bonus coins; start another run for a new build. There are three repeated placement patterns with seeded variation, five palettes, and increasing clump counts. There is no timer failure, damage, loss of coins or combat. This is a relaxed run-based build game, not a full combat roguelike.

Between rooms, buy permanent suction or coin-value levels, each capped at five. These and coins persist when starting a new run; temporary chosen abilities reset. Completing three runs gives the cat a crown. No offline income is simulated. The first field can finish very quickly as bursts chain through clustered fluff; later fields spread it out and add clumps.

## Save and mobile behavior

Browser local storage saves current room, remaining fluff, build, wallet, permanent upgrades and mute setting. Reloading mid-room resumes paused, with movement stopped. Cosmetic particles reset. If storage is blocked, the session remains playable but will not survive a reload. Pause, hidden-tab and blur stop game time and sound. Pointer cancellation stops movement. Reduced-motion removes cat wobble, ambient suction dashes and vibration; necessary movement and short collection feedback remain.

Touch targets are at least 44 pixels. DPR is capped at 1.5 and rendering at approximately 40 FPS. Portrait and landscape layouts are supported. Actual browser touch emulation was tested; physical handset performance is not certified.

## Inspiration

The collect / upgrade / automate loop takes loose inspiration from [Leaf Blower Revolution](https://store.steampowered.com/app/1468260/). Characters, art, code, field layouts, upgrade rules and interface here are original; this is not a port or a reuse of that game's assets.
