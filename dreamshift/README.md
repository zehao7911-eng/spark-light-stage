# DREAMSHIFT
An original eight-room browser perspective puzzle, inspired by the forced-perspective idea and surreal hotel interiors of Superliminal. Original rooms and procedural artwork; not the commercial game's story or full free-roaming world.

Pick up a die, pawn or apple. Its apparent angular size is preserved. The distance from the observation position to the target determines its new physical size when placed. Match the golden outlined shape and size. FAR, NEAR and SIDE change observation positions. Some rooms require carrying a held object between positions. Reset restores original object sizes. Hints identify the viewpoint sequence. Completed objects stay locked; all targets open the exit. A saved archive records the fewest grabs and permits replay.

Desktop: tap/click an object then a target, or drag. Keys 1/2/3 change position, H shows hint, R resets, Escape cancels a held object.
Mobile: tap or drag, with three observation buttons. Portrait and landscape responsive UI, capped pixel ratio, one 1024px shadow map and no external asset requests. WebGL is required; graphics context failure has an explicit retry screen.

ZIP index.html is standalone and includes the Three.js runtime, CSS, rules and artwork. It works offline from a file; browser local storage availability may vary. Three.js r147 MIT attribution is in THREE-LICENSE.txt. Audio is synthesized after interaction; sound toggle available. No commercial assets, model files, external fonts or image-generation services.
