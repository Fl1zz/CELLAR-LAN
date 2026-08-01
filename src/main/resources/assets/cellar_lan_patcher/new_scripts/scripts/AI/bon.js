var Path = [
    [-6, 41, 8],
    [20, 41, 4],
    [19, 41, 20],
    [6, 41, 30],
    [-5, 41, 28],
    [-16, 41, 24],
    [-10, 41, 2],
    [-22, 41, -11],
    [-31, 41, 6],
    [-18, 41, 14],
    [-27, 41, 28],
    [-18, 41, 39]
]

function randomPath() {
    var random = Math.floor(mappet.random(0, Path.length))
    return mappet.vector(Path[random][0], Path[random][1], Path[random][2])
}
function patrols(c) {
    if (c.subject.getTarget() != null) return;
    var pos = randomPath();
    c.subject.states.setNumber("standing", 0);
    c.subject.setSprinting(false);
    c.subject.states.setString("noise", false);
    c.subject.states.setNumber("noiseTimer", 0);
    c.subject.setPatrolPoint(0, pos.x, pos.y, pos.z, trigger("AI/bon.js", "patrols"));  
}
function trigger(Name1, Name2) {
    var triggerFactory = mappet.getTriggerFactory();
    var trigger = triggerFactory.createTrigger();
    var script = triggerFactory.createScriptTriggerBlock();
    script.setString(Name1)
    script.setFunction(Name2)
    trigger.add(script)
    return trigger;
}
function standing(c){
    var npc = c.subject;
    if (!npc.isWalking() && npc.states.getNumber("standing") < 20) {
        npc.states.add("standing", 1);
        if (npc.states.getNumber("standing") >= 20) {
            patrols(c);
        }
    }
}
function amb(c) {
    var npc = c.subject
    if (npc.getTarget() == null) {
        c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.bonnie.amb"+Math.floor(mappet.random(1, 7))+"", npc.position.x, npc.position.y, npc.position.z, 1.0, mappet.random(0.7, 1.3))
    }
}
function target(c) {
    var npc = c.subject;
    var players = c.server.allPlayers;
    if (npc.getTarget() == null) {
        players.forEach(function(player) {
            if (npc.isObservable(player) && player.getGameMode() != 3 && player.getGameMode() != 1) {
                npc.setSprinting(true);
                npc.setTarget(player);
                npc.states.setString("noise", false);
                player.applyPotion(mappet.getPotion("slowness"), 2, 15, false);
                player.playStaticSound("mp.sounds:cellar_sounds.misc.scare"+Math.floor(mappet.random(1, 4)), 2.0, 1.0)
                player.playSound("mp.sounds:cellar_sounds.chapter1.bonnie.target"+Math.floor(mappet.random(1, 5)), npc.position.x, npc.position.y, npc.position.z, 0.9, 1.0)
                player.getShader().setShaders(0, 0, 0, 0.2, 1, 0.0, 0.6, 2.0, true)
                player.playLoopSound("mp.sounds:cellar_sounds.chapter1.ost.rightnow_loop", 0.4, 1.0, 241)
                player.stopSound("cellar:ost_memory")
                player.stopSound("cellar:ost_youlldie")
                c.scheduleScript(2, function () {
                    player.getShader().setShaders(0, 0, 0, 0.2, 1, 0.0, 1.2, 2.0, true)
                    c.scheduleScript(1, function () {
                        player.getShader().setShaders(0, 0, 0, 0.2, 9, 0.0, 2.0, 1.0, false)
                    })
                })
                if (c.server.states.has("voice")) {
                    var voice = JSON.parse(c.server.states.getString("voice"))
                    if (!voice.what_are_you) {
                        player.playLoopSound("mp.sounds:cellar_sounds.chapter1.voice.scary_breath", 0.7, 1.0, 295)
                        return
                    }
                    voice.what_are_you = false
                    player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.what_are_you", 1.4, 1.0)
                    player.setupHUD("shift_tutorial")
                    c.server.states.setString("voice", JSON.stringify(voice))
                }
            }
        })
    }
}
function speedSetting(c) {
    c.subject.isSprinting() == true ? c.subject.setSpeed(0.13) : c.subject.setSpeed(0.1);
}
function footstep(c) {
    var npc = c.subject;
    if (npc.states.getNumber("footstep") < 50) {
        if (npc.isWalking() && !npc.isSprinting()) {
            npc.states.add("footstep", 4);
        } else if (npc.isWalking() && npc.isSprinting()) {
            npc.states.add("footstep", 10);
        }
        if (npc.states.getNumber("footstep") >= 50) {
            npc.states.setNumber("footstep", 0);
            c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.bonnie.step"+Math.floor(mappet.random(1, 7)), npc.position.x, npc.position.y, npc.position.z, 1.0, mappet.random(0.8, 1.2));
        }
    }
}
function damage(c){
    var object = c.object;
    if (object == null) return
    if (object.isNPC()) {
        if (object.getNpcId() == "bonnie") {
            c.cancel()
            object.remove()
            if (c.server.states.has("voice")) {
                var voice = JSON.parse(c.server.states.getString("voice"))
                voice.where_am_i = false
                voice.what_are_you = false
                voice.whats_happening = false
                c.server.states.setString("voice", JSON.stringify(voice))
            }
            if (c.player.isObservable(object)) {
                c.player.executeScript("game/cutscenes/death_front.js")
            } else {
                c.player.executeScript("game/cutscenes/death_back.js")
            }
        }
    }
}
function noise(c) {
    var players = c.server.allPlayers;
    var npc = c.subject;
    if (npc.states.getString("noise") != "true" && npc.getTarget() == null) {
        players.forEach(function(player) {
            if (player.entityData.getInt("noise") < 145) {
                if (player.isWalking() && player.isSprinting()) {
                    player.entityData.setInt("noise", player.entityData.getInt("noise")+15);
                }
                if (player.entityData.getInt("noise") >= 145) {
                    var pos = player.position;
                    player.entityData.setInt("noise", 0);
                    setNoiseSpot(pos, npc);
                }
            } else {
                var pos = player.position;
                player.entityData.setInt("noise", 0);
                setNoiseSpot(pos, npc);
            }
        })
    } else if (npc.states.getNumber("noiseTimer") < 500){
        npc.states.add("noiseTimer", 1);
        if (npc.states.getNumber("noiseTimer") >= 500) {
            npc.executeScript("AI/bon.js", "patrols");
        }
    }
}
function setNoiseSpot(pos, npc) {
    npc.states.setString("noise", "true");
    npc.states.setNumber("noiseTimer", 0);
    npc.setPatrolPoint(0, pos.x, pos.y, pos.z, trigger("AI/bon.js", "patrols"));
    npc.setSprinting(true);
}

