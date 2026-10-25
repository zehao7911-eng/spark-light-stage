/* New pure navigation and progression utilities, written for Pocket Relay. */
(function(root){
function route(grid,width,height,start,goals){const sx=Math.max(0,Math.min(width-1,Math.floor(start.x/8))),sy=Math.max(0,Math.min(height-1,Math.floor(start.z/8))),origin=sy*width+sx;let prev=new Int32Array(width*height);prev.fill(-2);prev[origin]=-1;let q=[origin],found=-1,target=null;
 for(let k=0;k<q.length;k++){let at=q[k],x=at%width,y=(at/width)|0;for(const goal of goals){const gx=Math.floor(goal.x/8),gy=Math.floor(goal.z/8);if(Math.abs(gx-x)+Math.abs(gy-y)<=1){found=at;target=goal;break}}if(found>=0)break;for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){let nx=x+dx,ny=y+dy,ni=ny*width+nx;if(nx<0||ny<0||nx>=width||ny>=height||prev[ni]!==-2||grid[ni]===0||grid[ni]>7)continue;prev[ni]=at;q.push(ni)}}
 if(found<0)return{path:[],target:null};let out=[];for(let at=found;at>=0;at=prev[at])out.push({x:(at%width)*8,z:((at/width)|0)*8});return{path:out.reverse(),target};}
function lineClear(grid,width,x1,z1,x2,z2){const n=Math.ceil(Math.hypot(x2-x1,z2-z1)/3);for(let i=1;i<n;i++){let x=Math.floor((x1+(x2-x1)*i/n+3)/8),z=Math.floor((z1+(z2-z1)*i/n+2)/8);if(grid[z*width+x]>7)return false}return true;}
function award(profile,sector,stats){const stars=1+(stats.seconds<240?1:0)+(stats.redeploys===0?1:0);let improved=stars>profile.stars[sector-1];profile.stars[sector-1]=Math.max(profile.stars[sector-1],stars);profile.best[sector-1]=Math.max(profile.best[sector-1],stats.score);return{stars,improved};}
root.RelayRules={route,lineClear,award};if(typeof module!=='undefined')module.exports=root.RelayRules;
})(typeof globalThis!=='undefined'?globalThis:this);
