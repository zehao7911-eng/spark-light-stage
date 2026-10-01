# Lantern Line

A small HTML5 transport game set in an original pixel ghost town. Draw train routes, carry guests to matching destination symbols, and brighten the city's windows. Inspired by the network planning loop of [Mini Metro](https://store.steampowered.com/app/287980/), with original art, characters, sounds, and progression.

## Play

- Select a train color, then drag from one station through other stops. Release to build the route. Trains move automatically in both directions.
- Starting from an existing route's end extends it. Starting elsewhere replaces it. Dragging back through the previous stop removes that segment. The reset arrow clears the selected route.
- Ghosts show tickets matching cafe, bathhouse, flower shop, or library symbols. They follow shortest connected routes and transfer automatically at shared stops.
- Tap a moving train to ring its bell: a 2.8-second speed burst, with a 12-second cooldown. A musical note above the train indicates a ready bell.
- Crowded queues and very old tickets trigger a warning. You have 12 seconds to ease the pressure before a missed ride costs a heart.
- Complete each night to choose larger carriages, faster trains, or more patient guests. A new station opens until the map has nine stops. Demand and night quotas keep growing afterward.
- Mint and lilac trains unlock after 8 and 20 successful deliveries. Short routes and useful shared stops reduce waiting.

Transport state is conserved when tracks change: onboard passengers return to the train's last visited stop. Score is awarded once when a guest reaches a matching destination. Night transitions preserve queued and onboard guests. Each completed night restores one heart.

## Controls and compatibility

Use touch, mouse, or pen to draw routes. Keys 1–3 select trains; Escape pauses. Sound starts after a gesture, and the mute button silences it.

The game uses Canvas 2D, local procedural pixel artwork, and Web Audio. No CDN, image generation, external fonts, build tools, or WebGL are required. Open `index.html` through a static server or host the folder on GitHub Pages. Mobile portrait and landscape have separate map arrangements. The UI is English.

Progress saves locally under `lantern-line-v1`, including routes, passengers, upgrades, current night, and best score. Hidden tabs and overlays pause simulation. Blocked storage does not stop play; it only disables persistence. Clearing site data resets saved progress.

Browser checks cover touch routing, delivery and transfer, route edits, bell cooldown, five nights of progression, guest conservation, save reload, failure and restart. Layouts were inspected at 360×640, 390×844, 844×390, and 1280×900. Physical phone performance can vary.

All included graphics and audio are original code-generated assets. No Mini Metro assets are included.
