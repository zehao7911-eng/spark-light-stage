import pathlib,json,hashlib
root=pathlib.Path('.')
for f in ['config','actor_object','tilemap','player','enemy','gfx']:
 s=(root/'upstream'/ (f+'.js')).read_text()
 if f=='tilemap':
  s=s.replace('var type = Crafty.math.randomInt(1, 6);', 'var preset = window.RootPreset && window.RootPreset[i]; var type = preset ? preset.type : Crafty.math.randomInt(1, 6);')
  s=s.replace("ox = Crafty.math.randomInt(model.get('spawnArea').left, model.get('spawnArea').right);", "ox = preset ? preset.x : Crafty.math.randomInt(model.get('spawnArea').left, model.get('spawnArea').right);",1)
  s=s.replace("oy = Crafty.math.randomInt(model.get('spawnArea').top, model.get('spawnArea').bottom);", "oy = preset ? preset.y : Crafty.math.randomInt(model.get('spawnArea').top, model.get('spawnArea').bottom);",1)
  s=s.replace('carrotsCoordsQueue.pop();','carrotsCoordsQueue.shift();')
 if f=='gfx':s=s.replace('MagicPush: function(origin) {\n        this._anim', 'MagicPush: function(origin) {\n        var controller=this;\n        this._anim',1).replace('this.destroy();\n            });','this.destroy(); controller.destroy();\n            });',1)
 (root/'engine'/(f+'.js')).write_text(s,encoding='utf-8')
