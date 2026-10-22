# Reference provenance

The installed open-source-game-reference skill located HexGL under Browser-Based / Racing in the user's Awesome Open Source Games snapshot (catalog line180). The supplied catalog is a link directory, not bundled game source.

Selected repository: https://github.com/BKcore/HexGL
Inspected commit:6addc95a2fce3bf05f4d751823cc054c61a16d68
Inspected README,LICENSE,index.html,bkcore/hexgl/Gameplay.js,ShipControls.js,HexGL.js and tracks/Cityscape.js.

The reference uses a JavaScript/Three.js entry point and track-specific collision/booster maps. Gameplay.js handles countdown,lap timing/checkpoint transitions,finish/destroy results and replay. ShipControls.js separates thrust/air resistance/steering,boost decay,collision speed loss and shield damage. These ideas informed the independent timed-lap/boost/shield loop, rather than a direct code port.

Licensing distinction: the current repository README/root license describe MIT unless a file specifies otherwise; several inspected JavaScript files still carry Creative Commons Attribution-NonCommercial3.0 header notices. No source code or assets from those files are copied into AEROLITH. The implementation is original GDScript with procedurally generated art/audio, three different analytical courses, simplified lane-guided steering and a new UI. No claim of exact HexGL reproduction, current popularity or official affiliation is made.

The catalog's CC0 license applies to its listing text, not automatically to every linked project or asset. The local downloaded reference files remain outside the exported project/archive and were read, not executed.
