from pathlib import Path
import re,zipfile,hashlib,json
r=Path(__file__).resolve().parent
def source(name):
 s=(r/name).read_text('utf8');names=re.findall(r'\bexport\s+(?:function|const|class)\s+(\w+)',s);s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport\s+','',s);return s,names
code=''
for file,alias in [('core.mjs','C'),('primitives.mjs','A'),('models.mjs','V'),('sdk.mjs','S'),('sound.mjs','AU')]:
 s,names=source(file)
 if file=='models.mjs':s='const {COURSES,platforms,coinPlaces}=C;'+s
 code+='const '+alias+'=(()=>{'+s+';return {'+','.join(names)+'};})();'
code+='const {View}=V,{bridge}=S,{Sfx}=AU;'+source('app.mjs')[0]
html=(r/'index-source.html').read_text('utf8').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text('utf8')+'</style>').replace('<script src="vendor/three.min.js"></script>','<script>'+(r/'vendor/three.min.js').read_text('utf8')+'</script>').replace('<script type="module" src="app.mjs"></script>','<script>(()=>{'+code+'})();</script>')
(r/'index.html').write_text(html,'utf8');(r/'standalone.html').write_text(html,'utf8')
out=r.parent/'SPOON-SUMMIT.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,9) as z:
 for f in sorted(r.rglob('*')):
  if f.is_file():z.write(f,f.relative_to(r).as_posix())
d={'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'files':len(z.namelist())};(r.parent/'spoon-summit-package.json').write_text(json.dumps(d,indent=2),'utf8');print(json.dumps(d))
