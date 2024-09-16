function loadFile(str,fromLocal=!0,socketSend=true,isLegacy=false){
	if(consumed_by_ink_demon&&useractive.hasBeenActive)return;
	const noew=performance.now();
    try{
		//if(extension=="evadesmap")throw "Undeserializable file detected."
		const obj=YAML.parse(str);
		if(isLegacy){
			if(obj.properties){
				Object.keys(obj.properties).map(e=>{
					(e=="minimum_speed"||e=="maximum_speed")&&void 0!==obj.properties[e]&&(obj.properties[e]=parseFloat((obj.properties[e]*30).toFixed(1)));
				});
			};
			obj.areas.map(e=>{
				if(e.properties){
					Object.keys(e.properties).map(t=>{
						(t=="minimum_speed"||t=="maximum_speed")&&void 0!==e.properties[t]&&(e.properties[t]=parseFloat((e.properties[t]*30).toFixed(1)));
					});
				};
				e.zones.map(t=>{
					if(t.properties){
						Object.keys(t.properties).map(a=>{
							(a=="minimum_speed"||a=="maximum_speed")&&void 0!==t.properties[a]&&(t.properties[a]=parseFloat((t.properties[a]*30).toFixed(1)));
						});
					};
					if(t.spawner){
						t.spawner.map(a=>{
							Object.keys(a).map(r=>{
								(
									r=="speed"||
									r=="turn_speed"||
									r=="turn_acceleration"||
									r=="quicksand_strength"||
									r=="increment"||
									r=="shot_acceleration"||
									r=="gravity"||
									r=="repulsion"||
									r=="speed_loss"||
									r=="projectile_speed"
								)&&void 0!==a[r]&&(a[r]=parseFloat((a[r]*30).toFixed(1)));
							});
						})
					};
				})
			})
		}
		current_Area=0;
		"element" in map && (map.element.remove(),delete map.element);
		map.element=createFolder(formatString("editor.region"), [
			createProperty(formatString("editor.property.name"),nameInput=createInput(map.name=obj.name,_=>{map.name=nameInput.value}),"text"),
			createProperty(formatString("editor.property.share_to_drive"),boolInput=createInput(map.share_to_drive,_=>{map.share_to_drive=boolInput.checked}),"switch",{value:obj.share_to_drive??defaultValues.share_to_drive}),
			(map.properties=createPropertyObj({...defaultValues.properties,...obj.properties},"region")).element,
		]);
		map.element.classList.add("closed");
		menu.insertBefore(map.element,areamenu);
		try{
			socketSend&&socket.send(msgpack.encode({content:str,
				name:obj.name
			}));
		}catch(e){
			console.log("Unable to send message to socket.", e)
		};
		map.areas = [];
		areamenu.firstChild && areamenu.removeChild(areamenu.firstChild);
		if(selectedObjects){
			for(var obj2 of selectedObjects){
				obj2.element.remove();
				obj2.properties.element.remove();
				delete obj2.element;
				delete obj2.properties.element;
				delete obj2.inputs;
				delete obj2.properties.inputs;
			}
		}
		selectedObjects=[];
		map.areas=obj.areas.map(_=>newArea(_));
		customAREAgui(map.areas[0]);
		areamenu.appendChild(map.areas[0].element);
		fromLocal&&customAlert("Successfully imported region in "+(performance.now()-noew)+" ms.",1);
	}catch(err){
		try{
			socketSend&&socket.send(msgpack.encode({content:str,
				name:obj.name
			}));
		}catch(e){
			console.log("Unable to send message to socket.", e)
		};
		//var rng=Math.random()<0.1;
		//(rng?consumed_by_ink_demon=1:customAlert("Import error. Please check your file to see the problems.",1/0));
		customAlert(`Failed to import region due to an error in ${fromLocal?"your file":"the regions directory"}.`,10)
		err.stack.split("\n").map(e=>customAlert(e,10,"#F00"))
		console.log(err);
	}
	updateMap();
	if(alertMessages.filter(e=>e.color=="#FF3333").length){throw "Missing properties. T_T"}
}
function download(exportName = "map") {
    if(!consumed_by_ink_demon){
		try{
			let dataStr;(customAlert("Exporting region...",1),!ExportFormatType.selectedIndex)?(dataStr="data:text/yaml;charset=utf-8,"+encodeURIComponent(YAML.stringify(JSON.parse(mapToJSON(map))))):(dataStr="data:text/json;charset=utf-8,"+encodeURIComponent(mapToJSON(map)))
			const a=document.createElement('a');a.setAttribute("href",dataStr),a.setAttribute("download",exportName.replace(/ /g,"-").toLowerCase()+(settings.legacySpeedUnits?".legacy":"")+(ExportFormatType.selectedIndex?".json":".yaml")),document.body.appendChild(a),a.click(),a.remove();
		}catch(e){
			customAlert("Export error.",60);
			customAlert(e,60);
		}
	}else{
		customAlert("A fatal error has occurred while exporting.",1/0,"#F00");
	}
}
function deepEquals(obj1, obj2, parents1, parents2) {
    "use strict";
    var i;
    if (obj1 === undefined || obj2 === undefined || 
        obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }
    if (typeof (obj1) !== 'object' || typeof (obj2) !== 'object') {
        return obj1.valueOf() === obj2.valueOf();
    }
    if (obj1.constructor !== obj2.constructor || (obj1.length !== undefined && obj1.length !== obj2.length)) {
        return false;
    }
    for (i in obj1) {
        if (parents1 === undefined) parents1 = [];
        if (obj1.constructor === Object) parents1.push(obj1);
        if (parents2 === undefined) parents2 = [];
        if (obj2.constructor === Object) parents2.push(obj2);
        if (obj1.propertyIsEnumerable(i)) {
            if (obj2.propertyIsEnumerable(i)) {
                if ((obj1[i].constructor === Object && parents1.indexOf(obj1[i]) >= 0) || (obj2[i].constructor === Object && parents2.indexOf(obj2[i]) >= 0)) {
                    if (obj1[i] !== obj2[i]) {
                        return false;
                    }
                    continue;
                }
                if (!deepEquals(obj1[i], obj2[i], parents1, parents2)) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    return true;
};
/**
 * @param {EvadesMap} map 
 */
function mapToJSON(map) {
    var res={};
    var props=Object.keys(map.properties);
    for(var i in props){
      if(props[i]=="element"||props[i]=="inputs")continue;
      if(props)
      if(!deepEquals(defaultValues.properties[props[i]],map.properties[props[i]])){
        res[props[i]]=map.properties[props[i]];
		if(settings.legacySpeedUnits&&(props[i]=="maximum_speed"||props[i]=="minimum_speed"))res[props[i]]/=30;
      }
    }
    let areas = [];
    for (let area of map.areas) {
        areas.push(areaToJSON(area,true));
    }
    return `{"name":${JSON.stringify(map.name)},${map.share_to_drive!=defaultValues.share_to_drive?`"share_to_drive":${map.share_to_drive},`:""}"properties":${JSON.stringify(res)},"areas":[${areas.join()}]}`.replaceAll('"properties":{},',"");
}

/**
 * @param {Area} area 
 */
function areaToJSON(area,legacy) {
	let objects = [],assets = [];
	for (var i in area.zones) {
		var zone=area.zones[i];
		switch(zone.type){
			case"active":objects.push(activeToJSON(zone,legacy));break;
			case"safe":objects.push(safeToJSON(zone,legacy));break;
			case"exit":
			case"teleport":objects.push(exitToJSON(zone,legacy));break;
			case"victory":objects.push(victoryToJSON(zone,legacy));break;
			case"removal":objects.push(removalToJSON(zone,legacy));break;
			case"dummy":objects.push(dummyToJSON(zone,legacy));break;
			default:throw"Unknown zone type.";
		}
	}
	for (var j in area.assets) {
		var asset=area.assets[j];
		switch(asset.type){
			case"wall":assets.push(wallToJSON(asset));break;
			case"light_region":assets.push(light_regionToJSON(asset));break;
			case"torch":assets.push(torchToJSON(asset));break;
			case"flashlight_spawner":assets.push(flashlight_spawnerToJSON(asset));break;
			case"gate":assets.push(gateToJSON(asset));break;
			default:throw"Unknown asset type.";
		}
	}
	var res={};
	if(area.properties){
		for(const[key,value]of Object.entries(area.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{${!area.boss?"":`"boss":${area.boss},`}${(area.name==""||area.name==void 0)?"":`"name":${JSON.stringify(area.name)},`}"properties":${JSON.stringify(res)},"x":${typeof area.rx=="number"?area.rx:''.concat('"',area.rx,'"')},"y":${typeof area.ry=="number"?area.ry:''.concat('"',area.ry,'"')},"zones":[${objects.join()}],"assets":[${assets.join()}]}`.replace(`,"assets":[]`,"");
}

/**
 * ZONES
 */
function activeToJSON(e,legacy) {
	var spawners=[];
	for (const spawner of e.spawner){
		spawners.push(spawnerToJSON(spawner,legacy));
	};
	var res={};
	if(e.properties){
		for(const[key,value]of Object.entries(e.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(legacy&&settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{"type":"${e.type}","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')},"spawner":[${spawners.join()}]}`.replace(`,"spawner":[]`,"");
}
function safeToJSON(e,legacy) {
	var res={};
	if(e.properties){
		for(const[key,value]of Object.entries(e.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(legacy&&settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{"type":"${e.type}","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function exitToJSON(e,legacy) {
	var res={};
	if(e.properties){
		for(const[key,value]of Object.entries(e.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(legacy&&settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{"type":"${e.type}","properties":${JSON.stringify(res)},${(e.requirements.map(t=>{return t.requirement}).filter(t=>{return t!=""}).length&&e.type=="teleport")?`"requirements":${JSON.stringify(e.requirements.map(t=>{return t.requirement}).filter(t=>{return t!=""}))},`:""}"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"translate":{"x":${e.translate.x},"y":${e.translate.y}},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function victoryToJSON(e,legacy) {
	var res={};
	if(e.properties){
		for(const[key,value]of Object.entries(e.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(legacy&&settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{"type":"${e.type}","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function removalToJSON(e,legacy) {
	var res={};
	if(e.properties){
		for(const[key,value]of Object.entries(e.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(legacy&&settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{"type":"removal","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function dummyToJSON(e,legacy) {
	var res={};
	if(e.properties){
		for(const[key,value]of Object.entries(e.properties)){
			if(key=="element")continue;
			if(void 0!==value){
				res[key]=value;
				if(legacy&&settings.legacySpeedUnits&&(key=="maximum_speed"||key=="minimum_speed"))res[key]/=30;
			}
		}
	}
	return `{"type":"dummy","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
/**
 * SPAWNER
 */
function spawnerToJSON(spawner,legacy) {
  var object=cloneSpawner(spawner);
  const legacyConversionProps="speed,turn_speed,turn_acceleration,shot_acceleration,projectile_speed,speed_loss,increment,gravity,repulsion,quicksand_strength".split(",")
  //if there is a default value exist in object, destroy the property.
  for(var i in object)if(object[i]==defaultValues.spawner[i])delete object[i];
  var newobj={...object};
  for(var i of legacyConversionProps){
	  if(newobj[i]==void 0)continue;
	  if(legacy&&settings.legacySpeedUnits)newobj[i]/=30;
  }
  return JSON.stringify(newobj);
}
/**
 * ASSETS
 */
function wallToJSON(wall) {
  return `{"type":"wall","x":${wall.x},"y":${wall.y},"width":${wall.width},"height":${wall.height},"texture":"${wall.texture}"}`.replace(`"texture":"null"`,`"texture":null`);
}
function light_regionToJSON(light_region) {
  return `{"type":"light_region","x":${light_region.x},"y":${light_region.y},"width":${light_region.width},"height":${light_region.height}}`;
}
function flashlight_spawnerToJSON(flashlight_spawner) {
  return `{"type":"flashlight_spawner","x":${flashlight_spawner.x},"y":${flashlight_spawner.y}}`;
}
function torchToJSON(torch) {
  return `{"type":"torch","x":${torch.x},"y":${torch.y},"upside_down":${torch.upside_down}}`;
}
function gateToJSON(gate) {
  return `{"type":"gate","x":${gate.x},"y":${gate.y},"width":${gate.width},"height":${gate.height}}`;
}
/** 
 * @param {number} t
 * @param {number} e
 * @returns {HTMLCanvasElement} o
*/
function createOffscreenCanvas(t, e) {
  var o = document.createElement("canvas");
  return o.width = t,
    o.height = e,
    o
}
