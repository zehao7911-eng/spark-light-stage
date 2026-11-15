import fs from 'node:fs';
const root=new URL('./',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
const script=['parts.mjs','core.mjs','sdk.mjs','scene.mjs','main.mjs'].map(n=>read(n).replace(/^import .*;\s*$/gm,'').replace(/\bexport /g,'')).join('\n');
const html=read('index-source.html').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('style.css')+'</style>').replace('<link rel="icon" href="icon.svg">',()=>'<link rel="icon" href="data:image/svg+xml,'+encodeURIComponent(read('icon.svg'))+'">').replace('<script src="vendor/three.min.js"></script><script type="module" src="main.mjs"></script>',()=>'<script>'+read('vendor/three.min.js').replace(/<\/script/gi,'<\\/script')+'</script><script type="module">'+script.replace(/<\/script/gi,'<\\/script')+'</script>');
for(const n of ['index.html','standalone.html'])fs.writeFileSync(new URL(n,root),html);
console.log('Built',html.length,'bytes');
