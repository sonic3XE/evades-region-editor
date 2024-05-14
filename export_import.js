function loadFile(str,fromLocal=!0,socketSend=true) {
		if(consumed_by_ink_demon&&useractive.hasBeenActive)return;
		var noew=performance.now();
        try{
        current_Area = 0;
        alertMessages=[];
        var e = jsyaml.load(str);
        let obj = e;
		try{
      socketSend&&socket.send(msgpack.encode({content:str,
        name:obj.name
		}));}catch(e){
			console.log("Unable to send message to socket.", e)
		};
  obj.properties=createPropertyObj({...defaultValues.properties,...obj.properties},"region");
  var objKeys=Object.keys(obj.properties);
        map.inputs.name.value = map.name = obj.name;
map.properties.background_color??=[0,0,0,0];
try{map.properties.inputs.opacity.value=map.properties.background_color[3]=Math.round(obj.properties.background_color[3]);
}catch(e){map.properties.inputs.opacity.value=map.properties.background_color[3]=0}

          for(var i in objKeys){
            if(map.properties.inputs.hasOwnProperty(objKeys[i])){
              if(map.properties.inputs[objKeys[i]].type=="checkbox"){
                map.properties.inputs[objKeys[i]].checked=map.properties[objKeys[i]]=obj.properties[objKeys[i]];
              }else{
                map.properties.inputs[objKeys[i]].value=map.properties[objKeys[i]]=obj.properties[objKeys[i]];
              }
            }
          }
          map.properties.inputs.color.value = RGBtoHex(obj.properties?.background_color||[0,0,0,0]);
        try{
        map.properties.background_color[0]=Math.round(obj.properties?.background_color[0]||0);
        map.properties.background_color[1]=Math.round(obj.properties?.background_color[1]||0);
        map.properties.background_color[2]=Math.round(obj.properties?.background_color[2]||0);
        map.properties.texture=obj.properties?.texture||"normal";
        }catch(e){
        map.properties.background_color[0]=0
        map.properties.background_color[1]=0
        map.properties.background_color[2]=0
        map.properties.texture="normal";
        }
        menu.childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[2].childNodes[1].selectedIndex=["normal","leaves","wooden","baguette"].indexOf(map.properties.texture.toLowerCase());
        menu.childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].style.borderLeftColor=
        menu.childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].style.background=
        menu.childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].textContent=RGBtoHex(map.properties.background_color)
        map.areas = [];
        areamenu.firstChild && areamenu.removeChild(areamenu.firstChild);
        if (selectedObject){
          selectedObject.element.remove();
          selectedObject.properties.element.remove();
          delete selectedObject.element;
          delete selectedObject.properties.element;
          delete selectedObject.inputs;
          delete selectedObject.properties.inputs;
        }
        selectedObject = null;
		map.areas=obj.areas.map(e=>{
            return createArea(e);
		});
        customAREAgui(map.areas[0]);
        areamenu.appendChild(map.areas[0].element);
        fromLocal&&customAlert("Successfully imported region in "+(performance.now()-noew)+" ms.",1);
        }catch(err){var rng=Math.random()<0.1;(rng?consumed_by_ink_demon=1:customAlert("Import error. Please check your file to see the problems.",1/0));console.log(err)}
      updateMap();
  if(alertMessages.filter(e=>e.color=="#FF3333").length){throw "Missing properties. T_T"}
}
function saveToStorage(slot){
  return localStorage.setItem("map"+String(slot),mapToJSON(map));
}
/**
 * @param {string} obj
 * @param {string} exportName 
 */
function download(exportName = "map") {
	if(consumed_by_ink_demon)return;
    try{customAlert("Exporting region...",1);
    // Copied from stackoverflow
	let dataStr;
	if(ExportFormatType.selectedIndex==0){
		dataStr = "data:text/yaml;charset=utf-8," + encodeURIComponent(YAML.stringify(JSON.parse(mapToJSON(map))));
	}else if(ExportFormatType.selectedIndex==1){
		dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(mapToJSON(map));
	}

    const a = document.createElement('a');
    a.setAttribute("href", dataStr);
	if(ExportFormatType.selectedIndex==0){
		a.setAttribute("download", exportName.replace(/ /g,"-").toLowerCase() + ".yaml");
	}else if(ExportFormatType.selectedIndex==1){
		a.setAttribute("download", exportName.replace(/ /g,"-").toLowerCase() + ".json");
	}

    document.body.appendChild(a); // required for firefox
    a.click();
    a.remove();}catch(e){
		customAlert("Export error.",60);
		customAlert(e,60);
	}
}

