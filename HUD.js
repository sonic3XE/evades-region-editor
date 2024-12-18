EvadesConfig = JSON.parse('{"client_tick_rate":60,"server_tick_rate":60,"week_number":"ℵ₀","heroes":[{"name":"Magmax","foregroundColor":"#ff0000","backgroundColor":"#ff0000","strokeColor":"#b60000","textColor":"#ff0000","abilities":["Flow","Harden"]},{"name":"Rime","foregroundColor":"#3333ff","backgroundColor":"#3333ff","strokeColor":"#2626af","textColor":"#3333ff","abilities":["Warp","Paralysis"]},{"name":"Morfe","foregroundColor":"#00dd00","backgroundColor":"#00dd00","strokeColor":"#007d00","textColor":"#00dd00","abilities":["Reverse","Minimize"]},{"name":"Aurora","foregroundColor":"#ff7f00","backgroundColor":"#ff7f00","strokeColor":"#ba5600","textColor":"#ff7f00","abilities":["Distort","Energize"]},{"name":"Necro","foregroundColor":"#FF00FF","backgroundColor":"#FF00FF","strokeColor":"#a900a9","textColor":"#FF00FF","abilities":["Resurrection","Reanimate"]},{"name":"Brute","foregroundColor":"#9b5800","backgroundColor":"#9b5800","strokeColor":"#703f00","textColor":"#9b5800","abilities":["Stomp","Vigor"]},{"name":"Nexus","foregroundColor":"#29FFC6","backgroundColor":"#29FFC6","strokeColor":"#1eac8d","textColor":"#29FFC6","abilities":["Barrier","Stream"]},{"name":"Shade","foregroundColor":"#826565","backgroundColor":"#826565","strokeColor":"#423545","textColor":"#826565","abilities":["Night","Vengeance"]},{"name":"Euclid","foregroundColor":"#5e4d66","backgroundColor":"#5e4d66","strokeColor":"#2e1d36","textColor":"#5e4d66","abilities":["Black Hole","Orbit"]},{"name":"Chrono","foregroundColor":"#00b270","backgroundColor":"#00b270","strokeColor":"#009260","textColor":"#00b270","abilities":["Backtrack","Rewind"]},{"name":"Reaper","foregroundColor":"#424a59","backgroundColor":"#424a59","strokeColor":"#222a39","textColor":"#424a59","abilities":["Atonement","Depart"]},{"name":"Rameses","foregroundColor":"#989b4a","backgroundColor":"#989b4a","strokeColor":"#686b2a","textColor":"#989b4a","abilities":["Latch","Bandages"]},{"name":"Jolt","foregroundColor":"#e1e100","backgroundColor":"#e1e100","strokeColor":"#b1b100","textColor":"#e1e100","abilities":["Spark","Charge"]},{"name":"Ghoul","foregroundColor":"#bad7d8","backgroundColor":"#bad7d8","strokeColor":"#8aa7a8","textColor":"#bad7d8","abilities":["Shriek","Shadow"]},{"name":"Cent","foregroundColor":"#727272","backgroundColor":"#727272","strokeColor":"#424242","textColor":"#727272","abilities":["Fusion","Mortar"]},{"name":"Jötunn","foregroundColor":"#5cacff","backgroundColor":"#5cacff","strokeColor":"#3c8ccf","textColor":"#5cacff","abilities":["Decay","Shatter"]},{"name":"Candy","foregroundColor":"#ff80bd","backgroundColor":"#ff80bd","strokeColor":"#cf609d","textColor":"#ff80bd","abilities":["Sugar Rush","Sweet Tooth"]},{"name":"Mirage","foregroundColor":"#020fa2","backgroundColor":"#020fa2","strokeColor":"#000172","textColor":"#020fa2","abilities":["Shift","Obscure"]},{"name":"Boldrock","foregroundColor":"#a18446","backgroundColor":"#a18446","strokeColor":"#714426","textColor":"#a18446","abilities":["Crumble","Earthquake"]},{"name":"Glob","foregroundColor":"#14a300","backgroundColor":"#14a300","strokeColor":"#027300","textColor":"#14a300","abilities":["Radioactive Gloop","Sticky Coat"]},{"name":"Magno","foregroundColor":"#ff005d","backgroundColor":"#ff005d","strokeColor":"#cf002d","textColor":"#ff005d","abilities":["Magnetize","Attract"]},{"name":"Ignis","foregroundColor":"#cd501f","backgroundColor":"#cd501f","strokeColor":"#9d3000","textColor":"#cd501f","abilities":["Wildfire","Ember"]},{"name":"Stella","foregroundColor":"#fffa86","backgroundColor":"#fffa86","strokeColor":"#bfba46","textColor":"#fffa86","abilities":["Wormhole","Supernova"]},{"name":"Viola","foregroundColor":"#d9b130","backgroundColor":"#d9b130","strokeColor":"#a99100","textColor":"#d9b130","abilities":["Bloom","Pollinate"]},{"name":"Mortuus","foregroundColor":"#7fb332","backgroundColor":"#7fb332","strokeColor":"#4f8302","textColor":"#7fb332","abilities":["Undead Infection","Gravekeeper"]},{"name":"Cybot","foregroundColor":"#926be3","backgroundColor":"#926be3","strokeColor":"#623bb3","textColor":"#926be3","abilities":["Network Control","Robo Scanner"]},{"name":"Echelon","foregroundColor":"#5786de","backgroundColor":"#5786de","strokeColor":"#2746ae","textColor":"#5786de","abilities":["Echo","Reduce"]},{"name":"Demona","foregroundColor":"#7d3c9e","backgroundColor":"#7d3c9e","strokeColor":"#4d0c6e","textColor":"#7d3c9e","abilities":["Dash","Incinerate"]},{"name":"Stheno","foregroundColor":"#cfa6ec","backgroundColor":"#cfa6ec","strokeColor":"#9f76bc","textColor":"#cfa6ec","abilities":["Petrify","Ictos"]},{"name":"Factorb","foregroundColor":"#6e391e","backgroundColor":"#6e391e","strokeColor":"#3e0900","textColor":"#6e391e","abilities":["Mutatiorb","Experiorb"]}],"abilities":[{"name":"Flow","description":"Boosts speed.\\nCosts 2 energy / second.\\n(+{{speed|60/90/120/150/180}} speed)","continuous":true,"energy_cost":2,"total_cooldown":0,"levels":[{"boost":60},{"boost":90},{"boost":120},{"boost":150},{"boost":180}]},{"name":"Harden","description":"Gives invulnerability,\\nbut also stops movement.\\nCosts 12 energy / second.\\n(1.25/1/0.75/0.5/0.25 cooldown)","continuous":true,"energy_cost":12,"total_cooldown":1.25,"levels":[{"total_cooldown":1.25},{"total_cooldown":1},{"total_cooldown":0.75},{"total_cooldown":0.5},{"total_cooldown":0.25}]},{"name":"Warp","description":"Teleports player\\nin target direction.\\n(80/100/120/140/160 range)\\n0.5s cooldown. Costs 3 energy.","energy_cost":3,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5,"distance":80},{"total_cooldown":0.5,"distance":100},{"total_cooldown":0.5,"distance":120},{"total_cooldown":0.5,"distance":140},{"total_cooldown":0.5,"distance":160}]},{"name":"Paralysis","description":"Freeze enemies\\nfor two seconds.\\nCosts 15 energy.\\n(130/150/170/190/210 range)","energy_cost":15,"total_cooldown":0,"levels":[{"radius":130},{"radius":150},{"radius":170},{"radius":190},{"radius":210}]},{"name":"Reverse","description":"Shoots projectiles that\\nreverse enemy movement.\\nEnemies revive players\\nfor 4s. Costs 10 energy.\\n3 second cooldown.\\n(1/3/5/7/9 projectiles)","energy_cost":10,"total_cooldown":3,"speed":660,"levels":[{"projectiles":1},{"projectiles":3},{"projectiles":5},{"projectiles":7},{"projectiles":9}]},{"name":"Minimize","description":"Reduces enemies\' radius\\nby 50% & speed by 75%\\nfor 4 seconds.\\nCosts 10 energy.\\n1.5 second cooldown.\\n(1/3/5/7/9 projectiles)","energy_cost":10,"total_cooldown":1.5,"speed":660,"levels":[{"projectiles":1},{"projectiles":3},{"projectiles":5},{"projectiles":7},{"projectiles":9}]},{"name":"Distort","description":"Slows enemies within\\naura by 30/35/40/45/50%.\\nCosts 7 energy / second.\\n(180/210/240/270/300 range)","continuous":true,"energy_cost":7,"total_cooldown":0,"levels":[{"radius":180,"slow":0.7},{"radius":210,"slow":0.65},{"radius":240,"slow":0.6},{"radius":270,"slow":0.55},{"radius":300,"slow":0.5}]},{"name":"Energize","description":"PASSIVE: All other\\nplayers in the area\\ngain an additional\\n2/2.25/2.5/2.75/3\\nenergy/s & a non-stacking\\n15% cooldown reduction.","energy_cost":0,"total_cooldown":0,"passive":true,"levels":[{"regen_boost":2},{"regen_boost":2.25},{"regen_boost":2.5},{"regen_boost":2.75},{"regen_boost":3}]},{"name":"Resurrection","description":"Revives self.\\nCosts 75 pellets.","energy_cost":0,"pellet_powered":true,"total_cooldown":0,"levels":[{"additional_uses":1,"total_cooldown":75}]},{"name":"Reanimate","description":"Shoots a projectile that\\nrevives teammates on hit.\\nCosts 30 energy.\\n(1/2/3/4/5 projectiles)\\n(14/12/10/8/6 cooldown)","energy_cost":30,"total_cooldown":0,"speed":660,"levels":[{"projectiles":1,"total_cooldown":14},{"projectiles":2,"total_cooldown":12},{"projectiles":3,"total_cooldown":10},{"projectiles":4,"total_cooldown":8},{"projectiles":5,"total_cooldown":6}]},{"name":"Barrier","description":"Places a dome that\\ngrants invulnerability.\\nPosition when alive: You.\\nPosition when downed:\\nNearest alive player.\\nCosts 30 energy.\\n10 second cooldown.\\nCools down twice as\\nfast when not in\\nany barrier. Lasts\\n2.5/2.7/2.9/3.1/3.3s","energy_cost":30,"total_cooldown":10,"levels":[{"duration":2.5},{"duration":2.7},{"duration":2.9},{"duration":3.1},{"duration":3.3}]},{"name":"Stream","description":"Places a path that\\nlets player energy go\\nsub-zero by up to 100%\\nof max energy & prevents\\nplayer slowdown. Grants a\\n{{speed|0/37.5/75/112.5/150}} speed\\nboost to user only.\\nCosts 5 energy.\\n2 second cooldown.\\n1400px length.","energy_cost":5,"total_cooldown":2,"length":1400,"levels":[{"speed_boost":0},{"speed_boost":37.5},{"speed_boost":75},{"speed_boost":112.5},{"speed_boost":150}]},{"name":"Stomp","description":"Sends enemies flying back\\nand stuns for 4s.\\nAffected enemies teleport\\nothers to you.\\nCosts 10 energy.\\n1 second cooldown.\\n(130/145/160/175/190 range)","energy_cost":10,"total_cooldown":0,"stun_time":4,"levels":[{"radius":130,"total_cooldown":1},{"radius":145,"total_cooldown":1},{"radius":160,"total_cooldown":1},{"radius":175,"total_cooldown":1},{"radius":190,"total_cooldown":1}]},{"name":"Vigor","description":"PASSIVE: Reduces enemy\\neffects by 15/30/45/60/75%\\nbut increases radius\\nby 3/3/6/6/9%.\\nReduces enemy effects\\nby an extra 25% if\\nyour energy is full.","passive":true,"energy_cost":0,"total_cooldown":0,"levels":[{"effects_reduction":0.15,"radius_increase":1},{"effects_reduction":0.3,"radius_increase":0},{"effects_reduction":0.45,"radius_increase":1},{"effects_reduction":0.6,"radius_increase":0},{"effects_reduction":0.75,"radius_increase":1}]},{"name":"Night","description":"Move faster and undetected by\\nhoming and snipers. If hit,\\nNight ends and makes attacker\\nharmless for 2s. Costs\\n30 energy. Cooldown 7s.\\n(+{{speed|0/37.5/75/112.5/150}} speed)\\n(Lasts 7 seconds)","energy_cost":30,"total_cooldown":7,"duration":7,"levels":[{"speed_boost":0},{"speed_boost":37.5},{"speed_boost":75},{"speed_boost":112.5},{"speed_boost":150}]},{"name":"Vengeance","description":"Shoots ball that returns.\\nSlows enemies hit during\\ndeparture. Freezes enemies\\nhit on return. Costs 5 energy.\\nEffect lasts 6s.\\n(20/25/30/35/40 radius)\\nCooldown 3/2.5/2/1.5/1s.","energy_cost":5,"total_cooldown":0,"speed":1800,"projectiles":1,"slow":0.25,"levels":[{"radius":20,"total_cooldown":3},{"radius":25,"total_cooldown":2.5},{"radius":30,"total_cooldown":2},{"radius":35,"total_cooldown":1.5},{"radius":40,"total_cooldown":1}]},{"name":"Black Hole","description":"Shoots a black hole\\nthat sucks enemies in.\\nEnemies become harmless\\nto non-Euclid heroes.\\nUse ability again to\\nactivate it early.\\nCosts 30 energy.\\n14/13/12/11/10s cooldown.\\n(2.5 second duration)","energy_cost":30,"total_cooldown":14,"duration":2.5,"levels":[{"total_cooldown":14},{"total_cooldown":13},{"total_cooldown":12},{"total_cooldown":11},{"total_cooldown":10}]},{"name":"Orbit","description":"Drops a gravity orb that\\nenemies will revolve\\naround. Enemies become\\nharmless for 1s.\\nCosts 15 energy.\\nRange 100/125/150/175/200.\\n4s cooldown. 2s duration.","continuous":false,"energy_cost":15,"total_cooldown":4,"duration":2,"levels":[{"radius":100},{"radius":125},{"radius":150},{"radius":175},{"radius":200}]},{"name":"Backtrack","description":"Teleports hero back\\nin time by 2.6s.\\nCan use while downed.\\nCosts 30 energy.\\n(Cooldown 7.5/7/6.5/6/5.5s)","energy_cost":30,"total_cooldown":7.5,"levels":[{"total_cooldown":7.5},{"total_cooldown":7},{"total_cooldown":6.5},{"total_cooldown":6},{"total_cooldown":5.5}]},{"name":"Rewind","description":"Teleports enemies back in time\\n2s & makes them harmless\\nfor 3s. Costs 15 energy.\\n(Cooldown 7/6.5/6/5.5/5s).","energy_cost":15,"total_cooldown":6,"levels":[{"total_cooldown":7,"radius":100},{"total_cooldown":6.5,"radius":115},{"total_cooldown":6,"radius":130},{"total_cooldown":5.5,"radius":145},{"total_cooldown":5,"radius":160}]},{"name":"Atonement","description":"Revives all players in your\\naura while damaging you in\\nthe process. Costs 20 energy.\\n(Cooldown 6/5.5/5/4.5/4s).\\n(130/180/230/280/330 range).","energy_cost":20,"total_cooldown":6,"levels":[{"total_cooldown":6,"radius":130},{"total_cooldown":5.5,"radius":180},{"total_cooldown":5,"radius":230},{"total_cooldown":4.5,"radius":280},{"total_cooldown":4,"radius":330}]},{"name":"Depart","description":"Becomes invulnerable for\\n2.7/2.9/3.1/3.3/3.5s. Move\\nwith {{speed|270/285/300/315/330}}\\nspeed ignoring effects.\\nCosts 30 energy. Cooldown 10s.","energy_cost":30,"total_cooldown":10,"levels":[{"duration":2.7,"speed":270},{"duration":2.9,"speed":285},{"duration":3.1,"speed":300},{"duration":3.3,"speed":315},{"duration":3.5,"speed":330}]},{"name":"Latch","description":"Throws a high-tech bandage in\\ntarget direction. If a player\\nis hit, it teleports you to that\\nplayer, keeping them safe for\\n1s. Only usable if bandages\\nare applied. Costs 20 energy.\\n(Cooldown 8/7.5/7/6.5/6s)","energy_cost":20,"total_cooldown":8,"speed":600,"levels":[{"projectiles":1,"total_cooldown":8},{"projectiles":1,"total_cooldown":7.5},{"projectiles":1,"total_cooldown":7},{"projectiles":1,"total_cooldown":6.5},{"projectiles":1,"total_cooldown":6}]},{"name":"Bandages","description":"Wraps bandages around\\nself over 12/11/10/9/8s\\n(3x faster in safe zone) moving\\n50% slower. If hit with\\nbandages on, they fall off\\nover 1s, keeping you\\nsafe. Costs 40 energy.","energy_cost":40,"total_cooldown":0,"levels":[{"slow":0.5,"total_cooldown":12,"duration":12},{"slow":0.5,"total_cooldown":11,"duration":11},{"slow":0.5,"total_cooldown":10,"duration":10},{"slow":0.5,"total_cooldown":9,"duration":9},{"slow":0.5,"total_cooldown":8,"duration":8}]},{"name":"Spark","description":"Releases electrical sparks\\nthat bounce between\\nenemies. Disables &\\nslows by 90% for 3s.\\nChanges to Lightning\\nwhen used. Costs 6 pellets.\\n(1/2/3/4/5 projectiles).","energy_cost":0,"total_cooldown":0,"speed":750,"levels":[{"projectiles":1},{"projectiles":2},{"projectiles":3},{"projectiles":4},{"projectiles":5}]},{"name":"Lightning","description":"Releases lightning\\nthat bounces between\\nenemies & leaves trail\\nbehind for 1s.\\nSlows by 90% for 2s.\\nChanges to Spark after\\ncollecting 6 pellets.\\nCosts 30 energy. Cooldown 1s.\\n(5/6/7/8/9 projectiles).","energy_cost":30,"total_cooldown":1,"speed":750,"levels":[{"projectiles":5},{"projectiles":6},{"projectiles":7},{"projectiles":8},{"projectiles":9}]},{"name":"Charge","description":"Pulls pellets towards you.\\n(100/125/150/175/200 range).","continuous":true,"energy_cost":0,"total_cooldown":0,"levels":[{"radius":100},{"radius":125},{"radius":150},{"radius":175},{"radius":200}]},{"name":"Shriek","description":"Shrieks at enemies,\\nscaring them. If they\\nhit a wall, they\\nbecome harmless and\\nstop bouncing for 5s.\\nCosts 10 energy. Cooldown 1s.\\nRange 130/165/200/235/270.","energy_cost":10,"total_cooldown":1,"speed":750,"duration":5,"levels":[{"radius":130},{"radius":165},{"radius":200},{"radius":235},{"radius":270}]},{"name":"Shadow","description":"Leave up to 1\\nshadow behind, which\\nstays for 10/12/14/16/18s.\\nShadow is targeted first.\\nOthers can touch shadow\\nto revive you with\\n1.5s of invulnerability.\\nUse while downed to\\nmake shadow home in\\non the nearest alive\\nplayer. Cooldown 4s.\\nCosts 2 energy.","energy_cost":2,"total_cooldown":0,"levels":[{"duration":10,"speed_multiplier":1},{"duration":12,"speed_multiplier":1},{"duration":14,"speed_multiplier":1},{"duration":16,"speed_multiplier":1},{"duration":18,"speed_multiplier":1}]},{"name":"Fusion","description":"Becomes a thick paste\\nthat can pass through\\nenemies. Slowed by 30%. Lasts\\n0.7s. Cooldown 1.4/1.3/1.2/\\n1.1/1s.","energy_cost":0,"total_cooldown":1.4,"levels":[{"duration":0.7,"total_cooldown":1.4,"slow":0.7},{"duration":0.7,"total_cooldown":1.3,"slow":0.7},{"duration":0.7,"total_cooldown":1.2,"slow":0.7},{"duration":0.7,"total_cooldown":1.1,"slow":0.7},{"duration":0.7,"total_cooldown":1,"slow":0.7}]},{"name":"Mortar","description":"On death or activation,\\nexplodes into small pieces\\nthat come back together in\\n4s. Use Fusion to\\ninstantly recombine yourself.\\nCooldown 18/16/14/12/10s.\\nCosts 40 energy.","energy_cost":40,"total_cooldown":18,"levels":[{"duration":4,"total_cooldown":18},{"duration":4,"total_cooldown":16},{"duration":4,"total_cooldown":14},{"duration":4,"total_cooldown":12},{"duration":4,"total_cooldown":10}]},{"name":"Decay","description":"PASSIVE: Radiate an aura of\\ndecay, slowing all enemies\\naround you by\\n0/10/20/30/40%.\\nRange 170.","energy_cost":0,"total_cooldown":0,"radius":170,"levels":[{"slow":1},{"slow":0.9},{"slow":0.8},{"slow":0.7},{"slow":0.6}]},{"name":"Shatter","description":"Shatters decayed enemies\\ninto harmless shards\\nthat come back together in 4s.\\nCooldown 9/8/7/6/5s.\\nCosts 30 energy.","energy_cost":30,"total_cooldown":9,"duration":4,"levels":[{"total_cooldown":9},{"total_cooldown":8},{"total_cooldown":7},{"total_cooldown":6},{"total_cooldown":5}]},{"name":"Sugar Rush","description":"For 2s, slow all\\nenemies within aura\\nfor 2s. You gain more\\naura range the faster\\nyou move. Cooldown\\n6/5.5/5/4.5/4s. Costs 15 energy.","energy_cost":15,"radius":100,"total_cooldown":6,"duration":2,"levels":[{"total_cooldown":6},{"total_cooldown":5.5},{"total_cooldown":5},{"total_cooldown":4.5},{"total_cooldown":4}]},{"name":"Sweet Tooth","description":"Places a candy that can be\\nconsumed by any player to\\nrecover 50% of max\\nenergy and gain a\\n+{{speed|30/60/90/120/150}} boost to\\nspeed & a +1/2/3/4/5 boost\\nto regen for 15s.\\nCooldown 5s. Costs 5 energy.","energy_cost":5,"total_cooldown":5,"duration":15,"levels":[{"stat_boost":30},{"stat_boost":60},{"stat_boost":90},{"stat_boost":120},{"stat_boost":150}]},{"name":"Shift","description":"Teleports player to the\\nlast safe zone touched.\\nCan use while downed.\\nCooldown 11/10/9/8/7s.\\nCosts 10 energy.","energy_cost":10,"total_cooldown":11,"levels":[{"total_cooldown":11},{"total_cooldown":10},{"total_cooldown":9},{"total_cooldown":8},{"total_cooldown":7}]},{"name":"Obscure","description":"Shoots a projectile that\\nwarps the player to the\\nfirst enemy it hits.\\nAfterwards, player becomes\\ninvulnerable for 1s.\\nCooldown 4.5/4/3.5/3/2.5s.\\nCosts 15 energy.","energy_cost":15,"total_cooldown":4.5,"speed":1500,"levels":[{"total_cooldown":4.5},{"total_cooldown":4},{"total_cooldown":3.5},{"total_cooldown":3},{"total_cooldown":2.5}]},{"name":"Crumble","description":"Crumble yourself into 6 small\\npieces and spread 5 of them\\noutwards that each grant 1s\\nof invulnerability to you\\nwhen hit by an enemy.\\nShrink up to 3 times.\\nRevert to regular\\nsize upon death. Costs\\n9/8/7/6/5 pellets.","energy_cost":0,"pellet_powered":true,"total_cooldown":9,"speed":720,"levels":[{"total_cooldown":9},{"total_cooldown":8},{"total_cooldown":7},{"total_cooldown":6},{"total_cooldown":5}]},{"name":"Earthquake","description":"Splits open enemies,\\nreducing speed by 75% &\\nsize by 50% for 6s. Enemies\\nleave behind a harmless\\nrocky residue for 3s\\nthat recharges Crumble.\\nCooldown 2s. Costs 15 energy.\\nRange 100/120/140/160/180.","energy_cost":15,"total_cooldown":2,"levels":[{"radius":100},{"radius":120},{"radius":140},{"radius":160},{"radius":180}]},{"name":"Radioactive Gloop","description":"Melt into 36 unstable\\ngloops, 35 of which ignore\\nall effects & projectiles.\\nIf the last remaining gloop\\nis hit or the center\\ngloop is damaged by a\\nprojectile, become downed.\\n6 second duration.\\nCooldown 9.5/9/8.5/8/7.5s.\\nCosts 25 energy.","energy_cost":25,"radius":3,"total_cooldown":9,"levels":[{"total_cooldown":9.5},{"total_cooldown":9},{"total_cooldown":8.5},{"total_cooldown":8},{"total_cooldown":7.5}]},{"name":"Sticky Coat","description":"PASSIVE: Allows up to 2\\nplayers (or 1 Glob) to cling\\nto you, letting you carry\\nthem. Clinging players are\\ninvulnerable and have\\n20/25/30/35/40% reduced\\nenergy costs. Glob\\nmoves 10% slower per\\nclinging player. Use\\nto toggle on/off.","energy_cost":0,"radius":100,"total_cooldown":0,"levels":[{"energy_cost_reduction":0.8},{"energy_cost_reduction":0.75},{"energy_cost_reduction":0.7},{"energy_cost_reduction":0.65},{"energy_cost_reduction":0.6}]},{"name":"Magnetize","description":"Magnetizes other alive\\nplayers within 250 range,\\ngiving them the\\nAttract ability until\\ntheir next revival.\\nCooldown 6/5/4/3/2s.\\nCosts 15 energy.","energy_cost":15,"total_cooldown":6,"radius":250,"levels":[{"total_cooldown":6},{"total_cooldown":5},{"total_cooldown":4},{"total_cooldown":3},{"total_cooldown":2}]},{"name":"Attract","description":"PASSIVE: Move towards\\nthe nearest alive player\\nwithin 270 range while\\ndowned. Use to swap\\nthis ability to Repel.\\nCan use while downed.","energy_cost":0,"total_cooldown":0,"radius":270,"levels":[{}]},{"name":"Repel","description":"PASSIVE: If hit by an\\nenemy, repel yourself\\naway and avoid damage\\nfrom it for 1s.\\n4s cooldown. Costs 10\\nenergy. Use to swap\\nthis ability to Attract.\\nCan use while downed.","energy_cost":10,"total_cooldown":4,"levels":[{}]},{"name":"Wildfire","description":"Sets enemies on fire,\\ngradually causing further\\nout enemies to catch fire as\\nwell. Burning enemies stop\\nburning after 0.5s & become\\nharmless for 3s. Cooldown\\n6/5.5/5/4.5/4s.\\nCosts 30 energy.","energy_cost":30,"radius":450,"total_cooldown":6,"levels":[{"total_cooldown":6},{"total_cooldown":5.5},{"total_cooldown":5},{"total_cooldown":4.5},{"total_cooldown":4}]},{"name":"Ember","description":"PASSIVE: If hit, gain\\n2/2.5/3/3.5/4s of\\ninvulnerability & become\\ndowned afterwards. Cannot\\nactivate again until a\\nsafe zone is touched.\\nCooldown 4s.","passive":true,"energy_cost":0,"total_cooldown":4,"levels":[{"duration":2},{"duration":2.5},{"duration":3},{"duration":3.5},{"duration":4}]},{"name":"Wormhole","description":"Gain 1s of invulnerability\\n& 0.5s of immobility. Teleport\\nto the nearest downed player\\nwhile alive or the nearest\\nalive player while downed.\\nTeleport back 0.5s later.\\nCan use while downed.\\n500px range.\\nCooldown 10/9/8/7/6s.\\nCosts 15 energy.","energy_cost":15,"total_cooldown":10,"levels":[{"total_cooldown":10},{"total_cooldown":9},{"total_cooldown":8},{"total_cooldown":7},{"total_cooldown":6}]},{"name":"Supernova","description":"Destroys enemies while\\ndestroying you for 0.5s.\\nRecreates enemies destroyed\\nby the last Supernova.\\nRange 130/150/170/190/210.\\nCooldown 4s. Costs 20 energy.","energy_cost":20,"total_cooldown":4,"levels":[{"radius":130},{"radius":150},{"radius":170},{"radius":190},{"radius":210}]},{"name":"Bloom","description":"For the current area,\\nslowly grow up to 5\\npetals around yourself.\\nEnemies that hit them\\nget flung away &\\nbecome harmless for 1s.\\n0/10/20/30/40% faster\\ngrowth. Costs 30 energy.","energy_cost":30,"total_cooldown":0.5,"speed":0,"levels":[{"growth_boost":1},{"growth_boost":0.9},{"growth_boost":0.8},{"growth_boost":0.7},{"growth_boost":0.6}]},{"name":"Pollinate","description":"Create a new Viola\\nthat ignores all effects\\n& projectiles. Control\\nwith arrow keys or WASD.\\nUse ability again to\\nchange controls. New\\nViola\'s death timer\\nbecomes your cooldown\\nwhen leaving an area.","energy_cost":0,"total_cooldown":0.5,"levels":[{"radius":650}]},{"name":"Undead Infection","description":"PASSIVE: Upon death,\\nattempt to revive\\nthe nearest downed player\\nwithin 270 range and\\ngive them this ability\\nuntil their next death.\\nCooldown 6/5/4/3/2s.","energy_cost":0,"total_cooldown":6,"radius":270,"passive":true,"levels":[{"total_cooldown":6},{"total_cooldown":5},{"total_cooldown":4},{"total_cooldown":3},{"total_cooldown":2}]},{"name":"Gravekeeper","description":"Place down up to 1 tombstone.\\nDowned players within\\n400/450/500/550/600 range\\nwill gain the Grave ability.\\nUse again to remove the\\ntombstone. Costs 10 energy.\\n3s cooldown.","energy_cost":10,"total_cooldown":0,"levels":[{"radius":400},{"radius":450},{"radius":500},{"radius":550},{"radius":600}]},{"name":"Network Control","description":"PASSIVE: Sends out a\\ndisarming signal every 6s,\\nmaking every enemy in the\\narea harmless for 2s.","passive":true,"energy_cost":0,"total_cooldown":6,"levels":[{}]},{"name":"Robo Scanner","description":"Scan the closest enemy.\\nSteals aura/sniper abilities,\\ndisabling them for 6s.\\nCopies ghost abilities.\\nUse again to remove\\nthe gained ability.\\nCooldown 6/5/4/3/2s.","energy_cost":0,"total_cooldown":6,"levels":[{"total_cooldown":6},{"total_cooldown":5},{"total_cooldown":4},{"total_cooldown":3},{"total_cooldown":2}]},{"name":"Slowing","description":"Slows enemies by 30%.\\nCosts 4.5 energy/s.\\nPASSIVE: Slowing\\naura immunity.","continuous":true,"energy_cost":4.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Draining","description":"Drains 15 energy/s from\\nenemies. Costs 4.5 energy/s.\\nPASSIVE: Draining\\naura immunity.","continuous":true,"energy_cost":4.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Gravity","description":"Pulls enemies towards\\nyou. Costs 1.5 energy/s.\\nPASSIVE: Gravity\\naura immunity.","continuous":true,"energy_cost":1.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Repelling","description":"Pushes enemies away from\\nyou. Costs 7.5 energy/s.\\nPASSIVE: Repelling\\naura immunity.","continuous":true,"energy_cost":7.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Freezing","description":"Slows enemies by 85%.\\nCosts 9 energy/s.\\nPASSIVE: Freezing\\naura immunity.","continuous":true,"energy_cost":9,"total_cooldown":0,"levels":[{"radius":100}]},{"name":"Slippery","description":"Prevents enemies from\\nchanging directions.\\nCosts 3 energy/s.\\nPASSIVE: Slippery\\naura immunity.","continuous":true,"energy_cost":3,"total_cooldown":0,"levels":[{"radius":165}]},{"name":"Disabling","description":"Disables enemies.\\nCosts 4.5 energy/s.\\nPASSIVE: Disabling\\naura immunity.","continuous":true,"energy_cost":4.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Enlarging","description":"Decreases enemy radius\\nby 66%. Costs 6 energy/s.\\nPASSIVE: Enlarging\\naura immunity.","continuous":true,"energy_cost":6,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Toxic","description":"Lowers enemy energy by\\n30% of their maximum.\\nCosts 3 energy/s.\\nPASSIVE: Toxic\\naura immunity.","continuous":true,"energy_cost":3,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Magnetic Reduction","description":"Slows vertical movement\\nof enemies by 50%.\\nCosts 1.5 energy/s.\\nPASSIVE: Magnetic Reduction\\naura immunity.","continuous":true,"energy_cost":1.5,"total_cooldown":0,"levels":[{"radius":125}]},{"name":"Magnetic Nullification","description":"Slows vertical movement\\nof enemies by 100%.\\nCosts 7.5 energy/s.\\nPASSIVE: Magnetic Nullification\\naura immunity.","continuous":true,"energy_cost":7.5,"total_cooldown":0,"levels":[{"radius":125}]},{"name":"Lava","description":"Makes enemies with full\\nenergy 95% slower for\\n1.5s and decreases their\\nenergy to 0.\\nEnemies below full energy\\ngain 8 energy/s.\\nCosts 6 energy/s.\\nPASSIVE: Lava aura\\nimmunity.","continuous":true,"energy_cost":6,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Quicksand","description":"Pushes enemies towards\\nyour current movement\\ndirection with {{speed|105}} speed.\\nCosts 1.5 energy/s.\\nPASSIVE: Quicksand\\naura immunity.","continuous":true,"energy_cost":1.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Radar","description":"Rapidly shoots a stream\\nof projectiles at the\\nnearest harmful moving\\nenemy within range.\\nProjectiles scale with your\\nspeed & make enemies\\nharmless for 3s.\\nCosts 7.5 energy/s.\\nPASSIVE: Radar\\naura & projectile immunity.","continuous":true,"energy_cost":7.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Shield","description":"Makes players invulnerable.\\nCosts 15 energy/s.\\nPASSIVE: Shield aura\\nimmunity, restores 20\\nenergy to you per newly\\ndiscovered area (restores\\nless for each unique Cybot\\nwith Shield in previous\\narea) and cannot gain\\nenergy from other sources.","continuous":true,"energy_cost":15,"total_cooldown":0,"levels":[{"radius":100}]},{"name":"Sniper","description":"Shoots a projectile that\\nmakes enemies harmless\\nfor 3s. Removes last\\nprojectile shot. Cooldown 0.5s.\\nCosts 6 energy.\\nPASSIVE: Sniper\\nprojectile immunity.","energy_cost":6,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Ice Sniper","description":"Shoots a projectile that\\nfreezes enemies for\\n1s. Removes last projectile\\nshot. Cooldown 0.5s.\\nCosts 4.5 energy.\\nPASSIVE: Ice Sniper\\nprojectile immunity.","energy_cost":4.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Speed Sniper","description":"Shoots a projectile that\\ndecreases enemy speed by\\n{{speed|30}} permanently. Cannot\\ndecrease enemy speed\\nbelow {{speed|30}}. Cooldown 0.5s.\\nCosts 6 energy.\\nPASSIVE: Speed Sniper\\nprojectile immunity.","energy_cost":6,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Regen Sniper","description":"Shoots a projectile that\\ndecreases enemy energy\\nby 15. Cannot decrease\\nenemy energy below 0.\\nCooldown 0.5s.\\nCosts 6 energy.\\nPASSIVE: Regen Sniper\\nprojectile immunity.","energy_cost":6,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Radiating Bullets","description":"Shoots 8 projectiles that\\nmake enemies harmless\\nfor 3s. Cooldown 0.5s.\\nCosts 7.5 energy.\\nPASSIVE: Radiating Bullets\\nprojectile immunity.","energy_cost":7.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Tree","description":"Shoots from 2 to 8\\nprojectiles that make\\nenemies harmless for\\n3s. Cooldown 0.5s.\\nCosts 3 energy.\\nPASSIVE: Tree\\nprojectile immunity.","energy_cost":3,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Corrosive Sniper","description":"Shoots a projectile that\\nmakes enemies harmless\\nfor 3s, including\\nall types of immune\\nenemies. Removes last\\nprojectile shot. Cooldown 0.5s.\\nCosts 7.5 energy.\\nPASSIVE: Corrosive Sniper\\nprojectile immunity.","energy_cost":7.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Poison Sniper","description":"Shoots a projectile that\\nmakes enemies 3 times\\nslower for 1s. Cooldown\\n1s. Costs 3 energy.\\nPASSIVE: Poison Sniper\\nprojectile immunity.","energy_cost":3,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Positive Sniper","description":"Shoots a projectile that\\nforces enemies upwards\\nfor 1s. Cooldown 0.5s.\\nCosts 1.5 energy.\\nPASSIVE: Positive sniper\\nprojectile immunity.","energy_cost":1.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Negative Sniper","description":"Shoots a projectile that\\nforces enemies downwards\\nfor 1s. Cooldown 0.5s.\\nCosts 1.5 energy.\\nPASSIVE: Negative Sniper\\nprojectile immunity.","energy_cost":1.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Wind Sniper","description":"Shoots a projectile that\\npushes enemies away from\\nit. Cooldown 0.5s.\\nCosts 1.5 energy.\\nPASSIVE: Wind Sniper\\nprojectile immunity.","energy_cost":1.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Prediction Sniper","description":"Automatically aims and\\nshoots a projectile that\\nmakes enemies harmless\\nfor 3s. Cooldown 0.5s.\\nCosts 9 energy.\\nPASSIVE: Prediction Sniper\\nprojectile immunity.","energy_cost":9,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Lead Sniper","description":"Shoots a projectile that\\ncauses enemies to explode\\nfor 4s. Removes last\\nprojectile shot. Cooldown 0.5s.\\nCosts 7.5 energy.\\nPASSIVE: Lead Sniper\\nprojectile immunity.","energy_cost":7.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Reducing","description":"Decreases enemy radius\\ngradually by 50% per second.\\nAt 0 radius, enemies\\nbecome harmless for 3s.\\nCosts 6 energy/s.\\nPASSIVE: Reducing\\naura immunity.","continuous":true,"energy_cost":6,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Experience Drain","description":"Gain exp if an enemy is\\naffected. Costs 4.5 energy/s.\\nPASSIVE: Experience Drain\\naura immunity.","continuous":true,"energy_cost":4.5,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Blocking","description":"Protect players from\\nenemy effects. Costs\\n9 energy/s.\\nPASSIVE: Blocking\\naura immunity.","continuous":true,"energy_cost":9,"total_cooldown":0,"levels":[{"radius":150}]},{"name":"Force A","description":"Forces enemies to use\\ntheir aura ability.\\nCooldown 0.5s.\\nCosts 6 energy.\\nPASSIVE: Force Sniper A\\nprojectile immunity.","energy_cost":4.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Force B","description":"Forces enemies to use\\ntheir projectile ability.\\nCooldown 0.5s.\\nCosts 6 energy.\\nPASSIVE: Force Sniper B\\nprojectile immunity.","energy_cost":4.5,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Flower","description":"Gain 5 petals that make\\nenemies harmless for 3s.\\nPetals shrink when harmful\\nenemies are near and\\ngrow back to their\\noriginal size otherwise.\\nCooldown 0.5s.\\nCosts 21 energy.\\nPASSIVE: Flower\\npetal immunity.","energy_cost":21,"total_cooldown":0.5,"levels":[{"total_cooldown":0.5}]},{"name":"Frost Giant","description":"Shoots various projectiles\\nthat make enemies harmless for\\n3s. Costs 0.5 energy/projectile.\\nPASSIVE: Frost Giant\\nprojectile immunity.","continuous":true,"energy_cost":0.5,"total_cooldown":0,"levels":[{"total_cooldown":0}]},{"name":"Echo","description":"Generate 1/2/3/4/5 trailing\\nprojectiles which revive\\nplayers and provides 0.5s of\\ninvulnerability on contact.\\nUse again to\\ntemporarily release them.\\nCatching projectiles recharges\\ncooldown by 4s.\\nOther players can touch\\nprojectiles to revive self.\\nCosts 10 energy.\\nCooldown 14/13/12/11/10s.","energy_cost":10,"total_cooldown":14,"number_of_projectiles":1,"levels":[{"total_cooldown":14,"number_of_projectiles":1},{"total_cooldown":13,"number_of_projectiles":2},{"total_cooldown":12,"number_of_projectiles":3},{"total_cooldown":11,"number_of_projectiles":4},{"total_cooldown":10,"number_of_projectiles":5}]},{"name":"Reduce","description":"Reduce enemy stats and effects\\nby 30/35/40/45/50% for 3.3s.\\n100/140/180/220/260 range.\\nRestores an Echelon projectile,\\nup to double your projectile \\nlimit. Each enemy reduced\\nrecharges cooldown by 0.2s.\\nCosts 20 energy.\\nCooldown 9/8/7/6/5s.","energy_cost":20,"radius":100,"total_cooldown":9,"stat_reduction":0.3,"reduction_time":3300,"levels":[{"radius":100,"total_cooldown":9,"stat_reduction":0.3},{"radius":140,"total_cooldown":8,"stat_reduction":0.35},{"radius":180,"total_cooldown":7,"stat_reduction":0.4},{"radius":220,"total_cooldown":6,"stat_reduction":0.45},{"radius":260,"total_cooldown":5,"stat_reduction":0.5}]},{"name":"Dash","description":"Gain a burst of speed\\nin your current direction.\\nProvides brief invulnerability\\nto you & your Incinerate\\nprojectiles. Costs 5 energy.\\n1/0.8/0.6/0.4/0.2s cooldown\\nafter dash finishes.","energy_cost":5,"total_cooldown":1,"dash_distance":32,"levels":[{"total_cooldown":1},{"total_cooldown":0.8},{"total_cooldown":0.6},{"total_cooldown":0.4},{"total_cooldown":0.2}]},{"name":"Incinerate","description":"Create a rotating ring of\\n9 projectiles around yourself\\nwhich make enemies harmless\\non contact for 2s. Projectiles\\nlast for 3/3.5/4/4.5/5s.\\nCooldown 6s.\\nCosts 15 energy.","energy_cost":15,"total_cooldown":6,"projectile_duration":3,"levels":[{"projectile_duration":3},{"projectile_duration":3.5},{"projectile_duration":4},{"projectile_duration":4.5},{"projectile_duration":5}]},{"name":"Petrify","description":"Fire a volley of projectiles\\nwithin 20 degrees of the\\ncurrent facing direction.\\nProjectiles freeze and\\ndisable enemies for 3s.\\nDisables Ictos for 4s.\\nRange 800. Costs 40 energy,\\ncooldown 16/14/12/10/8s.","energy_cost":40,"total_cooldown":16,"levels":[{"total_cooldown":16},{"total_cooldown":14},{"total_cooldown":12},{"total_cooldown":10},{"total_cooldown":8}]},{"name":"Ictos","description":"On death, spawn a\\nfield of 75px that lasts\\n2 seconds, giving\\ninvulnerability to only\\nyou. Disables Petrify for 4s.\\nCooldown 18/16/14/12/10s.\\nCosts 5 energy.","energy_cost":5,"total_cooldown":18,"levels":[{"total_cooldown":18},{"total_cooldown":16},{"total_cooldown":14},{"total_cooldown":12},{"total_cooldown":10}]},{"name":"Mutatiorb","description":"PASSIVE: Experiorbs\\ngrant the selected effect\\npermanently. Use to toggle\\neffects (can use on cooldown).\\n0: None\\n1: 50% back shield\\n2: 30% experience gain\\n3: 2 speed\\n4: 33% slower death timer\\n5: 40% effects reduction\\n6: 40% pellet cost reduction\\n7: 300% saving reach\\nBuffs on a Factorb are 50%\\nstronger. Buffs on players\\nonly work if a Factorb\\nis in the same\\narea as them. Costs\\n(buff level × 15) pellets.","energy_cost":0,"pellet_powered":true,"total_cooldown":105,"levels":[{}]},{"name":"Experiorb","description":"PASSIVE: Eat a pellet to\\ncreate a 140 range explosion\\nthat makes enemies harmless\\nfor 3s & produce an\\nexperiorb. If another\\nplayer consumes the\\nexperiorb, grants experience\\nto everyone in the area.\\nCosts 2 energy.","energy_cost":2,"total_cooldown":0,"passive":true,"levels":[{}]},{"name":"Snowball","description":"Shoots a projectile that\\ndisables player\'s abilities on\\nhit. Costs 30 energy.\\nLasts 2 seconds.","energy_cost":30,"total_cooldown":2,"speed":780,"levels":[{"projectiles":1,"total_cooldown":2}]},{"name":"Flashlight","description":"Shines a flashlight.\\nCosts 1 energy per second.","energy_cost":1,"continuous":true,"total_cooldown":0,"levels":[{}]},{"name":"Lantern","description":"Hold a lantern to emit\\nlight in a radius around\\nyour character.\\nCosts 2 energy per second.","energy_cost":2,"continuous":true,"total_cooldown":0,"levels":[{}]},{"name":"Magnetism Down","description":"Reverses your magnetism.\\nCosts 1 energy.","energy_cost":1,"total_cooldown":0,"levels":[{}]},{"name":"Magnetism Up","description":"Reverses your magnetism.\\nCosts 1 energy.","energy_cost":1,"total_cooldown":0,"levels":[{}]},{"name":"Mystery Keycard","description":"Allows you to use\\nthe purple teleporter\\nin Security Gate B.\\nGreat danger awaits you\\non the other side...\\nAlso passively gives\\nyou experience while alive.","energy_cost":0,"passive":true,"total_cooldown":0,"levels":[{}]},{"name":"Grave","description":"Revive yourself at the\\nnearest tombstone. Gain\\n1s of invulnerability & 1.5s\\nof disabled abilities.","energy_cost":0,"total_cooldown":0,"levels":[{}]},{"name":"Mouse Control","description":"Testing ability.","energy_cost":0,"continuous":true,"total_cooldown":0,"levels":[{}]}],"effects":[{"type":0,"name":"Flow","internal":true,"fillColor":"rgb(255, 80, 10)"},{"type":1,"name":"Harden","internal":true,"fillColor":"rgb(200, 70, 0)"},{"type":2,"name":"Paralysis","fillColor":"rgba(77, 233, 242, 0.2)"},{"type":3,"name":"Distort","fillColor":"rgba(255, 0, 0, 0.2)"},{"type":4,"name":"Energize","fillColor":"rgba(255, 255, 0, 0.2)"},{"type":5,"name":"Stomp","fillColor":"rgba(153, 62, 6, 0.2)"},{"type":6,"name":"Rewind","fillColor":"rgba(76, 240, 161, 0.25)","strokeColor":"rgba(51, 161, 118, 0.25)"},{"type":7,"name":"Atonement","fillColor":"rgba(142, 129, 38, 0.15)","strokeColor":"rgba(104, 95, 28, 0.15)"},{"type":8,"name":"Orbit","fillColor":"rgba(174, 137, 185, 0.25)"},{"type":9,"name":"Charge","fillColor":"rgba(225, 225, 0, 0.1)"},{"type":10,"name":"Shriek","fillColor":"rgba(0, 0, 0, 0.2)"},{"type":11,"name":"Decay","fillColor":null},{"type":12,"name":"Shatter","fillColor":null},{"type":13,"name":"Sugar Rush","fillColor":"rgba(255, 128, 189, 0.25)"},{"type":14,"name":"Earthquake","fillColor":"rgba(161, 132, 70, 0.2)"},{"type":15,"name":"Sticky Coat","fillColor":null},{"type":16,"name":"Magnetize","fillColor":"rgba(171, 150, 48, 0.2)"},{"type":17,"name":"Wildfire","fillColor":null},{"type":18,"name":"Supernova","fillColor":"rgba(255, 250, 134, 0.15)"},{"type":19,"name":"Network Control","fillColor":"rgba(146, 107, 227, 0.3)"},{"type":20,"name":"Gravekeeper","fillColor":"rgba(97, 97, 97, 0.2)"},{"type":21,"name":"Slowing","fillColor":"rgba(255, 0, 0, 0.15)"},{"type":22,"name":"Draining","fillColor":"rgba(0, 0, 255, 0.15)"},{"type":23,"name":"Gravity","fillColor":"rgba(60, 0, 115, 0.15)"},{"type":24,"name":"Repelling","fillColor":"rgba(210, 228, 239, 0.2)"},{"type":25,"name":"Freezing","fillColor":"rgba(58, 117, 112, 0.3)"},{"type":26,"name":"Slippery","fillColor":"rgba(33, 161, 165, 0.3)"},{"type":27,"name":"Disabling","fillColor":"rgba(255, 191, 206, 0.5)"},{"type":28,"name":"Enlarging","fillColor":"rgba(77, 1, 99, 0.3)"},{"type":29,"name":"Toxic","fillColor":"rgba(0, 199, 0, 0.2)"},{"type":30,"name":"Magnetic Reduction","fillColor":"rgba(189, 103, 210, 0.25)"},{"type":31,"name":"Magnetic Nullification","fillColor":"rgba(100, 35, 116, 0.3)"},{"type":32,"name":"Lava","fillColor":"rgba(247, 131, 6, 0.3)"},{"type":33,"name":"Quicksand","fillColor":"rgba(108, 84, 30, 0.3)"},{"type":34,"name":"Radar","fillColor":"rgba(153, 153, 153, 0.2)"},{"type":35,"name":"Shield","fillColor":"rgba(41, 255, 198, 0.3)"},{"type":36,"name":"Reducing","fillColor":"rgba(45, 50, 55, 0.15)"},{"type":37,"name":"Experience Drain","fillColor":"rgba(60, 0, 0, 0.2)"},{"type":38,"name":"Blocking","fillColor":"rgba(191, 82, 19, 0.3)"},{"type":39,"name":"Reduce","fillColor":"rgba(60, 189, 152, 0.2)"},{"type":40,"name":"Ictos","fillColor":"rgba(207, 166, 236, 0.25)"},{"type":41,"name":"Enemy Boss","fillColor":"rgba(99, 93, 110, 0.35)"},{"type":42,"name":"Mutatiorb Revive","fillColor":"rgba(110, 57, 30, 0.15)"},{"type":43,"name":"Lightning Charge","fillColor":"rgba(0, 225, 225, 0.1)"},{"type":44,"name":"Enemy Slowing","fillColor":"rgba(255, 0, 0, 0.15)"},{"type":45,"name":"Enemy Draining","fillColor":"rgba(0, 0, 255, 0.15)"},{"type":46,"name":"Enemy Gravity","fillColor":"rgba(60, 0, 115, 0.15)"},{"type":47,"name":"Enemy Repelling","fillColor":"rgba(210, 228, 239, 0.2)"},{"type":48,"name":"Enemy Freezing","fillColor":"rgba(58, 117, 112, 0.3)"},{"type":49,"name":"Enemy Slippery","fillColor":"rgba(33, 161, 165, 0.3)"},{"type":50,"name":"Enemy Disabling","fillColor":"rgba(255, 191, 206, 0.5)"},{"type":51,"name":"Enemy Experience Drain","fillColor":"rgba(60, 0, 0, 0.2)"},{"type":52,"name":"Enemy Enlarging","fillColor":"rgba(77, 1, 99, 0.3)"},{"type":53,"name":"Enemy Toxic","fillColor":"rgba(0, 199, 0, 0.2)"},{"type":54,"name":"Enemy Magnetic Reduction","fillColor":"rgba(189, 103, 210, 0.25)"},{"type":55,"name":"Enemy Magnetic Nullification","fillColor":"rgba(100, 35, 116, 0.3)"},{"type":56,"name":"Enemy Lava","fillColor":"rgba(247, 131, 6, 0.3)"},{"type":57,"name":"Enemy Cybot","fillColor":"rgba(146, 107, 227, 0.3)"},{"type":58,"name":"Enemy Cybot Shield","fillColor":"rgba(214, 0, 57, 0.3)"},{"type":59,"name":"Enemy Quicksand","fillColor":"rgba(108, 84, 30, 0.3)"},{"type":60,"name":"Enemy Radar","fillColor":"rgba(153, 153, 153, 0.2)"},{"type":61,"name":"Enemy Barrier","fillColor":"rgba(41, 255, 198, 0.3)"},{"type":62,"name":"Enemy Reducing","fillColor":"rgba(45, 50, 55, 0.15)"},{"type":63,"name":"Enemy Blocking","fillColor":"rgba(191, 82, 19, 0.3)"},{"type":64,"name":"Enemy Flaming","fillColor":"#aa2f2f7a"},{"type":65,"name":"Enemy Disarming","fillColor":"rgba(70, 65, 66, 0.17)"},{"type":66,"name":"Flashlight","hasLight":true,"cone":{"innerAngle":35,"distance":500},"fillColor":"rgba(255, 128, 0, 0.15)"},{"type":67,"name":"Lantern","hasLight":true,"circle":{"radius":250},"fillColor":"rgba(0, 255, 0, 0.6)"}],"defaults":{"ability":{"cooldown":0,"locked":true,"level":0,"max_level":5,"disabled":false},"area":{"has_previous":true,"has_next":true},"wall_enemy":{"radius":30,"color":"#222222"},"normal_enemy":{"radius":18,"color":"#939393"},"homing_enemy":{"radius":18,"color":"#966e14"},"homing_switch_enemy":{"radius":18,"color":"#694d0e"},"dasher_enemy":{"radius":18,"color":"#003c66"},"dasher_switch_enemy":{"radius":18,"color":"#00243d"},"slowing_enemy":{"radius":18,"color":"#ff0000"},"experience_drain_enemy":{"radius":18,"color":"#b19cd9"},"enlarging_enemy":{"radius":18,"color":"#4d0163"},"draining_enemy":{"radius":18,"color":"#0000ff"},"gravity_enemy":{"radius":18,"color":"#78148c"},"repelling_enemy":{"radius":18,"color":"#7b9db2"},"turning_enemy":{"radius":18,"color":"#336600"},"sizing_enemy":{"radius":35,"color":"#f27743"},"sniper_enemy":{"radius":18,"color":"#a05353"},"freezing_enemy":{"radius":2,"color":"#64c1b9"},"teleporting_enemy":{"radius":18,"color":"#ecc4ef"},"wavy_enemy":{"radius":18,"color":"#dd2606"},"wavy_switch_enemy":{"radius":18,"color":"#fa5336"},"zigzag_enemy":{"radius":18,"color":"#b371f2"},"zigzag_switch_enemy":{"radius":18,"color":"#e0c6f9"},"confectioner_enemy":{"radius":18,"color":"#8771f2"},"confectioner_switch_enemy":{"radius":18,"color":"#cfc6f9"},"zoning_enemy":{"radius":18,"color":"#a03811"},"zoning_switch_enemy":{"radius":18,"color":"#b35f40"},"spiral_enemy":{"radius":18,"color":"#e8b500"},"spiral_switch_enemy":{"radius":18,"color":"#f5e199"},"oscillating_enemy":{"radius":18,"color":"#869e0f"},"oscillating_switch_enemy":{"radius":18,"color":"#b6c46f"},"switch_enemy":{"radius":18,"color":"#565656"},"dorito_enemy":{"radius":18,"color":"#05dad1"},"dorito_switch_enemy":{"radius":18,"color":"#9bf0ec"},"penny_enemy":{"radius":18,"color":"#c38b32"},"penny_switch_enemy":{"radius":18,"color":"#d9b67f"},"infinity_enemy":{"radius":18,"color":"#ff69c5"},"infinity_switch_enemy":{"radius":18,"color":"#ffb4e2"},"liquid_enemy":{"radius":18,"color":"#6789ef"},"icicle_enemy":{"radius":18,"color":"#adf8ff"},"slippery_enemy":{"radius":5,"color":"#1aacbf"},"ice_sniper_enemy":{"radius":18,"color":"#8300ff"},"disabling_enemy":{"radius":18,"color":"#a87c86"},"speed_sniper_enemy":{"radius":18,"color":"#ff9000"},"regen_sniper_enemy":{"radius":18,"color":"#00cc8e"},"radiating_bullets_enemy":{"radius":18,"color":"#d3134f"},"immune_enemy":{"radius":18,"color":"#000000"},"pumpkin_enemy":{"radius":18,"color":"#e26110"},"tree_enemy":{"radius":18,"color":"#4e2700"},"frost_giant_enemy":{"radius":30,"color":"#7e7cd6"},"snowman_enemy":{"radius":18,"color":"#ffffff"},"corrosive_enemy":{"radius":18,"color":"#00eb00"},"toxic_enemy":{"radius":18,"color":"#00c700"},"corrosive_sniper_enemy":{"radius":18,"color":"#61ff61"},"poison_sniper_enemy":{"radius":18,"color":"#8c01b7"},"magnetic_reduction_enemy":{"radius":18,"color":"#bd67d2"},"magnetic_nullification_enemy":{"radius":18,"color":"#642374"},"positive_magnetic_sniper_enemy":{"radius":18,"color":"#ff3852"},"negative_magnetic_sniper_enemy":{"radius":18,"color":"#a496ff"},"residue_enemy":{"radius":18,"color":"#675327"},"fire_trail_enemy":{"radius":18,"color":"#cf5504"},"ice_ghost_enemy":{"radius":18,"color":"#be89ff"},"poison_ghost_enemy":{"radius":18,"color":"#590174"},"positive_magnetic_ghost_enemy":{"radius":18,"color":"#e3001e"},"negative_magnetic_ghost_enemy":{"radius":18,"color":"#6f59ff"},"wind_ghost_enemy":{"radius":18,"color":"#9de3c6"},"lunging_enemy":{"radius":18,"color_change":55,"color":"#c88250"},"lava_enemy":{"radius":18,"color":"#f78306"},"gravity_ghost_enemy":{"radius":18,"color":"#78148c"},"repelling_ghost_enemy":{"radius":18,"color":"#7b9db2"},"star_enemy":{"radius":18,"color":"#faf46e"},"grass_enemy":{"radius":18,"color":"#75eb26"},"seedling_enemy":{"radius":18,"color":"#259c55"},"flower_enemy":{"radius":18,"color":"#e8e584"},"disabling_ghost_enemy":{"radius":60,"color":"rgba(255, 191, 206, 0.5)"},"glowy_enemy":{"radius":18,"color":"#ede658"},"firefly_enemy":{"radius":18,"color":"#f0841f"},"mist_enemy":{"radius":18,"color":"#b686db"},"phantom_enemy":{"radius":18,"color":"#86d7db"},"cybot_enemy":{"radius":15,"color":"#926be3"},"eabot_enemy":{"radius":30,"color":"#b07331"},"wabot_enemy":{"radius":30,"color":"#319bb0"},"fibot_enemy":{"radius":30,"color":"#e88409"},"aibot_enemy":{"radius":30,"color":"#00b585"},"wind_sniper_enemy":{"radius":18,"color":"#9de3c6"},"sand_enemy":{"radius":18,"color":"#d5ae7f"},"sandrock_enemy":{"radius":18,"color":"#a57a6d"},"quicksand_enemy":{"radius":18,"color":"#6c541e"},"crumbling_enemy":{"radius":18,"color":"#bd9476"},"radar_enemy":{"radius":18,"color":"#c90000"},"barrier_enemy":{"radius":18,"color":"#29ffc6"},"speed_ghost_enemy":{"radius":18,"color":"#fca330"},"regen_ghost_enemy":{"radius":18,"color":"#32e3ae"},"cactus_enemy":{"radius":18,"color":"#5b8e28"},"cycling_enemy":{"radius":18,"color":"#91bbff"},"icbot_enemy":{"radius":30,"color":"#1bc8e3"},"elbot_enemy":{"radius":30,"color":"#daff1f"},"plbot_enemy":{"radius":30,"color":"#18ed3f"},"mebot_enemy":{"radius":30,"color":"#b55b31"},"libot_enemy":{"radius":30,"color":"#fff9bd"},"dabot_enemy":{"radius":30,"color":"#3d006e"},"sparking_enemy":{"radius":18,"color":"#ffbe6e"},"thunderbolt_enemy":{"radius":18,"color":"#f4ff8c"},"static_enemy":{"radius":18,"color":"#f5a462"},"electrical_enemy":{"radius":18,"color":"#ffff00"},"prediction_sniper_enemy":{"radius":18,"color":"#d14f84"},"ring_sniper_enemy":{"radius":18,"color":"#b5deeb"},"charging_enemy":{"radius":18,"color":"#374037"},"reducing_enemy":{"radius":18,"color":"rgb(45, 50, 55)"},"lead_sniper_enemy":{"radius":18,"color":"#788898"},"stalactite_enemy":{"radius":18,"color":"#302519"},"blocking_enemy":{"radius":18,"color":"#bf5213"},"force_sniper_a_enemy":{"radius":18,"color":"#0a5557"},"force_sniper_b_enemy":{"radius":18,"color":"#914d83"},"wacky_wall_enemy":{"radius":18,"color":"#332233"},"flaming_enemy":{"radius":18,"color":"#aa2f2f"},"stumbling_enemy":{"radius":18,"color":"#7d487f"},"disarming_enemy":{"radius":18,"color":"#a377a3"},"lurching_enemy":{"radius":18,"color":"#5d4d5d"},"infectious_enemy":{"radius":18,"color":"#eb00eb"},"mutating_enemy":{"radius":8,"color":"#7a3b30"},"vengeful_soul_enemy":{"radius":18,"color":"#96b1b3"},"lost_soul_enemy":{"radius":18,"color":"#bed0d1"},"pellet":{"radius":8},"reverse_projectile":{"radius":11,"color":"#00dd00"},"minimize_projectile":{"radius":11,"color":"#ff0000"},"reanimate_projectile":{"radius":11,"color":"#FF00FF"},"sniper_projectile":{"radius":6,"speed":300,"color":"#a05353"},"vengeance_projectile":{"radius":15,"speed":300,"color":"#b23a3a"},"latch_projectile":{"radius":17,"color":"#f9f993"},"barrier_dome":{"radius":170},"stream_path":{"length":300,"width":200,"duration":7},"black_hole_projectile":{"speed":720,"radius":200,"color":"rgba(0, 0, 0, 0.6)"},"spark_projectile":{"radius":8,"color":"#ffff00"},"lightning_projectile":{"radius":8,"color":"#1cffff"},"shadow_projectile":{"radius":15,"color":"#232323"},"obscure_projectile":{"radius":15,"color":"#020fa2"},"ice_sniper_projectile":{"radius":10,"speed":480,"color":"#be89ff"},"snowball_projectile":{"radius":13,"color":"#a5c7ce"},"speed_sniper_projectile":{"radius":10,"speed":480,"color":"#d6885c"},"regen_sniper_projectile":{"radius":10,"speed":480,"color":"#00a875"},"radiating_bullets_projectile":{"radius":8,"speed":240,"color":"#a30838"},"leaf_projectile":{"radius":12,"speed":180,"color":"#035b12"},"frost_giant_ice_projectile":{"radius":10,"speed":120,"color":"#a0a7d6"},"stalactite_enemy_projectile":{"radius":2,"speed":60,"color":"#614c37"},"orbit_projectile":{"radius":10,"color":"rgb(174, 137, 185)"},"corrosive_sniper_projectile":{"radius":6,"speed":300,"color":"#61ff61"},"poison_sniper_projectile":{"radius":10,"speed":480,"color":"#590174"},"positive_magnetic_sniper_projectile":{"radius":10,"speed":480,"color":"#e3001e"},"negative_magnetic_sniper_projectile":{"radius":10,"speed":480,"color":"#6f59ff"},"crumble_projectile":{"radius":10,"color":"#a48c5d"},"radioactive_gloop_projectile":{"radius":3,"color":"#7aff7a"},"bloom_projectile":{"radius":1,"color":"#8a30d9","speed":0},"pollinate_projectile":{"radius":15,"color":"#d9b130"},"seedling_projectile":{"radius":15,"color":"#259c55"},"flower_projectile":{"radius":1,"color":"#e084e8"},"grave_projectile":{"radius":5,"color":"#616161","speed":0},"elbot_projectile":{"radius":30,"speed":720,"color":"#ffff4a"},"libot_projectile":{"radius":30,"speed":480,"color":"#defffe"},"dabot_projectile":{"radius":30,"speed":480,"color":"#2b0021"},"wind_sniper_projectile":{"radius":10,"speed":210,"color":"#82c2a5"},"radar_projectile":{"radius":4,"speed":150,"color":"#c90000"},"robo_scanner_sniper_projectile":{"radius":6,"speed":300,"color":"#a05353"},"robo_scanner_ice_sniper_projectile":{"radius":10,"speed":480,"color":"#be89ff"},"robo_scanner_speed_sniper_projectile":{"radius":10,"speed":480,"color":"#d6885c"},"robo_scanner_regen_sniper_projectile":{"radius":10,"speed":480,"color":"#00a875"},"robo_scanner_radiating_bullets_projectile":{"radius":8,"speed":240,"color":"#a30838"},"robo_scanner_leaf_projectile":{"radius":12,"speed":180,"color":"#035b12"},"robo_scanner_corrosive_sniper_projectile":{"radius":6,"speed":300,"color":"#61ff61"},"robo_scanner_poison_sniper_projectile":{"radius":10,"speed":480,"color":"#590174"},"robo_scanner_positive_sniper_projectile":{"radius":10,"speed":480,"color":"#e3001e"},"robo_scanner_negative_sniper_projectile":{"radius":10,"speed":480,"color":"#6f59ff"},"robo_scanner_wind_sniper_projectile":{"radius":10,"speed":210,"color":"#82c2a5"},"robo_scanner_radar_projectile":{"radius":4,"speed":150,"color":"#c90000"},"robo_scanner_prediction_sniper_projectile":{"radius":10,"speed":330,"color":"#d14f84"},"robo_scanner_lead_sniper_projectile":{"radius":12,"speed":300,"color":"#687888"},"robo_scanner_force_a_projectile":{"radius":12,"speed":360,"color":"#0a5557"},"robo_scanner_force_b_projectile":{"radius":12,"speed":360,"color":"#914d83"},"robo_scanner_flower_projectile":{"radius":15,"color":"#e084e8"},"robo_scanner_frost_giant_ice_projectile":{"radius":10,"speed":120,"color":"#a0a7d6"},"echelon_projectile":{"radius":15,"color":"rgba(35, 166, 168, 0.5)"},"incinerate_projectile":{"radius":4,"duration":2,"color":"rgb(126, 12, 22)"},"petrify_projectile":{"radius":60,"radius_deviation":10,"speed":1200,"range":800,"petrify_duration":3000,"color":"rgba(70, 55, 92, 0.5)"},"ictos_projectile":{"radius":10,"effect_radius":75,"duration":2000,"color":"#cfa6ec"},"sparking_enemy_projectile":{"radius":5,"color":"#ffbe6e"},"electrical_enemy_projectile":{"color":"#ffff00"},"prediction_sniper_projectile":{"speed":330,"radius":10,"color":"#d14f84"},"ring_sniper_projectile":{"speed":90,"radius":24,"color":"#ed3737"},"cybot_ring_projectile":{"speed":180,"radius":40,"color":"#393ced"},"lead_sniper_projectile":{"radius":12,"speed":300,"color":"#687888","effect_time":3.5},"force_sniper_a_projectile":{"radius":12,"speed":360,"color":"#23787a"},"force_sniper_b_projectile":{"radius":12,"speed":360,"color":"#6e295f"},"factorb_explosion":{"radius":0,"color":"#6e391e"},"player":{"radius":15,"speed":150,"level":1,"max_level":100,"experience":0,"previous_level_experience":0,"next_level_experience":4,"upgrade_points":0,"energy":30,"max_energy":30,"energy_regen":1,"death_timer":-1}},"upgrades":{"speed":{"increment":15,"max":510},"max_energy":{"increment":5,"max":300},"energy_regen":{"increment":0.2,"max":7}},"accessories":{"gold-crown":{"name":"Gold Crown","description":"Rare crown which is currently awarded to the top 3 players in the Hall of Fame every week."},"silver-crown":{"name":"Silver Crown","description":"Silver crown which is currently awarded to the top 10 players in the Hall of Fame every week."},"bronze-crown":{"name":"Bronze Crown","description":"This crown is currently awarded to the top 30 players in the Hall of Fame every week."},"santa-hat":{"name":"Santa Hat","description":{"is_december":"Perfect for these festive times. Received from Frozen Fjord.","default":"It may not be in season right now, but it can be found in Frozen Fjord if you are still feeling festive."}},"gold-wreath":{"name":"Gold Wreath","description":"Awarded for winning a normal tournament hosted on Discord."},"spring-wreath":{"name":"Spring Wreath","description":"A pretty wreath awarded for winning the annual spring tournament."},"autumn-wreath":{"name":"Autumn Wreath","description":"A sweet wreath awarded for winning the annual autumn tournament."},"winter-wreath":{"name":"Winter Wreath","description":"A cool wreath awarded for winning the annual winter tournament."},"summer-wreath":{"name":"Summer Wreath","description":"An elegant wreath awarded for winning the annual summer tournament."},"summer-olympics-wreath":{"name":"Summer Olympics Wreath","description":"Awarded to the winning team during the summer Olympics tournament."},"summer-olympics-wreath-2":{"name":"Summer Olympics Wreath II","description":"Awarded to 2-time champions of the winning team during the summer Olympics tournament."},"winter-olympics-wreath":{"name":"Winter Olympics Wreath","description":"Awarded to the winning team during the winter Olympics tournament."},"halo":{"name":"Halo","description":"For the worthy."},"blue-santa-hat":{"name":"Blue Santa Hat","description":"Awarded for completing Frozen Fjord Hard."},"flames":{"name":"Flames","description":"Found after escaping the Burning Bunker."},"blue-flames":{"name":"Blue Flames","description":"Found after escaping Burning Bunker Hard."},"stars":{"name":"Stars","description":"Even the stars recognise you after completing Elite Expanse Hard."},"witch-hat":{"name":"Witch Hat","description":"A spooky hat found by navigating through the hedge maze in Mysterious Mansion."},"sunglasses":{"name":"Sunglasses","description":"Cool sunglasses awarded for earning 10 quest points."},"flower-headband":{"name":"Flower Headband","description":"Cute headband awarded for earning 30 quest points."},"pirate-hat":{"name":"Pirate Hat","description":"You earn your place with the pirates for 100 quest points."},"rose-wreath":{"name":"Rose Wreath","description":"Only the top players on the highscores leaderboard can keep this wreath."},"gold-jewels":{"name":"Gold Jewels","description":"Golden jewels awarded for achieving 1st place in the quarterly bracket-style tournament."},"silver-jewels":{"name":"Silver Jewels","description":"Silver jewels awarded for achieving 2nd place in the quarterly bracket-style tournament."},"bronze-jewels":{"name":"Bronze Jewels","description":"Bronze jewels awarded for achieving 3rd place in the quarterly bracket-style tournament."},"fruit-bowl":{"name":"Fruit Bowl","description":"You can look tasty for only 350 quest points."},"sticky-coat":{"name":"Sticky Coat","description":"A likely harmless substance that is found after completing Toxic Territory."},"toxic-coat":{"name":"Toxic Coat","description":"Irregulated materials found past Toxic Territory Hard."},"orbit-ring":{"name":"Orbit Ring","description":"Some planets have these, but this one is just a replica. Found at the end of the Elite Expanse."},"clouds":{"name":"Clouds","description":{"viewer_passed_endless_echo_thousand":"These words are the Endless Echo, and you are trapped within it.","default":"A calm set of clouds awarded for reaching the sixth victory zone within the Endless Echo."}},"storm-clouds":{"name":"Clouds","description":"Ominous clouds are awareded for reaching the sixth victory zone in Endless Echo Hard."},"tuxedo":{"name":"Tuxedo","description":"Suited for professionals. Luckily, the tie is already done for you. Awarded for earning 60 quest points."},"doughnut":{"name":"Doughnut","description":"Does it hurt to get pierced? Awarded for earning 150 quest points."},"stardust":{"name":"Stardust","description":"The cosmos recognise your contributions after earning 200 quest points."},"broomstick":{"name":"Broomstick","description":"Fantastic for cleaning purposes, but it doesn\'t seem to fly. Earned after 250 quest points."},"snowglobe":{"name":"Snowglobe","description":"Thankfully, real snow doesn\'t last forever, even if it is pretty to look at. This snowglobe gives you the best of both worlds. Awarded after earning 300 quest points."}}}');
EvadesConfig.heroes[-1]={name:"Ordinary",backgroundColor:"#B60000",foregroundColor:"#B60000",textColor:"#B60000",strokeColor:"#820000"}
function capitalize(s){
  var t=s.split("_")
  t=t.map(e=>{
    return e[0].toUpperCase()+e.slice(1).toLowerCase();
  })
  return t.join("");
}
var $ccc1645057c0c20e$export$18da14ab4d863bec=`FLASHLIGHT_ITEM, TORCH, PARTICLE_GENERATOR, LIGHT_REGION, PELLET, SOUR_CANDY_ITEM, SWEET_TOOTH_ITEM, EXPERIORB_ITEM, WALL, BLOOM_PROJECTILE, ROBO_SCANNER_FLOWER_PROJECTILE, POLLINATE_PROJECTILE, STREAM_PATH, BARRIER_DOME, PLAYER, RADIOACTIVE_GLOOP_PROJECTILE, FACTORB_EXPLOSION, MINIMIZE_PROJECTILE, REANIMATE_PROJECTILE, REVERSE_PROJECTILE, BLACK_HOLE_PROJECTILE, SHADOW_PROJECTILE, OBSCURE_PROJECTILE, SNOWBALL_PROJECTILE, LEAF_PROJECTILE, ORBIT_PROJECTILE, CRUMBLE_PROJECTILE, GRAVE_PROJECTILE, ECHELON_PROJECTILE, INCINERATE_PROJECTILE, PETRIFY_PROJECTILE, ICTOS_PROJECTILE, SPARKING_ENEMY_PROJECTILE, ELECTRICAL_ENEMY_PROJECTILE, PREDICTION_SNIPER_PROJECTILE, RING_SNIPER_PROJECTILE, CYBOT_RING_PROJECTILE, LEAD_SNIPER_PROJECTILE, FORCE_SNIPER_A_PROJECTILE, FORCE_SNIPER_B_PROJECTILE, FLOWER_PROJECTILE, ICE_GHOST_ENEMY, POISON_GHOST_ENEMY, POSITIVE_MAGNETIC_GHOST_ENEMY, NEGATIVE_MAGNETIC_GHOST_ENEMY, WIND_GHOST_ENEMY, GRAVITY_GHOST_ENEMY, REPELLING_GHOST_ENEMY, GRASS_ENEMY, FLOWER_ENEMY, DISABLING_GHOST_ENEMY, GLOWY_ENEMY, FIREFLY_ENEMY, MIST_ENEMY, PHANTOM_ENEMY, SPEED_GHOST_ENEMY, REGEN_GHOST_ENEMY, NORMAL_ENEMY, DASHER_ENEMY, DASHER_SWITCH_ENEMY, DRAINING_ENEMY, FREEZING_ENEMY, GRAVITY_ENEMY, HOMING_ENEMY, HOMING_SWITCH_ENEMY, SIZING_ENEMY, SLOWING_ENEMY, EXPERIENCE_DRAIN_ENEMY, ENLARGING_ENEMY, SNIPER_ENEMY, REPELLING_ENEMY, TELEPORTING_ENEMY, TURNING_ENEMY, WAVY_ENEMY, WAVY_SWITCH_ENEMY, ZIGZAG_ENEMY, ZIGZAG_SWITCH_ENEMY, CONFECTIONER_ENEMY, CONFECTIONER_SWITCH_ENEMY, ZONING_ENEMY, ZONING_SWITCH_ENEMY, SPIRAL_ENEMY, SPIRAL_SWITCH_ENEMY, OSCILLATING_ENEMY, OSCILLATING_SWITCH_ENEMY, SWITCH_ENEMY, DORITO_ENEMY, DORITO_SWITCH_ENEMY, PENNY_ENEMY, PENNY_SWITCH_ENEMY, INFINITY_ENEMY, INFINITY_SWITCH_ENEMY, LIQUID_ENEMY, ICICLE_ENEMY, SLIPPERY_ENEMY, ICE_SNIPER_ENEMY, DISABLING_ENEMY, SPEED_SNIPER_ENEMY, REGEN_SNIPER_ENEMY, RADIATING_BULLETS_ENEMY, PUMPKIN_ENEMY, TREE_ENEMY, FROST_GIANT_ENEMY, IMMUNE_ENEMY, SNOWMAN_ENEMY, CORROSIVE_ENEMY, TOXIC_ENEMY, CORROSIVE_SNIPER_ENEMY, POISON_SNIPER_ENEMY, MAGNETIC_REDUCTION_ENEMY, MAGNETIC_NULLIFICATION_ENEMY, POSITIVE_MAGNETIC_SNIPER_ENEMY, NEGATIVE_MAGNETIC_SNIPER_ENEMY, LUNGING_ENEMY, LAVA_ENEMY, STAR_ENEMY, SEEDLING_ENEMY, SEEDLING_PROJECTILE, CYBOT_ENEMY, EABOT_ENEMY, WABOT_ENEMY, FIBOT_ENEMY, AIBOT_ENEMY, ICBOT_ENEMY, LIBOT_ENEMY, PLBOT_ENEMY, MEBOT_ENEMY, LIBOT_ENEMY, DABOT_ENEMY, WIND_SNIPER_ENEMY, SAND_ENEMY, SANDROCK_ENEMY, QUICKSAND_ENEMY, CRUMBLING_ENEMY, RADAR_ENEMY, BARRIER_ENEMY, CACTUS_ENEMY, CYCLING_ENEMY, SPARKING_ENEMY, THUNDERBOLT_ENEMY, STATIC_ENEMY, ELECTRICAL_ENEMY, PREDICTION_SNIPER_ENEMY, RING_SNIPER_ENEMY, LEAD_SNIPER_ENEMY, CHARGING_ENEMY, REDUCING_ENEMY, STALACTITE_ENEMY, BLOCKING_ENEMY, FORCE_SNIPER_A_ENEMY, FORCE_SNIPER_B_ENEMY, FLAMING_ENEMY, STUMBLING_ENEMY, DISARMING_ENEMY, LURCHING_ENEMY, INFECTIOUS_ENEMY, MUTATING_ENEMY, VENGEFUL_SOUL_ENEMY, LOST_SOUL_ENEMY, RESIDUE_ENEMY, FIRE_TRAIL_ENEMY, SNIPER_PROJECTILE, VENGEANCE_PROJECTILE, ICE_SNIPER_PROJECTILE, SPEED_SNIPER_PROJECTILE, REGEN_SNIPER_PROJECTILE, RADIATING_BULLETS_PROJECTILE, LATCH_PROJECTILE, FROST_GIANT_ICE_PROJECTILE, STALACTITE_ENEMY_PROJECTILE, SPARK_PROJECTILE, LIGHTNING_PROJECTILE, CORROSIVE_SNIPER_PROJECTILE, POISON_SNIPER_PROJECTILE, POSITIVE_MAGNETIC_SNIPER_PROJECTILE, NEGATIVE_MAGNETIC_SNIPER_PROJECTILE, ELBOT_PROJECTILE, LIBOT_PROJECTILE, DABOT_PROJECTILE, WIND_SNIPER_PROJECTILE, RADAR_PROJECTILE, ROBO_SCANNER_SNIPER_PROJECTILE, ROBO_SCANNER_ICE_SNIPER_PROJECTILE, ROBO_SCANNER_SPEED_SNIPER_PROJECTILE, ROBO_SCANNER_REGEN_SNIPER_PROJECTILE, ROBO_SCANNER_RADIATING_BULLETS_PROJECTILE, ROBO_SCANNER_CORROSIVE_SNIPER_PROJECTILE, ROBO_SCANNER_POISON_SNIPER_PROJECTILE, ROBO_SCANNER_POSITIVE_SNIPER_PROJECTILE, ROBO_SCANNER_NEGATIVE_SNIPER_PROJECTILE, ROBO_SCANNER_WIND_SNIPER_PROJECTILE, ROBO_SCANNER_RADAR_PROJECTILE, ROBO_SCANNER_PREDICTION_SNIPER_PROJECTILE, ROBO_SCANNER_LEAD_SNIPER_PROJECTILE, ROBO_SCANNER_FORCE_A_PROJECTILE, ROBO_SCANNER_FORCE_B_PROJECTILE, WACKY_WALL_ENEMY, ROBO_SCANNER_FROST_GIANT_ICE_PROJECTILE, WALL_ENEMY`.split(", ").map(e=>capitalize(e));
function sortEntitiesByZIndex(e) {
	const t = []
		, a = [];
	for (const r of e)
		-1 === r.absoluteZIndex ? t.push(r) : a.push(r);
	const r=(e,t)=>{
		if(e.isEnemy&&t.isEnemy){
			if(e.inactive&&!t.inactive)return -1;
			if(!e.inactive&&t.inactive)return 1;
			if(e.radius!==t.radius)return t.radius-e.radius;
		}
		return e.isPlayer && t.isPlayer && e.isLocalPlayer !== t.isLocalPlayer ? t.isLocalPlayer ? -1 : 1 : e.constructor.name !== t.constructor.name ? $ccc1645057c0c20e$export$18da14ab4d863bec.indexOf(e.constructor.name) - $ccc1645057c0c20e$export$18da14ab4d863bec.indexOf(t.constructor.name) : (e.relativeZIndex || 0) !== (t.relativeZIndex || 0) ? (e.relativeZIndex || 0) - (t.relativeZIndex || 0) : Math.pow(-1,Math.random()<0.5);
	};
	return t.sort(r),
	a.sort(r),
	t.concat(a)
}
var abilityConfig=EvadesConfig.abilities;
var effectConfig=EvadesConfig.effects;
abilityConfig[-2]={"name":"Locked","description":"Not implemented","energy_cost":0,"continuous":false,"total_cooldown":0,"levels":[{}]}
const $e728d5a493f33528$export$ba6e2f1cddd013f7 = (e,a)=>{
	for (const t of e)
		if (t.name === a.toLowerCase())
			return t;
	return null
}
class SnowRenderer{update(e,t,a){const delta=arguments[4];if(this.intensity=arguments[3]("properties","snow",null,e,map),0===this.intensity||0===delta)return;e!==this.area&&(this.area=e,this.reset(t));let r=0,c=0;null!==this.camera&&(r=this.camera.x-a.x,c=this.camera.y-a.y),this.camera={x:a.x,y:a.y},this.angle+=.3*delta/1e3;const o=this.width(t),n=this.height(t),$=30*(1+2*this.intensity)*delta/1e3;for(let e=0;e<this.particles.length;e++){const t=this.particles[e];t.x+=2*Math.sin(this.angle)*$-r,t.y+=(Math.cos(this.angle+t.d)+1+t.r/2)*$-c,t.x>o?this.particles[e]=r<0?{x:Math.random()*-r,y:Math.random()*n,r:t.r,d:t.d}:{x:0,y:Math.random()*n,r:t.r,d:t.d}:t.x<0?this.particles[e]=r>0?{x:o-Math.random()*r,y:Math.random()*n,r:t.r,d:t.d}:{x:o,y:Math.random()*n,r:t.r,d:t.d}:t.y>n&&c<0?this.particles[e]={x:Math.random()*o,y:Math.random()*-c,r:t.r,d:t.d}:t.y<0&&c>0?this.particles[e]={x:Math.random()*o,y:n-Math.random()*c,r:t.r,d:t.d}:(t.y<0||t.y>n)&&(this.particles[e]={x:Math.random()*o,y:0,r:t.r,d:t.d})}}reset(e){this.angle=0,this.particles=[],this.camera=null;const t=Math.ceil(2*this.intensity),a=Math.ceil(3.5*this.intensity),r=this.width(e),c=this.height(e);for(let e=0;e<Math.floor(40*this.intensity);e++)this.particles.push({x:Math.random()*r,y:Math.random()*c,r:Math.random()*(a-t)+t,d:Math.random()})}width(e){return e.canvas.width}height(e){return e.canvas.height}render(e){if(0===this.intensity)return;const t=this.width(e),a=this.height(e);e.fillStyle="rgba(255, 255, 255, 0.8)",e.beginPath();for(let r=0;r<this.particles.length;r++){const c=this.particles[r],o=c.x,n=c.y;o<0||n<0||o>t||n>a||(e.moveTo(o,n),e.arc(o,n,c.r,0,2*Math.PI,!1))}e.fill()}constructor(){this.intensity=0,this.particles=[],this.angle=0,this.area=null,this.camera=null}}
class DynamicLighting{addCircleLightSource(e,t,n){this.circleLightSources.push({radius:e,x:t,y:n})}addConeLightSource(e,t,n,r,i,a){this.coneLightSources.push({x:e,y:t,centerDistance:n,directionAngle:r,innerAngle:i,distance:a})}addRectangleLightSource(e){this.rectangleLightSources.push(e)}getCachedGradient(e,t,n){if(!this.lightCache.has(t)){const r=n(e);this.lightCache.set(t,r)}return this.lightCache.get(t)}render(e,t){e.clearRect(0,0,e.canvas.width,e.canvas.height);e.scale(camScale,camScale);for(const n of this.circleLightSources){if(n.radius<0||Number.isNaN(n.radius))continue;const r=`circle_${n.radius}`,i=this.getCachedGradient(e,r,(e=>{const t=e.createRadialGradient(0,0,0,0,0,n.radius);return t.addColorStop(0,"rgba(0, 0, 0, 1)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),t}));e.save(),e.translate(n.x+t.x,n.y+t.y),e.beginPath(),e.arc(0,0,n.radius,0,2*Math.PI,!1),e.fillStyle=i,e.fill(),e.restore()}for(const n of this.coneLightSources){const r=n.x+t.x,i=n.y+t.y,a=n.directionAngle-n.innerAngle/2,o=r+n.distance*Math.cos(a),s=i+n.distance*Math.sin(a),l=e.createRadialGradient(n.x+t.x,n.y+t.y,0,n.x+t.x,n.y+t.y,n.distance);l.addColorStop(0,"rgba(0, 0, 0, 1)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),e.beginPath(),e.moveTo(r,i),e.lineTo(o,s),e.arc(r,i,n.distance,n.directionAngle-n.innerAngle/2,n.directionAngle+n.innerAngle/2,!1),e.lineTo(r,i),e.fillStyle=l,e.closePath(),e.fill()}for(const n of this.rectangleLightSources){const r=n.x+t.x+n.width/2,i=n.y+t.y+n.height/2,a=Math.max(n.width,n.height)/2,o=`rectangle_${a}_${n.intensity}`,s=this.getCachedGradient(e,o,(e=>{const t=e.createRadialGradient(0,0,0,0,0,a);return t.addColorStop(0,`rgba(0, 0, 0, ${n.intensity})`),t.addColorStop(1,"rgba(0, 0, 0, 0)"),t}));e.save(),e.translate(r,i),e.fillStyle=s,e.fillRect(-a/2-n.width/2,-a/2-n.height/2,n.width+a,n.height+a),e.restore()}e.fillStyle=`rgba(0, 0, 0, ${this.lighting})`,e.resetTransform(),e.fillRect(0,0,e.canvas.width,e.canvas.height)}constructor(e){this.lighting=e,this.circleLightSources=[],this.coneLightSources=[],this.rectangleLightSources=[],this.lightCache=new Map}}
class $7bda4ebfc6020375$var$DirectionalIndicator {
	update(e) {
		this.x = e.x+map.areas[e.area].x,
		this.y = e.y+map.areas[e.area].y
	}
	isDone() {
		return !1
	}
	render() {}
	constructor(e) {
		this.update(e)
	}
}
class $7bda4ebfc6020375$var$DeathTimerDirectionalIndicator extends $7bda4ebfc6020375$var$DirectionalIndicator {
	update(e) {
		super.update(e),
		this.deathTimer = e.deathTimer
	}
	isDone() {
		return -1 === this.deathTimer
	}
	render(e, a, t) {
		var area=evadesRenderer.minimap.area;
		a.left=evadesRenderer.minimap.self.entity.x+area.x-640;
		a.right=evadesRenderer.minimap.self.entity.x+area.x+640;
		a.top=evadesRenderer.minimap.self.entity.y+area.y-360;
		a.bottom=evadesRenderer.minimap.self.entity.y+area.y+360;
		if (this.x >= a.left && this.x <= a.right && this.y >= a.top && this.y <= a.bottom)
			return;
		const r = Math.abs(this.x - (t.entity.x+area.x))
		  , c = Math.abs(this.y - (t.entity.y+area.y));
		if (r > 3200)
			return;
		if (c > 480)
			return;
		var fixedPos=[a.viewportSize.width/2-640*camScale,a.viewportSize.height/2-360*camScale,camScale];
		const o = this.x - a.left
		  , n = this.y - a.top
		  , $ = Math.max(Math.min(1280 - 10, o), 10)
		  , d = Math.max(Math.min(720 - 10, n), 10)
		  , i = Math.atan2(720 / 2 - n, 1280 / 2 - o)
		  , s = $ + 25 * Math.cos(i)
		  , f = d + 25 * Math.sin(i);
		$f36928166e04fda7$export$2e2bcd8739ae039.arrow(e, fixedPos[0]+s*camScale, fixedPos[1]+f*camScale, fixedPos[0]+$*camScale, fixedPos[1]+d*camScale)
	}
}
const controls = {
  DELETE_ZONE:0x2E,
  NEXT_AREA:0x27,
  PLAYTEST:0x73,
  PREVIOUS_AREA:0x25,
  TOGGLE_HITBOX:0x4F,
  CAM_LEFT:0x41,
  CAM_RIGHT:0x44,
  CAM_DOWN:0x53,
  CAM_UP:0x57,

  ACTION:0x20,
  CHAT:0x0D,
  DOWN:[0x28,0x53],
  FOCUS:0x10,
  LEFT:[0x25,0x41],
  RIGHT:[0x27,0x44],
  TOGGLE_HERO_INFO:0x48,
  TOGGLE_MINIMAP_MODE:0x47,
  TOGGLE_CHAT:0x56,
  TOGGLE_LEADERBOARD:0x42,
  TOGGLE_MAP:[0x09,0x4D],
  TOGGLE_AREA_INFO:0xBE,
  UP:[0x26,0x57],
  UPGRADE_SPEED:[0x31,0x61],
  UPGRADE_MAX_ENERGY:[0x32,0x62],
  UPGRADE_ENERGY_REGEN:[0x33,0x63],
  UPGRADE_ABILITY_ONE:[0x34,0x64],
  UPGRADE_ABILITY_TWO:[0x35,0x65],
  UPGRADE_ABILITY_THREE:[0x36,0x66],
  USE_ABILITY_ONE:[0x5A,0x4A],
  USE_ABILITY_TWO:[0x58,0x4B],
  USE_ABILITY_THREE:[0x43,0x4C],
};
var $d102378f4de5e1dc$export$2e2bcd8739ae039 = {"nested":{},"deferred":{},"files":{},"UNDEFINED_HEROSELECTION_SELECTION":0,"MAGMAX_SELECTION":1,"RIME_SELECTION":2,"MORFE_SELECTION":3,"AURORA_SELECTION":4,"NECRO_SELECTION":5,"BRUTE_SELECTION":6,"NEXUS_SELECTION":7,"SHADE_SELECTION":8,"EUCLID_SELECTION":9,"CHRONO_SELECTION":10,"REAPER_SELECTION":11,"RAMESES_SELECTION":12,"JOLT_SELECTION":13,"GHOUL_SELECTION":14,"CENT_SELECTION":15,"JOTUUN_SELECTION":16,"CANDY_SELECTION":17,"MIRAGE_SELECTION":18,"BOLDROCK_SELECTION":19,"GLOB_SELECTION":20,"MAGNO_SELECTION":21,"IGNIS_SELECTION":22,"STELLA_SELECTION":23,"VIOLA_SELECTION":24,"MORTUUS_SELECTION":25,"CYBOT_SELECTION":26,"ECHELON_SELECTION":27,"DEMONA_SELECTION":28,"STHENO_SELECTION":29,"KeyEvent":{"UNDEFINED_KEY":0,"KEY_DOWN":1,"KEY_UP":2},"UNDEFINED_KEY":0,"KEY_DOWN":1,"KEY_UP":2,"KeyType":{"UNDEFINED_KEYTYPE":0,"W_KEY":1,"A_KEY":2,"S_KEY":3,"D_KEY":4,"UP_KEY":5,"LEFT_KEY":6,"DOWN_KEY":7,"RIGHT_KEY":8,"FOCUS_KEY":9,"ABILITY_ONE_KEY":10,"ABILITY_TWO_KEY":11,"ABILITY_THREE_KEY":12,"ACTION_KEY":13,"UPGRADE_SPEED_KEY":14,"UPGRADE_MAX_ENERGY_KEY":15,"UPGRADE_ENERGY_REGEN_KEY":16,"UPGRADE_ABILITY_ONE_KEY":17,"UPGRADE_ABILITY_TWO_KEY":18,"UPGRADE_ABILITY_THREE_KEY":19},"UNDEFINED_KEYTYPE":0,"W_KEY":1,"A_KEY":2,"S_KEY":3,"D_KEY":4,"UP_KEY":5,"LEFT_KEY":6,"DOWN_KEY":7,"RIGHT_KEY":8,"FOCUS_KEY":9,"ABILITY_ONE_KEY":10,"ABILITY_TWO_KEY":11,"ABILITY_THREE_KEY":12,"ACTION_KEY":13,"UPGRADE_SPEED_KEY":14,"UPGRADE_MAX_ENERGY_KEY":15,"UPGRADE_ENERGY_REGEN_KEY":16,"UPGRADE_ABILITY_ONE_KEY":17,"UPGRADE_ABILITY_TWO_KEY":18,"UPGRADE_ABILITY_THREE_KEY":19,"ModToolsActionType":{"UNDEFINED_ACTIONTYPE":0,"MUTE":1,"KICK":2,"BAN":3},"UNDEFINED_ACTIONTYPE":0,"MUTE":1,"KICK":2,"BAN":3,"ClientPayload":{},"Key":{},"MouseDown":{},"ModToolsAction":{},"Settings":{},"EntityType":{"PLAYER":0,"PELLET":1,"WALL_ENEMY":2,"NORMAL_ENEMY":3,"HOMING_ENEMY":4,"DASHER_ENEMY":5,"SLOWING_ENEMY":6,"DRAINING_ENEMY":7,"REPELLING_ENEMY":8,"GRAVITY_ENEMY":9,"TURNING_ENEMY":10,"SIZING_ENEMY":11,"SNIPER_ENEMY":12,"FREEZING_ENEMY":13,"TELEPORTING_ENEMY":14,"WAVY_ENEMY":15,"ZIGZAG_ENEMY":16,"ZONING_ENEMY":17,"SPIRAL_ENEMY":18,"OSCILLATING_ENEMY":19,"SWITCH_ENEMY":20,"LIQUID_ENEMY":21,"ICICLE_ENEMY":22,"SLIPPERY_ENEMY":23,"ICE_SNIPER_ENEMY":24,"DISABLING_ENEMY":25,"EXPERIENCE_DRAIN_ENEMY":26,"ENLARGING_ENEMY":27,"SPEED_SNIPER_ENEMY":28,"REGEN_SNIPER_ENEMY":29,"RADIATING_BULLETS_ENEMY":30,"IMMUNE_ENEMY":31,"PUMPKIN_ENEMY":32,"TREE_ENEMY":33,"FROST_GIANT_ENEMY":34,"SNOWMAN_ENEMY":35,"CORROSIVE_ENEMY":36,"TOXIC_ENEMY":37,"CORROSIVE_SNIPER_ENEMY":38,"POISON_SNIPER_ENEMY":39,"MAGNETIC_REDUCTION_ENEMY":40,"MAGNETIC_NULLIFICATION_ENEMY":41,"POSITIVE_MAGNETIC_SNIPER_ENEMY":42,"NEGATIVE_MAGNETIC_SNIPER_ENEMY":43,"RESIDUE_ENEMY":44,"FIRE_TRAIL_ENEMY":45,"ICE_GHOST_ENEMY":46,"POISON_GHOST_ENEMY":47,"POSITIVE_MAGNETIC_GHOST_ENEMY":48,"NEGATIVE_MAGNETIC_GHOST_ENEMY":49,"WIND_GHOST_ENEMY":50,"LUNGING_ENEMY":51,"LAVA_ENEMY":52,"GRAVITY_GHOST_ENEMY":53,"REPELLING_GHOST_ENEMY":54,"STAR_ENEMY":55,"GRASS_ENEMY":56,"SEEDLING_ENEMY":57,"FLOWER_ENEMY":58,"DISABLING_GHOST_ENEMY":59,"GLOWY_ENEMY":60,"FIREFLY_ENEMY":61,"MIST_ENEMY":62,"PHANTOM_ENEMY":63,"CYBOT_ENEMY":64,"EABOT_ENEMY":65,"WABOT_ENEMY":66,"FIBOT_ENEMY":67,"AIBOT_ENEMY":68,"WIND_SNIPER_ENEMY":69,"SAND_ENEMY":70,"SANDROCK_ENEMY":71,"QUICKSAND_ENEMY":72,"CRUMBLING_ENEMY":73,"RADAR_ENEMY":74,"BARRIER_ENEMY":75,"SPEED_GHOST_ENEMY":76,"REGEN_GHOST_ENEMY":77,"CACTUS_ENEMY":78,"CYCLING_ENEMY":79,"ICBOT_ENEMY":80,"ELBOT_ENEMY":81,"PLBOT_ENEMY":82,"MEBOT_ENEMY":83,"LIBOT_ENEMY":84,"DABOT_ENEMY":85,"SPARKING_ENEMY":86,"THUNDERBOLT_ENEMY":87,"STATIC_ENEMY":88,"ELECTRICAL_ENEMY":89,"PREDICTION_SNIPER_ENEMY":90,"RING_SNIPER_ENEMY":91,"LEAD_SNIPER_ENEMY":92,"CHARGING_ENEMY":93,"REDUCING_ENEMY":94,"REVERSE_PROJECTILE":95,"MINIMIZE_PROJECTILE":96,"REANIMATE_PROJECTILE":97,"SNIPER_PROJECTILE":98,"VENGEANCE_PROJECTILE":99,"BLACK_HOLE_PROJECTILE":100,"ICE_SNIPER_PROJECTILE":101,"SNOWBALL_PROJECTILE":102,"SPEED_SNIPER_PROJECTILE":103,"REGEN_SNIPER_PROJECTILE":104,"RADIATING_BULLETS_PROJECTILE":105,"LATCH_PROJECTILE":106,"SPARK_PROJECTILE":107,"LIGHTNING_PROJECTILE":108,"SHADOW_PROJECTILE":109,"SWEET_TOOTH_ITEM":110,"OBSCURE_PROJECTILE":111,"LEAF_PROJECTILE":112,"FROST_GIANT_ICE_PROJECTILE":113,"ORBIT_PROJECTILE":114,"ENERGIZE_PROJECTILE":115,"CORROSIVE_SNIPER_PROJECTILE":116,"POISON_SNIPER_PROJECTILE":117,"POSITIVE_MAGNETIC_SNIPER_PROJECTILE":118,"NEGATIVE_MAGNETIC_SNIPER_PROJECTILE":119,"CRUMBLE_PROJECTILE":120,"RADIOACTIVE_GLOOP_PROJECTILE":121,"BLOOM_PROJECTILE":122,"POLLINATE_PROJECTILE":123,"SEEDLING_PROJECTILE":124,"FLOWER_PROJECTILE":125,"SOULSTONE_PROJECTILE":126,"GRAVE_PROJECTILE":127,"EABOT_PROJECTILE":128,"WABOT_PROJECTILE":129,"FIBOT_PROJECTILE":130,"AIBOT_PROJECTILE":131,"ELBOT_PROJECTILE":132,"LIBOT_PROJECTILE":133,"DABOT_PROJECTILE":134,"WIND_SNIPER_PROJECTILE":135,"RADAR_PROJECTILE":136,"ROBO_SCANNER_SNIPER_PROJECTILE":137,"ROBO_SCANNER_ICE_SNIPER_PROJECTILE":138,"ROBO_SCANNER_SPEED_SNIPER_PROJECTILE":139,"ROBO_SCANNER_REGEN_SNIPER_PROJECTILE":140,"ROBO_SCANNER_RADIATING_BULLETS_PROJECTILE":141,"ROBO_SCANNER_LEAF_PROJECTILE":142,"ROBO_SCANNER_CORROSIVE_SNIPER_PROJECTILE":143,"ROBO_SCANNER_POISON_SNIPER_PROJECTILE":144,"ROBO_SCANNER_POSITIVE_SNIPER_PROJECTILE":145,"ROBO_SCANNER_NEGATIVE_SNIPER_PROJECTILE":146,"ROBO_SCANNER_WIND_SNIPER_PROJECTILE":147,"ROBO_SCANNER_RADAR_PROJECTILE":148,"ROBO_SCANNER_PREDICTION_SNIPER_PROJECTILE":149,"ROBO_SCANNER_LEAD_SNIPER_PROJECTILE":150,"ECHELON_PROJECTILE":151,"IGNITION_SPARK_PROJECTILE":152,"INCINERATE_PROJECTILE":153,"SPARKING_ENEMY_PROJECTILE":154,"ELECTRICAL_ENEMY_PROJECTILE":155,"PREDICTION_SNIPER_PROJECTILE":156,"RING_SNIPER_PROJECTILE":157,"CYBOT_RING_PROJECTILE":158,"LEAD_SNIPER_PROJECTILE":159,"PETRIFY_PROJECTILE":160,"ICTOS_PROJECTILE":161,"WALL":162,"BARRIER_DOME":163,"STREAM_PATH":164,"FLASHLIGHT_ITEM":165,"TORCH":166,"LIGHT_REGION":167},"PLAYER":0,"PELLET":1,"WALL_ENEMY":2,"NORMAL_ENEMY":3,"HOMING_ENEMY":4,"DASHER_ENEMY":5,"SLOWING_ENEMY":6,"DRAINING_ENEMY":7,"REPELLING_ENEMY":8,"GRAVITY_ENEMY":9,"TURNING_ENEMY":10,"SIZING_ENEMY":11,"SNIPER_ENEMY":12,"FREEZING_ENEMY":13,"TELEPORTING_ENEMY":14,"WAVY_ENEMY":15,"ZIGZAG_ENEMY":16,"ZONING_ENEMY":17,"SPIRAL_ENEMY":18,"OSCILLATING_ENEMY":19,"SWITCH_ENEMY":20,"LIQUID_ENEMY":21,"ICICLE_ENEMY":22,"SLIPPERY_ENEMY":23,"ICE_SNIPER_ENEMY":24,"DISABLING_ENEMY":25,"EXPERIENCE_DRAIN_ENEMY":26,"ENLARGING_ENEMY":27,"SPEED_SNIPER_ENEMY":28,"REGEN_SNIPER_ENEMY":29,"RADIATING_BULLETS_ENEMY":30,"IMMUNE_ENEMY":31,"PUMPKIN_ENEMY":32,"TREE_ENEMY":33,"FROST_GIANT_ENEMY":34,"SNOWMAN_ENEMY":35,"CORROSIVE_ENEMY":36,"TOXIC_ENEMY":37,"CORROSIVE_SNIPER_ENEMY":38,"POISON_SNIPER_ENEMY":39,"MAGNETIC_REDUCTION_ENEMY":40,"MAGNETIC_NULLIFICATION_ENEMY":41,"POSITIVE_MAGNETIC_SNIPER_ENEMY":42,"NEGATIVE_MAGNETIC_SNIPER_ENEMY":43,"RESIDUE_ENEMY":44,"FIRE_TRAIL_ENEMY":45,"ICE_GHOST_ENEMY":46,"POISON_GHOST_ENEMY":47,"POSITIVE_MAGNETIC_GHOST_ENEMY":48,"NEGATIVE_MAGNETIC_GHOST_ENEMY":49,"WIND_GHOST_ENEMY":50,"LUNGING_ENEMY":51,"LAVA_ENEMY":52,"GRAVITY_GHOST_ENEMY":53,"REPELLING_GHOST_ENEMY":54,"STAR_ENEMY":55,"GRASS_ENEMY":56,"SEEDLING_ENEMY":57,"FLOWER_ENEMY":58,"DISABLING_GHOST_ENEMY":59,"GLOWY_ENEMY":60,"FIREFLY_ENEMY":61,"MIST_ENEMY":62,"PHANTOM_ENEMY":63,"CYBOT_ENEMY":64,"EABOT_ENEMY":65,"WABOT_ENEMY":66,"FIBOT_ENEMY":67,"AIBOT_ENEMY":68,"WIND_SNIPER_ENEMY":69,"SAND_ENEMY":70,"SANDROCK_ENEMY":71,"QUICKSAND_ENEMY":72,"CRUMBLING_ENEMY":73,"RADAR_ENEMY":74,"BARRIER_ENEMY":75,"SPEED_GHOST_ENEMY":76,"REGEN_GHOST_ENEMY":77,"CACTUS_ENEMY":78,"CYCLING_ENEMY":79,"ICBOT_ENEMY":80,"ELBOT_ENEMY":81,"PLBOT_ENEMY":82,"MEBOT_ENEMY":83,"LIBOT_ENEMY":84,"DABOT_ENEMY":85,"SPARKING_ENEMY":86,"THUNDERBOLT_ENEMY":87,"STATIC_ENEMY":88,"ELECTRICAL_ENEMY":89,"PREDICTION_SNIPER_ENEMY":90,"RING_SNIPER_ENEMY":91,"LEAD_SNIPER_ENEMY":92,"CHARGING_ENEMY":93,"REDUCING_ENEMY":94,"REVERSE_PROJECTILE":95,"MINIMIZE_PROJECTILE":96,"REANIMATE_PROJECTILE":97,"SNIPER_PROJECTILE":98,"VENGEANCE_PROJECTILE":99,"BLACK_HOLE_PROJECTILE":100,"ICE_SNIPER_PROJECTILE":101,"SNOWBALL_PROJECTILE":102,"SPEED_SNIPER_PROJECTILE":103,"REGEN_SNIPER_PROJECTILE":104,"RADIATING_BULLETS_PROJECTILE":105,"LATCH_PROJECTILE":106,"SPARK_PROJECTILE":107,"LIGHTNING_PROJECTILE":108,"SHADOW_PROJECTILE":109,"SWEET_TOOTH_ITEM":110,"OBSCURE_PROJECTILE":111,"LEAF_PROJECTILE":112,"FROST_GIANT_ICE_PROJECTILE":113,"ORBIT_PROJECTILE":114,"ENERGIZE_PROJECTILE":115,"CORROSIVE_SNIPER_PROJECTILE":116,"POISON_SNIPER_PROJECTILE":117,"POSITIVE_MAGNETIC_SNIPER_PROJECTILE":118,"NEGATIVE_MAGNETIC_SNIPER_PROJECTILE":119,"CRUMBLE_PROJECTILE":120,"RADIOACTIVE_GLOOP_PROJECTILE":121,"BLOOM_PROJECTILE":122,"POLLINATE_PROJECTILE":123,"SEEDLING_PROJECTILE":124,"FLOWER_PROJECTILE":125,"SOULSTONE_PROJECTILE":126,"GRAVE_PROJECTILE":127,"EABOT_PROJECTILE":128,"WABOT_PROJECTILE":129,"FIBOT_PROJECTILE":130,"AIBOT_PROJECTILE":131,"ELBOT_PROJECTILE":132,"LIBOT_PROJECTILE":133,"DABOT_PROJECTILE":134,"WIND_SNIPER_PROJECTILE":135,"RADAR_PROJECTILE":136,"ROBO_SCANNER_SNIPER_PROJECTILE":137,"ROBO_SCANNER_ICE_SNIPER_PROJECTILE":138,"ROBO_SCANNER_SPEED_SNIPER_PROJECTILE":139,"ROBO_SCANNER_REGEN_SNIPER_PROJECTILE":140,"ROBO_SCANNER_RADIATING_BULLETS_PROJECTILE":141,"ROBO_SCANNER_LEAF_PROJECTILE":142,"ROBO_SCANNER_CORROSIVE_SNIPER_PROJECTILE":143,"ROBO_SCANNER_POISON_SNIPER_PROJECTILE":144,"ROBO_SCANNER_POSITIVE_SNIPER_PROJECTILE":145,"ROBO_SCANNER_NEGATIVE_SNIPER_PROJECTILE":146,"ROBO_SCANNER_WIND_SNIPER_PROJECTILE":147,"ROBO_SCANNER_RADAR_PROJECTILE":148,"ROBO_SCANNER_PREDICTION_SNIPER_PROJECTILE":149,"ROBO_SCANNER_LEAD_SNIPER_PROJECTILE":150,"ECHELON_PROJECTILE":151,"IGNITION_SPARK_PROJECTILE":152,"INCINERATE_PROJECTILE":153,"SPARKING_ENEMY_PROJECTILE":154,"ELECTRICAL_ENEMY_PROJECTILE":155,"PREDICTION_SNIPER_PROJECTILE":156,"RING_SNIPER_PROJECTILE":157,"CYBOT_RING_PROJECTILE":158,"LEAD_SNIPER_PROJECTILE":159,"PETRIFY_PROJECTILE":160,"ICTOS_PROJECTILE":161,"WALL":162,"BARRIER_DOME":163,"STREAM_PATH":164,"FLASHLIGHT_ITEM":165,"TORCH":166,"LIGHT_REGION":167,"HeroType":{"MAGMAX":0,"RIME":1,"MORFE":2,"AURORA":3,"NECRO":4,"NEXUS":5,"BRUTE":6,"SHADE":7,"EUCLID":8,"CHRONO":9,"REAPER":10,"RAMESES":11,"JOLT":12,"GHOUL":13,"CENT":14,"JOTUUN":15,"CANDY":16,"MIRAGE":17,"BOLDROCK":18,"GLOB":19,"MAGNO":20,"IGNIS":21,"STELLA":22,"VIOLA":23,"MORTUUS":24,"CYBOT":25,"ECHELON":26,"DEMONA":27,"STHENO":28},"MAGMAX":0,"RIME":1,"MORFE":2,"AURORA":3,"NECRO":4,"NEXUS":5,"BRUTE":6,"SHADE":7,"EUCLID":8,"CHRONO":9,"REAPER":10,"RAMESES":11,"JOLT":12,"GHOUL":13,"CENT":14,"JOTUUN":15,"CANDY":16,"MIRAGE":17,"BOLDROCK":18,"GLOB":19,"MAGNO":20,"IGNIS":21,"STELLA":22,"VIOLA":23,"MORTUUS":24,"CYBOT":25,"ECHELON":26,"DEMONA":27,"STHENO":28,"AbilityType":{"FLOW":0,"HARDEN":1,"WARP":2,"PARALYSIS":3,"REVERSE":4,"MINIMIZE":5,"DISTORT":6,"ENERGIZE":7,"RESURRECTION":8,"REANIMATE":9,"BARRIER":10,"STREAM":11,"STOMP":12,"VIGOR":13,"NIGHT":14,"VENGEANCE":15,"ORBIT":16,"BLACK_HOLE":17,"BACKTRACK":18,"REWIND":19,"ATONEMENT":20,"DEPART":21,"LATCH":22,"BANDAGES":23,"SPARK":24,"LIGHTNING":25,"CHARGE":26,"SHRIEK":27,"SHADOW":28,"FUSION":29,"MORTAR":30,"SNOWBALL":31,"FLASHLIGHT":32,"DECAY":33,"SHATTER":34,"SUGAR_RUSH":35,"SWEET_TOOTH":36,"SHIFT":37,"OBSCURE":38,"MAGNETISM_DOWN":39,"MAGNETISM_UP":40,"CRUMBLE":41,"EARTHQUAKE":42,"RADIOACTIVE_GLOOP":43,"STICKY_COAT":44,"MAGNETIZE":45,"ATTRACT":46,"REPEL":47,"WILDFIRE":48,"EMBER":49,"WORMHOLE":50,"SUPERNOVA":51,"BLOOM":52,"POLLINATE":53,"SOULSTONE":54,"GRAVEKEEPER":55,"MYSTERY_KEYCARD":56,"NETWORK_CONTROL":57,"ROBO_SCANNER":58,"SLOWING":59,"DRAINING":60,"GRAVITY":61,"REPELLING":62,"FREEZING":63,"SLIPPERY":64,"DISABLING":65,"ENLARGING":66,"TOXIC":67,"MAGNETIC_REDUCTION":68,"MAGNETIC_NULLIFICATION":69,"LAVA":70,"QUICKSAND":71,"RADAR":72,"SHIELD":73,"SNIPER":74,"ICE_SNIPER":75,"SPEED_SNIPER":76,"REGEN_SNIPER":77,"RADIATING_BULLETS":78,"TREE":79,"CORROSIVE_SNIPER":80,"POISON_SNIPER":81,"POSITIVE_SNIPER":82,"NEGATIVE_SNIPER":83,"WIND_SNIPER":84,"PREDICTION_SNIPER":85,"LEAD_SNIPER":86,"REDUCING":87,"ECHO":88,"REDUCE":89,"IGNITION":90,"INCINERATE":91,"LANTERN":92,"PETRIFY":93,"ICTOS":94,"MOUSE_CONTROL":95},"FLOW":0,"HARDEN":1,"WARP":2,"PARALYSIS":3,"REVERSE":4,"MINIMIZE":5,"DISTORT":6,"ENERGIZE":7,"RESURRECTION":8,"REANIMATE":9,"BARRIER":10,"STREAM":11,"STOMP":12,"VIGOR":13,"NIGHT":14,"VENGEANCE":15,"ORBIT":16,"BLACK_HOLE":17,"BACKTRACK":18,"REWIND":19,"ATONEMENT":20,"DEPART":21,"LATCH":22,"BANDAGES":23,"SPARK":24,"LIGHTNING":25,"CHARGE":26,"SHRIEK":27,"SHADOW":28,"FUSION":29,"MORTAR":30,"SNOWBALL":31,"FLASHLIGHT":32,"DECAY":33,"SHATTER":34,"SUGAR_RUSH":35,"SWEET_TOOTH":36,"SHIFT":37,"OBSCURE":38,"MAGNETISM_DOWN":39,"MAGNETISM_UP":40,"CRUMBLE":41,"EARTHQUAKE":42,"RADIOACTIVE_GLOOP":43,"STICKY_COAT":44,"MAGNETIZE":45,"ATTRACT":46,"REPEL":47,"WILDFIRE":48,"EMBER":49,"WORMHOLE":50,"SUPERNOVA":51,"BLOOM":52,"POLLINATE":53,"SOULSTONE":54,"GRAVEKEEPER":55,"MYSTERY_KEYCARD":56,"NETWORK_CONTROL":57,"ROBO_SCANNER":58,"SLOWING":59,"DRAINING":60,"GRAVITY":61,"REPELLING":62,"FREEZING":63,"SLIPPERY":64,"DISABLING":65,"ENLARGING":66,"TOXIC":67,"MAGNETIC_REDUCTION":68,"MAGNETIC_NULLIFICATION":69,"LAVA":70,"QUICKSAND":71,"RADAR":72,"SHIELD":73,"SNIPER":74,"ICE_SNIPER":75,"SPEED_SNIPER":76,"REGEN_SNIPER":77,"RADIATING_BULLETS":78,"TREE":79,"CORROSIVE_SNIPER":80,"POISON_SNIPER":81,"POSITIVE_SNIPER":82,"NEGATIVE_SNIPER":83,"WIND_SNIPER":84,"PREDICTION_SNIPER":85,"LEAD_SNIPER":86,"REDUCING":87,"ECHO":88,"REDUCE":89,"IGNITION":90,"INCINERATE":91,"LANTERN":92,"PETRIFY":93,"ICTOS":94,"MOUSE_CONTROL":95,"EffectType":{"FLOW_EFFECT":0,"HARDEN_EFFECT":1,"PARALYSIS_EFFECT":2,"DISTORT_EFFECT":3,"ENERGIZE_EFFECT":4,"STOMP_EFFECT":5,"REWIND_EFFECT":6,"ATONEMENT_EFFECT":7,"ORBIT_EFFECT":8,"CHARGE_EFFECT":9,"SHRIEK_EFFECT":10,"DECAY_EFFECT":11,"SHATTER_EFFECT":12,"SUGAR_RUSH_EFFECT":13,"EARTHQUAKE_EFFECT":14,"STICKY_COAT_EFFECT":15,"MAGNETIZE_EFFECT":16,"WILDFIRE_EFFECT":17,"SUPERNOVA_EFFECT":18,"NETWORK_CONTROL_EFFECT":19,"GRAVEKEEPER_EFFECT":20,"SLOWING_EFFECT":21,"DRAINING_EFFECT":22,"GRAVITY_EFFECT":23,"REPELLING_EFFECT":24,"FREEZING_EFFECT":25,"SLIPPERY_EFFECT":26,"DISABLING_EFFECT":27,"ENLARGING_EFFECT":28,"TOXIC_EFFECT":29,"MAGNETIC_REDUCTION_EFFECT":30,"MAGNETIC_NULLIFICATION_EFFECT":31,"LAVA_EFFECT":32,"QUICKSAND_EFFECT":33,"RADAR_EFFECT":34,"SHIELD_EFFECT":35,"REDUCING_EFFECT":36,"REDUCE_EFFECT":37,"ICTOS_EFFECT":38,"ENEMY_SLOWING_EFFECT":39,"ENEMY_DRAINING_EFFECT":40,"ENEMY_GRAVITY_EFFECT":41,"ENEMY_REPELLING_EFFECT":42,"ENEMY_FREEZING_EFFECT":43,"ENEMY_SLIPPERY_EFFECT":44,"ENEMY_DISABLING_EFFECT":45,"ENEMY_EXPERIENCE_DRAIN_EFFECT":46,"ENEMY_ENLARGING_EFFECT":47,"ENEMY_TOXIC_EFFECT":48,"ENEMY_MAGNETIC_REDUCTION_EFFECT":49,"ENEMY_MAGNETIC_NULLIFICATION_EFFECT":50,"ENEMY_LAVA_EFFECT":51,"ENEMY_CYBOT_EFFECT":52,"ENEMY_CYBOT_SHIELD_EFFECT":53,"ENEMY_QUICKSAND_EFFECT":54,"ENEMY_RADAR_EFFECT":55,"ENEMY_BARRIER_EFFECT":56,"ENEMY_REDUCING_EFFECT":57,"FLASHLIGHT_EFFECT":58,"LANTERN_EFFECT":59},"FLOW_EFFECT":0,"HARDEN_EFFECT":1,"PARALYSIS_EFFECT":2,"DISTORT_EFFECT":3,"ENERGIZE_EFFECT":4,"STOMP_EFFECT":5,"REWIND_EFFECT":6,"ATONEMENT_EFFECT":7,"ORBIT_EFFECT":8,"CHARGE_EFFECT":9,"SHRIEK_EFFECT":10,"DECAY_EFFECT":11,"SHATTER_EFFECT":12,"SUGAR_RUSH_EFFECT":13,"EARTHQUAKE_EFFECT":14,"STICKY_COAT_EFFECT":15,"MAGNETIZE_EFFECT":16,"WILDFIRE_EFFECT":17,"SUPERNOVA_EFFECT":18,"NETWORK_CONTROL_EFFECT":19,"GRAVEKEEPER_EFFECT":20,"SLOWING_EFFECT":21,"DRAINING_EFFECT":22,"GRAVITY_EFFECT":23,"REPELLING_EFFECT":24,"FREEZING_EFFECT":25,"SLIPPERY_EFFECT":26,"DISABLING_EFFECT":27,"ENLARGING_EFFECT":28,"TOXIC_EFFECT":29,"MAGNETIC_REDUCTION_EFFECT":30,"MAGNETIC_NULLIFICATION_EFFECT":31,"LAVA_EFFECT":32,"QUICKSAND_EFFECT":33,"RADAR_EFFECT":34,"SHIELD_EFFECT":35,"REDUCING_EFFECT":36,"REDUCE_EFFECT":37,"ICTOS_EFFECT":38,"ENEMY_SLOWING_EFFECT":39,"ENEMY_DRAINING_EFFECT":40,"ENEMY_GRAVITY_EFFECT":41,"ENEMY_REPELLING_EFFECT":42,"ENEMY_FREEZING_EFFECT":43,"ENEMY_SLIPPERY_EFFECT":44,"ENEMY_DISABLING_EFFECT":45,"ENEMY_EXPERIENCE_DRAIN_EFFECT":46,"ENEMY_ENLARGING_EFFECT":47,"ENEMY_TOXIC_EFFECT":48,"ENEMY_MAGNETIC_REDUCTION_EFFECT":49,"ENEMY_MAGNETIC_NULLIFICATION_EFFECT":50,"ENEMY_LAVA_EFFECT":51,"ENEMY_CYBOT_EFFECT":52,"ENEMY_CYBOT_SHIELD_EFFECT":53,"ENEMY_QUICKSAND_EFFECT":54,"ENEMY_RADAR_EFFECT":55,"ENEMY_BARRIER_EFFECT":56,"ENEMY_REDUCING_EFFECT":57,"FLASHLIGHT_EFFECT":58,"LANTERN_EFFECT":59,"ZoneType":{"ACTIVE_ZONE":0,"SAFE_ZONE":1,"EXIT_ZONE":2,"TELEPORT_ZONE":3,"VICTORY_ZONE":4,"REMOVAL_ZONE":5,"DUMMY_ZONE":6},"ACTIVE_ZONE":0,"SAFE_ZONE":1,"EXIT_ZONE":2,"TELEPORT_ZONE":3,"VICTORY_ZONE":4,"REMOVAL_ZONE":5,"DUMMY_ZONE":6,"TextureType":{"NORMAL_TEXTURE":0,"LEAVES_TEXTURE":1,"WOODEN_TEXTURE":2,"BAGUETTE_TEXTURE":3,"ICE_TEXTURE":4},"NORMAL_TEXTURE":0,"LEAVES_TEXTURE":1,"WOODEN_TEXTURE":2,"BAGUETTE_TEXTURE":3,"ICE_TEXTURE":4,"Area":{},"Map":{},"Zone":{},"Entity":{},"Effect":{},"Ability":{},"Chat":{},"ChatMessageStyle":{"MESSAGE_STYLE_NORMAL":0,"MESSAGE_STYLE_JR_MOD":1,"MESSAGE_STYLE_MOD":2,"MESSAGE_STYLE_SR_MOD":3,"MESSAGE_STYLE_HEAD_MOD":4,"MESSAGE_STYLE_DEV":5,"MESSAGE_STYLE_YOUTUBER":6,"MESSAGE_STYLE_STREAMER":7,"MESSAGE_STYLE_SERVER_WARNING":8,"MESSAGE_STYLE_SERVER_INFO":9,"MESSAGE_STYLE_PRIVATE_MESSAGE":10},"MESSAGE_STYLE_NORMAL":0,"MESSAGE_STYLE_JR_MOD":1,"MESSAGE_STYLE_MOD":2,"MESSAGE_STYLE_SR_MOD":3,"MESSAGE_STYLE_HEAD_MOD":4,"MESSAGE_STYLE_DEV":5,"MESSAGE_STYLE_YOUTUBER":6,"MESSAGE_STYLE_STREAMER":7,"MESSAGE_STYLE_SERVER_WARNING":8,"MESSAGE_STYLE_SERVER_INFO":9,"MESSAGE_STYLE_PRIVATE_MESSAGE":10,"ChatMessage":{},"FramePayload":{}}
const $e728d5a493f33528$export$69dd9a529c505ede = e=>[{
	name: "magmax",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.MAGMAX_SELECTION,
	abilityOneName: "Flow",
	abilityTwoName: "Harden",
	unlockText: "",
	locked: !1,
	level: 0,
	backgroundColor: "#470000",
	hoverBackgroundColor: "#300000",
	shadowColor: "#ff5454",
	textColor: "#ffa8a8"
}, {
	name: "rime",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.RIME_SELECTION,
	abilityOneName: "Warp",
	abilityTwoName: "Paralysis",
	unlockText: "",
	locked: !1,
	level: 0,
	backgroundColor: "#000e47",
	hoverBackgroundColor: "#00092d",
	shadowColor: "#a8c2ff",
	textColor: "#b2c3ff"
}, {
	name: "morfe",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.MORFE_SELECTION,
	abilityOneName: "Reverse",
	abilityTwoName: "Minimize",
	unlockText: "Defeat Central Core Area 10",
	locked: e["Central Core"] < 10 && e["Central Core Hard"] < 10 && e["Catastrophic Core"] < 10,
	level: 0,
	backgroundColor: "#014700",
	hoverBackgroundColor: "#002d04",
	shadowColor: "#54ff84",
	textColor: "#91ff91"
}, {
	name: "aurora",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.AURORA_SELECTION,
	abilityOneName: "Distort",
	abilityTwoName: "Energize",
	unlockText: "Defeat Central Core Area 20",
	locked: e["Central Core"] < 20 && e["Central Core Hard"] < 20 && e["Catastrophic Core"] < 20,
	level: 0,
	backgroundColor: "#472900",
	hoverBackgroundColor: "#2d1a00",
	shadowColor: "#ff9d47",
	textColor: "#ffc666"
}, {
	name: "necro",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.NECRO_SELECTION,
	abilityOneName: "Resurrection",
	abilityTwoName: "Reanimate",
	unlockText: "Defeat Central Core Area 40",
	locked: e["Central Core"] < 40 && e["Central Core Hard"] < 40 && e["Catastrophic Core"] < 40,
	level: 0,
	backgroundColor: "#3d0047",
	hoverBackgroundColor: "#26002d",
	shadowColor: "#ec60ff",
	textColor: "#fb91ff"
}, {
	name: "brute",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.BRUTE_SELECTION,
	abilityOneName: "Stomp",
	abilityTwoName: "Vigor",
	unlockText: "Defeat Humongous Hollow Area 40",
	locked: e["Humongous Hollow"] < 40 && e["Humongous Hollow Hard"] < 40,
	level: 0,
	backgroundColor: "#4f2400",
	hoverBackgroundColor: "#2d1400",
	shadowColor: "#bc5800",
	textColor: "#e5be99"
}, {
	name: "nexus",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.NEXUS_SELECTION,
	abilityOneName: "Barrier",
	abilityTwoName: "Stream",
	unlockText: "Defeat Glacial Gorge Area 40",
	locked: e["Glacial Gorge"] < 40 && e["Glacial Gorge Hard"] < 40,
	level: 0,
	backgroundColor: "#00473e",
	hoverBackgroundColor: "#002d28",
	shadowColor: "#29FFC6",
	textColor: "#91fdff"
}, {
	name: "shade",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.SHADE_SELECTION,
	abilityOneName: "Night",
	abilityTwoName: "Vengeance",
	unlockText: "Defeat Vicious Valley Area 40",
	locked: e["Vicious Valley"] < 40 && e["Vicious Valley Hard"] < 40,
	level: 0,
	backgroundColor: "#3f3131",
	hoverBackgroundColor: "#2d2222",
	shadowColor: "#bc9393",
	textColor: "#e5bcbc"
}, {
	name: "euclid",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.EUCLID_SELECTION,
	abilityOneName: "Black Hole",
	abilityTwoName: "Orbit",
	unlockText: "Defeat Elite Expanse Area 40",
	locked: e["Elite Expanse"] < 40,
	level: 0,
	backgroundColor: "#2d2531",
	hoverBackgroundColor: "#201a24",
	shadowColor: "#ae89b9",
	textColor: "#dbadec"
}, {
	name: "chrono",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.CHRONO_SELECTION,
	abilityOneName: "Backtrack",
	abilityTwoName: "Rewind",
	unlockText: "Defeat Monumental Migration 120",
	locked: e["Monumental Migration"] < 120 && e["Monumental Migration Hard"] < 120,
	level: 0,
	backgroundColor: "#004c31",
	hoverBackgroundColor: "#03331b",
	shadowColor: "#00d885",
	textColor: "#91ffc9"
}, {
	name: "reaper",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.REAPER_SELECTION,
	abilityOneName: "Atonement",
	abilityTwoName: "Depart",
	unlockText: "Defeat Dangerous District 40",
	locked: e["Dangerous District"] < 40 && e["Dangerous District Hard"] < 40,
	level: 0,
	backgroundColor: "#212830",
	hoverBackgroundColor: "#2b3244",
	shadowColor: "#c6d5ef",
	textColor: "#91bbff"
}, {
	name: "rameses",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.RAMESES_SELECTION,
	abilityOneName: "Bandages",
	abilityTwoName: "Latch",
	unlockText: "Find Rameses' Chamber in Peculiar Pyramid",
	locked: e["Peculiar Pyramid"] < 31 && e["Peculiar Pyramid Hard"] < 31,
	level: 0,
	backgroundColor: "#5c6030",
	hoverBackgroundColor: "#40442b",
	shadowColor: "#c8cc5d",
	textColor: "#f0ff91"
}, {
	name: "jolt",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.JOLT_SELECTION,
	abilityOneName: "Spark",
	abilityTwoName: "Charge",
	unlockText: "Defeat Wacky Wonderland 40",
	locked: e["Wacky Wonderland"] < 40,
	level: 0,
	backgroundColor: "#969609",
	hoverBackgroundColor: "#5e5e11",
	shadowColor: "#ffff1c",
	textColor: "#ffff68"
}, {
	name: "ghoul",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.GHOUL_SELECTION,
	abilityOneName: "Shriek",
	abilityTwoName: "Shadow",
	unlockText: "Travel through the Occult",
	locked: e["Ominous Occult"] < 16 && e["Ominous Occult Hard"] < 16,
	level: 0,
	backgroundColor: "#63838e",
	hoverBackgroundColor: "#455b63",
	shadowColor: "#d5e9f2",
	textColor: "#c5dbe5"
}, {
	name: "cent",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.CENT_SELECTION,
	abilityOneName: "Fusion",
	abilityTwoName: "Mortar",
	unlockText: "Defeat Quiet Quarry 40",
	locked: e["Quiet Quarry"] < 40 && e["Quiet Quarry Hard"] < 40,
	level: 0,
	backgroundColor: "#969696",
	hoverBackgroundColor: "#595959",
	shadowColor: "#e8e8e8",
	textColor: "#dddddd"
}, {
	name: "jötunn",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.JOTUUN_SELECTION,
	abilityOneName: "Decay",
	abilityTwoName: "Shatter",
	unlockText: "Defeat Frozen Fjord 40",
	locked: e["Frozen Fjord"] < 40 && e["Frozen Fjord Hard"] < 40,
	level: 0,
	backgroundColor: "#173b47",
	hoverBackgroundColor: "#043147",
	shadowColor: "#4fcbff",
	textColor: "#a8cfff"
}, {
	name: "candy",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.CANDY_SELECTION,
	abilityOneName: "Sugar Rush",
	abilityTwoName: "Sweet Tooth",
	unlockText: "Defeat Wacky Wonderland 80",
	locked: e["Wacky Wonderland"] < 80,
	level: 0,
	backgroundColor: "#633149",
	hoverBackgroundColor: "#381b29",
	shadowColor: "#ffb2d7",
	textColor: "#ffcce4"
}, {
	name: "mirage",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.MIRAGE_SELECTION,
	abilityOneName: "Shift",
	abilityTwoName: "Obscure",
	unlockText: "Defeat Restless Ridge 40",
	locked: e["Restless Ridge"] < 43 && e["Restless Ridge Hard"] < 48,
	level: 0,
	backgroundColor: "#000963",
	hoverBackgroundColor: "#00033d",
	shadowColor: "#4e59db",
	textColor: "#6e77e5"
}, {
	name: "boldrock",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.BOLDROCK_SELECTION,
	abilityOneName: "Crumble",
	abilityTwoName: "Earthquake",
	unlockText: "Defeat Shifting Sands 40 through the Peculiar Pyramid",
	locked: e["Shifting Sands"] < 47,
	level: 0,
	backgroundColor: "#40341b",
	hoverBackgroundColor: "#2e2513",
	shadowColor: "#baa577",
	textColor: "#b8a784"
}, {
	name: "glob",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.GLOB_SELECTION,
	abilityOneName: "Radioactive Gloop",
	abilityTwoName: "Sticky Coat",
	unlockText: "Defeat Toxic Territory 20",
	locked: e["Toxic Territory"] < 20 && e["Toxic Territory Hard"] < 20,
	level: 0,
	backgroundColor: "#144700",
	hoverBackgroundColor: "#143000",
	shadowColor: "#42b033",
	textColor: "#70ad68"
}, {
	name: "magno",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.MAGNO_SELECTION,
	abilityOneName: "Magnetize",
	abilityTwoName: "Attract",
	unlockText: "Defeat Magnetic Monopole 28",
	locked: e["Magnetic Monopole"] < 36 && e["Magnetic Monopole Hard"] < 36,
	level: 0,
	backgroundColor: "#77052f",
	hoverBackgroundColor: "#570322",
	shadowColor: "#ff4ba8",
	textColor: "#ff5bb0"
}, {
	name: "ignis",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.IGNIS_SELECTION,
	abilityOneName: "Wildfire",
	abilityTwoName: "Ember",
	unlockText: "Defeat Burning Bunker Level 1",
	locked: e["Burning Bunker"] < 36 && e["Burning Bunker Hard"] < 36,
	level: 0,
	backgroundColor: "#41190a",
	hoverBackgroundColor: "#2e1207",
	shadowColor: "#dc754d",
	textColor: "#da825f"
}, {
	name: "stella",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.STELLA_SELECTION,
	abilityOneName: "Wormhole",
	abilityTwoName: "Supernova",
	unlockText: "Defeat Elite Expanse Hard 40",
	locked: e["Elite Expanse Hard"] < 40,
	level: 0,
	backgroundColor: "#b8b467",
	hoverBackgroundColor: "#7a7852",
	shadowColor: "#fffcba",
	textColor: "#fffdd1"
}, {
	name: "viola",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.VIOLA_SELECTION,
	abilityOneName: "Bloom",
	abilityTwoName: "Pollinate",
	unlockText: "Defeat Grand Garden 28",
	locked: e["Grand Garden"] < 28 && e["Grand Garden Hard"] < 28,
	level: 0,
	backgroundColor: "#594104",
	hoverBackgroundColor: "#473404",
	shadowColor: "#f0ba30",
	textColor: "#edbe45"
}, {
	name: "mortuus",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.MORTUUS_SELECTION,
	abilityOneName: "Soulstone",
	abilityTwoName: "Gravekeeper",
	unlockText: "Found in the dungeon of the Mysterious Mansion through the Haunted Halls",
	locked: e["Mysterious Mansion"] < 62,
	level: 0,
	backgroundColor: "#294008",
	hoverBackgroundColor: "#1e2e06",
	shadowColor: "#8dc934",
	textColor: "#8fbf47"
}, {
	name: "echelon",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.ECHELON_SELECTION,
	abilityOneName: "Echo",
	abilityTwoName: "Reduce",
	unlockText: "Defeat Endless Echo 120",
	locked: e["Endless Echo"] < 120 && e["Endless Echo Hard"] < 120,
	level: 0,
	backgroundColor: "#095670",
	hoverBackgroundColor: "#054459",
	shadowColor: "#1ea8d6",
	textColor: "#7ed5f2"
}, {
	name: "demona",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.DEMONA_SELECTION,
	abilityOneName: "Ignition",
	abilityTwoName: "Incinerate",
	unlockText: "Defeat all 9 circles in Infinite Inferno",
	locked: e["Infinite Inferno"] < 38,
	level: 0,
	backgroundColor: "#531f6e",
	hoverBackgroundColor: "#38154a",
	shadowColor: "#9759b5",
	textColor: "#9759b5"
}, {
	name: "stheno",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.STHENO_SELECTION,
	abilityOneName: "Petrify",
	abilityTwoName: "Ictos",
	unlockText: "Travel to the end of the Coupled Corridors through the Mysterious Mansion",
	locked: e["Coupled Corridors"] < 64,
	level: 0,
	backgroundColor: "#46375c",
	hoverBackgroundColor: "#372b4a",
	shadowColor: "#cfa6ec",
	textColor: "#cfa6ec"
}, {
	name: e["Cyber Castle"] < 15 && e["Cyber Castle Hard"] < 22 ? "?" : "cybot",
	enum: $d102378f4de5e1dc$export$2e2bcd8739ae039.CYBOT_SELECTION,
	abilityOneName: "Network Control",
	abilityTwoName: "Robo Scanner",
	unlockText: "Defeat ????? in Cyber Castle",
	locked: e["Cyber Castle"] < 15 && e["Cyber Castle Hard"] < 22,
	level: 0,
	backgroundColor: "#2f1d57",
	hoverBackgroundColor: "#231540",
	shadowColor: "#986ef0",
	textColor: "#a785ed"
}];
function $01bb7fd9b3660a1e$export$71c647defb4fbd5a(e) {
  return EvadesConfig.heroes[e];
}
function $01bb7fd9b3660a1e$export$51b0c51f5b2e9c35(e) {
	for (let t = 0; t < EvadesConfig.abilities.length; t++) {
		const a = EvadesConfig.abilities[t];
		if (a.name === e)
			return a
	}
	return null
}
function $01bb7fd9b3660a1e$export$96671014a1dabc4c(e) {
	for (let t = 0; t < EvadesConfig.effects.length; t++) {
		const a = EvadesConfig.effects[t];
		if (a.type === e)
			return a
	}
	return null
}
function $f36928166e04fda7$var$font(e) {
	return `${e*camScale}px Tah`
}
function $f36928166e04fda7$var$line(e, a, t, r, c) {
	e.beginPath(),
	e.moveTo(a, t),
	e.lineTo(r, c),
	e.closePath(),
	e.stroke()
}
function $f36928166e04fda7$var$roundedRect(e, a, t, r, c, o=5, n=!1, $=!0) {
	if ("number" == typeof o)
		o = {
			tl: o,
			tr: o,
			br: o,
			bl: o
		};
	else {
		const e = {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0
		};
		for (const a in e)
			Object.prototype.hasOwnProperty.call(e, a) && (o[a] = o[a] || e[a])
	}
	e.beginPath(),
	e.moveTo(a + o.tl, t),
	e.lineTo(a + r - o.tr, t),
	e.quadraticCurveTo(a + r, t, a + r, t + o.tr),
	e.lineTo(a + r, t + c - o.br),
	e.quadraticCurveTo(a + r, t + c, a + r - o.br, t + c),
	e.lineTo(a + o.bl, t + c),
	e.quadraticCurveTo(a, t + c, a, t + c - o.bl),
	e.lineTo(a, t + o.tl),
	e.quadraticCurveTo(a, t, a + o.tl, t),
	e.closePath(),
	n && e.fill(),
	$ && e.stroke()
}
function $f36928166e04fda7$var$rect(e, a, t, r, c, o=!1, n=!0) {
	e.beginPath(),
	e.rect(a, t, r, c),
	e.closePath(),
	o && e.fill(),
	n && e.stroke()
}
function $f36928166e04fda7$var$arc(e, a, t, r, c=!1, o=!0) {
	e.beginPath(),
	e.arc(a, t, r, 0, 2 * Math.PI, !1),
	c && e.fill(),
	o && e.stroke(),
	e.closePath()
}
function $f36928166e04fda7$var$sectorInRect(e, a, t, r, c, o) {
	o < 0 && (o = 360 + o);
	const n = 270 * Math.PI / 180;
	o *= Math.PI / 180;
	const $ = a + r / 2
	  , d = t + c / 2
	  , i = {
		x: a,
		y: t
	}
	  , s = {
		x: a + r,
		y: t
	}
	  , f = {
		x: a + r,
		y: t + c
	}
	  , l = {
		x: a,
		y: t + c
	}
	  , p = Math.sqrt(2) * r / 2
	  , b = Math.sqrt(2) * c / 2
	  , u = $ + p * Math.cos(n)
	  , h = $ + p * Math.cos(o)
	  , x = d + b * Math.sin(o)
	  , v = {
		x: u,
		y: t
	}
	  , m = {
		x: h,
		y: t
	}
	  , g = {
		x: a + r,
		y: x
	}
	  , y = {
		x: h,
		y: t + c
	}
	  , w = {
		x: a,
		y: x
	};
	let C;
	const M = Math.PI / 180 * 225
	  , S = Math.PI / 180 * 315
	  , H = Math.PI / 180 * 45
	  , E = Math.PI / 180 * 135;
	C = o > S || o < H ? [v, i, l, f, s, g] : o > H && o <= E ? [v, i, l, y] : o > E && o <= M ? [v, i, w] : v.x < m.x ? [v, i, l, f, s, m] : [m, v],
	e.beginPath(),
	e.moveTo($, d);
	for (let a = 0; a < C.length; a++) {
		const t = C[a];
		e.lineTo(t.x, t.y)
	}
	e.lineTo($, d),
	e.closePath(),
	e.fill()
}
function $f36928166e04fda7$var$multilineText(e, a, t, r, c) {
	void 0 === c && (c = {
		stroke: !1,
		fill: !0,
		lineHeight: 20*camScale,
		fromTop: !0
	});
	const o = a.split("\n")
	  , n = (a,t,r)=>{
		c.stroke && e.strokeText(a, t, r, c.maxWidth),
		c.fill && e.fillText(a, t, r, c.maxWidth)
	}
	;
	if (c.fromTop)
		for (let e = 0; e < o.length; e++)
			n(o[e], t, r),
			r += c.lineHeight;
	else
		for (let e = o.length - 1; e >= 0; e--)
			n(o[e], t, r),
			r -= c.lineHeight
}
function $f36928166e04fda7$var$arrow(e, a, t, r, c, o=2*camScale, n=15*camScale, $="#cc000088") {
	const d = Math.atan2(c - t, r - a);
	e.beginPath(),
	e.moveTo(a, t),
	e.lineTo(r, c),
	e.strokeStyle = $,
	e.lineWidth = n,
	e.moveTo(r, c),
	e.lineTo(r - o * Math.cos(d - Math.PI / 7), c - o * Math.sin(d - Math.PI / 7)),
	e.lineTo(r - o * Math.cos(d + Math.PI / 7), c - o * Math.sin(d + Math.PI / 7)),
	e.lineTo(r, c),
	e.lineTo(r - o * Math.cos(d - Math.PI / 7), c - o * Math.sin(d - Math.PI / 7)),
	e.strokeStyle = $,
	e.lineWidth = n,
	e.stroke(),
	e.fillStyle = $,
	e.fill()
}
function $f36928166e04fda7$export$ba06b54a1d867509(e, a) {
	const t = document.createElement("canvas");
	return t.width = e,
	t.height = a,
	t
}
const $f36928166e04fda7$export$2e2bcd8739ae039 = {
	font: $f36928166e04fda7$var$font,
	line: $f36928166e04fda7$var$line,
	roundedRect: $f36928166e04fda7$var$roundedRect,
	rect: $f36928166e04fda7$var$rect,
	arc: $f36928166e04fda7$var$arc,
	sectorInRect: $f36928166e04fda7$var$sectorInRect,
	multilineText: $f36928166e04fda7$var$multilineText,
	arrow: $f36928166e04fda7$var$arrow
}
//END OF DRAWERS
class FieldBacked {
	stateFields() {
		return []
	}
	resetData() {
		const e = this.stateFields();
		for (let a = 0; a < e.length; a++) {
			const t = e[a];
			"object" == typeof this[t] && null !== this[t] && this[t]instanceof FieldBacked ? this[t].resetData() : this[t] = void 0
		}
		this.afterStateUpdate()
	}
	unionState(e, a=null, t=!0) {
		if (void 0 === e)
			return;
		null === a && (a = this),
		t && (this.beforeStateUpdate(),
		this.receivingStateUpdate(e));
		const r = this.stateFields()
		  , c = {};
		for (let o = 0; o < r.length; o++) {
			const n = r[o];
			void 0 !== e[n] ? (c[n] = e[n],
			t && ("object" == typeof this[n] && null !== this[n] && this[n]instanceof FieldBacked ? this[n].unionState(e[n]) : this[n] = e[n])) : c[n] = a[n]
		}
		return t && (this.noState = !1,
		this.afterStateUpdate()),
		c
	}
	receivingStateUpdate() {}
	beforeStateUpdate() {}
	afterStateUpdate() {}
	constructor() {
		this.noState = !0
	}
}
class EvadesEntity extends FieldBacked {
	render() {
		throw new Error("Not implemented")
	}
	addEffectPath(e, a, t) {
		const r = t.internal ? this.radius : t.radius
		  , c = this.x + a.x
		  , o = this.y + a.y;
		e.arc(c, o, r, 0, 2 * Math.PI, !1)
	}
	getEffectConfigs() {
		if (void 0 === this.effects)
			return [];
		const e = [];
		try{
			for (const a of this.effects) {
				if (a.removed || void 0 === a.effectType)
					continue;
				const t = $01bb7fd9b3660a1e$export$96671014a1dabc4c(a.effectType);
				if (null === t)
					return console.debug("Could not read effect type " + a.effectType),
					null;
				t.radius = a.radius,
				t.inputAngle = a.inputAngle,
				e.push(t)
			}
		}catch(sh){
			for (const a of this.effects) {
				if (a.removed || void 0 === a.effectType)
					continue;
				const t = $01bb7fd9b3660a1e$export$96671014a1dabc4c(a.effectType);
				if (null === t)
					return console.debug("Could not read effect type " + a.effectType),
					null;
				t.radius = a.radius,
				t.inputAngle = a.inputAngle,
				e.push(t)
			}
		}
		return e
	}
	hexToRgb(e) {
		const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
		return a ? {
			r: parseInt(a[1], 16),
			g: parseInt(a[2], 16),
			b: parseInt(a[3], 16)
		} : null
	}
	constructor() {
		super(),
		this.entityType = 0,
		this.showOnMap = !1,
		this.lightRadius = null,
		this.lightRectangle = null,
		this.relativeZIndex = 0,
		this.absoluteZIndex = null
	}
}
class ExperienceBar extends EvadesEntity {
	stateFields() {
		return ["heroType", "level", "experience", "previousLevelExperience", "nextLevelExperience", "abilityThree", "abilityTwo", "abilityOne"]
	}
	afterStateUpdate() {
		if (void 0 === this.heroType)
			return void (this.ready = !1);
		const e = $01bb7fd9b3660a1e$export$71c647defb4fbd5a(this.heroType);
		this.progressColor = e.foregroundColor,
		this.backgroundColor = e.backgroundColor,
		this.ready = !0
	}
	toggleVisibility() {
		this.hidden = !this.hidden
	}
	render(e, a) {
		if (!this.ready || this.hidden)
			return;
		const t = a.viewportSize;
		e.strokeStyle = "black";
		const r = this.hexToRgb(this.backgroundColor);
		let c;
		e.fillStyle = `rgba(${r.r}, ${r.g}, ${r.b}, 0.4)`;
		var width=this.width+82*(void 0!==this.abilityOne)+82*(void 0!==this.abilityTwo)+82*(void 0!==this.abilityThree);
		width=Math.max(width,this.minWidth);
		c = width,
		$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, t.width / 2 - this.minWidth / 2*camScale, t.height/2 + 360*camScale - (this.height + this.expBarOffsetY)*camScale, c*camScale, this.height*camScale, !0, !1);
		const o = (this.experience - this.previousLevelExperience) / (this.nextLevelExperience - this.previousLevelExperience);
		if (o > 0) {
			e.fillStyle = this.progressColor;
			let a = c * o;
			$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, t.width / 2 - this.minWidth / 2*camScale, t.height/2 + 360*camScale - (this.height + this.expBarOffsetY)*camScale, a*camScale, this.height*camScale, !0, !1)
		}
	}
	constructor() {
		super(),
		this.minWidth = 516,
		this.width = 350,
		this.height = 15,
		this.expBarOffsetY = 85,
		this.ready = !1,
		this.hidden = !1
	}
}
class TitleText extends EvadesEntity {
	stateFields() {
		return ["heroType", "areaName", "areaNumber", "regionName", "victoryArea", "bossArea", "survivalTime"]
	}
	afterStateUpdate() {
		void 0 !== this.heroType ? (this.titleColor = "#f4faff",
		"Central Core" === this.regionName || "Central Core Hard" === this.regionName || "Catastrophic Core" === this.regionName ? this.titleStrokeColor = "#425a6d" : "Vicious Valley" === this.regionName ? this.titleStrokeColor = "#4d6b40" : "Vicious Valley Hard" === this.regionName ? this.titleStrokeColor = "#37512c" : "Elite Expanse" === this.regionName || "Elite Expanse Hard" === this.regionName ? this.titleStrokeColor = "#2a3b4f" : "Wacky Wonderland" === this.regionName || "Wacky Wonderland Hard" === this.regionName ? this.titleStrokeColor = "#870080" : "Switch Station" === this.regionName ? this.titleStrokeColor = "#425a6d" : "Glacial Gorge" === this.regionName ? this.titleStrokeColor = "#005668" : "Glacial Gorge Hard" === this.regionName ? this.titleStrokeColor = "#003c54" : "Dangerous District" === this.regionName ? this.titleStrokeColor = "#680000" : "Dangerous District Hard" === this.regionName ? this.titleStrokeColor = "#400303" : "Peculiar Pyramid" === this.regionName || "Peculiar Pyramid Hard" === this.regionName ? this.titleStrokeColor = "#666600" : "Monumental Migration" === this.regionName ? this.titleStrokeColor = "#470066" : "Monumental Migration Hard" === this.regionName ? this.titleStrokeColor = "#29003b" : "Humongous Hollow" === this.regionName ? this.titleStrokeColor = "#663900" : "Humongous Hollow Hard" === this.regionName ? this.titleStrokeColor = "#522e00" : "Transforming Turbidity" === this.regionName || "Quiet Quarry" === this.regionName || "Quiet Quarry Hard" === this.regionName ? this.titleStrokeColor = "#425a6d" : "Haunted Halls" === this.regionName ? this.titleStrokeColor = "#664b00" : "Stellar Square" === this.regionName ? this.titleStrokeColor = "#969275" : "Frozen Fjord" === this.regionName || "Frozen Fjord Hard" === this.regionName ? this.titleStrokeColor = "#27494f" : "Ominous Occult" === this.regionName || "Ominous Occult Hard" === this.regionName ? this.titleStrokeColor = "#63838e" : "Restless Ridge" === this.regionName || "Restless Ridge Hard" === this.regionName ? this.titleStrokeColor = "#a88b64" : "Toxic Territory" === this.regionName || "Toxic Territory Hard" === this.regionName ? this.titleStrokeColor = "#5c5c5c" : "Magnetic Monopole" === this.regionName || "Magnetic Monopole Hard" === this.regionName ? this.titleStrokeColor = "#bf00ff" : "Assorted Alcove" === this.regionName || "Assorted Alcove Hard" === this.regionName ? this.titleStrokeColor = "#694605" : "Burning Bunker" === this.regionName || "Burning Bunker Hard" === this.regionName ? this.titleStrokeColor = "#cc0000" : "Grand Garden" === this.regionName || "Grand Garden Hard" === this.regionName ? this.titleStrokeColor = "#6a9c49" : "Endless Echo" === this.regionName || "Endless Echo Hard" === this.regionName ? this.titleStrokeColor = "#4168c4" : "Mysterious Mansion" === this.regionName ? this.titleStrokeColor = "#9c0ec7" : "Coupled Corridors" === this.regionName ? this.titleStrokeColor = "#bbaa55" : "Cyber Castle" === this.regionName ? this.titleStrokeColor = "#21bad9" : "Cyber Castle Hard" === this.regionName ? this.titleStrokeColor = "#1594ad" : "Research Lab" === this.regionName ? this.titleStrokeColor = "#21bad9" : "Shifting Sands" === this.regionName ? this.titleStrokeColor = "#c88241" : "Infinite Inferno" === this.regionName ? this.titleStrokeColor = "#9b0606" : "Dusty Depths" === this.regionName ? this.titleStrokeColor = "#825b37" : "Withering Wasteland" === this.regionName ? this.titleStrokeColor = "#c45945" : this.titleStrokeColor = "#425a6d",
		this.ready = !0) : this.ready = !1
	}
	render(e, t) {
		if (!this.ready)
			return;
		const as = t.viewportSize;
		let r = `Area ${this.areaName}`;
		isNaN(parseInt(this.areaName)) && (r = this.areaName);
		let c = `${this.regionName}: ${r}`;
		map.areas.length==1 && (c = this.regionName),
		this.regionName.length || (c = r);
		const o = this.areaNumber;
		this.victoryArea ? c = `${this.regionName}: Victory!` : this.bossArea && (c = `${this.regionName}: BOSS AREA ${this.areaName}`);
		this.bossArea=this.victoryArea=false;
		const n = as.width / 2;
		if (e.font = `bold ${$f36928166e04fda7$export$2e2bcd8739ae039.font(35)}`,
		e.textAlign = "center",
		e.lineWidth = 6*camScale,
		e.strokeStyle = this.titleStrokeColor,
		e.fillStyle = this.titleColor,
		e.strokeText(c, n, as.height/2-320*camScale),
		e.fillText(c, n, as.height/2-320*camScale),
		settings.displayTimer) {
			const t = Math.floor(this.survivalTime);
			e.font = "bold " + $f36928166e04fda7$export$2e2bcd8739ae039.font(30);
			const a = `${t / 60 >> 0}m ${t % 60 < 10 ? "0" + t % 60 : t % 60}s`;
			e.strokeText(a, n, as.height/2-280*camScale),
			e.fillText(a, n, as.height/2-280*camScale)
		}
		e.strokeStyle = "#000000",
		e.lineWidth = 1
	}
	constructor() {
		super(),
		this.ready = !1
	}
}
class DirectionalIndicatorHud extends EvadesEntity {
	resetData() {
		this.directionalIndicators = {},
		super.resetData()
	}
	update(e, a, t) {
		this.entities = e,
		this.self = a,
		this.area = t;
		const r = new Set;
		for (const e in this.directionalIndicators)
			Object.prototype.hasOwnProperty.call(this.directionalIndicators, e) && r.add(e);
		for (const e in this.entities) {
			if (e === a.id.toString())
				continue;
			r.delete(e);
			const t = this.entities[e];
			if (e in this.directionalIndicators) {
				const a = this.directionalIndicators[e];
				a.update(t),
				a.isDone() && delete this.directionalIndicators[e]
			} else {
				let a = null;
				-1 !== t.deathTimer && t.rescueable && (a = new $7bda4ebfc6020375$var$DeathTimerDirectionalIndicator(t)),
				null !== a && (this.directionalIndicators[e] = a)
			}
		}
		r.forEach((e=>{
			delete this.directionalIndicators[e]
		}
		))
	}
	render(e, a) {
		for (const t in this.directionalIndicators) {
			if (!Object.prototype.hasOwnProperty.call(this.directionalIndicators, t))
				continue;
			this.directionalIndicators[t].render(e, a, this.self, this.area)
		}
	}
	constructor() {
		super(),
		this.directionalIndicators = {}
	}
}
class AreaInfo extends EvadesEntity {
	update(e, a) {
		this.self = e,
		this.area = a
	}
	toggleVisibility() {
		this.hidden = !this.hidden
	}
	render(e, a) {
		if (this.hidden)
			return;
		const t = a.viewportSize;var areaname=String(map.areas[current_Area].name||(current_Area+1));
		e.strokeStyle = "black";
		var left=t.width/2-640*camScale;
		const r = t.height / 2 - this.height/2*camScale
		  , c = left+14*camScale
		  , o = r + 12*camScale
		  , n = 14,boundary=getAreaBoundary(this.area);
		e.fillStyle = "rgba(0, 0, 0, 0.7)",
		$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, left+10*camScale, r, this.width*camScale, this.height*camScale, !0, !1),
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(n),
		e.textAlign = "left",
		e.fillStyle = "#FFFFFF",
		e.fillText(`${map.name} ${this.self.entity.area}`, c, o),
		e.fillText(`Area name: ${areaname}`, c, o + 14*camScale),
		e.fillText(`Area position: ${this.area.x}, ${this.area.y}`, c, o + 28*camScale),
		e.fillText(`Area size: ${boundary.width} x ${boundary.height}`, c, o + 42*camScale),
		e.fillText(`Zone count: ${this.area.zones.length}`, c, o + 56*camScale),
		e.fillText(`Self position: ${Math.round(this.self.entity.x+this.area.x)}, ${Math.round(this.self.entity.y+this.area.y)}`, c, o + 84*camScale)
	}
	constructor() {
		super(),
		this.width = 200,
		this.height = 200,
		this.hidden = !0
	}
}
class Ability extends FieldBacked {
	stateFields() {
		return ["abilityType", "name", "description", "energyCost", "totalCooldown", "cooldown", "locked", "level", "maxLevel", "disabled", "continuous", "energyDescription"]
	}
	afterStateUpdate() {
		if (void 0 === this.abilityType)
			return;
		setDefaultsFor(this, this.stateFields(), "ability");
		const e = $01bb7fd9b3660a1e$export$a1dfcc7b3a7a0b52(this.abilityType);
		setDefaultsFrom(this, this.stateFields(), e);
		const t = `abilities/${this.name.toLowerCase().replace(" ", "_")}`;
		void 0 !== this.image && null !== this.imageName && this.imageName === t || (this.image = $31e8cfefa331e399$export$93e5c64e4cc246c8(t),
		this.image.blank && (this.image = $31e8cfefa331e399$export$93e5c64e4cc246c8("abilities/default")),
		this.imageName = t)
	}
	constructor() {
		super(),
		this.imageName = null;
		
	}
}
const KeyMap = {
	Backspace: 8,
	Tab: 9,
	Enter: 13,
	Shift: 16,
	Ctrl: 17,
	Alt: 18,
	PauseBreak: 19,
	CapsLock: 20,
	Escape: 27,
	Space: 32,
	PageUp: 33,
	PageDown: 34,
	End: 35,
	Home: 36,
	LeftArrow: 37,
	UpArrow: 38,
	RightArrow: 39,
	DownArrow: 40,
	Insert: 45,
	Delete: 46,
	Num0: 48,
	Num1: 49,
	Num2: 50,
	Num3: 51,
	Num4: 52,
	Num5: 53,
	Num6: 54,
	Num7: 55,
	Num8: 56,
	Num9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	LeftWindowKey: 91,
	RightWindowKey: 92,
	SelectKey: 93,
	Numpad0: 96,
	Numpad1: 97,
	Numpad2: 98,
	Numpad3: 99,
	Numpad4: 100,
	Numpad5: 101,
	Numpad6: 102,
	Numpad7: 103,
	Numpad8: 104,
	Numpad9: 105,
	Multiply: 106,
	Add: 107,
	Subtract: 109,
	DecimalPoint: 110,
	Divide: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NumLock: 144,
	ScrollLock: 145,
	SemiColon: 186,
	EqualSign: 187,
	Comma: 188,
	Dash: 189,
	Period: 190,
	ForwardSlash: 191,
	BackTick: 192,
	OpenBracket: 219,
	BackSlash: 220,
	CloseBracket: 221,
	SingleQuote: 222
}
  , $4cb5e0b12995588c$var$keys = {"UNDEFINED_KEYTYPE":0,"W_KEY":1,"A_KEY":2,"S_KEY":3,"D_KEY":4,"UP_KEY":5,"LEFT_KEY":6,"DOWN_KEY":7,"RIGHT_KEY":8,"FOCUS_KEY":9,"ABILITY_ONE_KEY":10,"ABILITY_TWO_KEY":11,"ABILITY_THREE_KEY":12,"ACTION_KEY":13,"UPGRADE_SPEED_KEY":14,"UPGRADE_MAX_ENERGY_KEY":15,"UPGRADE_ENERGY_REGEN_KEY":16,"UPGRADE_ABILITY_ONE_KEY":17,"UPGRADE_ABILITY_TWO_KEY":18,"UPGRADE_ABILITY_THREE_KEY":19}
  , GameKeyMap = {};
