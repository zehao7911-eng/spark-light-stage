# Relic Rattle

Drag. Swing. Shatter.

An English, portrait-first HTML5 action roguelite. Tap the floor or drag to move a ceramic guardian. Movement winds up the chained orb; when the guardian stops, its rotational momentum decays. The weighted head deals the strongest hits; the moving chain breaks brittle ceramic seals and scratches armour. Break every target to clear the chamber. A defeated boss collapses the rest of its chamber in a final shockwave. BURST is an optional nearby shockwave with an eight-second recharge; the moving flail can deflect projectiles.

When only two targets remain, the shockwave fully recharges once as a finisher. This keeps the end of a room brisk without waiting for a cooldown or hunting one armoured straggler indefinitely.

## Loop and content

Six finite chambers use three coordinated illustrated environments. The first introduces harmless breakables, the second adds pursuers, the third adds aimed shots and a moving guardian boss. The fourth introduces explosive vessels and blast chains, followed by a denser mixed room and a stronger final boss. The two boss encounters share one credited nine-pose boss design with different health / room layouts; they are not two bespoke character rigs.

After clearing, take one of three offered relics. Long Chain changes reach; Heavy Head changes size/damage; Ember Core makes kills explode; Soul Flask heals after every four breaks; Quick Step changes movement speed; Ghost Shell lengthens post-hit protection. Each relic can reach rank two and carries through the current expedition. When all relics are mastered, continue without another choice. Subsequent expeditions rotate the six rooms with capped pursuit/projectile scaling and loop counter capped at 30. No claim of endless unique authored levels.

Each new settled attempt banks its earned coins once. Replays earn new attempt income. Each chamber keeps up to three best seals: clear, take no damage, and make a chain of five. The archive never duplicates best seals on replay. The workshop offers three permanent upgrades (reach, head size/damage, starting health), capped at three levels each. Upgrades apply when a chamber starts. A defeat provides partial income and a free retry with the same relic build and full starting health.

## Controls and save

- Touch/mouse: tap a destination or drag across the chamber. No virtual joystick or camera control.
- Keyboard: arrows or WASD move, Space bursts, Escape pauses. Menus use native buttons. The canvas is focusable.
- A pointer cancellation stops safely; releasing a normal tap keeps the selected destination, then movement stops on arrival. Hidden-page play opens pause. Sound begins after a gesture; sound and Gentle Effects persist.
- The logical guardian, chain angle/spin, breakable states, enemies, boss, shots, relics, health, score, recharge and result receipt autosave. Restore opens active combat paused and cancels held input. Particle fragments/trails and music phase are cosmetic and are not restored.
- Chamber archive replay starts a fresh build in a previously unlocked room. It does not silently resume the last expedition's relics.

## Artwork and reference

Reference: [Shrinebreak on Rezona](https://rezona.ai/game/pgcserver/pv/uyEbwmZc/v1/dist/index.html). Its Start Dive, initial room, six-heart HUD, small native WASD movements and ceramic character/room presentation were inspected. No reference enemy kill, room clear or full expedition is claimed. Its keyboard shooter / dodge controls were simplified into an independently written movement-driven flail game, not a complete source port or an identical copy.

Sixteen publicly served reference images are credited and bundled: three floors, five nine-pose actor sheets, two ceramic props and six relic icons. Original files are preserved under assets/originals; exact source URLs, original hashes, runtime hashes and preparation metadata are in assets/PROVENANCE.json. Actor sheets are mechanically cropped using a shared bound across their 3×3 cells, then repacked to 192px cells while preserving original alpha. This is real source pose artwork, plus code movement/bob/recoil, not a newly generated 3D model, GIF or skeletal animation.

No reference executable code, title logo, font or recorded audio is redistributed. All flail rules, input, progression, interface, chain drawing, fragments, hit text, effects and synthesized sound/music are newly written. No image generation was used. The code license explicitly excludes third-party images, prepared derivatives and cover/icon compositions containing them. Public accessibility or remixability is not represented as an independent media license or ownership claim.

## Hosting

Serve this directory with any static HTTP server (for example `python -m http.server 8000`), then open the printed address. The downloadable release has index.html at its root. No package installation, build, CDN, WebGL, backend or external API is required. Images load independently; a failed illustration uses a functional code-drawn fallback and a late successful load is installed normally. No blocking loading-screen loop.

## Applied skills

game-development, game-design, game-art, game-audio, web-games, mobile-games and 2d-games informed this work. Concrete decisions: one direct floor input; first-action smash feedback; movement-driven torque and logical swept head / chain contacts; clear armour vs brittle target roles; six numerically functional relics; readable shared art/perspective; large native touch controls; fixed120Hz logical simulation and bounded40Hz rendering, DPR1.7, 150 fragments, 20 fading cutouts, 12 trail samples, 35 shots and 18 sound voices; cancellation, pause, gesture audio and idempotent income. Actual physical handset frame rates are not guaranteed from browser viewport tests.

See VALIDATION.md for the final observed checks.
