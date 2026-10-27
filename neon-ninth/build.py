from pathlib import Path
import re,hashlib,json,zipfile
root=Path(__file__).resolve().parent
html=(root/'index-source.html').read_text(encoding='utf-8')
css=(root/'style.css').read_text(encoding='utf-8')
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>')
def script(m):
    text=(root/m[1]).read_text(encoding='utf-8').replace('</script','<\\/script')
    return '<script>'+text+'</script>'
html=re.sub(r'<script src="([^"]+)"></script>',script,html)
for name in ['standalone.html','index.html']:(root/name).write_text(html,encoding='utf-8')
files=sorted(p for p in root.rglob('*') if p.is_file() and p.name!='SHA256.json' and '__pycache__' not in p.parts)
manifest={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
(root/'SHA256.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
archive=root.parent/'NEON-NINTH.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in files+[root/'SHA256.json']:
        info=zipfile.ZipInfo('neon-ninth/'+p.relative_to(root).as_posix(),(2026,10,27,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,p.read_bytes(),compresslevel=9)
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
print(json.dumps({'files':len(files)+1,'zipBytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}))
