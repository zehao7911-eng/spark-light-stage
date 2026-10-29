import {solve} from './core.mjs';
self.onmessage=e=>{let {id,board,cap}=e.data;try{let path=solve(board,cap,120000);self.postMessage({id,path:path?.[0]??null,solved:path?.length===0});}catch{self.postMessage({id,path:null});}};
