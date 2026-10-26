from pathlib import Path
root=Path('.')
files=['vendor/underscore.js','vendor/backbone.js','vendor/crafty.js','vendor/graph.js','vendor/astar.js','engine/config.js','setup.js','engine/actor_object.js','engine/tilemap.js','engine/player.js','engine/enemy.js','engine/gfx.js','world.js','game.js']
(root/'app.js').write_text('\n;\n'.join('/* '+f+' */\n'+(root/f).read_text(encoding='utf-8') for f in files),encoding='utf-8')
print('Bundled runtime bytes:',(root/'app.js').stat().st_size)
