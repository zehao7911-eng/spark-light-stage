importScripts('core.js'+new URL(self.location.href).search);
self.onmessage=function(e){try{self.postMessage({token:e.data.token,route:ShellCore.solve(e.data.pits)});}catch(_){self.postMessage({token:e.data.token,route:null});}};
