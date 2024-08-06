function closestPointToRectangle(pos, rectpos, rectsize) {
  var xpos = pos.x;
  var ypos = pos.y;
  if (xpos < rectpos.x) {
    xpos = rectpos.x
  }
  if (xpos > rectpos.x + rectsize.x) {
    xpos = rectpos.x + rectsize.x;
  }
  if (ypos < rectpos.y) {
    ypos = rectpos.y
  }
  if (ypos > rectpos.y + rectsize.y) {
    ypos = rectpos.y + rectsize.y;
  }
  return {x:xpos, y:ypos};
}
var WORLD;
var error="";
var areaCount=0;
function generate_guest_username(){
    function choose(e){
        return e[Math.floor(Math.random()*e.length)]
    }
    var consonants=['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'],
        vowels=['a', 'e', 'i', 'o', 'u'],
        code="",
        randInt=choose([2,3,4,5])
        username="Guest";
    for(var i=0;i<randInt;i++){
        code+=choose(consonants);
        code+=choose(vowels);
    };
    code=code[0].toUpperCase()+code.slice(1);
    return username+code;
}
function customAREAgui(area){
	area.name??="";
    const nameInput = document.createElement("input");
    nameInput.value = area.name;
    nameInput.addEventListener("input", () => {
        area.name = nameInput.value;
    });
    const bossInput = document.createElement("input");
    bossInput.checked = area.boss;
    bossInput.addEventListener("input", () => {
        area.boss = bossInput.checked;
    });

    const xInput = document.createElement("input");
    xInput.value = area.rx;
    xInput.addEventListener("input", () => {
        area.rx = xInput.value;
        if(!isNaN(Number(xInput.value))){
          area.rx = area.x = Number(xInput.value);
        }
      updateMap();
    });

    const yInput = document.createElement("input");
    yInput.value = area.ry;
    yInput.addEventListener("input", () => {
        area.ry = yInput.value;
        if(!isNaN(Number(yInput.value))){
          area.ry = area.y = Number(yInput.value);
        }
      updateMap();
    });

  var props=createPropertyObj(area.properties);
  area.properties=props;
    area.element = createFolder(formatString(curLang,"editor.area"), [
        createProperty(formatString(curLang,"editor.property.boss"), bossInput, "switch", {value: area.boss ?? defaultValues.boss}),
        createProperty(formatString(curLang,"editor.property.name"), nameInput, "text"),
        createProperty(formatString(curLang,"editor.property.x"), xInput, "text"),
        createProperty(formatString(curLang,"editor.property.y"), yInput, "text"),
        area.properties.element,
    ],true);
    area.inputs = {
        name: nameInput,
        x: xInput,
        y: yInput,
    }}
function getAreaBoundary(area){
      var minX=1/0;
      var maxX=-1/0;
      var minY=1/0;
      var maxY=-1/0;
      for(var i in area.zones){
        if(minX>area.zones[i].x)minX=area.zones[i].x;
        if(maxX<area.zones[i].x+area.zones[i].width)maxX=area.zones[i].x+area.zones[i].width;
        if(minY>area.zones[i].y)minY=area.zones[i].y;
        if(maxY<area.zones[i].y+area.zones[i].height)maxY=area.zones[i].y+area.zones[i].height;
      }
      if(!area.zones.length)return {left:0,right:0,top:0,bottom:0,width:0,height:0};
      return {left:minX,right:maxX,top:minY,bottom:maxY,width:Math.abs(maxX-minX),height:Math.abs(maxY-minY)}
}
function getAreaSize(area){
  var maxRight=0;
  var maxBottom=0;
  for(var zone of area.zones){
    var right = zone.x+zone.width;
    if(right > maxRight)maxRight = right;
    var bottom = zone.y+zone.height;
    if(bottom > maxBottom)maxBottom = bottom;
  }
  return {x:maxRight,y:maxBottom}
}
function newArea(e={}){
	const area = e;
	area.entities=[];
	area.rx=area.x,area.ry=area.y;
	var properties=area.properties;
	if(properties){area.properties={...defaultValues.properties,...properties}}
    area.zones??=[];
	area.zones=area.zones.map(t=>{
      if(t.background_color){
        t.properties??={};
        t.properties.background_color=t.background_color;
        t.properties.background_color.map((e,t,a)=>{
          if(a[t-1]!=undefined)a[t-1]+=e>>8;
          a[t]&=255;
        })
      }
	  return newZone(t);
	})
	area.assets??=[];
	area.assets=area.assets.map(t=>newAsset(t.x,t.y,t.width,t.height,t.type,t.upside_down,t.texture))
	area.properties??={};

    return area;
}