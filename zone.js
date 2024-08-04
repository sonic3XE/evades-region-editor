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
		return parseFloat(localStorage.tileMode??0)
	},set tileMode(e){
		localStorage.tileMode=e;
	},get isSandbox(){
		return localStorage.sandbox=="true";
	},set isSandbox(e){
		localStorage.sandbox=e;
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
  }).join("").match(/(........?)/g).map(e => { return String.fromCharCode(parseInt(e, 2)) }).join("")
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
    return res.map(e=>map[e]).join("");
}
function addZone(type) {
//    var snap={x:localStorage.getItem("snapX")||16,y:localStorage.getItem("snapY")||16}
//    lockCursor = true;
    updateMouseEntity=true;
//    canvas.style.cursor = `url(/tile/${type}.png),auto`;
  let posX = roundTo(Math.round(mouseEntity.x),settings.snapX);
  let posY = roundTo(Math.round(mouseEntity.y),settings.snapY);
let ActiveZone = createZone({x:posX,y:posY,width:160,height:160,type:"active"});
    map.areas[current_Area].zones.push(ActiveZone);
    updateMap();
/*    function mousedown(e) {
        if (e.button === 2) {
            lockCursor = false;
            canvas.style.cursor = "initial";
            canvas.removeEventListener("mousedown", mousedown);
            return;
        }
        canvas.style.cursor = "nwse-resize";

        let posX = roundTo(Math.round((e.offsetX - canvas.width / 2) / camScale + camX),snap.x);
        let posY = roundTo(Math.round((e.offsetY - canvas.height / 2) / camScale + camY),snap.y);
        selectedObject = ActiveZone;

        function mousemove(e) {
            let x = roundTo(Math.round((e.offsetX - canvas.width / 2) / camScale + camX),snap.x);
            let y = roundTo(Math.round((e.offsetY - canvas.height / 2) / camScale + camY),snap.y);
            ActiveZone.rw = ActiveZone.width = Math.max(0,roundTo(x - posX,snap.x));
            ActiveZone.rh = ActiveZone.height = Math.max(0,roundTo(y - posY,snap.y));
            ActiveZone.inputs.width.value = ActiveZone.width;
            ActiveZone.inputs.height.value = ActiveZone.height;
            updateMap();
        }

        canvas.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseup", () => {
            lockCursor = false;
            canvas.removeEventListener("mousedown", mousedown);
            canvas.removeEventListener("mousemove", mousemove);
        });
    }
    canvas.addEventListener("mousedown", mousedown);*/
}
/**
 * @param {Spawner} e
 * @returns {Spawner}
 */
