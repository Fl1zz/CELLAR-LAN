function main(c) {
    var ui = mappet.createUI().closable(false)
    var all_pl = c.server.getAllPlayers()

    for (var i in all_pl){
        var all = all_pl[i]
        all.states.reset("hand")
        c.server.getWorld(0).setBlock(mappet.createBlockState("cellar:door_ash_blocked", 4), 7, 42, 17)

        c.server.states.setNumber("deathPanel", 3)
        all.stopAllSounds()
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.misc.door_mimic"+Math.floor(mappet.random(1, 4))+"", 0.4, 1.0)
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.cutscenes.arms_infected", 1.0, 1.0)
        all.playStaticSound("mp.sounds:cellar_sounds.chapter1.voice.arms_infected", 1.0, 1.0)
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.ost.rightnow_loop")
        all.stopLoopSound("mp.sounds:cellar_sounds.chapter1.voice.scary_breath")
        all.openUI(ui)
        all.setGameMode(3)
        all.setupHUD("arms_infected")
        all.playCutScene("arms_infected")
        c.server.states.reset("game")
        all.getShader().setShaders(0, 0, 0, 0.3, 120, 0.0, 1.2, 1.0, true)
        if (c.server.states.has("voice")) {
            var voice = JSON.parse(c.server.states.getString("voice"))
            voice.where_am_i = false
            voice.what_are_you = false
            voice.whats_happening = false
            c.server.states.setString("voice", JSON.stringify(voice))
        }
        c.scheduleScript(162, function () {
            for (var p in all_pl){

                all_pl[p].closeHUD("arms_infected")
                c.player.executeScript("player/ui/death_screen.js")
                all_pl[p].getShader().setShaders(110, 0, 0, 0.3, 1, 2.0, 1.7, 2.0, false)
            }
        })
    }
    c.server.states.reset("respawnTime")
    var entities = c.server.getEntities("@e[mpid=bonnie]")
    if (entities.length != 0) {
        var bonnie = entities[0]
        bonnie.remove()
    }
}