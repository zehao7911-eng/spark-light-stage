# Snack Shuriken

An original, single-player miniature food arena, directionally inspired by the cute food characters, pastel courtyards and outbound/return boomerang combat of Boomerang Fu (Cranky Watermelon). No commercial game assets or code are included. Not a full reproduction or online multiplayer game.

## Play

Open index.html. Everything is bundled, including Three.js r147 under its MIT license. No server, downloads, account, CDN or external fonts are required.

- Phone: left pad moves; THROW targets the nearest unobstructed rival. Press it again to recall. Returning blades can hit rivals too. DASH briefly protects you and deflects an incoming blade.
- Desktop: WASD or arrows; Space throws/recalls; Shift dashes; Escape pauses.
- Red ground ribbons warn you before rivals throw. Obstacles block movement and outgoing blades; recall passes through cover. Crates break. Rivals can hit each other.
- Clear every rival. Pick one ability between rounds. Three authored courts repeat with increasing rival counts and faster attacks, bounded at five rivals. After round 6, one rival has two hearts. Five stackable abilities and a restorative heart choice keep long runs playable.
- Defeat retries the current round with full hearts and retained powers. There is no life limit. Stars are awarded only for newly achieved best rounds, preventing repeated reward farming. Unlock five food avatars with stars; they are cosmetic.
- Local save remembers an active round, powers, selected avatar, stars and sound. Pause and backgrounding freeze the simulation. Progress remains after reload. Browser storage may be unavailable in restricted embeds.

Original food meshes, paving, trees, petals, lanterns and red-tiled stands are generated in code. All impact sounds are synthesized after user input. DPR capped at 1.5, 30fps rendering, fixed 60Hz game rules, bounded opponents/projectiles/effects, instanced paving/details, no heavy postprocessing. Portrait and landscape touch layouts. Mobile input/viewports tested by browser emulation; no physical handset performance guarantee.

Reference: https://store.steampowered.com/app/965680/Boomerang_Fu/
