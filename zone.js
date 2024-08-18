const useractive=navigator.userActivation;
const animate=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame})();
const settings={
	get snapX(){
		return Math.floor(Number(localStorage.snapX??16));
	},set snapX(e){
		localStorage.snapX=Math.floor(Math.min(Math.max(Number(e),1),32));
	},get snapY(){
		return Math.floor(Number(localStorage.snapY??16));
	},set snapY(e){
		localStorage.snapY=Math.floor(Math.min(Math.max(Number(e),1),32));
	},get realTime(){
		return localStorage.realTime=="true";
	},set realTime(e){
		localStorage.realTime=e;
	},get enemyOutlines(){
		return (localStorage.enemyOutlines??"true")=="true";
	},set enemyOutlines(e){
		localStorage.enemyOutlines=e;
	},get confetti(){
		return localStorage.confetti=="true";
	},set confetti(e){
		localStorage.confetti=e;
	},get tileMode(){
		return parseInt(localStorage.tileMode??"0")
	},set tileMode(e){
		localStorage.tileMode=e;
	},get displayEnergyBars(){
		return parseInt(localStorage.displayEnergyBars??"0")
	},set displayEnergyBars(e){
		localStorage.displayEnergyBars=e;
	},get legacy30FPS(){
		return (localStorage.legacy30FPS??"true")=="true";
	},set legacy30FPS(e){
		localStorage.legacy30FPS=e;
	},get toggleMouseMovement(){
		return (localStorage.toggleMouseMovement??"true")=="true";
	},set toggleMouseMovement(e){
		localStorage.toggleMouseMovement=e;
	},get hat(){
		return Number(localStorage.hat??0);
	},set hat(e){
		localStorage.hat=e;
	},get gem(){
		return Number(localStorage.gem??0);
	},set gem(e){
		localStorage.gem=e;
	},get body(){
		return Number(localStorage.body??0);
	},set body(e){
		localStorage.body=e;
	},get enableMouseMovement(){
		return localStorage.enableMouseMovement=="true";
	},set enableMouseMovement(e){
		localStorage.enableMouseMovement=e;
	},get legacySpeedUnits(){
		return (localStorage.legacySpeedUnits??"true")=="true";
	},set legacySpeedUnits(e){
		localStorage.legacySpeedUnits=e;
	},get fadingEffects(){
		return (localStorage.fadingEffects??"true")=="true";
	},set fadingEffects(e){
		localStorage.fadingEffects=e;
	},get pelletTransparency(){
		return Number(localStorage.pelletTransparency??"0");
	},set pelletTransparency(e){
		localStorage.pelletTransparency=Math.min(Math.max(Number(e),0),1);
	},get joystickDeadzone(){
		return parseFloat(localStorage.joystickDeadzone??0.05);
	},set joystickDeadzone(e){
		localStorage.joystickDeadzone=Math.min(Math.max(Number(e),0),1);
	},get displayTimer(){
		return localStorage.displayTimer=="true";
	},set displayTimer(e){
		localStorage.displayTimer=e;
	}
};

(()=>{for(var i in this){
  if(i.toLowerCase().includes("inner")||i.toLowerCase().includes("set")||i.toLowerCase().startsWith("on")||i=="fetch"||i=="alert"||i=="confirm"||i=="prompt"||i=="localStorage"||i=="performance")continue;
  delete this[i];
}})();

