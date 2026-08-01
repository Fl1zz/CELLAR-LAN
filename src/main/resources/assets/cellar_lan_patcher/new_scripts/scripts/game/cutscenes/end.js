function main(c) {
    var ui = mappet.createUI().closable(false)
    var all_pl = c.server.getAllPlayers()

    c.server.getWorld(0).setBlock(mappet.createBlockState("minecraft:air", 0), 0, 50, -3)
    c.server.getWorld(0).setBlock(mappet.createBlockState("cellar:fence_open", 4), 0, 50, -2)
    c.server.states.setNumber("game", 0)

    for (var i in all_pl){
        all_pl[i].stopAllSounds()
        all_pl[i].playStaticSound("mp.sounds:cellar_sounds.chapter1.cutscenes.end", 1.0, 1.0)
        all_pl[i].playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.end", 1.0, 1.0)
        all_pl[i].setGameMode(3)
        all_pl[i].playCutScene("end")
        all_pl[i].setupHUD("portal")
        all_pl[i].openUI(ui)
    }
    c.scheduleScript(19, function () {
        for (var a in all_pl){
            all_pl[a].getShader().setShaders(0, 0, 0, 0.0, 3, 0.0, 0.0, 2.0, false)
        }
        c.scheduleScript(3, function () {
            for (var p in all_pl){
                all_pl[p].getShader().setShaders(0, 0, 0, 0.0, 1, 0.0, 1.2, 1.5, true)
            }
        })
    })
    c.scheduleScript(36, function () {
        for (var pl in all_pl){
            all_pl[pl].getShader().setShaders(0, 0, 0, 0.0, 3, 0.0, 0.0, 2.0, false)
        }
        c.scheduleScript(5, function () {
            for (var players in all_pl){
                all_pl[players].getShader().setShaders(0, 0, 0, 0.0, 1, 0.0, 1.2, 1.5, true)
            }
        })
    })
    c.scheduleScript(49, function () {
        for (var pla in all_pl){
            all_pl[pla].getShader().setShaders(0, 0, 0, 0.0, 3, 0.0, 0.0, 2.0, false)
        }
    })
    c.scheduleScript(186, function () {
        for (var all in all_pl){
            all_pl[all].closeUI()
            all_pl[all].executeScript("player/ui/credits.js")
        }
    })
}