const obj = {
    "respawn":true,
    "time":200
}
function burned(c) {
    var bonnie = c.server.getEntities("@e[mpid=bonnie]")[0]
    var player = c.server.getAllPlayers()[0]
    var burnedBonnie = c.server.getWorld(0).spawnNpc("bonnie", "burned", bonnie.position.x, bonnie.position.y, bonnie.position.z)
    burnedBonnie.setRotations(bonnie.rotations.x, 0, bonnie.rotations.z)
    bonnie.remove()
    c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.bonnie.burning"+Math.floor(mappet.random(1, 4))+"", bonnie.position.x, bonnie.position.y, bonnie.position.z, 0.8, 1.0)
    c.server.getWorld(0).displayMorph(mappet.createMorph("{Scheme:\"burned.particle\",Name:\"snowstorm\"}"), 20, bonnie.position.x, bonnie.position.y+1, bonnie.position.z)

    var all_pl = c.getServer().getAllPlayers()
    for (var i in all_pl){
        var all = all_pl[i]
        all.stopSound("mp.sounds:cellar_sounds.chapter1.voice.what_are_you")
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.ost.rightnow_loop")
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.voice.scary_breath")
    }

    player.playStaticSound("mp.sounds:cellar_sounds.chapter1.ost.rightnow_stop", 1.0, 1.0)
    player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.stop_scary_breath", 1.0, 1.0)
    
    if (c.server.states.has("respawnTime")) return
    c.server.states.setString("respawnTime", JSON.stringify(obj))
    if (c.server.states.has("voice")) {
        var voice = JSON.parse(c.server.states.getString("voice"))
        if (!voice.whats_happening) return
        voice.whats_happening = false
        voice.what_are_you = false
        c.scheduleScript(10, function () {
            player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.whats_happening", 1.4, 1.0)
        })
        c.server.states.setString("voice", JSON.stringify(voice))
    }
}
function respawnTime(c) {
    if (c.server.states.has("respawnTime")) {
        var json = JSON.parse(c.server.states.getString("respawnTime"))
        
        if (json.respawn && json.time > 0) {
            json.time--
        } else if (json.respawn && json.time <= 0){
            unBurned(c);
            c.server.states.reset("respawnTime")
            return
        }
        c.server.states.setString("respawnTime", JSON.stringify(json))
    }
}

const posSpawned = [
    [-21, 41, -12, 1.5, 38.5],
    [-32, 41, 7, 0.1, -145],
    [-18, 41, 38, 0.3, 136.2],
    [20, 41, 4, 0.8, 41.5],
    [6, 41, 28, 0.3, 207]
]
function unBurned(c) {
    var rand = Math.floor(mappet.random(0, posSpawned.length))
    if (c.server.states.has("respawnTime")) {
        for (var i in posSpawned) {
            c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.bonnie.unburned"+Math.floor(mappet.random(1, 4))+"", posSpawned[rand][0], posSpawned[rand][1], posSpawned[rand][2], 0.7, 1.0)
            c.scheduleScript(42, function () {
                var npc = c.server.getWorld(0).spawnNpc("bonnie", "unBurned", posSpawned[rand][0], posSpawned[rand][1], posSpawned[rand][2])
                npc.setRotations(posSpawned[rand][3], 0, posSpawned[rand][4])
            })
            return
        }
    }
}