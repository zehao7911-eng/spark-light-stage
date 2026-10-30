# CUTOUT CLUB — The Paper Wardrobe

An original English, touch-first HTML5 styling game. Dress a drawn paper figure for three little wishes, then make an actual collectible postcard. Ten finite styling briefs, forty original garments and accessories, three paper models, a saved lookbook and local PNG export. No timer, failure penalty, account, advertisements, purchases or runtime network dependency.

## Play

Tap a clothing card to wear it, or drag it upward onto the figure. The four tabs are Look, Head, Carry and Feet. Match the weather, mood and colour wishes shown above the figure. Each item has matching small symbols, and the wishes tick immediately when the current outfit contains them. There are many valid outfits; the game does not require a single prescribed combination. The brief table ranges from fourteen valid starting looks to over a thousand combinations later, counting all four slots.

Make the Postcard becomes available at three matches. It captures the exact four worn items and selected model into the lookbook, opens the next invitation, and unlocks new pieces. Collecting a postcard again restyles that entry; it does not duplicate progress or unlock rewards. All forty pieces are available by the last invitation. Sol joins after two postcards, Nori after five; the model button cycles available figures. Each model shares garment registration and has an original skin/hair treatment. The profile and current unfinished outfit save in this browser under `cutout-club-v1`. Clearing browser data clears these saves.

Undo restores the previous full outfit. The free nudge button highlights one available piece that improves the current wishes, changes to its category and scrolls it into view. It never auto-equips the item or spends a resource. Open the lookbook to view, restyle or export an earned postcard. A restyle only replaces the saved look when Make/Remake is pressed. No image is automatically uploaded or sent to another service.

Save PNG produces an 840×1200 PNG using the same original scene and figure renderer, with the photographed item IDs and model. The weather is frozen at a deterministic pose for the postcard. The export screen displays the full PNG for long-press saving on phones and includes a Download PNG link. It does not upload the image. Downloads may be restricted by an embedding host; the visible image remains available for native saving.

Keyboard: use Tab, Enter and Space on the accessible buttons; Z undoes, P pauses/resumes. Pause, background tabs, blur and resizing release an unfinished clothing drag, freeze illustration animation and stop audio. A running shutter animation resumes after pause; the captured postcard is saved as soon as it is accepted, so reload does not lose an earned unlock. Gentle Motion slows ambient movement, lowers rendering density and softens the camera flash. If storage is blocked the game remains playable without reliable persistence.

## Run / build

Host this folder on HTTP(S), including GitHub Pages. `index.html` and `standalone.html` inline all CSS and JavaScript and need no build or remote library. The optional local SVG favicon is separate. No external font, bitmap, music recording, 3D model, CDN or server API is used. `python build.py` rebuilds the two playable files, SHA256 manifest and deterministic ZIP. Editable source: `index-source.html`, `style.css`, `model.js`, `art.js`, `game.js`. `phone-preview.html` is an explicitly labelled responsive QA fixture containing the actual game in 390×844, 320×568 or 844×390 iframes; it is not a handset emulator.

Canvas 2D, bounded synthesized Web Audio, DPR at most 1.7 (1.0 in Gentle Motion), about 30 fps rendering and cached paper grain. Main controls use 44 px or larger CSS hit areas. Mobile wardrobe cards are a horizontal scrolling row; an upward drag is handled as a garment placement. Desktop uses a side wardrobe grid. Portrait and short landscape layouts share the same full figure and controls. Browser viewport testing is not physical device or audio listening certification.

## Original art system

The user's [Sketch lines and cutout characters atlas](https://mygamesartstyle.jupiterthewarlock.com/styles/sketch-cutout/) informed the broad use of thin drawn outlines, short hatching, paper layers, restrained colour and a less detailed background. Its enlarged first Don't Starve Together scene was visually inspected. CUTOUT CLUB uses an independently drawn editorial wardrobe and original figures, not that game's characters, layouts or assets. Clothing, limbs, hair, props, paper, street/season scenery, interface symbols, photographs and synthetic audio are authored locally in code. No image-generation tool or reference asset is included. See `STYLE.md` and `artbook.html` for shared construction rules and explicitly labelled illustration fixtures.

Gameplay reference: [Rezona Today's Fit, served as Nostalgic Fit](https://rezona.ai/game/pgcserver/pv/dWzjLSNDyl/v5/dist/index.html). The actual wardrobe, category selection, Top 1 try-on and layer count increasing from one to two were observed through native input. Its PNG export control and broader collection UI were inspected, but the reference's export and every asset collection were not tested. No reference code, images, fonts, clothes, character parts or audio are bundled. This original game adds authored three-wish styling briefs, progression, an earned lookbook and a common original forty-piece illustration system. It is not a one-to-one remake or an adaptation of a complete upstream game. Hollow Harvest's FPS title and Spire's lever-hook climb were also inspected during selection, then rejected for this project. The imported open-source catalog dress search did not provide a suitable dressing-game foundation.

Original source and code-drawn artwork: MIT, `LICENSE.txt`.

## Verification

`node test-model.cjs` checks three normal-input campaigns, all thirty brief completions, available outfit combinations, locked equipment, actual tag matching, capture guards, bounded undo, free nudges, serialization, malformed data and no duplicate unlock rewards. It enumerates valid outfits rather than marking a brief complete directly. `qa-model-report.json` records the routes and counts. Mechanical tests do not establish subjective fun, artwork quality or a platform grade; native UI and public delivery checks are performed separately.
