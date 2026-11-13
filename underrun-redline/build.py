"""Dependency-free source concatenation. Run from this folder or any working directory."""
from pathlib import Path
root=Path(__file__).resolve().parent
files=['source/game.js','source/random.js','source/renderer.js','source/entity.js','source/entity-player.js','source/entity-plasma.js','source/entity-spider.js','source/entity-sentry.js','source/entity-particle.js','source/entity-explosion.js','redline.js']
text='/* UNDERRUN REDLINE. Engine and original art (c) Dominic Szablewski 2018, MIT. See LICENSE-UNDERRUN.md. */\n'
for name in files:text+='\n/* FILE: '+name+' */\n'+(root/name).read_text(encoding='utf-8-sig')+'\n;\n'
(root/'game.bundle.js').write_text(text,encoding='utf-8')
print('Bundled',len(files),'source files;',len(text.encode('utf-8')),'bytes')
