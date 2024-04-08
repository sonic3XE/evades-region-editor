var global = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  : Function('return this')();
var tileMap;
const config={get isImagesLoaded(){
  global.tileMap=loadImage("tilemap.png");
  global.tilesDark=loadImage("tilesDark.png");
  //fetch("/EvadesRegionEditorTileMap").then(e=>e.arrayBuffer().then(t=>global.tileMap=QOItoPNG(bz2.decompress(new Uint8Array(t).slice(12)))))
	return true;
}};
const isForked=location.href!=="https://sonic3xe.github.io/evades-region-editor/";
const reloadPage=location.reload.bind(location);
function manageExtensions(str){
	if(activated_extensions.indexOf(str)==-1)
		activated_extensions.push(str);
	else
		activated_extensions.splice(activated_extensions.indexOf(str),1);
	localStorage.activatedExtensions=activated_extensions;
}
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const types = ["wall", "light_region", "flashlight_spawner", "torch", "gate", "active", "safe", "exit", "teleport", "victory", "removal"];
function getObjects(type = "active") {
  return [...map.areas[current_Area].zones, ...map.areas[current_Area].assets];
}
let timeOnEnter = Date.now();

const randomMapNames = ["editor test", "My Map", "EPIC MAP", "{{map->name}}"];
const randomMapCreators = ["anonymous", "xXDark_L0rd_69420Xx", "Editor", "{{map->creator}}"];

/**
 * @type {{name:string,properties:Properties,areas:Area[]}}
 */
const map = {
  name: "No Name",
  players: [],
  properties: {},
  areas: [],
  players: [],
};

{
  const tips = ["Scroll on numbers to increment.<br>You can click on the switch to enable/disable like applies_lantern.","You can create an area by context menu and<br>press an arrow key to see a new area.","Click on properties folder to see inside."];
  const i = Math.floor(Math.random() * tips.length);
  document.getElementById("tip").innerHTML=document.getElementById("tip").innerHTML.replace("Tip {{tip_index}}: {{tip_name}}<br>","")//`Tip ${i + 1}: ${tips[i]}`);
  //document.getElementById("tip").style.display = `block`;
}

let camScale = 5 / 32;
const camSpeed = 10;
let camX = 0;
let camY = 0;
let selectedObject = null;
let currentArea = null;

const selectBuffer = 5;
/** @type {null | "u" | "ur" | "r" | "dr" | "d" | "dl" | "l" | "ul"} */
let selectMode = null;
let lockCursor = false;

const menu = document.getElementById("menu");
const areamenu = document.getElementById("areamenu");
const objectmenu = document.getElementById("objectmenu");
const togglemenu = document.getElementById("togglemenu");
const resizemenu = document.getElementById("resizemenu");
let resizing = false;

const downloadBtn = document.getElementById("download");
const importInput = document.getElementById("import");
const contextmenu = document.getElementById("contextmenu");
const contextBtns = {
  zone: document.getElementById("createZone"),
  wallAsset: document.getElementById("createWall"),
  lightRegion: document.getElementById("createLightRegion"),
  flashlightSpawner: document.getElementById("createFlashlightSpawner"),
  torch: document.getElementById("createTorch"),
  gate: document.getElementById("createGate"),
  area: document.getElementById("createArea"),
  deleteArea: document.getElementById("deleteArea"),
  duplicateArea: document.getElementById("duplicateArea"),
  deleteObject: document.getElementById("deleteObject"),
  duplicateObject: document.getElementById("duplicateObject"),
  objectActions: document.getElementById("objectActions"),
};

const togglebottommenu = document.getElementById("togglebottommenu");
const bottommenu = document.getElementById("bottommenu");
const areaList = document.getElementById("areaList");
function loadImage(src) {
  if(typeof src!="string")return;
  let image = new Image();
  image.src = src;
  image.onerror = () => {
    console.log("ERROR AT", image.src);
  }
  return image;
}
config.isImagesLoaded;
/**
 * @param {string} hex
 */
function hexToArr(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
}
/**
 * @param {ColorArr} arr 
 */
function arrtoRGBA(arr) {
  return `rgba(${arr.join()})`;
}
function fillZeros(str = "0", digits = 2, filler = "0") {
  return filler.repeat(digits - str.length) + str;
}
/**
 * @param {ColorArr} arr 
 */
function arrtoHex(arr) {
  return `#${fillZeros(Number(arr[0]).toString(16))}${fillZeros(Number(arr[1]).toString(16))}${fillZeros(Number(arr[2]).toString(16))}`;
}
function RGBtoHex(arr) {
  return `#${fillZeros(Number(arr[0]).toString(16))}${fillZeros(Number(arr[1]).toString(16))}${fillZeros(Number(arr[2]).toString(16))}`;
}
function RGBAtoHex(arr) {
  return `#${fillZeros(Number(arr[0]).toString(16))}${fillZeros(Number(arr[1]).toString(16))}${fillZeros(Number(arr[2]).toString(16))}${fillZeros(Number(arr[3]).toString(16))}`;
}
/**
 * @param {ColorArr} color 
 * @param {number} opacity
 */
function blend240([r, g, b], opacity) {
  return "rgb(" +
    (240 + (r - 240) * opacity) + "," +
    (240 + (g - 240) * opacity) + "," +
    (240 + (b - 240) * opacity) + ")";
}
/**
 * @param {ColorArr} arr
 */
