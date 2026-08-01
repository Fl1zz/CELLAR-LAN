const actionsFlahlight = {
    "idle":"idle_flashlight",
    "running":"running_flashlight",
    "sprinting":"sprinting_flashlight",
    "swipe":"swipe_flashlight",
}

function animTime(c) {
    if (c.player.states.has("hand")) {
        var json = JSON.parse(c.player.states.getString("hand"))
        
        json.animations == true && json.animTime > 0 ? json.animTime += -1 : json.animations == true && json.animTime <= 0 ? json.animations = false : null
        c.player.states.setString("hand", JSON.stringify(json))
    }
}

function RMB(c) {
    var nbt = mappet.toNBT(c.player.getHand(0).morph)
    var compound = mappet.createCompound(nbt)
    var ppos = c.player.getPosition()
    
    if (c.player.states.has("hand") && c.getValue("button") == 1 && c.getValue("buttonState") == true) {
        var json = JSON.parse(c.player.states.getString("hand"))
        if (json.animations == false) {
            switch (json.item) {
                case "cam":
                    if (json.flashlight_ammo == 0) {
                        c.player.getHand(0).playAnimation("flashlight_nofuse")
                        c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.flashlight_fail", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
                        json.animations = true
                        json.animTime = 60
                        c.player.states.setString("hand", JSON.stringify(json))
                        return
                    }
                    json.item = "flashlight"
                    c.player.states.setString("hand", JSON.stringify(json))
                    compound.addCompound("Actions")
                    for (var i in actionsFlahlight) {
                        compound.get("Actions").setString(i, actionsFlahlight[i])
                    }
                    c.player.getHand(0).setMorph(mappet.createMorph(compound))
                    c.player.getHand(0).playAnimation("flashlight_swipe_in")
                    c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.flashlight_in", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
                break
                case "flashlight":
                    json.item = "cam"
                    c.player.states.setString("hand", JSON.stringify(json))

                    compound.remove("Actions")
                    c.player.getHand(0).setMorph(mappet.createMorph(compound))
                    c.player.getHand(0).playAnimation("flashlight_swipe_out")
                    c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.flashlight_out", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
                break
            }
            c.player.states.setString("hand", JSON.stringify(json))
        }
    }
}

const bodys = [
    "cellar:body_floor",
    "cellar:body_floor2",
    "cellar:body_floor3",
    "cellar:body_wall",
    "cellar:body_wall_2",
    "cellar:body_ceiling",
    "cellar:body_ceiling2",
    "cellar:body_ceiling3"
]