const assetsLoaded={count:0};
const loadImage = function(src){
  if(typeof src!="string")return;
  if(src.endsWith(".mp4")){
    let vid=document.createElement("video");
    vid.src=src;
    vid.onerror = () => {
      console.log("Unable to load video",src);
    }
    vid.oncanplaythrough = () => {
      assetsLoaded.count++;
	  vid.oncanplaythrough=null;
    }
    return vid;
  }
  if(src.endsWith(".mp3")||src.endsWith(".ogg")){
    let aud=new Audio();
    aud.src=src;
    aud.onerror = () => {
      console.log("Unable to load audio",src);
    }
    aud.oncanplaythrough = () => {
      assetsLoaded.count++;
	  aud.oncanplaythrough=null;
    }
    return aud;
  }
  let image = new Image();
  image.src = src;
  image.onerror = () => {
    console.log("ERROR AT", image.src);
  }
  image.onload = () => {
    assetsLoaded.count++;
	image.onload=null;
  }
  return image;
}
isActive=true;
localStorage.activatedExtensions??="";
const activated_extensions=localStorage.activatedExtensions.split(",");
if(activated_extensions.indexOf("")!=-1)activated_extensions.splice(activated_extensions.indexOf(""),1)
activated_extensions.map(e=>{
	document.getElementById(e).checked=true;
})
var usingPifary=activated_extensions.indexOf("pifary-dev")!=-1;
var usingPncl9500=activated_extensions.indexOf("pncl9500")!=-1;
var usingAutomationTools=activated_extensions.indexOf("automationTools")!=-1;
//usingVanillaEnemySet should be set to false when a custom enemy type (from a sandbox, not in evades.io) is added.
//causes the addon enemy properties folder to show up (even if there are no properties in the folder, but its probably fine)
var usingVanillaEnemySet = !(usingPifary || usingPncl9500);
if(!usingVanillaEnemySet)localStorage.clear(),reloadPage();
window.addEventListener("blur",function () {
  isActive = false;
})
window.addEventListener("focus",function () {
  isActive = true;
})
function Base64_To_Ascii(str) {
  return str.replace(/=/g, "").split("").map(e => {
    var char = 0;
    if (e.charCodeAt(0) > 64 && e.charCodeAt(0) < 96) char = e.charCodeAt(0) - 65;
    if (e.charCodeAt(0) > 96) char = e.charCodeAt(0) - 71;
    if (e.charCodeAt(0) < 64) char = e.charCodeAt(0) + 4;
    if ("+" == e) char = 62;
    if ("/" == e) char = 63;
    char = char.toString(2);
    return `${"0".repeat(6 - char.length)}${char}`
  }).join("").match(/(........)/g).map(e => { return String.fromCharCode(parseInt(e, 2)) }).join("")
}
function AsciiToBase64(str){
    var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("");
    var t = str.split("").map(e=>e.charCodeAt());
    var res=[];
    if(t.filter(e=>(e>255)).length)throw"Unicode character is outside of Latin range (0 - FF)";
    for(var i=0;i<t.length;i+=3){
        res.push(t[i]>>2&0b111111);
        res.push((t[i]<<4&0b110000)+(t[i+1]>>4&0b1111));
        (t[i+1]!=void 0)&&res.push((t[i+1]<<2&0b111100)+(t[i+2]>>6&0b11));
        (t[i+2]!=void 0)&&res.push(t[i+2]&0b111111);
    }
	res=res.map(e=>map[e]);
	while(res.length%4!=0)res.push("=");
    return res.join("");
}
function createSPAWNERgui(point1,Zone){
	delete point1.element;
	const isLegacy=settings.legacySpeedUnits,
		list=['angle','barrier_radius','blocking_radius','circle_size','cone_angle','count','direction','disabling_radius','draining_radius','enlarging_radius','experience_drain_radius','freezing_radius','gravity','gravity_radius','growth_multiplier','hard_mode','horizontal','ignore_invulnerability','immune','lava_radius','magnetic_nullification_radius','magnetic_reduction_radius','move_clockwise','pattern','pause_duration','pause_interval','player_detection_radius','powered','projectile_duration','projectile_radius','projectile_speed','push_direction','quicksand_radius','quicksand_strength','radar_radius','radius','reducing_radius','regen_loss','release_interval','release_time','repelling_radius','repulsion','reverse','shot_acceleration','shot_interval','slippery_radius','slowing_radius','spawn_top','speed','speed_loss','toxic_radius','turn_acceleration','turn_speed','types','x','y','switch_interval','switch_time','switched_harmless','slow','drain','home_range','increment','recharge'];
	function prop(self,x){
		return self[x]??defaultValues.spawner[x];
	}
	for(var i in point1){
		if(list.indexOf(i)==-1)customAlert("Unknown spawner property: "+i,10,"#FFF");
		//if(legacyProperties.indexOf(i)!=-1)point1[i]*=30*Math.pow(-1,isLegacy);
	}
	function CreateInput(value,step,type="number",inputEvent,input){
		return(input=document.createElement("input"),type=="checkbox")?(input.checked=value??false):(input.value=value??"",input.step=step??1),input.addEventListener("input",inputEvent),input;
	}
	const	countInput=CreateInput(prop(point1,"count"),null,null,_=>{
		point1.count=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura1Input = CreateInput(prop(point1,"slowing_radius"),null,null,_=>{
		point1.slowing_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura2Input = CreateInput(prop(point1,"draining_radius"),null,null,_=>{
		point1.draining_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura3Input = CreateInput(prop(point1,"freezing_radius"),null,null,_=>{
		point1.freezing_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura4Input = CreateInput(prop(point1,"slippery_radius"),null,null,_=>{
		point1.slippery_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura5Input = CreateInput(prop(point1,"enlarging_radius"),null,null,_=>{
		point1.enlarging_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura6Input = CreateInput(prop(point1,"gravity_radius"),null,null,_=>{
		point1.gravity_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura7Input = CreateInput(prop(point1,"repelling_radius"),null,null,_=>{
		point1.repelling_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura8Input = CreateInput(prop(point1,"lava_radius"),null,null,_=>{
		point1.lava_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura9Input = CreateInput(prop(point1,"magnetic_reduction_radius"),null,null,_=>{
		point1.magnetic_reduction_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura10Input = CreateInput(prop(point1,"magnetic_nullification_radius"),null,null,_=>{
		point1.magnetic_nullification_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura11Input = CreateInput(prop(point1,"disabling_radius"),null,null,_=>{
		point1.disabling_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura12Input = CreateInput(prop(point1,"toxic_radius"),null,null,_=>{
		point1.toxic_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura13Input = CreateInput(prop(point1,"radar_radius"),null,null,_=>{
		point1.radar_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura14Input = CreateInput(prop(point1,"barrier_radius"),null,null,_=>{
		point1.barrier_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura15Input = CreateInput(prop(point1,"quicksand_radius"),null,null,_=>{
		point1.quicksand_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura16Input = CreateInput(prop(point1,"experience_drain_radius"),null,null,_=>{
		point1.experience_drain_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura17Input = CreateInput(prop(point1,"reducing_radius"),null,null,_=>{
		point1.reducing_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	aura18Input = CreateInput(prop(point1,"blocking_radius"),null,null,_=>{
		point1.blocking_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	xInput = CreateInput(prop(point1,"x"),null,null,_=>{
		if(!_.target.value)point1.x=void 0;
		else if(_.target.value.split(",").length==1)_.target.value=point1.x=Number(_.target.value);
		else if(_.target.value.split(",").map(e=>parseInt(e)).map(e=>parseInt(e)).filter(e=>!isNaN(e)).length==2)point1.x=_.target.value;
		spawnEntities();
	}),	yInput = CreateInput(prop(point1,"y"),null,null,_=>{
		if(!_.target.value)point1.y=void 0;
		else if(_.target.value.split(",").length==1)_.target.value=point1.y=Number(_.target.value);
		else if(_.target.value.split(",").map(e=>parseInt(e)).map(e=>parseInt(e)).filter(e=>!isNaN(e)).length==2)point1.x=_.target.value;
		spawnEntities();
	}),	tsInput = CreateInput(prop(point1,"turn_speed")/30**isLegacy,1/(100*30**isLegacy),null,_=>{
		point1.turn_speed=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	taInput = CreateInput(prop(point1,"turn_acceleration")/30**isLegacy,1/(100*30**isLegacy),null,_=>{
		point1.turn_acceleration=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	siInput = CreateInput(prop(point1,"shot_interval"),null,null,_=>{
		point1.shot_interval=Number(_.target.value);
		spawnEntities();
	}),	saInput = CreateInput(prop(point1,"shot_acceleration")/30**isLegacy,1/(100*30**isLegacy),null,_=>{
		point1.shot_acceleration=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	piInput = CreateInput(prop(point1,"pause_interval"),null,null,_=>{
		point1.pause_interval=Number(_.target.value);
		spawnEntities();
	}),	pdInput = CreateInput(prop(point1,"pause_duration"),null,null,_=>{
		point1.pause_duration=Number(_.target.value);
		spawnEntities();
	}),	angleInput = CreateInput(prop(point1,"angle"),null,null,_=>{
		if(!_.target.value)point1.angle=void 0;
		else point1.angle=_.target.value=Number(_.target.value)%360;
		spawnEntities();
	}),	pushDirInput = CreateInput(prop(point1,"push_direction"),null,null,_=>{
		if(!_.target.value)point1.push_direction=void 0;
		else point1.push_direction=_.target.value=Number(_.target.value)%360;
		spawnEntities();
	}),	coneAngleInput = CreateInput(prop(point1,"cone_angle"),null,null,_=>{
		if(!_.target.value)point1.cone_angle=void 0;
		else point1.cone_angle=_.target.value=Number(_.target.value)%360;
		spawnEntities();
	}),	powInput = CreateInput(prop(point1,"powered"),null,"checkbox",_=>{
		point1.powered=_.target.checked;
		spawnEntities();
	}),	ignInput = CreateInput(prop(point1,"ignore_invulnerability"),null,"checkbox",_=>{
		point1.ignore_invulnerability=_.target.checked;
		spawnEntities();
	}),	hardInput = CreateInput(prop(point1,"hard_mode"),null,"checkbox",_=>{
		point1.hard_mode=_.target.checked;
		spawnEntities();
	}),	spTopInput = CreateInput(prop(point1,"spawn_top"),null,"checkbox",_=>{
		point1.spawn_top=_.target.checked;
		spawnEntities();
	}),	reversInput = CreateInput(prop(point1,"reverse"),null,"checkbox",_=>{
		point1.reverse=_.target.checked;
		spawnEntities();
	}),	speedInput = CreateInput((!isNaN(prop(point1,"speed"))&&prop(point1,"speed"))/30**isLegacy,1/(10*30**isLegacy),null,_=>{
		point1.speed=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	radiusInput = CreateInput(prop(point1,"radius"),null,null,_=>{
		/* From Pifary-dev: Server will crash if radius will not be specified (got confirmation from evades devs) */
		point1.radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	projDurInput = CreateInput(prop(point1,"projectile_duration"),null,null,_=>{
		point1.projectile_duration=Number(_.target.value);
		spawnEntities();
	}),	projSpdInput = CreateInput(prop(point1,"projectile_speed")==void 0?void 0:prop(point1,"projectile_speed")/30**isLegacy,1/(10*30**isLegacy),null,_=>{
		if(!_.target.value)point1.projectile_speed=void 0;
		else point1.projectile_speed=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	projRadInput = CreateInput(prop(point1,"projectile_radius"),null,null,_=>{
		if(!_.target.value)point1.projectile_radius=void 0;
		else point1.projectile_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	groInput = CreateInput(prop(point1,"growth_multiplier"),1/100,null,_=>{
		point1.growth_multiplier=_.target.value=clamp(_.target.value,0,1);
		spawnEntities();
	}),	hInput = CreateInput(prop(point1,"horizontal"),null,"checkbox",_=>{
		point1.horizontal=_.target.checked;
		spawnEntities();
	}),	drainInput = CreateInput(prop(point1,"drain"),null,null,_=>{
		point1.drain=_.target.value=Number(_.target.value);
		spawnEntities();
	}),	slowInput = CreateInput(prop(point1,"slow"),1/100,null,_=>{
		point1.slow=_.target.value=Number(_.target.value);
		spawnEntities();
	}),	ckwsInput = CreateInput(prop(point1,"move_clockwise"),null,"checkbox",_=>{
		point1.move_clockwise=_.target.checked;
		spawnEntities();
	}),	immInput = CreateInput(prop(point1,"immune"),null,"checkbox",_=>{
		point1.immune=_.target.checked;
		spawnEntities();
	}),	splsInput = CreateInput(prop(point1,"speed_loss")/30**isLegacy,1/(100*30**isLegacy),null,_=>{
		point1.speed_loss=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	incInput = CreateInput(prop(point1,"increment")/30**isLegacy,1/(100*30**isLegacy),null,_=>{
		point1.increment=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	rglsInput = CreateInput(prop(point1,"regen_loss"),1/100,null,_=>{
		point1.regen_loss=_.target.value=Number(_.target.value);
		spawnEntities();
	}),	pdrInput = CreateInput(prop(point1,"player_detection_radius"),null,null,_=>{
		point1.player_detection_radius=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	gravInput = CreateInput(prop(point1,"gravity")/30**isLegacy,1/(1*30**isLegacy),null,_=>{
		point1.gravity=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	repelInput = CreateInput(prop(point1,"repulsion")/30**isLegacy,1/(1*30**isLegacy),null,_=>{
		point1.repulsion=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	dirInput = CreateInput(prop(point1,"direction"),null,null,_=>{
		point1.direction=_.target.value=clamp(_.target.value,-1,1);
		spawnEntities();
	}),	switchtimeInput = CreateInput(prop(point1,"switch_time"),null,null,_=>{
		if(!_.target.value)point1.switch_time=void 0;
		else point1.switch_time=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	switchintInput = CreateInput(prop(point1,"switch_interval"),null,null,_=>{
		point1.switch_interval=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	hrInput = CreateInput(prop(point1,"home_range"),null,null,_=>{
		point1.home_range=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	reinInput = CreateInput(prop(point1,"release_interval"),null,null,_=>{
		point1.release_interval=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	csInput = CreateInput(prop(point1,"circle_size"),null,null,_=>{
		point1.circle_size=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	quicksandStrengthInput = CreateInput(prop(point1,"quicksand_strength")/30**isLegacy,1/(10*30**isLegacy),null,_=>{
		point1.quicksand_strength=(_.target.value=Number(_.target.value))*30**isLegacy;
		spawnEntities();
	}),	retiInput = CreateInput(prop(point1,"release_time"),null,null,_=>{
		if(!_.target.value)point1.release_time=void 0;
		else point1.release_time=_.target.value=Math.max(_.target.value,0);
		spawnEntities();
	}),	point2El = createFolder(formatString(curLang,"editor.property.types"), point1.types.map(e=>(customTypeGUI(e,point1),e.element))),
		addBtn = document.createElement("button"),
		centerXbtn = document.createElement("button"),
		centerYbtn = document.createElement("button");
	centerXbtn.classList.add("centerX");
	centerYbtn.classList.add("centerY");
	point2El.classList.add("array");
	addBtn.classList.add("add");
	addBtn.addEventListener("click",_=>{
		const point3 = createpoint2(void 0,point1);
		point1.types.push(point3);
		customTypeGUI(point3,point1);
		point2El.children[1].appendChild(point3.element);
		point2El.classList.remove("min");
		spawnEntities();
	}),	centerXbtn.addEventListener("click",_=>{
		xInput.value=point1.x=Zone.x+Zone.width/2;
		spawnEntities();
	}),	centerYbtn.addEventListener("click",_=>{
		yInput.value=point1.y=Zone.y+Zone.height/2;
		spawnEntities();
	});
	point2El.appendChild(addBtn);
	if(usingAutomationTools)point2El.appendChild(centerXbtn),point2El.appendChild(centerYbtn);
	if(point1.types.length<2)point2El.classList.add("min");
	li = createFolder(formatString(curLang,"editor.spawner"), [
  		point2El, //Types
		createProperty(formatString(curLang,"editor.property.count"), countInput, "number"),
		createProperty(formatString(curLang,"editor.property.speed"), speedInput, "number"),
		createProperty(formatString(curLang,"editor.property.radius"), radiusInput, "number"),
		createProperty(formatString(curLang,"editor.property.x"), xInput, "text"),
		createProperty(formatString(curLang,"editor.property.y"), yInput, "text"),
		createProperty(formatString(curLang,"editor.property.angle"), angleInput, "number"),
		createFolder(formatString(curLang,"editor.category.aura"),[
			createProperty(formatString(curLang,"editor.property.freezing_radius"), aura3Input, "number"),
			createProperty(formatString(curLang,"editor.property.slippery_radius"), aura4Input, "number"),
			createProperty(formatString(curLang,"editor.property.enlarging_radius"), aura5Input, "number"),
			createProperty(formatString(curLang,"editor.property.lava_radius"), aura8Input, "number"),
			createProperty(formatString(curLang,"editor.property.magnetic_reduction_radius"), aura9Input, "number"),
			createProperty(formatString(curLang,"editor.property.magnetic_nullification_radius"), aura10Input, "number"),
			createProperty(formatString(curLang,"editor.property.disabling_radius"), aura11Input, "number"),
			createProperty(formatString(curLang,"editor.property.toxic_radius"), aura12Input, "number"),
			createProperty(formatString(curLang,"editor.property.radar_radius"), aura13Input, "number"),
			createProperty(formatString(curLang,"editor.property.barrier_radius"), aura14Input, "number"),
			createProperty(formatString(curLang,"editor.property.experience_drain_radius"), aura16Input, "number"),
			createProperty(formatString(curLang,"editor.property.reducing_radius"), aura17Input, "number"),
			createProperty(formatString(curLang,"editor.property.blocking_radius"), aura18Input, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.cybot"), [
			createProperty(formatString(curLang,"editor.property.hard_mode"), hardInput, "switch"),
		],!0),	createFolder(formatString(curLang,"editor.category.flower"), [
			createProperty(formatString(curLang,"editor.property.growth_multiplier"), groInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.frost_giant"), [
			createProperty(formatString(curLang,"editor.property.direction"), dirInput, "number"),
			createProperty(formatString(curLang,"editor.property.shot_acceleration"), saInput, "number"),
			createProperty(formatString(curLang,"editor.property.shot_interval"), siInput, "number"),
			createProperty(formatString(curLang,"editor.property.turn_speed"), tsInput, "number"),
			createProperty(formatString(curLang,"editor.property.turn_acceleration"), taInput, "number"),
			createProperty(formatString(curLang,"editor.property.pause_interval"), piInput, "number"),
			createProperty(formatString(curLang,"editor.property.pause_duration"), pdInput, "number"),
			createProperty(formatString(curLang,"editor.property.projectile_duration"), projDurInput, "number"),
			createProperty(formatString(curLang,"editor.property.projectile_speed"), projSpdInput, "number"),
			createProperty(formatString(curLang,"editor.property.projectile_radius"), projRadInput, "number"),
			createProperty(formatString(curLang,"editor.property.immune"), immInput, "switch"),
			createProperty(formatString(curLang,"editor.property.pattern"), null, "select", {value:point1.pattern ?? defaultValues.spawner.pattern,event:e=>{point1.pattern=e;spawnEntities()},selectOptions:[[formatString(curLang,"editor.pattern.none"),void 0],...['spiral', 'twinspiral', 'quadspiral', 'cone', 'twincone', 'cone_edges', 'twin', 'singlebig'].map(e=>[formatString(curLang,"editor.pattern."+e),e])],selectType: "text"}),
			createProperty(formatString(curLang,"editor.property.cone_angle"), coneAngleInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.draining"), [
			createProperty(formatString(curLang,"editor.property.draining_radius"), aura2Input, "number"),
			createProperty(formatString(curLang,"editor.property.drain"), drainInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.grass"), [
			createProperty(formatString(curLang,"editor.property.powered"), powInput, "switch"),
		],!0),	createFolder(formatString(curLang,"editor.category.gravity"), [
			createProperty(formatString(curLang,"editor.property.gravity_radius"), aura6Input, "number"),
			createProperty(formatString(curLang,"editor.property.gravity"), gravInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.homing"), [
			createProperty(formatString(curLang,"editor.property.home_range"), hrInput, "number"),
			createProperty(formatString(curLang,"editor.property.increment"), incInput, "number"),
			createProperty(formatString(curLang,"editor.property.reverse"), reversInput, "switch"),
		],!0),	createFolder(formatString(curLang,"editor.category.icicle"),[
			createProperty(formatString(curLang,"editor.property.horizontal"), hInput, "switch"),
		],!0),	createFolder(formatString(curLang,"editor.category.liquid"),[
			createProperty(formatString(curLang,"editor.property.player_detection_radius"), pdrInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.quicksand"), [
			createProperty(formatString(curLang,"editor.property.quicksand_radius"), aura15Input, "number"),
			createProperty(formatString(curLang,"editor.property.quicksand_strength"), quicksandStrengthInput, "number"),
			createProperty(formatString(curLang,"editor.property.push_direction"), pushDirInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.radiating_bullets"),[
			createProperty(formatString(curLang,"editor.property.release_interval"), reinInput, "number"),
			createProperty(formatString(curLang,"editor.property.release_time"), retiInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.regen_sniper"),[
			createProperty(formatString(curLang,"editor.property.regen_loss"), rglsInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.repelling"), [
			createProperty(formatString(curLang,"editor.property.repelling_radius"), aura7Input, "number"),
			createProperty(formatString(curLang,"editor.property.repulsion"), repelInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.slowing"), [
			createProperty(formatString(curLang,"editor.property.slowing_radius"), aura1Input, "number"),
			createProperty(formatString(curLang,"editor.property.slow"), slowInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.speed_sniper"),[
			createProperty(formatString(curLang,"editor.property.speed_loss"), splsInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.switch"), [
			createProperty(formatString(curLang,"editor.property.switched_harmless"), null, "select", {value:point1.switched_harmless ?? defaultValues.properties.switched_harmless,event:e=>{point1.switched_harmless=e;spawnEntities()},selectOptions:[[formatString(curLang,"editor.boolean.none"),void 0],...[true, false].map(e=>[formatString(curLang,"editor.boolean."+e),e])],selectType: "switch"}),
			createProperty(formatString(curLang,"editor.property.switch_interval"), switchintInput, "number"),
			createProperty(formatString(curLang,"editor.property.switch_time"), switchtimeInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.turning"),[
			createProperty(formatString(curLang,"editor.property.circle_size"), csInput, "number"),
		],!0),	createFolder(formatString(curLang,"editor.category.wall"),[
			createProperty(formatString(curLang,"editor.property.spawn_top"), spTopInput, "switch"),
			createProperty(formatString(curLang,"editor.property.move_clockwise"), ckwsInput, "switch"),
		],!0),	createFolder(formatString(curLang,"editor.category.wind_ghost"), [
			createProperty(formatString(curLang,"editor.property.ignore_invulnerability"), ignInput, "switch"),
		],!0),
	],!0);
	var foldersInjectedByAddon = [];
	//if pifary were to have an enemy with a custom (non aura radius) property, similar code to the code below would be put here.
	for (var i = 0; i < foldersInjectedByAddon.length; i++){
		li.lastElementChild.appendChild(foldersInjectedByAddon[i]);
	}
	li.children[0].classList.add("counter");
	const remove = document.createElement("button"),
		clone = document.createElement("button");
	li.children[0].appendChild(remove);
	li.children[0].appendChild(clone);
	remove.classList.add("remove");
	clone.classList.add("clone");
	remove.addEventListener("click", e => {
		Zone.spawner[Zone.spawner.indexOf(point1)].element.remove();
		Zone.spawner.splice(Zone.spawner.indexOf(point1), 1);
		spawnEntities();
		e.stopPropagation();
	});
	clone.addEventListener("click",e=>{
		const spawner=createPoint(cloneSpawner(Zone.spawner[Zone.spawner.indexOf(point1)]));
		Zone.spawner.push(spawner);
		createSPAWNERgui(spawner,Zone);
		Zone.spawner[0].element.parentElement.parentElement.children[1].appendChild(spawner.element);
		spawnEntities()
		e.stopPropagation();
	});
	point1.element=li;
}
function customZONEgui(Zone){
	const spawnerEl = createFolder(formatString(curLang,"editor.property.spawner"), Zone.spawner.map(e=>(createSPAWNERgui(e,Zone),e.element)));
	if (Zone.spawner.length < 1) spawnerEl.classList.add("min");
	const addBtn2 = document.createElement("button");
	spawnerEl.classList.add("array");
	addBtn2.classList.add("add");
	addBtn2.addEventListener("click",()=>{
		let point2 = createPoint({types:["normal"],radius:18,speed:150});
		Zone.spawner.push(point2);
		createSPAWNERgui(point2,Zone);
		if(Zone.spawner[0].element.parentElement){
			Zone.spawner[0].element.parentElement.parentElement.children[1].appendChild(point2.element);
			Zone.spawner[0].element.parentElement.parentElement.classList.remove("min");
		}else{
			spawnerEl.children[1].appendChild(point2.element);
			spawnerEl.classList.remove("min");
		}
		spawnEntities()
	});
	spawnerEl.appendChild(addBtn2);
	var requie=[];
	const reqEl = createFolder(formatString(curLang,"editor.property.requirements"), Zone.requirements.map(p => {
		const e = createReq(p.requirement??p,Zone);
		return requie.push(e),e.element;
	}));
	Zone.requirements=requie;
	const addBtn = document.createElement("button");
	reqEl.classList.add("array");
	addBtn.classList.add("add");
	addBtn.addEventListener("click", () => {
		let point2 = createReq(void 0,Zone);
		Zone.requirements.push(point2);
		reqEl.children[1].appendChild(point2.element);
		reqEl.classList.remove("min");
	});
	reqEl.appendChild(addBtn);
	if (Zone.requirements.length < 1) reqEl.classList.add("min");

	const xInput = document.createElement("input");
	xInput.value = Zone.rx;
	xInput.addEventListener("input", () => {
		Zone.rx = xInput.value;
		if(!isNaN(Number(xInput.value))){
			Zone.rx=Zone.x=Number(xInput.value);
		}
		updateMap();
	});
	//消費した。
	const yInput = document.createElement("input");
	yInput.value = Zone.ry;
	yInput.addEventListener("input", () => {
		Zone.ry = yInput.value;
		if(!isNaN(Number(yInput.value))){
			Zone.ry=Zone.y=Number(yInput.value);
		}
		updateMap();
	});
	const wInput = document.createElement("input");
	wInput.value = Zone.rw;
	wInput.addEventListener("input", () => {
		Zone.rw = wInput.value;
		if(!isNaN(Number(wInput.value))){
			Zone.width=Zone.rw=wInput.value = Number(wInput.value);
		}
		updateMap();
	});
	const hInput = document.createElement("input");
	hInput.value = Zone.rh;
	hInput.addEventListener("input", () => {
		Zone.rh = hInput.value;
		if(!isNaN(Number(hInput.value))){
			Zone.height=Zone.rh=hInput.value = Number(hInput.value);
		}
		updateMap();
	});
	const txInput = document.createElement("input");
	txInput.value = Zone.translate.x;
	txInput.addEventListener("input", () => {
		Zone.translate.x = Number(txInput.value);
	});

	const tyInput = document.createElement("input");
	tyInput.value = Zone.translate.y;
	tyInput.addEventListener("input", () => {
		Zone.translate.y = Number(tyInput.value);
	});
	const translation=createFolder("Translate", [
		createProperty(formatString(curLang,"editor.property.x"), txInput, "number"),
		createProperty(formatString(curLang,"editor.property.y"), tyInput, "number")
	]);
	(Zone.type=="active"?show:hide)(spawnerEl);
	(Zone.type=="teleport"?show:hide)(reqEl);
	(Zone.type=="teleport"||Zone.type=="exit"?show:hide)(translation);
	var props=createPropertyObj(Zone.properties,"zone");
	Zone.properties=props;
	Zone.element = createFolder(formatString(curLang,"editor.zone"),[
		createProperty(formatString(curLang,"editor.property.type"),null,"select",{
			value: Zone.type,
			event: e=>{
				(e=="teleport"?show:hide)(reqEl);
				(e=="active"?show:hide)(spawnerEl);
				(e=="exit"||e=="teleport"?show:hide)(translation);
				Zone.type = e;
				spawnEntities();
			},
			selectOptions: ['active', 'safe', 'exit', 'teleport', 'victory', 'removal', 'dummy'].map(e=>[formatString(curLang,"editor.zone."+e),e]),
			selectType: "text"
			}),
		createProperty(formatString(curLang,"editor.property.x"), xInput, "text"),
		createProperty(formatString(curLang,"editor.property.y"), yInput, "text"),
		createProperty(formatString(curLang,"editor.property.width"), wInput, "text"),
		createProperty(formatString(curLang,"editor.property.height"), hInput, "text"),
		reqEl,
		spawnerEl,
		translation,
		Zone.properties.element,
	]);
    Zone.inputs={
        x:xInput,
        y:yInput,
        tx:txInput,
        ty:tyInput,
        width:wInput,
        height:hInput
    };
}
function cloneSpawner(e){
	const extras=["pattern_id"],obj={};
	obj.x = e.x;
	obj.y = e.y;
	obj.radius = e.radius;
	obj.angle = e.angle;
	obj.speed = e.speed;
	obj.count = e.count;
	extras.map(t=>[void 0!=e[t]&&(obj[t]=e[t])]);
	obj.types = e.types.map(t => { return t.i });
	obj.types.includes("slowing") && (
		obj.slowing_radius = e.slowing_radius,
		obj.slow = e.slow
	);
	obj.types.includes("draining") && (
		obj.draining_radius = e.draining_radius,
		obj.drain = e.drain
	);
	obj.types.includes("experience_drain") && (obj.experience_drain_radius = e.experience_drain_radius);
	obj.types.includes("liquid") && (obj.player_detection_radius = e.player_detection_radius);
	obj.types.includes("turning") && (obj.circle_size = e.circle_size);
	obj.types.includes("slippery") && (obj.slippery_radius = e.slippery_radius);
	obj.types.includes("gravity") && (
		obj.gravity_radius = e.gravity_radius,
		obj.gravity = e.gravity
	);
	obj.types.includes("repelling") && (
		obj.repelling_radius = e.repelling_radius,
		obj.repulsion = e.repulsion
	);
	obj.types.includes("magnetic_reduction") && (obj.magnetic_reduction_radius = e.magnetic_reduction_radius);
	obj.types.includes("magnetic_nullification") && (obj.magnetic_nullification_radius = e.magnetic_nullification_radius);
	obj.types.includes("toxic") && (obj.toxic_radius = e.toxic_radius);
	obj.types.includes("enlarging") && (obj.enlarging_radius = e.enlarging_radius);
	obj.types.includes("radar") && (obj.radar_radius = e.radar_radius);
	obj.types.includes("quicksand") && (
		obj.quicksand_radius = e.quicksand_radius,
		obj.push_direction = e.push_direction
	);
	obj.types.includes("sniper") && (obj.recharge = e.recharge);
	obj.types.includes("blocking") && (obj.blocking_radius = e.blocking_radius);
	obj.types.includes("freezing") && (obj.freezing_radius = e.freezing_radius);
	obj.types.includes("reducing") && (obj.reducing_radius = e.reducing_radius);
	obj.types.includes("disabling") && (obj.disabling_radius = e.disabling_radius);
	obj.types.includes("lava") && (obj.lava_radius = e.lava_radius);
	obj.types.includes("barrier") && (obj.barrier_radius = e.barrier_radius);
	obj.types.includes("icicle") && (obj.horizontal = e.horizontal);
	obj.types.includes("wall") && (
		obj.move_clockwise = e.move_clockwise,
		obj.spawn_top = e.spawn_top
	);
	obj.types.includes("grass") && (obj.powered = e.powered);
	obj.types.includes("flower") && (obj.growth_multiplier = e.growth_multiplier);
	obj.types.includes("wind_ghost") && (obj.ignore_invulnerability = e.ignore_invulnerability);
	obj.types.includes("switch") && (
		obj.switch_interval = e.switch_interval,
		obj.switch_time = e.switch_time
	);
	obj.types.includes("homing") && (
		obj.reverse = e.reverse,
		obj.home_range = e.home_range,
		obj.increment = e.increment
	);
	obj.types.includes("cybot") && (obj.hard_mode = e.hard_mode);
	obj.types.includes("frost_giant") && (
		obj.shot_acceleration = e.shot_acceleration,
		obj.shot_interval = e.shot_interval,
		obj.turn_acceleration = e.turn_acceleration,
		obj.turn_speed = e.turn_speed,
		obj.immune = e.immune,
		obj.pattern = e.pattern,
		
		obj.direction = e.direction,
		obj.cone_angle = e.cone_angle,
		obj.pause_duration = e.pause_duration,
		obj.pause_interval = e.pause_interval,
		obj.projectile_duration = e.projectile_duration,
		obj.projectile_radius = e.projectile_radius,
		obj.projectile_speed = e.projectile_speed
	);
	obj.types.includes("radiating_bullets") && (
		obj.release_time = e.release_time,
		obj.release_interval = e.release_interval
	);
	return obj;
}
function newZone(e) {
    const Zone = e;
	Zone.rx=Zone.x;
	Zone.rw=Zone.width;
	Zone.ry=Zone.y;
	Zone.rh=Zone.height;
	var spawner=Zone.spawner;
	var requirements=Zone.requirements;
	var properties=Zone.properties;
	var translate=Zone.translate;
	if(properties)Zone.properties={...defaultValues.properties,...properties};
	Zone.properties??={};
	if(!translate){
		Zone.translate={x:0,y:0};
	}
	if(spawner){
		Zone.spawner=spawner.map(p=>createPoint(p));
	}
	Zone.spawner??=[];
	if(requirements){
		Zone.requirements=requirements.map(p=>createReq(p,Zone));
	}
	Zone.requirements??=[];
    return e;
}

  //REQUIREMENTS
  function createReq(requirement="",Zone){
    const point1={requirement,regionName:"First Map",areaIndex:0};
	var e=requirement.split(":");
	if(e[0]=="exact_index"){
		console.log(requirement,"exact_index:".length,(e[e.length-1].length+1),requirement.slice("exact_index:".length,(e[e.length-1].length+1)).replaceAll("\\:",":"));
		point1.regionName=requirement.slice("exact_index:".length,-(e[e.length-1].length+1)).replaceAll("\\:",":");
		point1.areaIndex=parseInt(e[e.length-1]);
	}
	const txInput = document.createElement("input");
	txInput.value = point1.regionName;
	txInput.addEventListener("input", () => {
		point1.regionName = txInput.value;
		point1.requirement = `exact_index:${point1.regionName.replaceAll(":","\\:")}:${point1.areaIndex}`;
	});
	txInput.disabled=e[0]!=="exact_index";
	const tyInput = document.createElement("input");
	tyInput.value = point1.areaIndex;
	tyInput.addEventListener("input", () => {
		point1.areaIndex = Number(tyInput.value);
		point1.requirement = `exact_index:${point1.regionName.replaceAll(":","\\:")}:${point1.areaIndex}`;
	});
	tyInput.disabled=e[0]!=="exact_index";
	li = createFolder("",[
		createProperty(formatString(curLang,"editor.requirement"), null, "select", {
			value: e[0],
			event: e=>{
				txInput.disabled=e!="exact_index";
				tyInput.disabled=e!="exact_index";
				if(e=="exact_index")point1.requirement = `${e}:${point1.regionName.replaceAll(":","\\:")}:${point1.areaIndex}`;
				else point1.requirement=e;
			},
			selectOptions: [[formatString(curLang,"editor.requirement.none"),""],...['inaccessible', 'cybot_castle_defeated', 'ten_hard_variants', 'mystery_keycard', 'icbot_not_defeated', 'cybot_hard_mode_not_defeated', 'cybot_hard_mode_defeated', 'elbot_not_defeated', 'plbot_not_defeated', 'mebot_not_defeated', 'libot_not_defeated', 'dabot_not_defeated', 'icbot_defeated', 'elbot_defeated', 'plbot_defeated', 'mebot_defeated', 'libot_defeated', 'dabot_defeated', 'research_lab_discovered', 'all_heroes_unlocked', 'aibot_not_defeated', 'cybot_not_defeated', 'cybot_defeated', 'wabot_not_defeated', 'eabot_not_defeated', 'fibot_not_defeated', 'aibot_defeated', 'wabot_defeated', 'eabot_defeated', 'fibot_defeated', 'coupled_corridors_found', 'dusty_depths_found', 'mansion_discovered', 'exact_index'].sort().map(e=>[formatString(curLang,"editor.requirement."+e),e])],
			selectType: "text"
		}),
		createProperty(formatString(curLang,"editor.requirement.exact_region_name"), txInput, "text"),
		createProperty(formatString(curLang,"editor.requirement.exact_area_index"), tyInput, "number"),
		
	]);
    li.children[0].classList.add("counter");
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.addEventListener("click", e => {
      if (Zone.requirements.length > 0) {
        Zone.requirements[Zone.requirements.indexOf(point1)].element.remove();
        Zone.requirements.splice(Zone.requirements.indexOf(point1), 1);
      } else if (Zone.requirements.length) {
        Zone.requirements[Zone.requirements.indexOf(point1)].element.remove();
        Zone.requirements.splice(Zone.requirements.indexOf(point1), 1);
        reqEl.classList.add("min");
      }
      e.stopPropagation();
    });
    li.children[0].appendChild(remove);
    point1.element = li;
    return point1;
  };
//SPAWNER

    function createPoint(obj) {
        const point1 = {
            types:[],
        }
		for(var i in obj){
			if(i == "types" || obj[i] == undefined || defaultValues.spawner[i] == obj[i])continue;
			point1[i]=obj[i];
		}
		if(typeof obj.types == "string")obj.types=[obj.types];
		obj.types.map(p => {
			const pointe = createpoint2(p,point1);
			point1.types.push(pointe);
			return pointe.element;
		});
    return point1;
  }
//ENEMY TYPES
function createpoint2(types="normal",point1){
  var point2={i:types}
          return point2
}

function customTypeGUI(point2,point1){
var enemyList="wall,normal,homing,dasher,slowing,draining,repelling,gravity,turning,sizing,sniper,freezing,teleporting,wavy,zigzag,zoning,spiral,oscillating,switch,liquid,icicle,slippery,ice_sniper,disabling,experience_drain,enlarging,speed_sniper,regen_sniper,radiating_bullets,immune,pumpkin,tree,frost_giant,snowman,corrosive,toxic,corrosive_sniper,poison_sniper,magnetic_reduction,magnetic_nullification,positive_magnetic_sniper,negative_magnetic_sniper,residue,fire_trail,ice_ghost,poison_ghost,positive_magnetic_ghost,negative_magnetic_ghost,wind_ghost,lunging,lava,gravity_ghost,repelling_ghost,star,grass,seedling,flower,disabling_ghost,glowy,firefly,mist,phantom,cybot,eabot,wabot,fibot,aibot,wind_sniper,sand,sandrock,quicksand,crumbling,radar,barrier,speed_ghost,regen_ghost,cactus,cycling,icbot,elbot,plbot,mebot,libot,dabot,sparking,thunderbolt,static,electrical,prediction_sniper,ring_sniper,lead_sniper,charging,reducing,stalactite,blocking,force_sniper_a,force_sniper_b,wavy_switch,zigzag_switch,dorito,zoning_switch,spiral_switch,oscillating_switch,homing_switch,wacky_wall,confectioner,confectioner_switch,dorito_switch,penny,penny_switch,infinity,infinity_switch,dasher_switch,flaming,stumbling,disarming,lurching,infectious,mutating,vengeful_soul,lost_soul,fake_pumpkin".split(",")
            .map(e=>[formatString(curLang,"editor.enemy."+e),e]);
  if(usingPifary)
    enemyList.push(...["burning","sticky_sniper","web","cobweb","defender"].map(e=>[formatString(curLang,"pifary-dev.enemy."+e),e]));
  if(usingPncl9500)
    enemyList.push(...["slooming","particulate","water_trail","nightshade","riptide","cloud","rain","storm","airburst","param_test","rotor","radioactive_sniper","sap_sniper","vine","disc","swamp","drowning","pull_sniper","puffing","bubble"].map(e=>[formatString(curLang,"pncl9500.enemy."+e),e]));
  var li = createProperty("",null, "select", {
    value:point2.i,
    event: e => {point2.i = e;spawnEntities();console.log(e)},
    selectOptions: enemyList.sort(),selectType: "text"
  });
        li.children[0].classList.add("counter");
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.addEventListener("click", e => {
            if (point1.types.length > 2) {
                point1.types.splice(point1.types.indexOf(point2), 1);
li.remove()
            } else if (point1.types.length) {
                point1.types.splice(point1.types.indexOf(point2), 1);
li.remove()
                point1.types[0].element.parentElement.parentElement.classList.add("min");
            }
          spawnEntities();
            e.stopPropagation();
        });
        li.children[0].appendChild(remove);
          point2.element=li;
}