function $01bb7fd9b3660a1e$export$e1851a6e64efa609(e, a, t) {
	$01bb7fd9b3660a1e$export$304370d6b87d514e(e, a, EvadesConfig.defaults[t])
}
function $01bb7fd9b3660a1e$export$304370d6b87d514e(e, a, t) {
	for (let r = 0; r < a.length; r++) {
		const c = a[r];
		if (void 0 === e[c]) {
			const a = t[$01bb7fd9b3660a1e$export$6ca246516fec3cbe(c)];
			void 0 !== a && (e[c] = a)
		}
	}
}

function $01bb7fd9b3660a1e$export$a1dfcc7b3a7a0b52(e) {
return EvadesConfig.abilities[e];
}
function $01bb7fd9b3660a1e$export$6ca246516fec3cbe(e) {
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
function spawnEntities(area=current_Area){
	var areaC=map.areas[area];
	if(!areaC)return;
	var isVictory=!!areaC.zones.filter(e=>e.type=="victory").length;
	var totalPellets=areaC.properties.pellet_count ?? defaultValues.properties.pellet_count;
	if(totalPellets==defaultValues.properties.pellet_count){
		totalPellets=map.properties.pellet_count ?? defaultValues.properties.pellet_count;
	}
	var pelletZones=[];
	var boundary=getAreaBoundary(areaC);
	if(areaC.properties.spawns_pellets!=void 0 && !areaC.properties.spawns_pellets){
		for(var zone of areaC.zones){
			if(zone.properties.spawns_pellets){
				pelletZones.push(zone);
			}
		}
	}else{
		for(var zone of areaC.zones){
			if(["active","victory"].indexOf(zone.type)!=-1||(zone.properties.spawns_pellets!=void 0 && zone.properties.spawns_pellets)){
				pelletZones.push(zone);
			}
		}
	}
	if(!pelletZones.length)pelletZones=[areaC.zones[0]];
	areaC.entities=[];
	
	var areaofzone=pelletZones.map(e=>e.width*e.height);
	for(var it in areaofzone){
		if(areaofzone[it-1])areaofzone[it]+=areaofzone[it-1];
	}
	var sum=pelletZones.map(e=>e.width*e.height).reduce((e,t)=>(e+t));
	for(var i=0;i<(totalPellets==25?(isVictory?250:25):totalPellets);i++){
		var rand=Math.random()*sum;
		var randZone=pelletZones[areaofzone.map(e=>(rand<e)).indexOf(true)];
		var left=randZone.x;
		var right=randZone.x+randZone.width;
		var bottom=randZone.y+randZone.height;
		var top=randZone.y;
		var pellet=new PelletEntity(Math.random()*(randZone.width-16)+randZone.x+8,Math.random()*(randZone.height-16)+randZone.y+8,8,boundary,pelletZones);
		pellet.collision();
		map.areas[area].entities.push(pellet);
	}
	var quicksandDir=Math.floor(Math.random()*4)*90;
	areaC.assets.filter(e=>e.type=="flashlight_spawner").map(e=>{
		areaC.entities.push(new FlashlightItem(e.x,e.y))
	})
	areaC.assets.filter(e=>e.type=="torch").map(e=>{
		areaC.entities.push(new Torch(e.x,e.y,e.upside_down))
	})
	areaC.assets.filter(e=>e.type=="light_region").map(e=>{
		areaC.entities.push(new LightRegion(e.x,e.y,e.width,e.height))
	})
	areaC.assets.filter(e=>e.type=="wall").map(e=>{
		areaC.entities.push(new Wall(e.x,e.y,e.width,e.height,e.texture))
	})
	//Don't spawn gate entities since it is removed from the game.
	//areaC.assets.filter(e=>e.type=="gate").map(e=>{
	//  areaC.entities.push(new Gate(e.x,e.y,e.width,e.height))
	//})
	function prop(spawner,e){
		return spawner[e]??defaultValues.spawner[e]
	}
	function checkAreaProperties(e){
		var t=defaultValues.properties[e];
		var s=map.areas[area].properties[e] ?? t;
		if(s==t)s=map.properties[e] ?? t;
		return s;
	}
	var activeZones=map.areas[area].zones.filter(e=>e.type=="active");
	for(var activeZone of activeZones){
		for (var i in activeZone.spawner) {
			var spawner=activeZone.spawner[i];
			for (var j=0;j<prop(spawner,"count");j++) {
				if(prop(spawner,"count")>1024){console.warn("Too many spawner entities to be displayed");continue};
				var left=activeZone.x;
				var right=activeZone.x+activeZone.width;
				var bottom=activeZone.y+activeZone.height;
				var top=activeZone.y;
				var randType=Math.floor(Math.random()*prop(spawner,"types").length);
				var type=prop(spawner,"types")[randType].i;
				var radius=prop(spawner,"radius");
				let entity;
				var enemyX=prop(spawner,"x");
				var enemyY=prop(spawner,"y");
				var boundary={left,right,bottom,top,width:activeZone.width,height:activeZone.height};
				var angle=prop(spawner,"angle");
				var speed=prop(spawner,"speed");
				if(enemyX!=undefined){
					if(String(enemyX).split(",").length>1){
						var min=parseInt(enemyX.split(",")[0]);
						var max=parseInt(enemyX.split(",")[1]);
						enemyX=min+Math.random()*(max-min);
					}
				}else{
					enemyX=Math.random()*(activeZone.width-radius*2*2.5**-(randType=="sizing"))+left+radius*2.5**-(randType=="sizing");
				}
				if(enemyY!=undefined){
					if(String(enemyY).split(",").length>1){
						var min=parseInt(enemyY.split(",")[0]);
						var max=parseInt(enemyY.split(",")[1]);
						enemyY=min+Math.random()*(max-min);
					}
				}else{
				enemyY=Math.random()*(activeZone.height-radius*2*2.5**-(randType=="sizing"))+top+radius*2.5**-(randType=="sizing");
				}
				var instance;
				try{
					instance=eval(`${capitalize(type)}Enemy`)}catch(e){
				};
				switch(type){
					default:{
						map.unknownEntities??=[];
						map.unknownEntities.indexOf(type)==-1&&(map.unknownEntities.push(type),console.warn("Unknown enemy in "+map.name+": "+type),customAlert("Unknown enemy in "+map.name+": "+type,5,"#FF0"))
						try{
							entity=new Enemy(enemyX,enemyY,radius,speed,angle,type.replace("fake_","") + "_enemy",boundary);
						}catch(e){
							entity=new NormalEnemy(enemyX,enemyY,radius,speed,angle,boundary);
						}
					};break;
/*					84 / 106 implemented
*/					case "experience_drain":
					case "blocking":
					case "slippery":
					case "barrier":
					case "radar":
					case "magnetic_reduction":
					case "magnetic_nullification":
					case "freezing":
					case "lava":
					case "toxic":
					case "enlarging":
					case "disabling":
					case "reducing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),boundary);break;
					case "draining":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`draining_radius`),prop(spawner,"drain"),boundary);break;
					case "slowing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`slowing_radius`),prop(spawner,"slow"),boundary);break;
					case "gravity":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`gravity_radius`),prop(spawner,"gravity"),boundary);break;
					case "repelling":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`repelling_radius`),prop(spawner,"repulsion"),boundary);break;
					case "quicksand":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`quicksand_radius`),prop(spawner,`push_direction`)??quicksandDir,prop(spawner,`quicksand_strength`),boundary);break;
					case "turning":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"circle_size"),boundary);break;
					case "liquid":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"player_detection_radius"),boundary);break;
					case "switch":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"switch_interval"),prop(spawner,"switch_time"),prop(spawner,"switched_harmless"),boundary);break;
					case "icicle":entity=new instance(enemyX,enemyY,radius,speed,prop(spawner,"horizontal"),boundary);break;
					case "flower":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"growth_multiplier"),boundary);break;
					case "homing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"reverse"),prop(spawner,"home_range"),prop(spawner,"increment"),boundary);break;
					case "radiating_bullets":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"release_interval"),prop(spawner,"release_time"),boundary);break;
					case "wall":entity=new instance(radius,speed,boundary,j,prop(spawner,"count"),prop(spawner,"move_clockwise"),prop(spawner,"spawn_top"));break;
					case "speed_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"speed_loss"),boundary);break;
					case "wind_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"ignore_invulnerability"),checkAreaProperties("wind_ghosts_do_not_push_while_downed"),boundary);break;
					case "grass":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"powered"),boundary);break;
					case "fake_pumpkin":entity=new PumpkinEnemy(enemyX,enemyY,radius,speed,angle,boundary,true);break;
					case "sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"recharge"),boundary);break;
					case "regen_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"regen_loss"),boundary);break;
					case "frost_giant":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"immune"),prop(spawner,"projectile_duration"),prop(spawner,"projectile_radius"),prop(spawner,"projectile_speed"),prop(spawner,"pause_interval"),prop(spawner,"pause_duration"),prop(spawner,"turn_speed"),prop(spawner,"turn_acceleration"),prop(spawner,"shot_interval"),prop(spawner,"shot_acceleration"),prop(spawner,"direction"),prop(spawner,"pattern"),prop(spawner,"cone_angle"),boundary);break;
					case "seedling":
					case "lunging":
					case "stalactite":
					case "residue":
					case "sand":
					case "tree":
					case "cactus":
					case "sandrock":
					case "fire_trail":
					case "normal":
					case "wavy":
					case "immune":
					case "ring_sniper":
					case "speed_ghost":
					case "gravity_ghost":
					case "repelling_ghost":
					case "regen_ghost":
					case "disabling_ghost":
					case "ice_sniper":
					case "ice_ghost":
					case "wind_sniper":
					case "prediction_sniper":
					case "lead_sniper":
					case "force_sniper_a":
					case "force_sniper_b":
					case "poison_sniper":
					case "poison_ghost":
					case "charging":
					case "positive_magnetic_sniper":
					case "negative_magnetic_sniper":
					case "positive_magnetic_ghost":
					case "negative_magnetic_ghost":
					case "corrosive":
					case "corrosive_sniper":
					case "dasher":
					case "teleporting":
					case "static":
					case "star":
					case "oscillating":
					case "zigzag":
					case "zoning":
					case "sizing":
					case "spiral":
					case "cycling":
					case "snowman":
					case "crumbling":
					case "pumpkin":
					case "glowy":
					case "firefly":
					case "phantom":
					case "mist":
