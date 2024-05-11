function $01bb7fd9b3660a1e$export$e1851a6e64efa609(e, a, t) {
	$01bb7fd9b3660a1e$export$304370d6b87d514e(e, a, $3d7c57289a41f86c$exports.defaults[t])
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
return abilityConfig[e];
}
function $01bb7fd9b3660a1e$export$6ca246516fec3cbe(e) {
	let a = "";
	for (let t = 0; t < e.length; t++) {
		const r = e[t];
		a += r >= "A" && r <= "Z" ? "_" + r.toLowerCase() : r
	}
	return a
}
function capitalize(s){
  var t=s.split("_")
  t=t.map(e=>{
    return e[0].toUpperCase()+e.slice(1).toLowerCase();
  })
  return t.join("");
}
function spawnEntities(area=current_Area){
	if(!map.areas[area])return;
	var isVictory=!!map.areas[area].zones.filter(e=>e.type=="victory").length;
	var totalPellets=map.areas[area].properties.pellet_count ?? defaultValues.properties.pellet_count;
	if(totalPellets==defaultValues.properties.pellet_count){
		totalPellets=map.properties.pellet_count ?? defaultValues.properties.pellet_count;
	}
	var boundary=getAreaBoundary(map.areas[area]);
	var victoryZones=map.areas[area].zones.filter(e=>(e.type=="victory"||e.type=="active"));
	map.areas[area].entities=[];
	map.areas[area].assets.filter(e=>e.type=="flashlight_spawner").map(e=>{
		map.areas[area].entities.push(new FlashlightSpawner(e.x,e.y))
	})
	map.areas[area].assets.filter(e=>e.type=="torch").map(e=>{
		map.areas[area].entities.push(new Torch(e.x,e.y,e.upside_down))
	})
	map.areas[area].assets.filter(e=>e.type=="light_region").map(e=>{
		map.areas[area].entities.push(new LightRegion(e.x,e.y,e.width,e.height))
	})
	map.areas[area].assets.filter(e=>e.type=="wall").map(e=>{
		map.areas[area].entities.push(new Wall(e.x,e.y,e.width,e.height,e.texture))
	})
	//Don't spawn gate entities since it is removed from the game.
	//map.areas[area].assets.filter(e=>e.type=="gate").map(e=>{
	//  map.areas[area].entities.push(new Gate(e.x,e.y,e.width,e.height))
	//})
	
	if(victoryZones.length){
		var areaofzone=victoryZones.map(e=>e.width*e.height);
		for(var it in areaofzone){
			if(areaofzone[it-1])areaofzone[it]+=areaofzone[it-1];
		}
		var sum=victoryZones.map(e=>e.width*e.height).reduce((e,t)=>(e+t));
		for(var i=0;i<(totalPellets==25?(isVictory?250:25):totalPellets);i++){
			var rand=Math.random()*sum;
			var randZone=victoryZones[areaofzone.map(e=>(rand<e)).indexOf(true)];
			var left=randZone.x;
			var right=randZone.x+randZone.width;
			var bottom=randZone.y+randZone.height;
			var top=randZone.y;
			var pellet=new PelletEntity(Math.random()*(randZone.width-16)+randZone.x+8,Math.random()*(randZone.height-16)+randZone.y+8,8,boundary);
			pellet.collision();
			map.areas[area].entities.push(pellet);
		}
	}
	var quicksandDir=Math.floor(Math.random()*4)*90;
	function prop(spawner,e){
		return spawner[e]??defaultValues.spawner[e]
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
				var auraColor=auraColors[type];
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
							entity=new SimulatorEntity(enemyX,enemyY,enemyConfig[type.replace("fake_","") + "_enemy"].color,radius,type,speed,angle,prop(spawner,`${type}_radius`),auraColor,boundary);entity.isEnemy=true
						}catch(e){
							entity=new NormalEnemy(enemyX,enemyY,radius,speed,angle,boundary);
						}
					};break;
					//72 implemented
					case "experience_drain":
					case "blocking":
					case "slippery":
					case "barrier":
					case "radar":
					case "draining":
					case "slowing":
					case "magnetic_reduction":
					case "magnetic_nullification":
					case "freezing":
					case "lava":
					case "toxic":
					case "enlarging":
					case "disabling":
					case "reducing":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),boundary);break;
					case "gravity":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"gravity"),boundary);break;
					case "repelling":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,"repulsion"),boundary);break;
					case "quicksand":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,`${type}_radius`),prop(spawner,`push_direction`)??quicksandDir,prop(spawner,`quicksand_strength`),boundary);break;
					case "turning":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"circle_size"),boundary);break;
					case "liquid":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"player_detection_radius"),boundary);break;
					case "switch":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"switch_interval"),boundary);break;
					case "icicle":entity=new instance(enemyX,enemyY,radius,speed,prop(spawner,"horizontal"),boundary);break;
					case "radiating_bullets":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"release_interval"),prop(spawner,"release_time"),boundary);break;
					case "wall":entity=new instance(radius,speed,boundary,j,prop(spawner,"count"),void 0,prop(spawner,"move_clockwise"));break;
					case "speed_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"speed_loss"),boundary);break;
					case "wind_ghost":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"ignore_invulnerability"),boundary);break;
					case "grass":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"powered"),boundary);break;
					case "fake_pumpkin":entity=new PumpkinEnemy(enemyX,enemyY,radius,speed,angle,boundary,true);break;
					case "regen_sniper":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"regen_loss"),boundary);break;
					case "seedling":
					case "residue":
					case "sand":
					case "sandrock":
					case "fire_trail":
					case "normal":
					case "wavy":
					case "immune":
					case "sniper":
					case "speed_ghost":
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
					case "homing":
					case "teleporting":
					case "star":
					case "oscillating":
					case "zigzag":
					case "zoning":
					case "sizing":
					case "spiral":
					//case "snowman":
					case "crumbling":
					case "pumpkin":
					case "glowy":
					case "firefly":
					case "phantom":
					case "mist":entity=new instance(enemyX,enemyY,radius,speed,angle,boundary);break;
					//NOT VANILLA
					case "rotor":entity=new instance(enemyX,enemyY,radius,speed,angle,prop(spawner,"rotor_branch_count"),prop(spawner,"rotor_node_count"),prop(spawner,"rotor_node_radius"),prop(spawner,"rotor_rot_speed"),prop(spawner,"rotor_reversed"),prop(spawner,"rotor_branch_offset"),prop(spawner,"rotor_node_dist"),prop(spawner,"rotor_branch_dist"),prop(spawner,"rotor_offset_per_layer"),prop(spawner,"rotor_layer_reverse_interval"),prop(spawner,"rotor_corrosive"),boundary);break;
				};entity.collision();map.areas[area].entities.push(entity);
			}
		}
	}
	if(isNaN(map.areas[area].entities.filter(e=>(isNaN(e.x)||isNaN(e.y))).length)){return spawnEntities();}
}
//rect and circle collision
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
var verifiedEntities=[
  "wall","normal","homing","dasher"
];
class SimulatedPlayer{
  constructor(x,y,color,username=nickname.value||"Local Player") {
    this.x=x;
    this.y=y;
this.onTele=true;
this.effects=[];
this.oldPos={x:this.x,y:this.y};
this.previousPos={x:this.x,y:this.y};
    this.velX=0;
	this.isPlayer=true;
    this.heroType=0;
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
this.effects=[];
this.regionHighestAreaAchieved=0;
this.winCount=0;
this.rescuedCount=0;
this.survivalTime=0;
this.hatName=null;
this.bodyName=null;
this.gemName=null;
this.isIced=false;
this.icedTime=1000;
this.icedTimeLeft=1000;
this.isSnowballed=false;
this.snowballedTime=2500;
this.snowballedTimeLeft=2500;
this.isDeparted=false;
this.magnetDirection="DOWN";
this.abilityOne={abilityType:1};
this.abilityTwo={abilityType:18};
this.abilityThree={abilityType:98};
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
this.inputAngle=0;
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
this.playerInteractions=false;
this.achievementCount=0;
this.underLibotEffect=false;
this.underDabotEffect=false;
this.isLead=false;
this.leadTime=3500;
this.ictosInvulnerability=false;
this.quicksand=[0,0,5];
this.continuousRevive=false;
this.continuousReviveTime=0;
this.continuousReviveTimeLeft=0;
    this.deathTimerTotal=0;
    this.color=color;
    this.name=username;
	this.isCent=false;
	this.flashlight=false;
	this.chronoPos=[];
this.distance_moved_previously = [0,0];
    this.speed=5;
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
		this.bodyImage = null,
		this.hatImage = null,
		this.gemImage = null,
		this.lightRadius = 50,
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
  }
  onCollide(){
    
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
		case 0:{
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
		case 1:{
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
		case 2:{
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.x+=Math.cos(this.inputAngle)*abilityLevels[ability.level-1]?.distance;
				this.y+=Math.sin(this.inputAngle)*abilityLevels[ability.level-1]?.distance;
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
		case 14:{
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
		case 18:{
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
		case 31:{
			for(var entity of map.areas[this.area].entities){
				if(entity.isEnemy&&this.distance(this,entity)<abilityConfig[ability.abilityType].radius&&!entity.immune){
					entity.speedMultiplier*=abilityLevels[ability.level-1]?.slow;
					entity.decayed=true;
				}
			}
		};break;
		case 96:{
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
				this.flashlight=true;
			}
			if(!abilityActive&&finalTrigger&&ability.cooldown==0){
				this.flashlight=false;
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 98:{
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.magnetDirection="UP";
				abilityActive=false;
				switch(kind){
					case 1:{
						this.firstAbilityActivated=false;
						this.abilityOne.abilityType=99;
						this.abilityOne.name=abilityConfig[this.abilityOne.abilityType].name;
					}break;
					case 2:{
						this.secondAbilityActivated=false;
						this.abilityTwo.abilityType=99;
						this.abilityTwo.name=abilityConfig[this.abilityTwo.abilityType].name;
					}break;
					case 3:{
						this.thirdAbilityActivated=false;
						this.abilityThree.abilityType=99;
						this.abilityThree.name=abilityConfig[this.abilityThree.abilityType].name;
					}break;
				}
				ability.cooldown=abilityLevels[ability.level-1]?.total_cooldown??ability.totalCooldown;
			}
		};break;
		case 99:{
			if(ability.continuous&&abilityActive&&ability.cooldown==0){
			}else if(!ability.continuous&&abilityActive&&ability.cooldown==0&&this.energy>=ability.energyCost){
				this.energy-=ability.energyCost;
				this.magnetDirection="DOWN";
				abilityActive=false;
				switch(kind){
					case 1:{
						this.firstAbilityActivated=false;
						this.abilityOne.abilityType=98;
						this.abilityOne.name=abilityConfig[this.abilityOne.abilityType].name;
					}break;
					case 2:{
						this.secondAbilityActivated=false;
						this.abilityTwo.abilityType=98;
						this.abilityTwo.name=abilityConfig[this.abilityTwo.abilityType].name;
					}break;
					case 3:{
						this.thirdAbilityActivated=false;
						this.abilityThree.abilityType=98;
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
	cent&&console.log(cent);
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
		  this.flashlight=false;
		  this.lantern=false;
		  this.abilityOne.abilityType!=18&&(this.firstAbilityActivated=false);
		  this.abilityTwo.abilityType!=18&&(this.secondAbilityActivated=false);
		  this.abilityThree?.abilityType!=18&&(this.thirdAbilityActivated=false);
	  }
	if(this.firstAbilityActivated&&ab1.abilityType==0||this.secondAbilityActivated&&ab2.abilityType==0||this.thirdAbilityActivated&&ab3.abilityType==0)flow=true;
	if(this.firstAbilityActivated&&ab1.abilityType==1||this.secondAbilityActivated&&ab2.abilityType==1||this.thirdAbilityActivated&&ab3.abilityType==1)harden=true;
	this.energyRate=this.energyRegen+this.regenAdditioner;
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
          if (this.speed < 17 && this.upgradePoints > 0) {
            this.speed += 0.5;
            this.upgradePoints--;
            if(this.speed > 17){this.speed = 17;}
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
        this.distance_movement = (this.speed*this.speedMultiplier)+this.speedAdditioner;
        this.mouseActive = false;
          if (input.isMouse&&!this.cent_is_moving&&!this.isMovementKeyPressed(input)) {
            this.mouse_distance_full_strength = 150*settings.scale;
            this.mouseActive = true;
            if(this.slippery){this.mouse_distance_full_strength = 1;}

            if(!cent || (cent && this.cent_input_ready)){

              if(cent){
                this.cent_input_ready = false;
                this.cent_is_moving = true;
                this.cent_accelerating = true; 
                this.mouse_distance_full_strength = 1;
              }

              this.dirX = Math.round(input.mouse.x - width / 2);
              this.dirY = Math.round(input.mouse.y - height / 2);
              this.dist = distance(new Vector(0, 0), new Vector(this.dirX, this.dirY));

              if (this.dist > this.mouse_distance_full_strength) {
                this.dirX *= this.mouse_distance_full_strength / this.dist;
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

            if(!cent){this.vel.x = this.dirX * this.speed / this.mouse_distance_full_strength;
            this.addX = this.dirX * this.speedAdditioner/this.mouse_distance_full_strength;
            this.addY = this.dirY * this.speedAdditioner/this.mouse_distance_full_strength;
            if(!this.magnet||this.magnet&&this.safeZone){if(this.vertSpeed==-1){this.vel.y = this.dirY * this.speed / this.mouse_distance_full_strength;}else{this.vel.y = this.dirY * this.vertSpeed / this.mouse_distance_full_strength;}} 
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
        this.input_angle = Math.atan2(this.dirY,this.dirX)
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
let timeFix=delta/(1e3/30);
	  var cent=this.isCent;
	  if(this.isLead)cent=!cent;
this.chronoPos.push([this.x,this.y,this.deathTimer]);
this.chronoPos=this.chronoPos.slice(-Math.round(75/timeFix))
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
      if (this.slowing) {
        this.speedMultiplier *= (1-this.effectImmune*(1-0.7))*this.effectReplayer;
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
    this.radius = this.defaultRadius;
	var velY=this.velY;
    if((
	map.properties?.magnetism||
	map.properties?.partial_magnetism||
	map.areas[this.area].properties?.magnetism||
	map.areas[this.area].properties?.partial_magnetism
	)&&this.pointInActiveZone){
		var isPartial=Boolean(map.properties?.partial_magnetism)||Boolean(map.areas[this.area].properties?.partial_magnetism);
      var magneticSpeed = (this.vertSpeed == -1) ? ((isPartial?(this.speed/2):10)/(this.magneticReduction+1)*(!this.magneticNullification)) : this.vertSpeed;
      if(this.magnetDirection.toLowerCase() == "down"){this.y += (magneticSpeed+this.d_y*isPartial*(!this.magneticNullification&&!this.isDowned()))*timeFix}
      else if(this.magnetDirection.toLowerCase() == "up"){this.y += (-magneticSpeed+this.d_y*isPartial*(!this.magneticNullification&&!this.isDowned()))*timeFix}
    }
    if(this.radiusAdditioner!=0){this.radius+=this.radiusAdditioner}
    this.radius *= this.radiusMultiplier;
    this.radiusMultiplier = 1;
    this.radiusAdditioner = 0;
    this.wasFrozen = this.isIced;
    if (this.isIced) {
      this.icedTimeLeft -= delta;
    }
    if (this.icedTimeLeft <= 0) {
      this.isIced = false;
      this.icedTimeLeft = 1000;
    }
	if(this.isLead){
	  this.leadTime-=delta;
	}
	if(this.leadTime<=0){
	  this.isLead=false;
	  this.leadTime=3500;
	}

    if(this.speedghost){
      this.speed-=(0.1*this.effectImmune)/this.effectReplayer*timeFix;
      this.statSpeed-=(0.1*this.effectImmune)/this.effectReplayer*timeFix;
      if(this.speed < 5){this.speed = 5;}
      if(this.statSpeed < 5){this.statSpeed = 5;}
    }

    if(this.regenghost){
      this.energyRegen-=(0.04*this.effectImmune)/this.effectReplayer*timeFix;
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
	  if(this.reducingTime>2e3){
		this.reducingTime=2e3;
		death(this);
	  }
	  this.radiusMultiplier*=1-this.reducingTime/2e3;
    }

    if(this.quicksand[0]&&!this.invulnerable){
      this.x += Math.cos(this.quicksand[1] * (Math.PI/180)) * this.quicksand[2] * timeFix;
      this.y += Math.sin(this.quicksand[1] * (Math.PI/180)) * this.quicksand[2] * timeFix;
      this.quicksand[0] = false;
    }

    this.energy += this.energyRate * delta / 1000;
    if (this.energy > this.maxEnergy) {
      this.energy = this.maxEnergy;
    }
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

    this.slide_x *= 1-((1-friction_factor)*timeFix);
    this.slide_y *= 1-((1-friction_factor)*timeFix);

	this.d_x*=timeFix;
	this.d_y*=timeFix;
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
	evadesRenderer.heroInfoCard.abilityOne.disabled=this.disabling;
	evadesRenderer.heroInfoCard.abilityTwo.disabled=this.disabling;
	evadesRenderer.heroInfoCard.abilityThree.disabled=this.disabling;
	this.enemyEffects=[
		this.slowing,this.freezing,this.toxic,this.experienceDraining,
		this.reducing,this.enlarging,this.draining,this.lava,this.slippery,
		this.disabling,this.inEnemyBarrier,this.magneticReduction,this.magneticNullification,
	]
    this.slowing = false;
    this.freezing = false;
    this.web = false;
    this.cobweb = false;
    this.sticky = false;
	this.toxic=false;
	this.experienceDraining=false;
	this.reducing = false;
	this.enlarging = false;
    this.draining = false;
    this.lava = false;
    this.speedghost = false;
    this.regenghost = false;
    this.inEnemyBarrier=false;
    this.slippery = false;
    this.tempColor=this.color;
    this.disabling=false;
    var vel;
		var isMagnet=Boolean(map.properties?.magnetism)||Boolean(map.properties?.partial_magnetism)||Boolean(map.areas[this.area].properties?.magnetism)||Boolean(map.areas[this.area].properties?.partial_magnetism);
		var isPartial=Boolean(map.properties?.partial_magnetism)||Boolean(map.areas[this.area].properties?.partial_magnetism);
      var magneticSpeed = (this.vertSpeed == -1) ? ((isPartial?(this.speed/2):10)/(this.magneticReduction+1)*(!this.magneticNullification)) : this.vertSpeed;
    var yaxis = (this.velY>=0)?1:-1;
    if(!isMagnet){magneticSpeed*=yaxis;}
    if(this.magnetDirection.toLowerCase() == "up"){magneticSpeed=-magneticSpeed}
    if((isMagnet||this.vertSpeed != -1)&&this.pointInActiveZone){vel = {x:this.velX, y:this.velY*this.magneticNullification};}
    else{vel = {x:this.velX, y:this.velY};}
    this.vertSpeed = -1;
	this.magneticReduction=false;
	this.magneticNullification=false;
    if (!this.wasFrozen&&!this.isDowned()) {
      this.x += vel.x * timeFix;
      this.y += vel.y * timeFix;
    }
    if(this.isIced&&isMagnet){this.y += vel.y * timeFix;}
    this.speedMultiplier = 1;
    this.speedAdditioner = 0;
    this.regenAdditioner = 0;
    if(this.deathTimer!=-1){
      this.deathTimer-=delta;
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
		  this.chronoPos=[];
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
          }
        }
      }
          this.onTele=onTele;
          area=map.areas[this.area];
this.areaNumber=this.area+1;
this.regionName=map.name;
this.collides=this.collision();
    if(this.deathTimer<=delta&&this.deathTimer>=0){
      map.players.splice(map.players.indexOf(this));
    }
	}
	renderEffects(e,ctxL,delta){
        var rt = ctxL.createRadialGradient(
          canvas.width / 2 + (this.x - camX) * camScale, 
          canvas.height / 2 + (this.y - camY) * camScale, 0, 
          canvas.width / 2 + (this.x - camX) * camScale, 
          canvas.height / 2 + (this.y - camY) * camScale, this.lightRadius * camScale);
          rt.addColorStop(0, "rgba(0, 0, 0, 1)"),
          rt.addColorStop(1, "rgba(0, 0, 0, 0)"),
          ctxL.beginPath(),
          ctxL.arc(canvas.width / 2 + (this.x - camX) * camScale, canvas.height / 2 + (this.y - camY) * camScale, this.lightRadius * camScale, 0, 2 * Math.PI, !1),
          ctxL.fillStyle = rt,
          ctxL.closePath(),
          ctxL.fill()
		  if(this.flashlight){
			var ds = ctxL.createRadialGradient(
			  canvas.width / 2 + (this.x - camX) * camScale, 
			  canvas.height / 2 + (this.y - camY) * camScale,0, 
			  canvas.width / 2 + (this.x - camX) * camScale, 
			  canvas.height / 2 + (this.y - camY) * camScale,
			  flashlightLightSource.distance * camScale);
			ds.addColorStop(0, "rgba(0, 0, 0, 1)"),
			ds.addColorStop(1, "rgba(0, 0, 0, 0)"),
			ctxL.beginPath(),
			ctxL.moveTo(canvas.width / 2 + (this.x - camX) * camScale, canvas.height / 2 + (this.y - camY) * camScale),
			ctxL.lineTo(canvas.width / 2 + (this.x - camX) * camScale + flashlightLightSource.distance * Math.cos(this.lastAngle*Math.PI/180 - flashlightLightSource.innerAngle / 2) * camScale, canvas.height / 2 + (this.y - camY) * camScale + flashlightLightSource.distance * Math.sin(this.lastAngle*Math.PI/180 - flashlightLightSource.innerAngle / 2) * camScale),
			ctxL.arc(canvas.width / 2 + (this.x - camX) * camScale, canvas.height / 2 + (this.y - camY) * camScale, flashlightLightSource.distance * camScale, flashlightLightSource.directionAngle - flashlightLightSource.innerAngle / 2, flashlightLightSource.directionAngle + flashlightLightSource.innerAngle / 2, !1),
			ctxL.lineTo(canvas.width / 2 + (this.x - camX) * camScale, canvas.height / 2 + (this.y - camY) * camScale),
			ctxL.fillStyle = ds,
			ctxL.closePath(),
		  ctxL.fill()}
	}
	render(e,ctxL,delta) {
		const a = {x:0,y:0};
		this.fullMapOpacity=this.area==evadesRenderer?.minimap?.self?.entity?.area;
		if (this.area!=evadesRenderer?.minimap?.self?.entity?.area)
			return;
		var rotationSpeed = 15;
		
      if(this.inputAngle<0){this.inputAngle+=360}
      if(this.inputAngle>=360){this.inputAngle-=360}
      var distanceOne = this.inputAngle - Math.abs(this.lastAngle);
      if(this.lastAngle<=this.inputAngle+rotationSpeed*delta/(1e3/30)&&this.lastAngle>=this.inputAngle-rotationSpeed*delta/(1e3/30)){}
      else if(distanceOne<-180){this.lastAngle+=rotationSpeed*delta/(1e3/30);}
      else if(distanceOne>=180){this.lastAngle-=rotationSpeed*delta/(1e3/30);}
      else if(distanceOne<0){this.lastAngle-=rotationSpeed*delta/(1e3/30);}
      else if(distanceOne>0){this.lastAngle+=rotationSpeed*delta/(1e3/30);}
      if(this.lastAngle>=360)this.lastAngle-=360;
      if(this.lastAngle<0)this.lastAngle+=360;
      if(this.lastAngle<=this.inputAngle+rotationSpeed*delta/(1e3/30)&&this.lastAngle>=this.inputAngle-rotationSpeed*delta/(1e3/30)){this.lastAngle = this.inputAngle}
		var flashlightLightSource={
			x: this.x,
			y: this.y,
			centerDistance: this.radius,
			directionAngle: this.lastAngle*Math.PI/180,
			innerAngle: 35*Math.PI/180,
			distance: 500
		};
		localStorage.getItem("confetti")&& this.isDowned() ? (this.drawnConfetti || (this.makeConfetti(),
		this.drawnConfetti = !0),
		this.animateConfetti(),
		this.drawConfetti(e, a)) : this.drawnConfetti && (this.drawnConfetti = !1);
		const t = this.x + a.x
		  , r = this.y + a.y;
		function c(a, c, o, n=0) {
			e.beginPath(),
			e.arc(t + a, r + c, o, 0, 2 * Math.PI, !1),
			n > 0 && e.arc(t + a, r + c, n, 0, 2 * Math.PI, !0),
			e.fill(),
			e.closePath()
		}
		function o(e, a, t) {
			c(e, a, t / 2),
			c(e, -a, t / 2),
			c(-e, a, t / 2),
			c(-e, -a, t / 2)
		}
		let n = 1;
		const $ = this.isDowned() && !this.rescueable && !this.isEmber;
		$ && (n = this.deathTimer / this.deathTimerTotal);
		const d = this.getColor();
		if ($ && (e.globalAlpha = n),
		"sticky-coat" === this.bodyName && !this.isDeparted) {
			const a = this.radius + ("sticky-coat" === this.bodyName ? 5 : 1);
			e.beginPath(),
			e.arc(t, r, a, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(0, 199, 0, 0.6)",
			e.fill(),
			e.closePath()
		}
		if ("toxic-coat" === this.bodyName && !this.isDeparted) {
			const a = this.radius + ("toxic-coat" === this.bodyName ? 5 : 1);
			e.beginPath(),
			e.arc(t, r, a, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(77, 1, 99, 0.6)",
			e.fill(),
			e.closePath()
		}
		if ((this.isBandaged || this.isUnbandaging) && !this.isDeparted) {
			const a = this.radius + (this.isBandaged ? 3 : 1);
			e.beginPath(),
			e.arc(t, r, a, 0, 2 * Math.PI, !1),
			e.fillStyle = "#dedabe",
			e.fill(),
			e.closePath(),
			this.isUnbandaging || (e.strokeStyle = "#aaa791",
			e.stroke())
		}
		if (this.isStickyCoatActivated && 1 === this.stickyCoatDisabled) {
			const a = this.radius + (this.isStickyCoatActivated ? 20 : 1);
			e.beginPath(),
			e.arc(t, r, a, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(0, 199, 0, 0.2)",
			e.fill(),
			e.closePath()
		}
		if (this.ictosInvulnerability) {
			const a = this.radius + 5;
			e.beginPath(),
			e.arc(t, r, a, 0, 2 * Math.PI, !1),
			e.fillStyle = "rgba(231, 175, 218, 0.5)",
			e.fill(),
			e.closePath()
		}
		const i = 1e3 / 30;
		if (this.mortarTime > 3e3)
			e.fillStyle = d,
			this.mortarTime % !0 ? c(1, 1, this.radius) : this.mortarTime % !0 ? c(1, -1, this.radius) : this.mortarTime % !0 ? c(-1, 1, this.radius) : c(-1, -1, this.radius);
		else if (this.mortarTime < 3e3 && this.mortarTime > 0)
			e.fillStyle = "rgba(75, 60, 60, 0.6)",
			this.mortarTime > 3e3 - i ? o(5, 5, this.radius) : this.mortarTime > 3e3 - 2 * i ? o(30, 30, this.radius) : this.mortarTime > 2900 ? o(50, 50, this.radius) : this.mortarTime > 3e3 - 4 * i ? o(65, 65, this.radius) : this.mortarTime > 3e3 - 5 * i ? o(75, 75, this.radius) : o(Math.floor(this.mortarTime / 3e3 * 75), Math.floor(this.mortarTime / 3e3 * 75), this.radius);
		else {
			e.fillStyle = d;
			let a = 0;
			"doughnut" === this.bodyName && (a = .2 * this.radius),
			c(0, 0, this.radius, a)
		}
		e.globalAlpha = 1,
		this.renderIcedEffect(e, t, r),
		this.renderSnowballedEffect(e, t, r),
		this.renderPoisonedEffect(e, t, r),
		this.renderCrumbledInvulnerabilityEffect(e, t, r),
		this.renderShadowedInvulnerabilityEffect(e, t, r),
		this.renderLeadEffect(e, t, r),
		this.renderContinuousReviveEffect(e, t, r),
		this.renderAccessory(e, t, r);
		let s = "blue"
		  , f = "rgb(68, 118, 255)"
		  , l = this.energy / this.maxEnergy;
		if (this.energy > this.maxEnergy && (l = 1),
		this.energy < 0 && (l = 0),
		this.energized && (s = "rgb(255, 255, 0)",
		f = "rgb(211, 211, 0)"),
		this.sweetToothConsumed && (s = "rgb(255, 43, 143)",
		f = "rgb(212, 0, 100)"),
		this.energized && this.sweetToothConsumed && (s = "rgb(255, 43, 143)",
		f = "rgb(212, 0, 100)"),
		$ && (e.globalAlpha = n),
		!this.isDeparted) {
			if (e.fillStyle = s,
			e.fillRect(t - 18, r - this.radius - 8, 36 * l, 7),
			e.strokeStyle = f,
			e.strokeRect(t - 18, r - this.radius - 8, 36, 7),
			e.font = "12px Tah",
			e.textAlign = "center",
			e.fillStyle = "black",
			e.fillText(this.name, t, r - this.radius - 11),
			this.magnetized && (e.beginPath(),
			e.arc(t + 25, r - this.radius - 5, 3.5, 0, 2 * Math.PI, !1),
			e.strokeStyle = "rgb(149, 124, 0)",
			e.fillStyle = "rgb(210, 190, 90)",
			e.lineWidth = 2,
			e.fill(),
			e.stroke(),
			e.lineWidth = 1,
			e.closePath()),
			this.underLibotEffect) {
				const a = 10
				  , c = 10
				  , o = t - 30
				  , n = r - this.radius - 9;
				e.beginPath(),
				e.moveTo(o + a, n),
				e.lineTo(o + a / 2, n + c),
				e.lineTo(o, n),
				e.closePath(),
				e.fillStyle = "rgb(255, 250, 189)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			if (this.underDabotEffect) {
				const a = 10
				  , c = 10
				  , o = t - 30
				  , n = r - this.radius - 9;
				e.beginPath(),
				e.moveTo(o + a, n),
				e.lineTo(o + a / 2, n + c),
				e.lineTo(o, n),
				e.closePath(),
				e.fillStyle = "rgb(61, 0, 110)",
				e.fill(),
				e.strokeStyle = "rgb(0, 0, 0)",
				e.lineWidth = 1,
				e.stroke()
			}
			this.cybotDefeated && (this.hasWindDebuff ? (e.strokeStyle = "rgb(0, 133, 97)",
			e.fillStyle = "rgb(0, 181, 133)",
			e.fillRect(t + 32, r - this.radius - 2.5, 7, 7),
			e.strokeRect(t + 32, r - this.radius - 2.5, 7, 7)) : (e.strokeStyle = "rgba(0, 133, 97, 0.3)",
			e.fillStyle = "rgba(0, 181, 133, 0.3)",
			e.fillRect(t + 32, r - this.radius - 2.5, 7, 7),
			e.strokeRect(t + 32, r - this.radius - 2.5, 7, 7)),
			this.hasWaterDebuff ? (e.strokeStyle = "rgb(32, 103, 117)",
			e.fillStyle = "rgb(49, 155, 176)",
			e.fillRect(t + 43, r - this.radius - 2.5, 7, 7),
			e.strokeRect(t + 43, r - this.radius - 2.5, 7, 7)) : (e.strokeStyle = "rgba(32, 103, 117, 0.3)",
			e.fillStyle = "rgba(49, 155, 176, 0.3)",
			e.fillRect(t + 43, r - this.radius - 2.5, 7, 7),
			e.strokeRect(t + 43, r - this.radius - 2.5, 7, 7)),
			this.hasFireDebuff ? (e.strokeStyle = "rgb(179, 101, 5)",
			e.fillStyle = "rgb(232, 132, 9)",
			e.fillRect(t + 43, r - this.radius - 13.5, 7, 7),
			e.strokeRect(t + 43, r - this.radius - 13.5, 7, 7)) : (e.strokeStyle = "rgba(179, 101, 5, 0.3)",
			e.fillStyle = "rgba(232, 132, 9, 0.3)",
			e.fillRect(t + 43, r - this.radius - 13.5, 7, 7),
			e.strokeRect(t + 43, r - this.radius - 13.5, 7, 7)),
			this.hasEarthDebuff ? (e.strokeStyle = "rgb(125, 82, 35)",
			e.fillStyle = "rgb(176, 115, 49)",
			e.fillRect(t + 32, r - this.radius - 13.5, 7, 7),
			e.strokeRect(t + 32, r - this.radius - 13.5, 7, 7)) : (e.strokeStyle = "rgba(125, 82, 35, 0.3)",
			e.fillStyle = "rgba(176, 115, 49, 0.3)",
			e.fillRect(t + 32, r - this.radius - 13.5, 7, 7),
			e.strokeRect(t + 32, r - this.radius - 13.5, 7, 7)))
		}
		e.globalAlpha = 1,
		this.isDowned() && !$ && (e.font = `16px Tah`,
		e.textAlign = "center",
		e.fillStyle = "red",
		e.fillText((this.deathTimer / 1e3).toFixed(0), t, r + 6))
	}
	renderLeadEffect(e, a, t) {
		if (!this.isLead)
			return;
		const r = (3500 - this.leadTime) / 3500;
		e.globalAlpha = .75 - .75 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .75) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(33, 33, 39)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderIcedEffect(e, a, t) {
		if (!this.isIced)
			return;
		const r = (this.icedTime - this.icedTimeLeft) / this.icedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		4e3 === this.electrifyInterval ? e.fillStyle = "rgb(176, 73, 0)" : e.fillStyle = "rgb(137, 231, 255)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderSnowballedEffect(e, a, t) {
		if (!this.isSnowballed)
			return;
		const r = (this.snowballedTime - this.snowballedTimeLeft) / this.snowballedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(191, 0, 255)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderPoisonedEffect(e, a, t) {
		if (!this.isPoisoned)
			return;
		const r = (this.poisonedTime - this.poisonedTimeLeft) / this.poisonedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(83, 13, 105)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderCrumbledInvulnerabilityEffect(e, a, t) {
		if (!this.crumbledInvulnerability)
			return;
		const r = (this.crumbledTime - this.crumbledTimeLeft) / this.crumbledTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(49, 43, 30)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderShadowedInvulnerabilityEffect(e, a, t) {
		if (!this.shadowedInvulnerability)
			return;
		const r = (this.shadowedTime - this.shadowedTimeLeft) / this.shadowedTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(0, 0, 0)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderContinuousReviveEffect(e, a, t) {
		if (!this.continuousRevive)
			return;
		const r = (this.continuousReviveTime - this.continuousReviveTimeLeft) / this.continuousReviveTime;
		e.globalAlpha = .7 - .7 * r,
		(e.globalAlpha < 0 || e.globalAlpha > .7) && (e.globalAlpha = 0),
		e.beginPath(),
		e.arc(a, t, this.radius, 0, 2 * Math.PI, !1),
		e.fillStyle = "rgb(255, 255, 255)",
		e.fill(),
		e.closePath(),
		e.globalAlpha = 1
	}
	renderAccessory(e, a, t) {
		if (void 0 === this.hatName && void 0 === this.bodyName || this.isDeparted)
			return;
		this.bodyName && this.bodyName != this.storedBodyName && (this.bodyImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("cosmetics/" + this.bodyName),
		this.storedBodyName = this.bodyName),
		this.hatName && this.hatName != this.storedHatName && (this.hatImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("cosmetics/" + this.hatName),
		this.storedHatName = this.hatName);
		let r = 0
		  , c = 0;
		"one-winged-angel" === this.bodyName && (r = -10,
		c = -7);
		const o = ()=>e.drawImage(this.bodyImage.getImage(), a + r - 5 * this.radius / 3, t + c - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3)
		  , n = ()=>e.drawImage(this.hatImage.getImage(), a - 5 * this.radius / 3 + 0, t - 5 * this.radius / 3 + 0, 10 * this.radius / 3, 10 * this.radius / 3)
		  , $ = ()=>{
			if (!this.hatName || !this.hatName.endsWith("-crown"))
				return;
			const r = [1e4, 7500, 5e3, 3500, 2500, 2e3, 1500, 1e3, 750, 500, 250, 100, 50];
			(r=>{
				null !== r && (null === this.gemImage && (this.gemImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("accessories/" + r.toString() + "-gem")),
				e.drawImage(this.gemImage.getImage(), a - 5 * this.radius / 3, t - 5 * this.radius / 3, 10 * this.radius / 3, 10 * this.radius / 3))
			}
			)((e=>{
				if (this.gemName)
					return r.includes(parseInt(this.gemName)) ? this.gemName : null;
				if (e < r[r.length - 1])
					return null;
				for (const a of r)
					if (e >= a)
						return a
			}
			)(this.winCount))
		}
		;
		this.isDowned() && this.rescueable ? (e.globalAlpha = .4,
		this.bodyName && !this.bodyName.endsWith("-coat") && o(),
		this.hatName && n(),
		$(),
		e.globalAlpha = 1) : (this.bodyName && !this.bodyName.endsWith("-coat") && o(),
		this.hatName && n(),
		$())
	}
	isDowned() {
		return -1 !== this.deathTimer
	}
	getColor() {
		function $hexToRgb(e) {
			const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
			return a ? {
				r: parseInt(a[1], 16),
				g: parseInt(a[2], 16),
				b: parseInt(a[3], 16)
			} : null
		}
		let e = this.color;
		const a = this.isDowned() && !this.rescueable && !this.isEmber;
		if (this.isDowned() && !a) {
			const a = $hexToRgb(e);
			e = `rgba(${a.r}, ${a.g}, ${a.b}, 0.4)`
		} else if (this.nightActivated) {
			const a = $hexToRgb(e);
			e = `rgba(${a.r}, ${a.g}, ${a.b}, 0.6)`
		} else if (this.isDeparted) {
			const a = $hexToRgb(e);
			e = `rgba(${a.r}, ${a.g}, ${a.b}, 0)`
		} else
			this.isStone ? e = "rgba(145, 142, 133, 1)" : this.fusionActivated ? e = "rgba(60, 60, 75, 1)" : this.sugarRushActivated ? e = "rgba(230, 103, 164, 1)" : this.isObscured ? e = "rgba(0, 8, 96, 1)" : this.isEmber ? e = "rgba(87, 36, 16, 1)" : this.isWormhole ? e = "rgba(204, 194, 0, 1)" : 1 === this.roboScannerId ? e = "rgba(255, 0, 0, 1)" : 2 === this.roboScannerId ? e = "rgba(0, 0, 255, 1)" : 3 === this.roboScannerId ? e = "rgba(120, 20, 140, 1)" : 4 === this.roboScannerId ? e = "rgba(123, 157, 178, 1)" : 5 === this.roboScannerId ? e = "rgba(100, 193, 185, 1)" : 6 === this.roboScannerId ? e = "rgba(33, 161, 165, 1)" : 7 === this.roboScannerId ? e = "rgba(168, 124, 134, 1)" : 8 === this.roboScannerId ? e = "rgba(77, 1, 99, 1)" : 9 === this.roboScannerId ? e = "rgba(0, 199, 0, 1)" : 10 === this.roboScannerId ? e = "rgba(189, 103, 210, 1)" : 11 === this.roboScannerId ? e = "rgba(100, 35, 116, 1)" : 12 === this.roboScannerId ? e = "rgba(247, 131, 6, 1)" : 13 === this.roboScannerId ? e = "rgba(108, 84, 30, 1)" : 14 === this.roboScannerId ? e = "rgba(201, 0, 0, 1)" : 15 === this.roboScannerId ? e = "rgba(41, 255, 198, 1)" : 16 === this.roboScannerId ? e = "rgba(160, 83, 83, 1)" : 17 === this.roboScannerId ? e = "rgba(131, 0, 255, 1)" : 18 === this.roboScannerId ? e = "rgba(255, 144, 0, 1)" : 19 === this.roboScannerId ? e = "rgba(0, 204, 142, 1)" : 20 === this.roboScannerId ? e = "rgba(211, 19, 79, 1)" : 21 === this.roboScannerId ? e = "rgba(78, 39, 0, 1)" : 22 === this.roboScannerId ? e = "rgba(97, 255, 97, 1)" : 23 === this.roboScannerId ? e = "rgba(140, 1, 183, 1)" : 24 === this.roboScannerId ? e = "rgba(255, 56, 82, 1)" : 25 === this.roboScannerId ? e = "rgba(164, 150, 255, 1)" : 26 === this.roboScannerId ? e = "rgba(157, 227, 198, 1)" : 27 === this.roboScannerId ? e = "rgba(160, 83, 114, 1)" : 28 === this.roboScannerId ? e = "rgba(120, 136, 152, 1)" : 29 === this.roboScannerId && (e = "rgba(45, 50, 55, 1)");
		/*for (const a of this.getEffectConfigs())
			if (null !== a.fillColor && a.internal) {
				e = a.fillColor;
				break
			}*/
		return e
	}
	makeConfetti() {
		for (let e = 0; e < this.randomIntRange(50, 150) && !($9bc26d320fe964d6$var$totalConfettiRendered >= $9bc26d320fe964d6$var$MaxConfettiRendered); e++)
			this.addConfetti(),
			$9bc26d320fe964d6$var$totalConfettiRendered++
	}
	addConfetti() {
		const e = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#cc7d60", "#b45c5c", "#397991"]
		  , a = e[this.randomIntRange(0, e.length - 1)]
		  , t = this.randomRange(this.x - 10, this.x + 10)
		  , r = this.randomRange(this.y - 50, this.y);
		this.confetti.push({
			x: t,
			y: r,
			size: this.randomIntRange(2, 8),
			color: a,
			initialY: r,
			vx: this.randomRange(-2.5, 2.5),
			vy: this.randomRange(-5, -.8)
		})
	}
	animateConfetti() {
		for (let e = 0; e < this.confetti.length; e++) {
			const a = this.confetti[e];
			a.x += a.vx,
			a.y += a.vy,
			a.vx += this.randomRange(-.1, .1),
			a.vy += .35,
			a.y >= a.initialY + 100 && (this.confetti.splice(e, 1),
			$9bc26d320fe964d6$var$totalConfettiRendered--)
		}
	}
	drawConfetti(e, a) {
		for (let t = 0; t < this.confetti.length; t++)
			this.drawConfettiPiece(e, a, this.confetti[t])
	}
	drawConfettiPiece(e, a, t) {
		const r = t.x + a.x
		  , c = t.y + a.y;
		e.fillStyle = t.color,
		e.fillRect(r, c, t.size, t.size)
	}
	randomIntRange(e, a) {
		return Math.floor(Math.random() * (a - e + 1)) + e
	}
	randomRange(e, a) {
		return Math.random() * (a - e + Number.EPSILON) + e
	}
}
//Entity
class SimulatorEntity{
  constructor(x,y,color,radius,type,speed=0,angle,auraRadius=0,auraColor="rgba(0,0,0,0)",boundary) {
    this.color = color;
    this.auraColor=auraColor;
    this.auraRadius=auraRadius;
    this.type=type;
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
    this.colorChange=0;
    this.healingTime=0;
    this.inFear=false;
    this.decayed=false;
    this.isBarrier=false;
    this.isRepelling=false;
    this.isDestroyed=false;
    this.lightRadius=0;
    this.y=y;
    this.radius=radius;
    this.ogradius=this.radius;
    this.radiusMultiplier=1;
    this.speedMultiplier=1;
    this.boundary=boundary;
	this.renderFirst=true;
  }
  anglevel(){
    this.velX=Math.cos(this.angle)*this.speed;
    this.velY=Math.sin(this.angle)*this.speed;
  }
  playerInteraction(player,delta){
    this.isEnemy&&(EnemyPlayerInteraction(player,this,this.corrosive,this.isHarmless,this.immune,player.inBarrier));
  }
  auraEffect(player,delta){
  }
  velangle(){
	if(this.velY==0&&this.velX==0)return this.angle;
    this.angle=Math.atan2(this.velY,this.velX);
  }
  update(delta){
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
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
    let collided=false;
    if(this.x<this.boundary.left+this.radius){
      this.x=this.boundary.left+this.radius;
      this.velX=Math.abs(this.velX);
      collided=true;
    }
    if(this.x>this.boundary.right-this.radius){
      this.x=this.boundary.right-this.radius;
      this.velX=-Math.abs(this.velX);
      collided=true;
    }
    if(this.y<this.boundary.top+this.radius){
      this.y=this.boundary.top+this.radius;
      this.velY=Math.abs(this.velY);
      collided=true;
    }
    if(this.y>this.boundary.bottom-this.radius){
      this.y=this.boundary.bottom-this.radius;
      this.velY=-Math.abs(this.velY);
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
  renderExtra(e, ctxL){

  }
  renderEffects(e,ctxL,delta){
	e.beginPath();
	e.fillStyle=this.auraColor;
	e.arc(this.x,this.y,this.auraRadius,0,Math.PI*2,!1);
	e.fill();
	e.closePath();
    var r = ctxL.createRadialGradient(
    canvas.width / 2 + (this.x - camX) * camScale, 
    canvas.height / 2 + (this.y - camY) * camScale, 0, 
    canvas.width / 2 + (this.x - camX) * camScale, 
    canvas.height / 2 + (this.y - camY) * camScale, this.lightRadius * camScale);
    r.addColorStop(0, "rgba(0, 0, 0, 1)"),
    r.addColorStop(1, "rgba(0, 0, 0, 0)"),
    ctxL.beginPath(),
    ctxL.arc(canvas.width / 2 + (this.x - camX) * camScale, canvas.height / 2 + (this.y - camY) * camScale, this.lightRadius * camScale, 0, 2 * Math.PI, !1),
    ctxL.fillStyle = r,
    ctxL.closePath(),
    ctxL.fill();
  }
  render(e,ctxL,delta,renderType) {
    var a={x:0,y:0};
    if (this.isHarmless && !this.isDestroyed && (e.globalAlpha = .4),
    this.duration < 500 && (e.globalAlpha = Math.min(e.globalAlpha, this.duration / 500)),
    this.grassTime < 1e3 ? e.globalAlpha = Math.max(.4, this.grassTime / 1e3) : 1e3 === this.grassTime && this.grassHarmless && (e.globalAlpha = .4),
    this.isDestroyed && (e.globalAlpha = 0),
    this.brightness > 0 && (e.globalAlpha = Math.min(this.brightness, 1)),
    this.maxHealth > 0) {
      const t = "rgb(140, 59, 59)"
        , r = "red"
        , c = "rgb(255, 68, 68)"
        , o = this.health / this.maxHealth;
      e.fillStyle = t,
      e.fillRect(this.x + a.x - 18, this.y + a.y - this.radius - 8, 36, 7),
      e.fillStyle = r,
      e.fillRect(this.x + a.x - 18, this.y + a.y - this.radius - 8, 36 * o, 7),
      e.strokeStyle = c,
      e.strokeRect(this.x + a.x - 18, this.y + a.y - this.radius - 8, 36, 7)
    }
    if (this.name && (e.font = "12px Tah",
    e.textAlign = "center",
    e.fillStyle = "black",
    e.fillText(this.name, this.x + a.x, this.y + a.y - this.radius - 11)),
    this.inFear ? (e.font = "bolder 20px Arial",
    e.fillStyle = "#d32323",
    e.fillText("!", this.x + a.x, this.y + a.y - this.radius - 5)) : this.provoked && (e.font = "bolder 20px Arial",
    e.fillStyle = "#A0A7AD",
    e.fillText("!", this.x + a.x, this.y + a.y - this.radius - 5)),
    this.reduced && (e.font = "bolder 32px Arial",
    e.fillStyle = "#1212cf",
    e.fillText("↓", this.x + a.x + this.radius + 5, this.y + a.y + 8)),
    this.shatterTime > 0)
      this.drawShattered(e, a);
    else if (this.mortarTime > 0)
      this.drawExploded(e, a);
    else {
      let t = this.radius;
      if (void 0 !== this.visualRadius && (t = this.visualRadius),
      e.beginPath(),
      e.arc(this.x + a.x, this.y + a.y, t, 0, 2 * Math.PI, !1),
      void 0 === this.image ? (e.fillStyle = this.getColorChange(),
      e.fill()) : e.drawImage(this.image.getImage(), this.x + a.x - this.radius, this.y + a.y - this.radius, 2 * t, 2 * t),
      this.isRepelling && (e.fillStyle = "rgba(109, 109, 255, 0.9)",
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
        let a = (500 - Math.max(this.releaseTime, 0)) / 500 * .2 + .05;
        e.fillStyle = `rgba(1, 1, 1, ${a})`,
        e.fill()
      }
		this.outline && enemyOutline.checked && (e.lineWidth = 2,
                             e.strokeStyle = "black",
                               e.stroke(),
                               e.lineWidth = 1),
                               e.closePath()
                             }
                             e.globalAlpha = 1
    this.decayed=false;
    this.renderExtra(e,ctxL);
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
  constructor(x,y,radius,speed,angle,color,type,boundary,aura_color,aura_radius){
    super(x,y,color,radius,type,speed,angle,aura_radius,aura_color,boundary);
    this.isEnemy=true;
	this.renderFirst=false;
	this.outline=true;
  }
  update(delta){
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
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
  if(enemy.texture=="entities/pumpkin_off"||enemy.radius==0||harmless||enemy.shatterTime>0){
	dead=false;
  }
  if(dead){
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
  if(player.deathTimer==-1&&dead){console.log("mega dead shit")
    death(player);
  }
}
function death(player){
    switch(player.area){
      case 0:player.deathTimer=player.deathTimerTotal=10000;break;
      case 1:player.deathTimer=player.deathTimerTotal=15000;break;
      case 2:player.deathTimer=player.deathTimerTotal=15000;break;
      case 3:player.deathTimer=player.deathTimerTotal=20000;break;
      case 4:player.deathTimer=player.deathTimerTotal=20000;break;
      case 5:player.deathTimer=player.deathTimerTotal=20000;break;
      case 6:player.deathTimer=player.deathTimerTotal=25000;break;
      case 7:player.deathTimer=player.deathTimerTotal=25000;break;
      case 8:player.deathTimer=player.deathTimerTotal=30000;break;
      case 9:player.deathTimer=player.deathTimerTotal=30000;break;
      default:player.deathTimer=player.deathTimerTotal=60000;break;
    }
    if(map.areas[player.area].properties.death_timer!==void 0){
      player.deathTimer=player.deathTimerTotal=map.areas[player.area].properties.death_timer;
    }else if(map.properties.death_timer!==void 0){
      player.deathTimer=player.deathTimerTotal=map.properties.death_timer;
    }
}
//PELLETS
class $4e83b777e56fdf48$export$2e2bcd8739ae039 {
	update(delta) {
		this.increasing ? (this.value += this.increment*delta/(1e3/30),
		this.value >= this.max && (this.value = this.max,
		this.increasing = !1)) : (this.value -= this.increment*delta/(1e3/30),
		this.value <= this.min && (this.value = this.min,
		this.increasing = !0))
	}
	constructor(e, a, t, r, c) {
		this.value = e,
		this.min = a,
		this.max = t,
		this.increment = r,
		this.increasing = c
	}
}
class PelletEntity extends SimulatorEntity{
  constructor(x,y,radius,boundary){
    //(x,y,color,radius,type,speed,angle,auraRadius=0,auraColor="rgba(0,0,0,0)",boundary)
    super(x,y,null,radius,"pellet",null,null,null,null,boundary);
    this.colors = ["#b84dd4", "#a32dd8", "#3b96fd", "#43c59b", "#f98f6b", "#61c736", "#d192bd"];
		this.scaleOscillator = new $4e83b777e56fdf48$export$2e2bcd8739ae039(1.1,1.1,1.2,.005,!0);
    this.color=this.colors[Math.floor((Math.abs(this.x) + Math.abs(this.y)) % this.colors.length)];
	this.renderFirst=true;
  }
  playerInteraction(player){
  var victoryZones=map.areas[player.area].zones.filter(e=>(e.type=="victory"||e.type=="active"));
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
      if(player.experience>=player.nextLevelExperience){
		if(player.level >= map.properties.max_level){
			player.experience=player.nextLevelExperience;
			return;
		}
		player.experience-=player.tempPrevExperience-player.previousLevelExperience;
		var newLevel=Math.floor(this.calculateLevel(player.experience))
		var diff=newLevel-player.level;
        player.tempPrevExperience=this.calculateExperience(newLevel-1)
        player.tempNextExperience=this.calculateExperience(newLevel)
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
    this.collision();
  }
  render(ctx,ctxL,delta,renderType) {
	  if(renderType=="aura")return;
	  if(this.renderFirst==renderType)return;
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.radius * this.scaleOscillator.value,0,Math.PI*2,!1);
    ctx.fill();
    ctx.closePath();
		this.scaleOscillator.update(delta)
  }
}
//	EvadesClassic enemy files: server\src\game\entities\enemies\{{type}}_enemy.py
class WallEnemy extends Enemy{
  constructor(radius,speed,area_bounding_box,wall_index,wall_count,initial_side,move_clockwise=true){
    super(0,0,radius,speed,0,enemyConfig.wall_enemy.color,"wall",area_bounding_box);
    if(initial_side==void 0){
      initial_side=0
    }
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
    super(x,y,radius,speed,angle,enemyConfig.normal_enemy.color,"normal",boundary);
  }
}
class ImmuneEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.immune_enemy.color,"immune",boundary);
    this.immune=true;
  }
}
class CorrosiveEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.corrosive_enemy.color,"normal",boundary);
    this.corrosive=true;
  }
}

//Aura Enemies
class ExperienceDrainEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.experience_drain_enemy.color,"experience_drain",boundary,auraColors.experience_drain,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.experienceDraining){
	  player.experienceDraining=true;
	  player.experience-=2*player.level*delta/1e3;
	  player.experience=Math.max(0,player.experience);
	  if(player.experience<player.previousLevelExperience){
		var diff=player.previousLevelExperience-player.experience;
		player.previousLevelExperience-=diff;
		player.nextLevelExperience+=diff;
		player.previousLevelExperience=Number(player.previousLevelExperience.toFixed(5));
		player.nextLevelExperience=Number(player.nextLevelExperience.toFixed(5));
	  }
	}
  }
}
class BlockingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.blocking_enemy.color,"blocking",boundary,auraColors.blocking,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.slowing&&player.enemyEffects[0]){
	  player.slowing=player.enemyEffects[0];
	  player.speedMultiplier*=0.7;
	}
	if(!player.freezing&&player.enemyEffects[1]){
	  player.freezing=player.enemyEffects[1];
	  player.speedMultiplier*=0.15;
	}
	if(!player.draining&&player.enemyEffects[6]){
	  player.draining=player.enemyEffects[6];
	  player.energy-=15*delta/1e3;
	  player.energy=Math.max(0,player.energy);
	}
	if(!player.lava&&player.enemyEffects[7]){
	  player.lava=player.enemyEffects[7];
	  player.energy+=15*delta/1e3;
	  if(player.energy>=player.maxEnergy){
            death(player);player.energy=0;
	  }
	}
	if(!player.toxic&&player.enemyEffects[2]){
	  player.toxic=player.enemyEffects[2];
	  player.energy=Math.min(player.energy,player.maxEnergy*0.7);
	}
	if(!player.reducing&&player.enemyEffects[4]){
	  player.reducing=player.enemyEffects[4];
	  player.reducingTime+=delta;
	}
	if(!player.enlarging&&player.enemyEffects[5]){
	  player.enlarging=player.enemyEffects[5];
	  player.radiusAdditioner+=10;
	}
	if(!player.slippery&&player.enemyEffects[8]){player.slippery=player.enemyEffects[8]}
	if(!player.disabling&&player.enemyEffects[9]){player.disabling=player.enemyEffects[9]}
	if(!player.inEnemyBarrier&&player.enemyEffects[10]){player.inEnemyBarrier=player.enemyEffects[10]}
	if(!player.magneticReduction&&player.enemyEffects[11]){player.magneticReduction=player.enemyEffects[11]}
	if(!player.magneticNullification&&player.enemyEffects[12]){player.magneticNullification=player.enemyEffects[12]}
	if(!player.experienceDraining&&player.enemyEffects[3]){
	  player.experienceDraining=player.experienceDraining=player.enemyEffects[3];
	  player.experience-=2*player.level*delta/1e3;
	  player.experience=Math.max(0,player.experience);
	  if(player.experience<player.previousLevelExperience){
		var diff=player.previousLevelExperience-player.experience;
		player.previousLevelExperience-=diff;
		player.nextLevelExperience+=diff;
		player.previousLevelExperience=Number(player.previousLevelExperience.toFixed(5));
		player.nextLevelExperience=Number(player.nextLevelExperience.toFixed(5));
	  }
	}
  }
}
class SlowingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.slowing_enemy.color,"slowing",boundary,auraColors.slowing,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.slowing){
	  player.slowing=true;
	  player.speedMultiplier*=0.7;
	}
  }
}
class MagneticReductionEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.magnetic_reduction_enemy.color,"magnetic_reduction",boundary,auraColors.magnetic_reduction,aura_radius);
  }
  auraEffect(player,delta){
	player.magneticReduction=true
  }
}
class MagneticNullificationEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.magnetic_nullification_enemy.color,"magnetic_nullification",boundary,auraColors.magnetic_nullification,aura_radius);
  }
  auraEffect(player,delta){
	player.magneticNullification=true
  }
}
class FreezingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.freezing_enemy.color,"freezing",boundary,auraColors.freezing,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.freezing){
	  player.freezing=true;
	  player.speedMultiplier*=0.15;
	}
  }
}
class DrainingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.draining_enemy.color,"draining",boundary,auraColors.draining,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.draining){
	  player.draining=true;
	  player.energy-=15*delta/1e3;
	  player.energy=Math.max(0,player.energy);
	}
  }
}
class LavaEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.lava_enemy.color,"lava",boundary,auraColors.lava,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.lava){
	  player.lava=true;
	  player.energy+=15*delta/1e3;
	  if(player.energy>=player.maxEnergy){
            death(player);player.energy=0;
	  }
	}
  }
}
class ToxicEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.toxic_enemy.color,"toxic",boundary,auraColors.toxic,aura_radius);
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
    super(x,y,radius,speed,angle,enemyConfig.enlarging_enemy.color,"enlarging",boundary,auraColors.enlarging,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.enlarging){
	  player.enlarging=true;
	  player.radiusAdditioner+=10;
	}
  }
}
class ReducingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.reducing_enemy.color,"reducing",boundary,auraColors.reducing,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.reducing){
	  player.reducing=true;
	  player.reducingTime+=delta;
	}
  }
}
class SlipperyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.slippery_enemy.color,"slippery",boundary,auraColors.slippery,aura_radius);
  }
  auraEffect(player,delta){
	player.slippery=true;
  }
}
class BarrierEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.barrier_enemy.color,"barrier",boundary,auraColors.barrier,aura_radius);
	this.immune=true;
  }
  auraEffect(player,delta){
	player.inEnemyBarrier=true;
  }
}
class RadarEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.radar_enemy.color,"radar",boundary,auraColors.radar,aura_radius);
	this.releaseInterval=250;
	this.release_time=Math.random()*this.releaseInterval;
  }
  update(delta,area) {
    if(this.release_time<=0){
    var closest_entity,closest_entity_distance,information;
    if(map.players.length){
      information = map.players.filter(e=>{return (e.moving||e.cent_is_moving)&&!e.isDowned()&&!e.safeZone&&!e.nightActivated});
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
      area.entities.push(new RadarProjectile(this.x,this.y,this.radius/3,5+this.speed,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this,this.boundary))
      this.release_time = this.releaseInterval;
    }
    }else{
      this.release_time -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class RadarProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner,boundary){
    super(x,y,radius,speed,angle,"#c90000","radar_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class GravityEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,gravity,boundary){
    super(x,y,radius,speed,angle,enemyConfig.gravity_enemy.color,"gravity",boundary,auraColors.gravity,aura_radius);
	this.gravity=gravity;
  }
  auraEffect(player,delta){
	if (!player.invulnerable) {
      var dx = player.x - this.x;
      var dy = player.y - this.y;
      var dist = distance({x:0,y:0},{x:dx,y:dy});
      var attractionAmplitude = Math.pow(2, -(dist / 100));
      var moveDist = (this.gravity * attractionAmplitude);
      var angleToPlayer = Math.atan2(dy, dx);
      player.x -= (moveDist * Math.cos(angleToPlayer)) * (delta / (1000 / 30));
      player.y -= (moveDist * Math.sin(angleToPlayer)) * (delta / (1000 / 30));
    }
  }
}
class RepellingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,repulsion,boundary){
    super(x,y,radius,speed,angle,enemyConfig.repelling_enemy.color,"repelling",boundary,auraColors.repelling,aura_radius);
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
      player.x += (moveDist * Math.cos(angleToPlayer)) * (delta / (1000 / 30));
      player.y += (moveDist * Math.sin(angleToPlayer)) * (delta / (1000 / 30));
	  player.collision();
    }
  }
}
class PositiveMagneticGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.positive_magnetic_ghost_enemy.color,"positive_magnetic_ghost",boundary);
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
		if(player.abilityThree.abilityType==98){
			player.abilityThree.abilityType=99;
			player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
		};
	}
  }
}
class NegativeMagneticGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.negative_magnetic_ghost_enemy.color,"negative_magnetic_ghost",boundary);
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
		if(player.abilityThree.abilityType==99){
			player.abilityThree.abilityType=98;
			player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
		};
	}
  }
}
class DisablingGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.disabling_ghost_enemy.color,"disabling_ghost",boundary);
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
  }
  playerInteraction(player){
	if(!player.disabling){
	  player.disabling=true;
	}
  }
}
class SpeedGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.speed_ghost_enemy.color,"speed_ghost",boundary);
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
    super(x,y,radius,speed,angle,enemyConfig.ice_ghost_enemy.color,"ice_ghost",boundary);
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
    super(x,y,radius,speed,angle,enemyConfig.poison_ghost_enemy.color,"poison_ghost",boundary);
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
    super(x,y,radius,speed,angle,enemyConfig.regen_ghost_enemy.color,"regen_ghost",boundary);
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
    super(x,y,radius,speed,angle,enemyConfig.disabling_enemy.color,"disabling",boundary,auraColors.disabling,aura_radius);
  }
  auraEffect(player,delta){
	if(!player.disabling){
	  player.disabling=true;
	}
  }
}
class QuicksandEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,aura_radius,direction,strength,boundary){
    super(x,y,radius,speed,angle,enemyConfig.quicksand_enemy.color,"quicksand",boundary,auraColors.quicksand,aura_radius);
	this.push_direction=direction;
	this.quicksand_strength=strength;
  }
  auraEffect(player,delta){
	player.quicksand=[true,this.push_direction,this.quicksand_strength];
  }
}
class SandEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.sand_enemy.color,"sand",boundary);
	this.sandSpeed=1;
  }
  update(delta){
	if(this.sandSpeed<3){
		this.sandSpeed+=0.03*delta/(1e3/30);
	}
	this.speedMultiplier*=this.sandSpeed;
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
  }
  onCollide(){
	this.sandSpeed=0;
  }
}

class SandrockEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.sandrock_enemy.color,"sandrock",boundary);
	this.sandrockSpeed=1;
  }
  update(delta){
	if(this.sandrockSpeed>=0.1){
		this.sandrockSpeed-=0.01*delta/(1e3/30);
	}
	this.speedMultiplier*=this.sandrockSpeed;
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
  }
  onCollide(){
	this.sandrockSpeed=1;
  }
}
class ChargingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.charging_enemy.color,"charging",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
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
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.homing_enemy.color,"homing",boundary);
    this.target_angle=this.angle;
    this.is_negative_speed=this.speed<0;
    this.speed=Math.abs(this.speed);
    if(this.is_negative_speed){
      this.velX*=-1;
      this.velY*=-1;
    }
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
      target_angle = modulus(Math.atan2(distance_y,distance_x)+Math.PI+(Math.PI*this.is_negative_speed),Math.PI*2);
    }else {
      target_angle = this.target_angle;
    }
    var angle_difference = modulus(this.angle - target_angle,Math.PI*2)
    var angle_increment = 0.05;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
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
    super(x,y,radius,speed,angle,enemyConfig.dasher_enemy.color,"dasher",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
  }
  onCollide(){
    this.velangle();
  }
}
class TeleportingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.teleporting_enemy.color,"teleporting",boundary);
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
    this.x+=this.velX*this.speedMultiplier;
    this.y+=this.velY*this.speedMultiplier;
	this.speedMultiplier=1;
    this.collision(delta);
  }
}
class StarEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.star_enemy.color,"star",boundary);
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
    this.x+=this.velX*this.speedMultiplier*2;
    this.y+=this.velY*this.speedMultiplier*2;
	this.speedMultiplier=1;
    this.collision(delta);
  }
}
class OscillatingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.oscillating_enemy.color,"oscillating",boundary);
    this.clock = 0;
  }
  update(delta){
    this.clock += delta
    if (this.clock > 1000) {
      this.velX *= -1;
      this.velY *= -1;
      this.clock = this.clock % 1000;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier=1;
    this.collision(delta);
  }
}
function renderSortedEntities(e) {
		const t = this.sortEntitiesByZIndex(Object.values(e.entities));
		renderEntities(t)
	}
	var $ccc1645057c0c20e$export$18da14ab4d863bec={"0":13,"1":3,"2":175,"3":55,"4":60,"5":56,"6":62,"7":57,"8":66,"9":59,"10":68,"11":61,"12":65,"13":58,"14":67,"15":69,"16":70,"17":71,"18":72,"19":73,"20":74,"21":75,"22":76,"23":77,"24":78,"25":79,"26":63,"27":64,"28":80,"29":81,"30":82,"31":86,"32":83,"33":84,"34":85,"35":87,"36":88,"37":89,"38":90,"39":91,"40":92,"41":93,"42":94,"43":95,"44":134,"45":135,"46":39,"47":40,"48":41,"49":42,"50":43,"51":96,"52":97,"53":44,"54":45,"55":98,"56":46,"57":99,"58":47,"59":48,"60":49,"61":50,"62":51,"63":52,"64":101,"65":102,"66":103,"67":104,"68":105,"69":112,"70":113,"71":114,"72":115,"73":116,"74":117,"75":118,"76":53,"77":54,"78":119,"79":120,"80":106,"82":108,"83":109,"84":110,"85":111,"86":121,"87":122,"88":123,"89":124,"90":125,"91":126,"92":127,"93":128,"94":129,"95":130,"96":131,"97":132,"98":133,"99":16,"100":14,"101":15,"102":136,"103":137,"104":17,"105":138,"106":20,"107":139,"108":140,"109":141,"110":142,"111":145,"112":146,"113":18,"114":4,"115":19,"116":21,"117":143,"118":144,"119":22,"120":7,"121":147,"122":148,"123":149,"124":150,"125":23,"126":10,"127":8,"128":9,"129":100,"130":38,"131":24,"132":25,"133":151,"134":152,"135":153,"136":154,"137":155,"138":156,"139":157,"140":158,"141":159,"142":160,"143":161,"144":162,"145":163,"146":164,"148":165,"149":166,"150":167,"151":168,"152":169,"153":170,"154":171,"155":172,"156":173,"157":174,"158":26,"159":27,"160":30,"161":31,"162":32,"163":33,"164":34,"165":35,"166":28,"167":29,"168":36,"169":37,"170":5,"171":6,"172":12,"173":11,"174":0,"175":1,"176":2};
