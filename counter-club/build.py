from pathlib import Path
import re,zipfile
r=Path(__file__).resolve().parent
parts=[]
for name in ['engine.mjs','art.mjs','sdk.mjs','app.mjs']:
 s=(r/name).read_text('utf-8-sig');s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport\s+','',s)
 if name=='engine.mjs':s='const E=(()=>{'+s+';return {RIVALS,makeRun,begin,block,duck,punch,tick,stars,profile,unlocked,record,mergeProfiles,restore};})();const {RIVALS,makeRun,begin,block,duck,punch,tick,stars,profile,unlocked,record,mergeProfiles,restore}=E;'
 if name=='art.mjs':s='const RingArt=(()=>{'+s+';return RingArt;})();'
 parts.append(s)
html=(r/'index-source.html').read_text('utf-8-sig').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text('utf-8-sig')+'</style>').replace('<script type="module" src="app.mjs"></script>','<script>(()=>{'+''.join(parts)+'})();</script>')
(r/'index.html').write_text(html,'utf8');(r/'standalone.html').write_text(html,'utf8')
with zipfile.ZipFile(r.parent/'COUNTER-CLUB.zip','w',zipfile.ZIP_DEFLATED,9) as z:
 for p in sorted(r.rglob('*')):
  if p.is_file():z.write(p,p.relative_to(r).as_posix())
print('Built inline HTML and ZIP')