function LMB(c) {
    var nbt = mappet.toNBT(c.player.getHand(0).morph)
    var compound = mappet.createCompound(nbt)
    var bonnie = c.server.getEntities("@e[mpid=bonnie]")
    var raycast = c.player.rayTrace(4)
    var ppos = c.player.getPosition()
    
    if (c.player.states.has("hand") && c.server.states.has("box") && c.getValue("button") == 0 && c.getValue("buttonState") == true) {
        var json = JSON.parse(c.player.states.getString("hand"))
        var stat = JSON.parse(c.server.states.getString("box"))
        
        if (json.animations == false) {
            switch (json.item) {
                case "cam":
                    json.animations = true
                    json.animTime = 100
                    c.player.states.setString("hand", JSON.stringify(json))
                    
                    c.player.getHand(0).playAnimation("camera_flash_black")
                    c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.cam_use", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
                    
                    if (raycast.isBlock()) {
                        var block = c.server.getWorld(0).getBlock(raycast.block.x, raycast.block.y, raycast.block.z)
                        if (block.blockId == "cellar:door_ash_real") {
                            c.player.getHand(0).playAnimation("camera_flash_good")
                        } else if (block.blockId == "cellar:door_ash_mimic") {
                            c.player.getHand(0).playAnimation("camera_flash_bad")
                        }
                    }
                    
                    for (var i in stat) {
                        var box = mappet.box(stat[i][0], stat[i][1], stat[i][2], stat[i][3], stat[i][4], stat[i][5])
                        
                        if (box.contains(c.player.position)) {
                            c.player.getHand(0).playAnimation("camera_flash_usopshi")
                            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.ghosts", 0.8, mappet.random(0.9, 1.0))
                            c.scheduleScript(10, function () {
                                c.player.setupHUD("cam_use_corpse")
                                for (var e in bodys) {
                                    c.server.getWorld(0).replaceBlocks(
                                        bodys[e],
                                        "minecraft:air",
                                        mappet.vector3(stat[i][0], stat[i][1], stat[i][2]),
                                        mappet.vector3(stat[i][3], stat[i][4], stat[i][5])
                                    )
                                }
                                stat.splice(i, 1)
                                c.server.states.setString("box", JSON.stringify(stat))
                                c.server.states.add("doors", -1)
                                if (c.server.states.getNumber("doors") == 0) {
                                    c.player.executeScript("game/cutscenes/last_door.js")
                                    c.server.states.reset("respawnTime")
                                    var entities = c.server.getEntities("@e[mpid=bonnie]")
                                    if (entities.length != 0) {
                                        var bonnie = entities[0]
                                        bonnie.remove()
                                    }
                                    return
                                }
                            })
                            return
                        }
                    }
                    
                    for (var i in bonnie) {
                        setNoiseSpot(c.player.position, bonnie[i])
                    }
                break
                case "flashlight":
                    json.item = "cam"
                    json.flashlight_ammo += -1
                    json.animations = true
                    json.animTime = 15
                    
                    if (json.flashlight_ammo == 1) c.server.executeScript("game/spawns/fuseRand.js")
                    
                    compound.remove("Actions")
                    c.player.getHand(0).setMorph(mappet.createMorph(compound))
                    c.player.getHand(0).playAnimation("flashlight_flash")
                    c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.flashlight_use", ppos.x, ppos.y, ppos.z, 1.0, mappet.random(0.9, 1.1))
                    
                    c.player.applyPotion(mappet.getPotion("speed"), 2, 6, false)
                    c.player.getShader().setShaders(0, 0, 0, 0.1, 1, 0.0, 2.5, 2.0, true)
                    c.scheduleScript(2, function () {
                        c.player.getShader().setShaders(100, 0, 0, 0.1, 15, 1.0, 2.5, 2.0, false)
                        c.player.applyPotion(mappet.getPotion("slowness"), 2, 6, false)
                    })
                    
                    for (var i in bonnie) {
                        if (c.player.isObservable(bonnie[i]) && bonnie[i].isEntityInRadius(c.player, 8)) {
                            c.server.executeScript("AI/bon.js", "burned")
                        }
                    }
                    
                    if (raycast.isBlock()) {
                        var block = c.server.getWorld(0).getBlock(raycast.block.x, raycast.block.y, raycast.block.z)
                        if (block.blockId == "cellar:door_ash_real") {
                            c.server.getWorld(0).setBlock(mappet.createBlockState("cellar:door_ash", block.meta), raycast.block.x, raycast.block.y, raycast.block.z)
                            c.server.getWorld(0).displayMorph(mappet.createMorph("{Scheme:\"burned_door.particle\",Name:\"snowstorm\"}"), 40, raycast.block.x+0.5, raycast.block.y-0.5, raycast.block.z+0.5)
                            c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.misc.door_real"+Math.floor(mappet.random(1, 3))+"", raycast.block.x, raycast.block.y, raycast.block.z, 0.6, 1.8)
                            
                            if (c.server.states.has("safezone") && c.server.states.has("voice")) {
                                c.player.states.setString("hand", JSON.stringify(json))
                                var voice = JSON.parse(c.server.states.getString("voice"))
                                c.server.states.reset("safezone")
                                c.server.getWorld(0).spawnNpc("bonnie", -27, 41, 33)
                                if (!voice.where_am_i) return
                                voice.where_am_i = false
                                c.scheduleScript(100, function () {
                                    c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.where_am_i", 1.0, 1.0)
                                })
                                c.server.states.setString("voice", JSON.stringify(voice))
                            }
                        } else if (block.blockId == "cellar:door_ash_mimic") {
                            const stopVoiceSound = [
                                "mp.sounds:cellar_sounds.chapter1.voice.whats_happening",
                                "mp.sounds:cellar_sounds.chapter1.voice.what_are_you",
                                "mp.sounds:cellar_sounds.chapter1.voice.where_am_i",
                                "mp.sounds:cellar_sounds.chapter1.voice.where_am_i",
                            ]
                            for each (var i in stopVoiceSound) {
                                c.player.stopSound(i)
                            }
                            
                            c.server.getWorld(0).setBlock(mappet.createBlockState("cellar:door_ash_blocked", block.meta), raycast.block.x, raycast.block.y, raycast.block.z)
                            c.server.getWorld(0).displayMorph(mappet.createMorph("{Scheme:\"burned_door.particle\",Name:\"snowstorm\"}"), 40, raycast.block.x+0.5, raycast.block.y-0.5, raycast.block.z+0.5)
                            c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.misc.door_mimic"+Math.floor(mappet.random(1, 4))+"", raycast.block.x, raycast.block.y, raycast.block.z, 0.4, 1.0)

                            for (var i in all_pl){
                                all_pl[i].getHand(0).setMorph(mappet.createMorph("{Pose:{Pose:{fuseR:{},light:{G:0.85f},Right_Arm:{},photo:{},main_Left:{},main_Right:{},blink:{G:1.0f},camera:{},flashlight:{},Left_Arm:{},fuseL:{}}},Skin:\"c.s:cellar_assets/chapter1/models/player_arm/skins/texture_mimic.png\",Name:\"chameleon.cellar_assets/chapter1/models/player_arm\"}"))
                                all_pl[i].getHand(0).playAnimation("flashlight_flash_mimic")
                            }

                            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.damage", 1.0, 1.0)
                            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.hurt"+Math.floor(mappet.random(1, 5))+"", 1.0, 1.0)
                            c.server.states.add("hp", -1)
                            json.animations = true
                            json.animTime = 50
                            if (c.server.states.getNumber("hp") == 0) {
                                c.player.executeScript("game/cutscenes/arms_infected.js")
                            }
                        } else if (block.blockId == "cellar:door_ash_blocked") {
                            c.player.stopAllSounds()
                            c.player.executeScript("AI/itCumming.js")
                            c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.misc.door_real"+Math.floor(mappet.random(1, 3))+"", raycast.block.x, raycast.block.y, raycast.block.z, 0.6, 1.8)
                            c.server.getWorld(0).displayMorph(mappet.createMorph("{Scheme:\"burned_door.particle\",Name:\"snowstorm\"}"), 40, raycast.block.x+0.5, raycast.block.y-0.5, raycast.block.z+0.5)
                            return
                        }
                    }
                    
                    if (json.flashlight_ammo == 0 && c.server.states.has("safezone")) json.flashlight_ammo = 1
                break
            }
            c.player.states.setString("hand", JSON.stringify(json))
        }
    }
}

