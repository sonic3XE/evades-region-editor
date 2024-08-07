let playtesting=false,le=0,toggleLeaderboard=false,toggleChat=false,isFinish=false,errorFX=loadImage('https://s.jezevec10.com/res/se2/topout.mp3'),VFX=loadImage("https://cdn.glitch.global/4777c7d0-2cac-439c-bde4-07470718a4d7/mus_gameOver.ogg"),evadesRenderer={snowRenderer:new SnowRenderer,dynamicLighting:new DynamicLighting(1),directionalIndicatorHud:new DirectionalIndicatorHud,experienceBar:new ExperienceBar,heroInfoCard:new HeroInfoCard,bottomText:new BottomText,titleText:new TitleText,minimap:new Minimap,areaInfo:new AreaInfo};const defaultHighestAreaAchieved={"Central Core":0,"Central Core Hard":0,"Catastrophic Core":0,"Vicious Valley":0,"Vicious Valley Hard":0,"Elite Expanse":0,"Elite Expanse Hard":0,"Wacky Wonderland":0,"Glacial Gorge":0,"Glacial Gorge Hard":0,"Dangerous District":0,"Dangerous District Hard":0,"Peculiar Pyramid":0,"Peculiar Pyramid Hard":0,"Monumental Migration":0,"Monumental Migration Hard":0,"Humongous Hollow":0,"Humongous Hollow Hard":0,"Haunted Halls":0,"Frozen Fjord":0,"Frozen Fjord Hard":0,"Transforming Turbidity":0,"Quiet Quarry":0,"Quiet Quarry Hard":0,"Ominous Occult":0,"Ominous Occult Hard":0,"Restless Ridge":0,"Restless Ridge Hard":0,"Toxic Territory":0,"Toxic Territory Hard":0,"Magnetic Monopole":0,"Magnetic Monopole Hard":0,"Assorted Alcove":0,"Assorted Alcove Hard":0,"Burning Bunker":0,"Burning Bunker Hard":0,"Grand Garden":0,"Grand Garden Hard":0,"Endless Echo":0,"Endless Echo Hard":0,"Mysterious Mansion":0,"Coupled Corridors":0,"Cyber Castle":0,"Cyber Castle Hard":0,"Research Lab":0,"Shifting Sands":0,"Infinite Inferno":0,"Dusty Depths":0,"Withering Wasteland":0,"Stellar Square":0},arrow=(e,a,t,r,c,o=2,n=15,$="#cc000088",_="#FF0000")=>{if(a==r&&t==c)return;const d=Math.atan2(c-t,r-a),dist=Math.sqrt((c-t)**2+(r-a)**2),preserved=e.lineWidth;e.beginPath(),e.moveTo(a+o/4*Math.sin(d),t-o/4*Math.cos(d)),e.lineTo(a-o/4*Math.sin(d),t+o/4*Math.cos(d)),e.lineTo(r-o/4*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d),c+o/4*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),e.lineTo(r-o/2*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d),c+o/2*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),e.lineTo(r,c),e.lineTo(r+o/2*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d),c-o/2*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),e.lineTo(r+o/4*Math.sin(d)-Math.min(o,dist)/2*Math.cos(d),c-o/4*Math.cos(d)-Math.min(o,dist)/2*Math.sin(d)),e.lineTo(a+o/4*Math.sin(d),t-o/4*Math.cos(d)),e.strokeStyle=$,e.lineWidth=n,e.fillStyle=_,e.fill(),e.stroke(),e.closePath(),e.lineWidth=preserved},controlPlayer=(r,t,i,_)=>(_=map.players.filter(e=>e.id==r)[0])&&_.controlActions(t,i),arrayToInt32=(s)=>s[0]<<24|s[1]<<16|s[2]<<8|s[3]<<0,canvasEntityLayer=createOffscreenCanvas(window.innerWidth,window.innerHeight),canvasLighting=createOffscreenCanvas(window.innerWidth,window.innerHeight),render=$=>{const delta=performance.now()-le;le=performance.now();const actually=delta*isActive,selfPlayer=map.players.filter(e=>e.id==window.selfId)[0]||null,zoneColors=[{active:"#FFFFFFFF",safe:"#C3C3C3FF",exit:"#FFF46CFF",teleport:"#6AD0DEFF",victory:"#FFF46CFF",removal:"#FFF9BAFF",dummy:"#C3C3C3FF"},{active:"#111111ff",safe:"#3c3c3cff",exit:"#948800ff",teleport:"#218795ff",victory:"#948800ff",removal:"#6b630ff",dummy:"#3c3c3cff"}],ctxL=canvasLighting.getContext("2d"),ctxE=canvasEntityLayer.getContext("2d");!isFinish&&($e7009c797811e935$export$2e2bcd8739ae039.start({}),$e7009c797811e935$export$2e2bcd8739ae039.registerListeners(),isFinish=true),$e7009c797811e935$export$2e2bcd8739ae039.update(global),cons.currentTime||=1/1e6,snapX.value=settings.snapX,body_collection.selectedIndex=settings.body,gem_collection.selectedIndex=settings.gem,hat_collection.selectedIndex=settings.hat,pelletTransparency.value=settings.pelletTransparency,snapY.value=settings.snapY,[realTime,enemyOutlines,toggleMouseMovement,enableMouseMovement,confetti,isSandbox,legacySpeedUnits,fadingEffects,displayTimer].map(e=>e.checked=settings[e.id]),[tileMode,displayEnergyBars].map(e=>e.selectedIndex=settings[e.id]),closeSettings.style.top=tip.scrollTop+"px",joystickDeadzone.selectedIndex=Math.round(settings.joystickDeadzone*20),updateMouseEntity&&(mouseEntity.x=mousePos.x/camScale+camX,mouseEntity.y=mousePos.y/camScale+camY),Object.keys(zoneconsts).map((e,j)=>Object.keys(zoneconsts[e]).map((t,i)=>zoneconsts[e][t].getContext("2d").drawImage(tileMode.selectedIndex>>1?tilesDark:tiles,(i>3?(i==6?1:Math.round((i-2)/2)*2):i)*128,j*128,j!=4?128:512,j!=4?128:512,0,0,j!=4?128:512,j!=4?128:512))),ctx.textAlign="center",ctx.textBaseline="middle",ctx.lineCap=playtesting?"butt":"round",ctx.imageSmoothingEnabled=false,canvas.width!=window.innerWidth&&(canvas.width=window.innerWidth,canvasEntityLayer.width=canvas.width,canvasLighting.width=canvas.width),canvas.height!=window.innerHeight&&(canvas.height=window.innerHeight,canvasEntityLayer.height=canvas.height,canvasLighting.height=canvas.height),playtesting?(selfPlayer==null&&window.selfId!=null)?(playtesting=false,menu.hidden=playtesting,selfId=null,camX=window.tempCamPos.x,camY=window.tempCamPos.y,current_Area=window.tempCamPos.area,spawnEntities)(current_Area):(camX=selfPlayer.x,camY=selfPlayer.y,selfPlayer.isLocalPlayer=true,current_Area=selfPlayer.area,camScale=Math.min(window.innerHeight/720,window.innerWidth/1280)):selfPlayer?(map.players.splice(map.players.indexOf(selfPlayer),1),selfId=null,current_Area=tempCamPos.area,spawnEntities(),!evadesRenderer.heroInfoCard.abilityThree.noState&&(evadesRenderer.experienceBar.abilityThree=void 0,evadesRenderer.heroInfoCard.abilityThree=new $097def8f8d652b17$export$2e2bcd8739ae039)):(camX+=camSpeed/camScale*(keysDown.has(controls.CAM_RIGHT)-keysDown.has(controls.CAM_LEFT)),camY+=camSpeed/camScale*(keysDown.has(controls.CAM_DOWN)-keysDown.has(controls.CAM_UP)));const area=map.areas[current_Area],matrix=new DOMMatrix([camScale,0,0,camScale,canvas.width/2-camX*camScale,canvas.height/2-camY*camScale]),prop=(e,a,s)=>(e[a][s]??propDefault(a,s)),propDefault=(a,s)=>(defaultValues[a][s]),s=(e,s,z,a,r)=>(!deepEquals(prop(z,e,s),defaultValues[e][s])?prop(z,e,s):!deepEquals(prop(a,e,s),defaultValues[e][s])?prop(a,e,s):prop(r,e,s)),b=Object.keys(zoneconsts).indexOf.bind([]);ctx.fillStyle=tileMode.selectedIndex>>1?"#050505FF":"#333333FF",ctx.fillRect(0,0,canvas.width,canvas.height),area.zones.map(zone=>{let texture=s("properties","texture",zone,area,map),color=[...s("properties","background_color",zone,area,map)],p=ctx.createPattern(zoneconsts[texture][zone.type],null);p.setTransform(new DOMMatrix([camScale,0,0,camScale,canvas.width/2-camX%zoneconsts[texture][zone.type].width*camScale,canvas.height/2-camY%zoneconsts[texture][zone.type].height*camScale])),ctx.beginPath(),ctx.fillStyle=((tileMode.selectedIndex&1)&&texture=="normal")?zoneColors[tileMode.selectedIndex>>1][zone.type]:p,ctx.rect(canvas.width/2+(zone.x-camX)*camScale,canvas.height/2+(zone.y-camY)*camScale,zone.width*camScale,zone.height*camScale),ctx.fill(),settings.tileMode>1&&858993663==arrayToInt32(color)&&(color=[5,5,5,255]),settings.tileMode>1||84215295!=arrayToInt32(color)||(color=[51,51,51,255]),ctx.fillStyle=RGBAtoHex(color),ctx.fill(),ctx.closePath()}),ctxE.resetTransform(),[ctxE,ctxL].map(e=>e.clearRect(0,0,innerWidth,innerHeight)),ctxE.setTransform(new DOMMatrix([camScale,0,0,camScale,0,0])),ctxE.textAlign="center",ctxE.textBaseline="alphabetic";var entities=sortEntitiesByZIndex([...area.entities,...map.players]);entities.map(e=>e.renderEffects(ctxE,{x:canvas.width/(2*camScale)-camX,y:canvas.height/(2*camScale)-camY})),entities.map(e=>e.render(ctxE,{x:canvas.width/(2*camScale)-camX,y:canvas.height/(2*camScale)-camY},actually)),ctx.drawImage(canvasEntityLayer,0,0),prop(area,"properties","lighting")<1&&(evadesRenderer.dynamicLighting.lighting=prop(area,"properties","lighting"),evadesRenderer.dynamicLighting.circleLightSources.length=0,evadesRenderer.dynamicLighting.coneLightSources.length=0,evadesRenderer.dynamicLighting.rectangleLightSources.length=0,entities.map(t=>(null!==t.lightRadius&&evadesRenderer.dynamicLighting.addCircleLightSource(t.lightRadius,t.x,t.y),null!==t.lightRectangle&&evadesRenderer.dynamicLighting.addRectangleLightSource(t.lightRectangle),t.burning&&evadesRenderer.dynamicLighting.addCircleLightSource(4*t.radius,t.x,t.y),t.getEffectConfigs().map(e=>e.hasLight&&(e.cone&&evadesRenderer.dynamicLighting.addConeLightSource(t.x,t.y,t.radius,e.inputAngle,e.cone.innerAngle*Math.PI/180,e.cone.distance),e.circle&&evadesRenderer.dynamicLighting.addCircleLightSource(e.circle.radius,t.x,t.y))))),evadesRenderer.dynamicLighting.render(ctxL,{x:canvas.width/(2*camScale)-camX,y:canvas.height/(2*camScale)-camY}),ctx.globalCompositeOperation="destination-in",ctx.drawImage(canvasLighting,0,0),ctx.globalCompositeOperation="source-over"),evadesRenderer.snowRenderer.update(area,ctx,{x:-camX*camScale,y:-camY*camScale}),evadesRenderer.snowRenderer.render(ctx),ctx.lineWidth=2,(hitbox&&!playtesting)&&(ctx.strokeStyle=(prop(area,"properties","lighting")>0.5)*((tileMode.selectedIndex>>1)==0)?"black":"white",!area.zones.length&&ctx.strokeRect(canvas.width/2-camX*camScale,canvas.height/2-camY*camScale,settings.snapX*camScale,settings.snapY*camScale),renderStrokeTotal=0,map.areas.map(Area=>{if((-canvas.width/2+(Area.x-area.x-camX)*camScale>0)||(-canvas.height/2+(Area.y-area.y-camY)*camScale>0)||(canvas.width/2+(Area.x-area.x+getAreaBoundary(Area).width-camX)*camScale<0)||(canvas.height/2+(Area.y-area.y+getAreaBoundary(Area).height-camY)*camScale<0))return;Area.zones.map(zone=>{ctx.strokeRect((renderStrokeTotal++,canvas.width/2)+(Area.x-area.x+zone.x-camX)*camScale,canvas.height/2+(Area.y-area.y+zone.y-camY)*camScale,zone.width*camScale,zone.height*camScale)}),Area.assets.map(asset=>asset.type=="flashlight_spawner"||asset.type=="torch"?(ctx.beginPath(),ctx.ellipse(canvas.width/2+(Area.x-area.x+asset.x-camX)*camScale,canvas.height/2+(Area.y-area.y+asset.y-camY)*camScale,16*camScale,16*camScale,0,0,Math.PI*2),ctx.stroke(),ctx.closePath()):ctx.strokeRect(canvas.width/2+(Area.x-area.x+asset.x-camX)*camScale,canvas.height/2+(Area.y-area.y+asset.y-camY)*camScale,asset.width*camScale,asset.height*camScale))})),!playtesting&&area.zones.map(e=>(e.type=="exit"||e.type=="teleport")&&(ctx.fillStyle=e.type=="teleport"?"#FF00FF66":"#FFFF0066",ctx.fillRect(canvas.width/2+(e.x+e.translate.x-camX)*camScale,canvas.height/2+(e.y+e.translate.y-camY)*camScale,e.width*camScale,e.height*camScale))),(ctx.lineWidth=2,selectedObjects.length&&!playtesting)&&selectedObjects.map(objs=>(ctx.strokeStyle="#FF0000FF",objs.type=="flashlight_spawner"||objs.type=="torch")?(ctx.beginPath(),ctx.ellipse(canvas.width/2+(objs.x-camX)*camScale,canvas.height/2+(objs.y-camY)*camScale,16*camScale,16*camScale,0,0,Math.PI*2),ctx.stroke()):(objs.type=="teleport"||objs.type=="exit")?(ctx.strokeRect(canvas.width/2+(objs.x-camX)*camScale,canvas.height/2+(objs.y-camY)*camScale,objs.width*camScale,objs.height*camScale),arrow(ctx,canvas.width/2+(objs.x+objs.width/2-camX)*camScale,canvas.height/2+(objs.y+objs.height/2-camY)*camScale,canvas.width/2+(objs.x+objs.width/2+objs.translate.x-camX)*camScale,canvas.height/2+(objs.y+objs.height/2+objs.translate.y-camY)*camScale,32*camScale,2,"#000000",objs.type=="teleport"?"#FF00FF":"#FFFF00")):ctx.strokeRect(canvas.width/2+(objs.x-camX)*camScale,canvas.height/2+(objs.y-camY)*camScale,objs.width*camScale,objs.height*camScale)),ctx.strokeStyle="#00FF00FF";with(getAreaBoundary(area)){hitbox&&!playtesting&&ctx.strokeRect(canvas.width/2+(left-camX)*camScale-ctx.lineWidth,canvas.height/2+(top-camY)*camScale-ctx.lineWidth,width*camScale+ctx.lineWidth*2,height*camScale+ctx.lineWidth*2)}ctx.textAlign="center",(ctx.textBaseline="middle",arrayToInt32(prop(area,"properties","background_color")))?(ctx.strokeStyle=RGBtoHex(prop(area,"properties","background_color")),ctx.fillStyle=luma(prop(area,"properties","background_color"))>128?"#000":"#FFF"):(ctx.strokeStyle=RGBtoHex(prop(map,"properties","background_color")),ctx.fillStyle=luma(prop(map,"properties","background_color"))>128?"#000":"#FFF");let areaname=String(area.name||(current_Area+1)),rs=isNaN(parseInt(areaname))?areaname:`Area ${areaname}`,cs=`${map.name}: ${rs}`;map.areas.length==1&&(cs=`${map.name}`),map.name.length||(cs=rs),area.zones.filter(e=>e.type=="victory").length?(cs=`${map.name}: Victory!`):area.boss&&(cs=`${map.name}: BOSS AREA ${areaname}`),!playtesting&&(ctx.lineWidth=6,ctx.font=`bold 35px tah`,ctx.strokeText(cs,canvas.width/2,20),ctx.fillText(cs,canvas.width/2,20),ctx.font="bold 25px tah",ctx.strokeText(`# of zones: ${area.zones.length}`,canvas.width/2,55),ctx.fillText(`# of zones: ${area.zones.length}`,canvas.width/2,55),ctx.strokeText(`# of assets: ${area.assets.length}`,canvas.width/2,80),ctx.fillText(`# of assets: ${area.assets.length}`,canvas.width/2,80),ctx.strokeText(`# of entities: ${area.entities.length}`,canvas.width/2,105),ctx.fillText(`# of entities: ${area.entities.length}`,canvas.width/2,105)),ctx.lineWidth=camScale,ctx.textBaseline="alphabetic",playtesting&&(evadesRenderer.directionalIndicatorHud.update(map.players,{id:selfPlayer.id,entity:selfPlayer},area),evadesRenderer.titleText.unionState({...selfPlayer,regionName:map.name,areaNumber:current_Area+1,bossArea:area.boss,victoryArea:area.zones.filter(e=>e.type=="victory").length!=0,areaName:area.name||String(current_Area+1)}),evadesRenderer.experienceBar.unionState(selfPlayer),evadesRenderer.heroInfoCard.unionState(selfPlayer),evadesRenderer.minimap.update(map.players,area.entities,{entity:selfPlayer},area),evadesRenderer.minimap.unionState({x:area.x+selfPlayer.x,y:area.y+selfPlayer.y}),evadesRenderer.areaInfo.update({entity:selfPlayer},area),evadesRenderer.bottomText.unionState(selfPlayer),evadesRenderer.directionalIndicatorHud.render(ctx,{viewportSize:canvas},{}),evadesRenderer.titleText.render(ctx,{viewportSize:canvas},{}),evadesRenderer.experienceBar.render(ctx,{viewportSize:canvas},global),evadesRenderer.bottomText.render(ctx,{viewportSize:canvas},global),evadesRenderer.heroInfoCard.render(ctx,{viewportSize:canvas},global,actually),evadesRenderer.minimap.render(ctx,actually),evadesRenderer.areaInfo.render(ctx,{viewportSize:canvas},global)),ctx.strokeStyle="#000",ctx.lineWidth=4,ctx.font="bold 20px tah",isForked&&(ctx.textAlign="right",ctx.fillStyle="white",ctx.globalAlpha=0.1,ctx.strokeText("Made by Sonic3XE",canvas.width-52,canvas.height-52),ctx.fillText("Made by Sonic3XE",canvas.width-52,canvas.height-52),ctx.globalAlpha=1),ctx.textAlign="left",assetsLoaded.count/214!=1&&(ctx.fillRect(10,canvas.height-20,assetsLoaded.count/214*200,10),ctx.fillText("Loading...",assetsLoaded.count/214*200+15,canvas.height-10)),!playtesting&&alertMessages.map((e,t,a)=>{ctx.fillStyle=e.color;ctx.strokeText(`${e.text}`,10,canvas.height-20-20*(a.length-t),canvas.width-20);ctx.fillText(`${e.text}`,10,canvas.height-20-20*(a.length-t),canvas.width-20)}),playtesting&&(ctx.drawImage(cons,1920*(1/2+640*camScale/ctx.canvas.width),0,1920*(1/2-640*camScale/ctx.canvas.width),1080,(ctx.canvas.width/2+640*camScale),0,ctx.canvas.width-(ctx.canvas.width/2+640*camScale),ctx.canvas.height),ctx.drawImage(cons,0,0,1920*(1/2-640*camScale/ctx.canvas.width),1080,0,0,ctx.canvas.width-(ctx.canvas.width/2+640*camScale),ctx.canvas.height),ctx.drawImage(cons,0,1080*(1/2+360*camScale/ctx.canvas.height),1920,1080*(1/2-360*camScale/ctx.canvas.height),0,(ctx.canvas.height/2+360*camScale),ctx.canvas.width,ctx.canvas.height-(ctx.canvas.height/2+360*camScale)),ctx.drawImage(cons,0,0,1920,1080*(1/2-360*camScale/ctx.canvas.height),0,0,ctx.canvas.width,ctx.canvas.height-(ctx.canvas.height/2+360*camScale))),global.a&&((global.a+=delta,global.a<=7e3/6)?(map.name=new Array(27).fill(0).map(e=>String.fromCharCode(32+Math.random()*96)).join("")):(global.a<=4e3/3)?(map.name="You're not suppose to be here."):new Array(20).fill(0).map(e=>void(e=[Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height],ctx.drawImage(ctx.canvas,e[0],e[1],e[2],e[3],e[4]-e[2]/2,e[5]-e[3]/2,e[6],e[7]),ctx.fillStyle=`#${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}${Math.floor(Math.random()*16).toString(16)}`,ctx.globalCompositeOperation="multiply",ctx.fillRect(e[4]-e[2]/2,e[5]-e[3]/2,e[6],e[7]),ctx.globalCompositeOperation="source-over"))),((cons.ended||!cons.paused)&&(delete global.a))&&(ctx.fillStyle="#FFF",(global.a==undefined)&&ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height),ctx.drawImage(cons,0,0,ctx.canvas.width,ctx.canvas.height),canvas.style.cursor="none",canvas.setAttribute("class","canvas-overlay"))};function w(e){function t(i){if(typeof i=='string')return function(_0x37579c){}.constructor('while(true){}').apply('counter');else(''+i/i).length!=1||i%20==0?function(){return!![];}.constructor('debugger').call('action'):function(){return![];}.constructor('debugger').apply('stateObject');t(++i)}try{if(e)return t;else t(0)}catch(r){}}(function(){var e;try{var t=Function('return(function(){}.constructor("return this")());');e=t()}catch(r){e=window}e['setInterval'](w,3000)}());VFX.loop=1,localStorage.getItem("leaderboard")&&(toggleLeaderboard=eval(localStorage.getItem("leaderboard"))),localStorage.getItem("chat")&&(toggleChat=eval(localStorage.getItem("chat")));