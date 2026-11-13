from pathlib import Path
import re,zipfile,json,hashlib
r=Path(__file__).resolve().parent
parts=[]
for name in ['engine.mjs','art.mjs','sdk.mjs','app.mjs']:
 s=(r/name).read_text('utf8');s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport\s+','',s)
 if name=='art.mjs':s='const PitchArt=(()=>{'+s+';return PitchArt;})();'
 elif name=='engine.mjs':s='const E=(()=>{'+s+';return {CUPS,makeRun,begin,tick,aim,shotFor,ballAt,profile,mergeProfiles,restore,result,record,starTotal,unlocked,grantReward};})();const {CUPS,makeRun,begin,tick,aim,shotFor,ballAt,profile,mergeProfiles,restore,result,record,starTotal,unlocked,grantReward}=E;'
 parts.append(s)
html=(r/'index-source.html').read_text('utf8').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text('utf8')+'</style>').replace('<script type="module" src="app.mjs"></script>','<script>(()=>{'+''.join(parts)+'})();</script>')
(r/'index.html').write_text(html,'utf8');(r/'standalone.html').write_text(html,'utf8')
zpath=r.parent/'NOPE-FC.zip'
with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in sorted(r.rglob('*')):
  if p.is_file():z.write(p,p.relative_to(r).as_posix())
out={'bytes':zpath.stat().st_size,'sha256':hashlib.sha256(zpath.read_bytes()).hexdigest(),'files':len(z.namelist())}
(r.parent/'nope-fc-package.json').write_text(json.dumps(out,indent=2),'utf8');print(json.dumps(out))
