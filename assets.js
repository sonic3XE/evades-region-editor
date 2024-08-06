function customASSETgui(wall){
    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = wall.x;
    xInput.addEventListener("input", () => {
        wall.x = Number(xInput.value);
    });
    const updnInput = document.createElement("input");
    updnInput.addEventListener("input", () => {
        wall.upside_down = updnInput.checked;
		spawnEntities();
    });

    const yInput = document.createElement("input");
    yInput.value = wall.y;
    yInput.addEventListener("input", () => {
        wall.y = Number(yInput.value);
    });

    const wInput = document.createElement("input");
    wInput.value = wall.width;
    wInput.addEventListener("input", () => {
        wall.width = wInput.value = Math.max(wInput.value, 0);
    });

    const hInput = document.createElement("input");
    hInput.value = wall.height;
    hInput.addEventListener("input", () => {
        wall.height = hInput.value = Math.max(hInput.value, 0);
    });
var wProp=createProperty(formatString(curLang,"editor.property.width"), wInput, "number"),
hProp=createProperty(formatString(curLang,"editor.property.height"), hInput, "number");
var upsidedown=createProperty(formatString(curLang,"editor.property.upside_down"), updnInput, "switch", {value:wall.upside_down});
var texture=createProperty(formatString(curLang,"editor.property.texture"),null,"select",{
			value:wall.texture,event:(e)=>{wall.texture=e},
			selectOptions:["normal","leaves","wooden","baguette","ice",null].map(e=>[formatString(curLang,"editor.texture."+e),e]),
			selectType:"text"});
	
				if(wall.type=="wall"){
					show(texture)
				}else{
					hide(texture)
				}
				if(wall.type=="torch"){
					show(upsidedown)
				}else{
					hide(upsidedown)
				}
				if(wall.type=="flashlight_spawner"||wall.type=="torch"){
					hide(wProp),hide(hProp)
				}else{
					show(wProp),show(hProp)
				}
    wall.element = createFolder(formatString(curLang,"editor.asset"), [
		createProperty(formatString(curLang,"editor.property.type"), null, "select",{
			value: wall.type,
			event: e => {
				if(e=="wall"){
					show(texture)
				}else{
					hide(texture)
				}
				if(e=="torch"){
					show(upsidedown)
				}else{
					hide(upsidedown)
				}
				if(e=="flashlight_spawner"||e=="torch"){
					hide(wProp),hide(hProp)
				}else{
					show(wProp),show(hProp)
				}
				wall.type = e;spawnEntities()
			},
			selectOptions: ["wall","light_region","gate","torch","flashlight_spawner"].map(e=>[formatString(curLang,"editor.asset."+e),e]),
			selectType: "text"
		}),
		texture,
		upsidedown,
		createProperty(formatString(curLang,"editor.property.x"), xInput, "number"),
		createProperty(formatString(curLang,"editor.property.y"), yInput, "number"),
		wProp,
		hProp
	]);

    wall.inputs = {
        x: xInput,
        y: yInput,
        width: wInput,
        height: hInput
    };
};
function newAsset(x=0,y=0,width=32,height=32,type="wall",upside_down=false,texture="ice") {
    const wall = {
        x,y,width,height,texture,type,upside_down,rx:0,ry:0,rw:0,rh:0,isAsset:true
    };
    return wall;
}
