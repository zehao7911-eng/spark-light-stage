# Out of Office

A short, original 3D office-mischief game for touch screens and desktop browsers.

## Play

Tap the three fixed prank buttons to walk to a machine and operate it. Tap the floor to change the route. When all three pranks are complete, tap **Back to your desk** and get home before the 75-second shift expires. The clock begins with the first movement command.

Stay out of the boss's orange view cone. Furniture and paper clouds block sight. A prank produces a visible reaction window before the boss resumes. Being caught costs eight seconds and undoes the most recently completed prank; three warnings end the shift. Retry is free. Keyboard movement is also supported with WASD/arrows; Escape pauses.

## Things that actually happen

- The copier's lid flaps and sheets scatter; its paper cloud obscures the boss's sight.
- Coffee streams onto the floor and forms a puddle that trips the boss.
- The radio attracts investigation and makes coworkers dance.
- A rolling chair, overpowered fan and confetti cannon interrupt nearby patrols.
- The clerk walks, works and celebrates. The boss looks shocked, chases and tumbles. Completed setups and warning resets are visible in the room and task dock.

Six authored shifts use three shared office environments, distinct furniture/task arrangements and patrol routes. They are short challenges, not six large open worlds. Best stamps and scores are retained on replay. All six shifts unlock **After Hours**, which reuses the layouts with sight and pursuit scaling capped at four tiers.

Six stamps unlock Spring Sneakers, which change the shoe model and actual walking speed. Twelve stamps unlock the Cardboard Box, which visually conceals the stationary clerk and prevents visual detection while still and not working. Outfits are selected in the incident reports. Earned rewards are best-only; replaying or reloading does not duplicate stamps.

## Run and package

Serve this folder with any static HTTP/HTTPS host. The game-only ZIP has `index.html` at its root. No build, account, CDN or runtime network API is required. Browser ES modules require HTTP/HTTPS; opening `index.html` directly with `file://` is unsupported.

All runtime resources, including Three.js r147, are local. Sound is original Web Audio synthesis and starts after a trusted player gesture. Full/Light graphics and Full/Gentle motion are available in Pause. The game saves partial state and settings; pausing, backgrounding and pointer cancellation release movement. Invalid saves fall back to a fresh state. There are no payments, ads or tracking.

## Reference and authorship

Public design reference: **Meteor 60 Seconds** on Rezona:
https://rezona.ai/game/pgcserver/pv/RTyBunEu/v1/dist/index.html

The reference's start, countdown, walking and one contextual character interaction were actually observed. Its full set of endings was not verified. This is an independently authored office caper studying short rounds and contextual cause/effect, not an exact recreation of the reference's city, characters or complete campaign.

All game-specific code, procedural meshes, UI, animations, original SVG icon and synthesized audio were created for this project. The cover is a screenshot of the real title scene. No reference executable, character models, images, fonts or recorded audio are included. No image generation was used. The locally bundled Three.js retains its MIT notice in `vendor/THREE-LICENSE.txt`; original work is covered by `LICENSE.txt`.

Run `node tools/test.mjs` for core checks, including all six shifts, route obstruction, capture rollback, retry, idempotent rewards and save continuity. Browser viewport QA is reported separately from physical handset tests. No hardware frame-rate or platform-grade guarantee is claimed.


## Usability and stability update

The chosen prank now has a highlighted dock button, a larger marker in the room and an explicit walking/working status. Stop Walking cancels the route. Boss suspicion and all three warnings are visible without opening the rules. Pranks display their +150 reward. Completed buttons are disabled, while failed/undone pranks become available again.

Movement consumes its remaining distance through grid waypoints, eliminating the old per-node pause. HUD writes are throttled independently of the fixed simulation. Outfit selection updates the current clerk immediately. Sound indicators stay synchronized with Pause settings; transient effects reset between shifts. The initial patrol cone is visible before the first command. Gentle mode removes celebration jumps and uses slower camera follow.

An expired timer now causes loss before evaluating same-frame desk arrival. Partial-save validation rejects altered task layouts, invalid patrol paths and out-of-range actor values while retaining valid profile rewards. Previous valid saves remain readable.
