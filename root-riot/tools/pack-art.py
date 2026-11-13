from PIL import Image
import pathlib,json,base64,io
P=pathlib.Path('assets');resources={};meta={}
for name,cols,rows in [('rabbit-walk',4,4),('rival-walk',4,4),('rabbit-actions',4,2),('props',4,2)]:
 im=Image.open(P/(name+'.png')).convert('RGBA');target=(512,768) if rows==4 else ((768,576) if name=='props' else (640,480));im=im.resize(target,Image.Resampling.LANCZOS);w,h=im.size;cw=w//cols;ch=h//rows;rects=[]
 for row in range(rows):
  for col in range(cols):
   cell=im.crop((col*cw,row*ch,(col+1)*cw,(row+1)*ch));bbox=cell.getchannel('A').point(lambda a:255 if a>8 else 0).getbbox();assert bbox is not None
   rects.append({'sx':col*cw+bbox[0],'sy':row*ch+bbox[1],'w':bbox[2]-bbox[0],'h':bbox[3]-bbox[1],'localX':bbox[0],'localY':bbox[1],'bottom':bbox[3]})
 out=io.BytesIO();im.save(out,format='WEBP',quality=91,method=6);data=out.getvalue();(P/(name+'.webp')).write_bytes(data);resources[name]='data:image/webp;base64,'+base64.b64encode(data).decode();meta[name]={'cellWidth':cw,'cellHeight':ch,'cols':cols,'rows':rows,'baseline':max(r['bottom'] for r in rects),'rects':rects};print(name,im.size,len(data))
for name,maxw,quality in [('cover',800,88),('hero-master',700,90),('field',768,88),('icon-1024',512,90)]:
 im=Image.open(P/(name+'.png'));im.thumbnail((maxw,maxw*2));out=io.BytesIO();im.save(out,format='WEBP',quality=quality,method=6);data=out.getvalue();(P/(name+'.webp')).write_bytes(data);resources[name]='data:image/webp;base64,'+base64.b64encode(data).decode()
icon=Image.open(P/'icon-1024.png').convert('RGB')
for size in [16,32,64,180,192,512]:icon.resize((size,size),Image.Resampling.LANCZOS).save(P/f'icon-{size}.png')
# Social sharing: genuine cover artwork fitted uncropped on a coordinated forest background.
cover=Image.open(P/'cover.png').convert('RGB');share=Image.new('RGB',(1200,630),'#15452a');res=cover.copy();res.thumbnail((420,630));share.paste(res,(390,0));iconSmall=icon.resize((310,310));share.paste(iconSmall,(35,160));share.paste(iconSmall,(855,160));share.save(P/'share-cover.jpg',quality=90)
(P/'data.js').write_text('window.RootImages='+json.dumps(resources,separators=(',',':'))+';window.RootAtlas='+json.dumps(meta,separators=(',',':'))+';',encoding='utf-8')
(P/'atlas.json').write_text(json.dumps(meta,indent=2))
print('Embedded artwork bytes',(P/'data.js').stat().st_size)
