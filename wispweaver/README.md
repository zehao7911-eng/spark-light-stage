# Wispweaver
A complete locally bundled Canvas2D HTML5 adaptation built around actual Coil source code. Serve this folder with a static HTTP server and open index.html. No CDN/fonts/images/analytics/backend required.

Actual source provenance: https://github.com/leereilly/Coil at ea6fd3afae10a6d8a53b07e82be4211619206ede, MIT Copyright (C) 2011 Hakim El Hattab. coil-core.js retains Point, Region, findLineIntersection, and findIntersections from js/util.js and js/coil.js. Intersections returns a value instead of mutating global state. New containment uses pure geometry in place of full-canvas pixel readback. License in LICENSE-COIL.txt. No upstream images, jQuery, donation scripts or texture shaders included.

New code-drawn layered garden art, three creature styles with wing/antenna animation, brass lanterns, ceramic owl, bridge, water, plants, nine levels across three environments, seven-second Stillness, brambles, multi-capture rewards, stars, field journal and ribbon unlocks. All interface text English. All runtime art and synthesized audio created specifically for this adaptation.

Drag to trace and release a closed loop; switch to Tap mode for point-based input, close by tapping the first point. Escape pause, Space Stillness. Saves profile and active garden under wispweaver-v1; interrupted input is cleared on pause/rotation/cancel. If storage is blocked the current session stays playable. No physical-device performance certification implied.
