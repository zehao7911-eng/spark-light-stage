from pathlib import Path
import re,zipfile,json,hashlib,subprocess
root=Path(__file__).resolve().parent
html=(root/'index-source.html').read_text('utf8');css=(root/'style.css').read_text('utf8');model=(root/'model.mjs').read_text('utf8');game=(root/'game.mjs').read_text('utf8')
imports=re.search(r"^import \{(.*?)\} from './model.mjs';",game,re.M).group(1)
model=re.sub(r'\bexport\s+','',model);game=re.sub(r"^import .*?from './model.mjs';\s*",'',game,count=1,flags=re.M)
# Preserve module-private scopes. Model serve(state) and UI serve() are distinct.
isolated='const NightglideModel=(()=>{\n'+model+'\nreturn {'+imports+'};\n})();\nconst {'+imports+'}=NightglideModel;\n'
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('<script type="module" src="game.mjs"></script>','<script>\n(()=>{\n'+isolated+'\n'+game+'\n})();\n</script>')
(root/'index.html').write_text(html,encoding='utf8');(root/'standalone.html').write_text(html,encoding='utf8')
out=root.parent/'NIGHTGLIDE.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():
   i=zipfile.ZipInfo(p.relative_to(root).as_posix(),date_time=(2026,10,31,0,0,0));i.compress_type=zipfile.ZIP_DEFLATED;i.external_attr=0o100644<<16;z.writestr(i,p.read_bytes())
with zipfile.ZipFile(out) as z:assert z.testzip() is None
report={'title':'NIGHTGLIDE','bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'files':len([p for p in root.rglob('*') if p.is_file()])}
(root.parent/'nightglide-package.json').write_text(json.dumps(report,indent=2),encoding='utf8');print(json.dumps(report))
