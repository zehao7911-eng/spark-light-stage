# TIDEBLOOM BATHS

An original, unhurried seaside bathhouse management game. Built with Godot 4.7.2, exported to single-thread WebGL2. English interface. Original image-generated pixel assets; visual craft references Eastward: Octopia and Dave the Diver, without reusing their assets or characters.

## Play
Choose a visitor card, then tap an open bath. Match Cool/Warm/Hot and Mint/Bloom/Yuzu to the visitor. Quiet visitors prefer a bath to themselves; social visitors earn an extra tip when sharing. Gold bars show rest progress; dots show water freshness. Rinse is free. Guests never abandon the queue, and even imperfect matches finish and pay. Tap an unselected bath to configure it after seating. Select another card to seat another guest.

Spend tips in Garden shop: two additional baths, tea service, soft towels and the petal garden. Purchases visibly change the courtyard. Every completed day awards 30 coins; days continue indefinitely. The cat can be petted. Audio starts only after interaction; the note button mutes it. Coins, upgrades, freshness and settings are saved on this browser. An active soak restarts after refreshing, without charging resources.

## Run and rebuild
Serve this folder with any HTTP server; opening index.html using file:// is unsupported. No CDN, external fonts, sign-in, threading or cross-origin isolation headers required. A WebGL2-capable browser is required. The initial Godot runtime download is sizeable; subsequent visits use the browser cache. Mobile layouts are browser-tested, not a guarantee for every handset.

Editable Godot project is in godot-source/. Open project.godot with Godot 4.7.2 and its matching Web templates. Export preset Web to a separate folder. Then insert godot-source/ui-fragment.html immediately before the generated index.html closing body tag, and copy godot-source/assets/guests.png next to index.html. Keep the complete generated runtime files together. Headless game checks: godot --headless --path godot-source -- --qa. Art prompts and production notes are in godot-source/ART-DIRECTION.json.
