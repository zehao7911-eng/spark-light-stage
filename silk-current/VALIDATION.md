# Validation — 2026-10-23

## Simulation

`node qa.cjs`: 10 checks passed. Coverage includes pause/title freeze, destination movement and boundaries, dash speed/cooldown and thorn breaking, collection/delivery without double credit, time recovery, reward selection, next-round progression, sonar unlock/cooldown/attraction, guardian loss protection and recoverable escaped fish, timeout/end freeze, seeded determinism, bounded event queues, and 20 successive simulated expeditions with capped populations and retained mastered gifts.

## Actual browser input

- Completed a desktop first expedition with normal screen clicks; delivered 12 fish, received the reward screen and selected a guardian to enter the rose biome.
- Completed a separate 390 × 844 portrait expedition using normal canvas drags/clicks; delivered 12 fish, selected Singing tide, entered sanctuary 2 and activated sonar.
- Activated sound and keyboard dash, paused, then compared time and player position after 1.1 seconds: both exactly unchanged.
- Read browser console after play: no captured warnings or errors.
- Reward controls checked at 320 × 568, 390 × 844 and 844 × 390: all inside the viewport, no horizontal document overflow. Visible reward cards exceed 44 pixels in each dimension.
- Record score persisted through reload in the same origin.

Physical mobile hardware has not been tested. Browser viewport checks do not establish device-specific frame rate, thermal behavior or phone background lifecycle behavior.

## Distribution

The package uses relative local URLs only; no CDN dependency, large model, Godot/WASM export or cross-origin isolation requirement. GitHub Pages release bytes and immutable ZIP integrity are checked separately by the publication verifier.
