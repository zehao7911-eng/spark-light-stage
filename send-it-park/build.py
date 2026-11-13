from pathlib import Path
import re,json,zipfile,hashlib
r=Path(__file__).resolve().parent
engine=(r/'engine.mjs').read_text('utf8');view=(r/'view.mjs').read_text('utf8');app=(r/'app.mjs').read_text('utf8')
names=re.search(r"import \{(.*?)\} from './engine.mjs';",app).group(1)
engine=re.sub(r'\bexport\s+','',engine)
view=re.sub(r'^import .*?;\s*','',view,flags=re.M);view=re.sub(r'\bexport\s+','',view)
app=re.sub(r'^import .*?;\s*','',app,flags=re.M)
code='(()=>{const E=(()=>{'+engine+';return{'+names+'};})();const{'+names+'}=E;const{Park}=(()=>{'+view+';return{Park};})();'+app+'})();'
html=(r/'index-source.html').read_text('utf8').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text('utf8')+'</style>').replace('<script src="vendor/three.min.js"></script>','<script>'+(r/'vendor/three.min.js').read_text('utf8')+'</script>').replace('<script type="module" src="app.mjs"></script>','<script>'+code+'</script>')
(r/'index.html').write_text(html,encoding='utf8');(r/'standalone.html').write_text(html,encoding='utf8')
zpath=r.parent/'SEND-IT-PARK.zip'
with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in sorted(r.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(p.relative_to(r).as_posix(),(2026,11,2,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
data={'bytes':zpath.stat().st_size,'sha256':hashlib.sha256(zpath.read_bytes()).hexdigest(),'files':len(z.namelist())};(r.parent/'send-it-park-package.json').write_text(json.dumps(data,indent=2),encoding='utf8');print(json.dumps(data))
