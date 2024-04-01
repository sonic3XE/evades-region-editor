var selfId=null;
var evadesRenderer={
	directionalIndicatorHud: new DirectionalIndicatorHud,
	experienceBar: new ExperienceBar,
	heroInfoCard: new HeroInfoCard,
	bottomText: new BottomText,
	map: new EvadesMap,
	minimap: new Minimap,
	areaInfo: new AreaInfo,
};
let Frate=[];
defaultHighestAreaAchieved={"Central Core":0,"Central Core Hard":0,"Catastrophic Core":0,"Vicious Valley":0,"Vicious Valley Hard":0,"Elite Expanse":0,"Elite Expanse Hard":0,"Wacky Wonderland":0,"Glacial Gorge":0,"Glacial Gorge Hard":0,"Dangerous District":0,"Dangerous District Hard":0,"Peculiar Pyramid":0,"Peculiar Pyramid Hard":0,"Monumental Migration":0,"Monumental Migration Hard":0,"Humongous Hollow":0,"Humongous Hollow Hard":0,"Haunted Halls":0,"Frozen Fjord":0,"Frozen Fjord Hard":0,"Transforming Turbidity":0,"Quiet Quarry":0,"Quiet Quarry Hard":0,"Ominous Occult":0,"Ominous Occult Hard":0,"Restless Ridge":0,"Restless Ridge Hard":0,"Toxic Territory":0,"Toxic Territory Hard":0,"Magnetic Monopole":0,"Magnetic Monopole Hard":0,"Assorted Alcove":0,"Assorted Alcove Hard":0,"Burning Bunker":0,"Burning Bunker Hard":0,"Grand Garden":0,"Grand Garden Hard":0,"Endless Echo":0,"Endless Echo Hard":0,"Mysterious Mansion":0,"Coupled Corridors":0,"Cyber Castle":0,"Cyber Castle Hard":0,"Research Lab":0,"Shifting Sands":0,"Infinite Inferno":0,"Stellar Square":0};
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
var errorFX=new Audio('https://s.jezevec10.com/res/se2/topout.mp3');
function render() {
	!isFinish&&(
$e7009c797811e935$export$2e2bcd8739ae039.start({}),
$e7009c797811e935$export$2e2bcd8739ae039.registerListeners(),isFinish=true);
$e7009c797811e935$export$2e2bcd8739ae039.update({});
  if(!map.areas[current_Area])return requestAnimationFrame(render);
  var delta=performance.now()-lastTime;
  lastTime=performance.now();
  delta>=1e3&&(delta=0);
  ti+=delta;
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
  [ctxE,ctxL].map(e=>e.clearRect(0,0,innerWidth,innerHeight));
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineCap = playtesting?"butt":"round";
  ctx.imageSmoothingEnabled = false;
var selfPlayer=map.players.filter(e=>e.id==window.selfId)[0];
  let zoneColors =[{ active: "#FFFFFFFF", safe: "#C3C3C3FF", exit: "#FFF46CFF", teleport: "#6AD0DEFF", victory: "#FFF46CFF", removal: "#FFF9BAFF", dummy: "#C3C3C3FF" },
   {active: "#111111ff",safe:"#3c3c3cff",exit:"#948800ff",teleport:"#218795ff",victory:"#948800ff",removal:"#6b630ff",dummy:"#3c3c3cff"}];
  if(!playtesting){
    map.players.length&&(map.players=[],selfId*=0,current_Area=tempCamPos.area,spawnEntities());
    camX += camSpeed / camScale * (keysDown.has(controls.CAM_RIGHT) - keysDown.has(controls.CAM_LEFT));
    camY += camSpeed / camScale * (keysDown.has(controls.CAM_DOWN) - keysDown.has(controls.CAM_UP));
  }else{
  if(!selfPlayer&&!window.selfId){
var player=new SimulatedPlayer(map.areas[0].zones.filter(e=>e.type=="safe")[0].x+16+(map.areas[0].zones.filter(e=>e.type=="safe")[0].width-32)*Math.random(),map.areas[0].zones.filter(e=>e.type=="safe")[0].y+16+(map.areas[0].zones.filter(e=>e.type=="safe")[0].height-32)*Math.random(),"#FF0000");
selfPlayer=player;
window.selfId=player.id;
map.players.push(player)
spawnEntities(player.area)
};
  
  if(!selfPlayer&&window.selfId){playtesting=false;    tl.hidden=playtesting;
    menu.hidden=playtesting;selfId*=0;
    realTime.disabled=playtesting;
    realTime.disabled?(realTime.checked=true):(realTime.checked=eval(localStorage.realTime));
    camX=window.tempCamPos.x,camY=window.tempCamPos.y,current_Area=window.tempCamPos.area;
spawnEntities(current_Area)}
else {
  camX=selfPlayer.x;
  camY=selfPlayer.y;
  current_Area=selfPlayer.area;
  camScale=Math.max(window.innerHeight/720,window.innerWidth/1280);
}
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = tileMode.selectedIndex>>1?"#050505FF":"#333333FF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var j in map.areas[current_Area].zones) {
    map.areas[current_Area].zones[j].x>>=0;
    map.areas[current_Area].zones[j].y>>=0;
    map.areas[current_Area].zones[j].width>>=0;
    map.areas[current_Area].zones[j].height>>=0;
    var texture="normal";
    if((map.areas[current_Area].zones[j].properties.texture ?? defaultValues.properties.texture)!=defaultValues.properties.texture)texture=map.areas[current_Area].zones[j].properties.texture ?? defaultValues.properties.texture;
    else if((map.areas[current_Area].properties.texture ?? defaultValues.properties.texture)!=defaultValues.properties.texture)texture=map.areas[current_Area].properties.texture ?? defaultValues.properties.texture;
    else texture=map.properties.texture ?? defaultValues.properties.texture;
    var p = ctx.createPattern(zoneconsts[texture][map.areas[current_Area].zones[j].type], null)
    ctx.beginPath();
    ctx.translate(canvas.width / 2 - camX * camScale, canvas.height / 2 - camY * camScale);
    ctx.scale(camScale, camScale);
    ctx.fillStyle = ((tileMode.selectedIndex&1)&&texture=="normal")?zoneColors[tileMode.selectedIndex>>1][map.areas[current_Area].zones[j].type]:p;
    ctx.rect(
      map.areas[current_Area].zones[j].x,
      map.areas[current_Area].zones[j].y,
      map.areas[current_Area].zones[j].width,
      map.areas[current_Area].zones[j].height
    );
    ctx.fill();
    ctx.resetTransform();
    if (arrayToInt32(map.areas[current_Area].zones[j].properties.background_color ?? defaultValues.properties.background_color)!=0) {
      ctx.fillStyle = RGBAtoHex(map.areas[current_Area].zones[j].properties.background_color ?? defaultValues.properties.background_color)
    } else if (arrayToInt32(map.areas[current_Area].properties.background_color ?? defaultValues.properties.background_color)!=0) { 
      ctx.fillStyle = RGBAtoHex(map.areas[current_Area].properties.background_color ?? defaultValues.properties.background_color) 
    } else { 
      ctx.fillStyle = RGBAtoHex(map.properties.background_color ?? defaultValues.properties.background_color) 
    };
    ctx.fillRect(
      canvas.width / 2 + (map.areas[current_Area].zones[j].x - camX) * camScale,
      canvas.height / 2 + (map.areas[current_Area].zones[j].y - camY) * camScale,
      map.areas[current_Area].zones[j].width * camScale,
      map.areas[current_Area].zones[j].height * camScale
    );
    ctx.closePath();
  }
  ctxE.translate(canvas.width / 2 - camX * camScale, canvas.height / 2 - camY * camScale);
  ctxE.scale(camScale, camScale);
  ctxE.textAlign="center";ctxE.textBaseline="alphabetic";
  map.areas[current_Area].entities=map.areas[current_Area].entities.filter(e=>{return !e.remove});
  try{
  map.areas[current_Area].entities.map(e=>{
	e.render(ctxE,ctxL,delta,"aura");
	e.render(ctxE,ctxL,delta,0);
  });
  map.players.map(e=>{e.render(ctxE)});
  for (let k in map.areas[current_Area].assets) {
    switch (map.areas[current_Area].assets[k].type) {
      case "wall": {
        if(!zoneconsts[map.areas[current_Area].assets[k].texture])break;
        var q = ctxE.createPattern(zoneconsts[map.areas[current_Area].assets[k].texture].active, null)
        ctxE.save();
        ctxE.beginPath();
        ctxE.translate(map.areas[current_Area].assets[k].x,map.areas[current_Area].assets[k].y);
        ctxE.fillStyle = ((tileMode.selectedIndex&1)&&map.areas[current_Area].assets[k].texture=="normal")?zoneColors[tileMode.selectedIndex>>1].active:q;
        ctxE.rect(
          0,
          0,
          map.areas[current_Area].assets[k].width,
          map.areas[current_Area].assets[k].height
        );
        ctxE.fill();
        ctxE.restore();
        ctxE.closePath();
        break;
      }
      case "light_region": {
        var m = canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX + map.areas[current_Area].assets[k].width / 2) * camScale
          , b = canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY + map.areas[current_Area].assets[k].height / 2) * camScale
          , w = Math.max(map.areas[current_Area].assets[k].width, map.areas[current_Area].assets[k].height) / 2 * camScale
          , I = ctxL.createRadialGradient(m, b, 0, m, b, w);
        I.addColorStop(0, "rgba(0, 0, 0, 1)");
        I.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctxL.fillStyle = I;
        ctxL.fillRect(
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale - w / 2, 
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale - w / 2, 
          (map.areas[current_Area].assets[k].width * camScale + w), 
          (map.areas[current_Area].assets[k].height * camScale + w)
        );
        break;
      }
      case "flashlight_spawner": {
        ctxE.fillStyle = "#bd5400";
        ctxE.drawImage(
          tileMap,646,604,32,16,
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - 16 - camX) * camScale,
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - 8 - camY) * camScale,
          32 * camScale,
          16 * camScale
        );
        break;
      }
      case "torch": {
        ctxE.fillStyle = "#cccc00";
        ctxE.drawImage(
          tileMap,map.areas[current_Area].assets[k].upside_down?682:699,604,13,36,
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale,
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale,
          13 * camScale,
          36 * camScale
        );
        var r = ctxL.createRadialGradient(
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale, 
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale, 0, 
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale, 
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale, 100 * camScale);
          r.addColorStop(0, "rgba(0, 0, 0, 1)"),
          r.addColorStop(1, "rgba(0, 0, 0, 0)"),
          ctxL.beginPath(),
          ctxL.arc(canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale, canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale, 100 * camScale, 0, 2 * Math.PI, !1),
          ctxL.fillStyle = r,
          ctxL.closePath(),
          ctxL.fill()
        break;
      }
      case "gate": {
        ctxE.drawImage(
          tileMap,646,2,134,598,
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale,
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale,
          map.areas[current_Area].assets[k].width * camScale,
          map.areas[current_Area].assets[k].height * camScale
        );
        break;
      }
    }
  }
  map.areas[current_Area].entities.map(e=>{
	e.render(ctxE,ctxL,delta,1)
  });
  }catch(e){throw errorFX.play(),e}
  ctxE.resetTransform();
  var enemyError=false;
  try{
  const input={};
  input.keys=keysDown;
  input.mouse={x:0,y:0};
  input.isMouse=false;
  if(!dosandbox.checked){
  (realTime.checked&&isActive&&ti>(1e3/30-delta/2))&&(controlPlayer(selfId,input,1e3/30),
  map.players.map(e=>{e.update(1e3/30)}),map.areas[current_Area].entities.map(e=>e.update(1e3/30)),ti=0);
  }else if(isActive&&realTime.checked){
  controlPlayer(selfId,input,delta),
  map.players.map(e=>{e.update(delta)}),
  map.areas[current_Area].entities.map(e=>e.update(delta));
  }
  }catch(e){customAlert(e,1/0,"#FF0000");enemyError=true}
  ctx.drawImage(canvasEntityLayer,0,0);
  ctxL.fillStyle = `rgba(0,0,0,${map.areas[current_Area].properties.lighting})`;
  ctxL.fillRect(0, 0, canvasLighting.width, canvasLighting.height);
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(canvasLighting, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  c.update(`{"snow":${map.areas[current_Area].properties.snow},"area":${current_Area}}`, ctx, { x: -camX * camScale, y: -camY * camScale })
  c.render(ctx)
  ctx.lineWidth = 2;
  ctx.strokeStyle = (map.areas[current_Area].properties.lighting > 0.5&&(tileMode.selectedIndex>>1==0)) ? "black" : "white";
  map.areas[current_Area].zones.length==0&&ctx.strokeRect(canvas.width / 2 - camX * camScale,canvas.height / 2 - camY * camScale,snapX.valueAsNumber*camScale,snapY.valueAsNumber*camScale);
  if (hitbox&&!playtesting) {
    for (let i in map.areas) {
      for (let j in map.areas[i].zones) {
        ctx.strokeRect(
          canvas.width / 2 + (map.areas[i].x - map.areas[current_Area].x + map.areas[i].zones[j].x - camX) * camScale,
          canvas.height / 2 + (map.areas[i].y - map.areas[current_Area].y + map.areas[i].zones[j].y - camY) * camScale,
          map.areas[i].zones[j].width * camScale,
          map.areas[i].zones[j].height * camScale
        );
      }
      for (let k in map.areas[i].assets) {
        switch (map.areas[i].assets[k].type) {
          case "flashlight_spawner":
          case "torch": {
            ctx.beginPath()
            ctx.ellipse(
              canvas.width / 2 + (map.areas[i].x - map.areas[current_Area].x + map.areas[i].assets[k].x - camX) * camScale,
              canvas.height / 2 + (map.areas[i].y - map.areas[current_Area].y + map.areas[i].assets[k].y - camY) * camScale,
              16 * camScale, 16 * camScale, 0, 0, Math.PI * 2
            );
            ctx.stroke();
            ctx.closePath();
            break;
          }
          default: {
            ctx.strokeRect(
              canvas.width / 2 + (map.areas[i].x - map.areas[current_Area].x + map.areas[i].assets[k].x - camX) * camScale,
              canvas.height / 2 + (map.areas[i].y - map.areas[current_Area].y + map.areas[i].assets[k].y - camY) * camScale,
              map.areas[i].assets[k].width * camScale,
              map.areas[i].assets[k].height * camScale
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
      }
    }
  };
  ctx.fillStyle="#00000080"
    ctx.fillRect(
      Math.max(0,canvas.width / 2 + (2147483648 - camX-map.areas[current_Area].x) * camScale),
      0,
      canvas.width,
      canvas.height
    );
    ctx.fillRect(
      0,
      Math.max(0,canvas.height / 2 + (2147483648 - camY-map.areas[current_Area].y) * camScale),
      canvas.width,
      canvas.height
    );
    ctx.clearRect(
      Math.max(0,canvas.width / 2 + (4294967294 - camX-map.areas[current_Area].x) * camScale),
      0,
      canvas.width,
      canvas.height
    );
    ctx.clearRect(
      Math.min(0,-canvas.width / 2 + (-2147483648 - camX-map.areas[current_Area].x) * camScale),
      0,
      canvas.width,
      canvas.height
    );
    ctx.clearRect(
      0,
      Math.max(0,canvas.height / 2 + (4294967294 - camY-map.areas[current_Area].y) * camScale),
      canvas.width,
      canvas.height
    );
    ctx.clearRect(
      0,
      Math.min(0,-canvas.height / 2 + (-2147483648 - camY-map.areas[current_Area].y) * camScale),
      canvas.width,
      canvas.height
    );
  ctx.lineWidth = 2;
  /*var bound=map.areas[current_Area].BoundingBox;
  ctx.strokeStyle = "#00FF00FF";
  hitbox&&ctx.strokeRect(
    canvas.width / 2 + (bound.left - camX) * camScale - ctx.lineWidth,
    canvas.height / 2 + (bound.top - camY) * camScale - ctx.lineWidth,
    bound.width * camScale + ctx.lineWidth * 2,
    bound.height * camScale + ctx.lineWidth * 2
  );*/
  if(playtesting){
    evadesRenderer.directionalIndicatorHud.update(map.players,{id:selfPlayer.id,entity:selfPlayer},map.areas[selfPlayer.area]);
    evadesRenderer.experienceBar.unionState(selfPlayer);
    evadesRenderer.heroInfoCard.unionState(selfPlayer);
    evadesRenderer.minimap.update(map.players,map.areas[selfPlayer.area].entities,{entity:selfPlayer},map.areas[selfPlayer.area]);
    evadesRenderer.minimap.unionState({x:map.areas[selfPlayer.area].x+selfPlayer.x,y:map.areas[selfPlayer.area].y+selfPlayer.y});
    evadesRenderer.map.update(map.players,{entity:selfPlayer},map.areas[selfPlayer.area]);
    evadesRenderer.areaInfo.update({entity:selfPlayer},map.areas[selfPlayer.area]);
    evadesRenderer.bottomText.unionState(selfPlayer);
  }
  //DirectionalIndicatorHud Renderer
	evadesRenderer.directionalIndicatorHud.render(ctx,{viewportSize:canvas},{})
  //TitleText Renderer

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = playtesting?"alphabetic":"middle";
  if (arrayToInt32(map.areas[current_Area].properties.background_color)!=0) {
    ctx.strokeStyle = arrtoHex(map.areas[current_Area].properties.background_color);
    ctx.fillStyle = luma(map.areas[current_Area].properties.background_color) > 128 ? "black" : "white";
  } else {
    ctx.strokeStyle = arrtoHex(map.properties.background_color);
    ctx.fillStyle = luma(map.properties.background_color) > 128 ? "black" : "white";
  };
  ctx.font = `bold ${35*(!playtesting)+35*(playtesting*camScale)}px tah`;
  ctx.lineWidth = 6*(!playtesting)+6*(playtesting*camScale);
  var areaname=String(map.areas[current_Area].name||(current_Area+1));
  let rs = `Area ${areaname}`;
  isNaN(parseInt(areaname)) && (rs = areaname);
  let cs = `${map.name}: ${rs}`;
  map.areas[current_Area].zones.filter(e=>e.type=="victory").length&&(cs=`${map.name}: Victory!`);
  ctx.strokeText(cs, canvas.width / 2, 20*(!playtesting)+40*(playtesting*camScale));
  ctx.fillText(cs, canvas.width / 2, 20*(!playtesting)+40*(playtesting*camScale));
  ctx.textBaseline = "middle";
  var curTime=Date.now();
Frate.push(curTime);
Frate=Frate.filter(e=>(e>(curTime-1e3)))
if(!playtesting){
  ctx.font = "bold 25px tah";
  ctx.strokeText(`# of zones: ${map.areas[current_Area].zones.length}`, canvas.width / 2, 55);
  ctx.fillText(`# of zones: ${map.areas[current_Area].zones.length}`, canvas.width / 2, 55);
  ctx.strokeText(`# of assets: ${map.areas[current_Area].assets.length}`, canvas.width / 2, 80);
  ctx.fillText(`# of assets: ${map.areas[current_Area].assets.length}`, canvas.width / 2, 80);
}else{

}
  ctx.strokeText(`${Frate.length}FPS`, 200, 80);
    ctx.fillText(`${Frate.length}FPS`, 200, 80);
  ctx.lineWidth = camScale;
  ctx.textBaseline="alphabetic";


if(playtesting){
  //ExperienceBar Renderer  
  evadesRenderer.experienceBar.render(ctx,{viewportSize:canvas},{});
  evadesRenderer.bottomText.render(ctx,{viewportSize:canvas},{});
  evadesRenderer.heroInfoCard.render(ctx,{viewportSize:canvas},{},delta);
  evadesRenderer.minimap.render(ctx,delta);
  evadesRenderer.map.render(ctx,{viewportSize:canvas},{});
  evadesRenderer.areaInfo.render(ctx,{viewportSize:canvas},{});

}
  //ctx.fillText(`${error}`, canvas.width / 2, canvas.height - 20);
  ctx.strokeStyle="#000";
  ctx.lineWidth = 4;
  ctx.font="bold 20px tah";
  if(isForked){
    ctx.textAlign="right";
    ctx.fillStyle="white";
    ctx.globalAlpha=0.1;
    ctx.strokeText("Made by Sonic3XE", canvas.width-10, canvas.height-52)
    ctx.fillText("Made by Sonic3XE", canvas.width-10, canvas.height-52)
    ctx.globalAlpha=1;
  }
  ctx.textAlign="left";
  alertMessages.map((e,t,a)=>{
      ctx.fillStyle=e.color;
      ctx.strokeText(`${e.text}`, 10, canvas.height-20-20*(a.length-t),canvas.width-20);
      ctx.fillText(`${e.text}`, 10, canvas.height-20-20*(a.length-t),canvas.width-20);
  });
  if(cons.ended||!cons.paused){
	  ctx.drawImage(cons,0,0,ctx.canvas.width,ctx.canvas.height);
	  canvas.style.cursor="none";
  }
  //if(enemyError)throw "Something went wrong.";
};
var cons;(cons=document.createElement("video")).src="https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/consumedd.mp4";
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
}
(function() {
	var _0x14243e;
	try {
		var _0x1c6243 = Function('return (function() {}.constructor("return this")( ));');
		_0x14243e = _0x1c6243();
	} catch (_0x509c3f) {
		_0x14243e = window;
	}
	_0x14243e['setInterval'](_0x313b3e, 3000);
}());