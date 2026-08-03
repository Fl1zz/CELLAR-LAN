const obj = {
    "item":"cam",
    "flashlight_ammo":1,
    "animations":false,
    "animTime":0
}

const blocks = [
    ["cellar:key", 0, 1, 50, 1],
    ["cellar:fence", 4, 0, 50, -2],
    ["cellar:fuse", 0, 0, 41, 7],
    ["cellar:portal", 0, 0, 50, -3]
]

const states = [
    "game",
    "safezone",
    "cut"
]

function main(c) {
    var ui = mappet.createUI(c, "handler").closable(false)
    var all_pl = c.getServer().getAllPlayers()
    ui.current.keybind(57, "space", "space")

    for (var u in all_pl){
        all_pl[u].setGameMode(2)
        all_pl[u].getHand(0).setMorph(mappet.createMorph("{Pose:{Pose:{fuseR:{},light:{G:0.85f},Right_Arm:{},photo:{},main_Left:{},main_Right:{},blink:{G:1.0f},camera:{},flashlight:{},Left_Arm:{},fuseL:{}}},Skin:\"c.s:cellar_assets/chapter1/models/player_arm/skins/texture.png\",Name:\"chameleon.cellar_assets/chapter1/models/player_arm\"}"))
    }

    for (var i in blocks) {
        c.server.getWorld(0).setBlock(mappet.createBlockState(blocks[i][0], blocks[i][1]), blocks[i][2], blocks[i][3], blocks[i][4])
    }

    for each (var e in states) {
        c.server.states.setNumber(e, 1)
    }

    var entities = c.server.getEntities("@e[mpid=bonnie]")
    if (entities.length != 0) {
        for each (var bonnie in entities) {
            bonnie.remove()
        }
    }

    c.server.states.reset("box")
    c.server.states.reset("doors")
    
    c.server.executeScript("game/spawns/doors.js")
    
    c.server.executeScript("game/spawns/fuseRand.js")
    c.server.states.setNumber("doors", 8)
    
    if (c.server.states.has("box")) {
        var boxData = JSON.parse(c.server.states.getString("box"))
       // c.send("§6[DEBUG] box прочитан: " + JSON.stringify(boxData))
    } else {
        c.send("")
    }

    c.server.states.setNumber("hp", 2)
    c.server.states.reset("respawnTime")

    for (var a in all_pl){
        var all = all_pl[a]
        all.openUI(ui)
        all.setupHUD("blackOut_getup")
        all.setupHUD("skipCut")
        all.playCutScene("getup")
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.cutscenes.getup", 0.6, 1.0)
    }

    c.scheduleScript(257, function () {
        if (c.server.states.has("cut")) {
            for (var i in all_pl){
                var pl = all_pl[i]
                pl.closeHUD("skipCut")
                pl.closeUI()
                pl.setPosition(0.5, 41.3, 0.5)
                pl.setRotations(0, 0, 0)
                pl.setGameMode(2)
                pl.getHand(0).playAnimation("camera_pickup")
                pl.playStaticSound("mp.sounds:cellar_sounds.chapter1.items.cam_in", 0.6, 1.0)
                pl.states.setString("hand", JSON.stringify(obj))

                if (c.server.states.has("open")) {
                    c.server.states.reset("open")
                    c.scheduleScript(10, function () {
                        pl.executeScript("player/ui/tutorial.js")
                        pl.setGameMode(2)
                    })
                } else {
                    pl.setupHUD("tab")
                    pl.setGameMode(2)
                }
            }
        }
    })
}

function handler(c) {
    var cntxt = c.player.UIContext

    if (cntxt.hotkey == "space" && c.server.states.has("cut")) {
        var all_pl = c.getServer().getAllPlayers()
        for (var i in all_pl) {
            var all = all_pl[i]
            all.stopAllSounds()
            all.stopCutScene("getup")
            all.closeUI()
            all.setPosition(0.5, 41.3, 0.5)
            all.setRotations(0, 0, 0)
            all.setGameMode(2)
            all.getHand(0).playAnimation("camera_pickup")
            all.playStaticSound("mp.sounds:cellar_sounds.chapter1.items.cam_in", 0.6, 1.0)
            all.closeHUD("skipCut")
            all.states.setString("hand", JSON.stringify(obj))
        }

        c.server.states.reset("cut")
        if (c.server.states.has("open")) {
            c.server.states.reset("open")
            c.scheduleScript(10, function () {
                for (var a in all_pl){
                    all_pl[a].executeScript("player/ui/tutorial.js")
                    all_pl[a].setGameMode(2)
                }
            })
        } else {
            for (var p in all_pl){
                all_pl[p].setupHUD("tab")
                all_pl[p].setGameMode(2)
            }
        }
    }
}