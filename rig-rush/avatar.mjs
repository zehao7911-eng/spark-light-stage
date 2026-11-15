const embeddedAvatar=null;
const embeddedAvatarTextures={};
const avatarModelURL='assets/avatar/model.json';
const avatarTextureRoot='assets/avatar/';
export async function loadPlayerAvatar(T,parent){
 const d=embeddedAvatar||await (await fetch(avatarModelURL)).json(),geo=new T.BufferGeometry();
 function decode(a){const raw=atob(a.data),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return a.type==='Uint16Array'?new Uint16Array(bytes.buffer):new Float32Array(bytes.buffer)}
 for(const[k,a]of Object.entries(d.buffers)){const data=decode(a);if(k==='index')geo.setIndex(new T.BufferAttribute(data,1));else geo.setAttribute(k,new T.BufferAttribute(data,k==='uv'?2:k.startsWith('skin')?4:3))}
 const textures=new Map(),tl=new T.TextureLoader();for(const m of d.materials)if(m.map&&!textures.has(m.map)){const tx=await tl.loadAsync(embeddedAvatarTextures[m.map]||avatarTextureRoot+m.map);tx.encoding=T.sRGBEncoding;tx.anisotropy=2;textures.set(m.map,tx)}
 let offset=0;const mats=d.materials.map((m,i)=>{geo.addGroup(offset,m.count,i);offset+=m.count;return new T.MeshStandardMaterial({name:m.name,color:new T.Color(...m.diffuse.slice(0,3)),map:textures.get(m.map)||null,roughness:.84,metalness:0,side:T.DoubleSide,transparent:m.diffuse[3]<.99,opacity:m.diffuse[3],alphaTest:.35,depthWrite:m.diffuse[3]>=.99})});
 const mesh=new T.SkinnedMesh(geo,mats);mesh.name='silver-wolf-character';const bones=d.bones.map(b=>{const bone=new T.Bone();bone.name=b.name;bone.position.fromArray(b.pos);if(b.parent>=0)bone.position.sub(new T.Vector3().fromArray(d.bones[b.parent].pos));return bone});d.bones.forEach((b,i)=>{if(b.parent>=0)bones[b.parent].add(bones[i]);else mesh.add(bones[i])});mesh.bind(new T.Skeleton(bones));mesh.normalizeSkinWeights();mesh.frustumCulled=false;geo.computeBoundingBox();const bounds=geo.boundingBox,scale=2.55/(bounds.max.y-bounds.min.y);mesh.scale.setScalar(scale);mesh.position.y=-bounds.min.y*scale;const root=new T.Group();root.name='imported-avatar';root.add(mesh);parent.add(root);const map=Object.fromEntries(bones.map(b=>[b.name,b]));let blend=0;
 function pose(name,x=0,y=0,z=0){if(map[name])map[name].rotation.set(x,y,z)}
 function update(dt,phase,active,jumping,train){blend+=(Number(active)-blend)*Math.min(1,dt*12);for(const[side,sign,off]of[['左',1,0],['右',-1,Math.PI]]){const swing=Math.sin(phase+off)*.42*blend,knee=Math.max(0,-Math.sin(phase+off))*.72*blend;pose(side+'足',swing);pose(side+'足D',swing);pose(side+'ひざ',knee);pose(side+'ひざD',knee);pose(side+'足首',-knee*.35);pose(side+'足首D',-knee*.35);pose(side+'腕',-swing*.75,0,-sign*.65);pose(side+'ひじ',-.14-Math.max(0,swing)*.5);pose(side+'ひじ補助',-.14-Math.max(0,swing)*.5)}pose('上半身',train?.09:0,0,Math.sin(phase)*.025*blend);if(jumping){pose('左ひざ',.35);pose('左ひざD',.35);pose('右ひざ',.35);pose('右ひざD',.35)}root.position.y=Math.abs(Math.sin(phase))* .025*blend;}
 update(1,0,false,false,false);return{root,mesh,bones,map,update};
}
