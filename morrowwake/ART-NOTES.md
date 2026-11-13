# Art production record

Tool: built-in image_gen (not the API/CLI fallback).

Final asset paths: assets/harbour.webp, assets/friends.png. The background is a WebP conversion of the generated original; no commercial images were used as source assets.

## Background prompt

Production-quality hand-painted 2D point-and-click game background, wide 16:9. Original tiny mechanical harbour built on the back of a huge sleeping moss-covered fish floating in clouds. Frontal side-view, fine graphite and sepia ink outlines, watercolor and gouache, elaborate worn brass pipes, muted teal, moss green and coral roofs. Left crooked cottage workshop and small hatch, middle-left waterwheel and sluice, centre round dark-core brass engine, right crooked signal lighthouse with crane and dark lamp. Continuous readable horizontal path, foreground roots, fish scales and hanging moss, distant islands and airships. Refined dense detail, controlled warm/cool depth. No characters, text, UI, arrows or icons.

## Character-sheet prompt

Two separate full-body original hand-painted adventure characters, transparent background, wide empty gap, equal apparent height and feet baseline, three-quarter facing right. Girl with dark fluffy short hair, coral scarf, moss-green coat, patched ochre satchel and sturdy boots. Friendly squat copper/teal boiler automaton, round glass face with cream eyes, chimney, hinged brass pincers, jointed legs, worn boots and small fern on shoulder. Shared fine sepia linework, watercolor/gouache texture, ochre/teal/coral palette, worn sculpted materials. Entire characters inside frame, no text or ground.

## Final transparency-edit prompt

Preserve both exact characters, pose, clothing details, proportions, side-by-side layout and full-body framing. Remove every part of the brown/black background and coloured background glow. Completely opaque cutout characters on transparent alpha, including the empty gap. Preserve fine scarf and hair alpha, keep all feet visible, no additions or identity changes.

Transparent pixels retain unused RGB in the PNG, as is normal for alpha images. Sprite rendering honours alpha; this was checked in the actual Godot web scene.
