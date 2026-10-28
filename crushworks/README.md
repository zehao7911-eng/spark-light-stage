# CRUSHWORKS — Material Lab

A small, tactile hydraulic-press collection game for browser, touch and keyboard. All geometry, surfaces and sound effects are generated locally in code. No network dependencies, generated images, accounts, purchases or backend.

## Play

Open `index.html` or `standalone.html` in a modern WebGL-capable browser. Hold the large button (or Space) to lower the press. Release while the pressure needle is inside the green band. A complete press records the specimen; an early release is free to retry. The main button loads the next uncollected object after each result. Swipe the specimen to rotate it before or after pressing.

24 specimens across metal, foam, glass, paper, gummy, chalk, bubble and spring families. Each new specimen unlocks another object. At 6 records, precision mode halves pressure speed; at 12, three machine finishes become available; at 18, Auto Press can complete the archive. Automatic specimens receive at most two quality marks; three marks require manual timing. Revisit any specimen through the archive to improve its score. No timer, lives or currency. Local progress is saved on the same browser and origin.

Mute, pause, fresh specimen, previous/next specimen and archive controls remain available. Switching tabs or cancelling a touch suspends pressure without awarding a result. A restored session never resumes a held input automatically. The lab can be completed at your own pace; archive completion is the collection ending, with 72 manual quality marks as the optional mastery goal.

## Implementation

Three.js r147 (MIT; `LICENSE-THREE.txt`). Original procedural machine, specimen geometry, vertex deformation, bounded fragment proxies, interface, progression and synthesized audio. Deformation is a stylized material simulation, not an engineering-grade soft-body solver. Glass/chalk use bounded fragment proxies; metal/paper retain their deformation and foam/gummy/spring recover their shape. The sample rack displays colored specimen record tokens.

120 Hz bounded simulation; rendering capped at 30 fps; pixel ratio capped at 1.5 on phones and 2 on larger screens; 42 fragments and 52 visual particles maximum; static machine meshes merged by material; no continuing render loop while paused except a requested redraw. No analytics or remote font requests. WebGL support and real-device speed depend on the browser/device.

## Reference and originality

Reference: Rezona's public **Press O Matic / Hydraulic Machine** preview, `https://rezona.ai/game/pgcserver/pv/WUMdrRjf/v5/dist/index.html`. Observed the hold-to-press action, rubber-duck collection change and a soda-can press. This implementation adds its own pressure-release quality rule, 24 original procedural specimens, archive, progression and industrial art direction. No reference game code, models, imagery or audio was copied. No claim is made of source-code reuse from that game. The imported open-source catalog was consulted to check available references; this project is a procedural implementation rather than a reused complete open-source game.

## Build and check

`python build.py` embeds local CSS and JavaScript into both entry files and produces `../CRUSHWORKS.zip` with a root `crushworks/` directory and SHA-256 manifest. `node qa-model.cjs` checks all 24 specimens for perfect releases, early retries, suspend/restore, overpressure, assisted score caps, bounded fragments and single completion events. `model.js`, `world.js`, `game.js`, `style.css` and `index-source.html` are the editable sources. Rebuild after editing.

## License

Original CRUSHWORKS source and assets: MIT; see `LICENSE.txt`. Third-party Three.js remains under its included MIT license. No third-party brand affiliation.