GameKeyMap[KeyMap.W] = $4cb5e0b12995588c$var$keys.W_KEY,
GameKeyMap[KeyMap.A] = $4cb5e0b12995588c$var$keys.A_KEY,
GameKeyMap[KeyMap.S] = $4cb5e0b12995588c$var$keys.S_KEY,
GameKeyMap[KeyMap.D] = $4cb5e0b12995588c$var$keys.D_KEY,
GameKeyMap[KeyMap.UpArrow] = $4cb5e0b12995588c$var$keys.UP_KEY,
GameKeyMap[KeyMap.LeftArrow] = $4cb5e0b12995588c$var$keys.LEFT_KEY,
GameKeyMap[KeyMap.DownArrow] = $4cb5e0b12995588c$var$keys.DOWN_KEY,
GameKeyMap[KeyMap.RightArrow] = $4cb5e0b12995588c$var$keys.RIGHT_KEY,
GameKeyMap[KeyMap.Shift] = $4cb5e0b12995588c$var$keys.FOCUS_KEY,
GameKeyMap[KeyMap.J] = $4cb5e0b12995588c$var$keys.ABILITY_ONE_KEY,
GameKeyMap[KeyMap.Z] = $4cb5e0b12995588c$var$keys.ABILITY_ONE_KEY,
GameKeyMap[KeyMap.K] = $4cb5e0b12995588c$var$keys.ABILITY_TWO_KEY,
GameKeyMap[KeyMap.X] = $4cb5e0b12995588c$var$keys.ABILITY_TWO_KEY,
GameKeyMap[KeyMap.L] = $4cb5e0b12995588c$var$keys.ABILITY_THREE_KEY,
GameKeyMap[KeyMap.C] = $4cb5e0b12995588c$var$keys.ABILITY_THREE_KEY,
GameKeyMap[KeyMap.Space] = $4cb5e0b12995588c$var$keys.ACTION_KEY,
GameKeyMap[KeyMap.Num1] = $4cb5e0b12995588c$var$keys.UPGRADE_SPEED_KEY,
GameKeyMap[KeyMap.Numpad1] = $4cb5e0b12995588c$var$keys.UPGRADE_SPEED_KEY,
GameKeyMap[KeyMap.Num2] = $4cb5e0b12995588c$var$keys.UPGRADE_MAX_ENERGY_KEY,
GameKeyMap[KeyMap.Numpad2] = $4cb5e0b12995588c$var$keys.UPGRADE_MAX_ENERGY_KEY,
GameKeyMap[KeyMap.Num3] = $4cb5e0b12995588c$var$keys.UPGRADE_ENERGY_REGEN_KEY,
GameKeyMap[KeyMap.Numpad3] = $4cb5e0b12995588c$var$keys.UPGRADE_ENERGY_REGEN_KEY,
GameKeyMap[KeyMap.Num4] = $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_ONE_KEY,
GameKeyMap[KeyMap.Numpad4] = $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_ONE_KEY,
GameKeyMap[KeyMap.Num5] = $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_TWO_KEY,
GameKeyMap[KeyMap.Numpad5] = $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_TWO_KEY,
GameKeyMap[KeyMap.Num6] = $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_THREE_KEY,
GameKeyMap[KeyMap.Numpad6] = $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_THREE_KEY;
const ControlKeys = {
	CHAT_KEY: KeyMap.Enter,
	COMMAND_KEY: KeyMap.ForwardSlash,
	TOGGLE_HERO_INFO_KEY: KeyMap.H,
	TOGGLE_MINIMAP_MODE_KEY: KeyMap.G,
	TOGGLE_CHAT_KEY: KeyMap.V,
	TOGGLE_LEADERBOARD_KEY: KeyMap.B,
	TOGGLE_MAP_KEY_1: KeyMap.M,
	TOGGLE_MAP_KEY_2: KeyMap.Tab,
	TOGGLE_AREA_INFO_KEY: KeyMap.Period
}
  , $4cb5e0b12995588c$export$39b8dbea490353e9 = [$4cb5e0b12995588c$var$keys.FOCUS_KEY, $4cb5e0b12995588c$var$keys.ACTION_KEY, $4cb5e0b12995588c$var$keys.ABILITY_THREE_KEY, $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_THREE_KEY, $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_ONE_KEY, $4cb5e0b12995588c$var$keys.UPGRADE_ABILITY_TWO_KEY, $4cb5e0b12995588c$var$keys.ABILITY_ONE_KEY, $4cb5e0b12995588c$var$keys.ABILITY_TWO_KEY, null, null, $4cb5e0b12995588c$var$keys.ACTION_KEY, null, $4cb5e0b12995588c$var$keys.W_KEY, $4cb5e0b12995588c$var$keys.S_KEY, $4cb5e0b12995588c$var$keys.A_KEY, $4cb5e0b12995588c$var$keys.D_KEY, null, null];