function luma(arr) {
  return arr.map(e => { var v = e / 255; return v < .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4) }).map((e, t) => { return [.2126, .7152, 0.0722, 0][t] * e }).reduce((e, t) => { return e + t }, 0) * 255
}
var alertMessages=[];
/** 
 * @params {string} text
 * @params {number} duration
 * @params {string} color
*/
function customAlert(text,duration=2,color="#fff"){
  if(duration<=0)return;
  alertMessages.push({text,color});
  duration!=1/0&&setTimeout(e=>{
    alertMessages.splice(alertMessages.map(e=>e.text).indexOf(text),1);
  },duration*1e3)
}
var keysDown = new Set();
document.addEventListener("keydown", e => {
  if (e.repeat) return;
  if (e.target instanceof HTMLInputElement) return;
  if (e.ctrlKey) return;
  keysDown.add(e.which);
});
document.addEventListener("keyup", e => {
  keysDown.delete(e.which);
})
/** 
 * @param {number} t
 * @param {number} e
 * @returns {HTMLCanvasElement} o
*/
function createOffscreenCanvas(t, e) {
  var o = document.createElement("canvas");
  return o.width = t,
    o.height = e,
    o
}
var abilities=loadImage("abilities.png");
var txtr_abilities=[
	{x: 53,y:715,w:50,h:50},
	{x:157,y:573,w:50,h:50},
	{x:209,y:157,w:50,h:50},
	{x:157,y:521,w:50,h:50},
	{x:313,y:313,w:50,h:50},
	{x:105,y: 53,w:50,h:50},
];
txtr_abilities[18]={x:313,y:573,w:50,h:50};
txtr_abilities[31]={x:313,y:625,w:50,h:50};
txtr_abilities[96]={x: 53,y:923,w:50,h:50};
txtr_abilities[98]={x:261,y:937,w:50,h:50};
txtr_abilities[99]={x:105,y:729,w:50,h:50};
txtr_abilities[-1]={x:  1,y:923,w:50,h:50};
var zoneconsts = {
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
class snow { constructor() { this.intensity = 0, this.particles = [], this.angle = 0, this.area = null, this.camera = null } update(t, i, r) { if (this.intensity = JSON.parse(t).snow, 0 !== this.intensity) { t !== JSON.stringify(this.area) && (this.area = JSON.parse(t), this.reset(i)); var s = 0, a = 0; null !== this.camera && (s = this.camera.x - r.x, a = this.camera.y - r.y), this.camera = { x: r.x, y: r.y }, this.angle += .01; for (var h = this.width(i), e = this.height(i), n = 1 + 2 * this.intensity, d = 0; d < this.particles.length; d++) { var l = this.particles[d]; l.x += 2 * Math.sin(this.angle) * n - s, l.y += (Math.cos(this.angle + l.d) + 1 + l.r / 2) * n - a, l.x > h ? this.particles[d] = s < 0 ? { x: -(Math.random() * s), y: Math.random() * e, r: l.r, d: l.d } : { x: 0, y: Math.random() * e, r: l.r, d: l.d } : l.x < 0 ? this.particles[d] = s > 0 ? { x: h - Math.random() * s, y: Math.random() * e, r: l.r, d: l.d } : { x: h, y: Math.random() * e, r: l.r, d: l.d } : l.y > e && a < 0 ? this.particles[d] = { x: Math.random() * h, y: -(Math.random() * a), r: l.r, d: l.d } : l.y < 0 && a > 0 ? this.particles[d] = { x: Math.random() * h, y: e - Math.random() * a, r: l.r, d: l.d } : (l.y < 0 || l.y > e) && (this.particles[d] = { x: Math.random() * h, y: 0, r: l.r, d: l.d }) } } } reset(t) { this.angle = 0, this.particles = [], this.camera = null; for (var i = Math.ceil(2 * this.intensity), r = Math.ceil(3.5 * this.intensity), s = this.width(t), a = this.height(t), h = 0; h < Math.floor(40 * this.intensity); h++)this.particles.push({ x: Math.random() * s, y: Math.random() * a, r: Math.random() * (r - i) + i, d: Math.random() }) } width(t) { return t.canvas.width } height(t) { return t.canvas.height } render(t) { if (0 !== this.intensity) { var i = this.width(t), r = this.height(t); t.fillStyle = "rgba(255, 255, 255, 0.8)", t.beginPath(); for (var s = 0; s < this.particles.length; s++) { var a = this.particles[s], h = a.x, e = a.y; h < 0 || e < 0 || h > i || e > r || (t.moveTo(h, e), t.arc(h, e, a.r, 0, 2 * Math.PI, !1)) } t.fill() } } }
var c = new snow;
function ExtractDiff(e){e=e.replace(/ /g,"");const t=e.split("+"),i=e.split("-");return t.length>1?parseInt(t[1]||0):i.length>1?-parseInt(i[1]||0):0};
const auraColors={
  "slowing":"rgba(255, 0, 0, 0.15)",
  "draining":"rgba(0, 0, 255, 0.15)",
  "gravity":"rgba(60, 0, 115, 0.15)",
  "repelling":"rgba(210, 228, 239, 0.2)",
  "freezing":"rgba(58, 117, 112, 0.3)",
  "slippery":"rgba(33, 161, 165, 0.3)",
  "disabling":"rgba(255, 191, 206, 0.5)",
  "experience_drain":"rgba(60, 0, 0, 0.2)",
  "enlarging":"rgba(77, 1, 99, 0.3)",
  "toxic":"rgba(0, 199, 0, 0.2)",
  "magnetic_reduction":"rgba(189, 103, 210, 0.25)",
  "magnetic_nullification":"rgba(100, 35, 116, 0.3)",
  "lava":"rgba(247, 131, 6, 0.3)",
  "cybot":"rgba(146, 107, 227, 0.3)",
  "quicksand":"rgba(108, 84, 30, 0.3)",
  "radar":"rgba(153, 153, 153, 0.2)",
  "barrier":"rgba(41, 255, 198, 0.3)",
  "reducing":"rgba(45, 50, 55, 0.15)",
  "blocking":"rgba(191, 82, 19, 0.3)",
  "swamp":"rgba(11, 54, 11, 0.25)",
  "riptide":"rgba(30, 100, 120, 0.15)",
  "drowning":"rgba(13, 36, 77, 0.2)",
  "burning":"rgba(255, 165, 0, 0.3)",
  "defender":"rgba(0, 0, 0, 0.2)",
  "web":"rgba(255, 255, 255, 0.6)",
};
const enemyConfig=getEnemyConfig();
async function loadData(){
	await fetch("world.yaml").then(e=>{
		if(e?.status>=400&&!e?.ok)return customAlert(`[Error ${e.target.status}]: Unable to fetch data "${url}"`,20,"#FF0000");
		if(e?.status>=200&&e?.ok)return e?.text().then(t=>{return WORLD=YAML.parse(t)});
		console.log("bruh",e);
	}).catch(e=>{
		return customAlert(e,1/0,"#FFFF00");
	});
};
importer.addEventListener("input",e=>{
  if(!importer.selectedIndex)return;
  var req=new XMLHttpRequest;
  var url=WORLD.regions[importer.selectedIndex-1].file;
  if(!url.endsWith(".yaml"))consumed_by_ink_demon=1;
  req.addEventListener("load", e=>{
    if(e.target.status>=400)return customAlert(`[Error ${e.target.status} (${e.target.statusText})!!1]: Unable to fetch file "${url}"`,20,"#FF0000");
    if(e.target.status>=200)return loadFile(e.target.responseText,false,false);
    if(e.target.status==0)return customAlert(`[No connection]: Please check your internet connection because you might be offline.`,20,"#FFFF00");
  });
  req.open("GET",url)
  req.send();
  importer.selectedIndex=0
})
function updateMap(){
  for (let i in map.areas) {
var pushX=0;
var pushY=0;
    var area = map.areas[i];
    area.previousArea=map.areas[i-1];
    var curBoundary=area.BoundingBox;
    area.rx.toString().startsWith("var x")&&(area.x=ExtractDiff(area.rx));
    area.ry.toString().startsWith("var y")&&(area.y=ExtractDiff(area.ry));
    if(area.previousArea){
      var boundary=area.previousArea.BoundingBox;
      area.rx.toString().startsWith("last_x")&&(area.x=area.previousArea.x+ExtractDiff(area.rx));
      area.ry.toString().startsWith("last_y")&&(area.y=area.previousArea.y+ExtractDiff(area.ry));
      area.rx.toString().startsWith("last_right")&&(area.x=boundary.right+area.previousArea.x+ExtractDiff(area.rx));
      area.ry.toString().startsWith("last_bottom")&&(area.y=boundary.bottom+area.previousArea.y+ExtractDiff(area.ry));
    }
    if(curBoundary.left!=0){
		var areax;
		pushX=-curBoundary.left;
		current_Area==i&&(camX+=pushX);
		if(area.rx.toString().startsWith("var x")){
			areax=ExtractDiff(area.rx)+curBoundary.left;
      if(area.inputs)area.inputs.x.value=AreaX.value=area.rx = ("var x +"+areax).replace("+-","- ").replace("+","+ ").replace(" + 0","");
      else area.rx = ("var x +"+areax).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		}else if(area.rx.toString().startsWith("last_x")){
			areax=ExtractDiff(area.rx)+curBoundary.left;
			if(area.inputs)area.inputs.x.value=AreaX.value=area.rx = ("last_x +"+areax).replace("+-","- ").replace("+","+ ").replace(" + 0","");
      else area.rx = ("last_x +"+areax).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		}else if(area.rx.toString().startsWith("last_right")){
			areax=ExtractDiff(area.rx)+curBoundary.left;
			if(area.inputs)area.inputs.x.value=AreaX.value=area.rx = ("last_right +"+areax).replace("+-","- ").replace("+","+ ").replace(" + 0","");
      else area.rx = ("last_right +"+areax).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		}else{
			areax=area.x+curBoundary.left;
			if(area.inputs){area.inputs.x.value=AreaX.value=area.rx = areax}
      else {area.rx = areax};
			area.x=area.rx;
		};
	}
	if(curBoundary.top!=0){
		var areay;
		pushY=-curBoundary.top;
		current_Area==i&&(camY+=pushY);
		if(area.ry.toString().startsWith("var y")){
			areay=ExtractDiff(area.ry)+curBoundary.top;
			if(area.inputs)area.inputs.y.value=area.ry = ("var y +"+areay).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		  else area.ry = ("var y +"+areay).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		}else if(area.ry.toString().startsWith("last_y")){
			areay=ExtractDiff(area.ry)+curBoundary.top;
			if(area.inputs)area.inputs.y.value=area.ry = ("last_y +"+areay).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		  else area.ry = ("last_y +"+areay).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		}else if(area.ry.toString().startsWith("last_bottom")){
			areay=ExtractDiff(area.ry)+curBoundary.top;
			if(area.inputs)area.inputs.y.value=area.ry = ("last_bottom +"+areay).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		  else area.ry = ("last_bottom +"+areay).replace("+-","- ").replace("+","+ ").replace(" + 0","");
		}else {
			areay=area.y+curBoundary.top;
			if(area.inputs){area.inputs.y.value=area.ry = areay}
      else {area.ry = areay};
			area.y=area.ry;
		}
	}
    for(var j in map.areas[i].zones){
    var lastZone=map.areas[i].zones[j-1];
    var zone=map.areas[i].zones[j];
	if(!isNaN(zone.rx)){
		zone.rx+=pushX
	}
	if(!isNaN(zone.ry)){
		zone.ry+=pushY
	}
    zone.x+=pushX;
    zone.y+=pushY;
      if(zone.inputs){
    zone.inputs.x.value=zone.rx;
    zone.inputs.y.value=zone.ry;
      }
    zone.previousZone=lastZone;
    if(!(zone.ry=="last_y"||zone.ry=="last_top"||zone.rx=="last_x"||zone.rx=="last_left"||zone.rw=="last_width"||zone.rh=="last_height"||zone.rx=="last_right"||zone.ry=="last_bottom"))continue;
    if(zone.previousZone){
    (zone.rx=="last_x"||zone.rx=="last_left")&&(zone.x=lastZone.x);
    (zone.ry=="last_y"||zone.ry=="last_top")&&(zone.y=lastZone.y);
    zone.rw=="last_width"&&(zone.width=lastZone.width);
    zone.rh=="last_height"&&(zone.height=lastZone.height);
    zone.rx=="last_right"&&(zone.x=lastZone.x+lastZone.width);
    zone.ry=="last_bottom"&&(zone.y=lastZone.y+lastZone.height);
    }
    }
  }
  spawnEntities();
}
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
  camScale *= m;
  if(camScale>32||camScale<1/zoomLimit)m=1;
  camX = (m * x - x + camX) / m;
  camY = (m * y - y + camY) / m;
  camScale = Math.min(Math.max(1/zoomLimit,camScale),32);
},{capture:true,passive:true});
const mousePos={x:0,y:0}
let mouseEntity={x:mousePos.x / camScale + camX,y:mousePos.y / camScale + camX}
canvas.addEventListener("mousemove", e => {
  mousePos.x=(e.offsetX - canvas.width / 2);
  mousePos.y=(e.offsetY - canvas.height / 2);
});
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
    if (selectedObject && "element" in selectedObject) selectedObject.element.remove();
    selectedObject = target;
    if(target.isAsset){
      customASSETgui(target);
    }else{
      customZONEgui(target);
    }
    objectmenu.appendChild(selectedObject.element);
    const { x: posX, y: posY, width: sizeX, height: sizeY } = target ?? target;
    const mouseX = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
    const mouseY = Math.round((e.pageY - canvas.height / 2) / camScale + camY);

    {
      var snap={x:localStorage.getItem("snapX")||16,y:localStorage.getItem("snapY")||16}
      switch (selectMode) {
        case "u":
          resize = e => {
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if(!isNaN(target.ry))target.ry=target.y = roundTo(y, snap.y);
            if(!isNaN(target.rh))target.rh=target.height = roundTo(posY - y + sizeY, snap.y);
            if(!isNaN(target.ry))target.inputs.y.value = target.y;
            if(!isNaN(target.rh))target.inputs.height.value = target.height;
          }
          break;
        case "ur":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if(!isNaN(target.rw))target.rw=target.width = roundTo(x - posX, snap.x);
            if(!isNaN(target.ry))target.ry=target.y = roundTo(y, snap.y);
            if(!isNaN(target.rh))target.rh=target.height = roundTo(posY - y + sizeY, snap.y);
            if(!isNaN(target.rx))target.inputs.x.value = target.x;
            if(!isNaN(target.ry))target.inputs.y.value = target.y;
            if(!isNaN(target.rw))target.inputs.width.value = target.width;
            if(!isNaN(target.rh))target.inputs.height.value = target.height;
          }
          break;
        case "r":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            if(!isNaN(target.rw))target.rw=target.width = roundTo(x - posX, snap.x);
            if(!isNaN(target.rx))target.inputs.x.value = target.x;
            if(!isNaN(target.rw))target.inputs.width.value = target.width;
          }
          break;
        case "dr":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if(!isNaN(target.rw))target.rw=target.width = roundTo(x - posX, snap.x);
            if(!isNaN(target.rh))target.rh=target.height = roundTo(y - posY, snap.y);
            if(!isNaN(target.rx))target.inputs.x.value = target.x;
            if(!isNaN(target.ry))target.inputs.y.value = target.y;
            if(!isNaN(target.rw))target.inputs.width.value = target.width;
            if(!isNaN(target.rh))target.inputs.height.value = target.height;
          }
          break;
        case "d":
          resize = e => {
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if(!isNaN(target.rh))target.rh=target.height = roundTo(y - posY, snap.y);
            if(!isNaN(target.ry))target.inputs.y.value = target.y;
            if(!isNaN(target.rh))target.inputs.height.value = target.height;
          }
          break;
        case "dl":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if(!isNaN(target.rx))target.rx = target.x = roundTo(x, snap.x);
            if(!isNaN(target.rw))target.rw = target.width = roundTo(posX - x + sizeX, snap.x);
            if(!isNaN(target.rh))target.height = roundTo(y - posY, snap.y);
            if(!isNaN(target.rx))target.inputs.x.value = target.x;
            if(!isNaN(target.ry))target.inputs.y.value = target.y;
            if(!isNaN(target.rw))target.inputs.width.value = target.width;
            if(!isNaN(target.rh))target.inputs.height.value = target.height;
          }
          break;
        case "l":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            if(!isNaN(target.rx))target.rx = target.x = roundTo(x, snap.x);
            if(!isNaN(target.rw))target.rw = target.width = roundTo(posX - x + sizeX, snap.x);
            if(!isNaN(target.rx))target.inputs.x.value = target.x;
            if(!isNaN(target.rw))target.inputs.width.value = target.width;
          }
          break;
        case "ul":
          resize = e => {
            let x = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if(!isNaN(target.rx))target.rx = target.x = roundTo(x, snap.x);
            if(!isNaN(target.rw))target.rw = target.width = roundTo(posX - x + sizeX, snap.x);
            if(!isNaN(target.ry))target.ry = target.y = roundTo(y, snap.y);
            if(!isNaN(target.rh))target.rh = target.height = roundTo(posY - y + sizeY, snap.y);
            if(!isNaN(target.rx))target.inputs.x.value = target.x;
            if(!isNaN(target.ry))target.inputs.y.value = target.y;
            if(!isNaN(target.rw))target.inputs.width.value = target.width;
            if(!isNaN(target.rh))target.inputs.height.value = target.height;
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
      lastx=target.x;
      lasty=target.y;
      lastwidth=target.width;
      lastheight=target.height;
    };
    document.addEventListener("mousemove", u);
    document.addEventListener("mouseup", () => {
      lockCursor = false;
      document.removeEventListener("mousemove", u);
     (!playtesting)&&updateMap();
    });

  } else {
    if(selectedObject){
      if(selectedObject.properties){
        selectedObject.properties.element.remove()
        delete selectedObject.properties.inputs;
        delete selectedObject.properties.element;
      };
      selectedObject.element.remove();
      delete selectedObject.element;
      delete selectedObject.inputs;
      selectedObject.spawner&&selectedObject.spawner.map(e=>{delete e.element;delete e.inputs});
    }
    selectedObject = null;
  }
});

