from pathlib import Path
import re,base64
root=Path(__file__).resolve().parent
def wrapped(name,global_name,imports=''):
    source=(root/name).read_text(encoding='utf-8-sig')
    exports=re.findall(r'export\s+(?:function|const)\s+(\w+)',source)
    source=re.sub(r'import\s+[^;]+;','',source)
    source=re.sub(r'\bexport\s+','',source)
    return 'window.'+global_name+'=(()=>{'+imports+source+'\nreturn {'+','.join(exports)+'};})();\n'
code=wrapped('core.mjs','PRESS_C')+wrapped('primitives.mjs','PRESS_P')+wrapped('art.mjs','PRESS_M','const P=window.PRESS_P;')+wrapped('sdk.mjs','PRESS_SDK')
main=re.sub(r'import\s+[^;]+;','',(root/'game.mjs').read_text(encoding='utf-8'))
code+='(()=>{const C=window.PRESS_C,M=window.PRESS_M,bridge=window.PRESS_SDK.bridge;'+main+'\n})();'
html=(root/'index-source.html').read_text(encoding='utf-8')
html=html.replace('<link rel="stylesheet" href="./style.css">','<style>'+(root/'style.css').read_text(encoding='utf-8')+'</style>')
icon='data:image/svg+xml;base64,'+base64.b64encode((root/'assets/icon.svg').read_bytes()).decode()
html=html.replace('./assets/icon.svg',icon)
html=html.replace('<script src="./vendor/three.min.js"></script><script type="module" src="./game.mjs"></script>','<script>'+(root/'vendor/three.min.js').read_text(encoding='utf-8').replace('</script','<\\/script')+'</script><script>'+code.replace('</script','<\\/script')+'</script>')
for name in ['index.html','standalone.html']:(root/name).write_text(html,encoding='utf-8')
print({'entryBytes':len(html.encode()),'standaloneEqual':True})
