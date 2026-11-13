from pathlib import Path
import re,json,hashlib,zipfile
r=Path(__file__).resolve().parent
s=(r/'index-source.html').read_text(encoding='utf-8-sig').replace('<link rel="stylesheet" href="style.css">','<style>'+(r/'style.css').read_text(encoding='utf-8-sig')+'</style>')
s=re.sub(r'<script src="([^"]+)"></script>',lambda m:'<script>'+(r/m[1]).read_text(encoding='utf-8-sig').replace('</script','<\\/script')+'</script>',s)
(r/'index.html').write_text(s,encoding='utf-8')
files=sorted(p for p in r.rglob('*') if p.is_file() and p.name!='SHA256.json' and '__pycache__' not in p.parts)
manifest={p.relative_to(r).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
(r/'SHA256.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
out=r.parent/'CAPY-COURT.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in files+[r/'SHA256.json']:
  i=zipfile.ZipInfo('capy-court/'+p.relative_to(r).as_posix(),(2026,10,28,0,0,0));i.compress_type=zipfile.ZIP_DEFLATED;z.writestr(i,p.read_bytes(),compresslevel=9)
with zipfile.ZipFile(out) as z:assert z.testzip() is None
print(json.dumps({'files':len(files)+1,'zipBytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()}))
