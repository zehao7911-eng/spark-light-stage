import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync,existsSync} from 'node:fs';
const root=new URL('../',import.meta.url),html=readFileSync(new URL('index.html',root),'utf8');
const code=html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1];
function boot(){const ctx=vm.createContext({});vm.runInContext(code,ctx);return str=>vm.runInContext(str,ctx);}
test('English content, item pools, classes and floor coverage',()=>{
 const ev=boot();const counts=JSON.parse(ev('JSON.stringify([Object.values(IT).filter(d=>!d.mon).length,Object.keys(EN).length,Object.keys(CL).length,FL.length])'));
 assert.deepEqual(counts,[52,36,4,6]);
 const texts=JSON.parse(ev(`JSON.stringify([...Object.values(IT).flatMap(d=>[d.name,d.desc(0),d.desc(1)]),...Object.values(EN).map(e=>e.n),...Object.values(CL).flatMap(c=>[c.n,c.d,c.skd]),...Object.values(ST).flatMap(s=>[s.n,s.d]),...FL.flatMap(f=>[f.n,f.s,f.l])])`));
 for(const text of texts){assert.equal(typeof text,'string');assert(text.trim());assert(!/[가-힣]/.test(text),text);assert(!/undefined|NaN/.test(text),text);}
});
test('All 104 player item and upgrade states activate without corrupting combat',()=>{
 const ev=boot();const ids=JSON.parse(ev('JSON.stringify(Object.values(IT).filter(d=>!d.mon).map(d=>d.id))'));
 for(const id of ids)for(const u of [0,1]){
  ev(`var __fire=0;onEvent(t=>{if(t==='fire')__fire++});setRng(seededRng(17));S=createRun('warrior',0);S.eq=[{id:'${id}',u:${u}}];createCombat('normal','ogre');S.combat.phase='player';S.combat.E.hp=S.combat.E.maxhp=100000;S.hp=30;S.combat.dice=[];S.combat.nid=1000`);
  for(let k=0;k<12&&ev('__fire')===0;k++){
   let value=0;for(let v=6;v>=1;v--)if(ev(`canPlace(0,${v})>=0`)){value=v;break;}
   assert(value>0,`${id}+${u}: no valid die before activation`);
   ev(`{const d={id:S.combat.nid++,v:${value}};S.combat.dice.push(d);putDie(0,d.id)}`);
  }
  assert(ev('__fire')>0,`${id}+${u}: did not activate`);
  assert(ev('Number.isFinite(S.hp)&&S.hp>=0&&S.hp<=S.maxhp'),id);
  assert(ev('Number.isFinite(S.combat.E.hp)&&Number.isFinite(S.combat.E.block)'),id);
  assert(ev('S.combat.dice.every(d=>Number.isInteger(d.v)&&d.v>=1&&d.v<=6)'),id);
  assert(ev('parseSave(JSON.stringify(S)).s!==null'),id);
 }
});
test('Bundled artwork, fonts, notices and offline entry have no missing dependencies',()=>{
 for(const file of ['characters.webp','stage.webp','polish.css','Kalam-Regular.ttf','FONT-LICENSE.txt','UPSTREAM-LICENSE.txt','upstream-original.txt'])assert(existsSync(new URL(file,root)),file);
 assert(html.includes('lang="en"'));
 assert(!html.includes('serviceWorker.register'));
 assert(!/<script[^>]+src="https?:/i.test(html));
 assert(html.includes('https://github.com/jeiel85/fortuna-dice-show'));
 const license=readFileSync(new URL('UPSTREAM-LICENSE.txt',root),'utf8');assert(license.includes('MIT License')&&license.includes('jeiel85'));
});