class $5eeca412293d6bd7$var$SettingStore {
	get() {
		return this.settings
	}
	set(e) {
		this.settings = e
	}
	toggle(e) {
		this.settings[e] = !this.settings[e]
	}
	constructor() {
		this.settings = {}
	}
}
var $5eeca412293d6bd7$export$2e2bcd8739ae039 = new $5eeca412293d6bd7$var$SettingStore;
const $e7009c797811e935$var$keys = {"UNDEFINED_KEYTYPE":0,"W_KEY":1,"A_KEY":2,"S_KEY":3,"D_KEY":4,"UP_KEY":5,"LEFT_KEY":6,"DOWN_KEY":7,"RIGHT_KEY":8,"FOCUS_KEY":9,"ABILITY_ONE_KEY":10,"ABILITY_TWO_KEY":11,"ABILITY_THREE_KEY":12,"ACTION_KEY":13,"UPGRADE_SPEED_KEY":14,"UPGRADE_MAX_ENERGY_KEY":15,"UPGRADE_ENERGY_REGEN_KEY":16,"UPGRADE_ABILITY_ONE_KEY":17,"UPGRADE_ABILITY_TWO_KEY":18,"UPGRADE_ABILITY_THREE_KEY":19};
class $e7009c797811e935$var$InputLayer {
	start(e, a) {
		this.gameState = e,
		this.updateChat = a
	}
	registerListeners() {
		const e = this.onKeyDown.bind(this)
		  , t = this.onKeyUp.bind(this)
		  , a = this.onBlur.bind(this);
		window.addEventListener("keydown", e),
		window.addEventListener("keyup", t),
		window.addEventListener("blur", a);
		const r = this.onMouseMove.bind(this)
		  , c = this.onMouseDown.bind(this)
		  , o = this.onMouseUp.bind(this)
		  , n = this.onMouseLeave.bind(this)
		  , $ = this.onContextMenu.bind(this);
		this.canvas.addEventListener("mousemove", r),
		this.canvas.addEventListener("mousedown", c),
		this.canvas.addEventListener("mouseup", o),
		this.canvas.addEventListener("mouseleave", n),
		this.canvas.addEventListener("contextmenu", $),
		this.canvas.addEventListener("touchmove", r),
		this.canvas.addEventListener("touchstart", c),
		this.canvas.addEventListener("touchend", o);
		const i = this.onGamepadConnect.bind(this)
		  , d = this.onGamepadDisconnect.bind(this);
		window.addEventListener("gamepadconnected", i),
		window.addEventListener("gamepaddisconnected", d),
		this.deregisterListeners = () => {
			window.removeEventListener("keydown", e),
			window.removeEventListener("keyup", t),
			window.removeEventListener("blur", a),
			this.canvas.removeEventListener("mousemove", r),
			this.canvas.removeEventListener("mousedown", c),
			this.canvas.removeEventListener("mouseup", o),
			this.canvas.removeEventListener("mouseleave", n),
			this.canvas.removeEventListener("contextmenu", $),
			window.removeEventListener("gamepadconnected", i),
			window.removeEventListener("gamepaddisconnected", d)
		}
	}
	addMouseDownListener(e) {
		this.onMouseDownListeners.add(e)
	}
	removeMouseDownListener(e) {
		this.onMouseDownListeners.delete(e)
	}
	addToggleListener(e) {
		this.toggleListeners.add(e)
	}
	removeToggleListener(e) {
		this.toggleListeners.delete(e)
	}
	notifyToggleListeners() {
		this.toggleListeners.forEach((e => e()))
	}
	onKeyDown(e) {
		if (null === this.gameState || null === this.updateChat)
			return;
		if (this.gameState.initial)
			return;
		if (e.ctrlKey || e.altKey || e.metaKey)
			return;
		if (window.tsmod && document.activeElement.getAttributeNames().includes("c-lock"))
			return;
		e.keyCode === KeyMap.Tab && e.preventDefault();
		const t = global.chat && !chat.hidden && document.getElementById("chat-input");
		if (document.activeElement === t) {
			if (e.keyCode === ControlKeys.CHAT_KEY) {
				if (0 === t.value.length)
					return void t.blur();
				socket.send(msgpack.encode({chat:t.value})),
				t.value = "",
				t.blur()
			}
			return
		}
		if (t && e.keyCode === ControlKeys.CHAT_KEY)
			return void t.focus();
		if (t && document.activeElement !== t && e.keyCode === ControlKeys.COMMAND_KEY)
			return t.value = "/",
			t.focus(),
			void e.preventDefault();
		const a = document.getElementById("mod-tools-duration-input");
		if (document.activeElement.nodeName!=="INPUT") {
			if (this.gameState.usingGamepad = !1,
			e.keyCode !== ControlKeys.TOGGLE_MAP_KEY_1 && e.keyCode !== ControlKeys.TOGGLE_MAP_KEY_2)
				return e.keyCode === ControlKeys.TOGGLE_HERO_INFO_KEY ? (evadesRenderer.heroInfoCard.toggleVisibility(),
				void evadesRenderer.experienceBar.toggleVisibility()) : void (e.keyCode !== ControlKeys.TOGGLE_MINIMAP_MODE_KEY ? e.keyCode === ControlKeys.TOGGLE_AREA_INFO_KEY ? evadesRenderer.areaInfo.toggleVisibility() : e.keyCode !== ControlKeys.TOGGLE_CHAT_KEY ? e.keyCode !== ControlKeys.TOGGLE_LEADERBOARD_KEY ? e.keyCode in GameKeyMap && ((GameKeyMap[e.keyCode]),
				e.preventDefault()) : 1 : 2 : evadesRenderer.minimap.toggleMinimapMode());
			evadesRenderer.minimap.toggleVisibility()
		}
	}
	onKeyUp(e) {
		if(!playtesting||!this.gameState)return;
		this.gameState.initial || e.keyCode in GameKeyMap && (this.gameState.keys&&this.gameState.keys.keyUp(GameKeyMap[e.keyCode]),
		this.gameState.usingGamepad = !1)
	}
	onBlur(e) {
		if(!playtesting||!this.gameState)return;
		this.gameState.initial || (this.gameState.keys&&this.gameState.keys.clear(GameKeyMap[e.keyCode]))
	}
	onMouseMove(e) {
		if(!playtesting)return;
		const t = this.canvas.getBoundingClientRect();
		let a = {};
		a.x = window.innerWidth / this.canvas.width,
		a.y = window.innerHeight / this.canvas.height,
		a = a.x < a.y ? a.x : a.y;
		let r = e;
		null != e.touches && (1 != this.touch.down && (this.touch.down = this.touch.wasDown = !0,
		this.touch.start.x = (e.touches[0].pageX - t.left) / a,
		this.touch.start.y = (e.touches[0].pageY - t.top) / a),
		this.touch.current.x = (e.touches[0].pageX - t.left) / a,
		this.touch.current.y = (e.touches[0].pageY - t.top) / a,
		r = e.touches[1] ? e.touches[1] : e.touches[0]),
		this.x = (r.pageX - t.left) / a,
		this.y = (r.pageY - t.top) / a
	}
	onMouseDown(e) {
		if(!playtesting)return;
		e.touches && void 0 === e.touches[1] && (this.touch.isTouch = !0,
		this.onMouseMove(e)),
		e.preventDefault(),
		this.canvas.focus(),
		this.canvas.blur(),
		this.down = !0,
		this.initialDown = !0,
		this.onMouseDownListeners.forEach((e => e()));
		this.gameState.usingGamepad = !1
	}
	onMouseUp(e) {
		if(!playtesting)return;
		e.touches && !e.touches[0] && (this.touch.down = !1),
		this.down = !1,
		this.initialDown = !1
	}
	onMouseLeave() {
		this.enteredButtons.forEach((e => {
			e.mouseOver = !1,
			e.mouseDown = !1
		}
		)),
		this.enteredButtons.clear(),
		this.down = !1,
		this.canvas.style.cursor = "default"
	}
	onGamepadConnect(e) {
		this.gamepad = gamepadFn()[e.gamepad.index]
	}
	onGamepadDisconnect() {
		this.gamepad = null
	}
	onContextMenu(e) {
		if(!playtesting)return;
		e.preventDefault(),
		e.stopPropagation()
	}
	update(e) {
		var w=camScale
		camScale=Math.min(window.innerWidth/1280,window.innerHeight/720);
		global.chat && chat.setAttribute("style",`transform-origin: 0% 0%;transform: scale(${camScale}); left: ${ctx.canvas.width/2-640*camScale+10*camScale}px; top: ${ctx.canvas.height/2-360*camScale+10*camScale}px; visibility: visible;`);
		global.leaderboard && leaderboard.setAttribute("style",`transform-origin: 100% 0%;transform: scale(${camScale}); right: ${ctx.canvas.width/2-640*camScale+10*camScale}px; top: ${ctx.canvas.height/2-360*camScale+10*camScale}px; visibility: visible;`);
		camScale=w;
		if(!playtesting){
			global.chat && (chat.style.visibility="hidden");
			global.leaderboard && (leaderboard.style.visibility="hidden");
			this.down = !1;
			this.initialDown = !1;
			this.mouseMovementToggled = !1;
			return;
		}
		const t = settings;
		let a, r = !1, c = !1, keys=new Set();
		for (let t = 0; t < this.buttons.length; t++) {
			const a = this.buttons[t];
			a.visible && (!r && this.x >= a.x && this.x <= a.x + a.width && this.y >= a.y && this.y <= a.y + a.height ? (this.enteredButtons.add(a),
			a.mouseOver = !0,
			a.interactive && (this.down && !a.mouseDown ? (keys.add(a.key),controlPlayer(selfId,{keys}),
			a.onClick()) : !this.down && a.mouseDown,
			a.mouseDown = this.down,
			c = !0),
			r = !0) : (a.mouseDown,
			a.clickStarted = !1,
			a.mouseOver = !1,
			a.mouseDown = !1,
			this.enteredButtons.has(a) && this.enteredButtons.delete(a)))
		}
		if (t.toggleMouseMovement ? (this.initialDown && (this.mouseMovementToggled = !this.mouseMovementToggled,
		this.notifyToggleListeners()),
		a = this.mouseMovementToggled) : a = this.down,
		this.initialDown = !1,
		t.enableMouseMovement && (e.mouseDown = !r && a ? {
			x: Math.round(this.x - this.canvas.width / 2),
			y: Math.round(this.y - this.canvas.height / 2)
		} : null),
		playtesting && (this.canvas.style.cursor = c ? "pointer" : "default"),
		this.gamepad) {
			this.gamepad = gamepadFn()[this.gamepad.index];
			for (let t = 0; t < this.gamepad.buttons.length; t++) {
				const a = [controls.FOCUS, controls.ACTION, controls.USE_ABILITY_THREE[0], controls.UPGRADE_ABILITY_THREE[0], controls.UPGRADE_ABILITY_ONE[0], controls.UPGRADE_ABILITY_TWO[0], controls.USE_ABILITY_ONE[0], controls.USE_ABILITY_TWO[0], null, null, controls.ACTION, null, controls.UP[0], controls.DOWN[0], controls.LEFT[0], controls.RIGHT[0], null, null][t];
				a && (this.gamepad.buttons[t].value && !this.gamepadDown.includes(a) ? (keysDown.add(a),
				this.gamepadDown.push(a),
				e.usingGamepad = !0) : !this.gamepad.buttons[t].value && this.gamepadDown.includes(a) && (keysDown.delete(a),
				this.gamepadDown.splice(this.gamepadDown.indexOf(a), 1),
				e.usingGamepad = !0))
			}
			const a = this.gamepad.axes[0]
			  , r = this.gamepad.axes[1];
			if (null !== a && null !== r && (Math.abs(a) > t.joystickDeadzone || Math.abs(r) > t.joystickDeadzone)) {
				const t = .25 * this.canvas.width
				  , c = .25 * this.canvas.height;
				e.mouseDown = {
					x: Math.round(a * t),
					y: Math.round(r * c)
				},
				e.usingGamepad = !0
			}
			const c = .7
			  , o = this.gamepad.axes[2]
			  , n = this.gamepad.axes[3];
			o <= -c && !this.gamepadDown.includes(controls.UPGRADE_SPEED[0]) ? (keysDown.add(controls.UPGRADE_SPEED[0]),
			this.gamepadDown.push(controls.UPGRADE_SPEED[0]),
			e.usingGamepad = !0) : this.gamepadDown.includes(controls.UPGRADE_SPEED[0]) && (keysDown.delete(controls.UPGRADE_SPEED[0]),
			this.gamepadDown.splice(this.gamepadDown.indexOf(controls.UPGRADE_SPEED[0]), 1),
			e.usingGamepad = !0),
			o >= c && !this.gamepadDown.includes(controls.UPGRADE_ENERGY_REGEN[0]) ? (keysDown.add(controls.UPGRADE_ENERGY_REGEN[0]),
			this.gamepadDown.push(controls.UPGRADE_ENERGY_REGEN[0]),
			e.usingGamepad = !0) : this.gamepadDown.includes(controls.UPGRADE_ENERGY_REGEN[0]) && (keysDown.delete(controls.UPGRADE_ENERGY_REGEN[0]),
			this.gamepadDown.splice(this.gamepadDown.indexOf(controls.UPGRADE_ENERGY_REGEN[0]), 1),
			e.usingGamepad = !0),
			n <= -c && !this.gamepadDown.includes(controls.UPGRADE_MAX_ENERGY[0]) ? (keysDown.add(controls.UPGRADE_MAX_ENERGY[0]),
			this.gamepadDown.push(controls.UPGRADE_MAX_ENERGY[0]),
			e.usingGamepad = !0) : this.gamepadDown.includes(controls.UPGRADE_MAX_ENERGY[0]) && (keysDown.delete(controls.UPGRADE_MAX_ENERGY[0]),
			this.gamepadDown.splice(this.gamepadDown.indexOf(controls.UPGRADE_MAX_ENERGY[0]), 1),
			e.usingGamepad = !0)
		} else
			this.touch.wasDown && (this.touch.down && Math.abs(this.touch.current.x - this.touch.start.x) >= 1 && Math.abs(this.touch.current.y - this.touch.start.y) >= 1 ? e.mouseDown = {
				x: this.touch.current.x - this.touch.start.x,
				y: this.touch.current.y - this.touch.start.y
			} : e.mouseDown = null)
	}
	addButton(e, a=(()=>{}
	)) {
		const t = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			visible: !0,
			interactive: !1,
			invalidDown: !1,
			mouseOver: !1,
			mouseDown: !1,
			key: e,
			onClick: a
		};
		return this.buttons.push(t),
		t
	}
	constructor() {
		this.canvas = document.getElementById("canvas"),
		this.x = 0,
		this.y = 0,
		this.rightClickDown = !1,
		this.down = !1,
		this.initialDown = !1,
		this.mouseMovementToggled = !1,
		this.toggleListeners = new Set,
		this.buttons = [],
		this.enteredButtons = new Set,
		this.gameState = null,
		this.updateChat = null,
		this.onMouseDownListeners = new Set,
		this.gamepad = null,
		this.gamepadDown = [],
		this.touch = {
			isTouch: !1,
			start: {
				x: 0,
				y: 0
			},
			current: {
				x: 0,
				y: 0
			},
			secondary: {
				x: 0,
				y: 0
			},
			down: !1,
			wasDown: !1
		},
		this.deregisterListeners = () => {}
	}
}
var $e7009c797811e935$export$2e2bcd8739ae039 = new $e7009c797811e935$var$InputLayer;

