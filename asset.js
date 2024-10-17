function customASSETgui(wall){
    // Create inputs/labels
    const xInput = document.createElement("input");
    xInput.value = wall.x;
    xInput.addEventListener("input", () => {
        wall.x = Number(xInput.value);
		spawnEntities();
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
		spawnEntities();
    });

    const wInput = document.createElement("input");
    wInput.value = wall.width;
    wInput.addEventListener("input", () => {
        wall.width = wInput.value = Math.max(wInput.value, 0);
		spawnEntities();
    });

    const angleInput = document.createElement("input");
    angleInput.value = wall.angle;
    angleInput.addEventListener("input", () => {
        wall.angle = angleInput.value = angleInput.value%360;
		spawnEntities();
    });

    const hInput = document.createElement("input");
    hInput.value = wall.height;
    hInput.addEventListener("input", () => {
        wall.height = hInput.value = Math.max(hInput.value, 0);
		spawnEntities();
    });
	var wProp=createProperty(formatString("editor.property.width"), wInput, "number"),
	hProp=createProperty(formatString("editor.property.height"), hInput, "number"),
	upsidedown=createProperty(formatString("editor.property.upside_down"), updnInput, "switch", {value:wall.upside_down}),
	angle=createProperty(formatString("editor.property.angle"), angleInput, "number"),
	texture=createProperty(formatString("editor.property.texture"),null,"select",{value:wall.texture,event:(e)=>{wall.texture=e;spawnEntities()},selectOptions:["normal","leaves","wooden","baguette","ice",null].map(e=>[formatString("editor.texture."+e),e]),selectType:"text"});
				hide(angle);
				if(wall.type=="wall"){
					show(texture)
					activated_extensions.includes("rotatedWallAssets")&&show(angle)
				}else{
					hide(texture)
					activated_extensions.includes("rotatedWallAssets")&&hide(angle)
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
				};
    wall.element = createFolder(formatString("editor.asset"), [
		createProperty(formatString("editor.property.type"), null, "select",{
			value: wall.type,
			event: e => {
				if(e=="wall"){
					show(texture)
					activated_extensions.includes("rotatedWallAssets")&&show(angle)
				}else{
					hide(texture)
					activated_extensions.includes("rotatedWallAssets")&&hide(angle)
				}
				if(e=="torch"){
					show(upsidedown)
				}else{
					hide(upsidedown)
				}
				if(e=="flashlight_spawner"||e=="torch"){
					hide(wProp)
					hide(hProp)
				}else{
					show(wProp)
					show(hProp)
				}
				wall.type = e;spawnEntities()
			},
			selectOptions: ["wall","light_region","gate","torch","flashlight_spawner"].map(e=>[formatString("editor.asset."+e),e]),
			selectType: "text"
		}),
		angle,
		texture,
		upsidedown,
		wProp,
		hProp,
		createProperty(formatString("editor.property.x"), xInput, "number"),
		createProperty(formatString("editor.property.y"), yInput, "number"),
	]);
    wall.inputs = {
        x: xInput,
        y: yInput,
        width: wInput,
        height: hInput
    };
};
function newAsset(x=0,y=0,width=32,height=32,type="wall",upside_down=false,texture="ice",angle=0) {
    const wall = {
        x,y,width,height,texture,type,upside_down,angle,rx:0,ry:0,rw:0,rh:0,isAsset:true
    };
    return wall;
}
