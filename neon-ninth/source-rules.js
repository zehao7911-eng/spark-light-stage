/* Scoring/strike cycle ported from Edgard Collante's HomeRunBBallDD Game.js,
 * revision 99652cf3b57e5b6ff7121f82bad4c8c643add36c, MIT (2017).
 * Original source retained in upstream/. Phaser sprites/P2 replaced by 3D timing.
 */
(function(g){
  const SourceRules={
    award(right,speed){
      let score=right<100?1000:right<370?800:right<500?200:500;
      if(speed>1000)score+=speed*2;else if(speed>500)score+=speed;
      return Math.round(score);
    },
    strike(s){s.strikes++;if(s.strikes===3){s.outs++;s.strikes=0;}},
    ended(s){return s.time<=0||s.outs>=3;},
    rank(list,value){let out=list.filter(Number.isFinite).concat(value).sort((a,b)=>b-a);return out.slice(0,10);}
  };
  g.SourceRules=SourceRules;
})(typeof window==='undefined'?globalThis:window);
