# Hug the Sky

An original, single-player touch climbing toy for HTML5. A little biscuit creature stretches its arms through a stitched paper playground to hug a friend. Directional inspiration: Heave Ho's tactile grab-and-swing comedy (https://store.steampowered.com/app/905340/Heave_Ho/). This is not a port; no commercial art, code, levels or sound are included.

## Play

Open index.html directly, or serve this folder with any static web host. All files are bundled; no CDN, build step, account or network is required. Drag anywhere toward a nearby ring and release. A bright halo means it is within reach. Your arm reels you in while your body swings with gravity. Dragging also gently steers your body. Later skies have breezy sections. Empty releases and canceled gestures do not drop you. Let go releases your current ring; catch another while falling. There are no lives or time limits.

Mint flags save a checkpoint. Lavender rings move. Biscuit rings crumble after 3.8 seconds of holding them. Golden side rings lead to three star fruits. Friendly pinwheels can boop you away. Reach the top ring and settle to rescue your friend. Three stars reward a rescue, all three fruits, and a climb with no falls and at most two boops. Eight courses unlock in order. Six stars unlock Clover; fifteen unlock the Crown. Each course can be replayed for better fruit collection and a smaller grab count. Travel book, muted sound, course progress and current physics state save locally when storage is available. A fresh session still works when storage is denied.

Keyboard: arrows choose a reachable ring; Space grabs it (or chooses the highest reachable ring). Escape pauses. Sound begins only after input. Camera button saves an original PNG postcard.

## Technical notes

p5.js 1.11.11, Canvas 2D. Pure 60 Hz game simulation. 60 FPS render target, capped pixel density 1.5, at most 100 decorative particles and 14 audio voices. Original synthesized sounds and code-drawn illustrations. Pointer cancellation clears aim. Pause, focus loss and backgrounding freeze physics and suspend sound. Reload clears transient input and resumes behind a menu. Resizing redraws the same state. Responsive portrait/landscape layout and safe-area padding. Actual performance depends on the device; no physical handset performance guarantee is made.

p5.js is bundled under LGPL 2.1; see P5-LICENSE.txt. Game sources and illustrations are original.