function $379de2c4e3c3d2a4$export$b88b9e8f55bb52b8(e) {
	const t = settings.legacySpeedUnits;
	return e.replace(/\{\{speed\|([0-9\/.]+)}}/g, ((e,n)=>function(e) {
		return t ? e.split("/").map((e=>parseFloat(e) / 30)).join("/") : e
	}(n)))
}
const $1c037512d4c36cef$var$HERO_NAME_FONT_SIZE = 18
  , $1c037512d4c36cef$var$ABILITY_DESCRIPTION_FONT_SIZE = 10
  , $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE = 48
  , $1c037512d4c36cef$var$keys = {"UNDEFINED_KEYTYPE":0,"W_KEY":1,"A_KEY":2,"S_KEY":3,"D_KEY":4,"UP_KEY":5,"LEFT_KEY":6,"DOWN_KEY":7,"RIGHT_KEY":8,"FOCUS_KEY":9,"ABILITY_ONE_KEY":10,"ABILITY_TWO_KEY":11,"ABILITY_THREE_KEY":12,"ACTION_KEY":13,"UPGRADE_SPEED_KEY":14,"UPGRADE_MAX_ENERGY_KEY":15,"UPGRADE_ENERGY_REGEN_KEY":16,"UPGRADE_ABILITY_ONE_KEY":17,"UPGRADE_ABILITY_TWO_KEY":18,"UPGRADE_ABILITY_THREE_KEY":19};
