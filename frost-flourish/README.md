# Frost & Flourish
An original, small HTML5 cake-piping studio. No installer, account, CDN, network audio or build process. Serve this folder over HTTP(S), then open index.html. Three.js r147 is bundled locally under MIT; its license is in vendor/.

## Play
Hold and drag across the dotted cake patterns to leave thick ridged frosting. Reach 94% coverage to move on. Tap each gold ring to place fruit, then Sprinkle & serve to finish the cake and receive sugar coins. Next cake begins a different order. There is no failure timer or real-money purchase. The pause menu can restart the current cake at no cost.

Six recipes use ring, spiral, petal and heart patterns with their own cake and fruit palettes. Orders cycle indefinitely. Two or three stars depend on time spent piping already covered regions; every completed cake earns a base reward plus stars and recipe bonus. The Studio collection offers three optional icing palettes, bought with earned coins; owned palettes can be switched freely.

Completed cakes, coins, owned/selected palettes and sound preference save locally. An unfinished cake starts over on reload. Keyboard Space + arrows can pipe; mouse or touch places fruit and activates buttons.

## Art and feedback
Actual lit 3D geometry: glazed serving platter, scalloped frosting, instanced ridged cream, individually modeled fruit, linen table, wooden rolling pin and ceramic ingredient bowls. No generated images or copied commercial game art. Cream extrusion hiss, rising piping tones, fruit pops and completion chimes are synthesized locally after interaction. Decorative sugar falls and settles on the cake at serving.

## Mobile
One-finger pointer capture, cancellation/background pause, 46px minimum interface buttons, portrait/landscape camera layouts. DPR capped at 1.6; render capped to at most45FPS; cream capped2200 instances, transient decorative particles capped130, sound voices bounded12. Six recipes reuse geometry. See QA.md for browser validation; physical handset performance is not certified.

Source files are directly editable: core.js (rules), game.js (3D/interaction/audio), style.css, index.html. No Unity or Godot runtime download is needed.
