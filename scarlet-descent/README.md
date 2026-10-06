# Scarlet Descent

Original HTML5 gunboot descent, inspired by Downwell on Steam: https://store.steampowered.com/app/360740/Downwell/
Original pixel sprites, architecture, code, audio and interface; no commercial assets or image generation. Compact browser interpretation, not the full commercial game.

Steer using left/right buttons, arrows or A/D, or horizontal canvas drag. Hold FIRE or Space to shoot below while recoil slows your fall. Shooting spends ammo. Platforms refill ammo, then crumble after half a second. White monsters can be stomped from above to bounce and reload; side contact and red projectiles damage health. Shots kill enemies, release gems and build airborne combos. Landing banks the longest combo and resets the current chain.

Every third chamber has a keeper below a stable reload floor. Defeat the keeper to release that floor and open the exit. Every chamber offers one of up to three stackable upgrades: ammo, damage, spread, magnet, health or rate of fire. Four levels each; fully charged builds receive a Continue choice. Nine opening chambers and continuing seeded remix chambers; object counts and projectile/effect counts bounded, keeper health capped at 80. No timers or purchases. Retry the current chamber with earned powers retained; new run changes the seed and resets powers, keeping best depth, chamber record and total banked gems.

Save includes active chamber, exact enemies/platform ages/ammo/health/loot/projectiles, powers and settled reward state. Continue handles live, defeated and cleared saves; cleared rewards cannot double bank through reload. Backgrounding/pausing freezes physics and releases held pointers. English UI. Canvas2D pixel rendering, DPR <=1.5, 60Hz physics /30fps draw, no CDN/network dependencies. index.html is standalone and works offline. Mobile testing uses emulated real touch events, not a physical handset.
