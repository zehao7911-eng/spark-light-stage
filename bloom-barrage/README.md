# Bloom Barrage

An English-language, mobile-first, one-tap plant defense game. Tap two or more orthogonally touching plants of the same kind. The selected plant shoots the nearest threat automatically. A patch of five hits all three lanes; the permanent Bloom Booster lowers that threshold to four.

## Loop

- No timer and no idle damage. Zombies advance one step only after a successful pop resolves. A single unmatched plant is a harmless invalid tap.
- Five distinct attacks: Pea Popper direct damage, Frost Bud slows a surviving front zombie for two moves, Melon Mortar splashes all enemies in the targeted lane, Fume Shroom pierces the lane, Cactus Cannon adds two damage.
- Four undead types, including cone and bucket protection and football bosses. Four-pose source sprite sheets animate their walk; defeated sprites tumble and fade.
- Three automatic lawnmowers each rescue one breached lane. Hearts cover later breaches. Free hints and three shuffles per garden do not advance the enemy turn.
- Nine sequential gardens, three boss encounters, 27 best-only campaign stars. Earn stars for clearing, using no mower/losing no hearts, and finishing within the shown pop budget. The result identifies missed conditions.
- Spend earned sun on permanent damage, starting-heart and four-plant-barrage upgrades. Upgrades apply to the next garden. Replay unlocked gardens or continue seeded Wild Gardens after Garden9. Enemy count caps at24; the normal stage counter caps at999. The yard artwork is shared, not nine unique illustrated maps.
- H highlights a patch; Tab/Enter operate controls; Escape pauses or closes menus. All essential controls use native accessible HTML buttons. Pause, hidden-page and orientation behavior preserve the current turn. Settings and progress save locally when storage is available.

## Run

Use an ordinary HTTP static server, e.g. `python -m http.server 8080`, in this directory. Open the HTTP URL. No build, server backend, API key, external font or runtime CDN is required. ES modules require HTTP hosting; file:// double-click launch is not supported.

## Verify

`node tools/test.mjs` and `node tools/art-test.mjs`. See VALIDATION.md for the actual automated and native-browser scope.

## Reference and rights

Crush Plant Battle Undead on Rezona, LMfXptZecQ/v9: https://rezona.ai/game/pgcserver/pv/LMfXptZecQ/v9/dist/index.html

The reference title, board and a native successful swap producing24score/5moves/a Peashooter were inspected. No reference completed run is claimed. Bloom Barrage independently implements connected-group popping and turn-based, automatically targeted lane defense instead of importing the reference’s swap-three/plant-upgrade code. Selected public artwork is reused per the project owner’s explicit reference-art direction. No reference executable code or audio is included. Media remains third-party material, separately attributed and excluded from the original-code license.
