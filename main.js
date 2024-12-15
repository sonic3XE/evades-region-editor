const isForked=location.origin+location.pathname!=="https://sonic3xe.github.io/evades-region-editor/",reloadPage=location.reload.bind(location),canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),map={name: "No Name",share_to_drive:true,players:[],properties:{},areas:[]},camSpeed=10,selectBuffer=5,manageExtensions=function(str){(activated_extensions.indexOf(str)==-1)?activated_extensions.push(str):activated_extensions.splice(activated_extensions.indexOf(str),1),localStorage.activatedExtensions=activated_extensions},getObjects=function(){
	const res=[];
	for(const zone of map.areas[current_Area].zones)
		if(rectRectCollision(zone,CamViewpoint)||selectionArea)
			res.push(zone);
	for(const asset of map.areas[current_Area].assets)
		if(rectRectCollision(asset,CamViewpoint)||rectCircleCollision(asset.x,asset.y,asset.radius,CamViewpoint.x,CamViewpoint.y,CamViewpoint.width,CamViewpoint.height)||selectionArea)
			res.push(asset);
	return res
},cons=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/consumedd.mp4"),prec=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/jumpscare.mp3"),luma=function(arr){return arr.map(e=>{var v=e/255;return v<.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).map((e,t)=>{return[.2126,.7152,0.0722,0][t]*e}).reduce((e,t)=>{return e+t},0)*255},customAlert=function(text,duration=2,color="#fff"){if(duration<=0)return;alertMessages.push({text,color});duration!=1/0&&setTimeout(e=>alertMessages.splice(alertMessages.map(e=>e.text).indexOf(text),1),duration*1e3)},hexToArr=function(hex){return[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]},arrtoRGBA=function(arr){return`rgba(${arr.join()})`},fillZeros=function(str="0",digits=2,filler="0"){return filler.repeat(digits-str.length)+str},RGBtoHex=function(arr){return`#${fillZeros(Number(arr[0]).toString(16))}${fillZeros(Number(arr[1]).toString(16))}${fillZeros(Number(arr[2]).toString(16))}`},RGBAtoHex=function(arr){return`${RGBtoHex(arr)}${fillZeros(Number(arr[3]).toString(16))}`},ExtractDiff=function(e){e=e.replace(/ /g,"");const t=e.split("+"),i=e.split("-");return t.length>1?parseInt(t[1]||0):i.length>1?-parseInt(i[1]||0):0},loadData=async function(){await fetch("world.yaml").then(e=>{if(e?.status>=400&&!e?.ok)return customAlert(`[Error ${e.target.status}]: Unable to fetch data "${url}"`,20,"#FF0000");if(e?.status>=200&&e?.ok)return e?.text().then(t=>{return WORLD=YAML.parse(t)});console.log("bruh",e)}).catch(e=>{return customAlert(e,1/0,"#FFFF00")})},
YAML={parse:function(e){return jsyaml.load(e,null)},stringify:function(e){return jsyaml.dump(e,{noCompatMode:true})}};
let now=new Date;
/*(from Discord) amasterclasher — Thu, Aug 1, 2024 01:16:33 EDT
	added a maximum speed property so if any mapmakers would like to put that in to their maps, it does work now
	also @Sοηiς.εχэ will ping you since you seem to care about this stuff
*/
let alertMessages=[],camScale=5/32,camX=0,camY=0,selectMode=null,lockCursor=false,resizing=false;
const types = ["wall", "light_region", "flashlight_spawner", "torch", "gate", "active", "safe", "exit", "teleport", "victory", "removal"];
const keysDown = new Set();
document.addEventListener("keydown",e=>{if(confirmationPopup || consumed_by_ink_demon)return;!(e.repeat||e.ctrlKey||e.target instanceof HTMLInputElement)&&keysDown.add(e.which)});
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
	if(!importer.selectedIndex || consumed_by_ink_demon)return;
	document.activeElement.blur();
	const url=WORLD.regions[importer.selectedIndex-1].file;
	if(importer.selectedIndex=0,consumed_by_ink_demon||=!url.endsWith(".yaml"))return;
	fetch(url).then(e=>{
		if(e.status>=600)customAlert(`${e.status} — How did you get here?`,20,"#AFAFFFFF");
		else if(e.status>=500)customAlert(`Sorry, something went wrong with the server. Please try again later. (Error ${e.status})`,20,"#FFAFAFFF");
		else if(e.status>=400)customAlert(`[Error ${e.status}!!1]: Unable to fetch file "${url}"`,20,"#FFFFAFFF");
		else if(e.status>=200)e.text().then(t=>loadFile(t,!1,!1,!1));
	}).catch(e=>{
		customAlert("Sorry, something went wrong. Please try again later.",30,"#FFAFAFFF")
		console.error("Fetch API failed.",e.stack)
	})
})
function updateMap(){let lastZone,boundaries,FileDef,pushX,pushY;map.areas.map((area,i,r)=>(boundaries=[getAreaBoundary(area)],FileDef=WORLD&&WORLD.regions.filter(e=>e.file==`regions/${map.name.split(" ").join("-").toLowerCase()}.yaml`)[0]||{x:0,y:0},pushX=0,pushY=0,area.rx.toString().startsWith("var x")&&(area.x=FileDef.x+ExtractDiff(area.rx)),area.ry.toString().startsWith("var y")&&(area.y=FileDef.y+ExtractDiff(area.ry)),boundaries[0].left&&((pushX=-boundaries[0].left,current_Area==i&&(camX+=pushX),area.rx.toString().startsWith("var x"))?(area.rx=("var x +"+(ExtractDiff(area.rx)+boundaries[0].left)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.x.value=area.rx):(area.rx.toString().startsWith("last_x"))?(area.rx=("last_x +"+(ExtractDiff(area.rx)+boundaries[0].left)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.x.value=area.rx):(area.rx.toString().startsWith("last_right"))?(area.rx=("last_right +"+(ExtractDiff(area.rx)+boundaries[0].left)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.x.value=area.rx):(area.rx=area.x+boundaries[0].left,area.x=area.rx,area.inputs)&&(area.inputs.x.value=area.rx)),boundaries[0].top&&((pushY=-boundaries[0].top,current_Area==i&&(camY+=pushY),area.ry.toString().startsWith("var y"))?(area.ry=("var y +"+(ExtractDiff(area.ry)+boundaries[0].top)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.y.value=area.ry):(area.ry.toString().startsWith("last_y"))?(area.ry=("last_y +"+(ExtractDiff(area.ry)+boundaries[0].top)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.y.value=area.ry):(area.ry.toString().startsWith("last_bottom"))?(area.ry=("last_bottom +"+(ExtractDiff(area.ry)+boundaries[0].top)).replace("+-","- ").replace("+","+ ").replace(" + 0",""),area.inputs)&&(area.inputs.y.value=area.ry):(area.ry=area.y+boundaries[0].top,area.y=area.ry,area.inputs)&&(area.inputs.y.value=area.ry)),r[i-1]&&(boundaries.push(getAreaBoundary(r[i-1])),area.rx.toString().startsWith("last_x")&&(area.x=r[i-1].x+ExtractDiff(area.rx)),area.ry.toString().startsWith("last_y")&&(area.y=r[i-1].y+ExtractDiff(area.ry)),area.rx.toString().startsWith("last_right")&&(area.x=boundaries[1].right+r[i-1].x+ExtractDiff(area.rx)),area.ry.toString().startsWith("last_bottom")&&(area.y=boundaries[1].bottom+r[i-1].y+ExtractDiff(area.ry))),area.zones.map((zone,j,u)=>(lastZone=u[j-1],!isNaN(zone.rx)&&(zone.rx+=pushX),!isNaN(zone.ry)&&(zone.ry+=pushY),zone.x+=pushX,zone.y+=pushY,zone.inputs&&(zone.inputs.x.value=zone.rx,zone.inputs.y.value=zone.ry),(lastZone&&(zone.ry=="last_y"||zone.ry=="last_top"||zone.rx=="last_x"||zone.rx=="last_left"||zone.rw=="last_width"||zone.rh=="last_height"||zone.rx=="last_right"||zone.ry=="last_bottom"))&&((zone.rx=="last_x"||zone.rx=="last_left")&&(zone.x=lastZone.x),(zone.ry=="last_y"||zone.ry=="last_top")&&(zone.y=lastZone.y),zone.rw=="last_width"&&(zone.width=lastZone.width),zone.rh=="last_height"&&(zone.height=lastZone.height),zone.rx=="last_right"&&(zone.x=lastZone.x+lastZone.width),zone.ry=="last_bottom"&&(zone.y=lastZone.y+lastZone.height)))),area.boundary=getAreaBoundary(area))),spawnEntities()}
var copiedObjects=[];
function roundTo(x, y) { return Math.round(x / y) * y }
// Zooming
var current_Area = 0;
var speedMultiplier=1;
var zoomLimit=8388608;
canvas.addEventListener("wheel", e => {
  if (e.ctrlKey || consumed_by_ink_demon) return;
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
const mousePos={ex:0,ey:0}
Object.defineProperties.bind(mousePos)(mousePos,{x:{get:function(){return this.ex / camScale+camX}},y:{get:function(){return this.ey / camScale+camY}}})
let mouseEntity=mousePos;
let selectionArea=null;
function rectRectCollision(e,t){
	return(e.x < t.width + t.x && e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y);
}
canvas.addEventListener("mousemove",e=>{
	mousePos.ex=(e.offsetX - canvas.width / 2);
	mousePos.ey=(e.offsetY - canvas.height / 2);
});
canvas.addEventListener("mouseup", e => {
	if(!selectionArea || consumed_by_ink_demon)return;
	for(let obj of getObjects()){
		if(selectionArea.width==0||selectionArea.height==0)break;
		if(obj.type=="torch"||obj.type=="flashlight_spawner"){
			if(rectCircleCollision(obj.x,obj.y,16,selectionArea.x,selectionArea.y,selectionArea.width,selectionArea.height).c){
				selectedObjects.push(obj);
				continue;
			}
		}else{
			if(rectRectCollision(selectionArea,obj)){
				selectedObjects.push(obj);
				continue;
			}
		}
	}
	selectionArea=null;
});
var isMouse=false;
canvas.addEventListener("mousedown", e => {
  if (e.button === 1) e.preventDefault();
  if (e.button !== 0 || consumed_by_ink_demon) return;
  const t = canvas.getBoundingClientRect();
  const mouse_position = {x:(e.pageX - t.left),y:(e.pageY - t.top)};
  const gameMouseCursor={
	x:(mouse_position.x-t.width/2)/CamViewpoint.gameScale,
	y:(mouse_position.y-t.height/2)/CamViewpoint.gameScale
  };
  if(Math.abs(gameMouseCursor.x)>640)return;
  if(Math.abs(gameMouseCursor.y)>360)return;
  if(selectionArea==null && (!selectedObjects.length&&!targetedObject(e)) && !playtesting){
	selectionArea={
		renderX:mousePos.x,
		renderY:mousePos.y,
		get ClampedMousePos(){
			return{
				x:clamp(mousePos.x,CamViewpoint.left,CamViewpoint.right),
				y:clamp(mousePos.y,CamViewpoint.top,CamViewpoint.bottom)
			};
		},
		get x(){return Math.min(this.renderX,this.ClampedMousePos.x)},
		get y(){return Math.min(this.renderY,this.ClampedMousePos.y)},
		get width(){return Math.abs(this.renderX-this.ClampedMousePos.x)},
		get height(){return Math.abs(this.renderY-this.ClampedMousePos.y)},
	};
  }
  let target = targetedObject(e);
  if(lockCursor)return;
  /**
   * @param {MouseEvent} e 
   */
  
  let beforeresize=e=>{}
  let resize = e => { };
  if (target && !(selectionArea?.width||selectionArea?.height)) {
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
let CamViewpoint={
	get gameScale(){return Math.min(innerWidth/1280,innerHeight/720)},
	get x(){return this.left},
	get y(){return this.top},
	get centerX(){return camX},
	get centerY(){return camY},
	set centerX(x){camX=x},
	set centerY(y){camY=y},
	get left(){return this.centerX-640*this.gameScale/camScale},
	get right(){return this.centerX+640*this.gameScale/camScale},
	get top(){return this.centerY-360*this.gameScale/camScale},
	get bottom(){return this.centerY+360*this.gameScale/camScale},
	get width(){return 1280*this.gameScale/camScale},
	get height(){return 720*this.gameScale/camScale},
};
function targetedObject(e) {
  const t = canvas.getBoundingClientRect(), mouse_position = {x:(e.pageX - t.left),y:(e.pageY - t.top)};
  if(clamp(mousePos.x,CamViewpoint.left,CamViewpoint.right)!==mousePos.x)return null;
  if(clamp(mousePos.y,CamViewpoint.top,CamViewpoint.bottom)!==mousePos.y)return null;
  if(playtesting)return;
  let objects = getObjects().reverse();
  for (const obj of objects) {
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
  let arr = getObjects();

  for (let i = arr.length - 1; i >= 0; i--) {
	if(clamp(mousePos.x,CamViewpoint.left,CamViewpoint.right)!==mousePos.x||clamp(mousePos.y,CamViewpoint.top,CamViewpoint.bottom)!==mousePos.y||playtesting)break;
    const obj = arr[i];
    const [{ x: x0, y: y0, width: x1, height: y1 }] = points(obj);
    const mouse = point(e), type = obj.type;

    if (type === "flashlight_spawner" || type === "torch") {
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
  canvas.style.cursor = "initial";
});
let updateMouseEntity=true,selectedObjects=[],hitbox=true;
canvas.addEventListener("contextmenu",e=>{if(e.preventDefault(),e.target===contextmenu||playtesting)return;contextmenu.style.left=e.x+1+"px";contextmenu.style.top=e.y+1+"px";duplicateObject.disabled=deleteObject.disabled=copyObject.disabled=cutObject.disabled=!selectedObjects.length;pasteObject.disabled=!copyObjects.length;rotateObject.disabled=(!selectedObjects.length)||(selectedObjects.length==1?(selectedObjects.filter(e=>(isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length):(selectedObjects.filter(e=>(isNaN(parseInt(e.rx))||isNaN(parseInt(e.ry))||isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length));deleteArea.disabled=map.areas.length<2;show(contextmenu,updateMouseEntity=false)});
[displayEnergyBars,tileMode,body_collection,hat_collection,gem_collection].map(e=>e.addEventListener("input",t=>{settings[t.target.id.split("_")[0]]=t.target.selectedIndex}));
[fadingEffects,abilityParticles,legacySpeedUnits,realTime,enemyOutlines,toggleMouseMovement,enableMouseMovement,confetti,legacy30FPS,displayTimer].map(e=>e.addEventListener("input",t=>{settings[t.target.id]=t.target.checked}));
[snapX,pelletTransparency,snapY,joystickDeadzone].map(e=>e.addEventListener("input",t=>{settings[t.target.id]=t.target.value}));
lang.addEventListener("input",e=>{settings.language=e.target.selectedIndex;loadLanguage(`${languages[settings.language]}.json`)});
herotype.addEventListener("input",e=>{settings.heroType=e.target.selectedIndex-1});
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
		if(!prec.ended && prec.paused && useractive.hasBeenActive && /* ERE:GE EoL */ new Date().getTime >= 1734998400000){
			!localStorage.hasWarned&&(alert("Evades Region Editor: Github Edition has reached its end of life and possibly will be consumed by mysterious entities when you try to interact the editor."),localStorage.hasWarned=true);
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
	if(confirmationPopup || e.target instanceof HTMLInputElement || consumed_by_ink_demon)
		return;
	if(e.ctrlKey&&e.which===KeyMap.A)
		return e.preventDefault(selectedObjects.push(...map.areas[current_Area].zones,...map.areas[current_Area].assets));
	if(e.ctrlKey&&e.which===KeyMap.C&&selectedObjects.length)
		return e.preventDefault(copyObjs());
	if(e.ctrlKey&&e.which===KeyMap.X&&selectedObjects.length)
		return e.preventDefault(cutObjs());
	if(e.ctrlKey&&e.which===KeyMap.V&&copyObjects.length)
		return e.preventDefault(pasteObjs());
	if(e.which===controls.PLAYTEST)
		Playtest(e);
	if(playtesting){
		const plr=map.players[map.players.map(t=>t.id).indexOf(selfId)];
		let u,safezone,bound,canUpdateElements;
		if(e.which===controls.TOGGLE_LEADERBOARD)
			localStorage.leaderboard=toggleLeaderboard=!toggleLeaderboard,
			leaderboard.hidden=!toggleLeaderboard;
		if(e.which===controls.TOGGLE_CHAT)
			localStorage.chat=toggleChat=!toggleChat,
			chat.hidden=!toggleChat;
		//Commands /teleport, /tp: teleport to a zone with fuzzy search. Usage: /teleport <region>
		if(u=(e.which===KeyMap.T)-(e.which===KeyMap.E),u)
			map.areas[current_Area].entities=[],
			plr.area=current_Area=clamp(current_Area+u,0,map.areas.length-1),
			safezone=map.areas[plr.area].zones.filter(e=>e.type=="safe")[0]??map.areas[plr.area].zones[0],
			plr.x=safezone.x+16+(safezone.width-32)*Math.random(),
			plr.y=safezone.y+16+(safezone.height-32)*Math.random(),
			plr.onTele=true,
			spawnEntities();
		if(e.which===KeyMap.R)//Max out hero card (Command: /max)
			plr.speed=510,
			plr.maxEnergy=plr.energy=300,
			plr.energyRegen=7,
			plr.level=100,
			plr.experience=plr.nextLevelExperience,
			(plr.abilityOne)&&(plr.abilityOne.locked=false,plr.abilityOne.level=plr.abilityOne.maxLevel),
			(plr.abilityTwo)&&(plr.abilityTwo.locked=false,plr.abilityTwo.level=plr.abilityTwo.maxLevel),
			(plr.abilityThree)&&(plr.abilityThree.locked=false,plr.abilityThree.level=plr.abilityThree.maxLevel);
		if(e.which===KeyMap.Y)//Toggle Cooldown (Command: /cd, /cooldown)
			plr.noCooldown=!plr.noCooldown;
		if(e.which===KeyMap.U)//Revive (Command: /r, /s, /save, /revive)
			plr.godmode=false,
			plr.deathTimer=-1;
		if(e.which===controls.PLAYTEST-3&&location.search=="?isDev")//Admin (Command: /a, /admin)
			e.preventDefault(),
			plr.admin=true,
			plr.deathTimer=-1,
			plr.speed=510,
			plr.maxEnergy=plr.energy=500,
			plr.energyRegen=500,
			plr.level=100,
			plr.noCooldown=true,
			plr.experience=plr.nextLevelExperience,
			(plr.abilityOne)&&(plr.abilityOne.locked=false,plr.abilityOne.level=plr.abilityOne.maxLevel),
			(plr.abilityTwo)&&(plr.abilityTwo.locked=false,plr.abilityTwo.level=plr.abilityTwo.maxLevel),
			(plr.abilityThree)&&(plr.abilityThree.locked=false,plr.abilityThree.level=plr.abilityThree.maxLevel);
		if(e.which===KeyMap.N)//Godmode (Command: /g)
			e.preventDefault(),
			plr.godmode=!plr.godmode,
			plr.deathTimer=-1;
		return;
	};
	if(e.which===controls.TOGGLE_HITBOX)
		hitbox=!hitbox;
	if(u=(e.which===controls.NEXT_AREA)-(e.which===controls.PREVIOUS_AREA),canUpdateElements=current_Area!=clamp(current_Area+u,0,map.areas.length-1),canUpdateElements&&!lockCursor)
		map.areas[current_Area].element.remove(),
		map.areas[current_Area].properties.element.remove(),
		delete map.areas[current_Area].element,
		delete map.areas[current_Area].inputs,
		delete map.areas[current_Area].properties.inputs,
		delete map.areas[current_Area].properties.element,
		map.areas[current_Area].entities=[],
		current_Area=clamp(current_Area+u,0,map.areas.length-1),
		customAREAgui(map.areas[current_Area]),
		areamenu.appendChild(map.areas[current_Area].element),
		bound=map.areas[current_Area].boundary,
		camX=bound.width/2+bound.left,
		camY=bound.height/2+bound.top,
		spawnEntities(),
		selectedObjects.length&&(
			selectedObjects.map(selectedObject=>{
				if(selectedObject.properties)
					"element"in selectedObject.properties&&selectedObject.properties.element.remove(),
					delete selectedObject.properties.inputs,
					delete selectedObject.properties.element;
				"element"in selectedObject&&selectedObject.element.remove();
				delete selectedObject.inputs;
				delete selectedObject.element;
				selectedObject.spawner&&selectedObject.spawner.map(e=>{
					e.types.map(t=>{
						"element"in t&&t.element.remove();
						delete t.element;
					});
					"element"in e&&e.element.remove();
					delete e.inputs;
					delete e.element;
				});
			}),
			selectedObjects=[],
			duplicateObject.disabled=!selectedObjects.length,
			deleteObject.disabled=!selectedObjects.length,
			copyObject.disabled=!selectedObjects.length,
			cutObject.disabled=!selectedObjects.length,
			pasteObject.disabled=!copyObjects.length,
			rotateObject.disabled=selectedObjects.length==0||(selectedObjects.length==1?(selectedObjects.filter(e=>(isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length):(selectedObjects.filter(e=>(isNaN(parseInt(e.rx))||isNaN(parseInt(e.ry))||isNaN(parseInt(e.rw))||isNaN(parseInt(e.rh)))).length))
		);
	if (e.which === controls.DELETE_ZONE)
		deleteObjs(),
		spawnEntities();
});
function stopPlaytesting(local=true){
	let selfPlayer;
	if(local)
		playtesting=false,
		tl.style.transform="translate(0, 0)",
		menu.hidden=false,
		realTime.disabled=false,
		camX=window.tempCamPos.x,
		camY=window.tempCamPos.y,
		current_Area=window.tempCamPos.area,
		selfPlayer=map.players.filter(e=>e.id==selfId)[0],
		selfPlayer&&(selfPlayer.remove=true,map.players.splice(map.players.indexOf(selfPlayer),1),selfId=null,current_Area=tempCamPos.area,spawnEntities()),
		evadesRenderer={snowRenderer:new SnowRenderer,dynamicLighting:new DynamicLighting(1)};
}
function Playtest(e){
	if(e.preventDefault(),consumed_by_ink_demon)return customAlert("Fatal Error",5,"#F00");
	if(false)return customAlert("Error 404: Simulation Not Found",5);
	let safezone,selfPlayer;
    playtesting=!playtesting;
	if(!playtesting)
		return $e7009c797811e935$export$2e2bcd8739ae039.deregisterListeners(),
			$e7009c797811e935$export$2e2bcd8739ae039=new $e7009c797811e935$var$InputLayer,
			isFinish=false,
			stopPlaytesting();
    tl.style.transform="translate(-100px, 0)";
    menu.hidden=true;
    realTime.disabled=true;
	if(playtesting)
		window.tempCamPos={x:camX,y:camY,area:current_Area},
		evadesRenderer={snowRenderer:new SnowRenderer,dynamicLighting:new DynamicLighting(1),directionalIndicatorHud:new DirectionalIndicatorHud,experienceBar:new ExperienceBar,heroInfoCard:new HeroInfoCard,overlayText:new OverlayText,titleText:new TitleText,minimap:new Minimap,areaInfo:new AreaInfo,mobileControls:new MobileControls},
		evadesRenderer.minimap.updateZones(),
		safezone=map.areas[0].zones.filter(e=>e.type=="safe")[0]??map.areas[0].zones[0],
		selfPlayer=new Player(safezone.x+16+(safezone.width-32)*Math.random(),safezone.y+16+(safezone.height-32)*Math.random(),settings.heroType),
		global.selfId=selfPlayer.id,
		map.players.push(selfPlayer),
		spawnEntities(selfPlayer.area);
}
resizemenu.addEventListener("mousedown",_=>(resizing=true));
document.addEventListener("mouseup",_=>(resizing=false));
document.addEventListener("mousemove",e=>resizing&&(menu.style.width=Math.max(window.innerWidth-e.pageX-15,200)+"px"));
document.addEventListener("DOMContentLoaded",loadData);
togglemenu.addEventListener("click",_=>(menu.classList.toggle("hidden"),_.target.innerText=formatString(`editor.toggleMenu.${menu.classList=="hidden"?"show":"hide"}`)));
exportFile.addEventListener("click",_=>download(map.name));
importFile.addEventListener("input",_=>(importFile.files.length&&importFile.files[0].text().then(value=>loadFile(value,true,true,importFile.files[0].name.split(".")[importFile.files[0].name.split(".").length-2]=="legacy")).catch(e=>(customAlert(e,1/0,"#FF0000"),console.error("OH SHIT!!\n",e)))));
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
  while(message.chatmsg&&(M=document.createElement("div"),M.setAttribute("class","chat-message"),M.setAttribute("style","color:#"+(message.color??(2**24-1)).toString(16).padStart(6,"0")),M.innerHTML="<b>"+(message.id||"?")+"</b>: "+message.chatmsg,c.appendChild(M),c.scrollTop=c.scrollHeight-c.clientHeight,message.chatmsg=void 0),c.childNodes.length>100){c.childNodes[0].remove()};
  message.leaderboard&&(users.Europe=message.leaderboard.filter(e=>e.includes("<span class=\"head-mod\">")),users.Asia=message.leaderboard.filter(e=>e.includes("<span class=\"streamer\">")),users.Antarctica=message.leaderboard.filter(e=>e.includes("<span class=\"mod\">")),users.SouthAmerica=message.leaderboard.filter(e=>e.includes("<span class=\"youtuber\">")),users.Africa=message.leaderboard.filter(e=>e.includes("<span class=\"sr-mod\">")),users.Oceania=message.leaderboard.filter(e=>e.includes("<span class=\"jr-mod\">")),users.NorthAmerica=message.leaderboard.filter(e=>e.includes("<span class=\"dev\">")),leaderboard.innerHTML=`<span class="leaderboard-title">Region Editor</span><div class="leaderboard-line server-info"><span class="leaderboard-name"><b>Online: ${message.leaderboard.length}/1000</b></span></div>${users.Africa.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title sr-mod">Africa</span></div>':""}${users.Africa.map(e=>`<div class="leaderboard-line sr-mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.Antarctica.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title mod">Antarctica</span></div>':""}${users.Antarctica.map(e=>`<div class="leaderboard-line mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.Asia.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title streamer">Asia</span></div>':""}${users.Asia.map(e=>`<div class="leaderboard-line streamer"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.Europe.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title head-mod">Europe</span></div>':""}${users.Europe.map(e=>`<div class="leaderboard-line head-mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.NorthAmerica.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title dev">North America</span></div>':""}${users.NorthAmerica.map(e=>`<div class="leaderboard-line dev"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span>`).join("")}${users.Oceania.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title jr-mod">Oceania</span></div>':""}${users.Oceania.map(e=>`<div class="leaderboard-line jr-mod"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span></div>`).join("")}${users.SouthAmerica.length?'<div class="leaderboard-title-break"><br><span class="leaderboard-world-title youtuber">South America</span></div>':""}${users.SouthAmerica.map(e=>`<div class="leaderboard-line youtuber"><span class="leaderboard-name">${e.split("</span> ")[1]||"?"}</span>`).join("")}`);
  (message.chathistory??[]).map(t=>{var M=document.createElement("div");while(M.setAttribute("class","chat-message"),M.setAttribute("style","color:#"+(t.color??(2**24-1)).toString(16).padStart(6,"0")),M.innerHTML="<b>"+(t.id||"?")+"</b>: "+t.chatmsg,c.appendChild(M),c.scrollTop=c.scrollHeight-c.clientHeight,c.childNodes.length>100){c.childNodes[0].remove()}});
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
	properties.background_color=(properties.background_color??[]).map(e=>clamp(e,0,255)>>0);
	if(!properties.background_color.length)properties.background_color=void 0;
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
		else if(_.target.value.split(", ").length==4)_.target.value=(properties.background_color=_.target.value.split(", ").map((e,t,a)=>isNaN(Number(a[t]))?(a[t]=0):(a[t]=clamp(Number(a[t])>>0,0,255)))).join(", ");
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
			sel = newAsset(_.x+posX, _.y+posY, _.width, _.height, _.type, _.upside_down, _.texture, _.angle);
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
			sel = newAsset(_.x, _.y, _.width, _.height, _.type, _.upside_down, _.texture, _.angle);
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
			sel = newAsset(_.x, _.y, _.width, _.height, _.type, _.upside_down, _.texture, _.angle);
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
			k.which==KeyMap.Escape&&(confirmationPopup=false,t("Cancelled action."),document.removeEventListener("keydown",keypressed),confirmDiv.remove(),confirmDivOverlay.remove())
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
(()=>{
	let e=JSON.parse(`{"language.code":"en_us","language.name":"English","language.region":"United States","editor.area":"Area Properties","editor.asset":"Asset Properties","editor.asset.flashlight_spawner":"Flashlight Spawner","editor.asset.light_region":"Light Region","editor.asset.torch":"Torch","editor.asset.wall":"Wall","editor.boolean.false":"False","editor.boolean.inherit":"Inherit","editor.boolean.none":"Default","editor.boolean.true":"True","editor.contextMenu.object":"Object Actions","editor.contextMenu.object.cut":"Cut","editor.contextMenu.object.copy":"Copy","editor.contextMenu.object.paste":"Paste","editor.contextMenu.object.delete":"Delete","editor.contextMenu.object.duplicate":"Duplicate","editor.contextMenu.object.rotate":"Rotate","editor.contextMenu.new":"Create...","editor.contextMenu.new.zone":"Create Zone","editor.contextMenu.new.asset":"Create Asset","editor.contextMenu.area":"Area Actions","editor.contextMenu.area.add":"Add Area","editor.contextMenu.area.duplicate":"Duplicate Area","editor.contextMenu.area.delete":"Remove Area","editor.confirm.delete_area":"Are you sure you want to delete the current area?","editor.confirm.start_from_scratch":"Are you sure you want to start from scratch?\\nBecause it will erase the current region.","editor.confirm.yes":"Yes","editor.confirm.no":"No","editor.category.aura":"Enemy's Aura","editor.category.aura.boss":"Boss' Aura","editor.category.cybot":"Cybot Enemy","editor.category.draining":"Draining Enemy","editor.category.flower":"Flower Enemy","editor.category.frost_giant":"Frost Giant Enemy","editor.category.grass":"Grass Enemy","editor.category.gravity":"Gravity Enemy","editor.category.homing":"Homing Enemy","editor.category.icicle":"Icicle Enemy","editor.category.liquid":"Liquid Enemy","editor.category.quicksand":"Quicksand Enemy","editor.category.radiating_bullets":"Radiating Bullets Enemy","editor.category.regen_sniper":"Regen Sniper Enemy","editor.category.repelling":"Repelling Enemy","editor.category.ring_sniper":"Ring Sniper Enemy","editor.category.slowing":"Slowing Enemy","editor.category.sniper":"Sniper Enemy","editor.category.speed_sniper":"Speed Sniper Enemy","editor.category.switch":"Switch Enemy","editor.category.turning":"Turning Enemy","editor.category.wall":"Wall Enemy","editor.category.wind_ghost":"Wind Ghost Enemy","editor.enemy.aibot":"Aibot","editor.enemy.barrier":"Barrier","editor.enemy.blocking":"Blocking","editor.enemy.cactus":"Cactus","editor.enemy.charging":"Charging","editor.enemy.confectioner":"Confectioner","editor.enemy.confectioner_switch":"Confectioner Switch","editor.enemy.corrosive":"Corrosive","editor.enemy.corrosive_sniper":"Corrosive Sniper","editor.enemy.crumbling":"Crumbling","editor.enemy.cybot":"Cybot","editor.enemy.cycling":"Cycling","editor.enemy.dabot":"Dabot","editor.enemy.dasher":"Dasher","editor.enemy.dasher_switch":"Dasher Switch","editor.enemy.disabling":"Disabling","editor.enemy.disabling_ghost":"Disabling Ghost","editor.enemy.disarming":"Disarming","editor.enemy.dorito":"Dorito","editor.enemy.dorito_switch":"Dorito Switch","editor.enemy.draining":"Draining","editor.enemy.eabot":"Eabot","editor.enemy.elbot":"Elbot","editor.enemy.electrical":"Electrical","editor.enemy.enlarging":"Enlarging","editor.enemy.experience_drain":"Experience Drain","editor.enemy.fake_pumpkin":"Fake Pumpkin","editor.enemy.fibot":"Fibot","editor.enemy.fire_trail":"Fire Trail","editor.enemy.firefly":"Firefly","editor.enemy.flaming":"Flaming","editor.enemy.flower":"Flower","editor.enemy.force_sniper_a":"Force Sniper A","editor.enemy.force_sniper_b":"Force Sniper B","editor.enemy.freezing":"Freezing","editor.enemy.frost_giant":"Frost Giant","editor.enemy.glowy":"Glowy","editor.enemy.grass":"Grass","editor.enemy.gravity":"Gravity","editor.enemy.gravity_ghost":"Gravity Ghost","editor.enemy.homing":"Homing","editor.enemy.homing_switch":"Homing Switch","editor.enemy.icbot":"Icbot","editor.enemy.ice_ghost":"Ice Ghost","editor.enemy.ice_sniper":"Ice Sniper","editor.enemy.icicle":"Icicle","editor.enemy.immune":"Immune","editor.enemy.infectious":"Infectious","editor.enemy.infinity":"Infinity","editor.enemy.infinity_switch":"Infinity Switch","editor.enemy.lava":"Lava","editor.enemy.lead_sniper":"Lead Sniper","editor.enemy.libot":"Libot","editor.enemy.liquid":"Liquid","editor.enemy.lost_soul":"Lost Soul","editor.enemy.lunging":"Lunging","editor.enemy.lurching":"Lurching","editor.enemy.magnetic_nullification":"Magnetic Nullification","editor.enemy.magnetic_reduction":"Magnetic Reduction","editor.enemy.mebot":"Mebot","editor.enemy.mist":"Mist","editor.enemy.mutating":"Mutating","editor.enemy.negative_magnetic_ghost":"Negative Magnetic Ghost","editor.enemy.negative_magnetic_sniper":"Negative Magnetic Sniper","editor.enemy.normal":"Normal","editor.enemy.oscillating":"Oscillating","editor.enemy.oscillating_switch":"Oscillating Switch","editor.enemy.penny":"Penny","editor.enemy.penny_switch":"Penny Switch","editor.enemy.phantom":"Phantom","editor.enemy.plbot":"Plbot","editor.enemy.poison_ghost":"Poison Ghost","editor.enemy.poison_sniper":"Poison Sniper","editor.enemy.positive_magnetic_ghost":"Positive Magnetic Ghost","editor.enemy.positive_magnetic_sniper":"Positive Magnetic Sniper","editor.enemy.prediction_sniper":"Prediction Sniper","editor.enemy.pumpkin":"Pumpkin","editor.enemy.quicksand":"Quicksand","editor.enemy.radar":"Radar","editor.enemy.radiating_bullets":"Radiating Bullets","editor.enemy.reducing":"Reducing","editor.enemy.regen_ghost":"Regen Ghost","editor.enemy.regen_sniper":"Regen Sniper","editor.enemy.repelling":"Repelling","editor.enemy.repelling_ghost":"Repelling Ghost","editor.enemy.residue":"Residue","editor.enemy.ring_sniper":"Ring Sniper","editor.enemy.sand":"Sand","editor.enemy.sandrock":"Sandrock","editor.enemy.seedling":"Seedling","editor.enemy.sizing":"Sizing","editor.enemy.slippery":"Slippery","editor.enemy.slowing":"Slowing","editor.enemy.sniper":"Sniper","editor.enemy.snowman":"Snowman","editor.enemy.sparking":"Sparking","editor.enemy.speed_ghost":"Speed Ghost","editor.enemy.speed_sniper":"Speed Sniper","editor.enemy.spiral":"Spiral","editor.enemy.spiral_switch":"Spiral Switch","editor.enemy.stalactite":"Stalactite","editor.enemy.star":"Star","editor.enemy.static":"Static","editor.enemy.stumbling":"Stumbling","editor.enemy.switch":"Switch","editor.enemy.teleporting":"Teleporting","editor.enemy.thunderbolt":"Thunderbolt","editor.enemy.toxic":"Toxic","editor.enemy.tree":"Tree","editor.enemy.turning":"Turning","editor.enemy.vengeful_soul":"Vengeful Soul","editor.enemy.wabot":"Wabot","editor.enemy.wacky_wall":"Wacky Wall","editor.enemy.wall":"Wall","editor.enemy.wavy":"Wavy","editor.enemy.wavy_switch":"Wavy Switch","editor.enemy.wind_ghost":"Wind Ghost","editor.enemy.wind_sniper":"Wind Sniper","editor.enemy.zigzag":"Zigzag","editor.enemy.zigzag_switch":"Zigzag Switch","editor.enemy.zoning":"Zoning","editor.enemy.zoning_switch":"Zoning Switch","editor.pattern.cone":"Cone","editor.pattern.cone_edges":"Cone Edges","editor.pattern.none":"None","editor.pattern.quadspiral":"Quad Spiral","editor.pattern.singlebig":"Single Big","editor.pattern.spiral":"Spiral","editor.pattern.twin":"Twin","editor.pattern.twincone":"Twin Cone","editor.pattern.twinspiral":"Twin Spiral","editor.property.aibot_radius":"Aibot Radius","editor.property.all_enemies_immune":"All Enemies Immune","editor.property.allow_solo_with_group":"Allow Solo With Group","editor.property.angle":"Angle","editor.property.applies_lantern":"Applies Lantern","editor.property.background_color":"Background Color","editor.property.background_color.alpha":"Alpha","editor.property.background_color.color":"Color","editor.property.barrier_radius":"Barrier Radius","editor.property.blocking_radius":"Blocking Radius","editor.property.boss":"Boss","editor.property.charge_reduced":"Charge Reduced","editor.property.circle_size":"Circle Size","editor.property.cone_angle":"Cone Angle","editor.property.count":"Count","editor.property.crumble_reduced":"Crumble Reduced","editor.property.cybot_radius":"Cybot Radius","editor.property.dabot_radius":"Dabot Radius","editor.property.death_timer":"Death Timer","editor.property.direction":"Direction","editor.property.disabling_radius":"Disabling Radius","editor.property.drain":"Drain","editor.property.draining_radius":"Draining Radius","editor.property.eabot_radius":"Eabot Radius","editor.property.elbot_radius":"Elbot Radius","editor.property.enlarging_radius":"Enlarging Radius","editor.property.experience_drain_radius":"Experience Drain Radius","editor.property.fibot_radius":"Fibot Radius","editor.property.freezing_radius":"Freezing Radius","editor.property.friction":"Friction","editor.property.gravity":"Gravity","editor.property.gravity_radius":"Gravity Radius","editor.property.growth_multiplier":"Growth Multiplier","editor.property.hard_mode":"Hard Mode","editor.property.health":"Health","editor.property.height":"Height","editor.property.home_range":"Home Range","editor.property.horizontal":"Horizontal","editor.property.icbot_radius":"Icbot Radius","editor.property.ignore_invulnerability":"Ignore Invulnerability","editor.property.immune":"Immune","editor.property.increment":"Increment","editor.property.lava_radius":"Lava Radius","editor.property.libot_radius":"Libot Radius","editor.property.lighting":"Lighting","editor.property.lightning_reduced":"Lightning Reduced","editor.property.magnetic_nullification_radius":"Magnetic Nullification Radius","editor.property.magnetic_reduction_radius":"Magnetic Reduction Radius","editor.property.magnetism":"Magnetism","editor.property.max_level":"Max Level","editor.property.maximum_speed":"Maximum Speed","editor.property.mebot_radius":"Mebot Radius","editor.property.minimum_speed":"Minimum Speed","editor.property.move_clockwise":"Move Clockwise","editor.property.name":"Name","editor.property.partial_magnetism":"Partial Magnetism","editor.property.pattern":"Pattern","editor.property.pause_duration":"Pause Duration","editor.property.pause_interval":"Pause Interval","editor.property.pellet_count":"Pellet Count","editor.property.pellet_multiplier":"Pellet Multiplier","editor.property.player_detection_radius":"Player Detection Radius","editor.property.plbot_radius":"Plbot Radius","editor.property.powered":"Powered","editor.property.projectile_duration":"Projectile Duration","editor.property.projectile_radius":"Projectile Radius","editor.property.projectile_speed":"Projectile Speed","editor.property.properties":"Properties","editor.property.push_direction":"Push Direction","editor.property.quicksand_radius":"Quicksand Radius","editor.property.quicksand_strength":"Quicksand Strength","editor.property.radar_radius":"Radar Radius","editor.property.radioactive_gloop_reduced":"Radioactive Gloop Reduced","editor.property.radius":"Radius","editor.property.recharge":"Recharge","editor.property.reducing_radius":"Reducing Radius","editor.property.regen_loss":"Regen Loss","editor.property.release_interval":"Release Interval","editor.property.release_time":"Release Time","editor.property.repelling_radius":"Repelling Radius","editor.property.repulsion":"Repulsion","editor.property.requirements":"Requirements","editor.property.reverse":"Reverse","editor.property.ring_sniper_radius":"Ring Sniper Radius","editor.property.share_to_drive":"Share To Drive","editor.property.shot_acceleration":"Shot Acceleration","editor.property.shot_interval":"Shot Interval","editor.property.slippery_radius":"Slippery Radius","editor.property.slow":"Slow","editor.property.slowing_radius":"Slowing Radius","editor.property.snow":"Snow","editor.property.spawn_top":"Spawn Top","editor.property.spawner":"Spawner","editor.property.spawns_lost_souls":"Spawns Lost Souls","editor.property.spawns_pellets":"Spawns Pellets","editor.property.speed":"Speed","editor.property.speed_loss":"Speed Loss","editor.property.sticky_coat_distort_reduced":"Sticky Coat Distort Reduced","editor.property.switch_interval":"Switch Interval","editor.property.switch_time":"Switch Time","editor.property.switched_harmless":"Switched Harmless","editor.property.texture":"Texture","editor.property.toxic_radius":"Toxic Radius","editor.property.turn_acceleration":"Turn Acceleration","editor.property.turn_speed":"Turn Speed","editor.property.type":"Type","editor.property.types":"Types","editor.property.upside_down":"Upside Down","editor.property.wabot_radius":"Wabot Radius","editor.property.warping_disabled":"Warping Disabled","editor.property.width":"Width","editor.property.wind_ghosts_do_not_push_while_downed":"Wind Ghosts Do Not Push While Downed","editor.property.x":"X","editor.property.y":"Y","editor.region":"Region Properties","editor.requirement":"Requirement","editor.requirement.aibot_defeated":"Aibot Defeated","editor.requirement.aibot_not_defeated":"Aibot Not Defeated","editor.requirement.all_elements_gained":"All Elements Gained","editor.requirement.all_heroes_unlocked":"All Heroes Unlocked","editor.requirement.coupled_corridors_found":"Coupled Corridors Found","editor.requirement.cybot_castle_defeated":"Cybot Castle Defeated","editor.requirement.cybot_defeated":"Cybot Defeated","editor.requirement.cybot_hard_mode_defeated":"Cybot Hard Mode Defeated","editor.requirement.cybot_hard_mode_not_defeated":"Cybot Hard Mode Not Defeated","editor.requirement.cybot_not_defeated":"Cybot Not Defeated","editor.requirement.dabot_defeated":"Dabot Defeated","editor.requirement.dabot_not_defeated":"Dabot Not Defeated","editor.requirement.dusty_depths_found":"Dusty Depths Found","editor.requirement.eabot_defeated":"Eabot Defeated","editor.requirement.eabot_not_defeated":"Eabot Not Defeated","editor.requirement.elbot_defeated":"Elbot Defeated","editor.requirement.elbot_not_defeated":"Elbot Not Defeated","editor.requirement.exact_index":"Exact Index","editor.requirement.exact_index.area":"Exact Area Index","editor.requirement.exact_index.region":"Exact Region Name","editor.requirement.fibot_defeated":"Fibot Defeated","editor.requirement.fibot_not_defeated":"Fibot Not Defeated","editor.requirement.icbot_defeated":"Icbot Defeated","editor.requirement.icbot_not_defeated":"Icbot Not Defeated","editor.requirement.inaccessible":"Inaccessible","editor.requirement.libot_defeated":"Libot Defeated","editor.requirement.libot_not_defeated":"Libot Not Defeated","editor.requirement.mansion_discovered":"Mansion Discovered","editor.requirement.mebot_defeated":"Mebot Defeated","editor.requirement.mebot_not_defeated":"Mebot Not Defeated","editor.requirement.mystery_keycard":"Mystery Keycard","editor.requirement.none":"None","editor.requirement.plbot_defeated":"Plbot Defeated","editor.requirement.plbot_not_defeated":"Plbot Not Defeated","editor.requirement.research_lab_discovered":"Research Lab Discovered","editor.requirement.switch_station_found":"Switch Station Found","editor.requirement.ten_hard_variants":"Ten Hard Variants","editor.requirement.wabot_defeated":"Wabot Defeated","editor.requirement.wabot_not_defeated":"Wabot Not Defeated","editor.spawner":"Enemy Spawner #","editor.texture.baguette":"Baguette","editor.texture.ice":"Ice","editor.texture.inherit":"Inherit","editor.texture.leaves":"Leaves","editor.texture.normal":"Normal","editor.texture.null":"None","editor.texture.wooden":"Wooden","editor.toggleMenu.hide":"Close Menu","editor.toggleMenu.show":"Open Menu","editor.zone":"Zone Properties","editor.zone.active":"Active","editor.zone.dummy":"Dummy","editor.zone.exit":"Exit","editor.zone.removal":"Removal","editor.zone.safe":"Safe","editor.zone.teleport":"Teleport","editor.zone.victory":"Victory"}`);
	function formatString(str){
	  var s=e[str]??str;
	  var args=Array.from(arguments).slice(1);
	  args.map(t=>s=s.replace("%s",t));
	  return s;
	}
	togglemenu.innerText=formatString(`editor.toggleMenu.${menu.classList=="hidden"?"show":"hide"}`)
	contextmenu.rows[0].cells[0].innerText=formatString("editor.contextMenu.object")
	contextmenu.rows[1].cells[0].children[0].innerText=formatString("editor.contextMenu.object.copy")
	contextmenu.rows[1].cells[1].children[0].innerText=formatString("editor.contextMenu.object.cut")
	contextmenu.rows[1].cells[2].children[0].innerText=formatString("editor.contextMenu.object.paste")
	contextmenu.rows[2].cells[0].children[0].innerText=formatString("editor.contextMenu.object.delete")
	contextmenu.rows[2].cells[1].children[0].innerText=formatString("editor.contextMenu.object.duplicate")
	contextmenu.rows[2].cells[2].children[0].innerText=formatString("editor.contextMenu.object.rotate")
	contextmenu.rows[3].cells[0].innerText=formatString("editor.contextMenu.new")
	contextmenu.rows[4].cells[0].children[0].innerText=formatString("editor.contextMenu.new.zone")
	contextmenu.rows[4].cells[1].children[0].innerText=formatString("editor.contextMenu.new.asset")
	contextmenu.rows[5].cells[0].innerText=formatString("editor.contextMenu.area")
	contextmenu.rows[6].cells[0].children[0].innerText=formatString("editor.contextMenu.area.add")
	contextmenu.rows[6].cells[1].children[0].innerText=formatString("editor.contextMenu.area.duplicate")
	contextmenu.rows[6].cells[2].children[0].innerText=formatString("editor.contextMenu.area.delete")
	global.formatString=formatString;
	"element" in map && (map.element.remove(),delete map.element);
	map.element=createFolder(formatString("editor.region"), [
		createProperty(formatString("editor.property.name"),nameInput=createInput(map.name,_=>{map.name=nameInput.value}),"text"),
		createProperty(formatString("editor.property.share_to_drive"),boolInput=createInput(map.share_to_drive,_=>{map.share_to_drive=boolInput.checked}),"switch"),
		(map.properties=createPropertyObj({...map.properties},"region")).element,
	]);
	map.element.classList.add("closed");
	menu.insertBefore(map.element,areamenu);
	areamenu.firstChild && areamenu.removeChild(areamenu.firstChild);
	if(selectedObjects){
		for(const obj of selectedObjects){
			obj.element.remove();
			obj.properties.element.remove();
			delete obj.element;
			delete obj.properties.element;
			delete obj.inputs;
		}
	}
	selectedObjects=[];
	customAREAgui(map.areas[0]);
	areamenu.appendChild(map.areas[0].element);
})();
settings.realTime && (
	customAlert("WARNING: The simulator will crash when dabot, elbot, and libot enemies shoot its enemies or projectiles.",10,"#FF0"),
	customAlert("You can disable update area in real time in settings to prevent crashes like that. :D",10,"#FF0"),
	customAlert("Also, please don't playtest (F4) at the area with entity crashers.",10,"#FF0")
);
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
function point(e) {
  return { x: e.pageX, y: e.pageY };
}
function pointInRect(point, point0, point1) {
  return point.x > point0.x && point.x < point1.x && point.y > point0.y && point.y < point1.y;
}
function pointInCircle(point, pos, r) {
  return (point.x - pos.x) * (point.x - pos.x) + (point.y - pos.y) * (point.y - pos.y) <= r * r;
}
function hide(element) {
  element.classList.add("hidden");
}
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
var mouseOn=loadImage("./buttons/mouse-on.png");
var mouseOff=loadImage("./buttons/mouse-off.png");
inputIndicator.appendChild(mouseOff);
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
			map.areas[current_Area].entities=map.areas[current_Area].entities.filter(e=>!e.remove);
			if(settings.realTime||playtesting){
				const state=$e7009c797811e935$export$2e2bcd8739ae039.gameState,input={keys:keysDown};
				if(state){
					state.mouseDown==void 0&&(state.mouseDown=null);
					input.isMouse=null!==state.mouseDown;
					input.mouse={x:(state.mouseDown?.x||0)+canvas.width/2,y:(state.mouseDown?.y||0)+canvas.height/2};
					if($e7009c797811e935$export$2e2bcd8739ae039.mouseMovementToggled && inputIndicator.children[0]==mouseOff){
						mouseOff.remove();
						inputIndicator.appendChild(mouseOn);
					}else if(!$e7009c797811e935$export$2e2bcd8739ae039.mouseMovementToggled && inputIndicator.children[0]==mouseOn){
						mouseOn.remove();
						inputIndicator.appendChild(mouseOff);
					}
				}
				selfId&&controlPlayer(selfId,input,1e3/60);
				map.players.map(e=>{e.update(1e3/60)});
				map.areas[current_Area].entities.map(e=>e.update(1e3/60,map.areas[current_Area]));
			}
			actually-=1e3/60;
		}
	}else{
		while(ti[1]>=1e3/60&&actually!=0){
			map.areas[current_Area].entities=map.areas[current_Area].entities.filter(e=>!e.remove);
			if(settings.realTime||playtesting){
				const state=$e7009c797811e935$export$2e2bcd8739ae039.gameState,input={keys:keysDown};
				if(state){
					state.mouseDown==void 0&&(state.mouseDown=null);
					input.isMouse=null!==state.mouseDown;
					input.mouse={x:(state.mouseDown?.x||0)+canvas.width/2,y:(state.mouseDown?.y||0)+canvas.height/2};
					if($e7009c797811e935$export$2e2bcd8739ae039.mouseMovementToggled && inputIndicator.children[0]==mouseOff){
						mouseOff.remove();
						inputIndicator.appendChild(mouseOn);
					}else if(!$e7009c797811e935$export$2e2bcd8739ae039.mouseMovementToggled && inputIndicator.children[0]==mouseOn){
						mouseOn.remove();
						inputIndicator.appendChild(mouseOff);
					}
				}
				selfId&&controlPlayer(selfId,input,1e3/60);
				map.players.map(e=>{e.update(1e3/60)});
				map.areas[current_Area].entities.map(e=>e.update(1e3/60,map.areas[current_Area]));
			}
			ti[1]-=1e3/60;
		}
	}
}
[...document.querySelectorAll("script")].map(e=>e.remove());global.selfId=null;
animate(function run(e){
	rungame(e);
	(settings.legacy30FPS?(ti[0]==0):!0)&&render();
	animate(run);
});
async function play_sonicexe_is_banned_from_evades_cutscene(tr=true){
					if(tr)localStorage.EvadesioEvictionNotice=!0;
					let w=await fetch("/index.html").then(e=>e.text());
					return location.replace("/");
					document.body.parentElement.innerHTML=w;
					const loadedTimes=Date.now();
					let hadChanged=false;
					requestAnimationFrame(function tttt(){
					str="";
					//Disable links to region editor.
					localStorage.sonic_is_banned_from_evades!="true"&&localStorage.EvadesioEvictionNotice=="true"&&[...document.querySelectorAll(".section.right a")].map(e=>e.href="#");
					//Watch the region editor project collapse.
					if(!hadChanged&&((Date.now()-loadedTimes>2e3&&localStorage.EvadesioEvictionNotice=="true")||localStorage.sonic_is_banned_from_evades=="true")){
					hadChanged=true;
					localStorage.EvadesioEvictionNotice="false";
					localStorage.sonic_is_banned_from_evades=="false"&&global.cons.play();
					localStorage.sonic_is_banned_from_evades="true";
					document.querySelectorAll(".section.right")[0].innerHTML=`
            <a href="#" target="_blank"><div class="consumed"></div></a>
            <div class="description">
                <h2><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 511.815" fill="currentcolor"><path d="M24.983 197.869h16.918v-39.203c0-43.387 17.107-82.959 44.667-111.698C114.365 18 152.726 0 194.998 0c42.259 0 80.652 17.981 108.41 46.968 27.58 28.739 44.692 68.292 44.692 111.698v39.203h16.917c13.738 0 24.983 11.245 24.983 24.984v263.978c0 13.739-11.245 24.984-24.983 24.984H24.983C11.226 511.815 0 500.57 0 486.831V222.853c-.013-13.739 11.226-24.984 24.983-24.984zm149.509 173.905l-26.968 70.594h94.923l-24.966-71.573c15.852-8.15 26.688-24.67 26.688-43.719 0-27.169-22.015-49.169-49.184-49.169-27.153 0-49.153 22-49.153 49.169-.016 19.826 11.737 36.905 28.66 44.698zM89.187 197.869h211.602v-39.203c0-30.858-12.024-58.823-31.376-79.005-19.147-19.964-45.49-32.368-74.428-32.368-28.925 0-55.288 12.404-74.422 32.368-19.37 20.182-31.376 48.147-31.376 79.005v39.203z"></path></svg> This project is locked.</a></h2>
                <p>Reason: ???</p>
                <!--<p>Reason: Staff members in Evades.io Discord Server have banned @sonic.exe666 from that guild. (If this ban persists, <a href="evades-region-editor">this project</a> will be permanently erased from the internet)</p>-->
            </div>`;document.querySelector(".changelog").innerHTML=`Unable to load changelog: changelog was abnormally deleted.`}
					localStorage.sonic_is_banned_from_evades=="true"&&(document.querySelectorAll(".changelog")[0].hidden=true)
for(var i=0;i<100;i++){
    str+=String.fromCharCode(Math.random()*256)
}
var now=arguments[0];
re.dx.baseVal=Math.random()*10-5+Math.tan(now);
re.dy.baseVal=Math.random()*10-5;
ge.dx.baseVal=Math.random()*10-5-Math.tan(now);
ge.dy.baseVal=Math.random()*10-5;
be.dx.baseVal=Math.random()*10-5-Math.tan(now);
be.dy.baseVal=Math.random()*10-5;/*
re.dx.baseVal=5*Math.sin(30*now/(1e3/30) * Math.PI/180);
ge.dx.baseVal=-5*Math.sin(30*now/(1e3/30) * Math.PI/180);
be.dx.baseVal=-5*Math.sin(30*now/(1e3/30) * Math.PI/180);*/
					garbage.textContent=str;
					requestAnimationFrame(tttt);
					});var ismaximize=false;var icons=[
					`<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="compress" class="svg-inline--fa fa-compress " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"></path></svg>`,
					`<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand" class="svg-inline--fa fa-expand " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path></svg>`];
}
localStorage.sonic_is_banned_from_evades=="true"&&play_sonicexe_is_banned_from_evades_cutscene(false);