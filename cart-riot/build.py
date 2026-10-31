from pathlib import Path
import re,json,zipfile,hashlib
r=Path(__file__).resolve().parent
model=(r/'model.mjs').read_text('utf8');scene=(r/'scene.mjs').read_text('utf8');game=(r/'game.mjs').read_text('utf8')
names=re.search(r"import \{(.*?)\} from './model.mjs';",game).group(1)
model=re.sub(r'\bexport\s+','',model)
scene=re.sub(r'^import .*?;\s*','',scene,flags=re.M);scene=re.sub(r'\bexport\s+','',scene)
game=re.sub(r'^import .*?;\s*','',game,flags=re.M)
code='(()=>{const M=(()=>{'+model+';return{'+names+'};})();const{'+names+'}=M;const{GameScene}=(()=>{'+scene+';return{GameScene};})();'+game+'})();'
html=(r/'index-source.html').read_text('utf8').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text('utf8')+'</style>')
html=html.replace('<script src="vendor/three.min.js"></script>','<script>'+(r/'vendor/three.min.js').read_text('utf8')+'</script>').replace('<script type="module" src="game.mjs"></script>','<script>'+code+'</script>')
(r/'index.html').write_text(html,encoding='utf8');(r/'standalone.html').write_text(html,encoding='utf8')
zpath=r.parent/'CART-RIOT.zip'
with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in sorted(r.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(p.relative_to(r).as_posix(),(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
data={'bytes':zpath.stat().st_size,'sha256':hashlib.sha256(zpath.read_bytes()).hexdigest(),'files':len(z.namelist())};(r.parent/'cart-riot-package.json').write_text(json.dumps(data,indent=2),encoding='utf8');print(json.dumps(data))
