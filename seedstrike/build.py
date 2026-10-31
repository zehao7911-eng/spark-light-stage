from pathlib import Path
import json,re,zipfile,hashlib,base64
root=Path(__file__).resolve().parent
atlas=json.loads((root/'assets/atlas.json').read_text('utf8'))
for m in atlas.values():
 bounds=[c['visible'] for c in m['cells'] if c['visible']];m['common']=[min(b[0] for b in bounds),min(b[1] for b in bounds),max(b[2] for b in bounds),max(b[3] for b in bounds)]
(root/'atlas.mjs').write_text('export const ATLAS='+json.dumps(atlas,separators=(',',':'))+';\n',encoding='utf8')
model=(root/'model.mjs').read_text('utf8');game=(root/'game.mjs').read_text('utf8');html=(root/'index-source.html').read_text('utf8');css=(root/'style.css').read_text('utf8')
names=re.search(r"import \{(.*?)\} from './model.mjs';",game).group(1)
game=re.sub(r'^import .*?;\s*','',game,flags=re.M);model=re.sub(r'\bexport\s+','',model)
prefix='const SeedModel=(()=>{\n'+model+'\nreturn {'+names+'};\n})();\nconst {'+names+'}=SeedModel;\nconst ATLAS='+json.dumps(atlas,separators=(',',':'))+';\n'
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('<script type="module" src="game.mjs"></script>','<script>\n(()=>{\n'+prefix+game+'\n})();\n</script>')
(root/'index.html').write_text(html,encoding='utf8');(root/'standalone.html').write_text(html,encoding='utf8')
data=base64.b64encode((root/'assets/plant_pea.webp').read_bytes()).decode()
(root/'assets/icon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256"><rect x="3" y="3" width="250" height="250" rx="58" fill="#e4f6b7" stroke="#527e2a" stroke-width="6"/><circle cx="128" cy="133" r="100" fill="#9dd55c"/><image x="17" y="17" width="222" height="222" xlink:href="data:image/webp;base64,'+data+'"/></svg>',encoding='utf8')
zpath=root.parent/'SEEDSTRIKE.zip'
with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(p.relative_to(root).as_posix(),date_time=(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
report={'title':'SEEDSTRIKE','bytes':zpath.stat().st_size,'sha256':hashlib.sha256(zpath.read_bytes()).hexdigest(),'files':len([p for p in root.rglob('*') if p.is_file()])}
(root.parent/'seedstrike-package.json').write_text(json.dumps(report,indent=2),encoding='utf8');print(json.dumps(report))
