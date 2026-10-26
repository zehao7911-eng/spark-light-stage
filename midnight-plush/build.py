from pathlib import Path
import re
p=Path(__file__).parent
parts=['/* Midnight Plush. Original implementation. Bundled Three.js MIT. */\n(()=>{\n"use strict";']
for n in ['model.js','scene.js','game.js']:
 s=(p/n).read_text(encoding='utf-8-sig');s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport (?=(const|function|class)\b)','',s);parts.append(s)
parts.append('})();\n');(p/'app-1027a.js').write_text('\n'.join(parts),encoding='utf8');print('built', (p/'app-1027a.js').stat().st_size)
