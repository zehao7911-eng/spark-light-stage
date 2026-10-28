STILLWATCH - The Lantern Museum

An original, untimed museum escape for phones and desktop browsers.

HOW TO PLAY
Tap a lantern marker to walk to it. The curator automatically avoids solid
pedestals and lights a lantern while standing nearby. Tap WATCH to freeze
the pursuing marble sentinel; tap REST to replenish focus. Walking works
in both states. Running out of focus causes a short involuntary blink.
Light all three lanterns, then tap the open exit. Three bumps end the room.
Already lit lanterns survive a bump. New rooms wait for your first movement.

Keyboard: Space holds WATCH, 1/2/3 visit Moon/Sun/Star, E visits the exit,
Escape pauses or resumes. A tap on the floor chooses a destination.

Four galleries unlock in order. Each has a different obstacle arrangement,
sentinel speed, lighting palette and perimeter details. Earn one star for
escaping, one for avoiding bumps, and one for avoiding involuntary blinks.
Best stars are saved separately for each room; replay does not duplicate them.
There is no timer limit, purchase, account, currency or online competition.

RUNNING AND SAVING
Open index.html or standalone.html in a WebGL-capable browser, or serve
this folder with: python -m http.server 8080
The two HTML files embed their scripts and styles. Runtime gameplay does
not require a CDN, external font, image service, API or network request.
The favicon is optional. No installation or build is required to play.
Local storage saves room progress, best stars and sound preference.
Storage may be unavailable in private or restricted browser contexts;
the current session remains playable. File-URL storage varies by browser.
Switching tabs pauses the game. Use the menu to resume deliberately.

ART AND REFERENCE
All game artwork is code: jade and ivory architecture, brass ornament,
sculpted moth curator and marble sentinel, procedural marble and softbox
textures, water shader, lantern particles and interface. No AI image
generation, downloaded reference assets, or copied reference code is used.
Three.js r147 is included locally under its MIT license (LICENSE-THREE.txt).
The independent game and original procedural art are MIT licensed (LICENSE).

Public interaction reference: Rezona Don't Blink
https://rezona.ai/game/pgcserver/pv/uyEsQsKh/v1/dist/index.html
The observed reference uses first-person movement, voluntary blinks and
stationary terminals. This is an independent isometric adaptation with
tap pathfinding, a global WATCH toggle, focus/rest, shields and four galleries.
It does not reproduce that game's assets, source, full rules or presentation.

BUILD AND CHECK
python build.py             - embed source, hash files, rebuild STILLWATCH.zip
node tests.cjs              - routes, collision, freeze/rest, saves, loss/win
node tests-stars.cjs        - demonstrate a three-star route in each room

Responsive layouts are designed for portrait and landscape phones.
Browser viewport tests do not constitute testing on every physical handset.
Requires WebGL. No S-rating or third-party platform acceptance is promised.
