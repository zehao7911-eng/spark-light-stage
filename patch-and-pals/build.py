from pathlib import Path
import zipfile, hashlib, json, subprocess, sys
root=Path(__file__).resolve().parent
node=sys.argv[1] if len(sys.argv)>1 else 'node'
tests=json.loads(subprocess.run([node,str(root/'tests.mjs')],capture_output=True,text=True,check=True,encoding='utf-8').stdout)
target=root.parent/'PATCH-AND-PALS.zip'
files=sorted(p for p in root.rglob('*') if p.is_file())
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in files:
  info=zipfile.ZipInfo(p.relative_to(root).as_posix(),(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16
  z.writestr(info,p.read_bytes())
with zipfile.ZipFile(target) as z:
 assert z.testzip() is None and 'index.html' in z.namelist()
 for p in files:assert z.read(p.relative_to(root).as_posix())==p.read_bytes()
report={'files':len(files),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'crc':'passed','root_index':True,'source_equality':True,'tests':tests}
(root.parent/'patch-and-pals-package.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report))
