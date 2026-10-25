import {solve} from './game';self.onmessage=e=>{try{self.postMessage({path:solve(e.data,{limit:4500,maxDepth:70})});}catch{self.postMessage({path:null});}};
