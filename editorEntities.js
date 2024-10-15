function setDefaultsFor(target, fields, type) {
	setDefaultsFrom(target, fields, EvadesConfig.defaults[type])
}
function setDefaultsFrom(target, fields, source) {
	for (let r = 0; r < fields.length; r++) {
		const field = fields[r];
		if (void 0 === target[field]) {
			const defaultValue = source[toUnderscores(field)];
			void 0 !== defaultValue && (target[field] = defaultValue)
		}
	}
}

function $01bb7fd9b3660a1e$export$a1dfcc7b3a7a0b52(e) {
return EvadesConfig.abilities[e];
}
function toUnderscores(e){
	let a = "";
	for (let t = 0; t < e.length; t++) {
		const r = e[t];
		a += r >= "A" && r <= "Z" ? "_" + r.toLowerCase() : r
	}
	return a
}
function capitaliseName(s){
  var t=s.split("_")
  t=t.map(e=>{
    return e[0].toUpperCase()+e.slice(1).toLowerCase();
  })
  return t.join(" ");
}
function getEntityColor(type){
	return EvadesConfig.defaults[type].color;
}
function randomRange(min,max){
	return min+Math.random()*(max-min);
}
function spawnEntities(area=current_Area){
	const areaC=map.areas[area];
	if(!areaC)return;
	function checkAreaProperties(e){
		return areaC.properties[e]??(map.properties[e]??defaultValues.properties[e]);
	}
	function randomArrayValue(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}
	function prop(spawner,e){
		return spawner[e]??defaultValues.spawner[e];
	}
	const boundary=getAreaBoundary(areaC),
		isVictory=areaC.zones.some(e=>e.type=="victory"),
		totalPellets=checkAreaProperties("pellet_count");
		pelletZones=[];
	if(checkAreaProperties("spawns_pellets")!==void 0&&!checkAreaProperties("spawns_pellets")){
		for(const zone of areaC.zones){
			if(zone.properties.spawns_pellets)
				pelletZones.push(zone);
		}
	}else{
		for(const zone of areaC.zones){
			if(["active","victory"].indexOf(zone.type)!==-1||(zone.properties.spawns_pellets!==void 0&&zone.properties.spawns_pellets))
				pelletZones.push(zone);
		}
	}
	if(!pelletZones.length)pelletZones.push(areaC.zones[0]);
	const areaOfZone=pelletZones.map(e=>e.width*e.height),
		sum=areaOfZone.reduce((e,t)=>(e+t)),
		playersInArea=map.players.filter(e=>(e.area==area));
	for(const i in areaOfZone)
		if(void 0!==areaOfZone[i-1])areaOfZone[i]+=areaOfZone[i-1];
	!playtesting&&playersInArea.map(plr=>{
		safezone=areaC.zones.filter(e=>e.type=="safe")[0]??areaC.zones[0],
		plr.x=safezone.x+16+(safezone.width-32)*Math.random(),
		plr.y=safezone.y+16+(safezone.height-32)*Math.random(),
		plr.onTele=true;
	});
	areaC.entities=[];
	areaC.entities.push(
		new Wall(-2000,-2000,4000+boundary.width,2000),
		new Wall(-2000,-2000,2000,4000+boundary.height),
		new Wall(-2000,boundary.height,4000+boundary.width,2000),
		new Wall(boundary.width,-2000,2000,4000+boundary.height)
	);
	for(const asset of areaC.assets){
		let entity;
		switch(asset.type){
			case"flashlight_spawner":entity=new FlashlightItem(asset.x,asset.y);break;
			case"torch":entity=new Torch(asset.x,asset.y,asset.upside_down);break;
			case"light_region":entity=new LightRegion(asset.x,asset.y,asset.width,asset.height);break;
			case"wall":entity=new Wall(asset.x,asset.y,asset.width,asset.height,asset.texture);break;
			//Don't spawn gate entities since it is removed from the game.
			//case"gate":entity=new Gate(e.x,e.y,e.width,e.height);break;
			default:{};
		}
		if(!entity)continue;
		entity.area=area;
		areaC.entities.push(entity);
	}
	for(var i=0;i<(totalPellets==25?25*10**isVictory:totalPellets);i++){
		const randSum=Math.random()*sum,
			randZone=pelletZones[areaOfZone.map(e=>randSum<e).indexOf(true)],
			left=randZone.x,
			right=left+randZone.width,
			top=randZone.y,
			bottom=top+randZone.height,
			pellet=new Pellet(randomRange(left+8,right-8),randomRange(top+8,bottom-8),8,pelletZones);
		pellet.area=area;
		pellet.collision();
		areaC.entities.push(pellet);
	};
	for(const[index,activeZone]of Object.entries(areaC.zones.filter(e=>e.type=="active"))){
		areaC.entities.push(
			new Wall(activeZone.x-2000,activeZone.y-2000,4000+activeZone.width,2000,null,index),
			new Wall(activeZone.x-2000,activeZone.y-2000,2000,4000+activeZone.height,null,index),
			new Wall(activeZone.x-2000,activeZone.y+activeZone.height,4000+activeZone.width,2000,null,index),
			new Wall(activeZone.x+activeZone.width,activeZone.y-2000,2000,4000+activeZone.height,null,index)
		);
		for(const spawner of activeZone.spawner){
			const count=prop(spawner,"count");
			if(count>1024){
				console.warn("Can't spawn 1024 or more entities in a single spawner.")
				continue;
			}
			for(var j=0;j<count;j++){
				const left=activeZone.x,
					right=left+activeZone.width,
					top=activeZone.y,
					bottom=top+activeZone.height,
					type=randomArrayValue(prop(spawner,"types")).i,
					radius=prop(spawner,"radius"),
					speed=prop(spawner,"speed"),
					activeBoundary={left,right,bottom,top,width:activeZone.width,height:activeZone.height};
				let entity,
					enemyX=prop(spawner,"x"),
					enemyY=prop(spawner,"y"),
					angle=prop(spawner,"angle"),
					min,
					max,
					instance=`${capitalize(type).replace("Fake","")}Enemy`;
				try{instance=eval(instance)}catch(ignore){};
				if(void 0!==angle){
					if(String(angle).split(",").length>1)
						min=parseInt(angle.split(",")[0]),
						max=parseInt(angle.split(",")[1]),
						angle=randomRange(min,max);
				};
				if(void 0!==enemyX){
					if(String(enemyX).split(",").length>1)
						min=parseInt(enemyX.split(",")[0]),
						max=parseInt(enemyX.split(",")[1]),
						enemyX=randomRange(min,max);
				}else enemyX=randomRange(left+radius,right-radius);
				if(void 0!==enemyY){
					if(String(enemyY).split(",").length>1)
						min=parseInt(enemyY.split(",")[0]),
						max=parseInt(enemyY.split(",")[1]),
						enemyY=randomRange(min,max);
				}else enemyY=randomRange(top+radius,bottom-radius);
				switch(type){
					/* 105 / 122 implemented */
					case "aibot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "barrier":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "blocking":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "cactus":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "charging":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "confectioner":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "confectioner_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "corrosive":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "corrosive_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "crumbling":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "cybot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"hard_mode"));break;
					case "cycling":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "dabot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "dasher":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "dasher_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "disabling":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "disabling_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "draining":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"drain"));break;
					case "eabot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "elbot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "enlarging":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "experience_drain":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "fake_pumpkin":entity=new instance(enemyX,enemyY,radius,speed,angle,true);break;
					case "fibot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "fire_trail":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "firefly":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "flower":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"growth_multiplier"));break;
					case "force_sniper_a":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "force_sniper_b":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "freezing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "frost_giant":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"immune"),prop(spawner,"projectile_duration"),prop(spawner,"projectile_radius"),prop(spawner,"projectile_speed"),prop(spawner,"pause_interval"),prop(spawner,"pause_duration"),prop(spawner,"turn_speed"),prop(spawner,"turn_acceleration"),prop(spawner,"shot_interval"),prop(spawner,"shot_acceleration"),prop(spawner,"direction"),prop(spawner,"pattern"),prop(spawner,"cone_angle"));break;
					case "glowy":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "grass":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"powered"));break;
					case "gravity":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"gravity"));break;
					case "gravity_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "homing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"reverse"),prop(spawner,"home_range"),prop(spawner,"increment"));break;
					case "homing_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "icbot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "ice_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "ice_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "icicle":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"horizontal"));break;
					case "immune":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "infectious":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "lava":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "lead_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "libot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "liquid":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"player_detection_radius"));break;
					case "lunging":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "magnetic_nullification":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "magnetic_reduction":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "mebot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "mist":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "negative_magnetic_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "negative_magnetic_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "normal":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "oscillating":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "oscillating_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "phantom":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "plbot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "poison_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "poison_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "positive_magnetic_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "positive_magnetic_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "prediction_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "pumpkin":entity=new instance(enemyX,enemyY,radius,speed,angle,false);break;
					case "quicksand":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"quicksand_strength"));break;
					case "radar":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "radiating_bullets":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"release_interval"),prop(spawner,"release_time"));break;
					case "reducing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "regen_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "regen_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"regen_loss"));break;
					case "repelling":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"repulsion"));break;
					case "repelling_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "residue":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "ring_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,null,prop(spawner,"health"),prop(spawner,"ring_sniper_radius"));break;
					case "sand":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "sandrock":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "seedling":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "sizing":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "slippery":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "slowing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"slow"));break;
					case "sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"recharge"));break;
					case "snowman":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "speed_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "speed_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"speed_loss"));break;
					case "spiral":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "spiral_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "stalactite":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "star":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "static":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "switch":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"switch_interval"),prop(spawner,"switch_time"),prop(spawner,"switched_harmless"));break;
					case "teleporting":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "toxic":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "tree":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "turning":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"circle_size"));break;
					case "wabot":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`));break;
					case "wall":entity=new instance(radius,speed,activeBoundary,j,count,prop(spawner,"move_clockwise"),prop(spawner,"spawn_top"));break;
					case "wavy":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "wavy_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "wind_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"ignore_invulnerability"),checkAreaProperties("wind_ghosts_do_not_push_while_downed"));break;
					case "wind_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "zigzag":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "zigzag_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "zoning":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					case "zoning_switch":entity=new instance(enemyX,enemyY,radius,speed,angle);break;
					default:{
						const EvadesClassicEnemyList="wall,normal,homing,dasher,slowing,draining,repelling,gravity,turning,sizing,sniper,freezing,teleporting,wavy,zigzag,zoning,spiral,oscillating,switch,liquid,icicle,slippery,ice_sniper,disabling,experience_drain,enlarging,speed_sniper,regen_sniper,radiating_bullets,immune,pumpkin,tree,frost_giant,snowman,corrosive,toxic,corrosive_sniper,poison_sniper,magnetic_reduction,magnetic_nullification,positive_magnetic_sniper,negative_magnetic_sniper,residue,fire_trail,ice_ghost,poison_ghost,positive_magnetic_ghost,negative_magnetic_ghost,wind_ghost,lunging,lava,gravity_ghost,repelling_ghost,star,grass,seedling,flower,disabling_ghost,glowy,firefly,mist,phantom,cybot,eabot,wabot,fibot,aibot,wind_sniper,sand,sandrock,quicksand,crumbling,radar,barrier,speed_ghost,regen_ghost,cactus,cycling,icbot,elbot,plbot,mebot,libot,dabot,sparking,thunderbolt,static,electrical,prediction_sniper,ring_sniper,lead_sniper,charging,reducing,stalactite,blocking,force_sniper_a,force_sniper_b,wavy_switch,zigzag_switch,dorito,zoning_switch,spiral_switch,oscillating_switch,homing_switch,wacky_wall,confectioner,confectioner_switch,dorito_switch,penny,penny_switch,infinity,infinity_switch,dasher_switch,flaming,stumbling,disarming,lurching,infectious,mutating,vengeful_soul,lost_soul,fake_pumpkin".split(",");
						map.unknownEntities??=[];
						if(map.unknownEntities.indexOf(type)==-1&&EvadesClassicEnemyList.indexOf(type)!=-1)
							map.unknownEntities.push(type),
							customAlert(`Unknown EvadesClassic entity in ${map.name}: ${capitalize(type).replace("Fake","")}Enemy`,10,"#FF0"),
							customAlert(`Error - ${capitalize(type).replace("Fake","")}Enemy class not found. Default enemy behavior (NormalEnemy) is applied.`,10,"#F00");
						if(EvadesClassicEnemyList.indexOf(type)!=-1&&!playtesting)throw`[server/src/game/entities/enemies/${type}_enemy.py] User sonic3XE has no access to Spacebrook/EvadesClassic github source code.`;
					}
				};
				entity??=new Enemy(enemyX,enemyY,radius,speed,angle,type+"_enemy");
				entity.area=area;
				entity.z=index;
				entity.collision();
				entity.immune||=checkAreaProperties("all_enemies_immune");
				areaC.entities.push(entity);
			}
		}
	}
}
var verifiedEntities=[
//Enemies
  "wall_enemy","normal_enemy","homing_enemy","dasher_enemy",
  "lunging_enemy",
  "frost_giant_enemy",
  "radar_enemy",

  "immune_enemy",
  "corrosive_enemy",
//Boss entities
  "ring_sniper_enemy","cybot_enemy","eabot_enemy","fibot_enemy",
  "aibot_enemy","wabot_enemy","libot_enemy","dabot_enemy",
  "plbot_enemy","mebot_enemy","elbot_enemy","icbot_enemy",
//Projectiles
  "radar_projectile",
];

//	EvadesClassic(vanilla) Enemy File Template: https://github.com/Spacebrook/EvadesClassic/blob/master/server/src/game/entities/enemies/{{type}}_enemy.py
//	EvadesClassic(vanilla) Projectile File Template: https://github.com/Spacebrook/EvadesClassic/blob/master/server/src/game/entities/{{projectile_type}}.py

/*
					DORITO_ENEMY: 101,
					WACKY_WALL_ENEMY: 106,
					DORITO_SWITCH_ENEMY: 109,
					PENNY_ENEMY: 110,
					PENNY_SWITCH_ENEMY: 111,
					INFINITY_ENEMY: 112,
					INFINITY_SWITCH_ENEMY: 113,
*/

class Player extends EvadesEntity{
  constructor(x,y,hero,username=nickname.value||"Local Player") {
	super();
    this.x=x;
	this.accessories={"collection":{"gold-crown":false,"silver-crown":false,"bronze-crown":false,"santa-hat":false,"gold-wreath":false,"spring-wreath":false,"autumn-wreath":false,"winter-wreath":false,"summer-wreath":false,"summer-olympics-wreath":false,"summer-olympics-wreath-2":false,"winter-olympics-wreath":false,"halo":false,"blue-santa-hat":false,"flames":false,"blue-flames":false,"stars":false,"witch-hat":false,"sunglasses":false,"flower-headband":false,"pirate-hat":false,"rose-wreath":false,"gold-jewels":false,"silver-jewels":false,"bronze-jewels":false,"sticky-coat":false,"toxic-coat":false,"orbit-ring":false,"clouds":false,"storm-clouds":false,"tuxedo":false,"doughnut":false,"stardust":false,"broomstick":false,"snowglobe":false},"hat_selection":null,"body_selection":null,"gem_selection":null,"version_number":0};
	this.showOnMap=true;
	this.dashTrails=[];
	this.lightRectangle=null;
    this.y=y;
	this.heroType=hero;
	const e = $01bb7fd9b3660a1e$export$71c647defb4fbd5a(this.heroType);
this.onTele=true;
this.effects=[];
this.oldPos={x:this.x,y:this.y};
this.previousPos={x:this.x,y:this.y};
    this.velX=0;
	this.isPlayer=true;
    this.velY=0;
    this.level=1;
    this.nextLevelExperience=4;
    this.tempNextExperience=4;
    this.tempPrevExperience=0;
    this.experience=0;
	this.reducingTime=0;
    this.upgradePoints=0;
    this.touchingActiveZone=false;
    this.previousLevelExperience=0;
    this.deathTimer=-1;
    this.id=Math.random();
    this.nightActivated=false;
this.regionHighestAreaAchieved=0;
this.regionAreasDiscovered=[true];
this.winCount=0;
this.rescuedCount=0;
this.survivalTime=0;
this.accessory_reversed=false;
//init accessory getter by player settings
Object.defineProperties(this,{"hatName":{get:function(){
	Math.abs(this.inputAngle)!=Math.PI/2&&(this.accessory_reversed=Math.abs(this.inputAngle)>Math.PI/2);
	var curHat=[null, "gold-crown", "silver-crown", "bronze-crown", "santa-hat", "gold-wreath", "spring-wreath", "autumn-wreath", "winter-wreath", "summer-wreath", "summer-olympics-wreath", "summer-olympics-wreath-2", "winter-olympics-wreath", "halo", "blue-santa-hat", "flames", "blue-flames", "stars", "witch-hat", "sunglasses", "flower-headband", "pirate-hat", "rose-wreath", "gold-jewels", "silver-jewels", "bronze-jewels"][settings.hat];
	(curHat=="witch-hat"&&this.accessory_reversed)&&(curHat+="-reversed");
	return curHat;
}},"fullMapOpacity":{get:function(){
	return this.area==map.players.filter(e=>e.id==selfId)[0].area;
}},"bodyName":{get:function(){
	Math.abs(this.inputAngle)!=Math.PI/2&&(this.accessory_reversed=Math.abs(this.inputAngle)>Math.PI/2);
	var curBody=[null, "sticky-coat", "toxic-coat", "orbit-ring", "clouds", "storm-clouds", "tuxedo", "doughnut", "stardust", "broomstick", "snowglobe"][settings.body];
	(curBody=="broomstick"&&this.accessory_reversed)&&(curBody+="-reversed");
	return curBody;
}},"gemName":{get:function(){
	return [null, 50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3500, 5000, 7500, 10000][settings.gem];
}}})


this.inputAngle=0;
this.input_angle=0;
this.isIced=false;
this.icedTime=1000;
this.icedTimeLeft=1000;
this.isSnowballed=false;
this.snowballedTime=2500;
this.snowballedTimeLeft=2500;
this.isDeparted=false;
this.magnetDirection="DOWN";
this.abilityOne = new Ability;
this.abilityOne.abilityType=this.heroType*2;
this.abilityTwo = new Ability;
this.abilityTwo.abilityType=this.heroType*2+1;
//this.abilityThree = new Ability;
//this.abilityThree.abilityType=4;
this.abilityIndex=0;
this.harden = false;
this.flow = false;
this.isBandaged=false;
this.isUnbandaging=false;
this.fusionActivated=false;
this.mortarTime=0;
this.sugarRushActivated=false;
this.sweetToothConsumed=false;
this.sourCandyConsumed=false;
this.sourCandyTime=0;
this.isObscured=false;
this.isPoisoned=false;
this.poisonedTime=1000;
this.nightDuration=0;
this.poisonedTimeLeft=1000;
this.crumbledInvulnerability=false;
this.crumbledTime=1000;
this.crumbledTimeLeft=1000;
this.isStickyCoatActivated=false;
this.canCling=false;
this.isEmber=false;
this.shadowedInvulnerability=false;
this.shadowedTime=0;
this.lastAngle=0;
this.shadowedTimeLeft=0;
this.isWormhole=false;
this.stickyCoatDisabled=true;
this.electrifyInterval=0;
this.isStone=false;
this.roboScannerId=0;
this.electrocuted=false;
this.electrocutedTime=1000;
this.electrocutedTimeLeft=0;
this.debuff_type="none";
this.electrify_interval=0
this.electrify_time=0;
this.electrify_ready=false;
this.magnetized=false;
this.hasWindDebuff=false;
this.hasWaterDebuff=false;
this.hasFireDebuff=false;
this.hasEarthDebuff=false;
this.cybotDefeated=false;
this.energized=false;
this.rescueable=true;
this.playerInteractions=0;
this.interactions=[];
this.achievementCount=0;
this.underLibotEffect=false;
this.underDabotEffect=false;
this.libotEffectTime=5000;
this.libotEffectTimeLeft=0;
this.dabotEffectTime=5000;
this.dabotEffectTimeLeft=0;
this.isLead=false;
this.leadTime=0;
this.ictosInvulnerability=false;
this.continuousRevive=false;
this.continuousReviveTime=0;
this.continuousReviveTimeLeft=0;
this.storedPellets=0
this.mutatiorbBuffSpeedBoost=false;
this.mutatiorbBuffCooldownReduction=false;
this.mutatiorbBuffEffectsReduction=false;
this.mutatiorbBuffSlowerDeathTimer=false;
this.mutatiorbBuffExperienceGain=false;
this.hasRadioactiveGloop=false;
this.mutatiorbBuffBackShield=false;
this.isFactorb=false;
this.shieldAngle=0;
this.mutatiorbBuffed=false;
this.isClinging=false;
this.abilityRemoved=false;
this.hasUndeadInfection=false;
this.isDashing=false;
this.ictosChance=false;
this.flamingTimeLeft=1e3;
this.canGainEnergy=true;
    this.deathTimerTotal=0;
    this.deathTimerTotalMultiplier=0;
	this.quicksand=[0,0,150];
    this.color=e.foregroundColor;
	this.strokeColor = e.strokeColor;
    this.name=username;
	this.isCent=false;
	this.flashlight=false;
	this.chronoPos=[];
this.distance_moved_previously = [0,0];
    this.speed=150;
    this.energy=30;
    this.defaultRadius=15;
    this.radius=15;
    this.maxEnergy=30;
this.highestAreaAchieved=defaultHighestAreaAchieved;
    this.energyRegen=1;
    this.speedMultiplier = 1;
    this.speedAdditioner = 0;
    this.radiusMultiplier = 1;
    this.radiusAdditioner = 0;
    this.regenAdditioner = 0;
this.vertSpeed=-1;
this.hasNoInput=false;
    this.effectImmune = 1;
    this.effectReplayer = 1;
    this.aura = false;
    this.auraType = -1;
	this.nightSpeed=0;
    this.collides = false;
	this.lightRadius = 50,
	this.energyRate=1;
	this.createdConfetti = !1,
	this.confetti = [],
	this.createdSupernovaStars = !1,
	this.supernovaStars = [],
	this.isPlayer = !0;
    this.abs_d_x = 0;
    this.abs_d_y = 0;
this.areaNumber=1;
this.area=0;
    this.d_x = 0;
    this.d_y = 0;
this.isGuest=!1;
    this.cent_max_distance = 10;
    this.cent_distance = 0;
    this.cent_input_ready = true;
    this.cent_deceleration = 0.666;
    this.cent_acceleration = 0.333;
    this.cent_accelerating = false;
    this.cent_is_moving = false;
	this.safeZone=true;
  }
	  collision(delta){
    let collided=false;
    if(this.assetCollision())collided=true;
	return collided;
  }
  onCollide(){
    
  }
	updateEffects(abilities){
		this.effects=this.effects.filter(e=>!e.removed);
		function prop(x){
			return Ability.levels[ability.level-1][x] ?? [x]
		}
		for(var ability of abilities){
			if(!ability)continue;
			var Ability=abilityConfig[ability.abilityType];
			if(ability.abilityType==3)
				this.effects.filter(e=>e.effectType==2).map(e=>{
					e.radius=prop("radius");
				});
			if(ability.abilityType==6)
				this.effects.filter(e=>e.effectType==3).map(e=>{
					e.radius=prop("radius");
				});
			if(ability.abilityType==98)
				this.effects.filter(e=>e.effectType==66).map(e=>{
					!this.isDowned()&&(e.inputAngle=this.lastAngle/180*Math.PI);
				});
		}
	}
  assetCollision(){
    let collided=false;
    const walls=map.areas[this.area].entities.filter(e=>(e instanceof Wall && e.collisionIndex==-1));
    let centerX,centerY,halfWidth,halfHeight;
    for(var i of walls){
      halfWidth=i.width/2;
      halfHeight=i.height/2;
      centerX=i.x+halfWidth;
      centerY=i.y+halfHeight;
      var distX = Math.abs(this.x - centerX);
      var distY = Math.abs(this.y - centerY);
      var radius=this.radius;
      var c=rectCircleCollision(this.x,this.y,radius,i.x,i.y,i.width,i.height);
      if(c.c){
        collided=true;
        var a=Math.atan2(c.y,c.x);
        var relX = (this.x - centerX) / halfWidth;
        var relY = (this.y - centerY) / halfHeight;
        if (Math.abs(relX) > Math.abs(relY)) {
          // Horizontal collision.
          if (relX > 0) {
            //corner collision at right side
            if(relY*halfHeight > halfHeight){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
            }else if(relY*halfHeight < -halfHeight){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
            }else{
              // middle right collision
              this.x = centerX + halfWidth + this.radius;
            }
          } else {
            //corner collision for left side
            if(relY*halfHeight > halfHeight){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
            }else if(relY*halfHeight < -halfHeight){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
            }else{
              // middle left collision
              this.x = centerX - halfWidth - this.radius;
            }
          }
        } else {
          // Vertical collision
          if (relY > 0) {
            //corner collision for bottom side
            if(relX*halfWidth > halfWidth){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
            }else if(relX*halfWidth < -halfWidth){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
            }else{
              // middle bottom collision
              this.y = centerY + halfHeight + this.radius;
            }
          } else {
            //corner collision for top side
            if(relX*halfWidth > halfWidth){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
            }else if(relX*halfWidth < -halfWidth){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
            }else{
              // middle top collision
              this.y = centerY - halfHeight - this.radius;
            }
          }
        }
      }
    }
    return collided;
  }
  updateExp(x){
  	  this.experience+=x;
	  while(this.experience>=this.nextLevelExperience){
		if(this.level >= (map.areas[this.area].properties.max_level??map.properties.max_level)){
			this.experience=this.nextLevelExperience;
			break;
		}
		this.experience-=this.tempPrevExperience-this.previousLevelExperience;
        this.tempPrevExperience+=Pellet.prototype.calculateExperience(this.level)-Pellet.prototype.calculateExperience(this.level-1);
        this.level+=1;
        this.tempNextExperience+=Pellet.prototype.calculateExperience(this.level)-Pellet.prototype.calculateExperience(this.level-1)
        this.nextLevelExperience=this.tempNextExperience;
		this.previousLevelExperience=this.tempPrevExperience;
        this.upgradePoints+=1;
      }
  }

	handleAbility(ability,kind=1,delta,others,force=false){
	if(!ability)return;
	const usableWhileDowned=[8,18];
	ability.pellet_powered=abilityConfig[ability.abilityType].pellet_powered??false;
	ability.maxLevel=abilityConfig[ability.abilityType].levels.length??ability.maxLevel;
	var abilityLevels=abilityConfig[ability.abilityType]?.levels;
	if(ability.locked||(this.deathTimer!=-1&&usableWhileDowned.indexOf(ability.abilityType)==-1)||ability.disabled||ability.level==void 0||(!ability.continuous&&this.energy<ability.energyCost)){
			if(kind==1)this.firstAbilityActivated=false;
			else if(kind==2)this.secondAbilityActivated=false;
			else if(kind==3)this.thirdAbilityActivated=false;
			return;
	};
	var abilityActive;
	var mask=7&(2**kind);
	switch(kind){
		case 1:abilityActive=this.firstAbilityActivated;break;
		case 2:abilityActive=this.secondAbilityActivated;break;
		case 3:abilityActive=this.thirdAbilityActivated;break;
	}
	var finalTrigger=force;
	ability.continuous&&abilityActive&&ability.cooldown==0&&(this.energyRate-=ability.energyCost);
	if(Math.min(this.energy+this.energyRate*delta/1e3,this.maxEnergy)<=0&&abilityActive){
		switch(kind){
			case 1:{
				this.firstAbility=true;
				this.firstAbilityActivated=false;
				finalTrigger=this.firstAbility;
			};break;
			case 2:{
				this.secondAbility=true;
				this.secondAbilityActivated=false;
				finalTrigger=this.secondAbility;
			};break;
			case 3:{
				this.thirdAbility=true;
				this.thirdAbilityActivated=false;
				finalTrigger=this.thirdAbility;
			};break;
		}
		abilityActive=false;
		this.energyRate=this.energyRegen+this.regenAdditioner;
	}
	if(ability.cooldown<=0&&!ability.pellet_powered){
		ability.totalCooldown=(abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown)*(this.cooldown_reduction??1);
	}else if(ability.cooldown<=0&&ability.pellet_powered){
		ability.totalCooldown=(abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown);
	}
	ability.total_cooldown=ability.totalCooldown;
	switch(ability.abilityType){
		/*case -1:{
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				if(this.cachedAbilities.indexOf(evadesRenderer.heroInfoCard.abilityOne)==-1){
					this.cachedAbilities.push(evadesRenderer.heroInfoCard.abilityOne);
				}
				if(this.cachedAbilities.indexOf(evadesRenderer.heroInfoCard.abilityTwo)==-1){
					this.cachedAbilities.push(evadesRenderer.heroInfoCard.abilityTwo);
				}
				this.abilityIndex+=1;
				this.abilityIndex%=this.availableAbilities.length-1;
				this.abilityOne.abilityType=this.availableAbilities[this.abilityIndex];
				this.abilityTwo.abilityType=this.availableAbilities[this.abilityIndex+1];
				evadesRenderer.heroInfoCard.abilityOne=this.cachedAbilities[this.abilityIndex];
				evadesRenderer.heroInfoCard.abilityTwo=this.cachedAbilities[this.abilityIndex+1] ?? new Ability;
				if(!this.cachedAbilities[this.abilityIndex+1])evadesRenderer.heroInfoCard.abilityTwo.unionState(this.abilityTwo);
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;*/
		case 0:{/*Flow*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				this.speedMultiplier*=abilityLevels[ability.level-1].slow??1;
				this.speedAdditioner+=abilityLevels[ability.level-1].boost??0;
				!this.effects.filter(e=>e.effectType==0).length&&this.effects.push({effectType:0,boost:abilityLevels[ability.level-1].boost??0});
				if(this.effects.filter(e=>e.effectType==1).length){
					this.harden=false;
					this.effects.filter(e=>e.effectType==1).map(e=>e.removed=true);
					others.map(e=>{
						if(!e)return;
						if(e.abilityType==1)
							e.cooldown=e.totalCooldown;
					})
					if(kind!=1&&this.abilityOne.abilityType==1)this.firstAbilityActivated=false;
					if(kind!=2&&this.abilityTwo.abilityType==1)this.secondAbilityActivated=false;
					if(kind!=3&&this.abilityThree&&this.abilityThree.abilityType==1)this.thirdAbilityActivated=false;
				}
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=ability.total_cooldown;
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.effects.filter(e=>e.effectType==0).map(e=>e.removed=true);
				ability.cooldown=ability.total_cooldown;
			}
		};break;
		case 1:{/*Harden*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				this.speedMultiplier=0;
				this.harden=true;
				this.d_x=this.d_y=0;
				!this.effects.filter(e=>e.effectType==1).length&&this.effects.push({effectType:1});
				if(this.effects.filter(e=>e.effectType==0).length){
					this.effects.filter(e=>e.effectType==0).map(e=>e.removed=true);
					others.map(e=>{
						if(!e)return;
						if(e.abilityType==0)
							e.cooldown=e.total_cooldown;
					});
					if(kind!=1&&this.abilityOne.abilityType==0)this.firstAbilityActivated=false;
					if(kind!=2&&this.abilityTwo.abilityType==0)this.secondAbilityActivated=false;
					if(kind!=3&&this.abilityThree&&this.abilityThree.abilityType==0)this.thirdAbilityActivated=false;
				}
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=ability.total_cooldown;
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.harden=false;
				this.effects.filter(e=>e.effectType==1).map(e=>e.removed=true);
				ability.cooldown=ability.total_cooldown;
			}
		};break;
		case 2:{/*Warp*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.x+=Math.cos(this.input_angle)*abilityLevels[ability.level-1]?.distance;
				this.y+=Math.sin(this.input_angle)*abilityLevels[ability.level-1]?.distance;
				var area=map.areas[this.area];
				this.collision();
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 3:{/*Paralysis*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				var radius=abilityLevels[ability.level-1]?.radius ?? abilityConfig[ability.abilityType].radius;
				if(!this.effects.filter(e=>e.effectType==2).length){
					this.effects.push({effectType:2,radius});
				}else{
					this.energy-=ability.energyCost;
					for(var entity of map.areas[this.area].entities){
						if(entity.isEnemy&&this.distance(this,entity)<(radius+entity.radius)&&!entity.immune){
							entity.freeze(2000);
						}
					}
					this.effects.filter(e=>e.effectType==2).map(e=>{
						e.removed=true;
					});
				}
				this.paralysisAura=!this.paralysisAura;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 4:{/*Reverse*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				var area=map.areas[this.area];
				ability.projectiles=abilityLevels[ability.level-1]?.projectiles;
				for(var i=0.5-ability.projectiles/2;i<0.5+ability.projectiles/2;i++){
					const offset=ability.projectiles!=1&&(i*(3+12*ability.projectiles)/(ability.projectiles-1));
					var x=this.x+(this.radius+EvadesConfig.defaults.reverse_projectile.radius)*Math.cos(this.input_angle+offset*Math.PI/180);
					var y=this.y+(this.radius+EvadesConfig.defaults.reverse_projectile.radius)*Math.sin(this.input_angle+offset*Math.PI/180);
					area.entities.push(new ReverseProjectile(x,y,EvadesConfig.defaults.reverse_projectile.radius,abilityConfig[ability.abilityType].speed,this.input_angle/Math.PI*180+offset,this.area));
				}
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 6:{/*Distort*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				var radius=abilityLevels[ability.level-1]?.radius??abilityConfig[ability.abilityType].radius;
				!this.effects.filter(e=>e.effectType==3).length&&this.effects.push({effectType:3,radius});
				for(var entity of map.areas[this.area].entities){
					if(this.effects.filter(e=>e.effectType==3).length&&entity.isEnemy&&this.distance(this,entity)<(radius+entity.radius)&&!entity.immune){
						if(!entity.speedMultiplierEffects.filter(e=>{
							return e.type=="distort"
						}).length){
							entity.speedMultiplierEffects.push({type:"distort",time:(abilityLevels[ability.level-1]?.slow??abilityConfig[ability.abilityType].slow)*40e3/9})
						}else{
							entity.speedMultiplierEffects.filter(e=>{return e.type=="distort"})[0].time=(abilityLevels[ability.level-1]?.slow??abilityConfig[ability.abilityType].slow)*40e3/9
						};
					}
				}
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.harden=false;
				this.effects.filter(e=>e.effectType==3).map(e=>e.removed=true);
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 7:{/*Energize*/
			for(var entity of map.players.filter(e=>{return e !== this && e.area === this.area})){
				entity.is_energized=true;
				entity.regenAdditioner+=abilityLevels[ability.level-1]?.regen_boost??0;
				entity.cooldown_reduction=0.85;
			}
		};break;
		case 8:{/*Resurrection*/
			if(this.isDowned()&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.deathTimer=-1;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 9:{/*Reanimate*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				var area=map.areas[this.area];
				ability.projectiles=abilityLevels[ability.level-1]?.projectiles;
				for(var i=0.5-ability.projectiles/2;i<0.5+ability.projectiles/2;i++){
					const offset=ability.projectiles!=1&&(i*(14+ability.projectiles)/(ability.projectiles-1));
					var x=this.x+(this.radius+EvadesConfig.defaults.reanimate_projectile.radius)*Math.cos(this.input_angle+offset*Math.PI/180);
					var y=this.y+(this.radius+EvadesConfig.defaults.reanimate_projectile.radius)*Math.sin(this.input_angle+offset*Math.PI/180);
					area.entities.push(new ReanimateProjectile(x,y,EvadesConfig.defaults.reanimate_projectile.radius,abilityConfig[ability.abilityType].speed,this.input_angle/Math.PI*180+offset,this.area));
				}
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 14:{/*Night*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.nightActivated=true;
				this.nightSpeed=abilityLevels[ability.level-1]?.speed_boost??0;
				this.nightDuration=(abilityConfig[ability.abilityType]?.duration??0)*1e3;
				this.speedAdditioner += this.nightSpeed;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 18:{/*Backtrack*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.x=this.chronoPos[0][0];
				this.y=this.chronoPos[0][1];
				this.deathTimer=this.chronoPos[0][2];
				var area=map.areas[this.area];
				this.collision();
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 31:{/*Decay*/
			for(var entity of map.areas[this.area].entities){
				if(entity.isEnemy&&this.distance(this,entity)<abilityConfig[ability.abilityType].radius&&!entity.immune){
					entity.speedMultiplier*=abilityLevels[ability.level-1]?.slow;
					entity.decayed=true;
				}
			}
		};break;
		case 97:{/*Snowball*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				var area=map.areas[this.area];
				var activeZone=area.zones.filter(e=>e.type=="active").sort((e,t)=>{
					const d=distance({x:e.x+e.width/2,y:e.y+e.height/2},this)-distance({x:t.x+t.width/2,y:t.y+t.height/2},this);
					return d==0?Math.pow(-1,Math.round(Math.random())):d;
				})[0]??area.zones[0];
				var x=this.x+(this.radius+EvadesConfig.defaults.snowball_projectile.radius)*Math.cos(this.input_angle);
				var y=this.y+(this.radius+EvadesConfig.defaults.snowball_projectile.radius)*Math.sin(this.input_angle);
				const projectile=new SnowballProjectile(x,y,EvadesConfig.defaults.snowball_projectile.radius,abilityConfig[ability.abilityType].speed,this.input_angle/Math.PI*180,this.area);
				const activeZones=area.zones.filter(e=>e.type=="active");
				projectile.z=activeZones.indexOf(activeZone);
				area.entities.push(projectile);
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 98:{/*Flashlight*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				if(!this.effects.filter(e=>e.effectType==66).length){
					this.effects.push({effectType:66,inputAngle:this.input_angle,...EvadesConfig.effects[66]});
				}
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.effects.filter(e=>e.effectType==66).map(e=>{
					e.removed=true;
				});
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 99:{/*Lantern*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				if(!this.effects.filter(e=>e.effectType==67).length){
					this.effects.push({effectType:67,...EvadesConfig.effects[67]});
				}
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.effects.filter(e=>e.effectType==67).map(e=>{
					e.removed=true;
				});
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 100:{/*Magnetism Down*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.magnetDirection="UP";
				abilityActive=false;
				switch(kind){
					case 1:{
						this.firstAbilityActivated=false;
						this.abilityOne.abilityType=101;
						this.abilityOne.name=abilityConfig[this.abilityOne.abilityType].name;
					}break;
					case 2:{
						this.secondAbilityActivated=false;
						this.abilityTwo.abilityType=101;
						this.abilityTwo.name=abilityConfig[this.abilityTwo.abilityType].name;
					}break;
					case 3:{
						this.thirdAbilityActivated=false;
						this.abilityThree.abilityType=101;
						this.abilityThree.name=abilityConfig[this.abilityThree.abilityType].name;
					}break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 101:{/*Magnetism Up*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.magnetDirection="DOWN";
				abilityActive=false;
				switch(kind){
					case 1:{
						this.firstAbilityActivated=false;
						this.abilityOne.abilityType=100;
						this.abilityOne.name=abilityConfig[this.abilityOne.abilityType].name;
					}break;
					case 2:{
						this.secondAbilityActivated=false;
						this.abilityTwo.abilityType=100;
						this.abilityTwo.name=abilityConfig[this.abilityTwo.abilityType].name;
					}break;
					case 3:{
						this.thirdAbilityActivated=false;
						this.abilityThree.abilityType=100;
						this.abilityThree.name=abilityConfig[this.abilityThree.abilityType].name;
					}break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		default:throw"User sonic3XE has no access to Spacebrook/EvadesClassic github source code.";
	}
	}
  isMovementKeyPressed(input){
    return (
	input.keys.has(controls.LEFT[0]) || 
	input.keys.has(controls.LEFT[1]) || 
	input.keys.has(controls.RIGHT[0]) || 
	input.keys.has(controls.RIGHT[1]) || 
	input.keys.has(controls.UP[0]) || 
	input.keys.has(controls.UP[1]) || 
	input.keys.has(controls.DOWN[0]) || 
	input.keys.has(controls.DOWN[1]));
  }
	controlActions(input,delta){
	var cent=this.isCent;
	if(this.isLead)cent=!cent;
	cent&&=!this.harden;
    if (input.keys) {
	const usableWhileDowned=[8,18];
	  this.hasNoInput=false;
      this.firstAbility = false;
      this.secondAbility = false;
      this.thirdAbility = false;
      if ((input.keys.has(controls.USE_ABILITY_ONE[0]) || input.keys.has(controls.USE_ABILITY_ONE[1]) || this.forcefirst) && !this.firstAbilityPressed && !this.disabling) {
        this.firstAbility = true;
        this.firstAbilityPressed = true;
      }
      if ((input.keys.has(controls.USE_ABILITY_TWO[0]) || input.keys.has(controls.USE_ABILITY_TWO[1]) || this.forcesecond) && !this.secondAbilityPressed && !this.disabling) {
        this.secondAbility = true;
        this.secondAbilityPressed = true;
      }
      if ((input.keys.has(controls.USE_ABILITY_THREE[0]) || input.keys.has(controls.USE_ABILITY_THREE[1])) && !this.thirdAbilityPressed && !this.disabling) {
        this.thirdAbility = true;
        this.thirdAbilityPressed = true;
      }
      if (!(input.keys.has(controls.USE_ABILITY_ONE[0]) || input.keys.has(controls.USE_ABILITY_ONE[1]) || this.forcefirst)) {
        this.firstAbilityPressed = false;
      }
      if (!(input.keys.has(controls.USE_ABILITY_TWO[0]) || input.keys.has(controls.USE_ABILITY_TWO[1]) || this.forcesecond)) {
        this.secondAbilityPressed = false;
      }
      if (!(input.keys.has(controls.USE_ABILITY_THREE[0]) || input.keys.has(controls.USE_ABILITY_THREE[1]))) {
        this.thirdAbilityPressed = false;
      }
      if (!this.prevSlippery||this.collides||(this.d_x == 0 && this.d_y == 0)) {
        if (this.slippery&&!this.prevSlippery) {
          if (!this.isMovementKeyPressed(input)) {
            this.velX=0;this.velY=0;
          }
        }
        if (input.keys.has(controls.FOCUS)&&!this.slippery) {
          this.shift = 2;
        } else {this.shift = 1;}
        if(!this.reaperShade)if(input.keys.has(controls.UPGRADE_SPEED[0])||input.keys.has(controls.UPGRADE_SPEED[1])) {
          if (this.speed < 17*30 && this.upgradePoints > 0) {
            this.speed += 15;
            this.upgradePoints--;
            if(this.speed > 17*30){this.speed = 17*30;}
          }
        }
        if (input.keys.has(controls.UPGRADE_MAX_ENERGY[0])||input.keys.has(controls.UPGRADE_MAX_ENERGY[1])) {
          if (this.maxEnergy < 300 && this.upgradePoints > 0) {
            this.maxEnergy += 5;
            this.upgradePoints--;
          }
        }
        if (input.keys.has(controls.UPGRADE_ENERGY_REGEN[0])||input.keys.has(controls.UPGRADE_ENERGY_REGEN[1])) {
          if (parseFloat(this.energyRegen.toFixed(3)) < 7 && this.upgradePoints > 0) {
            this.energyRegen += 0.2;
            this.upgradePoints--;
          }
        }
        if (input.keys.has(controls.UPGRADE_ABILITY_ONE[0])||input.keys.has(controls.UPGRADE_ABILITY_ONE[1])) {
          if (this.abilityOne.level < this.abilityOne.maxLevel && this.upgradePoints > 0) {
			this.abilityOne.level++;
			this.abilityOne.locked=this.abilityOne.level==0;
            this.upgradePoints--;
          }
        }
        if (input.keys.has(controls.UPGRADE_ABILITY_TWO[0])||input.keys.has(controls.UPGRADE_ABILITY_TWO[1])) {
          if (this.abilityTwo.level < this.abilityTwo.maxLevel && this.upgradePoints > 0) {
			this.abilityTwo.level++;
			this.abilityTwo.locked=this.abilityTwo.level==0;
            this.upgradePoints--;
          }
        }
        if (input.keys.has(controls.UPGRADE_ABILITY_THREE[0])||input.keys.has(controls.UPGRADE_ABILITY_THREE[1])) {
          if (this.abilityThree && this.abilityThree.level < this.abilityThree.maxLevel && this.upgradePoints > 0) {
			this.abilityThree.level++;
			this.abilityThree.locked=this.abilityThree.level==0;
            this.upgradePoints--;
          }
        }
        this.statSpeed = this.speed+0;
        this.addX = 0; this.addY =0;
        this.d_x=0; this.d_y=0;
		if(this.nightDuration>0){
			this.nightDuration-=delta;
			this.speedAdditioner+=this.nightSpeed;
		}else{
			this.nightActivated=false;
			this.nightDuration=0;
		};
        if(this.minimum_speed>this.speed+this.speedAdditioner){this.speed=this.minimum_speed}
        if (!cent&&this.shift == 2) {
          this.speedMultiplier *= 0.5;
          this.speedAdditioner *= 0.5;
        }
        if (this.isPoisoned) {
          this.speedMultiplier *= 3;
        }
        if (this.fusion) {
          this.speedMultiplier *= 0.7;
        }
		if(this.isBurning){
			this.speedMultiplier *= 0.05;
		}
        if (this.slowing && this.slowing[0]) {
          this.speedMultiplier *= (1-this.effectImmune*this.slowing[1])*this.effectReplayer;
        }
        if (this.freezing) {
          this.speedMultiplier *= (1-this.effectImmune*(1-0.2))*this.effectReplayer;
        }
		if(this.effects.filter(e=>e.effectType==0).length){
			this.speedAdditioner+=this.effects.filter(e=>e.effectType==0)[0].boost;
		}
		this.distance_movement=(this.speed*this.speedMultiplier)+this.speedAdditioner;
        this.mouseActive = false;
          if (input.isMouse&&!this.cent_is_moving&&!this.isMovementKeyPressed(input)) {
            this.mouse_distance_full_strength = 150;
            this.mouseActive = true;
            this.movement_involved=true;
            if(this.slippery){this.mouse_distance_full_strength = 1;}

            if(!cent || (cent && this.cent_input_ready)){

              if(cent){
                this.cent_input_ready = false;
                this.cent_is_moving = true;
                this.cent_accelerating = true; 
                this.mouse_distance_full_strength = 1;
              }

              this.dirX = (input.mouse.x - canvas.width / 2) /camScale;
              this.dirY = (input.mouse.y - canvas.height / 2)/camScale;
              this.dist = distance({x:0,y:0}, {x:this.dirX,y:this.dirY});
			  if(this.dist > 200){
                this.dirX *= 200 / this.dist;
                this.dirY *= 200 / this.dist;
			  }
			  this.dirX=Math.min(this.mouse_distance_full_strength,Math.max(this.dirX,-this.mouse_distance_full_strength));
			  this.dirY=Math.min(this.mouse_distance_full_strength,Math.max(this.dirY,-this.mouse_distance_full_strength));
              if (Math.abs(this.dirX) > this.mouse_distance_full_strength) {
                this.dirX *= this.mouse_distance_full_strength / this.dist;
              }
              if (Math.abs(this.dirY) > this.mouse_distance_full_strength) {
                this.dirY *= this.mouse_distance_full_strength / this.dist;
              }
              
              this.mouse_angle = Math.atan2(this.dirY,this.dirX);
              this.input_angle = this.mouse_angle;
              this.mouse_distance = Math.min(this.mouse_distance_full_strength,Math.sqrt(this.dirX**2+this.dirY**2))
              this.distance_movement*=this.mouse_distance/this.mouse_distance_full_strength;

              if(cent && this.cent_input_ready){
                this.cent_saved_angle = this.input_angle;
                this.cent_input_ready = false;
                this.cent_is_moving = true;
              }

              this.d_x = this.distance_movement*Math.cos(this.mouse_angle)
              this.d_y = this.distance_movement*Math.sin(this.mouse_angle)
            }

            if(!cent){
			this.velX = this.dirX * this.distance_movement / this.mouse_distance_full_strength;
				if(!this.magnet||this.magnet&&this.safeZone){
					if(this.vertSpeed==-1)this.velY=this.dirY*this.distance_movement/this.mouse_distance_full_strength;
					else this.velY=this.dirY*this.vertSpeed/this.mouse_distance_full_strength;
				} 
            }
        } else if (!this.cent_is_moving){
            this.dirY = 0; this.dirX = 0;
            this.moving = false;
            this.movement_involved=false;
			if(this.isMovementKeyPressed(input)){
              if(cent && this.cent_input_ready) this.cent_is_moving = true;
              this.moving=true;
			  this.movement_involved=true;
              input.isMouse = false;
              if(cent)this.cent_input_ready = false;
              this.cent_accelerating = true;
            }
            if (input.keys.has(controls.DOWN[0]) || input.keys.has(controls.DOWN[1])) {
              this.dirY = 1;
            }
            if (input.keys.has(controls.UP[0]) || input.keys.has(controls.UP[1])) {
              this.dirY = -1;
            }
            if (input.keys.has(controls.LEFT[0]) || input.keys.has(controls.LEFT[1])) {
              this.dirX = -1;
            }
            if (input.keys.has(controls.RIGHT[0]) || input.keys.has(controls.RIGHT[1])) {
              this.dirX = 1;
            }
        }
        (this.dirY||this.dirX)&&(this.inputAngle=this.input_angle = Math.atan2(this.dirY,this.dirX));
		if(!cent){
			this.cent_is_moving=false;
			this.cent_accelerating=false;
			this.cent_input_ready=true;
			this.cent_distance=0;
		}
        if(cent && this.cent_input_ready){
          this.cent_saved_angle = this.input_angle;
          this.cent_input_ready = false;
          this.cent_is_moving = true;
        }
        if(cent && this.cent_distance){
          this.d_x = this.dirX * this.cent_distance;
          this.d_y = this.dirY * this.cent_distance;
        }else if(this.moving&&!input.isMouse&&!cent) {
          this.d_x = this.distance_movement * this.dirX;
          this.d_y = this.distance_movement * this.dirY;
        }
        this.speed=this.statSpeed;
      }
    }
  }
	distance(a,b){
                  return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
                }
	reset(){
		this.level=1;
		this.upgradePoints=0;
		this.energy=30;
		this.maxEnergy=30;
		this.energyRegen=1;
		this.speed=150;
		this.experience=0;
		this.previousLevelExperience=0;
		this.nextLevelExperience=4;
		this.tempPrevExperience=0;
		this.tempNextExperience=4;
		this.abilityOne = new Ability;
		this.abilityOne.abilityType=this.heroType*2;
		this.abilityTwo = new Ability;
		this.abilityTwo.abilityType=this.heroType*2+1;
		this.effects=[];
		if(this.abilityThree){
			var type=this.abilityThree.abilityType;
			this.abilityThree = new Ability;
			this.abilityThree.abilityType=type;
		}
	}
	update(delta){
		this.isLocalPlayer=this.id==selfId;
		if(this.hasNoInput)this.controlActions({keys:new Set()},delta);
		this.hasNoInput=true;
		function checkAreaProperties(e){
			var s=map.areas[this.area].properties[e] ?? (map.properties[e] ?? defaultValues.properties[e]);
			return s;
		}
		checkAreaProperties=checkAreaProperties.bind(this);
		this.update_knockback(delta);
		let timeFix=delta/(1e3/30);
		var cent=this.isCent;
		if(this.isLead)cent=!cent;
	if(this.firstAbility&&this.abilityOne.cooldown==0){
		this.firstAbilityActivated = !this.firstAbilityActivated;
	}
	if(this.secondAbility&&this.abilityTwo.cooldown==0){
		this.secondAbilityActivated = !this.secondAbilityActivated;
	}
	if(this.thirdAbility&&this.abilityThree&&this.abilityThree.cooldown==0){
		this.thirdAbilityActivated = !this.thirdAbilityActivated;
	}
	if(this.cybotEffect==1){
		this.reset(),
		this.abilityThree?.abilityType==56&&(this.abilityThree.level=1,this.abilityThree.locked=false);
	}
	if(this.cybotEffect==2)
		this.effectImmune=1+0.5*this.effectImmune;
	if(this.cybotEffect==3)
		this.deathTimerTotalMultiplier=5/6*this.effectImmune;
	else this.deathTimerTotalMultiplier=0;
	
	const usableWhileDowned=[8,18];
	this.abilityOne.afterStateUpdate();
	this.abilityTwo.afterStateUpdate();
	this.abilityThree&&this.abilityThree.afterStateUpdate();
	  if(this.wasDowned){
		  usableWhileDowned.indexOf(this.abilityOne.abilityType)==-1&&(this.firstAbilityActivated=false);
		  usableWhileDowned.indexOf(this.abilityTwo.abilityType)==-1&&(this.secondAbilityActivated=false);
		  usableWhileDowned.indexOf(this.abilityThree?.abilityType)==-1&&(this.thirdAbilityActivated=false);
	  }
	this.handleAbility(this.abilityOne,1,delta,[this.abilityTwo,this.abilityThree],this.firstAbility);
	this.handleAbility(this.abilityTwo,2,delta,[this.abilityOne,this.abilityThree],this.secondAbility);
	this.abilityThree&&this.handleAbility(this.abilityThree,3,delta,[this.abilityOne,this.abilityTwo],this.thirdAbility);
	this.cooldown_reduction=1;
		var rotationSpeed = 450;
		var angle=this.input_angle/Math.PI*180;
		if(angle<0){angle+=360}
		if(angle>=360){angle-=360}
		var distanceOne = angle - Math.abs(this.lastAngle);
		if(this.lastAngle<=angle+rotationSpeed*delta/1e3&&this.lastAngle>=angle-rotationSpeed*delta/1e3){}
		else if(distanceOne<-180){this.lastAngle+=rotationSpeed*delta/1e3;}
		else if(distanceOne>=180){this.lastAngle-=rotationSpeed*delta/1e3;}
		else if(distanceOne<0){this.lastAngle-=rotationSpeed*delta/1e3;}
		else if(distanceOne>0){this.lastAngle+=rotationSpeed*delta/1e3;}
		if(this.lastAngle>=360)this.lastAngle-=360;
		if(this.lastAngle<0)this.lastAngle+=360;
		if(this.lastAngle<=angle+rotationSpeed*delta/1e3&&this.lastAngle>=angle-rotationSpeed*delta/1e3){this.lastAngle = angle}
		this.chronoPos.push([this.x,this.y,this.deathTimer]);
		this.chronoPos=this.chronoPos.slice(-Math.round(2.6e3/delta));
		this.inBarrier = false;
		if(this.abilityOne.cooldown!==void 0&&!this.abilityOne.pellet_powered){
			this.abilityOne.cooldown-=delta/1e3;
		};
		this.abilityOne.cooldown=Math.max(this.abilityOne.cooldown??0,0);
		if(this.abilityTwo.cooldown!==void 0&&!this.abilityTwo.pellet_powered){
			this.abilityTwo.cooldown-=delta/1e3;
		};
		this.abilityTwo.cooldown=Math.max(this.abilityTwo.cooldown??0,0);
		if(this.abilityThree&&this.abilityThree.cooldown!==void 0&&!this.abilityThree.pellet_powered){
			this.abilityThree.cooldown-=delta/1e3;
		};
		this.abilityThree&&(this.abilityThree.cooldown=Math.max(this.abilityThree.cooldown??0,0));
		if(this.noCooldown){
			this.abilityOne.cooldown=0;
			this.abilityTwo.cooldown=0;
			this.abilityThree && (this.abilityThree.cooldown=0);
		}
		this.updateEffects([this.abilityOne,this.abilityTwo,this.abilityThree]);
		let area=map.areas[this.area];
		this.safeZone = true;
		this.pointInActiveZone=false;
		var zoneC;
		function checkZoneProperties(e){
			var s=zone.properties[e] ?? area.properties[e] ?? (map.properties[e] ?? defaultValues.properties[e]);
			return s;
		}
		this.zoneFriction=1;
		for(var zone of area.zones){
			var rect1={x:this.x,y:this.y,width:this.radius, height:this.radius},rect2={x:zone.x,y:zone.y,width:zone.width, height:zone.height};
			if(zone.type=="active"&&rect1.x-this.radius<rect2.x+rect2.width&&rect1.x+this.radius>rect2.x&&rect1.y-this.radius<rect2.y+rect2.height&&rect1.y+this.radius>rect2.y)this.safeZone=false;
			if(rect1.x<rect2.x+rect2.width&&rect1.x>rect2.x&&rect1.y<rect2.y+rect2.height&&rect1.y>rect2.y){
				if(zone.type=="active")this.pointInActiveZone=true;
				this.minimum_speed=checkZoneProperties("minimum_speed");
				this.zoneFriction=checkZoneProperties("friction");
			}
		}
		const deadPlayers=map.players.filter(e=>{
		return (e.isDowned() || e.deathTimer!=-1) && e.area == this.area && (distance(e, this) < e.radius + this.radius);
		});
		for(var i in deadPlayers){
			if(deadPlayers[i]!=this&&this.deathTimer==-1&&this.rescueable){
				deadPlayers[i].deathTimer=-1;this.rescuedCount++;
				this.interactions.indexOf(deadPlayers[i])==-1&&this.interactions.push(deadPlayers[i]);
				deadPlayers[i].interactions.indexOf(this)==-1&&deadPlayers[i].interactions.push(this);
				this.playerInteractions=this.interactions.length;
			}
		}
		if(!this.wasDowned)this.isInfected=false;
		if(this.area){
			for(var otherplayer of map.players){
				if(otherplayer.area==this.area&&otherplayer!=this){
					this.interactions.indexOf(otherplayer)==-1&&this.interactions.push(otherplayer);
					this.playerInteractions=this.interactions.length;
				}
			}
		}
		if(!this.abilityThree&&checkAreaProperties("applies_lantern")){
			this.abilityThree=new Ability;
			if(this.abilityThree.abilityType!=99){
				this.abilityThree.abilityType=99;
				this.abilityThree.unionState(abilityConfig[this.abilityThree.abilityType]);
				this.abilityThree.locked=false;
				this.abilityThree.level=1;
				this.abilityThree.abilityType=this.abilityThree.abilityType;
				this.isSpawned=false;
			}
		}
		var onTele=false;
		this.speedMultiplier = 1;
		if(this.collides&&this.slippery){
			this.d_x*=2;
			this.d_y*=2;
			this.collidedPrev = true;
		} else if (this.collidedPrev) {
			this.d_x/=2;
			this.d_y/=2;
			this.collidedPrev = false;
		}
		if (this.isPoisoned) {
			this.poisonedTimeLeft -= delta;
			this.speedMultiplier *= 3;
		}
		if (this.poisonedTimeLeft <= 0) {
			this.isPoisoned = false;
			this.poisonedTimeLeft = 1000;
		}
		if (this.fusion) {
			this.speedMultiplier *= 0.7;
		}
		if (!cent&&this.shift == 2) {
			this.speedMultiplier *= 0.5;
			this.speedAdditioner *= 0.5;
		}
		this.slowing??=[false];
		this.draining??=[false];
		if (this.slowing[0]) {
			this.speedMultiplier *= 1-this.slowing[1]*this.effectImmune;
		}
		if (this.draining[0]) {
			this.energyRate -= this.draining[1]*this.effectImmune;
		}
		if (this.lava) {
			this.energyRate+=8*this.effectImmune;
			if(this.energy>=this.maxEnergy){
				this.isBurningTime=1500;
				this.isBurning=true;
				this.energy=0;
			}
		}
		if(this.experienceDraining){
			this.experience-=2*this.level*delta/1e3;
			this.experience=Math.max(0,this.experience);
			if(this.experience<this.previousLevelExperience){
				var diff=this.previousLevelExperience-this.experience;
				this.previousLevelExperience-=diff;
				this.nextLevelExperience+=diff;
				this.previousLevelExperience=Number(this.previousLevelExperience.toFixed(5));
				this.nextLevelExperience=Number(this.nextLevelExperience.toFixed(5));
			}
		}
		if(this.enlarging)this.radiusAdditioner+=10*this.effectImmune;
		if(this.toxic)this.energy=Math.min(this.energy,this.maxEnergy*0.7);
		if(this.freezing)this.speedMultiplier*=(1-0.2*this.effectImmune);
		if(this.shadowed_time_left>0)this.shadowed_time_left-=delta;
		else{
			this.knockback_limit_count = 0;
			this.shadowed_invulnerability = false;
		}
		if(this.mortarTime>0)this.speedMultiplier=0;
		//this.energized=false;
		//if (this.is_energized)this.energized=true;
		//this.is_energized=false;
		if(this.minimum_speed>this.statSpeed+this.speedAdditioner)this.statSpeed=this.minimum_speed;
		if(cent){
			this.distance_movement=(this.speed*this.speedMultiplier)+this.speedAdditioner;
			this.cent_max_distance=this.distance_movement*2;
			if(this.cent_is_moving){
				if(this.cent_accelerating){
					if(this.cent_distance<this.cent_max_distance)this.cent_distance+=this.cent_acceleration*this.distance_movement*timeFix;
					else {
						this.cent_distance=this.cent_max_distance;
						this.cent_accelerating=false;
					}
				} else {
					if(this.cent_distance>0)this.cent_distance-=this.cent_deceleration*this.distance_movement*timeFix;
					else {
						this.cent_distance=0;
						this.cent_accelerating=true;
						this.cent_is_moving=false;
						this.cent_input_ready=true;
					}
				}
				if(this.cent_distance<0)this.cent_distance=0;
			}
			this.distance_movement = this.cent_distance;
		}
		this.survivalTime+=delta/1e3;
		this.radius = this.defaultRadius;
		var velY=this.velY;
		
		if((checkAreaProperties("magnetism")||checkAreaProperties("partial_magnetism"))&&this.pointInActiveZone){
			var isPartial=checkAreaProperties("partial_magnetism");
			var magneticSpeed=(this.vertSpeed==-1)?((isPartial?(this.speed/2):300)/(this.magneticReduction+1)*(!this.magneticNullification)):this.vertSpeed;
			if(this.magnetDirection.toLowerCase()=="down"){this.y+=(!(this.isIced||this.isSnowballed)&&!this.isDowned())*(magneticSpeed+this.d_y*isPartial*(!this.magneticNullification&&!this.isDowned()))*delta/1e3}
			else if(this.magnetDirection.toLowerCase()=="up"){this.y+=(!(this.isIced||this.isSnowballed)&&!this.isDowned())*(-magneticSpeed+this.d_y*isPartial*(!this.magneticNullification&&!this.isDowned()))*delta/1e3}
		}
		if(this.radiusAdditioner!=0){this.radius+=this.radiusAdditioner}
		this.radius*=this.radiusMultiplier;
		this.radiusMultiplier=1;
		this.radiusAdditioner=0;
		if(this.isIced)this.icedTimeLeft-=delta;
		if(this.isBurning)this.isBurningTime-=delta;
		this.wasIced=this.isIced;
		if(this.icedTimeLeft<=0){
			this.isIced=false;
			this.icedTimeLeft=1000;
		}
		if(this.isBurningTime<=0){
			this.isBurning=false;
			this.isBurningTime=1000;
		}
		if(this.isSnowballed)this.snowballedTimeLeft-=delta;
		if(this.snowballedTimeLeft<=0){
			this.isSnowballed=false;
			this.snowballedTimeLeft=2500;
		}
		if(this.isLead)this.leadTime-=delta;
		if(this.leadTime<0){
			this.isLead=false;
			this.leadTime=0;
		}
		if(this.speedghost){
			this.speed-=3*this.effectImmune*delta/1e3;
			this.statSpeed-=3*this.effectImmune*delta/1e3;
			if(this.speed<150)this.speed=150;
			if(this.statSpeed<150)this.statSpeed=150;
		}
		if(this.regenghost){
			this.energyRegen-=1.2*this.effectImmune*delta/1e3;
			if(this.energyRegen<1)this.energyRegen=1;
		}
		if (this.inEnemyBarrier)this.inBarrier=true;
		if (this.reducingTime>=0&&!this.reducing){
			this.reducingTime-=delta;
			this.reducingTime=Math.max(this.reducingTime,0);
			this.radiusMultiplier*=1-this.reducingTime/2e3;
		}
		if (this.reducingTime>=0&&this.reducing){
			this.reducingTime+=delta*this.effectImmune;
			if(this.reducingTime>2e3){
				this.reducingTime=0;
				death(this);
			}
			this.radiusMultiplier*=1-this.reducingTime/2e3;
		}
		this.reducingTime=Math.max(0,this.reducingTime);
		if(this.quicksand[0]&&!this.invulnerable){
			this.x+=Math.cos(this.quicksand[1]*Math.PI/180)*this.quicksand[2]*delta/1e3;
			this.y+=Math.sin(this.quicksand[1]*Math.PI/180)*this.quicksand[2]*delta/1e3;
			this.quicksand[0]=false;
		}
		if(this.isStone){
			this.speedMultiplier=0;
			this.velX=0;
			this.velY=0;
			this.d_x=0;
			this.d_y=0;
			this.distance_moved_previously=[0,0];
		}
		const revivalAbilities=[8];
		this.abilityOne.disabled=this.disabling||this.isSnowballed||(revivalAbilities.indexOf(this.abilityOne.abilityType)!=-1&&this.isInfected);
		this.abilityTwo.disabled=this.disabling||this.isSnowballed||(revivalAbilities.indexOf(this.abilityTwo.abilityType)!=-1&&this.isInfected);
		if(this.abilityThree)
			this.abilityThree.disabled=this.disabling||this.isSnowballed||(revivalAbilities.indexOf(this.abilityThree.abilityType)!=-1&&this.isInfected);
		this.canGainEnergy=!this.isStone;
		this.invulnerable=this.harden+this.isStone+this.inBarrier;
		this.canGainEnergy && (this.energy+=this.energyRate*delta/1e3);
		this.energyRate=this.energyRegen+this.regenAdditioner;
		if(this.energy>this.maxEnergy)this.energy=this.maxEnergy;
		if(this.energy<0)this.energy=0;
		this.oldPos=(this.previousPos.x==this.x&&this.previousPos.y==this.y)?this.oldPos:{x:this.previousPos.x,y:this.previousPos.y}
		this.previousPos={x:this.x,y:this.y};
		var dim=1-this.zoneFriction;
		if(this.slippery)dim=0;
		//dim = 0;
		var friction_factor=dim;
		this.slide_x=this.distance_moved_previously[0];
		this.slide_y=this.distance_moved_previously[1];
		this.slide_x*=friction_factor;
		this.slide_y*=friction_factor;
		this.d_x+=this.slide_x;
		this.d_y+=this.slide_y;
		this.abs_d_x=Math.abs(this.d_x)
		this.abs_d_y=Math.abs(this.d_y);
		if(cent){
			if(this.abs_d_x>this.cent_max_distance&&!this.slippery)this.d_x*=this.cent_max_distance/this.abs_d_x;
			if(this.abs_d_y>this.cent_max_distance&&!this.slippery)this.d_y*=this.cent_max_distance/this.abs_d_y;
		}else{
			if(this.abs_d_x>this.distance_movement&&!this.slippery)this.d_x*=this.distance_movement/this.abs_d_x;
			if(this.abs_d_y>this.distance_movement&&!this.slippery)this.d_y*=this.distance_movement/this.abs_d_y;
		}
		this.prevSlippery=this.slippery;
		this.distance_moved_previously=[this.d_x,this.d_y]
		this.velX=this.d_x;
		this.velY=this.d_y;
		if(!this.blocking){
			this.slowing=[false];
			this.freezing=false;
			this.web=false;
			this.cobweb=false;
			this.sticky=false;
			this.toxic=false;
			this.experienceDraining=false;
			this.reducing=false;
			this.enlarging=false;
			this.draining=[false];
			this.lava=false;
			this.speedghost=false;
			this.regenghost=false;
			this.inEnemyBarrier=false;
			this.slippery=false;
			this.disabling=false;
			this.cybotEffect=0;
		}
		this.blocking=false;
		this.tempColor=this.color;
		this.effectImmune=1;
		var vel,isMagnet=checkAreaProperties("partial_magnetism")||checkAreaProperties("magnetism"),isPartial=checkAreaProperties("partial_magnetism"),magneticSpeed=(this.vertSpeed==-1)?((isPartial?(this.speed/2):300)/(this.magneticReduction+1)*(!this.magneticNullification)):this.vertSpeed;
		var yaxis=(this.velY>=0)?1:-1;
		if(!isMagnet)magneticSpeed*=yaxis;
		if(this.magnetDirection.toLowerCase()=="up"){magneticSpeed=-magneticSpeed}
		if((isMagnet||this.vertSpeed!=-1)&&this.pointInActiveZone)vel={x:this.velX,y:this.velY*this.magneticNullification};
		else vel={x:this.velX,y:this.velY};
		this.vertSpeed=-1;
		this.magneticReduction=false;
		this.magneticNullification=false;
		if(!this.wasIced&&!this.isSnowballed&&!this.isDowned()&&!this.wasDowned){
			this.x+=vel.x*delta/1e3;
			this.y+=vel.y*delta/1e3;
		}
		this.wasDowned=this.isDowned();
		this.speedMultiplier=1;
		this.speedAdditioner=0;
		this.regenAdditioner=0;
		if(this.sourCandyTime==5000){
			this.energy -= this.maxEnergy/2;
			if(this.energy<0){this.energy=0}
		}
		if(this.sourCandyConsumed){
			this.speedAdditioner-=150;
			this.regenAdditioner-=5;
			this.sourCandyTime-=delta;
		}
		if(this.sourCandyTime<0){
			this.sourCandyTime=0;
			this.sourCandyConsumed=false;
		}
		if(this.deathTimer!=-1)this.deathTimer-=delta,this.deathTimer=Math.max(0,this.deathTimer);
		this.collides=this.collision(delta);
		for(var zone of area.zones){
			if(zone.type=="teleport"||zone.type=="exit"){
				var collided=rectCircleCollision(this.x,this.y,this.radius,zone.x,zone.y,zone.width,zone.height)
				if(collided.c)onTele=true;
				if(collided.c&&!this.onTele&&!this.cannot_leave_area){
					var max=Infinity,maxArea=0,targetPoint={x:this.x+zone.translate.x,y:this.y+zone.translate.y};
					for(var j in map.areas){
						if(j==this.area)continue;
						var rect=getAreaBoundary(map.areas[j]),closest=closestPointToRectangle(targetPoint,{x:map.areas[j].x-area.x,y:map.areas[j].y-area.y},{x:rect.width,y:rect.height}),dist=this.distance(targetPoint,closest);
						if(dist<max)max=dist,maxArea=parseInt(j);
					}
					this.x=targetPoint.x+(area.x-map.areas[maxArea].x);
					this.y=targetPoint.y+(area.y-map.areas[maxArea].y);
					area.entities=[];
					this.area=maxArea;
					spawnEntities(this.area);
					this.hasTranslated=true;
					this.chronoPos=[];
					break;
				}
			}
			if(zone.type=="removal"){
				var collided=rectCircleCollision(this.x,this.y,this.radius,zone.x,zone.y,zone.width,zone.height)
				if(collided.c){
					if(this.isLocalPlayer)stopPlaytesting();
					else map.players.splice(map.players.indexOf(this),1);
					break;
				}
			}
		}
		this.onTele=onTele;
		var safeZone;
		area=map.areas[this.area];
		for(var zone of area.zones){
			if(zone.type=="safe"){
				safeZone=zone;
				break;
			};
		};
		for(var zone of area.zones){
			if(this.hasTranslated&&zone.type=="teleport"&&rectCircleCollision(this.x,this.y,this.radius,zone?.x,zone?.y,zone?.width,zone?.height).c){
				var left=safeZone.x,right=left+safeZone.width,top=safeZone.y,bottom=top+safeZone.height;
				this.x=Math.min(Math.max(this.x,left+this.radius*2),right-this.radius*2);
				this.y=Math.min(Math.max(this.y,top+this.radius*2),bottom-this.radius*2);
				this.hasTranslated=false;
				break;
			}
		}
		this.hasTranslated=false;
		this.areaNumber=this.area+1;
		this.regionName=map.name;
		if(!this.regionAreasDiscovered[this.area])this.updateExp(12*this.area),this.regionAreasDiscovered[this.area]=true;
		if(this.deathTimer==0){
			if(this.isLocalPlayer)stopPlaytesting();
			else map.players.splice(map.players.indexOf(this),1);
			console.log("Player died (death timer ran out)");
		}
	}
	knockback_player(delta,enemy,push_time,radius){
		const timeFix = delta / (1000 / 30);
		this.knockback = true;
		this.knockback_push_time = push_time;
		this.knockback_enemy_pos = {x:enemy.x,y:enemy.y};
		this.knockback_enemy_radius = radius;
		this.knockback_multiplayer = this.effectImmune / this.effectReplayer;
		this.knockback_limit_count += 1;
		const ePos = this.knockback_enemy_pos;
		const pPos = this;
		const distance_between = distance(ePos,pPos)-this.radius;
		const distance_remaining = this.knockback_enemy_radius - distance_between;
		const angle = Math.atan2(ePos.y-pPos.y,ePos.x-pPos.x)-Math.PI;
		const y_distance_remaining = Math.sin(angle) * distance_remaining;
		const x_distance_remaining = Math.cos(angle) * distance_remaining;
		const ticks_until_finished = this.knockback_push_time / timeFix;
		this.knockback_x_speed = x_distance_remaining / ticks_until_finished;
		this.knockback_y_speed = y_distance_remaining / ticks_until_finished;
	}
  update_knockback(delta){
    if(!this.knockback) return;
    const timeFix = delta / (1000 / 30);
    if(this.knockback_push_time > 0){
    
      this.push_player(this.x+this.knockback_x_speed*this.knockback_multiplayer,
                       this.y+this.knockback_y_speed*this.knockback_multiplayer);
      this.knockback_push_time -= delta;
      if(this.knockback_multiplayer > 0){
        this.knockback_multiplayer -= 0.17 * timeFix;
      }
      if(this.knockback_multiplayer < 0){
        this.knockback_multiplayer = 0;
      }
    }
    else if (this.knockback_push_time < 0){
      this.knockback_push_time = 0;
      this.knockback = false;
      if(this.knockback_limit_count < 100){
        this.knockback_limit_count = 0;
      } else {
        this.shadowed_invulnerability = true;
        this.shadowed_time_left = 1000;
        this.shadowed_time = 1000;
        this.knockback_limit_count = 0;
      }
    }
  }
  push_player(x,y){
    this.x = x;
    this.y = y;
  }
  renderEffects(ctx,a){
		const t = ctx.fillStyle;
		for (const e of this.getEffectConfigs())
			e.internal || null !== e.fillColor && (ctx.fillStyle = e.fillColor,
			ctx.beginPath(),
			this.addEffectPath(ctx, a, e),
			ctx.closePath(),
			ctx.fill());
		ctx.fillStyle = t;
	}
		render(e, t, delta) {
		if(this.area!=current_Area)return;
		this.updateDashTrailEffect(e, t),
		settings.confetti && (!this.createdConfetti && this.isDowned() ? (this.makeConfetti(),
		this.createdConfetti = !0) : this.createdConfetti && !this.isDowned() && (this.createdConfetti = !1),
		this.animateConfetti(),
		this.drawConfetti(e, t));
		settings.abilityParticles && (!this.createdSupernovaStars && this.usedSupernova ? (this.makeSupernova(),
		this.createdSupernovaStars = !0) : this.createdSupernovaStars && !this.usedSupernova && (this.createdSupernovaStars = !1),
		this.animateSupernova(),
		this.drawSupernova(e, t));
		const n = this.x + t.x
		  , r = this.y + t.y;
		function i(t, i, a, o=0) {
			e.beginPath(),
			e.arc(n + t, r + i, a, 0, 2 * Math.PI, !1),
			o > 0 && e.arc(n + t, r + i, o, 0, 2 * Math.PI, !0),
			e.fill(),
			e.closePath()
		}
		function a(e, t, n) {
			i(e, t, n / 2),
			i(e, -t, n / 2),
			i(-e, t, n / 2),
			i(-e, -t, n / 2)
		}
		let o = 1;
		const s = this.isDowned() && !this.rescueable;
		s && (o = this.deathTimer / this.deathTimerTotal);
		const l = this.getColor();
		if (s && (e.globalAlpha = o),
		"sticky-coat" === this.bodyName && !this.isDeparted) {
			const t = this.radius + ("sticky-coat" === this.bodyName ? 5 : 1);
			e.beginPath(),
			e.arc(n, r, t, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(0, 199, 0, 0.6)",
			e.fill(),
			e.closePath()
		}
		if ("toxic-coat" === this.bodyName && !this.isDeparted) {
			const t = this.radius + ("toxic-coat" === this.bodyName ? 5 : 1);
			e.beginPath(),
			e.arc(n, r, t, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(77, 1, 99, 0.6)",
			e.fill(),
			e.closePath()
		}
		if ((this.isBandaged || this.isUnbandaging) && !this.isDeparted) {
			const t = this.radius + (this.isBandaged ? 3 : 1);
			e.beginPath(),
			e.arc(n, r, t, 0, 2 * Math.PI, !1),
			e.fillStyle = "#dedabe",
			e.fill(),
			e.closePath(),
			this.isUnbandaging || (e.strokeStyle = "#aaa791",
			e.stroke())
		}
		if (this.isStickyCoatActivated && 1 === this.stickyCoatDisabled) {
			const t = 15 + (this.isStickyCoatActivated ? 20 : 1);
			e.beginPath(),
			e.arc(n, r, t, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(0, 199, 0, 0.2)",
			e.fill(),
			e.closePath()
		}
		if (this.ictosInvulnerability) {
			const t = this.radius + 5;
			e.beginPath(),
			e.arc(n, r, t, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(231, 175, 218, 0.5)",
			e.fill(),
			e.closePath()
		}
		if (this.mutatiorbBuffBackShield && !this.isDeparted && !this.isDowned() && this.mutatiorbBuffed) {
			const t = this.radius + (this.mutatiorbBuffBackShield ? 4 : 1)
			  , i = this.shieldAngle;
			let a = .5 * Math.PI;
			this.isFactorb && (a = .75 * Math.PI),
			e.beginPath(),
			e.arc(n, r, t, i - a, a + i, !1),
			e.lineWidth = 2,
			e.fillStyle = "#a6532d",
			e.fill(),
			e.strokeStyle = "#6e391e",
			e.stroke(),
			e.lineWidth = 1,
			e.closePath()
		}
		const c = 1e3 / 30;
		if (this.mortarTime > 3e3)
			e.fillStyle = l,
			this.mortarTime % (4 * c > 3 * c) ? i(1, 1, this.radius) : this.mortarTime % (4 * c > 2 * c) ? i(1, -1, this.radius) : this.mortarTime % (4 * c > c) ? i(-1, 1, this.radius) : i(-1, -1, this.radius);
		else if (this.mortarTime < 3e3 && this.mortarTime > 0)
			e.fillStyle = "rgba(75, 60, 60, 0.6)",
			this.mortarTime > 3e3 - c ? a(5, 5, this.radius) : this.mortarTime > 3e3 - 2 * c ? a(30, 30, this.radius) : this.mortarTime > 3e3 - 3 * c ? a(50, 50, this.radius) : this.mortarTime > 3e3 - 4 * c ? a(65, 65, this.radius) : this.mortarTime > 3e3 - 5 * c ? a(75, 75, this.radius) : a(Math.floor(this.mortarTime / 3e3 * 75), Math.floor(this.mortarTime / 3e3 * 75), this.radius);
		else {
			e.fillStyle = l;
			let t = 0;
			"doughnut" === this.bodyName && (t = .2 * this.radius),
			i(0, 0, this.radius, t)
		}
		e.globalAlpha = 1,
		this.renderIcedEffect(e, n, r),
		this.renderSnowballedEffect(e, n, r),
		this.renderPoisonedEffect(e, n, r),
		this.renderShadowedInvulnerabilityEffect(e, n, r),
		this.renderLeadEffect(e, n, r),
		this.renderContinuousReviveEffect(e, n, r),
		this.renderFlamingEffect(e, n, r),
		this.renderisBurningEffect(e, n, r),
		this.renderAccessory(e, n, r,delta);
		let u = "blue"
		  , d = "rgb(68, 118, 255)"
		  , f = this.energy / this.maxEnergy
		  , h = 0
		  , p = 0;
		if (this.energy > this.maxEnergy && (f = 1),
		this.energy < 0 && (f = 0),
		this.energized && (u = "rgb(255, 255, 0)",
		d = "rgb(211, 211, 0)"),
		this.sourCandyConsumed && (u = "rgb(153, 43, 255)",
		d = "rgb(110, 0, 212)"),
		this.sweetToothConsumed && (u = "rgb(255, 43, 143)",
		d = "rgb(212, 0, 100)"),
		this.energized && this.sweetToothConsumed && this.sourCandyConsumed && (u = "rgb(255, 255, 0)",
		d = "rgb(211, 211, 0)"),
		this.sourCandyConsumed && this.sweetToothConsumed && !this.energized && (u = "blue",
		d = "rgb(68, 118, 255)"),
		this.canGainEnergy || (u = "rgb(110, 110, 117)",
		d = "rgb(87, 87, 92)"),
		this.hasRadioactiveGloop && (h = 15 - this.radius),
		s && (e.globalAlpha = o),
		!this.isDeparted || this.hasRadioactiveGloop) {
			this.shouldDrawEnergyBar() || (e.globalAlpha = 0,
			void 0 === this.hatName && (p = 3.5)),
			e.fillStyle = u,
			e.fillRect(n - 18, r - this.radius - h - 8, 36 * f, 7),
			e.strokeStyle = d,
			e.strokeRect(n - 18, r - this.radius - h - 8, 36, 7),
			e.globalAlpha = 1,
			e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(12/camScale),
			e.textAlign = "center",
			settings.tileMode > 1 ? e.fillStyle = "white" : e.fillStyle = "black",
			e.fillText(this.name, n, r - this.radius - h + p - 11);
			let t = 25;
			if (this.magnetized && (e.beginPath(),
			e.arc(n + t, r - this.radius - h - 5, 3.5, 0, 2 * Math.PI, !1),
			e.strokeStyle = "rgb(149, 124, 0)",
			e.fillStyle = "rgb(210, 190, 90)",
			e.lineWidth = 2,
			e.fill(),
			e.stroke(),
			e.lineWidth = 1,
			e.closePath(),
			t += 10),
			this.hasUndeadInfection && (e.beginPath(),
			e.arc(n + t, r - this.radius - h - 5, 3.5, 0, 2 * Math.PI, !1),
			e.strokeStyle = "rgb(100, 168, 0)",
			e.fillStyle = "rgb(174, 227, 95)",
			e.lineWidth = 2,
			e.fill(),
			e.stroke(),
			e.lineWidth = 1,
			e.closePath(),
			t += 10),
			this.mutatiorbBuffEffectsReduction && this.mutatiorbBuffed && (e.beginPath(),
			e.arc(n + t, r - this.radius - h - 5, 3.5, 0, 2 * Math.PI, !1),
			e.strokeStyle = "rgb(59, 33, 19)",
			e.fillStyle = "rgb(110, 57, 30)",
			e.lineWidth = 2,
			e.fill(),
			e.stroke(),
			e.lineWidth = 1,
			e.closePath(),
			t += 10),
			this.underLibotEffect) {
				const t = 10
				  , i = 10
				  , a = n - 30
				  , o = r - this.radius - h - 9;
				e.beginPath(),
				e.moveTo(a + t, o),
				e.lineTo(a + t / 2, o + i),
				e.lineTo(a, o),
				e.closePath(),
				e.fillStyle = "rgb(255, 250, 189)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			if (this.underDabotEffect) {
				const t = 10
				  , i = 10
				  , a = n - 30
				  , o = r - this.radius - h - 9;
				e.beginPath(),
				e.moveTo(a + t, o),
				e.lineTo(a + t / 2, o + i),
				e.lineTo(a, o),
				e.closePath(),
				e.fillStyle = "rgb(61, 0, 110)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			if (this.hasWindDebuff) {
				const t = 10
				  , i = 10
				  , a = n - 30
				  , o = r - this.radius - h - 9;
				e.beginPath(),
				e.moveTo(a + t, o),
				e.lineTo(a + t / 2, o + i),
				e.lineTo(a, o),
				e.closePath(),
				e.fillStyle = "rgb(0, 181, 133)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			if (this.hasWaterDebuff) {
				const t = 10
				  , i = 10
				  , a = n - 30
				  , o = r - this.radius - h - 9;
				e.beginPath(),
				e.moveTo(a + t, o),
				e.lineTo(a + t / 2, o + i),
				e.lineTo(a, o),
				e.closePath(),
				e.fillStyle = "rgb(49, 155, 176)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			if (this.hasFireDebuff) {
				const t = 10
				  , i = 10
				  , a = n - 30
				  , o = r - this.radius - h - 9;
				e.beginPath(),
				e.moveTo(a + t, o),
				e.lineTo(a + t / 2, o + i),
				e.lineTo(a, o),
				e.closePath(),
				e.fillStyle = "rgb(232, 132, 9)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			if (this.hasEarthDebuff) {
				const t = 10
				  , i = 10
				  , a = n - 30
				  , o = r - this.radius - h - 9;
				e.beginPath(),
				e.moveTo(a + t, o),
				e.lineTo(a + t / 2, o + i),
				e.lineTo(a, o),
				e.closePath(),
				e.fillStyle = "rgb(176, 115, 49)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			t += 25
		}
		e.globalAlpha = 1,
		this.isDowned() && !s && (e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(16/camScale),
		e.textAlign = "center",
		e.fillStyle = "red",
		this.mutatiorbBuffSlowerDeathTimer && this.mutatiorbBuffed && (e.fillStyle = "rgb(110, 57, 30)"),
		e.fillText((this.deathTimer / 1e3).toFixed(0), n, r + 6))
	}
	renderIcedEffect(e, t, n) {
		if (!this.isIced)
			return;
		const r = (this.icedTime - this.icedTimeLeft) / this.icedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		4e3 === this.electrifyInterval ? e.fillStyle = "rgb(176, 73, 0)" : e.fillStyle = "rgb(137, 231, 255)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderSnowballedEffect(e, t, n) {
		if (!this.isSnowballed)
			return;
		const r = (this.snowballedTime - this.snowballedTimeLeft) / this.snowballedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(191, 0, 255)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderPoisonedEffect(e, t, n) {
		if (!this.isPoisoned)
			return;
		const r = (this.poisonedTime - this.poisonedTimeLeft) / this.poisonedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(83, 13, 105)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderShadowedInvulnerabilityEffect(e, t, n) {
		if (!this.shadowedInvulnerability)
			return;
		const r = (this.shadowedTime - this.shadowedTimeLeft) / this.shadowedTime
		  , i = .95;
		e.globalAlpha = i - i * r,
		(e.globalAlpha < 0 || e.globalAlpha > i) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(0, 0, 0)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderLeadEffect(e, t, n) {
		if (this.leadTime <= 0)
			return;
		const r = 1e3 * EvadesConfig.defaults.lead_sniper_projectile.effect_time
		  , i = (r - this.leadTime) / r
		  , a = .75;
		e.globalAlpha = a - a * i,
		(e.globalAlpha < 0 || e.globalAlpha > a) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(33, 33, 39)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderContinuousReviveEffect(e, t, n) {
		if (!this.continuousRevive)
			return;
		const r = (this.continuousReviveTime - this.continuousReviveTimeLeft) / this.continuousReviveTime
		  , i = .95;
		e.globalAlpha = i - i * r,
		(e.globalAlpha < 0 || e.globalAlpha > i) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(255, 255, 255)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderFlamingEffect(e, t, n) {
		if (this.flamingTimeLeft >= 1e3)
			return;
		const r = this.flamingTimeLeft / 1e3
		  , i = .95;
		e.globalAlpha = i - i * r,
		(e.globalAlpha < 0 || e.globalAlpha > i) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, n, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "#aa2f2f",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderisBurningEffect(e, t, a) {
		if (!this.isBurning)
			return;
		const r = (1500 - this.isBurningTime) / this.isBurningTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(t, a, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(247, 131, 6)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderAccessory(e, t, a, delta) {
		if (void 0 === this.hatName && void 0 === this.bodyName || this.isDeparted)
			return;
		this.bodyName && this.bodyName !== this.storedBodyName && (this.bodyImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("cosmetics/" + this.bodyName),
		this.storedBodyName = this.bodyName),
		this.hatName && this.hatName !== this.storedHatName && (this.hatImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("cosmetics/" + this.hatName),
		this.storedHatName = this.hatName);
		this.gemName && this.gemName !== this.storedGemName && (this.gemImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("accessories/" + this.gemName.toString() + "-gem"),
		this.storedGemName = this.gemName);
		const r = ()=>e.drawImage(this.bodyImage.getImage(delta), t - 5 * this.radius / 3, a - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3)
		  , c = ()=>e.drawImage(this.hatImage.getImage(delta), t - 5 * this.radius / 3, a - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3)
		  , o = ()=>{
			if (!this.hatName || !this.hatName.endsWith("-crown"))
				return;
			const r = [1e4, 7500, 5e3, 3500, 2500, 2e3, 1500, 1e3, 750, 500, 250, 100, 50];
			(r=>{
				null !== r && (null === this.gemImage && (this.gemImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("accessories/" + r.toString() + "-gem")),
				e.drawImage(this.gemImage.getImage(delta), t - 5 * this.radius / 3, a - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3))
			}
			)((e=>{
				if (this.gemName)
					return r.includes(parseInt(this.gemName)) ? this.gemName : null;
				if (e < r[r.length - 1])
					return null;
				for (const t of r)
					if (e >= t)
						return t
			}
			)(this.winCount))
		}
		;
		this.isDowned() && this.rescueable || this.isClinging || this.isDeparted ? (e.globalAlpha = .4,
		this.bodyName && !this.bodyName.endsWith("-coat") && r(),
		this.hatName && c(),
		o(),
		e.globalAlpha = 1) : (this.bodyName && !this.bodyName.endsWith("-coat") && r(),
		this.hatName && c(),
		o())
	}
	isDowned() {
		return -1 !== this.deathTimer
	}
	getColor() {
		let e = this.color;
		const t = this.isDowned() && !this.rescueable && !this.isEmber;
		if (this.isDowned() && !t) {
			const t = this.hexToRgb(e);
			e = `rgba(${t.r}, ${t.g}, ${t.b}, 0.4)`
		} else if (this.isClinging) {
			const t = this.hexToRgb(e);
			e = `rgba(${t.r}, ${t.g}, ${t.b}, 0.3)`
		} else if (this.nightActivated) {
			const t = this.hexToRgb(e);
			e = `rgba(${t.r}, ${t.g}, ${t.b}, 0.6)`
		} else if (this.isDeparted) {
			const t = this.hexToRgb(e);
			e = `rgba(${t.r}, ${t.g}, ${t.b}, 0)`
		} else
			this.isStone ? e = "rgba(145, 142, 133, 1)" : this.fusionActivated ? e = "rgba(60, 60, 75, 1)" : this.sugarRushActivated ? e = "rgba(230, 103, 164, 1)" : this.isObscured ? e = "rgba(0, 8, 96, 1)" : this.isEmber ? e = "rgba(87, 36, 16, 1)" : this.isWormhole ? e = "rgba(204, 194, 0, 1)" : 1 === this.roboScannerId ? e = "rgba(255, 0, 0, 1)" : 2 === this.roboScannerId ? e = "rgba(0, 0, 255, 1)" : 3 === this.roboScannerId ? e = "rgba(120, 20, 140, 1)" : 4 === this.roboScannerId ? e = "rgba(123, 157, 178, 1)" : 5 === this.roboScannerId ? e = "rgba(100, 193, 185, 1)" : 6 === this.roboScannerId ? e = "rgba(33, 161, 165, 1)" : 7 === this.roboScannerId ? e = "rgba(168, 124, 134, 1)" : 8 === this.roboScannerId ? e = "rgba(77, 1, 99, 1)" : 9 === this.roboScannerId ? e = "rgba(0, 199, 0, 1)" : 10 === this.roboScannerId ? e = "rgba(189, 103, 210, 1)" : 11 === this.roboScannerId ? e = "rgba(100, 35, 116, 1)" : 12 === this.roboScannerId ? e = "rgba(247, 131, 6, 1)" : 13 === this.roboScannerId ? e = "rgba(108, 84, 30, 1)" : 14 === this.roboScannerId ? e = "rgba(201, 0, 0, 1)" : 15 === this.roboScannerId ? e = "rgba(41, 255, 198, 1)" : 16 === this.roboScannerId ? e = "rgba(160, 83, 83, 1)" : 17 === this.roboScannerId ? e = "rgba(131, 0, 255, 1)" : 18 === this.roboScannerId ? e = "rgba(255, 144, 0, 1)" : 19 === this.roboScannerId ? e = "rgba(0, 204, 142, 1)" : 20 === this.roboScannerId ? e = "rgba(211, 19, 79, 1)" : 21 === this.roboScannerId ? e = "rgba(78, 39, 0, 1)" : 22 === this.roboScannerId ? e = "rgba(97, 255, 97, 1)" : 23 === this.roboScannerId ? e = "rgba(140, 1, 183, 1)" : 24 === this.roboScannerId ? e = "rgba(255, 56, 82, 1)" : 25 === this.roboScannerId ? e = "rgba(164, 150, 255, 1)" : 26 === this.roboScannerId ? e = "rgba(157, 227, 198, 1)" : 27 === this.roboScannerId ? e = "rgba(160, 83, 114, 1)" : 28 === this.roboScannerId ? e = "rgba(120, 136, 152, 1)" : 29 === this.roboScannerId ? e = "rgba(45, 50, 55, 1)" : 30 === this.roboScannerId ? e = "rgba(177, 156, 217, 1)" : 31 === this.roboScannerId ? e = "rgba(191, 82, 19)" : 32 === this.roboScannerId ? e = "rgba(10, 85, 87)" : 33 === this.roboScannerId && (e = "rgba(145, 77, 131)");
		for (const t of this.getEffectConfigs())
			if (null !== t.fillColor && t.internal) {
				e = t.fillColor;
				break
			}
		return e
	}
	makeConfetti() {
		for (let e = 0; e < this.randomIntRange(50, 150); e++)
			this.addConfetti()
	}
	addConfetti() {
		const e = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#cc7d60", "#b45c5c", "#397991"]
		  , t = e[this.randomIntRange(0, e.length - 1)]
		  , a = this.randomRange(this.x - 10, this.x + 10)
		  , r = this.randomRange(this.y - 50, this.y);
		this.confetti.push({
			x: a,
			y: r,
			size: this.randomIntRange(2, 8),
			color: t,
			initialY: r,
			vx: this.randomRange(-2.5, 2.5),
			vy: this.randomRange(-5, -.8)
		})
	}
	animateConfetti(delta) {
		for (let e = 0; e < this.confetti.length; e++) {
			const t = this.confetti[e];
			t.x += t.vx,
			t.y += t.vy,
			t.vx += this.randomRange(-.1, .1),
			t.vy += 10.5 * delta / 1e3,
			t.y >= t.initialY + 100 && this.confetti.splice(e, 1)
		}
	}
	drawConfetti(e, t) {
		for (let a = 0; a < this.confetti.length; a++)
			this.drawConfettiPiece(e, t, this.confetti[a])
	}
	drawConfettiPiece(e, t, a) {
		const r = a.x + t.x
		  , c = a.y + t.y;
		e.fillStyle = a.color,
		e.fillRect(r, c, a.size, a.size)
	}
	makeSupernova() {
		for (let e = 0; e < 45; e++)
			this.addSupernova()
	}
	addSupernova() {
		const e = ["#a07fffaa", "#9670ffaa", "#8b5dffaa", "#8053ffaa", "#7049ffaa", "#5f40ffaa"]
		  , t = ["#ffc000aa", "#ffecb0aa", "#ffffffaa"]
		  , a = Math.random() < .35
		  , r = a ? t[this.randomIntRange(0, t.length - 1)] : e[this.randomIntRange(0, e.length - 1)];
		let c, o;
		a ? (c = this.randomRange(-2, 2),
		o = this.randomRange(-2, 2)) : (c = this.randomRange(-8, 8),
		o = this.randomRange(-8, 8)),
		this.supernovaStars.push({
			x: this.x,
			y: this.y,
			size: 12,
			color: r,
			initialX: this.x,
			initialY: this.y,
			vx: c,
			vy: o,
			isSlow: a
		})
	}
	animateSupernova() {
		let e = 0;
		for (; e < this.supernovaStars.length; ) {
			const t = this.supernovaStars[e];
			t.x += t.vx,
			t.y += t.vy,
			t.vx *= .96,
			t.vy *= .96;
			const a = t.isSlow ? this.randomRange(20, 300) : this.randomRange(20, 600);
			t.y >= t.initialY + a || t.y <= t.initialY - a || t.x >= t.initialX + a || t.x <= t.initialX - a || Math.abs(t.vx) < .1 && Math.abs(t.vy) < .1 ? this.supernovaStars.splice(e, 1) : e += 1
		}
	}
	drawSupernova(e, t) {
		for (let a = 0; a < this.supernovaStars.length; a++)
			this.drawSupernovaPiece(e, t, this.supernovaStars[a])
	}
	drawSupernovaPiece(e, t, a) {
		const r = a.x + t.x
		  , c = a.y + t.y
		  , o = a.size / 2
		  , n = o
		  , $ = o / 2.5;
		e.fillStyle = a.color,
		e.beginPath();
		for (let t = 0; t < 10; t++) {
			const a = t * Math.PI / 5
			  , o = t % 2 == 0 ? n : $
			  , i = r + o * Math.cos(a)
			  , d = c + o * Math.sin(a);
			e.lineTo(i, d)
		}
		e.closePath(),
		e.globalAlpha = Math.min(1, .5 + Math.min(Math.abs(a.vx / 10), Math.abs(a.vy / 10))),
		e.fill(),
		e.globalAlpha = 1
	}
	randomIntRange(e, t) {
		return Math.floor(Math.random() * (t - e + 1)) + e
	}
	randomRange(e, t) {
		return Math.random() * (t - e + Number.EPSILON) + e
	}
	updateDashTrailEffect(e, t) {
		if (!this.isDashing && !this.dashTrails.length)
			return;
		let a = 0;
		for (; a < this.dashTrails.length; ) {
			const r = this.dashTrails[a];
			if (r.lifetime -= 1,
			r.lifetime <= 0) {
				this.dashTrails.splice(a, 1);
				continue
			}
			const c = r.x + t.x
			  , o = r.y + t.y;
			e.globalAlpha = .15 + .15 * r.lifetime,
			e.beginPath(),
			e.arc(c, o, r.radius, 0, 2 * Math.PI, !1),
			e.fillStyle = r.color,
			e.fill(),
			e.closePath(),
			e.globalAlpha = 1,
			a += 1
		}
		this.isDashing && this.dashTrails.push({
			x: this.x,
			y: this.y,
			radius: this.radius,
			color: this.color,
			lifetime: 5
		})
	}
	shouldDrawEnergyBar() {
		const e = settings.displayEnergyBars;
		return e < 1 || 1 == e && this.isLocalPlayer || 2 == e && !this.isLocalPlayer
	}
}
let $9bc26d320fe964d6$var$totalConfettiRendered = 0;
const $9bc26d320fe964d6$var$MaxConfettiRendered = 500;
//Entity
function clamp(a,r,t){return Math.min(t,Math.max(r,a))}
function rectCircleCollision(cx, cy, cr, x, y, width, height) {
  var tx = clamp(cx,x,x+width);
  var ty = clamp(cy,y,y+height);
  var dx=(cx-tx);
  var dy=(cy-ty);
const dist=Math.sqrt(dx**2+dy**2);
  var e={};
  var isZeroRadius=cr==0;
  e.c=isZeroRadius?(dist <= cr):(dist<cr);
  e.ax=Math.abs(dx);
  e.ay=Math.abs(dy);
  e.x=dx;
  e.y=dy;
  return e;
};
class SimulatorEntity extends EvadesEntity{
  constructor(x,y,color,radius,type,speed=0,angle) {
	super();
    this.color = color;
	this.effects=[];
	this.rectCircleCollide=false;
    this.type=type;
	this.lightRectangle=null;
	this.outline=false;
    this.speed=speed;
    this.angle=angle!=undefined?(angle*Math.PI/180):(Math.random()*Math.PI*2);
    this.target_angle=this.angle;
    this.velX=Math.cos(this.angle)*this.speed;
    this.velY=Math.sin(this.angle)*this.speed;
    this.x=x;
	//this.id=Math.random();
    this.y=y;
    this.health=0;
    this.maxHealth=0;
    this.shatterTime=0;
	this.harmlessTime=0;
    this.reduced=false;
    this.gainedImmunity=false;
    this.isHarmless=false;
    this.corrosive=false;
    this.burning=false;
    this.healingTime=0;
    this.inFear=false;
    this.decayed=false;
    this.isBarrier=false;
    this.isRepelling=false;
    this.isDestroyed=false;
    this.lightRadius=null;
	this.frozen=false;
    this.radius=radius;
	this.energy=30;
	this.maxEnergy=this.energy;
    this.ogradius=this.radius;
    this.radiusMultiplier=1;
    this.radiusMultiplierEffects=[];
    this.speedMultiplier=1;
	this.speedMultiplierEffects=[];
	this.unfreezeTimer=40e3/9;
	this.unfreezeTimerTotal=40e3/9;
  }
  damage(damage){}
  freeze(duration){
	if(!this.movement_immune){
		this.frozen=true;
		this.frozenTime=duration;
		this.unfreezeTimer=0;
	}
  }
  anglevel(){
    this.velX=Math.cos(this.angle)*this.speed;
    this.velY=Math.sin(this.angle)*this.speed;
  }
  playerInteraction(player,delta){
  }
  auraEffect(player,delta){
	for(let effect of this.effects){
		if(Math.sqrt((this.x-player.x)**2+(this.y-player.y)**2)<effect.radius+player.radius){
			if(effect.effectType==41)
				if(!player.isStone)this.losing_health=true;
			if(effect.effectType==44)
				player.slowing=[true,this.slow];
			if(effect.effectType==45)
				player.draining=[true,this.drain];
			if(effect.effectType==46)
				if (!player.invulnerable) {
					var dx = player.x - this.x;
					var dy = player.y - this.y;
					var dist = distance({x:0,y:0},{x:dx,y:dy});
					var attractionAmplitude = Math.pow(2,-dist/100);
					var moveDist = this.gravity*attractionAmplitude;
					var angleToPlayer = Math.atan2(dy, dx);
					player.x-=moveDist*Math.cos(angleToPlayer)*delta/1000;
					player.y-=moveDist*Math.sin(angleToPlayer)*delta/1000;
					player.collision(0);
				};
			if(effect.effectType==47)
				if (!player.invulnerable) {
					var dx = player.x - this.x;
					var dy = player.y - this.y;
					var dist = distance({x:0,y:0},{x:dx,y:dy});
					var attractionAmplitude = Math.pow(2,-dist/100);
					var moveDist = this.repulsion*attractionAmplitude;
					var angleToPlayer = Math.atan2(dy, dx);
					player.x+=moveDist*Math.cos(angleToPlayer)*delta/1000;
					player.y+=moveDist*Math.sin(angleToPlayer)*delta/1000;
					player.collision(0);
				};
			if(effect.effectType==48)
				player.freezing=true;
			if(effect.effectType==49)
				player.slippery=true;
			if(effect.effectType==50)
				player.disabling=true;
			if(effect.effectType==51)
				player.experienceDraining=true;
			if(effect.effectType==52)
				player.enlarging=true;
			if(effect.effectType==53)
				player.toxic=true;
			if(effect.effectType==54)
				player.magneticReduction=true;
			if(effect.effectType==55)
				player.magneticNullification=true;
			if(effect.effectType==56)
				player.lava=true;
			if(effect.effectType==57&&!(player.effectImmune==0||player.admin)){
				if(this.health>=this.maxHealth*0.98)player.cybotEffect=1;
				else if(this.health>=this.maxHealth*0.3)player.cybotEffect=2;
				else player.cybotEffect=3;
			}
			if(effect.effectType==58)
				void null;
			if(effect.effectType==59)
				if(!player.invulnerable)
					player.quicksand=[true,this.push_direction??(180/Math.PI*player.inputAngle),this.quicksand_strength];
			if(effect.effectType==60)
				void null;
			if(effect.effectType==61)
				player.inEnemyBarrier=true;
			if(effect.effectType==62)
				player.reducing=true;
			if(effect.effectType==63)
				player.blocking=true;
			if(effect.effectType==64)
				void null;
			if(effect.effectType==65)
				void null;
			
		}
	}
  }
  velangle(){
	if(this.velY==0&&this.velX==0)return this.angle;
    this.angle=Math.atan2(this.velY,this.velX);
  }
  update(delta,area,collide=true){
	if(this.healingTime>0)this.healingTime-=delta;
	this.radius=this.ogradius*this.radiusMultiplier;
	this.radiusMultiplier=1;
    this.x+=this.velX*this.speedMultiplier*delta/1e3;
    this.y+=this.velY*this.speedMultiplier*delta/1e3;
    this.speedMultiplier=1;
    this.collision(delta,collide);
  }
  collision(delta,collide=true){
	if(this.harmlessTime>0)this.harmlessTime-=delta;
	if(this.harmlessTime<=0&&!this.disabled)this.isHarmless=this.switchedHarmless||(this.healingTime>0);
	if(this.frozenTime>0){
	  this.frozenTime-=delta;
	  this.speedMultiplier=0;
	}else if(this.frozen){
	  this.frozen=false;
	  this.speedMultiplierEffects.push({type:"freeze",time:0})
	};
	if(this.minimizeTime>0){
		this.radiusMultiplier*=0.5;
	}else{
		//Ain't no way to implement this return to original stat because i dont have access to EvadesClassic source code.
	}
	this.speedMultiplierEffects.map(e=>{
		e.time+=delta;
		this.speedMultiplier*=e.time/(40e3/9);
	});
	this.speedMultiplierEffects=this.speedMultiplierEffects.filter(e=>{
		return e.time < 40e3/9;
	});
	if(collide){
		let collided=false;
		if(this.assetCollision())collided=true;
		if(collided)this.onCollide();
	}
    for(var i in map.players){
      var player = map.players[i];
      if(this.rectCircleCollide){
        if(rectCircleCollision(player.x,player.y,player.radius,this.x,this.y,this.width,this.height).c){
		  this.playerInteraction(player,delta);
        }
	  }else{
	    if(Math.sqrt((this.x-player.x)**2+(this.y-player.y)**2)<(this.radius+player.radius)){
		  this.playerInteraction(player,delta);
        }
	  }
      if(!player.safeZone&&player.deathTimer==-1){
        this.auraEffect(player,delta);
      }
    }
  }
  onCollide(){
    
  }
  onBeforeCollide(){
  }
  assetCollision(){
    let collided=false;
    const walls=map.areas[this.area].entities.filter(e=>(e instanceof Wall && (e.collisionIndex==this.z||e.collisionIndex==-1)));
    let centerX,centerY,halfWidth,halfHeight;
    for(var i of walls){
      halfWidth=i.width/2;
      halfHeight=i.height/2;
      centerX=i.x+halfWidth;
      centerY=i.y+halfHeight;
      var distX = Math.abs(this.x - centerX);
      var distY = Math.abs(this.y - centerY);
      var radius=this.radius;
      var c=rectCircleCollision(this.x,this.y,radius,i.x,i.y,i.width,i.height);
      if(c.c){
		this.onBeforeCollide();
        collided=true;
        var a=Math.atan2(c.y,c.x);
        var relX = (this.x - centerX) / halfWidth;
        var relY = (this.y - centerY) / halfHeight;
        if (Math.abs(relX) > Math.abs(relY)) {
          // Horizontal collision.
          if (relX > 0) {
            //corner collision at right side
            if(relY*halfHeight > halfHeight){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else if(relY*halfHeight < -halfHeight){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else{
              // middle right collision
              this.x = centerX + halfWidth + this.radius;
              this.velX=Math.abs(this.velX);
              this.velangle();
            }
          } else {
            //corner collision for left side
            if(relY*halfHeight > halfHeight){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else if(relY*halfHeight < -halfHeight){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else{
              // middle left collision
              this.x = centerX - halfWidth - this.radius;
              this.velX=-Math.abs(this.velX);
              this.velangle();
            }
          }
        } else {
          // Vertical collision
          if (relY > 0) {
            //corner collision for bottom side
            if(relX*halfWidth > halfWidth){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else if(relX*halfWidth < -halfWidth){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY + halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else{
              // middle bottom collision
              this.y = centerY + halfHeight + this.radius;
              this.velY=Math.abs(this.velY);
              this.velangle();
            }
          } else {
            //corner collision for top side
            if(relX*halfWidth > halfWidth){
              this.x = centerX + halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else if(relX*halfWidth < -halfWidth){
              this.x = centerX - halfWidth + this.radius*Math.cos(a);
              this.y = centerY - halfHeight + this.radius*Math.sin(a);
              this.angle=a;
              this.anglevel();
            }else{
              // middle top collision
              this.y = centerY - halfHeight - this.radius;
              this.velY=-Math.abs(this.velY);
              this.velangle();
            }
          }
        }
      }
    }
    return collided;
    }
	getColorChange() {
		return this.color
	}
	drawShattered(e) {
		const t = this.x
		  , r = this.y;
		function c(a, c, o) {
			e.moveTo(t + a, r + c),
			e.arc(t + a, r + c, o, 0, 2 * Math.PI, !1)
		}
		function o(a, t, r, o) {
			e.beginPath();
			for (let e = 0; e < 8; e++) {
				c(Math.cos(o) * a, Math.sin(o) * a, t),
				o += 2 * Math.PI / r
			}
			e.fill(),
			e.closePath()
		}
		function n(a, t, r) {
			e.beginPath(),
			c(a, t, r),
			e.fill(),
			e.closePath()
		}
		const $ = this.radius / 4
		  , d = this.radius
		  , i = 1e3
		  , s = 4e3 - Math.min(this.shatterTime, 4e3)
		  , f = (s - 500) / 500
		  , l = (s - i) / 3e3;
		if (e.fillStyle = this.color,
		s < 250)
			n(0, 0, Math.max($, Math.max($, this.radius * (1 - s / 250))));
		else if (s < 500)
			n(0, 0, $);
		else if (s < i) {
			o(f * d, this.radius / 3, 3, 5 * f)
		} else {
			o(d - l * d, Math.min(this.radius, Math.max($, this.radius * l)), 3, 5 - 3 * l)
		}
	}
	renderEffects(ctx,a){
		const t = ctx.fillStyle;
		for (const e of this.getEffectConfigs())
			e.internal || null !== e.fillColor && (ctx.fillStyle = e.fillColor,
			ctx.beginPath(),
			this.addEffectPath(ctx, a, e),
			ctx.closePath(),
			ctx.fill());
		ctx.fillStyle = t;
	}
	render(e, t, delta) {
		(this.isHarmless || this.grassHarmless) && (e.globalAlpha = .4);
		let n = this.harmlessTime;
		if (this.grassHarmless && this.grassTime > 0 && (n = Math.max(this.grassTime, n)),
		settings.fadingEffects && n < 1e3 && n > 0 && (e.globalAlpha = .4 + .6 * (1 - n / 1e3)),
		this.duration < 500 && (e.globalAlpha = Math.min(e.globalAlpha, this.duration / 500 + .2)),
		this.fadeInTime <= 1500 && this.soulFading && (e.globalAlpha = 1 - this.fadeInTime / 1500),
		this.isDestroyed && (e.globalAlpha = 0),
		this.brightness > 0 && (e.globalAlpha = Math.min(this.brightness, e.globalAlpha)),
		this.maxHealth > 0) {
			const n = "rgb(140, 59, 59)"
			  , r = "red"
			  , i = "rgb(255, 68, 68)"
			  , a = this.health / this.maxHealth;
			e.fillStyle = n,
			e.fillRect(this.x + t.x - 18, this.y + t.y - this.radius - 8, 36, 7),
			e.fillStyle = r,
			e.fillRect(this.x + t.x - 18, this.y + t.y - this.radius - 8, 36 * a, 7),
			e.strokeStyle = i,
			e.strokeRect(this.x + t.x - 18, this.y + t.y - this.radius - 8, 36, 7)
		}
		if (this.name && (e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(12/camScale),
		e.textAlign = "center",
		e.fillStyle = settings.tileMode > 1 ? "white" : "black",
		e.fillText(this.name, this.x + t.x, this.y + t.y - this.radius - 11)),
		this.inFear ? (e.font = "bolder 20px Arz",
		e.fillStyle = "#d32323",
		e.fillText("!", this.x + t.x, this.y + t.y - this.radius - 5)) : this.provoked && (e.font = "bolder 20px Arial",
		e.fillStyle = "#A0A7AD",
		e.fillText("!", this.x + t.x, this.y + t.y - this.radius - 5)),
		this.reduced && (e.font = "bolder 32px Arz",
		e.fillStyle = "#1212cf",
		e.fillText("↓", this.x + t.x + this.radius + 5, this.y + t.y + 8)),
		this.shatterTime > 0)
			this.drawShattered(e, t);
		else if (this.mortarTime > 0)
			this.drawExploded(e, t);
		else {
			let n = this.radius;
			if (void 0 !== this.visualRadius && (n = this.visualRadius),
			e.beginPath(),
			e.arc(this.x + t.x, this.y + t.y, n, 0, 2 * Math.PI, !1),
			void 0 === this.image ? (e.fillStyle = this.getColorChange(),
			e.fill()) : this.image.draw(e, this.x + t.x - this.radius, this.y + t.y - this.radius, 2 * n, 2 * n),
			this.isRepelling && (e.fillStyle = "rgba(255, 0, 93, 0.9)",
			e.fill()),
			this.decayed && !this.healingTime > 0 && (e.fillStyle = "rgba(0, 0, 128, 0.2)",
			e.fill()),
			this.healingTime > 0 && (e.fillStyle = "rgb(0, 221, 0)",
			e.fill()),
			this.burning && !this.healingTime > 0 && !this.decayed && (e.fillStyle = "rgba(205, 75, 27, 0.8)",
			e.fill()),
			this.petrified && (e.fillStyle = "rgba(70, 55, 92, 0.75)",
			e.fill()),
			this.gainedImmunity && (e.fillStyle = "rgb(0, 0, 0)",
			e.fill()),
			this.releaseTime <= 500) {
				const t = (500 - Math.max(this.releaseTime, 0)) / 500 * .2 + .05;
				e.fillStyle = `rgba(1, 1, 1, ${t})`,
				e.fill()
			}
			if (settings.fadingEffects && this.switchTime <= 1500) {
				const t = .3 - .3 * Math.cos((1500 - this.switchTime) / 220 * Math.PI);
				this.switchedHarmless ? e.fillStyle = `rgba(25, 25, 25, ${t})` : e.fillStyle = `rgba(127, 127, 127, ${.85 * t})`,
				e.fill()
			}
			settings.enemyOutlines && this.outline && (e.lineWidth = 2,
			settings.tileMode > 1 ? e.strokeStyle = "white" : e.strokeStyle = "black",
			e.stroke(),
			e.lineWidth = 1),
			e.closePath()
		}
		e.globalAlpha = 1
	}
}
//UTILS
function modulus(x,y){
  return (x%y+y)%y
}
function speedparts(direction,speed){
  direction--;
  var x=Math.cos(direction*Math.PI/2)*speed;
  var y=Math.sin(direction*Math.PI/2)*speed;
  if(Math.abs(x)<1e-10)x=0;
  if(Math.abs(y)<1e-10)y=0;
  return {x,y}
}
//BASE ENEMY
class Enemy extends SimulatorEntity{constructor(x,y,radius,speed,angle,type){super(x,y,getEntityColor(type),radius,type,speed,angle);this.isEnemy=true;this.outline=true;this.timer_reduction=1}playerInteraction(player,delta){EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune)}update(delta,area,collide){super.update(delta,area,collide)}};

function distance(a,b){
  return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
}
function EnemyPlayerInteraction(player,enemy,corrosive,harmless,immune,ignores_safe_zone=true){
	var dead=true;
	if(harmless===undefined){
		harmless=enemy.isHarmless;
	}
	var heal;
	if(enemy.healingTime>0){
		heal=true;
	}
	if(ignores_safe_zone||!player.safeZone){
		if(player.nightActivated&&!immune&&!enemy.isHarmless){
			player.nightActivated=false;
			player.nightDuration=0;
			player.speedAdditioner=0;
			enemy.isHarmless=true;
			enemy.harmlessTime=2000;
			harmless=true;
		}
		if(enemy.texture=="entities/pumpkin_off"||enemy.radius==0||harmless||enemy.shatterTime>0||player.godmode||player.admin){
			dead=false;
		}
		if(dead&&!corrosive){
			if(player.isBandaged){
				player.isBandaged=false;
				player.isUnbandaging=true;
				player.invulnerable=true;
				setTimeout(()=>{player.isUnbandaging=player.invulnerable=false;},900)
			}
		}
		if((player.invulnerable&&!corrosive)||harmless||enemy.radius<1){
			dead=false;
		}
		if(player.isDowned()&&heal&&!dead)
			player.deathTimer=-1;
		if(player.deathTimer==-1&&dead&&!heal){
			player.wasDowned=true;
			death(player);
		}
	}
}
function death(player){
    function checkAreaProperties(e){
        var s=map.areas[player.area].properties[e] ?? (map.properties[e] ?? defaultValues.properties[e]);
        return s;
    }
    const death_timer_multiplier=1-player.deathTimerTotalMultiplier;
    let death_timer=60000;
    if(player.area<1)
        death_timer=10000;
    else if(player.area<3)
        death_timer=15000;
    else if(player.area<6)
        death_timer=20000;
    else if(player.area<8)
        death_timer=25000;
    else if(player.area<10)
        death_timer=30000;
    if(checkAreaProperties("death_timer")!=void 0)
        death_timer=checkAreaProperties("death_timer");
    player.deathTimer=player.deathTimerTotal=death_timer*death_timer_multiplier;
    player.effects=[];
}
//PELLETS

class Oscillator {
	constructor(value, min, max, increment, increasing) {
		this.value = value,
		this.min = min,
		this.max = max,
		this.increment = increment,
		this.increasing = increasing
	}
	update(delta) {
		this.increasing ? (this.value += this.increment * delta / 1e3,
		this.value >= this.max && (this.value = this.max,
		this.increasing = !1)) : (this.value -= this.increment * delta / 1e3,
		this.value <= this.min && (this.value = this.min,
		this.increasing = !0))
	}
}
class Pellet extends SimulatorEntity{
	static colors = ["#b84dd4", "#a32dd8", "#3b96fd", "#43c59b", "#f98f6b", "#61c736"];
	static darkColors = ["#621c74", "#52146e", "#02499a", "#1f654e", "#ab3107", "#30631b"]
	constructor(x,y,radius,pellet_zones){
		super(x,y,null,radius,"pellet",0,0);
		this.color=null;
		this.darkColor=null;
		this.scaleOscillator = new Oscillator(1.1,1.1,1.2,.15,!0);
		this.pellet_zones=pellet_zones;
		this.afterStateUpdate();
	}
	stateFields() {
		return ["x", "y", "radius"]
	}
	afterStateUpdate() {
		if (null === this.color || null === this.darkColor)
			if (Math.random() < 1e-5)
				this.color = "#333333",
				this.darkColor = "#cccccc";
			else {
				const e = Math.floor((Math.abs(this.x) + Math.abs(this.y)) % Pellet.colors.length);
				this.color = Pellet.colors[e],
				this.darkColor = Pellet.darkColors[e]
			}
		setDefaultsFor(this, this.stateFields(), "pellet")
	}
	playerInteraction(player){
		const areaOfZone=this.pellet_zones.map(e=>e.width*e.height),
			sum=areaOfZone.reduce((e,t)=>(e+t));
		for(const i in areaOfZone)
			if(void 0!==areaOfZone[i-1])areaOfZone[i]+=areaOfZone[i-1];
		const randZone=this.pellet_zones[areaOfZone.map(e=>(Math.random()*sum<e)).indexOf(true)];
		this.x=randZone.x+randomRange(this.radius,randZone.width-this.radius);
		this.y=randZone.y+randomRange(this.radius,randZone.height-this.radius);
		if(player.abilityOne.pellet_powered)
			player.abilityOne.cooldown-=map.areas[player.area].properties.pellet_multiplier??map.properties.pellet_multiplier;
		if(player.abilityTwo.pellet_powered)
			player.abilityTwo.cooldown-=map.areas[player.area].properties.pellet_multiplier??map.properties.pellet_multiplier;
		if(player.abilityThree?.pellet_powered)
			player.abilityThree.cooldown-=map.areas[player.area].properties.pellet_multiplier??map.properties.pellet_multiplier;
		player.updateExp(Math.floor(1+player.area/3)*(map.areas[player.area].properties.pellet_multiplier??map.properties.pellet_multiplier));
	}
	calculateExperience(HeroLevel){
		return Math.floor(Math.min(HeroLevel,100)*Math.min(HeroLevel+1,101)*2+Math.max(0,HeroLevel*(HeroLevel+1)*(2*HeroLevel-179)/60-3535))
	}
	update(delta){
		super.update(delta);
		this.scaleOscillator.update(delta);
	}
	render(e,t) {
		e.beginPath(),
		e.arc(this.x + t.x, this.y + t.y, this.radius * this.scaleOscillator.value, 0, 2 * Math.PI, !1),
		settings.tileMode > 1 ? e.fillStyle = this.darkColor : e.fillStyle = this.color,
		e.globalAlpha = 1 - settings.pelletTransparency,
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1;
	}
}
class Torch extends SimulatorEntity{
  constructor(x,y,upside_down){
    super(x,y,null,null,"torch");
	this.image = null,
	this.baseLightRadius = 100,
	this.randomFlickerRadius = 10,
	this.flickerChance = 4.5,
	this.lightRadius = this.baseLightRadius;
	this.rectCircleCollide=true;
	this.flipped=upside_down;
	this.imageName="torch";
	this.loadedImageName="torch";
	this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8("entities/" + this.imageName);
	this.width=13;
	this.height=36;
  }
  update(){}
  render(ctx,t,delta) {
	this.flickerChance = 4.5 * delta / 1e3;
	const a = this.x + t.x
	  , r = this.y + t.y;
	Math.random() <= this.flickerChance && (this.lightRadius = this.baseLightRadius + Math.random() * this.randomFlickerRadius);
	this.flipped ? (ctx.translate(a + this.width / 2, r + this.height / 2),
	ctx.scale(1, -1),
	this.image.draw(ctx, delta, -this.width / 2, -this.height / 2, this.width, this.height),
	ctx.scale(1, -1),
	ctx.translate(-(a + this.width / 2), -(r + this.height / 2))) : this.image.draw(ctx, delta, a, r, this.width, this.height)
  }
}
class LightRegion extends SimulatorEntity{
  constructor(x,y,width,height){
    super(x,y,null,null,"light_region");
	this.lightRectangle={x,y,width,height,intensity:1};
  }
  update(){}
  render(ctx,ctxL,delta) {}
}
class Gate extends SimulatorEntity{
  constructor(x,y,width,height){
    super(x,y,null,null,"gate");
	this.width=width;
	this.height=height;
  }
  update(){}
  render(ctx,ctxL,delta) {
	ctx.imageSmoothingEnabled = false;
	  ctx.drawImage(
          tileMap,646,2,134,598,
          this.x,
          this.y,
          this.width,
          this.height
        );
  }
}
class Wall extends SimulatorEntity{
  constructor(x,y,width,height,texture=null,collisionIndex=-1){
    super(x,y,null,null,"wall");
	this.texture=texture;
	this.collisionIndex=collisionIndex;
	this.wall=true;
	this.width=width;
	this.height=height;
  }
  update(){}
  render(ctx,camera) {
	ctx.imageSmoothingEnabled=false;
	if(null!=this.texture){
		$d2f179ecccc561fa$export$b9dfb366e63af805(ctx, $d2f179ecccc561fa$export$b9b1204f7239550e(this.texture, null, settings.tileMode), 0, 0, this.width, this.height, {x:camera.x+this.x,y:camera.y+this.y});
		this.showOnMap=true;
	}
  }
}
class FlashlightItem extends SimulatorEntity{
  constructor(x,y){
    super(x,y,null,null,"flashlight_item");
	this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8('entities/flashlight_item');
	this.spawnInterval=1e3;
	this.rectCircleCollide=true;
	this.width=32;
	this.height=16;
	this.spawnTime=this.spawnInterval-1e3;
	this.isSpawned=false;
  }
  update(delta,area){
    if(this.spawnTime>=this.spawnInterval && !this.isSpawned){
		this.isSpawned=true;
		this.spawnTime=0;
	}else this.spawnTime+=delta;
    super.update(delta,area,false);
  }
	playerInteraction(player){
		if(!player.abilityThree&&this.isSpawned){
			player.abilityThree=new Ability;
			if(player.abilityThree.abilityType!=98){
				player.abilityThree.abilityType=98;
				player.abilityThree.unionState(abilityConfig[player.abilityThree.abilityType]);
				player.abilityThree.locked=false;
				player.abilityThree.level=1;
				player.abilityThree.abilityType=player.abilityThree.abilityType;
				this.isSpawned=false;
			}
		}
	}
  render(e,t){
	if(!this.isSpawned)return;
	e.imageSmoothingEnabled=false;
	this.image.draw(e,this.x+t.x,this.y+t.y,this.width,this.height)
  }
}
class ZigzagSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"zigzag_switch_enemy");
	this.zigSpeed=0;
	this.zigTime=0;
	this.zigSwitched=false;
	this.speeding=true;
	this.dir=1;
	this.constantSpeedIncrement=45/7;
	this.angle=Math.round(this.angle/(Math.PI/2))*(Math.PI/2);
	this.anglevel();
    this.switchAdd=false;
    this.turnAngle=Math.PI/2;
    this.switch_inverval = 3e3;
	this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  update(delta){
	this.zigTime+=delta;
    if (this.zigSpeed < 1.5 && this.speeding) {
      this.zigSpeed += this.constantSpeedIncrement*delta/1e3;
	  if(this.zigSpeed > 1.5)this.zigSpeed=1.5,this.speeding=false;
    } else if(this.zigSpeed >= 0 && !this.speeding){
      this.zigSpeed -= this.constantSpeedIncrement*delta/1e3;
	  if(this.zigSpeed < 0)this.zigSpeed=0,this.zigTime>500&&(this.speeding=true,this.zigTime%=500,this.zigSwitched=true);
	}
	this.speedMultiplier*=this.zigSpeed;
	if(this.zigSwitched){
    if (!this.switchAdd) {
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle -= this.turnAngle * this.dir;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
	  this.switchAdd=true;
    } else {
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle += this.turnAngle * this.dir;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
	  this.switchAdd=false;
    }
	  this.zigSwitched=false;}
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
}
class ZoningSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"zoning_switch_enemy");
    this.zoneInterval = 1000;
    this.zoneTime = Math.random() * this.zoneInterval;
	this.zoneSpeed=0;
	this.speedIncrement=2.9;
	this.speeding=this.zoneTime < 500;
	this.zoneSwitched=false;
	this.dir=1;
    this.turnAngle = Math.PI / 2
    this.turnAngle *= (Math.floor(Math.random() * 2) * 2) - 1
	this.angle=Math.round(this.angle/(Math.PI/2))*(Math.PI/2);
	this.anglevel();

    this.switch_inverval = 3e3;
	this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  update(delta){
	this.zoneTime+=delta;
    if (this.zoneSpeed <= 1.45 && this.speeding) {
      this.zoneSpeed = this.zoneTime/1e3*this.speedIncrement;
	  if(this.zoneSpeed >= 1.45)this.zoneSpeed=1.45,this.zoneTime>(29e3/60)&&(this.speeding=false);
    } else if(this.zoneSpeed >= 0 && !this.speeding){
      this.zoneSpeed = 1.45-(this.zoneTime-(29e3/60))/1e3*this.speedIncrement;
	  if(this.zoneSpeed <= 0)this.zoneSpeed=0,this.zoneTime>1000&&(this.speeding=true,this.zoneTime=0,this.zoneSwitched=true);
	}
	this.speedMultiplier*=Math.min(this.zoneSpeed,1.4);
    if (this.zoneSwitched) {
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle += this.turnAngle * this.dir;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
	  this.zoneSwitched=false;
    }
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
  onCollide(){
	  this.dir*=-1;
  }
}
class SpiralSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"spiral_switch_enemy");
    this.angleIncrement = 0.15;
    this.angleIncrementChange = 0.12;
    this.angleAdd = false;
    this.dir = 1
    this.switch_inverval = 3e3;
	this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  update(delta) {
    if (this.angleIncrement < 0.001) {
      this.angleAdd = true;
    } else if (this.angleIncrement > 0.35) {
      this.angleAdd = false;
    }
    if (this.angleIncrement < 0.05) {
      this.angleIncrementChange = 0.066;
    } else {
      this.angleIncrementChange = 0.12;
    }
    if (this.angleAdd) {
      this.angleIncrement += this.angleIncrementChange * (delta / 1000);
    } else {
      this.angleIncrement -= this.angleIncrementChange * (delta / 1000);
    }
    this.velangle();
    this.angle += this.angleIncrement * this.dir * (delta / (1000 / 30));
    this.anglevel();
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class OscillatingSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"oscillating_switch_enemy");
    this.zoneInterval = 1000;
    this.zoneTime = Math.random() * this.zoneInterval;
	this.zoneSpeed=0;
	this.speedIncrement=2.9;
	this.speeding=this.zoneTime < 500;
	this.zoneSwitched=false;
    this.switch_inverval = 3e3;
	this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  update(delta){
	this.zoneTime+=delta;
    if (this.zoneSpeed <= 1.45 && this.speeding) {
      this.zoneSpeed = this.zoneTime/1e3*this.speedIncrement;
	  if(this.zoneSpeed >= 1.45)this.zoneSpeed=1.45,this.zoneTime>(29e3/60)&&(this.speeding=false);
    } else if(this.zoneSpeed >= 0 && !this.speeding){
      this.zoneSpeed = 1.45-(this.zoneTime-(29e3/60))/1e3*this.speedIncrement;
	  if(this.zoneSpeed <= 0)this.zoneSpeed=0,this.zoneTime>1000&&(this.speeding=true,this.zoneTime=0,this.zoneSwitched=true);
	}
	this.speedMultiplier*=Math.min(this.zoneSpeed,1.4);
    if (this.zoneSwitched) {
      this.velX *= -1;
      this.velY *= -1;
	  this.zoneSwitched=false;
    }
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
}
class WavySwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle=0){
    super(x,y,radius,speed,angle,"wavy_switch_enemy");
    this.dir = 1;
    this.waveInterval = (180+15)/this.speed*1e3;
    this.waveTime = 0;
    this.angleIncrement = this.speed;
    this.switch_inverval = 3e3;
	this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  rad_to_deg(x){
	  return x/Math.PI*180;
  }
  deg_to_rad(x){
	  return x*Math.PI/180;
  }
  update(delta) {
    this.waveTime += delta
    if (this.waveTime > this.waveInterval) {
      this.waveTime %= this.waveInterval;
      this.dir *= -1;
    }
    this.velangle();
    this.angle+=this.deg_to_rad(this.angleIncrement*delta/1e3) * this.dir;
    this.anglevel();
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class HomingSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"homing_switch_enemy");
    this.target_angle=this.angle;
    this.reverse=false;
	this.home_range=200;
	this.increment=1.5;
    this.switch_inverval = 3e3;
	this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  update(delta){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    var target_angle;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > this.home_range**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      target_angle = modulus(Math.atan2(distance_y,distance_x)+Math.PI+(Math.PI*this.reverse),Math.PI*2);
    }else {
      target_angle = this.target_angle;
    }
    var angle_difference = modulus(this.angle - target_angle,Math.PI*2)
    var angle_increment = this.increment*delta/1000;
    if(angle_difference<angle_increment){
    }else if(angle_difference < Math.PI){
      this.angle-=angle_increment;
      this.anglevel();
    }else{
      this.angle+=angle_increment;
      this.anglevel();
    }
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
  onCollide(){
    this.target_angle=this.angle=Math.atan2(this.velY,this.velX);
  }
  /*render(ctx,t) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
	ctx.setLineDash([2,2]);
    ctx.arc(this.x + t.x, this.y + t.y,this.home_range,0,Math.PI*2,!1);
    ctx.stroke();
	ctx.setLineDash([]);
    ctx.closePath();
	super.render(ctx,t);
  }*/
}
class DasherSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"dasher_switch_enemy");
    this.reset_parameters();
    this.switch_inverval = 3e3;
    this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  reset_parameters(){
    this.prepare_speed = this.speed / 5;
    this.dash_speed = this.speed;
    this.normal_speed = 0;

    this.time_to_prepare = 750;
    this.time_to_dash = 3000;
    this.time_between_dashes = 750;
    
    this.time_preparing = 0;
    this.time_dashing = 0;
    this.time_since_last_dash = this.time_between_dashes;
    this.compute_speed();
  }
  compute_speed(){
    this.anglevel();
  }
  update_parameters(delta){
    if(this.time_preparing == 0){
      if(this.time_dashing == 0){
        if(this.time_since_last_dash < this.time_between_dashes)
          this.time_since_last_dash += delta;
	else {
          this.time_since_last_dash = 0;
          this.time_preparing += delta;
          this.speed = this.prepare_speed;
          this.compute_speed();
        }
      } else {
        this.time_dashing += delta;
        if (this.time_dashing > this.time_to_dash){
          this.time_dashing = 0;
          this.speed = this.normal_speed;
        } else {
          this.speed = this.dash_speed * ( 1 - (this.time_dashing / this.time_to_dash ) );
        }
        this.compute_speed();
      }
    } else {
      this.time_preparing += delta;
      if (this.time_preparing > this.time_to_prepare){
        this.time_preparing = 0;
        this.time_dashing += delta;
        this.speed = this.dash_speed;
      } else {
        this.speed = this.prepare_speed * ( 1 - (this.time_preparing / this.time_to_prepare) );
      }
      this.compute_speed();
    }
  }
  update(delta){
    this.update_parameters(delta);
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
  onCollide(){
    this.velangle();
  }
}
class ConfectionerSwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"confectioner_switch_enemy");
    this.reset_parameters();
    this.switch_inverval=3000;
    this.switchTime=0;
    this.switchedHarmless=Math.round(Math.random());
    this.isHarmless=this.switchedHarmless;
  }
  reset_parameters(){
    this.has_projectile=true;
    this.release_interval = 3000,
    this.releaseTime = Math.random()*this.release_interval;
    this.release_ready=false;
  }
  generate_entities(delta,area){
    if(!this.release_ready){
      this.releaseTime -= delta;
      if(this.releaseTime<=0)this.release_ready=true;
    }else{
      area.entities.push(new SourCandyItem(this.x,this.y,13,0,0))
      this.releaseTime = this.release_interval;
      this.release_ready=false;
    }
  }
  update(delta,area){
    this.generate_entities(delta,area);
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
      this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
}
class ConfectionerEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"confectioner_enemy");
    this.reset_parameters();
  }
  reset_parameters(){
    this.has_projectile=true;
    this.release_interval = 3000,
    this.releaseTime = Math.random()*this.release_interval;
    this.release_ready=false;
  }
  generate_entities(delta,area){
    if(!this.release_ready){
      this.releaseTime -= delta;
      if(this.releaseTime<=0)this.release_ready=true;
    }else{
      area.entities.push(new SourCandyItem(this.x,this.y,13,0,0))
      this.releaseTime = this.release_interval;
      this.release_ready=false;
    }
  }
  update(delta,area){
    this.generate_entities(delta,area);
    super.update(delta);
  }
}
class SourCandyItem extends SimulatorEntity{
  constructor(x,y,radius,speed,angle){
    super(x,y,"rgb(69,85,255)",radius,"sour_candy_item",speed,angle);
    this.immune=true;
	this.outline=false;
    this.clock=0;
	this.rectCircleCollide=true;
	this.width=this.height=this.radius*2;
    this.image = $31e8cfefa331e399$export$93e5c64e4cc246c8("entities/sour_candy_item"),
    this.randomrotation=Math.floor(360*Math.random())
  }
  playerInteraction(player){
	player.sourCandyConsumed=true;
	player.sourCandyTime=5000;
    this.remove=true;
  }
  render(e, t, delta) {
    const n = this.width/2+this.x + t.x
      , r = this.height/2+this.y + t.y;
    e.translate(n, r),
    e.rotate(this.randomrotation),
    e.translate(-n, -r),
    e.drawImage(this.image.getImage(delta), n - this.width / 2, r - this.height / 2, this.width, this.height),
    e.translate(n, r),
    e.rotate(-this.randomrotation),
    e.translate(-n, -r)
  }
  update(delta,area){
    this.clock += delta;
	if(this.clock >= 3000){
		this.remove=true;
	}
    super.update(delta,area,false);
  }
}
class WallEnemy extends Enemy{
  constructor(radius,speed,area_bounding_box,wall_index,wall_count,move_clockwise=true,spawn_top=true){
    super(0,0,radius,speed,0,"wall_enemy");
	this.boundary=area_bounding_box;
    var initial_side=2*(!spawn_top);
    var distance=wall_index*(
      (this.boundary.width-this.radius*2)*2+
      (this.boundary.height-this.radius*2)*2)/wall_count;
    if(initial_side==0){
      this.x = (this.boundary.width / 2) + this.boundary.left
      this.y = this.boundary.top+this.radius;
    }else if(initial_side==1){
      this.x = this.boundary.right - this.radius
      this.y = (this.boundary.height / 2) + this.boundary.top
    }else if(initial_side==2){
      this.x = (this.boundary.width / 2) + this.boundary.left
      this.y = this.boundary.bottom - this.radius
    }else if(initial_side==3){
      this.x = this.boundary.left + this.radius
      this.y = (this.boundary.height / 2) + this.boundary.top
    }else throw this.initial_side;
    this.move_clockwise=move_clockwise;
    this.direction = modulus(initial_side+Math.pow(-1,this.move_clockwise+1),4);
    while(distance>0){
      if(this.direction==0){
        this.y-=distance;
        if(this.y < this.boundary.top + this.radius){
          distance = (this.boundary.top + this.radius) - this.y;
          this.y = this.boundary.top + this.radius;
          this.direction = modulus(this.direction+Math.pow(-1,this.move_clockwise+1),4);
        }else break;
      }else if(this.direction==1){
        this.x+=distance;
        if(this.x > this.boundary.right - this.radius){
          distance = this.x - (this.boundary.right - this.radius);
          this.x = this.boundary.right - this.radius;
          this.direction = modulus(this.direction+Math.pow(-1,this.move_clockwise+1),4);
        }else break;
      }else if(this.direction==2){
        this.y+=distance;
        if(this.y > this.boundary.bottom - this.radius){
          distance = this.y - (this.boundary.bottom - this.radius);
          this.y = this.boundary.bottom - this.radius;
          this.direction = modulus(this.direction+Math.pow(-1,this.move_clockwise+1),4);
        }else break;
      }else if(this.direction==3){
        this.x-=distance;
        if(this.x < this.boundary.left + this.radius){
          distance = (this.boundary.left + this.radius)-this.x;
          this.x = this.boundary.left + this.radius;
          this.direction = modulus(this.direction+Math.pow(-1,this.move_clockwise+1),4);
        }else break;
      }
    }
    this.velX=speedparts(this.direction,this.speed).x;
    this.velY=speedparts(this.direction,this.speed).y;
    this.immune=true;
    this.randomize_immune=true;
  }
  onCollide(){
    this.direction = modulus(this.direction+Math.pow(-1,this.move_clockwise+1),4);
    this.velX=speedparts(this.direction,this.speed).x;
    this.velY=speedparts(this.direction,this.speed).y;
  }
}
class InfectiousEnemy extends Enemy{
	constructor(x,y,radius,speed,angle){
		super(x,y,radius,speed,angle,"infectious_enemy");
	}
	playerInteraction(player,delta){
		if(!player.isDowned())
			player.isInfected=true; // Disables revival abilities upon contacting this entity.
		super.playerInteraction(player,delta);
	}
}
class NormalEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"normal_enemy");
  }
}
class TreeEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"tree_enemy");
    this.release_interval = 4400;
    this.release_time = Math.random() * this.release_interval;
    this.clock = 0;
  }
  update(delta,area){
	if(!this.frozen){
		this.release_time += delta;
		this.clock += delta;
	}
    if (this.release_time > this.release_interval) {
      var count = Math.floor(Math.random()*7)+2
      for (var i = 0; i < count; i++) {
		var projectile=new LeafProjectile(this.x,this.y,EvadesConfig.defaults.leaf_projectile.radius,EvadesConfig.defaults.leaf_projectile.speed,i*180/(count/2));
		projectile.area=this.area;projectile.z=this.z;
        area.entities.push(projectile);
      }
      this.release_time%=this.release_interval;
    }
    if(this.release_time>this.release_interval*0.9){
      this.speedMultiplier *= Math.sin(this.clock / 20)
    } else {
      this.speedMultiplier *= Math.max(Math.sin(this.clock / 200),0)
    }
	super.update(delta,area);
  }
}
class LeafProjectile extends Enemy{
	constructor(x,y,radius,speed,angle){
		super(x,y,radius,speed,angle,"leaf_projectile");
		this.immune=true;
		this.outline=false;
		this.clock=0;
		this.dir=this.speed/150;
	}
	onCollide(){
		this.remove=true;
	}
	playerInteraction(player,delta){
		this.remove=true;
		super.playerInteraction(player,delta);
	}
	update(delta){
		this.clock+=delta;
		this.velangle();
		this.angle += this.dir/30 * (delta/30);
		this.anglevel();
		if(this.clock>1700){
			this.remove = true;
		}
		super.update(delta);
	}
}
class SnowballProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,area){
    super(x,y,radius,speed,angle,"snowball_projectile");
	this.showOnMap=true;
	this.area=area;
	this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8("entities/snowball_projectile");
	this.immune=true;
	this.outline=false;
	this.clock=0;
  }
  playerInteraction(player){
	if(!player.isDowned()){
		player.isSnowballed=true;
		player.snowballedTimeLeft=2500;
		this.remove=true;
	}
  }
  update(delta){
    this.clock+=delta;
    if(this.clock>25e3/6){
      this.remove=true;
    }
	super.update(delta);
  }
}
class ReanimateProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,area){
    super(x,y,radius,speed,angle,"reanimate_projectile");
	this.showOnMap=true;
	this.area=area;
    this.immune=true;
	this.outline=false;
	this.pixelsTraveled=0;
  }
  onCollide(){
	  this.remove=true;
  }
  playerInteraction(player){
	if(player.isDowned())
		player.deathTimer=-1;
  }
  update(delta){
	this.pixelsTraveled+=this.speed*delta/1e3;
    if(this.pixelsTraveled>=1280)
      this.remove=true;
	super.update(delta);
  }
}
class ReverseProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,area,owner){
    super(x,y,radius,speed,angle,"reverse_projectile");
	this.showOnMap=true;
	this.area=area;
	this.owner=owner;
    this.immune=true;
	this.outline=false;
	this.touchedEntities=[];
	this.pixelsTraveled=0;
  }
  update(delta,area){
	for(const entity of area.entities){
		if(entity.immune||!(entity instanceof Enemy))continue;
		if(distance(this,entity)<this.radius+entity.radius&&this.touchedEntities.indexOf(entity)==-1){
			if(!entity.healingTime || entity.healingTime<3700){
				area.entities.filter(e=>(e.owner==this.owner && e instanceof ReverseProjectile)).map(e=>this.touchedEntities.push(entity));
				if(!entity.movement_immune){
					entity.velX*=-1;
					entity.velY*=-1;
					entity.velangle();
					entity.target_angle=entity.angle;
				}
				entity.healingTime=4e3;
				entity.isHarmless=true;
			}
		}
	}
	this.pixelsTraveled+=this.speed*delta/1e3;
    if(this.pixelsTraveled>=352)
      this.remove=true;
	super.update(delta);
  }
}
class ImmuneEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"immune_enemy");
    this.immune=true;
  }
}
class CorrosiveEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"corrosive_enemy");
    this.corrosive=true;
  }
}
class ExperienceDrainEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"experience_drain_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class BlockingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"blocking_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class SlowingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,slow){
    super(x,y,radius,speed,angle,"slowing_enemy");
	this.auraRadius=aura_radius;
	this.slow=slow;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class MagneticReductionEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"magnetic_reduction_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class MagneticNullificationEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"magnetic_nullification_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class FreezingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"freezing_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class DrainingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,drain){
    super(x,y,radius,speed,angle,"draining_enemy");
	this.auraRadius=aura_radius;
	this.drain=drain;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class LavaEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"lava_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class ToxicEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"toxic_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class EnlargingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"enlarging_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class ReducingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"reducing_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class SlipperyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"slippery_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class BarrierEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"barrier_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.immune=true;
  }
}
class RadarEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,radar_radius){
    super(x,y,radius,speed,angle,"radar_enemy");
	this.radar_radius=radar_radius;
	this.effects.push({radius:radar_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.reset_parameters();
  }
  reset_parameters(){
	this.release_interval=250;
	this.release_time=this.release_interval;
	this.release_ready=false;
  }
  generate_entities(delta,area){
	  if(!this.release_ready){
		  this.release_time -= delta;
		  if(this.release_time <= 0)this.release_ready=true;
	  }else{
		  if(this.force_aura_off)
			  return;
		  let closest_entity=null,
		  closest_entity_distance=null,distance,distance_x,distance_y;
		  let active_players = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone});
		  for(let entity of active_players){
			  if(entity.nightActivated||entity.effectImmune==0||!entity.movement_involved)continue;
			distance_x = this.x - entity.x,
			distance_y = this.y - entity.y,
			distance = distance_x**2 + distance_y**2;
			if(distance > (this.radar_radius * this.energy/this.maxEnergy)**2)continue;
			if(closest_entity==void 0){
				closest_entity=entity;
				closest_entity_distance = distance;
			}else if(closest_entity_distance>distance){
				closest_entity=entity;
				closest_entity_distance = distance;
			}
		  }
          if(closest_entity!=void 0){
            distance_x = this.x - closest_entity.x;
            distance_y = this.y - closest_entity.y;
			const projectile=new RadarProjectile(this.x,this.y,this.radius/3,EvadesConfig.defaults.radar_projectile.speed+this.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this);
			projectile.area=this.area;projectile.z=this.z;
            area.entities.push(projectile)
            this.release_time = this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy;
			this.release_ready=false;
          }
	  }
  }
  update(delta,area) {
	this.generate_entities(delta,area);
    super.update(delta);
  }
}
class RadarProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner){
    super(x,y,radius,speed,angle,"radar_projectile");
	this.owner=owner;
    this.immune=true;
	this.shadow_total_time=0;
	this.shadow_time=0;
	this.outline=false;
	this.enemy_projectile=true;
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    super.update(delta);
	var distance_x=this.x-this.owner.x;
	var distance_y=this.y-this.owner.y;
	var dist=distance_y**2+distance_x**2;
	if(dist>(this.owner.radar_radius*this.owner.energy/this.owner.maxEnergy)**2){
		this.remove=true;
	}
  }
}
class GravityEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,gravity){
    super(x,y,radius,speed,angle,"gravity_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.gravity=gravity;
  }
}
class GravityGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"gravity_ghost_enemy");
	this.isHarmless=true;
	this.disabled=true;
	this.immune=true;
	this.gravity=12;
  }
  playerInteraction(player,delta){
	if (!player.invulnerable) {
      var dx = player.x-this.x;
      var dy = player.y-this.y;
      var dist = distance({x:0,y:0},{x:dx,y:dy});
      var attractionAmplitude = Math.pow(2,-dist/100);
      var moveDist = this.gravity*attractionAmplitude;
      var angleToPlayer = Math.atan2(dy,dx);
      player.x -= (moveDist * Math.cos(angleToPlayer)) * (delta / (1000 / 30));
      player.y -= (moveDist * Math.sin(angleToPlayer)) * (delta / (1000 / 30));
	  player.collision(0);
    }
  }
}
class RepellingGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"repelling_ghost_enemy");
	this.isHarmless=true;
	this.disabled=true;
	this.immune=true;
	this.gravity=12;
  }
  playerInteraction(player,delta){
	if (!player.invulnerable) {
      var dx = player.x - this.x;
      var dy = player.y - this.y;
      var dist = distance({x:0,y:0},{x:dx,y:dy});
      var attractionAmplitude = Math.pow(2, -(dist / 100));
      var moveDist = (this.gravity * attractionAmplitude);
      var angleToPlayer = Math.atan2(dy, dx);
      player.x += (moveDist * Math.cos(angleToPlayer)) * (delta / (1000 / 30));
      player.y += (moveDist * Math.sin(angleToPlayer)) * (delta / (1000 / 30));
	  player.collision(0);
    }
  }
}
class RepellingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,repulsion){
    super(x,y,radius,speed,angle,"repelling_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.repulsion=repulsion;
  }
}
class PositiveMagneticGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"positive_magnetic_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(player.magnetDirection=="DOWN"){
		player.magnetDirection="UP";
		if(player.abilityOne.abilityType==100){
			player.abilityOne.abilityType=101;
			player.abilityOne.name=abilityConfig[player.abilityOne.abilityType].name;
		};
		if(player.abilityTwo.abilityType==100){
			player.abilityTwo.abilityType=101;
			player.abilityTwo.name=abilityConfig[player.abilityTwo.abilityType].name;
		};
		if(player.abilityThree){
			if(player.abilityThree.abilityType==100){
				player.abilityThree.abilityType=101;
				player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
			};
		};
	}
  }
}
class NegativeMagneticGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"negative_magnetic_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(player.magnetDirection=="UP"){
		player.magnetDirection="DOWN";
		if(player.abilityOne.abilityType==101){
			player.abilityOne.abilityType=100;
			player.abilityOne.name=abilityConfig[player.abilityOne.abilityType].name;
		};
		if(player.abilityTwo.abilityType==101){
			player.abilityTwo.abilityType=100;
			player.abilityTwo.name=abilityConfig[player.abilityTwo.abilityType].name;
		};
		if(player.abilityThree){
			if(player.abilityThree.abilityType==101){
				player.abilityThree.abilityType=100;
				player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
			};
		};
	}
  }
}
class DisablingGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"disabling_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	player.disabling=true;
  }
}
class SpeedGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"speed_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(!player.speedghost){
	  player.speedghost=true;
	}
  }
}
class IceGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"ice_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(!player.isIced){
	  player.isIced=true;
	  player.icedTimeLeft=150;
	}
  }
}
class PoisonGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"poison_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(!player.isPoisoned){
	  player.isPoisoned=true;
	  player.poisonedTimeLeft=150;
	}
  }
}
class RegenGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"regen_ghost_enemy");
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(!player.regenghost){
	  player.regenghost=true;
	}
  }
}
class DisablingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius){
    super(x,y,radius,speed,angle,"disabling_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
}
class QuicksandEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,strength){
    super(x,y,radius,speed,angle,"quicksand_enemy");
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.quicksand_strength=strength;
  }
}
class SandEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"sand_enemy");
	this.sandSpeed=1;
  }
  update(delta){
	if(this.sandSpeed<3){
		this.sandSpeed+=0.9*delta/1e3;
	}
	this.speedMultiplier*=this.sandSpeed;
    super.update(delta);
  }
  onCollide(){
	this.sandSpeed=0;
  }
}
class SandrockEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"sandrock_enemy");
	this.sandrockSpeed=1;
  }
  update(delta){
	if(this.sandrockSpeed>=0.1){
		this.sandrockSpeed-=0.3*delta/1e3;
	}
	this.speedMultiplier*=this.sandrockSpeed;
    super.update(delta);
  }
  onCollide(){
	this.sandrockSpeed=1;
  }
}
class ChargingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"charging_enemy");
	this.chargingSpeed=1;
  }
  update(delta){
	if(this.chargingSpeed<2.5){
		this.chargingSpeed+=1.5*delta/1e3;
	}
	if(this.provoked){
		this.provokedTime-=delta;
	}
	if(this.provokedTime<=0){
		this.provoked=false;
	}
	this.speedMultiplier*=this.chargingSpeed;
    super.update(delta);
  }
  onCollide(){
	this.velangle();
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    var target_angle=this.angle;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 250**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      target_angle = modulus(Math.atan2(distance_y,distance_x)+Math.PI,Math.PI*2);
	  this.angle=target_angle;
	  this.provoked=true;
	  this.provokedTime=1500;
	  this.chargingSpeed=1;
    }else{
      target_angle = this.angle;
	  this.chargingSpeed=0;
    }
	this.anglevel();
  }
}
class HomingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,reverse,home_range,increment){
    super(x,y,radius,speed,angle,"homing_enemy");
    this.reverse=reverse;
	this.speed=Math.abs(this.speed);
	this.anglevel();
	this.home_range=home_range;
	this.increment=increment;
  }
  update(delta){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    var target_angle;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > this.home_range**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      target_angle = modulus(Math.atan2(distance_y,distance_x)+(Math.PI*!this.reverse),Math.PI*2);
    }else {
      target_angle = this.target_angle;
    }
    var angle_difference = modulus(this.angle - target_angle,Math.PI*2)
    var angle_increment = this.increment*delta/1000;
    if(angle_difference<angle_increment){
    }else if(angle_difference < Math.PI){
      this.angle-=angle_increment;
      this.anglevel();
    }else{
      this.angle+=angle_increment;
      this.anglevel();
    }
    super.update(delta);
  }
  onCollide(){
    this.target_angle=this.angle=Math.atan2(this.velY,this.velX);
  }
  /*render(ctx,t) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
	ctx.setLineDash([2,2]);
    ctx.arc(this.x + t.x, this.y + t.y,this.home_range,0,Math.PI*2,!1);
    ctx.stroke();
	ctx.setLineDash([]);
    ctx.closePath();
	super.render(ctx,t);
  }*/
}
class DasherEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"dasher_enemy");
    this.reset_parameters();
  }
  reset_parameters(){
    this.prepare_speed = this.speed / 5;
    this.dash_speed = this.speed;
    this.normal_speed = 0;

    this.time_to_prepare = 750;
    this.time_to_dash = 3000;
    this.time_between_dashes = 750;
    
    this.time_preparing = 0;
    this.time_dashing = 0;
    this.time_since_last_dash = this.time_between_dashes;
    this.compute_speed();
  }
  compute_speed(){
    this.anglevel();
  }
  update_parameters(delta){
    if(this.time_preparing == 0){
      if(this.time_dashing == 0){
        if(this.time_since_last_dash < this.time_between_dashes)
          this.time_since_last_dash += delta;
	else {
          this.time_since_last_dash = 0;
          this.time_preparing += delta;
          this.speed = this.prepare_speed;
          this.compute_speed();
        }
      } else {
        this.time_dashing += delta;
        if (this.time_dashing > this.time_to_dash){
          this.time_dashing = 0;
          this.speed = this.normal_speed;
        } else {
          this.speed = this.dash_speed * ( 1 - (this.time_dashing / this.time_to_dash ) );
        }
        this.compute_speed();
      }
    } else {
      this.time_preparing += delta;
      if (this.time_preparing > this.time_to_prepare){
        this.time_preparing = 0;
        this.time_dashing += delta;
        this.speed = this.dash_speed;
      } else {
        this.speed = this.prepare_speed * ( 1 - (this.time_preparing / this.time_to_prepare) );
      }
      this.compute_speed();
    }
  }
  update(delta){
    this.update_parameters(delta);
    super.update(delta);
  }
  onCollide(){
    this.velangle();
  }
}
class TeleportingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"teleporting_enemy");
    this.clock = 0;
  }
  update(delta){
    this.clock += delta*30
    if (this.clock >= 22e3) {
      this.speedMultiplier *= 1;
      this.clock = this.clock % 22e3;
    }else{
	  this.speedMultiplier *= 0;
	}
    this.x+=this.velX/30*this.speedMultiplier;
    this.y+=this.velY/30*this.speedMultiplier;
	this.speedMultiplier=1;
    this.collision(delta);
  }
}
class StarEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"star_enemy");
    this.clock = 0;
    this.starPos = 1;
  }
  update(delta){
    this.clock += delta*60
    if (this.clock >= 22e3) {
      this.speedMultiplier *= 1;
      this.starPos *= -1;
      this.velX *= -1;
      this.velY *= -1;
      this.clock = this.clock % 22e3;
    }else{
	  this.speedMultiplier *= 0;
	}
    this.x+=this.velX/30*this.speedMultiplier*2;
    this.y+=this.velY/30*this.speedMultiplier*2;
	this.speedMultiplier=1;
    this.collision(delta);
  }
}
class StaticEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"static_enemy");
    this.clock = 0;
	this.disabled=false;
	this.iseffect=false;
  }
  playerInteraction(player){
	  for(var entity of map.areas[player.area].entities){
		  if(entity instanceof StaticEnemy){
			  if(entity==this)continue;
			  if(this.iseffect&&distance(this,entity)<this.radius + entity.radius){
				  this.disabled=false;
				  this.isHarmless=false;
				  EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune);
			  }
		  }
	  }
	  if(!player.isDowned()&&!player.invulnerable){
	    this.x=player.x;
	    this.y=player.y;
		this.assetCollision();
		this.iseffect=true;
		this.speedMultiplier=0;
	  }
  }
  update(delta){
	if(!this.disabled){
      this.clock += delta
	  if (this.clock > 1e3)this.disabled=true,this.isHarmless=true,this.clock=0;
	}
	super.update(delta);
  }
}
class ZigzagEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"zigzag_enemy");
	this.zigSpeed=0;
	this.speeding=true;
	this.dir=1;
	this.zigTime=0;
	this.constantSpeedIncrement=45/7;
	this.angle=Math.round(this.angle/(Math.PI/2))*(Math.PI/2);
	this.anglevel();
    this.switchAdd=false;
	this.zigSwitched=false;
    this.turnAngle=Math.PI/2;
  }
  update(delta){
	this.zigTime+=delta;
    if (this.zigSpeed < 1.5 && this.speeding) {
      this.zigSpeed += this.constantSpeedIncrement*delta/1e3;
	  if(this.zigSpeed > 1.5)this.zigSpeed=1.5,this.speeding=false;
    } else if(this.zigSpeed >= 0 && !this.speeding){
      this.zigSpeed -= this.constantSpeedIncrement*delta/1e3;
	  if(this.zigSpeed < 0)this.zigSpeed=0,this.zigTime>500&&(this.speeding=true,this.zigTime%=500,this.zigSwitched=true);
	}
	this.speedMultiplier*=this.zigSpeed;
	if(this.zigSwitched){
    if (!this.switchAdd) {
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle -= this.turnAngle * this.dir;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
	  this.switchAdd=true;
    } else {
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle += this.turnAngle * this.dir;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
	  this.switchAdd=false;
    }
	  this.zigSwitched=false;
	}
    super.update(delta);
  }
  onCollide(){
	  this.dir*=-1;
  }
}
class ZoningEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"zoning_enemy");
    this.zoneInterval = 1000;
    this.zoneTime = Math.random() * this.zoneInterval;
	this.zoneSpeed=0;
	this.speedIncrement=2.9;
	this.speeding=this.zoneTime < 500;
	this.zoneSwitched=false;
	this.dir=1;
    this.turnAngle = Math.PI / 2
    this.turnAngle *= (Math.floor(Math.random() * 2) * 2) - 1
	this.angle=Math.round(this.angle/(Math.PI/2))*(Math.PI/2);
	this.anglevel();
  }
  update(delta){
	this.zoneTime+=delta;
    if (this.zoneSpeed <= 1.45 && this.speeding) {
      this.zoneSpeed = this.zoneTime/1e3*this.speedIncrement;
	  if(this.zoneSpeed >= 1.45)this.zoneSpeed=1.45,this.zoneTime>(29e3/60)&&(this.speeding=false);
    } else if(this.zoneSpeed >= 0 && !this.speeding){
      this.zoneSpeed = 1.45-(this.zoneTime-(29e3/60))/1e3*this.speedIncrement;
	  if(this.zoneSpeed <= 0)this.zoneSpeed=0,this.zoneTime>1000&&(this.speeding=true,this.zoneTime=0,this.zoneSwitched=true);
	}
	this.speedMultiplier*=Math.min(this.zoneSpeed,1.4);
    if (this.zoneSwitched) {
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle += this.turnAngle * this.dir;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
	  this.zoneSwitched=false;
    }
    super.update(delta);
  }
  onCollide(){
	  this.dir *=-1;
  }
}
class SpiralEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"spiral_enemy");
    this.angleIncrement = 0.15;
    this.angleIncrementChange = 0.12;
    this.angleAdd = false;
    this.dir = 1
  }
  update(delta) {
    if (this.angleIncrement < 0.001) {
      this.angleAdd = true;
    } else if (this.angleIncrement > 0.35) {
      this.angleAdd = false;
    }
    if (this.angleIncrement < 0.05) {
      this.angleIncrementChange = 0.066;
    } else {
      this.angleIncrementChange = 0.12;
    }
    if (this.angleAdd) {
      this.angleIncrement += this.angleIncrementChange * (delta / 1000);
    } else {
      this.angleIncrement -= this.angleIncrementChange * (delta / 1000);
    }
    this.velangle();
    this.angle += this.angleIncrement * this.dir * (delta / (1000 / 30));
    this.anglevel();
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class SizingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"sizing_enemy");
    this.growing = true;
	this.sizing_bound_multiplier = 2.5;
	this.sizing_changing_speed = 0.04;
	this.sizing_upper_bound = this.sizing_bound_multiplier;
	this.sizing_lower_bound = 1 / this.sizing_bound_multiplier;
	this.sizing_multiplier = this.sizing_lower_bound;
  }
  update(delta){
	if (this.growing) {
		this.sizing_multiplier += this.sizing_changing_speed * delta / (1000 / 30);
		if (this.sizing_multiplier > this.sizing_upper_bound) {
			this.growing = false;
		}
	} else {
		this.sizing_multiplier -= this.sizing_changing_speed * delta / (1000 / 30);
		if (this.sizing_multiplier < this.sizing_lower_bound) {
			this.growing = true;
		}
	}
	this.radiusMultiplier*=this.sizing_multiplier;
	super.update(delta);
  }
}
class OscillatingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"oscillating_enemy");
    this.zoneInterval = 1000;
    this.zoneTime = Math.random() * this.zoneInterval;
	this.zoneSpeed=0;
	this.speedIncrement=2.9;
	this.speeding=this.zoneTime < 500;
	this.zoneSwitched=false;
  }
  update(delta){
	this.zoneTime+=delta;
    if (this.zoneSpeed <= 1.45 && this.speeding) {
      this.zoneSpeed = this.zoneTime/1e3*this.speedIncrement;
	  if(this.zoneSpeed >= 1.45)this.zoneSpeed=1.45,this.zoneTime>(29e3/60)&&(this.speeding=false);
    } else if(this.zoneSpeed >= 0 && !this.speeding){
      this.zoneSpeed = 1.45-(this.zoneTime-(29e3/60))/1e3*this.speedIncrement;
	  if(this.zoneSpeed <= 0)this.zoneSpeed=0,this.zoneTime>1000&&(this.speeding=true,this.zoneTime=0,this.zoneSwitched=true);
	}
	this.speedMultiplier*=Math.min(this.zoneSpeed,1.4);
    if (this.zoneSwitched) {
      this.velX *= -1;
      this.velY *= -1;
	  this.zoneSwitched=false;
    }
    super.update(delta);
  }
}
class WavyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle=0){
    super(x,y,radius,speed,angle,"wavy_enemy");
    this.dir = 1;
    this.waveInterval = (180+15)/this.speed*1e3;
    this.waveTime = 0;
    this.angleIncrement = this.speed;
  }
  rad_to_deg(x){
	  return x/Math.PI*180;
  }
  deg_to_rad(x){
	  return x*Math.PI/180;
  }
  update(delta) {
    this.waveTime += delta
    if (this.waveTime > this.waveInterval) {
      this.waveTime %= this.waveInterval;
      this.dir *= -1;
    }
    this.velangle();
    this.angle+=this.deg_to_rad(this.angleIncrement*delta/1e3) * this.dir;
    this.anglevel();
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1;
  }
}
class TurningEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,circle_size){
    super(x,y,radius,speed,angle,"turning_enemy");
    this.circle_size = circle_size;
    this.dir = speed / this.circle_size;
  }
  update(delta) {
    this.velangle()
    this.angle += this.dir/30*delta/30;
    this.anglevel();
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class CactusEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"cactus_enemy");
	this.crumbleSize=1;
  }
  playerInteraction(player,delta){
	if(!player.invulnerable&&!player.isDowned()){
	  if(player.knockback_limit_count<100){
        if(!player.shadowedInvulnerability){
          player.knockback_player(delta,this,200,this.radius*8*32+50);
		  this.crumbleSize=1/4;
        }
      }
	}
  }
  update(delta,area) {
	if(this.crumbleSize<1){
		this.crumbleSize+=delta/(1e3/30)/(300/3)*(1-1/4);
	}else{
		this.crumbleSize=1;
	}
	this.radiusMultiplier*=this.crumbleSize;
    super.update(delta);
  }
}
class CrumblingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"crumbling_enemy");
	this.hasCollided=false;
	this.collideTime=0;
	this.crumbleSize=1;
	this.speedGainTimer=20e3/9;
	this.speedGainTimerTotal=40e3/9;
  }
  onCollide(){
	  if(!this.hasCollided){
		this.hasCollided=true;
		this.crumbleSize=0.5;
		var residue=new ResidueEnemy(this.x,this.y,this.ogradius/3,this.speed/6.25,Math.random()*360);
		residue.area=this.area;
		residue.z=this.z;
		this.radiusMultiplier*=this.crumbleSize;
		this.speedMultiplier/=2;
		map.areas[current_Area].entities.push(residue);
	  }
  }
  update(delta,area) {
	if(this.hasCollided){
		this.collideTime+=delta;
		this.speedMultiplier*=0.5;
	}
	if(this.collideTime>=3e3&&this.hasCollided){
		customAlert("Fatal Error: User sonic3XE has no access to Spacebrook/EvadesClassic github source code.",1/0,"#F00");
		throw "[server/src/game/entities/enemies/crumbling_enemy.py] User sonic3XE has no access to Spacebrook/EvadesClassic github source code.";
		this.hasCollided=false;
		this.collideTime=0;//67 frames to go back to original size in 30fps
	};
	if(!this.hasCollided){
		if(this.speedGainTimer < this.speedGainTimerTotal){
			this.speedGainTimer+=delta;
			this.speedMultiplier*=this.speedGainTimer/this.speedGainTimerTotal;
		}
		if(this.crumbleSize<1){
			this.crumbleSize+=delta/(1e3/30)/(200/3)/2;
		}else{
			this.crumbleSize=1;
		}
	}
	this.radiusMultiplier*=this.crumbleSize;
    super.update(delta);
  }
}
class SnowmanEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"snowman_enemy");
	this.hasCollided=false;
	this.collideTime=0;
	this.snowmanSize=1;
	this.snowmanSizeShrink=1;
  }
  onCollide(){
	  if(!this.hasCollided){
		this.hasCollided=true;
		this.snowmanSizeShrink=this.snowmanSize;
		this.speedMultiplier*=0;
	  }
  }
  update(delta,area) {
	if(this.hasCollided){
		this.collideTime+=delta;
		this.speedMultiplier*=0;
		this.snowmanSize=(this.snowmanSizeShrink-1)*Math.cos(Math.PI*Math.min(this.collideTime,600)/1200)**3+1;
	}
	if(this.collideTime>=1.6e3&&this.hasCollided){
		this.hasCollided=false;
		this.collideTime=0;
	};
	if(!this.hasCollided){
		if(this.snowmanSize<3){
			this.snowmanSize+=1.5*delta/1e3;
		}else{
			this.snowmanSize=3;
		}
	}
	this.radiusMultiplier*=this.snowmanSize;
    super.update(delta);
	this.lightRadius = this.radius+60;
  }
}
class PumpkinEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,fake=false){
    super(x,y,radius,speed,angle,"pumpkin_enemy");
	this.texture="entities/pumpkin_off";
	this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8(this.texture);
	this.detectedDuration=2500;
	this.hasDetected=false;
	this.targetAngle=0;
	this.detectedTime=0;
	this.absoluteZIndex=-1;
	this.relativeZIndex=0;
	this.detectedPosition={x:0,y:0};
	this.isFake=fake;
  }
  update(delta) {
	if(this.isFake||this.frozen)this.speedMultiplier=0;
	else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    var target_angle=this.angle;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  this.detectedPosition.x=closest_entity.x;
	  this.detectedPosition.y=closest_entity.y;
      this.targetAngle = modulus(Math.atan2(distance_y,distance_x)+Math.PI,Math.PI*2);
	  if(this.detectedTime<=0 && this.texture=="entities/pumpkin_off"){
		this.hasDetected=true;
		this.texture="entities/pumpkin_on";
		this.lightRadius = this.radius + 30;
		this.absoluteZIndex=null;
		this.relativeZIndex=1;
		this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8(this.texture);
	  }
    }else{
		  this.targetAngle=this.angle;
	  }
	this.anglevel();
	if(this.hasDetected){
		this.detectedTime+=delta;
	}
	if(this.detectedTime<1e3){
		this.speedMultiplier*=0;
		this.angle=this.targetAngle;
		if(this.hasDetected){
		  this.x+=Math.round(Math.random()*4-2);
		  this.y+=Math.round(Math.random()*4-2);
		}
	}
	if(this.detectedTime>2500){
	  this.texture="entities/pumpkin_off";
	  this.hasDetected=false;
	  this.lightRadius=null;
	  this.absoluteZIndex=-1;
	  this.relativeZIndex=0;
	  this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8(this.texture);
	  this.detectedTime=0;
	}}
    super.update(delta);
  }
  onCollide(){
    this.target_angle=this.angle=Math.atan2(this.velY,this.velX);
  }
}
class MistEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"mist_enemy");
      this.brightness = 1;
      this.isVisible = true; // true - fading, false - going visible
      this.visibility_radius = 200;
      this.brightness_tick = 1.5;
	}
  update(delta,area) {
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    var target_angle;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > this.visibility_radius**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      this.brightness-=this.brightness_tick*delta/1e3;
	  this.brightness=Math.max(this.brightness,Number.EPSILON);
    }else if(this.brightness<1){
      this.brightness+=this.brightness_tick*delta/1e3;
    }
	this.lightRadius=this.radius*3*Math.min(1,this.brightness);
    super.update(delta);
  }
}
class PhantomEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"phantom_enemy");
      this.brightness = 1;
      this.isVisible = true; // true - fading, false - going visible
      this.visibility_radius = 250;
      this.brightness_tick = 1.5;
	}
  update(delta,area) {
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    var target_angle;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(Math.sqrt(distance)>this.visibility_radius+(entity.radius??0))continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
	  if(this.brightness<1){
        this.brightness+=this.brightness_tick*delta/1e3;
	  }
    }else if(this.brightness>0){
      this.brightness-=this.brightness_tick*delta/1e3;
	  this.brightness=Math.max(this.brightness,Number.EPSILON);
    }
	this.lightRadius=this.radius*3*Math.min(1,this.brightness);
    super.update(delta);
  }
}
class GlowyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"glowy_enemy");
      this.invisible_timing = 500;
      this.brightness = 1;
      this.isVisible = true;
	  this.lightRadius=this.radius*3*this.brightness;
      this.timer = this.invisible_timing;
      this.brightness_tick = 1.8;
	}
  update(delta,area) {
    if(this.isVisible && this.timer <= 0){
      this.brightness -= this.brightness_tick * delta/1e3;
      if(this.brightness <= 0){
        this.brightness = Number.EPSILON;
        this.isVisible = false;
        this.timer = this.invisible_timing;
      }
    } else if (!this.isVisible && this.timer <= 0){
      this.brightness += this.brightness_tick * delta/1e3;
      if(this.brightness >= 1){
        this.isVisible = true;
        this.timer = this.invisible_timing;
      }
    }

    if (this.timer>0){
      this.timer -= delta;
    }
	this.lightRadius=this.radius*3*Math.min(1,this.brightness);
    super.update(delta);
  }
}
class FireflyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"firefly_enemy");
      this.invisible_timing = 500;
      this.isVisible = Math.round(Math.random());
      this.brightness = this.isVisible==0?Math.random():1;
	  this.lightRadius=this.radius*3*this.brightness;
      this.timer = this.isVisible==0?0:this.invisible_timing*Math.random();
      this.brightness_tick = 1.8;
	}
  update(delta,area) {
    if(this.isVisible && this.timer <= 0){
      this.brightness -= this.brightness_tick * delta/1e3;
      if(this.brightness <= 0){
        this.brightness = Number.EPSILON;
        this.isVisible = false;
        this.timer = this.invisible_timing;
      }
    } else if (!this.isVisible && this.timer <= 0){
      this.brightness += this.brightness_tick * delta/1e3;
      if(this.brightness >= 1){
        this.isVisible = true;
        this.timer = this.invisible_timing;
      }
    }

    if (this.timer>0){
      this.timer -= delta;
    }
	this.lightRadius=this.radius*3*Math.min(1,this.brightness);
    super.update(delta);
  }
}
class GrassEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,powered){
    super(x,y,radius,speed,angle,"grass_enemy");
	this.powered=powered;
	this.grassTime=0;
	this.grassHarmless=true;
  }
  playerInteraction(player){
	if(!player.isDowned()){
		this.grassHarmless && this.grassTime==0 && (this.grassTime=1e3);
		!this.grassHarmless && (
			this.grassTime=0,this.grassHarmless=true,
			EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune),
			map.areas[player.area].entities.filter(e=>{
				return (e instanceof GrassEnemy)&&(!e.powered);
			}).map(e=>{
				e.grassTime=0;
				e.grassHarmless=true;
			})
		);
	}
  }
  update(delta,area) {
	if(this.grassHarmless&&this.grassTime>0){
		this.grassTime-=delta;
		if(this.grassTime<0){
			this.grassHarmless=false;
			this.grassTime=0;
		}
	}
    super.update(delta);
  }
}
class FlowerEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,growth_multiplier){
    super(x,y,radius,speed,angle,"flower_enemy");
	this.hasEntity=false;
	this.growth_multiplier=growth_multiplier;
  }
  update(delta,area){
	if(!this.hasEntity){
		this.hasEntity=true;
		for(var i=0;i<5;i++){
			const projectile=new FlowerProjectile(this.x,this.y,this.radius,0,0,this,i,this.growth_multiplier);
			projectile.area=this.area;projectile.z=this.z;
			area.entities.push(projectile);
		}
	}
	super.update(delta)
  }
}
class FlowerProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner,id,growth_multiplier){
    super(x,y,radius,speed,angle,"flower_projectile");
	this.owner=owner;
	this.outline=false;
	this.isEnemy=false;
	this.growth_multiplier=growth_multiplier;
	this.immune=true;
	this.staticRadius=this.radius;
	this.trigger_radius=100;
	this.shrinkRate=4000/30;
	this.growRate=2000/30;
	this.state=1;
	this.timer=0;
	this.id=id;
  }
  playerInteraction(player){
    EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune,false);
  }
  update(delta,area) {
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.owner.x - entity.x;
      distance_y = this.owner.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > (this.trigger_radius+this.staticRadius+(entity.radius??0))**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.owner.x - closest_entity.x;
      distance_y = this.owner.y - closest_entity.y;
		this.timer+=delta;
		if(this.timer>=this.shrinkRate){
			this.timer=0;
			this.ogradius-=this.staticRadius/18 * this.growth_multiplier;
			if(this.ogradius<0){
				this.ogradius=0;
			}
		}
    }else{
		this.timer+=delta;
		if(this.timer>=this.growRate){
			this.timer=0;
			this.ogradius+=this.staticRadius/18 * this.growth_multiplier;
			if(this.ogradius>this.staticRadius){
				this.ogradius=this.staticRadius;
			}
		}
	}
    this.radiusMultiplier *= this.owner.radiusMultiplier;
	this.setPosition(Math.sin(this.id*72*Math.PI/180),-Math.cos(this.id*72*Math.PI/180));
	if(this.owner.remove)this.remove=true;
	super.update(delta,area,false);
  }
  setPosition(x, y){
    this.x = this.owner.x + x * this.owner.radius;
    this.y = this.owner.y + y * this.owner.radius;
  }
}
class SeedlingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"seedling_enemy");
	this.hasEntity=false;
	this.immune=true;
  }
  update(delta,area){
	if(!this.hasEntity){
		this.hasEntity=true;
		const projectile=new SeedlingProjectile(this.x,this.y,this.radius,0,0,this);
		projectile.area=this.area;projectile.z=this.z;
		area.entities.push(projectile)
	}
	super.update(delta,area);
  }
}
class SeedlingProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner){
    super(x,y,radius,speed,angle,"seedling_projectile");
	this.owner=owner;
	this.immune=true;
	this.angle=Math.random()*360;
	this.clockwise=Math.round(Math.random());
  }
  playerInteraction(player){
    EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune,false);
  }
  update(delta,area) {
	this.angle+=10*delta/(1e3/30)*Math.pow(-1,this.clockwise);
    this.x=this.owner.x+(this.radius+this.owner.radius/2)*Math.cos(this.angle/180*Math.PI);
    this.y=this.owner.y+(this.radius+this.owner.radius/2)*Math.sin(this.angle/180*Math.PI);
	super.update(delta,area,false);
  }
}
class FireTrailEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,decay=false){
    super(x,y,radius,speed,angle,"fire_trail_enemy");
	this.lightRadius=this.radius+40;
	this.isDecay=decay;
	this.clock=0;
	this.brightness=1;
  }
  update(delta,area) {
    this.clock+=delta;
	if(!this.isDecay){
	var duration=(1000*(this.radius*2)/(this.speed/30))/32;
    if (this.clock>=duration) {
        this.spawnTrail(area);
        this.clock=0;
    }}else{
      if(this.clock>=1000){
        this.brightness -= delta/500;
        if(this.brightness<0){this.brightness=Number.EPSILON}
      }
      if(this.clock>=1500){
        this.remove = true;
      }
	}
    super.update(delta);
  }
  spawnTrail(area){
	  const projectile=new FireTrailEnemy(this.x,this.y,this.radius,0,0,true);
	projectile.area=this.area;projectile.z=this.z;
    area.entities.push(projectile);
  }
}
class LiquidEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,player_detection_radius){
    super(x,y,radius,speed,angle,"liquid_enemy");
    this.player_detection_radius = player_detection_radius;
  }
  update(delta) {
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > this.player_detection_radius**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      this.speedMultiplier *= 5;
    }
    super.update(delta);
  }
}
class SwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,switch_inverval,switch_time,switched_harmless){
    super(x,y,radius,speed,angle,"switch_enemy");
    this.switch_inverval = switch_inverval;
	this.switchTime=switch_time;
	if(switched_harmless==void 0){
      this.switchedHarmless = false;
      if (Math.round(Math.random()) === 1) {
        this.switchedHarmless = true;
      }
	}else{
	  this.switchedHarmless = switched_harmless;
	}
    this.isHarmless = this.switchedHarmless;
  }
  update(delta) {
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = !this.switchedHarmless;
      this.isHarmless = this.switchedHarmless;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
}
class CyclingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"cycling_enemy");
    this.switch_inverval = 3000;
    this.clock = 0;
	this.entity=null;
  }
  update(delta,area) {
    this.clock += delta;
	if(this.entity!=null){
		this.radiusMultiplier=0;
		this.x=this.entity.x;
		this.y=this.entity.y;
	}
    if (this.clock > this.switch_inverval) {
		var rand=['NORMAL_ENEMY', 'HOMING_ENEMY', 'SLOWING_ENEMY', 'DRAINING_ENEMY', 
		'SIZING_ENEMY', 'FREEZING_ENEMY', 'DISABLING_ENEMY', 'ENLARGING_ENEMY', 
		'IMMUNE_ENEMY', 'CORROSIVE_ENEMY', 'TOXIC_ENEMY'].map(e=>capitalize(e.toLowerCase()));
		rand=rand[Math.floor(Math.random()*rand.length)];
		if(this.entity!=null){
			this.entity.remove=true;
			this.entity.velangle();
			this.angle=this.entity.angle;
			this.anglevel();
		}else{
			this.velangle();
		}
		switch(rand){
			case"SlowingEnemy":this.entity=new SlowingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.slowing_radius,defaultValues.spawner.slow);break;
			case"DrainingEnemy":this.entity=new DrainingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.draining_radius,defaultValues.spawner.drain);break;
			case"FreezingEnemy":this.entity=new FreezingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.freezing_radius);break;
			case"DisablingEnemy":this.entity=new DisablingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.disabling_radius);break;
			case"ToxicEnemy":this.entity=new ToxicEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.toxic_radius);break;
			case"EnlargingEnemy":this.entity=new EnlargingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.enlarging_radius);break;
			case"HomingEnemy":this.entity=new HomingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.reverse,defaultValues.spawner.home_range,defaultValues.spawner.increment);break;
			default:this.entity=new (eval(rand))(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180);break;
		}
		this.entity.area=this.area;
		area.entities.push(this.entity);
		this.clock = this.clock % this.switch_inverval;
    }
    super.update(delta);
  }
}
class IcicleEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,horizontal){
    super(x,y,radius,speed,angle==void 0?Math.round(Math.random())*180+90*!horizontal:angle,"icicle_enemy");
    this.clock = 0;
	this.wallHit=false;
  }
  update(delta) {
	if(this.wallHit){
	  this.clock += delta;
      if (this.clock > 1e3) {
        this.clock=0;
	    this.wallHit=false;
      }else{
		this.speedMultiplier*=0;
	  }
	};
    super.update(delta);
  }
  onCollide(){
	this.wallHit=true;
  }
}
class RadiatingBulletsEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,release_interval,release_time){
    super(x,y,radius,speed,angle,"radiating_bullets_enemy");
    this.release_interval = release_interval,
    this.releaseTime = release_time ?? (Math.random()*this.release_interval);
  }
  update(delta,area) {
    this.releaseTime -= delta;
    if (this.releaseTime < 0) {
		for(var i=0;i<8;i++){
			const projectile=new RadiatingBulletsProjectile(this.x,this.y,EvadesConfig.defaults.radiating_bullets_projectile.radius,EvadesConfig.defaults.radiating_bullets_projectile.speed,45*i)
			projectile.area=this.area;projectile.z=this.z;
			area.entities.push(projectile);
		}
		this.releaseTime = this.releaseTime % this.release_interval;
		this.releaseTime+=this.release_interval
		this.releaseTime = this.releaseTime % this.release_interval;
    }
    super.update(delta);
  }
}
class RadiatingBulletsProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"radiating_bullets_projectile");
	this.immune=true;
	this.outline=false;
    this.clock = 0;
  }
  playerInteraction(player){
	this.remove=true;
	super.playerInteraction(player);
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 3000) {
		this.remove=true;
    }
    super.update(delta);
  }
}
class SniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,recharge){
    super(x,y,radius,speed,angle,"sniper_enemy");
    this.release_interval = recharge,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new SniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class SniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"sniper_projectile");
    this.clock = 0;
    this.immune=true;
	this.outline=false;
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class RingSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,cybotBoss,health=100,ring_sniper_radius=180){
    super(x,y,radius,speed,angle,"ring_sniper_enemy");
	this.cybot=cybotBoss;
	this.maxHealth=this.health=health;
	this.losing_health=false;
	this.movement_immune=true;
	this.effects.push({radius:ring_sniper_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
	this.reset_parameters();
  }
  reset_parameters(){
	this.has_projectiles=true;
	this.release_interval=5000;
	this.releaseTime=Math.random()*this.release_interval;
	this.release_ready=false;
  }
  update_parameters(delta,area){
	if(this.losing_health)this.damage(13.5*delta/1e3);
	if(this.health<=0&&!this.remove){
		this.cybot && (this.cybot.ring_sniper_count-=1);
		this.remove=true;
	}
  }
  generate_entities(delta,area){
	  if(!this.release_ready){
			this.releaseTime-=delta*this.timer_reduction;
			if(this.releaseTime<=0){
				this.release_ready=true;
		}
	}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 2400**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
	if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  let projectile=new RingSniperProjectile(this.x,this.y,EvadesConfig.defaults.ring_sniper_projectile.radius,EvadesConfig.defaults.ring_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
	  this.cybot && this.cybot.ring_projectiles.push(projectile);
      this.releaseTime = this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy;
	  this.release_ready=false;
    }

	}
  }
  damage(damage){
	  this.health-=damage;
	  this.losing_health=false;
  }
  update(delta,area) {
	this.update_parameters(delta,area);
	this.generate_entities(delta,area);
    super.update(delta);
  }
}
class RingSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"ring_sniper_projectile");
    this.outline=false;
    this.immune=true;
	this.corrosive=true;
	this.isEnemy=false;
    this.clock=0;
    this.clock2=0;
	this.bounce_count=0;
  }
  onCollide(){
	this.bounce_count++;
  }
  render(e, t) {
    const defaultLine=e.lineWidth;
    e.beginPath(),
    e.arc(this.x + t.x, this.y + t.y, .875 * this.radius, 0, 2 * Math.PI, !1),
    e.strokeStyle = this.color,
    e.lineWidth = this.radius / 4,
    e.stroke(),
	e.lineWidth=defaultLine;
  }
  update(delta) {
	if(this.bounce_count>=3){
	  this.clock+=delta;
      if (this.clock>=3000){
        this.remove=true;
      }
	}
	this.clock2+=delta;
	if(this.clock2>=8320/this.speed*1e3)this.remove=true;
    super.update(delta);
  }
}
class CybotRingProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"cybot_ring_projectile");
    this.outline=false;
    this.immune=true;
	this.corrosive=true;
	this.isEnemy=false;
  }
	playerInteraction(player,delta){
		if(!player.isDowned())
			player.isInfected=true; // Disables revival abilities upon contacting this entity.
		super.playerInteraction(player,delta);
	}
  render(e, t) {
    const defaultLine=e.lineWidth;
    e.beginPath(),
    e.arc(this.x + t.x, this.y + t.y, .875 * this.radius, 0, 2 * Math.PI, !1),
    e.strokeStyle = this.color,
    e.lineWidth = this.radius / 4,
    e.stroke(),
	e.lineWidth=defaultLine;
  }
}
class PredictionSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"prediction_sniper_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  timeOfImpact(p, v, s) {
    // Requires relative position and velocity to aiming point
    let a = s * s - (v.x * v.x + v.y * v.y);
    let b = p.x * v.x + p.y * v.y;
    let c = p.x * p.x + p.y * p.y;

    let d = b * b + a * c;

    let t=(b + Math.sqrt(d)) / a;

    return t*0.9;
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  let radial={x:closest_entity.velX??0,y:closest_entity.velY??0};
	  let diff={x:-distance_x,y:-distance_y}
      let lead=this.timeOfImpact(diff,radial,EvadesConfig.defaults.prediction_sniper_projectile.speed);
      var dX=diff.x + lead * radial.x;
      var dY=diff.y + lead * radial.y;
	  if(!isNaN(lead) && lead >=0){
		const projectile=new PredictionSniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.prediction_sniper_projectile.speed,Math.atan2(dY,dX)/Math.PI*180);
		projectile.area=this.area;projectile.z=this.z;
        area.entities.push(projectile);
        this.releaseTime = this.release_interval;
	  }
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class ResidueEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"residue_enemy");
    this.clock = 0;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 3000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class PredictionSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"prediction_sniper_projectile");
    this.immune=true;
	this.outline=false;
    this.clock = 0;
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class IceSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"ice_sniper_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new IceSniperProjectile(this.x,this.y,EvadesConfig.defaults.ice_sniper_projectile.radius,EvadesConfig.defaults.ice_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class IceSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"ice_sniper_projectile");
    this.immune=true;
	this.outline=false;
    this.clock = 0;
  }
  playerInteraction(player){
	if(!player.invulnerable){
	  player.isIced=true;
	  player.icedTimeLeft=1000*player.effectImmune;
	}
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class PoisonSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"poison_sniper_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new PoisonSniperProjectile(this.x,this.y,EvadesConfig.defaults.poison_sniper_projectile.radius,EvadesConfig.defaults.poison_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class PoisonSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"poison_sniper_projectile");
    this.immune=true;
    this.clock = 0;
		this.outline=false;
  }
  playerInteraction(player){
	if(!player.invulnerable){
	  player.isPoisoned=true;
	  player.poisonedTimeLeft=1000*player.effectImmune;
	}
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class SpeedSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,speed_loss){
    super(x,y,radius,speed,angle,"speed_sniper_enemy");
    this.release_interval = 2500,
    this.speed_loss = speed_loss;
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new SpeedSniperProjectile(this.x,this.y,EvadesConfig.defaults.speed_sniper_projectile.radius,EvadesConfig.defaults.speed_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.speed_loss)
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class SpeedSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,speed_loss){
    super(x,y,radius,speed,angle,"speed_sniper_projectile");
    this.speed_loss=speed_loss;
    this.immune=true;
		this.outline=false;
    this.clock = 0;
  }
	playerInteraction(player){
		if(!player.isDowned()&&!player.invulnerable){
			this.remove=true;
			player.speed-=this.speed_loss*player.effectImmune;
			player.statSpeed-=this.speed_loss*player.effectImmune;
			player.speed=Math.max(150,player.speed);
			player.statSpeed=Math.max(150,player.statSpeed);
		}
	}
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class LeadSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"lead_sniper_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new LeadSniperProjectile(this.x,this.y,this.radius*2/3,EvadesConfig.defaults.lead_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class LeadSniperProjectile extends Enemy{
	constructor(x,y,radius,speed,angle){
		super(x,y,radius,speed,angle,"lead_sniper_projectile");
		this.immune=true;
		this.outline=false;
		this.clock=0;
	}
	playerInteraction(player){
		if(!player.isDowned()&&!player.invulnerable){
			this.remove=true;
			player.isLead=true;
			player.leadTime=3500*player.effectImmune;
		}
	}
	onCollide(){
		this.remove=true;
	}
	update(delta) {
		this.clock+=delta;
		if(this.clock>=7000)
			this.remove=true;
		super.update(delta);
	}
}
class RegenSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,regen_loss){
    super(x,y,radius,speed,angle,"regen_sniper_enemy");
    this.release_interval = 2500,
    this.regen_loss=regen_loss;
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new RegenSniperProjectile(this.x,this.y,EvadesConfig.defaults.regen_sniper_projectile.radius,EvadesConfig.defaults.regen_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.regen_loss);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class RegenSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,regen_loss){
    super(x,y,radius,speed,angle,"regen_sniper_projectile");
    this.regen_loss=regen_loss;
    this.immune=true;
    this.clock = 0;
	this.outline=false;
  }
	playerInteraction(player){
		if(!player.isDowned()&&!player.invulnerable){
			this.remove=true;
			player.energyRegen-=this.regen_loss*player.effectImmune;
			player.energyRegen=Math.max(1,player.energyRegen);
		}
	}
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class CorrosiveSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"corrosive_sniper_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new CorrosiveSniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.corrosive_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class CorrosiveSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"corrosive_sniper_projectile");
	this.corrosive=true;
    this.clock = 0;
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class FrostGiantEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,
  immune,
  projectile_duration,
  projectile_radius,
  projectile_speed,
  pause_interval,
  pause_duration,
  turn_speed,
  turn_acceleration,
  shot_interval,
  shot_acceleration,
  direction,
  pattern,
  cone_angle,
  boundary){
    super(x,y,radius,speed,angle,"frost_giant_enemy");
    this.immune=immune,
    this.projectile_duration=projectile_duration,
    this.projectile_radius=projectile_radius??10,
    this.projectile_speed=projectile_speed??120,
    this.pause_interval=pause_interval,
    this.pause_duration=pause_duration,
    this.turn_speed=turn_speed,
    this.initial_turn_speed=this.turn_speed,
    this.turn_acceleration=turn_acceleration,
    this.shot_interval=shot_interval,
    this.initial_shot_interval=shot_interval,
    this.shot_acceleration=shot_acceleration,
    this.direction=direction,
    this.pattern=this.get_pattern_generator(pattern),
    this.cone_angle=cone_angle;
    this.initial_angle=this.angle;
    this.shot_cooldown = this.shot_interval;
    this.pause_cooldown = this.pause_interval;
    this.pause_time = this.pause_duration;
  }
  prepare_shot(delta){
    if(this.pause_interval!=0){
      if(this.pause_cooldown <= 0){
        this.shot_interval = this.initial_shot_interval;
        this.turn_speed = this.initial_turn_speed;
        this.pause_time -= delta;
        if(this.pause_time<0){
          this.pause_cooldown = this.pause_interval;
          this.pause_time = this.pause_duration;
        }
      return false;
      } else {
          this.pause_cooldown -= delta;
        }
    }
    this.shot_cooldown -= delta;
    if(this.shot_cooldown < 0){
      this.shot_cooldown = this.shot_interval;
      return true;
    } return false;
  }
  get_pattern_generator(pattern){
    switch(pattern){
      case"spiral": return this.spiral_pattern;
      case"twinspiral": return this.twinspiral_pattern;
      case"quadspiral": return this.quadspiral_pattern;
      case"cone": return this.cone_pattern;
      case"twincone": return this.twincone_pattern;
      case"cone_edges": return this.cone_edges_pattern;
      case"twin": return this.twin_pattern;
      case"singlebig": return this.singlebig_pattern;
      default: this.rotation = true; return ()=>{}
    }
  }
  rad_to_deg(x){
	  return x/Math.PI*180;
  }
  deg_to_rad(x){
	  return x*Math.PI/180;
  }
  generate_entities(delta,area){
    this.angle+=this.deg_to_rad(this.turn_speed*this.direction*delta/1e3);
    this.shot_interval-=this.shot_acceleration*delta/1e3;
    this.turn_speed+=this.turn_acceleration*delta/(1e3/30);
    this.pattern(delta,area);
  }
  cone_pattern(delta,area){
    function angle_difference(x,y){
      return Math.min(Math.abs(y-x),Math.abs(y-x+Math.PI*2),Math.abs(y-x-Math.PI*2))
    };
    if(Math.abs(angle_difference(this.angle,this.initial_angle)) >= this.deg_to_rad(this.cone_angle)){
      // Avoid accumulation floating point error by resetting angle.
      this.angle = this.initial_angle + this.deg_to_rad(this.cone_angle * this.direction);
      this.direction *= -1;
    }

    if(this.prepare_shot(delta)){
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle),this.projectile_duration)
    }
  }
  spiral_pattern(delta,area){
    if(this.prepare_shot(delta)){
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle),this.projectile_duration)
    }
  }
  singlebig_pattern(delta,area){
    if(this.prepare_shot(delta)){
      const big_radius = this.projectile_radius*3;
      const big_speed = this.projectile_speed;
      const offset_distance = big_radius / 2
      const newPos = {x:this.x + Math.cos(this.initial_angle) * offset_distance,
                      y:this.y + Math.sin(this.initial_angle) * offset_distance}
      this.addBullet(area,newPos.x,newPos.y,big_speed,big_radius,this.rad_to_deg(this.initial_angle),this.projectile_duration)
    }
  }
  quadspiral_pattern(delta,area){
    if(this.prepare_shot(delta)){
	  var i=0;
	  while(i<4){
        this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)+(i++)*90,this.projectile_duration)
	  }
    }
  }
  twin_pattern(delta,area){
    if(this.prepare_shot(delta)){
      this.direction *= -1;

      const perpendicular_angle = this.initial_angle + Math.PI / 2 * this.direction;
      const offset_distance = 15;
      const newPos = {x: this.x + Math.cos(perpendicular_angle) * offset_distance,
                      y: this.y + Math.sin(perpendicular_angle) * offset_distance}
      this.addBullet(area,newPos.x,newPos.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.initial_angle),this.projectile_duration)
    }
  }
  cone_edges_pattern(delta,area){
    if(this.prepare_shot(delta)){
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)+this.cone_angle,this.projectile_duration)
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)-this.cone_angle,this.projectile_duration)
    }
  }
  twinspiral_pattern(delta,area){
    if(this.prepare_shot(delta)){
	  var i=0;
	  while(i<2){
        this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)+(i++)*180,this.projectile_duration)
	  }
    }
  }
  twincone_pattern(delta,area){
    function angle_difference(x,y){
      return Math.min(Math.abs(y-x),Math.abs(y-x+Math.PI*2),Math.abs(y-x-Math.PI*2))
    };

    const angle_moved = angle_difference(this.angle, this.initial_angle);

    if(Math.abs(angle_moved) >= this.deg_to_rad(this.cone_angle)){
      // Avoid accumulation floating point error by resetting angle.
      this.angle = this.initial_angle + this.deg_to_rad(this.cone_angle * this.direction);
      this.direction *= -1;
    }

    if(this.prepare_shot(delta)){
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.initial_angle+angle_moved),this.projectile_duration)
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.initial_angle-angle_moved),this.projectile_duration)
    }
  }
  addBullet(area,x,y,speed,radius,angle,duration){
	  const projectile=new FrostGiantIceProjectile(x,y,radius,speed,angle,duration);
	  projectile.area=this.area;projectile.z=this.z;
	  area.entities.push(projectile);
  }
  update(delta,area) {
    if(!this.rotation){
      this.generate_entities(delta,area);
    }
    if(this.rotation){
      this.velangle();
      this.angle += this.deg_to_rad(2*this.turn_speed*this.direction*delta/1e3);
      this.anglevel();
    }
    super.update(delta);
  }
}
class FrostGiantIceProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,projectile_duration){
    super(x,y,radius,speed,angle,"frost_giant_ice_projectile");
	this.duration=projectile_duration;
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.duration -= delta;
    if (this.duration <= 0) {
      this.duration = Math.max(0,this.duration);
      this.remove=true;
    }
    super.update(delta);
  }
}
class PositiveMagneticSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"positive_magnetic_sniper_enemy");
    this.release_interval = 3000;
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new PositiveMagneticSniperProjectile(this.x,this.y,EvadesConfig.defaults.positive_magnetic_sniper_projectile.radius,EvadesConfig.defaults.positive_magnetic_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
	projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class PositiveMagneticSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"positive_magnetic_sniper_projectile");
    this.immune=true;
	this.outline=false;
    this.clock = 0;
  }
  playerInteraction(player){
	if(player.isDowned()||player.invulnerable)return;
    this.remove=true;
	if(player.magnetDirection=="DOWN"){
		player.magnetDirection="UP";
		if(player.abilityOne.abilityType==98){
			player.abilityOne.abilityType=99;
			player.abilityOne.name=abilityConfig[player.abilityOne.abilityType].name;
		};
		if(player.abilityTwo.abilityType==98){
			player.abilityTwo.abilityType=99;
			player.abilityTwo.name=abilityConfig[player.abilityTwo.abilityType].name;
		};
		if(player.abilityThree){
			if(player.abilityThree.abilityType==98){
				player.abilityThree.abilityType=99;
				player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
			};
		};
	}
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class NegativeMagneticSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"negative_magnetic_sniper_enemy");
    this.release_interval = 3000;
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new NegativeMagneticSniperProjectile(this.x,this.y,EvadesConfig.defaults.negative_magnetic_sniper_projectile.radius,EvadesConfig.defaults.negative_magnetic_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
			projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class NegativeMagneticSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"negative_magnetic_sniper_projectile");
    this.immune=true;
	this.outline=false;
    this.clock = 0;
  }
  playerInteraction(player){
	if(player.isDowned()||player.invulnerable)return;
    this.remove=true;
    player.magnetDirection="DOWN";
	if(player.abilityOne.abilityType==99){
		player.abilityOne.abilityType=98;
		player.abilityOne.name=abilityConfig[player.abilityOne.abilityType].name;
	};
	if(player.abilityTwo.abilityType==99){
		player.abilityTwo.abilityType=98;
		player.abilityTwo.name=abilityConfig[player.abilityTwo.abilityType].name;
	};
	if(player.abilityThree){
		if(player.abilityThree.abilityType==99){
			player.abilityThree.abilityType=98;
			player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
		};
	};
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class ForceSniperAEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"force_sniper_a_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new ForceSniperAProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.force_sniper_a_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
			projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class ForceSniperAProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"force_sniper_a_projectile");
    this.immune=true;
    this.clock = 0;
	this.outline=false;
	this.touchedPlayers=[];
  }
  playerInteraction(player,delta){
	  if(this.touchedPlayers.indexOf(player)==-1&&!player.isDowned()&&!player.invulnerable){
		  this.touchedPlayers.push(player);
		  player.firstAbilityActivated=!player.firstAbilityActivated;
		  player.handleAbility(player.abilityOne,1,delta,[player.abilityTwo,player.abilityThree],true);
	  }
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class ForceSniperBEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"force_sniper_b_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new ForceSniperBProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.force_sniper_b_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
			projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class ForceSniperBProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"force_sniper_b_projectile");
    this.immune=true;
	this.outline=false;
    this.clock = 0;
	this.touchedPlayers=[];
  }
  playerInteraction(player,delta){
	  if(this.touchedPlayers.indexOf(player)==-1&&!player.isDowned()&&!player.invulnerable){
		  this.touchedPlayers.push(player);
		  player.secondAbilityActivated=!player.secondAbilityActivated;
		  player.handleAbility(player.abilityTwo,2,delta,[player.abilityOne,player.abilityThree],true);
	  }
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class WindGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,ignore_invulnerability,ignore_dead_players){
    super(x,y,radius,speed,angle,"wind_ghost_enemy");
	this.gravity=1;
	this.isHarmless=true;
	this.immune=true;
	this.ignore_dead_players=ignore_dead_players;
	this.disabled=true;
	this.ignore_invulnerability=ignore_invulnerability;
  }
  playerInteraction(player,delta){
    var iterations=1024;
	var curIters=0;
	if ((!player.invulnerable||this.ignore_invulnerability)&&(!player.isDowned()&&this.ignore_dead_players)||!this.ignore_dead_players) {
	  while(distance({x:0,y:0},{x:player.x - this.x,y:player.y - this.y})<this.radius+player.radius){
		curIters++;
		if(curIters>=iterations)break;
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        var dist = distance({x:0,y:0},{x:dx,y:dy});
        var attractionAmplitude = Math.pow(2, -(dist / 100));
        var moveDist = (this.gravity * attractionAmplitude);
        var angleToPlayer = Math.atan2(dy, dx);
        player.x += (moveDist * Math.cos(angleToPlayer)) * (delta / (1000 / 30));
        player.y += (moveDist * Math.sin(angleToPlayer)) * (delta / (1000 / 30));
	    player.collision(delta);
	  }
    }
  }
}
class WindSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"wind_sniper_enemy");
    this.release_interval = 3000,
    this.releaseTime = (Math.random()*this.release_interval);
  }
  update(delta,area) {
    if(this.releaseTime<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 600**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new WindSniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.wind_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180);
			projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class WindSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"wind_sniper_projectile");
	this.gravity=1;
	this.outline=false;
	this.immune=true;
	this.clock=0;
  }
  playerInteraction(player,delta){
    var iterations=1024;
	var curIters=0;
	if (!player.invulnerable) {
	  while(distance({x:0,y:0},{x:player.x - this.x,y:player.y - this.y})<this.radius+player.radius){
		curIters++;
		if(curIters>=iterations)break;
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        var dist = distance({x:0,y:0},{x:dx,y:dy});
        var attractionAmplitude = Math.pow(2, -(dist / 100));
        var moveDist = (this.gravity * attractionAmplitude);
        var angleToPlayer = Math.atan2(dy, dx);
        player.x += (moveDist * Math.cos(angleToPlayer)) * (delta / (1000 / 30));
        player.y += (moveDist * Math.sin(angleToPlayer)) * (delta / (1000 / 30));
	    player.collision(delta);
	  }
    }
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    super.update(delta);
  }
}
class LungingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"lunging_enemy");
    this.base_speed = speed;
    this.reset_parameters();
	this.color_change=0;
  }
  reset_parameters(){
    this.lunge_speed = this.base_speed;
    this.normal_speed = 0;
    this.time_to_lunge = 1500;
    this.lunge_timer = 0;
    this.max_lunge_time = 2000;
    this.time_during_lunge = 0;
    this.lunge_cooldown_max = 500;
    this.lunge_cooldown_timer = 0;
    this.base_speed = 0;
    this.compute_speed();
  }
  compute_speed(){
    this.velX = Math.cos(this.angle) * this.base_speed;
    this.velY = Math.sin(this.angle) * this.base_speed;
  }
  getColorChange() {
  	const e = this.hexToRgb(this.color);
  	return e.r += this.color_change,
  	e.g -= 1.45 * this.color_change,
  	e.b -= 1.3 * this.color_change,
  	`rgb(${e.r}, ${e.g}, ${e.b})`
  }
  update(delta,area){
    this.heating = false;
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 250**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if (this.time_during_lunge > 0){
      if(this.time_during_lunge >= this.max_lunge_time){
        this.time_during_lunge = 0;
        this.lunge_cooldown_timer = 1;
        this.base_speed = this.normal_speed;
        this.compute_speed();
      } else {
        this.time_during_lunge += delta;
        this.base_speed = this.lunge_speed * (1 - (this.time_during_lunge / this.max_lunge_time));
        this.compute_speed();
      }
    }
    if(this.lunge_cooldown_timer > 0){
      if(this.lunge_cooldown_timer > this.lunge_cooldown_max){
        this.lunge_cooldown_timer = 0;
      } else {
        this.lunge_cooldown_timer += delta;
        this.color_change = 55-Math.floor(55*this.lunge_cooldown_timer/this.lunge_cooldown_max)
      }
    }
    else {
      let lunge_time_ratio = this.lunge_timer / this.time_to_lunge;
      if(closest_entity != undefined){
		distance_x = this.x - closest_entity.x;
		distance_y = this.y - closest_entity.y;
        let target_angle = Math.atan2(distance_y,distance_x)+Math.PI;
        target_angle += Math.random() * Math.PI/8 - Math.PI/16;
        if (this.time_during_lunge == 0){
          this.lunge_timer += delta;
          this.color_change = Math.floor(55 * lunge_time_ratio);
          if(this.lunge_timer >= this.time_to_lunge){
            this.lunge_timer = 0;
            this.time_during_lunge = 1;
            this.base_speed = this.lunge_speed;
            this.change_angle(target_angle);
          }
        }
      } else {
		let target_angle = this.target_angle;
        if(this.lunge_timer > 0){
          this.lunge_timer-=delta;
          this.color_change = Math.floor(55 * lunge_time_ratio);
        }
        if(this.lunge_timer < 0){
          this.lunge_timer = 0;
        }
      }
      if (lunge_time_ratio > 0.75){
		this.is_shaking=true;
        this.x+=Math.round(Math.random()*4-2);
        this.y+=Math.round(Math.random()*4-2);
      }
    }
	this.speed=this.baseSpeed;
	super.update(delta,area);
  }
  change_angle(angle){
    this.angle = angle;
    this.compute_speed();
  }
}
class StalactiteEnemy extends Enemy {
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"stalactite_enemy");
    this.hasCollided=false;
    this.collideTime=0;
  }
  update(delta, area) {
	if(this.hasCollided){
		let projectile;
		!this.collideTime&&(
			projectile=new StalactiteEnemyProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.stalactite_enemy_projectile.speed,void 0),
			projectile.area=this.area,
			projectile.z=this.z
		);
      this.collideTime += delta;
      if (this.collideTime > 500) {
        this.hasCollided = false;
        this.collideTime = 0;
      } else {
        this.speedMultiplier = 0;
      }
    }
	super.update(delta,area);
  }
  onCollide(){
    this.hasCollided = true;
  }
}
class StalactiteEnemyProjectile extends Enemy{
  constructor(x,y,radius,speed,angle){
    super(x,y,radius,speed,angle,"stalactite_enemy_projectile");
	this.duration=1500;
  }
  update(delta) {
    this.duration -= delta;
    if (this.duration <= 0){
      this.remove = true;
	  this.duration=0;
    }
    super.update(delta);
  }
}

//Cyber Castle Bosses (may be unstable based on the enemy type and will crash anytime)
class AibotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,aibot_radius=180){
		super(x,y,radius,speed,angle,"aibot_enemy");
		this.maxHealth=400;
		this.health=this.maxHealth;
		this.name="Aibot";
		this.enemy_spawn_limit=16;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.target_player=null;
		this.losing_health=false;
		this.total_player_count = new Set;
		this.effects.push({radius:aibot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		let active_players = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone});
		for(let entity of active_players){
			if (entity.debuff_type=="aibot_debuff"){
				let x_dist=entity.x-this.x,
				y_dist=entity.y-this.y,
				dist_to_ball=Math.sqrt(x_dist**2+y_dist**2),
				repulsion=1020*entity.effectImmune,
				attraction_amplitude=Math.pow(2,-(dist_to_ball/100)),
				move_dist=repulsion*attraction_amplitude/1e3*delta,
				angle_to_ball=Math.atan2(y_dist,x_dist);
				entity.under_effects=true;
				entity.x+=move_dist*Math.cos(angle_to_ball);
				entity.y+=move_dist*Math.sin(angle_to_ball);
				entity.collision(0)
			}
		}
		if(this.losing_health)this.damage(13.5/(1e3/60));
		if(this.health<=0){
			for(let entity of map.players){
				entity.aibot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="upper_left";
				if(
					entity.aibot_defeated
					&&entity.fibot_defeated
					&&entity.wabot_defeated
					&&entity.eabot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0){
				this.release_ready=true;
				this.target_player=null;
				this.total_player_count=new Set;
			}
		}else{
			for(let entity of map.players){
				if(!this.total_player_count.has(entity))this.total_player_count.add(entity);
				if(entity.debuff_type=="aibot_debuff"||entity.effectImmune==0||entity.isDowned())continue;
				if(this.target_player==null)if(Math.random()>0.75)this.target_player=entity;
			}
			if(this.target_player!=null){
				this.target_player.debuff_type="aibot_debuff";
				this.target_player.hasWindDebuff=true;
				this.release_interval=12000/this.total_player_count.size;
				this.release_time=this.release_interval;
				this.release_ready=false;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				area.entities.push(new WindGhostEnemy(this.x,this.y,54,30,void 0,false,null));
				area.entities.push(new RepellingGhostEnemy(this.x,this.y,90,180,void 0));
				area.entities.push(new DisablingGhostEnemy(this.x,this.y,72,195,void 0));
				area.entities.push(new WindSniperEnemy(this.x,this.y,30,600,void 0));
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=4;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
	}
	generation_disabled(){
		return false;
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class WabotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,wabot_radius=180){
		super(x,y,radius,speed,angle,"wabot_enemy");
		this.maxHealth=400;
		this.health=this.maxHealth;
		this.name="Wabot";
		this.enemy_spawn_limit=20;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.target_player=null;
		this.losing_health=false;
		this.total_player_count = new Set();
		this.effects.push({radius:wabot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.wabot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="upper_right";
				if(
					entity.aibot_defeated
					&&entity.fibot_defeated
					&&entity.wabot_defeated
					&&entity.eabot_defeated
				){
					if(entity.abilityThree==null)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0){
				this.release_ready=true;
				this.target_player=null;
				this.total_player_count=new Set();
			}
		}else{
			for(let entity of map.players){
				if(!this.total_player_count.has(entity))this.total_player_count.add(entity);
				if(entity.debuff_type=="wabot_debuff"||entity.effectImmune==0||entity.isDowned())continue;
				if(this.target_player==null)if(Math.random()>0.75)this.target_player=entity;
			}
			if(this.target_player!=null){
				this.target_player.debuff_type="wabot_debuff";
				this.target_player.hasWaterDebuff=true;
				this.release_interval=12000/this.total_player_count.size;
				this.release_time=this.release_interval;
				this.release_ready=false;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				area.entities.push(new LiquidEnemy(this.x,this.y,18,90,void 0,defaultValues.spawner.player_detection_radius))
				area.entities.push(new FreezingEnemy(this.x,this.y,3,300,void 0,defaultValues.spawner.freezing_radius))
				area.entities.push(new IcicleEnemy(this.x,this.y,30,360,void 0,defaultValues.spawner.horizontal))
				area.entities.push(new SnowmanEnemy(this.x,this.y,15,360,void 0))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=4;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class EabotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,eabot_radius=180){
		super(x,y,radius,speed,angle,"eabot_enemy");
		this.maxHealth=400;
		this.health=this.maxHealth;
		this.name="Eabot";
		this.enemy_spawn_limit=24;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.target_player=null;
		this.losing_health=false;
		this.total_player_count = new Set();
		this.effects.push({radius:eabot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.eabot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="lower_left";
				if(
					entity.aibot_defeated
					&&entity.fibot_defeated
					&&entity.wabot_defeated
					&&entity.eabot_defeated
				){
					if(entity.abilityThree==null)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0){
				this.release_ready=true;
				this.target_player=null;
				this.total_player_count=new Set();
			}
		}else{
			for(let entity of map.players){
				if(!this.total_player_count.has(entity))this.total_player_count.add(entity);
				if(entity.debuff_type=="eabot_debuff"||entity.effectImmune==0||entity.isDowned())continue;
				if(this.target_player==null)if(Math.random()>0.75)this.target_player=entity;
			}
			if(this.target_player!=null){
				this.target_player.debuff_type="eabot_debuff";
				this.target_player.hasEarthDebuff=true;
				this.target_player.isStone=true;
				this.target_player.energy=0;
				this.release_interval=12000/this.total_player_count.size;
				this.release_time=this.release_interval;
				this.release_ready=false;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				area.entities.push(new SandEnemy(this.x,this.y,18,150,void 0))
				area.entities.push(new SandrockEnemy(this.x,this.y,24,450,void 0))
				area.entities.push(new QuicksandEnemy(this.x,this.y,8,300,void 0,100,Math.random()*360,defaultValues.spawner.quicksand_strength))
				area.entities.push(new CrumblingEnemy(this.x,this.y,30,300,void 0))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=4;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class FibotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,fibot_radius=180){
		super(x,y,radius,speed,angle,"fibot_enemy");
		this.maxHealth=400;
		this.health=this.maxHealth;
		this.name="Fibot";
		this.enemy_spawn_limit=24;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.target_player=null;
		this.losing_health=false;
		this.total_player_count = new Set();
		this.effects.push({radius:fibot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.fibot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="lower_right";
				if(
					entity.aibot_defeated
					&&entity.fibot_defeated
					&&entity.wabot_defeated
					&&entity.eabot_defeated
				){
					if(entity.abilityThree==null)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0){
				this.release_ready=true;
				this.target_player=null;
				this.total_player_count=new Set();
			}
		}else{
			for(let entity of map.players){
				if(!this.total_player_count.has(entity))this.total_player_count.add(entity);
				if(entity.debuff_type=="fibot_debuff"||entity.effectImmune==0||entity.effects_immune_time>0||entity.isDowned())continue;
				if(this.target_player==null)if(Math.random()>0.75)this.target_player=entity;
			}
			if(this.target_player!=null){
				this.target_player.debuff_type="fibot_debuff";
				this.target_player.hasFireDebuff=true;
				this.target_player.electrify_interval=4000;
				this.target_player.electrify_time=this.target_player.electrify_interval;
				this.release_interval=12000/this.total_player_count.size;
				this.release_time=this.release_interval;
				this.release_ready=false;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				area.entities.push(new FireTrailEnemy(this.x,this.y,30,150,void 0))
				area.entities.push(new LavaEnemy(this.x,this.y,12,120,void 0,defaultValues.spawner.lava_radius))
				area.entities.push(new LungingEnemy(this.x,this.y,24,450,void 0))
				area.entities.push(new SizingEnemy(this.x,this.y,18,360,void 0))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=4;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class DabotEnemy extends Enemy{//Crashes when it shoots its own projectile
	constructor(x,y,radius,speed,angle,dabot_radius=180){
		super(x,y,radius,speed,angle,"dabot_enemy");
		this.maxHealth=500;
		this.health=this.maxHealth;
		this.name="Dabot";
		this.enemy_spawn_limit=5;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.total_player_count = new Set();
		this.effects.push({radius:dabot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.dabot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="upper_left";
				if(
					entity.icbot_defeated
					&&entity.elbot_defeated
					&&entity.mebot_defeated
					&&entity.libot_defeated
					&&entity.dabot_defeated
					&&entity.plbot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				area.entities.push(new GravityEnemy(this.x,this.y,18,30,void 0,defaultValues.spawner.gravity_radius,defaultValues.spawner.gravity))
				area.entities.push(new GravityEnemy(this.x,this.y,18,30,void 0,defaultValues.spawner.gravity_radius,defaultValues.spawner.gravity))
				area.entities.push(new RepellingEnemy(this.x,this.y,18,30,void 0,defaultValues.spawner.repelling_radius,defaultValues.spawner.repulsion))
				area.entities.push(new RepellingEnemy(this.x,this.y,18,30,void 0,defaultValues.spawner.repelling_radius,defaultValues.spawner.repulsion))
				if(this.enemy_spawns==0){
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
					area.entities.push(new TeleportingEnemy(this.x,this.y,18,1440,void 0))
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
		//if(this.spark_time>0||this.stomped_push_time>0||this.energy<=0||this.is_disabled)return;
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0)this.release_ready=true;
		}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      if(entity.debuff_type=="placeholder")continue;
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 3200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      area.entities.push(new DabotProjectile(this.x,this.y,EvadesConfig.defaults.dabot_projectile.radius,EvadesConfig.defaults.dabot_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180))
	area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
      this.releaseTime = (this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy);
    }
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class ElbotEnemy extends Enemy{//Crashes when it tries to spawn an electric group of enemies which are not implemeted yet
	constructor(x,y,radius,speed,angle,elbot_radius=180){
		super(x,y,radius,speed,angle,"elbot_enemy");
		this.maxHealth=500;
		this.health=this.maxHealth;
		this.name="Elbot";
		this.enemy_spawn_limit=4;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.effects.push({radius:elbot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=2000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.dabot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="upper_right";
				if(
					entity.icbot_defeated
					&&entity.elbot_defeated
					&&entity.mebot_defeated
					&&entity.libot_defeated
					&&entity.dabot_defeated
					&&entity.plbot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				if(this.enemy_spawns==0){
					area.entities.push(new ElectricalEnemy(this.x,this.y,18,180,void 0))
					area.entities.push(new ElectricalEnemy(this.x,this.y,18,180,void 0))
					area.entities.push(new ElectricalEnemy(this.x,this.y,18,180,void 0))
					area.entities.push(new ElectricalEnemy(this.x,this.y,18,180,void 0))
					area.entities.push(new ElectricalEnemy(this.x,this.y,18,180,void 0))
				}else{
					area.entities.push(new SparkingEnemy(this.x,this.y,18,180,void 0))
					area.entities.push(new SparkingEnemy(this.x,this.y,18,180,void 0))
					area.entities.push(new ThunderboltEnemy(this.x,this.y,75,300,void 0))
					area.entities.push(new ThunderboltEnemy(this.x,this.y,75,300,void 0))
					area.entities.push(new StaticEnemy(this.x,this.y,24,90,void 0))
					area.entities.push(new StaticEnemy(this.x,this.y,24,90,void 0))
					area.entities.push(new StaticEnemy(this.x,this.y,24,90,void 0))
					area.entities.push(new StaticEnemy(this.x,this.y,24,90,void 0))
					area.entities.push(new StaticEnemy(this.x,this.y,24,90,void 0))
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
		//if(this.spark_time>0||this.stomped_push_time>0||this.energy<=0||this.is_disabled)return;
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0)this.release_ready=true;
		}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      if(entity.debuff_type=="placeholder")continue;
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 3200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      area.entities.push(new ElbotProjectile(this.x,this.y,EvadesConfig.defaults.elbot_projectile.radius,EvadesConfig.defaults.elbot_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
      this.releaseTime = (this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy);
    }
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class IcbotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,icbot_radius=180){
		super(x,y,radius,speed,angle,"icbot_enemy");
		this.maxHealth=500;
		this.health=this.maxHealth;
		this.name="Icbot";
		this.enemy_spawn_limit=4;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.effects.push({radius:icbot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.icbot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="upper_right";
				if(
					entity.icbot_defeated
					&&entity.elbot_defeated
					&&entity.mebot_defeated
					&&entity.libot_defeated
					&&entity.dabot_defeated
					&&entity.plbot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				area.entities.push(new IceSniperEnemy(this.x,this.y,18,90,void 0))
				area.entities.push(new IceGhostEnemy(this.x,this.y,18,90,void 0))
				area.entities.push(new IceGhostEnemy(this.x,this.y,18,90,void 0))
				area.entities.push(new IceGhostEnemy(this.x,this.y,18,90,void 0))
				area.entities.push(new IceGhostEnemy(this.x,this.y,18,90,void 0))
				area.entities.push(new FreezingEnemy(this.x,this.y,18,150,void 0,120))
				area.entities.push(new SnowmanEnemy(this.x,this.y,6,180,void 0))
				area.entities.push(new SnowmanEnemy(this.x,this.y,6,180,void 0))
				area.entities.push(new SnowmanEnemy(this.x,this.y,6,180,void 0))
				area.entities.push(new SnowmanEnemy(this.x,this.y,6,180,void 0))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
		//if(this.spark_time>0||this.stomped_push_time>0||this.energy<=0||this.is_disabled)return;
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0)this.release_ready=true;
		}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      if(entity.debuff_type=="placeholder")continue;
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 3200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      area.entities.push(new IceSniperProjectile(this.x,this.y,EvadesConfig.defaults.ice_sniper_projectile.radius*3,EvadesConfig.defaults.ice_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
      this.release_time = (this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy);
	  this.release_ready=false;
    }
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class LibotEnemy extends Enemy{//Crashes when it shoots its own projectile
	constructor(x,y,radius,speed,angle,libot_radius=180){
		super(x,y,radius,speed,angle,"libot_enemy");
		this.maxHealth=500;
		this.health=this.maxHealth;
		this.name="Libot";
		this.enemy_spawn_limit=4;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.effects.push({radius:libot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=2000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.libot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="upper_right";
				if(
					entity.icbot_defeated
					&&entity.elbot_defeated
					&&entity.mebot_defeated
					&&entity.libot_defeated
					&&entity.dabot_defeated
					&&entity.plbot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				if(this.enemy_spawns==3){
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
					area.entities.push(new DasherEnemy(this.x,this.y,24,240,void 0))
				}else{
					area.entities.push(new NormalEnemy(this.x,this.y,12,180,void 0))
					area.entities.push(new NormalEnemy(this.x,this.y,12,180,void 0))
					area.entities.push(new NormalEnemy(this.x,this.y,12,180,void 0))
					area.entities.push(new NormalEnemy(this.x,this.y,12,180,void 0))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new SlowingEnemy(this.x,this.y,12,90,void 0,150+this.enemy_spawns*16,defaultValues.spawner.slow))
					area.entities.push(new DrainingEnemy(this.x,this.y,12,120,void 0,150+this.enemy_spawns*16,defaultValues.spawner.drain))
					area.entities.push(new DrainingEnemy(this.x,this.y,12,120,void 0,150+this.enemy_spawns*16,defaultValues.spawner.drain))
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
		//if(this.spark_time>0||this.stomped_push_time>0||this.energy<=0||this.is_disabled)return;
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0)this.release_ready=true;
		}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      if(entity.debuff_type=="placeholder")continue;
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 3200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      area.entities.push(new LibotProjectile(this.x,this.y,EvadesConfig.defaults.libot_projectile.radius,EvadesConfig.defaults.libot_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
      this.releaseTime = (this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy);
    }
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class MebotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,mebot_radius=180){
		super(x,y,radius,speed,angle,"mebot_enemy");
		this.maxHealth=500;
		this.health=this.maxHealth;
		this.name="Mebot";
		this.enemy_spawn_limit=4;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.effects.push({radius:mebot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.mebot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="lower_right";
				if(
					entity.icbot_defeated
					&&entity.elbot_defeated
					&&entity.mebot_defeated
					&&entity.libot_defeated
					&&entity.dabot_defeated
					&&entity.plbot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				if(this.enemy_spawns==0){
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
					area.entities.push(new SwitchEnemy(this.x,this.y,40,150,void 0,defaultValues.spawner.switch_interval,defaultValues.spawner.switch_time,void 0))
				}else{
					area.entities.push(new ImmuneEnemy(this.x,this.y,18,90,void 0))
					area.entities.push(new ImmuneEnemy(this.x,this.y,18,90,void 0))
					area.entities.push(new ImmuneEnemy(this.x,this.y,18,90,void 0))
					area.entities.push(new ImmuneEnemy(this.x,this.y,30,90,void 0))
					area.entities.push(new SniperEnemy(this.x,this.y,24,150,void 0,defaultValues.spawner.recharge))
					if(this.enemy_spawns%2==1)
						area.entities.push(new RadiatingBulletsEnemy(this.x,this.y,12,180,void 0,defaultValues.spawner.release_interval,defaultValues.spawner.release_time));
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
		//if(this.spark_time>0||this.stomped_push_time>0||this.energy<=0||this.is_disabled)return;
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0)this.release_ready=true;
		}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      if(entity.debuff_type=="placeholder")continue;
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 3200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
	  const projectile=new SniperProjectile(this.x,this.y,EvadesConfig.defaults.sniper_projectile.radius*3,EvadesConfig.defaults.sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180)
	  projectile.area=this.area;projectile.z=this.z;
      area.entities.push(projectile)
      this.release_time = (this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy);
	  this.release_ready=false;
    }
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class PlbotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,plbot_radius=180){
		super(x,y,radius,speed,angle,"plbot_enemy");
		this.maxHealth=500;
		this.health=this.maxHealth;
		this.name="Plbot";
		this.enemy_spawn_limit=8;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.effects.push({radius:plbot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		this.reset_parameters();
	}
	reset_parameters(){
		this.has_projectiles=true;
		this.release_interval=3000;
		this.release_time=this.release_interval;
		this.release_ready=false;
		this.spawn_enemy_interval=1000;
		this.spawn_enemy_time=this.spawn_enemy_interval
		this.spawn_enemy_ready=false;
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.losing_health)this.damage(13.5/1e3*delta);
		if(this.health<=0){
			for(let entity of map.players){
				entity.plbot_defeated=true;
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="lower_left";
				if(
					entity.icbot_defeated
					&&entity.elbot_defeated
					&&entity.mebot_defeated
					&&entity.libot_defeated
					&&entity.dabot_defeated
					&&entity.plbot_defeated
				){
					if(!entity.abilityThree)
						entity.abilityThree={abilityType:102};
					entity.ability_removed=false;
				}
				entity.cannot_leave_area=false;
			}
			for(let entity of area.entities.filter(e=>e.isEnemy)){
				entity.remove=true;
			}
		}
	}
	generate_entities(delta,area){
		if(!this.spawn_enemy_ready){
			this.spawn_enemy_time -= delta;
			if(this.spawn_enemy_time <=0)
				this.spawn_enemy_ready=true;
		}else{
			if(this.enemy_spawns<this.enemy_spawn_limit){
				if(this.enemy_spawns<6)area.entities.push(new FlowerEnemy(this.x,this.y,32,150,void 0,defaultValues.spawner.growth_multiplier));
				area.entities.push(new SeedlingEnemy(this.x,this.y,12,150,void 0))
				if(this.enemy_spawns%2==0){
					area.entities.push(new CorrosiveEnemy(this.x,this.y,18,90,void 0))
					area.entities.push(new CorrosiveEnemy(this.x,this.y,18,90,void 0))
					area.entities.push(new CactusEnemy(this.x,this.y,40,0,void 0))
				}else{
					area.entities.push(new CorrosiveEnemy(this.x,this.y,12,90,void 0))
					area.entities.push(new CorrosiveEnemy(this.x,this.y,12,90,void 0))
					area.entities.push(new CactusEnemy(this.x,this.y,60,0,void 0))
				}
				if(this.enemy_spawns==7){
					area.entities.push(new SeedlingEnemy(this.x,this.y,36,210,void 0))
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.spawn_enemy_time=this.spawn_enemy_interval;
				this.spawn_enemy_ready=false;
			}
		}
		//if(this.spark_time>0||this.stomped_push_time>0||this.energy<=0||this.is_disabled)return;
		if(!this.release_ready){
			this.release_time-=delta*this.timer_reduction;
			if(this.release_time<=0)this.release_ready=true;
		}else{
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return !e.isDowned()&&!e.safeZone&&!e.nightActivated});
    }else{
      information = [mouseEntity];
    }
    var distance_x;
    var distance_y;
    var distance;
    for(var entity of information){
      if(entity.debuff_type=="placeholder")continue;
      distance_x = this.x - entity.x;
      distance_y = this.y - entity.y;
      distance = distance_x**2 + distance_y**2
      if(distance > 3200**2)continue;
      if(closest_entity==void 0){
        closest_entity=entity;
        closest_entity_distance = distance;
      }else if(closest_entity_distance>distance){
        closest_entity=entity;
        closest_entity_distance = distance;
      }
    }
    if(closest_entity!=void 0){
      distance_x = this.x - closest_entity.x;
      distance_y = this.y - closest_entity.y;
      area.entities.push(new CorrosiveSniperProjectile(this.x,this.y,36,EvadesConfig.defaults.corrosive_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
      this.release_time = (this.release_interval*(-this.energy+this.maxEnergy*2)/this.maxEnergy);
	  this.release_ready=false;
    }
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
class CybotEnemy extends Enemy{
	constructor(x,y,radius,speed,angle,cybot_radius,hard_mode){
		super(x,y,radius,speed,angle,"cybot_enemy");
		this.maxHealth=900;
		this.health=this.maxHealth;
		this.initialX=this.x;
		this.initialY=this.y;
		this.name=hard_mode?"Cybot MK.2":"Cybot";
		this.growing=true;
		this.release_ready=false;
		this.release_interval=50;
		this.release_time=this.release_interval;
		this.enemy_spawn_limit=50;
		this.enemy_spawns=0;
		this.movement_immune=true;
		this.losing_health=false;
		this.hard_mode=hard_mode;
		this.shield_up=false;
		this.shield_time=30000;
		this.shield_time_left=this.shield_time;
		this.can_spawn_ring_snipers=false;
		this.can_remove_ring_projectiles=true;
		this.ring_sniper_count=0;
		this.boss_radius=cybot_radius;
		this.ring_projectiles=[];
		this.effects.push({radius:1,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Cybot"})[0])})
		this.effects.push({radius:cybot_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Boss"})[0])})
		if(this.hard_mode){
			this.effects.push({radius:384+this.radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy Cybot Shield"})[0])})
			this.shield_up=true;
		}
	}
	update_parameters(delta,area){
		for(let entity of map.players)
			entity.cannot_leave_area=true;
		if(this.enemy_spawns < this.enemy_spawn_limit){
			this.x=this.initialX;
			this.y=this.initialY;
			this.immune=true;
			this.gainedImmunity=true;
			this.speedMultiplier=0;
		}else{
			if(this.health>=this.maxHealth*0.3){
				this.immune=false;
				this.gainedImmunity=false;
			}
		}
		for(let effect of this.effects){
			if(effect.effectType==41){
				if(this.immune||this.shield_up){
					effect.radius=0;
				}else{
					effect.radius=this.boss_radius;
				}
			}
		}
		if(this.losing_health)this.damage(13.5/1e3*delta);

		//Phase 1
		if(this.health>=this.maxHealth*0.98){
			for(let effect of this.effects){
				if(effect.effectType==57){
					if(effect.radius>0){
						if(this.growing){
							effect.radius+=255/1e3*delta;
							if(effect.radius>=850)this.growing=false;
						}else{
							effect.radius-=21/1e3*delta
							if(effect.radius<=1)this.growing=true;
						}
					}
				}
			}
			if(this.shield_up){
				this.shield_time_left -= delta;
				for(let effect of this.effects){
					if(effect.effectType==58){
						effect.radius=384*(this.shield_time_left/this.shield_time)+this.radius;
					}
				}
				if(this.shield_time_left<=0){
					this.shield_up=false;
					this.shield_time_left=this.shield_time;
				}
			}
		// Phase 2
		}else if(this.health>=this.maxHealth*0.3){
			for(let entity of area.entities){
				if(entity instanceof NormalEnemy){
					entity.remove=true;
					this.enemy_spawns=0;
					if(this.hard_mode)
						this.can_spawn_ring_snipers=true;
				}
			}
			for(let effect of this.effects){
				if(effect.effectType==57){
					if(effect.radius>0){
						if(effect.radius < 565){
							effect.radius+=255/1e3*delta;
						}else if(effect.radius > 565){
							effect.radius=565;
						}
					}
				}else if(effect.effectType==58){
					let shield_percentage=this.ring_sniper_count/4;
					if(shield_percentage<=0)this.shield_up=false;
					effect.radius=384*shield_percentage+this.radius;
				}
			}
		// Phase 3
		}else if(this.health<this.maxHealth*0.3){
			for(let entity of area.entities){
				if(
					(entity instanceof SlowingEnemy)
					||(entity instanceof DrainingEnemy)
					||(entity instanceof ToxicEnemy)
				){
					entity.remove=true;
					this.enemy_spawns=0;
				}
			}
			if(this.can_remove_ring_projectiles){
				for(let ring of this.ring_projectiles){
					ring.remove=true;
				}
				this.can_remove_ring_projectiles=false;
			}
			for(let effect of this.effects){
				if(effect.effectType==57){
					if(effect.radius>0){
						if(effect.radius < 850){
							effect.radius+=255/1e3*delta;
						}else if(effect.radius > 850){
							effect.radius=850;
						}
					}
				}
			}
			if(map.players.filter(e=>!e.isDowned()).length)
				this.health-=5.4/1e3*delta;
			this.immune=true;
			this.gainedImmunity=true;
			this.speedMultiplier=0;
			this.x=this.initialX;
			this.y=this.initialY;
		}
		// Dead
		if(this.health<=0){
			for(let entity of area.entities){
				if(
					(entity instanceof ImmuneEnemy)
					||(entity instanceof CorrosiveEnemy)
					||(entity instanceof InfectiousEnemy)
					||(entity instanceof WallEnemy)
					||(entity instanceof FrostGiantEnemy)
				) entity.remove=true;
			}
			for(let entity of map.players){
				entity.boss_kick_timer=300000;
				entity.boss_area_exit="top_middle";
				if(this.hard_mode)
					entity.cybot_hard_mode_defeated=true;
				else	entity.cybot_defeated=true;
				entity.cannot_leave_area=false;
			}
			for(let ring of this.ring_projectiles){
				ring.remove=true;
			}
			this.health=-1;
			this.remove=true;
		}
	}
	generate_entities(delta,area){
		if(!this.release_ready){
			this.release_time -= delta;
			if(this.release_time <=0)
				this.release_ready=true;
		}else{
			// Phase 1
			if(this.health>=this.maxHealth*0.98&&this.immune&&this.enemy_spawns<this.enemy_spawn_limit){
				if(this.hard_mode)area.entities.push(new NormalEnemy(this.x,this.y,15,225,this.target_angle))
				else area.entities.push(new NormalEnemy(this.x,this.y,15,180,this.target_angle))
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.enemy_spawns+=1;
				this.release_time=this.release_interval;
				this.release_ready=false;
				this.target_angle+=28.8;
			}
			// Phase 2
			if(this.health>=this.maxHealth*0.3&&this.health<this.maxHealth*0.98&&this.immune&&this.enemy_spawns<this.enemy_spawn_limit){
				if(this.hard_mode){
					area.entities.push(new SlowingEnemy(this.x,this.y,5,300,this.target_angle,50,defaultValues.spawner.slow))
					this.target_angle+=190;
					area.entities.push(new DrainingEnemy(this.x,this.y,5,300,this.target_angle,50,defaultValues.spawner.drain))
					this.target_angle+=190;
					area.entities.push(new ToxicEnemy(this.x,this.y,5,300,this.target_angle,50))
					this.target_angle+=190;
					this.enemy_spawns+=3;
				}else{
					area.entities.push(new SlowingEnemy(this.x,this.y,4,300,this.target_angle,50,defaultValues.spawner.slow))
					this.target_angle+=190;
					area.entities.push(new DrainingEnemy(this.x,this.y,4,300,this.target_angle,50,defaultValues.spawner.drain))
					this.target_angle+=190;
					this.enemy_spawns+=2;
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.release_time=this.release_interval;
				this.release_ready=false;
				if(this.can_spawn_ring_snipers&&this.ring_sniper_count==0){
					//Globally positioned in the minimap.
					//let ring_sniper_positions=[[27264,158464],[27264,159530],[28320,158464],[28320,159530]];
					//Relative to area.
					//let ring_sniper_positions=[[48,48],[48,1114],[1104,48],[1104,1114]];
					//Relative to cybot's initial spawn.
					let ring_sniper_positions=[[-528,-528],[-528,538],[528,-528],[528,538]];
					for(let pos of ring_sniper_positions){
						let ring_sniper=new RingSniperEnemy(this.x+pos[0],this.y+pos[1],24,0,0,this,defaultValues.spawner.health,defaultValues.spawner.ring_sniper_radius)
						ring_sniper.z=this.z;
						ring_sniper.area=this.area;
						area.entities.push(ring_sniper);
						this.ring_sniper_count+=1;
					}
					this.shield_up=true;
					this.can_spawn_ring_snipers=false;
				}
			}
			// Phase 3
			if(this.health>0&&this.health<this.maxHealth*0.3&&this.immune&&this.enemy_spawns<this.enemy_spawn_limit){
				this.release_interval=200;
				if(this.hard_mode){
					let ring_sniper_projectile=new CybotRingProjectile(this.x,this.y,EvadesConfig.defaults.cybot_ring_projectile.radius,EvadesConfig.defaults.cybot_ring_projectile.speed,this.target_angle);
					ring_sniper_projectile.z=this.z;
					area.entities.push(ring_sniper_projectile);
					this.ring_projectiles.push(ring_sniper_projectile);
					this.target_angle+=130;
					ring_sniper_projectile=new CybotRingProjectile(this.x,this.y,EvadesConfig.defaults.cybot_ring_projectile.radius,EvadesConfig.defaults.cybot_ring_projectile.speed,this.target_angle);
					ring_sniper_projectile.z=this.z;
					area.entities.push(ring_sniper_projectile)
					this.ring_projectiles.push(ring_sniper_projectile);
					this.enemy_spawns+=2;
				}else{
					area.entities.push(new ImmuneEnemy(this.x,this.y,40,180,this.target_angle))
					this.target_angle+=130;
					area.entities.push(new CorrosiveEnemy(this.x,this.y,40,180,this.target_angle))
					this.target_angle+=130;
					area.entities.push(new InfectiousEnemy(this.x,this.y,40,180,this.target_angle))
					this.enemy_spawns+=3;
				}
				area.entities.map(e=>[void 0==e.area&&(e.area=this.area,e.z=this.z)]);
				this.target_angle+=130;
				this.release_time=this.release_interval;
				this.release_ready=false;
			}
		}
	}
	damage(damage){
		this.health-=damage;
		this.losing_health=false;
	}
	update(delta,area){
		this.update_parameters(delta,area);
		this.generate_entities(delta,area);
		super.update(delta,area);
	}
}
window.warnin=false;