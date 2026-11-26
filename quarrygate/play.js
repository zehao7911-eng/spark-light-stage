'use strict';
const $=id=>document.getElementById(id), board=$('board'),cells=[],tokens=[];
const key='quarrygate-v1',names=['Amber Inlet','Rose Strait','Moon Channel'];
let record={wins:0,rewards:{}},game,mode='walk',vertical=false,worker,timer,audio,muted=false;
try{Object.assign(record,JSON.parse(localStorage.getItem(key))||{})}catch{}
function persist(p){record.wins=Math.max(record.wins||0,Math.min(99999,Number(p.wins)||0));record.rewards={...record.rewards,...p.rewards};try{localStorage.setItem(key,JSON.stringify(record))}catch{}}
const host=bridge({read:()=>({...record}),write:persist});
function note(f,delay=0){if(muted)return;try{audio??=new AudioContext();const osc=audio.createOscillator(),gain=audio.createGain(),t=audio.currentTime+delay;osc.type='sine';osc.frequency.setValueAtTime(f,t);gain.gain.setValueAtTime(.095,t);gain.gain.exponentialRampToValueAtTime(.001,t+.24);osc.connect(gain).connect(audio.destination);osc.start(t);osc.stop(t+.25)}catch{}}
for(let r=0;r<9;r++)for(let c=0;c<9;c++){let el=document.createElement('button');el.className='cell';el.ariaLabel='Tile '+(r+1)+', '+(c+1);el.onclick=()=>choose(r,c);board.append(el);cells.push(el)}
for(const [i,s] of ['◆','▲'].entries()){let e=document.createElement('div');e.className='token '+(i?'rival':'');e.textContent=s;board.append(e);tokens.push(e)}
let stage=0;
function render(){let mine=!game.winner&&game.pawnOfTurn.index===0;
 cells.forEach((b,i)=>{let r=Math.floor(i/9),c=i%9,usable=mine&&(mode==='walk'?game.validNextPositions[r][c]:r<8&&c<8&&game.validNextWalls[vertical?'vertical':'horizontal'][r][c]);b.className='cell'+(usable?(mode==='walk'?' lit':' slot'+(vertical?' vert':'')):'');b.disabled=!usable});
 game.board.pawns.forEach((p,i)=>{tokens[i].style.left=(p.position.col+.5)*100/9+'%';tokens[i].style.top=(p.position.row+.5)*100/9+'%'});
 $('walk').classList.toggle('active',mode==='walk');$('gate').classList.toggle('active',mode==='gate');$('rotate').hidden=mode!=='gate'||!mine;$('gate').disabled=!mine||!game.board.pawns[0].numberOfLeftWalls;$('walk').disabled=!mine;$('again').hidden=!game.winner;
 $('chapter').textContent=names[stage].toUpperCase();$('count').textContent=game.board.pawns[0].numberOfLeftWalls+' GATES';$('hint').textContent=game.winner?(game.winner.index===0?'The crossing is yours!':'Your rival crossed first.'):!mine?'Your rival is thinking…':mode==='walk'?'Reach the far shore.':'Place a two-tile gate.';
 $('tip').textContent=game.winner?record.wins+' crossings won':mode==='walk'?'Tap a green dot to step. Use gates to make a detour.':'Tap a marked tile. The gate starts at its lower-right corner.';
}
function drawWall(move){let v=!!move[2],[r,c]=move[v?2:1],el=document.createElement('i');el.className='wall '+(v?'V':'H');Object.assign(el.style,{left:(c+(v?.95:.05))*100/9+'%',top:(r+(v?.05:.94))*100/9+'%',width:(v?.12:1.9)*100/9+'%',height:(v?1.9:.12)*100/9+'%'});board.append(el)}
function commit(m){if(!game.doMove(m,true))return false;if(!m[0])drawWall(m);note(m[0]?460:220);if(game.winner){if(!game.winner.index){persist({wins:record.wins+1});note(660,.1);note(880,.22)}host.end();host.save()}render();return true}
function choose(r,c){if(game.winner||game.pawnOfTurn.index!==0)return;let m=[null,null,null];m[mode==='walk'?0:vertical?2:1]=[r,c];host.start();if(!commit(m)){$('hint').textContent='Leave a route to both shores.';note(120);return}mode='walk';if(!game.winner){render();timer=setTimeout(aiTurn,260)}}
function fallback(){if(game.winner||game.pawnOfTurn.index!==1)return;const options=indicesOfValueIn2DArray(game.validNextPositions,true);options.sort((a,b)=>b[0]-a[0]);commit([options[0],null,null])}
function aiTurn(){try{worker??=new Worker('worker.js');worker.onerror=()=>{clearTimeout(timer);worker.terminate();worker=null;fallback()};worker.onmessage=e=>{if(Array.isArray(e.data)&&game.pawnOfTurn.index===1&&!game.winner){clearTimeout(timer);if(!commit(e.data))fallback()}};worker.postMessage({game,numOfMCTSSimulations:[70,180,400][stage],uctConst:.3,aiDevelopMode:false});timer=setTimeout(()=>{worker?.terminate();worker=null;fallback()},5000)}catch{fallback()}}
function begin(){clearTimeout(timer);worker?.terminate();worker=null;stage=Math.min(2,record.wins);document.body.dataset.stage=stage;game=new Game(true);mode='walk';vertical=false;board.querySelectorAll('.wall').forEach(w=>w.remove());host.prepare();render()}
$('walk').onclick=()=>{mode='walk';render()};$('gate').onclick=()=>{mode='gate';render()};$('rotate').onclick=()=>{vertical=!vertical;render()};$('again').onclick=begin;$('sound').onclick=()=>{muted=!muted;$('sound').textContent=muted?'♩':'♫';$('sound').ariaPressed=String(muted);note(600)};addEventListener('pagehide',e=>{if(!e.persisted){clearTimeout(timer);worker?.terminate();host.stop()}});begin();
