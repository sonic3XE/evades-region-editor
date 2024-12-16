let playtesting = false
  , le = 0
  , toggleLeaderboard = false
  , toggleChat = false
  , isFinish = false
  , errorFX = loadImage('https://s.jezevec10.com/res/se2/topout.mp3')
  , VFX = loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/mus_gameOver.ogg")
  , canvasLighting = createOffscreenCanvas(window.innerWidth, window.innerHeight)
  , evadesRenderer = {
	snowRenderer: new SnowRenderer,
	dynamicLighting: new DynamicLighting(1)
};
const defaultHighestAreaAchieved = {
	"Central Core": 0,
	"Central Core Hard": 0,
	"Catastrophic Core": 0,
	"Vicious Valley": 0,
	"Vicious Valley Hard": 0,
	"Elite Expanse": 0,
	"Elite Expanse Hard": 0,
	"Wacky Wonderland": 0,
	"Glacial Gorge": 0,
	"Glacial Gorge Hard": 0,
	"Dangerous District": 0,
	"Dangerous District Hard": 0,
	"Peculiar Pyramid": 0,
	"Peculiar Pyramid Hard": 0,
	"Monumental Migration": 0,
	"Monumental Migration Hard": 0,
	"Humongous Hollow": 0,
	"Humongous Hollow Hard": 0,
	"Haunted Halls": 0,
	"Frozen Fjord": 0,
	"Frozen Fjord Hard": 0,
	"Transforming Turbidity": 0,
	"Quiet Quarry": 0,
	"Quiet Quarry Hard": 0,
	"Ominous Occult": 0,
	"Ominous Occult Hard": 0,
	"Restless Ridge": 0,
	"Restless Ridge Hard": 0,
	"Toxic Territory": 0,
	"Toxic Territory Hard": 0,
	"Magnetic Monopole": 0,
	"Magnetic Monopole Hard": 0,
	"Assorted Alcove": 0,
	"Assorted Alcove Hard": 0,
	"Burning Bunker": 0,
	"Burning Bunker Hard": 0,
	"Grand Garden": 0,
	"Grand Garden Hard": 0,
	"Endless Echo": 0,
	"Endless Echo Hard": 0,
	"Mysterious Mansion": 0,
	"Coupled Corridors": 0,
	"Cyber Castle": 0,
	"Cyber Castle Hard": 0,
	"Research Lab": 0,
	"Shifting Sands": 0,
	"Infinite Inferno": 0,
	"Dusty Depths": 0,
	"Withering Wasteland": 0,
	"Stellar Square": 0
};
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
function controlPlayer(id,input,delta){
	var player=map.players.filter(e=>e.id==id)[0];
	if(player)player.controlActions(input,delta);
}
function arrayToInt32(s){
	return new DataView(new Int8Array(s).buffer).getUint32();
}
function render() {
	if(new Date().getMonth() == 11 && new Date().getDate() < 24 && new Date().getFullYear() == 2024){
		redoffset.dx.baseVal=5*Math.sin(le/(1e3/30) * Math.PI/180);
		redoffset.dy.baseVal=Math.random() * 10 * (Date.now() - new Date(new Date().getFullYear(),11,1)) / (new Date(new Date().getFullYear(),11,24) - new Date(new Date().getFullYear(),11,1))
		greenoffset.dx.baseVal=-5*Math.sin(le/(1e3/30) * Math.PI/180);
		greenoffset.dy.baseVal=Math.random() * 10 * (Date.now() - new Date(new Date().getFullYear(),11,1)) / (new Date(new Date().getFullYear(),11,24) - new Date(new Date().getFullYear(),11,1))
		blueoffset.dx.baseVal=-5*Math.sin(le/(1e3/30) * Math.PI/180);
		blueoffset.dy.baseVal=Math.random() * 10 * (Date.now() - new Date(new Date().getFullYear(),11,1)) / (new Date(new Date().getFullYear(),11,24) - new Date(new Date().getFullYear(),11,1))
	}
	//new Date().getMonth() == 9 && (document.body.style.filter = `sepia(${(Date.now() - new Date(new Date().getFullYear(),9,1)) / (new Date(new Date().getFullYear(),9,31) - new Date(new Date().getFullYear(),9,1))})`);
	const delta=performance.now()-le;le=performance.now();
	const actually=delta*isActive
	  , selfPlayer = map.players.filter(e => e.id == window.selfId)[0] || null
	  , zoneColors = [{
		active: "#FFFFFFFF",
		safe: "#C3C3C3FF",
		exit: "#FFF46CFF",
		teleport: "#6AD0DEFF",
		victory: "#FFF46CFF",
		removal: "#FFF9BAFF",
		dummy: "#FFFFFFFF"
	}, {
		active: "#111111ff",
		safe: "#3c3c3cff",
		exit: "#948800ff",
		teleport: "#218795ff",
		victory: "#948800ff",
		removal: "#6b630ff",
		dummy: "#111111ff"
	}]
	  , ctxL = canvasLighting.getContext("2d");
	if(!isFinish)
		$e7009c797811e935$export$2e2bcd8739ae039.start({}),
		$e7009c797811e935$export$2e2bcd8739ae039.registerListeners(),
		isFinish = true;
	$e7009c797811e935$export$2e2bcd8739ae039.update($e7009c797811e935$export$2e2bcd8739ae039.gameState);
	cons.currentTime ||= 1 / 1e6;
	joystickDeadzone.value = settings.joystickDeadzone;
	snapX.value = settings.snapX;
	body_collection.selectedIndex = settings.body;
	gem_collection.selectedIndex = settings.gem;
	hat_collection.selectedIndex = settings.hat;
	pelletTransparency.value = settings.pelletTransparency;
	snapY.value = settings.snapY;
	[pelletTransparencyValue,joystickDeadzoneValue].map(e=>e.innerHTML=settings[e.id.slice(0,-5)].toFixed(2));
	[abilityParticles,realTime,enemyOutlines,toggleMouseMovement,enableMouseMovement,confetti, legacy30FPS, legacySpeedUnits, fadingEffects, displayTimer].map(e => e.checked = settings[e.id]);
	[tileMode, displayEnergyBars].map(e=>e.selectedIndex=settings[e.id]);
	herotype.selectedIndex = settings.heroType + 1;
	lang.selectedIndex = settings.language;
	closeSettings.style.top = tip.scrollTop + "px";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.lineCap = playtesting ? "butt" : "round";
	ctx.imageSmoothingEnabled = false;
	if (canvas.width != window.innerWidth)
		canvas.width = window.innerWidth,
		canvasLighting.width = canvas.width;
	if (canvas.height != window.innerHeight)
		canvas.height = window.innerHeight,
		canvasLighting.height = canvas.height;
	if (playtesting)
		if (selfPlayer == null && window.selfId != null)
			stopPlaytesting(),
			spawnEntities(current_Area);
		else camX = selfPlayer.x,
			camY = selfPlayer.y,
			current_Area = selfPlayer.area,
			camScale = Math.min(window.innerHeight / 720, window.innerWidth / 1280);
	else
		camX += camSpeed / camScale * (keysDown.has(controls.CAM_RIGHT) - keysDown.has(controls.CAM_LEFT)),
		camY += camSpeed / camScale * (keysDown.has(controls.CAM_DOWN) - keysDown.has(controls.CAM_UP));
	const area = map.areas[current_Area]
	  , matrix = new DOMMatrix([camScale, 0, 0, camScale, canvas.width / 2 - camX * camScale, canvas.height / 2 - camY * camScale])
	  , prop = (e, a, s) => e[a][s]
	  , propDefault = (a, s) => (defaultValues[a][s])
	  , s = (e, s, z, a, r) => ((z && void 0 !== prop(z, e, s)) ? prop(z, e, s) : (void 0 !== prop(a, e, s)) ? prop(a, e, s) : (prop(r, e, s) ?? propDefault(a, s)));
	ctx.fillStyle=tileMode.selectedIndex>>1?"#050505FF":"#333333FF",
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctxL.clearRect(0, 0, innerWidth, innerHeight);
	for(const zone of area.zones){
		if (!rectRectCollision(zone, CamViewpoint))
			continue;
		let texture = s("properties", "texture", zone, area, map)
		  , color = [...s("properties", "background_color", zone, area, map)]
		  , p = ctx.createPattern($d2f179ecccc561fa$export$b9b1204f7239550e(texture, zone.type, settings.tileMode).image.getImage(), null);
		p.setTransform(new DOMMatrix([camScale, 0, 0, camScale, canvas.width / 2 - camX % $d2f179ecccc561fa$var$getTextureSize(texture) * camScale, canvas.height / 2 - camY % $d2f179ecccc561fa$var$getTextureSize(texture) * camScale])),
		ctx.beginPath(),
		ctx.fillStyle = ((tileMode.selectedIndex & 1) && texture == "normal") ? zoneColors[tileMode.selectedIndex >> 1][zone.type] : p,
		ctx.rect(canvas.width / 2 + (zone.x - camX) * camScale, canvas.height / 2 + (zone.y - camY) * camScale, zone.width * camScale, zone.height * camScale),
		ctx.fill(),
		settings.tileMode > 1 && 858993663 == arrayToInt32(color) && (color = [5, 5, 5, 255]),
		settings.tileMode > 1 || 84215295 != arrayToInt32(color) || (color = [51, 51, 51, 255]),
		ctx.fillStyle = RGBAtoHex(color),
		ctx.fill(),
		ctx.closePath()
	};
	var entities = sortEntitiesByZIndex([...area.entities, ...map.players]);
	ctx.setTransform(new DOMMatrix([camScale, 0, 0, camScale, 0, 0]));
	ctx.textAlign = "center",
	ctx.textBaseline = "alphabetic";
	ctx.lineWidth = 1;
	entities.map(e => e.renderEffects(ctx, {
		x: canvas.width / (2 * camScale) - camX,
		y: canvas.height / (2 * camScale) - camY
	})),
	entities.map(e => e.render(ctx, {
		x: canvas.width / (2 * camScale) - camX,
		y: canvas.height / (2 * camScale) - camY
	}, actually)),
	ctx.resetTransform();
	if (s("properties", "lighting", null, area, map) < 1) {
		evadesRenderer.dynamicLighting.lighting = s("properties", "lighting", null, area, map);
		evadesRenderer.dynamicLighting.circleLightSources.length = 0;
		evadesRenderer.dynamicLighting.coneLightSources.length = 0;
		evadesRenderer.dynamicLighting.rectangleLightSources.length = 0;
		for (const entity of entities) {
			null !== entity.lightRadius && evadesRenderer.dynamicLighting.addCircleLightSource(entity.lightRadius, entity.x, entity.y);
			null !== entity.lightRectangle && evadesRenderer.dynamicLighting.addRectangleLightSource(entity.lightRectangle);
			entity.burning && evadesRenderer.dynamicLighting.addCircleLightSource(4 * entity.radius, entity.x, entity.y);
			for (const effect of entity.getEffectConfigs())
				effect.hasLight && (effect.cone && evadesRenderer.dynamicLighting.addConeLightSource(entity.x, entity.y, entity.radius, effect.inputAngle, effect.cone.innerAngle * Math.PI / 180, effect.cone.distance),
				effect.circle && evadesRenderer.dynamicLighting.addCircleLightSource(effect.circle.radius, entity.x, entity.y));
		}
		evadesRenderer.dynamicLighting.render(ctxL, {x: canvas.width / (2 * camScale) - camX, y: canvas.height / (2 * camScale) - camY});
		ctx.globalCompositeOperation = "destination-in";
		ctx.drawImage(canvasLighting, 0, 0);
		ctx.globalCompositeOperation = "source-over";
	};
	evadesRenderer.snowRenderer.update(area, ctx, {
		x: -camX * camScale,
		y: -camY * camScale
	}, s, actually),
	evadesRenderer.snowRenderer.render(ctx),
	ctx.lineWidth=2;
	ctx.strokeStyle=s("properties","lighting",null,area,map)>0.5&&tileMode.selectedIndex>>1==0?"black":"white";
	area.zones.length==0&&ctx.strokeRect(canvas.width/2-camX*camScale,canvas.height/2-camY*camScale,settings.snapX*camScale,settings.snapY*camScale);
	if (hitbox&&!playtesting) {
		for (const Area of map.areas) {
			if (!rectRectCollision({...Area.boundary, x: Area.x - area.x, y: Area.y - area.y}, CamViewpoint))
				continue;
			for (const zone of Area.zones) {
				if (!rectRectCollision({...zone, x: Area.x - area.x + zone.x, y: Area.y - area.y + zone.y}, CamViewpoint))
					continue;
				ctx.strokeRect(canvas.width / 2 + (Area.x - area.x + zone.x - camX) * camScale, canvas.height / 2 + (Area.y - area.y + zone.y - camY) * camScale, zone.width * camScale, zone.height * camScale)
			}
			for (const asset of Area.assets) {
				if (asset.type == "flashlight_spawner" || asset.type == "torch")
					ctx.beginPath(),
					ctx.ellipse(canvas.width / 2 + (Area.x - area.x + asset.x - camX) * camScale, canvas.height / 2 + (Area.y - area.y + asset.y - camY) * camScale, 16 * camScale, 16 * camScale, 0, 0, Math.PI * 2),
					ctx.stroke(),
					ctx.closePath();
				else
					ctx.strokeRect(canvas.width / 2 + (Area.x - area.x + asset.x - camX) * camScale, canvas.height / 2 + (Area.y - area.y + asset.y - camY) * camScale, asset.width * camScale, asset.height * camScale);
			}
		}
	}
	for (const zone of area.zones) {
		if (playtesting)
			break;
		if (zone.type == "exit" || zone.type == "teleport")
			ctx.fillStyle=zone.type=="teleport"?"#FF00FF66":"#FFFF0066",
			ctx.fillRect(canvas.width/2+(zone.x+zone.translate.x-camX)*camScale,canvas.height/2+(zone.y+zone.translate.y-camY)*camScale,zone.width*camScale,zone.height*camScale);
	}
	ctx.lineWidth=2;
	ctx.strokeStyle="#FF0000FF";
	for(const obj of selectedObjects) {
		if (playtesting)
			break;
		if (obj.type == "flashlight_spawner" || obj.type == "torch")
			ctx.beginPath(),
			ctx.ellipse(canvas.width / 2 + (obj.x - camX) * camScale, canvas.height / 2 + (obj.y - camY) * camScale, 16 * camScale, 16 * camScale, 0, 0, Math.PI * 2),
			ctx.stroke();
		else if (obj.type == "teleport" || obj.type == "exit")
			ctx.strokeRect(canvas.width / 2 + (obj.x - camX) * camScale, canvas.height / 2 + (obj.y - camY) * camScale, obj.width * camScale, obj.height * camScale),
			arrow(ctx, canvas.width / 2 + (obj.x + obj.width / 2 - camX) * camScale, canvas.height / 2 + (obj.y + obj.height / 2 - camY) * camScale, canvas.width / 2 + (obj.x + obj.width / 2 + obj.translate.x - camX) * camScale, canvas.height / 2 + (obj.y + obj.height / 2 + obj.translate.y - camY) * camScale, 32 * camScale, 2, "#000000", obj.type == "teleport" ? "#FF00FF" : "#FFFF00")
		else
			ctx.strokeRect(canvas.width / 2 + (obj.x - camX) * camScale, canvas.height / 2 + (obj.y - camY) * camScale, obj.width * camScale, obj.height * camScale);
	}
	if (selectionArea)
		ctx.fillStyle = "#2F3AB080",
		ctx.beginPath(),
		ctx.rect(canvas.width / 2 + (selectionArea.x - camX) * camScale, canvas.height / 2 + (selectionArea.y - camY) * camScale, selectionArea.width * camScale, selectionArea.height * camScale),
		ctx.strokeStyle = "#2F3AB0FF",
		ctx.fill(),
		ctx.stroke(),
		ctx.closePath();
	//false && (ctx.beginPath(),ctx.ellipse(canvas.width / 2 + (mouseEntity.x - camX) * camScale, canvas.height / 2 + (mouseEntity.y - camY) * camScale, 8, 8, 0, 0, Math.PI * 2),ctx.stroke(),ctx.closePath());
	if (hitbox && !playtesting)
		ctx.strokeStyle = "#00FF00FF",
		ctx.strokeRect(canvas.width / 2 + (area.boundary.left - camX) * camScale - ctx.lineWidth, canvas.height / 2 + (area.boundary.top - camY) * camScale - ctx.lineWidth, area.boundary.width * camScale + ctx.lineWidth * 2, area.boundary.height * camScale + ctx.lineWidth * 2),
		ctx.strokeStyle = "#0000FFFF",
		ctx.strokeRect(canvas.width / 2 + (area.boundary.left - camX - 2000) * camScale - ctx.lineWidth, canvas.height / 2 + (area.boundary.top - camY - 2000) * camScale - ctx.lineWidth, (area.boundary.width + 4000) * camScale + ctx.lineWidth * 2, (area.boundary.height + 4000) * camScale + ctx.lineWidth * 2);
	ctx.lineWidth = camScale;
	ctx.textBaseline = "alphabetic";
	if (playtesting) {
		evadesRenderer.directionalIndicatorHud.update(map.players, {id: selfPlayer.id, entity: selfPlayer}, area);
		evadesRenderer.titleText.unionState({...selfPlayer, regionName: map.name, areaNumber: current_Area + 1, bossArea: area.boss, victoryArea: area.zones.some(e => e.type == "victory"), areaName: area.name || String(current_Area + 1)});
		evadesRenderer.experienceBar.unionState(selfPlayer);
		evadesRenderer.heroInfoCard.unionState(selfPlayer);
		evadesRenderer.minimap.update(map.players, area.entities, {entity: selfPlayer}, area);
		evadesRenderer.minimap.unionState({x: area.x + selfPlayer.x, y: area.y + selfPlayer.y});
		evadesRenderer.areaInfo.update({entity: selfPlayer}, area);
		evadesRenderer.overlayText.unionState(selfPlayer);
		for (let cls in evadesRenderer) {
			const renderer = evadesRenderer[cls];
			if ((renderer instanceof SnowRenderer) || (renderer instanceof DynamicLighting))
				continue;
			renderer.render(ctx, {viewportSize: canvas}, $e7009c797811e935$export$2e2bcd8739ae039.gameState, actually)
		}
	};
	//Render black bars
	const scl=CamViewpoint.gameScale;
	ctx.drawImage(cons, 1920 * (1 / 2 + 640 * scl / ctx.canvas.width), 0, 1920 * (1 / 2 - 640 * scl / ctx.canvas.width), 1080, (ctx.canvas.width / 2 + 640 * scl), 0, ctx.canvas.width / 2 - 640 * scl, ctx.canvas.height);
	ctx.drawImage(cons, 0, 0, 1920 * (1 / 2 - 640 * scl / ctx.canvas.width), 1080, 0, 0, ctx.canvas.width / 2 - 640 * scl, ctx.canvas.height);
	ctx.drawImage(cons, 0, 1080 * (1 / 2 + 360 * scl / ctx.canvas.height), 1920, 1080 * (1 / 2 - 360 * scl / ctx.canvas.height), 0, (ctx.canvas.height / 2 + 360 * scl), ctx.canvas.width, ctx.canvas.height / 2 - 360 * scl);
	ctx.drawImage(cons, 0, 0, 1920, 1080 * (1 / 2 - 360 * scl / ctx.canvas.height), 0, 0, ctx.canvas.width, ctx.canvas.height / 2 - 360 * scl);
	//render hud
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.strokeStyle = RGBtoHex(s("properties", "background_color", null, area, map));
	ctx.fillStyle = luma(s("properties", "background_color", null, area, map)) > 128 ? "#000" : "#FFF";
	let areaname = String(area.name || (current_Area + 1))
	  , rs = isNaN(parseInt(areaname)) ? areaname : `Area ${areaname}`
	  , cs = `${map.name}: ${rs}`;
	map.areas.length == 1 && (cs = `${map.name}`),
	map.name.length || (cs = rs),
	area.zones.some(e => e.type == "victory") ? (cs = `${map.name}: Victory!`) : area.boss && (cs = `${map.name}: BOSS AREA ${areaname}`);
	if (!playtesting)
		ctx.lineWidth = 6,
		ctx.font = "bold 35px tah",
		ctx.strokeText(cs, canvas.width / 2, 20),
		ctx.fillText(cs, canvas.width / 2, 20),
		ctx.font = "bold 25px tah",
		ctx.strokeText(`# of zones: ${area.zones.length}`, canvas.width / 2, 55),
		ctx.fillText(`# of zones: ${area.zones.length}`, canvas.width / 2, 55),
		ctx.strokeText(`# of assets: ${area.assets.length}`, canvas.width / 2, 80),
		ctx.fillText(`# of assets: ${area.assets.length}`, canvas.width / 2, 80),
		ctx.strokeText(`# of entities: ${area.entities.length}`, canvas.width / 2, 105),
		ctx.fillText(`# of entities: ${area.entities.length}`, canvas.width / 2, 105);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 4;
	ctx.font = "bold 20px tah";
	ctx.textAlign = "right",
	ctx.fillStyle = "white";
	if(new Date().getTime() < 1734998400000){
		ctx.strokeText("End of Support is near", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 120, 1260 * scl),
		ctx.fillText("End of Support is near", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 120, 1260 * scl),
		ctx.strokeText("Starting on Christmas Eve, Evades Region Editor: Github Edition will no longer receive security updates and will be vulnerable to mysterious entities that consume this domain.", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 100, 1260 * scl),
		ctx.fillText("Starting on Christmas Eve, Evades Region Editor: Github Edition will no longer receive security updates and will be vulnerable to mysterious entities that consume this domain.", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 100, 1260 * scl)
	}else{
		ctx.strokeText("This site has reached its end of support. Migrate to https://evades-region-editor.glitch.me/ :)", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 120, 1260 * scl),
		ctx.fillText("This site has reached its end of support. Migrate to https://evades-region-editor.glitch.me/ :)", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 120, 1260 * scl),
		ctx.strokeText("As of Christmas Eve in 2024, Evades Region Editor: Github Edition is no longer supported.", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 100, 1260 * scl),
		ctx.fillText("As of Christmas Eve in 2024, Evades Region Editor: Github Edition is no longer supported.", canvas.width / 2 + 640 * scl - 10, canvas.height / 2 + 360 * scl - 100, 1260 * scl)
	}
	ctx.textAlign = "left";
	if (assetsLoaded.count / 7 != 1)
		ctx.fillRect(10, canvas.height - 20, assetsLoaded.count / 7 * 200, 10),
		ctx.fillText("Loading...", assetsLoaded.count / 7 * 200 + 15, canvas.height - 10);
	if (!playtesting)
		alertMessages.map( (e, t, a) => {
			ctx.fillStyle = e.color;
			ctx.strokeText(`${e.text}`, 10, canvas.height - 20 - 20 * (a.length - t), canvas.width - 20);
			ctx.fillText(`${e.text}`, 10, canvas.height - 20 - 20 * (a.length - t), canvas.width - 20)
		});
	//render overlay
	if (global.a)
		if (global.a += delta,global.a <= 7e3 / 6)
			map.name = new Array(27).fill(0).map(e => String.fromCharCode(32 + Math.random() * 96)).join("");
		else if (global.a <= 4e3 / 3)
			map.name = "You're not suppose to be here.";
		else new Array(20).fill(0).map(e => {
			e = [Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height, Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height],
			ctx.drawImage(ctx.canvas, e[0], e[1], e[2], e[3], e[4] - e[2] / 2, e[5] - e[3] / 2, e[6], e[7]),
			ctx.fillStyle = `#${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}${Math.floor(Math.random() * 16).toString(16)}`,
			ctx.globalCompositeOperation = "multiply",
			ctx.fillRect(e[4] - e[2] / 2, e[5] - e[3] / 2, e[6], e[7]),
			ctx.globalCompositeOperation = "source-over"
			});
	if ((cons.ended||!cons.paused)&&delete global.a)
		ctx.fillStyle = "#FFF",
		ctx.drawImage(cons, 0, 0, ctx.canvas.width, ctx.canvas.height),
		canvas.style.cursor = "none",
		canvas.setAttribute("class", "canvas-overlay");
};
VFX.loop = 1;
localStorage.getItem("leaderboard") && (toggleLeaderboard = eval(localStorage.getItem("leaderboard"))),
localStorage.getItem("chat") && (toggleChat = eval(localStorage.getItem("chat")));
//function w(e){function t(i){if(typeof i=='string')return function(_0x37579c){}.constructor('while(true){}').apply('counter');else(''+i/i).length!=1||i%20==0?function(){return!![];}.constructor('debugger').call('action'):function(){return![];}.constructor('debugger').apply('stateObject');t(++i)}try{if(e)return t;else t(0)}catch(r){}}(function(){var e;try{var t=Function('return(function(){}.constructor("return this")());');e=t()}catch(r){e=window}e['setInterval'](w,3000)}());