function E(c) {
    var raycast = c.player.rayTrace(4)
    var ppos = c.player.getPosition()
    
    if (c.player.states.has("hand") && raycast.isBlock() && c.getValue("keyCode") == 18 && c.getValue("keyState") == true) {
        var json = JSON.parse(c.player.states.getString("hand"))
        var block = c.server.getWorld(0).getBlock(raycast.block.x, raycast.block.y, raycast.block.z)
        
        if (json.animations == false && json.item == "cam" && block.blockId == "cellar:fuse") {
            c.server.getWorld(0).setBlock(mappet.createBlockState("minecraft:air", 0), raycast.block.x, raycast.block.y, raycast.block.z)
            
            json.animations = true
            json.animTime = 50
            json.flashlight_ammo = 2
            
            c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.reload_flashlight", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
            c.player.getHand(0).playAnimation("flashlight_reload")
        }
        if (json.animations == false && block.blockId == "cellar:fence" && c.server.states.getNumber("doors") > 0) {
            c.player.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.fence", 1.0, mappet.random(0.8, 1.2))
        }
        if (json.animations == false && json.item == "empty") {
            switch (block.blockId) {
                case "cellar:key":
                    c.server.getWorld(0).setBlock(mappet.createBlockState("minecraft:air", 0), raycast.block.x, raycast.block.y, raycast.block.z)
                    c.server.states.reset("doors")
                    
                    json.animations = true
                    json.animTime = 10
                    
                    c.player.getHand(0).playAnimation("keys_pickup")
                    c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.keys_pickup", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
                break
                case "cellar:fence":
                    if (!c.server.states.has("doors")) {
                        json.animations = true
                        json.animTime = 30
                        
                        c.player.getHand(0).playAnimation("keys_open_door")
                        c.server.getWorld(0).playSound("mp.sounds:cellar_sounds.chapter1.items.keys_use", ppos.x, ppos.y, ppos.z, 1.0, 1.0)
                        c.player.lockRotation(c.player.rotations.x, c.player.rotations.y, c.player.rotations.z)
                        c.player.lockPosition(c.player.position.x, c.player.position.y, c.player.position.z)
                        c.scheduleScript(30, function () {
                            c.player.unlockPosition()
                            c.player.unlockRotation()
                            c.player.executeScript("game/cutscenes/end.js")
                        })
                    }
                break
            }
        }
        c.player.states.setString("hand", JSON.stringify(json))
    }
}