var curLang={};
(function(){
  var s=new XMLHttpRequest();
  var language=localStorage.getItem("lang");
  if(!language)localStorage.setItem("lang","en_us");
  s.open("GET",localStorage.getItem("lang")+".json",false);
  s.addEventListener("load",e=>{
    curLang=JSON.parse(s.responseText.replace(/\n  /g,"").replace(",\n}","}"));
  })
  s.send();
})()
document.getElementsByClassName("settings-launcher")[0].addEventListener("click",e=>{
  tip.hidden=false;
  document.getElementsByClassName("settings-launcher")[0].hidden=true;
})
function formatString(locale,str){
  var s=locale[str]??str;
  var args=Array.from(arguments).slice(2);
  args.map(e=>s=s.replace("%s",e));
  return s;
}
function dragElement (elmnt){
if(elmnt.onmousedown)return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if(elmnt){elmnt.onmousedown = dragMouseDown};
  function dragMouseDown(e) {
    e = e || window.event;
    if(e.target.nodeName!="INPUT"&&e.target.nodeName!="SELECT"){
      e.preventDefault();
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
	spawner:{
		horizontal:false,
		move_clockwise:true,
		cone_angle:45,
		direction:1,
		pattern:void 0,
		projectile_radius:void 0,
		projectile_speed:void 0,
		immune:true,
		turn_speed:2,
		shot_interval:200,
		pause_interval:0,
		pause_duration:0,
		turn_acceleration:0,
		shot_acceleration:0,
		projectile_duration:4000,
		powered:false,
		growth_multiplier:1,
		ignore_invulnerability:false,
		speed_loss:1,
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
		switch_interval:3000,
		player_detection_radius:160,
		circle_size:150,
		hard_mode:false,
		gravity:6,
		repulsion:6,
		push_direction:void 0,
		x:void 0,
		y:void 0,
		speed:0,
		radius:void 0,
		angle:void 0,
	},
	properties:{
		background_color:[0,0,0,0],
		texture:"normal",
		friction:1,
		lighting:1,
		snow:0,
		minimum_speed:void 0,
		max_level:100,
		death_timer:void 0,
		warping_disabled:false,
		crumble_reduced:false,
		radioactive_gloop_reduced:false,
		wind_ghosts_do_not_push_while_downed:false,
		magnetism:false,
		partial_magnetism:false,
		pellet_count:25,
		pellet_multiplier:1,
		applies_lantern:false,
		sticky_coat_distort_reduced:false,
		allow_solo_with_group:false,
		all_enemies_immune:false,
	},
}
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

    folder.UUU={ul,update:function(){
      for (let li of folder.leList) {
          folder.UUU.ul.appendChild(li);
      }
      folder.leList=[];
    }};
    let titleLI = createLI("title");
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

        input.checked = options.value;

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
