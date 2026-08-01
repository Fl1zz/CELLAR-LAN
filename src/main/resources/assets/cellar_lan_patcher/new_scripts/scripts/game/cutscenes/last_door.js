const sounds = [
    "cellar:ost_memory",
    "cellar:ost_youlldie",
    "mp.sounds:cellar_sounds.chapter1.items.cam_use"
]

function main(c) {
    var ui = mappet.createUI().closable(false)
    var all_pl = c.server.getAllPlayers()

    for (var i in all_pl){
        var all = all_pl[i]
        if (c.player.states.has("hand")) {
            var json = JSON.parse(c.player.states.getString("hand"))
            json.item = "empty"
            all.states.setString("hand", JSON.stringify(json))
        }

        c.scheduleScript(5, function () {
            all.closeHUD("cam_use_corpse")
            all.setupHUD("blackOut_lastDoor")
            for each (var i in sounds) {
                all.stopSound(i)
            }
        })
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.last_door", 1.0, 1.0)
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.cutscenes.last_door", 1.0, 1.0)
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.ost.neardeath", 0.8, 1.0)
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.ost.rightnow_loop")
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.voice.scary_breath")
        all.getHand(0).setMorph(mappet.createMorph("{Actions:{running:\"empty\",sprinting:\"empty\",idle:\"empty\"},Skin:\"c.s:cellar_assets/chapter1/models/player_arm/skins/texture.png\",Name:\"chameleon.cellar_assets/chapter1/models/player_arm\"}"))
        all.openUI(ui)
        all.setGameMode(3)
        all.playCutScene("last_door")
        c.scheduleScript(162, function () {
            for (var p in all_pl){
                all_pl[p].closeUI()
            }
            c.scheduleScript(10, function () {
                for (var o in all_pl){

                    all_pl[o].setPosition(1.5, 49.3, 18.5)
                    all_pl[o].setRotations(0, 90, 0)
                    all_pl[o].setGameMode(2)
                    all_pl[o].playStaticSound("cellar:ost_comecloser", 0.3, 1.0)
                }
                c.scheduleScript(100, function () {
                    for (var a in all_pl){
                        all_pl[a].playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.room_question", 1.0, 1.0)
                    }
                })
            })
        })
    }
}