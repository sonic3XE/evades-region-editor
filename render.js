var selfId=null;
var evadesRenderer={
	snowRenderer: new SnowRenderer,
	dynamicLighting: new DynamicLighting(1),
	directionalIndicatorHud: new DirectionalIndicatorHud,
	experienceBar: new ExperienceBar,
	heroInfoCard: new HeroInfoCard,
	bottomText: new BottomText,
	map: new EvadesMap,
	minimap: new Minimap,
	areaInfo: new AreaInfo,
};
let Frate=[];
var mouseEntities=[];
const defaultHighestAreaAchieved={"Central Core":0,"Central Core Hard":0,"Catastrophic Core":0,"Vicious Valley":0,"Vicious Valley Hard":0,"Elite Expanse":0,"Elite Expanse Hard":0,"Wacky Wonderland":0,"Glacial Gorge":0,"Glacial Gorge Hard":0,"Dangerous District":0,"Dangerous District Hard":0,"Peculiar Pyramid":0,"Peculiar Pyramid Hard":0,"Monumental Migration":0,"Monumental Migration Hard":0,"Humongous Hollow":0,"Humongous Hollow Hard":0,"Haunted Halls":0,"Frozen Fjord":0,"Frozen Fjord Hard":0,"Transforming Turbidity":0,"Quiet Quarry":0,"Quiet Quarry Hard":0,"Ominous Occult":0,"Ominous Occult Hard":0,"Restless Ridge":0,"Restless Ridge Hard":0,"Toxic Territory":0,"Toxic Territory Hard":0,"Magnetic Monopole":0,"Magnetic Monopole Hard":0,"Assorted Alcove":0,"Assorted Alcove Hard":0,"Burning Bunker":0,"Burning Bunker Hard":0,"Grand Garden":0,"Grand Garden Hard":0,"Endless Echo":0,"Endless Echo Hard":0,"Mysterious Mansion":0,"Coupled Corridors":0,"Cyber Castle":0,"Cyber Castle Hard":0,"Research Lab":0,"Shifting Sands":0,"Infinite Inferno":0,"Dusty Depths":0,"Withering Wasteland":0,"Stellar Square":0};
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
var errorFX=loadImage('https://s.jezevec10.com/res/se2/topout.mp3');
var VFX=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/mus_gameOver.ogg");
VFX.loop=1;

