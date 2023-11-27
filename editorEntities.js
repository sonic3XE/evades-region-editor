function capitalize(s){
  var t=s.split("_")
  t=t.map(e=>{
    return e[0].toUpperCase()+e.slice(1).toLowerCase();
  })
  return t.join("");
}
function spawnEntities(){
  if(!map.areas[current_Area])return;
  var isVictory=!!map.areas[current_Area].zones.filter(e=>e.type=="victory").length;
  var totalPellets=map.areas[current_Area].properties.pellet_count;
  if(totalPellets==defaultValues.properties.pellet_count){
    totalPellets=map.properties.pellet_count;
  }
  var boundary=map.areas[current_Area].BoundingBox;
  var victoryZones=map.areas[current_Area].zones.filter(e=>(e.type=="victory"||e.type=="active"));
  map.areas[current_Area].entities=[];
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
      var pellet=new PelletEntity(Math.random()*(randZone.width-16)+randZone.x+8,Math.random()*(randZone.height-16)+randZone.y+8,8,{left:boundary.left,right:boundary.right,bottom:boundary.bottom,top:boundary.top,width:boundary.width,height:boundary.height});
      pellet.collision();
      map.areas[current_Area].entities.push(pellet);
    }
  }
  var activeZones=map.areas[current_Area].zones.filter(e=>e.type=="active");
  for(var x in activeZones){
    var activeZone=activeZones[x];
    for (var i in activeZone.spawner) {
      for (var j=0;j<activeZone.spawner[i].count;j++) {
        if(activeZone.spawner[i].count>1024){console.warn("Too many spawner entities to be displayed");continue};
        var left=activeZone.x;
        var right=activeZone.x+activeZone.width;
        var bottom=activeZone.y+activeZone.height;
        var top=activeZone.y;
        var randType=Math.floor(Math.random()*activeZone.spawner[i].types.length);
        var radius=activeZone.spawner[i].radius??enemyConfig[activeZone.spawner[i].types[randType].i.replace("fake_","") + "_enemy"].radius;
        var auraColor=auraColors[activeZone.spawner[i].types[randType].i];
        let entity;
        var enemyX;
        if(activeZone.spawner[i].x!=undefined){
          if(String(activeZone.spawner[i].x).split(",").length>1){
            var min=parseInt(activeZone.spawner[i].x.split(",")[0]);
            var max=parseInt(activeZone.spawner[i].x.split(",")[1]);
            enemyX=min+Math.random()*(max-min);
          }else{
            enemyX=activeZone.spawner[i].x;
          }
        }else{
          enemyX=Math.random()*(activeZone.width-radius*2)+left+radius;
        }
        var enemyY;
        if(activeZone.spawner[i].y!=undefined){
          if(String(activeZone.spawner[i].y).split(",").length>1){
            var min=parseInt(activeZone.spawner[i].y.split(",")[0]);
            var max=parseInt(activeZone.spawner[i].y.split(",")[1]);
            enemyY=min+Math.random()*(max-min);
          }else{
            enemyY=activeZone.spawner[i].y;
          }
        }else{
          enemyY=Math.random()*(activeZone.height-radius*2)+top+radius;
        }
        switch(activeZone.spawner[i].types[randType].i){
          default:
            entity=new SimulatorEntity(enemyX,enemyY,enemyConfig[activeZone.spawner[i].types[randType].i.replace("fake_","") + "_enemy"].color,radius,activeZone.spawner[i].types[randType].i,activeZone.spawner[i].speed,activeZone.spawner[i].angle,activeZone.spawner[i][`${activeZone.spawner[i].types[randType].i}_radius`],auraColor,{left,right,bottom,top,width:activeZone.width,height:activeZone.height})
          break;
          case "wall":
            entity=new WallEnemy(radius,activeZone.spawner[i].speed,{left,right,bottom,top,width:activeZone.width,height:activeZone.height},j,activeZone.spawner[i].count,void 0,activeZone.spawner[i].move_clockwise)
          break;
          case "normal":
          case "dasher":
          case "homing":
          entity=new (eval(capitalize(activeZone.spawner[i].types[randType].i)+"Enemy"))(
            enemyX,
            enemyY,
            radius,
            activeZone.spawner[i].speed,
            activeZone.spawner[i].angle,
            {left,right,bottom,top,width:activeZone.width,height:activeZone.height}
          );
          break;
        };entity.collision();map.areas[current_Area].entities.push(entity);
      }
    }
  }
  if(isNaN(map.areas[current_Area].entities.filter(e=>(isNaN(e.x)||isNaN(e.y))).length)){return spawnEntities();}
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
//Entity
class SimulatorEntity{
  constructor(x,y,color,radius,type,speed=0,angle,auraRadius=0,auraColor="rgba(0,0,0,0)",boundary) {
    this.color = color;
    this.auraColor=auraColor;
    this.auraRadius=auraRadius;
    this.type=type;
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
    this.burning=false;
    this.colorChange=0;
    this.healingTime=0;
    this.inFear=false;
    this.decayed=false;
    this.isRepelling=false;
    this.isDestroyed=false;
    this.lightRadius=0;
    this.y=y;
    this.radius=radius;
    this.ogradius=this.radius;
    this.radiusMultiplier=1;
    this.speedMultiplier=1;
    this.boundary=boundary;
  }
  anglevel(){
    this.velX=Math.cos(this.angle)*this.speed;
    this.velY=Math.sin(this.angle)*this.speed;
  }
  velangle(){
    this.angle=Math.atan2(this.velY,this.velX);
  }
  update(delta){
    this.x+=this.velX*this.speedMultiplier*delta/(1e3/30);
    this.y+=this.velY*this.speedMultiplier*delta/(1e3/30);
    this.speedMultiplier=1;
    this.collision();
  }
  collision(){
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
  render(e,ctxL) {
    var a={x:0,y:0};
    e.beginPath();
    e.fillStyle=this.auraColor;
    e.arc(this.x,this.y,this.auraRadius,0,Math.PI*2,!1);
    e.fill();
    e.closePath();
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
		enemyOutline.checked && (e.lineWidth = 2,
                             e.strokeStyle = "black",
                               e.stroke(),
                               e.lineWidth = 1),
                               e.closePath()
                             }
                             e.globalAlpha = 1
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
          ctxL.fill()
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
  constructor(x,y,radius,speed,angle,color,type,boundary){
    super(x,y,color,radius,type,speed,angle,null,null,boundary);
    this.isEnemy=true;
  }
  update(delta){
    this.x+=this.velX*delta/(1e3/30);
    this.y+=this.velY*delta/(1e3/30);
    this.collision();
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
  }
  update(delta){
    this.collision();
  }
  render(ctx,ctxL,delta) {
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.radius * this.scaleOscillator.value,0,Math.PI*2,!1);
    ctx.fill();
    ctx.closePath();
		this.scaleOscillator.update(delta)
  }
}
//EvadesClassic enemy files: server\src\game\entities\enemies\{{type}}_enemy.py
class WallEnemy extends Enemy{
  constructor(radius,speed,area_bounding_box,wall_index,wall_count,initial_side,move_clockwise=true){
    super(0,0,radius,speed,0,"#222222","wall",area_bounding_box);
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
    super(x,y,radius,speed,angle,"#939393","normal",boundary);
  }
}
class HomingEnemy extends Enemy{
  constructor(x,y,radius,speed,angle,boundary){
    super(x,y,radius,speed,angle,"#966e14","homing",boundary);
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
      information = map.players;
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
    this.collision();
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
    super(x,y,radius,speed,angle,"#003c66","dasher",boundary);
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
        if(this.time_since_last_dash < this.time_between_dashes){
          this.time_since_last_dash += delta;
        }
        else{
          this.time_since_last_dash = 0;
          this.time_preparing += delta;
          this.speed = this.prepare_speed;
          this.compute_speed();
        }
      }
      else {
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
    this.collision();
  }
  onCollide(){
    this.velangle();
  }
}
window.warnin=false;