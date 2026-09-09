(function(){
const V=window.MockupV081=window.MockupV081||{};V.version='0.8.1';
let state=null,spaceDown=false,handMode=false,cropMode=false,positionDrag=null,raf=0,cropWheelTimer=0,userZoom=false;
const qs=(s,r=document)=>r.querySelector(s),qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const media=e=>e&&['image','video'].includes(e.type);
const clamp01=(v,a,b)=>Math.max(a,Math.min(b,v));
function sel(){return typeof selected==='function'?selected():[]}
function byId(id){return project.elements.find(e=>e.id===id)}
function bounds(items=sel()){
 if(!items.length)return null;
 const left=Math.min(...items.map(e=>e.x)),top=Math.min(...items.map(e=>e.y)),right=Math.max(...items.map(e=>e.x+e.width)),bottom=Math.max(...items.map(e=>e.y+e.height));
 return{x:left,y:top,width:right-left,height:bottom-top,cx:(left+right)/2,cy:(top+bottom)/2,right,bottom};
}
function screenToStage(ev){const r=stage.getBoundingClientRect();return{x:(ev.clientX-r.left)/stageScale,y:(ev.clientY-r.top)/stageScale}}
function setScale(next,anchor,manual=true){
 const old=stageScale;if(manual)userZoom=true;stageScale=clamp01(next,.08,2.5);stage.style.setProperty('--v081-inverse-scale',String(1/stageScale));
 stageWrap.style.transform=`scale(${stageScale})`;
 stageWrap.style.margin=`${-(project.canvas.height*(1-stageScale))/2}px ${-(project.canvas.width*(1-stageScale))/2}px`;
 if(anchor&&viewport){const factor=stageScale/old,rect=viewport.getBoundingClientRect(),x=anchor.clientX-rect.left+viewport.scrollLeft,y=anchor.clientY-rect.top+viewport.scrollTop;viewport.scrollLeft=x*factor-(anchor.clientX-rect.left);viewport.scrollTop=y*factor-(anchor.clientY-rect.top)}
 updateControls();decorate();
}
function fit(reset=true){if(reset)userZoom=false;const aw=Math.max(240,viewport.clientWidth-92),ah=Math.max(240,viewport.clientHeight-154);setScale(Math.max(.08,Math.min(aw/project.canvas.width,ah/project.canvas.height,.92)),null,false)}
function updateControls(){const z=qs('#v081ZoomLabel');if(z)z.textContent=`${Math.round(stageScale*100)}%`;const h=qs('#v081Hand');if(h)h.classList.toggle('active',handMode);const c=qs('#v081Crop');if(c)c.classList.toggle('active',cropMode)}
function guideLayer(){let g=qs(':scope > .v081-guides',stage);if(!g){g=document.createElement('div');g.className='v081-guides';stage.append(g)}return g}
function clearGuides(){const g=qs(':scope > .v081-guides',stage);if(g)g.innerHTML=''}
function line(axis,pos,label=''){
 const g=guideLayer(),l=document.createElement('div');l.className=`v081-guide ${axis}`;if(axis==='v')l.style.left=`${pos}px`;else l.style.top=`${pos}px`;g.append(l);
 if(label){const t=document.createElement('span');t.className='v081-guide-label';t.textContent=label;if(axis==='v'){t.style.left=`${pos}px`;t.style.top='10px'}else{t.style.top=`${pos}px`;t.style.left='10px'}g.append(t)}
}
function snapGroup(items,dx,dy){
 const b0=bounds(items),moving={x:b0.x+dx,y:b0.y+dy,width:b0.width,height:b0.height};moving.right=moving.x+moving.width;moving.bottom=moving.y+moving.height;moving.cx=moving.x+moving.width/2;moving.cy=moving.y+moving.height/2;
 const threshold=Math.max(5,10/stageScale),xTargets=[0,project.canvas.width/2,project.canvas.width],yTargets=[0,project.canvas.height/2,project.canvas.height];
 for(const o of project.elements){if(selectedIds.has(o.id))continue;xTargets.push(o.x,o.x+o.width/2,o.x+o.width);yTargets.push(o.y,o.y+o.height/2,o.y+o.height)}
 const xPoints=[['left',moving.x],['center',moving.cx],['right',moving.right]],yPoints=[['top',moving.y],['middle',moving.cy],['bottom',moving.bottom]];
 let bestX=null,bestY=null;
 for(const [kind,p] of xPoints)for(const t of xTargets){const d=t-p;if(Math.abs(d)<=threshold&&(!bestX||Math.abs(d)<Math.abs(bestX.d)))bestX={kind,t,d}}
 for(const [kind,p] of yPoints)for(const t of yTargets){const d=t-p;if(Math.abs(d)<=threshold&&(!bestY||Math.abs(d)<Math.abs(bestY.d)))bestY={kind,t,d}}
 if(bestX){dx+=bestX.d;line('v',bestX.t,bestX.kind==='center'?'Center':'Align')}
 if(bestY){dy+=bestY.d;line('h',bestY.t,bestY.kind==='middle'?'Center':'Align')}
 if(items.length===1){const e=items[0],nx=e.x+dx,ny=e.y+dy,nr=nx+e.width,nb=ny+e.height,others=project.elements.filter(o=>o.id!==e.id);
   const lefts=others.filter(o=>o.x+o.width<=nx).sort((a,b)=>(b.x+b.width)-(a.x+a.width)),rights=others.filter(o=>o.x>=nr).sort((a,b)=>a.x-b.x);
   if(lefts[0]&&rights[0]){const gl=nx-(lefts[0].x+lefts[0].width),gr=rights[0].x-nr;if(Math.abs(gl-gr)<=threshold){const equal=(gl+gr)/2,delta=gr-gl;dx+=delta/2;line('v',lefts[0].x+lefts[0].width+equal/2,`Equal ${Math.round(equal)}`);line('v',nr+delta/2+equal/2,'')}}
   const ups=others.filter(o=>o.y+o.height<=ny).sort((a,b)=>(b.y+b.height)-(a.y+a.height)),downs=others.filter(o=>o.y>=nb).sort((a,b)=>a.y-b.y);
   if(ups[0]&&downs[0]){const gt=ny-(ups[0].y+ups[0].height),gb=downs[0].y-nb;if(Math.abs(gt-gb)<=threshold){const equal=(gt+gb)/2,delta=gb-gt;dy+=delta/2;line('h',ups[0].y+ups[0].height+equal/2,`Equal ${Math.round(equal)}`);line('h',nb+delta/2+equal/2,'')}}
 }
 return{dx,dy};
}
function overlay(){let o=qs(':scope > .v081-selection',stage);if(!o){o=document.createElement('div');o.className='v081-selection';stage.append(o)}return o}
function createHandle(name){const h=document.createElement('button');h.type='button';h.className=`v081-handle ${name}`;h.dataset.v081Handle=name;h.setAttribute('aria-label',`${name} resize handle`);return h}
function decorate(){
 if(!stage||typeof project==='undefined')return;stage.style.setProperty('--v081-inverse-scale',String(1/stageScale));
 qsa('.stage-element .resize-handle',stage).forEach(h=>h.remove());qsa('.stage-element',stage).forEach(n=>n.classList.remove('v081-editing-text'));
 (project.elements||[]).filter(media).forEach(e=>{const n=stage.querySelector(`[data-id="${e.id}"]`),m=n?.querySelector('.media-shell img,.media-shell video');if(m){m.style.objectPosition=`${50-(e.cropX||0)/2}% ${50-(e.cropY||0)/2}%`;m.style.transform=`translate(-50%,-50%) scale(${e.cropZoom||1})`}});
 const items=sel(),old=qs(':scope > .v081-selection',stage);if(!items.length){old?.remove();clearGuides();updatePositionPicker();return}
 const b=bounds(items),o=overlay();o.style.left=`${b.x}px`;o.style.top=`${b.y}px`;o.style.width=`${b.width}px`;o.style.height=`${b.height}px`;o.classList.toggle('multi',items.length>1);o.classList.toggle('crop',cropMode&&items.length===1&&media(items[0]));
 if(!o.dataset.ready){o.dataset.ready='1';['nw','n','ne','e','se','s','sw','w'].forEach(x=>o.append(createHandle(x)));const rot=document.createElement('button');rot.type='button';rot.className='v081-rotate';rot.dataset.v081Handle='rotate';rot.setAttribute('aria-label','Rotation handle');o.append(rot);const crop=document.createElement('div');crop.className='v081-crop-grid';crop.innerHTML='<i></i><i></i><i></i><i></i>';o.append(crop);const label=document.createElement('div');label.className='v081-selection-label';o.append(label)}
 const label=qs('.v081-selection-label',o);label.textContent=items.length>1?`${items.length} layers`:`${Math.round(b.width)} × ${Math.round(b.height)}`;
 updatePositionPicker();
}
function updatePositionPicker(){const b=bounds(),pad=qs('#v081PositionPad'),dot=qs('#v081PositionDot');if(!pad||!dot)return;if(!b){dot.hidden=true;return}dot.hidden=false;dot.style.left=`${clamp01(b.cx/project.canvas.width,0,1)*100}%`;dot.style.top=`${clamp01(b.cy/project.canvas.height,0,1)*100}%`}
function startMove(ev,node){const add=ev.shiftKey||ev.metaKey||ev.ctrlKey;if(!selectedIds.has(node.dataset.id)||add)selectElement(node.dataset.id,add);const items=sel();if(!items.length)return;pushHistory();state={type:'move',pointerId:ev.pointerId,start:screenToStage(ev),items:items.map(e=>({id:e.id,x:e.x,y:e.y,width:e.width,height:e.height})),bounds:bounds(items)};ev.preventDefault()}
function startResize(ev,handle){const items=sel(),b=bounds(items);if(!items.length||!b)return;pushHistory();state={type:'resize',pointerId:ev.pointerId,handle,start:screenToStage(ev),bounds:b,items:items.map(e=>({id:e.id,x:e.x,y:e.y,width:e.width,height:e.height,fontSize:e.fontSize||0,strokeWidth:e.strokeWidth||0}))};ev.preventDefault();ev.stopPropagation()}
function startRotate(ev){const items=sel(),b=bounds(items);if(!items.length)return;pushHistory();const p=screenToStage(ev),a=Math.atan2(p.y-b.cy,p.x-b.cx);state={type:'rotate',pointerId:ev.pointerId,startAngle:a,bounds:b,items:items.map(e=>({id:e.id,x:e.x,y:e.y,width:e.width,height:e.height,rotation:e.rotation||0,cx:e.x+e.width/2,cy:e.y+e.height/2}))};ev.preventDefault();ev.stopPropagation()}
function startCropPan(ev,node){const e=sel()[0];if(!cropMode||!media(e)||!node||node.dataset.id!==e.id)return false;pushHistory();state={type:'crop-pan',pointerId:ev.pointerId,startX:ev.clientX,startY:ev.clientY,cropX:e.cropX||0,cropY:e.cropY||0,id:e.id};ev.preventDefault();return true}
function stageDown081(ev){
 if(ev.button!==0&&ev.pointerType!=='touch')return;const handle=ev.target.closest('[data-v081-handle]');if(handle){handle.dataset.v081Handle==='rotate'?startRotate(ev):startResize(ev,handle.dataset.v081Handle);return}
 const node=ev.target.closest('.stage-element');if(node){if(startCropPan(ev,node))return;startMove(ev,node);return}
 if(!(ev.shiftKey||ev.metaKey||ev.ctrlKey))clearSelection();
}
function moveResize(ev){const p=screenToStage(ev),s=state,b=s.bounds;let left=b.x,top=b.y,right=b.right,bottom=b.bottom;const dx=p.x-s.start.x,dy=p.y-s.start.y,h=s.handle;
 if(h.includes('w'))left+=dx;if(h.includes('e'))right+=dx;if(h.includes('n'))top+=dy;if(h.includes('s'))bottom+=dy;
 const min=24;if(right-left<min){if(h.includes('w'))left=right-min;else right=left+min}if(bottom-top<min){if(h.includes('n'))top=bottom-min;else bottom=top+min}
 if(ev.shiftKey){const ratio=b.width/b.height,nw=right-left,nh=bottom-top;if(nw/nh>ratio){const target=nw/ratio;if(h.includes('n'))top=bottom-target;else bottom=top+target}else{const target=nh*ratio;if(h.includes('w'))left=right-target;else right=left+target}}
 const nb={x:left,y:top,width:right-left,height:bottom-top},sx=nb.width/b.width,sy=nb.height/b.height;
 for(const it of s.items){const e=byId(it.id);e.x=nb.x+(it.x-b.x)*sx;e.y=nb.y+(it.y-b.y)*sy;e.width=Math.max(12,it.width*sx);e.height=Math.max(12,it.height*sy);if(e.type==='text'&&it.fontSize)e.fontSize=Math.max(8,it.fontSize*Math.min(sx,sy));if(e.type==='shape'&&it.strokeWidth)e.strokeWidth=Math.max(1,it.strokeWidth*Math.min(sx,sy))}
}
function moveRotate(ev){const p=screenToStage(ev),s=state,a=Math.atan2(p.y-s.bounds.cy,p.x-s.bounds.cx),delta=(a-s.startAngle)*180/Math.PI,snap=ev.shiftKey?15:1,angle=Math.round(delta/snap)*snap,rad=angle*Math.PI/180,c=Math.cos(rad),sn=Math.sin(rad);
 for(const it of s.items){const e=byId(it.id);e.rotation=it.rotation+angle;if(s.items.length>1){const dx=it.cx-s.bounds.cx,dy=it.cy-s.bounds.cy,cx=s.bounds.cx+dx*c-dy*sn,cy=s.bounds.cy+dx*sn+dy*c;e.x=cx-e.width/2;e.y=cy-e.height/2}}
}
function movePosition(ev){const r=positionDrag.rect,px=clamp01((ev.clientX-r.left)/r.width,0,1),py=clamp01((ev.clientY-r.top)/r.height,0,1),dx=ev.clientX-positionDrag.startClientX,dy=ev.clientY-positionDrag.startClientY;if(!positionDrag.axis&&Math.hypot(dx,dy)>6&&!ev.altKey)positionDrag.axis=Math.abs(dx)>=Math.abs(dy)?'x':'y';let cx=px*project.canvas.width,cy=py*project.canvas.height;if(positionDrag.axis==='x')cy=positionDrag.startBounds.cy;if(positionDrag.axis==='y')cx=positionDrag.startBounds.cx;const ddx=cx-positionDrag.startBounds.cx,ddy=cy-positionDrag.startBounds.cy;positionDrag.items.forEach(it=>{const e=byId(it.id);e.x=it.x+ddx;e.y=it.y+ddy});clearGuides();if(positionDrag.axis==='x')line('h',cy,'Y locked');if(positionDrag.axis==='y')line('v',cx,'X locked');renderStage();renderProperties();updatePositionPicker();queueSave()}
function pointerMove081(ev){
 if(positionDrag?.pointerId===ev.pointerId){movePosition(ev);return}
 if(!state||state.pointerId!==ev.pointerId)return;
 if(state.type==='move'){clearGuides();let dx=screenToStage(ev).x-state.start.x,dy=screenToStage(ev).y-state.start.y;if(ev.shiftKey){if(!state.axis)state.axis=Math.abs(dx)>=Math.abs(dy)?'x':'y';if(state.axis==='x')dy=0;else dx=0}const snap=snapGroup(state.items,dx,dy);state.items.forEach(it=>{const e=byId(it.id);e.x=it.x+snap.dx;e.y=it.y+snap.dy})}
 else if(state.type==='resize')moveResize(ev);else if(state.type==='rotate')moveRotate(ev);else if(state.type==='crop-pan'){const e=byId(state.id);e.cropX=clamp01(state.cropX+(ev.clientX-state.startX)/2,-100,100);e.cropY=clamp01(state.cropY+(ev.clientY-state.startY)/2,-100,100)}
 cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{renderStage();renderProperties();queueSave()})
}
function pointerUp081(ev){if(positionDrag?.pointerId===ev.pointerId){positionDrag=null;clearGuides();decorate();return}if(state?.pointerId===ev.pointerId){state=null;clearGuides();renderAll()}}
function beginPosition(ev){const items=sel(),b=bounds(items);if(!items.length)return showToast?.('Select a layer first');pushHistory();positionDrag={pointerId:ev.pointerId,startClientX:ev.clientX,startClientY:ev.clientY,axis:null,startBounds:b,items:items.map(e=>({id:e.id,x:e.x,y:e.y})),rect:qs('#v081PositionPad').getBoundingClientRect()};ev.currentTarget.setPointerCapture?.(ev.pointerId);ev.preventDefault()}
function enterCrop(on=true){const e=sel()[0];if(on&&(!e||sel().length!==1||!media(e)))return showToast?.('Select one image or video to crop');cropMode=on;document.body.classList.toggle('v081-crop-mode',cropMode);decorate();updateControls();if(on)showToast?.('Crop mode: drag image, wheel to zoom, Esc to finish')}
function editText(node){const e=byId(node.dataset.id);if(!e||e.type!=='text')return;pushHistory();node.contentEditable='plaintext-only';node.classList.add('v081-editing-text');node.focus();const range=document.createRange();range.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(range);const finish=()=>{e.text=node.innerText.replace(/\n$/,'');node.contentEditable='false';node.removeEventListener('blur',finish);renderAll();queueSave()};node.addEventListener('input',()=>{e.text=node.innerText;queueSave()});node.addEventListener('blur',finish);node.addEventListener('keydown',ev=>{if(ev.key==='Escape'){ev.preventDefault();node.blur()}ev.stopPropagation()})}
function addControls(){const w=qs('.workspace');if(!w||qs('#v081CanvasControls'))return;
 const z=document.createElement('div');z.className='v081-canvas-controls';z.id='v081CanvasControls';z.innerHTML='<button id="v081ZoomOut" title="Zoom out">−</button><button id="v081ZoomLabel" class="wide">55%</button><button id="v081ZoomIn" title="Zoom in">＋</button><button id="v081Fit" title="Fit">Fit</button><button id="v081Hand" title="Pan canvas">Hand</button><button id="v081Crop" title="Crop selected media">Crop</button>';w.append(z);
 qs('#v081ZoomOut').onclick=()=>setScale(stageScale/1.15);qs('#v081ZoomIn').onclick=()=>setScale(stageScale*1.15);qs('#v081ZoomLabel').onclick=fit;qs('#v081Fit').onclick=fit;qs('#v081Hand').onclick=()=>{handMode=!handMode;document.body.classList.toggle('v081-hand',handMode);updateControls()};qs('#v081Crop').onclick=()=>enterCrop(!cropMode);
 const p=document.createElement('div');p.className='v081-position-picker';p.innerHTML='<div class="v081-position-head"><strong>Position</strong><span>drag · axis locks</span></div><div class="v081-position-pad" id="v081PositionPad"><i></i><i></i><button id="v081PositionDot" aria-label="Position picker"></button></div><div class="v081-position-foot"><button data-pos="center">Center</button><button data-pos="top">Top</button><button data-pos="bottom">Bottom</button></div>';w.append(p);qs('#v081PositionDot').onpointerdown=beginPosition;qsa('[data-pos]',p).forEach(b=>b.onclick=()=>{const items=sel(),bb=bounds(items);if(!bb)return;pushHistory();let dx=project.canvas.width/2-bb.cx,dy=project.canvas.height/2-bb.cy;if(b.dataset.pos==='top')dy=project.canvas.height*.12-bb.y;if(b.dataset.pos==='bottom')dy=project.canvas.height*.88-bb.bottom;items.forEach(e=>{e.x+=dx;e.y+=dy});renderAll();queueSave()});
}
function installViewportPan(){let pan=null;viewport.addEventListener('pointerdown',ev=>{if(!(handMode||spaceDown)||ev.target.closest('.stage-element,[data-v081-handle],#v081PositionDot'))return;pan={id:ev.pointerId,x:ev.clientX,y:ev.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture?.(ev.pointerId);ev.preventDefault()},{capture:true});viewport.addEventListener('pointermove',ev=>{if(!pan||pan.id!==ev.pointerId)return;viewport.scrollLeft=pan.left-(ev.clientX-pan.x);viewport.scrollTop=pan.top-(ev.clientY-pan.y)});viewport.addEventListener('pointerup',ev=>{if(pan?.id===ev.pointerId)pan=null});viewport.addEventListener('wheel',ev=>{if(cropMode&&sel().length===1&&media(sel()[0])){ev.preventDefault();const e=sel()[0];if(!cropWheelTimer)pushHistory();clearTimeout(cropWheelTimer);cropWheelTimer=setTimeout(()=>cropWheelTimer=0,280);e.cropZoom=clamp01((e.cropZoom||1)*(ev.deltaY<0?1.06:.94),1,5);renderStage();renderProperties();queueSave();return}if(ev.ctrlKey||ev.metaKey){ev.preventDefault();setScale(stageScale*(ev.deltaY<0?1.1:.9),ev)}},{passive:false})}
function installKeys(){window.addEventListener('keydown',ev=>{if(ev.code==='Space'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){spaceDown=true;document.body.classList.add('v081-space-pan');ev.preventDefault()}if(ev.key==='Escape'&&cropMode)enterCrop(false)},{capture:true});window.addEventListener('keyup',ev=>{if(ev.code==='Space'){spaceDown=false;document.body.classList.remove('v081-space-pan')}});stage.addEventListener('dblclick',ev=>{const n=ev.target.closest('.stage-element');if(n&&byId(n.dataset.id)?.type==='text'){ev.preventDefault();ev.stopPropagation();editText(n)}else if(n&&media(byId(n.dataset.id))){selectElement(n.dataset.id,false);enterCrop(true)}})}
function patchRender(){if(typeof renderStage!=='function'||renderStage.__v081)return;const old=renderStage;renderStage=function(){const r=old();requestAnimationFrame(decorate);return r};renderStage.__v081=true}
function install(){if(V.ready)return;if(!window.MockupV080?.ready||typeof stage==='undefined'||!stage)return setTimeout(install,100);V.ready=true;if(typeof mediaTransform==='function')mediaTransform=e=>`translate(-50%,-50%) scale(${e.cropZoom||1})`;const css=document.createElement('link');css.rel='stylesheet';css.href='./v081-canvas.css?v=0.8.1';css.dataset.v081='1';document.head.append(css);patchRender();addControls();stage.onpointerdown=stageDown081;window.onpointermove=pointerMove081;window.onpointerup=pointerUp081;installViewportPan();installKeys();fitStage=()=>{if(!userZoom)fit(false)};if(qs('#fitButton'))qs('#fitButton').onclick=()=>fit(true);if(qs('#v080Fit'))qs('#v080Fit').onclick=()=>fit(true);window.onresize=()=>{userZoom=false;fit(false)};document.title='Mockup Studio v0.8.1';qs('.v080-version')&&(qs('.v080-version').textContent='v0.8.1');qs('.version')&&(qs('.version').textContent='v0.8.1');document.body.classList.add('v081');decorate();fit();showToast?.('v0.8.1 canvas interactions loaded')}
V.install=install;V.fit=fit;V.setScale=setScale;install();
})();
