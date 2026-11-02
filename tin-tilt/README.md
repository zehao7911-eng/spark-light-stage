# Tin Tilt

An original one-finger jousting miniature. Aim at the shield medallion while a sculpted toy knight automatically charges on an articulated wooden mechanical steed. Land a centre hit, pop the helmet, scatter lance chips and send the rider into the hay.

## Play

Drag anywhere in the arena to aim the lance. The first aim command starts the charge; releasing keeps the last aim. Continue tracking the green shield medallion as the rider approaches. There is no separate attack-timing button. Visible arrow buttons and keyboard arrows/WASD adjust the same aim. Escape pauses.

Each cup requires three or four successful passes. Three misses end the cup with a free retry. A centre hit earns more score; successive hits build a capped combo. Stars reward completion, all three hearts and at least two centre hits. Best scores/stars persist; replay and reload do not duplicate rewards. Six total stars unlock Broadhead (wider actual hit tolerance); twelve unlock Steady (mild attraction toward a target already within one unit). Neither aims across the entire screen for you.

There are six short authored cup configurations in three shared heraldic tourney grounds. After the finale, Victory Lap repeats these cups with charge speed scaling capped at three tiers. This is a compact arcade game, not an unlimited set of new venues or a full open-world riding simulator.

## Rendering and contact

Original procedural knight armour, connected limb joints, detailed helmets/crests, cloth cape, pegged wooden head, heater shield, medallion, articulated wooden steed/rolling chassis/reins/saddle, lance and three grounds. Sky gradient, soft contact shadows, original SVG icon, interface and Web Audio music/impacts are code-native. The cover is an actual title-scene screenshot. Generic original mesh helpers were reused from our earlier projects. No image generation was used.

Aim is ray-projected from the screen onto the contact plane. The rendered lance's final tip uses that same world point. Contact compares the final aim with a circular tolerance around the shield medallion; this is forgiving arcade geometry, not full mesh collision or a rigid-body weapon simulation. Knight unseating, cape, helmet and chip flights are staged articulated/ballistic animation, not a full physical ragdoll. The reaction widens the camera so the hay landing is visible. Gentle mode reduces crest/head/cape movement and disables impact shake.

## Reference and license

Actual Rezona reference: Tournament of Steel, https://rezona.ai/game/pgcserver/pv/OVKxsQlp/v1/dist/index.html . Start, round1, native riding, LANCE SPEED HUD, weapon action and Pause were observed. No reference enemy hit, unseat or full trial clear was verified. Tin Tilt is an independently authored, substantially simplified mobile adaptation with automatic charges and medallion tracking. No reference code, models, textures, logos, fonts or recorded audio are included. It is not a one-to-one reconstruction of that game's full controls, models or campaign.

The earlier Iron Vow arrow-parry/hold-strike and Neon Knockout ball-return games were checked for repetition; this uses continuous world-space lance aiming during an approach. Original work is MIT; locally bundled Three.js r147 retains its MIT notice in vendor/THREE-LICENSE.txt.

## Hosting and persistence

Serve this folder with any static HTTP/HTTPS server. No build, account, CDN or network API is required. ES modules require HTTP/HTTPS; direct file:// opening is unsupported. The game-only ZIP contains index.html at its root. No payments, ads or tracking.

The profile and active charge/reaction save to localStorage. Continue resumes at the saved phase. Pause/background freezes simulation and releases pointer ownership. Sound starts after a trusted gesture. Full/Light graphics and Full/Gentle motion are available; graphics context loss shows a reload message. Invalid partial runs are discarded while a valid profile is kept. Storage denial allows session play without reliable persistence.

Run node tools/test.mjs for deterministic checks. Desktop browser viewport/native-pointer tests are recorded separately from physical handset/FPS validation; no physical-phone performance or platform grade guarantee is claimed.
