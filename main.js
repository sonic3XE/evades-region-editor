const isForked=location.origin+location.pathname!=="https://sonic3xe.github.io/evades-region-editor/",reloadPage=location.reload.bind(location),canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),map={name: "No Name",share_to_drive:true,players:[],properties:{},areas:[]},camSpeed=10,selectBuffer=5,manageExtensions=function(str){(activated_extensions.indexOf(str)==-1)?activated_extensions.push(str):activated_extensions.splice(activated_extensions.indexOf(str),1),localStorage.activatedExtensions=activated_extensions},getObjects=function(){return [...map.areas[current_Area].zones,...map.areas[current_Area].assets]},cons=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/consumedd.mp4"),prec=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/jumpscare.mp3"),luma=function(arr){return arr.map(e=>{var v=e/255;return v<.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).map((e,t)=>{return[.2126,.7152,0.0722,0][t]*e}).reduce((e,t)=>{return e+t},0)*255},customAlert=function(text,duration=2,color="#fff"){if(duration<=0)return;alertMessages.push({text,color});duration!=1/0&&setTimeout(e=>alertMessages.splice(alertMessages.map(e=>e.text).indexOf(text),1),duration*1e3)},hexToArr=function(hex){return[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]},arrtoRGBA=function(arr){return`rgba(${arr.join()})`},fillZeros=function(str="0",digits=2,filler="0"){return filler.repeat(digits-str.length)+str},RGBtoHex=function(arr){return`#${fillZeros(Number(arr[0]).toString(16))}${fillZeros(Number(arr[1]).toString(16))}${fillZeros(Number(arr[2]).toString(16))}`},RGBAtoHex=function(arr){return`${RGBtoHex(arr)}${fillZeros(Number(arr[3]).toString(16))}`},ExtractDiff=function(e){e=e.replace(/ /g,"");const t=e.split("+"),i=e.split("-");return t.length>1?parseInt(t[1]||0):i.length>1?-parseInt(i[1]||0):0},loadData=async function(){await fetch("world.yaml").then(e=>{if(e?.status>=400&&!e?.ok)return customAlert(`[Error ${e.target.status}]: Unable to fetch data "${url}"`,20,"#FF0000");if(e?.status>=200&&e?.ok)return e?.text().then(t=>{return WORLD=YAML.parse(t)});console.log("bruh",e)}).catch(e=>{return customAlert(e,1/0,"#FFFF00")})},
YAML={parse:function(e){return jsyaml.load(e,null)},stringify:function(e){return jsyaml.dump(e,{noCompatMode:true})}};
/*(from Discord) amasterclasher — Thu, Aug 1, 2024 01:16:33 EDT
	added a maximum speed property so if any mapmakers would like to put that in to their maps, it does work now
	also @Sοηiς.εχэ will ping you since you seem to care about this stuff
*/
let camScale=5/32,camX=0,camY=0,selectMode=null,lockCursor=false,resizing=false,alertMessages=[];
const types = ["wall", "light_region", "flashlight_spawner", "torch", "gate", "active", "safe", "exit", "teleport", "victory", "removal"];
const keysDown = new Set();
document.addEventListener("keydown",e=>{if(confirmationPopup)return;!(e.repeat||e.ctrlKey||e.target instanceof HTMLInputElement)&&keysDown.add(e.which)});
document.addEventListener("keyup",e=>keysDown.delete(e.which))
var zoneconsts={
  normal: {
    active: createOffscreenCanvas(128, 128),
    safe: createOffscreenCanvas(128, 128),
    exit: createOffscreenCanvas(128, 128),
    teleport: createOffscreenCanvas(128, 128),
    victory: createOffscreenCanvas(128, 128),
    removal: createOffscreenCanvas(128, 128),
    dummy: createOffscreenCanvas(128, 128)
  }, leaves: {
    active: createOffscreenCanvas(128, 128),
    safe: createOffscreenCanvas(128, 128),
    exit: createOffscreenCanvas(128, 128),
    teleport: createOffscreenCanvas(128, 128),
    victory: createOffscreenCanvas(128, 128),
    removal: createOffscreenCanvas(128, 128),
    dummy: createOffscreenCanvas(128, 128)
  }, wooden: {
    active: createOffscreenCanvas(128, 128),
    safe: createOffscreenCanvas(128, 128),
    exit: createOffscreenCanvas(128, 128),
    teleport: createOffscreenCanvas(128, 128),
    victory: createOffscreenCanvas(128, 128),
    removal: createOffscreenCanvas(128, 128),
    dummy: createOffscreenCanvas(128, 128)
  }, baguette: {
    active: createOffscreenCanvas(128, 128),
    safe: createOffscreenCanvas(128, 128),
    exit: createOffscreenCanvas(128, 128),
    teleport: createOffscreenCanvas(128, 128),
    victory: createOffscreenCanvas(128, 128),
    removal: createOffscreenCanvas(128, 128),
    dummy: createOffscreenCanvas(128, 128)
  }, ice: { active: createOffscreenCanvas(512, 512) }
}
importer.addEventListener("input",e=>{
  if(!importer.selectedIndex)return;
  var req=new XMLHttpRequest,url=WORLD.regions[importer.selectedIndex-1].file;
  if(consumed_by_ink_demon=!url.endsWith(".yaml"))return;
  req.addEventListener("load",e=>{
    if(e.target.status>=400)return customAlert(`[Error ${e.target.status} (${e.target.statusText})!!1]: Unable to fetch file "${url}"`,20,"#FF0000");
    if(e.target.status>=200)return loadFile(e.target.responseText,false,false);
	console.log("bruh",req);
    if(e.target.status==0)return customAlert(`[No connection]: Please check your internet connection because you might be offline.`,20,"#FFFF00");
  }),req.open("GET",(importer.selectedIndex=0,url)),req.send();
})
function updateMap(){let lastZone,boundaries,FileDef,pushX,pushY;map.areas.map((area,i,r)=>(boundaries=[getAreaBoundary(area)],FileDef=WORLD&&WORLD.regions.filter(e=>e.file==`regions/${map.name.split(" ").join("-").toLowerCase()}.yaml`)[0]||{x:0,y:0},pushX=0,pushY=0,area.rx.toString().startsWith("var x")&&(area.x=FileDef.x+ExtractDiff(area.rx)),area.ry.toString().startsWith("var y")&&(area.y=FileDef.y+ExtractDiff(area.ry)),boundaries[0].left&&((pushX=-boundaries[0].left,current_Area==i&&(camX+=pushX),area.rx.toString().startsWith("var x"))?(area.rx=("var x +"+(ExtractDiff(area.rx)+boundaries[0].left)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.x.value=area.rx):(area.rx.toString().startsWith("last_x"))?(area.rx=("last_x +"+(ExtractDiff(area.rx)+boundaries[0].left)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.x.value=area.rx):(area.rx.toString().startsWith("last_right"))?(area.rx=("last_right +"+(ExtractDiff(area.rx)+boundaries[0].left)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.x.value=area.rx):(area.rx=area.x+boundaries[0].left,area.x=area.rx,area.inputs)&&(area.inputs.x.value=area.rx)),boundaries[0].top&&((pushY=-boundaries[0].top,current_Area==i&&(camY+=pushY),area.ry.toString().startsWith("var y"))?(area.ry=("var y +"+(ExtractDiff(area.ry)+boundaries[0].top)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.y.value=area.ry):(area.ry.toString().startsWith("last_y"))?(area.ry=("last_y +"+(ExtractDiff(area.ry)+boundaries[0].top)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.y.value=area.ry):(area.ry.toString().startsWith("last_bottom"))?(area.ry=("last_bottom +"+(ExtractDiff(area.ry)+boundaries[0].top)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.y.value=area.ry):(area.ry=area.y+boundaries[0].top,area.y=area.ry,area.inputs)&&(area.inputs.y.value=area.ry)),r[i-1]&&(boundaries.push(getAreaBoundary(r[i-1])),area.rx.toString().startsWith("last_x")&&(area.x=r[i-1].x+ExtractDiff(area.rx)),area.ry.toString().startsWith("last_y")&&(area.y=r[i-1].y+ExtractDiff(area.ry)),area.rx.toString().startsWith("last_right")&&(area.x=boundaries[1].right+r[i-1].x+ExtractDiff(area.rx)),area.ry.toString().startsWith("last_bottom")&&(area.y=boundaries[1].bottom+r[i-1].y+ExtractDiff(area.ry))),area.zones.map((zone,j,u)=>(lastZone=u[j-1],!isNaN(zone.rx)&&(zone.rx+=pushX),!isNaN(zone.ry)&&(zone.ry+=pushY),zone.x+=pushX,zone.y+=pushY,zone.inputs&&(zone.inputs.x.value=zone.rx,zone.inputs.y.value=zone.ry),(lastZone&&(zone.ry=="last_y"||zone.ry=="last_top"||zone.rx=="last_x"||zone.rx=="last_left"||zone.rw=="last_width"||zone.rh=="last_height"||zone.rx=="last_right"||zone.ry=="last_bottom"))&&((zone.rx=="last_x"||zone.rx=="last_left")&&(zone.x=lastZone.x),(zone.ry=="last_y"||zone.ry=="last_top")&&(zone.y=lastZone.y),zone.rw=="last_width"&&(zone.width=lastZone.width),zone.rh=="last_height"&&(zone.height=lastZone.height),zone.rx=="last_right"&&(zone.x=lastZone.x+lastZone.width),zone.ry=="last_bottom"&&(zone.y=lastZone.y+lastZone.height)))))),spawnEntities()}
var copiedObjects=[];
function roundTo(x, y) { return Math.round(x / y) * y }
// Zooming
var current_Area = 0;
var speedMultiplier=1;
var zoomLimit=8388608;
canvas.addEventListener("wheel", e => {
  if (e.ctrlKey) return;
  let m = 0.85 ** (e.deltaY / 125)*speedMultiplier;
  let x = (e.pageX - canvas.width / 2) / camScale + camX;
  let y = (e.pageY - canvas.height / 2) / camScale + camY;
  if(playtesting)return;
  camScale *= m;
  if(camScale>32||camScale<1/zoomLimit)m=1;
  camX = (m * x - x + camX) / m;
  camY = (m * y - y + camY) / m;
  camScale = Math.min(Math.max(1/zoomLimit,camScale),32);
},{capture:true,passive:true});
const mousePos={x:0,y:0,ex:0,ey:0}
let mouseEntity={x:mousePos.x + camX,y:mousePos.y + camY}
canvas.addEventListener("mousemove", e => {
  mousePos.x=(e.offsetX - canvas.width / 2) / camScale+camX;
  mousePos.y=(e.offsetY - canvas.height / 2) / camScale+camY;
});
var isMouse=false;
canvas.addEventListener("mousedown", e => {
  if (e.button === 1) e.preventDefault();
  if (e.button !== 0) return;
  let target = targetedObject(e);
  if(lockCursor)return;
  /**
   * @param {MouseEvent} e 
   */
  
  let beforeresize=e=>{}
  let resize = e => { };
  if (target) {
    var temp={width:target.width,height:target.height,
x:target.x,y:target.y};
	for(let obj in selectedObjects){
		if (selectedObjects[obj] && "element" in selectedObjects[obj]) selectedObjects[obj].element.remove();
	}
	selectedObjects.includes(target) || keysDown.has(controls.FOCUS) || (selectedObjects = [])
    selectedObjects.includes(target) || selectedObjects.push(target);
	selectedObjects.sort((e,t)=>{
		var a=map.areas[current_Area].zones.indexOf.bind(map.areas[current_Area].zones);
		var b=map.areas[current_Area].assets.indexOf.bind(map.areas[current_Area].assets);
		return (e.isAsset?b(e)+map.areas[current_Area].zones.length:a(e))-(t.isAsset?b(t)+map.areas[current_Area].zones.length:a(t));
	});
    if(target.isAsset){
      customASSETgui(target);
    }else{
      customZONEgui(target);
    }
    objectmenu.appendChild(target.element);
    const { x: posX, y: posY, width: sizeX, height: sizeY } = target ?? target;
    const mouseX = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
    const mouseY = Math.round((e.pageY - canvas.height / 2) / camScale + camY);

    {
      var snap={x:localStorage.getItem("snapX")||16,y:localStorage.getItem("snapY")||16}
      switch (selectMode) {
        default:
          resize = e => {
			let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
			if(selectMode.includes("u")){
				if(!isNaN(target.ry))target.ry=target.y = roundTo(y, snap.y);
				if(!isNaN(target.rh))target.rh=target.height = roundTo(posY - y + sizeY, snap.y);
				if(!isNaN(target.ry))target.inputs.y.value = target.y;
				if(!isNaN(target.rh))target.inputs.height.value = target.height;
			}
			if(selectMode.includes("d")){
				if(!isNaN(target.rh))target.rh=target.height = roundTo(y - posY, snap.y);
				if(!isNaN(target.ry))target.inputs.y.value = target.y;
				if(!isNaN(target.rh))target.inputs.height.value = target.height;
			}
			let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
			if(selectMode.includes("r")){
				if(!isNaN(target.rw))target.rw = target.width = roundTo(x - posX, snap.x);
				if(!isNaN(target.rx))target.inputs.x.value = target.x;
				if(!isNaN(target.rw))target.inputs.width.value = target.width;
			}
			if(selectMode.includes("l")){
				if(!isNaN(target.rx))target.rx = target.x = roundTo(x, snap.x);
				if(!isNaN(target.rw))target.rw = target.width = roundTo(posX - x + sizeX, snap.x);
				if(!isNaN(target.rx))target.inputs.x.value = target.x;
				if(!isNaN(target.rw))target.inputs.width.value = target.width;
			}
          }
          break;
        case "m":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if (e.shiftKey && target.translate) {
              let tx = Math.round((e.pageX - canvas.width / 2) / camScale + camX) - target.x;
              let ty = Math.round((e.pageY - canvas.height / 2) / camScale + camY) - target.y;
              target.translate.x = roundTo(tx - mouseX + posX, snap.x);
              target.translate.y = roundTo(ty - mouseY + posY, snap.y);

              target.inputs.tx.value = target.translate.x;
              target.inputs.ty.value = target.translate.y;
            } else {

              if(!isNaN(target.rx))
                target.rx = target.x = roundTo(x - mouseX + posX, snap.x),
                target.inputs.x.value = target.x;
              if(!isNaN(target.ry))
                target.ry = target.y = roundTo(y - mouseY + posY, snap.y),
                target.inputs.y.value = target.y;
            }
          }
          break;
      }
    }

    lockCursor = true;
    const u =(e)=>{
      let lastx=target.x;
      let lasty=target.y;
      let lastwidth=target.width;
      let lastheight=target.height;
      map.areas[current_Area].entities=[];
      resize(e);
	  var diffx=target.x-lastx;
	  var diffy=target.y-lasty;
      target.x=lastx;
      target.y=lasty;
	  selectedObjects.map(e=>{
		  (!isNaN(parseInt(e.rx)))&&(e.x+=diffx);
		  (!isNaN(parseInt(e.ry)))&&(e.y+=diffy);
		  (!isNaN(parseInt(e.rx)))&&(e.rx=e.x);
		  (!isNaN(parseInt(e.ry)))&&(e.ry=e.y);
	  })
      lastx=target.x;
      lasty=target.y;
    };
	window.onmousemove=u;
	window.onmouseup=()=>{lockCursor=false;updateMap();window.onmousemove=null;window.onmouseup=null};
  } else {
    selectedObjects.map(v=>{
      if(v.properties){
        "element" in v.properties && v.properties.element.remove();
        delete v.properties.inputs;
        delete v.properties.element;
      };
      "element" in v && v.element.remove();
      delete v.element;
      delete v.inputs;
      v.spawner&&v.spawner.map(e=>{
		  e.types.map(t=>{
			  "element" in t && t.element.remove();
			  delete t.element;
		  });
		  "element" in e && e.element.remove();
		  delete e.element;
		  delete e.inputs
	  });
    });
    selectedObjects = [];
  }
});

/** 
 * @param {MouseEvent} e 
 * @returns {Zone | Asset}
 */
function targetedObject(e) {
  const t = canvas.getBoundingClientRect();
  const gameScale=Math.min(global.innerWidth/1280,global.innerHeight/720);
  const mouse_position = {x:(e.pageX - t.left),y:(e.pageY - t.top)};
  const gameMouseCursor={
	x:(mouse_position.x-t.width/2)/gameScale,
	y:(mouse_position.y-t.height/2)/gameScale
  };
  if(Math.abs(gameMouseCursor.x)>640)return null;
  if(Math.abs(gameMouseCursor.y)>360)return null;
  if(playtesting)return;
  let objects = getObjects(/*type*/);
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = /*selectedObject||*/objects[i];
    const [{ x: x0, y: y0, width: x1, height: y1 }] = points(obj);
    const mouse = mouse_position;
    if (obj.type === "flashlight_spawner" || obj.type === "torch") {
      if (pointInCircle(mouse, { x: x0, y: y0 }, 16 * camScale + selectBuffer)) {
        return obj;
      }
      continue;
    }
    if (pointInRect(mouse, { x: Math.min(x1,x0) - selectBuffer, y: Math.min(y1,y0) - selectBuffer }, { x: Math.max(x1,x0) + selectBuffer, y: Math.max(y1,y0) + selectBuffer })) return obj;
  }
  return null;
}

canvas.addEventListener("mousemove", e => {
  const t = canvas.getBoundingClientRect();
  const gameScale=Math.min(global.innerWidth/1280,global.innerHeight/720);
  const mouse_position = {x:(e.pageX - t.left),y:(e.pageY - t.top)};
  const gameMouseCursor={
	x:(mouse_position.x-t.width/2)/gameScale,
	y:(mouse_position.y-t.height/2)/gameScale
  };
  if(lockCursor)return;
  for (let type of types) {
    if(Math.abs(gameMouseCursor.x)>640||Math.abs(gameMouseCursor.y)>360||playtesting)break;
    let arr = getObjects(type);

    for (let i = arr.length - 1; i >= 0; i--) {
      const obj = /*selectedObject||*/arr[i];
      const [{ x: x0, y: y0, width: x1, height: y1 }] = points(obj);
      const mouse = point(e);

      if (type === "flashlight_spawner") {
        if (pointInCircle(mouse, { x: x0, y: y0 }, 16 * camScale + selectBuffer)) {
          canvas.style.cursor = "grab";
          selectMode = "m";
          return;
        }
        continue;
      } else if (type === "torch") {
        if (pointInCircle(mouse, { x: x0, y: y0 }, 16 * camScale + selectBuffer)) {
          canvas.style.cursor = "grab";
          selectMode = "m";
          return;
        }
        continue;
      }
      var fixedPosX0=Math.min(x1,x0);
      var fixedPosY0=Math.min(y1,y0);
      var fixedPosX1=Math.max(x1,x0);
      var fixedPosY1=Math.max(y1,y0);
      const outer = pointInRect(mouse, { x: fixedPosX0 - selectBuffer, y: fixedPosY0 - selectBuffer }, { x: fixedPosX1 + selectBuffer, y: fixedPosY1 + selectBuffer });
      const up = pointInRect(mouse, { x: fixedPosX0 - selectBuffer, y: fixedPosY0 - selectBuffer }, { x: fixedPosX1 + selectBuffer, y: fixedPosY0 + selectBuffer });
      const left = pointInRect(mouse, { x: fixedPosX0 - selectBuffer, y: fixedPosY0 - selectBuffer }, { x: fixedPosX0 + selectBuffer, y: fixedPosY1 + selectBuffer });
      const down = pointInRect(mouse, { x: fixedPosX0 - selectBuffer, y: fixedPosY1 - selectBuffer }, { x: fixedPosX1 + selectBuffer, y: fixedPosY1 + selectBuffer });
      const right = pointInRect(mouse, { x: fixedPosX1 - selectBuffer, y: fixedPosY0 - selectBuffer }, { x: fixedPosX1 + selectBuffer, y: fixedPosY1 + selectBuffer });
      const middle = pointInRect(mouse, { x: fixedPosX0, y: fixedPosY0 }, { x: fixedPosX1, y: fixedPosY1 });

      if (middle) {
        canvas.style.cursor = "grab";
        selectMode = "m";
      } else if (down) {
        if (left) {
          canvas.style.cursor = "nesw-resize";
          selectMode = "dl";
        } else if (right) {
          canvas.style.cursor = "nwse-resize";
          selectMode = "dr";
        } else {
          canvas.style.cursor = "ns-resize";
          selectMode = "d";
        }
      } else if (right) {
        if (up) {
          canvas.style.cursor = "nesw-resize";
          selectMode = "ur";
        } else if (down) {
          canvas.style.cursor = "nwse-resize";
          selectMode = "dr";
        } else {
          canvas.style.cursor = "ew-resize";
          selectMode = "r";
        }
      } else if (up) {
        if (left) {
          canvas.style.cursor = "nwse-resize";
          selectMode = "ul";
        } else if (right) {
          canvas.style.cursor = "nesw-resize";
          selectMode = "ur";
        } else {
          canvas.style.cursor = "ns-resize";
          selectMode = "u";
        }
      } else if (left) {
        if (up) {
          canvas.style.cursor = "nwse-resize";
          selectMode = "ul";
        } else if (down) {
          canvas.style.cursor = "nesw-resize";
          selectMode = "dl";
        } else {
          canvas.style.cursor = "ew-resize";
          selectMode = "l";
        }
      } else {
        canvas.style.cursor = "initial";
        selectMode = null;
      }

      if (outer) return;
    }
  }
  canvas.style.cursor = "initial";
});
let updateMouseEntity=true,selectedObjects=[],hitbox=true;
canvas.addEventListener("contextmenu",e=>{if(e.preventDefault(),e.target===contextmenu||playtesting)return;contextmenu.style.left=e.x+1+"px";contextmenu.style.top=e.y+1+"px";duplicateObject.disabled=deleteObject.disabled=copyObject.disabled=cutObject.disabled=!selectedObjects.length;pasteObject.disabled=!copyObjects.length;rotateObject.disabled=(!selectedObjects.length)||(selectedObjects.length==1?(selectedObjects.filter(e=>(isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length):(selectedObjects.filter(e=>(isNaN(parseInt(e.rx))||isNaN(parseInt(e.ry))||isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length));deleteArea.disabled=map.areas.length<2;show(contextmenu,updateMouseEntity=false)});
[displayEnergyBars,tileMode,body_collection,hat_collection,gem_collection].map(e=>e.addEventListener("input",t=>{settings[t.target.id.split("_")[0]]=t.target.selectedIndex}));
[fadingEffects,legacySpeedUnits,realTime,enemyOutlines,toggleMouseMovement,enableMouseMovement,confetti,legacy30FPS,displayTimer].map(e=>e.addEventListener("input",t=>{settings[t.target.id]=t.target.checked}));
[snapX,pelletTransparency,snapY].map(e=>e.addEventListener("input",t=>{settings[t.target.id]=t.target.value}));
lang.addEventListener("input",e=>{settings.language=e.target.selectedIndex;loadLanguage(`${languages[settings.language]}.json`)});
herotype.addEventListener("input",e=>{settings.heroType=e.target.selectedIndex});
joystickDeadzone.addEventListener("input",e=>{settings.joystickDeadzone=e.target.selectedIndex/20});
document.addEventListener("click",e=>{if(e.target==contextmenu||e.target.parentNode==contextmenu&&e.button==2)return;if(e.target==canvas&&e.button==2)return;hide(contextmenu,updateMouseEntity=true)});
reset.addEventListener("click",e=>{
	customConfirm(formatString("editor.confirm.start_from_scratch"),formatString("editor.confirm.yes"),formatString("editor.confirm.no"),r=>{r&&loadFile(`name: No Name
areas:
  - x: var x
    y: var y
    zones:
      - type: safe
        x: 0
        y: 0
        width: 160
        height: 160
`,false,false)})
})
Object.defineProperty(global,"consumed_by_ink_demon",{
	get(){
		if(!prec.ended && prec.paused && useractive.hasBeenActive && new Date().getMonth()==3 && new Date().getDate()==1){
			global.a=1;
			prec.play();
			setTimeout(()=>{
			cons.play()
			setTimeout(()=>{VFX.play()},5e3);
			document.body.requestFullscreen();
			},2e3);
			return true;
		}
		return false;
	},
	set(e){
		if(!prec.ended && prec.paused && useractive.hasBeenActive && Boolean(e)){
			global.a=1;
			prec.play();
			setTimeout(()=>{
			cons.play()
			setTimeout(()=>{VFX.play()},5e3);
			document.body.requestFullscreen();
			},2e3);
			return true;
		}
		return false;
	}
});
document.addEventListener("keydown", e => {
  if(confirmationPopup)return;
  var camera = { x: camX, y: camY }
  if (e.target instanceof HTMLInputElement) return;
  if(e.ctrlKey && e.which === $0372b03b1cca8a43$export$8309310f4f3643db.A){
	  e.preventDefault(selectedObjects.push(...map.areas[current_Area].zones,...map.areas[current_Area].assets));
	  return;
  }
  if(e.ctrlKey && e.which === $0372b03b1cca8a43$export$8309310f4f3643db.C && selectedObjects.length){
	  e.preventDefault(copyObjs());
	  return;
  }
  if(e.ctrlKey && e.which === $0372b03b1cca8a43$export$8309310f4f3643db.X && selectedObjects.length){
	  e.preventDefault(cutObjs());
	  return;
  }
  if(e.ctrlKey && e.which === $0372b03b1cca8a43$export$8309310f4f3643db.V && copyObjects.length){
	  e.preventDefault(pasteObjs());
	  return;
  }
	if (e.which === controls.TOGGLE_LEADERBOARD){
		toggleLeaderboard = !toggleLeaderboard;
		localStorage.leaderboard=toggleLeaderboard;
		(global.leaderboard)&&(leaderboard.hidden=!toggleLeaderboard);
	}
	if (e.which === controls.TOGGLE_CHAT){
		toggleChat = !toggleChat;
		localStorage.chat=toggleChat;
		(global.chat)&&(chat.hidden=!toggleChat);
	}
  if (e.which === controls.PLAYTEST){
  	if(e.preventDefault(),consumed_by_ink_demon)return customAlert("Fatal Error",5,"#F00");
	//return customAlert("Error 404: Simulation Not Found",5);
    playtesting=!playtesting;
    tl.style.transform="translate("+(-100*playtesting)+"px, 0)";
    menu.hidden=playtesting;
    realTime.disabled=playtesting;
    realTime.disabled?(realTime.checked=true):(realTime.checked=eval(localStorage.realTime));
    playtesting?(window.tempCamPos={x:camX,y:camY,area:current_Area}):(camX=window.tempCamPos.x,camY=window.tempCamPos.y);
	if(playtesting){
		evadesRenderer={snowRenderer:new SnowRenderer,dynamicLighting:new DynamicLighting(1),directionalIndicatorHud:new DirectionalIndicatorHud,experienceBar:new ExperienceBar,heroInfoCard:new HeroInfoCard,bottomText:new BottomText,titleText:new TitleText,minimap:new Minimap,areaInfo:new AreaInfo};
		evadesRenderer.minimap.updateZones();
		var safezone=map.areas[0].zones.filter(e=>e.type=="safe")[0]??map.areas[0].zones[0],
		selfPlayer=new Player(safezone.x+16+(safezone.width-32)*Math.random(),safezone.y+16+(safezone.height-32)*Math.random());
		global.selfId=selfPlayer.id;
		map.players.push(selfPlayer);
		evadesRenderer.heroInfoCard.abilityOne=new $097def8f8d652b17$export$2e2bcd8739ae039;
		evadesRenderer.heroInfoCard.abilityTwo=new $097def8f8d652b17$export$2e2bcd8739ae039;
		evadesRenderer.heroInfoCard.abilityOne.afterStateUpdate(abilityConfig[selfPlayer.abilityOne.abilityType]);
		evadesRenderer.heroInfoCard.abilityTwo.afterStateUpdate(abilityConfig[selfPlayer.abilityTwo.abilityType]);
		selfPlayer.abilityThree&&evadesRenderer.heroInfoCard.abilityThree.afterStateUpdate(abilityConfig[selfPlayer.abilityThree.abilityType]);
		spawnEntities(selfPlayer.area);
	}else{
		let selfPlayer=map.players.filter(e=>e.id==selfId)[0];
		selfPlayer&&(map.players.splice(map.players.indexOf(selfPlayer),1),selfId=null,current_Area=tempCamPos.area,spawnEntities());
		evadesRenderer={snowRenderer:new SnowRenderer,dynamicLighting:new DynamicLighting(1)};
	}
  };
  if(playtesting){
	var plr=map.players[map.players.map(t=>t.id).indexOf(selfId)];
	//Teleports you to another area (Command: /tp, /teleport <area>)
	if(e.which === $0372b03b1cca8a43$export$8309310f4f3643db.E){
		map.areas[current_Area].entities=[];
		current_Area=Math.max(Math.min(current_Area-1,map.areas.length-1),0)
		var safezone=map.areas[current_Area].zones.filter(e=>e.type=="safe")[0]??map.areas[current_Area].zones[0];
		plr.x=safezone.x+16+(safezone.width-32)*Math.random();
		plr.y=safezone.y+16+(safezone.height-32)*Math.random();
		plr.onTele=true;
		spawnEntities();
		plr.area=current_Area;
	}
	if(e.which === $0372b03b1cca8a43$export$8309310f4f3643db.T){
		map.areas[current_Area].entities=[];
		current_Area=Math.max(Math.min(current_Area+1,map.areas.length-1),0);
		var safezone=map.areas[current_Area].zones.filter(e=>e.type=="safe")[0]??map.areas[current_Area].zones[0];
		plr.x=safezone.x+16+(safezone.width-32)*Math.random();
		plr.y=safezone.y+16+(safezone.height-32)*Math.random();
		plr.onTele=true;
		spawnEntities();
		plr.area=current_Area;
	}
	if(e.which === $0372b03b1cca8a43$export$8309310f4f3643db.R){//Max out hero card (Command: /max)
		plr.speed=17*30;
		plr.maxEnergy=300;
		plr.energy=300;
		plr.energyRegen=7;
		plr.level=100;
		plr.experience=plr.nextLevelExperience;
		evadesRenderer.heroInfoCard.abilityOne.locked=false;
		evadesRenderer.heroInfoCard.abilityOne.level=evadesRenderer.heroInfoCard.abilityOne.maxLevel;
		evadesRenderer.heroInfoCard.abilityTwo.locked=false;
		evadesRenderer.heroInfoCard.abilityTwo.level=evadesRenderer.heroInfoCard.abilityTwo.maxLevel;
		if(plr.abilityThree){
			evadesRenderer.heroInfoCard.abilityThree.locked=false;
			evadesRenderer.heroInfoCard.abilityThree.level=evadesRenderer.heroInfoCard.abilityThree.maxLevel;
		}
	}
	if(e.which === $0372b03b1cca8a43$export$8309310f4f3643db.Y){//Toggle Cooldown (Command: /cd, /cooldown)
		plr.noCooldown=!plr.noCooldown;
	}
	if(e.which === $0372b03b1cca8a43$export$8309310f4f3643db.U){//Revive (Command: /r, /s, /save, /revive)
		plr.deathTimer=-1;
	}
    if(e.which === controls.PLAYTEST - 3&&location.search=="?isDev"){//Admin (Command: /a, /admin)
		e.preventDefault();
		plr.admin=true;
		plr.deathTimer=-1;
		plr.speed=17*30;
		plr.maxEnergy=500;
		plr.energy=500;
		plr.level=100;
		plr.experience=plr.nextLevelExperience;
		plr.energyRegen=500;
		plr.noCooldown=true;
		evadesRenderer.heroInfoCard.abilityOne.locked=false;
		evadesRenderer.heroInfoCard.abilityOne.level=evadesRenderer.heroInfoCard.abilityOne.maxLevel;
		evadesRenderer.heroInfoCard.abilityTwo.locked=false;
		evadesRenderer.heroInfoCard.abilityTwo.level=evadesRenderer.heroInfoCard.abilityTwo.maxLevel;
		if(plr.abilityThree){
			evadesRenderer.heroInfoCard.abilityThree.locked=false;
			evadesRenderer.heroInfoCard.abilityThree.level=evadesRenderer.heroInfoCard.abilityThree.maxLevel;
		}
    }else if(e.which === controls.PLAYTEST - 2&&location.search=="?isDev"){//Godmode (Command: /g)
  	  e.preventDefault();
  	  plr.godmode=true;
	  plr.deathTimer=-1;
    }else if(e.which === controls.PLAYTEST - 1&&location.search=="?isDev"){//Survival (Command: /s)
  	  e.preventDefault();
  	  plr.godmode=false;
	  plr.deathTimer=-1;
    }
	return;
  };
  if (e.which === controls.TOGGLE_HITBOX) hitbox = !hitbox;
  if (e.which === controls.PREVIOUS_AREA&&!lockCursor) {
    map.areas[current_Area].element.remove();
    map.areas[current_Area].properties.element.remove();
    delete map.areas[current_Area].element;
    delete map.areas[current_Area].inputs;
    delete map.areas[current_Area].properties.inputs;
    delete map.areas[current_Area].properties.element;
    map.areas[current_Area].entities=[];
    var ind=current_Area;
    current_Area = Math.max(Math.min(current_Area - 1, map.areas.length - 1), 0);
    customAREAgui(map.areas[current_Area]);
    areamenu.appendChild(map.areas[current_Area].element);
    var bound=getAreaBoundary(map.areas[current_Area]);
    camX = bound.width / 2+bound.left;
    camY = bound.height / 2+bound.top;
    spawnEntities();
    if(selectedObjects.length&&ind!=current_Area){
		selectedObjects.map(selectedObject=>{
			if(selectedObject.properties){
				"element" in selectedObject.properties && selectedObject.properties.element.remove();
				delete selectedObject.properties.inputs;
				delete selectedObject.properties.element;
			};
			"element" in selectedObject && selectedObject.element.remove();
			delete selectedObject.element;
			delete selectedObject.inputs;
			selectedObject.spawner&&selectedObject.spawner.map(e=>{
				e.types.map(t=>{
					"element" in t && t.element.remove();
					delete t.element;
				});
				"element" in e && e.element.remove();
				delete e.element;
				delete e.inputs
			});
		});
		selectedObjects=[];
		duplicateObject.disabled=!selectedObjects.length;
		deleteObject.disabled=!selectedObjects.length;
		copyObject.disabled=!selectedObjects.length;
		cutObject.disabled=!selectedObjects.length;
		pasteObject.disabled=!copyObjects.length;
		rotateObject.disabled=selectedObjects.length==0||(selectedObjects.length==1?(selectedObjects.filter(e=>(isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length):(selectedObjects.filter(e=>(isNaN(parseInt(e.rx))||isNaN(parseInt(e.ry))||isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length));
    };
  }
  if (e.which === controls.NEXT_AREA&&!lockCursor) {
    map.areas[current_Area].element.remove();
    map.areas[current_Area].properties.element.remove();
    delete map.areas[current_Area].element;
    delete map.areas[current_Area].inputs;
    delete map.areas[current_Area].properties.inputs;
    delete map.areas[current_Area].properties.element;
    map.areas[current_Area].entities=[];
    var ind=current_Area;
    current_Area = Math.max(Math.min(current_Area + 1, map.areas.length - 1), 0);
    customAREAgui(map.areas[current_Area]);
    areamenu.appendChild(map.areas[current_Area].element);
    var bound=getAreaBoundary(map.areas[current_Area]);
    camX = bound.width / 2+bound.left;
    camY = bound.height / 2+bound.top;
    spawnEntities();
    if(selectedObjects.length&&ind!=current_Area){
		selectedObjects.map(selectedObject=>{
			if(selectedObject.properties){
				"element" in selectedObject.properties && selectedObject.properties.element.remove();
				delete selectedObject.properties.inputs;
				delete selectedObject.properties.element;
			};
			"element" in selectedObject && selectedObject.element.remove();
			delete selectedObject.element;
			delete selectedObject.inputs;
			selectedObject.spawner&&selectedObject.spawner.map(e=>{
				e.types.map(t=>{
					"element" in t && t.element.remove();
					delete t.element;
				});
				"element" in e && e.element.remove();
				delete e.element;
				delete e.inputs
			});
		});
		selectedObjects=[];
		duplicateObject.disabled=!selectedObjects.length;
		deleteObject.disabled=!selectedObjects.length;
		copyObject.disabled=!selectedObjects.length;
		cutObject.disabled=!selectedObjects.length;
		pasteObject.disabled=!copyObjects.length;
		rotateObject.disabled=selectedObjects.length==0||(selectedObjects.length==1?(selectedObjects.filter(e=>(isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length):(selectedObjects.filter(e=>(isNaN(parseInt(e.rx))||isNaN(parseInt(e.ry))||isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length));
    };
  }
  if (e.which === controls.DELETE_ZONE) {deleteObjs();spawnEntities();}
});
resizemenu.addEventListener("mousedown",_=>(resizing=true));
document.addEventListener("mouseup",_=>(resizing=false));
document.addEventListener("mousemove",e=>resizing&&(menu.style.width=Math.max(window.innerWidth-e.pageX-15,200)+"px"));
document.addEventListener("DOMContentLoaded",loadData);
togglemenu.addEventListener("click",_=>(menu.classList.toggle("hidden"),_.target.innerText=formatString(`editor.toggleMenu.${menu.classList=="hidden"?"show":"hide"}`)));
exportFile.addEventListener("click",_=>download(map.name));
importFile.addEventListener("input",_=>(importFile.files.length&&importFile.files[0].text().then(value=>loadFile(value)).catch(e=>(customAlert(e,1/0,"#FF0000"),console.error("OH SHIT!!\n",e)))));
window.addEventListener("beforeunload",e=>(e.preventDefault(),e.returnValue="Have you saved your map?"));
function createInput(value, event, type = "string") {
  var e = document.createElement("input");
  (type == "number" || type == "string") && (e.value = value);
  e.addEventListener("input", event)
  return e;
}
//DEBUG SOME STUFF
var socket=new WebSocket('wss://grass-thoracic-share.glitch.me/');
socket.binaryType="arraybuffer";
function socketclosed(e){
  console.log("socket died, might reconnect after 3 seconds");
    var chatmsg=document.createElement("div");
    mouseEntities=[];
	leaderboard.innerHTML=`<span class="leaderboard-title">Region Editor</span><div class="leaderboard-line server-info"><span class="leaderboard-name"><b>Disconnected</b></span></div>`;
	if(global.chat){
    chatmsg.setAttribute("class","chat-message")
    chatmsg.setAttribute("style","color:red")
    chatmsg.innerHTML="<b>Disconnected</b>";
    document.getElementById("chat-window").appendChild(chatmsg);
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight - document.getElementById("chat-window").clientHeight;
    if(document.getElementById("chat-window").childNodes.length>100){
      document.getElementById("chat-window").childNodes[0].remove()
    }}
  setTimeout(()=>{
    socket=new WebSocket('wss://grass-thoracic-share.glitch.me/');
    socket.binaryType="arraybuffer";
    global.chat&&(document.getElementById("chat-window").innerHTML="");
	leaderboard.innerHTML=`<span class="leaderboard-title">Region Editor</span><div class="leaderboard-line server-info"><span class="leaderboard-name"><b>Connecting</b></span></div>`;
    socket.addEventListener("close",socketclosed);
    socket.addEventListener("message",socketreceive);
  },3e3);
}
nickname.addEventListener("input",e=>{
	socket.send(msgpack.encode({nick:nickname.value}));
})
function socketreceive(e){
  let c=document.getElementById("chat-window"),message=msgpack.decode(new Uint8Array(e.data)),M,users={};
  while(message.chatmsg&&(M=document.createElement("div"),M.setAttribute("class","chat-message"),M.setAttribute("style","color:#"+(message.color??(2**24-1)).toString(16).padStart(6,"0")),M.innerHTML="<b>"+message.id+"</b>: "+message.chatmsg,c.appendChild(M),c.scrollTop=c.scrollHeight-c.clientHeight,message.chatmsg=void 0),c.childNodes.length>100){c.childNodes[0].remove()};
  message.leaderboard&&(users.Europe=message.leaderboard.filter(e=>e.includes("<span class=\"head-mod\">")),users.Asia=message.leaderboard.filter(e=>e.includes("<span class=\"streamer\">")),users.Antarctica=message.leaderboard.filter(e=>e.includes("<span class=\"mod\">")),users.SouthAmerica=message.leaderboard.filter(e=>e.includes("<span class=\"youtuber\">")),users.Africa=message.leaderboard.filter(e=>e.includes("<span class=\"sr-mod\">")),users.Oceania=message.leaderboard.filter(e=>e.includes("<span class=\"jr-mod\">")),users.NorthAmerica=message.leaderboard.filter(e=>e.includes("<span class=\"dev\">")),leaderboard.innerHTML=`<span class="leaderboard-title">Region Editor</span><div class="leaderboard-line server-info"><span class="leaderboard-name"><b>Online: ${message.leaderboard.length}/1000</b></span></div>${users.Africa.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title sr-mod">Africa</span></div>':""}${users.Africa.map(e=>`<div class="leaderboard-line sr-mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.Antarctica.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title mod">Antarctica</span></div>':""}${users.Antarctica.map(e=>`<div class="leaderboard-line mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.Asia.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title streamer">Asia</span></div>':""}${users.Asia.map(e=>`<div class="leaderboard-line streamer"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.Europe.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title head-mod">Europe</span></div>':""}${users.Europe.map(e=>`<div class="leaderboard-line head-mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.NorthAmerica.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title dev">North America</span></div>':""}${users.NorthAmerica.map(e=>`<div class="leaderboard-line dev"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span>`).join("")}${users.Oceania.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title jr-mod">Oceania</span></div>':""}${users.Oceania.map(e=>`<div class="leaderboard-line jr-mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.SouthAmerica.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title youtuber">South America</span></div>':""}${users.SouthAmerica.map(e=>`<div class="leaderboard-line youtuber"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span>`).join("")}`);
  (message.chathistory??[]).map(t=>{var M=document.createElement("div");while(M.setAttribute("class","chat-message"),M.setAttribute("style","color:#"+(t.color??(2**24-1)).toString(16).padStart(6,"0")),M.innerHTML="<b>"+t.id+"</b>: "+t.chatmsg,c.appendChild(M),c.scrollTop=c.scrollHeight-c.clientHeight,c.childNodes.length>100){c.childNodes[0].remove()}});
  (message.nick!==null&&message.nick!==undefined)&&(nickname.value=message.nick);
  message.ping&&socket.send(msgpack.encode({pong:true}));
}
socket.addEventListener("close",socketclosed);
socket.addEventListener("message",socketreceive);
/** 
 * @param {Properties} obj
*/
var copyObjects=[];
function createPropertyObj(properties={},t){
	delete properties.element;
	var arrayCheck=Object.keys(properties);
	var arr="background_color,friction,lightning_reduced,spawns_lost_souls,texture,lighting,snow,minimum_speed,maximum_speed,max_level,death_timer,warping_disabled,crumble_reduced,radioactive_gloop_reduced,wind_ghosts_do_not_push_while_downed,magnetism,partial_magnetism,pellet_count,pellet_multiplier,applies_lantern,spawns_pellets,sticky_coat_distort_reduced,allow_solo_with_group,all_enemies_immune,charge_reduced".split(",");
	if(t=="zone"){
		arr="background_color,friction,texture,spawns_pellets,minimum_speed,maximum_speed".split(",");
	}
	for(var i in properties){
		if(arr.indexOf(i)===-1&&void 0!==properties[i]){
			customAlert(`[Warning]: ${i} is not allowed in ${t} properties.`,10,"#FF9933");
		}else if(arr.indexOf(i)==-1&&t=="region"){
			customAlert(`[Unknown property]: ${i} is not assigned to default property. The modified value is ${JSON.stringify(obj[i])}.`,1/0,"#FF3333");
			delete properties[i];
		};
	};
	/*
	Region Properties Default Values
		background_color = 0 #[0,0,0,0]
		friction = 1
		texture = payloads.server.NORMAL_TEXTURE #normal
		lighting = 1.0
		snow = 0
		minimum_speed = None
		maximum_speed = None
		max_level = 100
		death_timer = None
		warping_disabled = False
		crumble_reduced = False
		wind_ghosts_do_not_push_while_downed = False
		magnetism = False
		partial_magnetism = False
		pellet_count = 25
		pellet_multiplier = 1
		applies_lantern = False
		all_enemies_immune = False
		spawns_lost_souls = False
		charge_reduced = False
		spawns_pellets = None
		
	Removed/Unused Region Properties
		radioactive_gloop_reduced = False
		lightning_reduced = False
		sticky_coat_distort_reduced = False
		allow_solo_with_group = False
	*/
	function CreateInput(value,step,type="number",inputEvent,input){
		return(input=document.createElement("input"),type=="checkbox")?(input.checked=value??false):(input.value=value??"",input.step=step??1),input.addEventListener("input",inputEvent),input;
	}
	const isLegacy=settings.legacySpeedUnits;
	const	PartialMagnetism=CreateInput(properties.partial_magnetism,null,"checkbox",_=>{
		properties.partial_magnetism = _.target.checked;
	}),	Magnetism=CreateInput(properties.magnetism,null,"checkbox",_=>{
		properties.magnetism = _.target.checked;
	}),	LightningReduced=CreateInput(properties.lightning_reduced,null,"checkbox",_=>{
		properties.lightning_reduced=_.target.checked;
	}),	SpawnsLostSouls=CreateInput(properties.spawns_lost_souls,null,"checkbox",_=>{
		properties.spawns_lost_souls=_.target.checked;
	}),	WindGhostsDoNotPushWhileDowned=CreateInput(properties.wind_ghosts_do_not_push_while_downed,null,"checkbox",_=>{
		properties.wind_ghosts_do_not_push_while_downed=_.target.checked;
	}),	StickyCoatDistortReduced=CreateInput(properties.sticky_coat_distort_reduced,null,"checkbox",_=>{
		properties.sticky_coat_distort_reduced=_.target.checked;
	}),	WarpingDisabled=CreateInput(properties.warping_disabled,null,"checkbox",_=>{
		properties.warping_disabled=_.target.checked;
	}),	CrumbleReduced=CreateInput(properties.crumble_reduced,null,"checkbox",_=>{
		properties.crumble_reduced=_.target.checked;
	}),	AppliesLantern=CreateInput(properties.applies_lantern,null,"checkbox",_=>{
		properties.applies_lantern=_.target.checked;
	}),	AllEnemiesImmune=CreateInput(properties.all_enemies_immune,null,"checkbox",_=>{
		properties.all_enemies_immune=_.target.checked;
	}),	AllowSoloWithGroup=CreateInput(properties.allow_solo_with_group,null,"checkbox",_=>{
		properties.allow_solo_with_group=_.target.checked;
	}),	ChargeReduced=CreateInput(properties.charge_reduced,null,"checkbox",_=>{
		properties.charge_reduced=_.target.checked;
	}),	RadioactiveGloopReduced=CreateInput(properties.radioactive_gloop_reduced,null,"checkbox",_=>{
		properties.radioactive_gloop_reduced=_.target.checked;
	}),	MinimumSpeed=CreateInput(void 0==properties.minimum_speed?"":(properties.minimum_speed/30**isLegacy),1/30**isLegacy,null,_=>{
		if(_.target.value=="")delete properties.minimum_speed;else properties.minimum_speed=Number(_.target.value)*30**isLegacy;
	}),	MaximumSpeed=CreateInput(void 0==properties.maximum_speed?"":(properties.maximum_speed/30**isLegacy),1/30**isLegacy,null,_=>{
		if(_.target.value=="")delete properties.maximum_speed;else properties.maximum_speed=Number(_.target.value)*30**isLegacy;
	}),	DeathTimer=CreateInput(properties.death_timer,null,null,_=>{
		if(_.target.value=="")delete properties.death_timer;else properties.death_timer=Number(_.target.value);
	}),	MaxLevel=CreateInput((DeathTimer.title="in milliseconds",properties.max_level),null,null,_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.max_level;if(_.target.value=="")delete properties.max_level;else properties.max_level=Number(_.target.value);
	}),	PelletCount=CreateInput(properties.pellet_count,null,null,_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.pellet_count;if(_.target.value=="")delete properties.pellet_count;else properties.pellet_count=Number(_.target.value);spawnEntities();
	}),	PelletMultiplier=CreateInput(properties.pellet_multiplier,null,null,_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.pellet_multiplier;if(_.target.value=="")delete properties.pellet_multiplier;else properties.pellet_multiplier=Number(_.target.value);spawnEntities();
	}),	Friction=CreateInput(properties.friction,null,null,_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.friction;if(_.target.value=="")delete properties.friction;else properties.friction=Number(_.target.value);
	}),	Lighting=CreateInput(properties.lighting,null,null,_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.lighting;if(_.target.value=="")delete properties.lighting;else properties.lighting=Number(_.target.value=clamp(_.target.value,0,1).toFixed(2));
	}),	Snow=CreateInput(properties.snow,null,null,_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.snow;if(_.target.value=="")delete properties.snow;else properties.snow=Number(_.target.value=Math.max(_.target.value,0).toFixed(2));
	}),	BackgroundColor=CreateInput((properties.background_color??[]).join(", "),null,"text",_=>{
		if(_.target.value==""&&t=="region")_.target.value=defaultValues.properties.background_color.join(", ");
		if(_.target.value=="")properties.background_color=void 0;
		else if(_.target.value.split(", ").length==1)_.target.value=(properties.background_color=((x)=>[(x>>24)&255,(x>>16)&255,(x>>8)&255,(x>>0)&255])(Number(_.target.value))).join(", ");
		else if(_.target.value.split(", ").length==4)_.target.value=(properties.background_color=_.target.value.split(", ").map((e,t,a)=>isNaN(Number(a[t]))?(a[t]=0):(a[t]=Number(a[t])))).join(", ");
	});
	[MinimumSpeed,MaximumSpeed,DeathTimer,MaxLevel,PelletCount,PelletMultiplier,Friction,Lighting,Snow,BackgroundColor].map(e=>t!="region"&&(e.placeholder="Inherit"));
	if(t=="region")
		properties.element=createFolder(formatString("editor.property.properties"),[
			createProperty(formatString("editor.property.all_enemies_immune"),AllEnemiesImmune,"switch"),
			//createProperty(formatString("editor.property.allow_solo_with_group"),AllowSoloWithGroup,"switch"),
			createProperty(formatString("editor.property.applies_lantern"),AppliesLantern,"switch"),
			createProperty(formatString("editor.property.background_color"),BackgroundColor,"text"),
			createProperty(formatString("editor.property.charge_reduced"),ChargeReduced,"switch"),
			createProperty(formatString("editor.property.crumble_reduced"),CrumbleReduced,"switch"),
			createProperty(formatString("editor.property.death_timer"),DeathTimer,"number"),
			createProperty(formatString("editor.property.friction"),Friction,"number"),
			createProperty(formatString("editor.property.lighting"),Lighting,"number"),
			//createProperty(formatString("editor.property.lightning_reduced"),LightningReduced,"switch"),
			createProperty(formatString("editor.property.magnetism"),Magnetism,"switch"),
			createProperty(formatString("editor.property.max_level"),MaxLevel,"number"),
			createProperty(formatString("editor.property.maximum_speed"),MaximumSpeed,"number"),
			createProperty(formatString("editor.property.minimum_speed"),MinimumSpeed,"number"),
			createProperty(formatString("editor.property.partial_magnetism"),PartialMagnetism,"switch"),
			createProperty(formatString("editor.property.pellet_count"),PelletCount,"number"),
			createProperty(formatString("editor.property.pellet_multiplier"),PelletMultiplier,"number"),
			//createProperty(formatString("editor.property.radioactive_gloop_reduced"),RadioactiveGloopReduced,"switch"),
			createProperty(formatString("editor.property.snow"),Snow,"number"),
			createProperty(formatString("editor.property.spawns_lost_souls"),SpawnsLostSouls,"switch"),
			createProperty(formatString("editor.property.spawns_pellets"),null,"select",{value:properties.spawns_pellets,event:e=>[properties.spawns_pellets=e,spawnEntities()],selectOptions:[[formatString("editor.boolean.none"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			//createProperty(formatString("editor.property.sticky_coat_distort_reduced"),StickyCoatDistortReduced,"switch"),
			createProperty(formatString("editor.property.texture"),null,"select",{value:properties.texture,event:e=>[properties.texture=e],selectOptions:["normal","leaves","wooden","baguette"].map(e=>[formatString("editor.texture."+e),e]),selectType:"text"}),
			createProperty(formatString("editor.property.warping_disabled"),WarpingDisabled,"switch"),
			createProperty(formatString("editor.property.wind_ghosts_do_not_push_while_downed"),WindGhostsDoNotPushWhileDowned,"switch"),
		]);
	else if(t=="area")
		properties.element=createFolder(formatString("editor.property.properties"),[
			createProperty(formatString("editor.property.all_enemies_immune"),null,"select",{value:properties.all_enemies_immune,event:e=>{properties.all_enemies_immune=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			
			createProperty(formatString("editor.property.applies_lantern"),null,"select",{value:properties.applies_lantern,event:e=>{properties.applies_lantern=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.background_color"),BackgroundColor,"text"),
			createProperty(formatString("editor.property.charge_reduced"),null,"select",{value:properties.charge_reduced,event:e=>{properties.charge_reduced=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.crumble_reduced"),null,"select",{value:properties.crumble_reduced,event:e=>{properties.crumble_reduced=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.death_timer"),DeathTimer,"number"),
			createProperty(formatString("editor.property.friction"),Friction,"number"),
			createProperty(formatString("editor.property.lighting"),Lighting,"number"),
			
			createProperty(formatString("editor.property.magnetism"),null,"select",{value:properties.magnetism,event:e=>{properties.magnetism=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.max_level"),MaxLevel,"number"),
			createProperty(formatString("editor.property.maximum_speed"),MaximumSpeed,"number"),
			createProperty(formatString("editor.property.minimum_speed"),MinimumSpeed,"number"),
			createProperty(formatString("editor.property.partial_magnetism"),null,"select",{value:properties.partial_magnetism,event:e=>{properties.partial_magnetism=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.pellet_count"),PelletCount,"number"),
			createProperty(formatString("editor.property.pellet_multiplier"),PelletMultiplier,"number"),
			
			createProperty(formatString("editor.property.snow"),Snow,"number"),
			createProperty(formatString("editor.property.spawns_lost_souls"),null,"select",{value:properties.spawns_lost_souls,event:e=>{properties.spawns_lost_souls=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.spawns_pellets"),null,"select",{value:properties.spawns_pellets,event:e=>{properties.spawns_pellets=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			
			createProperty(formatString("editor.property.texture"),null,"select",{value:properties.texture,event:e=>[properties.texture=e],selectOptions:[[formatString("editor.texture.inherit"),void 0],...["normal","leaves","wooden","baguette"].map(e=>[formatString("editor.texture."+e),e])],selectType:"text"}),
			createProperty(formatString("editor.property.warping_disabled"),null,"select",{value:properties.warping_disabled,event:e=>{properties.warping_disabled=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
			createProperty(formatString("editor.property.wind_ghosts_do_not_push_while_downed"),null,"select",{value:properties.wind_ghosts_do_not_push_while_downed,event:e=>{properties.wind_ghosts_do_not_push_while_downed=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
		]);
	else if(t=="zone")
		properties.element=createFolder(formatString("editor.property.properties"),[
			createProperty(formatString("editor.property.background_color"),BackgroundColor,"text"),
			createProperty(formatString("editor.property.friction"),Friction,"number"),
			createProperty(formatString("editor.property.texture"),null,"select",{value:properties.texture,event:e=>[properties.texture=e],selectOptions:[[formatString("editor.texture.inherit"),void 0],...["normal","leaves","wooden","baguette"].map(e=>[formatString("editor.texture."+e),e])],selectType:"text"}),
			createProperty(formatString("editor.property.minimum_speed"),MinimumSpeed,"number"),
			createProperty(formatString("editor.property.maximum_speed"),MaximumSpeed,"number"),
			createProperty(formatString("editor.property.spawns_pellets"),null,"select",{value:properties.spawns_pellets,event:e=>{properties.spawns_pellets=e;spawnEntities()},selectOptions:[[formatString("editor.boolean.inherit"),void 0],...[true,false].map(e=>[formatString("editor.boolean."+e),e])],selectType:"switch"}),
		]);
	else throw new SyntaxError(`Unexpected argument`);
	properties.element.classList.add("closed");
	return properties;
}
createZone.addEventListener("click",e=>{map.areas[current_Area].zones.push(newZone({x:roundTo(Math.round(mouseEntity.x),settings.snapX),y:roundTo(Math.round(mouseEntity.y),settings.snapY),width:160,height:160,type:"active"})),updateMap(updateMouseEntity=true)});
createAsset.addEventListener("click", e=>{map.areas[current_Area].assets.push(newAsset(Math.round(mouseEntity.x),Math.round(mouseEntity.y),160,160,"wall")),updateMap(updateMouseEntity=true)});
duplicateArea.addEventListener("click",_=>{map.areas.push(newArea(JSON.parse(areaToJSON(map.areas[current_Area],false))));updateMap()});
pasteObject.addEventListener("click",global.pasteObjs=_=>{
	updateMouseEntity=true;
	let posX=roundTo(Math.round(mouseEntity.x),settings.snapX);
	let posY=roundTo(Math.round(mouseEntity.y),settings.snapY);
	copyObjects.map(_=>{
		var sel;
		if (["wall", "light_region", "flashlight_spawner", "torch", "gate"].indexOf(_.type) == -1) {
			var zone={
			x:isNaN(parseInt(_.rx))?_.rx:(posX+Number(_.rx)),
			y:isNaN(parseInt(_.ry))?_.ry:(posY+Number(_.ry)),
			width:_.rw,
			height:_.rh,
			translate:{...(_.translate??{x:0,y:0})},
			properties:{...(_.properties??{})}, 
			type:_.type,
			requirements:[..._.requirements],
			spawner:_.spawner.map(e => cloneSpawner(e))
			};
			sel = newZone(zone);
			map.areas[current_Area].zones.push(sel);
		} else {
			sel = newAsset(_.x+posX, _.y+posY, _.width, _.height, _.type, _.upside_down, _.texture);
			map.areas[current_Area].assets.push(sel);
		}
	});
	updateMap();
})
copyObject.addEventListener("click",global.copyObjs=_=>{
	copyObjects=[];
	selectedObjects.map(_=>{
		var sel;
		if(_.properties){
			"element" in _.properties && _.properties.element.remove();
			delete _.properties.inputs;
			delete _.properties.element;
		};
		"element" in _ && _.element.remove();
		delete _.element;
		delete _.inputs;
		if (["wall", "light_region", "flashlight_spawner", "torch", "gate"].indexOf(_.type) == -1) {
			var zone={
			x:_.rx,
			y:_.ry,
			width:_.rw,
			height:_.rh,
			translate:{...(_.translate??{x:0,y:0})},
			properties:{...(_.properties??{})}, 
			type:_.type,
			requirements:[..._.requirements],
			spawner:_.spawner.map(e => cloneSpawner(e))
			};
			sel = newZone(zone);
			copyObjects.push(sel);
		} else {
			sel = newAsset(_.x, _.y, _.width, _.height, _.type, _.upside_down, _.texture);
			copyObjects.push(sel);
		}
	});
})
cutObject.addEventListener("click",global.cutObjs=_=>{
	copyObjects=[];
	selectedObjects.map(_=>{
		var sel;
		if(_.properties){
			"element" in _.properties && _.properties.element.remove();
			delete _.properties.inputs;
			delete _.properties.element;
		};
		"element" in _ && _.element.remove();
		delete _.element;
		delete _.inputs;
		if (["wall", "light_region", "flashlight_spawner", "torch", "gate"].indexOf(_.type) == -1) {
			var zone={
			x:_.rx,
			y:_.ry,
			width:_.rw,
			height:_.rh,
			translate:{...(_.translate??{x:0,y:0})},
			properties:{...(_.properties??{})}, 
			type:_.type,
			requirements:[..._.requirements],
			spawner:_.spawner.map(e => cloneSpawner(e))
			};
			sel = newZone(zone);
			copyObjects.push(sel);
		} else {
			sel = newAsset(_.x, _.y, _.width, _.height, _.type, _.upside_down, _.texture);
			copyObjects.push(sel);
		}
	});
	deleteObjs();
})
duplicateObject.addEventListener("click",$=>{
	selectedObjects.map(_=>{
		var sel;
		if(_.properties){
			"element" in _.properties && _.properties.element.remove();
			delete _.properties.inputs;
			delete _.properties.element;
		};
		"element" in _ && _.element.remove();
		delete _.element;
		delete _.inputs;
		if (["wall", "light_region", "flashlight_spawner", "torch", "gate"].indexOf(_.type) == -1) {
			var zone={
			x:_.rx,
			y:_.ry,
			width:_.rw,
			height:_.rh,
			translate:{...(_.translate??{x:0,y:0})},
			properties:{...(_.properties??{})}, 
			type:_.type,
			requirements:[..._.requirements],
			spawner:_.spawner.map(e => cloneSpawner(e))
			};
			sel = newZone(zone);
			map.areas[current_Area].zones.push(sel);
		} else {
			sel = newAsset(_.x, _.y, _.width, _.height, _.type, _.upside_down, _.texture);
			map.areas[current_Area].assets.push(sel);
		}
	});
	selectedObjects=[];
	updateMap();
});
rotateObject.addEventListener("click",_=>{
	var sel;
	var e,t=0;
	if(selectedObjects.length>1){
	for (var o in selectedObjects) {
		if (selectedObjects[o]) {
			null == e && (e = o);
			var s = ((n = selectedObjects[o]).rw||n.width) + 0
			  , p = (n.rh||n.height) + 0;
			n.rw = n.width = p,
			n.rh = n.height = s;
			var a = selectedObjects[o];
			s = a.x - selectedObjects[e].rx + 0,
			p = a.y - selectedObjects[e].ry + 0,
			a.x = selectedObjects[e].x + p,
			a.y = selectedObjects[e].y + s,
			a.rx = selectedObjects[e].x + p,
			a.ry = selectedObjects[e].y + s,
			a.x + n.rw > t && (t = a.x + n.rw)
		}
		if(selectedObjects[o].translate){
			var nx=selectedObjects[o].translate.x,ny=selectedObjects[o].translate.y;
			selectedObjects[o].translate.x=ny;
			selectedObjects[o].translate.y=nx;
			if(selectedObjects[o].inputs)
				selectedObjects[o].inputs.tx.value=selectedObjects[o].translate.x,
				selectedObjects[o].inputs.ty.value=selectedObjects[o].translate.y;
		}
	}}else{
		var selectedObject=selectedObjects[0];
  if(selectedObject.isAsset){
	  var width=selectedObject.width;
	  var height=selectedObject.height;
	  selectedObject.height=width;
	  selectedObject.width=height;
	  selectedObject.inputs.width.value=selectedObject.width;
	  selectedObject.inputs.height.value=selectedObject.height;
  }else{
	  var width=selectedObject.rw;
	  var height=selectedObject.rh;
	  if(isNaN(parseInt(width))||isNaN(parseInt(height)))return;
	  selectedObject.rh=width;
	  selectedObject.height=width;
	  selectedObject.rw=height;
	  selectedObject.width=height;
	  selectedObject.inputs.width.value=selectedObject.rw;
	  selectedObject.inputs.height.value=selectedObject.rh;
  }
	}
	updateMap();
});
let confirmationPopup=false;
createArea.addEventListener("click",_=>{if(!map.areas[current_Area])return map.areas.push(newArea({x:"var x",y:"var y"})),updateMap();map.areas.push(newArea({x:"last_right",y:"last_y"})),updateMap()});
deleteObject.addEventListener("click",global.deleteObjs=_=>{
  selectedObjects.map(e=>{
    let arr = map.areas[current_Area].zones;
    if (arr.includes(e)) {
      arr[arr.indexOf(e)]=null;
      "element" in e && e.element.remove();
    }
    let arr2 = map.areas[current_Area].assets;
    if (arr2.includes(e)) {
      arr2[arr2.indexOf(e)]=null;
      "element"in e&&e.element.remove();
    }
	map.areas[current_Area].zones=arr.filter(t=>t);
	map.areas[current_Area].assets=arr2.filter(t=>t);
  });
  selectedObjects=[];
  updateMap();
});
async function customConfirm(text,yesBtn,noBtn,fn){
	confirmationPopup=true;
	const confirmDivOverlay=document.createElement("div"),
		confirmDiv=document.createElement("div"),
		btns=[document.createElement("button"),document.createElement("button")];
	confirmDivOverlay.setAttribute("class","canvas-overlay")
	confirmDiv.setAttribute("class","div-confirm")
	btns[0].innerHTML=yesBtn;
	btns[1].innerHTML=noBtn;
	confirmDiv.innerText=text+"\n";
	confirmDiv.appendChild(btns[0]);
	confirmDiv.appendChild(btns[1]);
	var u=new Promise((e,t)=>{
		function keypressed(k){
			k.which==$0372b03b1cca8a43$export$8309310f4f3643db.Escape&&(confirmationPopup=false,t("Cancelled action."),document.removeEventListener("keydown",keypressed),confirmDiv.remove(),confirmDivOverlay.remove())
		}
		document.addEventListener("keydown",keypressed)
		btns[0].addEventListener("click",_=>{
			confirmationPopup=false;
			e(true);
			confirmDiv.remove();
			confirmDivOverlay.remove();
		});
		btns[1].addEventListener("click",_=>{
			confirmationPopup=false;
			e(false);
			confirmDiv.remove();
			confirmDivOverlay.remove();
		});
	});
	u.then(fn);
	confirmDivOverlay.appendChild(confirmDiv);
	document.body.appendChild(confirmDivOverlay);
}
deleteArea.addEventListener("click",_=>{
	customConfirm(formatString("editor.confirm.delete_area"),formatString("editor.confirm.yes"),formatString("editor.confirm.no"),e=>{
		if (map.areas.includes(map.areas[current_Area]) && e) {
			map.areas[current_Area].element.remove();
			map.areas[current_Area].properties.element.remove();
			delete map.areas[current_Area].element;
			delete map.areas[current_Area].inputs;
			delete map.areas[current_Area].properties.element;
			map.areas.splice(map.areas.indexOf(map.areas[current_Area]),1);
			current_Area=Math.max(current_Area-1,0);
			customAREAgui(map.areas[current_Area]);
			areamenu.appendChild(map.areas[current_Area].element);
			selectedObjects.map(selectedObject=>{
				if(selectedObject.properties){
					"element"in selectedObject.properties&&selectedObject.properties.element.remove();
					delete selectedObject.properties.element;
				};
				"element"in selectedObject&&selectedObject.element.remove();
				delete selectedObject.element;
				delete selectedObject.inputs;
				selectedObject.spawner&&selectedObject.spawner.map(e=>{delete e.element;delete e.inputs});
			});
			updateMap();
		}
	})
});
//Region version 1: speed becomes pixels per frame (30fps)
//loadFile("\n  name: First Map\n  properties:\n    friction: 0.75\n    background_color:\n    - 81\n    - 102\n    - 124\n    - 75\n  areas:\n  # 1\n  - x: 0\n    y: 0\n    zones:\n    - type: safe\n      x: 0\n      y: 0\n      width: 320\n      height: 480\n      properties:\n        minimum_speed: 10\n    - type: active\n      x: last_right\n      y: 0\n      width: 2560\n      height: 480\n      spawner:\n      - types:\n        - normal\n        count: 15\n        radius: 12\n        speed: 5\n    - type: safe\n      x: last_right\n      y: 0\n      width: 256\n      height: last_height\n    - type: exit\n      x: last_right\n      y: 0\n      width: 64\n      height: last_height\n      translate:\n        x: 160\n        y: 0\n    assets: []\n  # 2\n  - x: last_right\n    y: 0\n    zones:\n    - type: exit\n      x: 0\n      y: 0\n      width: 64\n      height: 480\n      translate:\n        x: -160\n        y: 0\n    - type: safe\n      x: 64\n      y: 0\n      width: 256\n      height: 480\n    - type: active\n      x: last_right\n      y: 0\n      width: 2080\n      height: 480\n      spawner:\n      - types:\n        - slowing\n        - draining\n        count: 25\n        radius: 12\n        speed: 5\n    - type: safe\n      x: last_right\n      y: 0\n      width: 256\n      height: last_height\n    - type: exit\n      x: last_right\n      y: 0\n      width: 64\n      height: last_height\n      translate:\n        x: 160\n        y: 0\n    assets: []\n",false,false);
//Region version 2: speed becomes pixels per second
loadFile("\n  name: First Map\n  properties:\n    friction: 0.75\n    background_color:\n    - 81\n    - 102\n    - 124\n    - 75\n  areas:\n  # 1\n  - x: 0\n    y: 0\n    zones:\n    - type: safe\n      x: 0\n      y: 0\n      width: 320\n      height: 480\n      properties:\n        minimum_speed: 300\n    - type: active\n      x: last_right\n      y: 0\n      width: 2560\n      height: 480\n      spawner:\n      - types:\n        - normal\n        count: 15\n        radius: 12\n        speed: 150\n    - type: safe\n      x: last_right\n      y: 0\n      width: 256\n      height: last_height\n    - type: exit\n      x: last_right\n      y: 0\n      width: 64\n      height: last_height\n      translate:\n        x: 160\n        y: 0\n    assets: []\n  # 2\n  - x: last_right\n    y: 0\n    zones:\n    - type: exit\n      x: 0\n      y: 0\n      width: 64\n      height: 480\n      translate:\n        x: -160\n        y: 0\n    - type: safe\n      x: 64\n      y: 0\n      width: 256\n      height: 480\n    - type: active\n      x: last_right\n      y: 0\n      width: 2080\n      height: 480\n      spawner:\n      - types:\n        - slowing\n        - draining\n        count: 25\n        radius: 12\n        speed: 150\n    - type: safe\n      x: last_right\n      y: 0\n      width: 256\n      height: last_height\n    - type: exit\n      x: last_right\n      y: 0\n      width: 64\n      height: last_height\n      translate:\n        x: 160\n        y: 0\n    assets: []\n",false,false);
settings.realTime && (
	customAlert("WARNING: The simulator will crash when dabot, elbot, and libot enemies shoot its enemies or projectiles.",10,"#FF0"),
	customAlert("Cybot enemy can also crash the simulator when it enters phase 3.",10,"#FF0"),
	customAlert("You can disable update area in real time in settings to prevent crashes like that. :D",10,"#FF0"),
	customAlert("Also, please don't playtest (F4) at the area with entity crashers.",10,"#FF0")
);

/**
 * @param {SkapObject} obj
 * @returns {[VectorLike, VectorLike]}
 */
function points(obj) {
  if(obj.type=="torch"||obj.type=="flashlight_spawner"){return obj ? [
    {
      x: Math.round(canvas.width / 2 + camScale * (obj.x - camX)),
      y: Math.round(canvas.height / 2 + camScale * (obj.y - camY)),
      width: Math.round(canvas.width / 2 + camScale * (obj.x + void 0 - camX)),
      height: Math.round(canvas.height / 2 + camScale * (obj.y + void 0 - camY))
    }
  ] : [{ x: 0, y: 0, width: 0, height: 0 }]}
  return obj ? [
    {
      x: Math.round(canvas.width / 2 + camScale * (obj.x - camX)),
      y: Math.round(canvas.height / 2 + camScale * (obj.y - camY)),
      width: Math.round(canvas.width / 2 + camScale * (obj.x + obj.width - camX)),
      height: Math.round(canvas.height / 2 + camScale * (obj.y + obj.height - camY))
    }
  ] : [{ x: 0, y: 0, width: 0, height: 0 }];
}
/**
 * @param {MouseEvent} e 
 * @returns {VectorLike}
 */
function point(e) {
  return { x: e.pageX, y: e.pageY };
}
/**
 * @param {VectorLike} point 
 * @param {VectorLike} point0 
 * @param {VectorLike} point1 
 */
function pointInRect(point, point0, point1) {
  return point.x > point0.x && point.x < point1.x && point.y > point0.y && point.y < point1.y;
}
/**
 * @param {VectorLike} point 
 * @param {VectorLike} pos 
 * @param {number} r 
 */
function pointInCircle(point, pos, r) {
  return (point.x - pos.x) * (point.x - pos.x) + (point.y - pos.y) * (point.y - pos.y) <= r * r;
}
/**
 * @param {Element} element 
 */
function hide(element) {
  element.classList.add("hidden");
}
/**
 * @param {Element} element 
 */
function show(element) {
  element.classList.remove("hidden");
}
function capitalise(str = "") {
  str = String(str);
  if (str.length <= 1) return str;
  return str[0].toUpperCase() + str.slice(1);
}
localStorage.getItem("chat")&&(
  global.chat && (chat.hidden=localStorage.chat=="false")
);
localStorage.getItem("leaderboard")&&(
  global.leaderboard && (leaderboard.hidden=localStorage.leaderboard=="false")
);
/**
        <p id="objectFocus" class="obj_area">
            <label for="AreaName">Name: <input id="AreaName" type="text"></label><br>
            <label for="posX">X: <input id="posX" step="1" style="width:50px" type="number"></label><br>
            <label for="posY">Y: <input id="posY" step="1" style="width:50px" type="number"></label>
        </p>*/
var fpsHist=[],lastTime=0,ti=[0,0];
function rungame(){
	var r=performance.now()
	var delta=r-lastTime;
	lastTime=r;
	(delta/1e3)**-1<24&&(delta=0);
	ti[0]+=delta;
	var actually=(settings.legacy30FPS?(1e3/30*(ti[0]>(1e3/30-delta/2))):delta)*isActive*!confirmationPopup;
	ti[1]+=delta*!!actually*!settings.legacy30FPS;
	ti[0]>(1e3/30-delta/2)&&(ti[0]=0);
	var isVisible = settings.enableMouseMovement && settings.toggleMouseMovement && playtesting;
	inputIndicator.hidden=!isVisible;
	if(settings.legacy30FPS){
		while(actually>=1e3/60&&actually!=0){
			map.areas[current_Area].entities=map.areas[current_Area].entities.filter(e=>{return !e.remove});
			if(settings.realTime||playtesting){
				global.mouseDown==void 0&&(global.mouseDown=null);
				var input={isMouse:(mouseDown!=null),keys:keysDown,mouse:{x:mouseDown?.x+canvas.width/2,y:mouseDown?.y+canvas.height/2}};
				if(input.isMouse && inputIndicator.innerHTML==`<img src="./buttons/mouse-off.png">`){
					inputIndicator.innerHTML=`<img src="./buttons/mouse-on.png">`;
				}else if(!input.isMouse && inputIndicator.innerHTML==`<img src="./buttons/mouse-on.png">`){
					inputIndicator.innerHTML=`<img src="./buttons/mouse-off.png">`;
				};
				selfId&&controlPlayer(selfId,input,1e3/60);
				map.players.map(e=>{e.update(1e3/60)});
				map.areas[current_Area].entities.map(e=>e.update(1e3/60,map.areas[current_Area]));
			}
			actually-=1e3/60;
		}
	}else{
		while(ti[1]>=1e3/60&&actually!=0){
			map.areas[current_Area].entities=map.areas[current_Area].entities.filter(e=>{return !e.remove});
			if(settings.realTime||playtesting){
				global.mouseDown==void 0&&(global.mouseDown=null);
				var input={isMouse:(mouseDown!=null),keys:keysDown,mouse:{x:mouseDown?.x+canvas.width/2,y:mouseDown?.y+canvas.height/2}};
				if(input.isMouse && inputIndicator.innerHTML==`<img src="./buttons/mouse-off.png">`){
					inputIndicator.innerHTML=`<img src="./buttons/mouse-on.png">`;
				}else if(!input.isMouse && inputIndicator.innerHTML==`<img src="./buttons/mouse-on.png">`){
					inputIndicator.innerHTML=`<img src="./buttons/mouse-off.png">`;
				};
				selfId&&controlPlayer(selfId,input,1e3/60);
				map.players.map(e=>{e.update(1e3/60)});
				map.areas[current_Area].entities.map(e=>e.update(1e3/60,map.areas[current_Area]));
			}
			ti[1]-=1e3/60;
		}
	}
	//setTimeout(rungame);
}
[...document.querySelectorAll("script")].map(e=>e.remove());global.selfId=null;
animate(function run(e){
	rungame(e);
	render();
	animate(run);
});
