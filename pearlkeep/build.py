from pathlib import Path
import json,re
p=Path(__file__).parent
frames=json.loads((p/'assets/frames-1026b.json').read_text(encoding='utf8'))
parts=['/* Pearlkeep. Source adaptations licensed GPL-2.0; see LICENSE.txt and SOURCE.md. */\n(()=>{\n"use strict";\nconst FRAMES='+json.dumps(frames)+';']
for n in ['source-engine.js','model.js','art.js','game.js']:
 s=(p/n).read_text(encoding='utf-8-sig');s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'^export \{.*?\};?\s*','',s,flags=re.M);s=re.sub(r'\bexport (?=(const|function|class)\b)','',s);parts.append(s)
parts.append('})();\n');(p/'app-1026b.js').write_text('\n'.join(parts),encoding='utf8')
print('Built app-1026b.js:',(p/'app-1026b.js').stat().st_size)
