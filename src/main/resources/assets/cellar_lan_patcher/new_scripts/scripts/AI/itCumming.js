function main(c) {
    if (c.server.states.getNumber("game") == 1) {
        var player = c.server.allPlayers[0]
        var bonnie = c.server.getEntities("@e[mpid=bonnie]")
        
        for (var i in bonnie) {
            bonnie[i].remove()
        }
        
        c.server.states.reset("hand")
        c.server.states.reset("game")
        c.server.states.reset("respawnTime")
        player.setupHUD("itCumming")
        c.scheduleScript(3, function () {
            player.getShader().setShaders(0, 0, 0, 0.2, 20, 0.0, 0.8, 1.0, true)
        })
        player.playStaticSound("mp.sounds:cellar_sounds.misc.text", 2.0, 1.0)
        
        c.scheduleScript(100, function () {
            var npc = c.server.getWorld(0).spawnNpc("itCumming", -23, 41, 12)
            npc.setTarget(player)
            player.playStaticSound("mp.sounds:cellar_sounds.chapter1.ambience.itcumming_ambience", 1.0, 1.0)
            player.playStaticSound("mp.sounds:cellar_sounds.misc.it_is_500_meters_far_from_you", 1.0, 1.0)
            c.scheduleScript(10, function () {
                player.getShader().setShaders(0, 0, 0, 0.2, 6, 0.0, 2.0, 1.0, true)
            })
        })
    }
}

function damage(c){
    var object = c.object
    
    if (object == null) return
    if (object.isNPC()) {
        if (object.getNpcId() == "itCumming") {
            c.cancel()
            object.remove()
            c.player.executeScript("game/cutscenes/getup.js")
            c.player.stopSound("mp.sounds:cellar_sounds.chapter1.ambience.itcumming_ambience")
            c.player.getShader().setShaders(120, 0, 0, 0.2, 1, 0.0, 0.8, 2.0, false)
            c.player.playStaticSound("mp.sounds:cellar_sounds.misc.faahhh", 1.0, 1.0)
        }
    }
}