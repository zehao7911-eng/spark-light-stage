importScripts('levels.js','core.js');onmessage=e=>{const {id,mask,token}=e.data;try{postMessage({token,id,mask,route:BrookCore.solve(id,mask)});}catch{postMessage({token,id,mask,route:null});}};
