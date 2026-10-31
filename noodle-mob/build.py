"""Reproducible root-index HTML5 game ZIP; Python standard library only."""
import hashlib, json, pathlib, re, zipfile
root=pathlib.Path(__file__).resolve().parent
runtime=['compat.js','style.css','levels.js','core.js','art-data.js','art.js','app.js']
h=hashlib.sha256()
for name in runtime:h.update((root/name).read_bytes())
for p in sorted((root/'assets').glob('*')):h.update(p.name.encode());h.update(p.read_bytes())
stamp=h.hexdigest()[:12]
html=(root/'index.html').read_text(encoding='utf-8-sig')
html=re.sub(r'((?:src|href)="(?:assets/icon\.webp|style\.css|compat\.js|levels\.js|core\.js|art-data\.js|art\.js|app\.js))(?:\?v=[a-f0-9]+)?"',lambda m:m[1]+'?v='+stamp+'"',html)
(root/'index.html').write_text(html,encoding='utf-8',newline='\n')
archive=root.parent/'NOODLE-MOB.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in sorted(root.rglob('*')):
        if not p.is_file() or '__pycache__' in p.parts or p.suffix in ['.zip','.pyc']:continue
        info=zipfile.ZipInfo(p.relative_to(root).as_posix(),(2026,10,31,0,0,0))
        info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
        z.writestr(info,p.read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
print(json.dumps({'archive':str(archive),'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'stamp':stamp}))
