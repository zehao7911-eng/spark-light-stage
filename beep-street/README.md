# Beep Street

A small original pixel-art corner shop. Drag a product from the belt across the scanner and into the paper bag. The scanner remembers products already scanned, so you can set an item down and pick it up again. You may also tap to pick a product, tap the scanner, then tap the bag. Product hit areas are enlarged for touch. Each customer starts waiting only after the first product is picked up. Three missed customers end the shift; retry is free.

Six shifts span a corner grocer, station kiosk and lantern-night market, with 18 named products using nine base silhouettes and packaging variations, four customer appearances, category-pair bonuses, best stars, replay selection and visible plant/clock rewards. This is a finite small campaign, with shared checkout hardware across three backdrops. Active baskets, scanned flags, completed shifts and settings are saved on this browser. Refresh clears an unfinished drag but preserves the basket. Sound begins after interaction. Background tabs pause.

Keyboard: 1/2/3 picks one of the three visible products; S moves it over the scanner; B moves it into the bag; R returns the selected item to the belt; Escape pauses.

The gameplay reference is Checkout: Cashier Simulator (Steam 2969140), whose official description and screenshot were reviewed. This is an independent, smaller touch adaptation of scanning and bagging; no reference code, art, characters, names or audio are copied. Original code-drawn art follows the user's positive Corner Crew direction. No image generation or external runtime libraries.

GameWave support is optional. Genuine positive like and direct-comment callbacks unlock gold scanner trim and pink bags once per device profile. API methods are detected individually and failed registrations do not block play. Real platform interactions still need verification in the host app. The English import contract is included. Neither SDK presence nor a network connection is required after loading.

Serve this directory using any static HTTP server and open index.html. `node test.cjs` validates all six full controller shifts; `node test-sdk.cjs` validates the optional adapter with mocks. Mobile browser layout testing does not establish physical-phone performance.