function renderEntities(e,ctxE) {
		renderEntitiesEffects(e,ctxE);
		for (const t of e)
			t.render(ctxE, this.camera)
	}
function renderEntitiesEffects(e,ctxE) {
		const t = ctxE.fillStyle;
		for (const t of e)
			for (const e of t.getEffectConfigs())
				e.internal || null !== e.fillColor && (this.context.fillStyle = e.fillColor,
				ctxE.beginPath(),
				t.addEffectPath(this.context, this.camera, e),
				ctxE.closePath(),
				ctxE.fill());
		this.context.fillStyle = t
	}
function sortEntitiesByZIndex(e) {
		const t = []
		  , a = [];
		for (const r of e)
			-1 === r.absoluteZIndex ? t.push(r) : a.push(r);
		const r = (e,t)=>e.isEnemy && t.isEnemy && e.radius !== t.radius ? t.radius - e.radius : e.isPlayer && t.isPlayer && e.isLocalPlayer !== t.isLocalPlayer ? t.isLocalPlayer ? -1 : 1 : $ccc1645057c0c20e$export$18da14ab4d863bec[e.entityType] !== $ccc1645057c0c20e$export$18da14ab4d863bec[t.entityType] ? $ccc1645057c0c20e$export$18da14ab4d863bec[e.entityType] - $ccc1645057c0c20e$export$18da14ab4d863bec[t.entityType] : (e.relativeZIndex || 0) !== (t.relativeZIndex || 0) ? (e.relativeZIndex || 0) - (t.relativeZIndex || 0) : e.id - t.id;
		return t.sort(r),
		a.sort(r),
		t.concat(a)
	}
class ZigzagEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.zigzag_enemy.color,"zigzag",boundary);
    this.switchInterval = 500;
    this.switchTime = 500;
    this.switchAdd = false;
    this.turnAngle = Math.PI / 2;
  }
  update(delta){
    if (this.switchTime > 0) {
      this.switchTime -= delta;
    } else {
      this.switchTime = this.switchInterval
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier=1;
    this.collision(delta);
  }
}
class ZoningEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.zoning_enemy.color,"zoning",boundary);
    this.switchInterval = 1000;
    this.switchTime = Math.random() * this.switchInterval;
    this.turnAngle = Math.PI / 2
    this.turnAngle *= (Math.floor(Math.random() * 2) * 2) - 1
  }
  update(delta){
    if (this.switchTime > 0) {
      this.switchTime -= delta
    } else {
      this.switchTime = this.switchInterval;
      this.angle = Math.atan2(this.velY, this.velX);
      this.angle += this.turnAngle;
      this.velX = Math.cos(this.angle) * this.speed;
      this.velY = Math.sin(this.angle) * this.speed;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier=1;
    this.collision(delta);
    
  }
}
class SizingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.sizing_enemy.color,"sizing",boundary);
    this.growing = true;
    this.maxRadius = this.radius * 2.5;
    this.minRadius = this.radius / 2.5;
	this.radius=this.minRadius;
  }
  update(delta){
    if (this.growing) {
      this.radius += ((delta / (1000 / 30)) * 0.1) * this.minRadius;
      if (this.radius > this.maxRadius) {
        this.growing = false;
      }
    } else {
      this.radius -= ((delta / (1000 / 30)) * 0.1) * this.minRadius;
      if (this.radius < this.minRadius) {
        this.growing = true;
      }
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier=1;
    this.collision(delta);
  }
}
class TurningEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,circle_size,boundary){
    super(x,y,radius,speed,angle,enemyConfig.turning_enemy.color,"turning",boundary);
    this.circle_size = circle_size;
    this.dir = speed / circle_size;
  }
  update(delta) {
    this.velangle()
    this.angle += this.dir * (delta / 30);
    this.anglevel();
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier=1;
    this.collision(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class SpiralEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.spiral_enemy.color,"spiral",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class CrumblingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.crumbling_enemy.color,"crumbling",boundary);
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
			this.crumbleSize+=delta/(1e3/30)/66.66666666666666666666666666/2;
		}else{
			this.crumbleSize=1;
		}
	}
	this.radiusMultiplier*=this.crumbleSize;
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
	this.radius=this.ogradius*this.radiusMultiplier;
	this.radiusMultiplier = 1;
    this.collision(delta);
  }
}
/*PARTIAL IMPLEMENTATION
class SnowmanEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.snowman_enemy.color,"snowman",boundary);
	this.hasCollided=false;
	this.collideTime=0;
	this.crumbleSize=1;
  }
  onCollide(){
	  if(!this.hasCollided){
		this.hasCollided=true;
		this.crumbleSize=1;
		this.radiusMultiplier*=this.crumbleSize;
		this.speedMultiplier*=0;
	  }
  }
  update(delta,area) {
	if(this.hasCollided){
		this.collideTime+=delta;
		this.speedMultiplier*=0;
	}
	if(this.collideTime>=1e3&&this.hasCollided){
		this.hasCollided=false;
		this.collideTime=0;
	};
	if(!this.hasCollided){
		if(this.crumbleSize<3){
			this.crumbleSize+=0.05*delta/(1e3/30);
		}else{
			this.crumbleSize=3;
		}
	}
	this.radiusMultiplier*=this.crumbleSize;
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
	this.radius=this.ogradius*this.radiusMultiplier;
	this.radiusMultiplier = 1;
    this.collision(delta);
  }
}*/
class PumpkinEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary,fake=false){
    super(x,y,radius,speed,angle,enemyConfig.pumpkin_enemy.color,"pumpkin",boundary);
	this.texture="entities/pumpkin_off";
	this.image=$31e8cfefa331e399$var$images[this.texture];
	this.detectedDuration=2500;
	this.hasDetected=false;
	this.targetAngle=0;
	this.detectedTime=0;
	this.detectedPosition={x:0,y:0};
	this.isFake=fake;
  }
  update(delta) {
	if(this.isFake)this.speedMultiplier=0;
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
		this.image=$31e8cfefa331e399$var$images[this.texture];
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
	  this.lightRadius=0;
	  this.image=$31e8cfefa331e399$var$images[this.texture];
	  this.detectedTime=0;
	}}
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
  onCollide(){
    this.target_angle=this.angle=Math.atan2(this.velY,this.velX);
  }
}
class MistEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.mist_enemy.color,"mist",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
  spawnTrail(area){
    area.entities.push(new FireTrailEnemy(this.x,this.y,this.radius,0,0,true,this.boundary));
  }
}
class PhantomEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.phantom_enemy.color,"phantom",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
  spawnTrail(area){
    area.entities.push(new FireTrailEnemy(this.x,this.y,this.radius,0,0,true,this.boundary));
  }
}
class GlowyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.glowy_enemy.color,"glowy",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class FireflyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.firefly_enemy.color,"firefly",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class GrassEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,powered,boundary){
    super(x,y,radius,speed,angle,enemyConfig.grass_enemy.color,"grass",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class SeedlingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.seedling_enemy.color,"seedling",boundary);
	this.hasEntity=false;
	this.immune=true;
  }
  update(delta,area) {
	if(!this.hasEntity){
		this.hasEntity=true;
		area.entities.push(new SeedlingProjectile(this.x,this.y,this.radius,0,0,this,this.boundary))
	};
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class SeedlingProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,owner,boundary){
    super(x,y,radius,speed,angle,enemyConfig.seedling_enemy.color,"seedling_projectile",boundary);
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
    super(x,y,radius,speed,angle,enemyConfig.fire_trail_enemy.color,"fire_trail",boundary);
	this.lightRadius=this.radius+40;
	this.isDecay=decay;
	this.clock=0;
	this.brightness=1;
  }
  update(delta,area) {
    this.clock+=delta;
	if(!this.isDecay){
	var duration=(1000*(this.radius*2)/this.speed)/32;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
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
	this.flickerChance = .15,
	this.lightRadius = this.baseLightRadius
	this.renderFirst=true;
	this.flipped=upside_down;
	this.image=$31e8cfefa331e399$var$images['entities/torch'].clone();
	this.width=13;
	this.height=36;
  }
  update(){}
  renderEffects(ctx,ctxL,delta){
	          var r = ctxL.createRadialGradient(
        canvas.width / 2 + (this.x - camX) * camScale, 
        canvas.height / 2 + (this.y - camY) * camScale, 0, 
        canvas.width / 2 + (this.x - camX) * camScale, 
        canvas.height / 2 + (this.y - camY) * camScale, this.lightRadius * camScale);
        r.addColorStop(0, "rgba(0, 0, 0, 1)"),
        r.addColorStop(1, "rgba(0, 0, 0, 0)"),
        ctxL.beginPath(),
        ctxL.arc(canvas.width / 2 + (this.x - camX) * camScale, canvas.height / 2 + (this.y - camY) * camScale, this.lightRadius * camScale, 0, 2 * Math.PI, !1),
        ctxL.fillStyle = r,
        ctxL.closePath(),
        ctxL.fill();
  }
  render(ctx,ctxL,delta) {
		ctx.imageSmoothingEnabled = false;
	  var tf=delta/(1e3/30)
		Math.random() <= this.flickerChance && (this.lightRadius = this.baseLightRadius + Math.random() * this.randomFlickerRadius);
		this.flipped ? (ctx.translate(this.x + this.width / 2, this.y + this.height / 2),
		ctx.scale(1, -1),
		ctx.drawImage(this.image.getImage(tf), -this.width / 2, -this.height / 2, this.width, this.height),
		ctx.scale(1, -1),
		ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))) : ctx.drawImage(this.image.getImage(tf), this.x, this.y, this.width, this.height)
  }
}
class LightRegion extends SimulatorEntity{
  constructor(x,y,width,height){
    super(x,y,null,null,"light_region",null,null,null,null,null);
	this.width=width;
	this.height=height;
  }
  update(){}
  renderEffects(ctx,ctxL,delta) {
        var m = canvas.width / 2 + (this.x - camX + this.width / 2) * camScale
          , b = canvas.height / 2 + (this.y - camY + this.height / 2) * camScale
          , w = Math.max(this.width, this.height) / 2 * camScale
          , I = ctxL.createRadialGradient(m, b, 0, m, b, w);
        I.addColorStop(0, "rgba(0, 0, 0, 1)");
        I.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctxL.fillStyle = I;
        ctxL.fillRect(
          canvas.width / 2 + (this.x - camX) * camScale - w / 2, 
          canvas.height / 2 + (this.y - camY) * camScale - w / 2, 
          (this.width * camScale + w), 
          (this.height * camScale + w)
        );
  }
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
  render(ctx,ctxL,delta,renderType) {
		ctx.imageSmoothingEnabled = false;
        if(!zoneconsts[this.texture])return;
        var q = ctx.createPattern(zoneconsts[this.texture].active, null)
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = ((tileMode.selectedIndex&1)&&this.texture=="normal")?zoneColors[tileMode.selectedIndex>>1].active:q;
        ctx.rect(
          0,
          0,
		  this.width,
		  this.height
          //map.areas[current_Area].assets[k].width,
          //map.areas[current_Area].assets[k].height
        );
        ctx.fill();
        ctx.restore();
        ctx.closePath();
  }
}
class FlashlightSpawner extends SimulatorEntity{
  constructor(x,y){
    super(x,y,null,null,"flashlight_spawner",null,null,null,null,null);
	this.renderFirst=true;
	this.texture=$31e8cfefa331e399$var$images['entities/flashlight_item'];
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
	  if(player.abilityThree.abilityType!=96&&this.isSpawned){
	  player.abilityThree.abilityType=96;
	  evadesRenderer.heroInfoCard.abilityThree=new $097def8f8d652b17$export$2e2bcd8739ae039;
	  evadesRenderer.heroInfoCard.abilityThree.unionState(abilityConfig[player.abilityThree.abilityType]);
	  evadesRenderer.heroInfoCard.abilityThree.locked=false;
	  evadesRenderer.heroInfoCard.abilityThree.level=1;
	  this.isSpawned=false;
	  }
  }
  render(ctx,ctxL,delta,renderType) {
	if(!this.isSpawned)return;
	ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.texture.getImage(),this.x-16,this.y-8,32,16);
  }
}
class LiquidEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,player_detection_radius,boundary){
    super(x,y,radius,speed,angle,enemyConfig.liquid_enemy.color,"liquid",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class SwitchEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,switch_inverval,boundary){
    super(x,y,radius,speed,angle,enemyConfig.switch_enemy.color,"switch",boundary);
    this.switch_inverval = switch_inverval;
    this.disabled = false;
    if (Math.round(Math.random()) === 1) {
      this.disabled = true;
    }
    this.isHarmless = this.disabled;
    this.clock = 0;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock > this.switch_inverval) {
      this.disabled = !this.disabled;
      this.isHarmless = this.disabled
    }
    this.clock = this.clock % this.switch_inverval;

    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class IcicleEnemy extends Enemy{
  constructor(x,y,radius,speed,horizontal,boundary){
    super(x,y,radius,speed,Math.round(Math.random())*180+90*!horizontal,enemyConfig.icicle_enemy.color,"icicle",boundary);
    this.clock = 0;
	this.wallHit=false;
  }
  update(delta) {
	if(this.wallHit){this.clock += delta;this.speedMultiplier*=0};
    if (this.clock > 1e3) {
      this.clock=0;
	  this.wallHit=false;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
  onCollide(){
	  this.wallHit=true;
  }
}
class RadiatingBulletsEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,release_interval,release_time,boundary){
    super(x,y,radius,speed,angle,enemyConfig.radiating_bullets_enemy.color,"radiating_bullets",boundary);
    this.release_interval = release_interval,
    this.releaseTime = release_time ?? (Math.random()*this.release_interval);
  }
  update(delta,area) {
    this.releaseTime -= delta;
    if (this.releaseTime < 0) {
		for(var i=0;i<8;i++){
			area.entities.push(new RadiatingBulletsProjectile(this.x,this.y,8,8,45*i,this.boundary))
		}
		this.releaseTime = this.releaseTime % this.release_interval;
		this.releaseTime+=this.release_interval
		this.releaseTime = this.releaseTime % this.release_interval;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class RadiatingBulletsProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#a30838","radiating_bullets_projectile",boundary);
	this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class WavyEnemy extends Enemy{
  constructor(x,y,radius,speed,angle=0,boundary){
    super(x,y,radius,speed,angle,enemyConfig.wavy_enemy.color,"wavy",boundary);
    this.circleSize = 100;
    this.dir = 1;
    this.switchInterval = 800;
    this.switchTime = 0;
    this.angleIncrement = (this.speed + 6) / this.circleSize;
  }
  update(delta) {
    this.switchTime += delta
    if (this.switchTime >= this.switchInterval) {
      this.switchTime %= this.switchInterval;
      this.dir *= -1;
    }
    this.velangle();
    this.angle += this.angleIncrement*this.dir*(delta/(1000/30));
    this.anglevel();
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	this.speedMultiplier=1;
    this.collision(delta);
  }
  onCollide(){
    this.dir *= -1; 
  }
}
class SniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.sniper_enemy.color,"sniper",boundary);
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
      area.entities.push(new SniperProjectile(this.x,this.y,this.radius/2,10,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class SniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#a05353","sniper_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class PredictionSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.prediction_sniper_enemy.color,"prediction_sniper",boundary);
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
        area.entities.push(new PredictionSniperProjectile(this.x,this.y,this.radius/2,11,Math.atan2(dY,dX)/Math.PI*180,this.boundary))
        this.releaseTime = this.release_interval;
	  }
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class ResidueEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.residue_enemy.color,"residue",boundary);
    this.clock = 0;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 3000) {
      this.remove=true;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class PredictionSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#d14f84","prediction_sniper_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class IceSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.ice_sniper_enemy.color,"ice_sniper",boundary);
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
      area.entities.push(new IceSniperProjectile(this.x,this.y,10,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class IceSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#be89ff","ice_sniper_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class PoisonSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.poison_sniper_enemy.color,"poison_sniper",boundary);
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
      area.entities.push(new PoisonSniperProjectile(this.x,this.y,10,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class PoisonSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#590174","poison_sniper_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class SpeedSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,speed_loss,boundary){
    super(x,y,radius,speed,angle,enemyConfig.speed_sniper_enemy.color,"speed_sniper",boundary);
    this.release_interval = 2500,
    this.speed_loss=speed_loss;
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
      area.entities.push(new SpeedSniperProjectile(this.x,this.y,10,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.speed_loss,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class SpeedSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,speed_loss,boundary){
    super(x,y,radius,speed,angle,"#d6885c","speed_sniper_projectile",boundary);
    this.outline=false;
    this.speed_loss=speed_loss;
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
    this.remove=true;
    player.speed-=this.speed_loss;
    player.statSpeed-=this.speed_loss;
    player.speed=Math.max(5,player.speed);
    player.statSpeed=Math.max(5,player.statSpeed);
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class LeadSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.lead_sniper_enemy.color,"lead_sniper",boundary);
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
      area.entities.push(new LeadSniperProjectile(this.x,this.y,this.radius*2/3,10,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class LeadSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#687888","lead_sniper_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class RegenSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,regen_loss,boundary){
    super(x,y,radius,speed,angle,enemyConfig.regen_sniper_enemy.color,"regen_sniper",boundary);
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
      area.entities.push(new RegenSniperProjectile(this.x,this.y,10,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.regen_loss,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class RegenSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,regen_loss,boundary){
    super(x,y,radius,speed,angle,"#00a875","regen_sniper_projectile",boundary);
    this.outline=false;
    this.regen_loss=regen_loss;
    this.immune=true;
    this.clock = 0;
  }
  playerInteraction(player){
    this.remove=true;
    player.energyRegen-=this.regen_loss;
    player.energyRegen=Math.max(1,player.energyRegen);
  }
  onCollide(){
    this.remove=true;
  }
  update(delta) {
    this.clock += delta;
    if (this.clock >= 7000) {
      this.remove=true;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class CorrosiveSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.corrosive_sniper_enemy.color,"corrosive_sniper",boundary);
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
      area.entities.push(new CorrosiveSniperProjectile(this.x,this.y,this.radius/2,10,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class CorrosiveSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#61ff61","corrosive_sniper_projectile",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class PositiveMagneticSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.positive_magnetic_sniper_enemy.color,"positive_magnetic_sniper",boundary);
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
      area.entities.push(new PositiveMagneticSniperProjectile(this.x,this.y,10,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class PositiveMagneticSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#e3001e","positive_magnetic_sniper_projectile",boundary);
    this.outline=false;
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
		if(player.abilityThree.abilityType==98){
			player.abilityThree.abilityType=99;
			player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class NegativeMagneticSniperEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.negative_magnetic_sniper_enemy.color,"negative_magnetic_sniper",boundary);
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
      area.entities.push(new NegativeMagneticSniperProjectile(this.x,this.y,10,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class NegativeMagneticSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#6f59ff","negative_magnetic_sniper_projectile",boundary);
    this.outline=false;
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
	if(player.abilityThree.abilityType==99){
		player.abilityThree.abilityType=98;
		player.abilityThree.name=abilityConfig[player.abilityThree.abilityType].name;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class ForceSniperAEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.force_sniper_a_enemy.color,"force_sniper_a",boundary);
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
      area.entities.push(new ForceSniperAProjectile(this.x,this.y,this.radius/2,12,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class ForceSniperAProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#0a5557","force_sniper_a_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class ForceSniperBEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,enemyConfig.force_sniper_b_enemy.color,"force_sniper_b",boundary);
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
      area.entities.push(new ForceSniperBProjectile(this.x,this.y,this.radius/2,12,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class ForceSniperBProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#914d83","force_sniper_b_projectile",boundary);
    this.outline=false;
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class WindGhostEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,ignore_invulnerability,boundary){
    super(x,y,radius,speed,angle,enemyConfig.wind_ghost_enemy.color,"wind_ghost",boundary);
	this.gravity=1;
	this.isHarmless=true;
	this.immune=true;
	this.disabled=true;
	this.ignore_invulnerability=ignore_invulnerability;
  }
  playerInteraction(player,delta){
    var iterations=1024;
	var curIters=0;
	if (!player.invulnerable||this.ignore_invulnerability) {
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
    super(x,y,radius,speed,angle,enemyConfig.wind_sniper_enemy.color,"wind_sniper",boundary);
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
      area.entities.push(new WindSniperProjectile(this.x,this.y,this.radius/2,16,(Math.atan2(distance_y,distance_x)/Math.PI+1)*180,this.boundary))
      this.releaseTime = this.release_interval;
    }
    }else{
      this.releaseTime -= delta;
    }
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
class WindSniperProjectile extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#82c2a5","wind_sniper_projectile",boundary);
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
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier = 1;
    this.collision(delta);
  }
}
window.warnin=false;
class RotorEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,rotor_branch_count = 2,rotor_node_count = 2,rotor_node_radius = 16,rotor_rot_speed = 5,rotor_reversed = false,rotor_branch_offset = 0, rotor_node_dist = 0, rotor_branch_dist = 0, rotor_offset_per_layer = 0, rotor_layer_reverse_interval = 0, rotor_corrosive = false, boundary){
    super(x,y,radius,speed,angle,"#4d6f2b","rotor",boundary);
    this.branch_count = rotor_branch_count;
    this.node_count = rotor_node_count;
    this.node_radius = rotor_node_radius;
    this.rot_speed = rotor_rot_speed;
    this.reverse = rotor_reversed ? -1 : 1;
    this.branch_offset = rotor_branch_offset; 
    this.node_dist = rotor_node_dist; 
    this.branch_dist = rotor_branch_dist; 
    this.offset_per_layer = rotor_offset_per_layer; 
    this.layer_reverse_interval = rotor_layer_reverse_interval;
    this.corrosive = rotor_corrosive;
    this.rotation = this.branch_offset;
    this.angle_btwn_branches = 360 / this.branch_count;
  }
  renderExtra(e, ctxL){
    if (this.node_count * this.branch_count > 300){
      console.warn("rotor enemy over 300 nodes. nodes will not be rendered.")
      return;
    }
    for (var l = 0; l < this.node_count; l++){
      for (var n = 0; n < this.branch_count; n++){
        var dist_from_center = l * (this.node_radius * 2) + this.radius + (this.branch_dist * 2) + (this.node_dist * l * 2) + this.node_radius;
        var branch_angle = this.angle_btwn_branches * n + (l % ((this.layer_reverse_interval) * 2) < this.layer_reverse_interval ? -this.rotation : this.rotation) + this.offset_per_layer * l;
        var nodeX = dist_from_center * Math.cos(branch_angle * (Math.PI/180));
        var nodeY = dist_from_center * Math.sin(branch_angle * (Math.PI/180));
        this.renderNode(nodeX, nodeY, e);
      } 
    }
  }
  renderNode(offx, offy, e){
    e.beginPath(),
    e.arc(this.x + offx, this.y + offy, this.node_radius, 0, 2 * Math.PI, !1),
    e.fillStyle = "rgba(49, 83, 21, 1)",
    e.fill(),
    e.lineWidth = 2,
    e.strokeStyle = "black",
    e.stroke(),
    e.closePath()
  }
  update(delta){
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
	  this.speedMultiplier=1;
    this.collision(delta);
    this.rotation += this.reverse * (delta / 60 / (1000 / 60)) * this.rot_speed * 15;
  }
}