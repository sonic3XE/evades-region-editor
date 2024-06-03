var selfId=null;
var evadesRenderer={
	snowRenderer: new SnowRenderer,
	dynamicLighting: new DynamicLighting(1),
	directionalIndicatorHud: new DirectionalIndicatorHud,
	experienceBar: new ExperienceBar,
	heroInfoCard: new HeroInfoCard,
	bottomText: new BottomText,
	titleText: new TitleText,
	map: new EvadesMap,
	minimap: new Minimap,
	areaInfo: new AreaInfo,
};
let Frate=[];
var mouseEntities=[];
const defaultHighestAreaAchieved={"Central Core":0,"Central Core Hard":0,"Catastrophic Core":0,"Vicious Valley":0,"Vicious Valley Hard":0,"Elite Expanse":0,"Elite Expanse Hard":0,"Wacky Wonderland":0,"Glacial Gorge":0,"Glacial Gorge Hard":0,"Dangerous District":0,"Dangerous District Hard":0,"Peculiar Pyramid":0,"Peculiar Pyramid Hard":0,"Monumental Migration":0,"Monumental Migration Hard":0,"Humongous Hollow":0,"Humongous Hollow Hard":0,"Haunted Halls":0,"Frozen Fjord":0,"Frozen Fjord Hard":0,"Transforming Turbidity":0,"Quiet Quarry":0,"Quiet Quarry Hard":0,"Ominous Occult":0,"Ominous Occult Hard":0,"Restless Ridge":0,"Restless Ridge Hard":0,"Toxic Territory":0,"Toxic Territory Hard":0,"Magnetic Monopole":0,"Magnetic Monopole Hard":0,"Assorted Alcove":0,"Assorted Alcove Hard":0,"Burning Bunker":0,"Burning Bunker Hard":0,"Grand Garden":0,"Grand Garden Hard":0,"Endless Echo":0,"Endless Echo Hard":0,"Mysterious Mansion":0,"Coupled Corridors":0,"Cyber Castle":0,"Cyber Castle Hard":0,"Research Lab":0,"Shifting Sands":0,"Infinite Inferno":0,"Dusty Depths":0,"Withering Wasteland":0,"Stellar Square":0};
var lastTime=0,ti=0
function arrow(e, a, t, r, c, o=2, n=15, $="#cc000088", _="#FF0000") {
	if(a==r&&t==c)return;
    const d = Math.atan2(c - t, r - a);
    const dist = Math.sqrt((c - t)**2+(r - a)**2);
    var preserved=e.lineWidth;
    e.beginPath(),
    e.moveTo(a+o/4*Math.sin(d), t-o/4*Math.cos(d)),
    e.lineTo(a-o/4*Math.sin(d), t+o/4*Math.cos(d)),
    e.lineTo(r-o/4*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d), c+o/4*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),
    e.lineTo(r-o/2*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d), c+o/2*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),
    e.lineTo(r, c),
    e.lineTo(r+o/2*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d), c-o/2*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),
    e.lineTo(r+o/4*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d), c-o/4*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),
    e.lineTo(a+o/4*Math.sin(d), t-o/4*Math.cos(d)),
    e.strokeStyle = $,
    e.lineWidth = n,
    e.fillStyle = _,
    e.fill(),
    e.stroke(),
    e.closePath(),
    e.lineWidth = preserved
}
function createOffscreenCanvas(t, e) {
  var o = document.createElement("canvas");
  return o.width = t,
    o.height = e,
    o
}
let canvasEntityLayer = createOffscreenCanvas(window.innerWidth, window.innerHeight);
let canvasLighting = createOffscreenCanvas(window.innerWidth, window.innerHeight);
let playtesting=false;
function controlPlayer(id,input,delta){
	var player=map.players.filter(e=>e.id==id)[0];
	if(!player)return;
	player.controlActions(input,delta);
}
  function arrayToInt32(s){
    return s[0]<<24|s[1]<<16|s[2]<<8|s[3]<<0
  }
  var isFinish=false;
