from pathlib import Path
import re,base64
r=Path(__file__).resolve().parent
html=(r/'index-source.html').read_text(encoding='utf-8')
html=html.replace('<link rel="stylesheet" href="style.css">','<style>\n'+(r/'style.css').read_text(encoding='utf-8')+'\n</style>')
def inline(m):
    text=(r/m.group(1)).read_text(encoding='utf-8').replace('</script','<\\/script')
    return '<script>\n'+text+'\n</script>'
icon='data:image/svg+xml;base64,'+base64.b64encode((r/'icon.svg').read_bytes()).decode('ascii')
html=html.replace('href="icon.svg"','href="'+icon+'"').replace('src="icon.svg"','src="'+icon+'"')
html=re.sub(r'<script src="([^"]+)"></script>',inline,html)
for name in ['index.html','standalone.html']:(r/name).write_text(html,encoding='utf-8')
print('Built self-contained HTML: '+str(len(html.encode('utf-8')))+' bytes')