/** 
 * @param {MouseEvent} e 
 * @returns {Zone | Asset}
 */
function targetedObject(e) {
  if(playtesting)return;
  let objects = getObjects(/*type*/);
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = /*selectedObject||*/objects[i];
    const [{ x: x0, y: y0, width: x1, height: y1 }] = points(obj);
    const mouse = { x: e.pageX, y: e.pageY };
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
  if (lockCursor||playtesting) return(canvas.style.cursor="default");
  for (let type of types) {
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
let updateMouseEntity=true;
canvas.addEventListener("contextmenu", e => {
  if (e.target === contextmenu) return;
  e.preventDefault();

  contextmenu.style.left = e.x + 1 + "px";
  contextmenu.style.top = e.y + 1 + "px";
  var eng="Active,Safe,Exit,Teleport,Victory,Removal,Dummy,Wall,Light_region,Flashlight_spawner,Torch,Gate".split(",");
  var рус="Актив,Сафе,Эксит,Телепорт,Викторэ,Ремовал,Думми,Валл,Лигхт_регион,Флашлигхт_cпавнер,Торч,Гате".split(",");
  if (selectedObject) show(contextBtns.objectActions);
  else hide(contextBtns.objectActions);
  if (selectedObject) contextBtns.deleteObject.innerHTML = `${window.русский?"Делете Селектед Объект":"Delete Selected Object"}<br>(${window.русский?рус[eng.indexOf(capitalise(selectedObject.type))]:capitalise(selectedObject.type)})`;
  if (map.areas.length === 1) hide(contextBtns.deleteArea);
  else show(contextBtns.deleteArea);

  show(contextmenu);updateMouseEntity=false;
});
snapX.addEventListener("input",(e)=>{
  e.target.value=Math.floor(Math.min(Math.max(Number(e.target.value),1),32));
  localStorage.snapX=e.target.value;
})
realTime.addEventListener("input",(e)=>{
  localStorage.realTime=e.target.checked;
})
dosandbox.addEventListener("input",(e)=>{
  localStorage.dosandbox=e.target.checked;
})
enemyOutline.addEventListener("input",(e)=>{
  localStorage.enemyOutline=e.target.checked;
})
tileMode.addEventListener("input",(e)=>{
  localStorage.tileMode=e.target.selectedIndex;
})
snapY.addEventListener("input",(e)=>{
  e.target.value=Math.floor(Math.min(Math.max(Number(e.target.value),1),32));
  localStorage.snapY=e.target.value;
})
document.addEventListener("click", e => {
  if (e.target === contextmenu || e.target.parentNode === contextmenu && e.button === 2) return;
  if (e.target === canvas && e.button === 2) return;
  hide(contextmenu);
  updateMouseEntity=true;
});
var hitbox = true;
reset.addEventListener("click",e=>{
  (1==confirm("Are you sure because it will erase the current region?"))&&loadFile(`name: No Name
areas:
  - x: var x
    y: var y
    zones:
      - type: safe
        x: 0
        y: 0
        width: 160
        height: 160
`,false,false);
})
Object.defineProperty(global,"consumed_by_ink_demon",{
	get(){
		if(!prec.ended && prec.paused && useractive.hasBeenActive && new Date().getMonth()==3 && (new Date().getDate()<7||new Date().getDate()==14)){
			global.a=1;
			prec.play();
			setTimeout(()=>{
			cons.play();
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
			cons.play();
			document.body.requestFullscreen();
			},2e3);
			return true;
		}
		return false;
	}
});
document.addEventListener("keydown", e => {
  var camera = { x: camX, y: camY }
  if (e.target instanceof HTMLInputElement) return;
  if (e.which === controls.PLAYTEST){
	if(consumed_by_ink_demon)return;
    playtesting=!playtesting;
    tl.hidden=playtesting;
    menu.hidden=playtesting;
    realTime.disabled=playtesting;
    realTime.disabled?(realTime.checked=true):(realTime.checked=eval(localStorage.realTime));
    playtesting?(window.tempCamPos={x:camX,y:camY,area:current_Area}):(camX=window.tempCamPos.x,camY=window.tempCamPos.y);
  };
if(playtesting){
  if (e.which === controls.TOGGLE_HERO_INFO) toggleHeroCard = !toggleHeroCard;
  localStorage.heroCard=toggleHeroCard;
  if (e.which === controls.TOGGLE_LEADERBOARD) toggleLeaderboard = !toggleLeaderboard;
  localStorage.leaderboard=toggleLeaderboard;
  if (e.which === controls.TOGGLE_AREA_INFO&&location.search=="?isDev") toggleAreaInfo = !toggleAreaInfo;
  localStorage.areaInfo=toggleAreaInfo;
  if (e.which === controls.TOGGLE_CHAT) toggleChat = !toggleChat;
  localStorage.chat=toggleChat;
  if (e.which === controls.TOGGLE_MAP[0]||e.which === controls.TOGGLE_MAP[1]) toggleMap = !toggleMap,e.preventDefault();
  localStorage.map=toggleMap;
  if (e.which === controls.TOGGLE_MINIMAP_MODE) toggleMinimapMode = !toggleMinimapMode;
  localStorage.minimapMode=toggleMinimapMode;
}
  if(playtesting)return;
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
    var bound=map.areas[current_Area].BoundingBox;
    camX = bound.width / 2+bound.left;
    camY = bound.height / 2+bound.top;
    spawnEntities();
    if(selectedObject&&ind!=current_Area){
      if(selectedObject.properties){
        selectedObject.properties.element.remove()
        delete selectedObject.properties.inputs;
        delete selectedObject.properties.element;
      };
      selectedObject.element.remove();
      delete selectedObject.element;
      delete selectedObject.inputs;
      selectedObject=null;
      hide(objectActions);
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
    var bound=map.areas[current_Area].BoundingBox;
    camX = bound.width / 2+bound.left;
    camY = bound.height / 2+bound.top;
    spawnEntities();
    if(selectedObject&&ind!=current_Area){
      if(selectedObject.properties){
        selectedObject.properties.element.remove()
        delete selectedObject.properties.inputs;
        delete selectedObject.properties.element;
      };
      selectedObject.element.remove();
      delete selectedObject.element;
      delete selectedObject.inputs;
      selectedObject=null;
      hide(objectActions);
    };
  }
  if (e.which === controls.DELETE_ZONE) {deleteObject();spawnEntities();}
});
resizemenu.addEventListener("mousedown", () => {
  resizing = true;
});
document.addEventListener("mouseup", () => {
  resizing = false;
});
document.addEventListener("mousemove", e => {
  if (resizing) {
    menu.style.width = Math.max(window.innerWidth - e.pageX - 15, 200) + "px";
  }
});
document.addEventListener("DOMContentLoaded",e=>{
	loadData();
})
togglemenu.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
downloadBtn.addEventListener("click", () => {
  download(map.name || "map");
});
importInput.addEventListener("input", () => {
  if (importInput.files.length) importInput.files[0].text()
    .then(value => loadFile(value))
    .catch(e => {
		customAlert(e,1/0,"#FF0000");
		console.error("OH SHIT!!\n",e)
	});
});

window.addEventListener("beforeunload", e => {
  e.preventDefault();
  return e.returnValue = "Have you saved your map?";
});
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
  setTimeout(()=>{
    socket=new WebSocket('wss://grass-thoracic-share.glitch.me/');
	socket.binaryType="arraybuffer";
    socket.addEventListener("close",socketclosed);
    socket.addEventListener("message",socketreceive);
  },3e3);
}
function socketreceive(e){
  console.log("websocket has received a message.");
  var message=msgpack.decode(new Uint8Array(e.data));
  if(message.chatmsg){
    var chatmsg=document.createElement("div");
    chatmsg.setAttribute("class","chat-message")
    chatmsg.innerHTML="<b>"+message.id+"</b>: "+message.chatmsg;
    document.getElementById("chat-window").appendChild(chatmsg);
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight - document.getElementById("chat-window").clientHeight;
    if(document.getElementById("chat-window").childNodes.length>100){
		document.getElementById("chat-window").childNodes[0].remove()
    }
  }
}
socket.addEventListener("close",socketclosed);
socket.addEventListener("message",socketreceive);
/** 
 * @param {Properties} obj
*/
function createPropertyObj(obj={},t="region") {
  delete obj.inputs,delete obj.element;
  var arrayCheck=Object.keys(obj);
  var arr="background_color,friction,texture,lighting,snow,minimum_speed,max_level,death_timer,warping_disabled,crumble_reduced,radioactive_gloop_reduced,wind_ghosts_do_not_push_while_downed,magnetism,partial_magnetism,pellet_count,pellet_multiplier,applies_lantern,sticky_coat_distort_reduced,allow_solo_with_group,all_enemies_immune".split(",");
if(t=="region"){
arr="background_color,friction,texture,lighting,snow,minimum_speed,max_level,death_timer,warping_disabled,crumble_reduced,radioactive_gloop_reduced,wind_ghosts_do_not_push_while_downed,magnetism,partial_magnetism,pellet_count,pellet_multiplier,applies_lantern,sticky_coat_distort_reduced,allow_solo_with_group,all_enemies_immune,charge_reduced".split(",");
}
if(t=="zone"){
arr="background_color,friction,texture,minimum_speed".split(",");
}
  for(var i in obj){
    if(arr.indexOf(i)==-1&&defaultValues.properties[i]!=obj[i]){
      //customAlert(`ERROR: Property name "${i}" not found.`,1/0,"#F00");
      customAlert(`[Warning]: ${i} is not allowed in ${t} properties.`,10,"#FF9933");
    }else if(arr.indexOf(i)==-1&&t!="zone"){
      customAlert(`[Unknown property]: ${i} is not assigned to default property. The modified value is ${JSON.stringify(obj[i])}.`,1/0,"#FF3333");
      delete obj[i];
    };
  };
  /*
background_color = 0  #[0,0,0,0]
friction = 1
texture = payloads.server.NORMAL_TEXTURE  #normal
lighting = 1.0
snow = 0
minimum_speed = None
max_level = 100
death_timer = None
warping_disabled = False
crumble_reduced = False
radioactive_gloop_reduced = False
wind_ghosts_do_not_push_while_downed = False
magnetism = False
partial_magnetism = False
pellet_count = 25
pellet_multiplier = 1
applies_lantern = False
sticky_coat_distort_reduced = False
allow_solo_with_group = False
all_enemies_immune = False
charge_reduced = False
*/
  const properties = {...obj};
  properties.background_color&&(properties.background_color=[...properties.background_color].map(e=>Math.ceil(e)));
  function RGBToHex(a) {
    var r = `${"0".repeat(2 - a[0].toString(16).length)}${a[0].toString(16)}`,
      g = `${"0".repeat(2 - a[1].toString(16).length)}${a[1].toString(16)}`,
      b = `${"0".repeat(2 - a[2].toString(16).length)}${a[2].toString(16)}`;
    return `#${r}${g}${b}`
  }
  const _partial_magnetism = document.createElement("input");
  _partial_magnetism.addEventListener("input", () => {
    properties.partial_magnetism = _partial_magnetism.checked;
  });
  const _magnetism = document.createElement("input");
  _magnetism.addEventListener("input", () => {
    properties.magnetism = _magnetism.checked;
  });
  /*const _radioactive_gloop_reduced = document.createElement("input");
  _radioactive_gloop_reduced.addEventListener("input", () => {
    properties.radioactive_gloop_reduced = _radioactive_gloop_reduced.checked;
  });*/
  const _wind_ghosts_do_not_push_while_downed = document.createElement("input");
  _wind_ghosts_do_not_push_while_downed.addEventListener("input", () => {
    properties.wind_ghosts_do_not_push_while_downed = _wind_ghosts_do_not_push_while_downed.checked;
  });
  const _sticky_coat_distort_reduced = document.createElement("input");
  _sticky_coat_distort_reduced.addEventListener("input", () => {
    properties.sticky_coat_distort_reduced = _sticky_coat_distort_reduced.checked;
  });
  const _warping_disabled = document.createElement("input");
  _warping_disabled.addEventListener("input", () => {
    properties.warping_disabled = _warping_disabled.checked;
  });
  const _crumble_reduced = document.createElement("input");
  _crumble_reduced.addEventListener("input", () => {
    properties.crumble_reduced = _crumble_reduced.checked;
  });
  const _applies_lantern = document.createElement("input");
  _applies_lantern.addEventListener("input", () => {
    properties.applies_lantern = _applies_lantern.checked;
  });
  const _all_enemies_immune = document.createElement("input");
  _applies_lantern.addEventListener("input", () => {
    properties.all_enemies_immune = _all_enemies_immune.checked;
  });
  /*const _allow_solo_with_group = document.createElement("input");
  _allow_solo_with_group.addEventListener("input", () => {
    properties.allow_solo_with_group = _allow_solo_with_group.checked;
  });*/
  const _charge_reduced = document.createElement("input");
  _charge_reduced.addEventListener("input", () => {
    properties.charge_reduced = _charge_reduced.checked;
  });
  //TIEM TO GET THIM OVERHALLED
  const _lighting = document.createElement("input");
  _lighting.value = Math.max(Math.min(properties.lighting??defaultValues.properties.lighting,1),0).toFixed(2);
  _lighting.step = 0.01;
  _lighting.addEventListener("input", () => {
  _lighting.value = Math.max(Math.min(_lighting.value,1),0).toFixed(2);
    properties.lighting = Number(_lighting.value);
  });
  const _snow = document.createElement("input");
  _snow.value = Math.max(Math.min(properties.snow??defaultValues.properties.snow,1),0).toFixed(2);
  _snow.step = 0.01;
  _snow.addEventListener("input", () => {
    _snow.value = Math.max(Math.min(_snow.value,1),0).toFixed(2);
    properties.snow = Number(_snow.value);
  });
  const _max_level = document.createElement("input");
  _max_level.value = properties.max_level??defaultValues.properties.max_level;
  _max_level.step = 1;
  _max_level.addEventListener("input", () => {
    _max_level.value = Number(_max_level.value);
    properties.max_level = Number(_max_level.value);
  });
  const _minimum_speed = document.createElement("input");
  _minimum_speed.value = properties.minimum_speed ?? defaultValues.properties.minimum_speed;
  _minimum_speed.addEventListener("input", () => {
    if (_minimum_speed.value == "") {
      properties.minimum_speed = undefined;
      return;
    };
    properties.minimum_speed = Number(_minimum_speed.value);
  });
  const _death_timer = document.createElement("input");
  _death_timer.title = "in milliseconds";
  _death_timer.value = properties.death_timer ?? defaultValues.properties.death_timer;
  _death_timer.addEventListener("input", () => {
    if (_death_timer.value == "") {
      properties.death_timer = undefined;
      return;
    };
    properties.death_timer = Number(_death_timer.value);
  });

  const _pellet_count = document.createElement("input");
  _pellet_count.value = properties.pellet_count ?? defaultValues.properties.pellet_count;
  _pellet_count.min = 0;
  _pellet_count.step = 1;
  _pellet_count.addEventListener("input", () => {
    _pellet_count.value = Number(_pellet_count.value);
    properties.pellet_count = Number(_pellet_count.value);
    spawnEntities()
  });

  const _pellet_multiplier = document.createElement("input");
  _pellet_multiplier.value = properties.pellet_multiplier ?? defaultValues.properties.pellet_multiplier;
  _pellet_multiplier.addEventListener("input", () => {
    _pellet_multiplier.value = Number(_pellet_multiplier.value);
    properties.pellet_multiplier = Number(_pellet_multiplier.value);
  });

  const _friction = document.createElement("input");
  _friction.value = properties.friction ?? defaultValues.properties.friction;
  _friction.step = 0.01;
  _friction.addEventListener("input", () => {
    properties.friction = Number(_friction.value);
  });

  const colorInput = document.createElement("input");
  const opacityInput = document.createElement("input");
var col=properties.background_color ?? defaultValues.properties.background_color;
  colorInput.value = arrtoHex(col);
  colorInput.addEventListener("input", () => {
	properties.background_color??=[...defaultValues.properties.background_color];
    properties.background_color[0] = hexToArr(colorInput.value)[0];
    properties.background_color[1] = hexToArr(colorInput.value)[1];
    properties.background_color[2] = hexToArr(colorInput.value)[2];
  });

  opacityInput.value = col[3];
  opacityInput.addEventListener("input", () => {
    opacityInput.value = Math.max(Math.min(Number(opacityInput.value), 255), 0);
	properties.background_color??=[...defaultValues.properties.background_color];
    properties.background_color[3] = Number(opacityInput.value);
  });
if(t=="region"){
  properties.element = createFolder(formatString(curLang,"editor.property.properties"), [
    createFolder(formatString(curLang,"editor.property.background_color"), [
      createProperty(formatString(curLang,"editor.property.background_color.color"), colorInput, "color"),
      createProperty(formatString(curLang,"editor.property.background_color.alpha"), opacityInput, "number"),
    ]),
    createProperty(formatString(curLang,"editor.property.friction"), _friction, "number"),
    createProperty(formatString(curLang,"editor.property.texture"), null, "select", {
      value: properties.texture ?? defaultValues.properties.texture, event: (e) => { properties.texture = e },
      selectOptions: ["normal","leaves","wooden","baguette"].map(e=>[formatString(curLang,"editor.texture."+e),e]),
      selectType: "text"
    }),
    createProperty(formatString(curLang,"editor.property.lighting"), _lighting, "number"),
    createProperty(formatString(curLang,"editor.property.snow"), _snow, "number"),
    createProperty(formatString(curLang,"editor.property.minimum_speed"), _minimum_speed, "number"),
    createProperty(formatString(curLang,"editor.property.max_level"), _max_level, "number"),
    createProperty(formatString(curLang,"editor.property.death_timer"), _death_timer, "number"),
    createProperty(formatString(curLang,"editor.property.applies_lantern"), _applies_lantern, "switch", { value: properties.applies_lantern ?? defaultValues.properties.applies_lantern }),
    createProperty(formatString(curLang,"editor.property.all_enemies_immune"), _all_enemies_immune, "switch", { value: properties.all_enemies_immune ?? defaultValues.properties.all_enemies_immune }),
    createProperty(formatString(curLang,"editor.property.warping_disabled"), _warping_disabled, "switch", { value: properties.warping_disabled ?? defaultValues.properties.warping_disabled }),
    //createProperty(formatString(curLang,"editor.property.allow_solo_with_group"), _allow_solo_with_group, "switch", { value: properties.allow_solo_with_group ?? defaultValues.properties.allow_solo_with_group }),
    createProperty(formatString(curLang,"editor.property.crumble_reduced"), _crumble_reduced, "switch", { value: properties.crumble_reduced ?? defaultValues.properties.crumble_reduced }),
    //createProperty(formatString(curLang,"editor.property.radioactive_gloop_reduced"), _radioactive_gloop_reduced, "switch", { value: properties.radioactive_gloop_reduced ?? defaultValues.properties.radioactive_gloop_reduced }),
    createProperty(formatString(curLang,"editor.property.sticky_coat_distort_reduced"), _sticky_coat_distort_reduced, "switch", { value: properties.sticky_coat_distort_reduced ?? defaultValues.properties.sticky_coat_distort_reduced }),
    createProperty(formatString(curLang,"editor.property.wind_ghosts_do_not_push_while_downed"), _wind_ghosts_do_not_push_while_downed, "switch", { value: properties.wind_ghosts_do_not_push_while_downed ?? defaultValues.properties.wind_ghosts_do_not_push_while_downed }),
    createProperty(formatString(curLang,"editor.property.magnetism"), _magnetism, "switch", { value: properties.magnetism ?? defaultValues.properties.magnetism }),
    createProperty(formatString(curLang,"editor.property.partial_magnetism"), _partial_magnetism, "switch", { value: properties.partial_magnetism ?? defaultValues.properties.partial_magnetism }),
    createProperty(formatString(curLang,"editor.property.charge_reduced"), _charge_reduced, "switch", { value: properties.charge_reduced ?? defaultValues.properties.charge_reduced }),
    createProperty(formatString(curLang,"editor.property.pellet_count"), _pellet_count, "number"),
    createProperty(formatString(curLang,"editor.property.pellet_multiplier"), _pellet_multiplier, "number")
  ]);
};
if(t=="zone"){
  properties.element = createFolder(formatString(curLang,"editor.property.properties"), [
    createFolder(formatString(curLang,"editor.property.background_color"), [
      createProperty(formatString(curLang,"editor.property.background_color.color"), colorInput, "color"),
      createProperty(formatString(curLang,"editor.property.background_color.alpha"), opacityInput, "number"),
    ]),
    createProperty(formatString(curLang,"editor.property.friction"), _friction, "number"),
    createProperty(formatString(curLang,"editor.property.texture"), null, "select", {
      value: properties.texture ?? defaultValues.properties.texture, event: (e) => { properties.texture = e },
      selectOptions: ["normal","leaves","wooden","baguette"].map(e=>[formatString(curLang,"editor.texture."+e),e]),
      selectType: "text"
    }),
    createProperty(formatString(curLang,"editor.property.minimum_speed"), _minimum_speed, "number"),
  ]);
};
  properties.element.classList.add("closed");
if(t=="region"){
  properties.inputs = {
    color: colorInput, 
    opacity: opacityInput, 
    friction: _friction, 
    lighting: _lighting, 
    snow: _snow, 
    minimum_speed: _minimum_speed,
    max_level: _max_level,
    death_timer: _death_timer,
    warping_disabled: _warping_disabled,
    applies_lantern:_applies_lantern,
    crumble_reduced: _crumble_reduced,
    //radioactive_gloop_reduced: _radioactive_gloop_reduced,
    wind_ghosts_do_not_push_while_downed: _wind_ghosts_do_not_push_while_downed,
    sticky_coat_distort_reduced:_sticky_coat_distort_reduced,
    //allow_solo_with_group:_allow_solo_with_group,
    magnetism: _magnetism,
    partial_magnetism: _partial_magnetism,
    charge_reduced:_charge_reduced,
    pellet_count: _pellet_count,
    pellet_multiplier: _pellet_multiplier
  };
}
  return properties;
}
// Setup Evades Region Editor
{
  const nameInput = createInput(map.name, () => { map.name = nameInput.value })
  map.element = createFolder(formatString(curLang,"editor.region"), [
    createProperty(formatString(curLang,"editor.property.name"), nameInput, "text"),
    (map.properties=createPropertyObj()).element,
  ]);
  map.element.classList.add("closed");
  menu.insertBefore(map.element, areamenu);
  map.inputs = {name:nameInput};
}

contextBtns.zone.addEventListener("click", e => addZone("active"));
contextBtns.wallAsset.addEventListener("click", e => addAsset("wall"));
contextBtns.lightRegion.addEventListener("click", e => addAsset("light_region"));
contextBtns.flashlightSpawner.addEventListener("click", e => addAsset("flashlight_spawner"));
contextBtns.torch.addEventListener("click", e => addAsset("torch"));
contextBtns.gate.addEventListener("click", e => addAsset("gate"));
contextBtns.duplicateArea.addEventListener("click", () => {
  var area=map.areas[current_Area];
  var newArea = createArea(area.name,area.rx,area.ry,area.properties);
  for(var zone of area.zones){
    newArea.zones.push(createZone(zone.rx, zone.ry, zone.rw, zone.rh, zone.translate.x, zone.translate.y, zone.properties, zone.type, zone.requirements, zone.spawner.map(e => cloneSpawner(e))))
  }
  for(var asset of area.assets){
    newArea.assets.push(createAsset(asset.x, asset.y, asset.width, asset.height, asset.type, asset.upside_down, asset.texture))
  }
  map.areas.push(newArea);
  updateMap();
});
contextBtns.duplicateObject.addEventListener("click", () => {
  var sel;
  if (!selectedObject) return;
    if(selectedObject.properties){
      selectedObject.properties.element.remove()
      delete selectedObject.properties.inputs;
      delete selectedObject.properties.element;
    };
    selectedObject.element.remove();
    delete selectedObject.element;
    delete selectedObject.inputs;
    selectedObject.spawner&&selectedObject.spawner.map(e=>{delete e.element;delete e.inputs});
  if (["wall", "light_region", "flashlight_spawner", "torch", "gate"].indexOf(selectedObject.type) == -1) {
    sel = createZone(selectedObject.rx, selectedObject.ry, selectedObject.rw, selectedObject.rh, selectedObject.translate.x, selectedObject.translate.y, selectedObject.properties, selectedObject.type, selectedObject.requirements, selectedObject.spawner.map(e => cloneSpawner(e)));
    map.areas[current_Area].zones.push(sel);
    selectedObject=sel;
    customZONEgui(sel);
    objectmenu.appendChild(selectedObject.element);
  } else {
    sel = createAsset(selectedObject.x, selectedObject.y, selectedObject.width, selectedObject.height, selectedObject.type, selectedObject.upside_down, selectedObject.texture);
    map.areas[current_Area].assets.push(sel);
    selectedObject=sel;
    selectedObject.createGUI(sel);
    objectmenu.appendChild(selectedObject.element);
  }
  updateMap();
});
contextBtns.area.addEventListener("click", () => addArea());
function deleteObject() {
  if (selectedObject) {
    let arr = map.areas[current_Area].zones;
    if (arr.includes(selectedObject)) {
      arr.splice(arr.indexOf(selectedObject), 1);
      selectedObject.element.remove();
      selectedObject = null;
    }
    let arr2 = map.areas[current_Area].assets;
    if (arr2.includes(selectedObject)) {
      arr2.splice(arr2.indexOf(selectedObject), 1);
      selectedObject.element.remove();
      selectedObject = null;
    }
  }
  updateMap();
}
contextBtns.deleteObject.addEventListener("click", () => {
  deleteObject()
});
contextBtns.deleteArea.addEventListener("click", () => {
  let arr = map.areas;
  if (!confirm("are you sure to delete the current area?"))return;
  if (map.areas.includes(map.areas[current_Area])) {
    map.areas[current_Area].element.remove();
    map.areas[current_Area].properties.element.remove();
    delete map.areas[current_Area].element;
    delete map.areas[current_Area].inputs;
    delete map.areas[current_Area].properties.inputs;
    delete map.areas[current_Area].properties.element;
    map.areas.splice(map.areas.indexOf(map.areas[current_Area]), 1);
    current_Area = Math.max(current_Area - 1, 0);
    customAREAgui(map.areas[current_Area]);
    areamenu.appendChild(map.areas[current_Area].element);
    if(selectedObject){
      if(selectedObject.properties){
        selectedObject.properties.element.remove()
        delete selectedObject.properties.inputs;
        delete selectedObject.properties.element;
      };
      selectedObject.element.remove();
      delete selectedObject.element;
      delete selectedObject.inputs;
      selectedObject.spawner&&selectedObject.spawner.map(e=>{delete e.element;delete e.inputs});
    selectedObject = null;
    }
    updateMap();
  }
});
loadFile("\n  name: First Map\n  properties:\n    friction: 0.75\n    background_color:\n    - 81\n    - 102\n    - 124\n    - 75\n  areas:\n  # 1\n  - x: 0\n    y: 0\n    zones:\n    - type: safe\n      x: 0\n      y: 0\n      width: 320\n      height: 480\n      properties:\n        minimum_speed: 10\n    - type: active\n      x: last_right\n      y: 0\n      width: 2560\n      height: 480\n      spawner:\n      - types:\n        - normal\n        count: 15\n        radius: 12\n        speed: 5\n    - type: safe\n      x: last_right\n      y: 0\n      width: 256\n      height: last_height\n    - type: exit\n      x: last_right\n      y: 0\n      width: 64\n      height: last_height\n      translate:\n        x: 160\n        y: 0\n    assets: []\n  # 2\n  - x: last_right\n    y: 0\n    zones:\n    - type: exit\n      x: 0\n      y: 0\n      width: 64\n      height: 480\n      translate:\n        x: -160\n        y: 0\n    - type: safe\n      x: 64\n      y: 0\n      width: 256\n      height: 480\n    - type: active\n      x: last_right\n      y: 0\n      width: 2080\n      height: 480\n      spawner:\n      - types:\n        - slowing\n        - draining\n        count: 25\n        radius: 12\n        speed: 5\n    - type: safe\n      x: last_right\n      y: 0\n      width: 256\n      height: last_height\n    - type: exit\n      x: last_right\n      y: 0\n      width: 64\n      height: last_height\n      translate:\n        x: 160\n        y: 0\n    assets: []\n",false,false);
// Start rendering
(function run() {
  render();
  window.requestAnimationFrame(run);
})();








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
localStorage.getItem("snapX")&&(
  snapX.value=Math.floor(Number(localStorage.snapX))
);
localStorage.getItem("snapY")&&(
  snapY.value=Math.floor(Number(localStorage.snapY))
);
localStorage.getItem("realTime")&&(
  realTime.checked=localStorage.realTime=="true"
);
localStorage.getItem("enemyOutline")&&(
  enemyOutline.checked=localStorage.enemyOutline=="true"
);
localStorage.getItem("tileMode")&&(
  tileMode.selectedIndex=localStorage.tileMode
);
localStorage.getItem("dosandbox")&&(
  dosandbox.checked=localStorage.dosandbox=="true"
);
/**
        <p id="objectFocus" class="obj_area">
            <label for="AreaName">Name: <input id="AreaName" type="text"></label><br>
            <label for="posX">X: <input id="posX" step="1" style="width:50px" type="number"></label><br>
            <label for="posY">Y: <input id="posY" step="1" style="width:50px" type="number"></label>
        </p>*/
