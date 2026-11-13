from pathlib import Path
from PIL import Image
import json,base64,io
root=Path(__file__).resolve().parent.parent;a=root/'assets'
atlas=Image.open(a/'sprites.png').convert('RGBA');atlas.thumbnail((1200,800),Image.Resampling.LANCZOS)
cw,ch=atlas.width//6,atlas.height//4;rects=[]
for row in range(4):
 for col in range(6):
  cell=atlas.crop((col*cw,row*ch,(col+1)*cw,(row+1)*ch));bbox=cell.getchannel('A').point(lambda x:255 if x>12 else 0).getbbox();assert bbox
  rects.append(dict(x=col*cw+bbox[0],y=row*ch+bbox[1],w=bbox[2]-bbox[0],h=bbox[3]-bbox[1]))
buf=io.BytesIO();atlas.save(buf,format='WEBP',quality=91,method=6);raw=buf.getvalue();(a/'sprites.webp').write_bytes(raw)
resources={'sprites':'data:image/webp;base64,'+base64.b64encode(raw).decode()}
ui=Image.open(a/'ui.png').convert('RGBA');uw,uh=ui.size;split=round(uh*.53125)
for name,bounds in [('food',(0,0,uw//2,split)),('laser',(uw//2,0,uw,split)),('quality',(0,split,uw//2,uh)),('drops',(uw//2,split,uw,uh))]:
 im=ui.crop(bounds);bbox=im.getchannel('A').point(lambda x:255 if x>10 else 0).getbbox();assert bbox;im=im.crop(bbox);im.thumbnail((180,180),Image.Resampling.LANCZOS);buf=io.BytesIO();im.save(buf,format='WEBP',quality=91,method=6);encoded=buf.getvalue();(a/('ui-'+name+'.webp')).write_bytes(encoded);resources[name]='data:image/webp;base64,'+base64.b64encode(encoded).decode()
(a/'data.js').write_text('window.AquaImages='+json.dumps(resources)+';window.AquaAtlas='+json.dumps({'rects':rects})+';',encoding='utf-8')
(a/'atlas.json').write_text(json.dumps({'rects':rects},indent=2))
for name,width,quality in [('tank-landscape',1440,88),('tank-portrait',850,88),('logo',850,91)]:
 im=Image.open(a/(name+'.png'));im.thumbnail((width,width*2),Image.Resampling.LANCZOS);im.save(a/(name+'.webp'),quality=quality,method=6)
icon=Image.open(a/'icon.png').convert('RGB')
for s in [32,64,180,192,512]:icon.resize((s,s),Image.Resampling.LANCZOS).save(a/f'icon-{s}.png')
files=['model.js','game.js'];(root/'app.js').write_text('\n;\n'.join('/* '+f+' */\n'+(root/f).read_text(encoding='utf-8') for f in files),encoding='utf-8')
print('Sprite data bytes',(a/'data.js').stat().st_size,'runtime bytes',(root/'app.js').stat().st_size)
