# Canopy Call

A compact original HTML5 treetop adventure inspired by the flowing brachiation and painted forest layers of Gibbon: Beyond the Trees (Steam 1837330). All monkey, plant, background, course, UI, sound and gameplay assets here are original code-authored artwork. No commercial source code, screenshots, music or sprites are included. This is a smaller, gentler one-button interpretation, not the reference game's full narrative or moveset.

## Play

Hold the large SWING button, or touch the forest, to catch a nearby vine. While holding, the monkey transfers to the next reachable vine automatically. Release to leap forward/upward and somersault. Hold again to catch the next vine. Keyboard: hold Space to swing, release to leap; R recalls to a safe branch; P/Escape pauses.

Gravity, rope constraints and tangential velocity drive the swing. An assist keeps the continuous grip moving forward. A fall automatically recalls to the most recent 600-unit checkpoint without removing collected fruit or friends. Recall is also available manually. No lives, death screen or lost upgrades. A journey reaches its home tree after roughly 6500–7220 world units; a 150-second rest limit prevents indefinite stalled runs. Rest lets you retry with permanent progress retained.

Three optional friends wait in hanging nests along every journey. Leap before them to reach their higher positions. Collect fruit along the lower swing line. Stars reward finishing, finding all three friends, and avoiding any recall. Seeds buy three levels of longer vine reach and wider fruit/friend attraction. Four fur colors are freely selectable. Six painted groves unlock in sequence; subsequent journeys repeat their visual themes with shifted vine heights. These are remixed courses, not unlimited unique authored environments.

The journal lets you revisit unlocked groves. Switching from an active journey asks before restarting. Your best stars, unlocked grove, seeds, gear, color, sound setting and active world state save locally under canopy-call-v1. Input is released when paused, restored, hidden or interrupted; a paused vine grip is preserved so an interrupted press does not unexpectedly launch the monkey. Clearing browser data resets progress. No data is sent to a server.

## Art and sound

Six dawn/orchid/jade/amber/cloud/moon palettes, glowing sky, layered organic mountains, cached painted tree variants, branch bridges, hanging plants and ferns, flowers, fruit glow, animated body/arms/scarf, leap trails, grip rings, tiny celebration leaves, three friend colors and a reunion at the finish. Original soft plucked tones and a sparse six-note forest motif are synthesized after a user gesture. Audio is muted immediately on pause or hidden tabs; saved mute persists.

## Package and performance

Open index.html directly, or serve this folder using any static HTTP server. No build, login, library, CDN, WebGL, remote image, external font or network connection is required. Canvas2D at DPR capped at 1.5, fixed 60 Hz physics, bounded trails/effects/course arrays, three cached background strips and three cached tree sprites. Pause redraws only on UI/viewport changes. Portrait and landscape layouts have controls at least 44 px; the camera is recomposed on orientation changes. Browser native-touch/viewport emulation cannot certify every physical phone.
