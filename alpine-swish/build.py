from pathlib import Path
import re,json
root=Path(__file__).resolve().parent
order=['engine-1026a/constants.js','engine-1026a/guid.js','engine-1026a/sprite.js','engine-1026a/skier.js','engine-1026a/monster.js','engine-1026a/snowboarder.js','engine-1026a/spriteArray.js','engine-1026a/game.js','engine-1026a/camera.js','run.js','art.js','game.js']
chunks=[]
for name in order:
 s=(root/name).read_text(encoding='utf-8-sig')
 s=re.sub(r'import\s+[^;]+;\s*','',s)
 s=re.sub(r'(?m)^export default [^;]+;?','',s)
 s=s.replace('export const ','const ').replace('export function ','function ').replace('export class ','class ')
 if name.endswith('/guid.js'):s+='\nconst GUID=guid;\n'
 if name=='game.js':s=s.replace("await fetch('./assets/frames-1026a.json').then(q=>q.json())",json.dumps(json.loads((root/'assets/frames-1026a.json').read_text())))
 chunks.append('// Source: '+name+'\n'+s)
(root/'app-1026a.js').write_text("// MIT Daniel Hough2013; original adaptation credits in LICENSE-SKIFREE.txt\n(async()=>{'use strict';\n"+'\n'.join(chunks)+"\n})().catch(e=>console.error(e));\n",encoding='utf8')
print('Bundled bytes',(root/'app-1026a.js').stat().st_size)
