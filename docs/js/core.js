const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const stage=$('#stage'),stageWrap=$('#stageWrap'),workspace=$('#workspace'),viewport=$('#stageViewport'),toast=$('#toast');
const imageInput=$('#imageInput'),videoInput=$('#videoInput'),projectInput=$('#projectInput'),snapFrameInput=$('#snapFrameInput');
const projectDialog=$('#projectDialog'),exportDialog=$('#exportDialog'),safeGuides=$('#safeGuides'),guideV=$('#guideV'),guideH=$('#guideH');
const uid=()=>crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`;
const clone=v=>typeof structuredClone==='function'?structuredClone(v):JSON.parse(JSON.stringify(v));
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const slug=v=>String(v||'mockup').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'mockup';
const makeProject=()=>({version:5,name:'Untitled Mockup',canvas:{width:1080,height:1350,background:'#f4f1ea'},elements:[],animation:{duration:5,easing:'ease'},appStore:{device:'iphone',language:'en',shots:[]},updatedAt:new Date().toISOString()});
let project=makeProject(),selectedIds=new Set(),undoStack=[],redoStack=[],customTemplates=[],stageScale=.55,saveTimer,toastTimer,dragState,resizeState,mode='editor',playing=false,playStart=0,animationRaf=0,currentAnimTime=0,selectedShotId=null;
const nextZ=()=>Math.max(0,...project.elements.map(e=>e.z||0))+1;
const selected=()=>project.elements.filter(e=>selectedIds.has(e.id));
const primary=()=>selected()[0]||null;
const isMedia=e=>e&&['image','video'].includes(e.type);

function normalizeProject(p){p.version=5;p.animation=p.animation||{duration:5,easing:'ease'};p.appStore=p.appStore||{device:'iphone',language:'en',shots:[]};p.elements=(p.elements||[]).map(e=>({...e,opacity:e.opacity??1,rotation:e.rotation||0,z:e.z||1,keyframes:e.keyframes||[],cropZoom:e.cropZoom||1,cropX:e.cropX||0,cropY:e.cropY||0,radius:e.radius??32,shadow:e.shadow??true}));return p}
function pushHistory(){undoStack.push(clone(project));if(undoStack.length>80)undoStack.shift();redoStack=[];syncUndo()}
function syncUndo(){$('#undoButton').disabled=!undoStack.length;$('#redoButton').disabled=!redoStack.length}
function undo(){if(!undoStack.length)return;redoStack.push(clone(project));project=undoStack.pop();selectedIds=new Set([...selectedIds].filter(id=>project.elements.some(e=>e.id===id)));renderAll();queueSave()}
function redo(){if(!redoStack.length)return;undoStack.push(clone(project));project=redoStack.pop();renderAll();queueSave()}
function showToast(m){toast.textContent=m;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1900)}

function fitStage(){const aw=Math.max(240,viewport.clientWidth-90),ah=Math.max(240,viewport.clientHeight-145);stageScale=Math.min(aw/project.canvas.width,ah/project.canvas.height,.8);stageScale=Math.max(.1,stageScale);stageWrap.style.transform=`scale(${stageScale})`;stageWrap.style.margin=`${-(project.canvas.height*(1-stageScale))/2}px ${-(project.canvas.width*(1-stageScale))/2}px`}
function renderAll(){renderStage();renderLayers();renderProperties();renderStoreShots();renderKeyframes();renderVideoControls();syncUndo();requestAnimationFrame(fitStage)}
function frameClass(frame){return `frame-${frame||'none'}`}
function mediaTransform(e){return `translate(-50%,-50%) translate(${e.cropX||0}%,${e.cropY||0}%) scale(${e.cropZoom||1})`}
function renderStage(){stage.style.width=`${project.canvas.width}px`;stage.style.height=`${project.canvas.height}px`;stageWrap.style.width=`${project.canvas.width}px`;stageWrap.style.height=`${project.canvas.height}px`;stage.style.background=project.canvas.background;stage.innerHTML='';
  [...project.elements].sort((a,b)=>(a.z||0)-(b.z||0)).forEach(e=>{const n=document.createElement('div');n.dataset.id=e.id;n.className=`stage-element ${selectedIds.has(e.id)?'selected':''}`;Object.assign(n.style,{left:`${e.x}px`,top:`${e.y}px`,width:`${e.width}px`,height:`${e.height}px`,opacity:e.opacity??1,transform:`rotate(${e.rotation||0}deg)`,zIndex:String(e.z||1)});
    if(isMedia(e)){n.classList.add(frameClass(e.frame),e.shadow?'shadow':'');n.style.setProperty('--media-radius',`${e.radius??32}px`);const shell=document.createElement('div');shell.className='media-shell';const m=document.createElement(e.type==='video'?'video':'img');m.src=e.src;m.style.transform=mediaTransform(e);if(e.type==='video'){m.muted=e.muted!==false;m.loop=false;m.playsInline=true;m.preload='metadata';m.autoplay=true;m.playbackRate=e.speed||1;m.addEventListener('loadedmetadata',()=>{m.currentTime=e.trimStart||0},{once:true});m.addEventListener('timeupdate',()=>{const end=e.trimEnd??e.duration??m.duration;if(m.currentTime>=end)m.currentTime=e.trimStart||0;for(const [a,b] of e.cuts||[])if(m.currentTime>=a&&m.currentTime<b)m.currentTime=b})}else m.alt=e.name||'Uploaded image';shell.append(m);n.append(shell)}
    else if(e.type==='text'){n.classList.add('text-element');n.textContent=e.text||'';n.style.fontSize=`${e.fontSize||64}px`;n.style.color=e.color||'#111827';n.style.fontWeight=e.bold?'800':'600'}
    else {n.classList.add('shape-element',e.shape||'rect');n.style.background=e.fill||'#f0ca65';n.style.border=`${e.strokeWidth||0}px solid ${e.stroke||'#111827'}`;n.style.setProperty('--stroke',e.stroke||'#111827');n.style.setProperty('--stroke-width',`${e.strokeWidth||6}px`);if(e.shape==='step')n.textContent=e.text||'1'}
    if(selectedIds.has(e.id)&&selectedIds.size===1){const h=document.createElement('div');h.className='resize-handle';n.append(h)}stage.append(n)});
  $('#selectionLabel').textContent=`${selectedIds.size} selected`;
}
function renderLayers(){const l=$('#layersList');l.innerHTML='';[...project.elements].sort((a,b)=>(b.z||0)-(a.z||0)).forEach(e=>{const r=document.createElement('div');r.className=`layer-row ${selectedIds.has(e.id)?'selected':''}`;const icon=e.type==='image'?'▧':e.type==='video'?'▶':e.type==='text'?'T':e.shape==='arrow'?'➜':'◇';r.innerHTML=`<span class="layer-icon">${icon}</span><span class="layer-name"></span>`;r.querySelector('.layer-name').textContent=e.name||e.text||e.shape||e.type;r.onclick=ev=>selectElement(e.id,ev.shiftKey||ev.metaKey||ev.ctrlKey);l.append(r)})}
function renderProperties(){const list=selected(),e=list[0],multi=list.length>1;$('#emptyProperties').hidden=!!e;$('#properties').hidden=!e;if(!e)return;['#propX','#propY','#propW','#propH','#propRotation','#propOpacity'].forEach(s=>$(s).disabled=multi);if(!multi){$('#propX').value=Math.round(e.x);$('#propY').value=Math.round(e.y);$('#propW').value=Math.round(e.width);$('#propH').value=Math.round(e.height);$('#propRotation').value=e.rotation||0;$('#rotationValue').textContent=`${Math.round(e.rotation||0)}°`;$('#propOpacity').value=Math.round((e.opacity??1)*100);$('#opacityValue').textContent=`${Math.round((e.opacity??1)*100)}%`}
  const media=isMedia(e),text=e.type==='text',shape=e.type==='shape';$('#mediaProperties').hidden=!media;$('#textProperties').hidden=!text;$('#shapeProperties').hidden=!shape;
  if(media){$('#propFrame').value=e.frame||'none';$('#propRadius').value=e.radius??32;$('#radiusValue').textContent=e.radius??32;$('#propCropZoom').value=Math.round((e.cropZoom||1)*100);$('#cropZoomValue').textContent=`${Math.round((e.cropZoom||1)*100)}%`;$('#propCropX').value=e.cropX||0;$('#propCropY').value=e.cropY||0;$('#propShadow').checked=!!e.shadow}
  if(text){$('#propText').value=e.text||'';$('#propFontSize').value=e.fontSize||64;$('#propColor').value=e.color||'#111827';$('#propBold').checked=!!e.bold}
  if(shape){$('#propFill').value=toHex(e.fill||'#f0ca65');$('#propStroke').value=toHex(e.stroke||'#111827');$('#propStrokeWidth').value=e.strokeWidth||0}
}
function toHex(c){return /^#[0-9a-f]{6}$/i.test(c)?c:'#111827'}
function selectElement(id,add=false){if(add){selectedIds.has(id)?selectedIds.delete(id):selectedIds.add(id)}else selectedIds=new Set([id]);renderStage();renderLayers();renderProperties();renderVideoControls();renderKeyframes()}
function clearSelection(){selectedIds.clear();renderStage();renderLayers();renderProperties();renderVideoControls();renderKeyframes()}