function createSPAWNERgui(point1,Zone){
		var list=['angle', 'barrier_radius', 'blocking_radius', 'circle_size', 'cone_angle', 'count', 'direction', 'disabling_radius', 'draining_radius', 'enlarging_radius', 'experience_drain_radius', 'freezing_radius', 'gravity', 'gravity_radius', 'growth_multiplier', 'hard_mode', 'horizontal', 'ignore_invulnerability', 'immune', 'lava_radius', 'magnetic_nullification_radius', 'magnetic_reduction_radius', 'move_clockwise', 'pattern', 'pause_duration', 'pause_interval', 'player_detection_radius', 'powered', 'projectile_duration', 'projectile_radius', 'projectile_speed', 'push_direction', 'quicksand_radius', 'quicksand_strength', 'radar_radius', 'radius', 'reducing_radius', 'regen_loss', 'release_interval', 'release_time', 'repelling_radius', 'repulsion', 'reverse', 'shot_acceleration', 'shot_interval', 'slippery_radius', 'slowing_radius', 'spawn_top', 'speed', 'speed_loss', 'toxic_radius', 'turn_acceleration', 'turn_speed', 'types', 'x', 'y', 'switch_interval', 'switch_time'];
		delete point1.element;
		for(var i in point1){
			if(list.indexOf(i)==-1)customAlert("Unknown spawner property: "+i,10,"#FFF");
		}

        const countInput = document.createElement("input");
        countInput.value = point1.count ?? defaultValues.spawner.count;
        countInput.addEventListener("input", () => {
            countInput.value = Math.max(countInput.value,0);
            point1.count = Math.max(Number(countInput.value),0);spawnEntities()
        });

        const xInput = document.createElement("input");
        xInput.value = point1.x ?? defaultValues.spawner.x ?? "";
        xInput.addEventListener("input", () => {
          if(xInput.value==""){
            point1.x = undefined;
          }else if(xInput.value.split(",").length==1){
            xInput.value = Number(xInput.value);
            point1.x = Number(xInput.value);
          }else{
            var min=parseInt(xInput.value.split(",")[0]);
            var max=parseInt(xInput.value.split(",")[1]);
            if(!(isNaN(min)||isNaN(max))){point1.x = xInput.value}
          }spawnEntities()
        });
        const yInput = document.createElement("input");
        yInput.value = point1.y ?? defaultValues.spawner.y ?? "";
        yInput.addEventListener("input", () => {
          if(yInput.value==""){
            point1.y = undefined;
            }else if(yInput.value.split(",").length==1){
            yInput.value = Number(yInput.value);
            point1.y = Number(yInput.value);
          }else{
            var min=parseInt(yInput.value.split(",")[0]);
            var max=parseInt(yInput.value.split(",")[1]);
            if(!(isNaN(min)||isNaN(max))){point1.y = yInput.value}
          }spawnEntities()
        });
        const tsInput = document.createElement("input");
        tsInput.value = point1.turn_speed ?? defaultValues.spawner.turn_speed;
		tsInput.step=0.01;
        tsInput.addEventListener("input", () => {
            tsInput.value = Number(tsInput.value);
            point1.turn_speed = Number(tsInput.value);spawnEntities()
        });
        const taInput = document.createElement("input");
        taInput.value = point1.turn_acceleration ?? defaultValues.spawner.turn_acceleration;
		taInput.step=0.01;
        taInput.addEventListener("input", () => {
            taInput.value = Math.max(Number(taInput.value),0);
            point1.turn_acceleration = Math.max(Number(taInput.value),0);spawnEntities()
        });
        const siInput = document.createElement("input");
        siInput.value = point1.shot_interval ?? defaultValues.spawner.shot_interval;
		siInput.step=5;
        siInput.addEventListener("input", () => {
            siInput.value = Number(siInput.value);
            point1.shot_interval = Number(siInput.value);spawnEntities()
        });
        const saInput = document.createElement("input");
        saInput.value = point1.shot_acceleration ?? defaultValues.spawner.shot_acceleration;
		saInput.step=0.01;
        saInput.addEventListener("input", () => {
            saInput.value = Math.max(Number(saInput.value),0);
            point1.shot_acceleration = Math.max(Number(saInput.value),0);spawnEntities()
        });
        const piInput = document.createElement("input");
        piInput.value = point1.pause_interval ?? defaultValues.spawner.pause_interval;
		piInput.step=5;
        piInput.addEventListener("input", () => {
            piInput.value = Number(piInput.value);
            point1.pause_interval = Number(piInput.value);spawnEntities()
        });
        const pdInput = document.createElement("input");
        pdInput.value = point1.pause_duration ?? defaultValues.spawner.pause_duration;
		pdInput.step=5;
        pdInput.addEventListener("input", () => {
            pdInput.value = Math.max(Number(pdInput.value),1);
            point1.pause_duration = Math.max(Number(pdInput.value),1);spawnEntities()
        });

        const angleInput = document.createElement("input");
        angleInput.value = point1.angle ?? defaultValues.spawner.angle;
        angleInput.addEventListener("input", () => {
          if(angleInput.value==""){
            point1.angle = undefined;
          }else{
            angleInput.value = Number(angleInput.value)%360;
            point1.angle = Number(angleInput.value)%360;
          }spawnEntities()
        });
        const pushDirInput = document.createElement("input");
        pushDirInput.value = point1.push_direction ?? defaultValues.spawner.push_direction;
        pushDirInput.addEventListener("input", () => {
          if(pushDirInput.value==""){
            point1.push_direction = undefined;
          }else{
            pushDirInput.value = Number(pushDirInput.value)%360;
            point1.push_direction = Number(pushDirInput.value)%360;
          }spawnEntities()
        });

        const coneAngleInput = document.createElement("input");
        coneAngleInput.value = point1.cone_angle ?? defaultValues.spawner.cone_angle;
        coneAngleInput.addEventListener("input", () => {
            coneAngleInput.value = Number(coneAngleInput.value)%360;
            point1.cone_angle = Number(coneAngleInput.value)%360;spawnEntities()
        });
        const powInput = document.createElement("input");
        powInput.checked = point1.powered ?? defaultValues.spawner.powered;
        powInput.addEventListener("input", () => {
            point1.powered=powInput.checked;spawnEntities()
        });
  const ignInput = document.createElement("input");
  ignInput.checked = point1.ignore_invulnerability ?? defaultValues.spawner.ignore_invulnerability;
  ignInput.addEventListener("input", () => {
      point1.ignore_invulnerability=ignInput.checked;spawnEntities()
  });
  const hardInput = document.createElement("input");
    hardInput.checked = point1.hard_mode ?? defaultValues.spawner.hard_mode;
    hardInput.addEventListener("input", () => {
      point1.hard_mode=hardInput.checked;spawnEntities()
  });
  const spTopInput = document.createElement("input");
    spTopInput.checked = point1.spawn_top ?? defaultValues.spawner.spawn_top;
    spTopInput.addEventListener("input", () => {
      point1.spawn_top=spTopInput.checked;spawnEntities()
  });
  const reversInput = document.createElement("input");
    reversInput.checked = point1.reverse ?? defaultValues.spawner.reverse;
    reversInput.addEventListener("input", () => {
      point1.reverse=reversInput.checked;spawnEntities()
  });

		const speedInput = document.createElement("input");
		speedInput.value = isNaN(point1.speed ?? defaultValues.spawner.speed)?0:(point1.speed ?? defaultValues.spawner.speed);
		speedInput.step=0.1;
		speedInput.addEventListener("input", () => {
			speedInput.value = Number(speedInput.value);
			point1.speed = Number(speedInput.value);spawnEntities()
		});

		const radiusInput = document.createElement("input");
		radiusInput.value = point1.radius;
		radiusInput.step=1;
		radiusInput.addEventListener("input", () => {
		  /*
			From Pifary-dev:
			Server will crash if radius will not be specified (got confirmation from evades devs)
		  */
		  radiusInput.value = Math.max(Number(radiusInput.value),0);
		  point1.radius = Math.max(Number(radiusInput.value),0);spawnEntities()
		});
		const aura1Input = document.createElement("input");
		aura1Input.value = point1.slowing_radius ?? defaultValues.spawner.slowing_radius;
		aura1Input.step=1;
		aura1Input.addEventListener("input", () => {
			aura1Input.value = Math.max(Number(aura1Input.value),0);
			point1.slowing_radius = Math.max(Number(aura1Input.value),0);spawnEntities()
		});
    const aura2Input = document.createElement("input");
		aura2Input.value = point1.draining_radius ?? defaultValues.spawner.draining_radius;
		aura2Input.step=1;
		aura2Input.addEventListener("input", () => {
			aura2Input.value = Math.max(Number(aura2Input.value),0);
			point1.draining_radius = Math.max(Number(aura2Input.value),0);spawnEntities()
		});
		const aura3Input = document.createElement("input");
		aura3Input.value = point1.freezing_radius ?? defaultValues.spawner.freezing_radius;
		aura3Input.step=1;
		aura3Input.addEventListener("input", () => {
			aura3Input.value = Math.max(Number(aura3Input.value),0);
			point1.freezing_radius = Math.max(Number(aura3Input.value),0);spawnEntities()
		});
		const aura4Input = document.createElement("input");
		aura4Input.value = point1.slippery_radius ?? defaultValues.spawner.slippery_radius;
		aura4Input.step=1;
		aura4Input.addEventListener("input", () => {
			aura4Input.value = Math.max(Number(aura4Input.value),0);
			point1.slippery_radius = Math.max(Number(aura4Input.value),0);spawnEntities()
		});
		const aura5Input = document.createElement("input");
		aura5Input.value = point1.enlarging_radius ?? defaultValues.spawner.enlarging_radius;
		aura5Input.step=1;
		aura5Input.addEventListener("input", () => {
			aura5Input.value = Math.max(Number(aura5Input.value),0);
			point1.enlarging_radius = Math.max(Number(aura5Input.value),0);spawnEntities()
		});
		const aura6Input = document.createElement("input");
		aura6Input.value = point1.gravity_radius ?? defaultValues.spawner.gravity_radius;
		aura6Input.step=1;
		aura6Input.addEventListener("input", () => {
			aura6Input.value = Math.max(Number(aura6Input.value),0);
			point1.gravity_radius = Math.max(Number(aura6Input.value),0);spawnEntities()
		});
		const aura7Input = document.createElement("input");
		aura7Input.value = point1.repelling_radius ?? defaultValues.spawner.repelling_radius;
		aura7Input.step=1;
		aura7Input.addEventListener("input", () => {
			aura7Input.value = Math.max(Number(aura7Input.value),0);
			point1.repelling_radius = Math.max(Number(aura7Input.value),0);spawnEntities()
		});
		const aura8Input = document.createElement("input");
		aura8Input.value = point1.lava_radius ?? defaultValues.spawner.lava_radius;
		aura8Input.step=1;
		aura8Input.addEventListener("input", () => {
			aura8Input.value = Math.max(Number(aura8Input.value),0);
			point1.lava_radius = Math.max(Number(aura8Input.value),0);spawnEntities()
		});
		const aura9Input = document.createElement("input");
		aura9Input.value = point1.magnetic_reduction_radius ?? defaultValues.spawner.magnetic_reduction_radius;
		aura9Input.step=1;
		aura9Input.addEventListener("input", () => {
			aura9Input.value = Math.max(Number(aura9Input.value),0);
			point1.magnetic_reduction_radius = Math.max(Number(aura9Input.value),0);spawnEntities()
		});
		const aura10Input = document.createElement("input");
		aura10Input.value = point1.magnetic_nullification_radius ?? defaultValues.spawner.magnetic_nullification_radius;
		aura10Input.step=1;
		aura10Input.addEventListener("input", () => {
			aura10Input.value = Math.max(Number(aura10Input.value),0);
			point1.magnetic_nullification_radius = Math.max(Number(aura10Input.value),0);spawnEntities()
		});
		const aura11Input = document.createElement("input");
		aura11Input.value = point1.disabling_radius ?? defaultValues.spawner.disabling_radius;
		aura11Input.step=1;
		aura11Input.addEventListener("input", () => {
			aura11Input.value = Math.max(Number(aura11Input.value),0);
			point1.disabling_radius = Math.max(Number(aura11Input.value),0);spawnEntities()
		});
		const aura12Input = document.createElement("input");
		aura12Input.value = point1.toxic_radius ?? defaultValues.spawner.toxic_radius;
		aura12Input.step=1;
		aura12Input.addEventListener("input", () => {
			aura12Input.value = Math.max(Number(aura12Input.value),0);
			point1.toxic_radius = Math.max(Number(aura12Input.value),0);spawnEntities()
		});
		const aura13Input = document.createElement("input");
		aura13Input.value = point1.radar_radius ?? defaultValues.spawner.radar_radius;
		aura13Input.step=1;
		aura13Input.addEventListener("input", () => {
			aura13Input.value = Math.max(Number(aura13Input.value),0);
			point1.radar_radius = Math.max(Number(aura13Input.value),0);spawnEntities()
		});
		const aura14Input = document.createElement("input");
		aura14Input.value = point1.barrier_radius ?? defaultValues.spawner.barrier_radius;
		aura14Input.step=1;
		aura14Input.addEventListener("input", () => {
			aura14Input.value = Math.max(Number(aura14Input.value),0);
			point1.barrier_radius = Math.max(Number(aura14Input.value),0);spawnEntities()
		});
		const aura15Input = document.createElement("input");
		aura15Input.value = point1.quicksand_radius ?? defaultValues.spawner.quicksand_radius;
		aura15Input.step=1;
		aura15Input.addEventListener("input", () => {
			aura15Input.value = Math.max(Number(aura15Input.value),0);
			point1.quicksand_radius = Math.max(Number(aura15Input.value),0);spawnEntities()
		});
  const aura16Input = document.createElement("input");
  aura16Input.value = point1.experience_drain_radius ?? defaultValues.spawner.experience_drain_radius;
  aura16Input.step=1;
  aura16Input.addEventListener("input", () => {
    aura16Input.value = Math.max(Number(aura16Input.value),0);
    point1.experience_drain_radius = Math.max(Number(aura16Input.value),0);spawnEntities()
  });
  const aura17Input = document.createElement("input");
  aura17Input.value = point1.reducing_radius ?? defaultValues.spawner.reducing_radius;
  aura17Input.step=1;
  aura17Input.addEventListener("input", () => {
    aura17Input.value = Math.max(Number(aura17Input.value),0);
    point1.reducing_radius = Math.max(Number(aura17Input.value),0);spawnEntities()
  });
  const aura18Input = document.createElement("input");
  aura18Input.value = point1.blocking_radius ?? defaultValues.spawner.blocking_radius;
  aura18Input.step=1;
  aura18Input.addEventListener("input", () => {
    aura18Input.value = Math.max(Number(aura18Input.value),0);
    point1.blocking_radius = Math.max(Number(aura18Input.value),0);spawnEntities()
  });
		const projDurInput = document.createElement("input");
		projDurInput.value = point1.projectile_duration ?? defaultValues.spawner.projectile_duration;
		projDurInput.step=1;
		projDurInput.addEventListener("input", () => {
			projDurInput.value = Math.max(Number(projDurInput.value),0);
			point1.projectile_duration = Math.max(Number(projDurInput.value),0);spawnEntities()
		});
		const projSpdInput = document.createElement("input");
		projSpdInput.value = point1.projectile_speed ?? defaultValues.spawner.projectile_speed;
		projSpdInput.step=0.01;
		projSpdInput.addEventListener("input", () => {
      if(projSpdInput.value==""){
point1.projectile_speed=undefined;
      }else{;
			projSpdInput.value = Number(projSpdInput.value);
			point1.projectile_speed = Number(projSpdInput.value);}spawnEntities()
		});
		const projRadInput = document.createElement("input");
		projRadInput.value = point1.projectile_radius ?? defaultValues.spawner.projectile_radius;
		projRadInput.step=1;
		projRadInput.addEventListener("input", () => {
      if(projRadInput.value==""){
point1.projectile_radius=undefined;
        }else{
			projRadInput.value = Math.max(Number(projRadInput.value),0);
			point1.projectile_radius = Math.max(Number(projRadInput.value),0);}spawnEntities()
		});
		const groInput = document.createElement("input");
		groInput.value = point1.growth_multiplier ?? defaultValues.spawner.growth_multiplier;
		groInput.step=0.01;
		groInput.addEventListener("input", () => {
			groInput.value = Math.max(Number(groInput.value),1);
			point1.growth_multiplier = Math.max(Number(groInput.value),1);spawnEntities()
		});
		const hInput = document.createElement("input");
		hInput.addEventListener("input", () => {
			point1.horizontal = hInput.checked;spawnEntities()
		});
        const ckwsInput = document.createElement("input");
		ckwsInput.addEventListener("input", () => {
			point1.move_clockwise= ckwsInput.checked;spawnEntities()
		});
        const splsInput = document.createElement("input");
        splsInput.value = point1.speed_loss ?? defaultValues.spawner.speed_loss;
		splsInput.step=0.01;
		splsInput.addEventListener("input", () => {
			splsInput.value = Number(splsInput.value);
			point1.speed_loss = Number(splsInput.value);spawnEntities()
		});
        const rglsInput = document.createElement("input");
        rglsInput.value = point1.regen_loss ?? defaultValues.spawner.regen_loss;
		rglsInput.step=0.01;
		rglsInput.addEventListener("input", () => {
			rglsInput.value = Number(rglsInput.value);
			point1.regen_loss = Number(rglsInput.value);spawnEntities()
		});
        const reinInput = document.createElement("input");
        reinInput.value = point1.release_interval ?? defaultValues.spawner.release_interval;
		reinInput.step=1;
		reinInput.addEventListener("input", () => {
			reinInput.value = Math.max(Number(reinInput.value),0);
			point1.release_interval = Math.max(Number(reinInput.value),0);spawnEntities()
		});
        const retiInput = document.createElement("input");
        retiInput.value = point1.release_time ?? defaultValues.spawner.release_time;
		retiInput.step=1;
		retiInput.addEventListener("input", () => {
		if(retiInput.value==""){
			point1.release_time=undefined;return
		}else{
			retiInput.value = Math.max(Number(retiInput.value),0);
			point1.release_time = Math.max(Number(retiInput.value),0);}spawnEntities()
		});
        const switchtimeInput = document.createElement("input");
        switchtimeInput.value = point1.switch_time ?? defaultValues.spawner.switch_time;
		switchtimeInput.step=1;
		switchtimeInput.addEventListener("input", () => {
		if(switchtimeInput.value==""){
			point1.switch_time=undefined;return
		}else{
			switchtimeInput.value = Math.max(Number(switchtimeInput.value),0);
			point1.switch_time = Math.max(Number(switchtimeInput.value),0);}spawnEntities()
		});
        const pdrInput = document.createElement("input");
        pdrInput.value = point1.player_detection_radius ?? defaultValues.spawner.player_detection_radius;
		pdrInput.step=1;
		pdrInput.addEventListener("input", () => {
			pdrInput.value = Math.max(Number(pdrInput.value),0);
			point1.player_detection_radius = Math.max(Number(pdrInput.value),0);spawnEntities()
		});
        const csInput = document.createElement("input");
        csInput.value = point1.circle_size ?? defaultValues.spawner.circle_size;
		csInput.step=1;
		csInput.addEventListener("input", () => {
			point1.circle_size = Number(csInput.value);spawnEntities()
		});
        const switchintInput = document.createElement("input");
        switchintInput.value = point1.switch_interval ?? defaultValues.spawner.switch_interval;
		switchintInput.step=1;
		switchintInput.addEventListener("input", () => {
			switchintInput.value = Math.max(Number(switchintInput.value),0);
			point1.switch_interval = Math.max(Number(switchintInput.value),0);spawnEntities()
		});
        const gravInput = document.createElement("input");
        gravInput.value = point1.gravity ?? defaultValues.spawner.gravity;
		gravInput.step=1;
		gravInput.addEventListener("input", () => {
			gravInput.value = Number(gravInput.value);
			point1.gravity = Number(gravInput.value);spawnEntities()
		});
        const quicksandStrengthInput = document.createElement("input");
        quicksandStrengthInput.value = point1.quicksand_strength ?? defaultValues.spawner.quicksand_strength;
		quicksandStrengthInput.step=0.01;
		quicksandStrengthInput.addEventListener("input", () => {
			quicksandStrengthInput.value = Number(quicksandStrengthInput.value);
			point1.quicksand_strength = Number(quicksandStrengthInput.value);spawnEntities()
		});
        const repelInput = document.createElement("input");
        repelInput.value = point1.repulsion ?? defaultValues.spawner.repulsion;
		repelInput.step=1;
		repelInput.addEventListener("input", () => {
			repelInput.value = Number(repelInput.value);
			point1.repulsion = Number(repelInput.value);spawnEntities()
		});

		const dirInput = document.createElement("input");
		dirInput.value=point1.direction ?? defaultValues.spawner.direction;
		dirInput.addEventListener("input", () => {
			dirInput.value = Math.max(Math.min(Number(dirInput.value),1),-1);
			point1.direction = Math.max(Math.min(Number(dirInput.value),1),-1);spawnEntities()
		});
		const immInput = document.createElement("input");
		immInput.addEventListener("input", () => {
			point1.immune = immInput.checked;spawnEntities()
		});
    const point2El = createFolder(formatString(curLang,"editor.property.types"), point1.types.map(e=>(customTypeGUI(e,point1),e.element)));
    const addBtn = document.createElement("button");
    const centerXbtn = document.createElement("button");
    const centerYbtn = document.createElement("button");
    point2El.classList.add("array");
    addBtn.classList.add("add");
    centerXbtn.classList.add("centerX");
    centerYbtn.classList.add("centerY");
    addBtn.addEventListener("click", () => {
        let point3 = createpoint2(void 0,point1);
        point1.types.push(point3);
		customTypeGUI(point3,point1);
        point2El.children[1].appendChild(point3.element);
        point2El.classList.remove("min");
      spawnEntities()
    });
    centerXbtn.addEventListener("click", () => {
      var center = Zone.x + Zone.width / 2;
      point1.x = center;
	  xInput.value=point1.x;
      spawnEntities();
    });
    centerYbtn.addEventListener("click", () => {
      var center = Zone.y + Zone.height / 2;
      point1.y = center;
	  yInput.value=point1.y;
      spawnEntities();
    });
    point2El.appendChild(addBtn);
    if (usingAutomationTools){
      point2El.appendChild(centerXbtn);
      point2El.appendChild(centerYbtn);
    }
    if (point1.types.length < 2) point2El.classList.add("min");
		li = createFolder(formatString(curLang,"editor.spawner"), [
  		point2El, //Types
			createProperty(formatString(curLang,"editor.property.count"), countInput, "number"),
			createProperty(formatString(curLang,"editor.property.speed"), speedInput, "number"),
			createProperty(formatString(curLang,"editor.property.radius"), radiusInput, "number"),
			createProperty(formatString(curLang,"editor.property.x"), xInput, "text"),
			createProperty(formatString(curLang,"editor.property.y"), yInput, "text"),
			createProperty(formatString(curLang,"editor.property.angle"), angleInput, "number"),
      createFolder(formatString(curLang,"editor.category.aura"),[
		createProperty(formatString(curLang,"editor.property.slowing_radius"), aura1Input, "number"),
		createProperty(formatString(curLang,"editor.property.draining_radius"), aura2Input, "number"),
		createProperty(formatString(curLang,"editor.property.freezing_radius"), aura3Input, "number"),
		createProperty(formatString(curLang,"editor.property.slippery_radius"), aura4Input, "number"),
		createProperty(formatString(curLang,"editor.property.enlarging_radius"), aura5Input, "number"),
		createProperty(formatString(curLang,"editor.property.gravity_radius"), aura6Input, "number"),
		createProperty(formatString(curLang,"editor.property.repelling_radius"), aura7Input, "number"),
		createProperty(formatString(curLang,"editor.property.lava_radius"), aura8Input, "number"),
		createProperty(formatString(curLang,"editor.property.magnetic_reduction_radius"), aura9Input, "number"),
		createProperty(formatString(curLang,"editor.property.magnetic_nullification_radius"), aura10Input, "number"),
		createProperty(formatString(curLang,"editor.property.disabling_radius"), aura11Input, "number"),
		createProperty(formatString(curLang,"editor.property.toxic_radius"), aura12Input, "number"),
		createProperty(formatString(curLang,"editor.property.radar_radius"), aura13Input, "number"),
		createProperty(formatString(curLang,"editor.property.barrier_radius"), aura14Input, "number"),
		createProperty(formatString(curLang,"editor.property.quicksand_radius"), aura15Input, "number"),
		createProperty(formatString(curLang,"editor.property.experience_drain_radius"), aura16Input, "number"),
		createProperty(formatString(curLang,"editor.property.reducing_radius"), aura17Input, "number"),
		createProperty(formatString(curLang,"editor.property.blocking_radius"), aura18Input, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.cybot"), [
        createProperty(formatString(curLang,"editor.property.hard_mode"), hardInput, "switch", {value: point1.hard_mode ?? defaultValues.spawner.hard_mode}),
      ],!0),
      createFolder(formatString(curLang,"editor.category.flower"), [
			  createProperty(formatString(curLang,"editor.property.growth_multiplier"), groInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.frost_giant"), [
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
        createProperty(formatString(curLang,"editor.property.immune"), immInput, "switch", {value:point1.immune ?? defaultValues.spawner.immune}),
		createProperty(formatString(curLang,"editor.property.pattern"), null, "select", {value:point1.pattern ?? defaultValues.spawner.pattern,event:e=>{point1.pattern=e;spawnEntities()},selectOptions:[[formatString(curLang,"editor.pattern.none"),void 0],...['spiral', 'twinspiral', 'quadspiral', 'cone', 'twincone', 'cone_edges', 'twin', 'singlebig'].map(e=>[formatString(curLang,"editor.pattern."+e),e])],selectType: "text"}),
		createProperty(formatString(curLang,"editor.property.cone_angle"), coneAngleInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.grass"), [
		createProperty(formatString(curLang,"editor.property.powered"), powInput, "switch", {value: point1.powered ?? defaultValues.spawner.powered}),
      ],!0),
      createFolder(formatString(curLang,"editor.category.gravity"), [
		createProperty(formatString(curLang,"editor.property.gravity"), gravInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.homing"), [
		createProperty(formatString(curLang,"editor.property.reverse"), reversInput, "switch", {value: point1.reverse ?? defaultValues.spawner.reverse}),
      ],!0),
      createFolder(formatString(curLang,"editor.category.icicle"),[
        createProperty(formatString(curLang,"editor.property.horizontal"), hInput, "switch", {value: point1.horizontal ?? defaultValues.spawner.horizontal}),
      ],!0),
      createFolder(formatString(curLang,"editor.category.liquid"),[
		createProperty(formatString(curLang,"editor.property.player_detection_radius"), pdrInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.quicksand"), [
		createProperty(formatString(curLang,"editor.property.quicksand_strength"), quicksandStrengthInput, "number"),
		createProperty(formatString(curLang,"editor.property.push_direction"), pushDirInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.radiating_bullets"),[
		createProperty(formatString(curLang,"editor.property.release_interval"), reinInput, "number"),
		createProperty(formatString(curLang,"editor.property.release_time"), retiInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.regen_sniper"),[
		createProperty(formatString(curLang,"editor.property.regen_loss"), rglsInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.repelling"), [
		createProperty(formatString(curLang,"editor.property.repulsion"), repelInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.speed_sniper"),[
		createProperty(formatString(curLang,"editor.property.speed_loss"), splsInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.switch"), [
		createProperty(formatString(curLang,"editor.property.switch_interval"), switchintInput, "number"),
		createProperty(formatString(curLang,"editor.property.switch_time"), switchtimeInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.turning"),[
		createProperty(formatString(curLang,"editor.property.circle_size"), csInput, "number"),
      ],!0),
      createFolder(formatString(curLang,"editor.category.wall"),[
		createProperty(formatString(curLang,"editor.property.spawn_top"), spTopInput, "switch", {value: point1.spawn_top ?? defaultValues.spawner.spawn_top}),
		createProperty(formatString(curLang,"editor.property.move_clockwise"), ckwsInput, "switch", {value: point1.move_clockwise ?? defaultValues.spawner.move_clockwise}),
      ],!0),
      createFolder(formatString(curLang,"editor.category.wind_ghost"), [
        createProperty(formatString(curLang,"editor.property.ignore_invulnerability"), ignInput, "switch", {value: point1.ignore_invulnerability ?? defaultValues.spawner.ignore_invulnerability}),
      ],!0),
    ],!0);
    var foldersInjectedByAddon = [];
    //if pifary were to have an enemy with a custom (non aura radius) property, similar code to the code below would be put here.
    for (var i = 0; i < foldersInjectedByAddon.length; i++){
      li.lastElementChild.appendChild(foldersInjectedByAddon[i]);
    }
    li.children[0].classList.add("counter");
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.addEventListener("click", e => {
      Zone.spawner[Zone.spawner.indexOf(point1)].element.remove();
      Zone.spawner.splice(Zone.spawner.indexOf(point1), 1);
      spawnEntities()
      e.stopPropagation();
    });
    const clone = document.createElement("button");
    clone.classList.add("clone");
    clone.addEventListener("click", e => {
      Zone.spawner[Zone.spawner.indexOf(point1)];
      const p = cloneSpawner(Zone.spawner[Zone.spawner.indexOf(point1)]);
      const spawner = createPoint(p);
      Zone.spawner.push(spawner);
      createSPAWNERgui(spawner,Zone);
      Zone.spawner[0].element.parentElement.parentElement.children[1].appendChild(spawner.element);
      spawnEntities()
      e.stopPropagation();
    });
    li.children[0].appendChild(remove);
    li.children[0].appendChild(clone);
    point1.element = li;
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
	var obj = {};
	obj.x = e.x;
	obj.y = e.y;
	obj.radius = e.radius;
	obj.angle = e.angle;
	obj.speed = e.speed;
	obj.count = e.count;
	obj.types = e.types.map(t => { return t.i });
	obj.types.includes("slowing") && (obj.slowing_radius = e.slowing_radius);
	obj.types.includes("draining") && (obj.draining_radius = e.draining_radius);
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
		obj.reverse = e.reverse
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
function createZone(e) {
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
var enemyList=['wall', 'normal', 'homing', 'dasher', 'slowing', 'experience_drain', 'enlarging', 'draining', 'gravity', 'repelling', 'turning', 'sizing', 'sniper', 'freezing', 'teleporting', 'wavy', 'zigzag', 'zoning', 'spiral', 'oscillating', 'switch', 'liquid', 'icicle', 'slippery', 'ice_sniper', 'disabling', 'speed_sniper', 'regen_sniper', 'radiating_bullets', 'immune', 'pumpkin', 'fake_pumpkin', 'tree', 'frost_giant', 'snowman', 'corrosive', 'toxic', 'corrosive_sniper', 'poison_sniper', 'magnetic_nullification', 'magnetic_reduction', 'negative_magnetic_sniper', 'positive_magnetic_sniper', 'residue', 'fire_trail', 'ice_ghost', 'poison_ghost', 'positive_magnetic_ghost', 'negative_magnetic_ghost', 'wind_ghost', 'lunging', 'lava', 'gravity_ghost', 'repelling_ghost', 'star', 'grass', 'seedling', 'flower', 'disabling_ghost', 'glowy', 'firefly', 'mist', 'phantom', 'cybot', 'eabot', 'wabot', 'fibot', 'aibot', 'wind_sniper', 'sand', 'sandrock', 'quicksand', 'crumbling', 'radar', 'barrier', 'speed_ghost', 'regen_ghost', 'cactus', 'cycling', 'icbot', 'elbot', 'plbot', 'mebot', 'libot', 'dabot', 'sparking', 'thunderbolt', 'static', 'electrical', 'prediction_sniper', 'ring_sniper',
           "charging",
           "reducing",
           "lead_sniper",
          "blocking","stalactite",
          "force_sniper_a",
          "force_sniper_b",
		  'flaming',
		  'stumbling',
		  'disarming',
		  'lurching',
		  'infectious',
		  'mutating',
		  'vengeful_soul',
		  'lost_soul',
        ]
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