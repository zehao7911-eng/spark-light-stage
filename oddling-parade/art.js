(function () {
  'use strict';
  const INK = '#192b35', CREAM = '#f6e5be';
  const { FAMILIES: F, mod } = OddCore;
  function shape(c, d, fill, stroke = INK, width = 3.8) {
    const p = new Path2D(d); c.fillStyle = fill; c.fill(p);
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.lineJoin = c.lineCap = 'round'; c.stroke(p); }
  }
  function ellipse(c, x, y, rx, ry, fill, width = 3.5, stroke = INK) {
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = fill; c.fill();
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
  }
  function line(c, d, color = INK, width = 3) { const p = new Path2D(d); c.strokeStyle = color; c.lineWidth = width; c.lineCap = c.lineJoin = 'round'; c.stroke(p); }
  function star(c, x, y, r, fill = CREAM) {
    c.save(); c.translate(x, y); shape(c, `M0 ${-r}Q${r*.24} ${-r*.18} ${r} 0Q${r*.2} ${r*.2} 0 ${r}Q${-r*.2} ${r*.2} ${-r} 0Q${-r*.2} ${-r*.2} 0 ${-r}`, fill, INK, Math.max(1.6,r*.14)); c.restore();
  }
  function mark(c, family, x, y, s = 1, fill = CREAM) {
    c.save(); c.translate(x,y); c.scale(s,s);
    const paths = [
      'M0-13C0-4 12-2 8 8C3 17-10 12-10 3Q-9-2-5-6Q-5 1-2 1Z',
      'M-13 1Q-11-15 1-13Q13-13 14 1L5 3L5 11L-4 11L-4 3Z',
      'M0-14Q-16 2-9 10Q0 19 10 9Q17 2 0-14Z',
      'M8-13C-5-13-9-1-1 7Q4 11 12 7Q5 20-8 11Q-21-1-8-12Q0-18 8-13Z',
      'M12-13Q-18-10-9 9Q10 20 12-13ZM-8 9L7-7'
    ];
    shape(c, paths[family], fill, INK, 2.1); c.restore();
  }
  function eyes(c, y = 6, wide = 18, t = 0, mood = false) {
    const blink = Math.sin(t * 1.7) > .989;
    for (const side of [-1,1]) {
      const x = side * wide;
      if (blink || mood) line(c, `M${x-6} ${y+2}Q${x} ${y-5} ${x+6} ${y+2}`, INK, 3.8);
      else { ellipse(c,x,y,8,11,CREAM,2.8); ellipse(c,x+side*.8,y+2,3.6,6,INK,0,null); ellipse(c,x-1,y-2,1.6,2,'#fff9e8',0,null); }
    }
  }
  function head(c, f, t, happy) {
    if (f === 0) {
      shape(c,'M-44-12Q-58-40-44-66L-15-38Q0-45 19-38L47-65Q57-38 43-11Q55 21 36 38Q18 54 0 49Q-34 54-46 32Q-57 12-44-12',F[0].color);
      shape(c,'M-42-52L-25-34L-43-24Z','#9a4b55',INK,2.5); shape(c,'M42-52L25-34L43-24Z','#9a4b55',INK,2.5);
      shape(c,'M-44 9Q-31 4-20 22L0 29L20 22Q33 5 44 10L36 26L43 30Q19 51 0 45Q-22 51-43 30L-35 25Z',CREAM,INK,2.5);
      eyes(c,6,20,t,happy); shape(c,'M-7 22Q0 18 7 22L0 29Z',INK); line(c,'M0 29Q-1 38-10 33M0 29Q1 38 10 33',INK,2);
      line(c,'M-38 21L-49 18M-38 27L-50 29M38 21L49 18M38 27L50 29',INK,2);
      shape(c,'M-8-34L0-21L8-34', '#bf624c',null);
    } else if (f === 1) {
      shape(c,'M-24-1Q-27 16-23 38Q0 56 24 38L23-2Z','#eccca0');
      shape(c,'M-56-4Q-53-17-38-33Q-27-64 1-59Q25-64 40-31Q53-15 57-2Q28 12 0 6Q-30 12-56-4',F[1].color);
      shape(c,'M-51-3Q0 4 52-2Q29 21 0 16Q-29 21-51-3','#b45865');
      for(const a of [[-25,-27,10,7],[5,-41,11,8],[29,-19,8,6],[-4,-16,5,4]])ellipse(c,...a,CREAM,2.3);
      line(c,'M-14 12L-16 20M0 14V21M14 12L16 20','#743c4d',1.8);
      eyes(c,29,11,t,happy); line(c,'M-4 42Q0 46 5 41',INK,2.5);
    } else if (f === 2) {
      shape(c,'M-45 20Q-57-6-34-25Q-35-42-20-50L-19-34Q-5-50 7-55L9-34Q41-38 45-12Q59 14 43 36Q17 56-16 49Q-44 48-45 20',F[2].color);
      shape(c,'M-41 28Q-20 47 16 39Q39 35 47 12Q53 33 37 42Q-1 59-29 44Z','#429b96',null);
      shape(c,'M-25-23Q-13-37-6-31Q-10-23-25-18Z','#bce2c4',null); eyes(c,5,19,t,happy);
      ellipse(c,-31,19,8,4,'#d59b9d',0,null); ellipse(c,31,19,8,4,'#d59b9d',0,null);
      shape(c,'M-10 24Q0 31 11 23Q8 40-1 39Q-9 39-10 24','#754456',INK,2.5);
      ellipse(c,1,34,5,2.4,'#e4929a',0,null);
    } else if (f === 3) {
      line(c,'M-17-33Q-43-75-51-54M17-33Q43-75 51-54',INK,4);
      ellipse(c,-51,-54,4.5,6,'#e9c57a',2.5); ellipse(c,51,-54,4.5,6,'#e9c57a',2.5);
      shape(c,'M-43-26L-48-44L-23-36Q0-46 23-36L48-44L43-24Q57 3 35 34Q15 55 0 49Q-17 54-35 34Q-57 3-43-26',F[3].color);
      shape(c,'M-35-13Q-17-23 0-11Q18-23 35-13Q31 19 16 29L0 39L-16 29Q-32 18-35-13',CREAM);
      eyes(c,3,17,t,happy); mark(c,3,0,-28,.38,'#e9bd69');
      shape(c,'M-6 25L0 34L6 25Z','#cb895b',INK,2.3); line(c,'M-39 6L-47 8M39 6L47 8',INK,2);
    } else {
      line(c,'M-28-26L-40-54L-37-71M-40-54L-54-57M28-26L40-54L37-71M40-54L54-57','#425d4a',6);
      shape(c,'M-44 5L-51-15L-31-28L-30-45L-9-37L0-50L14-37L35-44L34-24L50-11L43 8L47 26L27 31L13 48L-3 39L-24 45L-28 28L-47 25Z',F[4].color);
      shape(c,'M-30-8Q-15-28 0-19Q19-28 31-8L24 22L0 34L-24 22Z','#e7d9ae');
      eyes(c,0,14,t,happy); ellipse(c,0,20,4,3,INK,0,null); line(c,'M0 23Q-6 29-11 25M0 23Q6 29 11 25',INK,2.2);
      line(c,'M-40-6L-34 2M35 24L28 16M13-37L7-28M-19 34L-14 26','#687e4e',2.1);
      ellipse(c,42,-38,8,5,'#779865',2.5); ellipse(c,-47,-50,7,4,'#779865',2.5);
    }
  }
  function body(c, f, t) {
    const sway = Math.sin(t*3)*4;
    if(f===0){
      shape(c,`M27 21Q77 18 75-24Q91-1 72 31Q57 53 31 45Z`,F[0].color);
      shape(c,'M72-14Q77-1 71 14L61 23Q73 1 64-8Z',CREAM,INK,2.5);
      for(const s of [-1,1]){c.save();c.scale(s,1);c.rotate(Math.sin(t*3)*.035);shape(c,'M28-42Q51-48 62-5L53 14L39 7L37-17Z','#304456');ellipse(c,53,17,9,10,CREAM,2.8);line(c,'M49 18V23M55 18V23',INK,1.6);c.restore();}
      shape(c,'M-25-51Q0-65 25-51L39 19L31 58L0 49L-31 58L-40 19Z','#314556');
      shape(c,'M0-48L-8 12L0 37L8 12Z','#e6bb73',INK,2.5);
      shape(c,`M-28-48Q0-34 28-48L22-28L-2-31L${-32+sway}-14L-39-30Z`,'#d46561');
      line(c,'M-20 10L-26 29M20 10L26 29M-26 40L-13 37M13 37L26 40','#77878a',2.2);
      for(let i=0;i<3;i++)ellipse(c,0,-12+i*17,3.6,3.6,'#f0ca82',1.8);
    }else if(f===1){
      shape(c,'M-22-49Q0-59 22-49Q31-11 54 32Q37 62 0 61Q-36 63-54 32Q-29-11-22-49',F[1].color);
      shape(c,'M-43 26Q-25 52 0 49Q28 48 44 28L54 33Q37 63 0 61Q-36 63-54 33Z','#8c4c65',INK,2.5);
      shape(c,'M-28-49Q0-32 28-49L37-21L26-12L16-23L6-11L-4-23L-15-11L-25-22L-37-18Z','#f0d7ad');
      for(const s of [-1,1]){c.save();c.scale(s,1);shape(c,'M34-17Q56-14 56 9Q47 21 38 8Z','#e5b987');line(c,'M47 2L50 8M43 5L46 11',INK,1.8);c.restore();}
      line(c,'M-21 0L-27 25M22 1L27 24M-9 6L-12 36M9 6L12 36','#9a4960',2.4);
      for(const a of [[-30,24,6],[0,30,8],[27,31,5]])ellipse(c,a[0],a[1],a[2],a[2]*.8,CREAM,2);
      ellipse(c,0,-21,4,4,'#e5bd76',2);
    }else if(f===2){
      shape(c,'M-27-48Q0-59 27-48Q39-39 36-20Q57-15 59 4Q60 18 44 19Q54 44 30 55Q-1 69-31 54Q-53 45-43 20Q-61 17-59 4Q-56-15-36-20Q-39-41-27-48',F[2].color);
      shape(c,'M-41 23Q-13 52 28 42Q42 39 47 25Q49 51 22 59Q-17 69-36 49Z','#3b9290',null);
      ellipse(c,-8,3,23,29,'#abd7bb',2.5); shape(c,'M-17-12Q-10-23-3-16Q-3-8-13-3Z','#d8e6c3',null);
      for(const a of [[-35,4,6],[32,27,6],[25,-23,4]])ellipse(c,a[0],a[1],a[2],a[2], '#d4e5bd',2);
      shape(c,'M-19-44L0-33L19-44L14-27L0-24L-14-27Z','#dfbd77');
    }else if(f===3){
      for(const s of [-1,1]){c.save();c.scale(s,1);c.rotate(Math.sin(t*3)*.06);shape(c,'M16-38Q48-75 79-49Q97-26 67-8Q97 10 76 39Q55 64 16 29Z','#9183b3');shape(c,'M21-33Q47-57 68-44Q77-29 55-15L24-9Z','#d8c6cd',INK,2.5);shape(c,'M26 1Q59-9 69 12Q73 29 55 34L24 20Z','#c4b8c9',INK,2.5);ellipse(c,49,-31,10,13,'#e9bf75',2.5);ellipse(c,49,-31,4,6,'#4d4b73',1.5);mark(c,3,49,16,.49,'#e9bf75');line(c,'M31-9L61-16M27 23L46 36','#655c8b',2.1);c.restore();}
      shape(c,'M-17-50Q0-60 17-50L24 24Q19 55 0 61Q-22 54-25 24Z','#615b88');
      for(let i=0;i<4;i++)shape(c,`M-20 ${-33+i*19}Q0 ${-20+i*19} 20 ${-33+i*19}L18 ${-22+i*19}Q0 ${-10+i*19}-18 ${-22+i*19}Z`,'#b4a3c7',INK,2.2);
      ellipse(c,0,-45,9,7,CREAM,2.5);
    }else{
      for(const s of [-1,1]){c.save();c.scale(s,1);line(c,'M21-21Q66-33 56 9Q48 28 41 9','#5d8666',9);line(c,'M21-21Q66-33 56 9Q48 28 41 9',INK,2);c.restore();}
      shape(c,'M-23-51Q0-60 23-51L39 35L23 59L0 52L-23 59L-39 35Z','#789c6c');
      for(let row=0;row<4;row++)for(const s of [-1,1]){c.save();c.scale(s,1);let y=-35+row*21;shape(c,`M0 ${y}Q23 ${y-16} 35 ${y+2}Q20 ${y+27} 0 ${y+17}Z`,row%2?'#97ac71':'#b3bc78',INK,2.5);line(c,`M6 ${y+12}L28 ${y+4}`,'#6a8458',1.6);c.restore();}
      ellipse(c,-12,-35,7,7,'#df9e84',2);ellipse(c,-7,-39,6,6,'#e3b688',2);ellipse(c,-12,-38,3,3,CREAM,1.5);
    }
  }
  function feet(c, f, t) {
    const step = Math.sin(t*5)*4;
    for(const s of [-1,1]){
      c.save(); c.translate(s*19, s*step); c.scale(s,1);
      if(f===0){shape(c,'M-13-43L13-43L12-5Q39-6 32 13Q5 23-15 14Z','#344957');shape(c,'M-16-21L15-21L16-9L-16-8Z','#d19a69');line(c,'M-10 12L26 12','#9c967f',2);ellipse(c,3,-14,3,3,CREAM,1.5);}
      if(f===1){shape(c,'M-11-42L8-43Q7-17 14-8Q34-13 35 1Q23 16 6 5Q-7 19-18 10Q-17 2-10-5Q-17-16-11-42Z','#d9bd8b');line(c,'M0-29Q-6-10 4 1M14 0L25 1','#927352',1.9);}
      if(f===2){shape(c,'M-12-43Q8-49 13-32Q11-10 23-5Q41 2 31 15Q9 27-16 14Q-24 3-14-10Z',F[2].color);shape(c,'M-17 9Q10 20 33 6Q33 21 9 23Q-10 22-17 9','#41998e',null);ellipse(c,14,2,8,4,'#bfe2bb',0,null);}
      if(f===3){shape(c,'M-12-43L11-43L9-2Q21-10 28-3Q43 15 13 18L-12 9Z','#82749f');shape(c,'M-13-38L11-38L10-25L-12-24Z',CREAM,INK,2.4);line(c,'M-8-10L10 0M-7-17L10-7','#d8c4c6',2.8);ellipse(c,17,5,3.8,3.8,'#e3bb71',2);}
      if(f===4){line(c,'M-1-39Q-15-15 1 1','#769966',11);line(c,'M-1-39Q-15-15 1 1',INK,2.4);shape(c,'M-9 4Q4-18 34-8Q32 13 7 18L-11 15Z','#9cae70');line(c,'M-3 10L25-3','#5f805c',2.2);}
      c.restore();
    }
  }
  function part(c, row, family, x, y, scale=1, t=0, happy=false) {
    c.save();c.translate(x,y);c.scale(scale,scale);[head,body,feet][row](c,family,t,happy);c.restore();
  }
  function creature(c, parts, x, y, scale=1, t=0, happy=false, jump=0) {
    c.save();c.translate(x,y-jump);c.scale(scale,scale);
    const sway=Math.sin(t*2.4)*2.5;
    // A coat tail / wings, articulated feet, then the head share one ink contour.
    part(c,2,parts[2],0,83,1,t);
    c.save();c.rotate(Math.sin(t*2.4)*.025);part(c,1,parts[1],0,-3,1,t);c.restore();
    part(c,0,parts[0],sway,-96,1,t,happy);c.restore();
  }
  function preview(parts, size=150) {
    const c=document.createElement('canvas');c.width=size;c.height=size*1.2;
    const x=c.getContext('2d');creature(x,parts,size/2,size*.68,size/320,0,false);return c.toDataURL('image/png');
  }
  window.OddArt = { INK,CREAM,F,shape,ellipse,line,star,mark,part,creature,preview };
})();
