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
function render() {
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
  canvas.width != window.innerWidth&&(canvas.width = window.innerWidth);
  canvas.height != window.innerHeight&&(canvas.height = window.innerHeight);
  var canvasEnemyLayer = createOffscreenCanvas(window.innerWidth, window.innerHeight);
  var canvaslighting = createOffscreenCanvas(window.innerWidth, window.innerHeight);
  var ctxL = canvaslighting.getContext("2d");
  var ctxE = canvasEnemyLayer.getContext("2d");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineCap = "round";
  ctx.imageSmoothingEnabled = false;

  let zoneColors =[{ active: "#FFFFFFFF", safe: "#C3C3C3FF", exit: "#FFF46CFF", teleport: "#6AD0DEFF", victory: "#FFF46CFF", removal: "#FFF9BAFF", dummy: "#C3C3C3FF" },
   {active: "#111111ff",safe:"#3c3c3cff",exit:"#948800ff",teleport:"#218795ff",victory:"#948800ff",removal:"#6b630ff",dummy:"#3c3c3cff"}];
  camX += camSpeed / camScale * (keysDown.has(controls.RIGHT) - keysDown.has(controls.LEFT))*speedMultiplier;
  camY += camSpeed / camScale * (keysDown.has(controls.DOWN) - keysDown.has(controls.UP))*speedMultiplier;
  if (keysDown.has(controls.ZOOM_OUT)||keysDown.has(controls.ZOOM_OUT2)){
      camScale *=0.85;
      if(camScale>32||camScale<1/zoomLimit)m=1;
      camScale = Math.min(Math.max(1/zoomLimit,camScale),32);
  };
  if (keysDown.has(controls.ZOOM_IN)||keysDown.has(controls.ZOOM_IN2)){
      camScale /=0.85;
      if(camScale>32||camScale<1/zoomLimit)m=1;
      camScale = Math.min(Math.max(1/zoomLimit,camScale),32);
  };
  
  function arrayToInt32(s){
    return s[0]<<24|s[1]<<16|s[2]<<8|s[3]<<0
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
    if(map.areas[current_Area].zones[j].properties.texture!="normal")texture=map.areas[current_Area].zones[j].properties.texture;
    else if(map.areas[current_Area].properties.texture!="normal")texture=map.areas[current_Area].properties.texture;
    else texture=map.properties.texture;
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
    if (arrayToInt32(map.areas[current_Area].zones[j].properties.background_color)!=0) {
      ctx.fillStyle = RGBAtoHex(map.areas[current_Area].zones[j].properties.background_color)
    } else if (arrayToInt32(map.areas[current_Area].properties.background_color)!=0) { 
      ctx.fillStyle = RGBAtoHex(map.areas[current_Area].properties.background_color) 
    } else { 
      ctx.fillStyle = RGBAtoHex(map.properties.background_color) 
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
  map.areas[current_Area].entities.map(e=>{e.render(ctxE,ctxL,delta)});
  ctxE.resetTransform();
  var enemyError=false;
  try{
  (realTime.checked&&isActive&&ti>1e3/50)&&(map.areas[current_Area].entities.map(e=>e.update(1e3/30)),ti=0);
  }catch(e){customAlert(e,1/0,"#FF0000");enemyError=true}
  ctx.drawImage(canvasEnemyLayer,0,0);
  for (let k in map.areas[current_Area].assets) {
    switch (map.areas[current_Area].assets[k].type) {
      case "wall": {
        if(!zoneconsts[map.areas[current_Area].assets[k].texture])break;
        var q = ctx.createPattern(zoneconsts[map.areas[current_Area].assets[k].texture].active, null)
        ctx.beginPath();
        ctx.translate(canvas.width / 2 + (map.areas[current_Area].assets[k].x - camX) * camScale, canvas.height / 2 + (map.areas[current_Area].assets[k].y - camY) * camScale);
        ctx.scale(camScale, camScale);
        ctx.fillStyle = ((tileMode.selectedIndex&1)&&map.areas[current_Area].assets[k].texture=="normal")?zoneColors[tileMode.selectedIndex>>1].active:q;
        ctx.rect(
          0,
          0,
          map.areas[current_Area].assets[k].width,
          map.areas[current_Area].assets[k].height
        );
        ctx.fill();
        ctx.resetTransform();
        ctx.closePath();
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
        ctx.fillStyle = "#bd5400";
        ctx.drawImage(
          tileMap,646,604,32,16,
          canvas.width / 2 + (map.areas[current_Area].assets[k].x - 16 - camX) * camScale,
          canvas.height / 2 + (map.areas[current_Area].assets[k].y - 8 - camY) * camScale,
          32 * camScale,
          16 * camScale
        );
        break;
      }
      case "torch": {
        ctx.fillStyle = "#cccc00";
        ctx.drawImage(
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
        ctx.drawImage(
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
  ctxL.fillStyle = `rgba(0,0,0,${map.areas[current_Area].properties.lighting})`;
  ctxL.fillRect(0, 0, canvaslighting.width, canvaslighting.height);
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(canvaslighting, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  c.update(`{"snow":${map.areas[current_Area].properties.snow},"area":${current_Area}}`, ctx, { x: -camX * camScale, y: -camY * camScale })
  c.render(ctx)
  ctx.lineWidth = 2;
  ctx.strokeStyle = (map.areas[current_Area].properties.lighting > 0.5&&(tileMode.selectedIndex>>1==0)) ? "black" : "white";
  map.areas[current_Area].zones.length==0&&ctx.strokeRect(canvas.width / 2 - camX * camScale,canvas.height / 2 - camY * camScale,snapX.valueAsNumber*camScale,snapY.valueAsNumber*camScale);
  if (hitbox) {
    for (let i in map.areas) {
      if(!hitbox)break;
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
  if (selectedObject) {
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
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 35px tah";
  if (arrayToInt32(map.areas[current_Area].properties.background_color)!=0) {
    ctx.strokeStyle = arrtoHex(map.areas[current_Area].properties.background_color);
    ctx.fillStyle = luma(map.areas[current_Area].properties.background_color) > 128 ? "black" : "white";
  } else {
    ctx.strokeStyle = arrtoHex(map.properties.background_color);
    ctx.fillStyle = luma(map.properties.background_color) > 128 ? "black" : "white";
  };
  ctx.lineWidth = 6;
  var areaname=String(map.areas[current_Area].name||(current_Area+1));
  let rs = `Area ${areaname}`;
  isNaN(parseInt(areaname)) && (rs = areaname);
  let cs = `${map.name}: ${rs}`;
  map.areas[current_Area].zones.filter(e=>e.type=="victory").length&&(cs=`${map.name}: Victory!`);
  ctx.strokeText(cs, canvas.width / 2, 20);
  ctx.fillText(cs, canvas.width / 2, 20);
  ctx.font = "bold 25px tah";
  ctx.strokeText(`# of zones: ${map.areas[current_Area].zones.length}`, canvas.width / 2, 55);
  ctx.fillText(`# of zones: ${map.areas[current_Area].zones.length}`, canvas.width / 2, 55);
  ctx.strokeText(`# of assets: ${map.areas[current_Area].assets.length}`, canvas.width / 2, 80);
  ctx.fillText(`# of assets: ${map.areas[current_Area].assets.length}`, canvas.width / 2, 80);
  //ctx.fillText(`${error}`, canvas.width / 2, canvas.height - 20);
  ctx.strokeStyle="#000";
  ctx.lineWidth = 4;
  ctx.font="bold 20px tah";
  ctx.textAlign="left";
  alertMessages.map((e,t,a)=>{
      ctx.fillStyle=e.color;
      ctx.strokeText(`${e.text}`, 10, canvas.height-20-20*(a.length-t),canvas.width-20);
      ctx.fillText(`${e.text}`, 10, canvas.height-20-20*(a.length-t),canvas.width-20);
  });
  if(enemyError)throw "Something went wrong.";
};

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
/*(function() {
	var _0x14243e;
	try {
		var _0x1c6243 = Function('return (function() {}.constructor("return this")( ));');
		_0x14243e = _0x1c6243();
	} catch (_0x509c3f) {
		_0x14243e = window;
	}
	_0x14243e['setInterval'](_0x313b3e, 3000);
}());*/
