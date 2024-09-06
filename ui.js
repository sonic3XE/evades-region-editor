async function loadLanguage(file){
	const res=await fetch(file);
	await res.json().then(e=>{
		function formatString(str){
		  var s=e[str]??str;
		  var args=Array.from(arguments).slice(1);
		  args.map(t=>s=s.replace("%s",t));
		  return s;
		}
		toggleMenu.innerText=formatString(`editor.toggleMenu.${menu.classList=="hidden"?"show":"hide"}`)
		contextmenu.rows[0].cells[0].innerText=formatString("editor.contextMenu.object")
		contextmenu.rows[1].cells[0].children[0].innerText=formatString("editor.contextMenu.object.copy")
		contextmenu.rows[1].cells[1].children[0].innerText=formatString("editor.contextMenu.object.cut")
		contextmenu.rows[1].cells[2].children[0].innerText=formatString("editor.contextMenu.object.paste")
		contextmenu.rows[2].cells[0].children[0].innerText=formatString("editor.contextMenu.object.delete")
		contextmenu.rows[2].cells[1].children[0].innerText=formatString("editor.contextMenu.object.duplicate")
		contextmenu.rows[2].cells[2].children[0].innerText=formatString("editor.contextMenu.object.rotate")
		contextmenu.rows[3].cells[0].innerText=formatString("editor.contextMenu.new")
		contextmenu.rows[4].cells[0].children[0].innerText=formatString("editor.contextMenu.new.zone")
		contextmenu.rows[4].cells[1].children[0].innerText=formatString("editor.contextMenu.new.asset")
		contextmenu.rows[5].cells[0].innerText=formatString("editor.contextMenu.area")
		contextmenu.rows[6].cells[0].children[0].innerText=formatString("editor.contextMenu.area.add")
		contextmenu.rows[6].cells[1].children[0].innerText=formatString("editor.contextMenu.area.duplicate")
		contextmenu.rows[6].cells[2].children[0].innerText=formatString("editor.contextMenu.area.delete")
		global.formatString=formatString;
		"element" in map && (map.element.remove(),delete map.element);
		map.element=createFolder(formatString("editor.region"), [
			createProperty(formatString("editor.property.name"),nameInput=createInput(map.name,_=>{map.name=nameInput.value}),"text"),
			createProperty(formatString("editor.property.share_to_drive"),boolInput=createInput(map.share_to_drive,_=>{map.share_to_drive=boolInput.checked}),"switch"),
			(map.properties=createPropertyObj({...map.properties},"region")).element,
		]);
		map.element.classList.add("closed");
		menu.insertBefore(map.element,areamenu);
		areamenu.firstChild && areamenu.removeChild(areamenu.firstChild);
		if(selectedObjects){
			for(const obj of selectedObjects){
				obj.element.remove();
				obj.properties.element.remove();
				delete obj.element;
				delete obj.properties.element;
				delete obj.inputs;
			}
		}
		selectedObjects=[];
		customAREAgui(map.areas[0]);
		areamenu.appendChild(map.areas[0].element);
	});
};
const languages=["en_us","ru_ru"];
loadLanguage(`${languages[settings.language]}.json`);
function formatString(str){
  var s=str;
  var args=Array.from(arguments).slice(2);
  args.map(t=>s=s.replace("%s",t));
  return s;
}
document.getElementsByClassName("settings-launcher")[0].addEventListener("click",e=>{
  tip.hidden=false;
  document.getElementsByClassName("settings-launcher")[0].hidden=true;
});