/*NOT IMPLEMENTED*/			//case "aibot": 400hp
					//case "eabot": 400hp
					//case "fibot": 400hp
					//case "wabot": 400hp
					//case "dabot": 500hp
					//case "elbot": 500hp
					//case "icbot": 500hp
					//case "libot": 500hp
					//case "mebot": 500hp
					//case "plbot": 500hp
					//case "cybot": 900hp
					//case "thunderbolt":
					//case "electric":
					//case "sparking":
					entity=new instance(enemyX,enemyY,radius,speed,angle,boundary);break;
				};entity.collision();map.areas[area].entities.push(entity);
			}
		}
	}
	if(isNaN(map.areas[area].entities.filter(e=>(isNaN(e.x)||isNaN(e.y))).length)){return spawnEntities();}
}
var verifiedEntities=[
  "wall","normal","homing","dasher"
];
class SimulatedPlayer extends $cee3aa9d42503f73$export$2e2bcd8739ae039{
  constructor(x,y,hero,username=nickname.value||"Local Player") {
	super();
    this.x=x;
	this.accessories={"collection":{"gold-crown":false,"silver-crown":false,"bronze-crown":false,"santa-hat":false,"gold-wreath":false,"spring-wreath":false,"autumn-wreath":false,"winter-wreath":false,"summer-wreath":false,"summer-olympics-wreath":false,"summer-olympics-wreath-2":false,"winter-olympics-wreath":false,"halo":false,"blue-santa-hat":false,"flames":false,"blue-flames":false,"stars":false,"witch-hat":false,"sunglasses":false,"flower-headband":false,"pirate-hat":false,"rose-wreath":false,"gold-jewels":false,"silver-jewels":false,"bronze-jewels":false,"sticky-coat":false,"toxic-coat":false,"orbit-ring":false,"clouds":false,"storm-clouds":false,"tuxedo":false,"doughnut":false,"stardust":false,"broomstick":false,"snowglobe":false},"hat_selection":null,"body_selection":null,"gem_selection":null,"version_number":0};
	this.showOnMap=true;
	this.dashTrails=[];
	this.fullMapOpacity=true;
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
this.winCount=0;
this.rescuedCount=0;
this.survivalTime=0;
//init accessory getter by player settings
Object.defineProperties(this,{"hatName":{get:function(){
	return [null, "gold-crown", "silver-crown", "bronze-crown", "santa-hat", "gold-wreath", "spring-wreath", "autumn-wreath", "winter-wreath", "summer-wreath", "summer-olympics-wreath", "summer-olympics-wreath-2", "winter-olympics-wreath", "halo", "blue-santa-hat", "flames", "blue-flames", "stars", "witch-hat", "sunglasses", "flower-headband", "pirate-hat", "rose-wreath", "gold-jewels", "silver-jewels", "bronze-jewels"][settings.hat];
}},"bodyName":{get:function(){
	return [null, "sticky-coat", "toxic-coat", "orbit-ring", "clouds", "storm-clouds", "tuxedo", "doughnut", "stardust", "broomstick", "snowglobe"][settings.body];
}},"gemName":{get:function(){
	return [null, 50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3500, 5000, 7500, 10000][settings.gem];
}}})
this.isIced=false;
this.icedTime=1000;
this.icedTimeLeft=1000;
this.isSnowballed=false;
this.snowballedTime=2500;
this.snowballedTimeLeft=2500;
this.isDeparted=false;
this.magnetDirection="DOWN";
this.abilityOne={abilityType:2};
this.abilityTwo={abilityType:3};
this.abilityThree={abilityType:97};
this.abilityIndex=0;
this.cachedAbilities=[];
this.availableAbilities=[0,1,2,14,18,31,96,98];
this.harden = false;
this.flow = false;
this.isBandaged=false;
this.isUnbandaging=false;
this.fusionActivated=false;
this.mortarTime=0;
this.sugarRushActivated=false;
this.sweetToothConsumed=false;
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
    this.effectImmune = 1;
    this.effectReplayer = 1;
    this.aura = false;
    this.auraType = -1;
	this.nightSpeed=0;
    this.collides = false;
	this.lightRadius = 50,
	this.energyRate=1;
	this.drawnConfetti = !1,
	this.confetti = [],
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
	var boundary=getAreaBoundary(map.areas[this.area]);
    if(this.x<boundary.left+this.radius){
      this.x=boundary.left+this.radius;
      collided=true;
    }
    if(this.x>boundary.right-this.radius){
      this.x=boundary.right-this.radius;
      collided=true;
    }
    if(this.y<boundary.top+this.radius){
      this.y=boundary.top+this.radius;
      collided=true;
    }
    if(this.y>boundary.bottom-this.radius){
      this.y=boundary.bottom-this.radius;
      collided=true;
    }
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
			if(ability.abilityType==3){
				this.effects.filter(e=>e.effectType==2).map(e=>{
					e.radius=prop("radius");
				});
			}
			if(ability.abilityType==98){
				this.effects.filter(e=>e.effectType==66).map(e=>{
					!this.isDowned()&&(e.inputAngle=this.lastAngle/180*Math.PI);
				});
			}
		}
	}
  assetCollision(){
    let collided=false;
    const walls=map.areas[this.area].assets.filter(e=>e.type=="wall");
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
	handleAbility(ability,kind=1,delta,others,force=false){
	var abilityLevels=abilityConfig[ability.abilityType]?.levels;
	if(ability.locked||(this.deathTimer!=-1&&ability.abilityType!=18)||ability.disabled||ability.level==void 0||(!ability.continuous&&this.energy<ability.energyCost)){
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
	ability.totalCooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
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
				evadesRenderer.heroInfoCard.abilityTwo=this.cachedAbilities[this.abilityIndex+1] ?? new $097def8f8d652b17$export$2e2bcd8739ae039;
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
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 1:{/*Harden*/
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				this.speedMultiplier*=0;
				this.invulnerable=true;
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				abilityActive=false;
				switch(kind){
					case 1:this.firstAbilityActivated=false;break;
					case 2:this.secondAbilityActivated=false;break;
					case 3:this.thirdAbilityActivated=false;break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.invulnerable=false;
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
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
							entity.damage(15);
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
					return distance({x:e.x+e.width/2,y:e.y+e.height/2},this)-distance({x:t.x+t.width/2,y:t.y+t.height/2},this)
				})[0]??area.zones[0];
				var left=activeZone.x;
				var right=activeZone.x+activeZone.width;
				var bottom=activeZone.y+activeZone.height;
				var top=activeZone.y;
				var x=this.x+(this.radius+13)*Math.cos(this.input_angle);
				var y=this.y+(this.radius+13)*Math.sin(this.input_angle);
				var boundary={left,right,bottom,top,width:activeZone.width,height:activeZone.height};
				area.entities.push(new SnowballProjectile(x,y,13,780,this.input_angle/Math.PI*180,this.area,boundary));
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
					this.effects.push({effectType:66,inputAngle:this.input_angle,hasLight:true,cone:{"innerAngle":35,"distance":500}});
				}
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.effects.filter(e=>e.effectType==66).map(e=>{
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
    if (input.keys) {
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
	  var activ=[0,0,0];
	  var ab1=evadesRenderer.heroInfoCard.abilityOne;
	  var ab2=evadesRenderer.heroInfoCard.abilityTwo;
	  var ab3=evadesRenderer.heroInfoCard.abilityThree;
	if(this.firstAbility&&ab1.cooldown==0){
		this.firstAbilityActivated = !this.firstAbilityActivated;
		activ[0]=this.firstAbilityActivated;
	}
	if(this.secondAbility&&ab2.cooldown==0){
		this.secondAbilityActivated = !this.secondAbilityActivated;
		activ[1]=this.secondAbilityActivated;
	}
	if(this.thirdAbility&&ab3.cooldown==0){
		this.thirdAbilityActivated = !this.thirdAbilityActivated;
		activ[2]=this.thirdAbilityActivated;
	}
	
	  var flow=false;
	  var harden=false;
	  var forceOff=[0,0,0];
	  if(this.deathTimer!=-1){
		  this.abilityOne.abilityType!=18&&(this.firstAbilityActivated=false);
		  this.abilityTwo.abilityType!=18&&(this.secondAbilityActivated=false);
		  this.abilityThree?.abilityType!=18&&(this.thirdAbilityActivated=false);
	  }
	if(this.firstAbilityActivated&&ab1.abilityType==0||this.secondAbilityActivated&&ab2.abilityType==0||this.thirdAbilityActivated&&ab3.abilityType==0)flow=true;
	if(this.firstAbilityActivated&&ab1.abilityType==1||this.secondAbilityActivated&&ab2.abilityType==1||this.thirdAbilityActivated&&ab3.abilityType==1)harden=true;
	if(flow&&this.firstAbility&&ab1.abilityType==0){
		harden=false;
		if(ab2.abilityType==1&&this.secondAbilityActivated){
			this.secondAbilityActivated=false;
			forceOff[1]=1;
		}
		if(ab3.abilityType==1&&this.thirdAbilityActivated){
			this.thirdAbilityActivated=false;
			forceOff[2]=1;
		}
	}
	if(flow&&this.secondAbility&&ab2.abilityType==0){
		harden=false;
		if(ab1.abilityType==1&&this.firstAbilityActivated){
			this.firstAbilityActivated=false;
			forceOff[0]=1;
		}
		if(ab3.abilityType==1&&this.thirdAbilityActivated){
			this.thirdAbilityActivated=false;
			forceOff[2]=1;
		}
	}
	if(flow&&this.thirdAbility&&ab3.abilityType==0){
		harden=false;
		if(ab1.abilityType==1&&this.firstAbilityActivated){
			this.firstAbilityActivated=false;
			forceOff[1]=1;
		}
		if(ab2.abilityType==1&&this.secondAbilityActivated){
			this.secondAbilityActivated=false;
			forceOff[2]=1;
		}
	}
	if(harden&&this.firstAbility&&ab1.abilityType==1){
		flow=false;
		if(ab2.abilityType==0&&this.secondAbilityActivated){
			this.secondAbilityActivated=false;
			forceOff[1]=1;
		}
		if(ab3.abilityType==0&&this.thirdAbilityActivated){
			this.thirdAbilityActivated=false;
			forceOff[2]=1;
		}
	}
	if(harden&&this.secondAbility&&ab2.abilityType==1){
		flow=false;
		if(ab1.abilityType==0&&this.firstAbilityActivated){
			this.firstAbilityActivated=false;
			forceOff[0]=1;
		}
		if(ab3.abilityType==0&&this.thirdAbilityActivated){
			this.thirdAbilityActivated=false;
			forceOff[2]=1;
		}
	}
	if(harden&&this.thirdAbility&&ab3.abilityType==1){
		flow=false;
		if(ab1.abilityType==0&&this.firstAbilityActivated){
			this.firstAbilityActivated=false;
			forceOff[1]=1;
		}
		if(ab2.abilityType==0&&this.secondAbilityActivated){
			this.secondAbilityActivated=false;
			forceOff[2]=1;
		}
	}
	this.handleAbility(ab1,1,delta,{ab2,ab3},forceOff[0]||this.firstAbility);
	this.handleAbility(ab2,2,delta,{ab1,ab3},forceOff[1]||this.secondAbility);
	this.handleAbility(ab3,3,delta,{ab1,ab2},forceOff[2]||this.thirdAbility);
	this.forcefirst=false;
	this.forcesecond=false;
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
          if (evadesRenderer.heroInfoCard.abilityOne.level < evadesRenderer.heroInfoCard.abilityOne.maxLevel && this.upgradePoints > 0) {
			evadesRenderer.heroInfoCard.abilityOne.level++;
			evadesRenderer.heroInfoCard.abilityOne.locked=evadesRenderer.heroInfoCard.abilityOne.level==0;
            this.upgradePoints--;
          }
        }
        if (input.keys.has(controls.UPGRADE_ABILITY_TWO[0])||input.keys.has(controls.UPGRADE_ABILITY_TWO[1])) {
          if (evadesRenderer.heroInfoCard.abilityTwo.level < evadesRenderer.heroInfoCard.abilityTwo.maxLevel && this.upgradePoints > 0) {
			evadesRenderer.heroInfoCard.abilityTwo.level++;
			evadesRenderer.heroInfoCard.abilityTwo.locked=evadesRenderer.heroInfoCard.abilityTwo.level==0;
            this.upgradePoints--;
          }
        }
        if (input.keys.has(controls.UPGRADE_ABILITY_THREE[0])||input.keys.has(controls.UPGRADE_ABILITY_THREE[1])) {
          if (evadesRenderer.heroInfoCard.abilityThree && evadesRenderer.heroInfoCard.abilityThree.level < evadesRenderer.heroInfoCard.abilityThree.maxLevel && this.upgradePoints > 0) {
			evadesRenderer.heroInfoCard.abilityThree.level++;
			evadesRenderer.heroInfoCard.abilityThree.locked=evadesRenderer.heroInfoCard.abilityThree.level==0;
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
        if (this.slowing && this.slowing[0]) {
          this.speedMultiplier *= (1-this.effectImmune*this.slowing[1])*this.effectReplayer;
        }
        if (this.freezing) {
          this.speedMultiplier *= (1-this.effectImmune*(1-0.2))*this.effectReplayer;
        }
        this.distance_movement = (this.speed*this.speedMultiplier)+this.speedAdditioner;
        this.mouseActive = false;
          if (input.isMouse&&!this.cent_is_moving&&!this.isMovementKeyPressed(input)) {
            this.mouse_distance_full_strength = 150*camScale;
            this.mouseActive = true;
            if(this.slippery){this.mouse_distance_full_strength = 1;}

            if(!cent || (cent && this.cent_input_ready)){

              if(cent){
                this.cent_input_ready = false;
                this.cent_is_moving = true;
                this.cent_accelerating = true; 
                this.mouse_distance_full_strength = 1;
              }

              this.dirX = (input.mouse.x - canvas.width / 2);
              this.dirY = (input.mouse.y - canvas.height / 2);
              this.dist = distance({x:0,y:0}, {x:this.dirX,y:this.dirY});
			  if(this.dist > 200*camScale){
                this.dirX *= 200*camScale / this.dist;
                this.dirY *= 200*camScale / this.dist;
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

            if(!cent){this.velX = this.dirX * this.speed / this.mouse_distance_full_strength;
            this.addX = this.dirX * this.speedAdditioner/this.mouse_distance_full_strength;
            this.addY = this.dirY * this.speedAdditioner/this.mouse_distance_full_strength;
            if(!this.magnet||this.magnet&&this.safeZone){if(this.vertSpeed==-1){this.velY = this.dirY * this.speed / this.mouse_distance_full_strength;}else{this.velY = this.dirY * this.vertSpeed / this.mouse_distance_full_strength;}} 
            }
        } else if (!this.cent_is_moving){
            this.dirY = 0; this.dirX = 0;
            this.moving = false;
            if(this.isMovementKeyPressed(input)){
              if(cent && this.cent_input_ready) this.cent_is_moving = true;
              this.moving=true;
              input.isMouse = false;
              this.cent_input_ready = false;
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
		if(!cent){
			this.cent_is_moving=false;
			this.cent_accelerating=false;
			this.cent_input_ready=true;
			this.cent_distance=0;
		}
        (this.dirY||this.dirX)&&(this.input_angle = Math.atan2(this.dirY,this.dirX));
        if(cent && this.cent_input_ready){
          this.cent_saved_angle = this.input_angle;
          this.cent_input_ready = false;
          this.cent_is_moving = true;
        }
        if(this.cent_distance){
          this.d_x = this.dirX * this.cent_distance;
          this.d_y = this.dirY * this.cent_distance;
        }
        else if(this.moving&&!input.isMouse&&!cent) {
          this.d_x = this.distance_movement * this.dirX;
          this.d_y = this.distance_movement * this.dirY;
        }
        //this.speed-=this.speedAdditioner;
        this.speed=this.statSpeed;
      }
    }
  }
	distance(a,b){
                  return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
                }
	update(delta){
    this.update_knockback(delta);
let timeFix=delta/(1e3/30);
	  var cent=this.isCent;
	  if(this.isLead)cent=!cent;
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
this.chronoPos=this.chronoPos.slice(-Math.round(60/timeFix))
    this.inBarrier = false;
	  var ab1=evadesRenderer.heroInfoCard.abilityOne;
	  var ab2=evadesRenderer.heroInfoCard.abilityTwo;
	  var ab3=evadesRenderer.heroInfoCard.abilityThree;
			if(ab1.cooldown!==void 0&&!(abilityConfig[ab1.abilityType]?.pellet_powered)){
				ab1.cooldown-=delta/1e3;
				ab1.cooldown=Math.max(ab1.cooldown,0);
			}
			if(ab2.cooldown!==void 0&&!(abilityConfig[ab2.abilityType]?.pellet_powered)){
				ab2.cooldown-=delta/1e3;
				ab2.cooldown=Math.max(ab2.cooldown,0);
			}
			if(ab3.cooldown!==void 0&&!(abilityConfig[ab3.abilityType]?.pellet_powered)){
				ab3.cooldown-=delta/1e3;
				ab3.cooldown=Math.max(ab3.cooldown,0);
			}
			if(this.noCooldown){
				ab1.cooldown=0;
				ab2.cooldown=0;
				ab3.cooldown=0;
			}
			this.updateEffects([ab1,ab2,ab3]);
		let area=map.areas[this.area];
      this.safeZone = true;
      this.minimum_speed = 1;
      this.pointInActiveZone=false;
      for(var i in area.zones){
        var zone = area.zones[i];
        var rect1 = {x:this.x,y:this.y,width:this.radius, height:this.radius};
        var rect2 = {x:zone.x,y:zone.y,width:zone.width, height:zone.height}
        if (rect1.x - this.radius < rect2.x + rect2.width &&
            rect1.x + this.radius > rect2.x &&
            rect1.y - this.radius < rect2.y + rect2.height &&
            rect1.y + this.radius > rect2.y) {
            if(zone.type=="active")this.safeZone=false;
        }
        if (rect1.x < rect2.x + rect2.width &&
          rect1.x > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.y > rect2.y) {
          if(zone.type=="active")this.pointInActiveZone=true;
          if(zone.properties.minimum_speed){
            this.minimum_speed=zone.properties.minimum_speed;
          }
        }
      }
	const deadPlayers=map.players.filter(e=>{
      return (e.isDowned() || e.deathTimer!=-1) && e.area == this.area && (distance(e, this) < e.radius + this.radius);
    });
	for(var i in deadPlayers){
		if(deadPlayers[i]!==this&&this.deathTimer==-1&&this.rescueable){
			deadPlayers[i].deathTimer=-1;
			this.rescuedCount++;
			this.interactions.indexOf(deadPlayers[i])==-1&&this.interactions.push(deadPlayers[i]);
			deadPlayers[i].interactions.indexOf(this)==-1&&deadPlayers[i].interactions.push(this);
			this.playerInteractions=this.interactions.length;
		}
	}
	if(this.area!=0){
		for(var otherplayer of map.players){
			if(otherplayer.area == this.area && otherplayer != this){
				this.interactions.indexOf(otherplayer)==-1&&
				this.interactions.push(otherplayer);
				this.playerInteractions=this.interactions.length;
			}
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
        this.speedMultiplier *= (1-this.effectImmune*this.slowing[1])*this.effectReplayer;
      }
      if (this.draining[0]) {
        this.energyRate -= this.draining[1]*this.effectImmune*this.effectReplayer;
      }
      if (this.lava) {
        this.energyRate += 15;
	    if(this.energy>=this.maxEnergy){
          death(this);this.energy=0;
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
	  if(this.enlarging)this.radiusAdditioner+=10;
	  if(this.toxic){
		this.energy=Math.min(this.energy,this.maxEnergy*0.7);
	  }
      if (this.freezing) {
        this.speedMultiplier *= (1-this.effectImmune*(1-0.2))*this.effectReplayer;
      }
      if(this.className == "Brute"){
        if(this.energy == this.maxEnergy){
          this.effectImmune = 0;
        } else {this.effectImmune = 0.2}
      }

      if (this.shadowed_time_left>0){
        this.shadowed_time_left-=delta;
      } else {
        this.knockback_limit_count = 0;
        this.shadowed_invulnerability = false;
      }

      if(this.mortarTime>0){this.speedMultiplier = 0;}
      if(this.minimum_speed>this.statSpeed+this.speedAdditioner){this.statSpeed=this.minimum_speed}
        if(cent){
          this.distance_movement = (this.speed*this.speedMultiplier)+this.speedAdditioner;
          this.cent_max_distance = this.distance_movement * 2;
          if(this.cent_is_moving){
            if(this.cent_accelerating){
              if(this.cent_distance < this.cent_max_distance){
                this.cent_distance += this.cent_acceleration * this.distance_movement * timeFix;
              } else {
                this.cent_distance = this.cent_max_distance;
                this.cent_accelerating = false;
              }
            } else {
              if(this.cent_distance > 0){
                this.cent_distance -= this.cent_deceleration * this.distance_movement * timeFix;
              } else {
                this.cent_distance = 0;
                this.cent_accelerating = true;
                this.cent_is_moving = false;
                this.cent_input_ready = true;
              }
            }
            if(this.cent_distance<0){this.cent_distance = 0;}
          }
          this.distance_movement = this.cent_distance;
        }
    if (Math.abs(this.velX)<1/32) {
      this.velX = 0;
    }
    if (Math.abs(this.velY)<1/32) {
      this.velY = 0;
    }
	this.survivalTime+=delta/1e3;
    this.radius = this.defaultRadius;
	var velY=this.velY;
    if((
	map.properties?.magnetism||
	map.properties?.partial_magnetism||
	map.areas[this.area].properties?.magnetism||
	map.areas[this.area].properties?.partial_magnetism
	)&&this.pointInActiveZone){
		var isPartial=Boolean(map.properties?.partial_magnetism)||Boolean(map.areas[this.area].properties?.partial_magnetism);
      var magneticSpeed = (this.vertSpeed == -1) ? ((isPartial?(this.speed/2):300)/(this.magneticReduction+1)*(!this.magneticNullification)) : this.vertSpeed;
      if(this.magnetDirection.toLowerCase() == "down"){this.y += (!(this.isIced||this.isSnowballed)&&!this.isDowned())*(magneticSpeed+this.d_y*isPartial*(!this.magneticNullification&&!this.isDowned()))*delta/1e3}
      else if(this.magnetDirection.toLowerCase() == "up"){this.y += (!(this.isIced||this.isSnowballed)&&!this.isDowned())*(-magneticSpeed+this.d_y*isPartial*(!this.magneticNullification&&!this.isDowned()))*delta/1e3}
    }
    if(this.radiusAdditioner!=0){this.radius+=this.radiusAdditioner}
    this.radius *= this.radiusMultiplier;
    this.radiusMultiplier = 1;
    this.radiusAdditioner = 0;
    this.wasIced = this.isIced;
    this.wasSnowballed = this.isSnowballed;
    if (this.isIced) {
      this.icedTimeLeft -= delta;
    }
    if (this.icedTimeLeft <= 0) {
      this.isIced = false;
      this.icedTimeLeft = 1000;
    }
    if (this.isSnowballed) {
      this.snowballedTimeLeft -= delta;
    }
    if (this.snowballedTimeLeft <= 0) {
      this.isSnowballed = false;
      this.snowballedTimeLeft = 2500;
    }
	if(this.isLead){
	  this.leadTime-=delta;
	}
	if(this.leadTime<0){
	  this.isLead=false;
	  this.leadTime=0;
	}

    if(this.speedghost){
      this.speed-=(0.1*this.effectImmune)/this.effectReplayer*delta/1e3;
      this.statSpeed-=(0.1*this.effectImmune)/this.effectReplayer*delta/1e3;
      if(this.speed < 150){this.speed = 150;}
      if(this.statSpeed < 150){this.statSpeed = 150;}
    }

    if(this.regenghost){
      this.energyRegen-=(1.2*this.effectImmune)/this.effectReplayer*delta/1e3;
      if(this.energyRegen < 1){this.energyRegen = 1;}
    }

    if (this.inEnemyBarrier){
      this.inBarrier = true;
    }
    if (this.reducingTime>0&&!this.reducing){
      this.reducingTime-=delta;
	  this.radiusMultiplier*=1-this.reducingTime/2e3;
    }
    if (this.reducingTime>0&&this.reducing){
	  this.reducingTime+=delta;
	  if(this.reducingTime>2e3){
		this.reducingTime=2e3;
		death(this);
	  }
	  this.radiusMultiplier*=1-this.reducingTime/2e3;
    }

    if(this.quicksand[0]&&!this.invulnerable){
      this.x += Math.cos(this.quicksand[1]*Math.PI/180)*this.quicksand[2]*delta/1e3;
      this.y += Math.sin(this.quicksand[1]*Math.PI/180)*this.quicksand[2]*delta/1e3;
      this.quicksand[0] = false;
    }

    this.energy += this.energyRate * delta/1e3;
	this.energyRate=this.energyRegen+this.regenAdditioner;
	if(this.energy > this.maxEnergy)this.energy=this.maxEnergy;
	if(this.energy < 0)this.energy=0;
    this.oldPos = (this.previousPos.x == this.x && this.previousPos.y == this.y) ? this.oldPos : {x:this.previousPos.x,y:this.previousPos.y}
    this.previousPos = {x:this.x, y:this.y};
    var dim = 1 - map.properties.friction;
    if (this.slippery) {
      dim = 0;
    }
    //dim = 0;
    var friction_factor = dim;

    this.slide_x = this.distance_moved_previously[0];
    this.slide_y = this.distance_moved_previously[1];

    this.slide_x *= friction_factor;
    this.slide_y *= friction_factor;

    this.d_x += this.slide_x;
    this.d_y += this.slide_y;
    this.abs_d_x = Math.abs(this.d_x)
    this.abs_d_y = Math.abs(this.d_y);
    if(cent){
      if(this.abs_d_x > this.cent_max_distance && !this.slippery){
        this.d_x *= this.cent_max_distance / this.abs_d_x;
      }
      if(this.abs_d_y > this.cent_max_distance && !this.slippery){
        this.d_y *= this.cent_max_distance / this.abs_d_y;
      }
    } else {
      if(this.abs_d_x>this.distance_movement&&!this.slippery){
        this.d_x *= this.distance_movement / this.abs_d_x;
      }
      if(this.abs_d_y>this.distance_movement&&!this.slippery){
        this.d_y *= this.distance_movement / this.abs_d_y;
      }
    }
    this.prevSlippery = this.slippery;
    if (this.abs_d_x<1/32) {
      this.d_x = 0;
    }
    if (this.abs_d_y<1/32) {
      this.d_y = 0;
    }
    this.distance_moved_previously = [this.d_x,this.d_y]
      this.velX=this.d_x;
      this.velY=this.d_y;
	evadesRenderer.heroInfoCard.abilityOne.disabled=this.disabling||this.isSnowballed;
	evadesRenderer.heroInfoCard.abilityTwo.disabled=this.disabling||this.isSnowballed;
	evadesRenderer.heroInfoCard.abilityThree.disabled=this.disabling||this.isSnowballed;
	if(!this.blocking){
		this.slowing = [false];
		this.freezing = false;
		this.web = false;
		this.cobweb = false;
		this.sticky = false;
		this.toxic=false;
		this.experienceDraining=false;
		this.reducing = false;
		this.enlarging = false;
		this.draining = [false];
		this.lava = false;
		this.speedghost = false;
		this.regenghost = false;
		this.inEnemyBarrier=false;
		this.slippery = false;
		this.disabling=false;
	}
	this.blocking=false;
    this.tempColor=this.color;
    var vel;
		var isMagnet=Boolean(map.properties?.magnetism)||Boolean(map.properties?.partial_magnetism)||Boolean(map.areas[this.area].properties?.magnetism)||Boolean(map.areas[this.area].properties?.partial_magnetism);
		var isPartial=Boolean(map.properties?.partial_magnetism)||Boolean(map.areas[this.area].properties?.partial_magnetism);
      var magneticSpeed = (this.vertSpeed == -1) ? ((isPartial?(this.speed/2):300)/(this.magneticReduction+1)*(!this.magneticNullification)) : this.vertSpeed;
    var yaxis = (this.velY>=0)?1:-1;
    if(!isMagnet){magneticSpeed*=yaxis;}
    if(this.magnetDirection.toLowerCase() == "up"){magneticSpeed=-magneticSpeed}
    if((isMagnet||this.vertSpeed != -1)&&this.pointInActiveZone){vel = {x:this.velX, y:this.velY*this.magneticNullification};}
    else{vel = {x:this.velX, y:this.velY};}
    this.vertSpeed = -1;
	this.magneticReduction=false;
	this.magneticNullification=false;
    if (!(this.wasFrozen||this.wasSnowballed)&&!this.isDowned()) {
      this.x += vel.x * delta / 1e3;
      this.y += vel.y * delta / 1e3;
    }
    this.speedMultiplier = 1;
    this.speedAdditioner = 0;
    this.regenAdditioner = 0;
    if(this.deathTimer!=-1){
      this.deathTimer-=delta;
      this.deathTimer=Math.max(0,this.deathTimer);
    }
      for(var i in area.zones){
        var zone = area.zones[i];
        if(zone.type=="teleport"||zone.type=="exit"){
          var absolutePos={x:this.x+map.areas[this.area].x,y:this.y+map.areas[this.area].y}
          var zonePos={x:zone.x,y:zone.y}
          var zoneSize={x:zone.width,y:zone.height};
          var teleporter=closestPointToRectangle({x:this.x,y:this.y},zonePos,zoneSize)
          var dist = this.distance({x:this.x,y:this.y},teleporter)
          if(dist < this.radius){
            onTele=true;
          }
          if(dist < this.radius && !this.onTele){
          var max = Math.pow(10, 1000);
          var maxArea = 0;
          var targetPoint = {x:this.x + zone.translate.x, y:this.y + zone.translate.y};
          for (var j in map.areas) {
            if(j==this.area)continue;
            var rect = getAreaBoundary(map.areas[j]);
            var closest = closestPointToRectangle(targetPoint,
{x:map.areas[j].x-map.areas[this.area].x, y:map.areas[j].y-map.areas[this.area].y},
{x:rect.width, y:rect.height})
            var dist = this.distance(targetPoint, closest)
            if (dist < max) {
              max = dist;
              maxArea = parseInt(j);
            }
          }
          this.x=targetPoint.x+(map.areas[this.area].x-map.areas[maxArea].x);
          this.y=targetPoint.y+(map.areas[this.area].y-map.areas[maxArea].y);
          map.areas[this.area].entities=[];
          this.area = maxArea;
          spawnEntities(this.area);
		  this.hasTranslated=true;
		  this.chronoPos=[];
		  break;
          }
        }
        if(zone.type=="removal"){
          var absolutePos={x:this.x+map.areas[this.area].x,y:this.y+map.areas[this.area].y}
          var zonePos={x:zone.x,y:zone.y}
          var zoneSize={x:zone.width,y:zone.height};
          var teleporter=closestPointToRectangle({x:this.x,y:this.y},zonePos,zoneSize)
          var dist = this.distance({x:this.x,y:this.y},teleporter)
          if(dist < this.radius){
            map.players.splice(map.players.indexOf(this));
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
			  if(this.hasTranslated&&zone.type=="teleport"&&rectCircleCollision(this.x, this.y, this.radius, zone?.x, zone?.y, zone?.width, zone?.height).c){
				var left=safeZone.x;
				var right=safeZone.x+safeZone.width;
				var top=safeZone.y;
				var bottom=safeZone.y+safeZone.height;
				this.x=Math.min(Math.max(this.x,left+this.radius*2),right-this.radius*2);
				this.y=Math.min(Math.max(this.y,top+this.radius*2),bottom-this.radius*2);
				this.hasTranslated=false;
				break;
			  }
		  }
		this.hasTranslated=false;
this.areaNumber=this.area+1;
this.regionName=map.name;
this.collides=this.collision(delta);
    if(this.deathTimer==0){
      map.players.splice(map.players.indexOf(this),1);
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
		this.sweetToothConsumed && (u = "rgb(255, 43, 143)",
		d = "rgb(212, 0, 100)"),
		this.energized && this.sweetToothConsumed && (u = "rgb(255, 43, 143)",
		d = "rgb(212, 0, 100)"),
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
	renderAccessory(e, t, a,dt) {
		if (void 0 === this.hatName && void 0 === this.bodyName || this.isDeparted)
			return;
		this.bodyName && this.bodyName !== this.storedBodyName && (this.bodyImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("cosmetics/" + this.bodyName),
		this.storedBodyName = this.bodyName),
		this.hatName && this.hatName !== this.storedHatName && (this.hatImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("cosmetics/" + this.hatName),
		this.storedHatName = this.hatName);
		this.gemName && this.gemName !== this.storedGemName && (this.gemImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("accessories/" + this.gemName.toString() + "-gem"),
		this.storedGemName = this.gemName);
		const r = ()=>e.drawImage(this.bodyImage.getImage(dt), t - 5 * this.radius / 3, a - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3)
		  , c = ()=>e.drawImage(this.hatImage.getImage(dt), t - 5 * this.radius / 3, a - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3)
		  , o = ()=>{
			if (!this.hatName || !this.hatName.endsWith("-crown"))
				return;
			const r = [1e4, 7500, 5e3, 3500, 2500, 2e3, 1500, 1e3, 750, 500, 250, 100, 50];
			(r=>{
				null !== r && (null === this.gemImage && (this.gemImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("accessories/" + r.toString() + "-gem")),
				e.drawImage(this.gemImage.getImage(dt), t - 5 * this.radius / 3, a - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3))
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
		for (let e = 0; e < this.randomIntRange(50, 150) && !($9bc26d320fe964d6$var$totalConfettiRendered >= $9bc26d320fe964d6$var$MaxConfettiRendered); e++)
			this.addConfetti(),
			$9bc26d320fe964d6$var$totalConfettiRendered++
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
	animateConfetti() {
		for (let e = 0; e < this.confetti.length; e++) {
			const t = this.confetti[e];
			t.x += t.vx,
			t.y += t.vy,
			t.vx += this.randomRange(-.1, .1),
			t.vy += .35,
			t.y >= t.initialY + 100 && (this.confetti.splice(e, 1),
			$9bc26d320fe964d6$var$totalConfettiRendered--)
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
  var e={}
  e.c=dist < cr;
  e.ax=Math.abs(dx);
  e.ay=Math.abs(dy);
  e.x=dx;
  e.y=dy;
  return e;
};
class SimulatorEntity extends $cee3aa9d42503f73$export$2e2bcd8739ae039{
  constructor(x,y,color,radius,type,speed=0,angle,boundary) {
	super();
    this.color = color;
	this.effects=[];
    this.type=type;
	this.lightRectangle=null;
	this.outline=false;
    this.speed=speed;
    this.angle=angle!=undefined?(angle*Math.PI/180):(Math.random()*Math.PI*2);
    this.velX=Math.cos(this.angle)*this.speed;
    this.velY=Math.sin(this.angle)*this.speed;
    this.x=x;
    this.health=0;
    this.maxHealth=0;
    this.shatterTime=0;
    this.reduced=false;
    this.gainedImmunity=false;
    this.isHarmless=false;
    this.corrosive=false;
    this.burning=false;
    this.t=0;
    this.healingTime=0;
    this.inFear=false;
    this.decayed=false;
    this.isBarrier=false;
    this.isRepelling=false;
    this.isDestroyed=false;
    this.lightRadius=null;
    this.y=y;
	this.frozen=false;
    this.radius=radius;
    this.ogradius=this.radius;
    this.radiusMultiplier=1;
    this.speedMultiplier=1;
    this.boundary=boundary;
	this.renderFirst=true;
  }
  freeze(duration){
	  this.frozen=true;
	  this.frozenTime=duration;
  }
  damage(x){
	  if(this.maxHealth!=0){
		  this.health-=x;
	  }
  }
  anglevel(){
    this.velX=Math.cos(this.angle)*this.speed;
    this.velY=Math.sin(this.angle)*this.speed;
  }
  playerInteraction(player,delta){
  }
  auraEffect(player,delta){
  }
  velangle(){
	if(this.velY==0&&this.velX==0)return this.angle;
    this.angle=Math.atan2(this.velY,this.velX);
  }
  update(delta){
	if(this.health <= 0 && this.maxHealth != 0)this.remove=true;
	this.radius=this.ogradius*this.radiusMultiplier;
	this.radiusMultiplier=1;
    this.x+=this.velX*this.speedMultiplier*delta/1e3;
    this.y+=this.velY*this.speedMultiplier*delta/1e3;
    this.speedMultiplier=1;
    this.collision(delta);
  }
  collision(delta){
	if(this.HarmlessTime>0){
	  this.HarmlessTime-=delta;
	  this.isHarmless=true;
	}else{
	  this.isHarmless=(!!this.disabled);
	}
	if(this.frozenTime>0){
	  this.frozenTime-=delta;
	  this.speedMultiplier*=0;
	}else{
	  this.frozen=false;
	}
    let collided=false;
    if(this.x<this.boundary.left+this.radius){
	  this.onBeforeCollide();
      this.x=this.boundary.left+this.radius;
      this.velX=Math.abs(this.velX);
	  this.velangle();
      collided=true;
    }
    if(this.x>this.boundary.right-this.radius){
	  this.onBeforeCollide();
      this.x=this.boundary.right-this.radius;
      this.velX=-Math.abs(this.velX);
	  this.velangle();
      collided=true;
    }
    if(this.y<this.boundary.top+this.radius){
	  this.onBeforeCollide();
      this.y=this.boundary.top+this.radius;
      this.velY=Math.abs(this.velY);
	  this.velangle();
      collided=true;
    }
    if(this.y>this.boundary.bottom-this.radius){
	  this.onBeforeCollide();
      this.y=this.boundary.bottom-this.radius;
      this.velY=-Math.abs(this.velY);
	  this.velangle();
      collided=true;
    }
    if(this.assetCollision())collided=true;
    if(collided)this.onCollide();
    for(var i in map.players){
      var player = map.players[i];
      if(Math.sqrt((this.x-player.x)**2+(this.y-player.y)**2)<(this.radius+player.radius)){
		this.playerInteraction(player,delta);
      }
      if(!player.safeZone&&player.deathTimer==-1&&Math.sqrt((this.x-player.x)**2+(this.y-player.y)**2)<(this.auraRadius+player.radius)){
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
    const walls=map.areas[current_Area].assets.filter(e=>e.type=="wall");
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
		const Lu=$f36928166e04fda7$export$2e2bcd8739ae039;
		(this.isHarmless || this.grassHarmless) && (e.globalAlpha = .4);
		let n = this.harmlessTime;
		if (this.grassHarmless && this.grassTime > 0 && (n = Math.max(this.grassTime, n)),
		settings.fadingEffects && n < 1e3 && n > 0 && (e.globalAlpha = .4 + .6 * (1 - n / 1e3)),
		this.duration < 500 && (e.globalAlpha = Math.min(e.globalAlpha, this.duration / 500 + .2)),
		this.fadeInTime <= 1500 && this.soulFading && (e.globalAlpha = 1 - this.fadeInTime / 1500),
		this.isDestroyed && (e.globalAlpha = 0),
		this.brightness > 0 && (e.globalAlpha = Math.min(this.brightness, 1)),
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
		if (this.name && (e.font = Lu.font(12/camScale),
		e.textAlign = "center",
		e.fillStyle = "black",
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
			e.fill()) : e.drawImage(this.image.getImage(delta/(1e3/30)), this.x + t.x - this.radius, this.y + t.y - this.radius, 2 * n, 2 * n),
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
				this.switchedHarmless ? e.fillStyle = `rgba(25, 25, 25, ${t})` : e.fillStyle = `rgba(147, 147, 147, ${t})`,
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
class Enemy extends SimulatorEntity{
  constructor(x,y,radius,speed,angle,type,boundary){
    super(x,y,getEntityColor(type),radius,type,speed,angle,boundary);
    this.isEnemy=true;
    this.renderFirst=false;
    this.outline=true;
  }
  playerInteraction(player,delta){
    EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune,player.inBarrier);
  }
  update(delta){
    super.update(delta);
  }
}
function distance(a,b){
  return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
}
function EnemyPlayerInteraction(player,enemy,corrosive,harmless,immune,inBarrier){
  var dead=true;
  if(harmless===undefined){
    harmless=enemy.isHarmless;
  }
  if(player.nightActivated&&!immune&&!enemy.isHarmless){
    player.nightActivated=false;
    player.nightDuration=0;
    player.speedAdditioner=0;
    enemy.isHarmless=true;
    enemy.HarmlessTime=2000;
    harmless=true;
  }
  if(enemy.texture=="entities/pumpkin_off"||enemy.radius==0||harmless||enemy.shatterTime>0||player.godmode){
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
  if((((inBarrier&&player.inBarrier)||player.invulnerable)&&!corrosive)||harmless||enemy.radius<1){
    dead=false;
  }
  if(player.deathTimer==-1&&dead){
    death(player);
  }
}
function death(player){
    switch(player.area){
      case 0:player.deathTimer=player.deathTimerTotal=10000;break;
      case 1:case 2:player.deathTimer=player.deathTimerTotal=15000;break;
      case 3:case 4:case 5:player.deathTimer=player.deathTimerTotal=20000;break;
      case 6:case 7:player.deathTimer=player.deathTimerTotal=25000;break;
      case 8:case 9:player.deathTimer=player.deathTimerTotal=30000;break;
      default:player.deathTimer=player.deathTimerTotal=60000;break;
    }
    if(map.areas[player.area].properties.death_timer!==void 0){
      player.deathTimer=player.deathTimerTotal=map.areas[player.area].properties.death_timer;
    }else if(map.properties.death_timer!==void 0){
      player.deathTimer=player.deathTimerTotal=map.properties.death_timer;
    }
	player.effects=[];
}
//PELLETS
class $4e83b777e56fdf48$export$2e2bcd8739ae039 {
	update(delta) {
		this.increasing ? (this.value += this.increment*delta/1e3,
		this.value >= this.max && (this.value = this.max,
		this.increasing = !1)) : (this.value -= this.increment*delta/1e3,
		this.value <= this.min && (this.value = this.min,
		this.increasing = !0))
	}
	constructor(e, t, n, r, i) {
		this.value = e,
		this.min = t,
		this.max = n,
		this.increment = r,
		this.increasing = i
	}
}
class PelletEntity extends SimulatorEntity{
  constructor(x,y,radius,boundary,pellet_zones){
    super(x,y,null,radius,"pellet",0,0,boundary);
	const Cm = ["#b84dd4", "#a32dd8", "#3b96fd", "#43c59b", "#f98f6b", "#61c736"]
	, Tm = ["#621c74", "#52146e", "#02499a", "#1f654e", "#ab3107", "#30631b"];
	null !== this.color && void 0 !== this.color || (this.color = Cm[Math.floor((Math.abs(this.x) + Math.abs(this.y)) % Cm.length)],
	Math.random() < 1e-5 && (this.color = "#333333")),
	null !== this.darkColor && void 0 !== this.darkColor || (this.darkColor = Tm[Math.floor((Math.abs(this.x) + Math.abs(this.y)) % Tm.length)],
	Math.random() < 1e-5 && (this.darkColor = "#cccccc")),
    this.scaleOscillator = new $4e83b777e56fdf48$export$2e2bcd8739ae039(1.1,1.1,1.2,.15,!0);
	this.pellet_zones=pellet_zones;
  }
  playerInteraction(player){
  var victoryZones=this.pellet_zones;
    var areaofzone=victoryZones.map(e=>e.width*e.height);
    for(var it in areaofzone){
      if(areaofzone[it-1])areaofzone[it]+=areaofzone[it-1];
    }
    var sum=victoryZones.map(e=>e.width*e.height).reduce((e,t)=>(e+t));
      var rand=Math.random()*sum;
      var randZone=victoryZones[areaofzone.map(e=>(rand<e)).indexOf(true)];
	  this.x=Math.random()*(randZone.width-16)+randZone.x+8;
	  this.y=Math.random()*(randZone.height-16)+randZone.y+8;
      player.experience+=Math.floor(1+player.area/3)*map.properties.pellet_multiplier;
      while(player.experience>=player.nextLevelExperience){
		if(player.level >= map.properties.max_level){
			player.experience=player.nextLevelExperience;
			break;
		}
		player.experience-=player.tempPrevExperience-player.previousLevelExperience;
		var newLevel=player.level+1;
		var diff=newLevel-player.level;
        player.tempPrevExperience=player.experience;
        player.tempNextExperience+=this.calculateExperience(newLevel)-this.calculateExperience(newLevel-1)
        player.nextLevelExperience=player.tempNextExperience;
		player.previousLevelExperience=player.tempPrevExperience;
        player.level+=diff;
        player.upgradePoints+=diff;
      }
  }
  calculateLevel(Experience){
  var sqrt=Math.sqrt;
  return (Experience<=20200)?(((sqrt(2*Experience+1)-1)/2)+1):
  (Math.cbrt(3)/6*Math.cbrt(Math.sqrt(3)*Math.sqrt(388800*Experience**2-11559412800*Experience+84658163536799)+1080*Experience-16054740)+
  	10801/(2*Math.cbrt(3)*Math.cbrt(Math.sqrt(3)*Math.sqrt(388800*Experience**2-11559412800*Experience+84658163536799)+1080*Experience-16054740))+61/2)
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
//	EvadesClassic enemy files: server\src\game\entities\enemies\{{type}}_enemy.py
class WallEnemy extends Enemy{
  constructor(radius,speed,area_bounding_box,wall_index,wall_count,move_clockwise=true,spawn_top=true){
    super(0,0,radius,speed,0,"wall_enemy",area_bounding_box);
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
class NormalEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"normal_enemy",boundary);
  }
}
class TreeEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"tree_enemy",boundary);
    this.staticSpeed = this.speed;
    this.totalReleaseTime = 4000;
    this.clock = Math.random() * 3500;
    this.clock2 = Math.random() * 500;
    this.clock3 = 0;
    this.waiting = true;
    this.shake = false;
    this.currentVelX = this.velX;
    this.currentVelY = this.velY;
    this.beforeShakeVelX = this.velX;
    this.beforeShakeVelY = this.velY;
  }
  update(delta,area){
    this.clock += delta;
    this.clock2 += delta;
    this.clock3 += delta;
    if (this.clock > this.totalReleaseTime) {
      var count = Math.floor(Math.random()*6)+2
      for (var i = 0; i < count; i++) {
        area.entities.push(new LeafProjectile(this.x,this.y,EvadesConfig.defaults.leaf_projectile.radius,EvadesConfig.defaults.leaf_projectile.speed,i*180/(count/2),this.boundary))
      }
      this.clock = 0;
      this.velX = this.beforeShakeVelX
      this.velY = this.beforeShakeVelY
      this.shake = false;
    }
    if(this.velX!==0&&this.velY!==0){this.currentVelX = this.velX;this.currentVelY=this.velY}
    if(this.clock2>500){
      this.waiting=!this.waiting;
      this.clock2 = 0;
    }
    if(this.clock>3500){
      if(!this.shake){this.beforeShakeVelX = this.currentVelX;this.beforeShakeVelY=this.currentVelY}
      this.shake = true;
      if(this.clock3>50){
        this.velX = -this.currentVelX
        this.velY = -this.currentVelY
        this.clock3=0;
      }
    } else if(this.waiting){
      this.velX = 0;
      this.velY = 0;
    } else {
      this.velX = this.currentVelX
      this.velY = this.currentVelY
      var deg = (this.clock2/5+90) * Math.PI / 180;
      this.speedMultiplier = (Math.abs(Math.sin(deg)))
      if(this.speedMultiplier>1.5){this.speedMultiplier=1.5}
    }
    if(this.waiting){
      this.speedMultiplier *= 1;
    }
	super.update(delta,area);
  }
}
class LeafProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"leaf_projectile",boundary);
    this.immune=true;
	this.clock=0;
	this.dir=this.speed/150;
  }
  onCollide(){
	  this.remove=true;
  }
  update(delta,area){
	this.clock+=delta;
    this.velangle();
    this.angle += this.dir/30 * (delta/30);
    this.anglevel();
    if(this.clock>1700){
      this.remove = true;
    }
	super.update(delta,area);
  }
}
class SnowballProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,area,boundary){
    super(x,y,radius,speed,angle,"snowball_projectile",boundary);
	this.texture="entities/snowball_projectile";
	this.showOnMap=true;
	this.area=area;
	this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8(this.texture);
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
class ImmuneEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"immune_enemy",boundary);
    this.immune=true;
  }
}
class CorrosiveEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"corrosive_enemy",boundary);
    this.corrosive=true;
  }
}

//Aura Enemies
class ExperienceDrainEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"experience_drain_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.experienceDraining=true;
  }
}
class BlockingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"blocking_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.blocking=true;
  }
}
class SlowingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,slow,boundary){
    super(x,y,radius,speed,angle,"slowing_enemy",boundary);
	this.auraRadius=aura_radius;
	this.slow=slow;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.slowing=[true,this.slow];
  }
}
class MagneticReductionEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"magnetic_reduction_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.magneticReduction=true
  }
}
class MagneticNullificationEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"magnetic_nullification_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.magneticNullification=true
  }
}
class FreezingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"freezing_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.freezing=true;
  }
}
class DrainingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,drain,boundary){
    super(x,y,radius,speed,angle,"draining_enemy",boundary);
	this.auraRadius=aura_radius;
	this.drain=drain;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.draining=[true,this.drain];
  }
}
class LavaEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"lava_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.lava=true;
  }
}
class ToxicEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"toxic_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	if(!player.toxic){
	  player.toxic=true;
	  player.energy=Math.min(player.energy,player.maxEnergy*0.7);
	}
  }
}
class EnlargingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"enlarging_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.enlarging=true;
  }
}
class ReducingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"reducing_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.reducing=true;
  }
}
class SlipperyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"slippery_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.slippery=true;
  }
}
class BarrierEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"barrier_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.immune=true;
  }
  auraEffect(player,delta){
	player.inEnemyBarrier=true;
  }
}
class RadarEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"radar_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.releaseInterval=250;
	this.release_time=Math.random()*this.releaseInterval;
  }
  update(delta,area) {
    if(this.release_time<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return (e.moving||e.cent_is_moving||e.mouseActive)&&!e.isDowned()&&!e.safeZone&&!e.nightActivated});
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
      if(distance > this.auraRadius**2)continue;
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
      area.entities.push(new RadarProjectile(this.x,this.y,this.radius/3,150+this.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this,this.boundary))
      this.release_time = this.releaseInterval;
    }
    }else{
      this.release_time -= delta;
    }
    super.update(delta);
  }
}
class RadarProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner,boundary){
    super(x,y,radius,speed,angle,"radar_projectile",boundary);
	this.owner=owner;
    this.immune=true;
    this.clock = 0;
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
	if(distance(this.owner,this)>this.owner.auraRadius){
		this.remove=true;
	}
    super.update(delta);
  }
}
class GravityEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,gravity,boundary){
    super(x,y,radius,speed,angle,"gravity_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.gravity=gravity;
  }
  auraEffect(player,delta){
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
    }
  }
}
class GravityGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"gravity_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"repelling_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,aura_radius,repulsion,boundary){
    super(x,y,radius,speed,angle,"repelling_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.repulsion=repulsion;
  }
  auraEffect(player,delta){
	if (!player.invulnerable) {
      var dx = player.x - this.x;
      var dy = player.y - this.y;
      var dist = distance({x:0,y:0},{x:dx,y:dy});
      var attractionAmplitude = Math.pow(2, -(dist / 100));
      var moveDist = (this.repulsion * attractionAmplitude);
      var angleToPlayer = Math.atan2(dy, dx);
      player.x+=moveDist*Math.cos(angleToPlayer)*delta/1000;
      player.y+=moveDist*Math.sin(angleToPlayer)*delta/1000;
	  player.collision(0);
    }
  }
}
class PositiveMagneticGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"positive_magnetic_ghost_enemy",boundary);
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
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
}
class NegativeMagneticGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"negative_magnetic_ghost_enemy",boundary);
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(player.magnetDirection=="UP"){
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
  }
}
class DisablingGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"disabling_ghost_enemy",boundary);
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	player.disabling=true;
  }
}
class SpeedGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"speed_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"ice_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"poison_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"regen_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,"disabling_enemy",boundary);
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
  }
  auraEffect(player,delta){
	player.disabling=true;
  }
}
class QuicksandEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,direction,strength,boundary){
    super(x,y,radius,speed,angle,"quicksand_enemy",boundary);
	this.push_direction=direction;
	this.auraRadius=aura_radius;
	this.effects.push({radius:aura_radius,effectType:effectConfig.indexOf(effectConfig.filter(e=>{return e.name=="Enemy "+capitaliseName(this.type.replace("_enemy",""))})[0])})
	this.quicksand_strength=strength;
  }
  auraEffect(player,delta){
	player.quicksand=[true,this.push_direction,this.quicksand_strength];
  }
}
class SandEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"sand_enemy",boundary);
	this.sandSpeed=1;
  }
  update(delta){
	if(this.sandSpeed<3){
		this.sandSpeed+=0.03*delta/(1e3/30);
	}
	this.speedMultiplier*=this.sandSpeed;
    super.update(delta);
  }
  onCollide(){
	this.sandSpeed=0;
  }
}

class SandrockEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"sandrock_enemy",boundary);
	this.sandrockSpeed=1;
  }
  update(delta){
	if(this.sandrockSpeed>=0.1){
		this.sandrockSpeed-=0.01*delta/(1e3/30);
	}
	this.speedMultiplier*=this.sandrockSpeed;
    super.update(delta);
  }
  onCollide(){
	this.sandrockSpeed=1;
  }
}
class ChargingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"charging_enemy",boundary);
	this.chargingSpeed=1;
  }
  update(delta){
	if(this.chargingSpeed<2.5){
		this.chargingSpeed+=0.05*delta/(1e3/30);
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
  constructor(x,y,radius,speed,angle,reverse,home_range,increment,boundary){
    super(x,y,radius,speed,angle,"homing_enemy",boundary);
    this.target_angle=this.angle;
    this.reverse=reverse;
	this.home_range=home_range;
	this.increment=increment/30;
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
    var angle_increment = this.increment;
    if(angle_difference<angle_increment){
    }else if(angle_difference < Math.PI){
      this.angle-=angle_increment*delta/(1000/30);
      this.velX=Math.cos(this.angle)*this.speed;
      this.velY=Math.sin(this.angle)*this.speed;
    }else{
      this.angle+=angle_increment*delta/(1000/30);
      this.velX=Math.cos(this.angle)*this.speed;
      this.velY=Math.sin(this.angle)*this.speed;
    }
    super.update(delta);
  }
  onCollide(){
    this.target_angle=this.angle=Math.atan2(this.velY,this.velX);
  }
  /*render(ctx,ctxL) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
		ctx.setLineDash([2,2]);
    ctx.arc(this.x,this.y,200,0,Math.PI*2,!1);
    ctx.stroke();
		ctx.setLineDash([]);
    ctx.closePath();
    ctx.globalAlpha=this.brightness;
    this.isHarmless&&(ctx.globalAlpha=.4);
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,!1);
    ctx.fill();
    if(enemyOutline.checked){
      ctx.lineWidth = 2;
	 	  ctx.strokeStyle = "black";
      ctx.stroke();
    }
    ctx.closePath();
    ctx.globalAlpha=1;
  }
  */
}
class DasherEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"dasher_enemy",boundary);
    this.reset_parameters();
  }
  reset_parameters(){
    //reset_parameters(self)
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
  update(delta){
    //update_parameters(self)
    if(this.time_preparing == 0){
      if(this.time_dashing == 0){
        this.time_since_last_dash += delta;
        if(this.time_since_last_dash > this.time_between_dashes){
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
    super.update(delta);
  }
  onCollide(){
    this.velangle();
  }
}
class TeleportingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"teleporting_enemy",boundary);
    this.clock = 0;
  }
  update(delta){
    this.clock += delta
    if (this.clock >= 22e3/30) {
      this.speedMultiplier *= 1;
      this.clock = this.clock % 22e3/30;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"star_enemy",boundary);
    this.clock = 0;
    this.starPos = 1;
  }
  update(delta){
    this.clock += delta
    if (this.clock >= 400) {
      this.speedMultiplier *= 1;
      this.starPos *= -1;
      this.velX *= -1;
      this.velY *= -1;
      this.clock = this.clock % 400;
    }else{
	  this.speedMultiplier *= 0;
	}
    this.x+=this.velX/30*this.speedMultiplier*2;
    this.y+=this.velY/30*this.speedMultiplier*2;
	this.speedMultiplier=1;
    this.collision(delta);
  }
}
class OscillatingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"oscillating_enemy",boundary);
    this.clock = 0;
  }
  update(delta){
    this.clock += delta
    if (this.clock > 1000) {
      this.velX *= -1;
      this.velY *= -1;
      this.clock = this.clock % 1000;
    }
    super.update(delta);
  }
}
class StaticEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"static_enemy",boundary);
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
				  EnemyPlayerInteraction(player,this,this.corrosive,this.disabled,this.immune,player.inBarrier);
			  }
		  }
	  }
	  if(!player.isDowned()){
	    this.x=clamp(player.x,this.boundary.left+this.radius,this.boundary.right-this.radius);
	    this.y=clamp(player.y,this.boundary.top+this.radius,this.boundary.bottom-this.radius);
		this.iseffect=true;
	  }
  }
  update(delta){
	if(!this.disabled){
      this.clock += delta
	  if (this.clock > 1e3)this.disabled=true,this.clock=0;
	}
	super.update(delta);
  }
}
class ZigzagEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"zigzag_enemy",boundary);
    this.switchInterval = 500;
    this.zigTime = 500;
    this.switchAdd = false;
    this.turnAngle = Math.PI / 2;
  }
  update(delta){
    if (this.zigTime > 0) {
      this.zigTime -= delta;
    } else {
      this.zigTime = this.switchInterval
      if (!this.switchAdd) {
        this.angle = Math.atan2(this.velY, this.velX);
        this.angle -= this.turnAngle;
        this.velX = Math.cos(this.angle) * this.speed;
        this.velY = Math.sin(this.angle) * this.speed;
        this.switchAdd = true;
      } else {
        this.angle = Math.atan2(this.velY, this.velX);
        this.angle += this.turnAngle
        this.velX = Math.cos(this.angle) * this.speed;
        this.velY = Math.sin(this.angle) * this.speed;
        this.switchAdd = false;
      }
    }
    super.update(delta);
  }
}
class ZoningEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"zoning_enemy",boundary);
    this.switchInterval = 1000;
    this.zoneTime = Math.random() * this.switchInterval;
    this.turnAngle = Math.PI / 2
    this.turnAngle *= (Math.floor(Math.random() * 2) * 2) - 1
  }
  update(delta){
    if (this.zoneTime > 0) {
      this.zoneTime -= delta
    } else {
      this.zoneTime = this.switchInterval;
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle += this.turnAngle;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
    }
    super.update(delta);
  }
}
class SizingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"sizing_enemy",boundary);
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
class TurningEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,circle_size,boundary){
    super(x,y,radius,speed,angle,"turning_enemy",boundary);
    this.circle_size = circle_size;
    this.dir = speed / this.circle_size;
  }
  update(delta) {
    this.velangle()
    this.angle += this.dir / 30 * (delta / 30);
    this.anglevel();
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class SpiralEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"spiral_enemy",boundary);
    this.angleIncrement = 0.15;
    this.angleIncrementChange = 0.004;
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
      this.angleIncrementChange = 0.0022;
    } else {
      this.angleIncrementChange = 0.004;
    }
    if (this.angleAdd) {
      this.angleIncrement += this.angleIncrementChange * (delta / (1000 / 30));
    } else {
      this.angleIncrement -= this.angleIncrementChange * (delta / (1000 / 30));
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
class CactusEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"cactus_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"crumbling_enemy",boundary);
	this.hasCollided=false;
	this.collideTime=0;
	this.crumbleSize=1;
  }
  onCollide(){
	  if(!this.hasCollided){
		this.hasCollided=true;
		this.crumbleSize=0.5;
		var residue=new ResidueEnemy(this.x,this.y,this.ogradius/3,this.speed/6.25,Math.random()*360,this.boundary);
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
		this.hasCollided=false;
		this.collideTime=0;//67 frames to go back to original size in 30fps
	};
	if(!this.hasCollided){
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"snowman_enemy",boundary);
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
			this.snowmanSize+=0.05*delta/(1e3/30);
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
  constructor(x,y,radius,speed,angle,boundary,fake=false){
    super(x,y,radius,speed,angle,"pumpkin_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"mist_enemy",boundary);
      this.brightness = 1;
      this.isVisible = true; // true - fading, false - going visible
      this.visibility_radius = 200;
      this.brightness_tick = 0.05;
	}
  update(delta,area) {
	var timeFix=delta/(1e3/30);
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
      this.brightness-=this.brightness_tick*timeFix;
	  this.brightness=Math.max(this.brightness,Number.EPSILON);
    }else if(this.brightness<1){
      this.brightness+=this.brightness_tick*timeFix;
    }
	this.lightRadius=this.radius*3*Math.min(1,this.brightness);
    super.update(delta);
  }
}
class PhantomEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"phantom_enemy",boundary);
      this.brightness = 1;
      this.isVisible = true; // true - fading, false - going visible
      this.visibility_radius = 250;
      this.brightness_tick = 0.05;
	}
  update(delta,area) {
	var timeFix=delta/(1e3/30);
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
        this.brightness+=this.brightness_tick*timeFix;
	  }
    }else if(this.brightness>0){
      this.brightness-=this.brightness_tick*timeFix;
	  this.brightness=Math.max(this.brightness,Number.EPSILON);
    }
	this.lightRadius=this.radius*3*Math.min(1,this.brightness);
    super.update(delta);
  }
}
class GlowyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"glowy_enemy",boundary);
      this.invisible_timing = 500;
      this.brightness = 1;
      this.isVisible = true;
	  this.lightRadius=this.radius*3*this.brightness;
      this.timer = this.invisible_timing;
      this.brightness_tick = 0.06;
	}
  update(delta,area) {
	var timeFix=delta/(1e3/30);
    if(this.isVisible && this.timer <= 0){
      this.brightness -= this.brightness_tick * timeFix;
      if(this.brightness <= 0){
        this.brightness = Number.EPSILON;
        this.isVisible = false;
        this.timer = this.invisible_timing;
      }
    } else if (!this.isVisible && this.timer <= 0){
      this.brightness += this.brightness_tick * timeFix;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"firefly_enemy",boundary);
      this.invisible_timing = 500;
      this.isVisible = Math.round(Math.random());
      this.brightness = this.isVisible==0?Math.random():1;
	  this.lightRadius=this.radius*3*this.brightness;
      this.timer = this.isVisible==0?0:this.invisible_timing*Math.random();
      this.brightness_tick = 0.06;
	}
  update(delta,area) {
	var timeFix=delta/(1e3/30);
    if(this.isVisible && this.timer <= 0){
      this.brightness -= this.brightness_tick * timeFix;
      if(this.brightness <= 0){
        this.brightness = Number.EPSILON;
        this.isVisible = false;
        this.timer = this.invisible_timing;
      }
    } else if (!this.isVisible && this.timer <= 0){
      this.brightness += this.brightness_tick * timeFix;
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
  constructor(x,y,radius,speed,angle,powered,boundary){
    super(x,y,radius,speed,angle,"grass_enemy",boundary);
	this.powered=powered;
	this.hasTouched=false;
	this.grassTime=0;
	this.grassHarmless=true;
  }
  playerInteraction(player){
	if(!player.isDowned()){
		this.grassHarmless=false;
		this.grassTime>=1e3 && (
			this.grassTime=0,this.grassHarmless=true,
			EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune,player.inBarrier),
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
	if(!this.grassHarmless&&this.grassTime<1e3){
		this.grassTime+=delta;
	}
    super.update(delta);
  }
}
class FlowerEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,growth_multiplier,boundary){
    super(x,y,radius,speed,angle,"flower_enemy",boundary);
	this.hasEntity=false;
	this.growth_multiplier=growth_multiplier;
  }
  update(delta,area){
	if(!this.hasEntity){
		this.hasEntity=true;
		for(var i=0;i<5;i++){
			area.entities.push(new FlowerProjectile(this.x,this.y,this.radius,0,0,this,i,this.growth_multiplier,this.boundary))
		}
	}
	super.update(delta)
  }
}
class FlowerProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner,id,growth_multiplier,boundary){
    super(x,y,radius,speed,angle,"flower_projectile",boundary);
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
	super.update(delta,area);
	this.setPosition(Math.sin(this.id*72*Math.PI/180),-Math.cos(this.id*72*Math.PI/180));
  }
  setPosition(x, y){
    this.x = this.owner.x + x * this.owner.radius;
    this.y = this.owner.y + y * this.owner.radius;
  }
}
class SeedlingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"seedling_enemy",boundary);
	this.hasEntity=false;
	this.immune=true;
  }
  update(delta,area){
	if(!this.hasEntity){
		this.hasEntity=true;
		area.entities.push(new SeedlingProjectile(this.x,this.y,this.radius,0,0,this,this.boundary))
	}
  }
}
class SeedlingProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner,boundary){
    super(x,y,radius,speed,angle,"seedling_projectile",boundary);
	this.owner=owner;
	this.immune=true;
	this.angle=Math.random()*360;
	this.clockwise=Math.round(Math.random());
  }
  update(delta,area) {
	this.angle+=10*delta/(1e3/30)*Math.pow(-1,this.clockwise);
    this.x=this.owner.x+(this.radius+this.owner.radius/2)*Math.cos(this.angle/180*Math.PI);
    this.y=this.owner.y+(this.radius+this.owner.radius/2)*Math.sin(this.angle/180*Math.PI);
	this.collision(delta);
    this.x=this.owner.x+(this.radius+this.owner.radius/2)*Math.cos(this.angle/180*Math.PI);
    this.y=this.owner.y+(this.radius+this.owner.radius/2)*Math.sin(this.angle/180*Math.PI);
  }
}
class FireTrailEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary,decay=false){
    super(x,y,radius,speed,angle,"fire_trail_enemy",boundary);
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
    area.entities.push(new FireTrailEnemy(this.x,this.y,this.radius,0,0,true,this.boundary));
  }
}
class Torch extends SimulatorEntity{
  constructor(x,y,upside_down){
    super(x,y,null,null,"torch",null,null,null,null,null);
	this.image = null,
	this.baseLightRadius = 100,
	this.randomFlickerRadius = 10,
	this.flickerChance = 4.5 / 30,
	this.lightRadius = this.baseLightRadius;
	this.renderFirst=true;
	this.flipped=upside_down;
	this.imageName="torch";
	this.loadedImageName="torch";
	this.image=$31e8cfefa331e399$export$93e5c64e4cc246c8("entities/" + this.imageName);
	this.width=13;
	this.height=36;
  }
  update(){}
  render(ctx,t,delta) {
	const a = this.x + t.x
	  , r = this.y + t.y;
	var tf=delta/(1e3/30)
	Math.random() <= this.flickerChance && (this.lightRadius = this.baseLightRadius + Math.random() * this.randomFlickerRadius);
	this.flipped ? (ctx.translate(a + this.width / 2, r + this.height / 2),
	ctx.scale(1, -1),
	ctx.drawImage(this.image.getImage(tf), -this.width / 2, -this.height / 2, this.width, this.height),
	ctx.scale(1, -1),
	ctx.translate(-(a + this.width / 2), -(r + this.height / 2))) : ctx.drawImage(this.image.getImage(tf), a, r, this.width, this.height)
  }
}
class LightRegion extends SimulatorEntity{
  constructor(x,y,width,height){
    super(x,y,null,null,"light_region",null,null,null,null,null);
	this.lightRectangle={x,y,width,height,intensity:1};
  }
  update(){}
  render(ctx,ctxL,delta) {}
}
class Gate extends SimulatorEntity{
  constructor(x,y,width,height){
    super(x,y,null,null,"gate",null,null,null,null,null);
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
  constructor(x,y,width,height,texture){
    super(x,y,null,null,"wall",null,null,null,null,null);
	this.texture=texture;
	this.width=width;
	this.height=height;
  }
  update(){}
  render(ctx,camera) {
		ctx.imageSmoothingEnabled = false;
        if(!zoneconsts[this.texture])return;
        var q = ctx.createPattern(zoneconsts[this.texture].active, null)
		q.setTransform(new DOMMatrix([1,0,0,1,(camera.x+this.x)%zoneconsts[this.texture].active.width,(camera.y+this.y)%zoneconsts[this.texture].active.height]))
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = ((tileMode.selectedIndex&1)&&this.texture=="normal")?zoneColors[tileMode.selectedIndex>>1].active:q;
        ctx.rect(
          camera.x+this.x,
          camera.y+this.y,
		  this.width,
		  this.height
        );
        ctx.fill();
        ctx.restore();
        ctx.closePath();
  }
}
class FlashlightItem extends SimulatorEntity{
  constructor(x,y){
    super(x,y,null,null,"flashlight_spawner",null,null,null,null,null);
	this.renderFirst=true;
	this.texture=$31e8cfefa331e399$export$93e5c64e4cc246c8('entities/flashlight_item');
	this.spawnInterval=1e3;
	this.width=32;
	this.height=16;
	this.spawnTime=this.spawnInterval-1e3;
	this.isSpawned=false;
  }
  update(delta){
	this.spawnTime+=delta * (!this.isSpawned);
    if(this.spawnTime>=this.spawnInterval){
		this.isSpawned=true;
		this.spawnTime%=this.spawnInterval;
	};
    for(var i in map.players){
      var player = map.players[i];
      if(this.isSpawned&&rectCircleCollision(player.x,player.y,player.radius,this.x-this.width/2,this.y-this.height/2,this.width,this.height).c){
        this.playerInteraction(player);
      }
    }
  }
  playerInteraction(player){
	  if(!player.abilityThree){
		  player.abilityThree={};
	  }
	  if(player.abilityThree.abilityType!=98&&this.isSpawned){
	  player.abilityThree.abilityType=98;
	  evadesRenderer.heroInfoCard.abilityThree=new $097def8f8d652b17$export$2e2bcd8739ae039;
	  evadesRenderer.heroInfoCard.abilityThree.unionState(abilityConfig[player.abilityThree.abilityType]);
	  evadesRenderer.heroInfoCard.abilityThree.locked=false;
	  evadesRenderer.heroInfoCard.abilityThree.level=1;
	  this.isSpawned=false;
	  }
  }
  render(ctx,camera) {
	if(!this.isSpawned)return;
	ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.texture.getImage(),camera.x+(this.x-16),camera.y+this.y-8,32,16);
  }
}
class LiquidEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,player_detection_radius,boundary){
    super(x,y,radius,speed,angle,"liquid_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,switch_inverval,switch_time,switched_harmless,boundary){
    super(x,y,radius,speed,angle,"switch_enemy",boundary);
    this.switch_inverval = switch_inverval;
	this.switchTime=switch_time;
	if(switched_harmless==void 0){
      this.switchedHarmless = this.disabled = false;
      if (Math.round(Math.random()) === 1) {
        this.switchedHarmless = this.disabled = true;
      }
	}else{
	  this.switchedHarmless = this.disabled = switched_harmless;
	}
    this.isHarmless = this.disabled;
  }
  update(delta) {
    this.switchTime -= delta;
    if (this.switchTime <= 0) {
      this.switchedHarmless = this.disabled = !this.disabled;
      this.isHarmless = this.disabled;
	  this.switchTime += this.switch_inverval;
    }
    super.update(delta);
  }
}
class CyclingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"cycling_enemy",boundary);
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
			case"SlowingEnemy":this.entity=new SlowingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.slowing_radius,defaultValues.spawner.slow,this.boundary);break;
			case"DrainingEnemy":this.entity=new DrainingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.draining_radius,defaultValues.spawner.drain,this.boundary);break;
			case"FreezingEnemy":this.entity=new FreezingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.freezing_radius,this.boundary);break;
			case"DisablingEnemy":this.entity=new DisablingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.disabling_radius,this.boundary);break;
			case"ToxicEnemy":this.entity=new ToxicEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.toxic_radius,this.boundary);break;
			case"EnlargingEnemy":this.entity=new EnlargingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.enlarging_radius,this.boundary);break;
			case"HomingEnemy":this.entity=new HomingEnemy(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,defaultValues.spawner.reverse,defaultValues.spawner.home_range,defaultValues.spawner.increment,this.boundary);break;
			default:this.entity=new (eval(rand))(this.x,this.y,this.ogradius,this.speed,(this.entity?.angle ?? this.angle)/Math.PI*180,this.boundary);break;
		}
		area.entities.push(this.entity);
		this.clock = this.clock % this.switch_inverval;
    }
    super.update(delta);
  }
}
class IcicleEnemy extends Enemy{
  constructor(x,y,radius,speed,horizontal,boundary){
    super(x,y,radius,speed,Math.round(Math.random())*180+90*!horizontal,"icicle_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,release_interval,release_time,boundary){
    super(x,y,radius,speed,angle,"radiating_bullets_enemy",boundary);
    this.release_interval = release_interval,
    this.releaseTime = release_time ?? (Math.random()*this.release_interval);
  }
  update(delta,area) {
    this.releaseTime -= delta;
    if (this.releaseTime < 0) {
		for(var i=0;i<8;i++){
			area.entities.push(new RadiatingBulletsProjectile(this.x,this.y,EvadesConfig.defaults.radiating_bullets_projectile.radius,EvadesConfig.defaults.radiating_bullets_projectile.speed,45*i,this.boundary))
		}
		this.releaseTime = this.releaseTime % this.release_interval;
		this.releaseTime+=this.release_interval
		this.releaseTime = this.releaseTime % this.release_interval;
    }
    super.update(delta);
  }
}
class RadiatingBulletsProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"radiating_bullets_projectile",boundary);
	this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
    EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune,player.inBarrier);
    this.remove=true;
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
class WavyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle=0,boundary){
    super(x,y,radius,speed,angle,"wavy_enemy",boundary);
    this.circleSize = 100;
    this.dir = 1;
    this.switchInterval = 800;
    this.waveTime = 0;
    this.angleIncrement = (this.speed/30 + 6) / this.circleSize;
  }
  update(delta) {
    this.waveTime += delta
    if (this.waveTime >= this.switchInterval) {
      this.waveTime %= this.switchInterval;
      this.dir *= -1;
    }
    this.velangle();
    this.angle += this.angleIncrement*this.dir*(delta/(1000/30));
    this.anglevel();
    super.update(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class SniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,recharge,boundary){
    super(x,y,radius,speed,angle,"sniper_enemy",boundary);
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
      area.entities.push(new SniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class SniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"sniper_projectile",boundary);
    this.clock = 0;
    this.immune=true;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"ring_sniper_enemy",boundary);
    this.release_interval=5000;
	this.maxHealth=this.health=100;
	this.releaseTime=Math.random()*this.release_interval;
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
      if(distance > 2400**2)continue;
	  // this range will be changed if this is incorrect
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
      area.entities.push(new RingSniperProjectile(this.x,this.y,EvadesConfig.defaults.ring_sniper_projectile.radius,EvadesConfig.defaults.ring_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class RingSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"ring_sniper_projectile",boundary);
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
	if(this.clock2>=8320/this.speed*(1e3/30))this.remove=true;
    super.update(delta);
  }
}
class PredictionSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"prediction_sniper_enemy",boundary);
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
      let lead=this.timeOfImpact(diff,radial,11);
      var dX=diff.x + lead * radial.x;
      var dY=diff.y + lead * radial.y;
	  if(!isNaN(lead) && lead >=0){
        area.entities.push(new PredictionSniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.prediction_sniper_projectile.speed,Math.atan2(dY,dX)/Math.PI*180,this.boundary))
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"residue_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"prediction_sniper_projectile",boundary);
    this.immune=true;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"ice_sniper_enemy",boundary);
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
      area.entities.push(new IceSniperProjectile(this.x,this.y,EvadesConfig.defaults.ice_sniper_projectile.radius,EvadesConfig.defaults.ice_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class IceSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"ice_sniper_projectile",boundary);
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
	  player.isIced=true;
	  player.icedTimeLeft=1000;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"poison_sniper_enemy",boundary);
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
      area.entities.push(new PoisonSniperProjectile(this.x,this.y,EvadesConfig.defaults.poison_sniper_projectile.radius,EvadesConfig.defaults.poison_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class PoisonSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"poison_sniper_projectile",boundary);
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
    player.isPoisoned=true;
    player.poisonedTimeLeft=1000;
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
  constructor(x,y,radius,speed,angle,speed_loss,boundary){
    super(x,y,radius,speed,angle,"speed_sniper_enemy",boundary);
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
      area.entities.push(new SpeedSniperProjectile(this.x,this.y,EvadesConfig.defaults.speed_sniper_projectile.radius,EvadesConfig.defaults.speed_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.speed_loss,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class SpeedSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,speed_loss,boundary){
    super(x,y,radius,speed,angle,"speed_sniper_projectile",boundary);
    this.speed_loss=speed_loss;
    this.immune=true;
    this.clock = 0;
  }
	playerInteraction(player){
		if(!player.isDowned()){
			this.remove=true;
			player.speed-=this.speed_loss;
			player.statSpeed-=this.speed_loss;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"lead_sniper_enemy",boundary);
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
      area.entities.push(new LeadSniperProjectile(this.x,this.y,this.radius*2/3,EvadesConfig.defaults.lead_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class LeadSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"lead_sniper_projectile",boundary);
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
    this.remove=true;
    player.isLead=true;
	player.leadTime=3500;
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
class RegenSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,regen_loss,boundary){
    super(x,y,radius,speed,angle,"regen_sniper_enemy",boundary);
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
      area.entities.push(new RegenSniperProjectile(this.x,this.y,EvadesConfig.defaults.regen_sniper_projectile.radius,EvadesConfig.defaults.regen_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.regen_loss,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class RegenSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,regen_loss,boundary){
    super(x,y,radius,speed,angle,"regen_sniper_projectile",boundary);
    this.regen_loss=regen_loss;
    this.immune=true;
    this.clock = 0;
  }
	playerInteraction(player){
		if(!player.isDowned()){
			this.remove=true;
			player.energyRegen-=this.regen_loss;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"corrosive_sniper_enemy",boundary);
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
      area.entities.push(new CorrosiveSniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.corrosive_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class CorrosiveSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"corrosive_sniper_projectile",boundary);
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
    super(x,y,radius,speed,angle,"frost_giant_enemy",boundary);
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
    this.turn_speed+=this.turn_acceleration*delta/1e3*30;
	try{
    this.pattern(delta,area);
	}catch(e){};
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
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle),this.projectile_duration,this.boundary)
    }
  }
  spiral_pattern(delta,area){
    if(this.prepare_shot(delta)){
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle),this.projectile_duration,this.boundary)
    }
  }
  singlebig_pattern(delta,area){
    if(this.prepare_shot(delta)){
      const big_radius = this.projectile_radius*3;
      const big_speed = this.projectile_speed;
      const offset_distance = big_radius / 2
      const newPos = {x:this.x + Math.cos(this.initial_angle) * offset_distance,
                      y:this.y + Math.sin(this.initial_angle) * offset_distance}
      this.addBullet(area,newPos.x,newPos.y,big_speed,big_radius,this.rad_to_deg(this.initial_angle),this.projectile_duration,this.boundary)
    }
  }
  quadspiral_pattern(delta,area){
    if(this.prepare_shot(delta)){
	  var i=0;
	  while(i<4){
        this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)+(i++)*90,this.projectile_duration,this.boundary)
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
      this.addBullet(area,newPos.x,newPos.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.initial_angle),this.projectile_duration,this.boundary)
    }
  }
  cone_edges_pattern(delta,area){
    if(this.prepare_shot(delta)){
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)+this.cone_angle,this.projectile_duration,this.boundary)
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)-this.cone_angle,this.projectile_duration,this.boundary)
    }
  }
  twinspiral_pattern(delta,area){
    if(this.prepare_shot(delta)){
	  var i=0;
	  while(i<2){
        this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.angle)+(i++)*180,this.projectile_duration,this.boundary)
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
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.initial_angle+angle_moved),this.projectile_duration,this.boundary)
      this.addBullet(area,this.x,this.y,this.projectile_speed,this.projectile_radius,this.rad_to_deg(this.initial_angle-angle_moved),this.projectile_duration,this.boundary)
    }
  }
  addBullet(area,x,y,speed,radius,angle,duration,boundary){
	  area.entities.push(new FrostGiantIceProjectile(x,y,radius,speed,angle,duration,boundary));
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
  constructor(x,y,radius,speed,angle,projectile_duration,boundary){
    super(x,y,radius,speed,angle,"frost_giant_ice_projectile",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"positive_magnetic_sniper_enemy",boundary);
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
      area.entities.push(new PositiveMagneticSniperProjectile(this.x,this.y,EvadesConfig.defaults.positive_magnetic_sniper_projectile.radius,EvadesConfig.defaults.positive_magnetic_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class PositiveMagneticSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"positive_magnetic_sniper_projectile",boundary);
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"negative_magnetic_sniper_enemy",boundary);
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
      area.entities.push(new NegativeMagneticSniperProjectile(this.x,this.y,EvadesConfig.defaults.negative_magnetic_sniper_projectile.radius,EvadesConfig.defaults.negative_magnetic_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class NegativeMagneticSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"negative_magnetic_sniper_projectile",boundary);
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"force_sniper_a_enemy",boundary);
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
      area.entities.push(new ForceSniperAProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.force_sniper_a_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class ForceSniperAProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"force_sniper_a_projectile",boundary);
    this.immune=true;
    this.clock = 0;
	this.touchedPlayers=[];
  }
  playerInteraction(player){
	  if(this.touchedPlayers.indexOf(player)==-1){
		  this.touchedPlayers.push(player);
		  player.forcefirst=true;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"force_sniper_b_enemy",boundary);
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
      area.entities.push(new ForceSniperBProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.force_sniper_b_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class ForceSniperBProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"force_sniper_b_projectile",boundary);
    this.immune=true;
    this.clock = 0;
	this.touchedPlayers=[];
  }
  playerInteraction(player){
	  if(this.touchedPlayers.indexOf(player)==-1){
		  this.touchedPlayers.push(player);
		  player.forcesecond=true;
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
  constructor(x,y,radius,speed,angle,ignore_invulnerability,ignore_dead_players,boundary){
    super(x,y,radius,speed,angle,"wind_ghost_enemy",boundary);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"wind_sniper_enemy",boundary);
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
      area.entities.push(new WindSniperProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.wind_sniper_projectile.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    super.update(delta);
  }
}
class WindSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"wind_sniper_projectile",boundary);
	this.gravity=1;
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"lunging_enemy",boundary);
    this.base_speed = speed;
    this.reset_parameters();
	this.colorChange=0;
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
  	return e.r += this.colorChange,
  	e.g -= 1.45 * this.colorChange,
  	e.b -= 1.3 * this.colorChange,
  	`rgb(${e.r}, ${e.g}, ${e.b})`
  }
  update(delta, area){
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
    if (this.time_during_lunge>0){
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
        this.colorChange = 55-Math.floor(55*this.lunge_cooldown_timer/this.lunge_cooldown_max)
      }
    }
    else {
      let lunge_time_ratio = this.lunge_timer / this.time_to_lunge;
      if(closest_entity != undefined){
        let target_angle = Math.atan2(distance_y,distance_x)+Math.PI;
        target_angle += Math.random() * Math.PI/8 - Math.PI/16;
        if (this.time_during_lunge == 0){
          this.lunge_timer += delta;
          this.colorChange = Math.floor(55 * lunge_time_ratio);
          if(this.lunge_timer >= this.time_to_lunge){
            this.lunge_timer = 0;
            this.time_during_lunge = 1;
            this.base_speed = this.lunge_speed;
            this.change_angle(target_angle);
          }
        }
      } else {
        if(this.lunge_timer > 0){
          this.lunge_timer-=delta;
          this.colorChange = Math.floor(55 * lunge_time_ratio);
        }
        if(this.lunge_timer < 0){
          this.lunge_timer = 0;
        }
      }
      if (lunge_time_ratio > 0.75){
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"stalactite_enemy",boundary);
    this.hasCollided = false;
    this.collideTime = 0;
  }
  update(delta, area) {
    if (this.hasCollided){
      !this.collideTime && map.areas[current_Area].entities.push(new StalactiteEnemyProjectile(this.x,this.y,this.radius/2,EvadesConfig.defaults.stalactite_enemy_projectile.speed,void 0,this.boundary));
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"stalactite_enemy_projectile",boundary);
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

window.warnin=false;