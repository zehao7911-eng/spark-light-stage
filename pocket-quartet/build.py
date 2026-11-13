from pathlib import Path
import re,base64
r=Path(__file__).resolve().parent
h=(r/'index-source.html').read_text(encoding='utf-8-sig').replace('<link rel="stylesheet" href="style.css">','<style>\n'+(r/'style.css').read_text(encoding='utf-8-sig')+'\n</style>')
icon='data:image/svg+xml;base64,'+base64.b64encode((r/'icon.svg').read_bytes()).decode()
h=h.replace('href="icon.svg"','href="'+icon+'"').replace('src="icon.svg"','src="'+icon+'"')
def inline(m):return '<script>\n'+(r/m[1]).read_text(encoding='utf-8-sig').replace('</script','<\\/script')+'\n</script>'
h=re.sub(r'<script src="([^"]+)"></script>',inline,h)
for name in ['index.html','standalone.html']:(r/name).write_text(h,encoding='utf8')
print('Built '+str(len(h.encode()))+' byte self-contained HTML')
