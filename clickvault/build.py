from pathlib import Path
import re,zipfile,json,hashlib
r=Path(__file__).resolve().parent
def module(n):
 s=(r/n).read_text('utf8');names=re.findall(r'\bexport\s+(?:function|const|class)\s+(\w+)',s);s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport\s+','',s);return s,names
code=''
for n,alias in [('core.mjs','C'),('art.mjs','A'),('sdk.mjs','S'),('sound.mjs','AU'),('frame-clock.mjs','FC')]:
 s,names=module(n)
 if n=='art.mjs':s='const {LOCKS}=C;'+s
 code+='const '+alias+'=(()=>{'+s+';return {'+','.join(names)+'};})();'
code+='const {View,drawCurio}=A,{bridge}=S,{Sfx}=AU,{FrameClock}=FC;'+module('app.mjs')[0]
html=(r/'index-source.html').read_text('utf8').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text('utf8')+'</style>').replace('<script type="module" src="app.mjs"></script>','<script>(()=>{'+code+'})();</script>')
for name in ['index.html','standalone.html']:(r/name).write_text(html,'utf8')
out=r.parent/'CLICKVAULT.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,9) as z:
 for f in sorted(r.rglob('*')):
  if f.is_file():z.write(f,f.relative_to(r).as_posix())
d={'files':len(z.namelist()),'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()};(r.parent/'clickvault-package.json').write_text(json.dumps(d,indent=2),'utf8');print(json.dumps(d))