function deepEquals(obj1, obj2, parents1, parents2) {
    "use strict";
    var i;
    // compare null and undefined
    if (obj1 === undefined || obj2 === undefined || 
        obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    // compare primitives
    if (typeof (obj1) !== 'object' || typeof (obj2) !== 'object') {
        return obj1.valueOf() === obj2.valueOf();
    }

    // if objects are of different types or lengths they can't be equal
    if (obj1.constructor !== obj2.constructor || (obj1.length !== undefined && obj1.length !== obj2.length)) {
        return false;
    }

    // iterate the objects
    for (i in obj1) {
        // build the parents list for object on the left (obj1)
        if (parents1 === undefined) parents1 = [];
        if (obj1.constructor === Object) parents1.push(obj1);
        // build the parents list for object on the right (obj2)
        if (parents2 === undefined) parents2 = [];
        if (obj2.constructor === Object) parents2.push(obj2);
        // walk through object properties
        if (obj1.propertyIsEnumerable(i)) {
            if (obj2.propertyIsEnumerable(i)) {
                // if object at i was met while going down here
                // it's a self reference
                if ((obj1[i].constructor === Object && parents1.indexOf(obj1[i]) >= 0) || (obj2[i].constructor === Object && parents2.indexOf(obj2[i]) >= 0)) {
                    if (obj1[i] !== obj2[i]) {
                        return false;
                    }
                    continue;
                }
                // it's not a self reference so we are here
                if (!deepEquals(obj1[i], obj2[i], parents1, parents2)) {
                    return false;
                }
            } else {
                // obj2[i] does not exist
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
      }
    }
    let areas = [];
    for (let area of map.areas) {
        areas.push(areaToJSON(area));
    }
    return `{"name":"${map.name}","properties":${JSON.stringify(res)},"areas":[${areas.join()}]}`.replaceAll('"properties":{},',"");
}

/**
 * @param {Area} area 
 */
function areaToJSON(area) {
  let objects = [],assets = [];
  for (var i in area.zones) {
    var zone=area.zones[i];
    switch(zone.type){
      case"active":objects.push(activeToJSON(zone));break;
      case"safe":objects.push(safeToJSON(zone));break;
      case"exit":
      case"teleport":objects.push(exitToJSON(zone));break;
      case"victory":objects.push(victoryToJSON(zone));break;
      case"removal":objects.push(removalToJSON(zone));break;
      case"dummy":objects.push(dummyToJSON(zone));break;
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
  var props=Object.keys(area.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(area.properties.background_color&&!area.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],area.properties[props[i]])){
      res[props[i]]=area.properties[props[i]]
    }
  }
  return `{${area.name==""?"":`"name":"${area.name}",`}"properties":${JSON.stringify(res)},"x":${typeof area.rx=="number"?area.rx:''.concat('"',area.rx,'"')},"y":${typeof area.ry=="number"?area.ry:''.concat('"',area.ry,'"')},"zones":[${objects.join()}],"assets":[${assets.join()}]}`.replace(`,"assets":[]`,"");
}

/**
 * ZONES
 */
function activeToJSON(e) {
  var spawner=[];
  for (var spawners in e.spawner){
    spawner.push(spawnerToJSON(e.spawner[spawners]));
  };
  var res={};
  var props=Object.keys(e.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(e.properties.background_color&&!e.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],e.properties[props[i]])){
      res[props[i]]=e.properties[props[i]]
    }
  }
    return `{"type":"active","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')},"spawner":[${spawner.join()}]}`.replace(`,"spawner":[]`,"");
}
function safeToJSON(e) {
  var res={};
  var props=Object.keys(e.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(e.properties.background_color&&!e.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],e.properties[props[i]])){
      res[props[i]]=e.properties[props[i]]
    }
  }
    return `{"type":"safe","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function exitToJSON(e) {
  var res={};
  var props=Object.keys(e.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(e.properties.background_color&&!e.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],e.properties[props[i]])){
      res[props[i]]=e.properties[props[i]]
    }
  }
    return `{"type":"${e.type}","properties":${JSON.stringify(res)},${(e.requirements.map(t=>{return t.requirement}).filter(t=>{return t!=""}).length&&e.type=="teleport")?`"requirements":${JSON.stringify(e.requirements.map(t=>{return t.requirement}).filter(t=>{return t!=""}))},`:""}"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"translate":{"x":${e.translate.x},"y":${e.translate.y}},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function victoryToJSON(e) {
  var res={};
  var props=Object.keys(e.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(e.properties.background_color&&!e.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],e.properties[props[i]])){
      res[props[i]]=e.properties[props[i]]
    }
  }
    return `{"type":"victory","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function removalToJSON(e) {
  var res={};
  var props=Object.keys(e.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(e.properties.background_color&&!e.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],e.properties[props[i]])){
      res[props[i]]=e.properties[props[i]]
    }
  }
    return `{"type":"removal","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
function dummyToJSON(e) {
  var res={};
  var props=Object.keys(e.properties);
  for(var i in props){
    if(props[i]=="inputs"||props[i]=="element"||(e.properties.background_color&&!e.properties.background_color.reduce((e,t)=>{return e+t})&&props[i]=="background_color"))continue;
    if(!deepEquals(defaultValues.properties[props[i]],e.properties[props[i]])){
      res[props[i]]=e.properties[props[i]]
    }
  }
    return `{"type":"dummy","properties":${JSON.stringify(res)},"x":${typeof e.rx=="number"?e.rx:''.concat('"',e.rx,'"')},"y":${typeof e.ry=="number"?e.ry:''.concat('"',e.ry,'"')},"width":${typeof e.rw=="number"?e.rw:''.concat('"',e.rw,'"')},"height":${typeof e.rh=="number"?e.rh:''.concat('"',e.rh,'"')}}`;
}
/**
 * SPAWNER
 */
function spawnerToJSON(spawner) {
  var object=cloneSpawner(spawner);
  //if there is a default value exist in object, destroy the property.
  for(var i in object)if(object[i]==defaultValues.spawner[i])delete object[i];
  return JSON.stringify(object);
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