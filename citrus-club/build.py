"""Build a cache-versioned, dependency-free browser bundle. No package installation needed."""
from pathlib import Path
import json,hashlib,re
root=Path(__file__).resolve().parent
meta=json.loads((root/'assets/atlas.json').read_text(encoding='utf-8'))
asset_hash=hashlib.sha256(b''.join((root/'assets'/n).read_bytes() for n in ['table.webp','fruit.webp','props.webp'])).hexdigest()[:10]
text='/* Citrus Club. Webninja MIT; Box2D zlib; physics adapter MIT. See bundled license files. */\n'
text+='globalThis.CITRUS_ATLAS='+json.dumps(meta,separators=(',',':'))+';\nglobalThis.CITRUS_ASSET_VERSION='+json.dumps(asset_hash)+';\n'
for name in ['lib/box2d.js','core.js','art.js','game.js']:text+='\n/* FILE '+name+' */\n'+(root/name).read_text(encoding='utf-8-sig')+'\n;\n'
(root/'citrus.bundle.js').write_text(text,encoding='utf-8')
version=hashlib.sha256(text.encode('utf-8')).hexdigest()[:10];style=hashlib.sha256((root/'style.css').read_bytes()).hexdigest()[:10]
html=(root/'index.html').read_text(encoding='utf-8');html=re.sub(r'href="style\.css(?:\?[^" ]*)?"','href="style.css?v='+style+'"',html)
html=re.sub(r'<script src="(?:lib/box2d\.js|core\.js|art\.js|game\.js|citrus\.bundle\.js(?:\?[^" ]*)?)"></script>','',html)
html=html.replace('</body>','<script src="citrus.bundle.js?v='+version+'"></script></body>');(root/'index.html').write_text(html,encoding='utf-8')
print('Bundle',len(text.encode('utf-8')),'bytes; version',version,'; assets',asset_hash)