var errorFX=loadImage('https://s.jezevec10.com/res/se2/topout.mp3');
var VFX=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/mus_gameOver.ogg");
VFX.loop=1;
var le=0;
var toggleHeroCard=false;
localStorage.getItem("heroCard")&&(toggleHeroCard=eval(localStorage.getItem("heroCard")));
var toggleLeaderboard=false;
localStorage.getItem("leaderboard")&&(toggleLeaderboard=eval(localStorage.getItem("leaderboard")));
var toggleAreaInfo=false;
localStorage.getItem("areaInfo")&&(toggleAreaInfo=eval(localStorage.getItem("areaInfo")));
var toggleChat=false;
localStorage.getItem("chat")&&(toggleChat=eval(localStorage.getItem("chat")));
var toggleMap=false;
localStorage.getItem("map")&&(toggleMap=eval(localStorage.getItem("map")));
var toggleMinimapMode=false;
localStorage.getItem("minimapMode")&&(toggleMinimapMode=eval(localStorage.getItem("minimapMode")));
function render() {
  const delta=performance.now()-le;le=performance.now();
  var actually=delta*isActive;
	!isFinish&&(
$e7009c797811e935$export$2e2bcd8739ae039.start({}),
$e7009c797811e935$export$2e2bcd8739ae039.registerListeners(),isFinish=true);
  $e7009c797811e935$export$2e2bcd8739ae039.update(global);
  cons.currentTime||=1/1e6;
  snapX.value=settings.snapX;
  snapY.value=settings.snapY;
  [realTime,enemyOutlines,toggleMouseMovement,enableMouseMovement,confetti,isSandbox,displayTimer].map(e=>e.checked=settings[e.id]);
  tileMode.selectedIndex=settings.tileMode;
  closeSettings.style.top=tip.scrollTop+"px";
  joystickDeadzone.selectedIndex=Math.round(settings.joystickDeadzone*20);
  updateMouseEntity&&(
  mouseEntity.x=mousePos.x / camScale + camX,
  mouseEntity.y=mousePos.y / camScale + camY
  );
  for (var j = 0; j < Object.keys(zoneconsts).length; j++) {
    var k = Object.keys(zoneconsts)[j];
    for (var i = 0; i < Object.keys(zoneconsts[k]).length; i++) {
      var l = Object.keys(zoneconsts[k])[i];
      let ctx = zoneconsts[k][l].getContext("2d");
      if(tileMode.selectedIndex>>1){
        ctx.drawImage(tilesDark, (i > 3 ? (i == 6 ? 1 : Math.round((i - 2) / 2) * 2) : i) * 128, j * 128, j != 4 ? 128 : 512, j != 4 ? 128 : 512, 0, 0, j != 4 ? 128 : 512, j != 4 ? 128 : 512)
      }else{
        ctx.drawImage(tileMap, ((i > 3 ? (i == 6 ? 1 : Math.round((i - 2) / 2) * 2) : i) * 128)+2, j * 128, j != 4 ? 128 : 512, j != 4 ? 128 : 512, 0, 0, j != 4 ? 128 : 512, j != 4 ? 128 : 512)
      }
    }
  }
  canvas.width != window.innerWidth&&(
	canvas.width = window.innerWidth,
	canvasEntityLayer.width = canvas.width,
	canvasLighting.width = canvas.width
  );
  canvas.height != window.innerHeight&&(
	canvas.height = window.innerHeight,
	canvasEntityLayer.height = canvas.height,
	canvasLighting.height = canvas.height
  );
  var ctxL = canvasLighting.getContext("2d");
  var ctxE = canvasEntityLayer.getContext("2d");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineCap = playtesting?"butt":"round";
  ctx.imageSmoothingEnabled = false;
var selfPlayer=map.players.filter(e=>e.id==window.selfId)[0];
  let zoneColors =[{ active: "#FFFFFFFF", safe: "#C3C3C3FF", exit: "#FFF46CFF", teleport: "#6AD0DEFF", victory: "#FFF46CFF", removal: "#FFF9BAFF", dummy: "#C3C3C3FF" },
   {active: "#111111ff",safe:"#3c3c3cff",exit:"#948800ff",teleport:"#218795ff",victory:"#948800ff",removal:"#6b630ff",dummy:"#3c3c3cff"}];
  if(!playtesting){
    map.players.length&&(map.players=[],selfId*=0,current_Area=tempCamPos.area,spawnEntities(),!evadesRenderer.heroInfoCard.abilityThree.noState && (evadesRenderer.experienceBar.abilityThree=void 0,evadesRenderer.heroInfoCard.abilityThree=new $097def8f8d652b17$export$2e2bcd8739ae039));
    camX += camSpeed / camScale * (keysDown.has(controls.CAM_RIGHT) - keysDown.has(controls.CAM_LEFT));
    camY += camSpeed / camScale * (keysDown.has(controls.CAM_DOWN) - keysDown.has(controls.CAM_UP));
  }else{
  if(!selfPlayer&&!window.selfId){
	  var safezone=map.areas[0].zones.filter(e=>e.type=="safe")[0]??map.areas[0].zones[0];
var player=new SimulatedPlayer(safezone.x+16+(safezone.width-32)*Math.random(),safezone.y+16+(safezone.height-32)*Math.random(),1);
selfPlayer=player;window.selfId=player.id;
map.players.push(player)
	  evadesRenderer.heroInfoCard.abilityOne=new $097def8f8d652b17$export$2e2bcd8739ae039;
	  evadesRenderer.heroInfoCard.abilityTwo=new $097def8f8d652b17$export$2e2bcd8739ae039;
	  evadesRenderer.heroInfoCard.abilityThree=new $097def8f8d652b17$export$2e2bcd8739ae039;
	  evadesRenderer.heroInfoCard.abilityOne.afterStateUpdate(abilityConfig[player.abilityOne.abilityType]);
	  evadesRenderer.heroInfoCard.abilityTwo.afterStateUpdate(abilityConfig[player.abilityTwo.abilityType]);
	  player.abilityThree && (
		evadesRenderer.heroInfoCard.abilityThree.afterStateUpdate(abilityConfig[player.abilityThree.abilityType])
	  );
spawnEntities(player.area)
};
  
if(!selfPlayer&&window.selfId){playtesting=false;
menu.hidden=playtesting;selfId*=0;
camX=window.tempCamPos.x,camY=window.tempCamPos.y,current_Area=window.tempCamPos.area;
spawnEntities(current_Area)}else{
  camX=selfPlayer.x;
  camY=selfPlayer.y;
  selfPlayer.isLocalPlayer=true;
  current_Area=selfPlayer.area;
  camScale=Math.min(window.innerHeight/720,window.innerWidth/1280);
}
  }
  //1. Render Area
  const area=map.areas[current_Area];
  var prop=(e,t)=>(e.properties[t]??propDefault(t));
  var propDefault=(t)=>(defaultValues.properties[t]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = tileMode.selectedIndex>>1?"#050505FF":"#333333FF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var zone of map.areas[current_Area].zones) {
    var texture;
    if(prop(zone,"texture")!=propDefault("texture"))texture=prop(zone,"texture");
    else if(prop(area,"texture")!=propDefault("texture"))texture=prop(area,"texture");
    else texture=prop(map,"texture");
    var p = ctx.createPattern(zoneconsts[texture][zone.type], null)
    ctx.beginPath();
    ctx.translate(canvas.width / 2 - camX * camScale, canvas.height / 2 - camY * camScale);
    ctx.scale(camScale, camScale);
    ctx.fillStyle = ((tileMode.selectedIndex&1)&&texture=="normal")?zoneColors[tileMode.selectedIndex>>1][zone.type]:p;
    ctx.rect(
      zone.x,
      zone.y,
      zone.width,
      zone.height
    );
    ctx.fill();
    ctx.resetTransform();
    if (RGBAtoHex(prop(zone,"background_color"))!="#00000000") {
      ctx.fillStyle = RGBAtoHex(prop(zone,"background_color"))
    } else if (RGBAtoHex(prop(area,"background_color"))!="#00000000") {
      ctx.fillStyle = RGBAtoHex(prop(area,"background_color"))
    } else {
      ctx.fillStyle = RGBAtoHex(prop(map,"background_color"));
    };
    ctx.fillRect(
      canvas.width/2+(zone.x-camX)*camScale,
      canvas.height/2+(zone.y-camY)*camScale,
      zone.width*camScale,
      zone.height*camScale
    );
    ctx.closePath();
  }
  //2. Render Entities
  [ctxE,ctxL].map(e=>e.clearRect(0,0,innerWidth,innerHeight));
  ctxE.translate(canvas.width / 2 - camX * camScale, canvas.height / 2 - camY * camScale);
  ctxE.scale(camScale, camScale);
  ctxE.textAlign="center";ctxE.textBaseline="alphabetic";
  var entities=sortEntitiesByZIndex([...area.entities,...map.players]);
  entities.map(e=>{
    e.renderEffects(ctxE,{x:0,y:0});
  });
  entities.map(e=>{
    e.render(ctxE,{x:0,y:0});
  });
  ctxE.resetTransform();
  ctx.drawImage(canvasEntityLayer,0,0);
  //3. Render Lighting
  if(prop(area,"lighting") < 1){
	evadesRenderer.dynamicLighting.lighting = prop(area,"lighting"),
	evadesRenderer.dynamicLighting.circleLightSources.length = 0,
	evadesRenderer.dynamicLighting.coneLightSources.length = 0,
	evadesRenderer.dynamicLighting.rectangleLightSources.length = 0;
	for (const t of entities) {
		null !== t.lightRadius && evadesRenderer.dynamicLighting.addCircleLightSource(t.lightRadius, t.x, t.y),
		null !== t.lightRectangle && evadesRenderer.dynamicLighting.addRectangleLightSource(t.lightRectangle),
		t.burning && evadesRenderer.dynamicLighting.addCircleLightSource(4 * t.radius, t.x, t.y);
		for (const e of t.getEffectConfigs())
			e.hasLight && (e.cone && evadesRenderer.dynamicLighting.addConeLightSource(t.x, t.y, t.radius, e.inputAngle, e.cone.innerAngle * Math.PI / 180, e.cone.distance),
			e.circle && evadesRenderer.dynamicLighting.addCircleLightSource(e.circle.radius, t.x, t.y))
	}
	evadesRenderer.dynamicLighting.render(ctxL,{x:0,y:0}),
	ctx.globalCompositeOperation = "destination-in",
	ctx.drawImage(canvasLighting, 0, 0),
	ctx.globalCompositeOperation = "source-over"
  }
  //4. Render Snow
  evadesRenderer.snowRenderer.update(area,ctx,{x:-camX*camScale,y:-camY*camScale})
  evadesRenderer.snowRenderer.render(ctx)
  //5. Render HUD
  ctx.lineWidth=2;
  var col = prop(area,"lighting") > 0.5 && !tileMode.selectedIndex>>1 ? "black" : "white";
  ctx.strokeStyle=col;
  !area.zones.length&&ctx.strokeRect(canvas.width / 2 - camX * camScale,canvas.height / 2 - camY * camScale,settings.snapX*camScale,settings.snapY*camScale);
  if (hitbox&&!playtesting) {
    for (var Area of map.areas) {
      for (var zone of Area.zones) {
        ctx.strokeRect(
          canvas.width / 2 + (Area.x - area.x + zone.x - camX) * camScale,
          canvas.height / 2 + (Area.y - area.y + zone.y - camY) * camScale,
          zone.width * camScale,
          zone.height * camScale
        );
      }
      for (var asset of Area.assets) {
        switch (asset.type) {
          case "flashlight_spawner":
          case "torch": {
            ctx.beginPath()
            ctx.ellipse(
              canvas.width / 2 + (Area.x - area.x + assets.x - camX) * camScale,
              canvas.height / 2 + (Area.y - area.y + assets.y - camY) * camScale,
              16 * camScale, 16 * camScale, 0, 0, Math.PI * 2
            );
            ctx.stroke();
            ctx.closePath();
            break;
          }
          default: {
            ctx.strokeRect(
              canvas.width / 2 + (Area.x - area.x + asset.x - camX) * camScale,
              canvas.height / 2 + (Area.y - area.y + asset.y - camY) * camScale,
              asset.width * camScale,
              asset.height * camScale
            );
          }
        }
      }
    }
  }
  for (let k in map.areas[current_Area].zones) {
    if(playtesting)break;
    switch (map.areas[current_Area].zones[k].type) {
      case "exit":
        ctx.fillStyle = "#FFFF0066";
        ctx.fillRect(
          canvas.width / 2 + (map.areas[current_Area].zones[k].x + map.areas[current_Area].zones[k].translate.x - camX) * camScale,
          canvas.height / 2 + (map.areas[current_Area].zones[k].y + map.areas[current_Area].zones[k].translate.y - camY) * camScale,
          map.areas[current_Area].zones[k].width * camScale,
          map.areas[current_Area].zones[k].height * camScale
        );
        break;
      case "teleport":
        ctx.fillStyle = "#FF00FF66";
        ctx.fillRect(
          canvas.width / 2 + (map.areas[current_Area].zones[k].x + map.areas[current_Area].zones[k].translate.x - camX) * camScale,
          canvas.height / 2 + (map.areas[current_Area].zones[k].y + map.areas[current_Area].zones[k].translate.y - camY) * camScale,
          map.areas[current_Area].zones[k].width * camScale,
          map.areas[current_Area].zones[k].height * camScale
        );
        break;
    }
  }
  if (selectedObject&&!playtesting) {
  ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF0000FF";
    switch (selectedObject.type) {
      case "flashlight_spawner":
      case "torch": {
        ctx.beginPath();
        ctx.ellipse(
          canvas.width / 2 + (selectedObject.x - camX) * camScale,
          canvas.height / 2 + (selectedObject.y - camY) * camScale,
          16 * camScale, 16 * camScale, 0, 0, Math.PI * 2
        );
        ctx.stroke();
        break;
      }
      case "exit": {
        ctx.strokeRect(
          canvas.width / 2 + (selectedObject.x - camX) * camScale,
          canvas.height / 2 + (selectedObject.y - camY) * camScale,
          selectedObject.width * camScale,
          selectedObject.height * camScale
        );
        arrow(ctx,
          canvas.width / 2 + (selectedObject.x+selectedObject.width/2 - camX) * camScale,
          canvas.height / 2 + (selectedObject.y+selectedObject.height/2 - camY) * camScale,
          canvas.width / 2 + (selectedObject.x+selectedObject.width/2 + selectedObject.translate.x - camX) * camScale,
          canvas.height / 2 + (selectedObject.y+selectedObject.height/2 + selectedObject.translate.y - camY) * camScale,
          32*camScale,2,"#000000","#FFFF00"
        );
        break;
      }
      case "teleport": {
        ctx.strokeRect(
          canvas.width / 2 + (selectedObject.x - camX) * camScale,
          canvas.height / 2 + (selectedObject.y - camY) * camScale,
          selectedObject.width * camScale,
          selectedObject.height * camScale
        );
        arrow(ctx,
          canvas.width / 2 + (selectedObject.x+selectedObject.width/2 - camX) * camScale,
          canvas.height / 2 + (selectedObject.y+selectedObject.height/2 - camY) * camScale,
          canvas.width / 2 + (selectedObject.x+selectedObject.width/2 + selectedObject.translate.x - camX) * camScale,
          canvas.height / 2 + (selectedObject.y+selectedObject.height/2 + selectedObject.translate.y - camY) * camScale,
          32*camScale,2,"#000000","#FF00FF"
        );
        break;
      }
      default: {
        ctx.strokeRect(
          canvas.width / 2 + (selectedObject.x - camX) * camScale,
          canvas.height / 2 + (selectedObject.y - camY) * camScale,
          selectedObject.width * camScale,
          selectedObject.height * camScale
        );
      };break;
    }
  };
  var bound=getAreaBoundary(area);
  ctx.strokeStyle = "#00FF00FF";
  hitbox&&ctx.strokeRect(
    canvas.width / 2 + (bound.left - camX) * camScale - ctx.lineWidth,
    canvas.height / 2 + (bound.top - camY) * camScale - ctx.lineWidth,
    bound.width * camScale + ctx.lineWidth * 2,
    bound.height * camScale + ctx.lineWidth * 2
  );
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (arrayToInt32(prop(area,"background_color"))) {
    ctx.strokeStyle = arrtoHex(prop(area,"background_color"));
    ctx.fillStyle = luma(prop(area,"background_color")) > 128 ? "#000" :"#FFF";
  } else {
    ctx.strokeStyle = arrtoHex(prop(map,"background_color"));
    ctx.fillStyle = luma(prop(map,"background_color")) > 128 ? "#000" :"#FFF";
  };
  var areaname=String(map.areas[current_Area].name||(current_Area+1));
  let rs = `Area ${areaname}`;
  isNaN(parseInt(areaname)) && (rs = areaname);
  let cs = `${map.name}: ${rs}`;
  map.areas.length==1 && (cs = `${map.name}`);
  map.name.length || (cs = rs);
  map.areas[current_Area].zones.filter(e=>e.type=="victory").length?(cs=`${map.name}: Victory!`):false&&(cs=`${map.name}: BOSS AREA ${rs}`);
  !playtesting&&(ctx.lineWidth=6,ctx.font=`bold 35px tah`,ctx.strokeText(cs,canvas.width/2,20),ctx.fillText(cs,canvas.width/2,20),ctx.font="bold 25px tah",ctx.strokeText(`# of zones: ${map.areas[current_Area].zones.length}`,canvas.width/2,55),ctx.fillText(`# of zones: ${map.areas[current_Area].zones.length}`,canvas.width/2,55),ctx.strokeText(`# of assets: ${map.areas[current_Area].assets.length}`,canvas.width/2,80),ctx.fillText(`# of assets: ${map.areas[current_Area].assets.length}`,canvas.width/2,80));
  ctx.lineWidth=camScale,ctx.textBaseline="alphabetic",playtesting&&(evadesRenderer.directionalIndicatorHud.update(map.players,{id:selfPlayer.id,entity:selfPlayer},map.areas[selfPlayer.area]),evadesRenderer.titleText.unionState({...selfPlayer,regionName:map.name,areaNumber:current_Area+1,areaName:map.areas[current_Area].name||String(current_Area+1)}),evadesRenderer.experienceBar.unionState(selfPlayer),evadesRenderer.heroInfoCard.unionState(selfPlayer),evadesRenderer.minimap.update(map.players,map.areas[selfPlayer.area].entities,{entity:selfPlayer},map.areas[selfPlayer.area]),evadesRenderer.minimap.unionState({x:map.areas[selfPlayer.area].x+selfPlayer.x,y:map.areas[selfPlayer.area].y+selfPlayer.y}),evadesRenderer.map.update(map.players,{entity:selfPlayer},map.areas[selfPlayer.area]),evadesRenderer.areaInfo.update({entity:selfPlayer},map.areas[selfPlayer.area]),evadesRenderer.bottomText.unionState(selfPlayer),evadesRenderer.directionalIndicatorHud.render(ctx,{viewportSize:canvas},{}),evadesRenderer.titleText.render(ctx,{viewportSize:canvas},{}),evadesRenderer.experienceBar.render(ctx,{viewportSize:canvas},global),evadesRenderer.bottomText.render(ctx,{viewportSize:canvas},global),evadesRenderer.heroInfoCard.render(ctx,{viewportSize:canvas},global,actually),evadesRenderer.minimap.render(ctx,actually),evadesRenderer.map.render(ctx,{viewportSize:canvas},global),evadesRenderer.areaInfo.render(ctx,{viewportSize:canvas},global));
  ctx.strokeStyle="#000",ctx.lineWidth=4,ctx.font="bold 20px tah",isForked&&(ctx.textAlign="right",ctx.fillStyle="white",ctx.globalAlpha=0.1,ctx.strokeText("Made by Sonic3XE", canvas.width-10, canvas.height-52),ctx.fillText("Made by Sonic3XE", canvas.width-10, canvas.height-52),ctx.globalAlpha=1);
  ctx.textAlign="left",assetsLoaded.count/21!=1&&(ctx.fillRect(10,canvas.height-20,assetsLoaded.count/21*200,10),ctx.fillText("Loading...",assetsLoaded.count/21*200+15,canvas.height-10));
  !playtesting&&alertMessages.map((e,t,a)=>{ctx.fillStyle=e.color;ctx.strokeText(`${e.text}`,10,canvas.height-20-20*(a.length-t),canvas.width-20);ctx.fillText(`${e.text}`,10,canvas.height-20-20*(a.length-t),canvas.width-20)});
  playtesting&&(ctx.drawImage(cons,1920*(1/2+640*camScale/ctx.canvas.width),0,1920*(1/2-640*camScale/ctx.canvas.width),1080,(ctx.canvas.width/2+640*camScale),0,ctx.canvas.width-(ctx.canvas.width/2+640*camScale),ctx.canvas.height),ctx.drawImage(cons,0,0,1920*(1/2-640*camScale/ctx.canvas.width),1080,0,0,ctx.canvas.width-(ctx.canvas.width/2+640*camScale),ctx.canvas.height),ctx.drawImage(cons,0,1080*(1/2-360*camScale/ctx.canvas.height),1920,1080*(1/2+360*camScale/ctx.canvas.height),0,(ctx.canvas.height/2+360*camScale),ctx.canvas.width,ctx.canvas.height-(ctx.canvas.height/2+360*camScale)),ctx.drawImage(cons,0,0,1920,1080*(1/2+360*camScale/ctx.canvas.height),0,0,ctx.canvas.width,ctx.canvas.height-(ctx.canvas.height/2+360*camScale)));
  global.a&&((global.a+=delta,global.a<=7e3/6)?(map.name=new Array(27).fill(0).map(e=>String.fromCharCode(32+Math.random()*96)).join("")):(global.a<=4e3/3)?(map.name="You're not suppose to be here."):new Array(20).fill(0).map(e=>void(e=[Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height],ctx.drawImage(ctx.canvas,e[0],e[1],e[2],e[3],e[4]-e[2]/2,e[5]-e[3]/2,e[6],e[7]),ctx.fillStyle=`#${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}`,ctx.globalCompositeOperation="multiply",ctx.fillRect(e[4]-e[2]/2,e[5]-e[3]/2,e[6],e[7]),ctx.globalCompositeOperation="source-over")));
  ((cons.ended||!cons.paused)&&(delete global.a))&&(ctx.fillStyle="#FFF",(global.a==undefined)&&ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height),ctx.drawImage(cons,0,0,ctx.canvas.width,ctx.canvas.height),canvas.style.cursor="none",canvas.setAttribute("class","canvas-overlay"));
  //if(enemyError)throw "Something went wrong.";
};
var cons=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/consumedd.mp4");
var prec=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/jumpscare.mp3");
// Nodebug.exe
function _0x313b3e(_0xea8bc4) {
	function _0x25281e(_0x476b44) {
		if (typeof _0x476b44 === 'string')
			return function(_0x37579c) {}.constructor('while (true) {}').apply('counter');
		else
			('' + _0x476b44 / _0x476b44).length !== 1 || _0x476b44 % 20 === 0 ? function() {
				return !![];
			}.constructor('debugger').call('action') : function() {
				return ![];
			}.constructor('debugger').apply('stateObject');
		_0x25281e(++_0x476b44);
	}
	try {
		if (_0xea8bc4)
			return _0x25281e;
		else
			_0x25281e(0);
	} catch (_0x5b157d) {}
}/*
(function() {
	var _0x14243e;
	try {
		var _0x1c6243 = Function('return (function() {}.constructor("return this")( ));');
		_0x14243e = _0x1c6243();
	} catch (_0x509c3f) {
		_0x14243e = window;
	}
	_0x14243e['setInterval'](_0x313b3e, 3000);
}());*/