class HeroInfoCard extends EvadesEntity {
	constructor() {
		super(),
		this.width = 350,
		this.minWidth = 516,
		this.height = 85,
		this.abilityOne = new Ability,
		this.abilityTwo = new Ability,
		this.abilityThree = new Ability,
		this.upgradeMode = !1,
		this.upgradeBrightness = new Oscillator(175,175,255,150,!0),
		this.isTouchAdjusted = !1,
		this.buttons = {
			interactionIndicator: $e7009c797811e935$export$2e2bcd8739ae039.addButton(null),
			speed: $e7009c797811e935$export$2e2bcd8739ae039.addButton(null),
			maxEnergy: $e7009c797811e935$export$2e2bcd8739ae039.addButton(null),
			energyRegen: $e7009c797811e935$export$2e2bcd8739ae039.addButton(null),
			useAbilityOne: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.USE_ABILITY_ONE[0]),
			useAbilityTwo: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.USE_ABILITY_TWO[0]),
			useAbilityThree: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.USE_ABILITY_THREE[0]),
			upgradeSpeed: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.UPGRADE_SPEED[0]),
			upgradeEnergy: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.UPGRADE_MAX_ENERGY[0]),
			upgradeRegen: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.UPGRADE_ENERGY_REGEN[0]),
			upgradeAbilityOne: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.UPGRADE_ABILITY_ONE[0]),
			upgradeAbilityTwo: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.UPGRADE_ABILITY_TWO[0]),
			upgradeAbilityThree: $e7009c797811e935$export$2e2bcd8739ae039.addButton(controls.UPGRADE_ABILITY_THREE[0])
		},
		this.ready = !1,
		this.hidden = !1
	}
	adjustToTouch() {
		this.isTouchAdjusted = !0,
		this.buttons.speed.key = controls.UPGRADE_SPEED[0],
		this.buttons.maxEnergy.key = controls.UPGRADE_MAX_ENERGY[0],
		this.buttons.energyRegen.key = controls.UPGRADE_ENERGY_REGEN[0],
		this.buttons.hero = $e7009c797811e935$export$2e2bcd8739ae039.addButton(null, (e => {
			this.changeUpgradeMode()
		}
		)),
		this.buttons.hero.interactive = !0,
		this.buttons.speed.interactive = !0,
		this.buttons.maxEnergy.interactive = !0,
		this.buttons.energyRegen.interactive = !0
	}
	changeUpgradeMode() {
		this.upgradeMode = !this.upgradeMode,
		this.upgradeMode ? (this.buttons.useAbilityOne.key = controls.UPGRADE_ABILITY_ONE[0],
		this.buttons.useAbilityTwo.key = controls.UPGRADE_ABILITY_TWO[0],
		this.buttons.useAbilityThree.key = controls.UPGRADE_ABILITY_THREE[0]) : (this.buttons.useAbilityOne.key = controls.USE_ABILITY_ONE[0],
		this.buttons.useAbilityTwo.key = controls.USE_ABILITY_TWO[0],
		this.buttons.useAbilityThree.key = controls.USE_ABILITY_THREE[0])
	}
	newButton(e) {
		return {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			visible: !0,
			interactive: !1,
			invalidDown: !1,
			mouseOver: !1,
			mouseDown: !1,
			key: e
		}
	}
	stateFields() {
		return ["heroType", "speed", "level", "energy", "maxEnergy", "energyRegen", "upgradePoints", "abilityOne", "abilityTwo", "abilityThree", "regionName", "playerInteractions"]
	}
	afterStateUpdate() {
		if (void 0 === this.heroType)
			return void (this.ready = !1);
		const e = $01bb7fd9b3660a1e$export$71c647defb4fbd5a(this.heroType);
		this.heroName = e.name,
		this.heroColor = e.textColor,
		this.ready = !0
	}
	toggleVisibility() {
		this.hidden = !this.hidden;
		for (const e of Object.values(this.buttons))
			e.interactive = !this.hidden,
			e.visible = !this.hidden
	}
	render(e, t, a,delta) {
		if (!this.ready || this.hidden)
			return;
		$e7009c797811e935$export$2e2bcd8739ae039.touch.isTouch && !this.isTouchAdjusted && this.adjustToTouch();
		const r = t.viewportSize
		  , c = r.width / 2 - this.minWidth / 2*camScale
		  , o = r.height/2 + 360*camScale - this.height*camScale;
		this.x = c,
		this.y = o;
		let n, $ = c, i = o;
		let width=350;
		if((this.abilityOne && void 0 !== this.abilityOne.abilityType))width+=82;
		if((this.abilityTwo && void 0 !== this.abilityTwo.abilityType))width+=82;
		if((this.abilityThree && void 0 !== this.abilityThree.abilityType))width+=82;
		this.width=Math.max(width,this.minWidth);
		if (e.strokeStyle = "#000000",
		e.fillStyle = "rgba(0, 0, 0, 0.8)",
		n = this.width*camScale,
		$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, c, o, n, this.height*camScale, !0, !1),
		$ = c + 55*camScale,
		i = o + 20*camScale,
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font($1c037512d4c36cef$var$HERO_NAME_FONT_SIZE),
		e.textAlign = "center",
		e.fillStyle = this.heroColor,
		e.fillText(this.heroName, $, i),
		$ = c + 55*camScale,
		i = o + 55*camScale,
		e.fillStyle = this.heroColor,
		$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, $, i, 23*camScale, !0, !1),
		this.buttons.hero) {
			if (this.buttons.hero.x = $ - 23*camScale,
			this.buttons.hero.y = i - 23*camScale,
			this.buttons.hero.width = 46*camScale,
			this.buttons.hero.height = 46*camScale,
			this.buttons.hero.mouseOver) {
				const t = 180*camScale
				  , a = 40*camScale;
				this.renderStatTooltip(e, "Upgrade mode: " + ["off", "on"][+this.upgradeMode], $ - t / 2, i - a - 35*camScale, t, a)
			}
			!this.upgradeMode && this.upgradePoints > 0 && ($ -= 28*camScale,
			i -= 10*camScale,
			e.fillStyle = "#aaaaaa",
			e.beginPath(),
			e.moveTo($, i),
			e.lineTo($ - 15*camScale, i),
			e.lineTo($ - 10.5*camScale, i - 6*camScale),
			e.lineTo($ - 19.5*camScale, i - 15*camScale),
			e.lineTo($ - 15*camScale, i - 19.5*camScale),
			e.lineTo($ - 6*camScale, i - 10.5*camScale),
			e.lineTo($, i - 15*camScale),
			e.fill())
		}
		$ = c + 55*camScale,
		i = o + 63*camScale,
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(22),
		e.textAlign = "center",
		e.fillStyle = "white",
		this.mutatiorbBuffExperienceGain && this.mutatiorbBuffed && (e.fillStyle = "yellow"),
		e.fillText(this.level, $, i),
		0 === this.playerInteractions ? ($ = c + 4*camScale,
		i = o + 71*camScale,
		e.fillStyle = "#666666",
		e.beginPath(),
		e.moveTo($, i + 10*camScale),
		e.lineTo($ + 6*camScale, i),
		e.lineTo($ + 12*camScale, i + 10*camScale),
		e.fill()) : 1 === this.playerInteractions && ($ = c + 4*camScale,
		i = o + 71*camScale,
		e.fillStyle = "#666666",
		e.beginPath(),
		e.moveTo($, i),
		e.lineTo($ + 10*camScale, i),
		e.lineTo($ + 10*camScale, i + 10*camScale),
		e.lineTo($, i + 10*camScale),
		e.fill()),
		this.buttons.interactionIndicator.x = $,
		this.buttons.interactionIndicator.y = i,
		this.buttons.interactionIndicator.width = 10*camScale,
		this.buttons.interactionIndicator.height = 10*camScale,
		this.playerInteractions <= 1 && this.buttons.interactionIndicator.mouseOver && (e.fillStyle = "rgba(0, 0, 0, 0.65)",
		$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, $ - 14*camScale, i - 22*camScale, 40*camScale, 20*camScale, !0, !1),
		e.textAlign = "center",
		e.fillStyle = "white",
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(14),
		e.fillText(0 === this.playerInteractions ? "Solo" : "Duo", $ + 5*camScale, i - 22*camScale + 15*camScale)),
		$ = c + 105*camScale,
		i = o,
		e.strokeStyle = "rgb(128, 128, 128)",
		$f36928166e04fda7$export$2e2bcd8739ae039.line(e, $, i, $, i + this.height*camScale),
		this.upgradeBrightness.update(delta);
		this.upgradePoints > 0 && ($ = c + 136*camScale,
		i = o + 16*camScale,
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(13),
		e.fillStyle = "white",
		e.fillText("Points:", $, i));
		const d = Math.round(10 * this.speed) / 10
		  , s = Math.round(1e3 * this.energyRegen) / 1e3
		  , f = d < EvadesConfig.upgrades.speed.max
		  , l = this.maxEnergy.toFixed(3) < EvadesConfig.upgrades.max_energy.max
		  , p = s < EvadesConfig.upgrades.energy_regen.max
		  , b = this.abilityOne && this.abilityOne.level !== this.abilityOne.maxLevel
		  , u = this.abilityTwo && this.abilityTwo.level !== this.abilityTwo.maxLevel
		  , x = this.abilityThree && this.abilityThree.level !== this.abilityThree.maxLevel
		  , h = f || l || p || b || u || x ? Math.round((this.upgradeBrightness.value - this.upgradeBrightness.min) / 3) : 0;
		let m = 200
		  , v = 200
		  , g = 0;
		if (e.fillStyle = `rgb(${200 + h}, ${200 + h}, ${h})`,
		this.upgradePoints > 8) {
			const t = 8*camScale;
			$ = c + 169*camScale,
			i = o + 12*camScale,
			$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, $, i, t, !0, !1),
			i = o + 16*camScale,
			e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(10),
			e.textAlign = "center",
			m = 0,
			v = 0,
			g = 0,
			e.fillStyle = `rgb(${m + h}, ${v + h}, ${g + h})`,
			e.fillText(this.upgradePoints, $, i)
		} else
			for (let t = 0; t < this.upgradePoints; t++)
				i = o + 12*camScale,
				$ = c + 169*camScale + 20*camScale * t,
				$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, $, i, 6*camScale, !0, !1);
		const y = 105*camScale;
		$ = c + y,
		i = o + 17*camScale;
		let S = this.speed;
		settings.legacySpeedUnits && (S /= 30);
		const C = Math.round(10 * S) / 10;
		this.renderStat(e, "Speed", "Zoom zoom!\nHold shift to slow down.", C, $, i, this.buttons.speed, this.mutatiorbBuffSpeedBoost && this.mutatiorbBuffed),
		this.renderUpgrade(e, $ + 41*camScale, i + 52*camScale, f, a.usingGamepad ? "R←" : 1, this.buttons.upgradeSpeed),
		$ = c + y + 82*camScale,
		this.renderStat(e, "Energy", "Used for abilities.", this.energyInfo(), $, i, this.buttons.maxEnergy, !1, this.energized, this.sweetToothConsumed),
		this.renderUpgrade(e, $ + 41*camScale, i + 52*camScale, l, a.usingGamepad ? "R↑" : 2, this.buttons.upgradeEnergy),
		$ = c + y + 164*camScale,
		this.renderStat(e, "Regen", "How quickly your\nenergy comes back.", Math.round(10 * s) / 10, $, i, this.buttons.energyRegen),
		this.renderUpgrade(e, $ + 41*camScale, i + 52*camScale, p, a.usingGamepad ? "R→" : 3, this.buttons.upgradeRegen),
		i = o + 17*camScale,
		$ = c + y + 164*camScale,
		(this.abilityOne && void 0 !== this.abilityOne.abilityType)&&($+=82*camScale,
		this.renderAbility(e, this.abilityOne, $, i, a.usingGamepad ? ["ZL"] : ["Z", "J"], a.usingGamepad ? "L" : 4, this.buttons.useAbilityOne, this.buttons.upgradeAbilityOne, this.mutatiorbBuffCooldownReduction && this.mutatiorbBuffed)),
		(this.abilityTwo && void 0 !== this.abilityTwo.abilityType)&&($+=82*camScale,
		this.renderAbility(e, this.abilityTwo, $, i, a.usingGamepad ? ["ZR"] : ["X", "K"], a.usingGamepad ? "R" : 5, this.buttons.useAbilityTwo, this.buttons.upgradeAbilityTwo, this.mutatiorbBuffCooldownReduction && this.mutatiorbBuffed)),
		(this.abilityThree && void 0 !== this.abilityThree.abilityType)&&($+=82*camScale,
		this.renderAbility(e, this.abilityThree, $, i, a.usingGamepad ? ["Y"] : ["C", "L"], a.usingGamepad ? ["X"] : 6, this.buttons.useAbilityThree, this.buttons.upgradeAbilityThree, this.mutatiorbBuffCooldownReduction && this.mutatiorbBuffed))
	}
	energyInfo() {
		return `${Math.floor(this.energy)} / ${this.maxEnergy}`
	}
	renderStat(e, t, a, r, c, o, n, $=!1, i=!1, d=!1) {
		if (n.x = c,
		n.y = o + 10*camScale,
		n.width = 82*camScale,
		n.height = 40*camScale,
		n.mouseOver) {
			const t = 185*camScale
			  , r = 60*camScale;
			this.renderStatTooltip(e, a, c + n.width / 2 - t / 2, o - r - 35*camScale, t, r)
		}
		c += 41*camScale,
		o += 44*camScale,
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(10),
		e.fillStyle = "white",
		$ && (e.fillStyle = "yellow"),
		settings.displayEnergyBars > 1 && (i && (e.fillStyle = "yellow"),
		d && (e.fillStyle = "rgb(255, 43, 143)")),
		e.fillText(`${t}`, c, o),
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(22),
		e.fillText(r, c, o - 17*camScale)
	}
	renderStatTooltip(e, t, a, r, c, o) {
		e.fillStyle = "rgba(0, 0, 0, 0.65)",
		$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, a, r, c, o, !0, !1),
		e.textAlign = "center",
		e.fillStyle = "white",
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(16),
		$f36928166e04fda7$export$2e2bcd8739ae039.multilineText(e, t, a + c / 2, r + 25*camScale)
	}
	renderAbility(e, t, a, r, c, o, n, $, i=!1) {
		t.maxLevel=abilityConfig[t.abilityType].levels.length;
		if (a += (41 - $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE / 2)*camScale,
		n.interactive = !0,
		i) {
			const t = 2*camScale;
			e.fillStyle = "rgb(110, 57, 30)",
			e.fillRect(a - t, r - t, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale + 2 * t, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale + 2 * t)
		}
		if (!this.upgradeMode && t.locked || this.upgradeMode && 0 == this.upgradePoints)
			t.image.draw(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale),
			e.fillStyle = "rgba(0, 0, 0, 0.6)",
			$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, !0, !1),
			n.interactive = !1;
		else {
			if (t.image.draw(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale),
			"Mutatiorb" === t.name) {
				$31e8cfefa331e399$export$93e5c64e4cc246c8(`abilities/mutatiorb_${this.storedPellets}`).draw(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale)
			}
			!n.mouseDown && n.mouseOver ? (e.fillStyle = "rgba(0, 0, 0, 0.1)",
			$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, !0, !1)) : n.mouseDown || n.mouseOver || (e.fillStyle = "rgba(0, 0, 0, 0.2)",
			$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, !0, !1))
		}
		if (!this.upgradeMode)
			if (t.disabled)
				e.fillStyle = "rgba(0, 0, 0, 0.7)",
				e.fillRect(a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale),
				n.interactive = !1;
			else if (t.cooldown > 0) {
				e.fillStyle = "rgba(0, 0, 0, 0.7)";
				const c = t.cooldown / t.totalCooldown;
				1 === c ? $f36928166e04fda7$export$2e2bcd8739ae039.rect(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, !0, !1) : $f36928166e04fda7$export$2e2bcd8739ae039.sectorInRect(e, a, r, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale, 360 * (1 - c) - 90),
				n.interactive = !1
			}
		if (n.mouseOver) {
			const c = 235*camScale
			  , o = $379de2c4e3c3d2a4$export$b88b9e8f55bb52b8(t.description)
			  , n = (20 * o.split("\n").length + 40)*camScale;
			this.renderAbilityTooltip(e, t, o, a + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale / 2 - c / 2, r - n - 35*camScale, c, n)
		}
		n.x = a,
		n.y = r,
		n.width = $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale,
		n.height = $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale;
		const d = a + 5*camScale
		  , s = a + 45*camScale
		  , f = r - 9*camScale;
		t.locked ? e.strokeStyle = "rgb(150, 150, 150)" : e.strokeStyle = "rgb(200, 200, 200)";
		for (let a = 0; a < t.maxLevel; a++) {
			let r = d + (s - d) / 2;
			t.maxLevel > 1 && (r = d + (s - d) * (a / (t.maxLevel - 1))),
			$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, r, f, 3*camScale, !1, !0)
		}
		e.strokeStyle = "rgb(255, 255, 0)",
		e.fillStyle = e.strokeStyle;
		for (let a = 0; a < t.level; a++) {
			let r = d + (s - d) / 2;
			t.maxLevel > 1 && (r = d + (s - d) * (a / (t.maxLevel - 1))),
			$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, r, f, 3*camScale, !0, !0)
		}
		if (e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font($1c037512d4c36cef$var$ABILITY_DESCRIPTION_FONT_SIZE),
		e.textAlign = "center",
		e.fillStyle = "white",
		t.locked && 0 === this.upgradePoints) {
			const t = "Locked";
			e.fillText(t, a + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale / 2, r + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale + 12*camScale)
		} else if (0 === this.upgradePoints) {
			const t = `[${c.join("] or [")}]`;
			e.fillText(t, a + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale / 2, r + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale + 12*camScale)
		} else {
			const c = t.level !== t.maxLevel;
			this.renderUpgrade(e, a + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale / 2, r + $1c037512d4c36cef$var$ABILITY_IMAGE_SIZE*camScale + 4*camScale, c, o, $)
		}
	}
	renderAbilityTooltip(e, t, a, r, c, o, n) {
		e.fillStyle = "rgba(0, 0, 0, 0.65)",
		$f36928166e04fda7$export$2e2bcd8739ae039.rect(e, r, c, o, n, !0, !1),
		e.textAlign = "center",
		e.fillStyle = "white",
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(22),
		e.fillText(t.name, r + o / 2, c + 25*camScale),
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(16),
		$f36928166e04fda7$export$2e2bcd8739ae039.multilineText(e, a, r + o / 2, c + 50*camScale)
	}
	renderUpgrade(e, t, a, r, c, o) {
		if (0 === this.upgradePoints)
			return void (o.interactive = !1);
		let n, $, i = Math.round((this.upgradeBrightness.value - this.upgradeBrightness.min) / 3), d = 0;
		n = 200,
		$ = 200,
		d = 0,
		o.interactive = !0,
		r ? o.mouseDown && o.mouseOver ? i = 80 : o.mouseOver && (i = 50) : (o.interactive = !1,
		i = -120),
		e.fillStyle = `rgb(${n + i}, ${$ + i}, ${d + i})`,
		e.strokeStyle = e.fillStyle;
		o.x = t - 6*camScale,
		o.y = a,
		o.width = 14*camScale,
		o.height = 14*camScale,
		$f36928166e04fda7$export$2e2bcd8739ae039.roundedRect(e, o.x, o.y, 12*camScale, 12*camScale, 1*camScale, !0, !0),
		e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(12),
		c.length > 1 && (e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(8)),
		n = 0,
		$ = 0,
		d = 0,
		e.fillStyle = `rgb(${n + i}, ${$ + i}, ${d + i})`,
		e.fillText(c, t, a + 10*camScale)
	}
}
let $e913e8e06e143c8e$var$cachedAreaText = null;
var $24bba5be1b54b934$exports = {}
/*alea*/, $3TM9N = function(e,t,a){function r(e){var t=this,a=function(){var e=4022871197,t=function(t){t=String(t);for(var a=0;a<t.length;a++){var r=.02519603282416938*(e+=t.charCodeAt(a));r-=e=r>>>0,e=(r*=e)>>>0,e+=4294967296*(r-=e)}return 2.3283064365386963e-10*(e>>>0)};return t}();t.next=function(){var e=2091639*t.s0+2.3283064365386963e-10*t.c;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=0|e)},t.c=1,t.s0=a(" "),t.s1=a(" "),t.s2=a(" "),t.s0-=a(e),t.s0<0&&(t.s0+=1),t.s1-=a(e),t.s1<0&&(t.s1+=1),t.s2-=a(e),t.s2<0&&(t.s2+=1),a=null}function c(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function o(e,t){var a=new r(e),o=t&&t.state,n=a.next;return n.int32=function(){return 4294967296*a.next()|0},n.double=function(){return n()+11102230246251565e-32*(2097152*n()|0)},n.quick=n,o&&("object"==typeof o&&c(o,a),n.state=function(){return c(a,{})}),n}return o}(false)
/*xor128*/, $1QrEl = function(e,t,a){function r(e){var t=this,a="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:a+=e;for(var r=0;r<a.length+64;r++)t.x^=0|a.charCodeAt(r),t.next()}function c(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function o(e,t){var a=new r(e),o=t&&t.state,n=function(){return(a.next()>>>0)/4294967296};return n.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152}while(0===e);return e},n.int32=a.next,n.quick=n,o&&("object"==typeof o&&c(o,a),n.state=function(){return c(a,{})}),n}return o}(false)
/*xorwow*/, $ept1H = function(e,t,a){function r(e){var t=this,a="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^e^e<<1)|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:a+=e;for(var r=0;r<a.length+64;r++)t.x^=0|a.charCodeAt(r),r==a.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function c(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function o(e,t){var a=new r(e),o=t&&t.state,n=function(){return(a.next()>>>0)/4294967296};return n.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152}while(0===e);return e},n.int32=a.next,n.quick=n,o&&("object"==typeof o&&c(o,a),n.state=function(){return c(a,{})}),n}return o}(false)
/*xorshift7*/, $cPL7v = function(e,t,a){function r(e){var t=this;t.next=function(){var e,a,r=t.x,c=t.i;return e=r[c],a=(e^=e>>>7)^e<<24,a^=(e=r[c+1&7])^e>>>10,a^=(e=r[c+3&7])^e>>>3,a^=(e=r[c+4&7])^e<<7,e=r[c+7&7],a^=(e^=e<<13)^e<<9,r[c]=a,t.i=c+1&7,a},function(e,t){var a,r=[];if(t===(0|t))r[0]=t;else for(t=""+t,a=0;a<t.length;++a)r[7&a]=r[7&a]<<15^t.charCodeAt(a)+r[a+1&7]<<13;for(;r.length<8;)r.push(0);for(a=0;a<8&&0===r[a];++a);for(8==a?r[7]=-1:r[a],e.x=r,e.i=0,a=256;a>0;--a)e.next()}(t,e)}function c(e,t){return t.x=e.x.slice(),t.i=e.i,t}function o(e,t){null==e&&(e=+new Date);var a=new r(e),o=t&&t.state,n=function(){return(a.next()>>>0)/4294967296};return n.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152}while(0===e);return e},n.int32=a.next,n.quick=n,o&&(o.x&&c(o,a),n.state=function(){return c(a,{})}),n}return o}(false)
/*xor4096*/, $hDaqC = function(e,t,a){function r(e){var t=this;t.next=function(){var e,a,r=t.w,c=t.X,o=t.i;return t.w=r=r+1640531527|0,a=c[o+34&127],e=c[o=o+1&127],a^=a<<13,e^=e<<17,a^=a>>>15,e^=e>>>12,a=c[o]=a^e,t.i=o,a+(r^r>>>16)|0},function(e,t){var a,r,c,o,n,$=[],i=128;for(t===(0|t)?(r=t,t=null):(t+="\0",r=0,i=Math.max(i,t.length)),c=0,o=-32;o<i;++o)t&&(r^=t.charCodeAt((o+32)%t.length)),0===o&&(n=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,o>=0&&(n=n+1640531527|0,c=0==(a=$[127&o]^=r+n)?c+1:0);for(c>=128&&($[127&(t&&t.length||0)]=-1),c=127,o=512;o>0;--o)r=$[c+34&127],a=$[c=c+1&127],r^=r<<13,a^=a<<17,r^=r>>>15,a^=a>>>12,$[c]=r^a;e.w=n,e.X=$,e.i=c}(t,e)}function c(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function o(e,t){null==e&&(e=+new Date);var a=new r(e),o=t&&t.state,n=function(){return(a.next()>>>0)/4294967296};return n.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152}while(0===e);return e},n.int32=a.next,n.quick=n,o&&(o.X&&c(o,a),n.state=function(){return c(a,{})}),n}return o}(false)
/*tychei*/, $6b2mt = function(e,t,a){function r(e){var t=this,a="";t.next=function(){var e=t.b,a=t.c,r=t.d,c=t.a;return e=e<<25^e>>>7^a,a=a-r|0,r=r<<24^r>>>8^c,c=c-e|0,t.b=e=e<<20^e>>>12^a,t.c=a=a-r|0,t.d=r<<16^a>>>16^c,t.a=c-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):a+=e;for(var r=0;r<a.length+20;r++)t.b^=0|a.charCodeAt(r),t.next()}function c(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function o(e,t){var a=new r(e),o=t&&t.state,n=function(){return(a.next()>>>0)/4294967296};return n.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152}while(0===e);return e},n.int32=a.next,n.quick=n,o&&("object"==typeof o&&c(o,a),n.state=function(){return c(a,{})}),n}return o}(false)
  , $9d5ae4eadf0f1327$exports = {};
!function(e,t,a){var r,c=256,o="random",n=a.pow(c,6),$=a.pow(2,52),i=2*$,d=255;function s(d,s,x){var h=[],m=b(p((s=1==s?{entropy:!0}:s||{}).entropy?[d,u(t)]:null==d?function(){try{var a;return r&&(a=r.randomBytes)?a=a(c):(a=new Uint8Array(c),(e.crypto||e.msCrypto).getRandomValues(a)),u(a)}catch(a){var o=e.navigator,n=o&&o.plugins;return[+new Date,e,n,e.screen,u(t)]}}():d,3),h),v=new f(h),g=function(){for(var e=v.g(6),t=n,a=0;e<$;)e=(e+a)*c,t*=c,a=v.g(1);for(;e>=i;)e/=2,t/=2,a>>>=1;return(e+a)/t};return g.int32=function(){return 0|v.g(4)},g.quick=function(){return v.g(4)/4294967296},g.double=g,b(u(v.S),t),(s.pass||x||function(e,t,r,c){return c&&(c.S&&l(c,v),e.state=function(){return l(v,{})}),r?(a[o]=e,t):e})(g,m,"global"in s?s.global:this==a,s.state)}function f(e){var t,a=e.length,r=this,o=0,n=r.i=r.j=0,$=r.S=[];for(a||(e=[a++]);o<c;)$[o]=o++;for(o=0;o<c;o++)$[o]=$[n=d&n+e[o%a]+(t=$[o])],$[n]=t;(r.g=function(e){for(var t,a=0,o=r.i,n=r.j,$=r.S;e--;)t=$[o=d&o+1],a=a*c+$[d&($[o]=$[n=d&n+t])+($[n]=t)];return r.i=o,r.j=n,a})(c)}function l(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function p(e,t){var a,r=[],c=typeof e;if(t&&"object"==c)for(a in e)try{r.push(p(e[a],t-1))}catch(e){}return r.length?r:"string"==c?e:e+"\0"}function b(e,t){for(var a,r=e+"",c=0;c<r.length;)t[d&c]=d&(a^=19*t[d&c])+r.charCodeAt(c++);return u(t)}function u(e){return String.fromCharCode.apply(0,e)}if(b(a.random(),t),$9d5ae4eadf0f1327$exports){$9d5ae4eadf0f1327$exports=s;try{r={exports:{}}}catch(e){}}else"function"==typeof define&&define.amd?define((function(){return s})):a["seed"+o]=s}("undefined"!=typeof self?self:$9d5ae4eadf0f1327$exports,[],Math),
$9d5ae4eadf0f1327$exports.alea = $3TM9N,
$9d5ae4eadf0f1327$exports.xor128 = $1QrEl,
$9d5ae4eadf0f1327$exports.xorwow = $ept1H,
$9d5ae4eadf0f1327$exports.xorshift7 = $cPL7v,
$9d5ae4eadf0f1327$exports.xor4096 = $hDaqC,
$9d5ae4eadf0f1327$exports.tychei = $6b2mt,
$24bba5be1b54b934$exports = $9d5ae4eadf0f1327$exports;
class OverlayText extends EvadesEntity{	
	static defaultX = 0;
	static defaultY = 240;
	static defaultFontSize = 28;
	static defaultLineHeight = 35;
	static defaultTextAlign = "center";
	static defaultFillStyle = "#00ff6b";
	static defaultStrokeStyle = "#006b2c";
	static defaultLineWidth = 5;
	constructor(){super(),this.animations=new Map}
	stateFields(){return["x","y","areaPosition","areaName","areaNumber","regionName","victoryArea","isGuest","highestAreaAchieved","accessories","canCling","hasWindDebuff","hasWaterDebuff","hasFireDebuff","hasEarthDebuff"]}
	render(e,t,a){const r=t.viewportSize;let c=[];c=c.concat(this.getTutorialText()),c=c.concat(this.getAreaText()),c=c.concat(this.getActionText(a));for(const e of this.animations.keys())c.some((t=>this.getAnimationKey(t)===e))||this.animations.delete(e);for(const t of c)this.renderText(e,t,r)}
	getAnimationKey(e){let t=e.text;return void 0!==e.x&&(t+=`-${e.x}`),void 0!==e.y&&(t+=`-${e.y}`),t}
	renderText(e,t,a){const r=a.width/2+(t.x||OverlayText.defaultX)*camScale,c=a.height/2+(t.y||OverlayText.defaultY)*camScale,o=this.getAnimationKey(t);this.animations.has(o)||this.animations.set(o,{progress:0,lastTime:new Date});const n=this.animations.get(o);e.save(),e.font=t.font||`bold ${$f36928166e04fda7$export$2e2bcd8739ae039.font(t.fontSize||OverlayText.defaultFontSize)}`,e.textAlign=t.textAlign||OverlayText.defaultTextAlign,e.lineWidth=(t.lineWidth||OverlayText.defaultLineWidth)*camScale,e.strokeStyle=t.strokeStyle||OverlayText.defaultStrokeStyle,e.fillStyle=t.fillStyle||OverlayText.defaultFillStyle;const $=t.opacity||1;if(e.globalAlpha=$,t.animation){switch(t.animation.type){case"fadeIn":e.globalAlpha=Math.min($,n.progress/t.animation.duration);break;case"fadeOut":e.globalAlpha=Math.max(0,$-n.progress/t.animation.duration);break;case"typewriter":const a=Math.floor(n.progress/t.animation.duration*t.text.length);t.text=t.text.substring(0,a)}const a=new Date;n.progress+=a-n.lastTime,n.lastTime=a}$f36928166e04fda7$export$2e2bcd8739ae039.multilineText(e,t.text,r,c,{fill:t.fill||!0,stroke:t.stroke||!0,lineHeight:(t.lineHeight||OverlayText.defaultLineHeight)*camScale,fromTop:t.fromTop||!1}),e.restore()}
	getAreaText(){const e=this.x,t=this.y,a=$e728d5a493f33528$export$69dd9a529c505ede(this.highestAreaAchieved),r={"Central Core":{11:{text:"",heroUnlock:"Morfe",heroUnlockOnly:!0},21:{text:"Half way there.",heroUnlock:"Aurora",heroUnlockOnly:!0},41:{text:"You defeated Central Core.",victoryPoints:1,heroUnlock:"Necro"}},"Central Core Hard":{11:{text:"",heroUnlock:"Morfe",heroUnlockOnly:!0},21:{text:"Half way there.",heroUnlock:"Aurora",heroUnlockOnly:!0},41:{text:"You hardly defeated Central Core Hard.",victoryPoints:6,heroUnlock:"Necro"}},"Catastrophic Core":{11:{text:"",heroUnlock:"Morfe",heroUnlockOnly:!0},21:{text:"Half way there.",heroUnlock:"Aurora",heroUnlockOnly:!0},41:{text:"You barely defeated Catastrophic Core.",victoryPoints:11,heroUnlock:"Necro"}},"Dangerous District":{41:{text:"It's too quiet here.",victoryPoints:1,heroUnlock:"Reaper"},81:{text:"I'd probably avoid this place next time.",victoryPoints:3}},"Dangerous District Hard":{41:{text:"You can hardly hear a sound.",victoryPoints:3,heroUnlock:"Reaper"},81:{text:"I'd hardly consider returning to this place.",victoryPoints:8}},"Peculiar Pyramid":{1:{text:"A deep sinkhole formed in the middle of the dunes... Find it to use this shortcut.",condition:e>3072&&t>128&&t<256},30:{text:"Congratulations for finding your way through the Peculiar Pyramid.",victoryPoints:1},32:{text:"Welcome to Rameses' secret chamber.",victoryPoints:1,heroUnlock:"Rameses"}},"Peculiar Pyramid Hard":{30:{text:"Congratulations for hardly finding your way through the Peculiar Pyramid.",victoryPoints:3},32:{text:"This is hardly Rameses' secret chamber.",victoryPoints:2,heroUnlock:"Rameses"}},"Glacial Gorge":{41:{text:"Stop shivering. You made it.",victoryPoints:2,heroUnlock:"Nexus"}},"Glacial Gorge Hard":{41:{text:"Stop shivering. You've hardly made it.",victoryPoints:7,heroUnlock:"Nexus"}},"Wacky Wonderland":{41:{text:"Electrifying performance! The carnival's just getting started!",victoryPoints:2,heroUnlock:"Jolt"},81:{text:"Candy for everyone! Hope you had a nice stay in Wacky Wonderland.",victoryPoints:3,heroUnlock:"Candy"}},"Vicious Valley":{41:{text:"The valley is yours.",victoryPoints:2,heroUnlock:"Shade"}},"Vicious Valley Hard":{41:{text:"The valley is hardly yours.",victoryPoints:8,heroUnlock:"Shade"}},"Elite Expanse":{41:{text:"Few make it this far out in space.",victoryPoints:2,heroUnlock:"Euclid"},81:{text:"The air is thin here.",victoryPoints:6,accessoryUnlock:"Orbit Ring"}},"Elite Expanse Hard":{41:{text:"Very few can hardly make it this far out in space.",victoryPoints:6,heroUnlock:"Stella"},81:{text:"The air is hardly thin here.",victoryPoints:10,accessoryUnlock:"Stars"}},"Monumental Migration Hard":{41:{text:"Hardly a respite in your journey. An enormous path lies ahead.",victoryPoints:1},81:{text:"It's beautiful here, but your new home beckons you much further into the wild.",victoryPoints:2},121:{text:"Your adventure has hardly led to peace and tranquility...",victoryPoints:3,heroUnlock:"Chrono"},161:{text:"Stay on the tips of your toes.",victoryPoints:2},201:{text:"Where's the piece I was promised?",victoryPoints:3},241:{text:"You hear a large crowd brewing in the distance.",victoryPoints:4},281:{text:"Do they breed???",victoryPoints:3},321:{text:"Don't anger them.",victoryPoints:4},361:{text:"Booming in the distance all around you...",victoryPoints:5},401:{text:"They seem to have the same tendencies as us... just, trapped.",victoryPoints:4},441:{text:"This road used to lead to paradise. Now it goes where no hero should go.",victoryPoints:5},480:{text:"Silence fills the air."},481:{text:"Take care, take a break. This world is bounded differently.",victoryPoints:6},521:{text:"A respite in your journey. There's still a very long path ahead.",victoryPoints:2},561:{text:"It's beautiful here, atleast it was.",victoryPoints:3},601:{text:"Your adventure has led you to more discoveries.",victoryPoints:4},641:{text:"Toes.",victoryPoints:3},681:{text:"Where's the peace I was promised? Must be in area 1561.",victoryPoints:4},721:{text:"You hear a crowd brewing in the distance. What are they protesting?",victoryPoints:5},761:{text:"Do they breed...? Well, do they?",victoryPoints:4},801:{text:"Don't anger them. Just don't.",victoryPoints:5},841:{text:"BOOMing in the distance.",victoryPoints:6},881:{text:"We are all trapped,",victoryPoints:5},921:{text:"This road used to lead to paradise. Now it goes where no hero should go. (detroit)",victoryPoints:6},960:{text:"Sorrow fills the air."},961:{text:"Halfway!",victoryPoints:7},1001:{text:"Your journey has helped you reflect.",victoryPoints:3},1041:{text:"You've seen so much that everything's boring.",victoryPoints:4},1081:{text:"Your adventure isn't so much an adventure anymore.",victoryPoints:5},1121:{text:"Don't let your guard down.",victoryPoints:4},1161:{text:"What stories can they tell?",victoryPoints:5},1201:{text:"They're crowding again.",victoryPoints:6},1241:{text:"Do they breed...? Dude stop asking that question already.",victoryPoints:5},1281:{text:"Don't anger them. Yes you're starting to anger me.",victoryPoints:6},1321:{text:"Why are any of us here?",victoryPoints:7},1361:{text:"Think hard.",victoryPoints:6},1401:{text:"I'm running out of ideas.",victoryPoints:7},1440:{text:"Prayers fill the air."},1441:{text:"Be sure to keep yourself safe.",victoryPoints:6},1481:{text:"Stop leaking victory messages.",victoryPoints:4},1521:{text:"You should know that the derivative of product is not the product of the derivative.",victoryPoints:5},1561:{text:"Well dang it isn't.",victoryPoints:6},1601:{text:"New guy in town.",victoryPoints:5},1641:{text:"Residents in fear. District 7 down.",victoryPoints:6},1681:{text:"I do not know what to tell you. What is your goal?",victoryPoints:7},1721:{text:"They bread.",victoryPoints:6},1761:{text:"You've hardly escaped it.",victoryPoints:7},1801:{text:"You have the freedom of choice, right?",victoryPoints:8},1841:{text:"You are stuck now. So close. So far. Where next?",victoryPoints:7},1881:{text:"https://images.homedepot-static.com/catalog/pdfImages/11/1127f7b4-ab8e-43ac-978a-2f9395a9b50b.pdf",victoryPoints:8},1920:{text:"Despair fills the air."},1921:{text:"It's time for you to take a break.",victoryPoints:9}},"Monumental Migration":{41:{text:"A respite in your journey. A long path lies ahead.",victoryPoints:1},81:{text:"It's beautiful here, but your new home beckons you further into the wild.",victoryPoints:1},121:{text:"Your adventure has led to peace and tranquility...",victoryPoints:2,heroUnlock:"Chrono"},161:{text:"Stay on your toes.",victoryPoints:2},201:{text:"Where's the peace I was promised?",victoryPoints:2},241:{text:"You hear a crowd brewing in the distance.",victoryPoints:3},281:{text:"Do they breed...?",victoryPoints:3},321:{text:"Don't anger them. You'll only make it more difficult.",victoryPoints:3},361:{text:"Booming in the distance...",victoryPoints:4},401:{text:"They seem to have the same tendencies as us... just, trapped.",victoryPoints:4},441:{text:"This road used to lead to paradise. Now it goes where no hero should go.",victoryPoints:5},480:{text:"Death fills the air."},481:{text:"Take care. The people will require your help one day.",victoryPoints:20,accessoryUnlock:"Halo"}},"Humongous Hollow":{41:{text:"These enormous ones are defeated, but larger challenges lie beyond...",victoryPoints:1,heroUnlock:"Brute"},81:{text:"At last, you stand amongst the giants. Nothing is impossible.",victoryPoints:6}},"Humongous Hollow Hard":{41:{text:"These enormous ones are hardly defeated, and harder challenges lie beyond...",victoryPoints:3,heroUnlock:"Brute"},81:{text:"At last, you hardly stand amongst the giants. Nothing is impossible.",victoryPoints:9}},"Haunted Halls":{1:{text:"Access Mysterious Mansion to unlock the shortcut.",condition:e<32},10:{text:"It's getting dark ... You might want to pick up a flashlight.",condition:e<500},16:{text:"A large mansion looms ahead.",condition:e>8e3},17:{text:"That was just the beginning.",victoryPoints:1}},"Quiet Quarry":{41:{text:"Your soft footsteps fill the Quiet Quarry.",victoryPoints:2,heroUnlock:"Cent"}},"Quiet Quarry Hard":{41:{text:"Hardly surprising how fast these creatures can silently move.",victoryPoints:6,heroUnlock:"Cent"}},"Frozen Fjord":{41:{text:"You've followed in the path of the glaciers.",victoryPoints:3,heroUnlock:"Jötunn",accessoryUnlock:"Santa Hat"}},"Frozen Fjord Hard":{41:{text:"You've hardly followed in the path of the glaciers.",victoryPoints:8,heroUnlock:"Jötunn",accessoryUnlock:"Blue Santa Hat"}},"Ominous Occult":{17:{text:"The breeze beckons for you.",victoryPoints:7,heroUnlock:"Ghoul"}},"Ominous Occult Hard":{17:{text:"The breeze hardly beckons for you.",victoryPoints:10,heroUnlock:"Ghoul"}},"Restless Ridge":{44:{text:"You've climbed over the ridge. The air vibrates with sleepless energy.",victoryPoints:5,heroUnlock:"Mirage"}},"Restless Ridge Hard":{43:{text:"🍪 The smell of freshly baked cookies fills the air 🍪"},44:{text:"Complete the map and return to set armageddon in motion.",condition:e>1888},45:{text:"The very enemies grow stronger. You should never have come.",condition:e<960},46:{text:"The ridge shakes as its walls collapse around you.",condition:e<960},47:{text:"The very fabric of reality strains as the seams tear apart.",condition:e<960},48:{text:"You've hardly climbed over the ridge. The air vibrates with sleepless energy.",victoryPoints:18,heroUnlock:"Mirage"},49:{text:"Your brilliant triumph has hardly bought you time.",victoryPoints:4}},"Toxic Territory":{21:{text:"You've waded through the gloopy radiation.",victoryPoints:2,heroUnlock:"Glob",accessoryUnlock:"Sticky Coat"}},"Toxic Territory Hard":{21:{text:"You've hardly waded through the gloopy radiation.",victoryPoints:4,heroUnlock:"Glob",accessoryUnlock:"Toxic Coat"}},"Magnetic Monopole":{36:{text:"You've conquered the hidden electric dipole.",victoryPoints:1},37:{text:"You've repelled the opposing force.",victoryPoints:2,heroUnlock:"Magno"}},"Magnetic Monopole Hard":{36:{text:"You've hardly conquered the hidden electric dipole.",victoryPoints:3},37:{text:"You've hardly repelled the opposing force.",victoryPoints:4,heroUnlock:"Magno"}},"Burning Bunker":{37:{text:"You've reached the lowest level of the bunker.",victoryPoints:3,heroUnlock:"Ignis",accessoryUnlock:"Flames"}},"Burning Bunker Hard":{37:{text:"You've hardly reached the lowest level of the bunker.",victoryPoints:6,heroUnlock:"Ignis",accessoryUnlock:"Blue Flames"}},"Grand Garden":{29:{text:"You've ventured through the flowery garden.",victoryPoints:2,heroUnlock:"Viola"}},"Grand Garden Hard":{29:{text:"You've hardly ventured through the flowery garden.",victoryPoints:5,heroUnlock:"Viola"}},"Endless Echo":{41:{text:"The echo repeats itself.",victoryPoints:1},81:{text:"The winds continue to howl.",victoryPoints:1},121:{text:"A strange world lies ahead.",victoryPoints:2,heroUnlock:"Echelon"},161:{text:"What lies ahead, waiting to be seen?",victoryPoints:2},201:{text:"The world continues to become distorted.",victoryPoints:3},241:{text:"The echo repeats a distorted call.",victoryPoints:3,accessoryUnlock:"Clouds"},281:{text:"The winds are always changing.",victoryPoints:4},321:{text:"The future seems familiar.",victoryPoints:4},361:{text:"Just how many of them are there?",victoryPoints:5},401:{text:"There is no end.",victoryPoints:5},441:{text:"What proofs support our beliefs?",victoryPoints:6},481:{text:"Do they feel the same?",victoryPoints:6},521:{text:"The journey is tiring.",victoryPoints:7},561:{text:"Take a rest, won't you?",victoryPoints:7},601:{text:"May your adventure continue as long as you desire.",victoryPoints:8},641:{text:"Stay aware of your surroundings.",victoryPoints:8},681:{text:"Think before you act.",victoryPoints:9},721:{text:"Are you satisfied with your adventure yet?",victoryPoints:9},761:{text:"Keep going, then.",victoryPoints:10},801:{text:"Make sure to stay hydrated on your journey.",victoryPoints:10},841:{text:"Your dedication is impressive",victoryPoints:11},881:{text:"You seem truly unstoppable.",victoryPoints:11},921:{text:"You're actually doing it, and your dedication is admirable.",victoryPoints:12},961:{text:"Can you keep going? The Endless Echo will trap you soon.",victoryPoints:12}},"Endless Echo Hard":{121:{text:"It's hardly a break here.",victoryPoints:3,heroUnlock:"Echelon"},241:{text:"And if they ask, say you hardly had a bad time.",accessoryUnlock:"Storm Clouds",victoryPoints:6}},"Mysterious Mansion":{2:{text:"A full moon every night."},4:{text:"The path is inactive until you reach the next level of the mansion.",condition:e>64&&e<320&&(t<32||t>416)},29:{text:"Wield no light for another to be granted."},60:{text:"Finally, an exit out of that cursed hedge maze, and you find a strange hat.",accessoryUnlock:"Witch Hat",victoryPoints:2},61:{text:"Finally, you find a non-liminal space, and breathe a sigh of relief.",victoryPoints:1},62:{text:"You make it to the roof, and escape.",victoryPoints:1},63:{text:"You find a powerful warlock locked away, and rescue him.",victoryPoints:2,heroUnlock:"Mortuus"}},"Coupled Corridors":{1:{text:"The exit is blocked.",condition:e<64},21:{text:"You find a small resting place north of the illusion corridor.",victoryPoints:1},22:{text:"The exit is blocked.",condition:e<64},42:{text:"You find a small resting place south of the illusion corridor.",victoryPoints:1},43:{text:"The doors lock behind you.",condition:t<320},44:{text:"The doors lock behind you.",condition:t>2880},65:{text:"You've made it through the creepy corridors.",victoryPoints:3,heroUnlock:"Stheno"}},"Cyber Castle":{1:{text:"Unlock all heroes by rescuing them from the ---- to gain access...",condition:e>3136},3:{text:"Defeat the four greater ---- by staying within their auras to access the gate above..."},8:{text:"-e-e-- --e o------- -- a-- -o-- -o --i- a----s...",condition:e>3072},9:{text:"D-f--- -h- ------e- o- --l --t- -- -a-- --c---...",condition:e<64},16:{text:"You've shut down Cybot, the overseer of all bots! The world is safe for now...",victoryPoints:8,heroUnlock:"?"}},"Research Lab":{1:{text:"Permanently unlocked: After area 1, minimum level is 25 while playing with a group!"},42:{text:"You've successfully completed the experiment.",victoryPoints:7}},"Cyber Castle Hard":{1:{text:"Defeat 10 parallel distortions and ----- ------ to proceed.",condition:e>3136},15:{text:"Jvyylshapvu pz uva jhbzhapvu!"},23:{text:"You've hardly shut down Cybot, the overseer of all bots! The world is safe for now...",victoryPoints:15,heroUnlock:"?"}},"Shifting Sands":{48:{text:"You've navigated through the rocky desert.",victoryPoints:4,heroUnlock:"Boldrock"}},"Infinite Inferno":{3:{text:"Memories from the core are resurfacing..."},7:{text:"Memories of the valley are flooding back..."},11:{text:"Memories from an expanse so elite are restored..."},15:{text:"Memories of a gorge so cold are returning..."},19:{text:"Memories of a lost alcove are recalling..."},23:{text:"Memories from the district are crashing..."},27:{text:"Memories from the monopole are attracting..."},31:{text:"Memories of a peaceful garden are blooming..."},35:{text:"Memories from the castle finale have corrupted..."},39:{text:"You've travelled through the inferno of memories.",victoryPoints:4,heroUnlock:"Demona"}},"Dusty Depths":{1:{text:"The sinkhole will trap and weaken you if you continue..."},2:{text:"You're trapped now...",condition:e<320},21:{text:"You found the desert core, the final resting point.",victoryPoints:8}},"Withering Wasteland":{41:{text:"The lost Factorb technology has been recovered.",victoryPoints:4,heroUnlock:"Factorb"}}},c=e=>{let t="";void 0===(e={...e}).victoryPoints||this.isGuest||(t=`\n${e.victoryPoints} VP awarded!`);let r=null;if(void 0!==e.heroUnlock&&(r=$e728d5a493f33528$export$ba6e2f1cddd013f7(a,e.heroUnlock)),!0===e.heroUnlockOnly&&(this.isGuest||null===r||!r.locked))return[];if(!1===e.condition)return[];const c=e.accessoryUnlock?e.accessoryUnlock.toLowerCase().split(" ").join("-"):void 0;let o="";return this.isGuest?e.heroUnlock&&(o+="\nRegister an account to permanently unlock new heroes!"):(null!==r&&r.locked&&(o+=`\nUnlocked ${e.heroUnlock}.`),void 0===e.accessoryUnlock||null!=this.accessories&&null!=this.accessories.collection&&this.accessories.collection[c]||(o+=`\nAdded ${e.accessoryUnlock} to your accessory collection.`)),e.text=`${e.text}${o}${t}`,[e]};if(map.name=="Infinite Inferno"&&map.areas.length!=39)r["Infinite Inferno"]={15:{text:"https://youtu.be/UQ4_8wFgG7Y"}};if(!(this.regionName in r))return[];if(!(this.areaNumber in r[this.regionName])){if("Endless Echo"===this.regionName&&this.areaNumber>1&&(this.areaNumber-1)%40==0){const e={text:"These words are the Endless Echo, and you are trapped within it.",victoryPoints:Math.floor((this.areaNumber-2)/80)+1};return getVictoryText(e.text,e.victoryPoints,e.heroUnlock,e.heroUnlockOnly,e.accessoryUnlock,e.condition)}if("Endless Echo Hard"===this.regionName){if(!(this.areaNumber>1&&(this.areaNumber-1)%40==0))return[];const e=Math.floor((this.areaNumber-1)/40),t=["I hardly believe you know where you're going...","You've hardly begun...","You've hardly reached the end...","The echo is hardly in reach...","How hardly can you try...?","You've hardly been through it all...","It's hardly imaginable to find you here...","The end is hardly in sight...","The echo has hardly left your view...","There's hardly a story to tell...","There's hardly a voice to be heard...","There's hardly a reason to believe...","There's hardly a sight to be seen...","Where the enemies are hardly the threat...","The echo hardly halts your way...","Have you hardly had enough...?"],a=$24bba5be1b54b934$exports(EvadesConfig.week_number)();return c({text:t[(Math.floor(a*t.length)+e)%t.length],victoryPoints:Math.floor((this.areaNumber-2)/40)+1})}return[]}return c(r[this.regionName][this.areaNumber])}
	getTutorialText(){if("Central Core"!==this.regionName)return[];const e=Object.keys(this.highestAreaAchieved);for(let t=0;t<e.length;t++)if(this.highestAreaAchieved[e[t]]>=20)return[];const t=this.x;if(1===this.areaNumber){if(t<320)return[{text:"Head right by holding D or the Right Arrow key."}];if(t<1040)return[{text:"Pick up pellets to gain experience!"}];if(t<1760)return[{text:"If you collect enough pellets, you will level up and gain a point!"}];if(t<2480)return[{text:"Points can be used by pressing 1-5 to upgrade stats!"}];if(t<3200)return[{text:"Press 1 to increase your speed!"}]}else if(2===this.areaNumber){if(t<640)return[{text:"Hover your cursor over the icons to see what abilities you can unlock!"}];if(t<1280)return[{text:"Press 4 or 5 to unlock your two abilities."}];if(t<1920)return[{text:"Using abilities consumes energy."}];if(t<2560)return[{text:"Press Z and X to activate abilities 1 and 2. Or you can use J and K."}];if(t<3200)return[{text:"Press 2 to upgrade max energy. Press 3 to increase energy regeneration."}]}else if(3===this.areaNumber){if(t<640)return[{text:"This map has 40 areas. Reach the end to unlock new heroes."}];if(t<1280)return[{text:"Finally, touch downed players to rescue them!"}]}return[]}
	getActionText(e){return this.canCling?[{text:`Press ${e.usingGamepad?"A":"Space"} to cling/uncling!`,fontSize:18}]:this.hasWindDebuff?[{text:"Touch other players to remove the wind debuff!",fontSize:18}]:this.hasWaterDebuff?[{text:"Touch other players to remove the water debuff!",fontSize:18}]:this.hasEarthDebuff?[{text:"Touch other players to remove the earth debuff!",fontSize:18}]:this.hasFireDebuff?[{text:"Touch other players to remove the fire debuff!",fontSize:18}]:[]}
}
class Minimap extends EvadesEntity {
	stateFields() {
		return ["x", "y", "width", "height", "zones"]
	}
	afterStateUpdate() {
		void 0 !== this.x && (this.areaCanvas ? this.areaCanvasOffset = null : (this.areaCanvas = $f36928166e04fda7$export$ba06b54a1d867509(3 * this.nearbySize * this.canvasScale, 3 * this.nearbySize * this.canvasScale),
		this.areaContext = this.areaCanvas.getContext("2d")))
	}
	updateZones(){
		this.zones=[];
		var mapColor=arrayToInt32(map.properties.background_color ?? [...defaultValues.properties.background_color]);
		map.areas.map(e=>{var areaColor=arrayToInt32(e.properties.background_color ?? [...defaultValues.properties.background_color]);e.zones.map(t=>{this.zones.push({x:e.x+t.x,y:e.y+t.y,width:t.width,height:t.height,type:t.type,backgroundColor:arrayToInt32(t.properties.background_color ?? [...defaultValues.properties.background_color])||areaColor||mapColor})})});
	}
	roundTo(e, a) {
		return Math.round(e / a) * a
	}
	drawNearbyMinimap(e) {
		const a = this.roundTo(e.x,this.nearbySize)
		  , t = this.roundTo(e.y,this.nearbySize)
		  , r = a - this.nearbySize
		  , c = t - this.nearbySize
		  , o = a + this.nearbySize
		  , n = t + this.nearbySize;
		if (null !== this.areaCanvasOffset && this.areaCanvasOffset.x === r && this.areaCanvasOffset.y === c)
			return;
		this.areaCanvasOffset = {
			x: r,
			y: c
		},
		this.areaContext.clearRect(0, 0, this.areaCanvas.width, this.areaCanvas.height);
		const $ = {};
		(settings.tileMode>>1) ? ($["ACTIVE"] = [17, 17, 17, 255],
		$["SAFE"] = [60, 60, 60, 255],
		$["EXIT"] = [148, 136, 0, 255],
		$["VICTORY"] = [148, 136, 0, 255],
		$["TELEPORT"] = [33, 135, 149, 255],
		$["REMOVAL"] = [107, 99, 0, 255],
		$["DUMMY"] = [17, 17, 17, 255]) : ($["ACTIVE"] = [255, 255, 255, 255],
		$["SAFE"] = [195, 195, 195, 255],
		$["EXIT"] = [255, 244, 108, 255],
		$["VICTORY"] = [255, 244, 108, 255],
		$["TELEPORT"] = [106, 208, 222, 255],
		$["REMOVAL"] = [255, 249, 186, 255],
		$["DUMMY"] = [255, 255, 255, 255]);
		for (const e of this.zones) {
			if (e.x > o || e.x + e.width < r || e.y > n || e.y + e.height < c)
				continue;
			const a = [e.backgroundColor >> 24 & 255, e.backgroundColor >> 16 & 255, e.backgroundColor >> 8 & 255, 255 & e.backgroundColor]
			  , t = this.mixColors($[e.type.toUpperCase()], a);
			this.areaContext.fillStyle = `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}`;
			const d = (e.x -this.x - this.areaCanvasOffset.x) * this.canvasScale
			  , i = (e.y - this.y - this.areaCanvasOffset.y) * this.canvasScale;
			this.areaContext.fillRect(d, i, e.width * this.canvasScale, e.height * this.canvasScale)
		}
	}
	mixColors(e, a) {
		const t = e[3] / 255
		  , r = a[3] / 255
		  , c = []
		  , o = 1 - (1 - r) * (1 - t);
		return c[0] = Math.round(a[0] * r / o + e[0] * t * (1 - r) / o),
		c[1] = Math.round(a[1] * r / o + e[1] * t * (1 - r) / o),
		c[2] = Math.round(a[2] * r / o + e[2] * t * (1 - r) / o),
		c[3] = o,
		c
	}
	toggleVisibility() {
		this.hidden = !this.hidden
	}
	update(e, t, a, r) {
		if (this.hidden)
			return;
		const c = {}
		  , o = Object.keys(t);
		for (let e = 0; e < o.length; e++) {
			const a = o[e]
			  , r = t[a];
			r.showOnMap && (c[a] = r)
		}
		const n = Object.keys(e);
		for (let t = 0; t < n.length; t++) {
			const a = n[t];
			if (a in c)
				continue;
			const r = e[a];
			r.showOnMap && (c[a] = r)
		}
		this.entities = Object.values(c),
		this.self = a,
		this.area = r
	}
	toggleMinimapMode() {
		this.areaCenteredMode = !this.areaCenteredMode
	}
	render(e,t,a,delta) {
		this.hidden || (
			this.top = this.bottom + canvas.height/2 + 360*camScale - this.minimapHeight,
			this.left = canvas.width/2 - 640*camScale,
		e.save(),
		this.maxWidth = 370*camScale,
		this.maxHeight = 100*camScale,
		e.imageSmoothingEnabled = !1,
		this.renderButtons(e),
		this.areaCenteredMode ? this.renderAreaCentered(e) : this.renderPlayerCentered(e),
		e.restore(),
		this.redOscillator.update(delta))
	}
	renderButtons(e) {
		const a = this.minimapModeButton;
		a.interactive = !0,
		a.width = 20*camScale,
		a.height = 20*camScale,
		a.x = this.left + 5*camScale,
		a.y = this.top - a.height - 5*camScale;
		let t = 0;
		t = this.areaCenteredMode ? 80 : 140,
		a.mouseDown && a.mouseOver ? t = 255 : a.mouseOver && (t += 30),
		e.fillStyle = `rgb(${t}, ${t}, ${t})`,
		e.strokeStyle = "black",
		e.beginPath(),
		e.rect(a.x, a.y, a.width, a.height),
		e.fill(),
		e.stroke(),
		e.drawImage(this.minimapModeButtonImage.getImage(), a.x + 2*camScale, a.y + 2*camScale, a.width - 4*camScale, a.height - 4*camScale)
	}
	renderAreaCentered(e) {
		const a = {};
		var boundary=getAreaBoundary(this.area);
		a.centerX = this.area.x + boundary.width / 2,
		a.centerY = this.area.y + boundary.height / 2,
		a.width = boundary.width,
		a.height = boundary.height,
		this.x=0,this.y=0,
		a.left = this.area.x,
		a.top = this.area.y;
		let t = this.maxWidth / a.width
		  , r = this.maxHeight / a.height;
		t > r ? (this.minimapWidth = this.maxWidth * r / t,
		this.minimapHeight = this.maxHeight) : (this.minimapWidth = this.maxWidth,
		this.minimapHeight = this.maxHeight * t / r),
		t = this.minimapWidth / a.width,
		r = this.minimapHeight / a.height,
		this.renderBackground(e, a);
		for (let c = 0; c < this.entities.length; c++) {
			const o = this.entities[c]
			  , n = (o.x - a.left+map.areas[o.area].x) * t + this.left
			  , $ = (o.y - a.top+map.areas[o.area].y) * r + this.top;
			if (o.wall) {
				const a = o.width * t
				  , c = o.height * r;
				this.renderWall(e, o, n, $, a, c, o.rotation)
			} else {
				const a = o.radius * Math.min(t, r);
				this.renderEntity(e, o, n, $, a)
			}
		}
	}
	renderPlayerCentered(e) {
		const a = .1*camScale;
		this.minimapWidth = this.maxWidth,
		this.minimapHeight = this.maxHeight;
		const t = {};
		t.centerX = this.self.entity.x+this.area.x,
		t.centerY = this.self.entity.y+this.area.y,
		t.width = this.minimapWidth / a,
		t.height = this.minimapHeight / a,
		t.left = this.self.entity.x+this.area.x - t.width / 2,
		t.top = this.self.entity.y+this.area.y - t.height / 2,
		this.x=this.left,this.y=this.top,
		this.renderBackground(e, t);
		for (let r = 0; r < this.entities.length; r++) {
			const c = this.entities[r]
			  , o = (c.x - t.centerX+map.areas[c.area].x) * a + this.left + this.minimapWidth / 2
			  , n = (c.y - t.centerY+map.areas[c.area].y) * a + this.top + this.minimapHeight / 2;
			if (c.wall) {
				const t = c.width * a
				  , r = c.height * a;
				this.renderWall(e, c, o, n, t, r, c.rotation)
			} else {
				const t = c.radius * a;
				this.renderEntity(e, c, o, n, t)
			}
		}
	}
	renderBackground(e, a) {
		if (null === this.areaCanvas)
			return;
		const t = {
			x: a.left + a.width / 2,
			y: a.top + a.height / 2
		};
		this.drawNearbyMinimap(t),
		e.beginPath(),
		e.rect(this.left, this.top, this.minimapWidth, this.minimapHeight),
		e.clip(),
		e.drawImage(this.areaCanvas, (a.left - this.x - this.areaCanvasOffset.x) * this.canvasScale, (a.top - this.y - this.areaCanvasOffset.y) * this.canvasScale, a.width * this.canvasScale, a.height * this.canvasScale, this.left, this.top, this.minimapWidth, this.minimapHeight),
		e.fillStyle = "rgba(80, 80, 80, 0.6)",
		e.fillRect(this.left, this.top, this.minimapWidth, this.minimapHeight)
	}
	renderEntity(e, a, t, r, c) {
		if (a.isDeparted)
			return;
		let o = !1;
		if (a.deathTimer >= 0) {
			const n = `rgb(${this.redOscillator.value}, 0, 0)`;
			if (e.fillStyle = n,
			e.font = $f36928166e04fda7$export$2e2bcd8739ae039.font(9),
			a.rescueable) {
				let o = r - 8*camScale;
				r < this.top + 16*camScale + c && (o = r + 16*camScale),
				e.fillText((a.deathTimer / 1e3).toFixed(0), t, o)
			}
			o = !0,
			e.strokeStyle = n
		} else
			void 0 !== a.heroType && (o = !0,
			e.strokeStyle = $01bb7fd9b3660a1e$export$71c647defb4fbd5a(a.heroType).strokeColor);
		e.fillStyle = a.color,
		!0 !== a.fullMapOpacity && (e.globalAlpha = .5),
		e.lineWidth = 2*camScale,
		$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, t, r, c + 2*camScale, !0, o),
		e.globalAlpha = 1
	}
	renderWall(e, a, t, r, c, o, z) {
	    let $$=c/2+t,$$2=o/2+r;
		e.fillStyle = "rgba(0, 0, 0, 0.4)",
		e.save();
		e.translate($$,$$2);
		e.rotate(z*Math.PI/180);
		e.translate(-c/2,-o/2);
		e.fillRect(0, 0, c, o);
		e.restore();
	}
	constructor() {
		super(),
		this.redOscillator = new Oscillator(160,160,255,180,!0),
		this.left = 0,
		this.bottom = 0,
		this.maxWidth = 370,
		this.maxHeight = 100,
		this.areaCanvasOffset = null,
		this.canvasScale = 1 / 8,
		this.nearbySize = 1e4,
		this.minimapWidth = this.maxWidth,
		this.minimapHeight = this.maxHeight,
		this.minimapModeButton = $e7009c797811e935$export$2e2bcd8739ae039.addButton(null, (()=>this.toggleMinimapMode())),
		this.areaCenteredMode = !0,
		this.minimapModeButtonImage = $31e8cfefa331e399$export$93e5c64e4cc246c8("buttons/minimap-mode"),
		this.hidden = !1,
		this.zones = [],
		this.areaCanvas = null;
	}
}
class MobileControls {
	render(e, t) {
		$e7009c797811e935$export$2e2bcd8739ae039.touch.down && (e.fillStyle = "rgba(0, 0, 0, 0.1)",
		e.strokeStyle = "rgba(0, 0, 0, 0.2)",
		$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, $e7009c797811e935$export$2e2bcd8739ae039.touch.start.x, $e7009c797811e935$export$2e2bcd8739ae039.touch.start.y, 180*camScale, !0, !0),
		$f36928166e04fda7$export$2e2bcd8739ae039.arc(e, $e7009c797811e935$export$2e2bcd8739ae039.touch.current.x, $e7009c797811e935$export$2e2bcd8739ae039.touch.current.y, 20*camScale, !0, !0))
	}
}
//END OF HUD
//IMAGE LOADER
const $31e8cfefa331e399$var$images = {};
class $31e8cfefa331e399$var$SimpleImage {
	constructor(e) {
		this.textureData = e,
		this.image = null,
		this.blank = e.blank || !1,
		this.loaded = !1
	}
	createImage() {
		if (this.image)
			return;
		const {texture: e, frame: t} = this.textureData
		  , a = document.createElement("canvas");
		a.width = t.w,
		a.height = t.h;
		a.getContext("2d").drawImage(e, t.x, t.y, t.w, t.h, 0, 0, t.w, t.h),
		this.image = a,
		//this.image.src = a.toDataURL(),
		//this.src = this.image.src,
		this.loaded = !0
	}
	getImage() {
		return this.image || this.createImage(),
		this.image
	}
	getPreviewImage() {
		return this.getImage()
	}
	draw(e, ...t) {
		const {frame: a} = this.textureData;
		let r, c, o, n;
		if (2 === t.length)
			[r,c] = t,
			o = a.w,
			n = a.h;
		else if (4 === t.length)
			[r,c,o,n] = t;
		else {
			if (8 !== t.length)
				return void console.error("Invalid number of arguments for draw method");
			[,,,,r,c,o,n] = t
		}
		var tr=e.getTransform();
		var scaled=Math.min(window.innerWidth/1280,window.innerHeight/720);
		(r+o)*Math.abs(tr.a)<=(e.canvas.width/2-640*scaled)||(c+n)*Math.abs(tr.d)<=(e.canvas.height/2-360*scaled)||r*Math.abs(tr.a)>=(e.canvas.width/2+640*scaled)||c*Math.abs(tr.d)>=(e.canvas.height/2+360*scaled)||(this.image || this.createImage(),
		2 === t.length ? e.drawImage(this.image, r, c) : 4 === t.length ? e.drawImage(this.image, r, c, o, n) : 8 === t.length && e.drawImage(this.image, t[0], t[1], t[2], t[3], r, c, o, n))
	}
}
const $31e8cfefa331e399$var$blankImage = new $31e8cfefa331e399$var$SimpleImage({
	texture: new Image,
	frame: {
		x: 0,
		y: 0,
		w: 1,
		h: 1
	},
	blank: !0
});
class $31e8cfefa331e399$export$9d5734c725768403 {
	constructor(e, t) {
		this.initData = {
			prefixPath: e,
			data: t
		},
		this.frames = [],
		this.previewImage = null,
		this.currentFrame = 0,
		this.currentFrameTime = 0,
		t && this.loadFrom(t)
	}
	getImage(delta,e=!0) {
		return e && this.nextFrame(delta),
		this.frames[this.currentFrame].image.blank && (this.frames[this.currentFrame].image = $31e8cfefa331e399$export$93e5c64e4cc246c8(this.initData.prefixPath + "/" + this.frames[this.currentFrame].path)),
		this.frames[this.currentFrame].image.getImage()
	}
	getPreviewImage() {
		return this.previewImage.blank && (this.previewImage = $31e8cfefa331e399$export$93e5c64e4cc246c8(this.initData.prefixPath + "/" + data.preview)),
		this.previewImage || this.frames[0].image
	}
	clone() {
		return new $31e8cfefa331e399$export$9d5734c725768403(this.initData.prefixPath,this.initData.data)
	}
	loadFrom(e) {
		for (const t of e.frames)
			this.frames.push({
				image: $31e8cfefa331e399$var$blankImage,
				duration: t.duration,
				path: t.path
			});
		e.startRandom && (this.currentFrame = Math.round(Math.random() * (this.frames.length - 1)),
		this.currentFrameTime = Math.round(Math.random() * this.frames[this.currentFrame].duration)),
		e.preview && (this.previewImage = $31e8cfefa331e399$export$93e5c64e4cc246c8(this.initData.prefixPath + "/" + e.preview))
	}
	nextFrame(delta) {
		this.currentFrameTime += delta,
		this.currentFrameTime >= this.frames[this.currentFrame].duration && (this.currentFrame = (this.currentFrame + 1) % this.frames.length,
		this.currentFrameTime = 0)
	}
	draw(e, delta, ...t) {
		const a = this.frames[this.currentFrame];
		a.image.blank && (a.image = $31e8cfefa331e399$export$93e5c64e4cc246c8(this.initData.prefixPath + "/" + a.path)),
		a.image.draw(e, ...t),
		this.nextFrame(delta)
	}
}
function $d2f179ecccc561fa$var$getTypeSuffix(e) {
	switch (e) {
	case "active":
		return "Active";
	case "safe":
		return "Safe";
	case "exit":
	case "victory":
		return "Exit";
	case "teleport":
		return "Teleport";
	case "removal":
		return "Removal";
	case "dummy":
	default:
		return "Active"
	}
}
function $d2f179ecccc561fa$var$getTextureStart(e) {
	switch (e) {
	case "normal":
		return {
			x: 0,
			y: 0
		};
	case "leaves":
		return {
			x: 0,
			y: 128
		};
	case "wooden":
		return {
			x: 0,
			y: 256
		};
	case "baguette":
		return {
			x: 0,
			y: 384
		};
	case "ice":
		return {
			x: 0,
			y: 512
		};
	default:
		throw new Error(`Unknown texture: ${e}`)
	}
}
function $d2f179ecccc561fa$var$getTextureSize(e) {
	switch (e) {
	case "normal":
	case "leaves":
	case "wooden":
	case "baguette":
		return 128;
	case "ice":
		return 512;
	default:
		throw new Error(`Unknown texture: ${e}`)
	}
}
function $d2f179ecccc561fa$var$getTypeOffset(e) {
	switch (e) {
	case "active":
		return {
			x: 0,
			y: 0
		};
	case "safe":
		return {
			x: 1,
			y: 0
		};
	case "exit":
	case "victory":
		return {
			x: 2,
			y: 0
		};
	case "teleport":
		return {
			x: 3,
			y: 0
		};
	case "removal":
		return {
			x: 4,
			y: 0
		};
	case "dummy":
	default:
		return {
			x: 0,
			y: 0
		}
	}
}
function $d2f179ecccc561fa$export$b9b1204f7239550e(e, t, a) {
	let r = "";
	let o = !0;
	switch (e) {
	case "normal":
		r = `${!(settings.tileMode&1)?"Tiles":"NoTiles"}/${(settings.tileMode>>1)?"Dark":"Light"}/Normal`;
		break;
	case "leaves":
		r = ((settings.tileMode>>1) ? "Dark" : "Light") + "/Leaves";
		break;
	case "wooden":
		r = "Wooden";
		break;
	case "baguette":
		r = "Baguette";
		break;
	case "ice":
		r = ((settings.tileMode>>1) ? "Dark" : "Light") + "/Ice",
		o = !1;
		break;
	default:
		throw new Error(`Unknown texture: ${e}`)
	}
	const n = $d2f179ecccc561fa$var$getTypeSuffix(t)
	  , $ = $d2f179ecccc561fa$var$getTextureStart(e)
	  , i = $d2f179ecccc561fa$var$getTextureSize(e)
	  , d = $d2f179ecccc561fa$var$getTypeOffset(t);
	return {
		image: $31e8cfefa331e399$export$93e5c64e4cc246c8(`maps/${r}${o ? n : ""}`),
		x: $.x + d.x * i,
		y: $.y + d.y * i,
		width: i,
		height: i
	}
}
let $31e8cfefa331e399$export$4d6139e2c3698967 = !1
  , $31e8cfefa331e399$var$imagesLoadedCount = 0
  , $31e8cfefa331e399$var$imagesCount = 0;
