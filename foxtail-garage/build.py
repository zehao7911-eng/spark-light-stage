from pathlib import Path
import hashlib,json,re,zipfile,subprocess,sys
root=Path(__file__).resolve().parent
normalize=lambda b:re.sub(rb'\?v=[a-f0-9]{12}',b'',b).replace(b'\r\n',b'\n').removeprefix(b'\xef\xbb\xbf')
names=['index.html', 'style.css', 'levels.js', 'geometry.js', 'core.js', 'art.js', 'app.js', 'hint-worker.js']
version=hashlib.sha256(b''.join(normalize((root/n).read_bytes()) for n in names)+b''.join(p.read_bytes() for p in sorted((root/'assets').iterdir()))).hexdigest()[:12]
for name in names:
 p=root/name;s=normalize(p.read_bytes()).decode('utf8')
 if name=='index.html':s=re.sub(r'(href|src)="([^"?]+\.(?:js|css|svg|png|webp))"',lambda m:m[1]+'="'+m[2]+'?v='+version+'"',s)
 p.write_text(s,encoding='utf8')
node=sys.argv[1] if len(sys.argv)>1 else 'node'
r=subprocess.run([node,str(root/'tests.cjs')],capture_output=True,text=True,check=True)
(root/'verification.json').write_text(json.dumps(json.loads(r.stdout),indent=2),encoding='utf8')
archive=root.parent/'FOXTAIL-GARAGE.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(p.relative_to(root).as_posix(),date_time=(2026,10,30,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
print(json.dumps({'version':version,'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'tests':json.loads(r.stdout)}))