function dragElement (elmnt){
if(elmnt.onmousedown)return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if(elmnt){elmnt.onmousedown = dragMouseDown};
  function dragMouseDown(e) {
    e = e || window.event;
    if(e.target.nodeName!="BUTTON"&&e.target.nodeName!="INPUT"&&e.target.nodeName!="SELECT"){
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }else{
      document.onmouseup = closeDragElement;
    };
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
var defaultValues={
	share_to_drive:true,
	boss:false,
	spawner:{
		horizontal:false,
		move_clockwise:true,
		health:100,
		ring_sniper_radius:180,
		cybot_radius:180,
		libot_radius:180,
		dabot_radius:180,
		mebot_radius:180,
		plbot_radius:180,
		icbot_radius:180,
		elbot_radius:180,
		fibot_radius:180,
		wabot_radius:180,
		eabot_radius:180,
		aibot_radius:180,
		spawn_top:true,
		reverse:false,
		cone_angle:45,
		slow:0.3,
		drain:15,
		home_range:200,
		increment:1.5,
		recharge:3000,
		direction:1,
		pattern:void 0,
		projectile_radius:void 0,
		projectile_speed:void 0,
		immune:true,
		turn_speed:60,
		shot_interval:200,
		pause_interval:0,
		pause_duration:0,
		turn_acceleration:0,
		shot_acceleration:0,
		projectile_duration:4000,
		powered:false,
		growth_multiplier:1,
		ignore_invulnerability:false,
		speed_loss:30,
		regen_loss:0.4,
		release_time:void 0,
		release_interval:4000,
		slippery_radius:165,
		slowing_radius:150,
		enlarging_radius:150,
		draining_radius:150,
		gravity_radius:150,
		radar_radius:150,
		repelling_radius:150,
		disabling_radius:150,
		toxic_radius:150,
		lava_radius:150,
		magnetic_reduction_radius:125,
		magnetic_nullification_radius:125,
		freezing_radius:100,
		quicksand_radius:150,
		barrier_radius:100,
		experience_drain_radius:150,
		reducing_radius:140,
		blocking_radius:150,
		switch_interval:3000,
		switch_time:0,
		switched_harmless:void 0,
		player_detection_radius:160,
		circle_size:150,
		hard_mode:false,
		gravity:180,
		quicksand_strength:150,
		repulsion:180,
		push_direction:void 0,
		x:void 0,
		y:void 0,
		speed:0,
		count:1,
		angle:void 0,
	},
	properties:{
		texture:"normal",
		background_color:[0,0,0,0],
		friction:1,
		lighting:1,
		snow:0,
		spawns_lost_souls:false,
		max_level:100,
		pellet_count:25,
		pellet_multiplier:1,
		minimum_speed:void 0,
		maximum_speed:void 0,
		death_timer:void 0,
		warping_disabled:false,
		crumble_reduced:false,
		wind_ghosts_do_not_push_while_downed:false,
		magnetism:false,
		partial_magnetism:false,
		applies_lantern:false,
		spawns_pellets:void 0,
		all_enemies_immune:false,
		charge_reduced:false,
		
		radioactive_gloop_reduced:false,
		lightning_reduced:false,
		allow_solo_with_group:false,
		sticky_coat_distort_reduced:false,
	},
}
// ソニック。エキセ <- Perferring japanese // / Sonic.exe / Соник.экзе / ⠠⠎⠕⠝⠊⠉⠲⠑⠭⠑ / Σόνικ.εξε
function createLI(_class = "", id = "") {
    let el = document.createElement("li");
    if (id) el.id = id;
    if (_class) el.className = _class;
    return el;
}
function createFolder(title = "Title", lis = [],closed=false) {
    const folder = createLI("folder");
    folder.leList=[];
    let ul = document.createElement("ul");
    ul.classList.add("indent");

    folder.UUU=function(){
    	if(typeof title=="function")
	    titleLI.innerHTML = title();
    };
    let titleLI = createLI("title");
    if(typeof title=="function")
	    titleLI.innerHTML = title();
    else
	    titleLI.innerHTML = title;
    titleLI.addEventListener("click", () => {
        folder.classList.toggle("closed");
    });

    folder.appendChild(titleLI);
    for (let li of lis) {
        ul.appendChild(li);
    }
    folder.appendChild(ul);
    if(closed)folder.classList.toggle("closed");
    return folder;
}
function createProperty(name = "name", input = document.createElement("input"), type = "text", options = {}) {
    const li = createLI("property " + type);
    const span = document.createElement("span");
    span.classList.add("label");
    span.innerHTML = name;
    li.appendChild(span);
    if ("value" in options && input) input.value = options.value;
    if (type === "color") {
        const label = document.createElement("label");
        const text = document.createTextNode(input.value);
        input.type = "color";

        text.nodeValue = input.value;
        label.appendChild(text);
        input.id = generateId();
        label.htmlFor = input.id;
        label.appendChild(input);
        label.style.background = input.value;
        li.style.borderLeftColor = input.value;


        if (luma(hexToArr(input.value)) > 127.5) li.classList.add("light");
        input.addEventListener("input", () => {
            text.nodeValue = input.value;
            label.style.background = input.value;
            li.style.borderLeftColor = input.value;

            if (luma(hexToArr(input.value)) > 127.5) li.classList.add("light");
            else li.classList.remove("light");
        });

        li.appendChild(label);
    } else if (type === "switch") {
        const label = document.createElement("label");
        const switchSpan = document.createElement("span");

        input.type = "checkbox";
        input.id = generateId();
        label.htmlFor = input.id;
        label.classList.add("switchLabel")
        switchSpan.classList.add("switchSpan");

        input.checked = options.value ?? input.checked;

        label.appendChild(input);
        label.appendChild(switchSpan);
        li.appendChild(label);
    } else if (type === "cardinal") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("cardinalWrapper");
        const up = document.createElement("button");
        up.classList.add("cardinalUp");
        const left = document.createElement("button");
        left.classList.add("cardinalLeft");
        const down = document.createElement("button");
        down.classList.add("cardinalDown");
        const right = document.createElement("button");
        right.classList.add("cardinalRight");

        let active = [up, right, down, left][(Number(options.value ?? 0) % 4 + 4) % 4];
        active.classList.add("active");

        up.addEventListener("click", () => {
            if (active === up) return;
            active.classList.remove("active");
            up.classList.add("active");
            active = up;
            options.event(2);
        });
        right.addEventListener("click", () => {
            if (active === right) return;
            active.classList.remove("active");
            right.classList.add("active");
            active = right;
            options.event(3);
        });
        down.addEventListener("click", () => {
            if (active === down) return;
            active.classList.remove("active");
            down.classList.add("active");
            active = down;
            options.event(0);
        });
        left.addEventListener("click", () => {
            if (active === left) return;
            active.classList.remove("active");
            left.classList.add("active");
            active = left;
            options.event(1);
        });

        wrapper.appendChild(up);
        wrapper.appendChild(left);
        wrapper.appendChild(down);
        wrapper.appendChild(right);
        li.appendChild(wrapper);
    } else if (type === "cardinalCenter") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("cardinalWrapper");
        const up = document.createElement("button");
        up.classList.add("cardinalUp");
        const left = document.createElement("button");
        left.classList.add("cardinalLeft");
        const down = document.createElement("button");
        down.classList.add("cardinalDown");
        const right = document.createElement("button");
        right.classList.add("cardinalRight");
        const center = document.createElement("button");
        center.classList.add("cardinalCenter");

        let active = [up, right, down, left, center][(Number(options.value ?? 0) % 5 + 5) % 5];
        active.classList.add("active");

        up.addEventListener("click", () => {
            if (active === up) return;
            active.classList.remove("active");
            up.classList.add("active");
            active = up;
            options.event(2);
        });
        right.addEventListener("click", () => {
            if (active === right) return;
            active.classList.remove("active");
            right.classList.add("active");
            active = right;
            options.event(3);
        });
        down.addEventListener("click", () => {
            if (active === down) return;
            active.classList.remove("active");
            down.classList.add("active");
            active = down;
            options.event(0);
        });
        left.addEventListener("click", () => {
            if (active === left) return;
            active.classList.remove("active");
            left.classList.add("active");
            active = left;
            options.event(1);
        });
        center.addEventListener("click", () => {
            if (active === center) return;
            active.classList.remove("active");
            center.classList.add("active");
            active = center;
            options.event(4);
        });

        wrapper.appendChild(up);
        wrapper.appendChild(left);
        wrapper.appendChild(down);
        wrapper.appendChild(right);
        wrapper.appendChild(center);
        li.classList.remove("cardinalCenter");
        li.classList.add("cardinal");
        li.appendChild(wrapper);
    } else if (type === "select") {
        const select = document.createElement("select");

        for (let i in options.selectOptions) {
            const option = document.createElement("option");

            option.innerHTML = options.selectOptions[i][0];
            option.value = i;
            select.appendChild(option);

            if (options.selectOptions[i][1] === options.value ?? 0) select.value = i;
        }

        select.addEventListener("change", () => {
            options.event(options.selectOptions[select.value][1]);
        });
        li.classList.add(options.selectType ?? "text");
        li.appendChild(select);
    } else if (type === "direction") {
        const circle = document.createElement("div");
        circle.classList.add("directionCircle");
        const lever = document.createElement("div");
        lever.classList.add("directionLever");
        const handle = document.createElement("div");
        handle.classList.add("directionHandle");

        let deg = options.value ?? 0;
        lever.style.transform = `rotate(${deg}deg)`;

        let changing = false;
        document.addEventListener("mousemove", e => {
            if (!changing) return;

            const bound = circle.getBoundingClientRect();

            deg = (Math.round(Math.atan2(e.pageY - bound.top - bound.height / 2, e.pageX - bound.left - bound.width / 2) * 180 / Math.PI) % 360 + 360) % 360;

            const snap = 30;
            const space = 7;

            if (deg % snap > snap - space) deg += snap - deg % snap;
            if (deg % snap < space) deg -= deg % snap;
            input.value = deg = (deg % 360 + 360) % 360;

            lever.style.transform = `rotate(${deg}deg)`;
            options.event(deg);
        });
        input.addEventListener("input", () => {
            input.value = Math.round(input.value * 10) / 10;
            input.value = deg = ((10 * input.value % 3600 + 3600) % 3600) / 10;

            lever.style.transform = `rotate(${deg}deg)`;
            options.event(deg);
        });
        handle.addEventListener("mousedown", () => changing = true);
        document.addEventListener("mouseup", () => changing = false);

        input.type = "number";
        input.value = options.value;

        lever.appendChild(handle);
        circle.appendChild(lever);
        circle.appendChild(input);
        li.appendChild(circle);
    } else if (type === "createProperty") {
        const select = document.createElement("select");
        const addBtn = document.createElement("button");
        addBtn.classList.add("add");
        var selectOpt=options.list;
        for (let i in selectOpt) {
            const option = document.createElement("option");

            option.innerHTML = selectOpt[i][0];
            option.value = i;
            select.appendChild(option);

            if (selectOpt[i][1] === options.value ?? 0) select.value = i;
        }

        select.addEventListener("change", () => {
            options.event(selectOpt[select.value],select);
        });
        li.classList.add(options.selectType ?? "text");
        li.appendChild(select);
        li.appendChild(addBtn);
    } else {
        if (type === "text") {
            input.spellcheck = false;
        }
        if(type !== "section"){
          li.appendChild(input);
          input.type = type;
        }
    }
    return li;
}


let currentId = 0;
function generateId() {
    return "generated" + currentId++;
}