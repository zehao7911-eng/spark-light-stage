// Adapted from match-three-js, MIT, Copyright (c) 2016 Playtester's Kitchen.
// Small native equivalents for the upstream API; no Lodash/collections runtime.
let rng=()=>Math.random();
export const setRandom=(f:()=>number)=>{rng=f;};
export const range=(a:number,b?:number)=>Array.from({length:Math.max(0,(b??a)-(b===undefined?0:a))},(_,i)=>i+(b===undefined?0:a));
export const rangeRight=(n:number)=>range(n).reverse();
export const times=(n:number,f:any)=>range(n).map(f);
export const sample=(a:any[])=>a[Math.floor(rng()*a.length)];
export const random=(n:number)=>Math.floor(rng()*(n+1));
export const uniq=(a:any[])=>[...new Set(a)];
export const flatten=(a:any[])=>a.flat();
export const zip=(...a:any[])=>a[0].map((_:any,i:number)=>a.map(b=>b[i]));
export const clone=(a:any)=>Array.isArray(a)?a.slice():{...a};
export const cloneDeep=(a:any)=>JSON.parse(JSON.stringify(a));
export const each=(a:any,f:any)=>{if(Array.isArray(a))a.forEach(f);else Object.keys(a).forEach(k=>f(a[k],k));};
export const map=(a:any,f:any=(x:any)=>x)=>Array.isArray(a)?a.map(f):Object.keys(a).map(k=>f(a[k],k));
export const reduce=(a:any,f:any,initial:any)=>a.reduce(f,initial);
export const some=(a:any[],f:any=(x:any)=>x)=>a.some(f);
export const values=Object.values;
export const max=(a:number[])=>Math.max(...a);
export const toInteger=(x:any)=>Math.trunc(Number(x));
export const isUndefined=(x:any)=>x===undefined;
export const includes=(a:any[],x:any)=>a.includes(x);
export const isEqual=(a:any,b:any)=>JSON.stringify(a)===JSON.stringify(b);
export const countBy=(a:any[])=>a.reduce((o,x)=>(o[x]=(o[x]||0)+1,o),{});
export function shuffle(a:any[]){let b=a.slice();for(let i=b.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
