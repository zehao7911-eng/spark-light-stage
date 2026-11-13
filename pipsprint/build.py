from pathlib import Path
import re,json,hashlib,zipfile
root=Path(__file__).resolve().parent
html=(root/'index-source.html').read_text(encoding='utf-8-sig')
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text(encoding='utf-8-sig')+'</style>')
def embed(m):
    return '<script>'+(root/m[1]).read_text(encoding='utf-8-sig').replace('</script','<\\/script')+'</script>'
html=re.sub(r'<script src="([^"]+)"></script>',embed,html)
for name in ['index.html','standalone.html']:(root/name).write_text(html,encoding='utf-8')
files=sorted(p for p in root.rglob('*') if p.is_file() and p.name!='SHA256.json' and '__pycache__' not in p.parts)
manifest={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
(root/'SHA256.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
out=root.parent/'PIPSPRINT.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in files+[root/'SHA256.json']:
        i=zipfile.ZipInfo('pipsprint/'+p.relative_to(root).as_posix(),(2026,10,29,0,0,0));i.compress_type=zipfile.ZIP_DEFLATED;z.writestr(i,p.read_bytes(),compresslevel=9)
with zipfile.ZipFile(out) as z:assert z.testzip() is None
print(json.dumps({'files':len(files)+1,'zipBytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()}))

