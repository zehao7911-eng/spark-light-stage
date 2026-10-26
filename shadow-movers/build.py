from pathlib import Path
import hashlib,re,json,zipfile,subprocess
root=Path(__file__).resolve().parent
app=b''.join(re.sub(rb'\?v=[a-f0-9]{12}',b'',(root/n).read_bytes()) for n in ['app.js','index.html','style.css'])
version=hashlib.sha256(b''.join(p.read_bytes() for p in sorted((root/'assets').iterdir()) if p.is_file())+(root/'core.js').read_bytes()+(root/'art.js').read_bytes()+app).hexdigest()[:12]
for name in ['index.html','style.css','app.js']:
 p=root/name;s=p.read_text(encoding='utf8');s=re.sub(r'\?v=[a-f0-9]{12}','',s)
 if name=='index.html':s=re.sub(r'(href|src)="([^"?]+\.(?:js|css|png|webp))"',lambda m:m[1]+'="'+m[2]+'?v='+version+'"',s)
 elif name=='style.css':s=s.replace('assets/Kalam-Regular.ttf)','assets/Kalam-Regular.ttf?v='+version+')')
 elif name=='app.js':
  s=s.replace("fetch('assets/atlas.json')","fetch('assets/atlas.json?v="+version+"')").replace("+'.webp';","+'.webp?v="+version+"';")
 p.write_text(s,encoding='utf8')
result=subprocess.run(['C:/Users/Gigabyte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe',str(root/'tests.cjs')],capture_output=True,text=True,check=True)
report=json.loads(result.stdout);(root/'verification.json').write_text(json.dumps(report,indent=2),encoding='utf8')
archive=root.parent/'SHADOW-MOVERS.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(p.relative_to(root).as_posix(),date_time=(2026,10,26,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,p.read_bytes())
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
print(json.dumps({'version':version,'tests':report['checks'],'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}))