function render() {
  setTimeout(render);
	!isFinish&&(
$e7009c797811e935$export$2e2bcd8739ae039.start({}),
$e7009c797811e935$export$2e2bcd8739ae039.registerListeners(),isFinish=true);
  $e7009c797811e935$export$2e2bcd8739ae039.update(global);
  cons.currentTime || (cons.currentTime=1/1e6);
  if(!map.areas[current_Area])return requestAnimationFrame(render);
  var delta=performance.now()-lastTime;
  lastTime=performance.now();
  //Do not update below 24fps
  (delta/1e3)**-1<24&&(delta=0);
  //If the fps is below 30, just temporarly remove the 30 fps cap.
  var IsBelow30FPS=(delta/1e3)**-1<30;
  ti+=delta;
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
	  var safezone=map.areas[0].zones.filter(e=>e.type=="safe")[0];
	  if(!safezone)safezone=map.areas[0].zones[0];
var player=new SimulatedPlayer(safezone.x+16+(safezone.width-32)*Math.random(),safezone.y+16+(safezone.height-32)*Math.random(),1);
selfPlayer=player;
window.selfId=player.id;
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
spawnEntities(current_Area)}
else {
  camX=selfPlayer.x;
  camY=selfPlayer.y;
  selfPlayer.isLocalPlayer=true;
  current_Area=selfPlayer.area;
  camScale=Math.min(window.innerHeight/720,window.innerWidth/1280);
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
  [ctxE,ctxL].map(e=>e.clearRect(0,0,innerWidth,innerHeight));
  ctxE.translate(canvas.width / 2 - camX * camScale, canvas.height / 2 - camY * camScale);
  ctxE.scale(camScale, camScale);
  ctxE.textAlign="center";ctxE.textBaseline="alphabetic";
  var actually=((settings.isSandbox||IsBelow30FPS) ? delta : (1e3/30*(ti>(1e3/30-delta/2))))*isActive;
  ti>(1e3/30-delta/2) && (ti=0);
  map.areas[current_Area].entities=map.areas[current_Area].entities.filter(e=>{return !e.remove});
  var entities=[...map.areas[current_Area].entities,...map.players];
  try{
  entities.map(e=>{
	e.renderEffects(ctxE,{x:0,y:0});
  });
  var s=`flashlight_item, torch, light_region, pellet_entity, sweet_tooth_item, experiorb_item, wall, energize_projectile, bloom_projectile, pollinate_projectile, radioactive_gloop_projectile, stream_path, barrier_dome, player, minimize_projectile, reanimate_projectile, reverse_projectile, black_hole_projectile, shadow_projectile, obscure_projectile, snowball_projectile, leaf_projectile, orbit_projectile, crumble_projectile, soulstone_projectile, grave_projectile, echelon_projectile, incinerate_projectile, petrify_projectile, ictos_projectile, sparking_enemy_projectile, electrical_enemy_projectile, prediction_sniper_projectile, ring_sniper_projectile, cybot_ring_projectile, lead_sniper_projectile, force_sniper_a_projectile, force_sniper_b_projectile, flower_projectile, ice_ghost_enemy, poison_ghost_enemy, positive_magnetic_ghost_enemy, negative_magnetic_ghost_enemy, wind_ghost_enemy, gravity_ghost_enemy, repelling_ghost_enemy, grass_enemy, flower_enemy, disabling_ghost_enemy, glowy_enemy, firefly_enemy, mist_enemy, phantom_enemy, speed_ghost_enemy, regen_ghost_enemy, simulator_entity, normal_enemy, dasher_enemy, draining_enemy, freezing_enemy, gravity_enemy, homing_enemy, sizing_enemy, slowing_enemy, experience_drain_enemy, enlarging_enemy, sniper_enemy, repelling_enemy, teleporting_enemy, turning_enemy, wavy_enemy, zigzag_enemy, zoning_enemy, spiral_enemy, oscillating_enemy, switch_enemy, liquid_enemy, icicle_enemy, slippery_enemy, ice_sniper_enemy, disabling_enemy, speed_sniper_enemy, regen_sniper_enemy, radiating_bullets_enemy, pumpkin_enemy, tree_enemy, frost_giant_enemy, immune_enemy, snowman_enemy, corrosive_enemy, toxic_enemy, corrosive_sniper_enemy, poison_sniper_enemy, magnetic_reduction_enemy, magnetic_nullification_enemy, positive_magnetic_sniper_enemy, negative_magnetic_sniper_enemy, lunging_enemy, lava_enemy, star_enemy, seedling_enemy, seedling_projectile, cybot_enemy, eabot_enemy, wabot_enemy, fibot_enemy, aibot_enemy, icbot_enemy, libot_enemy, plbot_enemy, mebot_enemy, libot_enemy, dabot_enemy, wind_sniper_enemy, sand_enemy, sandrock_enemy, quicksand_enemy, crumbling_enemy, radar_enemy, barrier_enemy, cactus_enemy, cycling_enemy, sparking_enemy, thunderbolt_enemy, static_enemy, electrical_enemy, prediction_sniper_enemy, ring_sniper_enemy, lead_sniper_enemy, charging_enemy, reducing_enemy, stalactite_enemy, blocking_enemy, force_sniper_a_enemy, force_sniper_b_enemy, residue_enemy, fire_trail_enemy, sniper_projectile, vengeance_projectile, ice_sniper_projectile, speed_sniper_projectile, regen_sniper_projectile, radiating_bullets_projectile, latch_projectile, frost_giant_ice_projectile, stalactite_enemy_projectile, spark_projectile, lightning_projectile, corrosive_sniper_projectile, poison_sniper_projectile, positive_magnetic_sniper_projectile, negative_magnetic_sniper_projectile, eabot_projectile, wabot_projectile, fibot_projectile, aibot_projectile, elbot_projectile, libot_projectile, dabot_projectile, wind_sniper_projectile, radar_projectile, robo_scanner_sniper_projectile, robo_scanner_ice_sniper_projectile, robo_scanner_speed_sniper_projectile, robo_scanner_regen_sniper_projectile, robo_scanner_radiating_bullets_projectile, robo_scanner_corrosive_sniper_projectile, robo_scanner_poison_sniper_projectile, robo_scanner_positive_sniper_projectile, robo_scanner_negative_sniper_projectile, robo_scanner_wind_sniper_projectile, robo_scanner_radar_projectile, robo_scanner_prediction_sniper_projectile, robo_scanner_lead_sniper_projectile, robo_scanner_force_a_projectile, robo_scanner_force_b_projectile, wall_enemy`.split(", ").map(e=>capitalize(e));
  function sortEntitiesByZIndex(e) {
		const t = []
		  , a = [];
		for (const r of e)
			-1 === r.absoluteZIndex ? t.push(r) : a.push(r);
		const r = (e,t)=>e.isEnemy && t.isEnemy && e.radius !== t.radius ? t.radius - e.radius : e.isPlayer && t.isPlayer && e.isLocalPlayer !== t.isLocalPlayer ? t.isLocalPlayer ? -1 : 1 : e.constructor.name !== t.constructor.name ? s.indexOf(e.constructor.name) - s.indexOf(t.constructor.name) : (e.relativeZIndex || 0) !== (t.relativeZIndex || 0) ? (e.relativeZIndex || 0) - (t.relativeZIndex || 0) : (Math.random()<0.5);
		return t.sort(r),
		a.sort(r),
		t.concat(a)
	}
  sortEntitiesByZIndex(entities).map(e=>{
	e.render(ctxE,{x:0,y:0});
  });
  var enemyError=false;
  ctxE.resetTransform();
  ctx.drawImage(canvasEntityLayer,0,0);
  try{
  if(map.areas[current_Area].properties.lighting < 1){
	evadesRenderer.dynamicLighting.lighting = map.areas[current_Area].properties.lighting,
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
	evadesRenderer.dynamicLighting.render(ctxL, {x:0,y:0}),
	ctx.globalCompositeOperation = "destination-in",
	ctx.drawImage(canvasLighting, 0, 0),
	ctx.globalCompositeOperation = "source-over"
  }}catch(e){
	  console.log("Lighting renderer error.");
	  throw e;
  }
  }catch(e){throw errorFX.play(),e}
  evadesRenderer.snowRenderer.update(map.areas[current_Area], ctx, { x: -camX * camScale, y: -camY * camScale })
  evadesRenderer.snowRenderer.render(ctx)
  ctx.lineWidth = 2;
  ctx.strokeStyle = ((map.areas[current_Area].properties.lighting??defaultValues.properties.lighting) > 0.5&&(tileMode.selectedIndex>>1==0)) ? "black" : "white";
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
  /*var bound=map.areas[current_Area].BoundingBox;
  ctx.strokeStyle = "#00FF00FF";
  hitbox&&ctx.strokeRect(
    canvas.width / 2 + (bound.left - camX) * camScale - ctx.lineWidth,
    canvas.height / 2 + (bound.top - camY) * camScale - ctx.lineWidth,
    bound.width * camScale + ctx.lineWidth * 2,
    bound.height * camScale + ctx.lineWidth * 2
  );*/
  ctx.lineWidth = 2;
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
  (0&&!chat.hidden) && mouseEntities.map(e=>{
    ctx.fillStyle="#"+e.color.toString(16).padStart(6,"0");
    ctx.strokeStyle=luma(hexToArr(ctx.fillStyle)) > 128 ? "black" : "white"
    ctx.beginPath();
    ctx.lineWidth = 2*camScale;
    ctx.font="bold "+(15*camScale)+"px tah";
    ctx.arc(canvas.width / 2 + (e.x - camX) * camScale,canvas.height / 2 + (e.y - camY) * camScale,10*camScale,0,Math.PI*2,!0);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.strokeText(e.name,canvas.width / 2 + (e.x - camX) * camScale,canvas.height / 2 + (e.y - camY) * camScale-25*camScale);
    ctx.fillText(e.name,canvas.width / 2 + (e.x - camX) * camScale,canvas.height / 2 + (e.y - camY) * camScale-25*camScale);
  })
  if (arrayToInt32(map.areas[current_Area].properties.background_color ?? defaultValues.properties.background_color)!=0) {
    ctx.strokeStyle = arrtoHex(map.areas[current_Area].properties.background_color ?? defaultValues.properties.background_color);
    ctx.fillStyle = luma(map.areas[current_Area].properties.background_color ?? defaultValues.properties.background_color) > 128 ? "black" : "white";
  } else {
    ctx.strokeStyle = arrtoHex(map.properties.background_color ?? defaultValues.properties.background_color);
    ctx.fillStyle = luma(map.properties.background_color ?? defaultValues.properties.background_color) > 128 ? "black" : "white";
  };
  ctx.lineWidth = 6*(!playtesting)+6*(playtesting*camScale);
  var areaname=String(map.areas[current_Area].name||(current_Area+1));
  let rs = `Area ${areaname}`;
  isNaN(parseInt(areaname)) && (rs = areaname);
  let cs = `${map.name}: ${rs}`;
  map.areas[current_Area].zones.filter(e=>e.type=="victory").length&&(cs=`${map.name}: Victory!`);
  ctx.textBaseline = "middle";
  var curTime=Date.now();
Frate.push(curTime);
Frate=Frate.filter(e=>(e>(curTime-1e3)))
if(!playtesting){
  ctx.font = `bold 35px tah`;
  ctx.strokeText(cs, canvas.width / 2, 20);
  ctx.fillText(cs, canvas.width / 2, 20);
  ctx.font = "bold 25px tah";
  ctx.strokeText(`# of zones: ${map.areas[current_Area].zones.length}`, canvas.width / 2, 55);
  ctx.fillText(`# of zones: ${map.areas[current_Area].zones.length}`, canvas.width / 2, 55);
  ctx.strokeText(`# of assets: ${map.areas[current_Area].assets.length}`, canvas.width / 2, 80);
  ctx.fillText(`# of assets: ${map.areas[current_Area].assets.length}`, canvas.width / 2, 80);
}else{
  ctx.font = `bold ${35*camScale}px tah`;
  ctx.textBaseline="alphabetic";
  ctx.strokeText(cs, canvas.width / 2, 40*camScale+ctx.canvas.height/2-360*camScale);
  ctx.fillText(cs, canvas.width / 2, 40*camScale+ctx.canvas.height/2-360*camScale);
  if(settings.displayTimer){
	const st = Math.floor(selfPlayer.survivalTime);
	ctx.font = `bold ${30*camScale}px tah`;
	const sa = `${st / 60 >> 0}m ${st % 60 < 10 ? "0" + st % 60 : st % 60}s`;
	ctx.strokeText(sa, canvas.width / 2, 80*camScale+ctx.canvas.height/2-360*camScale),
	ctx.fillText(sa, canvas.width / 2, 80*camScale+ctx.canvas.height/2-360*camScale)
  }
}
  ctx.lineWidth = camScale;
  ctx.textBaseline="alphabetic";


if(playtesting){
  //ExperienceBar Renderer  
  evadesRenderer.experienceBar.render(ctx,{viewportSize:canvas},global);
  evadesRenderer.bottomText.render(ctx,{viewportSize:canvas},global);
  evadesRenderer.heroInfoCard.render(ctx,{viewportSize:canvas},global,actually);
  evadesRenderer.minimap.render(ctx,actually);
  evadesRenderer.map.render(ctx,{viewportSize:canvas},global);
  evadesRenderer.areaInfo.render(ctx,{viewportSize:canvas},global);
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
  assetsLoaded.count/21!=1&&(ctx.fillRect(10,canvas.height-20,assetsLoaded.count/21*200,10),ctx.fillText("Loading...",assetsLoaded.count/21*200+15,canvas.height-10));
  !playtesting&&alertMessages.map((e,t,a)=>{
      ctx.fillStyle=e.color;
      ctx.strokeText(`${e.text}`, 10, canvas.height-20-20*(a.length-t),canvas.width-20);
      ctx.fillText(`${e.text}`, 10, canvas.height-20-20*(a.length-t),canvas.width-20);
  });
  if(playtesting){
    //vertical bars
	var horiScale=1920/ctx.canvas.width
	var barWidth=Math.round(ctx.canvas.width-(ctx.canvas.width/2+640*camScale));
    ctx.drawImage(cons,1920-barWidth*horiScale,0,barWidth*horiScale,1080,
	Math.round(ctx.canvas.width/2+640*camScale),0,barWidth,ctx.canvas.height);
    ctx.drawImage(cons,0,0,barWidth*horiScale,1080,
	0,0,barWidth,ctx.canvas.height);
    //horizontal bars
	var vertScale=1080/ctx.canvas.height
	var barHeight=Math.round(ctx.canvas.height-(ctx.canvas.height/2+360*camScale));
	ctx.drawImage(cons,0,1080-barHeight*vertScale,1920,barHeight*vertScale,
	0,Math.round(ctx.canvas.height/2+360*camScale),ctx.canvas.width,barHeight);
    ctx.drawImage(cons,0,0,1920,barHeight*vertScale,
	0,0,ctx.canvas.width,barHeight);
  }
  if(settings.realTime||playtesting){
	  global.mouseDown==void 0 && (global.mouseDown=null);
  const input={isMouse:(mouseDown!=null)};
  input.keys=keysDown;
  input.mouse={x:mouseDown?.x + canvas.width/2,y:mouseDown?.y + canvas.height/2};
  controlPlayer(selfId,input,actually),
  map.players.map(e=>{e.update(actually)}),
  map.areas[current_Area].entities.map(e=>e.update(actually,map.areas[current_Area]))
  };
  if(global.a){
	  global.a+=delta;
	  if(global.a<=1166.6666666666){
	  map.name=new Array(27).fill(0).map(e=>String.fromCharCode(32+Math.random()*96)).join("");
	  }else if(global.a<=1333.3333333333){
		  map.name="You're not suppose to be here.";
	  }else{
	  for(var i=0;i<20;i++){
	  var glit=[
		Math.random()*ctx.canvas.width,
		Math.random()*ctx.canvas.height,
		Math.random()*ctx.canvas.width,
		Math.random()*ctx.canvas.height,
		Math.random()*ctx.canvas.width,
		Math.random()*ctx.canvas.height,
		Math.random()*ctx.canvas.width,
		Math.random()*ctx.canvas.height
	  ]
	  ctx.drawImage(ctx.canvas,
	  glit[0],
	  glit[1],
	  glit[2],
	  glit[3],
	  glit[4]-glit[2]/2,
	  glit[5]-glit[3]/2,
	  glit[6],
	  glit[7])
	  ctx.fillStyle=`#${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}`;
	  ctx.globalCompositeOperation="multiply";
	  ctx.fillRect(
	  glit[4]-glit[2]/2,
	  glit[5]-glit[3]/2,
	  glit[6],
	  glit[7]);
	  ctx.globalCompositeOperation="source-over";
	  }}
  }
  if(cons.ended||!cons.paused){
	  delete global.a;
	  if(global.a==undefined){ctx.fillStyle="white";ctx.fillRect(
	  0,0,ctx.canvas.width,ctx.canvas.height)}
	  ctx.drawImage(cons,0,0,ctx.canvas.width,ctx.canvas.height);
	  canvas.style.cursor="none";
	  canvas.setAttribute("class","canvas-overlay");
  }
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