function $31e8cfefa331e399$export$93e5c64e4cc246c8(e) {
	return $31e8cfefa331e399$var$images[e] ? $31e8cfefa331e399$var$images[e].clone ? $31e8cfefa331e399$var$images[e].clone() : ($31e8cfefa331e399$var$images[e].createImage(),
	$31e8cfefa331e399$var$images[e]) : (//console.warn(`Image not found: ${e}`),
	$31e8cfefa331e399$var$blankImage)
}
function $31e8cfefa331e399$var$loadPackedTexture(e, t) {
	const a = new Image;
	a.src = "./packed-texture-0.webp",
	a.onload = () => {
		assetsLoaded.count++;
		for (const [t,r] of Object.entries(e.frames)) {
			const e = {
				texture: a,
				frame: r.frame,
				rotated: r.rotated,
				trimmed: r.trimmed,
				spriteSourceSize: r.spriteSourceSize,
				sourceSize: r.sourceSize,
				pivot: r.pivot
			};
			$31e8cfefa331e399$var$images[t] = new $31e8cfefa331e399$var$SimpleImage(e)
		}
		$31e8cfefa331e399$export$4d6139e2c3698967 = !0
	}
}
function $d2f179ecccc561fa$export$5be464827fabd9a6(e, t, a=null, r) {
	$d2f179ecccc561fa$export$b9dfb366e63af805(e, $d2f179ecccc561fa$export$b9b1204f7239550e(t.texture, t.type, r), t.x, t.y, t.width, t.height, a)
}
function $d2f179ecccc561fa$export$5be464827fabd9a6(e, t, a, r) {
	$d2f179ecccc561fa$export$b9dfb366e63af805(e, $d2f179ecccc561fa$export$b9b1204f7239550e(t.texture, t.type, a), t.x, t.y, t.width, t.height, r)
};
function $d2f179ecccc561fa$export$b9dfb366e63af805(e, t, a, r, c, o, n,angle=0){
	angle*=Math.PI/180
	const $ = t.image.getImage()
	  , i = t.width
	  , d = t.height;
	  var pattern=e.createPattern($,null);
	  e.fillStyle=pattern;
	  var u=e.getTransform();
	  let $$=c/2+a+n.x,
	  $$2=o/2+r+n.y;
	  e.translate($$,$$2);
	  e.rotate(angle);
	  e.translate(-c/2,-o/2);
	  e.fillRect(0,0,c,o);
	  e.setTransform(u);
}
const $8ffc30d9a3afd0d9$exports = JSON.parse('{"frames":{"maps/Dark/Ice":{"frame":{"x":1,"y":1,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512},"pivot":{"x":0.5,"y":0.5}},"maps/Light/Ice":{"frame":{"x":515,"y":1,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512},"pivot":{"x":0.5,"y":0.5}},"entities/pumpkin_off":{"frame":{"x":1,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"entities/pumpkin_on":{"frame":{"x":131,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"entities/snowball_projectile":{"frame":{"x":261,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/BaguetteActive":{"frame":{"x":391,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/BaguetteExit":{"frame":{"x":521,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/BaguetteRemoval":{"frame":{"x":651,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/BaguetteSafe":{"frame":{"x":781,"y":515,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/BaguetteTeleport":{"frame":{"x":1,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Dark/LeavesActive":{"frame":{"x":131,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Dark/LeavesExit":{"frame":{"x":261,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Dark/LeavesRemoval":{"frame":{"x":391,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Dark/LeavesSafe":{"frame":{"x":521,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Dark/LeavesTeleport":{"frame":{"x":651,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Light/LeavesActive":{"frame":{"x":781,"y":645,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Light/LeavesExit":{"frame":{"x":1,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Light/LeavesRemoval":{"frame":{"x":131,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Light/LeavesSafe":{"frame":{"x":261,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Light/LeavesTeleport":{"frame":{"x":391,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Dark/NormalActive":{"frame":{"x":521,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Dark/NormalExit":{"frame":{"x":651,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Dark/NormalRemoval":{"frame":{"x":781,"y":775,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Dark/NormalSafe":{"frame":{"x":1,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Dark/NormalTeleport":{"frame":{"x":131,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Light/NormalActive":{"frame":{"x":261,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Light/NormalExit":{"frame":{"x":391,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Light/NormalRemoval":{"frame":{"x":521,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Light/NormalSafe":{"frame":{"x":651,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/NoTiles/Light/NormalTeleport":{"frame":{"x":781,"y":905,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Dark/NormalActive":{"frame":{"x":1029,"y":1,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Dark/NormalExit":{"frame":{"x":1029,"y":131,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Dark/NormalRemoval":{"frame":{"x":1029,"y":261,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Dark/NormalSafe":{"frame":{"x":1029,"y":391,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Dark/NormalTeleport":{"frame":{"x":911,"y":521,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Light/NormalActive":{"frame":{"x":911,"y":651,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Light/NormalExit":{"frame":{"x":911,"y":781,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Light/NormalRemoval":{"frame":{"x":1,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Light/NormalSafe":{"frame":{"x":131,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/Tiles/Light/NormalTeleport":{"frame":{"x":261,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/WoodenActive":{"frame":{"x":391,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/WoodenExit":{"frame":{"x":521,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/WoodenRemoval":{"frame":{"x":651,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/WoodenSafe":{"frame":{"x":781,"y":1035,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"maps/WoodenTeleport":{"frame":{"x":911,"y":911,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb":{"frame":{"x":1041,"y":521,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_1":{"frame":{"x":1041,"y":623,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_2":{"frame":{"x":1041,"y":725,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_3":{"frame":{"x":1041,"y":827,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_4":{"frame":{"x":1041,"y":929,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_5":{"frame":{"x":1041,"y":1031,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_6":{"frame":{"x":911,"y":1041,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"abilities/mutatiorb_7":{"frame":{"x":1159,"y":1,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"cosmetics/orbit-ring":{"frame":{"x":1159,"y":103,"w":100,"h":100},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":100,"h":100},"sourceSize":{"w":100,"h":100},"pivot":{"x":0.5,"y":0.5}},"entities/vengeance_projectile":{"frame":{"x":1159,"y":205,"w":67,"h":67},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":67,"h":67},"sourceSize":{"w":67,"h":67},"pivot":{"x":0.5,"y":0.5}},"buttons/minimap-mode":{"frame":{"x":1159,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64},"pivot":{"x":0.5,"y":0.5}},"cosmetics/snowglobe-1":{"frame":{"x":1159,"y":340,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64},"pivot":{"x":0.5,"y":0.5}},"cosmetics/snowglobe-2":{"frame":{"x":1159,"y":406,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64},"pivot":{"x":0.5,"y":0.5}},"cosmetics/snowglobe-3":{"frame":{"x":1159,"y":472,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64},"pivot":{"x":0.5,"y":0.5}},"abilities/atonement":{"frame":{"x":1143,"y":538,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/attract":{"frame":{"x":1195,"y":538,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/backtrack":{"frame":{"x":1143,"y":590,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/bandages":{"frame":{"x":1195,"y":590,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/barrier":{"frame":{"x":1143,"y":642,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/black_hole":{"frame":{"x":1195,"y":642,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/blocking":{"frame":{"x":1143,"y":694,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/bloom":{"frame":{"x":1195,"y":694,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/charge":{"frame":{"x":1143,"y":746,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/corrosive_sniper":{"frame":{"x":1195,"y":746,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/crumble":{"frame":{"x":1143,"y":798,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/dash":{"frame":{"x":1195,"y":798,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/decay":{"frame":{"x":1143,"y":850,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/default":{"frame":{"x":1195,"y":850,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/depart":{"frame":{"x":1143,"y":902,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/disabling":{"frame":{"x":1195,"y":902,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/distort":{"frame":{"x":1143,"y":954,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/draining":{"frame":{"x":1195,"y":954,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/earthquake":{"frame":{"x":1143,"y":1006,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/echo":{"frame":{"x":1195,"y":1006,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/ember":{"frame":{"x":1143,"y":1058,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/energize":{"frame":{"x":1143,"y":1110,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/enlarging":{"frame":{"x":1195,"y":1058,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/experience_drain":{"frame":{"x":1195,"y":1110,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/experiorb":{"frame":{"x":1,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/flashlight":{"frame":{"x":53,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/flow":{"frame":{"x":105,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/flower":{"frame":{"x":157,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/force_a":{"frame":{"x":209,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/force_b":{"frame":{"x":261,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/freezing":{"frame":{"x":313,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/frost_giant":{"frame":{"x":365,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/fusion":{"frame":{"x":417,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/grave":{"frame":{"x":469,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/gravekeeper":{"frame":{"x":521,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/gravity":{"frame":{"x":573,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/harden":{"frame":{"x":625,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/ice_sniper":{"frame":{"x":677,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/ictos":{"frame":{"x":729,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/incinerate":{"frame":{"x":781,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/lantern":{"frame":{"x":833,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/latch":{"frame":{"x":885,"y":1165,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/lava":{"frame":{"x":937,"y":1162,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/lead_sniper":{"frame":{"x":989,"y":1162,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/lightning":{"frame":{"x":1041,"y":1162,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/magnetic_nullification":{"frame":{"x":1093,"y":1162,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/magnetic_reduction":{"frame":{"x":1145,"y":1162,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/magnetism_down":{"frame":{"x":1197,"y":1162,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/magnetism_up":{"frame":{"x":1,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/magnetize":{"frame":{"x":53,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/minimize":{"frame":{"x":105,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/mortar":{"frame":{"x":157,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/mystery_keycard":{"frame":{"x":209,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/negative_sniper":{"frame":{"x":261,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/network_control":{"frame":{"x":313,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/night":{"frame":{"x":365,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/obscure":{"frame":{"x":417,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/orbit":{"frame":{"x":469,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/paralysis":{"frame":{"x":521,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/petrify":{"frame":{"x":573,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/poison_sniper":{"frame":{"x":625,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/pollinate":{"frame":{"x":677,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/positive_sniper":{"frame":{"x":729,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/prediction_sniper":{"frame":{"x":781,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/quicksand":{"frame":{"x":833,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/radar":{"frame":{"x":885,"y":1217,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/radiating_bullets":{"frame":{"x":937,"y":1214,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/radioactive_gloop":{"frame":{"x":989,"y":1214,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/reanimate":{"frame":{"x":1041,"y":1214,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/reduce":{"frame":{"x":1093,"y":1214,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/reducing":{"frame":{"x":1145,"y":1214,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/regen_sniper":{"frame":{"x":1197,"y":1214,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/repel":{"frame":{"x":1261,"y":1,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/repelling":{"frame":{"x":1261,"y":53,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/resurrection":{"frame":{"x":1261,"y":105,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/reverse":{"frame":{"x":1261,"y":157,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/rewind":{"frame":{"x":1249,"y":209,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/robo_scanner":{"frame":{"x":1249,"y":261,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/shadow":{"frame":{"x":1249,"y":313,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/shatter":{"frame":{"x":1249,"y":365,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/shield":{"frame":{"x":1249,"y":417,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/shift":{"frame":{"x":1249,"y":469,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/shriek":{"frame":{"x":1249,"y":521,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/slippery":{"frame":{"x":1249,"y":573,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/slowing":{"frame":{"x":1249,"y":625,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/sniper":{"frame":{"x":1249,"y":677,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/snowball":{"frame":{"x":1249,"y":729,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/spark":{"frame":{"x":1249,"y":781,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/speed_sniper":{"frame":{"x":1249,"y":833,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/sticky_coat":{"frame":{"x":1249,"y":885,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/stomp":{"frame":{"x":1249,"y":937,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/stream":{"frame":{"x":1249,"y":989,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/sugar_rush":{"frame":{"x":1249,"y":1041,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/supernova":{"frame":{"x":1249,"y":1093,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/sweet_tooth":{"frame":{"x":1249,"y":1145,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/toxic":{"frame":{"x":1249,"y":1197,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/tree":{"frame":{"x":1,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/undead_infection":{"frame":{"x":53,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/vengeance":{"frame":{"x":105,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/vigor":{"frame":{"x":157,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/warp":{"frame":{"x":209,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/wildfire":{"frame":{"x":261,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/wind_sniper":{"frame":{"x":313,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"abilities/wormhole":{"frame":{"x":365,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/100-gem":{"frame":{"x":417,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/1000-gem":{"frame":{"x":469,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/10000-gem":{"frame":{"x":521,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/1500-gem":{"frame":{"x":573,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/2000-gem":{"frame":{"x":625,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/250-gem":{"frame":{"x":677,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/2500-gem":{"frame":{"x":729,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/3500-gem":{"frame":{"x":781,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/50-gem":{"frame":{"x":833,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/500-gem":{"frame":{"x":885,"y":1269,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/5000-gem":{"frame":{"x":937,"y":1266,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/750-gem":{"frame":{"x":989,"y":1266,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"accessories/7500-gem":{"frame":{"x":1041,"y":1266,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/autumn-wreath":{"frame":{"x":1093,"y":1266,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/blue-flames-1":{"frame":{"x":1145,"y":1266,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/blue-flames-2":{"frame":{"x":1197,"y":1266,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/blue-flames-3":{"frame":{"x":1249,"y":1249,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/blue-flames-4":{"frame":{"x":1313,"y":1,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/blue-santa-hat":{"frame":{"x":1313,"y":53,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/bronze-crown":{"frame":{"x":1313,"y":105,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/broomstick-reversed":{"frame":{"x":1313,"y":157,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/broomstick":{"frame":{"x":1301,"y":209,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/clouds":{"frame":{"x":1301,"y":261,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/doughnut":{"frame":{"x":1301,"y":313,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/flames-1":{"frame":{"x":1301,"y":365,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/flames-2":{"frame":{"x":1301,"y":417,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/flames-3":{"frame":{"x":1301,"y":469,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/flames-4":{"frame":{"x":1301,"y":521,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/flower-headband":{"frame":{"x":1301,"y":573,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/fruit-bowl":{"frame":{"x":1301,"y":625,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/gold-crown":{"frame":{"x":1301,"y":677,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/gold-wreath":{"frame":{"x":1301,"y":729,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/halo":{"frame":{"x":1301,"y":781,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/pirate-hat":{"frame":{"x":1301,"y":833,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/rose-wreath":{"frame":{"x":1301,"y":885,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/santa-hat":{"frame":{"x":1301,"y":937,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/silver-crown":{"frame":{"x":1301,"y":989,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/spring-wreath":{"frame":{"x":1301,"y":1041,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/stardust":{"frame":{"x":1301,"y":1093,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/stars":{"frame":{"x":1301,"y":1145,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sticky-coat":{"frame":{"x":1301,"y":1197,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/storm-clouds-1":{"frame":{"x":1301,"y":1249,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/storm-clouds-2":{"frame":{"x":1,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/storm-clouds-3":{"frame":{"x":53,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/storm-clouds-4":{"frame":{"x":105,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/summer-olympics-wreath-2":{"frame":{"x":157,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/summer-olympics-wreath":{"frame":{"x":209,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/summer-wreath":{"frame":{"x":261,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-1":{"frame":{"x":313,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-10":{"frame":{"x":365,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-11":{"frame":{"x":417,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-12":{"frame":{"x":469,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-13":{"frame":{"x":521,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-14":{"frame":{"x":573,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-15":{"frame":{"x":625,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-2":{"frame":{"x":677,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-3":{"frame":{"x":729,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-4":{"frame":{"x":781,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-5":{"frame":{"x":833,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-6":{"frame":{"x":885,"y":1321,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-7":{"frame":{"x":937,"y":1318,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-8":{"frame":{"x":989,"y":1318,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/sunglasses-9":{"frame":{"x":1041,"y":1318,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/toxic-coat":{"frame":{"x":1093,"y":1318,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/tuxedo":{"frame":{"x":1145,"y":1318,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/winter-olympics-wreath":{"frame":{"x":1197,"y":1318,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/winter-wreath":{"frame":{"x":1249,"y":1301,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/witch-hat-reversed":{"frame":{"x":1301,"y":1301,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/witch-hat":{"frame":{"x":1365,"y":1,"w":50,"h":50},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":50,"h":50},"sourceSize":{"w":50,"h":50},"pivot":{"x":0.5,"y":0.5}},"cosmetics/bronze-jewels":{"frame":{"x":1365,"y":53,"w":48,"h":48},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":48,"h":48},"sourceSize":{"w":48,"h":48},"pivot":{"x":0.5,"y":0.5}},"cosmetics/gold-jewels":{"frame":{"x":1365,"y":103,"w":48,"h":48},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":48,"h":48},"sourceSize":{"w":48,"h":48},"pivot":{"x":0.5,"y":0.5}},"cosmetics/silver-jewels":{"frame":{"x":1365,"y":153,"w":48,"h":48},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":48,"h":48},"sourceSize":{"w":48,"h":48},"pivot":{"x":0.5,"y":0.5}},"entities/torch-1":{"frame":{"x":1228,"y":205,"w":13,"h":36},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":13,"h":36},"sourceSize":{"w":13,"h":36},"pivot":{"x":0.5,"y":0.5}},"entities/torch-2":{"frame":{"x":1228,"y":243,"w":13,"h":36},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":13,"h":36},"sourceSize":{"w":13,"h":36},"pivot":{"x":0.5,"y":0.5}},"entities/torch-3":{"frame":{"x":1225,"y":281,"w":13,"h":36},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":13,"h":36},"sourceSize":{"w":13,"h":36},"pivot":{"x":0.5,"y":0.5}},"entities/torch-4":{"frame":{"x":1225,"y":319,"w":13,"h":36},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":13,"h":36},"sourceSize":{"w":13,"h":36},"pivot":{"x":0.5,"y":0.5}},"entities/torch-5":{"frame":{"x":1225,"y":357,"w":13,"h":36},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":13,"h":36},"sourceSize":{"w":13,"h":36},"pivot":{"x":0.5,"y":0.5}},"entities/torch-6":{"frame":{"x":1225,"y":395,"w":13,"h":36},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":13,"h":36},"sourceSize":{"w":13,"h":36},"pivot":{"x":0.5,"y":0.5}},"entities/sour_candy_item":{"frame":{"x":1365,"y":203,"w":35,"h":35},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":35,"h":35},"sourceSize":{"w":35,"h":35},"pivot":{"x":0.5,"y":0.5}},"entities/sweet_tooth_item":{"frame":{"x":1353,"y":240,"w":35,"h":35},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":35,"h":35},"sourceSize":{"w":35,"h":35},"pivot":{"x":0.5,"y":0.5}},"entities/flashlight_item":{"frame":{"x":911,"y":1143,"w":32,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":16},"sourceSize":{"w":32,"h":16},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item":{"frame":{"x":1143,"y":521,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_1":{"frame":{"x":945,"y":1143,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_2":{"frame":{"x":961,"y":1143,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_3":{"frame":{"x":977,"y":1143,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_4":{"frame":{"x":993,"y":1143,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_5":{"frame":{"x":1009,"y":1143,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_6":{"frame":{"x":1025,"y":1041,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}},"entities/experiorb_item_7":{"frame":{"x":1025,"y":1057,"w":14,"h":14},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":14,"h":14},"sourceSize":{"w":14,"h":14},"pivot":{"x":0.5,"y":0.5}}},"meta":{"app":"http://github.com/odrick/free-tex-packer-core","version":"0.3.4","image":"texture.png","format":"RGBA8888","size":{"w":1416,"h":1372},"scale":1}}');
const $621fe074d84a8c6e$exports = JSON.parse('{"cosmetics":{"sunglasses":{"startRandom":true,"frames":[{"path":"sunglasses-1","duration":1800},{"path":"sunglasses-2","duration":30},{"path":"sunglasses-3","duration":30},{"path":"sunglasses-4","duration":30},{"path":"sunglasses-5","duration":30},{"path":"sunglasses-6","duration":30},{"path":"sunglasses-7","duration":30},{"path":"sunglasses-8","duration":30},{"path":"sunglasses-9","duration":30},{"path":"sunglasses-10","duration":30},{"path":"sunglasses-11","duration":30},{"path":"sunglasses-12","duration":30},{"path":"sunglasses-13","duration":30},{"path":"sunglasses-14","duration":30},{"path":"sunglasses-15","duration":30}]},"storm-clouds":{"startRandom":true,"frames":[{"path":"storm-clouds-1","duration":1800},{"path":"storm-clouds-2","duration":90},{"path":"storm-clouds-3","duration":90},{"path":"storm-clouds-4","duration":90},{"path":"storm-clouds-1","duration":3600},{"path":"storm-clouds-2","duration":150},{"path":"storm-clouds-1","duration":2400},{"path":"storm-clouds-4","duration":90},{"path":"storm-clouds-3","duration":90},{"path":"storm-clouds-2","duration":90},{"path":"storm-clouds-1","duration":1350},{"path":"storm-clouds-4","duration":150}]},"flames":{"startRandom":true,"frames":[{"path":"flames-1","duration":150},{"path":"flames-2","duration":150},{"path":"flames-3","duration":150},{"path":"flames-4","duration":150}]},"blue-flames":{"startRandom":true,"frames":[{"path":"blue-flames-1","duration":150},{"path":"blue-flames-2","duration":150},{"path":"blue-flames-3","duration":150},{"path":"blue-flames-4","duration":150}]},"snowglobe":{"startRandom":false,"frames":[{"path":"snowglobe-1","duration":90},{"path":"snowglobe-2","duration":90},{"path":"snowglobe-3","duration":90}]}},"entities":{"torch":{"startRandom":true,"frames":[{"path":"torch-1","duration":120},{"path":"torch-2","duration":120},{"path":"torch-3","duration":120},{"path":"torch-4","duration":120},{"path":"torch-5","duration":120},{"path":"torch-6","duration":120}]}}}');
$31e8cfefa331e399$var$loadPackedTexture($8ffc30d9a3afd0d9$exports, 0);
for (const [e,t] of Object.entries($621fe074d84a8c6e$exports))
	for (const [a,r] of Object.entries(t))
		$31e8cfefa331e399$var$images[e + "/" + a] = new $31e8cfefa331e399$export$9d5734c725768403(e,r);
