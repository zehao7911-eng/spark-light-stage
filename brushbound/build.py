from pathlib import Path
import re,json,zipfile,hashlib,subprocess,sys
root=Path(__file__).resolve().parent
node=sys.argv[1] if len(sys.argv)>1 else 'node'
tests=json.loads(subprocess.run([node,str(root/'tests.mjs')],capture_output=True,text=True,encoding='utf-8',check=True).stdout)
source=root/'index-source.html'
if not source.exists():source.write_bytes((root/'index.html').read_bytes())
html=source.read_text('utf-8-sig')
model=re.sub(r'^export\s+','', (root/'model.mjs').read_text('utf-8-sig'),flags=re.M)
game=re.sub(r'^import[^\n]+\n','',(root/'game.mjs').read_text('utf-8-sig'),count=1)
bundle="(()=>{\n'use strict';\n"+model+'\n'+game+'\n})();'
assert '</script' not in bundle.lower()
subprocess.run([node,'-e','new Function(require("fs").readFileSync(0,"utf8"));'],input=bundle,text=True,encoding='utf-8',check=True)
html=html.replace('<link rel="stylesheet" href="style.css">','<style>\n'+(root/'style.css').read_text('utf-8-sig')+'\n</style>')
html=html.replace('<script type="module" src="game.mjs"></script>','<script type="application/json" id="atlasData">'+(root/'assets/atlas.json').read_text('utf-8-sig')+'</script>\n<script>\n'+bundle+'\n</script>')
assert 'type="module"' not in html and 'id="atlasData"' in html
for name in ['index.html','standalone.html']:(root/name).write_text(html,encoding='utf-8')
files=sorted(p for p in root.rglob('*') if p.is_file())
for p in files:
 if p.suffix in ['.html','.mjs','.css','.md','.txt','.json','.py']:
  assert not any('\u4e00'<=c<='\u9fff' for c in p.read_text('utf-8-sig')),p
target=root.parent/'BRUSHBOUND.zip'
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,9) as z:
 for p in files:
  info=zipfile.ZipInfo(p.relative_to(root).as_posix(),(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,p.read_bytes())
with zipfile.ZipFile(target) as z:
 assert z.testzip() is None and 'index.html' in z.namelist()
 for p in files:assert z.read(p.relative_to(root).as_posix())==p.read_bytes()
report={'files':len(files),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'crc':'passed','rootIndex':True,'sourceEquality':True,'englishOnly':True,'bundle':'Classic inline JS/CSS and atlas metadata, local image assets','tests':tests}
(root.parent/'brushbound-package.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report))
