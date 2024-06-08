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

function addAsset(type) {
    //lockCursor = true;
    //canvas.style.cursor = "crosshair
    updateMouseEntity=true;
    let FlashlightSpawner = createAsset(Math.round(mouseEntity.x), Math.round(mouseEntity.y),160,160,type);
    map.areas[current_Area].assets.push(FlashlightSpawner);
    updateMap();

/*    function mousedown(e) {
        if (e.button === 2) {   
            lockCursor = false;
            canvas.style.cursor = "initial";
            canvas.removeEventListener("mousedown", mousedown);
            return;
        }
        canvas.style.cursor = "initial";

        let posX = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
        let posY = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
        selectedObject = FlashlightSpawner;
        FlashlightSpawner.createGUI();
        objectmenu.appendChild(FlashlightSpawner.element);

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            FlashlightSpawner.width = roundTo(Math.max(x - posX, 0),32);
            FlashlightSpawner.height = roundTo(Math.max(y - posY, 0),32);
            FlashlightSpawner.inputs.width.value = FlashlightSpawner.width;
            FlashlightSpawner.inputs.height.value = FlashlightSpawner.height;
        }

        if(!(FlashlightSpawner.type=="flashlight_spawner"||FlashlightSpawner.type=="torch"))canvas.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseup", () => {
            lockCursor = false;
            canvas.removeEventListener("mousedown", mousedown);
            if(!(FlashlightSpawner.type=="flashlight_spawner"||FlashlightSpawner.type=="torch"))canvas.removeEventListener("mousemove", mousemove);
        });
    }
    canvas.addEventListener("mousedown", mousedown);*/
}
/*

    function mousedown(e) {
        if (e.button === 2) {
            lockCursor = false;
            canvas.style.cursor = "initial";
            canvas.removeEventListener("mousedown", mousedown);
            return;
        }
        canvas.style.cursor = "nwse-resize";

        let posX = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
        let posY = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
        let ActiveZone = createZone(posX, posY, 0, 0,void 0,void 0,void 0,type);
        map.areas[current_Area].zones.push(ActiveZone);
        selectedObject = ActiveZone;

        function mousemove(e) {
            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
            ActiveZone.width = roundTo(Math.max(x - posX, 0),32);
            ActiveZone.height = roundTo(Math.max(y - posY, 0),32);
            ActiveZone.inputs.width.value = ActiveZone.width;
            ActiveZone.inputs.height.value = ActiveZone.height;
        }

        canvas.addEventListener("mousemove", mousemove);
        canvas.addEventListener("mouseup", () => {
            lockCursor = false;
            canvas.removeEventListener("mousedown", mousedown);
            canvas.removeEventListener("mousemove", mousemove);
        });
    }
    canvas.addEventListener("mousedown", mousedown); */
function createAsset(x=0,y=0,width=32,height=32,type="wall",upside_down=false,texture="ice") {
    const wall = {
        x,y,width,height,texture,type,upside_down,rx:0,ry:0,rw:0,rh:0,isAsset:true
    };
    return wall;
}
