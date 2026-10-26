"""Dependency-free reproducible content-versioned HTML5 bundle builder."""
from pathlib import Path
import json,hashlib,re
root=Path(__file__).resolve().parent
atlas=json.loads((root/'assets/atlas.json').read_text(encoding='utf-8'))['rects']
asset=hashlib.sha256(b''.join(p.read_bytes() for p in sorted((root/'assets').glob('*')) if p.suffix in ['.webp','.png'])).hexdigest()[:10]
text='/* BONKFORGE; complete Whack-A-Mole controller adaptation, MIT Christopher Scott Hernandez 2010. See credits.html. */\n'
text+='globalThis.BONK_ATLAS='+json.dumps(atlas,separators=(',',':'))+';\nglobalThis.BONK_ASSET_VERSION='+json.dumps(asset)+';\n'
for n in ['core.js','art.js','game.js']:text+='\n/* '+n+' */\n'+re.sub(r'(assets/help-[a-z]+\.webp)(?!\?)',lambda m:m[1]+'?v='+asset,(root/n).read_text(encoding='utf-8'))+'\n;\n'
(root/'bonk.bundle.js').write_text(text,encoding='utf-8')
style_text=(root/'style.css').read_text(encoding='utf-8');style_text=re.sub(r'url\(assets/cover\.webp(?:\?[^)]*)?\)','url(assets/cover.webp?v='+asset+')',style_text);(root/'style.css').write_text(style_text,encoding='utf-8')
version=hashlib.sha256(text.encode()).hexdigest()[:10];style=hashlib.sha256((root/'style.css').read_bytes()).hexdigest()[:10]
html=(root/'index.html').read_text(encoding='utf-8');html=re.sub(r'<script src="bonk.bundle.js[^\"]*"></script>','',html)
html=re.sub(r'href="style.css[^\"]*"','href="style.css?v='+style+'"',html)
html=re.sub(r'(assets/(?:icon-192.png|cover.webp))(?:\?[^\" ]*)?',lambda m:m[1]+'?v='+asset,html)
html=html.replace('</body>','<script src="bonk.bundle.js?v='+version+'"></script></body>');(root/'index.html').write_text(html,encoding='utf-8')
print(json.dumps({'bundle':len(text.encode()),'version':version,'art':asset}))
